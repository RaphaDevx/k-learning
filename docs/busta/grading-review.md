# BuSta grading implementation review

Review date: 2026-10-20. Scope: `functions/api/grade-answer.js`, `docs/busta/grading-schema.sql`, `js/screens/exam.js`, and all eight `content/exams/busta-*.json` files. This review uses local source inspection and fully mocked HTTP tests. It makes no billable provider calls and does not execute database mutations.

## Evidence

`node --test scripts/check-busta-grading.mjs`: **37 tests passed, 0 failed**. `node --check js/screens/exam.js`: passed. The test file imports the actual current grading endpoint, replaces every HTTP call with a mock, and rejects unexpected network destinations. The frontend rendering checks execute actual extracted renderer functions against long question contexts and a simulated review DOM.

Coverage includes strict root/criterion response fields, duplicate/unknown/missing criteria, negative/excess/non-finite points, actual answer evidence, independent-pass disagreement, alternative group caps, trusted server question/solution selection, shared/question/prerequisite/sibling contexts, sibling vision assets and unsafe path rejection, cache hits, CHF limit rejection, conservative failed-call reservations, retry identities, blocked source solutions, persistent null grades, live and historical context handling, original graphics, pending review badges, and student-text HTML escaping.

All eight exam JSONs pass identifier, source-reference, duration, section-total and effective rubric-total checks. Each exam retains 180 minutes and 180 regular points. Group caps are included when checking effective rubric totals. Open questions have an official model answer or an explicit source block.

## Findings resolved during review

1. **Question context missing from the live question renderer.** `_renderTextQ` now displays full `q.context` and avoids repeating a shared section context or context already present in the original question text. No clipping or fixed-height container is applied to that source text.
2. **Immediate review lost the shared case.** The original review loop destructured `{questions, context}`, whereas `_scoreExam` returns `{section, questions}`. It now reads `section.context` and combines it with question context. Historical review uses the same complete-context merge.
3. **Review omitted original task graphics.** The review card now renders `q.imageHtml`, retaining the original exam graphic alongside the question.
4. **Pending review displayed “Falsch”.** Null correctness now renders an amber pending badge. Open-answer commas and punctuation remain intact, and student text is escaped before insertion into review HTML.
5. **Retry button originally reused the failed request identity.** The parent implementation now validates `retryNonce`, includes it in the reservation hash, and can resume the saved attempt UUID after a reload. Successful previously saved assessments are reused. Regression tests cover nonce identity and the saved-attempt wiring.
6. **Insufficient local response validation.** The parent endpoint now rejects missing/wrongly typed required fields and unexpected root/criterion fields, preventing extra model fields from entering persisted results.
7. **Shared original task image absent from later questions' vision payload.** The parent now includes validated deduplicated image assets from the entire shared task. A regression uses an image stored on a sibling question, as in the FS20 Justiz-Initiative poster.

## Cost and authorization assessment

The endpoint authenticates the Supabase bearer token against the auth user API and obtains the original question, solution and rubric from the server-side exam row. Client-supplied solution/rubric fields cannot replace those sources. Provider/service credentials remain on the server. The client receives neither a source modelAnswer property nor arbitrary provider response properties.

The SQL reservation function serializes budget reservations using a transaction advisory lock. It includes previous actual cost or outstanding conservative reservations in the user's **2 CHF daily limit**, calculated by calendar date in `Europe/Zurich`. An active server-managed entitlement may increase that limit. Authenticated users have read-only access to their own entitlement/job rows; they cannot grant themselves premium or invoke the reservation function. The payer is centrally fixed to `platform`. The optional project monthly USD cap is additional.

Provider failures and uncertain grading keep `earned:null`; persisted attempts retain `score_pct:null`. An incomplete possibly billable provider call retains its conservative reservation. A successful cached request starts no provider calls. Two marking passes are billed and recorded using returned usage. Different criterion scores never become an averaged final grade; they require review.

The SQL cap checks in this review are structural source checks, not a live concurrent SQL integration test. The exchange-rate multiplier is deployment configuration (`AI_USD_CHF_RATE`, default 1); the displayed CHF cost follows that configured accounting rate. No assertion is made here that the deployment rate is a live foreign-exchange quote.

## Fairness and limitations

- Official selection limits must override naive rubric sums. FS20 Schindler 4.4 preserves a maximum of four points for its main part, despite four valid two-point routes; two fully developed routes suffice. FS23 contains an explicit alternative group cap. The large fundamental-rights cases preserve official 10/20 group weights.
- Historical questions must use the source's original legal context. This includes deliberately modified statutes and historically dated parliamentary facts. A current-law correction would be inappropriate.
- Officially accepted opposing legal positions remain creditable. Two calls to the same model test consistency; agreement does not establish legal correctness or match an HSG examiner's grading distribution.
- FS20 q10 and NH23 q04 are explicitly blocked where the original gives marking instructions without enough substantive answer content. Derived granular weights elsewhere are labeled; their calibration against independently marked sample answers remains required before claiming official-exam equivalence.
- Source model answers and original solution PDFs are learning resources. The exam UI suppresses the original solved PDF link during an attempt; this is a study platform, not a secure proctored examination system. Full exam content remains available to the authorized learner.
- The offline regression suite does not certify provider model availability, live deployment secrets, production database policy installation, an actual provider response, or human legal grading reliability. Those require separate deployment checks and a subject-expert benchmark.

No unresolved critical defect was reproduced in the reviewed local implementation after the fixes above. Keep the calibration and deployment limitations visible rather than interpreting the passing technical tests as HSG grading certification.
