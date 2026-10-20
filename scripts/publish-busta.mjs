#!/usr/bin/env node
// Publish canonical BuSta training content through the existing K-Dev vault admin route.
// No provider keys or Supabase service credentials enter the repository or shell arguments.
// SUPERSEDED (docs/adr/0002-exam-content-on-r2.md): exam content no longer goes into Supabase and the course stays private.
// Use `node scripts/build-r2-exams.mjs` (files + small metadata SQL). Set BUSTA_LEGACY_PUBLISH=1 only for a deliberate legacy import.
if (process.env.BUSTA_LEGACY_PUBLISH !== '1') {
  console.error('publish-busta.mjs is superseded by scripts/build-r2-exams.mjs (R2 content split). See docs/adr/0002-exam-content-on-r2.md.');
  process.exit(2);
}
import { readFileSync, writeFileSync, mkdtempSync, chmodSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { checkBustaContent, EXAM_IDS, PROJECT_ROOT } from './check-busta-content.mjs';

const args = process.argv.slice(2);
if (args.some(arg => !['--apply', '--dry-run'].includes(arg)) || args.includes('--apply') && args.includes('--dry-run')) {
  throw new Error('Usage: node scripts/publish-busta.mjs [--dry-run | --apply]');
}
const report = checkBustaContent();
if (!report.ok) throw new Error(`Content checks failed:\n${report.errors.join('\n')}`);
const exams = EXAM_IDS.map(id => JSON.parse(readFileSync(resolve(PROJECT_ROOT, 'content/exams', `${id}.json`), 'utf8')));
const payload = exams.map((content, index) => ({
  id: content.id, title: content.title, course: content.course, course_color: content.courseColor,
  duration_minutes: content.durationMinutes, total_points: content.totalPoints,
  scoring_rules: content.scoringRules, active: true, sort_order: 200 + index, content,
}));
function dollarQuote(value) {
  let delimiter;
  do { delimiter = `$busta_${randomBytes(12).toString('hex')}$`; } while (value.includes(delimiter));
  return delimiter + value + delimiter;
}
function buildSql(rows) {
const input = dollarQuote(JSON.stringify(rows));
return `BEGIN;
INSERT INTO public.k_courses (key,label,icon,color,hex,exam_date,exam_room,exam_format,notebook_id,data_dir,active,sort_order,is_public,is_secret,access_code)
VALUES ('BuSta','Bundesstaatsrecht (BuSta)','⚖️','cyan','#0891b2',NULL,NULL,'180 Minuten · offene juristische Aufgaben · zwei gleich gewichtete Teile',NULL,'BuSta',true,11,true,false,NULL)
ON CONFLICT (key) DO UPDATE SET label=EXCLUDED.label,icon=EXCLUDED.icon,color=EXCLUDED.color,hex=EXCLUDED.hex,exam_format=EXCLUDED.exam_format,data_dir=EXCLUDED.data_dir,active=true
WHERE (k_courses.label,k_courses.icon,k_courses.color,k_courses.hex,k_courses.exam_format,k_courses.data_dir,k_courses.active)
IS DISTINCT FROM (EXCLUDED.label,EXCLUDED.icon,EXCLUDED.color,EXCLUDED.hex,EXCLUDED.exam_format,EXCLUDED.data_dir,true);

WITH incoming AS (
  SELECT * FROM jsonb_to_recordset(${input}::jsonb) AS x(id text,title text,course text,course_color text,duration_minutes integer,total_points integer,scoring_rules jsonb,active boolean,sort_order integer,content jsonb)
)
INSERT INTO public.k_exams (id,title,course,course_color,duration_minutes,total_points,storage_path,scoring_rules,active,sort_order,content,content_version)
SELECT id,title,course,course_color,duration_minutes,total_points,NULL,scoring_rules,active,sort_order,content,1 FROM incoming
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title,course=EXCLUDED.course,course_color=EXCLUDED.course_color,duration_minutes=EXCLUDED.duration_minutes,total_points=EXCLUDED.total_points,storage_path=NULL,scoring_rules=EXCLUDED.scoring_rules,active=EXCLUDED.active,sort_order=EXCLUDED.sort_order,content=EXCLUDED.content,
content_version=CASE WHEN k_exams.content IS DISTINCT FROM EXCLUDED.content THEN COALESCE(k_exams.content_version,0)+1 ELSE k_exams.content_version END
WHERE (k_exams.title,k_exams.course,k_exams.course_color,k_exams.duration_minutes,k_exams.total_points,k_exams.storage_path,k_exams.scoring_rules,k_exams.active,k_exams.sort_order,k_exams.content)
IS DISTINCT FROM (EXCLUDED.title,EXCLUDED.course,EXCLUDED.course_color,EXCLUDED.duration_minutes,EXCLUDED.total_points,NULL,EXCLUDED.scoring_rules,EXCLUDED.active,EXCLUDED.sort_order,EXCLUDED.content);
COMMIT;`;
}
const batches = payload.map(row => buildSql([row]));

function vault(command, moreArgs = [], inputText) {
  return execFileSync('sudo', ['-n', '-u', 'raphael', 'kvault', command, 'klearning', ...moreArgs], {
    input: inputText, encoding: 'utf8', maxBuffer: 12 * 1024 * 1024,
  });
}
if (!args.includes('--apply')) {
  console.log(JSON.stringify({ mode: 'dry-run', ...report.totals, sqlBytes: batches.reduce((total, sql) => total + Buffer.byteLength(sql), 0), maxBatchBytes: Math.max(...batches.map(sql => Buffer.byteLength(sql))), providerApiCalls: 0, statuses: exams.map(exam => ({ id: exam.id, status: exam._meta.status })) }, null, 2));
} else {
  // Re-inspect generated fields before publishing; generated has_content is never written.
  const columns = JSON.parse(vault('query', ['-'], "SELECT column_name,is_generated FROM information_schema.columns WHERE table_schema='public' AND table_name='k_exams' AND column_name IN ('content','content_version','has_content')"));
  if (!columns.some(column => column.column_name === 'content' && column.is_generated === 'NEVER') || !columns.some(column => column.column_name === 'content_version' && column.is_generated === 'NEVER')) throw new Error('Database canonical content schema is unavailable');
  const directory = mkdtempSync(join(tmpdir(), 'busta-catalog-'));
  const file = join(directory, 'publish.sql');
  try {
    // SQL contains exam documents, never credentials. raphael must be able to read the file.
    chmodSync(directory, 0o711);
    // The local vault caps request bodies; each exam is an atomic bounded request.
    for (const sql of batches) {
      writeFileSync(file, sql, { mode: 0o644 });
      vault('sql', [file]);
    }
  } finally { rmSync(directory, { recursive: true, force: true }); }
  const remote = EXAM_IDS.flatMap(id => JSON.parse(vault('query', ['-'], `SELECT id,title,course,course_color,duration_minutes,total_points,active,sort_order,storage_path,content_version,has_content,content FROM public.k_exams WHERE id=${dollarQuote(id)}`)));
  if (remote.length !== EXAM_IDS.length) throw new Error('Published exam count differs');
  for (const expected of payload) {
    const actual = remote.find(exam => exam.id === expected.id);
    if (!actual || !isDeepStrictEqual(actual.content, expected.content) || actual.course !== 'BuSta' || !actual.active || !actual.has_content || actual.total_points !== expected.total_points || actual.duration_minutes !== expected.duration_minutes || actual.storage_path !== null) throw new Error(`Remote canonical content verification failed for ${expected.id}`);
  }
  const courses = JSON.parse(vault('query', ['-'], "SELECT key,label,color,hex,exam_date,exam_format,data_dir,active,is_public,is_secret FROM public.k_courses WHERE key='BuSta'"));
  if (courses.length !== 1 || !courses[0].active || courses[0].data_dir !== 'BuSta' || courses[0].hex !== '#0891b2') throw new Error('Course verification failed');
  console.log(JSON.stringify({ mode: 'published-and-verified', ...report.totals, providerApiCalls: 0, course: courses[0], exams: remote.map(exam => ({ id: exam.id, points: exam.total_points, minutes: exam.duration_minutes, version: exam.content_version, hasContent: exam.has_content, status: exam.content._meta.status })) }, null, 2));
}
