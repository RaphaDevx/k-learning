#!/usr/bin/env node
// Offline regression checks only. Every HTTP call is intercepted; no provider billing.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

if (!globalThis.crypto) globalThis.crypto = webcrypto;
const backendText = await readFile(new URL('../functions/api/grade-answer.js', import.meta.url), 'utf8');
const backend = await import('../functions/api/grade-answer.js');
const { splitExam } = await import('../functions/_lib/examKeys.js');
const front = await readFile(new URL('../js/screens/exam.js', import.meta.url), 'utf8');
const sql = await readFile(new URL('../docs/busta/grading-schema.sql', import.meta.url), 'utf8');
const rubric = [{ id: 'r1', criterion: 'Norm und Anwendung', expected: 'Begründete Anwendung', maxPoints: 1, provenance: 'official', sourcePages: [1] }];
const answer = 'Art. 29 BV schützt das rechtliche Gehör.';
const assessment = (earned = 1) => ({ criteria: [{ id: 'r1', earned, evidence: earned ? 'Art. 29 BV' : '', reason: 'Norm zutreffend genannt.', missing: earned < 1 ? 'Anwendung fehlt.' : '' }], feedback: 'Prüfung anhand der Rubrik.', needsReview: false, reviewReason: '', bonusFeedback: '' });
const validate = (data, rs = rubric, text = answer, cap = 1, groups) => backend.validateAssessment(data, rs, text, cap, groups);

test('valid assessment preserves bounded points and actual quoted evidence', () => assert.equal(validate(assessment()).earned, 1));
for (const [label, mutate] of [
  ['unknown criterion', x => { x.criteria[0].id = 'untrusted'; }],
  ['duplicate criterion', x => { x.criteria.push({ ...x.criteria[0] }); }],
  ['missing criterion', x => { x.criteria = []; }],
  ['negative points', x => { x.criteria[0].earned = -1; }],
  ['excess points', x => { x.criteria[0].earned = 2; }],
  ['non-finite points', x => { x.criteria[0].earned = Infinity; }],
  ['invented evidence', x => { x.criteria[0].evidence = 'Eine nicht geschriebene Begründung'; }],
  ['empty evidence for positive points', x => { x.criteria[0].evidence = ' '; }],
]) test(`rejects ${label}`, () => { const x = assessment(); mutate(x); assert.throws(() => validate(x)); });
for (const [label, mutate] of [
  ['missing reviewReason', x => { delete x.reviewReason; }],
  ['non-string bonusFeedback', x => { x.bonusFeedback = {}; }],
  ['unexpected top-level modelAnswer', x => { x.modelAnswer = 'must not leak'; }],
  ['unexpected criterion property', x => { x.criteria[0].modelAnswer = 'must not leak'; }],
]) test(`strict output rejects ${label}`, () => { const x = assessment(); mutate(x); assert.throws(() => validate(x)); });
test('criterion disagreement retains both marks, null final result and review status', () => {
  const x = backend.reconcile(validate(assessment()), validate(assessment(.5)), 1);
  assert.equal(x.status, 'review_required'); assert.equal(x.earned, null); assert.equal(x.proposedEarned, 1); assert.equal(x.secondEarned, .5);
});
test('same marks with model uncertainty are still reviewed', () => { const a = assessment(); a.needsReview = true; a.reviewReason = 'Quelle unklar'; assert.equal(backend.reconcile(validate(a), validate(assessment()), 1).earned, null); });
test('alternative group cap bounds sum without requiring every alternative', () => {
  const rs = [{ ...rubric[0], id: 'a', maxPoints: 4 }, { ...rubric[0], id: 'b', maxPoints: 4 }, { ...rubric[0], id: 'c', maxPoints: 1 }];
  const data = { ...assessment(), criteria: rs.map(r => ({ ...assessment().criteria[0], id: r.id, earned: r.maxPoints })) };
  assert.equal(validate(data, rs, answer, 5, [{ rubricIds: ['a','b'], maxPoints: 4 }]).earned, 5);
});

