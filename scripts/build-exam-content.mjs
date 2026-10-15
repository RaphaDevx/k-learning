#!/usr/bin/env node
// Normalisiert Pruefungsdaten aus exams/ (Web-Format, .js/.json) ins Schema der nativen App
// (native/types/exam.ts -> ExamData) und schreibt content/exams/<id>.json.
// Kein Netzwerk, keine Supabase-Zugriffe. JS-Quellen laufen nur in einer vm mit Fake-window.
//
// Aufruf: node scripts/build-exam-content.mjs [--only id1,id2] [--required-only]

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'exams');
const OUT_DIR = path.join(ROOT, 'content', 'exams');
const EVAL_TIMEOUT_MS = 5000;
const SUPPORTED_TYPES = ['single_choice', 'multiple_choice', 'open'];
const CHOICE_TYPES = ['single_choice', 'multiple_choice'];
const DROPPED_TOP_LEVEL = ['_meta', '_validation', 'validation', 'telemetry', 'exam_info', 'scoring_rules', 'examInfo', 'scoringRules'];
const LOCAL_ASSET_RE = /(?:src|href)\s*=\s*\\?["']?(?!https?:|data:|\/\/)([^"'\\\s>]+\.(?:png|jpe?g|gif|svg|webp|pdf|xlsx?))/gi;

// Ziel-ID -> Quelldatei. required = Pflicht (in Supabase k_exams vorhanden)
const EXAMS = [
  { id: 'makro2-probeklausur-fs26', file: 'makro2-probeklausur-fs26-data.json', required: true },
  { id: 'makro2-probeklausur-b', file: 'makro2-probeklausur-b-data.json', required: true },
  { id: 'om-fs26', file: 'om-fs26-data.js', required: true },
  { id: 'om-hs24', file: 'om-hs24-data.js', required: true },
  { id: 'om-hs23', file: 'om-hs23-data.js', required: true },
  { id: 'stat-pk1', file: 'statistik-pk1-data.js', required: true },
  { id: 'stat-pk2', file: 'statistik-pk2-data.js', required: true },
  { id: 'bwl-b-fs25', file: 'bwl-b-fs25-data.json', required: true },
  { id: 'makro2-hs21', file: 'makro2-hs21-data.json' },
  { id: 'makro2-hs23', file: 'makro2-hs23-data.json' },
  { id: 'makro2-ki-exam-01', file: 'makro2-ki-exam-01-data.json' },
  { id: 'makro2-probeklausur-21', file: 'makro2-probeklausur-21-data.json' },
  { id: 'om-hs20', file: 'om-hs20-data.js' },
  { id: 'om-fs20', file: 'om-fs20-data.js' },
  { id: 'om-fs21', file: 'om-fs21-data.js' },
  { id: 'bwl-fifu-2021', file: 'bwl-fifu-2021-data.json' },
  { id: 'bwl-hs22', file: 'bwl-hs22-data.js' },
  { id: 'c1-bec-higher-1', file: 'c1-bec-higher-1-data.json' },
  { id: 'c1-bec-higher-2', file: 'c1-bec-higher-2-data.json' },
  { id: 'c1-lang-functions', file: 'c1-lang-functions-data.json' },
  { id: 'c1-written-hs24', file: 'c1-written-hs24-data.json' },
  { id: 'englischc1-hs22', file: 'englischc1-hs22-data.js' },
  { id: 'esf-hs22', file: 'esf-hs22-data.js' },
  { id: 'esf-hs23', file: 'esf-hs23-data.js' },
  { id: 'esf-eigenklausur', file: 'esf-eigenklausur-data.js' },
];

const snakeToCamel = (k) => k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

function loadSource(file) {
  const src = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
  if (file.endsWith('.json')) return JSON.parse(src);
  const win = {};
  const ctx = vm.createContext({ window: win });
  vm.runInContext(src, ctx, { filename: file, timeout: EVAL_TIMEOUT_MS });
  const keys = Object.keys(win);
  if (keys.length !== 1) throw new Error(`erwarte genau ein window.*-Objekt, gefunden: ${keys.join(',') || 'keins'}`);
  return win[keys[0]];
}

const pick = (o, ...names) => { for (const n of names) if (o[n] !== undefined) return o[n]; return undefined; };

function normalizeRules(raw, notes) {
  const r = raw ?? {};
  const sc = r.single_choice ?? {};
  const mc = r.multiple_choice ?? {};
  const single = { correct: sc.correct ?? null, wrong: sc.wrong ?? 0, blank: sc.blank ?? 0 };
  let multiple = {
    allCorrect: pick(mc, 'allCorrect', 'all_correct', 'correct') ?? null,
    anyWrong: pick(mc, 'anyWrong', 'any_wrong', 'wrong') ?? 0,
    blank: mc.blank ?? 0,
  };
  if (single.correct === null && multiple.allCorrect !== null) { single.correct = multiple.allCorrect; notes.push('scoringRules.single_choice.correct aus multiple_choice abgeleitet'); }
  if (multiple.allCorrect === null && single.correct !== null) {
    multiple = { allCorrect: single.correct, anyWrong: single.wrong, blank: single.blank };
    notes.push('scoringRules.multiple_choice fehlt in Quelle: aus single_choice abgeleitet');
  }
  if (r.multiple_choice && 'correct' in mc && !('allCorrect' in mc)) notes.push('scoringRules.multiple_choice.correct -> allCorrect');
  if (r.multiple_choice && 'all_correct' in mc) notes.push('scoringRules.multiple_choice.all_correct/any_wrong -> allCorrect/anyWrong');
  return { single_choice: single, multiple_choice: multiple };
}

function normalizeQuestion(q, sectionType, idx, notes) {
  const out = {};
  for (const [k, v] of Object.entries(q)) out[snakeToCamel(k)] = v;
  let type = out.type;
  if (!type) {
    type = Array.isArray(out.correct) && out.correct.length > 1 ? 'multiple_choice'
      : (SUPPORTED_TYPES.includes(sectionType) ? sectionType : 'single_choice');
    if (sectionType === 'multiple_choice' || sectionType === 'single_choice') type = sectionType;
    notes.type = true;
  }
  out.type = type;
  out.number = out.number ?? idx + 1;
  out.choices = Array.isArray(out.choices) ? out.choices : [];
  out.correct = out.correct == null ? [] : Array.isArray(out.correct) ? out.correct : [out.correct];
  return out;
}

function normalize(entry, raw) {
  const notes = [];
  const warnings = [];
  const unsupported = [];
  const renamed = new Set();

  const rawRules = pick(raw, 'scoringRules', 'scoring_rules');
  const rawInfo = pick(raw, 'examInfo', 'exam_info');
  const exam = { id: entry.id };
  if (raw.id !== entry.id) notes.push(`id: ${raw.id} -> ${entry.id}`);
  exam.title = raw.title;
  exam.course = raw.course;
  if (raw.courseColor !== undefined) exam.courseColor = raw.courseColor;
  exam.durationMinutes = pick(raw, 'durationMinutes', 'duration_minutes');
  exam.totalPoints = pick(raw, 'totalPoints', 'total_points');
  if ('duration_minutes' in raw) renamed.add('duration_minutes->durationMinutes');
  if ('total_points' in raw) renamed.add('total_points->totalPoints');
  exam.scoringRules = normalizeRules(rawRules, notes);
  if (rawRules && 'scoring_rules' in raw) renamed.add('scoring_rules->scoringRules');
  if (rawInfo) {
    exam.examInfo = {};
    for (const [k, v] of Object.entries(rawInfo)) exam.examInfo[snakeToCamel(k)] = v;
    if ('exam_info' in raw) renamed.add('exam_info->examInfo (allowed_aids->allowedAids)');
  }
  for (const [k, v] of Object.entries(raw)) {
    if (['id', 'title', 'course', 'courseColor', 'duration_minutes', 'durationMinutes', 'total_points', 'totalPoints', 'sections'].includes(k)) continue;
    if (DROPPED_TOP_LEVEL.includes(k)) continue;
    if (k === 'resourceLink' && v == null) continue;
    exam[snakeToCamel(k)] = v; // z.B. subtitle, excelPassword, excelDownload (Passthrough, in Quelle vorhanden)
  }

  let typeDerived = 0;
  exam.sections = (raw.sections ?? []).map((s) => {
    const sec = {};
    for (const [k, v] of Object.entries(s)) { if (k === 'questionType') continue; sec[snakeToCamel(k) === 'questionType' ? 'question_type' : k] = v; }
    if (s.questionType !== undefined) { sec.question_type = s.questionType; renamed.add('section.questionType->question_type'); }
    const sType = sec.question_type;
    sec.questions = (s.questions ?? []).map((q, i) => {
      const flag = {};
      const nq = normalizeQuestion(q, sType, i, flag);
      if (flag.type) typeDerived++;
      if (q.model_answer !== undefined) renamed.add('question.model_answer->modelAnswer');
      return nq;
    });
    return sec;
  });
  if (typeDerived) notes.push(`question.type fehlte bei ${typeDerived} Fragen: aus section.question_type bzw. correct.length abgeleitet`);

  // Nicht abbildbare Typen
  for (const sec of exam.sections) for (const q of sec.questions) {
    if (!SUPPORTED_TYPES.includes(q.type)) {
      unsupported.push(`${q.id}:${q.type}`);
      if (entry.required) {
        // Pflicht-Exam: als 'open' ausliefern, Originalinhalt (gappedText, gaps, ...) bleibt als Zusatzfelder erhalten
        q.originalType = q.type;
        q.type = 'open';
        q.choices = [];
        q.correct = [];
      }
    }
  }
  // section.question_type fehlt -> ableiten
  for (const sec of exam.sections) if (!sec.question_type) {
    const ts = new Set(sec.questions.map((q) => q.type));
    sec.question_type = ts.size === 1 ? [...ts][0] : 'mixed';
    notes.push(`section ${sec.id}: question_type abgeleitet`);
  }
  for (const n of renamed) notes.push(`umbenannt: ${n}`);
  return { exam, notes: [...new Set(notes)], warnings, unsupported };
}

function validate(exam) {
  const w = [];
  const e = [];
  for (const f of ['title', 'course', 'durationMinutes', 'totalPoints']) if (exam[f] == null) e.push(`Feld ${f} fehlt`);
  const rules = exam.scoringRules;
  const ids = new Set();
  let sum = 0;
  let nq = 0;
  const emptyCorrect = [];
  const ruleMismatch = [];
  for (const sec of exam.sections) {
    let secSum = 0;
    for (const q of sec.questions) {
      nq++;
      secSum += q.points ?? 0;
      if (ids.has(q.id)) e.push(`${q.id}: doppelte Frage-ID`);
      ids.add(q.id);
      if (!q.text) w.push(`${q.id}: text fehlt`);
      if (typeof q.points !== 'number') e.push(`${q.id}: points fehlt`);
      if (!SUPPORTED_TYPES.includes(q.type)) e.push(`${q.id}: Typ ${q.type} nicht unterstuetzt`);
      if (CHOICE_TYPES.includes(q.type)) {
        if (!q.choices.length) e.push(`${q.id}: keine choices`);
        const keys = new Set(q.choices.map((c) => c.key));
        if (keys.size !== q.choices.length) e.push(`${q.id}: doppelte choice-keys`);
        if (!q.correct.length) {
          if (q.type === 'multiple_choice' && !/^\s*[\u2014-]\s*$/.test(q.choices[0]?.text ?? '')) emptyCorrect.push(q.id);
          else e.push(`${q.id}: correct leer`);
        }
        for (const k of q.correct) if (!keys.has(k)) e.push(`${q.id}: correct-Key ${k} nicht in choices`);
        if (q.type === 'single_choice' && q.correct.length !== 1) e.push(`${q.id}: single_choice mit ${q.correct.length} correct`);
        const rv = q.type === 'single_choice' ? rules.single_choice.correct : rules.multiple_choice.allCorrect;
        if (rv !== q.points) ruleMismatch.push(`${q.id}(${q.points}/${rv})`);
      }
    }
    if (sec.points != null && sec.points !== secSum) w.push(`section ${sec.id}: points=${sec.points} != Summe Fragen ${secSum}`);
    sum += secSum;
  }
  if (emptyCorrect.length) w.push(`multiple_choice mit leerem correct ("keine Aussage wahr"): ${emptyCorrect.join(', ')} - App wertet leere Antwort als unbeantwortet, nie als richtig`);
  if (ruleMismatch.length) w.push(`${ruleMismatch.length} Fragen mit points != scoringRules-Wert (points/Regel): ${ruleMismatch.join(', ')} - App vergibt pauschal den Regelwert`);
  if (sum !== exam.totalPoints) w.push(`Punkte-Summe Fragen ${sum} != totalPoints ${exam.totalPoints}`);
  return { errors: e, warnings: w, nq, sum };
}

function findAssets(exam) {
  const found = new Set();
  const json = JSON.stringify(exam);
  for (const m of json.matchAll(LOCAL_ASSET_RE)) found.add(m[1]);
  for (const sec of exam.sections) for (const q of sec.questions) if (q.imageAsset) found.add(`imageAsset:${q.imageAsset}`);
  return [...found];
}

function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf('--only');
  const only = onlyIdx >= 0 ? new Set(args[onlyIdx + 1].split(',')) : null;
  const requiredOnly = args.includes('--required-only');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const report = [];
  let failed = false;

  for (const entry of EXAMS) {
    if ((only && !only.has(entry.id)) || (requiredOnly && !entry.required)) continue;
    const r = { id: entry.id, required: !!entry.required, file: entry.file };
    try {
      const raw = loadSource(entry.file);
      const { exam, notes, unsupported } = normalize(entry, raw);
      const v = validate(exam);
      r.notes = notes;
      r.assets = findAssets(exam);
      r.warnings = v.warnings;
      r.unsupported = unsupported;
      if (!entry.required && unsupported.length) {
        r.skipped = `nicht abbildbare Fragetypen (${[...new Set(unsupported.map((u) => u.split(':')[1]))].join(', ')}): ${unsupported.length} Fragen`;
      } else if (v.errors.length) {
        r.skipped = `Validierungsfehler: ${v.errors.length} (z.B. ${v.errors.slice(0, 3).join('; ')})`;
        if (entry.required) failed = true;
      } else if (/\[PLACEHOLDER/i.test(JSON.stringify(exam))) {
        r.skipped = 'enthaelt Platzhalter-Fragen';
      } else {
        const out = path.join(OUT_DIR, `${entry.id}.json`);
        const body = JSON.stringify(exam, null, 2) + '\n';
        fs.writeFileSync(out, body);
        Object.assign(r, { out: path.relative(ROOT, out), bytes: Buffer.byteLength(body), questions: v.nq, points: v.sum, totalPoints: exam.totalPoints });
      }
      if (r.skipped && entry.required) failed = true;
    } catch (err) {
      r.skipped = `Fehler: ${err.message}`;
      if (entry.required) failed = true;
    }
    report.push(r);
  }

  for (const r of report) {
    console.log(`\n[${r.skipped ? 'SKIP' : 'OK  '}] ${r.id}${r.required ? ' (Pflicht)' : ''}  <- ${r.file}`);
    if (r.skipped) console.log(`  uebersprungen: ${r.skipped}`);
    else console.log(`  ${r.out}  ${r.bytes} B  ${r.questions} Fragen  Punkte ${r.points}/${r.totalPoints}`);
    for (const n of r.notes ?? []) console.log(`  note: ${n}`);
    if (r.unsupported?.length && r.required) console.log(`  unsupported (als open ausgeliefert): ${r.unsupported.join(', ')}`);
    for (const w of r.warnings ?? []) console.log(`  WARN: ${w}`);
    if (r.assets?.length) console.log(`  lokale Bilder: ${r.assets.join(', ')}`);
  }
  process.exitCode = failed ? 1 : 0;
}

main();
