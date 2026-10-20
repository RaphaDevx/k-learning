# ADR 0002: Exam content on private R2, solutions in Supabase

## Status
Accepted 2026-10-20 (Raphael). Scope: new exams (BuSta) first; existing `k_exams.content` rows migrate later. Supersedes the "content only in Supabase" part of the 2026-10-15 content split.

## Context
Exam documents are 100-190 KB each and carry solutions. Supabase writes through `kvault sql` stop working above ~32 KB, the course must be public while its content sits behind a paywall, and exams must be fillable offline.

## Decision
- **R2 (private bucket, no public URL)** holds the public part of each exam: `exams/<course>/<id>.v<N>.json`, immutable, version in the name. Built by `scripts/build-r2-exams.mjs` into `build/r2-exams/` with `SHA256SUMS` and `manifest.json`.
- **Supabase `k_exams`** keeps one small row per exam (title, course, duration, points, `content_version`, `content_key`, `content_hash`; `content` NULL). **`k_exam_keys`** keeps model answers, explanations, rubrics and grading metadata (server only, no client grant). **`k_course_entitlements`** and `k_has_course_access()` decide who may read content (active entitlement, or enrollment in a secret course).
- **Access** only through the Cloudflare entitlement worker (built and deployed by K-Dev): the app sends the Supabase JWT, the worker checks `k_has_course_access` and streams the R2 object, optionally with `X-Entitlement-Until`.
- **Grading** (`functions/api/grade-answer.js`) reads the public file from the R2 binding `EXAM_CONTENT`, verifies `content_hash`, merges `k_exam_keys` and grades as before. **`functions/api/exam-solutions.js`** releases only model answer and explanation, and only after the user has a saved attempt. Rubrics never reach the client.
- **Offline**: the web client loads once with entitlement, caches content (IndexedDB, keyed by hash), keeps the answer draft in localStorage, queues the result (`kl_pending_results_v1`) and sends it when online. A 403 or an expired `X-Entitlement-Until` locks the cache.
- Multiple-choice `correct` stays in the public file (needed for offline scoring). The course stays private (`is_public=false`, `is_secret=true`) until Raphael releases it.

## Consequences
Small SQL statements, no content-size limit in Supabase, paywall without public URLs, offline use. Costs: a worker to run, a second storage location, solutions need a network round trip after submission (cached afterwards). `k_exams.title` stays readable for every logged-in user. The native app does not yet load R2 exams.

## Reversal
Store the merged document back into `k_exams.content` (set `content_key` NULL); the client and `grade-answer` still read the legacy form.