function syntheticExam() {
  const q = (id, extra = {}) => ({ id, text: `Frage ${id}`, type: 'open', points: 1, modelAnswer: 'OFFICIAL_MODEL_SENTINEL', gradingRubric: rubric, metadata: {}, ...extra });
  return { id: 'busta-fs99', title: 'Test', course: 'BuSta', examInfo: { date: 'FS 2099' }, sections: [{ id: 'task', title: 'Task', context: 'SHARED_CONTEXT_SENTINEL', questions: [q('prior', { context: 'PRIOR_CONTEXT_SENTINEL' }), q('current', { context: 'QUESTION_CONTEXT_SENTINEL', metadata: { requiredContextQuestionIds: ['prior'] } })] }] };
}
async function route(options = {}) {
  const exam = options.exam || syntheticExam();
  let split = null, env = {};
  if (options.split) {
    const parts = splitExam(exam), text = JSON.stringify(parts.publicDoc);
    const hash = options.splitHash || Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))).toString('hex');
    split = { keys: parts.keys.map(row => ({ question_id: row.question_id, key: row.key })), hash, text };
    if (!options.noBucket) env.EXAM_CONTENT = { get: async key => key === 'exams/busta/busta-fs99.v1.json' ? { text: async () => text } : null };
  }
  const calls = { provider: [], reservations: [], updates: [] };
  let pass = 0;
  const savedFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    const u = String(url);
    if (u === 'https://mock.supabase.invalid/auth/v1/user') return Response.json({ id: '00000000-0000-4000-8000-000000000001' });
    if (u.startsWith('https://mock.supabase.invalid/rest/v1/k_exams?')) return Response.json([split ? { content: null, content_key: 'exams/busta/busta-fs99.v1.json', content_hash: split.hash, content_version: 1, course: 'BuSta' } : { content: exam, content_version: 1, course: 'BuSta' }]);
    if (u === 'https://mock.supabase.invalid/rest/v1/rpc/k_has_course_access') return Response.json(!options.noAccess);
    if (u.startsWith('https://mock.supabase.invalid/rest/v1/k_exam_keys?')) { calls.keyReads = (calls.keyReads || 0) + 1; return Response.json(split.keys); }
    if (u === 'https://mock.supabase.invalid/rest/v1/rpc/k_reserve_grade') {
      calls.reservations.push(JSON.parse(init.body)); return Response.json(options.reservation || { id: 'job', dailyLimitChf: 2 });
    }
    if (u.startsWith('https://mock.supabase.invalid/rest/v1/k_grading_jobs?')) {
      calls.updates.push(JSON.parse(init.body)); return Response.json([]);
    }
    if (u === 'https://api.openai.com/v1/responses') {
      calls.provider.push(JSON.parse(init.body));
      if (options.providerFailure) return Response.json({ error: 'mock' }, { status: 500 });
      const data = options.outputs?.[pass++] || assessment();
      return Response.json({ id: 'mock-response', status: 'completed', usage: { input_tokens: 100, output_tokens: 50 }, output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(data) }] }] });
    }
    throw new Error('Unexpected network request blocked by test harness');
  };
  try {
    const request = new Request('https://app.invalid/api/grade-answer', { method: 'POST', headers: { Authorization: 'Bearer test-only', 'Content-Type': 'application/json' }, body: JSON.stringify({ examId: 'busta-fs99', questionId: 'current', answer, ...options.request }) });
    const response = await backend.onRequestPost({ request, env: { ...env, SUPABASE_URL: 'https://mock.supabase.invalid', SUPABASE_SERVICE_ROLE_KEY: 'mock-service-only', OPENAI_API_KEY: 'sk-mock-only' } });
    return { status: response.status, data: await response.json(), ...calls };
  } finally { globalThis.fetch = savedFetch; }
}
const sourceOf = call => {
  const content = call.input.find(x => x.role === 'user').content;
  return JSON.parse(typeof content === 'string' ? content : content.find(x => x.type === 'input_text').text);
};

