#!/usr/bin/env node
// Validate complete BuSta training artifacts without sending answers to an AI provider.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

export const EXAM_IDS = ['busta-fs19', 'busta-fs20', 'busta-fs21', 'busta-fs22', 'busta-fs23', 'busta-nh23', 'busta-fs24', 'busta-fs25'];
export const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_SOURCE_DIR = '/storage/Public/HSG/Bachelor/Extracuricular/Lucas Hilfe/BuSta/Original';
const sha256 = value => createHash('sha256').update(value).digest('hex');
const sum = rows => rows.reduce((total, row) => total + row, 0);
const close = (a, b) => Math.abs(a - b) < 1e-8;

export function checkBustaContent({ root = PROJECT_ROOT, sourceDir = process.env.BUSTA_SOURCE_DIR || DEFAULT_SOURCE_DIR } = {}) {
  const errors = [], warnings = [], exams = [], globalQuestionIds = new Set();
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const assetPath = (value, label) => {
    if (typeof value !== 'string' || !value) { check(false, `${label}: missing asset path`); return null; }
    const full = resolve(root, value), rel = relative(root, full);
    check(!rel.startsWith('..') && !isAbsolute(rel), `${label}: path leaves project`);
    check(value.startsWith('assets/exams/'), `${label}: expected local exam asset`);
    check(existsSync(full), `${label}: missing ${value}`);
    return full;
  };
  for (const id of EXAM_IDS) {
    let exam;
    try { exam = JSON.parse(readFileSync(resolve(root, 'content/exams', `${id}.json`), 'utf8')); }
    catch (error) { errors.push(`${id}: cannot parse JSON: ${error.message}`); continue; }
    const meta = exam._meta || {}, sections = exam.sections || [], questions = sections.flatMap(section => section.questions || []);
    check(exam.id === id && exam.course === 'BuSta', `${id}: invalid identity/course`);
    check(meta.schemaVersion === '1', `${id}: schemaVersion must be 1`);
    check(meta.status === 'draft', `${id}: training content must retain draft calibration status`);
    check(meta.originalContainsSolutions === true, `${id}: original solution PDF flag absent`);
    check(meta.gradingCalibrationStatus === 'pending-human-calibration', `${id}: calibration notice absent`);
    check(exam.courseColor === '#0891b2', `${id}: wrong course colour`);
    check(exam.totalPoints === 180 && exam.durationMinutes === 180, `${id}: source points/time changed`);
    check(sections.length === 8, `${id}: expected all eight original tasks`);
    check(close(sum(sections.map(section => section.points)), exam.totalPoints), `${id}: section point total differs`);
    check(Array.isArray(exam._validation), `${id}: source uncertainty list missing`);
    const pdf = assetPath(exam.resourceLink, id);
    let sourceHash = null, pageCount = null;
    if (pdf && existsSync(pdf)) {
      sourceHash = sha256(readFileSync(pdf));
      try {
        const info = execFileSync('pdfinfo', [pdf], { encoding: 'utf8' });
        pageCount = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
        check(Number.isInteger(pageCount) && pageCount > 0, `${id}: PDF page count unreadable`);
      } catch (error) { errors.push(`${id}: pdfinfo failed: ${error.message}`); }
      if (meta.sourceSha256) check(meta.sourceSha256 === sourceHash, `${id}: recorded source hash mismatch`);
      const sourceFile = meta.sourceFile;
      check(typeof sourceFile === 'string' && sourceFile === sourceFile?.split('/').at(-1), `${id}: source filename invalid`);
      const original = typeof sourceFile === 'string' ? resolve(sourceDir, sourceFile) : null;
      check(original && existsSync(original), `${id}: HSG original missing`);
      if (original && existsSync(original)) check(sha256(readFileSync(original)) === sourceHash, `${id}: archive differs from HSG original`);
      const declaredPageCount = meta.sourcePageCount ?? (typeof meta.sourcePages === 'number' ? meta.sourcePages : null);
      if (declaredPageCount != null) check(declaredPageCount === pageCount, `${id}: source page count mismatch`);
    }
    const sourceRefs = (value, label) => check(Array.isArray(value) && value.length > 0 && value.every(page => Number.isInteger(page) && page >= 1 && page <= pageCount), `${label}: invalid source page references`);
    let derivedCriteria = 0, officialCriteria = 0, figures = 0;
    const sectionIds = new Set();
    for (const section of sections) {
      check(!sectionIds.has(section.id), `${id}: duplicate section ID ${section.id}`); sectionIds.add(section.id);
      check(section.questionType === 'open', `${id}/${section.id}: expected open legal answers`);
      check(close(sum((section.questions || []).map(question => question.points)), section.points), `${id}/${section.id}: question total differs`);
    }
    for (const [index, question] of questions.entries()) {
      const label = question.id || `${id}/question-${index + 1}`, metadata = question.metadata || {};
      check(question.id === `${id}-q${String(index + 1).padStart(2, '0')}`, `${label}: non-sequential/global ID`);
      check(!globalQuestionIds.has(question.id), `${label}: duplicate global question ID`); globalQuestionIds.add(question.id);
      check(question.number === index + 1, `${label}: question number mismatch`);
      check(question.type === 'open' && question.correct === null, `${label}: incorrect question mode`);
      check(typeof question.text === 'string' && question.text.trim().length > 0, `${label}: task text missing`);
      check(Number.isFinite(question.points) && question.points > 0, `${label}: invalid points`);
      check(Array.isArray(question.topics) && question.topics.length >= 1 && question.topics.length <= 3, `${label}: expected 1–3 topics`);
      check(typeof question.modelAnswer === 'string' && question.modelAnswer.trim().length > 0, `${label}: no official model answer; must block automatic grading`);
      check(typeof question.explanation === 'string' && question.explanation.trim().length > 0, `${label}: explanation missing`);
      sourceRefs(metadata.sourcePages, label);
      const rubric = question.gradingRubric || [], ids = new Set();
      check(rubric.length > 0 && close(sum(rubric.map(criterion => criterion.maxPoints)), question.points), `${label}: rubric total differs from base points`);
      for (const criterion of rubric) {
        check(typeof criterion.id === 'string' && !ids.has(criterion.id), `${label}: duplicate/missing criterion ID`); ids.add(criterion.id);
        check(typeof criterion.criterion === 'string' && criterion.criterion.trim().length > 0 && typeof criterion.expected === 'string' && criterion.expected.trim().length > 0, `${label}/${criterion.id}: criterion content missing`);
        check(Number.isFinite(criterion.maxPoints) && criterion.maxPoints >= 0, `${label}/${criterion.id}: unbounded criterion`);
        check(['official', 'derived'].includes(criterion.provenance), `${label}/${criterion.id}: provenance missing`);
        if (criterion.provenance === 'derived') derivedCriteria++; else officialCriteria++;
        sourceRefs(criterion.sourcePages, `${label}/${criterion.id}`);
      }
      for (const bonus of question.bonusRubric || []) {
        check(Number.isFinite(bonus.maxPoints) && bonus.maxPoints >= 0, `${label}: bonus is unbounded`);
        sourceRefs(bonus.sourcePages, `${label}/bonus`);
      }
      for (const group of metadata.gradingRubricGroups || []) check(close(sum(rubric.filter(criterion => criterion.groupId === group.id).map(criterion => criterion.maxPoints)), group.maxPoints), `${label}: group ${group.id} differs from official cap`);
      for (const cap of metadata.gradingCaps || []) {
        check(Number.isFinite(cap.maxPoints) && cap.maxPoints >= 0 && cap.maxPoints <= question.points, `${label}: invalid grading cap`);
        if (cap.criterionId) check(ids.has(cap.criterionId), `${label}: cap refers to missing criterion`);
      }
      if (question.imageAsset) { assetPath(question.imageAsset, label); figures++; }
      for (const match of (question.imageHtml || '').matchAll(/\bsrc=["']([^"']+)["']/g)) assetPath(match[1], label);
      check(!/Prüfkriterien\s*1:\s*Prüfung Grundrechtsrelevanz|Zwingende Antwort:|\(1 Zusatzpunkt\)/.test(question.text), `${label}: possible answer leakage`);
    }
    const blocked = questions.filter(question => question.metadata?.autoGradingBlocked).map(question => question.id);
    if (blocked.length) warnings.push(`${id}: automatic grading blocked for ${blocked.join(', ')}`);
    warnings.push(...(exam._validation || []).map(message => `${id}: ${message}`));
    exams.push({ id, file: `content/exams/${id}.json`, questions: questions.length, totalPoints: exam.totalPoints, durationMinutes: exam.durationMinutes, sourcePages: pageCount, sourceSha256: sourceHash, status: meta.status, derivedCriteria, officialCriteria, figures, blockedQuestionIds: blocked, sourceIssueCount: exam._validation?.length || 0 });
  }
  return { ok: errors.length === 0, totals: { exams: exams.length, questions: sum(exams.map(exam => exam.questions)), points: sum(exams.map(exam => exam.totalPoints)), minutes: sum(exams.map(exam => exam.durationMinutes)), blockedQuestions: sum(exams.map(exam => exam.blockedQuestionIds.length)) }, exams, errors, warnings };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = checkBustaContent();
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else {
    for (const exam of report.exams) console.log(`${exam.id}: ${exam.questions} questions, ${exam.totalPoints} points, ${exam.sourcePages} source pages, ${exam.blockedQuestionIds.length} blocked`);
    console.log(JSON.stringify({ ok: report.ok, ...report.totals, errors: report.errors }));
  }
  if (!report.ok) process.exitCode = 1;
}
