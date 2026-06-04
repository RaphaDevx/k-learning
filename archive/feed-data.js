// Feed data — Concept Cards (90-sec style)
// Add new cards here as NotebookLM audios are created
// Format: { id, course, block, title, tldr, key_points[], analogy, exam_trap, recall_q, recall_a, color, emoji, audio_url }

window.FEED_CARDS = [

  // ── ESF (MOST URGENT — Prüfung 23.06.) ──────────────────────────────
  {
    id: "esf-b3-001",
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
    id: "esf-b5-001",
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

  // ── OM (Prüfung 25.06.) ─────────────────────────────────────────────
  {
    id: "om-b1-001",
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

  // ── STATISTIK (Prüfung 01.07.) ──────────────────────────────────────
  {
    id: "stat-b5-001",
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

  // ── MAKROII (Prüfung 13.07.) ────────────────────────────────────────
  {
    id: "makro-b1-001",
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
    id: "makro-b3-001",
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