test('route uses server official source, retains per-question/prior/shared contexts and omits model answer from response', async () => {
  const x = await route({ request: { modelAnswer: 'CLIENT_FORGED', rubric: [{ maxPoints: 999 }] } });
  assert.equal(x.status, 200); assert.equal(x.provider.length, 2);
  const source = sourceOf(x.provider[0]);
  assert.equal(source.question.modelAnswer, 'OFFICIAL_MODEL_SENTINEL');
  assert.equal(source.question.context, 'QUESTION_CONTEXT_SENTINEL');
  assert.equal(source.section.context, 'SHARED_CONTEXT_SENTINEL');
  assert.equal(source.prerequisiteQuestions[0].context, 'PRIOR_CONTEXT_SENTINEL');
  assert.equal(JSON.stringify(x.data).includes('OFFICIAL_MODEL_SENTINEL'), false);
  assert.equal(x.updates[0].status, 'graded'); assert.ok(x.data.costUsd > 0);
});
test('R2-split exam: public file from R2 plus server keys grade identically and never leak the solution', async () => {
  const x = await route({ split: true });
  assert.equal(x.status, 200); assert.equal(x.provider.length, 2); assert.equal(x.keyReads, 1);
  const source = sourceOf(x.provider[0]);
  assert.equal(source.question.modelAnswer, 'OFFICIAL_MODEL_SENTINEL');
  assert.equal(source.section.context, 'SHARED_CONTEXT_SENTINEL');
  assert.equal(JSON.stringify(x.data).includes('OFFICIAL_MODEL_SENTINEL'), false);
});
test('R2-split exam: hash mismatch or missing bucket fails closed without provider calls', async () => {
  const bad = await route({ split: true, splitHash: 'f'.repeat(64) });
  assert.equal(bad.status, 503); assert.equal(bad.provider.length, 0);
  const none = await route({ split: true, noBucket: true });
  assert.equal(none.status, 503); assert.equal(none.provider.length, 0);
});
test('R2-split exam: user without entitlement or enrollment gets 403 and no provider call', async () => {
  const x = await route({ split: true, noAccess: true });
  assert.equal(x.status, 403); assert.equal(x.provider.length, 0); assert.equal(x.reservations.length, 0);
});
test('daily CHF exhaustion stays pending/null and makes zero provider calls', async () => {
  const x = await route({ reservation: { error: 'daily_limit_exceeded', dailyLimitChf: 2, usedChf: 1.99 } });
  assert.equal(x.status, 429); assert.equal(x.data.status, 'pending'); assert.equal(x.data.earned, null); assert.equal(x.data.resetTimezone, 'Europe/Zurich'); assert.equal(x.provider.length, 0);
});
test('cached grade costs no new provider calls', async () => {
  const x = await route({ reservation: { cached: true, result: { status: 'graded', earned: 1 } } });
  assert.equal(x.data.earned, 1); assert.equal(x.provider.length, 0);
});
test('failed provider stays pending/null and keeps conservative reservation', async () => {
  const x = await route({ providerFailure: true });
  assert.equal(x.data.status, 'pending'); assert.equal(x.data.earned, null); assert.equal(x.updates[0].status, 'failed'); assert.equal('cost_usd' in x.updates[0], false);
});
test('invalid provider evidence is never converted into zero or trusted grade', async () => {
  const a = assessment(); a.criteria[0].evidence = 'FAKE_EVIDENCE'; const x = await route({ outputs: [a] });
  assert.equal(x.status, 502); assert.equal(x.data.earned, null); assert.equal(x.data.status, 'pending');
});
test('blocked source solution requests no paid correction', async () => {
  const exam = syntheticExam(); exam.sections[0].questions[1].metadata.autoGradingBlocked = true;
  const x = await route({ exam }); assert.equal(x.data.status, 'review_required'); assert.equal(x.data.earned, null); assert.equal(x.reservations.length, 0); assert.equal(x.provider.length, 0);
});
test('two disagreeing independent provider responses remain review_required/null', async () => {
  const x = await route({ outputs: [assessment(), assessment(.5)] }); assert.equal(x.data.status, 'review_required'); assert.equal(x.data.earned, null); assert.equal(x.updates[0].status, 'review_required');
});
test('retryNonce changes reservation identity while base requests stay deterministic', async () => {
  const reservation = { cached: true, result: {} };
  const a = await route({ reservation }); const b = await route({ reservation });
  const c = await route({ reservation, request: { retryNonce: '00000000-0000-4000-8000-000000000002' } });
  assert.equal(a.reservations[0].p_request_hash, b.reservations[0].p_request_hash);
  assert.notEqual(a.reservations[0].p_request_hash, c.reservations[0].p_request_hash);
});
test('invalid retryNonce cannot start a paid request', async () => { const x = await route({ request: { retryNonce: 'bad' } }); assert.equal(x.status, 400); assert.equal(x.provider.length, 0); });
test('task context continuation works for arbitrary sibling question numbering', async () => {
  const exam = syntheticExam(); exam.sections[0].questions.unshift({ id: 'unusual-prior-97', text: 'CONTINUED_FACT_SENTINEL', context: 'FULL_PRIOR_CONTEXT_SENTINEL' });
  const x = await route({ exam }); const source = sourceOf(x.provider[0]);
  assert.ok(source.taskQuestions.some(q => q.text === 'CONTINUED_FACT_SENTINEL' && q.context === 'FULL_PRIOR_CONTEXT_SENTINEL'));
});

