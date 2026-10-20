// Splits an exam document into a public part (tasks, texts, choices; stored on R2 behind the
// entitlement worker) and a key part (model answers, rubrics, grading metadata; stays in Supabase
// `k_exam_keys`, server side only). mergeExamKeys is the exact inverse, used by the grading endpoint.
const EXAM_KEY = '_exam';
const QUESTION_KEY_FIELDS = ['modelAnswer', 'model_answer', 'explanation', 'gradingRubric', 'bonusRubric'];
// Question metadata that steers or documents grading; display metadata (sourcePages, difficulty, latex...) stays public.
const KEY_METADATA = /grad|rubric|bonus|alternative|credit|selection|caps?$|weights|solution|modelanswer|correctionpairs|scoringgroups|fullcredit|distinctarguments|requireshumanreview|methodscoring|provenance|transcription|answerformat|reviewed/i;
const EXAM_KEY_FIELDS = ['_validation'];
const EXAM_KEY_METADATA = ['gradingStandard', 'gradingCalibrationStatus'];

const clone = value => JSON.parse(JSON.stringify(value));

export function splitExam(source) {
  const publicDoc = clone(source);
  const keys = [];
  const examKey = {};
  for (const field of EXAM_KEY_FIELDS) if (field in publicDoc) { examKey[field] = publicDoc[field]; delete publicDoc[field]; }
  for (const field of EXAM_KEY_METADATA) {
    if (publicDoc.metadata && field in publicDoc.metadata) { (examKey.metadata ||= {})[field] = publicDoc.metadata[field]; delete publicDoc.metadata[field]; }
    if (publicDoc._meta && field in publicDoc._meta) { (examKey._meta ||= {})[field] = publicDoc._meta[field]; delete publicDoc._meta[field]; }
  }
  if (Object.keys(examKey).length) keys.push({ question_id: EXAM_KEY, key: examKey });
  for (const section of publicDoc.sections || []) {
    for (const question of section.questions || []) {
      const key = {};
      for (const field of QUESTION_KEY_FIELDS) if (field in question) { key[field] = question[field]; delete question[field]; }
      for (const name of Object.keys(question.metadata || {})) {
        if (KEY_METADATA.test(name)) { (key.metadata ||= {})[name] = question.metadata[name]; delete question.metadata[name]; }
      }
      if (Object.keys(key).length) keys.push({ question_id: String(question.id), key });
    }
  }
  return { publicDoc, keys };
}

// A large question key may be stored as several rows (one per field); fold them back together.
export function foldKeyRows(rows) {
  const byQuestion = new Map();
  for (const row of rows) {
    const id = String(row.question_id), { metadata, ...fields } = row.key;
    const merged = byQuestion.get(id) || {};
    Object.assign(merged, fields);
    if (metadata) merged.metadata = { ...(merged.metadata || {}), ...metadata };
    byQuestion.set(id, merged);
  }
  return byQuestion;
}

export function mergeExamKeys(publicDoc, rows) {
  const exam = clone(publicDoc);
  const byQuestion = foldKeyRows(rows);
  const examKey = byQuestion.get(EXAM_KEY);
  if (examKey) {
    for (const field of EXAM_KEY_FIELDS) if (field in examKey) exam[field] = examKey[field];
    for (const part of ['metadata', '_meta']) if (examKey[part]) exam[part] = { ...(exam[part] || {}), ...examKey[part] };
  }
  for (const section of exam.sections || []) {
    for (const question of section.questions || []) {
      const key = byQuestion.get(String(question.id));
      if (!key) continue;
      const { metadata, ...fields } = key;
      Object.assign(question, fields);
      if (metadata) question.metadata = { ...(question.metadata || {}), ...metadata };
    }
  }
  return exam;
}
