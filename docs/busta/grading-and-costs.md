# BuSta automatic marking and costs

## Source standard
All eight original exams retain their original task wording, facts, official solutions, point totals and timing. Official granular marks are distinguished from derived training subdivisions. Work remains labelled draft pending human calibration; no official HSG grade scale is invented. Source tasks are on HSG Assessment level. Two questions lack sufficient official substantive answers and therefore require human review. Historical legal context is preserved. Explicit bonuses are shown for separate review and not silently folded into the base marks.

## Request contract
Authenticated client sends examId, questionId and answer. The server loads the authoritative question, task/prerequisite facts, original poster if applicable, solution and rubric from k_exams.content. Client solutions/marks are ignored. Criterion outputs contain bounded points, an actual answer quotation, a reason and missing content. A structured JSON schema plus local validation rejects invented evidence, invalid scores and incomplete criteria. Two independent GPT-6.1 Sol passes must agree on criterion marks; disagreement/uncertainty remains review_required with no definitive total. A technical failure stays pending. Saved attempts resume from history after reload or a daily reset without silently charging for already successful grades.

Prompt: functions/api/grade-answer.js, GRADING_POLICY and PROMPT_VERSION. This is training feedback, not an assertion of calibrated HSG examiner equivalence. Before such a claim, use human-marked full/partial/alternative/wrong/blank answers across topics, blind-mark them, measure per-criterion disagreement and systematic bias, then resolve the rubric with a qualified subject reviewer.

## Central billing and quotas
The owner supplies the server OpenAI project key. Every authenticated user receives 2 CHF of internal API budget per Europe/Zurich calendar day. This is a subsidized usage budget, not a charge to the student. Each request atomically reserves the maximum expected upstream cost for both passes; concurrent requests cannot independently spend the same remaining budget. Once usage is known, unused reserve is released. Failed/unknown upstream usage retains a conservative reserve rather than allowing an unnoticed overspend. Repeated identical successful requests use cached grades. A per-user rate cap additionally limits new requests.

OpenAI bills in USD. Budget conversion is deliberately conservative at configured 1 USD = 1 CHF (AI_USD_CHF_RATE=1); displayed CHF values represent budget debits, not a claim about an exact card FX settlement rate. A live FX/feed integration and card fees are not included. A project-wide monthly ceiling can additionally be set with AI_MONTHLY_BUDGET_USD.

Standard short-context rates verified 2026-10-20: GPT-6.1 Sol $2 per million input tokens and $10 per million output tokens; GPT-6 Astra $10/$50. Current runtime defaults to two GPT-6.1 Sol high-reasoning passes. Astra is an optional server-selected model, not an automatic third pass. Source: https://developers.openai.com/api/docs/pricing and https://developers.openai.com/api/docs/models .

Illustration, not a measured exam quote: 100,000 billed input tokens plus 20,000 output tokens cost $0.40 for one Sol pass, $0.80 for two such passes. Reasoning/output tokens, repeated task contexts, images and retries affect actual use. Provider usage is recorded per correction. Native builds and exam preparation do not use this runtime grading key.

## Secure setup
On the server as Raphael:

```bash
kvault put klearning OPENAI_API_KEY
kvault list | rg 'klearning/OPENAI_API_KEY'
```

Paste only into the hidden prompt. Send the item/fingerprint confirmation, never the secret. Create a dedicated OpenAI API project with API billing, a service-account/project key and only required model/API permissions; configure project spending controls separately. A ChatGPT subscription is not the deployed API credential.

Administrator transfers the vault value directly to protected production Pages settings with:

```bash
sudo python3 scripts/configure-grading-server.py
sudo -u claude bash scripts/deploy-web.sh main
```

The script never prints secrets, stores no exported key file, and preserves existing project auth settings while adding the desktop PKCE callback. Keys do not appear in exam JSON, client code, DMG or source control.

## Premium foundation
Only backend service credentials may write k_ai_entitlements. An active nonexpired entitlement supplies a higher daily CHF limit; expiry returns to the free 2 CHF cap. A verified subscription webhook can populate this table later. No price, checkout or recurring charge is activated without a configured product. At the limit, the app honestly says Premium is in preparation; no nonworking purchase button. The existing billing worker is not falsely claimed to be connected to this new allowance.