function functionText(name) {
  const match = new RegExp(`^  (?:async )?function ${name}\\(`, 'm').exec(front); assert.ok(match, name);
  const from = match.index; const tail = front.slice(from + 4); const next = /\n  (?:async )?function /.exec(tail);
  return front.slice(from, next ? from + 4 + next.index : undefined).trim();
}
const renderFunctions = ['_mergeExamContexts','_renderTextQ'].map(functionText).join('\n');
const renderer = vm.runInNewContext(`${renderFunctions}; ({_mergeExamContexts,_renderTextQ})`);
test('live renderer preserves complete long q.context and graphic without model-answer leak', () => {
  const context = 'CONTEXT_START ' + 'source fact '.repeat(5000) + 'CONTEXT_END';
  const html = renderer._renderTextQ({ id:'q', text:'QUESTION_END', context, points:1, modelAnswer:'HIDDEN_MODEL', imageHtml:'<img src="figure.png">' }, 1, 'Shared');
  assert.ok(html.includes('CONTEXT_END')); assert.ok(html.includes('QUESTION_END')); assert.ok(html.includes('figure.png')); assert.equal(html.includes('HIDDEN_MODEL'), false);
});
test('live renderer suppresses repeated shared and already embedded question contexts', () => {
  const q = { id:'q', text:'Question', context:'Shared\n\nFurther facts', points:1 };
  const html = renderer._renderTextQ(q, 1, 'Shared'); assert.equal(html.includes('Shared'), false); assert.ok(html.includes('Further facts'));
  assert.equal(renderer._renderTextQ({ ...q, context:'Shared' }, 1, 'Shared').includes('data-question-context'), false);
  assert.equal(renderer._renderTextQ({ ...q, text:'Question with complete local context', context:'complete local context' },1).includes('data-question-context'),false);
});
test('review merges shared and q-level context without duplicate blocks', () => {
  assert.equal(renderer._mergeExamContexts('Shared', 'Shared\nAdditional', 'Additional'), 'Shared\nAdditional');
  assert.equal(renderer._mergeExamContexts('Shared', 'Additional'), 'Shared\n\nAdditional');
});
test('immediate and historical review include shared+question context and original graphics', () => {
  assert.ok(functionText('startReview').includes('section?.context || context, q.context'));
  assert.ok(functionText('startHistoricalReview').includes('_mergeExamContexts(sec.context, q.context)'));
  assert.ok(functionText('_renderReviewCard').includes('q.imageHtml'));
  assert.ok(functionText('_renderReviewCard').includes("ungraded ? 'Bewertung ausstehend'"));
});
test('saved pending answers keep null percentage rather than technical zero', () => {
  assert.match(front,/score_pct: pending \? null : pct/);
  assert.match(front,/score_pct: totals.pct, grading_status: totals.pending \? 'pending' : 'graded'/);
});
test('SQL reserves under one lock, enforces Zurich daily2CHF cap and keeps premium server-only', () => {
  assert.match(sql,/pg_advisory_xact_lock/); assert.match(sql,/Europe\/Zurich/); assert.match(sql,/coalesce\(day_limit,2\)/);
  assert.match(sql,/coalesce\(cost_usd,reserved_usd\)/); assert.match(sql,/daily_spent\+p_reserved_usd\*p_usd_chf_rate>day_limit/);
  assert.match(sql,/REVOKE ALL ON public.k_ai_entitlements FROM anon,authenticated/);
  assert.match(sql,/REVOKE ALL ON FUNCTION.*FROM PUBLIC,anon,authenticated/);
});
test('all eight exam JSONs retain unique IDs, source refs, bounded rubrics and original durations', async () => {
  const dir = new URL('../content/exams/', import.meta.url);
  const files = (await readdir(dir)).filter(x => /^busta-.*\.json$/.test(x)); assert.equal(files.length,8);
  const ids = new Set();
  for (const file of files) {
    const exam = JSON.parse(await readFile(new URL(file,dir),'utf8'));
    assert.equal(exam.course,'BuSta'); assert.equal(exam.totalPoints,180); assert.equal(exam.durationMinutes,180);
    let total=0;
    for (const section of exam.sections) {
      let sectionTotal=0;
      for (const q of section.questions) {
        assert.equal(ids.has(q.id),false,q.id); ids.add(q.id); assert.ok(q.text,q.id); assert.ok(q.metadata?.sourcePages?.length,q.id);
        assert.ok(q.modelAnswer || q.metadata?.autoGradingBlocked,q.id);
        const rs=q.gradingRubric; assert.ok(Array.isArray(rs)&&rs.length,q.id);
        const sum=rs.reduce((n,r)=>n+r.maxPoints,0); const groups=q.metadata?.scoringGroups||[];
        const capped=groups.reduce((n,g)=>n-Math.max(0,rs.filter(r=>(g.rubricIds||[]).includes(r.id)).reduce((x,r)=>x+r.maxPoints,0)-g.maxPoints),sum);
        assert.equal(capped,q.points,q.id); sectionTotal+=q.points;
      }
      assert.equal(sectionTotal,section.points,`${file}/${section.id}`); total+=sectionTotal;
    }
    assert.equal(total,exam.totalPoints,file);
  }
});

