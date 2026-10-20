# ADR 0001: Source-based rubric grading for BuSta

## Status
Accepted for implementation; calibration against human-marked answers remains required before claiming HSG-equivalent reliability.

## Context
The existing browser grader submits a short prompt and returns a total mark. It omits shared case context and treats provider failures as zero. Original Swiss constitutional law exams use partial credit, reasoned alternatives, historical legal context and occasional bonuses.

## Decision
Keep verbatim original questions, official answers and provenance in exam JSON. Add explicit criterion rubrics; distinguish official point allocations from inferred subdivisions. Grade on the authenticated server using canonical content, two independent structured assessments and server-side validation. Display disagreements and uncertain legal alternatives as review required. Use original-year law and marking instructions. Track usage and reserve worst-case costs atomically before any billed call. Keep API/service keys off the client. Initial training marks do not claim to be official university grades.

## Consequences
Richer, auditable feedback and bounded credit. Extra model passes cost more and do not replace evaluation against human marks. Uncertain source allocations and bonuses remain explicit. Desktop uses the same hosted application and grading endpoint.

## Reversal
Disable the BuSta grading endpoint and retain source exams and their model answers for self-review; never convert a failed job to a zero-point mark.
