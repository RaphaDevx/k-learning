# Graph Report - K-Learning  (2026-08-15)

## Corpus Check
- 164 files · ~454,943 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1135 nodes · 1588 edges · 140 communities (113 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0728bb4`
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
- router.js
- flashcards.tsx
- esf_run.sh
- brand.js
- transcode_hls.sh
- upload_r2.sh
- [id].tsx
- K-Learning — Brand & Design System Guide
- What You Must Do When Invoked
- K-Learning — App Store Roadmap
- OM_24HS_Exam_fdb44da3.md
- Makro II — Kurskontext (HSG FS26)
- OM_20FS_Exam_dd6169c6.md
- dependencies
- Fonts — Self-Hosting Guide
- K-Learning — Pre-Deploy Checklist
- graphify reference: extra exports and benchmark
- Maestro UI Tests
- Benötigte Dateien
- graphify reference: query, path, explain
- UI Icons
- devDependencies
- K-OCR / Content Generation Pipeline (Archiviert)
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- create-course.js
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- CLAUDE.md
- extraction-spec.md
- expo-constants
- expo-linking
- expo-router
- expo-status-bar
- expo-system-ui
- @expo/vector-icons
- expo-web-browser
- react
- react-native
- @react-native-async-storage/async-storage
- react-native-reanimated
- react-native-safe-area-context
- react-native-url-polyfill
- react-native-worklets
- @supabase/supabase-js

## God Nodes (most connected - your core abstractions)
1. `Exam Builder v3 — Shareable Skill` - 24 edges
2. `expo` - 15 edges
3. `showExercise()` - 13 edges
4. `_renderCourseCard()` - 13 edges
5. `K-Learning — Brand & Design System Guide` - 13 edges
6. `_setTxt()` - 12 edges
7. `_commitSwipe()` - 12 edges
8. `expo-router` - 12 edges
9. `What You Must Do When Invoked` - 12 edges
10. `_render()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `showView()` --references--> `router`  [EXTRACTED]
  js/router.js → native/app.json
- `open()` --references--> `router`  [EXTRACTED]
  js/screens/courseHub.js → native/app.json
- `back()` --references--> `router`  [EXTRACTED]
  js/screens/courseHub.js → native/app.json
- `openCardDirect()` --references--> `router`  [EXTRACTED]
  js/screens/flashcards.js → native/app.json
- `openForTopic()` --references--> `router`  [EXTRACTED]
  js/screens/flashcards.js → native/app.json

## Import Cycles
- None detected.

## Communities (140 total, 27 thin omitted)

### Community 0 - "flashcards.js"
Cohesion: 0.07
Nodes (68): _addReportedCard(), _audioCtx(), _autoStartRecognition(), _clozeFront(), _commitSwipe(), _currEl(), _ensureCardsLoaded(), _ensureMic() (+60 more)

### Community 1 - "exam.js"
Cohesion: 0.06
Nodes (47): abortExam(), _callAIGrader(), closeResults(), _enrolledCourses(), _getUserId(), _gradeFromPct(), _gradeOpenQuestionsWithAI(), init() (+39 more)

### Community 2 - "dependencies"
Cohesion: 0.22
Nodes (8): main, name, private, scripts, android, ios, start, version

### Community 3 - "profile.js"
Cohesion: 0.12
Nodes (36): _detailsToggleHtml(), _etappeBarHtml(), _etappePct(), _examBannerHtml(), _examHistoryHtml(), _examIdToCourse(), _gradeFromPct(), _handleUpload() (+28 more)

### Community 4 - "VideoCard.tsx"
Cohesion: 0.06
Nodes (33): styles, plugins, COLORS, Course, DashboardScreen(), EMOJIS, getGreeting(), Stats (+25 more)

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
Cohesion: 0.07
Nodes (29): backgroundColor, foregroundImage, adaptiveIcon, package, predictiveBackGestureEnabled, projectId, typedRoutes, expo (+21 more)

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
Cohesion: 0.18
Nodes (19): showView(), back(), _courseColor(), _examCountdown(), _getCourse(), _handleUpload(), init(), open() (+11 more)

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
Cohesion: 0.31
Nodes (8): createCourse(), getAvailableCourses(), getEnrolledKeys(), _getUser(), _loadCatalog(), _loadEnrolled(), _mergeRow(), saveEnrollment()

### Community 26 - "report-system.js"
Cohesion: 0.28
Nodes (4): close(), _fetchAllReported(), getReportedIds(), submit()

### Community 27 - "dashboard.js"
Cohesion: 0.33
Nodes (8): createCourse(), daysUntil(), init(), renderCourseGrid(), renderDueToday(), saveCourses(), _staggerCards(), updateGreeting()

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

### Community 39 - "router.js"
Cohesion: 0.04
Nodes (44): ═══════════════════════════════════════════════, 1. LaTeX-Formeln in Fragetext und Antworten, 2. imageHtml — Grafikformat frei wählbar, ═══════════════════════════════════════════════, 3. Grafik-Extraktions-Pipeline, ═══════════════════════════════════════════════, 4. Deployment-Ziel (Phase 4), 4A.1 Infrastruktur prüfen (+36 more)

### Community 41 - "flashcards.tsx"
Cohesion: 0.06
Nodes (34): 10. Flashcard-Streaming-Architektur (Zielzustand), 1. Architektur-Übersicht — Die 3 Schichten, 2.1 Tabelle: `videos` — Content-Katalog, 2.2 Tabelle: `video_progress` — SM-2 Lernfortschritt, 2.3 Tabelle: `exam_results` — Prüfungsergebnisse (geplant), 2.4 Tabelle: `topic_weights` — Themen-Schwächen-Profil ✅, 2. Datenbankschema, 3.1 `rate_video(p_user_id, p_video_id, p_rating)` — SM-2 Update (+26 more)

### Community 98 - "[id].tsx"
Cohesion: 0.10
Nodes (26): ExamScreen(), formatTime(), styles, formatDuration(), gradeColor(), gradeLabel(), ResultsScreen(), styles (+18 more)

### Community 99 - "K-Learning — Brand & Design System Guide"
Cohesion: 0.07
Nodes (27): 10. File-Struktur, 11. In-Session Checkliste, 12. Schnell-Referenz CSS-Variablen, 1. Identity, 2. Farbpalette, 3. Typografie — 3-Rollen-System, 4. Abstände (Spacing), 5. Border Radius (+19 more)

### Community 100 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 101 - "K-Learning — App Store Roadmap"
Cohesion: 0.11
Nodes (18): 2.1 EAS (Expo Application Services) einrichten, 2.2 eas.json kontrollieren, 2.3 Supabase Auth für Native App fixen (wichtig!), 2.4 app.json vervollständigen, 2.5 Pakete prüfen, App-Store-Texte (vorbereiten), Checkliste Kurzfassung, Icon ✅ (+10 more)

### Community 102 - "OM_24HS_Exam_fdb44da3.md"
Cohesion: 0.12
Nodes (15): Sheet: 10, Sheet: 11, Sheet: 12, Sheet: 16, Sheet: 17, Sheet: 18, Sheet: 22, Sheet: 23 (+7 more)

### Community 103 - "Makro II — Kurskontext (HSG FS26)"
Cohesion: 0.14
Nodes (13): Bekannte Daten nach Jahrgang, Beobachtungen, Einschätzung für Nachholprüfung HS25, Makro II — Kurskontext (HSG FS26), Prüfungsformat & Notengebung, Themenblock 1: Finanzmärkte & Zinsstruktur, Themenblock 2: IS-LM, Konsum & Investition, Themenblock 3: Offene Volkswirtschaft & Wechselkurse (+5 more)

### Community 104 - "OM_20FS_Exam_dd6169c6.md"
Cohesion: 0.14
Nodes (13): Sheet: 10, Sheet: 11, Sheet: 1a, Sheet: 2, Sheet: 3, Sheet: 4a, Sheet: 4b, Sheet: 5 (+5 more)

### Community 105 - "dependencies"
Cohesion: 0.15
Nodes (13): expo, expo-apple-authentication, expo-auth-session, expo-video, dependencies, expo, expo-apple-authentication, expo-auth-session (+5 more)

### Community 106 - "Fonts — Self-Hosting Guide"
Cohesion: 0.18
Nodes (10): CSS einbinden (in brand.css ergänzen), Dateien die hier hingehören, Download, Fonts — Self-Hosting Guide, Native App (Expo / React Native), Rolle 1 — UI: Nunito (aktuell: Google Fonts CDN), Rolle 2 — Academic Content: Latin Modern Roman (aktuell: jsDelivr CDN), Rolle 3 — Mono/Code: JetBrains Mono (aktuell: Google Fonts CDN) (+2 more)

### Community 107 - "K-Learning — Pre-Deploy Checklist"
Cohesion: 0.18
Nodes (10): Auth, Deployment-Prozess selbst, ⚠️ Feed-Algorithmus (ist schon ausgefallen), K-Learning — Pre-Deploy Checklist, KI-Chat, Lernkarten (Flashcards), Lernprofil (Profil-Tab), Navigation / Tab-Router (+2 more)

### Community 108 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 109 - "Maestro UI Tests"
Cohesion: 0.25
Nodes (7): EAS Build & Submit, Hinweis: Apple Sign-In, K-Learning Native — Dev Guide, Maestro UI Tests, Setup (einmalig), Test-Flows, Tests ausführen

### Community 110 - "Benötigte Dateien"
Cohesion: 0.29
Nodes (6): App Icons (PNG, kein transparenter BG — App Stores), Benötigte Dateien, Erstellen, Favicon, Identity Assets, Logo

### Community 111 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 112 - "UI Icons"
Cohesion: 0.40
Nodes (4): Empfohlene Quellen (Open Source), Konventionen, UI Icons, Verwendung in K-Learning (Vanilla JS)

### Community 113 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, @types/react, typescript, typescript, @types/react

### Community 114 - "K-OCR / Content Generation Pipeline (Archiviert)"
Cohesion: 0.40
Nodes (4): K-OCR / Content Generation Pipeline (Archiviert), Kurs-Configs, Reaktivierung, Was die Pipeline macht

### Community 115 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 116 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 117 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 118 - "create-course.js"
Cohesion: 0.83
Nodes (3): json(), onRequestDelete(), onRequestPost()

## Knowledge Gaps
- **321 isolated node(s):** `KBrand`, `styles`, `name`, `slug`, `version` (+316 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `expo` connect `expo` to `VideoCard.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `router` connect `courseHub.js` to `flashcards.js`, `expo`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `expo-router` connect `VideoCard.tsx` to `[id].tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `_renderCourseCard()` (e.g. with `_etappeBarHtml()` and `_topicWeightAccuracy()`) actually correct?**
  _`_renderCourseCard()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `KBrand`, `styles`, `name` to the rest of the system?**
  _321 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `flashcards.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06886338393187708 - nodes in this community are weakly interconnected._
- **Should `exam.js` be split into smaller, more focused modules?**
  _Cohesion score 0.060285563194077206 - nodes in this community are weakly interconnected._