test('shared task graphic is passed visually even when stored on a sibling question', async () => {
  const exam=syntheticExam(); exam.sections[0].questions[0].imageAsset='assets/exams/busta-fs20/fig-schmid-a1-justizinitiative.png';
  const x=await route({exam}); const content=x.provider[0].input.find(y=>y.role==='user').content;
  assert.ok(Array.isArray(content)); assert.ok(content.some(y=>y.type==='input_image'&&y.image_url.endsWith('/fig-schmid-a1-justizinitiative.png')));
});
test('unsafe task graphic path cannot create arbitrary provider URL fetches', async () => {
  const exam=syntheticExam(); exam.sections[0].questions[1].imageAsset='assets/exams/busta-fs20/../../secrets.png';
  const x=await route({exam}); assert.equal(typeof x.provider[0].input.find(y=>y.role==='user').content,'string');
});
test('runtime immediate review preserves commas, full source contexts and pending status', () => {
  const overlay={innerHTML:'',scrollTop:0};
  const q={id:'q1',type:'open',text:'Full question\nFINAL_LINE',context:'Q_CONTEXT_END',points:1,imageHtml:'<img src="ORIGINAL_FIGURE.png">'};
  const sandbox={document:{getElementById:()=>overlay},window:{LernsetEngine:{renderMathIn(){}}}};
  const code=`let _reviewItems=[],_reviewIdx=0,_reviewCourse=''; const _currentEntry={course:'BuSta'}; const _lastResults={sections:[{section:{context:'SECTION_CONTEXT'},questions:[{q:${JSON.stringify(q)},userAnswer:'Art. 29, Abs. 2 <img src=x>',isCorrect:null,correct:[],explanation:'',modelAnswer:''}]}]}; const _gradeEscape=x=>String(x).replaceAll('<','&lt;').replaceAll('>','&gt;'); ${functionText('_mergeExamContexts')}\n${functionText('startReview')}\n${functionText('_renderReviewCard')}\nstartReview();`;
  vm.runInNewContext(code,sandbox);
  assert.ok(overlay.innerHTML.includes('SECTION_CONTEXT')); assert.ok(overlay.innerHTML.includes('Q_CONTEXT_END')); assert.ok(overlay.innerHTML.includes('FINAL_LINE')); assert.ok(overlay.innerHTML.includes('ORIGINAL_FIGURE.png'));
  assert.ok(overlay.innerHTML.includes('Art. 29, Abs. 2 &lt;img')); assert.ok(overlay.innerHTML.includes('Bewertung ausstehend')); assert.equal(overlay.innerHTML.includes('>Falsch<'),false);
});
test('persisted resume keeps attempt UUID and successful grades rather than inserting another attempt', () => {
  const resume=functionText('resumeAIGrading'); assert.match(resume,/id: row.id/); assert.match(resume,/previousGrades:/); assert.match(resume,/_renderResults\(results, false, ref\)/);
  const render=functionText('_renderResults'); assert.match(render,/if \(resumeRef\)/);
  const grade=functionText('_gradeOpenQuestionsWithAI'); assert.match(grade,/previousGrades/);
});

