// ── Feed Data ─────────────────────────────────────────────────────────────
// Concept Cards + Video Cards + Local Short Videos
// Types: "concept" | "video" | "localvideo"

window.FEED_CARDS = [

  // ═══════════════════════════════════════════════════
  // 📹 LOCAL SHORT-FORM VIDEOS — ESF Wissenschaftstheorie
  // Erstellt mit make_shortform_video.py · Voiceover auf Deutsch
  // ═══════════════════════════════════════════════════

  {
    id: "esf-sv-01",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "🧠",
    title: "Deduktion vs. Induktion",
    subtitle: "Forschungslogik in 90 Sekunden",
    description: "Top-Down vs. Bottom-Up, Popper & Falsifikation, Abduktion als dritter Typ. Mit Voiceover auf Deutsch.",
    topics: ["Deduktion", "Induktion", "Falsifikation", "Abduktion"],
    duration: "1:36",
    level: "Prüfungsrelevant ⚡",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/esf_01_deduktion_vs_induktion.mp4",
    thumbnail_emoji: "🧠",
    block: "Wissenschaftstheorie & Forschungslogik"
  },
  {
    id: "esf-sv-02",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "🔬",
    title: "Forschungsdesigns: Explorativ · Deskriptiv · Kausal",
    subtitle: "Die 3 Designs und wann man sie einsetzt",
    description: "Welches Design für welche Frage? Reihenfolge, Methoden und die häufigste Prüfungsfalle erklärt.",
    topics: ["Explorativ", "Deskriptiv", "Kausal", "Randomisierung"],
    duration: "1:44",
    level: "Prüfungsrelevant ⚡",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/esf_02_forschungsdesigns.mp4",
    thumbnail_emoji: "🔬",
    block: "Wissenschaftstheorie & Forschungslogik"
  },
  {
    id: "esf-sv-03",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "📋",
    title: "Forschungsprozess: Die 5 Schritte",
    subtitle: "Von der Frage zur Publikation",
    description: "Alle 5 Schritte mit Beispielen — Forschungsfrage, Hypothesen, Design, Erhebung, Interpretation.",
    topics: ["Forschungsprozess", "Hypothesen", "Design", "Publikation"],
    duration: "1:52",
    level: "Prüfungsrelevant ⚡",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/esf_03_forschungsprozess.mp4",
    thumbnail_emoji: "📋",
    block: "Wissenschaftstheorie & Forschungslogik"
  },

  // ═══════════════════════════════════════════════════
  // 🎬 NOTEBOOKLM STUDIO VIDEOS — AI-generierte Erklärvideos
  // Erstellt mit NotebookLM Studio · Erklärvideo-Format
  // ═══════════════════════════════════════════════════

  {
    id: "esf-nlm-01",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "🎬",
    title: "Empirische Sozialforschung",
    subtitle: "KI-Erklärvideo · Alle Kernthemen",
    description: "Von NotebookLM Studio generiertes Erklärvideo: Deduktion/Induktion, Forschungsdesigns, Messung, Gütekriterien – alles in einem kompakten AI-Video.",
    topics: ["Wissenschaftstheorie", "Forschungsdesigns", "Gütekriterien", "Messung"],
    duration: "12:29",
    level: "Gesamtüberblick 🗺️",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/Empirische_Sozialforschung.mp4",
    thumbnail_emoji: "🎬",
    block: "NotebookLM Studio · Komplettüberblick"
  },
  {
    id: "esf-nlm-02",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "🔬",
    title: "Forschungslogik (ESF FS26)",
    subtitle: "KI-Erklärvideo · Forschungsmethodik",
    description: "Strukturierte Übersicht zu Forschungslogik und Wissenschaftstheorie: Falsifikation, Hypothesentests, Replikationskrise und Open Science.",
    topics: ["Forschungslogik", "Falsifikation", "Hypothesen", "Open Science"],
    duration: "8:32",
    level: "Prüfungsrelevant ⚡",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/ESF_FS26__Forschungslogik.mp4",
    thumbnail_emoji: "🔬",
    block: "NotebookLM Studio · Wissenschaftstheorie"
  },
  {
    id: "esf-nlm-03",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "📐",
    title: "Forschungslogik — Klassisch",
    subtitle: "KI-Erklärvideo · Klassischer Stil",
    description: "Vertieftes Erklärvideo im klassischen Stil: Forschungslogik, quantitative Methoden und die systematische Verknüpfung von Theorie und Empirie.",
    topics: ["Forschungslogik", "Quantitativ", "Theorie", "Empirie"],
    duration: "10:04",
    level: "Vertiefung 📚",
    video_src: "https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos/Forschungslogik.mp4",
    thumbnail_emoji: "📐",
    block: "NotebookLM Studio · Klassisch"
  },

  // ═══════════════════════════════════════════════════
  // 🎥 VIDEO CARDS — Lernvideos für jedes Fach
  // ═══════════════════════════════════════════════════

  {
    id: "vid-stat-pvalue",
    type: "video",
    course: "Statistik", courseColor: "#2563eb",
    emoji: "🎬",
    title: "p-Wert richtig verstehen (StatQuest)",
    description: "Der meistgesuchte Statistik-Begriff — jetzt für immer verstanden. Josh Starmer erklärt visuell, klar und mit Witz.",
    topics: ["p-Wert", "Hypothesentests", "α-Fehler"],
    duration: "~12 Min",
    level: "Beginner",
    youtube_url: "https://www.youtube.com/results?search_query=statquest+p+value+explained",
    why_watch: "Der p-Wert ist Prüfungsthema Nummer 1 — und wird am häufigsten falsch erklärt.",
    block: "Hypothesentests"
  },
  {
    id: "vid-stat-regression",
    type: "video",
    course: "Statistik", courseColor: "#2563eb",
    emoji: "🎬",
    title: "Lineare Regression in 15 Minuten",
    description: "StatQuest: Von der Idee über KQ-Schätzung bis zu R² und Signifikanztest. Mit Visualisierungen.",
    topics: ["Regression", "R²", "β-Koeffizienten"],
    duration: "~15 Min",
    level: "Beginner",
    youtube_url: "https://www.youtube.com/results?search_query=statquest+linear+regression+clearly+explained",
    why_watch: "Regression ist das Herzstück von Statistik II — und die Visualisierung macht den Unterschied.",
    block: "Regression"
  },
  {
    id: "vid-esf-qual",
    type: "video",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "🎬",
    title: "Qualitative Forschungsmethoden – Überblick",
    description: "Alles zu Interviews, Grounded Theory, Ethnographie und qualitativer Inhaltsanalyse — kompakt erklärt.",
    topics: ["Interview", "Grounded Theory", "Gütekriterien"],
    duration: "~18 Min",
    level: "Intermediate",
    youtube_url: "https://www.youtube.com/results?search_query=qualitative+forschungsmethoden+interview+grounded+theory",
    why_watch: "Qualitative Methoden kommen immer in der Prüfung. Unterschiede Interview-Typen = sicherer Punkt.",
    block: "Qualitative Methoden"
  },
  {
    id: "vid-om-eoq",
    type: "video",
    course: "OM", courseColor: "#ea580c",
    emoji: "🎬",
    title: "EOQ & Inventory Management – Komplettpaket",
    description: "Economic Order Quantity Formel, Reorder Point, Safety Stock und ABC-Analyse. Schritt-für-Schritt Berechnungen.",
    topics: ["EOQ", "ROP", "Safety Stock"],
    duration: "~20 Min",
    level: "Intermediate",
    youtube_url: "https://www.youtube.com/results?search_query=EOQ+economic+order+quantity+inventory+management+explained",
    why_watch: "EOQ-Berechnungen kommen garantiert in der OM-Prüfung. Jede Rechenschritt einmal selbst durchführen.",
    block: "Inventory Management"
  },
  {
    id: "vid-makro-qe",
    type: "video",
    course: "MakroII", courseColor: "#059669",
    emoji: "🎬",
    title: "Quantitative Easing erklärt — EZB & SNB",
    description: "Wie funktioniert QE wirklich? Transmissionskanäle, Auswirkungen auf Asset-Preise, Inflation und Ungleichheit. Deutsch.",
    topics: ["QE", "Geldpolitik", "ZLB"],
    duration: "~14 Min",
    level: "Intermediate",
    youtube_url: "https://www.youtube.com/results?search_query=quantitative+easing+erklärt+EZB+Geldpolitik",
    why_watch: "QE ist zentrales Prüfungsthema in MakroII. Die 3 Transmissionskanäle musst du aus dem Schlaf nennen können.",
    block: "Geldpolitik"
  },
  {
    id: "vid-makro-islm",
    type: "video",
    course: "MakroII", courseColor: "#059669",
    emoji: "🎬",
    title: "IS-LM Modell – Schritt für Schritt",
    description: "IS-Kurve, LM-Kurve, Gleichgewicht, Fiskal- und Geldpolitik-Schocks. Mit Grafiken und intuitiven Erklärungen.",
    topics: ["IS-LM", "Fiskalpolitik", "Crowding-Out"],
    duration: "~22 Min",
    level: "Intermediate",
    youtube_url: "https://www.youtube.com/results?search_query=IS+LM+Modell+Makroökonomik+erklärt",
    why_watch: "IS-LM ist das Kernmodell der Makro. Jede Policy-Frage läuft darüber — unbedingt grafisch beherrschen.",
    block: "IS-LM Modell"
  },
  {
    id: "vid-om-sixsigma",
    type: "video",
    course: "OM", courseColor: "#ea580c",
    emoji: "🎬",
    title: "Six Sigma DMAIC – Komplette Einführung",
    description: "Von der Idee bis zu Control Charts. DMAIC-Prozess, Cpk-Index, statistische Prozesskontrolle erklärt.",
    topics: ["Six Sigma", "DMAIC", "Control Charts", "Cpk"],
    duration: "~16 Min",
    level: "Intermediate",
    youtube_url: "https://www.youtube.com/results?search_query=six+sigma+DMAIC+explained+control+charts",
    why_watch: "Quality Management ist oft der am schwierigsten greifbare OM-Block. Video schafft Intuition bevor du Formeln lernst.",
    block: "Quality Management"
  },

  // ═══════════════════════════════════════════════════
  // ⚡ CONCEPT CARDS — ESF (MOST URGENT — 23.06.)
  // ═══════════════════════════════════════════════════

  {
    id: "esf-b3-001",
    type: "concept",
    course: "ESF", courseColor: "#7c3aed",
    block: "Block 3 — Quantitative Methoden",
    title: "Experiment: Warum Randomisierung alles ändert",
    tldr: "Nur ein randomisiertes Experiment beweist Kausalität — alles andere zeigt nur Korrelation.",
    key_points: [
      "UV (unabhängige Variable) → wird manipuliert",
      "AV (abhängige Variable) → wird gemessen",
      "Randomisierung eliminiert Störvariablen",
      "Ohne Random Assignment = kein Kausalitätsbeweis"
    ],
    analogy: "Wie ein Medikamenten-Test: Zufällig Gruppe A (Pille) vs. Gruppe B (Placebo). Nur so weisst du ob die Pille wirkt — nicht dein Wunschdenken.",
    exam_trap: "Korrelation ≠ Kausalität! Schokoladenkäufe & Nobelpreise korrelieren — das erklärt nichts.",
    recall_q: "Was ist der Unterschied zwischen Labor-, Feld- und Online-Experiment?",
    recall_a: "Labor: hohe interne Validität, geringe externe. Feld: hohe externe Validität, schwerer kontrollierbar. Online: günstig & grosse Stichprobe, aber wenig Kontrolle.",
    emoji: "🧪"
  },
  {
    id: "esf-b1-001",
    type: "concept",
    course: "ESF", courseColor: "#7c3aed",
    block: "Block 1 — Forschungsprozess",
    title: "Der Forschungsprozess in 5 Schritten",
    tldr: "Empirische Forschung folgt einem klaren Ablauf — jeder Schritt baut auf dem vorherigen auf.",
    key_points: [
      "1. Forschungsfrage → Was will ich wissen?",
      "2. Theorie & Hypothesen → Was erwarte ich?",
      "3. Design & Methode → Wie erhebe ich Daten?",
      "4. Datenerhebung & -analyse → Was zeigen die Daten?",
      "5. Interpretation & Publikation → Was bedeutet das?"
    ],
    analogy: "Wie Kochen: erst Rezept (Theorie), dann Zutaten sammeln (Daten), dann kochen (Analyse), dann servieren (Publikation).",
    exam_trap: "Exploratives Design ≠ hypothesenprüfendes Design. Exploration kommt ZUERST wenn man noch kein Vorwissen hat.",
    recall_q: "Was unterscheidet exploratives, deskriptives und kausales Forschungsdesign?",
    recall_a: "Explorativ: Neues erkunden (qualitativer Natur). Deskriptiv: Zustand beschreiben (Häufigkeiten, etc.). Kausal: Ursache-Wirkung prüfen (Experiment nötig).",
    emoji: "🔬"
  },
  {
    id: "esf-b4-001",
    type: "concept",
    course: "ESF", courseColor: "#7c3aed",
    block: "Block 4 — Skalierung & Messung",
    title: "Skalenniveaus: Das Fundament aller Statistik",
    tldr: "Nominal → Ordinal → Intervall → Ratio: jede Stufe erlaubt mehr statistische Operationen.",
    key_points: [
      "Nominal: Kategorien ohne Rangfolge (Nationalität, Farbe)",
      "Ordinal: Rangfolge, aber Abstände nicht gleich (Schulnoten)",
      "Intervall: Gleiche Abstände, kein echter Nullpunkt (°C)",
      "Ratio: Absoluter Nullpunkt, alle Operationen erlaubt (Gewicht)"
    ],
    analogy: "Wie Spielkarten: Farbe (Nominal) vs. Rang ♠J,Q,K (Ordinal) vs. Zahlen ohne echte 0 (Intervall) vs. echter Kartenwert (Ratio).",
    exam_trap: "Likert-Skala ist ORDINAL (Abstände nicht gleich) — auch wenn sie wie Zahlen aussieht. In der Praxis wird sie oft wie Intervall behandelt, aber formal falsch.",
    recall_q: "Was ist Cronbach's Alpha und ab welchem Wert gilt eine Skala als reliabel?",
    recall_a: "Cronbach's α misst interne Konsistenz. α ≥ 0.7 = akzeptabel. α ≥ 0.8 = gut. α ≥ 0.9 = exzellent. Misst ob alle Items das gleiche Konstrukt messen.",
    emoji: "📏"
  },
  {
    id: "esf-b5-001",
    type: "concept",
    course: "ESF", courseColor: "#7c3aed",
    block: "Block 5 — Gütekriterien",
    title: "Reliabilität vs. Validität — der ewige Verwechsler",
    tldr: "Reliabilität = Konsistenz. Validität = Treffer. Beides gleichzeitig ist das Ziel.",
    key_points: [
      "Reliabilität: misst ein Instrument immer gleich? (z.B. Cronbach's α ≥ 0.7)",
      "Interne Validität: messe ich wirklich was ich messen will?",
      "Externe Validität: sind die Ergebnisse generalisierbar?",
      "Konstruktvalidität: bildet meine Skala das Konstrukt ab?"
    ],
    analogy: "Zielscheibe: Reliabel aber nicht valide = alle Schüsse eng beieinander, aber nicht in der Mitte. Valide & reliabel = eng beieinander UND in der Mitte.",
    exam_trap: "Ein sehr reliables Instrument kann trotzdem unvalide sein! (z.B. Körpergrösse als Intelligenz-Proxy: konsistent messbar, aber misst nicht Intelligenz).",
    recall_q: "Was ist die Replikationskrise und was hat sie mit Gütekriterien zu tun?",
    recall_a: "Viele Studien konnten nicht repliziert werden, weil Ergebnisse nicht robust waren (geringe statistische Power, p-Hacking, kleine Stichproben). Open Science (Pre-Registration) ist die Antwort.",
    emoji: "🎯"
  },

  // ═══════════════════════════════════════════════════
  // ⚙️ OM — Prüfung 25.06.
  // ═══════════════════════════════════════════════════

  {
    id: "om-b1-001",
    type: "concept",
    course: "OM", courseColor: "#ea580c",
    block: "Block 1 — Forecasting",
    title: "Exponential Smoothing: Vergessen ist gut",
    tldr: "Exponential Smoothing gewichtet neuere Daten höher — ältere Daten 'verblassen' exponentiell.",
    key_points: [
      "Formel: F(t+1) = α · A(t) + (1-α) · F(t)",
      "α nahe 1 = reagiert schnell auf Veränderungen",
      "α nahe 0 = glättet stark, reagiert langsam",
      "Kein Speicher von historischen Daten nötig"
    ],
    analogy: "Wie ein Goldfisch-Gedächtnis mit Einstellschraube: α=0.9 = vergisst fast alles sofort. α=0.1 = sehr langes Gedächtnis.",
    exam_trap: "MAD, MSE, MAPE verwechseln: MAD = mean absolute deviation (robust), MAPE = prozentual (gut für Vergleiche), MSE = bestraft grosse Fehler stark (quadratisch).",
    recall_q: "Wie berechnet man den optimalen α-Wert für Exponential Smoothing?",
    recall_a: "Durch Minimierung des MSE (oder MAD/MAPE) über historische Daten — in Excel via Solver oder trial-and-error über verschiedene α-Werte.",
    emoji: "📉"
  },
  {
    id: "om-b2-001",
    type: "concept",
    course: "OM", courseColor: "#ea580c",
    block: "Block 2 — Inventory Management",
    title: "EOQ: Die magische Bestellmenge",
    tldr: "EOQ minimiert Gesamtkosten durch Balance zwischen Bestell- und Lagerkosten.",
    key_points: [
      "EOQ = √(2·D·S / H)",
      "D = Jahresbedarf, S = Bestellkosten, H = Lagerkosten/Einheit/Jahr",
      "Bei EOQ gilt: Bestellkosten = Lagerkosten",
      "Sensitivitätsanalyse: EOQ ist robust gegenüber kleinen Fehlern"
    ],
    analogy: "Wie Wocheneinkauf vs. Tageseinkauf: täglich fahren = hohe Fahrtkosten (Bestellkosten). Selten fahren = voller Kühlschrank verdirbt (Lagerkosten). EOQ = optimale Frequenz.",
    exam_trap: "H ist oft als %-Satz von Einheitspreis angegeben: H = i · c. Und: ROP = d · L (daily demand × lead time), NICHT ROP = EOQ!",
    recall_q: "Wie berechnet man den Reorder Point (ROP) mit Safety Stock?",
    recall_a: "ROP = d·L + Z·σ_L. Wobei d = daily demand, L = lead time, Z = z-Wert für gewünschten Servicegrad, σ_L = Standardabweichung der Nachfrage über Lead Time.",
    emoji: "📦"
  },
  {
    id: "om-b3-001",
    type: "concept",
    course: "OM", courseColor: "#ea580c",
    block: "Block 3 — Aggregate Planning",
    title: "Chase vs. Level: Welche Strategie wann?",
    tldr: "Chase folgt der Nachfrage, Level hält die Produktion konstant — beide haben Platz.",
    key_points: [
      "Chase: Produktion = Nachfrage, minimaler Lagerbestand",
      "Level: Konstante Produktion, Lager als Puffer",
      "Chase-Kosten: Hiring/Firing, Überstunden",
      "Level-Kosten: Lagerkosten, Verschrottung bei Überproduktion"
    ],
    analogy: "Chase = Taxifahrer (reagiert sofort auf Kunden). Level = Bäcker (backt jeden Tag gleich viel, verkauft was er hat).",
    exam_trap: "Kein 'besser/schlechter' — hängt von Kosten und Produkt ab. Verderbliche Güter → Chase. Kapitalintensive Anlage → Level.",
    recall_q: "Was ist S&OP und wer ist daran beteiligt?",
    recall_a: "Sales & Operations Planning: Koordination zwischen Vertrieb, Produktion, Logistik, Finanzen. Horizont 3-18 Monate. Ziel: Nachfrage und Kapazität abstimmen.",
    emoji: "📅"
  },
  {
    id: "om-b5-001",
    type: "concept",
    course: "OM", courseColor: "#ea580c",
    block: "Block 5 — Quality Management",
    title: "Six Sigma: 3.4 Fehler pro Million — wie?",
    tldr: "Six Sigma = 6 Standardabweichungen zwischen Prozessmitte und Spezifikationsgrenze. DMAIC ist der Weg dorthin.",
    key_points: [
      "Ziel: < 3.4 DPMO (Defects per Million Opportunities)",
      "DMAIC: Define → Measure → Analyze → Improve → Control",
      "Control Charts: UCL/LCL = x̄ ± 3σ",
      "Cpk ≥ 1.33 = 4σ-Prozess (Industriestandard)"
    ],
    analogy: "Wie Flugzeug-Sicherheit: 'gut genug' reicht nicht. 6σ bedeutet: auf 1 Mio. Flüge < 4 Abstürze. Systematisch, nicht zufällig.",
    exam_trap: "Control Limits (statistisch, aus Daten) ≠ Specification Limits (vom Kunden, extern). Cpk vergleicht BEIDES — nicht nur Control Limits.",
    recall_q: "Was misst der Cpk-Index und was bedeutet Cpk < 1?",
    recall_a: "Cpk = min[(USL-μ)/3σ, (μ-LSL)/3σ]. Cpk < 1: Prozess produziert Teile ausserhalb der Spec → Ausschuss unvermeidbar. Cpk ≥ 1.67 = Five-Sigma-Prozess.",
    emoji: "✅"
  },

  // ═══════════════════════════════════════════════════
  // 📊 STATISTIK — Prüfung 01.07.
  // ═══════════════════════════════════════════════════

  {
    id: "stat-b5-001",
    type: "concept",
    course: "Statistik", courseColor: "#2563eb",
    block: "Block 5 — Hypothesentests",
    title: "p-Wert: Der meistmissverstandene Begriff der Statistik",
    tldr: "Der p-Wert sagt NICHT wie wahrscheinlich die Hypothese ist — er sagt wie wahrscheinlich die Daten wären, wenn H0 wahr ist.",
    key_points: [
      "p < α → H0 ablehnen (z.B. α = 5%)",
      "p-Wert = P(Daten so extrem | H0 ist wahr)",
      "Klein p = starke Evidenz GEGEN H0",
      "α-Fehler (Typ I) = fälschlicherweise H0 abgelehnt"
    ],
    analogy: "Wie ein Gerichtsprozess: p-Wert = Wahrscheinlichkeit der Beweise wenn Angeklagter unschuldig. Klein p = Beweise wären sehr seltsam wenn unschuldig → verurteilen.",
    exam_trap: "p-Wert ist NICHT P(H0 ist wahr)! Das ist die häufigste Fehlantwort in Prüfungen. Auch: grosses n → kleines p, auch ohne praktische Bedeutung.",
    recall_q: "Was ist der Unterschied zwischen α-Fehler (Typ I) und β-Fehler (Typ II)?",
    recall_a: "Typ I (α): H0 ist wahr aber wird abgelehnt (falscher Alarm). Typ II (β): H0 ist falsch aber wird beibehalten (verpasster Effekt). Power = 1-β = Wahrsch. echten Effekt zu finden.",
    emoji: "📊"
  },
  {
    id: "stat-b6-001",
    type: "concept",
    course: "Statistik", courseColor: "#2563eb",
    block: "Block 6 — ANOVA & Regression",
    title: "Lineare Regression: Was R² wirklich bedeutet",
    tldr: "R² misst den Anteil der Varianz in Y, der durch X erklärt wird — nicht die Güte der Vorhersage.",
    key_points: [
      "R² = 1 - SSR/SST (Anteil erklärter Varianz)",
      "R² = 0: X erklärt nichts. R² = 1: perfekte Erklärung",
      "KQ-Schätzung minimiert Σ(y_i - ŷ_i)²",
      "β₁ (Steigung) = Cov(X,Y) / Var(X)"
    ],
    analogy: "R² = 0.7 bedeutet: 70% der Unterschiede in Y kann ich durch Unterschiede in X erklären. Wie: 70% der Notenunterschiede erkläre ich durch Lernstunden.",
    exam_trap: "Hohes R² ≠ gutes Modell! Immer Residualplot prüfen. Multikollinearität (in Multiple Regression): stark korrelierte Prädiktoren → instabile Schätzer.",
    recall_q: "Wie interpretiert man den p-Wert eines Regressionskoeffizienten β₁?",
    recall_a: "H0: β₁ = 0 (kein linearer Zusammenhang). p < 0.05 → β₁ ist signifikant von 0 verschieden → X hat einen signifikanten Einfluss auf Y.",
    emoji: "📈"
  },

  // ═══════════════════════════════════════════════════
  // 🏦 MAKROII — Prüfung 13.07.
  // ═══════════════════════════════════════════════════

  {
    id: "makro-b1-001",
    type: "concept",
    course: "MakroII", courseColor: "#059669",
    block: "Block 1 — Finanzmärkte & Geldpolitik",
    title: "QE in 90 Sekunden: Wie Zentralbanken Geld drucken",
    tldr: "Quantitative Easing = Zentralbank kauft Anleihen, wenn Leitzins bereits bei 0% ist.",
    key_points: [
      "Normal-Geldpolitik: Leitzins senken → Kredite billiger",
      "ZLB (Zero Lower Bound): Zins kann nicht unter 0% (gut)",
      "QE: Zentralbank kauft Anleihen → Banken haben mehr Reserven → Geld fliesst in Wirtschaft",
      "3 Kanäle: Portfolio-Rebalancing, Zinskanal (langfristig), Signalkanal"
    ],
    analogy: "Wie Feuerwehrschlauch statt Gartenschlauch: normale Geldpolitik (Zins) ist der normale Schlauch. QE ist der Feuerwehrschlauch wenn der normale nicht reicht.",
    exam_trap: "QE ≠ Geld drucken im klassischen Sinn — es sind Reserven, keine umlaufende Geldmenge M1. Und: QE erhöht Asset-Preise → Ungleichheit (SNB-Bilanzverluste!)",
    recall_q: "Warum kann QE zu steigender Ungleichheit führen?",
    recall_a: "QE erhöht Asset-Preise (Aktien, Immobilien). Reiche Haushalte halten mehr Assets → überproportionaler Gewinn. Arme Haushalte haben kaum Assets → profitieren kaum.",
    emoji: "🏦"
  },
  {
    id: "makro-b2-001",
    type: "concept",
    course: "MakroII", courseColor: "#059669",
    block: "Block 2 — IS-LM Modell",
    title: "IS-LM: Das Herz der Makroökonomie",
    tldr: "IS = Gütermarkt-Gleichgewicht. LM = Geldmarkt-Gleichgewicht. Zusammen: Gesamtwirtschaft.",
    key_points: [
      "IS-Kurve: Y = C + I(i) + G — negativer i-Y-Zusammenhang",
      "LM-Kurve: M/P = L(Y,i) — positiver i-Y-Zusammenhang",
      "Fiskalpolitik: IS-Kurve verschiebt → teilweise Crowding-Out",
      "Geldpolitik: LM-Kurve verschiebt → kein Crowding-Out"
    ],
    analogy: "IS-LM ist wie zwei Waagen die zusammen hängen: wenn du auf einer Seite mehr Gewicht (G↑) hinzufügst, kippt alles neu — Zins steigt, Investitionen fallen.",
    exam_trap: "Liquiditätsfalle (i = 0): LM ist horizontal → Geldpolitik wirkungslos! Fiskalpolitik dann voll wirksam — kein Crowding-Out.",
    recall_q: "Was ist Crowding-Out und wann tritt es auf?",
    recall_a: "G↑ → IS↑ → Y↑ und i↑ → I↓ (private Investitionen fallen). Teilweiser Crowding-Out: Staatsausgaben-Multiplikator < 1/(1-MPC). Bei flacher LM (Liquiditätsfalle): kein Crowding-Out.",
    emoji: "⚙️"
  },
  {
    id: "makro-b3-001",
    type: "concept",
    course: "MakroII", courseColor: "#059669",
    block: "Block 3 — Offene Volkswirtschaft",
    title: "Wechselkurse: Warum der Franken so stark ist",
    tldr: "UIP und PPP erklären Wechselkursbewegungen — in der Praxis weichen echte Kurse aber stark ab.",
    key_points: [
      "Kaufkraftparität (PPP): E = P_CH / P_Foreign",
      "Uncovered Interest Parity (UIP): höhere Zinsen → Währungsaufwertung erwartet",
      "SNB-Mindestkurs 2011–2015: 1.20 CHF/EUR",
      "Aufhebung Jan 2015 → CHF wertete sofort 20% auf"
    ],
    analogy: "Wie kommunizierende Röhren: Wenn Schweizer Kapital mehr Rendite verspricht, strömt Geld in die Schweiz → CHF-Nachfrage steigt → CHF aufwertet.",
    exam_trap: "Aufwertung des CHF = Export wird teurer → schlechter für Exportindustrie. Aber: Importe billiger → gut für Konsumenten. IS-Kurve verschiebt sich nach links.",
    recall_q: "Was ist das Mundell-Fleming Modell und was sagt es für kleine offene Volkswirtschaften?",
    recall_a: "IS-LM-BP Modell: bei flexiblen Wechselkursen ist Geldpolitik wirksam (BP-Kurve verschiebt sich), Fiskalpolitik hingegen wirkungslos (crowding out via Wechselkurs).",
    emoji: "💱"
  }
];
