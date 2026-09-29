# Graph Report - .  (2026-07-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 759 nodes · 1167 edges · 98 communities (90 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `84be27e6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- flashcards.js
- exam.js
- dependencies
- profile.js
- VideoCard.tsx
- lernset.js
- feed.js
- ai-chat.js
- quiz.js
- expo
- repetition.js
- revenuecat.ts
- lernset-engine.js
- gemini-live.js
- courseHub.js
- level-system.js
- lernen.js
- package.json
- pipeline.py
- compilerOptions
- state.js
- tsconfig.json
- billing.js
- courses-db.js
- report-system.js
- dashboard.js
- tab-router.js
- learnPath.js
- progress.js
- session-sync.js
- ai-service.js
- auth.js
- esf_deploy.py
- statistik_deploy.py
- topics.js
- migrate-to-r2.sh
- App
- flashcards.tsx
- esf_run.sh
- brand.js
- transcode_hls.sh
- upload_r2.sh

## God Nodes (most connected - your core abstractions)
1. `showExercise()` - 13 edges
2. `_renderCourseCard()` - 13 edges
3. `expo` - 13 edges
4. `_setTxt()` - 12 edges
5. `_commitSwipe()` - 12 edges
6. `_render()` - 11 edges
7. `_fetchMore()` - 10 edges
8. `showCard()` - 10 edges
9. `_enterGeminiMode()` - 10 edges
10. `run_pipeline()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `fetch()` --calls--> `handleRevenueCat()`  [EXTRACTED]
  workers/billing/src/index.ts → workers/billing/src/revenuecat.ts
- `fetch()` --calls--> `handleStripe()`  [EXTRACTED]
  workers/billing/src/index.ts → workers/billing/src/stripe.ts
- `handleRevenueCat()` --calls--> `logBillingEvent()`  [EXTRACTED]
  workers/billing/src/revenuecat.ts → workers/billing/src/supabase.ts
- `handleRevenueCat()` --calls--> `upsertEntitlement()`  [EXTRACTED]
  workers/billing/src/revenuecat.ts → workers/billing/src/supabase.ts
- `handleStripe()` --calls--> `logBillingEvent()`  [EXTRACTED]
  workers/billing/src/stripe.ts → workers/billing/src/supabase.ts

## Import Cycles
- None detected.

## Communities (98 total, 8 thin omitted)

### Community 0 - "flashcards.js"
Cohesion: 0.07
Nodes (68): _addReportedCard(), _audioCtx(), _autoStartRecognition(), _clozeFront(), _commitSwipe(), _currEl(), _ensureCardsLoaded(), _ensureMic() (+60 more)

### Community 1 - "exam.js"
Cohesion: 0.06
Nodes (46): abortExam(), _callAIGrader(), closeResults(), _enrolledCourses(), _getUserId(), _gradeFromPct(), _gradeOpenQuestionsWithAI(), init() (+38 more)

### Community 2 - "dependencies"
Cohesion: 0.05
Nodes (40): expo, expo-auth-session, expo-linking, expo-router, expo-status-bar, expo-system-ui, expo-video, expo-web-browser (+32 more)

### Community 3 - "profile.js"
Cohesion: 0.12
Nodes (36): _detailsToggleHtml(), _etappeBarHtml(), _etappePct(), _examBannerHtml(), _examHistoryHtml(), _examIdToCourse(), _gradeFromPct(), _handleUpload() (+28 more)

### Community 4 - "VideoCard.tsx"
Cohesion: 0.09
Nodes (14): styles, plugins, Stats, styles, { height: SCREEN_HEIGHT }, styles, styles, FeedCard (+6 more)

### Community 5 - "lernset.js"
Cohesion: 0.15
Nodes (24): close(), handleAction(), openAiCheck(), openSkip(), _render(), _renderMultiple(), _renderOpen(), _renderOrder() (+16 more)

### Community 6 - "feed.js"
Cohesion: 0.15
Nodes (24): _appendCards(), _destroyObserver(), _fetchMore(), _flashIndicator(), _getUserId(), init(), _initModelCards(), _initObserver() (+16 more)

### Community 7 - "ai-chat.js"
Cohesion: 0.15
Nodes (20): _appendMsg(), _appendThinking(), _buildSystem(), _callOR(), clearExternalContext(), close(), _getCardContext(), getKey() (+12 more)

### Community 8 - "quiz.js"
Cohesion: 0.15
Nodes (16): _applyChoiceColor(), _bindSwipe(), _choiceStyle(), closeSelector(), _feedbackHtml(), launch(), nextQuestion(), previousQuestion() (+8 more)

### Community 9 - "expo"
Cohesion: 0.09
Nodes (21): backgroundColor, foregroundImage, adaptiveIcon, package, predictiveBackGestureEnabled, typedRoutes, expo, android (+13 more)

### Community 10 - "repetition.js"
Cohesion: 0.20
Nodes (18): closeReview(), deleteItem(), _filtered(), getPendingCount(), init(), keepAndNext(), _loadItems(), markDone() (+10 more)

### Community 11 - "revenuecat.ts"
Cohesion: 0.23
Nodes (15): fetch(), handleRevenueCat(), mapEntitlements(), mapEvent(), RevenueCatEvent, RevenueCatPayload, storeToSource(), handlePrepaidTopup() (+7 more)

### Community 12 - "lernset-engine.js"
Cohesion: 0.16
Nodes (8): checkTrueFalse(), escHtml(), feedbackBadge(), renderMathIn(), renderOptionsList(), renderTfList(), updateTfButtons(), verdict()

### Community 13 - "gemini-live.js"
Cohesion: 0.21
Nodes (8): connect(), disconnect(), getKey(), isAvailable(), PCMPlayer, startMic(), stopMic(), stopPlayback()

### Community 14 - "courseHub.js"
Cohesion: 0.24
Nodes (14): _courseColor(), _examCountdown(), _getCourse(), init(), _render(), _renderExams(), _renderFeed(), _renderFlashcards() (+6 more)

### Community 15 - "level-system.js"
Cohesion: 0.30
Nodes (13): award(), _debouncedSync(), getDailyInfo(), getLevelInfo(), _getUserId(), init(), _rawAddXP(), render() (+5 more)

### Community 16 - "lernen.js"
Cohesion: 0.26
Nodes (14): _contentArea(), _courseSlider(), _empty(), _firstEnrolled(), init(), _modeToggle(), _render(), _renderKarten() (+6 more)

### Community 17 - "package.json"
Cohesion: 0.13
Nodes (14): @cloudflare/workers-types, devDependencies, @cloudflare/workers-types, typescript, wrangler, typescript, name, private (+6 more)

### Community 18 - "pipeline.py"
Cohesion: 0.37
Nodes (12): Anthropic, Path, deploy_reels(), generate_flashcards(), generate_reel_script(), git_commit(), insert_flashcards_into_file(), load_course() (+4 more)

### Community 19 - "compilerOptions"
Cohesion: 0.15
Nodes (12): @cloudflare/workers-types, ES2022, src/**/*, compilerOptions, lib, module, moduleResolution, noEmit (+4 more)

### Community 21 - "state.js"
Cohesion: 0.23
Nodes (5): save(), set(), setCardProgress(), setLernsetProgress(), update()

### Community 23 - "tsconfig.json"
Cohesion: 0.20
Nodes (9): compilerOptions, paths, strict, extends, include, expo/tsconfig.base, .expo/types/**/*.d.ts, **/*.ts (+1 more)

### Community 24 - "billing.js"
Cohesion: 0.33
Nodes (5): canUseAI(), hasByok(), isPro(), requireAI(), _showPaywall()

### Community 25 - "courses-db.js"
Cohesion: 0.36
Nodes (7): getAvailableCourses(), getEnrolledKeys(), _getUser(), _loadCatalog(), _loadEnrolled(), _mergeRow(), saveEnrollment()

### Community 26 - "report-system.js"
Cohesion: 0.28
Nodes (4): close(), _fetchAllReported(), getReportedIds(), submit()

### Community 27 - "dashboard.js"
Cohesion: 0.42
Nodes (7): daysUntil(), init(), renderCourseGrid(), renderDueToday(), saveCourses(), _staggerCards(), updateGreeting()

### Community 28 - "tab-router.js"
Cohesion: 0.39
Nodes (5): back(), _highlightNav(), navigateTo(), _render(), tapTab()

### Community 29 - "learnPath.js"
Cohesion: 0.52
Nodes (6): _buildNodes(), _enrolledCourses(), init(), _nodeHTML(), _render(), _renderCourseSection()

### Community 30 - "progress.js"
Cohesion: 0.52
Nodes (6): init(), _render(), _renderDailyGoal(), _renderLevelTree(), _renderStudiengang(), _renderTodos()

### Community 31 - "session-sync.js"
Cohesion: 0.43
Nodes (4): clear(), load(), save(), _userId()

### Community 34 - "esf_deploy.py"
Cohesion: 0.60
Nodes (5): build_entry(), get_duration(), main(), update_feed(), upload_video()

### Community 35 - "statistik_deploy.py"
Cohesion: 0.60
Nodes (5): build_entry(), get_duration(), main(), update_feed(), upload_video()

### Community 36 - "topics.js"
Cohesion: 0.60
Nodes (3): init(), render(), selectCourse()

### Community 37 - "migrate-to-r2.sh"
Cohesion: 0.70
Nodes (4): phase1_download(), phase2_upload(), phase3_patch_urls(), migrate-to-r2.sh script

## Knowledge Gaps
- **77 isolated node(s):** `KBrand`, `styles`, `name`, `slug`, `version` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `expo` connect `expo` to `VideoCard.tsx`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `plugins` connect `VideoCard.tsx` to `expo`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `_renderCourseCard()` (e.g. with `_etappeBarHtml()` and `_topicWeightAccuracy()`) actually correct?**
  _`_renderCourseCard()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `KBrand`, `styles`, `name` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `flashcards.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06886338393187708 - nodes in this community are weakly interconnected._
- **Should `exam.js` be split into smaller, more focused modules?**
  _Cohesion score 0.060109289617486336 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._