test('exam-solutions releases only model answer and explanation, only after an attempt and with course access', async () => {
  const { onRequestPost } = await import('../functions/api/exam-solutions.js');
  const keys = [{ question_id: '_exam', key: { _validation: ['x'] } }, { question_id: 'q1', key: { modelAnswer: 'MODEL', explanation: 'EXPL', gradingRubric: [{ id: 'SECRET_RUBRIC' }], metadata: { gradingPolicy: 'SECRET_POLICY' } } }, { question_id: 'q2', key: { explanation: 'ONLY_EXPL' } }];
  const run = async ({ attempts = [{ id: 1 }], access = true } = {}) => {
    const saved = globalThis.fetch;
    globalThis.fetch = async url => {
      const u = String(url);
      if (u.endsWith('/auth/v1/user')) return Response.json({ id: 'u1' });
      if (u.includes('/rest/v1/k_exams?')) return Response.json([{ content_key: 'exams/busta/busta-fs99.v1.json', course: 'BuSta' }]);
      if (u.endsWith('/rpc/k_has_course_access')) return Response.json(access);
      if (u.includes('/rest/v1/exam_results?')) return Response.json(attempts);
      if (u.includes('/rest/v1/k_exam_keys?')) return Response.json(keys);
      throw new Error('Unexpected network request blocked by test harness');
    };
    try {
      const res = await onRequestPost({ request: new Request('https://app.invalid/api/exam-solutions', { method: 'POST', headers: { Authorization: 'Bearer t' }, body: JSON.stringify({ examId: 'busta-fs99' }) }), env: { SUPABASE_URL: 'https://mock.supabase.invalid', SUPABASE_SERVICE_ROLE_KEY: 'x' } });
      return { status: res.status, data: await res.json() };
    } finally { globalThis.fetch = saved; }
  };
  const ok = await run();
  assert.equal(ok.status, 200); assert.deepEqual(ok.data.solutions, { q1: { modelAnswer: 'MODEL', explanation: 'EXPL' }, q2: { explanation: 'ONLY_EXPL' } });
  assert.equal(JSON.stringify(ok.data).includes('SECRET'), false);
  assert.equal((await run({ attempts: [] })).status, 403);
  assert.equal((await run({ access: false })).status, 403);
});

