#!/usr/bin/env node
// Prepare BuSta exams for the R2 content split (docs/adr/0002-exam-content-on-r2.md). Writes files only:
//   build/r2-exams/busta/<id>.v<N>.json   public part (tasks, texts) -> private R2 bucket, served by the entitlement worker
//   build/r2-exams/SHA256SUMS, manifest.json
//   build/sql/00-course.sql               private course row
//   build/sql/<id>.meta.sql               one small k_exams row per exam (content NULL, content_key, content_hash)
//   build/sql/<id>.keys-NN.sql            model answers and rubrics for k_exam_keys (stay in Supabase), chunks < 28 KB
// No database, bucket or provider call is made; upload and apply are separate, approved steps.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { checkBustaContent, EXAM_IDS, PROJECT_ROOT } from './check-busta-content.mjs';
import { splitExam, mergeExamKeys } from '../functions/_lib/examKeys.js';

const MAX_SQL_BYTES = 28 * 1024; // kvault sql hangs up above ~32 KB
const COURSE = 'busta';
const sha256 = value => createHash('sha256').update(value).digest('hex');
const sqlText = value => value === null || value === undefined ? 'NULL' : `'${String(value).replaceAll("'", "''")}'`;
const sqlJson = value => `${sqlText(JSON.stringify(value))}::jsonb`;

export function buildR2Exams({ root = PROJECT_ROOT, version = 1, out = join(root, 'build') } = {}) {
  const report = checkBustaContent();
  if (!report.ok) throw new Error(`Content checks failed:\n${report.errors.join('\n')}`);
  rmSync(join(out, 'r2-exams'), { recursive: true, force: true });
  rmSync(join(out, 'sql'), { recursive: true, force: true });
  mkdirSync(join(out, 'r2-exams', COURSE), { recursive: true });
  mkdirSync(join(out, 'sql'), { recursive: true });

  const manifest = [], sums = [], files = {};
  const write = (path, text) => { writeFileSync(join(out, path), text); files[path] = Buffer.byteLength(text); };
  write('sql/00-course.sql', `INSERT INTO public.k_courses (key,label,icon,color,hex,exam_date,exam_room,exam_format,notebook_id,data_dir,active,sort_order,is_public,is_secret,access_code)
VALUES ('BuSta','Bundesstaatsrecht (BuSta)','⚖️','cyan','#0891b2',NULL,NULL,'180 Minuten · offene juristische Aufgaben · zwei gleich gewichtete Teile',NULL,'BuSta',true,11,false,true,NULL)
ON CONFLICT (key) DO UPDATE SET label=EXCLUDED.label,icon=EXCLUDED.icon,color=EXCLUDED.color,hex=EXCLUDED.hex,exam_format=EXCLUDED.exam_format,data_dir=EXCLUDED.data_dir;
`);

  EXAM_IDS.forEach((id, index) => {
    const source = JSON.parse(readFileSync(resolve(root, 'content/exams', `${id}.json`), 'utf8'));
    const { publicDoc, keys } = splitExam(source);
    if (!isDeepStrictEqual(mergeExamKeys(publicDoc, keys), source)) throw new Error(`${id}: split is not lossless`);

    const contentKey = `exams/${COURSE}/${id}.v${version}.json`;
    const body = JSON.stringify(publicDoc);
    const hash = sha256(body);
    write(`r2-exams/${COURSE}/${id}.v${version}.json`, body);
    sums.push(`${hash}  ${COURSE}/${id}.v${version}.json`);
    manifest.push({ id, contentKey, contentHash: hash, bytes: Buffer.byteLength(body), version, questionKeys: keys.length });

    const meta = `INSERT INTO public.k_exams (id,title,course,course_color,duration_minutes,total_points,storage_path,scoring_rules,active,sort_order,content,content_version,content_key,content_hash)
VALUES (${sqlText(source.id)},${sqlText(source.title)},${sqlText(source.course)},${sqlText(source.courseColor)},${source.durationMinutes},${source.totalPoints},NULL,${sqlJson(source.scoringRules ?? null)},true,${200 + index},NULL,${version},${sqlText(contentKey)},${sqlText(hash)})
ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title,course=EXCLUDED.course,course_color=EXCLUDED.course_color,duration_minutes=EXCLUDED.duration_minutes,total_points=EXCLUDED.total_points,storage_path=NULL,scoring_rules=EXCLUDED.scoring_rules,sort_order=EXCLUDED.sort_order,content=NULL,content_version=EXCLUDED.content_version,content_key=EXCLUDED.content_key,content_hash=EXCLUDED.content_hash;
`;
    if (Buffer.byteLength(meta) > MAX_SQL_BYTES) throw new Error(`${id}: metadata SQL exceeds ${MAX_SQL_BYTES} bytes`);
    write(`sql/${id}.meta.sql`, meta);

    const head = 'INSERT INTO public.k_exam_keys (exam_id,question_id,part,content_version,key) VALUES\n';
    const tail = '\nON CONFLICT (exam_id,question_id,part) DO UPDATE SET content_version=EXCLUDED.content_version,key=EXCLUDED.key;\n';
    const chunks = [];
    let rows = [], size = Buffer.byteLength(head + tail);
    const makeRow = (question_id, part, key) => `(${sqlText(id)},${sqlText(question_id)},${sqlText(part)},${version},${sqlJson(key)})`;
    const rowsFor = ({ question_id, key }) => {
      const whole = makeRow(question_id, '', key);
      if (Buffer.byteLength(whole) + Buffer.byteLength(head + tail) <= MAX_SQL_BYTES) return [whole];
      return Object.entries(key).map(([field, value]) => makeRow(question_id, field, { [field]: value }));
    };
    for (const row of keys.flatMap(rowsFor)) {
      const rowBytes = Buffer.byteLength(row) + 2;
      if (rowBytes + Buffer.byteLength(head + tail) > MAX_SQL_BYTES) throw new Error(`${id}: key row exceeds ${MAX_SQL_BYTES} bytes`);
      if (rows.length && size + rowBytes > MAX_SQL_BYTES) { chunks.push(rows); rows = []; size = Buffer.byteLength(head + tail); }
      rows.push(row); size += rowBytes;
    }
    if (rows.length) chunks.push(rows);
    chunks.forEach((chunk, n) => write(`sql/${id}.keys-${String(n + 1).padStart(2, '0')}.sql`, head + chunk.join(',\n') + tail));
  });

  write('r2-exams/SHA256SUMS', sums.join('\n') + '\n');
  write('r2-exams/manifest.json', JSON.stringify({ course: COURSE, exams: manifest }, null, 2) + '\n');
  return { manifest, files, maxSqlBytes: Math.max(...Object.entries(files).filter(([p]) => p.endsWith('.sql')).map(([, b]) => b)) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv.find(a => a.startsWith('--version='));
  const result = buildR2Exams({ version: arg ? Number(arg.split('=')[1]) : 1 });
  console.log(JSON.stringify({ exams: result.manifest.length, publicBytes: result.manifest.reduce((t, e) => t + e.bytes, 0), maxSqlBytes: result.maxSqlBytes, sqlFiles: Object.keys(result.files).filter(p => p.endsWith('.sql')).length, providerApiCalls: 0, databaseWrites: 0 }, null, 2));
}