// ── Web client: R2 content loading, hash pinning, offline cache, entitlement lock ──
function splitClient({ fetchImpl }) {
  const store = new Map();
  const sandbox = { crypto: globalThis.crypto, TextEncoder, Date, JSON, Promise, Object, Error, String, Uint8Array, console,
    window: { K_EXAM_CONTENT_URL: 'https://content.invalid/', supabaseClient: { auth: { getSession: async () => ({ data: { session: { access_token: 'jwt' } } }) } } },
    fetch: (...args) => fetchImpl(...args), store };
  const code = `
    const _cacheGet = async key => store.get(key);
    const _cachePut = async (key, value) => { store.set(key, structuredClone(value)); };
    const _cacheDelete = async key => { store.delete(key); };
    ${['_sha256Hex', '_loadSplitContent', '_applySolutions'].map(functionText).join('\n')}
    ({ _loadSplitContent, _applySolutions })`;
  sandbox.structuredClone = structuredClone;
  return { ...vm.runInNewContext(code, sandbox), store };
}
const publicDoc = JSON.stringify({ id: 'busta-fs99', sections: [{ questions: [{ id: 'q1', text: 'Frage' }] }] });
const publicHash = Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(publicDoc))).toString('hex');
const entry = { id: 'busta-fs99', contentKey: 'exams/busta/busta-fs99.v1.json', contentHash: publicHash, contentVersion: 1 };
test('client loads from worker with JWT, pins sha256, caches and then works offline', async () => {
  const calls = []; let offline = false;
  const c = splitClient({ fetchImpl: async (url, init) => { calls.push([url, init.headers.Authorization]); if (offline) throw new TypeError('offline'); return new Response(publicDoc, { status: 200 }); } });
  assert.equal((await c._loadSplitContent(entry)).id, 'busta-fs99');
  assert.deepEqual(calls[0], ['https://content.invalid/exams/busta/busta-fs99.v1.json', 'Bearer jwt']);
  offline = true;
  assert.equal((await c._loadSplitContent({ ...entry, contentHash: 'f'.repeat(64) })).id, 'busta-fs99', 'offline falls back to last cached version');
  assert.equal((await c._loadSplitContent(entry)).id, 'busta-fs99'); assert.equal(calls.length, 2);
});
test('client rejects content whose hash differs and never caches it', async () => {
  const c = splitClient({ fetchImpl: async () => new Response(publicDoc + ' ', { status: 200 }) });
  await assert.rejects(() => c._loadSplitContent(entry), /Prüfsumme/); assert.equal(c.store.size, 0);
});
test('client locks cached content on 403 and when the entitlement has expired', async () => {
  const c = splitClient({ fetchImpl: async () => new Response('', { status: 403 }) });
  c.store.set('exam:busta-fs99', { hash: 'other', until: null, data: JSON.parse(publicDoc) }); c.store.set('sol:busta-fs99', { hash: publicHash, solutions: {} });
  await assert.rejects(() => c._loadSplitContent(entry), /Berechtigung/); assert.equal(c.store.size, 0);
  const expired = splitClient({ fetchImpl: async () => { throw new TypeError('offline'); } });
  expired.store.set('exam:busta-fs99', { hash: publicHash, until: '2020-01-01T00:00:00Z', data: JSON.parse(publicDoc) });
  await assert.rejects(() => expired._loadSplitContent(entry), /offline noch nicht geladen/);
});
test('client attaches solutions only from the server and without any rubric', async () => {
  const c = splitClient({ fetchImpl: async (url) => { assert.equal(url, '/api/exam-solutions'); return Response.json({ solutions: { q1: { modelAnswer: 'MODEL', explanation: 'EXPL' } } }); } });
  const data = JSON.parse(publicDoc);
  assert.equal(await c._applySolutions(entry, data), true);
  assert.equal(data.sections[0].questions[0].model_answer, 'MODEL'); assert.equal(data.sections[0].questions[0].explanation, 'EXPL');
  assert.equal(c.store.get('sol:busta-fs99').hash, publicHash);
});
