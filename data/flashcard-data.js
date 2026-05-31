// ── Flashcard Data ────────────────────────────────────────────────────────
// Format: { id, type, front, back, topic, course, tags[], difficulty(1-3) }
// Types: "qa" | "cloze" | "why"

(function() {
window.FLASHCARD_DATA = [

// ════════════════════════════════════════════════════════════════
// STATISTIK
// ════════════════════════════════════════════════════════════════

// ── Schätztheorie & Konfidenzintervalle ──────────────────────────
{"id":"stat01-01","type":"qa","course":"Statistik","topic":"Schätztheorie & Konfidenzintervalle","tags":["KI","z-Verteilung","Formel"],"difficulty":2,
"front":"Was ist die Formel für das Konfidenzintervall für μ bei BEKANNTEM σ?",
"back":"x̄ ± z_{α/2} · (σ/√n)\n\nz_{α/2}-Werte auswendig:\n• 90%-KI: z = 1.645\n• 95%-KI: z = 1.96\n• 99%-KI: z = 2.576"},

{"id":"stat01-02","type":"qa","course":"Statistik","topic":"Schätztheorie & Konfidenzintervalle","tags":["KI","t-Verteilung","Formel"],"difficulty":2,
"front":"Was ist die Formel für das Konfidenzintervall für μ bei UNBEKANNTEM σ?",
"back":"x̄ ± t_{α/2, n-1} · (s/√n)\n\nWichtig: t-Verteilung verwenden!\n• df = n - 1 Freiheitsgrade\n• t > z (breiter als bei bekanntem σ)\n• Ab n ≥ 30: t ≈ z (zentraler Grenzwertsatz)"},

{"id":"stat01-03","type":"qa","course":"Statistik","topic":"Schätztheorie & Konfidenzintervalle","tags":["KI","Anteilswert","Formel"],"difficulty":2,
"front":"KI für den Anteilswert π — wie lautet die Formel?",
"back":"p ± z_{α/2} · √(p(1-p)/n)\n\n• p = Stichprobenanteil (x/n)\n• z_{α/2} = 1.96 für 95%-KI\n• Faustregel: n·p ≥ 5 und n·(1-p) ≥ 5 für Normalapproximation"},

{"id":"stat01-04","type":"qa","course":"Statistik","topic":"Schätztheorie & Konfidenzintervalle","tags":["Stichprobenumfang","KI","Formel"],"difficulty":3,
"front":"Wie berechnet man den notwendigen Stichprobenumfang n für ein KI der Breite 2d?",
"back":"n = (z_{α/2} · σ / d)²\n\n• d = gewünschte halbe Intervalllbreite\n• Immer AUFRUNDEN!\n• Bei unbekanntem σ: Pilotstudie oder konservative Schätzung"},

{"id":"stat01-05","type":"cloze","course":"Statistik","topic":"Schätztheorie & Konfidenzintervalle","tags":["KI","Interpretation"],"difficulty":2,
"front":"Ein 95%-KI bedeutet: Das Intervall enthält in {{95%}} der Fälle den wahren Parameter μ — denn das {{Intervall}} ist zufällig, nicht {{μ}}.",
"back":"Ein 95%-KI bedeutet: Das Intervall enthält in 95% der Fälle den wahren Parameter μ — denn das Intervall ist zufällig, nicht μ.\n\nPrüfungsfalle: NICHT sagen 'μ liegt mit 95% Wahrscheinlichkeit im Intervall' — μ ist ein fixer (unbekannter) Wert!"},

// ── Hypothesentests ──────────────────────────────────────────────
{"id":"stat02-01","type":"qa","course":"Statistik","topic":"Hypothesentests","tags":["z-Test","Prüfgrösse","Formel"],"difficulty":2,
"front":"Prüfgrösse für den z-Test (H₀: μ = μ₀, σ bekannt)?",
"back":"z = (x̄ - μ₀) / (σ/√n)\n\nEntscheidungsregel:\n• Zweiseitig: |z| > z_{α/2} → H₀ ablehnen\n• Einseitig rechts: z > z_α → H₀ ablehnen\n• Einseitig links: z < -z_α → H₀ ablehnen"},

{"id":"stat02-02","type":"qa","course":"Statistik","topic":"Hypothesentests","tags":["t-Test","Prüfgrösse","Formel"],"difficulty":2,
"front":"Prüfgrösse für den t-Test (H₀: μ = μ₀, σ unbekannt)?",
"back":"t = (x̄ - μ₀) / (s/√n)  mit df = n - 1\n\nWann t-Test statt z-Test?\n• σ² unbekannt (fast immer!)\n• Bei n ≥ 30 kaum Unterschied zur z-Verteilung\n• Bei n < 30: unbedingt t-Verteilung"},

{"id":"stat02-03","type":"qa","course":"Statistik","topic":"Hypothesentests","tags":["Fehlertypen","Power","Konzept"],"difficulty":2,
"front":"Was ist α-Fehler (Typ I) und β-Fehler (Typ II)? Was ist Power?",
"back":"α-Fehler (Typ I): H₀ ist WAHR, wird aber abgelehnt → 'falscher Alarm'\nβ-Fehler (Typ II): H₀ ist FALSCH, wird aber beibehalten → 'verpasster Effekt'\n\nPower = 1 - β = Wahrscheinlichkeit, echten Effekt zu entdecken\n\nKonflikt: Kleines α → grosses β (man kann nicht beides minimieren)"},

{"id":"stat02-04","type":"cloze","course":"Statistik","topic":"Hypothesentests","tags":["p-Wert","Interpretation"],"difficulty":3,
"front":"Der p-Wert ist {{P(Daten so extrem | H₀ wahr)}}. Er ist NICHT {{P(H₀ ist wahr)}}. Kleiner p-Wert = {{starke Evidenz gegen H₀}}.",
"back":"Der p-Wert ist P(Daten so extrem | H₀ wahr). Er ist NICHT P(H₀ ist wahr). Kleiner p-Wert = starke Evidenz gegen H₀.\n\nEntscheidung: p < α → H₀ ablehnen. p ≥ α → H₀ beibehalten (nicht beweisen!)"},

{"id":"stat02-05","type":"qa","course":"Statistik","topic":"Hypothesentests","tags":["Entscheidungsregel"],"difficulty":2,
"front":"Wann verwirft man H₀? Nenne BEIDE Methoden.",
"back":"Methode 1 — Kritischer Wert: Testgrösse t/z > kritischer Wert → H₀ verwerfen\n\nMethode 2 — p-Wert: p < α → H₀ verwerfen\n\nBeide Methoden führen zum gleichen Ergebnis!\np < α  ⟺  |t| > t_{krit}"},

// ── ANOVA ────────────────────────────────────────────────────────
{"id":"stat03-01","type":"qa","course":"Statistik","topic":"ANOVA","tags":["ANOVA","F-Test","Formel"],"difficulty":3,
"front":"ANOVA F-Test: Wie lautet die Prüfgrösse?",
"back":"F = MSTR / MSE = [SSTR/(t-1)] / [SSE/(n-t)]\n\n• SSTR = Streuung ZWISCHEN Gruppen (systematisch)\n• SSE = Streuung INNERHALB Gruppen (Fehler)\n• t = Anzahl Gruppen, n = Gesamtgrösse\n• df₁ = t-1, df₂ = n-t"},

{"id":"stat03-02","type":"qa","course":"Statistik","topic":"ANOVA","tags":["ANOVA","Quadratsummen"],"difficulty":3,
"front":"Was sagen SST, SSTR, SSE? Wie hängen sie zusammen?",
"back":"SST = SSTR + SSE (immer!)\n\n• SST (Total): Gesamtstreuung, df = n-1\n• SSTR (Treatment): Zwischen Gruppen, df = t-1\n• SSE (Error): Innerhalb Gruppen, df = n-t\n\nAnalog zu Regression: Gesamtvariation = erklärt + unerklärt"},

{"id":"stat03-03","type":"qa","course":"Statistik","topic":"ANOVA","tags":["ANOVA","Voraussetzungen"],"difficulty":2,
"front":"Welche 3 Voraussetzungen braucht die ANOVA?",
"back":"1. Unabhängige Beobachtungen\n2. Normalverteilung innerhalb jeder Gruppe\n3. Varianzhomogenität: σ₁² = σ₂² = ... = σₜ²\n\nPrüfungsfalle: ANOVA testet nur OB mindestens zwei Gruppen verschieden sind — nicht WELCHE!"},

// ── Regression ───────────────────────────────────────────────────
{"id":"stat04-01","type":"qa","course":"Statistik","topic":"Lineare Regression","tags":["Regression","β-Koeffizienten","Formel"],"difficulty":3,
"front":"Wie berechnet man β₁ (Steigung) und β₀ (Achsenabschnitt)?",
"back":"β₁ = Cov(X,Y) / Var(X) = Σ(xᵢ-x̄)(yᵢ-ȳ) / Σ(xᵢ-x̄)²\n\nβ₀ = ȳ - β₁ · x̄\n\nMerke: Regressionsgerade geht immer durch (x̄, ȳ)!\nKleinste-Quadrate-Methode minimiert Σ(yᵢ-ŷᵢ)²"},

{"id":"stat04-02","type":"qa","course":"Statistik","topic":"Lineare Regression","tags":["Regression","R²","Konzept"],"difficulty":2,
"front":"Was ist R² und wie berechnet und interpretiert man es?",
"back":"R² = SSR/SST = 1 - SSE/SST\n\n• SST = SSR + SSE\n• SSR = erklärte Streuung\n• SSE = Residualstreuung\n\nInterpretation: R²=0.7 → '70% der Variation in Y wird durch X erklärt'\nHohes R² ≠ gutes Modell → Residualplot prüfen!"},

{"id":"stat04-03","type":"cloze","course":"Statistik","topic":"Lineare Regression","tags":["Regression","Interpretation","Kausalität"],"difficulty":2,
"front":"Wenn β₁ signifikant (p < 0.05) ist, wird {{H₀: β₁ = 0}} abgelehnt — X hat einen {{signifikanten linearen Einfluss}} auf Y. Das beweist aber {{keine Kausalität}}.",
"back":"Wenn β₁ signifikant (p < 0.05) ist, wird H₀: β₁ = 0 abgelehnt — X hat einen signifikanten linearen Einfluss auf Y. Das beweist aber keine Kausalität.\n\nKausalität braucht ein Experiment (Randomisierung)!"},

// ── Stichprobenverteilungen & ZGS ────────────────────────────────
{"id":"stat05-01","type":"qa","course":"Statistik","topic":"Stichprobenverteilungen & ZGS","tags":["ZGS","Normalverteilung","Konzept"],"difficulty":2,
"front":"Zentraler Grenzwertsatz (ZGS) — was besagt er und ab wann gilt er?",
"back":"X̄ ist NORMALVERTEILT mit μ und σ²/n — egal wie die GG verteilt ist.\n\nFaustregel: n ≥ 30\nStandardfehler: SE = σ/√n\n\nKonsequenz: Ab n ≥ 30 können wir immer den z-Test verwenden (approximativ). Der ZGS ist das Fundament der Statistik!"},

{"id":"stat05-02","type":"qa","course":"Statistik","topic":"Stichprobenverteilungen & ZGS","tags":["Standardfehler","SE","Konzept"],"difficulty":2,
"front":"Was unterscheidet Standardabweichung (s) vom Standardfehler (SE)?",
"back":"Standardabweichung s: Streuung der EINZELNEN Beobachtungen\n• s = √[Σ(xᵢ-x̄)²/(n-1)]\n\nStandardfehler SE: Streuung des MITTELWERTS über viele Stichproben\n• SE = σ/√n  (oder s/√n bei unbekanntem σ)\n\nSE wird kleiner mit grösserem n → grössere Stichprobe = präzisere Schätzung"},

{"id":"stat05-03","type":"qa","course":"Statistik","topic":"Stichprobenverteilungen & ZGS","tags":["t-Verteilung","z-Verteilung","Entscheidung"],"difficulty":2,
"front":"Wann t-Verteilung, wann z-Verteilung? (3 Entscheidungsregeln)",
"back":"t-Verteilung wenn:\n1. σ unbekannt (fast immer in der Praxis!)\n2. n < 30\n3. GG normalverteilt\n\nz-Verteilung wenn:\n1. σ bekannt\n2. ODER n ≥ 30 (ZGS macht Annäherung gut genug)\n\nFaustregel: Im Zweifel t — es ist konservativer (breitere Verteilung, grösser kritischer Wert)"},

// ── Zweistichproben-Tests ────────────────────────────────────────
{"id":"stat06-01","type":"qa","course":"Statistik","topic":"Zweistichproben-Tests","tags":["Zweistichproben","t-Test","Formel"],"difficulty":3,
"front":"Was ist der Zweistichproben-t-Test? Wann gepaart vs. ungepaart?",
"back":"Test: μ₁ = μ₂? (zwei Gruppen gleich?)\n\nGepaart (gleiche Personen, vorher/nachher):\nt = d̄ / (s_d/√n), df = n-1\n\nUngepaart (verschiedene Personen):\nt = (x̄₁-x̄₂) / SE_diff, df ≈ n₁+n₂-2\n\nPrüfungsfalle: Gepaart vs. ungepaart richtig identifizieren — Vorher/Nachher = immer gepaart!"},

{"id":"stat06-02","type":"why","course":"Statistik","topic":"Zweistichproben-Tests","tags":["Stichprobenvarianz","Freiheitsgrade","Konzept"],"difficulty":3,
"front":"Warum dividiert man bei der Stichprobenvarianz durch (n-1) und nicht durch n?",
"back":"Weil x̄ bereits aus denselben Daten geschätzt wurde → 1 Freiheitsgrad verloren.\n\nDivision durch (n-1) macht s² zum UNVERZERRTEN Schätzer von σ².\nDivision durch n würde σ² systematisch unterschätzen.\n\nMerke: n-1 = 'Bessel-Korrektur'. df = n-1 'bezahlt' für die Schätzung von μ."},

{"id":"stat06-03","type":"qa","course":"Statistik","topic":"Zweistichproben-Tests","tags":["Freiheitsgrade","df","Überblick"],"difficulty":3,
"front":"Was sind Freiheitsgrade (df) — und welche gelten wo?",
"back":"df = freie Datenpunkte - geschätzte Parameter\n\n• t-Test (einstichprobig): df = n-1\n• t-Test (zweistichprobig, ungepaart): df ≈ n₁+n₂-2\n• ANOVA Between: df = t-1\n• ANOVA Within: df = n-t\n• Einfache Regression (Residual): df = n-2\n\ndf bestimmt den kritischen Wert in der Tabelle!"},

// ════════════════════════════════════════════════════════════════
// MAKROII
// ════════════════════════════════════════════════════════════════

// ── Geldpolitik ──────────────────────────────────────────────────
{"id":"makro01-01","type":"qa","course":"MakroII","topic":"Finanzmärkte & Geldpolitik","tags":["Geldpolitik","QE","ZLB"],"difficulty":2,
"front":"Was ist Quantitative Easing (QE) und warum wird es eingesetzt?",
"back":"QE = Zentralbank kauft Anleihen/Assets auf dem Sekundärmarkt, wenn der Leitzins bereits bei 0% (ZLB) ist.\n\n3 Wirkungskanäle:\n• Portfolio-Rebalancing: Banken kaufen risikoreichere Assets\n• Zinskanal: langfristige Zinsen sinken\n• Signalkanal: ZB signalisiert expansive Haltung\n\nQE ≠ klassisches 'Gelddrucken' — es entstehen Zentralbankreserven, nicht M1"},

{"id":"makro01-02","type":"qa","course":"MakroII","topic":"Finanzmärkte & Geldpolitik","tags":["Geldmenge","M1","M2","M3","Multiplikator"],"difficulty":2,
"front":"Was ist der Geldmultiplikator? Wie hängt er mit der Mindestreserve zusammen?",
"back":"Geldmultiplikator = 1 / Mindestreservesatz (r)\n\nBeispiel: r = 10% → Multiplikator = 10\nZentalbankgeld × 10 = potenzielle Geldschöpfung durch Banken\n\nIn der Praxis: Banken halten Überschussreserven → Multiplikator kleiner\nSeit 2008: Banken horten Reserven → QE verpufft teilweise"},

{"id":"makro01-03","type":"cloze","course":"MakroII","topic":"Finanzmärkte & Geldpolitik","tags":["EZB","SNB","Inflation","Mandat"],"difficulty":2,
"front":"Die EZB hat ein {{Preisstabilitäts}}mandat: Inflation nahe aber unter {{2%}}. Die SNB hat ein {{doppeltes}} Mandat: Preisstabilität UND {{Wechselkursstabilität}}.",
"back":"Die EZB hat ein Preisstabilitätsmandat: Inflation nahe aber unter 2%. Die SNB hat ein doppeltes Mandat: Preisstabilität UND Wechselkursstabilität.\n\nSNB-Besonderheit: Als kleine offene VW ist der Wechselkurs entscheidend (Exportgüter!). SNB Mindestkurs 2011-2015: 1.20 CHF/EUR."},

{"id":"makro01-04","type":"why","course":"MakroII","topic":"Finanzmärkte & Geldpolitik","tags":["QE","Ungleichheit","Asset-Preise"],"difficulty":3,
"front":"Warum kann QE die Ungleichheit erhöhen?",
"back":"QE erhöht Asset-Preise (Aktien, Immobilien, Anleihen).\nReiche Haushalte halten einen viel grösseren Anteil ihres Vermögens in Assets.\n→ Reiche profitieren überproportional.\n\nArme/Mittelschicht haben wenig Assets, profitieren kaum.\nEffekt durch Konsum-Kanal (billiger Kredit) wirkt breiter, aber schwächer.\n\nSNB-Bilanzverluste: SNB kaufte Devisen → riesige Bilanz → grosse Verluste 2022"},

// ── IS-LM ────────────────────────────────────────────────────────
{"id":"makro02-01","type":"qa","course":"MakroII","topic":"IS-LM Modell","tags":["IS-LM","Gleichgewicht","Multiplikator"],"difficulty":2,
"front":"Was beschreibt die IS-Kurve? Was die LM-Kurve?",
"back":"IS-Kurve: Gütermarkt-Gleichgewicht\n• Y = C + I + G (+ NX)\n• Negativer Zusammenhang: höherer Zins → weniger Investitionen → niedrigeres Y\n• Slope: je sensibler I auf i, desto flacher IS\n\nLM-Kurve: Geldmarkt-Gleichgewicht\n• M/P = L(Y, i) (Geldnachfrage = Geldangebot)\n• Positiver Zusammenhang: höheres Y → mehr Geldnachfrage → höherer Zins"},

{"id":"makro02-02","type":"qa","course":"MakroII","topic":"IS-LM Modell","tags":["Fiskalpolitik","IS-LM","Multiplikator","crowding-out"],"difficulty":3,
"front":"Was ist Crowding-Out und wann tritt es im IS-LM auf?",
"back":"Fiskalpolitik: G↑ → IS-Kurve verschiebt sich rechts → Y↑ und i↑\n\nHöherer Zins: I↓ (private Investitionen werden verdrängt)\n→ Teilweises 'Crowding Out' der privaten Nachfrage\n\nMass des Crowding-Out hängt von LM-Slope ab:\n• Vertikale LM (Quantitätstheorie): vollständiges Crowding-Out\n• Flache LM (Liquiditätsfalle): kein Crowding-Out\n• Geldpolitik kann LM-Verschiebung verhindern"},

{"id":"makro02-03","type":"cloze","course":"MakroII","topic":"IS-LM Modell","tags":["IS-LM","Gleichgewicht","Multiplikator"],"difficulty":2,
"front":"Der Staatsausgaben-Multiplikator im IS-LM ist {{kleiner}} als 1/(1-MPC) weil {{Crowding-Out}} private Investitionen verdrängt. In der Liquiditätsfalle ist er {{gleich groß wie im einfachen Kreislaufmodell}}.",
"back":"Der Staatsausgaben-Multiplikator im IS-LM ist kleiner als 1/(1-MPC) weil Crowding-Out private Investitionen verdrängt. In der Liquiditätsfalle ist er gleich groß wie im einfachen Kreislaufmodell.\n\nLiquiditätsfalle: i = 0, LM ist horizontal → Geldpolitik wirkungslos, Fiskalpolitik voll wirksam."},

// ── Offene Volkswirtschaft ───────────────────────────────────────
{"id":"makro03-01","type":"qa","course":"MakroII","topic":"Offene Volkswirtschaft","tags":["PPP","UIP","Wechselkurs"],"difficulty":2,
"front":"Was besagt die Kaufkraftparität (PPP) und die Uncovered Interest Parity (UIP)?",
"back":"PPP: E = P_domestic / P_foreign\n• Gleichgewichtswechselkurs durch Preisniveau-Verhältnis\n• 'Big Mac Index' als Annäherung\n• Gilt langfristig besser als kurzfristig\n\nUIP: i_CH = i_EU + (E^e - E)/E\n• Zinsparität: höhere CH-Zinsen → Erwartung CHF-Aufwertung\n• Arbitrage eliminiert risikolose Gewinne"},

{"id":"makro03-02","type":"qa","course":"MakroII","topic":"Offene Volkswirtschaft","tags":["Mundell-Fleming","IS-LM-BP","Wechselkurssystem"],"difficulty":3,
"front":"Mundell-Fleming: Was gilt für Fiskal- und Geldpolitik bei flexiblem vs. fixem Wechselkurs?",
"back":"Flexible Wechselkurse:\n• Geldpolitik: WIRKSAM (LM↑ → i↓ → E↓ → NX↑ → Y↑)\n• Fiskalpolitik: WIRKUNGSLOS (G↑ → i↑ → E↑ → NX↓ → Y bleibt)\n\nFixe Wechselkurse:\n• Geldpolitik: WIRKUNGSLOS (ZB muss Kurs verteidigen)\n• Fiskalpolitik: WIRKSAM (kein Wechselkurskanal)\n\nSchlagwort: 'Impossible Trinity' — Kapitalmobilität + fixer Kurs + autonome Geldpolitik geht nicht gleichzeitig!"},

{"id":"makro03-03","type":"why","course":"MakroII","topic":"Offene Volkswirtschaft","tags":["CHF","SNB","Aufwertung","Export"],"difficulty":2,
"front":"Warum ist CHF-Aufwertung schlecht für die Schweizer Wirtschaft?",
"back":"Mechanismus:\n1. CHF↑ → Schweizer Exporte werden für Ausländer teurer\n2. Nachfrage nach CH-Gütern↓ → Exportvolumen↓\n3. IS-Kurve verschiebt links → Y↓\n\nGleichzeitig: Importe billiger → Schweizer Konsumenten profitieren\nNettoeffekt: Kleine offene VW (MX-Anteil hoch) → Exporteffekt dominiert\n\nSNB-Mindestkurs 2011-2015: verhinderte Aufwertung → stützte Exportindustrie (Pharma, Maschinen, Uhren)"},

// ── Wachstumstheorie ─────────────────────────────────────────────
{"id":"makro04-01","type":"qa","course":"MakroII","topic":"Wachstumstheorie","tags":["Solow","Steady-State","Kapitalakkumulation"],"difficulty":3,
"front":"Was ist der Steady State im Solow-Modell?",
"back":"Steady State: k* (Kapital pro Kopf) ist konstant\n→ Investitionen = Abschreibungen + Bevölkerungswachstum\n\nBedingung: s·f(k) = (δ + n)·k\n• s = Sparquote, f(k) = Produktionsfunktion\n• δ = Abschreibungsrate, n = Bevölkerungswachstum\n\nIm Steady State: Kein Wachstum des BIP pro Kopf!\nLangfristiges Wachstum nur durch technischen Fortschritt (A)"},

{"id":"makro04-02","type":"qa","course":"MakroII","topic":"Wachstumstheorie","tags":["Solow","TFP","BIP-Wachstum","Konvergenz"],"difficulty":3,
"front":"Was ist die 'Golden Rule' im Solow-Modell?",
"back":"Golden Rule: Sparquote, die den Konsum im Steady State MAXIMIERT\n\nBedingung: MPK = δ + n (Grenzprodukt des Kapitals = effektive Abschreibung)\n\nBei zu hoher Sparquote: Kapitalüberschuss, Konsum suboptimal\nBei zu niedriger Sparquote: zu wenig Kapital, Konsum auch suboptimal\n\nKonvergenz-Hypothese: Arme Länder wachsen schneller (abnehmende Grenzerträge) → Angleichung an reiche Länder"},

// ── Fiskalpolitik ────────────────────────────────────────────────
{"id":"makro05-01","type":"qa","course":"MakroII","topic":"Fiskalpolitik & Staatsschuld","tags":["Fiskalpolitik","Multiplikator","automatische-Stabilisatoren"],"difficulty":2,
"front":"Was sind automatische Stabilisatoren? Beispiele?",
"back":"Automatische Stabilisatoren: Fiskalmaßnahmen, die ohne aktiven Eingriff wirken\n\nBeispiele:\n• Progressive Einkommensteuer: Y↓ → Steuer↓ → Nettoeinkommen stabilisiert\n• Arbeitslosengeld: Beschäftigung↓ → Transfers↑ → Nachfrage gestützt\n• Unternehmenssteuer: Gewinne↓ → Steuer↓ → Liquidität erhalten\n\nVorteil: Keine politischen Verzögerungen (inside lag = 0)"},

{"id":"makro05-02","type":"cloze","course":"MakroII","topic":"Fiskalpolitik & Staatsschuld","tags":["Schuldenbremse","Deficit","Schuldenquote"],"difficulty":2,
"front":"Die Schweizer Schuldenbremse schreibt vor, dass das {{strukturelle Defizit}} über einen Konjunkturzyklus ausgeglichen sein muss. Das {{konjunkturelle Defizit}} darf schwanken.",
"back":"Die Schweizer Schuldenbremse schreibt vor, dass das strukturelle Defizit über einen Konjunkturzyklus ausgeglichen sein muss. Das konjunkturelle Defizit darf schwanken.\n\nSt strukturell = tatsächlich - konjunkturell bedingt\nErgebnis CH: Schweiz hat sehr niedrige Schuldenquote (~26% BIP) — Vorbild in Europa."},

// ════════════════════════════════════════════════════════════════
// ESF
// ════════════════════════════════════════════════════════════════

// ── Sitzung 1: ESF Grundlagen ────────────────────────────────────
{"id":"esf-s1-01","type":"qa","course":"ESF","topic":"Sitzung 1 — ESF Grundlagen","tags":["Definition","ESF","Häder"],"difficulty":1,
"front":"Wie lautet die Definition von empirischer Sozialforschung nach Häder (2019)? Welche drei Kernelemente sind enthalten?",
"back":"«Gesamtheit von Methoden, Techniken und Instrumenten zur wissenschaftlich korrekten Durchführung von Untersuchungen des menschlichen Verhaltens und weiterer sozialer Phänomene.»\n\nDie drei Kernelemente:\n① Methoden, Techniken & Instrumente → das Werkzeug\n② Menschliches Verhalten & soziale Phänomene → der Gegenstand\n③ Wissenschaftlich korrekt → der Anspruch\n\nMERKE: Alle drei müssen zusammen genannt werden — in der Prüfung fehlt oft eines."},

{"id":"esf-s1-02","type":"qa","course":"ESF","topic":"Sitzung 1 — ESF Grundlagen","tags":["Theorie","Definition","Prognose"],"difficulty":1,
"front":"Was versteht man in der ESF unter einer Theorie? Welche drei Funktionen erfüllt sie?",
"back":"Theorie = System bzw. Netzwerk von widerspruchsfreien Aussagen.\n\nDrei Funktionen:\n① Erkenntnisse ordnen (strukturieren)\n② Tatbestände erklären\n③ Tatbestände vorhersagen (Prognose)\n\nBeispiel: «Je höher die Bildung, desto höher das Einkommen» — ordnet Beobachtungen, erklärt den Zusammenhang, macht Prognosen möglich.\n\nAufgabe der Wissenschaft: Theorien ausarbeiten, überprüfen, verbessern."},

{"id":"esf-s1-03","type":"qa","course":"ESF","topic":"Sitzung 1 — ESF Grundlagen","tags":["Empirie","Theorie","dialektisch"],"difficulty":2,
"front":"Was ist der Unterschied zwischen Theorie und Empirie, und wie stehen sie zueinander?",
"back":"Theorie: System widerspruchsfreier Aussagen — erklärt & prognostiziert, bereits bewährt.\n\nEmpirie: Beschreibung der Wirklichkeit durch systematische Erfahrungen — noch nicht ausreichend bewährt. Reicht von historischen Quellenstudien über quantitative bis qualitative Daten.\n\nIhr Verhältnis: DIALEKTISCH → sie bedingen sich gegenseitig:\n→ Theorie leitet empirische Untersuchung\n→ Empirie überprüft und entwickelt Theorie weiter\n→ verbesserte Theorie leitet neue Empirie\n\nFALLSTRICK: «Empirie ist das Gleiche wie Praxis» — FALSCH. Empirie ist systematisch gesammeltes Erfahrungswissen."},

{"id":"esf-s1-04","type":"qa","course":"ESF","topic":"Sitzung 1 — ESF Grundlagen","tags":["Forschungsmethode","Handlungsanweisungen"],"difficulty":1,
"front":"Was sind Forschungsmethoden? Welche Rolle spielen sie in der ESF?",
"back":"Methoden = Systeme von Handlungsanweisungen und Regeln, um bestimmte Erkenntnisse zu realisieren oder Informationen zu sammeln.\n\nSie bilden das Bindeglied zwischen Theorie und Empirie: Wie erhebe ich Daten? Wie analysiere ich sie?\n\nMethodischer Zugang bestimmt ob: qualitativ oder quantitativ\n\nMERKE: Methode ≠ Technik. Methode = übergeordnete Strategie; Technik = konkretes Instrument (z.B. Fragebogen)."},

{"id":"esf-s1-05","type":"qa","course":"ESF","topic":"Sitzung 1 — ESF Grundlagen","tags":["Ziele","ESF","Gesellschaft"],"difficulty":1,
"front":"Welche vier Hauptziele verfolgt die empirische Sozialforschung?",
"back":"① Beschreibung und Erklärung des sozialen Lebens (zuverlässige, valide, gut dokumentierte Informationen)\n② Entwickeln und Testen von Theorien\n③ Verständnis über menschliches Verhalten aufbauen\n④ Forschung zur Lösung gesellschaftlicher Probleme nutzen\n\nBeispiel aus Geschichte: Charles Booth (1840–1916) zeigte, dass Armut durch Arbeitslosigkeit, Unterbezahlung und Krankheit entsteht — nicht durch Faulheit. → Ziel ④: gesellschaftliches Problem lösen."},

{"id":"esf-s1-06","type":"qa","course":"ESF","topic":"Sitzung 1 — ESF Grundlagen","tags":["Theorie","Empirie","Methode","3 Säulen"],"difficulty":2,
"front":"Ein Dozent sagt: «Theorie, Empirie und Methode sind die drei Säulen der ESF.» Eine Studentin ergänzt: «Und sie stehen isoliert nebeneinander.» Wer hat Recht?",
"back":"Der Dozent hat recht, die Studentin NICHT.\n\nDie drei Säulen stehen NICHT isoliert — sie stehen in einem dialektischen Verhältnis:\n• Theorie gibt vor, was untersucht wird (Konzepte, Hypothesen)\n• Methode legt fest, wie untersucht wird\n• Empirie liefert das Datenmaterial\n• Ergebnisse fliessen zurück in die Theorie\n\nOhne Theorie: Daten ohne Interpretation\nOhne Empirie: Theorie ohne Überprüfung\nOhne Methode: Kein systematisches Vorgehen\n\nAlle drei bedingen sich gegenseitig."},

// ── Sitzung 1: Forschungsprozess ─────────────────────────────────
{"id":"esf-s1-07","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsprozess","tags":["Bryman","Schritte","Reihenfolge"],"difficulty":2,
"front":"Nennen Sie die 7 Schritte des Forschungsprozesses nach Bryman in der richtigen Reihenfolge.",
"back":"① Literaturrecherche — kritische Überprüfung bestehender Forschung\n② Konzeption & Theorie — leitende Ideen formulieren\n③ Forschungsfrage — Ziel des Projekts, Hypothesen\n④ Stichprobenauswahl — Definition der Stichprobe\n⑤ Datenerhebung — Interviews, Umfragen, Archive\n⑥ Datenanalyse — Auswertung & Interpretation\n⑦ Schreiben — Aufarbeitung, Dissemination, Publikation\n\nMERKE: Erst DENKEN (①–③), dann PLANEN (④), dann TUN (⑤–⑦)\n\nPRÜFUNGSFALLE: «Daten erheben vor der Forschungsfrage» — FALSCH!"},

{"id":"esf-s1-08","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsprozess","tags":["nicht-standardisiert","iterativ","Prozess"],"difficulty":2,
"front":"Was bedeutet es, dass der Forschungsprozess «nicht standardisiert» ist? Nennen Sie zwei Implikationen.",
"back":"Nicht standardisiert = kein einziges fixes Schema für alle Projekte.\n\nImplikationen:\n① Iterativ: Schritte können wiederholt werden (z.B. Literaturrecherche nach erster Auswertung nochmals)\n② Variabel: Je nach Forschungsfrage, Methode und Disziplin unterschiedliche Abfolge möglich\n\nDennoch: Logische Grundstruktur bleibt (erst Frage, dann Daten, dann Analyse)\n\nBeispiel: Eine Grounded-Theory-Studie beginnt mit Datenerhebung und entwickelt die Theorie erst danach — umgekehrt zum deduktiven Modell."},

{"id":"esf-s1-09","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsprozess","tags":["Forschungsfrage","Hypothesen","Literatur"],"difficulty":2,
"front":"Eine Forscherin überspringt die Literaturrecherche und formuliert sofort eine Forschungsfrage. Welche zwei Probleme entstehen dadurch?",
"back":"Problem ①: Fehlende theoretische Einbettung — sie weiss nicht, was bereits bekannt ist; Gefahr: bestehende Erkenntnisse werden ignoriert oder wiederholt\n\nProblem ②: Unklare Forschungslücke — ohne Literaturkenntnis ist unklar, ob die Frage überhaupt relevant oder neu ist\n\nLaut Bryman: Literaturrecherche kommt VOR Konzeption und Forschungsfrage — sie bildet die Grundlage für alles Folgende.\n\nZusatz: Ohne Literaturkontext fehlt die Vergleichsbasis für die Interpretation der Ergebnisse."},

// ── Sitzung 1: Forschungsdesign ──────────────────────────────────
{"id":"esf-s1-10","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["Forschungsdesign","Definition","Plan"],"difficulty":1,
"front":"Was umfasst das Forschungsdesign laut Definition? Welche drei Elemente muss es festlegen?",
"back":"«Plan für die Auswahl der Proband*innen, den Ort der Datenerhebung sowie die genauen Datenerhebungsmethoden, welche für die Beantwortung der Forschungsfrage/en und die Überprüfung der Hypothesen erforderlich sind.»\n\nDie drei Kernelemente:\n① Wer? → Stichprobenauswahl (Probanden)\n② Wo? → Ort der Datenerhebung\n③ Wie? → Datenerhebungsmethoden\n\nMERKE: Design ≠ Methode. Das Design ist der übergeordnete PLAN; die Methode ist das konkrete Instrument."},

{"id":"esf-s1-11","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["qualitativ","quantitativ","Ziel","Schlussverfahren"],"difficulty":2,
"front":"Vergleichen Sie qualitative und quantitative Forschung bezüglich: (a) Ziel, (b) Schlussverfahren, (c) Forschungslogik.",
"back":"(a) Ziel:\nQualitativ: Verstehen, Rekonstruieren, Gesetzmässigkeiten GENERIEREN\nQuantitativ: Erklären, Kausalitäten bilden, Gesetze auf Gültigkeit PRÜFEN\n\n(b) Schlussverfahren:\nQualitativ → Induktiv (Spezielles → Allgemeines)\nQuantitativ → Deduktiv (Allgemeines → Spezielles)\n\n(c) Forschungslogik:\nQualitativ → hypothesenentwickelnd (neue Theorie aus Daten)\nQuantitativ → hypothesenprüfend (bestehende Theorie testen)\n\nFALLSTRICK: «Qualitative Forschung ist unwissenschaftlich» — FALSCH. Beide sind wissenschaftlich, nur andere Erkenntnisziele."},

{"id":"esf-s1-12","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["qualitativ","quantitativ","Erhebungsmethoden","Daten"],"difficulty":2,
"front":"Welche Erhebungsmethoden und Datenmerkmale sind typisch für (a) qualitative und (b) quantitative Forschung?",
"back":"(a) Qualitativ:\nMethoden: Interview, Gruppendiskussion, Beobachtung, qual. Inhaltsanalyse, Einzelfallstudie\nDaten: nicht-numerisch, explikativ, «weich», realitätsnah, ganzheitlich-holistisch\nUmfang: Untersuchung eines Einzelfalls\n\n(b) Quantitativ:\nMethoden: Standardisierte Befragung, Experiment, standardisierte Beobachtung, standardisierte Inhaltsanalyse\nDaten: numerisch, reduktiv, «hart», replizierbar, partikular\nUmfang: Untersuchung einer Stichprobe\n\nMERKE: «Standardisiert» = gleiche Messung für alle → Vergleichbarkeit → quantitativ."},

{"id":"esf-s1-13","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["qualitativ","quantitativ","Wann","Anwendung"],"difficulty":2,
"front":"Wann setzt man qualitative, wann quantitative Forschung ein? Nennen Sie je zwei typische Einsatzsituationen.",
"back":"Qualitativ einsetzen wenn:\n① Komplexe Zusammenhänge mit wenig Vorwissen (explorativ)\n② Tiefe Einblicke über einen Forschungsgegenstand nötig\nBeispiel: «Was erleben Pflegekräfte bei der Einführung neuer Software?»\n\nQuantitativ einsetzen wenn:\n① Häufigkeit oder Verteilung eines Phänomens gemessen werden soll\n② Hypothesen geprüft oder allgemeingültige Aussagen getroffen werden sollen\nBeispiel: «Steigert flexible Arbeitszeit die Produktivität? (n=500)»\n\nFAUSTREGEL: Neues Terrain → qualitativ; Hypothesen testen → quantitativ."},

{"id":"esf-s1-14","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["Mixed Methods","Triangulation","Sequential"],"difficulty":2,
"front":"Was ist der Mixed-Method-Ansatz? Was ist sein Ziel, und welche Designvarianten gibt es?",
"back":"Definition: Vereint Aspekte quantitativer und qualitativer Forschung in einer Studie.\n\nZiel: Vorteile beider Ansätze kombinieren; Ergebnisse durch zweite Methode validieren → aussagekräftigere Ergebnisse.\n\nDesignvarianten:\n① Sequential Explanatory: erst quantitativ (breite Muster), dann qualitativ (Erklärung)\n② Sequential Exploratory: erst qualitativ (neue Konzepte), dann quantitativ (Generaliserbarkeit testen)\n③ Concurrent Triangulation: beide gleichzeitig, Konvergenz prüfen\n\nMERKE: Triangulation = Ergebnisse aus verschiedenen Methoden werden zusammengeführt → erhöht Glaubwürdigkeit."},

{"id":"esf-s1-15","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["Szenario","qualitativ","quantitativ","Erkennen"],"difficulty":3,
"front":"Ordnen Sie die Forschungsfragen dem richtigen Ansatz zu und begründen Sie:\n(A) «Welche emotionalen Strategien entwickeln Eltern alleinerziehend nach Trennung?»\n(B) «Gibt es einen Zusammenhang zwischen Schlafstunden und akademischer Leistung bei HSG-Studierenden?»",
"back":"(A) → QUALITATIV\nBegründung: explorativ, wenig Vorwissen, tiefe subjektive Einblicke gesucht, individuelle Strategien (nicht zählbar) → Interview/Einzelfallstudie; induktiv; kleines Sample\n\n(B) → QUANTITATIV\nBegründung: Zusammenhang zweier konkreter Variablen (Schlaf ↔ Leistung), Hypothese prüfbar, allgemeingültige Aussage angestrebt, messbar → standardisierte Befragung; deduktiv; repräsentatives Sample\n\nPRÜFUNGSSTRATEGIE: «Warum/Wie erlebt?» → qualitativ. «Wie häufig/Gibt es einen Zusammenhang?» → quantitativ."},

{"id":"esf-s1-16","type":"qa","course":"ESF","topic":"Sitzung 1 — Forschungsdesign","tags":["Stärken","Schwächen","qualitativ","quantitativ"],"difficulty":2,
"front":"Welche Stärken hat qualitative Forschung, die quantitative Forschung nicht hat — und umgekehrt?",
"back":"Stärken qualitativ (die quantitativ NICHT hat):\n+ Generierung von neuem Wissen (explorativ)\n+ Kleine Stichprobe ausreichend\n+ Subjektive, detaillierte, anschauliche Antworten\n+ Kontext bleibt erhalten\n\nStärken quantitativ (die qualitativ NICHT hat):\n+ Hohe Reliabilität (wiederholbar, vergleichbar)\n+ Schnelle Verarbeitung grosser Datenmengen\n+ Intervallskalenniveau → hohe Vergleichbarkeit\n+ Kausalitätsnachweis möglich (via Experiment)\n+ Repräsentativität erreichbar\n\nFALLSTRICK: «Quantitativ ist objektiver» — nicht pauschal richtig; auch qualitativ hat strenge Gütekriterien."},

// ── Sitzung 1: Primär- und Sekundärdaten ─────────────────────────
{"id":"esf-s1-17","type":"qa","course":"ESF","topic":"Sitzung 1 — Primär & Sekundärdaten","tags":["Primärdaten","Sekundärdaten","Definition"],"difficulty":1,
"front":"Was ist der grundlegende Unterschied zwischen Primär- und Sekundärdaten?",
"back":"Primärdaten: Werden NEU und speziell für die eigene Forschungsfrage erhoben.\n→ Erhebungsmethoden: Befragung, Experiment, Beobachtung\n→ Vorteil: hohe Passung zur Frage\n→ Nachteil: teuer, zeitaufwändig\n\nSekundärdaten: BEREITS VORHANDEN, ursprünglich für andere Zwecke erhoben, werden wiederverwendet.\n→ Quellen: Statistiken, Archive, Social Media, Datenwettbewerbe (Kaggle)\n→ Vorteil: günstig, schnell verfügbar, grosse Stichproben\n→ Nachteil: Passung zur Forschungsfrage oft eingeschränkt\n\nFALLSTRICK: «Sekundär = minderwertig» — FALSCH. Sekundärdaten können hochwertig sein (z.B. Volkszählung)."},

{"id":"esf-s1-18","type":"qa","course":"ESF","topic":"Sitzung 1 — Primär & Sekundärdaten","tags":["Primärforschung","Vor- Nachteile"],"difficulty":2,
"front":"Nennen Sie je 3 Vor- und Nachteile der Primärforschung.",
"back":"VORTEILE (+):\n① Hohe Aktualität — Daten sind frisch\n② Gute Passung zur Forschungsfrage — massgeschneidert\n③ Einfluss auf Datenqualität — man kontrolliert Erhebung\n(Bonus: proprietär — Daten gehören einem selbst)\n\nNACHTEILE (−):\n① Längerer Zeitbedarf\n② Höhere Kosten\n③ Grösserer Personalaufwand\n\nFAUSTREGEL: Wenn kein passender Sekundärdatensatz existiert oder Aktualität entscheidend ist → Primärdaten."},

{"id":"esf-s1-19","type":"qa","course":"ESF","topic":"Sitzung 1 — Primär & Sekundärdaten","tags":["Sekundärforschung","Vor- Nachteile"],"difficulty":2,
"front":"Nennen Sie je 3 Vor- und Nachteile der Sekundärforschung.",
"back":"VORTEILE (+):\n① Schnelle Verfügbarkeit — sofort nutzbar\n② Niedrige Kosten — kein eigener Erhebungsaufwand\n③ Grosse Stichproben möglich (z.B. nationale Statistiken)\n\nNACHTEILE (−):\n① Mangelnde Passung zur Forschungsfrage\n② Wenig/keine Kontrolle über die Erhebung\n③ Fehlende Dokumentation (Messinstrument unklar)\n\nMERKE FÜR PRÜFUNG: Bei Sekundärdaten immer prüfen: Passen Zeitraum, Stichprobe und Messinstrument zur eigenen Frage?"},

{"id":"esf-s1-20","type":"qa","course":"ESF","topic":"Sitzung 1 — Primär & Sekundärdaten","tags":["Szenario","Primär","Sekundär","Entscheidung"],"difficulty":3,
"front":"Entscheiden und begründen Sie — Primär oder Sekundär?\n(A) Eine NGO will wissen, wie Menschen in der Schweiz 2026 über KI-Regulierung denken.\n(B) Ein Forscher untersucht, wie sich die Arbeitslosigkeit in EU-Ländern von 2000–2020 entwickelt hat.",
"back":"(A) → PRIMÄRDATEN\nBegründung: ① Aktuelles Thema (2026), keine bestehenden Datensätze vorhanden ② Spezifische Zielgruppe (Schweiz) ③ Spezifische Frage → nur eigene Erhebung passt\nMethode: Standardisierte Befragung (Umfrage)\n\n(B) → SEKUNDÄRDATEN\nBegründung: ① Historische Längsschnittdaten nicht selbst erhebbar ② Eurostat, OECD liefern passende Zeitreihendaten ③ Günstig und verfügbar\nRisiko: Erfassungsmethode kann sich über 20 Jahre geändert haben → Dokumentation prüfen!"},

{"id":"esf-s1-21","type":"qa","course":"ESF","topic":"Sitzung 1 — Primär & Sekundärdaten","tags":["Erhebungsarten","Befragung","Experiment","Beobachtung"],"difficulty":2,
"front":"Welche drei grundlegenden Arten der Primärdatenerhebung gibt es? Nennen Sie für jede ein typisches Beispiel.",
"back":"① Befragung (mündlich, schriftlich, online)\nBeispiel: Online-Fragebogen zur Kundenzufriedenheit\nStärke: Grosse Reichweite, standardisierbar\n\n② Beobachtung (teilnehmend/nicht-teilnehmend, offen/verdeckt)\nBeispiel: Ethnografische Beobachtung im Supermarkt (Kaufverhalten)\nStärke: Natürliches Verhalten ohne Antwortverzerrung\n\n③ Experiment (Labor, Feld, Online)\nBeispiel: A/B-Test zweier Webdesigns\nStärke: Kausalität nachweisbar durch Randomisierung\n\nMERKE: Nur das Experiment erlaubt Kausalaussagen!"},

// ── Sitzung 1: Prüfungstyp-Karten (Aussagen beurteilen) ──────────
{"id":"esf-s1-22","type":"qa","course":"ESF","topic":"Sitzung 1 — Prüfungstyp","tags":["Falsche Aussage","Sekundärdaten","Prüfungslogik"],"difficulty":3,
"front":"Welche dieser Aussagen über Sekundärdaten ist FALSCH?\nA) Sekundärdaten wurden ursprünglich für andere Zwecke erhoben.\nB) Sekundärdaten haben keine repräsentativen Stichproben.\nC) Sekundärdaten sind oft schneller verfügbar als Primärdaten.\nD) Zu Sekundärdatenquellen gehören öffentliche Statistiken.",
"back":"B ist FALSCH.\n\nBegründung: Sekundärdaten können sehr grosse, repräsentative Stichproben umfassen — z.B. Volkszählung (gesamte Bevölkerung), Eurostat (EU-weite Daten), OECD-Statistiken.\n\nDer eigentliche Nachteil von Sekundärdaten ist nicht die Stichprobengrösse, sondern die MANGELNDE PASSUNG zur eigenen Forschungsfrage.\n\nMERKE: Stichprobengrösse ≠ Datenqualität. Die Passung zur Forschungsfrage ist entscheidend."},

{"id":"esf-s1-23","type":"qa","course":"ESF","topic":"Sitzung 1 — Prüfungstyp","tags":["Falsche Aussage","Qualitative Forschung","Prüfungslogik"],"difficulty":3,
"front":"Welche dieser Aussagen zur qualitativen Forschung ist FALSCH?\nA) Qualitative Forschung arbeitet meist induktiv.\nB) Qualitative Forschung ist immer besser für explorative Fragen geeignet.\nC) Qualitative Forschung kann auch ein Experiment als Design nutzen.\nD) Qualitative Forschung erlaubt detaillierte, subjektive Einblicke.",
"back":"B enthält eine Übertreibung («immer») — aber die klar FALSCHE Aussage ist C für viele Studierende, die glauben, Experimente seien nur quantitativ.\n\nRichtigstellung zu C: Es gibt QUALITATIVE Experimente (z.B. qualitatives Experiment als Erhebungsmethode in der Tabelle aus den Slides — z.B. Beobachtung unter experimentellen Bedingungen ohne Quantifizierung).\n\nRichtigstellung zu B: «Immer» ist zu absolut — qualitativ kann auch für vertiefte Hypothesenentwicklung eingesetzt werden, auch wenn quantitatives Vorwissen vorhanden.\n\nMERKE: «Immer» und «nie» in Aussagen → Vorsicht! Fast immer falsch."},

{"id":"esf-s1-24","type":"qa","course":"ESF","topic":"Sitzung 1 — Prüfungstyp","tags":["Forschungsprozess","Reihenfolge","Prüfungslogik"],"difficulty":3,
"front":"Bringen Sie diese Schritte in die richtige Reihenfolge nach Bryman:\n— Stichprobenauswahl\n— Schreiben / Publikation\n— Forschungsfrage formulieren\n— Datenerhebung\n— Literaturrecherche",
"back":"Korrekte Reihenfolge:\n① Literaturrecherche\n② Forschungsfrage formulieren\n③ Stichprobenauswahl\n④ Datenerhebung\n⑤ Schreiben / Publikation\n\n(Vollständig nach Bryman: ①Lit → ②Konzeption/Theorie → ③Forschungsfrage → ④Stichprobe → ⑤Erhebung → ⑥Analyse → ⑦Schreiben)\n\nPRÜFUNGSFALLE: Oft wird «Datenerhebung vor Forschungsfrage» als Option angeboten — das ist FALSCH. Erst die Frage, dann die Daten."},

{"id":"esf-s1-25","type":"qa","course":"ESF","topic":"Sitzung 1 — Prüfungstyp","tags":["Theorie","Empirie","Verhältnis","MC-Typ"],"difficulty":3,
"front":"Welche Aussagen zum Verhältnis von Theorie und Empirie sind RICHTIG? (MC-Typ)\nA) Theorie und Empirie stehen in einem dialektischen Verhältnis.\nB) Eine Theorie ist ein bewiesenes Gesetz — sie kann nicht widerlegt werden.\nC) Empirie bezeichnet ein auf systematischen Erfahrungen basierendes Wissen.\nD) Die Wissenschaft hat die Aufgabe, Theorien auszuarbeiten, zu überprüfen und zu verbessern.\nE) Empirie und Theorie sind dasselbe, da beide Wissen beschreiben.",
"back":"RICHTIG: A, C, D\n\nA ✓ — dialektisches Verhältnis: gegenseitige Bedingtheit\nC ✓ — Empirie-Definition (Häder): auf systematischen Erfahrungen basierend\nD ✓ — Aufgabe der Wissenschaft laut Slides\n\nFALSCH:\nB ✗ — Theorien können NICHT «bewiesen» werden (Popper: nur Falsifikation möglich); sie sind widerspruchsfrei, aber nicht absolut wahr\nE ✗ — Theorie = System von Aussagen (erklärt/prognostiziert); Empirie = Beschreibung der Wirklichkeit, noch nicht ausreichend bewährt"},

// ── Sitzung 2: Forschungsfrage ────────────────────────────────────
{"id":"esf-s2-01","type":"qa","course":"ESF","topic":"Sitzung 2 — Forschungsfrage","tags":["forschungsfrage","definition","grundlagen"],"difficulty":1,
"front":"Was ist eine Forschungsfrage und welche Funktion hat sie im Forschungsprozess?",
"back":"Eine Forschungsfrage ist die zentrale Frage, um die sich der Schwerpunkt der Forschung dreht. Sie leitet das gesamte Forschungsprojekt und hilft bei der Konstruktion eines logischen Arguments.\n\nMERKE: Die Forschungsfrage ist der Ankerpunkt — sie bestimmt Methodik, Datenerhebung und Analyse. Ohne klare FF fehlt die Orientierung.\nFALLSTRICK: Eine Forschungsfrage ist NICHT dasselbe wie eine Hypothese. Die FF ist offen; die Hypothese ist eine gerichtete Antwort auf die FF."},

{"id":"esf-s2-02","type":"qa","course":"ESF","topic":"Sitzung 2 — Forschungsfrage","tags":["forschungsfrage","typen","deskriptiv","kausal","vergleich"],"difficulty":2,
"front":"Welche drei Typen von Forschungsfragen gibt es? Beschreibe jeden Typ kurz und nenne ein abstraktes Beispiel.",
"back":"1. Deskriptive Frage (\"Wie\"): Beschreibt ein Phänomen, ohne Ursachen zu erklären. Bsp.: \"Wie häufig nutzen Studierende soziale Medien?\"\n\n2. Vergleichsfrage: Untersucht Unterschiede zwischen zwei oder mehr Gruppen. Bsp.: \"Unterscheiden sich Männer und Frauen in ihrer politischen Partizipation?\"\n\n3. Kausalfrage: Untersucht eine Kausalbeziehung zwischen zwei oder mehr Variablen. Bsp.: \"Erhöht Arbeitszufriedenheit die Mitarbeiterproduktivität?\"\n\nMERKE: Kausalfragen implizieren Richtung (X verursacht Y). Vergleichsfragen implizieren Gruppenunterschiede, aber keine Kausalität.\nFALLSTRICK: \"Gibt es einen Zusammenhang zwischen X und Y?\" ist eine Korrelationsfrage — das ist keine eindeutige Kausalfrage!"},

{"id":"esf-s2-03","type":"cloze","course":"ESF","topic":"Sitzung 2 — Forschungsfrage","tags":["forschungsfrage","kriterien","qualität"],"difficulty":2,
"front":"Eine gute Forschungsfrage erfüllt folgende Kriterien: Sie ist {{klar}}, {{fokussiert}}, {{prägnant}}, {{eindeutig}}, {{exklusiv}} und {{ethisch}}.\n\nWas bedeutet 'exklusiv' in diesem Kontext?",
"back":"'Exklusiv' bedeutet, dass die Forschungsfrage NUR eine einzige Interpretation zulässt — also nicht doppeldeutig ist und nicht gleichzeitig mehrere verschiedene Fragen stellt.\n\nMERKE: Eine Frage wie \"Warum ist Armut verbreitet und wie kann man sie bekämpfen?\" ist NICHT exklusiv — sie enthält zwei Teilfragen.\nFALLSTRICK: 'Eindeutig' und 'exklusiv' klingen ähnlich, meinen aber Verschiedenes: Eindeutig = klare Bedeutung; Exklusiv = nur eine Frage auf einmal."},

{"id":"esf-s2-04","type":"qa","course":"ESF","topic":"Sitzung 2 — Forschungsfrage","tags":["forschungslücke","literatur","gap"],"difficulty":2,
"front":"Was ist eine Forschungslücke und wo findet man sie typischerweise in wissenschaftlichen Artikeln?",
"back":"Eine Forschungslücke ist ein Defizit in der bestehenden Forschung — etwas, das noch nicht ausreichend untersucht wurde oder zu dem widersprüchliche Ergebnisse vorliegen.\n\nTypische Fundorte in wissenschaftlichen Artikeln:\n- 'Limitations'-Abschnitte (Autoren benennen Grenzen ihrer eigenen Studie)\n- 'Future Research'-Abschnitte (Autoren schlagen weitere Forschung vor)\n\nMERKE: Die eigene Forschungsfrage sollte eine identifizierte Lücke adressieren — das legitimiert die Studie wissenschaftlich.\nFALLSTRICK: Eine Forschungslücke zu identifizieren bedeutet NICHT, dass das Thema völlig unerforscht ist — oft geht es um einen spezifischen Kontext, eine Gruppe oder einen Zusammenhang, der noch fehlt."},

// ── Sitzung 2: Hypothesen ────────────────────────────────────
{"id":"esf-s2-05","type":"qa","course":"ESF","topic":"Sitzung 2 — Hypothesen","tags":["hypothese","definition","eigenschaften"],"difficulty":1,
"front":"Was ist eine Hypothese und welche fünf zentralen Eigenschaften muss sie aufweisen?",
"back":"Eine Hypothese ist eine auf Grundlage von Theorien formulierte Aussage, die durch empirische Untersuchung überprüft werden kann.\n\nEigenschaften:\n1. Empirisch testbar (mit Daten überprüfbar)\n2. Über Einzelfälle hinausgehend (generalisierbar)\n3. Prognostisch (macht eine Vorhersage)\n4. Als Erklärung formuliert — NICHT als Frage\n5. VOR der Datenerhebung definiert (ex ante)\n\nMERKE: Punkt 4 und 5 sind häufige Prüfungsfallen. Hypothesen sind Aussagen (\"X erhöht Y\"), keine Fragen (\"Erhöht X Y?\").\nFALLSTRICK: Eine Hypothese, die NACH der Datenerhebung formuliert wird, ist keine echte Hypothese — das wäre HARKing (Hypothesizing After Results are Known)."},

{"id":"esf-s2-06","type":"qa","course":"ESF","topic":"Sitzung 2 — Hypothesen","tags":["hypothese","nullhypothese","alternativhypothese","H0","H1"],"difficulty":2,
"front":"Was ist der Unterschied zwischen Nullhypothese (H0) und Alternativhypothese (H1)?",
"back":"H0 (Nullhypothese): Behauptet, dass kein Effekt, kein Unterschied oder kein Zusammenhang besteht. Sie ist der 'Status quo', den man widerlegen möchte.\nBeispiel: \"Es gibt keinen Unterschied in der Lernleistung zwischen Gruppe A und B.\"\n\nH1 (Alternativhypothese): Behauptet das Gegenteil — dass ein Effekt, Unterschied oder Zusammenhang existiert.\nBeispiel: \"Gruppe A erzielt höhere Lernleistungen als Gruppe B.\"\n\nMERKE: Statistisch testet man immer gegen die H0. Man kann die H0 ablehnen (reject), aber nie beweisen.\nFALLSTRICK: Man 'beweist' KEINE Hypothese — man kann sie nur (nicht) verwerfen. \"Die H1 wurde bewiesen\" ist falsch."},

{"id":"esf-s2-07","type":"qa","course":"ESF","topic":"Sitzung 2 — Hypothesen","tags":["hypothese","gerichtet","ungerichtet","spezifisch","unspezifisch"],"difficulty":2,
"front":"Erkläre den Unterschied zwischen gerichteten und ungerichteten Hypothesen sowie zwischen spezifischen und unspezifischen Hypothesen.",
"back":"Gerichtet vs. Ungerichtet:\n- Gerichtet: Gibt die Richtung des Effekts an. Bsp.: \"Je mehr Sport, desto besser die Stimmung.\"\n- Ungerichtet: Sagt nur, dass ein Unterschied/Zusammenhang existiert, ohne Richtung. Bsp.: \"Es gibt einen Zusammenhang zwischen Sport und Stimmung.\"\n\nSpezifisch vs. Unspezifisch:\n- Spezifisch: Nennt konkrete Variablen, Gruppen oder Richtungen.\n- Unspezifisch: Bleibt vage bezüglich der genauen Natur des Zusammenhangs.\n\nMERKE: Gerichtete Hypothesen erfordern stärkere theoretische Vorannahmen, ermöglichen aber einseitige Tests.\nFALLSTRICK: Gerichtet ≠ Spezifisch. Eine Hypothese kann gerichtet und trotzdem unspezifisch sein."},

{"id":"esf-s2-08","type":"qa","course":"ESF","topic":"Sitzung 2 — Hypothesen","tags":["hypothese","formulierung","wenn-dann","je-desto"],"difficulty":2,
"front":"Welche sprachlichen Formulierungsformen gibt es für Hypothesen? Gib je ein Beispiel und erkläre, welche Form für nicht-lineare Zusammenhänge genutzt wird.",
"back":"Formulierungsformen:\n1. \"Wenn...dann\": Konditionale Form. Bsp.: \"Wenn die Temperatur steigt, dann sinkt die Arbeitsleistung.\"\n2. \"Je...desto\": Für lineare Zusammenhänge. Bsp.: \"Je mehr Schlaf, desto besser die Konzentration.\"\n3. Nicht-lineare Formen: Für U-förmige oder kurvilineare Zusammenhänge. Bsp.: \"Der Zusammenhang zwischen Stress und Leistung folgt einem umgekehrten U.\"\n\nNicht-lineare Typen:\n- U-förmig (z.B. Yerkes-Dodson: mittleres Arousal = beste Leistung)\n- Abnehmender Zuwachs (Sättigungskurve)\n\nMERKE: \"Je...desto\" impliziert immer einen linearen Zusammenhang — bei U-Kurven ist diese Form irreführend.\nFALLSTRICK: Nicht jede Beziehung ist linear. Die Wahl der Formulierungsform sollte den theoretischen Zusammenhang widerspiegeln."},

{"id":"esf-s2-09","type":"qa","course":"ESF","topic":"Sitzung 2 — Hypothesen","tags":["hypothese","theorie","unterschied"],"difficulty":2,
"front":"Was ist der fundamentale Unterschied zwischen einer Hypothese und einer Theorie?",
"back":"Hypothese:\n- Noch nicht wissenschaftlich bewiesen\n- Basiert auf begrenzten Daten oder theoretischen Überlegungen\n- Überprüfbare Einzelaussage\n- Vorläufig und spekulativ\n\nTheorie:\n- Wissenschaftlich gut belegt und akzeptiert\n- Basiert auf vielen Daten aus verschiedenen Studien\n- Erklärendes Rahmenwerk für eine Klasse von Phänomenen\n- Stabil, aber prinzipiell revidierbar\n\nMERKE: Im Alltag wird 'Theorie' oft als 'Vermutung' verwendet — in der Wissenschaft ist eine Theorie das Gegenteil: gut gestützt und robust.\nFALLSTRICK: Eine Hypothese wird nicht automatisch zur Theorie, wenn sie einmal bestätigt wurde — Theorien entstehen aus vielen replizierten Befunden."},

{"id":"esf-s2-10","type":"prüfungstyp","course":"ESF","topic":"Sitzung 2 — Hypothesen","tags":["prüfungstyp","single-choice","hypothese","eigenschaften"],"difficulty":3,
"front":"PRÜFUNGSFRAGE (Single Choice): Welche der folgenden Aussagen beschreibt KEINE gültige Eigenschaft einer wissenschaftlichen Hypothese?\n\nA) Sie ist empirisch überprüfbar.\nB) Sie geht über Einzelfälle hinaus.\nC) Sie wird nach der Datenanalyse formuliert, um die Ergebnisse zu erklären.\nD) Sie macht eine Vorhersage über einen Zusammenhang.\nE) Sie ist als Erklärung, nicht als Frage formuliert.",
"back":"Korrekte Antwort: C\n\nWARUM:\nA) Korrekte Eigenschaft — Hypothesen müssen empirisch testbar sein.\nB) Korrekte Eigenschaft — Generalisierbarkeit ist zentral.\nC) FALSCH — Hypothesen müssen VOR der Datenerhebung definiert werden. Das nachträgliche Formulieren nennt sich HARKing und ist wissenschaftlich problematisch.\nD) Korrekte Eigenschaft — prognostischer Charakter ist wesentlich.\nE) Korrekte Eigenschaft — eine Frage ist keine Hypothese.\n\nMERKE: Der Zeitpunkt der Formulierung (ex ante) ist ein entscheidendes Kriterium. Nachträgliche Hypothesen sind methodisch unzulässig."},

// ── Sitzung 2: Konzeptualisierung ────────────────────────────────────
{"id":"esf-s2-11","type":"qa","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["deduktion","induktion","abduktion","logik"],"difficulty":2,
"front":"Erkläre die drei Schlusslogiken: Deduktion, Induktion und Abduktion. In welche Richtung verläuft das Denken jeweils?",
"back":"Deduktion (Allgemein → Spezifisch):\n- Ausgehend von bestehender Theorie werden spezifische Hypothesen abgeleitet.\n- Ziel: Theorien falsifizieren oder verifizieren.\n- Typisch für quantitative Forschung.\n\nInduktion (Spezifisch → Allgemein):\n- Aus empirischen Beobachtungen werden allgemeine Muster und Theorien entwickelt.\n- Ziel: Theorieentwicklung aus Daten.\n- Typisch für qualitative und explorative Forschung.\n\nAbduktion (iterativ zwischen Theorie ↔ Daten):\n- Wechselspiel zwischen Theorie und empirischen Befunden.\n- Ziel: Theoriebildung oder -modifikation durch iterativen Prozess.\n- Typisch für Mixed-Methods oder Grounded Theory.\n\nMERKE: Abduktion ist kein Mittelweg, sondern ein eigenständiger Ansatz mit iterativem Charakter.\nFALLSTRICK: Deduktion 'beweist' keine Theorie — sie testet nur, ob Daten mit der Theorie konsistent sind."},

{"id":"esf-s2-12","type":"cloze","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["variablen","UV","AV","mediator","moderator"],"difficulty":1,
"front":"Vervollständige: In einem konzeptionellen Modell ist die {{UV (unabhängige Variable)}} die Ursache, die {{AV (abhängige Variable)}} die Wirkung. Ein {{Mediator}} erklärt WIE oder WARUM die UV auf die AV wirkt. Ein {{Moderator}} verändert die STÄRKE oder RICHTUNG des Zusammenhangs zwischen UV und AV.",
"back":"UV = Unabhängige Variable (Ursache/Predictor)\nAV = Abhängige Variable (Wirkung/Outcome)\nMediator = Erklärt den Mechanismus (WIE/WARUM)\nModerator = Verändert die Beziehung (STÄRKE/RICHTUNG)\n\nMERKE: Der Mediator liegt im kausalen Pfad (UV → Mediator → AV). Der Moderator beeinflusst den Pfad von außen.\nFALLSTRICK: Mediator und Moderator werden sehr häufig verwechselt! Mediator = Mechanismus; Moderator = Kontext/Bedingung."},

{"id":"esf-s2-13","type":"qa","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["mediator","moderation","unterschied","konzeptmodell"],"difficulty":3,
"front":"Erkläre den Unterschied zwischen Mediation und Moderation anhand je eines abstrakten Beispiels. Zeichne die Wirkungspfade auf.",
"back":"MEDIATION (UV → Mediator → AV):\nUV wirkt DURCH den Mediator auf die AV.\nBeispiel: Bildung (UV) → Einkommen (Mediator) → Gesundheit (AV).\nPfad: Bildung erhöht Einkommen, höheres Einkommen verbessert Gesundheit.\nDer Mediator erklärt den MECHANISMUS.\n\nMODERATION (UV + Moderator → AV):\nDer Moderator verändert die STÄRKE des UV→AV Zusammenhangs.\nBeispiel: Training (UV) → Leistung (AV), moderiert durch Motivation (Moderator).\nBei hoher Motivation ist der Trainingseffekt stärker als bei niedriger Motivation.\n\nMERKE: Mediation: Der Mediator liegt im Pfad. Moderation: Der Moderator ist eine externe Bedingung.\nFALLSTRICK: \"Der Moderator erklärt, warum\" ist FALSCH — das ist die Funktion des Mediators. Der Moderator erklärt, UNTER WELCHEN BEDINGUNGEN."},

{"id":"esf-s2-14","type":"prüfungstyp","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["prüfungstyp","single-choice","mediator","moderator"],"difficulty":3,
"front":"PRÜFUNGSFRAGE (Single Choice): Ein Forscher findet heraus, dass der Effekt von sozialem Stress auf Burnout bei Personen mit hoher Resilienz deutlich geringer ist als bei Personen mit niedriger Resilienz. Welche Rolle spielt Resilienz in diesem Modell?\n\nA) Abhängige Variable\nB) Unabhängige Variable\nC) Mediator\nD) Moderator\nE) Kontrollvariable",
"back":"Korrekte Antwort: D (Moderator)\n\nWARUM:\nA) Falsch — die AV ist Burnout.\nB) Falsch — die UV ist sozialer Stress.\nC) Falsch — ein Mediator würde erklären, DURCH WAS Stress zu Burnout führt (z.B. Stress → Schlafmangel → Burnout). Resilienz liegt nicht im kausalen Pfad.\nD) RICHTIG — Resilienz verändert die STÄRKE des Zusammenhangs zwischen Stress (UV) und Burnout (AV). Das ist die Definition eines Moderators.\nE) Falsch — Kontrollvariablen werden statistisch konstant gehalten, nicht als Interaktionseffekte modelliert.\n\nMERKE: Schlüsselwörter für Moderatoren: 'abhängig von', 'stärker bei', 'nur wenn', 'unter der Bedingung'."},

{"id":"esf-s2-15","type":"qa","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["konzeptmodell","variablen","forschungsdesign"],"difficulty":2,
"front":"Was ist ein konzeptionelles Modell und was stellt es dar?",
"back":"Ein konzeptionelles Modell visualisiert die kausalen Wechselbeziehungen zwischen den untersuchten Variablen in einem Forschungsprojekt.\n\nEs stellt dar:\n- Alle relevanten Variablen (UV, AV, Mediatoren, Moderatoren)\n- Die vermuteten Richtungen der Zusammenhänge (Pfeile)\n- Die Integration aller Hypothesen in ein kohärentes Bild\n\nMERKE: Das konzeptionelle Modell ist die visuelle Übersetzung der Theorie in ein überprüfbares Gerüst. Es entsteht VOR der Datenerhebung.\nFALLSTRICK: Ein konzeptionelles Modell ist KEIN Ergebnismodell — es zeigt theoretisch angenommene, nicht empirisch bewiesene Zusammenhänge."},

{"id":"esf-s2-16","type":"why","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["deduktion","induktion","forschungslogik","theorie"],"difficulty":3,
"front":"WARUM ist Deduktion die dominante Logik in quantitativer Forschung, während Induktion eher in qualitativer Forschung vorherrscht?",
"back":"Quantitative Forschung / Deduktion:\nDeduktion beginnt mit einer bestehenden Theorie und leitet messbare Hypothesen ab. Quantitative Methoden (Surveys, Experimente) testen diese Hypothesen an großen Stichproben. Die Logik ist: 'Widerlegen oder bestätigen.' Das erfordert, dass Konzepte bereits operationalisiert und in Zahlen übersetzt sind.\n\nQualitative Forschung / Induktion:\nInduktion beginnt ohne feste Hypothesen und entwickelt Muster aus reichhaltigen Daten (Interviews, Beobachtungen). Ziel ist es, neue Konzepte und Theorien zu generieren, die die Realität der Teilnehmenden erfassen.\n\nMERKE: Die Logik sollte zur Forschungsfrage passen. Explorative FF → Induktion; Hypothesentestende FF → Deduktion.\nFALLSTRICK: Qualitative Forschung kann auch deduktiv sein (z.B. deduktive Inhaltsanalyse). Die Verbindung ist eine Tendenz, kein absolutes Gesetz."},

// ── Sitzung 2: Literaturrecherche ────────────────────────────────────
{"id":"esf-s2-17","type":"qa","course":"ESF","topic":"Sitzung 2 — Literaturrecherche","tags":["quellen","primär","sekundär","tertiär"],"difficulty":1,
"front":"Unterscheide Primär-, Sekundär- und Tertiärquellen. Ordne folgende Quellen zu: (a) ein Interview, (b) eine Biographie, (c) eine Enzyklopädie, (d) ein Journalartikel, (e) ein Editorial.",
"back":"Primärquellen: Originalquellen — direkte Daten ohne Interpretation.\n(a) Interview → PRIMÄR\n(d) Journalartikel (Originalstudie) → PRIMÄR\n\nSekundärquellen: Analysieren oder interpretieren Primärdaten.\n(b) Biographie → SEKUNDÄR\n(e) Editorial (kommentiert Originalforschung) → SEKUNDÄR\n\nTertiärquellen: Kompilationen und Übersichten über Primär- und Sekundärliteratur.\n(c) Enzyklopädie → TERTIÄR\n\nMERKE: Der entscheidende Unterschied ist die Nähe zur Originalinformation. Primärquellen SIND die Daten; Sekundärquellen REDEN ÜBER die Daten.\nFALLSTRICK: Ein Review-Artikel (Meta-Analyse, systematic review) ist eine Sekundärquelle, auch wenn er in einer Fachzeitschrift erscheint!"},

{"id":"esf-s2-18","type":"qa","course":"ESF","topic":"Sitzung 2 — Literaturrecherche","tags":["boolesche operatoren","recherche","datenbanksuche"],"difficulty":2,
"front":"Erkläre die Funktion der Booleschen Operatoren AND, OR und NOT bei der Datenbankrecherche. Welche Sonderzeichen gibt es für Wortsuchen?",
"back":"AND: Grenzt die Suche EIN — alle Terme müssen im Ergebnis vorkommen.\nBeispiel: 'climate AND health' → nur Artikel, die beide Begriffe enthalten.\n\nOR: Erweitert die Suche — mindestens einer der Terme muss vorkommen.\nBeispiel: 'youth OR adolescent' → Artikel mit einem der Begriffe.\n\nNOT: Schließt Terme AUS.\nBeispiel: 'depression NOT economics' → schließt wirtschaftliche Artikel aus.\n\nSonderzeichen:\n* (Asterisk/Trunkierung): Sucht den Wortstamm. 'educat*' findet education, educate, educational.\n# : Alternative Schreibweise (z.B. colo#r findet color und colour).\n? : Ersetzt genau ein Zeichen. 'wom?n' findet woman und women.\n\nMERKE: AND = einschränken; OR = erweitern. Diese Logik umgekehrt zu denken ist ein häufiger Fehler.\nFALLSTRICK: AND schränkt EIN (weniger Treffer), OR erweitert (mehr Treffer) — nicht umgekehrt!"},

{"id":"esf-s2-19","type":"qa","course":"ESF","topic":"Sitzung 2 — Literaturrecherche","tags":["journal-ranking","VHB","FT50","qualität"],"difficulty":2,
"front":"Welche zwei Journal-Ranking-Systeme werden in der ESF-Vorlesung genannt? Was bedeuten die Kategorien beim VHB Jourqual?",
"back":"Zwei Journal-Ranking-Systeme:\n1. VHB Jourqual (Verband der Hochschullehrer für Betriebswirtschaft)\n2. Financial Times 50 List (FT 50)\n\nVHB Jourqual Kategorien (von hoch nach niedrig):\n- A+ : Weltklasse-Journals (z.B. Science, Nature in der BWL)\n- A : Exzellente internationale Journals\n- B : Sehr gute internationale Journals\n- C : Gute Journals\n- D : Akzeptable Journals\n- E : Nicht gerankt / nicht empfohlen\n\nMERKE: Je höher das Journal-Ranking, desto strenger der Peer-Review-Prozess und desto höher die Qualitätsanforderungen.\nFALLSTRICK: Ein niedriges Ranking bedeutet nicht, dass die Studie wertlos ist — es signalisiert nur einen niedrigeren Qualitätsstandard des Journals."},

{"id":"esf-s2-20","type":"prüfungstyp","course":"ESF","topic":"Sitzung 2 — Literaturrecherche","tags":["prüfungstyp","multiple-choice","quellen","operatoren"],"difficulty":3,
"front":"PRÜFUNGSFRAGE (Multiple Choice — ALLE müssen stimmen): Welche der folgenden Aussagen über Quellen und Recherche sind KORREKT?\n\nA) Der Boolesche Operator OR schränkt die Suchergebnisse ein.\nB) Ein Journalartikel, der eine eigene empirische Studie berichtet, ist eine Primärquelle.\nC) Tertiärquellen wie Enzyklopädien eignen sich als Hauptquellen in wissenschaftlichen Arbeiten.\nD) Der Asterisk (*) sucht nach dem Wortstamm und findet alle Ableitungen.\nE) Eine Biographie ist eine Sekundärquelle.",
"back":"Korrekte Antworten: B, D, E\n\nEINZELAUSWERTUNG:\nA) FALSCH — OR ERWEITERT die Suche (mehr Treffer, nicht weniger). AND schränkt ein.\nB) RICHTIG — Ein Originalartikel mit eigenen Daten und Methoden ist eine Primärquelle.\nC) FALSCH — Tertiärquellen (Enzyklopädien, Datenbanken) sind als Einstieg geeignet, aber NICHT als Hauptquellen in wissenschaftlichen Arbeiten.\nD) RICHTIG — Bsp.: 'organiz*' findet organize, organization, organizational.\nE) RICHTIG — Biographien interpretieren/analysieren das Leben einer Person (Primärdaten), sind daher Sekundärquellen.\n\nMERKE: Bei Multiple-Choice-Fragen, bei denen ALLE Antworten korrekt sein müssen: Eine einzige falsche Antwort im Set = 0 Punkte!"},

{"id":"esf-s2-21","type":"qa","course":"ESF","topic":"Sitzung 2 — Konzeptualisierung","tags":["konzeptualisierung","forschungsdesign","zusammenfassung"],"difficulty":3,
"front":"Ein Student möchte untersuchen, ob flexible Arbeitszeiten die Produktivität erhöhen, und vermutet, dass dieser Effekt bei intrinsisch motivierten Mitarbeitern stärker ist. Identifiziere UV, AV und den Typ der dritten Variable.",
"back":"UV (Unabhängige Variable): Flexible Arbeitszeiten (ja/nein oder Ausmaß der Flexibilität)\nAV (Abhängige Variable): Produktivität\nDritte Variable: Intrinsische Motivation → MODERATOR\n\nBegründung: Die intrinsische Motivation liegt NICHT im Kausalpfad zwischen Arbeitszeiten und Produktivität. Sie verändert die STÄRKE des Zusammenhangs ('stärker bei intrinsisch motivierten Mitarbeitern'). Das ist die Definition eines Moderators.\n\nVergleich — wenn es ein Mediator wäre: 'Flexible Arbeitszeiten führen zu höherer intrinsischer Motivation, was dann die Produktivität steigert.' → In diesem Fall wäre Motivation der Mediator.\n\nMERKE: Die Schlüsselfrage ist: Liegt die Variable IM Pfad (Mediator) oder beeinflusst sie den Pfad von außen (Moderator)?\nFALLSTRICK: Der Satz 'der Effekt ist stärker bei Gruppe X' ist ein klares Signal für einen Moderator, nicht einen Mediator."},

{"id":"esf-s2-22","type":"qa","course":"ESF","topic":"Sitzung 2 — Übergreifend","tags":["zusammenfassung","prüfungsvorbereitung","sitzung2","überblick"],"difficulty":2,
"front":"Nenne die häufigsten Verwechslungs-Fallen aus Sitzung 2, die in MC-Prüfungen auftauchen.",
"back":"TOP-VERWECHSLUNGEN Sitzung 2:\n\n1. Mediator vs. Moderator:\n   - Mediator = Mechanismus (WARUM/WIE) → liegt im Pfad\n   - Moderator = Bedingung (WANN/FÜR WEN) → beeinflusst Pfatstärke\n\n2. AND vs. OR in Booleschen Operatoren:\n   - AND = weniger Ergebnisse (einschränken)\n   - OR = mehr Ergebnisse (erweitern)\n\n3. Hypothese vs. Forschungsfrage:\n   - FF ist offen und fragenförmig\n   - Hypothese ist eine gerichtete Aussage, NICHT als Frage formuliert\n\n4. Primär- vs. Sekundärquelle:\n   - Journalartikel mit eigener Studie = PRIMÄR\n   - Review-Artikel, der andere Studien analysiert = SEKUNDÄR\n\n5. Deduktion vs. Induktion:\n   - Deduktion: Theorie → Daten (testen)\n   - Induktion: Daten → Theorie (entwickeln)\n\n6. Hypothesen werden VOR der Datenerhebung formuliert (ex ante)\n\nMERKE: Diese Punkte sind die häufigsten Fehlerquellen — bei Unsicherheit immer die Definition prüfen."}

// ── Sitzung 3: Experimente — Grundlagen ─────────────────────
{"id":"esf-s3-01","type":"qa","course":"ESF","topic":"Sitzung 3 — Experimente Grundlagen","tags":["experiment","kausalität","kernelemente"],"difficulty":2,
"front":"Was sind die 4 Kernelemente eines Experiments?",
"back":"1. Manipulation — eine unabhängige Variable wird gezielt verändert\n2. Randomisierung — zufällige Zuweisung zu Gruppen\n3. Messung — Erhebung der abhängigen Variable\n4. Kontrolle — Konstanthalten aller Störvariablen\n\nMERKE: Nur mit allen 4 Elementen ist ein echtes Experiment möglich.\nFALLSTRICK: Ein Quasi-Experiment erfüllt diese 4 Elemente NICHT vollständig — es fehlt die Randomisierung."},

// ── Sitzung 3: Kausalitätstypen ─────────────────────────────
{"id":"esf-s3-02","type":"qa","course":"ESF","topic":"Sitzung 3 — Kausalitätstypen","tags":["kausalität","typen","direkt"],"difficulty":2,
"front":"Beschreibe die 6 Typen von Kausalitätsbeziehungen und gib jeweils ein Kurzbeispiel.",
"back":"1. Direkte Kausalität: X → Y (Rauchen → Lungenkrebs)\n2. Umgekehrte Kausalität: Y → X (nicht Armut → Kriminalität, sondern Kriminalität → Armut?)\n3. Gemeinsame Ursache: Z → X und Z → Y (Stress → Schlafmangel UND Stress → schlechte Noten)\n4. Bidirektionale/Zyklische Kausalität: X ↔ Y (Armut ↔ schlechte Bildung)\n5. Indirekte Kausalität: X → Z → Y (Sport → Endorphine → bessere Stimmung)\n6. Keine Kausalität (Scheinkorrelation): z.B. Schokoladenkonsum & Nobelpreise\n\nMERKE: Kausalität lässt sich nur durch echtes Experiment mit Randomisierung sicher nachweisen.\nFALLSTRICK: Korrelation ≠ Kausalität — auch starke Korrelationen können Scheinkorrelationen sein."},

{"id":"esf-s3-03","type":"cloze","course":"ESF","topic":"Sitzung 3 — Kausalitätstypen","tags":["kausalität","mediator","indirekt"],"difficulty":3,
"front":"Bei indirekter Kausalität gilt das Schema X → {{Z}} → Y. Die Variable Z wird dabei als {{Mediator}} bezeichnet. Ein Beispiel: Bildung → {{Einkommen}} → Lebensqualität.",
"back":"Z = Mediator (Zwischenvariable)\n\nMERKE: Der Mediator Z liegt kausal zwischen X und Y auf dem Wirkpfad — er erklärt den Mechanismus der Beziehung.\nFALLSTRICK: Nicht verwechseln mit Z als gemeinsamer Ursache (Z → X und Z → Y), wo Z AUSSERHALB des Pfades liegt."},

{"id":"esf-s3-04","type":"why","course":"ESF","topic":"Sitzung 3 — Kausalitätstypen","tags":["scheinkorrelation","kausalität","beispiel"],"difficulty":2,
"front":"Warum ist die Korrelation zwischen Schokoladenkonsum und Nobelpreisen KEIN Beweis für Kausalität?",
"back":"Es handelt sich um eine Scheinkorrelation (Typ 6): Beide Variablen hängen von einer gemeinsamen Drittvariable ab (z.B. allgemeiner Wohlstand eines Landes), ohne dass eine die andere verursacht.\n\nMERKE: Korrelation zeigt nur, dass zwei Variablen zusammen variieren — nicht warum.\nFALLSTRICK: Hohe Korrelationswerte (r > 0.8) verleiten dazu, Kausalität anzunehmen. Ohne experimentelle Manipulation und Kontrolle ist das nicht zulässig."},

{"id":"esf-s3-05","type":"qa","course":"ESF","topic":"Sitzung 3 — Kausalitätstypen","tags":["kausalität","umgekehrt","bidirektional"],"difficulty":3,
"front":"Was ist der Unterschied zwischen umgekehrter Kausalität (Typ 2) und bidirektionaler Kausalität (Typ 4)?",
"back":"Umgekehrte Kausalität (Typ 2): Die Richtung ist einseitig, aber falsch angenommen. Man glaubt X → Y, tatsächlich gilt Y → X.\nBeispiel: Man glaubt, Depressionen führen zu sozialem Rückzug — tatsächlich führt sozialer Rückzug zu Depressionen.\n\nBidirektionale/Zyklische Kausalität (Typ 4): X und Y beeinflussen sich GEGENSEITIG. X → Y UND Y → X sind beide wahr.\nBeispiel: Armut ↔ schlechte Bildung (Armut erschwert Bildung, schlechte Bildung perpetuiert Armut).\n\nMERKE: Bei Typ 4 existiert eine Rückkopplungsschleife; bei Typ 2 ist nur eine Richtung korrekt.\nFALLSTRICK: Im MC-Kontext: Beide Typen können als «beide Richtungen» formuliert sein — auf Gegenseitigkeit vs. Einseitigkeit (aber falsche Richtung) achten."},

// ── Sitzung 3: Randomisierung ────────────────────────────────
{"id":"esf-s3-06","type":"why","course":"ESF","topic":"Sitzung 3 — Randomisierung","tags":["randomisierung","störvariablen","experiment"],"difficulty":2,
"front":"Warum ist Randomisierung das zentrale Mittel zur Kontrolle von Störvariablen im Experiment?",
"back":"Durch zufällige Zuweisung der Teilnehmer zu Experimental- und Kontrollgruppe werden alle unkontrollierten Merkmale (Alter, Persönlichkeit, Vorwissen usw.) im Durchschnitt gleichmäßig auf beide Gruppen verteilt.\n\nDadurch kann ein beobachteter Unterschied zwischen den Gruppen kausal auf die Manipulation (unabhängige Variable) zurückgeführt werden — nicht auf Unterschiede zwischen den Personen.\n\nMERKE: Randomisierung macht Störvariablen statistisch neutral, ohne sie einzeln messen zu müssen.\nFALLSTRICK: Randomisierung kontrolliert Störvariablen im Durchschnitt — bei sehr kleinen Stichproben kann Zufall trotzdem zu Ungleichgewichten führen."},

// ── Sitzung 3: Experiment-Typen ──────────────────────────────
{"id":"esf-s3-07","type":"qa","course":"ESF","topic":"Sitzung 3 — Experiment-Typen","tags":["laborexperiment","validität","stärken"],"difficulty":2,
"front":"Nenne je 2 Stärken und 2 Schwächen des Laborexperiments.",
"back":"STÄRKEN:\n1. Hohe interne Validität (Störvariablen kontrollierbar)\n2. Replikation möglich; komplexe Messungen durchführbar\n\nSCHWÄCHEN:\n1. Künstliche Umgebung → reduzierte externe Validität\n2. Geringe Generalisierbarkeit auf reale Situationen\n\nMERKE: Labor = intern stark, extern schwach.\nFALLSTRICK: «Hohe Kontrolle» klingt immer positiv, ist aber die URSACHE der reduzierten Generalisierbarkeit — beides gehört zusammen."},

{"id":"esf-s3-08","type":"qa","course":"ESF","topic":"Sitzung 3 — Experiment-Typen","tags":["feldexperiment","online","vergleich"],"difficulty":3,
"front":"Vergleiche Feldexperiment und Online-Experiment: Wo liegen die zentralen Unterschiede bei Validität und Kontrolle?",
"back":"Feldexperiment:\n• Hohe externe Validität (natürliche Umgebung, repräsentativere Stichprobe)\n• Niedrige interne Validität (wenig Kontrolle über Störvariablen, Datenschutzprobleme)\n\nOnline-Experiment:\n• Hohe Reichweite, schnell, kostengünstig\n• Wenig Kontrolle über Zeit/Ort der Teilnahme, verzerrte Teilnehmerattribute möglich, offene Fragen schwieriger umsetzbar\n\nMERKE: Feld → Realität hoch, Kontrolle niedrig; Online → Reichweite hoch, Kontrolle ebenfalls niedrig, aber aus anderen Gründen.\nFALLSTRICK: Online ≠ Feldexperiment. Online ist kein automatisch «echtes» Experiment — es fehlt oft die vollständige Kontrolle über die Situation."},

{"id":"esf-s3-09","type":"cloze","course":"ESF","topic":"Sitzung 3 — Experiment-Designs","tags":["between-subjects","within-subjects","design"],"difficulty":2,
"front":"Beim {{Between-subjects}}-Design werden verschiedene Personen verschiedenen Bedingungen zugewiesen. Beim {{Within-subjects}}-Design durchläuft dieselbe Person alle Bedingungen. Der Vorteil des Within-subjects-Designs ist, dass {{Personenunterschiede als Störvariable ausgeschaltet}} werden.",
"back":"Between-subjects: Verschiedene Personen, verschiedene Bedingungen → braucht mehr Teilnehmer\nWithin-subjects: Gleiche Personen, alle Bedingungen → Reihenfolgeeffekte möglich\n\nMERKE: Within = wirtschaftlicher, aber anfälliger für Lern- und Ermüdungseffekte.\nFALLSTRICK: Within-subjects klingt besser, hat aber das Problem von Carry-over-Effekten (frühere Bedingung beeinflusst spätere)."},

// ── Sitzung 3: Quasi-Experiment & andere Designs ─────────────
{"id":"esf-s3-10","type":"qa","course":"ESF","topic":"Sitzung 3 — Quasi-Experiment","tags":["quasi-experiment","kausalität","john-snow"],"difficulty":2,
"front":"Was unterscheidet ein Quasi-Experiment von einem echten Experiment, und was folgt daraus für die Kausalitätsaussage?",
"back":"Quasi-Experiment: Es fehlt die zufällige Zuordnung zu Gruppen. Die Gruppenbildung ist nicht kontrollierbar (z.B. natürliche Gruppen wie Stadtteile, vorhandene Klassen).\n\nFolge: Kausalität ist nur bedingt feststellbar, da Unterschiede zwischen Gruppen nicht sicher auf die Manipulation zurückgeführt werden können — vorher bestehende Gruppenunterschiede könnten das Ergebnis erklären.\n\nBeispiel: John Snows Cholera-Studie 1854 — er konnte nicht randomisieren, welche Haushalte welches Wasser tranken.\n\nMERKE: Quasi = kein Zufall → kein sicherer Kausalschluss.\nFALLSTRICK: Quasi-Experimente können dennoch starke Hinweise auf Kausalität geben (wie Snow), beweisen sie aber nicht im strengen Sinne."},

{"id":"esf-s3-11","type":"qa","course":"ESF","topic":"Sitzung 3 — Weitere Designs","tags":["metaanalyse","umfrage","design"],"difficulty":2,
"front":"Was ist der Unterschied zwischen einer Umfrage und einer Metaanalyse als Forschungsdesign?",
"back":"Umfrage: Primärdatenerhebung mittels Fragebogen bei einer Stichprobe. Ziel: Einstellungen, Meinungen, Verhalten messen. Formen: persönlich, postalisch, telefonisch, online.\n\nMetaanalyse: Statistische Analyse der Ergebnisse MEHRERER bereits existierender Studien (Sekundärdaten). Ziel: Übergreifende Effekte schätzen, Ergebnisse quantitativ zusammenfassen.\n\nMERKE: Metaanalyse = «Studie über Studien» — keine eigene Datenerhebung, sondern Synthese vorhandener Befunde.\nFALLSTRICK: Metaanalyse ≠ Literaturreview. Ein Review ist qualitativ; eine Metaanalyse ist statistisch-quantitativ."},

// ── Sitzung 3: Fragetypen ────────────────────────────────────
{"id":"esf-s3-12","type":"qa","course":"ESF","topic":"Sitzung 3 — Fragetypen","tags":["geschlossen","offen","vor-nachteile"],"difficulty":2,
"front":"Nenne je 2 Vor- und Nachteile von geschlossenen vs. offenen Fragen im Fragebogen.",
"back":"GESCHLOSSENE FRAGEN:\nVorteile: Schnell ausfüllbar, eindeutige/vergleichbare Antworten, leicht zu analysieren\nNachteile: Beantwortet kein «Warum», begrenzt auf vorgegebene Antwortoptionen\n\nOFFENE FRAGEN:\nVorteile: Befragte bestimmen Themen selbst, beantwortet «Warum», unerwartete Antworten möglich\nNachteile: Zeitaufwendig, schwer zu kodieren und zu analysieren\n\nMERKE: Geschlossen = Breite; Offen = Tiefe.\nFALLSTRICK: Im Experiment werden meist geschlossene Fragen bevorzugt, nicht weil offene schlechter sind, sondern weil sie schwerer standardisiert ausgewertet werden können."},

{"id":"esf-s3-13","type":"qa","course":"ESF","topic":"Sitzung 3 — Fragetypen","tags":["likert","semantisch","dichotom"],"difficulty":2,
"front":"Was sind die Unterschiede zwischen einer Likert-Skala, einem semantischen Differential und einer dichotomen Frage?",
"back":"Dichotom: Nur 2 Antwortoptionen (Ja/Nein, Kauf/kein Kauf).\n\nLikert-Skala: Skalierter Maßstab mit mehreren geordneten Stufen (z.B. 1 = stimme gar nicht zu bis 7 = stimme voll zu). Misst Zustimmungsgrad.\n\nSemantisches Differential: Zwei gegensätzliche Adjektive an den Polen einer Skala (z.B. «schlecht — gut», «langsam — schnell»). Misst Konnotation/Bewertungsdimension.\n\nMERKE: Likert = Zustimmung zu Aussagen; Semantisches Differential = Bewertung zwischen Gegensätzen.\nFALLSTRICK: Likert-Skalen werden oft als Intervallskalen behandelt, sind formal aber Ordinalskalen — ein Prüfungsklassiker."},

// ── Sitzung 3: Skalenniveau ──────────────────────────────────
{"id":"esf-s3-14","type":"qa","course":"ESF","topic":"Sitzung 3 — Skalenniveau","tags":["skalenniveau","nominal","ordinal","intervall"],"difficulty":3,
"front":"Nenne die 4 Skalenniveaus, ihre zentralen Eigenschaften und je ein Beispiel.",
"back":"1. Dichotom: Nur 2 Kategorien, keine Ordnung (Kauf/kein Kauf, männlich/weiblich im binären Sinne)\n2. Nominal: Mehrere qualitativ unterschiedliche Kategorien, KEINE Ordnung (Nationalität, Augenfarbe, Berufsgruppe)\n3. Ordinal: Kategorien sind geordnet, ABER Abstände zwischen Stufen sind UNGLEICH/unbekannt (Schulnoten, Militärrang, Likert-Skalen)\n4. Intervall/Ratio: Geordnet MIT gleichen, bekannten Abständen (Alter in Jahren, Temperatur in Kelvin, Einkommen in CHF)\n\nMERKE: Dichotom ⊂ Nominal ⊂ Ordinal ⊂ Intervall — jedes höhere Niveau schließt die Eigenschaften des unteren ein.\nFALLSTRICK: Der Abstand zwischen Note 4 und 5 ist NICHT zwingend gleich dem Abstand zwischen 5 und 6 → Schulnoten sind ordinal, nicht intervall!"},

{"id":"esf-s3-15","type":"cloze","course":"ESF","topic":"Sitzung 3 — Skalenniveau Szenarien","tags":["skalenniveau","anwendung","prüfungstyp"],"difficulty":3,
"front":"Ordne die folgenden Variablen dem richtigen Skalenniveau zu:\na) Lieblingsfarbe der Befragten → {{Nominal}}\nb) Rangfolge der beliebtesten Städte → {{Ordinal}}\nc) Körpergröße in cm → {{Intervall/Ratio}}\nd) Frage «Haben Sie ein Auto?» (Ja/Nein) → {{Dichotom}}\ne) Schulnoten (1–6) → {{Ordinal}}",
"back":"a) Nominal: Farben sind kategorisch, nicht geordnet\nb) Ordinal: Ränge sind geordnet, aber der Abstand Platz 1→2 ≠ Platz 2→3\nc) Intervall/Ratio: gleiche, messbare Abstände\nd) Dichotom: genau 2 Kategorien\ne) Ordinal: Reihenfolge klar, aber Abstände nicht gleich\n\nMERKE: «Geordnet» allein reicht nicht für Intervall — die Abstände müssen auch gleich und bekannt sein.\nFALLSTRICK: Schulnoten wirken wie Zahlen → verleiten zu Intervall. Aber ein Schritt von 3→4 bedeutet nicht dasselbe wie 5→6."},

{"id":"esf-s3-16","type":"why","course":"ESF","topic":"Sitzung 3 — Skalenniveau","tags":["ordinal","intervall","mittelwert"],"difficulty":3,
"front":"Warum ist es statistisch problematisch, einen Mittelwert aus Ordinalskalen-Daten (z.B. Schulnoten) zu berechnen?",
"back":"Der Mittelwert setzt voraus, dass die Abstände zwischen den Werten gleich und bedeutsam sind (Intervallskalenniveau). Bei Ordinalskalen sind die Abstände zwischen Kategorien unbekannt und möglicherweise ungleich.\n\nBeispiel: Der «Abstand» zwischen Note 4 und 5 (ungenügend → genügend) ist konzeptuell anders als zwischen 5 und 6 — der Mittelwert 4.5 ist daher mathematisch fragwürdig.\n\nMERKE: Für Ordinalskalen sind Median und Modus die korrekten Lageparameter.\nFALLSTRICK: In der Praxis wird der Mittelwert bei Likert-Skalen dennoch oft berechnet und akzeptiert — dies ist eine vereinfachende Konvention, nicht streng korrekt."},

// ── Sitzung 3: Lageparameter & Datenanalyse ──────────────────
{"id":"esf-s3-17","type":"qa","course":"ESF","topic":"Sitzung 3 — Lageparameter","tags":["mittelwert","median","modus","ausreißer"],"difficulty":2,
"front":"Welcher Lageparameter ist bei Ausreißern am robustesten, und warum?",
"back":"Der Median ist am robustesten gegenüber Ausreißern, da er nur die Rangposition des mittleren Wertes berücksichtigt — extreme Werte verändern seine Position kaum.\n\nBeispiel: Einkommen [1000, 1200, 1300, 1400, 50000] CHF\n• Mittelwert: 10980 (stark verzerrt durch Ausreißer)\n• Median: 1300 (repräsentativ für die Mehrheit)\n\nMERKE: Für schiefe Verteilungen (z.B. Einkommen, Immobilienpreise) ist der Median der bessere Lageparameter.\nFALLSTRICK: Der Mittelwert ist mathematisch einfacher und häufiger verwendet, aber er ist sensitiv für Ausreißer — der Median ist «stabiler», aber ignoriert die genauen Werte."},

{"id":"esf-s3-18","type":"qa","course":"ESF","topic":"Sitzung 3 — Analysemethoden","tags":["univariat","bivariat","multivariat"],"difficulty":2,
"front":"Was untersuchen univariate, bivariate und multivariate Analysen jeweils? Nenne je eine konkrete Methode.",
"back":"Univariate Analyse: EINE Variable, beschreibend. Methoden: Häufigkeitstabelle, Histogramm, Mittelwert berechnen.\n\nBivariate Analyse: ZWEI Variablen, Beziehung zwischen ihnen. Methoden: Pearson's r (metrisch), Spearman's rho (ordinal), Kreuztabelle.\n\nMultivariate Analyse: DREI oder mehr Variablen gleichzeitig. Methoden: Regressionsanalyse, Faktorenanalyse, Varianzanalyse (ANOVA).\n\nMERKE: Bivariate Analyse zeigt Zusammenhänge — aber KEINE Kausalität!\nFALLSTRICK: Pearson's r misst nur lineare Zusammenhänge. Ein r = 0 bedeutet nicht, dass kein Zusammenhang besteht — nur kein linearer."},

{"id":"esf-s3-19","type":"cloze","course":"ESF","topic":"Sitzung 3 — Korrelation","tags":["korrelation","kausalität","pearson"],"difficulty":2,
"front":"Pearson's r und Spearman's rho sind Methoden der {{bivariaten}} Analyse. Sie zeigen, ob ein {{Zusammenhang}} zwischen zwei Variablen besteht — beweisen aber {{keine Kausalität}}. Der Unterschied: Pearson's r eignet sich für {{metrische}} Daten, Spearman's rho für {{ordinale}} Daten.",
"back":"Pearson's r: metrisch, setzt Normalverteilung und lineare Beziehung voraus\nSpearman's rho: ordinal oder nicht-normalverteilte metrische Daten, rangbasiert\n\nMERKE: Beide zeigen nur KOVARIANZ, keine Kausalrichtung.\nFALLSTRICK: Eine hohe Korrelation (r = 0.9) kann vollständig zufällig sein oder durch eine dritte Variable erklärt werden — ohne Experiment kein Kausalschluss."},

// ── Sitzung 3: Konstruktmessung ──────────────────────────────
{"id":"esf-s3-20","type":"qa","course":"ESF","topic":"Sitzung 3 — Konstruktmessung","tags":["konstrukt","cronbach","validität"],"difficulty":3,
"front":"Welche Kriterien sollte man bei der Auswahl von Skalen zur Konstruktmessung aus der Literatur beachten?",
"back":"1. Gut zitiert (hohe Anzahl Zitierungen = bewährt in der Forschung)\n2. Publiziert in High-Ranking Journals (Peer-Review-Qualität)\n3. Cronbachs Alpha ≥ 0.7 (Reliabilität: Skala misst konsistent)\n4. Validität nachgewiesen (Skala misst, was sie messen soll)\n\nMERKE: Cronbachs Alpha misst interne Konsistenz — ob alle Items des Konstrukts dasselbe messen.\nFALLSTRICK: Cronbachs Alpha > 0.95 kann auf Redundanz hinweisen (Items zu ähnlich). Der Zielbereich liegt typischerweise bei 0.7–0.9."},

// ── Sitzung 3: Prüfungstyp MC-Simulationen ───────────────────
{"id":"esf-s3-21","type":"qa","course":"ESF","topic":"Sitzung 3 — Prüfungstyp","tags":["prüfungstyp","mc","experiment"],"difficulty":3,
"front":"[PRÜFUNGSTYP MC] Ein Forscher untersucht, ob ein neues Lernprogramm die Testergebnisse verbessert. Er weist Schüler zufällig entweder dem Programm oder dem regulären Unterricht zu und misst danach die Noten. Welches Design liegt vor?\n\nA) Quasi-Experiment\nB) Feldexperiment\nC) Laborexperiment\nD) Metaanalyse",
"back":"Korrekte Antwort: B) Feldexperiment\n\nBegründung: Es findet eine Randomisierung (zufällige Zuweisung) statt, das Experiment läuft in einer natürlichen Umgebung (Schule/Feld), und es gibt eine klare Manipulation (Lernprogramm vs. regulärer Unterricht).\n\nWarum nicht A: Ein Quasi-Experiment fehlt die Randomisierung.\nWarum nicht C: Laborexperiment = kontrollierte künstliche Umgebung, nicht Schule.\nWarum nicht D: Metaanalyse fasst bestehende Studien zusammen, erhebt keine eigenen Daten.\n\nMERKE: Zufällige Zuweisung + natürliche Umgebung = Feldexperiment."},

{"id":"esf-s3-22","type":"qa","course":"ESF","topic":"Sitzung 3 — Prüfungstyp","tags":["prüfungstyp","mc","kausalität"],"difficulty":3,
"front":"[PRÜFUNGSTYP MC] Eine Studie zeigt: In Ländern mit mehr Eis-Verkäufen gibt es mehr Ertrinkungsunfälle (r = 0.85). Welcher Kausalitätstyp erklärt dies am besten?\n\nA) Direkte Kausalität: Eis → Ertrinken\nB) Umgekehrte Kausalität: Ertrinken → Eis\nC) Gemeinsame Ursache: Wärme → Eis UND Wärme → Ertrinken\nD) Indirekte Kausalität: Eis → Schwimmen → Ertrinken",
"back":"Korrekte Antwort: C) Gemeinsame Ursache\n\nBegründung: Die Drittvariable «Hitze/Sommer» verursacht sowohl mehr Eis-Käufe als auch mehr Schwimmaktivität (und damit mehr Ertrinkungsrisiko). Eis und Ertrinken stehen in keiner kausalen Beziehung zueinander — es ist eine klassische Scheinkorrelation durch gemeinsame Ursache.\n\nMERKE: Wenn eine offensichtlich unsinnige Korrelation besteht, denke immer zuerst an eine gemeinsame Ursache (Typ 3).\nFALLSTRICK: D klingt plausibel (Eis → mehr Lust zu schwimmen → Ertrinken), aber der direkte Zusammenhang ist die Hitze, nicht das Eis."},

{"id":"esf-s3-23","type":"qa","course":"ESF","topic":"Sitzung 3 — Prüfungstyp","tags":["prüfungstyp","mc","skalenniveau"],"difficulty":3,
"front":"[PRÜFUNGSTYP MC — MEHRFACHAUSWAHL] Welche der folgenden Variablen befinden sich auf Intervall- oder Rationiveau?\n\nA) Zufriedenheit (1 = sehr unzufrieden bis 5 = sehr zufrieden)\nB) Alter in Jahren\nC) Militärrang (Soldat, Unteroffizier, Offizier)\nD) Monatseinkommen in CHF\nE) Nationalität",
"back":"Korrekte Antworten: B) und D)\n\nBegründung:\nB) Alter in Jahren: gleiche Abstände (1 Jahr = 1 Jahr), messbarer Nullpunkt → Ratio\nD) Einkommen in CHF: gleiche Abstände, messbarer Nullpunkt (0 CHF = kein Einkommen) → Ratio\n\nWarum nicht A: Likert-Skala → Ordinal (Abstände zwischen Stufen unbekannt)\nWarum nicht C: Militärrang → Ordinal (Rangordnung, aber Abstände ungleich)\nWarum nicht E: Nationalität → Nominal (keine Ordnung möglich)\n\nMERKE: Intervall/Ratio = echte Zahlen mit gleichen, bedeutsamen Abständen.\nFALLSTRICK: Mehrfachauswahl-Fragen in der ESF-Prüfung geben 0 Punkte, wenn nicht ALLE korrekten Antworten angekreuzt sind."},

// ── Sitzung 3: Interne vs. Externe Validität ─────────────────
{"id":"esf-s3-24","type":"qa","course":"ESF","topic":"Sitzung 3 — Validität","tags":["interne-validität","externe-validität","experiment"],"difficulty":2,
"front":"Was ist der Unterschied zwischen interner und externer Validität? Welcher Experiment-Typ maximiert welche?",
"back":"Interne Validität: Das Ausmaß, in dem der beobachtete Effekt tatsächlich auf die Manipulation (unabhängige Variable) zurückgeführt werden kann — nicht auf Störvariablen.\n→ Maximiert durch: Laborexperiment (hohe Kontrolle)\n\nExterne Validität: Das Ausmaß, in dem die Ergebnisse auf andere Situationen, Personen und Kontexte verallgemeinert werden können.\n→ Maximiert durch: Feldexperiment (natürliche Umgebung, repräsentativere Stichprobe)\n\nMERKE: Labor ↑ intern, ↓ extern; Feld ↓ intern, ↑ extern — es besteht oft ein Trade-off.\nFALLSTRICK: «Valide» Studie bedeutet nicht automatisch beides. Eine Studie kann intern valide, aber extern kaum generalisierbar sein."},

// ── Sitzung 3: Zusammenfassung / Überblick ───────────────────
{"id":"esf-s3-25","type":"qa","course":"ESF","topic":"Sitzung 3 — Studiendesign Überblick","tags":["überblick","design","kausalität","prüfungstyp"],"difficulty":3,
"front":"Ordne die folgenden Designs nach ihrer Eignung für Kausalaussagen (von am stärksten bis am schwächsten) und begründe kurz:\n1. Metaanalyse von Experimenten\n2. Feldexperiment mit Randomisierung\n3. Quasi-Experiment\n4. Umfrage (Querschnitt)",
"back":"Rangfolge (stärkste → schwächste Kausalaussage):\n1. Metaanalyse von Experimenten — synthetisiert Kausalbelege aus mehreren randomisierten Studien → stärkste Evidenz\n2. Feldexperiment mit Randomisierung — Randomisierung kontrolliert Störvariablen, natürliche Umgebung erhöht Generalisierbarkeit\n3. Quasi-Experiment — keine Randomisierung, aber Manipulation vorhanden → Kausalität nur bedingt feststellbar\n4. Umfrage (Querschnitt) — nur Korrelationen messbar, keine Manipulation → keine Kausalaussagen möglich\n\nMERKE: Das entscheidende Kriterium für Kausalaussagen ist die zufällige Zuweisung (Randomisierung).\nFALLSTRICK: Eine qualitativ hochwertige Umfrage mit riesiger Stichprobe bleibt für Kausalaussagen schwächer als ein kleines Feldexperiment mit Randomisierung."}

// ── Sitzung 4: Grundlagen qualitativer Forschung ────────────────────────────
{"id":"esf-s4-01","type":"qa","course":"ESF","topic":"Sitzung 4 — Paradigmen Überblick","tags":["paradigma","positivismus","interpretivismus"],"difficulty":2,
"front":"Was sind die zwei Forschungsparadigmen in der empirischen Sozialforschung und was ist das jeweilige übergeordnete Ziel?",
"back":"Positivistisches Paradigma → Ziel: Vorhersage (prediction)\nInterpretatives Paradigma → Ziel: Verständnis (understanding)\n\nMERKE: Positivismus = naturwissenschaftliches Ideal, Interpretivismus = sozialwissenschaftliches Ideal\nFALLSTRICK: 'Erklärung' ist kein präziser Zielbegriff — prüf ob 'Vorhersage' oder 'Verständnis' gefragt ist"},

{"id":"esf-s4-02","type":"qa","course":"ESF","topic":"Sitzung 4 — Positivismus vs. Interpretivismus","tags":["paradigma","positivismus","interpretivismus","realität"],"difficulty":2,
"front":"Wie unterscheiden sich das positivistische und das interpretative Paradigma in ihrer Auffassung von Realität?",
"back":"Positivistisch: Realität ist objektiv und eindeutig — existiert unabhängig vom Beobachter\nInterpretativ: Realität ist subjektiv und sozial konstruiert — wird durch Menschen und Kontext geformt\n\nMERKE: Positivismus → eine Realität; Interpretivismus → multiple, kontextabhängige Realitäten\nFALLSTRICK: Nicht verwechseln mit der Frage der Generalisierbarkeit — das ist eine Folge, nicht die Ursache"},

{"id":"esf-s4-03","type":"cloze","course":"ESF","topic":"Sitzung 4 — Forscher-Rolle","tags":["paradigma","interpretivismus","forscher"],"difficulty":2,
"front":"Im interpretativen Paradigma ist der Forscher {{Teil des Forschungssubjekts}}, während er im positivistischen Paradigma {{klar vom Forschungssubjekt getrennt}} ist.",
"back":"Interpretativ: Der Forscher ist TEIL des Forschungssubjekts (Interaktion, Reflexivität)\nPositivistisch: Klare Abgrenzung Forscher ↔ Forschungssubjekt (Objektivität, Kontrolle)\n\nMERKE: Interpretativ = Involvierung; Positivistisch = Distanz\nFALLSTRICK: 'Subjektivität' im interpretativen Sinne ist kein Fehler, sondern methodisches Prinzip"},

{"id":"esf-s4-04","type":"qa","course":"ESF","topic":"Sitzung 4 — Paradigmen & Methoden","tags":["paradigma","methoden","interview","experiment"],"difficulty":1,
"front":"Welche typischen Erhebungsmethoden werden dem positivistischen und welche dem interpretativen Paradigma zugeordnet?",
"back":"Positivistisch: Umfragen (Surveys), Experimente\nInterpretativ: Interviews, Beobachtung, Ethnographie\n\nMERKE: Positivistisch = Standardisierung und Kontrolle; Interpretativ = Offenheit und Tiefe\nFALLSTRICK: Fokusgruppen sind interpretativ — nicht mit standardisierten Gruppenumfragen verwechseln"},

{"id":"esf-s4-05","type":"qa","course":"ESF","topic":"Sitzung 4 — Definition qualitative Forschung","tags":["definition","qualitativ","stichprobe"],"difficulty":2,
"front":"Wie definieren König & Zedler (2002) qualitative Forschung und welche drei Kernmerkmale enthält die Definition?",
"back":"Definition: 'Systematische Erhebung und Auswertung nicht-standardisierter Daten. Kleine, nichtrepräsentative Stichprobe. Ziel: tiefgreifende Einblicke.'\n\nDrei Kernmerkmale:\n1. Nicht-standardisierte Daten\n2. Kleine, nichtrepräsentative Stichprobe\n3. Tiefgreifende Einblicke (kein Ziel: statistische Generalisierung)\n\nMERKE: 'Systematisch' bleibt — qualitativ ≠ beliebig\nFALLSTRICK: Qualitativ ist nicht unsystematisch, nur nicht standardisiert"},

{"id":"esf-s4-06","type":"qa","course":"ESF","topic":"Sitzung 4 — Qualitativ vs. Quantitativ","tags":["qualitativ","quantitativ","vergleich","induktiv","deduktiv"],"difficulty":2,
"front":"Vergleiche qualitative und quantitative Forschung anhand der fünf Dimensionen: Ziel, Vorgehensweise, Datenerhebung, Auswertung, Fallzahl.",
"back":"| Dimension | Qualitativ | Quantitativ |\n|---|---|---|\n| Ziel | Neue Theorien entwickeln | Bestehende Theorien prüfen |\n| Vorgehensweise | Überwiegend induktiv | Überwiegend deduktiv |\n| Datenerhebung | Nicht-standardisiert | Standardisiert |\n| Auswertung | Interpretativ | Statistisch |\n| Fallzahl | Klein | Groß |\n\nMERKE: Induktiv = vom Einzelfall zur Theorie (qualitativ); Deduktiv = von der Theorie zum Einzelfall (quantitativ)\nFALLSTRICK: 'Überwiegend' — keines ist rein induktiv oder deduktiv"},

{"id":"esf-s4-07","type":"why","course":"ESF","topic":"Sitzung 4 — Induktion vs. Deduktion","tags":["induktiv","deduktiv","theoriebildung","qualitativ"],"difficulty":3,
"front":"Warum ist qualitative Forschung überwiegend induktiv und nicht deduktiv?",
"back":"Weil qualitatives Vorgehen neue Theorien aus dem Datenmaterial heraus entwickelt (Theoriebildung), anstatt vorab formulierte Hypothesen zu testen.\n\nDer Forscher geht ohne starre Vorannahmen ins Feld, lässt Muster und Konzepte aus den Daten 'auftauchen' (z.B. Grounded Theory).\n\nMERKE: Induktiv = bottom-up, vom Beobachteten zur Theorie\nFALLSTRICK: Qualitativ kann auch deduktive Elemente haben (z.B. beim theoretischen Sampling bereits bekannte Konzepte einbeziehen) — deshalb 'überwiegend'"},

// ── Sitzung 4: Qualitative Interviews ───────────────────────────────────────
{"id":"esf-s4-08","type":"qa","course":"ESF","topic":"Sitzung 4 — Interview-Typen Überblick","tags":["interview","unstrukturiert","semi-strukturiert","strukturiert"],"difficulty":2,
"front":"Beschreibe die drei Typen qualitativer Interviews: Wer gibt die Struktur vor und wie explorativ ist jeder Typ?",
"back":"Unstrukturiert: Kein Leitfaden — der Informant gibt die Struktur vor. Sehr explorativ, sehr zeitaufwändig.\nSemi-strukturiert: Flexibler Leitfaden mit offenen Fragen — Forscher UND Informant prägen die Struktur. Kohärenter Themenfluss.\nStrukturiert: Detaillierter, unflexibler Leitfaden — der Forscher gibt die Struktur vor. Schnell/effizient, oft oberflächlich.\n\nMERKE: Strukturierungsgrad steigt vom unstrukturierten zum strukturierten Interview\nFALLSTRICK: Strukturiertes qualitatives Interview ≠ standardisiertes quantitatives Fragebogen-Interview"},

{"id":"esf-s4-09","type":"cloze","course":"ESF","topic":"Sitzung 4 — Semi-strukturiertes Interview","tags":["interview","semi-strukturiert","leitfaden"],"difficulty":2,
"front":"Beim semi-strukturierten Interview wird ein {{flexibler Leitfaden}} mit {{offenen Fragen}} verwendet, sodass sowohl {{Forscher als auch Informant}} die Struktur prägen.",
"back":"Semi-strukturiertes Interview = goldene Mitte:\n- Flexibler (nicht starrer) Leitfaden\n- Offene Fragen (keine vorgegebenen Antwortoptionen)\n- Beide Seiten gestalten das Gespräch\n- Resultat: kohärenter Themenfluss bei gleichzeitiger Offenheit\n\nMERKE: 'Semi' = teilweise strukturiert — nicht kein Leitfaden, nicht sklavischer Leitfaden\nFALLSTRICK: Nicht verwechseln mit unstrukturiert (kein Leitfaden) oder strukturiert (unflexibler Leitfaden)"},

{"id":"esf-s4-10","type":"qa","course":"ESF","topic":"Sitzung 4 — Fokusgruppe","tags":["fokusgruppe","gruppe","moderation","gruppendynamik"],"difficulty":2,
"front":"Was ist eine Fokusgruppe, wie viele Teilnehmer sind typisch, und was ist das spezifische Ziel gegenüber einem Einzelinterview?",
"back":"Fokusgruppe: Moderierte Diskussion mehrerer Teilnehmer (typisch: 6–12 Personen), geführt anhand eines semi-strukturierten Leitfadens.\n\nSpezifisches Ziel: Erfassung von Diskussionen, Gruppendynamiken und naturalem Sprachgebrauch — also soziale Interaktion als Datenquelle, nicht nur Einzelmeinungen.\n\nMERKE: Fokusgruppe ≠ Gruppeninterview — die Dynamik zwischen den TN ist der Mehrwert\nFALLSTRICK: Anzahl merken: 6–12, nicht 3–5 oder 20+"},

// ── Sitzung 4: Qualitative Stichproben ──────────────────────────────────────
{"id":"esf-s4-11","type":"qa","course":"ESF","topic":"Sitzung 4 — Theoretisches Sampling","tags":["sampling","theoretisch","sättigung","grounded-theory"],"difficulty":3,
"front":"Was ist theoretisches Sampling und wann endet der Prozess?",
"back":"Theoretisches Sampling: Die Auswahl der nächsten Fälle erfolgt IM PROZESS der Datenerhebung — basierend auf dem bisher gesammelten Material und aufkommenden theoretischen Überlegungen.\n\nEnde: Bei theoretischer Sättigung — wenn neue Fälle keine neuen Konzepte oder Kategorien mehr liefern.\n\nKonsequenz: Der Stichprobenumfang KANN NICHT vorab festgelegt werden.\n\nMERKE: Eng verknüpft mit Grounded Theory (Strauss & Corbin)\nFALLSTRICK: Theoretisches Sampling ≠ 'nach Theorie auswählen' — es entscheidet die emergente Theorie während des Prozesses"},

{"id":"esf-s4-12","type":"qa","course":"ESF","topic":"Sitzung 4 — Selektives Sampling","tags":["sampling","selektiv","kriterien","vorab"],"difficulty":3,
"front":"Was unterscheidet selektives Sampling vom theoretischen Sampling bezüglich des Zeitpunkts der Kriterienbestimmung?",
"back":"Selektives Sampling: Auswahlkriterien (z.B. Geschlecht, Alter, Bildung) werden VOR der Datenerhebung und UNABHÄNGIG vom Material festgelegt.\n\nZiel: Vergleichsdimensionen identifizieren — systematisch unterschiedliche Gruppen einbeziehen.\n\nGegensatz zum theoretischen Sampling: Beim selektiven Sampling steht der Auswahlrahmen vor Beginn fest; beim theoretischen Sampling ergibt er sich aus dem laufenden Prozess.\n\nMERKE: Selektiv = Kriterien vorab definiert; Theoretisch = Kriterien emergieren aus den Daten\nFALLSTRICK: Selektives Sampling ist trotzdem qualitativ und nicht-probabilistisch"},

{"id":"esf-s4-13","type":"why","course":"ESF","topic":"Sitzung 4 — Purposive Sampling","tags":["sampling","purposive","relevanz","extremfall"],"difficulty":2,
"front":"Warum heißt Purposive Sampling 'zweckgerichtet' und nach welchen drei Falltypen wird ausgewählt?",
"back":"'Zweckgerichtet' weil Fälle explizit aufgrund ihrer RELEVANZ für die Forschungsfrage ausgewählt werden — nicht zufällig und nicht nach fixen Merkmalsquoten.\n\nDrei typische Falltypen:\n1. Extremfälle — besonders ausgeprägte Ausprägungen eines Phänomens\n2. Maximale Variation — möglichst unterschiedliche Fälle, um Bandbreite zu erfassen\n3. Typische Fälle — repräsentative Beispiele eines Phänomens\n\nMERKE: 'Sinnvoll geeignet' ist das Leitprinzip\nFALLSTRICK: Purposive ≠ convenient (bequem erreichbar) — Eignung, nicht Zugänglichkeit entscheidet"},

{"id":"esf-s4-14","type":"qa","course":"ESF","topic":"Sitzung 4 — Sampling-Methoden Szenario","tags":["sampling","theoretisch","selektiv","purposive","szenario"],"difficulty":3,
"front":"Ordne die drei Szenarien der richtigen Sampling-Methode zu:\nA) Eine Forscherin interviewt zuerst Frauen, dann Männer — festgelegt bevor die erste Zeile transkribiert ist.\nB) Ein Forscher wählt den nächsten Interviewpartner, weil sein bisheriges Material 'junge Berufseinsteiger' als wichtige Gruppe zeigt.\nC) Ein Forscher sucht gezielt nach dem CEO des schnellstwachsenden und dem CEO des insolventen Start-ups.",
"back":"A) → Selektives Sampling: Kriterien (Geschlecht) vorab und unabhängig vom Material definiert.\nB) → Theoretisches Sampling: Auswahl IM Prozess basierend auf emergierenden Konzepten aus den Daten.\nC) → Purposive Sampling (Extremfälle): Auswahl nach Relevanz für die Forschungsfrage — bewusste Gegenpole.\n\nMERKE: Zeitpunkt und Grundlage der Auswahl sind die Schlüsselkriterien zur Unterscheidung\nFALLSTRICK: B) klingt wie 'nach Theorie aussuchen' — es ist die emergente Theorie aus den Daten, nicht eine vorab gelesene Theorie"},

{"id":"esf-s4-15","type":"cloze","course":"ESF","topic":"Sitzung 4 — Theoretische Sättigung","tags":["sättigung","stichprobengröße","theoretisch"],"difficulty":2,
"front":"Das Hauptkriterium für die Stichprobengröße in qualitativer Forschung ist die {{theoretische Sättigung}}. Eine einheitliche Vorgabe gibt es nicht; typisch sind {{10–100}} Personen.",
"back":"Theoretische Sättigung = der Punkt, an dem neue Fälle keine neuen Konzepte oder Kategorien mehr liefern.\n\nPraktische Orientierung: 10–100 Personen — aber die Zahl ist nachrangig gegenüber dem Sättigungsprinzip.\n\nMERKE: Qualitativ hat keine Mindest-n-Regel wie quantitative Power-Analysen\nFALLSTRICK: Man kann die Stichprobengröße beim theoretischen Sampling NICHT vorab festlegen"},

// ── Sitzung 4: Datenanalyse & Kodierung ─────────────────────────────────────
{"id":"esf-s4-16","type":"qa","course":"ESF","topic":"Sitzung 4 — Kodierung Überblick","tags":["kodierung","offen","axial","selektiv","grounded-theory"],"difficulty":2,
"front":"Beschreibe die drei Kodierstufen nach Strauss & Corbin und was auf jeder Stufe passiert.",
"back":"1. Offenes Kodieren: Beschreibung und Benennung des Datenmaterials. Einzelne Wörter direkt aus dem Text = 'In-Vivo Codes'. Ziel: erste Konzepte identifizieren.\n2. Axiales Kodieren: Bestehende Kodes werden interpretiert und in Beziehung gesetzt → theoretische Konzepte und Kategorien entstehen.\n3. Selektives Kodieren: Weitere Daten werden selektiv kodiert → wesentliche/Kernkategorien werden herausgearbeitet und die Theorie verdichtet.\n\nMERKE: Offen → Axial → Selektiv = immer abstrahierender und theoretischer\nFALLSTRICK: 'Selektives Kodieren' ≠ selektives Sampling — völlig verschiedene Konzepte"},

{"id":"esf-s4-17","type":"qa","course":"ESF","topic":"Sitzung 4 — In-Vivo Codes","tags":["kodierung","in-vivo","offen","begriffe"],"difficulty":1,
"front":"Was sind In-Vivo Codes und bei welcher Kodierstufe entstehen sie?",
"back":"In-Vivo Codes sind Kodes, die aus den exakten Worten der Interviewten gebildet werden — also direkte Übernahme von Formulierungen aus dem Datenmaterial ohne Abstraktion.\n\nSie entstehen beim offenen Kodieren (erste Stufe).\n\nMERKE: 'In Vivo' = lateinisch 'im lebenden Organismus' → hier: direkt aus dem Material\nFALLSTRICK: In-Vivo ≠ generische Beschreibung durch den Forscher — es sind die Worte der Befragten selbst"},

{"id":"esf-s4-18","type":"qa","course":"ESF","topic":"Sitzung 4 — Qualitative Inhaltsanalyse (Mayring)","tags":["mayring","inhaltsanalyse","zusammenfassung","explikation","strukturierung"],"difficulty":2,
"front":"Beschreibe die drei Verfahren der qualitativen Inhaltsanalyse nach Mayring.",
"back":"Mayring: Strukturiertes, regelgeleitetes Verfahren mit drei Grundformen:\n(a) Zusammenfassung: Material wird auf wesentliche Inhalte reduziert/paraphrasiert — Abstraktionsniveau erhöhen.\n(b) Explikation: Zu unklaren Textstellen wird erläuterndes Material (intern oder extern) hinzugezogen — Verstehen erweitern.\n(c) Strukturierung: Material wird nach vorab definierten Kriterien systematisch durchsucht und geordnet — Muster herausarbeiten.\n\nMERKE: Mayring = regelgeleitet und nachvollziehbar, trotzdem interpretativ\nFALLSTRICK: Explikation erweitert das Material (fügt hinzu), Zusammenfassung reduziert es"},

{"id":"esf-s4-19","type":"qa","course":"ESF","topic":"Sitzung 4 — Grounded Theory","tags":["grounded-theory","strauss","corbin","induktiv","theorie"],"difficulty":3,
"front":"Was ist Grounded Theory (Strauss & Corbin, 1990), welche vier Prinzipien kennzeichnen die Methode?",
"back":"Definition: 'Qualitative Methode mit systematischen Schritten; induktiv; auf qualitativen Daten fundierte Theorie' (Strauss & Corbin, 1990).\n\nVier Prinzipien:\n1. Induktiv: Theorie entsteht aus den Daten, nicht aus vorab formulierten Hypothesen\n2. Iterativer Wechsel: Ständige Bewegung zwischen Datenerhebung und Analyse\n3. Komparative Analyse: Kontinuierlicher Vergleich von Fällen und Konzepten\n4. Kodierung → theoretische Konzepte: Systematischer Weg von Rohdaten zu Theorie\n\nMERKE: Grounded = 'in den Daten verankert' — die Theorie ist datenbasiert, nicht spekulativ\nFALLSTRICK: Grounded Theory ist eine vollständige Forschungsmethode, nicht nur eine Analysestrategie"},

// ── Sitzung 4: MC-Simulationskarten ─────────────────────────────────────────
{"id":"esf-s4-20","type":"qa","course":"ESF","topic":"Sitzung 4 — MC-Simulation: Paradigmen","tags":["mc-simulation","paradigma","prüfungstyp","positivismus"],"difficulty":3,
"front":"[PRÜFUNGSTYP: Single Choice] Welche Aussage beschreibt das interpretative Paradigma KORREKT?\n\nA) Erkenntnisse sind zeit- und kontextunabhängig generalisierbar\nB) Realität ist objektiv und unabhängig vom Beobachter\nC) Der Forscher ist Teil des Forschungssubjekts\nD) Typische Methode ist das standardisierte Experiment",
"back":"Richtige Antwort: C\n\nBegründungen:\nA) Falsch — Zeit-/Kontextunabhängigkeit ist positivistisch\nB) Falsch — Objektive Realität ist positivistisch\nC) Korrekt — interpretatives Kernelement: Forscher und Forschungssubjekt sind verwoben\nD) Falsch — Experimente sind positivistisch; interpretativ: Interviews, Ethnographie\n\nMERKE: Alle 4 Antwortalternativen kommen direkt aus dem Vergleich der Paradigmen\nFALLSTRICK: A) klingt wissenschaftlich wünschenswert — ist aber positivistisches Ideal, nicht interpretatives"},

{"id":"esf-s4-21","type":"qa","course":"ESF","topic":"Sitzung 4 — MC-Simulation: Sampling","tags":["mc-simulation","sampling","prüfungstyp","theoretisch"],"difficulty":3,
"front":"[PRÜFUNGSTYP: Single Choice] Ein Forscher führt qualitative Interviews zum Thema 'Karriereentscheidungen'. Nach dem fünften Interview stellt er fest, dass 'Familienplanung' ein wichtiges Thema ist und wählt seinen nächsten Interviewpartner gezielt danach aus. Welche Sampling-Methode liegt vor?\n\nA) Probabilistisches Sampling\nB) Purposive Sampling\nC) Theoretisches Sampling\nD) Selektives Sampling",
"back":"Richtige Antwort: C\n\nBegründungen:\nA) Falsch — probabilistisch setzt Zufallsauswahl voraus; nicht qualitativ typisch\nB) Falsch — Purposive wählt nach vorab bestimmter Relevanz für die Forschungsfrage\nC) Korrekt — Auswahl IM PROZESS, basierend auf emergierenden Konzepten aus den Daten ('Familienplanung' taucht auf → nächster Fall darauf ausgerichtet)\nD) Falsch — selektiv definiert Kriterien (z.B. Geschlecht) VOR der Datenerhebung\n\nMERKE: Schlüsselindikator ist 'nach dem fünften Interview ... stellt er fest' — Entscheidung im Prozess\nFALLSTRICK: D) ist verlockend weil 'gezielt' nach einem Kriterium ausgewählt wird — aber das Kriterium entstand erst aus den Daten"},

{"id":"esf-s4-22","type":"qa","course":"ESF","topic":"Sitzung 4 — MC-Simulation: Kodierung & Analyse","tags":["mc-simulation","kodierung","mayring","grounded-theory","prüfungstyp"],"difficulty":3,
"front":"[PRÜFUNGSTYP: Multiple Choice — ALLE oder 0 Punkte] Welche der folgenden Aussagen zur qualitativen Datenanalyse sind KORREKT?\n\nA) Beim offenen Kodieren entstehen 'In-Vivo Codes' aus den Worten der Befragten\nB) Mayring's Explikation reduziert das Material auf wesentliche Inhalte\nC) Axiales Kodieren setzt bestehende Kodes in Beziehung zueinander\nD) Grounded Theory ist überwiegend deduktiv",
"back":"Richtige Antworten: A und C\n\nBegründungen:\nA) Korrekt — offenes Kodieren, In-Vivo Codes = direkte Übernahme aus dem Datenmaterial\nB) Falsch — Explikation erweitert das Verstehen durch zusätzliches Material; Zusammenfassung reduziert\nC) Korrekt — axiales Kodieren = Kodes interpretieren und in Beziehung setzen → theoretische Konzepte\nD) Falsch — Grounded Theory ist induktiv (Theorie aus den Daten, nicht Hypothesen testen)\n\nMERKE: Bei MC gilt: ALLE richtigen Antworten ankreuzen — eine falsche = 0 Punkte!\nFALLSTRICK: B) ist die häufigste Verwechslung Explikation/Zusammenfassung — merke: Explikation = explizieren = erläutern = hinzufügen"}

// ══════════════════════════════════════════════════════════════
// ESF — Sitzung 5: Zeitgemässe Forschung
// 22 Exam-Focused Flashcards | Prüfung: 23. Juni 2026
// ══════════════════════════════════════════════════════════════

const flashcards_esf_s5 = [

// ── Sitzung 5: Gütekriterien — Reliabilität ──────────────────
{"id":"esf-s5-01","type":"qa","course":"ESF","topic":"Sitzung 5 — Reliabilität Definition","tags":["gütekriterien","reliabilität","messung"],"difficulty":1,
"front":"Was ist Reliabilität und wie wird sie definiert?",
"back":"Reliabilität = Zuverlässigkeit einer Messung.\n\nDefinition: \"Ausmass der Genauigkeit und Stabilität von Messergebnissen bei wiederholter Durchführung\"\n\nEin Instrument ist reliabel, wenn es unter denselben Bedingungen wiederholt dasselbe Ergebnis liefert — unabhängig davon, ob dieses Ergebnis korrekt ist.\n\nMERKE: Reliabilität sagt nichts über die Richtigkeit (Validität) der Messung aus — nur über ihre Konsistenz.\nFALLSTRICK: Reliabilität ≠ Genauigkeit im Sinne von 'trifft das Richtige'. Eine kaputte Waage, die immer 2kg zu viel anzeigt, ist hoch reliabel aber nicht valide."},

// ── Sitzung 5: Gütekriterien — Reliabilitätsmethoden ────────
{"id":"esf-s5-02","type":"qa","course":"ESF","topic":"Sitzung 5 — Reliabilitätsmethoden","tags":["gütekriterien","reliabilität","methoden"],"difficulty":2,
"front":"Nenne und erkläre die vier Methoden zur Messung von Reliabilität.",
"back":"1. **Test-Retest-Methode:** Dieselbe Messung wird zu zwei verschiedenen Zeitpunkten an denselben Personen durchgeführt. Hohe Korrelation = hohe Stabilität.\n\n2. **Split-Half-Methode:** Die Items eines Tests werden in zwei Hälften geteilt und die Ergebnisse beider Hälften korreliert. Misst interne Konsistenz.\n\n3. **Paralleltest-Methode:** Zwei inhaltlich parallele, aber formal unterschiedliche Versionen des Tests werden eingesetzt und die Ergebnisse verglichen.\n\n4. **Interne Konsistenz (Cronbachs Alpha α):** Misst, ob alle Items dasselbe Konstrukt erfassen. α-Werte von 0–1; Daumenregel: α ≥ 0.7 = akzeptabel.\n\nMERKE: Cronbachs Alpha ist die am häufigsten eingesetzte Methode in der Sozialforschung.\nFALLSTRICK: Test-Retest misst Stabilität über Zeit — nicht dasselbe wie interne Konsistenz!"},

// ── Sitzung 5: Gütekriterien — Validität ────────────────────
{"id":"esf-s5-03","type":"qa","course":"ESF","topic":"Sitzung 5 — Validitätsarten","tags":["gütekriterien","validität"],"difficulty":2,
"front":"Was ist Validität und welche drei Arten werden unterschieden?",
"back":"Validität = \"Ausmass, in dem das Messinstrument tatsächlich den Sachverhalt misst, den es messen soll.\"\n\n**Drei Arten:**\n\n1. **Kriteriumsvalidität:** Das Instrument korreliert mit einem externen Kriterium (z.B. Intelligenztest korreliert mit Schulnoten).\n\n2. **Konstruktvalidität:** Das Instrument misst das theoretische Konstrukt tatsächlich korrekt (z.B. misst ein Depressionsfragebogen wirklich Depression und nicht Angst?).\n\n3. **Inhaltsvalidität:** Das Instrument deckt alle relevanten Aspekte/Facetten des Konstrukts ab (z.B. ein Mathe-Test prüft Algebra UND Geometrie, nicht nur eine Teildimension).\n\nMERKE: Konstruktvalidität gilt als die theoretisch anspruchsvollste Form.\nFALLSTRICK: Inhaltsvalidität ist schwer quantifizierbar — sie wird oft durch Expertengutachten beurteilt, nicht durch Statistik."},

// ── Sitzung 5: Gütekriterien — Objektivität ─────────────────
{"id":"esf-s5-04","type":"qa","course":"ESF","topic":"Sitzung 5 — Objektivität","tags":["gütekriterien","objektivität"],"difficulty":2,
"front":"Was bedeutet Objektivität als Gütekriterium und welche drei Unterformen gibt es?",
"back":"Objektivität = \"Unabhängigkeit der Ergebnisse von den beteiligten Personen.\"\n\nEin Messinstrument ist objektiv, wenn verschiedene Forschende unter denselben Bedingungen zum selben Ergebnis kommen.\n\n**Drei Unterformen:**\n\n1. **Durchführungsobjektivität:** Die Messung verläuft unabhängig davon, wer sie durchführt (gleiche Instruktionen, gleiche Bedingungen).\n\n2. **Auswertungsobjektivität:** Die Kodierung/Auswertung der Daten ist unabhängig vom Auswerter (z.B. klare Kodierregeln, kein Interpretationsspielraum).\n\n3. **Interpretationsobjektivität:** Die Schlussfolgerungen aus den Ergebnissen sind unabhängig vom Interpretierenden.\n\nMERKE: Standardisierte Fragebögen mit festen Antwortkategorien erhöhen alle drei Formen der Objektivität.\nFALLSTRICK: Qualitative Methoden haben tendenziell geringere Auswertungsobjektivität — das ist kein Fehler, sondern ein bewusster Tradeoff."},

// ── Sitzung 5: Gütekriterien — Verhältnis Reliabilität/Validität
{"id":"esf-s5-05","type":"why","course":"ESF","topic":"Sitzung 5 — Reliabilität vs. Validität (Schießscheibe)","tags":["gütekriterien","reliabilität","validität","beziehung"],"difficulty":3,
"front":"Warum ist Reliabilität notwendig aber nicht hinreichend für Validität? Erkläre mit der Schießscheiben-Analogie.",
"back":"**Logische Beziehung:**\n- Reliabilität ist NOTWENDIG für Validität: Ohne konsistente Messung kann man nicht valide messen.\n- Reliabilität ist NICHT HINREICHEND für Validität: Man kann konsistent falsch messen.\n\n**Schießscheiben-Analogie (4 Fälle):**\n\n| Fall | Reliabel? | Valide? | Bild |\n|------|-----------|---------|------|\n| 1 | Nein | Nein | Treffer überall verteilt |\n| 2 | Ja | Nein | Treffer eng beieinander, aber weit vom Zentrum |\n| 3 | Nein | Nein | Nicht möglich: ohne Konsistenz keine Validität |\n| 4 | Ja | Ja | Treffer eng beieinander UND im Zentrum |\n\n**Konsequenz:** Ein Instrument kann hoch reliabel sein (immer gleiches Ergebnis) aber dennoch systematisch am Ziel vorbeimessen (valide = 0).\n\nMERKE: Valide messen → immer auch reliabel. Reliabel messen → nicht zwingend valide.\nFALLSTRICK: Die Aussage 'reliabel also valide' ist FALSCH. Prüfungsklassiker!"},

// ── Sitzung 5: Gütekriterien — Cloze ────────────────────────
{"id":"esf-s5-06","type":"cloze","course":"ESF","topic":"Sitzung 5 — Gütekriterien Hierarchie","tags":["gütekriterien","reliabilität","validität","objektivität"],"difficulty":2,
"front":"Ergänze: Reliabilität ist eine {{notwendige}} aber {{nicht hinreichende}} Bedingung für Validität. Man kann {{reliabel}} messen ohne {{valide}} zu messen, aber man kann nicht {{valide}} messen ohne {{reliabel}} zu messen.",
"back":"Reliabilität ist eine **notwendige** aber **nicht hinreichende** Bedingung für Validität. Man kann **reliabel** messen ohne **valide** zu messen, aber man kann nicht **valide** messen ohne **reliabel** zu messen.\n\nMERKE: Diese Aussage ist prüfungsrelevant — sie kommt häufig in Wahr/Falsch-Fragen vor.\nFALLSTRICK: Verwechsle nicht die Richtung: 'valide → reliabel' (wahr), aber 'reliabel → valide' (falsch)."},

// ── Sitzung 5: Replikationskrise — Fakten ───────────────────
{"id":"esf-s5-07","type":"qa","course":"ESF","topic":"Sitzung 5 — Replikationskrise Zahlen","tags":["replikationskrise","open science"],"difficulty":2,
"front":"Was zeigen die Replikationsstudien in Psychologie, Cancer Biology und Social Science? Nenne Zahlen und Quellen.",
"back":"**Psychologie** — Open Science Collaboration (2015):\n→ Nur **36%** der Befunde konnten signifikant repliziert werden.\n\n**Cancer Biology** — Errington (2021):\n→ Nur **46%** Replikationsrate.\n\n**Social Science** — Camerer (2018):\n→ **62%** Replikationsrate.\n\n**Fazit:** In allen Disziplinen können ein erheblicher Anteil empirischer Befunde nicht reproduziert werden — dies ist die Replikationskrise.\n\nMERKE: Die Psychologie hat die niedrigste Rate (36%) — relevant für MC-Fragen die Zahlen abfragen.\nFALLSTRICK: Nicht verwechseln: 'replizierbar' ≠ 'richtig', aber nicht-replizierbar deutet auf methodische Probleme hin."},

// ── Sitzung 5: Replikationskrise — 4 Ursachen ───────────────
{"id":"esf-s5-08","type":"qa","course":"ESF","topic":"Sitzung 5 — Ursachen der Replikationskrise","tags":["replikationskrise","forschungspraktiken"],"difficulty":2,
"front":"Nenne die vier Hauptursachen der Replikationskrise.",
"back":"1. **Fragwürdige Forschungspraktiken (QRPs — Questionable Research Practices)**\n   Strategisches Vorgehen, das die Wahrscheinlichkeit falsch-positiver Ergebnisse erhöht.\n\n2. **Publikations-Bias**\n   Nur signifikante Ergebnisse werden veröffentlicht; nicht-signifikante Studien landen in der Schublade.\n\n3. **Tiefe statistische Power**\n   Zu kleine Stichproben führen dazu, dass echte Effekte nicht zuverlässig entdeckt werden.\n\n4. **Akademische Anreize**\n   Karrieresystem belohnt 'aufregende' Neufunde, nicht Replikationsstudien oder null Ergebnisse.\n\nMERKE: Diese vier Punkte bilden ein System — jede Ursache verstärkt die anderen.\nFALLSTRICK: 'Betrug' ist KEINE der vier genannten Hauptursachen — die meisten QRPs entstehen unbewusst oder durch Rationaliserung."},

// ── Sitzung 5: Fragwürdige Forschungspraktiken — p-hacking ──
{"id":"esf-s5-09","type":"qa","course":"ESF","topic":"Sitzung 5 — p-hacking","tags":["qrp","p-hacking","replikationskrise"],"difficulty":2,
"front":"Was ist p-hacking und warum ist es problematisch?",
"back":"**Definition:** P-hacking bezeichnet das Durchführen vieler verschiedener statistischer Analysen an denselben Daten und das selektive Berichten nur der signifikanten Ergebnisse (p < .05).\n\n**Mechanismus:** Wenn man 20 Tests durchführt, erwartet man rein zufällig ca. 1 falsches positives Ergebnis (α-Fehler-Kumulierung). Durch Selektion erscheint dieses Zufallsresultat als Befund.\n\n**Beispiele für p-hacking:**\n- Ausreisser entfernen oder drinlassen je nach Ergebnis\n- Verschiedene Kovariaten ausprobieren\n- Subgruppenanalysen nur bei Signifikanz berichten\n- Messinstrumente wechseln bis Signifikanz erreicht\n\n**Konsequenz:** Dramatische Erhöhung der Wahrscheinlichkeit eines Fehlers 1. Art (false positive).\n\nMERKE: P-hacking = selektives Berichten NACH Analyse. Unterschied zu HARKing: Bei p-hacking werden Hypothesen vorher aufgestellt, aber Analysen selektiv berichtet.\nFALLSTRICK: P-hacking geschieht oft unbewusst — Forschende 'explorieren legitim' und berichten selektiv."},

// ── Sitzung 5: Fragwürdige Forschungspraktiken — HARKing ────
{"id":"esf-s5-10","type":"qa","course":"ESF","topic":"Sitzung 5 — HARKing","tags":["qrp","harking","replikationskrise"],"difficulty":2,
"front":"Was bedeutet HARKing und wie unterscheidet es sich von p-hacking?",
"back":"**HARKing = Hypothesizing After Results Known**\n\nDefinition: Die Forschenden stellen Hypothesen NACH der Datenerhebung/-analyse auf, präsentieren diese aber so, als wären sie vorher formuliert worden.\n\n**Kernproblem:** Der konfirmatorische Anschein einer Studie ist falsch. Was als Hypothesentest aussieht, ist eigentlich explorative Forschung — aber ohne deren Transparenz.\n\n**Unterschied zu p-hacking:**\n\n| | p-hacking | HARKing |\n|---|---|---|\n| Was wird verändert? | Analysen/Stichprobe | Hypothesen/Framing |\n| Wann? | Während/nach Analyse | Nach Ergebnissen |\n| Täuschung über | Analysevorgehen | Theoriebezug |\n\n**Konsequenz:** Falscher Eindruck von Theoriegeleitetheit; erhöhte Fehler-1.-Art-Rate.\n\nMERKE: HARKing = nachträgliche Hypothesen als vorherige verkleiden. P-hacking = Analysen wiederholen bis Signifikanz.\nFALLSTRICK: Beide Praktiken können kombiniert auftreten und verstärken sich gegenseitig."},

// ── Sitzung 5: Fragwürdige Forschungspraktiken — weitere ────
{"id":"esf-s5-11","type":"qa","course":"ESF","topic":"Sitzung 5 — Optional Stopping & Outcome Switching","tags":["qrp","replikationskrise"],"difficulty":3,
"front":"Erkläre Optional Stopping und Outcome Switching als fragwürdige Forschungspraktiken.",
"back":"**Optional Stopping (Optionales Stoppen):**\nDatenerhebung wird beendet, sobald das Ergebnis signifikant wird — anstatt einen vorab festgelegten Stichprobenumfang zu erreichen.\n\nProblem: Wenn man nach jeder neuen Beobachtung testet, steigt die kumulative Fehlerrate 1. Art weit über 5% — bei 20 schrittweisen Tests kann sie über 30% betragen.\n\n**Outcome Switching (AV-Wechsel):**\nMehrere abhängige Variablen werden erhoben, aber nur die signifikante AV wird im Paper als 'die' primäre Outcome-Variable berichtet.\n\nBeispiel: 5 Fragebögen zu Wohlbefinden werden erhoben. Nur der Fragebogen mit p < .05 erscheint im Paper als 'Hauptmass des Wohlbefindens'.\n\nMERKE: Beide Praktiken erhöhen systematisch den Fehler 1. Art und führen zu nicht replizierbaren Befunden.\nFALLSTRICK: Optional Stopping ist besonders heimtückisch, weil schrittweises Testen 'datensparsam' wirkt — aber statistisch invalide ist."},

// ── Sitzung 5: Publikations-Bias ────────────────────────────
{"id":"esf-s5-12","type":"qa","course":"ESF","topic":"Sitzung 5 — Publikations-Bias","tags":["publikationsbias","meta-analyse","replikationskrise"],"difficulty":2,
"front":"Was ist der Publikations-Bias und welche Konsequenz hat er für Meta-Analysen?",
"back":"**Publikations-Bias:** Wissenschaftliche Zeitschriften bevorzugen die Publikation signifikanter Ergebnisse. Nicht-signifikante Befunde werden häufig nicht eingereicht oder abgelehnt.\n\n**Schubladenproblem (File Drawer Problem):** Studien mit null Ergebnissen bleiben unveröffentlicht 'in der Schublade'. Damit fehlen sie der Wissenschaftsgemeinde.\n\n**Konsequenz für Meta-Analysen:**\nMeta-Analysen fassen veröffentlichte Studien zusammen — wenn diese selektiv signifikante Ergebnisse enthalten, überschätzt die Meta-Analyse den wahren Effekt systematisch. Die Schätzung des wahren Effekts ist damit NICHT verlässlich.\n\nBeispiel: 20 Studien zu einem Medikament — 15 finden keinen Effekt und bleiben unveröffentlicht; 5 finden zufällig einen Effekt und werden publiziert. Die Meta-Analyse der 5 Studien zeigt fälschlicherweise Wirksamkeit.\n\nMERKE: Publikations-Bias verzerrt die kumulative Evidenz, nicht nur Einzelstudien.\nFALLSTRICK: Eine grosse Meta-Analyse ist KEIN Garant für valide Befunde — sie ist nur so gut wie die eingeschlossenen Studien."},

// ── Sitzung 5: Statistische Power ───────────────────────────
{"id":"esf-s5-13","type":"qa","course":"ESF","topic":"Sitzung 5 — Statistische Power","tags":["power","stichprobengrösse","replikationskrise"],"difficulty":2,
"front":"Was ist statistische Power und wovon hängt sie ab?",
"back":"**Statistische Power** = die Wahrscheinlichkeit, einen Effekt zu entdecken, wenn er tatsächlich in der Population vorhanden ist.\n\nFormell: Power = 1 − β (β = Fehler 2. Art = Wahrscheinlichkeit, einen echten Effekt zu verpassen)\n\n**Power hängt ab von:**\n1. **Effektgrösse** (d, r, η²): Grössere Effekte leichter zu entdecken\n2. **Stichprobengrösse (N):** Grössere Stichproben = höhere Power\n3. **Signifikanzniveau (α):** Strengeres α (z.B. .01 statt .05) senkt Power\n\n**Konsequenz tiefer Power:**\n- Viele nicht-informative Studien: Kein Fund = unsicher ob kein Effekt oder zu wenig Power\n- Ressourcenverschwendung\n- Falls ein Effekt doch gefunden wird: er ist wahrscheinlich überschätzt (Winner's Curse)\n\nMERKE: Daumenregel in der Sozialforschung: Power ≥ 0.80 anstreben.\nFALLSTRICK: Tiefe Power erhöht NICHT die Fehler-1.-Art-Rate, aber sie erhöht das Risiko, Effekte zu überschätzen wenn sie gefunden werden."},

// ── Sitzung 5: Open Science — Definition ────────────────────
{"id":"esf-s5-14","type":"qa","course":"ESF","topic":"Sitzung 5 — Open Science Definition","tags":["open science","transparenz"],"difficulty":1,
"front":"Wie definiert Wirtz (2019) Open Science und welche vier Elemente umfasst es?",
"back":"**Definition (Wirtz, 2019):**\n\"Transparentes und zugängliches Wissen, das durch kollaborative Netzwerke geteilt wird.\"\n\n**Vier Elemente:**\n1. **Transparenz** in Methodik, Beobachtung und Daten\n2. **Offener Zugang** zur wissenschaftlichen Kommunikation (Open Access)\n3. **Öffentliche Verfügbarkeit** von Forschungsdaten (Open Data)\n4. **Web-basierte Kollaborationstools** für gemeinsame Forschung\n\n**Ziel:** Wissenschaft nachvollziehbarer, reproduzierbarer und effizienter machen durch Offenlegung aller Forschungsschritte.\n\nMERKE: Open Science ist die direkte Antwort auf alle vier Ursachen der Replikationskrise.\nFALLSTRICK: Open Science ≠ nur Open Access (Publikationen frei zugänglich) — es umfasst auch Daten, Materialien und den gesamten Forschungsprozess."},

// ── Sitzung 5: Präregistrierung ─────────────────────────────
{"id":"esf-s5-15","type":"qa","course":"ESF","topic":"Sitzung 5 — Präregistrierung","tags":["präregistrierung","open science","qrp"],"difficulty":2,
"front":"Was ist Präregistrierung, welche Elemente umfasst sie und welche QRPs verhindert sie?",
"back":"**Präregistrierung:** Die Planung einer Studie wird VOR ihrer Durchführung in einer öffentlichen Datenbank registriert (z.B. OSF, AsPredicted).\n\n**Registriert werden:**\n- Forschungsfrage und Hypothesen\n- Stichprobenmerkmale (N, Einschlusskriterien)\n- Messungen und Instrumente\n- Geplante Analysen (inkl. Haupttest, Kovariaten, Ausreisser-Umgang)\n\n**Verhinderte QRPs:**\n- **HARKing:** Hypothesen sind vor Datensichtung dokumentiert → nachträgliche Umformulierung sichtbar\n- **P-hacking:** Analysestrategie ist vorab festgelegt → selektive Analyse erkennbar\n- **Optional Stopping:** Stichprobengrösse ist vorher definiert\n- **Outcome Switching:** Primäres Outcome ist vorher benannt\n\nMERKE: Präregistrierung schützt NICHT vor Fehlern in Theorie oder Methodik — nur vor strategischer Manipulation von Analysen.\nFALLSTRICK: Eine präregistrierte Studie kann trotzdem schlechte Forschung sein — Präregistrierung garantiert keine Qualität, nur Transparenz."},

// ── Sitzung 5: Registered Report ────────────────────────────
{"id":"esf-s5-16","type":"qa","course":"ESF","topic":"Sitzung 5 — Registered Report vs. Präregistrierung","tags":["registered report","präregistrierung","open science"],"difficulty":3,
"front":"Was ist ein Registered Report und wie unterscheidet er sich von einer einfachen Präregistrierung?",
"back":"**Präregistrierung:** Forscher registriert Studienplan in öffentlicher Datenbank → kein Einbezug der Zeitschrift.\n\n**Registered Report:** Das Studienprotokoll wird bei einer Zeitschrift eingereicht und PEER-REVIEWED, BEVOR die Daten erhoben werden. Bei positivem Review erhält die Studie eine bedingte Annahmezusage (in-principle acceptance) — unabhängig vom späteren Ergebnis.\n\n**Unterschied:**\n\n| | Präregistrierung | Registered Report |\n|---|---|---|\n| Zeitpunkt Review | Kein Review | Vor Erhebung |\n| Wer reviewt? | Niemand | Zeitschriftsgutachter |\n| Publikationszusage? | Nein | Ja (bedingt) |\n| Publikations-Bias? | Reduziert | Stark minimiert |\n| HARKing? | Verhindert | Verhindert |\n\n**Vorteil Registered Report:** Minimiert Publikations-Bias, weil die Zeitschrift sich zur Publikation verpflichtet UNABHÄNGIG vom Ausgang.\n\nMERKE: Registered Report = Präregistrierung + Peer-Review vor Durchführung + Publikationszusage.\nFALLSTRICK: Präregistrierung allein ändert NICHT das Anreizproblem der Publikation — der Registered Report adressiert dies direkt."},

// ── Sitzung 5: Open Data ─────────────────────────────────────
{"id":"esf-s5-17","type":"qa","course":"ESF","topic":"Sitzung 5 — Open Data","tags":["open data","open science","replikation"],"difficulty":1,
"front":"Was bedeutet Open Data im Kontext von Open Science und warum ist es wichtig?",
"back":"**Open Data:** Forschungsdaten werden offen zugänglich und wiederverwendbar für jeden Zweck bereitgestellt — in der Regel in einem öffentlichen Repositorium (z.B. OSF, Zenodo, figshare).\n\n**Wichtigkeit:**\n1. **Replikation ermöglichen:** Andere können die Analysen exakt nachvollziehen (Computational Reproducibility)\n2. **Fehleraufdeckung:** Datenmängel oder Analyseprobleme können von anderen entdeckt werden\n3. **Sekundärforschung:** Datensätze können für neue Fragestellungen wiederverwendet werden → Ressourceneffizienz\n4. **Vertrauen:** Transparenz stärkt das Vertrauen in wissenschaftliche Befunde\n\n**Konsequenz für Replikationskrise:** Ohne Zugang zu Rohdaten ist echte Replikation (nicht nur konzeptuelle) unmöglich.\n\nMERKE: Open Data ist eine der direktesten Massnahmen gegen die Replikationskrise.\nFALLSTRICK: Open Data erfordert sorgfältigen Datenschutz — personenbezogene Daten können nicht einfach öffentlich gemacht werden (anonymisieren oder synthetische Daten verwenden)."},

// ── Sitzung 5: Neue Technologien — Virtual Reality ───────────
{"id":"esf-s5-18","type":"qa","course":"ESF","topic":"Sitzung 5 — Virtual Reality in der Forschung","tags":["vr","neue technologien","validität"],"difficulty":2,
"front":"Welche Vorteile bietet Virtual Reality (VR) für die empirische Sozialforschung?",
"back":"**Vorteile von VR in der Sozialforschung:**\n\n1. **Realistische, kontrollierte Experimentumgebung:** Szenarien können detailliert und standardisiert gestaltet werden — weder rein künstlich (Labor) noch unkontrolliert (Feld)\n\n2. **Echtzeit-Datensammlung:** Verhalten, Reaktionszeiten, Blickbewegungen etc. können automatisch und kontinuierlich erfasst werden\n\n3. **Erhöhte (ökologische) Validität:** Versuchspersonen verhalten sich natürlicher in VR als bei abstrakten Laboraufgaben\n\n4. **Keine Abhängigkeit von menschlicher Erinnerung:** Vergangene Erlebnisse müssen nicht erinnert werden — Reaktionen entstehen in Echtzeit\n\n5. **Ethisch sichere Exposition:** Riskante oder unmögliche Szenarien (Brände, soziale Stress-Situationen) können simuliert werden\n\nMERKE: VR verbindet interne Validität (Kontrolle) mit externer Validität (Realismus) besser als klassische Labormethoden.\nFALLSTRICK: VR ist technisch aufwendig und teuer; Cyber-Sickness kann die Messung verfälschen."},

// ── Sitzung 5: Neue Technologien — Eyetracking ──────────────
{"id":"esf-s5-19","type":"qa","course":"ESF","topic":"Sitzung 5 — Eyetracking","tags":["eyetracking","neue technologien","messung"],"difficulty":2,
"front":"Was misst Eyetracking und welche drei zentralen Messgrössen werden unterschieden?",
"back":"**Eyetracking** erfasst Augenbewegungen um zu verstehen, wohin und wie lange Personen schauen — als Indikator für Aufmerksamkeit und kognitive Verarbeitung.\n\n**Drei zentrale Messgrössen:**\n\n1. **Fixation (Verweildauer):** Wie lange verweilt der Blick auf einem bestimmten Bereich? Lange Fixation = hohe Aufmerksamkeit / intensivere Verarbeitung\n\n2. **Sakkaden (Bewegungssequenzen):** Schnelle Sprungbewegungen des Auges zwischen Fixationspunkten. Die Sequenz der Sakkaden zeigt den 'Lese-' oder 'Scan'-Pfad.\n\n3. **Pupillengrösse:** Veränderungen der Pupillendilatation als Indikator für Aufregung / kognitive Belastung.\n\n**Anwendungen:** Werbewirkungsforschung, UX-Design, Lernforschung, klinische Diagnostik.\n\nMERKE: Pupillengrösse misst Arousal (Intensität), nicht Valenz (positiv/negativ) — ähnlich wie GSR.\nFALLSTRICK: Eyetracking misst Blickrichtung, nicht zwingend bewusste Aufmerksamkeit — periphere Wahrnehmung wird nicht erfasst."},

// ── Sitzung 5: Neue Technologien — GSR ──────────────────────
{"id":"esf-s5-20","type":"qa","course":"ESF","topic":"Sitzung 5 — Galvanic Skin Response (GSR)","tags":["gsr","neue technologien","emotion"],"difficulty":2,
"front":"Was misst die Galvanic Skin Response (GSR) und was misst sie explizit NICHT?",
"back":"**GSR (Galvanic Skin Response) / EDA (Electrodermal Activity):**\nMisst den elektrischen Leitwert der Haut, der durch Schweissdrüsenaktivität beeinflusst wird.\n\n**Was GSR MISST:**\n- **Intensität des emotionalen/physiologischen Zustands** (Arousal)\n- Allgemeine psychophysiologische Aktivierung\n- Stressreaktionen\n\n**Was GSR NICHT misst:**\n- **Die Art (Valenz) der Emotion:** GSR unterscheidet NICHT zwischen Freude, Angst, Ärger — alle erhöhen gleichermassen den Hautleitwert\n- Weder positiver noch negativer Affekt ist direkt ableitbar\n\n**Kombination nötig:** Um Valenz zu bestimmen, muss GSR mit anderen Methoden kombiniert werden (z.B. Facial Action Coding, Selbstbericht).\n\n**Anwendungen:** Werbewirkung, Stressforschung, Lügendetektoren (umstritten), Nutzererfahrung.\n\nMERKE: GSR = Arousal-Mass, KEIN Valenz-Mass. Diese Unterscheidung ist prüfungsrelevant!\nFALLSTRICK: Hohe GSR-Reaktion auf eine Werbung bedeutet nicht zwingend positive Einstellung — es könnte auch Irritation sein."},

// ── Sitzung 5: MC-Simulation 1 ──────────────────────────────
{"id":"esf-s5-21","type":"qa","course":"ESF","topic":"Sitzung 5 — MC-Simulation: Gütekriterien","tags":["prüfungstyp","mc","gütekriterien"],"difficulty":3,
"front":"[MC SINGLE CHOICE — Prüfungstyp]\n\nEin Forschungsteam entwickelt einen Fragebogen zur Messung von 'Arbeitszufriedenheit'. Nach wiederholten Messungen zeigt sich, dass die Ergebnisse sehr stabil sind. Gleichzeitig ergeben Experteninterviews, dass der Fragebogen wichtige Aspekte wie Work-Life-Balance und kollegiales Klima gar nicht abdeckt.\n\nWelche Aussage beschreibt diese Situation korrekt?\n\nA) Der Fragebogen ist weder reliabel noch valide.\nB) Der Fragebogen ist reliabel, aber es fehlt an Inhaltsvalidität.\nC) Der Fragebogen ist valide, aber nicht reliabel.\nD) Der Fragebogen hat hohe Konstruktvalidität, aber niedrige Kriteriumsvalidität.",
"back":"**Korrekte Antwort: B**\n\n**Begründung:**\n- 'Stabile Ergebnisse bei wiederholten Messungen' = hohe **Reliabilität** (Test-Retest-Stabilität)\n- 'Wichtige Aspekte nicht abgedeckt' = niedrige **Inhaltsvalidität** (der Fragebogen repräsentiert nicht alle relevanten Aspekte des Konstrukts)\n\n**Warum die anderen falsch sind:**\n- A: Falsch — Stabilität zeigt klar vorhandene Reliabilität\n- C: Logisch unmöglich — valide messen erfordert Reliabilität (Validität → Reliabilität)\n- D: Konstruktvalidität und Inhaltsvalidität werden hier verwechselt; das Problem ist Inhaltslücken, nicht Korrelation mit Kriterien\n\nMERKE: Inhaltsvalidität = Vollständigkeit der abgedeckten Facetten des Konstrukts.\nFALLSTRICK: Stabilität (Reliabilität) und Vollständigkeit (Inhaltsvalidität) sind unabhängige Eigenschaften!"},

// ── Sitzung 5: MC-Simulation 2 ──────────────────────────────
{"id":"esf-s5-22","type":"qa","course":"ESF","topic":"Sitzung 5 — MC-Simulation: Open Science Praktiken","tags":["prüfungstyp","mc","open science","qrp"],"difficulty":3,
"front":"[MC MULTIPLE CHOICE — Prüfungstyp — ALLE richtigen Antworten nötig für Punkte]\n\nEine Forscherin führt eine Studie durch. Sie erhebt sechs verschiedene Outcome-Variablen, analysiert alle, und berichtet im Paper nur die zwei signifikanten — ohne dies zu erwähnen. Ausserdem formuliert sie ihre Hypothesen so um, dass sie perfekt zu den Ergebnissen passen.\n\nWelche fragwürdigen Forschungspraktiken liegen vor?\n\nA) P-hacking\nB) HARKing\nC) Outcome Switching\nD) Optional Stopping\nE) Publikations-Bias",
"back":"**Korrekte Antworten: B und C**\n\n**Begründung:**\n- **B (HARKing):** Die Hypothesen werden NACH den Ergebnissen umformuliert (Hypothesizing After Results Known) ✓\n- **C (Outcome Switching):** Sechs AVs erhoben, nur zwei signifikante berichtet, ohne Offenlegung ✓\n\n**Warum die anderen falsch sind:**\n- **A (P-hacking):** Im Szenario werden keine verschiedenen Analysen/Tests probiert — nur Outcome-Selektion\n- **D (Optional Stopping):** Keine Erwähnung, dass die Erhebung gestoppt wurde sobald Signifikanz erreicht war\n- **E (Publikations-Bias):** Dies betrifft Zeitschriften-Entscheidungen, nicht das Verhalten der Forscherin selbst\n\n**Prüfungshinweis:** Bei Multiple-Choice-Fragen mit 'ALLE oder 0 Punkte' — besonders sorgfältig zwischen ähnlichen Konzepten unterscheiden!\n\nMERKE: Outcome Switching = selektives Berichten der AV; P-hacking = selektives Berichten der Analyse/des Tests.\nFALLSTRICK: P-hacking und Outcome Switching klingen ähnlich, sind aber verschieden: Outcome Switching wählt die Variable, p-hacking wählt die Analyse."}

];

// Export für Lernplattform
if (typeof module !== "undefined") module.exports = flashcards_esf_s5;

// ══════════════════════════════════════════════════════════════
// ESF Sitzung 6 — Schreibprozess und Dissemination
// Prüfung: 23 Juni 2026 | 60 Min | 30 Fragen | 60 Punkte
// ══════════════════════════════════════════════════════════════

const flashcards_esf_s6 = [

// ── Sitzung 6: Prüfungsformat ────────────────────────────────
{"id":"esf-s6-01","type":"qa","course":"ESF","topic":"Sitzung 6 — Prüfungsformat","tags":["pruefung","multiple-choice","scoring"],"difficulty":1,
"front":"Wie funktioniert die Punktevergabe bei Multiple-Choice-Fragen in der ESF-Prüfung?",
"back":"Bei Multiple-Choice-Fragen müssen ALLE Häkchen korrekt gesetzt sein, um 2 Punkte zu erhalten. Sind nicht alle Antworten korrekt (auch wenn nur eine fehlt oder eine falsche angekreuzt ist), gibt es 0 Punkte.\n\nBei Single-Choice: 1 von 5 Kästchen → richtig = 2P, falsch = 0P.\n\nMERKE: MC ist 'alles oder nichts' — lieber sicher sein, bevor man ein zweifelhaftes Kreuz setzt."},

// ── Sitzung 6: Akademisches Schreiben ───────────────────────
{"id":"esf-s6-02","type":"cloze","course":"ESF","topic":"Sitzung 6 — Schreibprozess","tags":["schreiben","phasen","prozess"],"difficulty":2,
"front":"Die 5 Phasen des akademischen Schreibprozesses:\n1. {{Themenwahl und Überblick}}\n2. {{Fokussieren, Strukturieren und Planen}}\n3. {{Lesen und Rohfassung schreiben}}\n4. {{Überarbeiten und ergänzen}}\n5. {{Abschließen und korrigieren}}",
"back":"1. Themenwahl und Überblick\n2. Fokussieren, Strukturieren und Planen\n3. Lesen und Rohfassung schreiben\n4. Überarbeiten und ergänzen\n5. Abschließen und korrigieren\n\nMERKE: Phase 3 trennt Schreiben und Editieren bewusst — niemals gleichzeitig schreiben und editieren."},

// ── Sitzung 6: Artikelstruktur ───────────────────────────────
{"id":"esf-s6-03","type":"qa","course":"ESF","topic":"Sitzung 6 — Struktur quantitativer Artikel","tags":["schreiben","quantitativ","struktur"],"difficulty":2,
"front":"In welcher Reihenfolge sind die Abschnitte eines quantitativen wissenschaftlichen Artikels typischerweise aufgebaut?",
"back":"1. Abstract\n2. Introduction & Motivation\n3. Theoretical Background\n4. Studies (Method / Results / Discussion) — ggf. mehrere Studien\n5. General Discussion (Contribution & Limitations)\n6. References\n\nMERKE: Bei qualitativen Artikeln kommt nach der Introduction zusätzlich ein 'Literature Stream' und eine 'Analytical Lens' bevor der Context & Method-Teil folgt."},

// ── Sitzung 6: Sanduhr-Form ──────────────────────────────────
{"id":"esf-s6-04","type":"why","course":"ESF","topic":"Sitzung 6 — Sanduhr-Prinzip","tags":["schreiben","struktur","sanduhr"],"difficulty":2,
"front":"Warum wird die Struktur eines wissenschaftlichen Artikels als 'Sanduhr-Form' bezeichnet?",
"back":"Der Artikel beginnt breit (allgemeines Thema, gesellschaftliche Relevanz), verengt sich zur spezifischen Forschungsfrage und Methodik (die 'Taille'), und öffnet sich am Ende wieder zu breiten Implikationen und Beiträgen für Theorie und Praxis.\n\nMERKE: Intro und Diskussion müssen für ALLE Leser verständlich sein — nicht nur Fachexperten."},

// ── Sitzung 6: Schreibregeln ─────────────────────────────────
{"id":"esf-s6-05","type":"cloze","course":"ESF","topic":"Sitzung 6 — Schreibtipps","tags":["schreiben","stil","regeln"],"difficulty":2,
"front":"Akademische Schreibregeln laut Vorlesung:\n- {{Aktiv}} statt Passiv verwenden\n- {{4–8}} Sätze pro Absatz\n- Maximal {{20–25}} Wörter pro Satz\n- Zuerst {{Gliederung}} erstellen, dann erst schreiben\n- Mit einem {{Big Bang}} enden",
"back":"- Aktiv statt Passiv\n- 4–8 Sätze pro Absatz\n- Max. 20–25 Wörter pro Satz\n- Gliederung zuerst (niemals gleichzeitig schreiben und editieren)\n- Mit einem 'Big Bang' enden\n\nMERKE: Komplizierte Sprache ist ein häufiger Fehler — Klarheit schlägt Komplexität."},

// ── Sitzung 6: Häufige Fehler ────────────────────────────────
{"id":"esf-s6-06","type":"qa","course":"ESF","topic":"Sitzung 6 — Häufige Fehler im Schreiben","tags":["schreiben","fehler","qualitaet"],"difficulty":3,
"front":"Welche häufigen Fehler werden in wissenschaftlichen Arbeiten laut Vorlesung identifiziert? (Nenne mindestens 5)",
"back":"1. Keine klare Forschungsfrage\n2. Literatur nur aufzählen statt diskutieren (kein roter Faden)\n3. Fehlender roter Faden im Gesamttext\n4. Zu viele Hypothesen\n5. Schlechte Operationalisierung der Konstrukte\n6. Kein erkennbarer wissenschaftlicher Beitrag\n7. Komplizierte, unverständliche Sprache\n\nMERKE: 'Literatur nur aufzählen' ist einer der klassischsten Fehler — Synthese und kritische Diskussion sind gefragt."},

// ── Sitzung 6: Zitierung & Plagiat ──────────────────────────
{"id":"esf-s6-07","type":"qa","course":"ESF","topic":"Sitzung 6 — Zitierung und Plagiat","tags":["zitierung","apa","plagiat","hsG"],"difficulty":1,
"front":"Welcher Zitierstandard gilt an der HSG und welche Konsequenz hat Plagiat?",
"back":"An der HSG gilt der APA-Standard für Zitierungen.\n\nPlagiat führt zur Note 1 (schlechteste Note).\n\nMERKE: APA-Standard bedeutet u.a. Autor-Jahr-Zitierung im Text, z.B. (Kaufmann, 2024), und vollständiges Literaturverzeichnis am Ende."},

// ── Sitzung 6: Datenvisualisierung Definition ────────────────
{"id":"esf-s6-08","type":"cloze","course":"ESF","topic":"Sitzung 6 — Datenvisualisierung","tags":["visualisierung","definition","daten"],"difficulty":2,
"front":"Definition Datenvisualisierung: 'Prozess der auf {{qualitativen oder quantitativen Daten}} basiert und zu einem {{Bild}} führt, das die {{Erkundung, Untersuchung und Kommunikation}} der Daten unterstützt.'",
"back":"Vollständige Definition: 'Prozess der auf qualitativen oder quantitativen Daten basiert und zu einem Bild führt, das die Erkundung, Untersuchung und Kommunikation der Daten unterstützt.'\n\nMERKE: Visualisierung hat drei Funktionen — Erkundung (explorativ), Untersuchung (analytisch), Kommunikation (präsentativ)."},

// ── Sitzung 6: 10 Prinzipien Visualisierung ──────────────────
{"id":"esf-s6-09","type":"qa","course":"ESF","topic":"Sitzung 6 — 10 Prinzipien Datenvisualisierung","tags":["visualisierung","prinzipien","daten"],"difficulty":3,
"front":"Nenne alle 10 Prinzipien guter Datenvisualisierung.",
"back":"1. Welche Information will ich kommunizieren?\n2. Richtige Software verwenden\n3. Effektive Formen wählen (z.B. Quadrate vs. Linien)\n4. Farbe hat immer eine Bedeutung\n5. Unsicherheit miteinbeziehen\n6. Panels (Small Multiples) wenn möglich verwenden\n7. Daten und Modelle sind unterschiedliche Dinge\n8. Simple Visualisierung — detaillierte Beschreibung\n9. Evtl. Infografiken mit Text kombinieren\n10. Feedback von Lesern einholen\n\nMERKE: Prinzip 1 ist die Grundlage aller anderen — ohne klare Kommunikationsabsicht ist jede Visualisierung wertlos."},

// ── Sitzung 6: Visualisierung Szenario-Karte ─────────────────
{"id":"esf-s6-10","type":"why","course":"ESF","topic":"Sitzung 6 — Visualisierung Prinzipien (Anwendung)","tags":["visualisierung","anwendung","prinzipien","szenario"],"difficulty":3,
"front":"SZENARIO: Ein Forscher erstellt ein Balkendiagramm mit 12 Ländern auf einer Folie. Die Balken sind alle blau. Konfidenzintervalle fehlen. Eine kurze Bildunterschrift sagt nur 'Abb. 3'. Welche Prinzipien der Datenvisualisierung werden verletzt?",
"back":"Verletzte Prinzipien:\n- Prinzip 3: Effektive Formen — 12 Länder auf einer Folie ist unübersichtlich; besser Panels (Small Multiples) → Prinzip 6\n- Prinzip 4: Farbe hat immer eine Bedeutung — wenn alle Balken gleich blau sind, geht die Unterscheidungsmöglichkeit verloren\n- Prinzip 5: Unsicherheit miteinbeziehen — fehlende Konfidenzintervalle\n- Prinzip 8: Simple Visualisierung + detaillierte Beschreibung — 'Abb. 3' ist keine detaillierte Beschreibung\n\nMERKE: Prinzip 6 (Small Multiples) wäre hier die elegante Lösung — ein Chart pro Land, einheitliche Skalierung."},

// ── Sitzung 6: Limitationen Visualisierung ───────────────────
{"id":"esf-s6-11","type":"qa","course":"ESF","topic":"Sitzung 6 — Limitationen Datenvisualisierung","tags":["visualisierung","limitationen","kausalitaet"],"difficulty":2,
"front":"Welche vier Hauptlimitationen der Datenvisualisierung werden in der Vorlesung genannt?",
"back":"1. Falsche Kausalität — Visualisierungen zeigen Korrelationen, keine Kausalität\n2. Zuverlässigkeit — 'Garbage in → garbage out': schlechte Daten ergeben irreführende Bilder\n3. Fehlinterpretation — Lesende können Grafiken missdeuten\n4. Fehlende Verbindung zu Evaluation — Visualisierung allein ersetzt keine kritische Bewertung\n\nMERKE: Das 'Garbage in → garbage out'-Prinzip gilt für alle empirischen Methoden — eine schöne Grafik rettet keine schlechten Daten."},

// ── Sitzung 6: Reviewer-Empfehlungen ────────────────────────
{"id":"esf-s6-12","type":"cloze","course":"ESF","topic":"Sitzung 6 — Reviewer-Empfehlungen","tags":["publikation","review","journal"],"difficulty":3,
"front":"Die 6 möglichen Reviewer-Empfehlungen im Publikationsprozess (von bester zu schlechtester):\n1. {{Accept}}\n2. {{Conditional Accept}}\n3. {{Revision}}\n4. {{Risky Revision}}\n5. {{Reject}}\n6. {{Desk Reject}}",
"back":"1. Accept — direkte Annahme (sehr selten)\n2. Conditional Accept — Annahme nach kleinen Änderungen\n3. Revision — Überarbeitung erwünscht, Chancen gut\n4. Risky Revision — Überarbeitung mit ungewissem Ausgang\n5. Reject — abgelehnt nach Review\n6. Desk Reject — abgelehnt ohne externe Reviewer (schon durch Editor)\n\nMERKE: Desk Reject ist die schnellste Ablehnung — der Editor entscheidet ohne Peer Review, oft weil das Thema nicht zum Journal passt."},

// ── Sitzung 6: Publikationsprozess ───────────────────────────
{"id":"esf-s6-13","type":"qa","course":"ESF","topic":"Sitzung 6 — Publikationsprozess Ablauf","tags":["publikation","prozess","journal"],"difficulty":2,
"front":"Beschreibe den typischen Publikationsprozess von der Einreichung bis zur Akzeptanz.",
"back":"1. Manuskript fertigstellen\n2. Einreichung beim Journal\n3. Desk Review durch Editor (→ ggf. Desk Reject)\n4. Weiterleitung an externe Reviewer\n5. Reviewer schreiben Gutachten & Empfehlung\n6. Editor trifft Entscheidung (Accept / Conditional Accept / Revision / Risky Revision / Reject)\n7. Bei Revision: Überarbeitung & erneute Einreichung\n8. Akzeptanz & Publikation\n\nMERKE: Top Journals (z.B. JCR) haben eine Akzeptanzquote von ~10%. Ein typischer Top-Journal-Artikel kostet ca. 400.000 USD in akademischer Arbeitszeit."},

// ── Sitzung 6: Journal-Rankings ──────────────────────────────
{"id":"esf-s6-14","type":"qa","course":"ESF","topic":"Sitzung 6 — Journal-Rankings","tags":["journal","ranking","vhb","ft50"],"difficulty":2,
"front":"Welche zwei Journal-Ranking-Systeme sind für die HSG-Betriebswirtschaft relevant? Nenne je ein Beispiel.",
"back":"1. VHB Jourqual (Verband der Hochschullehrer für Betriebswirtschaft)\n   - Skala: A+ (höchste) bis E (niedrigste)\n   - Top Marketing Journals A+: Journal of Marketing Research (JMR), Journal of Marketing (JM), Journal of Consumer Research (JCR), Marketing Science\n\n2. Financial Times 50 (FT50)\n   - Liste der 50 wichtigsten wirtschaftswissenschaftlichen Fachzeitschriften\n   - Grundlage für Rankings großer Business Schools\n\nMERKE: A+ im VHB ≈ Weltklasse. Die Akzeptanzquote bei JCR liegt bei ~10%."},

// ── Sitzung 6: Peer Review Richtlinien ───────────────────────
{"id":"esf-s6-15","type":"cloze","course":"ESF","topic":"Sitzung 6 — Peer Review Richtlinien","tags":["review","qualitaet","anonymitaet"],"difficulty":2,
"front":"Die 6 Richtlinien für gutes Peer Review:\n1. {{Strenge}} (wissenschaftliche Genauigkeit)\n2. {{Anonymität}} (double-blind)\n3. {{Schnelligkeit}} (zeitgerecht)\n4. {{Unparteilichkeit}} (kein Bias)\n5. {{Diplomatie}} (konstruktives Feedback)\n6. {{Präzision}} (konkrete Kritik)",
"back":"1. Strenge — wissenschaftliche Standards einhalten\n2. Anonymität — double-blind schützt Autor und Reviewer\n3. Schnelligkeit — zeitgerechte Rückmeldung\n4. Unparteilichkeit — keine Bevorzugung bekannter Autoren\n5. Diplomatie — Kritik konstruktiv formulieren\n6. Präzision — konkrete, umsetzbare Kommentare\n\nMERKE: Diese 6 Prinzipien sichern die Qualität des wissenschaftlichen Diskurses — Peer Review ist das Rückgrat der Wissenschaft."},

// ── Sitzung 6: MC-Simulation 1 ───────────────────────────────
{"id":"esf-s6-16","type":"qa","course":"ESF","topic":"Sitzung 6 — MC-Simulation: Schreiben","tags":["pruefungstyp","multiple-choice","simulation","schreiben"],"difficulty":3,
"front":"[PRÜFUNGSTYP: Multiple Choice — alle richtigen Antworten müssen angekreuzt werden]\n\nWelche der folgenden Aussagen zum akademischen Schreiben sind KORREKT?\n\nA) Man soll gleichzeitig schreiben und editieren, um Zeit zu sparen\nB) Intro und Diskussion sollen für alle Leser verständlich sein\nC) Aktive Formulierungen sind passiven vorzuziehen\nD) 10–15 Sätze pro Absatz sind ideal\nE) Zuerst die Gliederung, dann die Rohfassung",
"back":"Korrekte Antworten: B, C, E\n\nBegründungen:\n- A: FALSCH — Schreiben und Editieren sollen strikt getrennt werden\n- B: RICHTIG — Sanduhr-Prinzip: breite Teile für alle verständlich\n- C: RICHTIG — Aktiv statt Passiv ist explizite Regel\n- D: FALSCH — 4–8 Sätze pro Absatz (nicht 10–15)\n- E: RICHTIG — Gliederung immer vor der Rohfassung\n\nMERKE: Bei MC zählt jedes Häkchen — B+C+E ankreuzen, sonst 0 Punkte!"},

// ── Sitzung 6: MC-Simulation 2 ───────────────────────────────
{"id":"esf-s6-17","type":"qa","course":"ESF","topic":"Sitzung 6 — MC-Simulation: Visualisierung","tags":["pruefungstyp","multiple-choice","simulation","visualisierung"],"difficulty":3,
"front":"[PRÜFUNGSTYP: Multiple Choice — alle richtigen Antworten müssen angekreuzt werden]\n\nWelche der folgenden Aussagen zur Datenvisualisierung sind KORREKT?\n\nA) Farbe in Grafiken ist rein ästhetisch und hat keine inhaltliche Bedeutung\nB) Unsicherheit (z.B. Konfidenzintervalle) soll in Visualisierungen einbezogen werden\nC) Small Multiples (Panels) können helfen, viele Gruppen übersichtlich darzustellen\nD) Daten und Modelle sind dasselbe und können synonym verwendet werden\nE) Feedback von Lesern zur Visualisierung ist ein anerkanntes Prinzip",
"back":"Korrekte Antworten: B, C, E\n\nBegründungen:\n- A: FALSCH — Prinzip 4: Farbe hat IMMER eine Bedeutung\n- B: RICHTIG — Prinzip 5: Unsicherheit miteinbeziehen\n- C: RICHTIG — Prinzip 6: Panels (Small Multiples) wenn möglich\n- D: FALSCH — Prinzip 7: Daten und Modelle sind UNTERSCHIEDLICHE Dinge\n- E: RICHTIG — Prinzip 10: Feedback von Lesern einholen\n\nMERKE: Bei MC gilt: lieber eine Antwort weglassen als eine falsche hinzufügen — eine falsche Antwort kostet den ganzen Punkt."},

// ── Sitzung 6: MC-Simulation 3 ───────────────────────────────
{"id":"esf-s6-18","type":"qa","course":"ESF","topic":"Sitzung 6 — MC-Simulation: Publikationsprozess","tags":["pruefungstyp","multiple-choice","simulation","publikation"],"difficulty":3,
"front":"[PRÜFUNGSTYP: Multiple Choice — alle richtigen Antworten müssen angekreuzt werden]\n\nWelche der folgenden Aussagen zum Publikationsprozess sind KORREKT?\n\nA) Ein Desk Reject erfolgt nach ausführlichem Peer Review durch externe Gutachter\nB) Die Akzeptanzquote bei Top-Journals wie dem JCR liegt bei ca. 10%\nC) 'Conditional Accept' bedeutet, dass das Paper nach kleinen Änderungen angenommen wird\nD) Der VHB Jourqual bewertet Journals von A+ (höchste Qualität) bis E\nE) Ein typischer Top-Journal-Artikel kostet in akademischer Arbeitszeit ca. 40.000 USD",
"back":"Korrekte Antworten: B, C, D\n\nBegründungen:\n- A: FALSCH — Desk Reject erfolgt OHNE externe Reviewer, direkt durch den Editor\n- B: RICHTIG — ~10% Akzeptanzquote bei JCR und vergleichbaren Top Journals\n- C: RICHTIG — Conditional Accept = Annahme nach kleinen Revisionen\n- D: RICHTIG — VHB Jourqual Skala: A+ bis E\n- E: FALSCH — ~400.000 USD (nicht 40.000)\n\nMERKE: Desk Reject ist die schnellste Ablehnung — kein externer Review, nur Editor-Entscheidung!"}

// ════════════════════════════════════════════════════════════════
// OM (OPERATIONS MANAGEMENT)
// ════════════════════════════════════════════════════════════════

// ── Forecasting ──────────────────────────────────────────────────
{"id":"om01-01","type":"qa","course":"OM","topic":"Forecasting","tags":["Exponential-Smoothing","Formel"],"difficulty":2,
"front":"Formel für Exponential Smoothing und Bedeutung von α?",
"back":"F(t+1) = α · A(t) + (1-α) · F(t)\n\n• A(t) = tatsächlicher Wert in t\n• F(t) = Forecast für t\n• α ∈ [0, 1] = Glättungsparameter\n\nα nahe 1: reagiert schnell, wenig 'Gedächtnis'\nα nahe 0: glättet stark, reagiert langsam\n\nOptimales α: minimiert MSE über historische Daten (Solver)"},

{"id":"om01-02","type":"qa","course":"OM","topic":"Forecasting","tags":["MAD","MSE","MAPE","Fehlermaße"],"difficulty":2,
"front":"Was sind MAD, MSE und MAPE? Wann verwendet man welches?",
"back":"MAD (Mean Absolute Deviation): Σ|A_t - F_t| / n\n• Robust, leicht zu verstehen\n• Gleiche Einheit wie Daten\n\nMSE (Mean Squared Error): Σ(A_t - F_t)² / n\n• Bestraft grosse Fehler stark (quadratisch)\n• Für Optimierung via Solver\n\nMAPE (Mean Absolute Percentage Error): Σ|A_t - F_t|/A_t · 100% / n\n• Prozentual → gut für Vergleiche\n• Problem: division by zero wenn A_t = 0"},

{"id":"om01-03","type":"qa","course":"OM","topic":"Forecasting","tags":["Trend","Saisonalität","Holt-Winters"],"difficulty":3,
"front":"Wie erweitert man Exponential Smoothing für Trend und Saisonalität?",
"back":"Holt (Doppeltes ES): berücksichtigt Trend\n• F(t+1) = Level(t) + Trend(t)\n• Level(t) = α·A(t) + (1-α)·[Level(t-1) + Trend(t-1)]\n• Trend(t) = β·[Level(t) - Level(t-1)] + (1-β)·Trend(t-1)\n\nHolt-Winters (Dreifaches ES): + Saisonalität\n• Additive Variante: für konstante saisonale Schwankungen\n• Multiplikative Variante: wenn Saisonalität mit dem Level skaliert\n\nFaustregel: Schau zuerst auf Plot → Trend? Saisonalität? → Methode wählen"},

{"id":"om01-04","type":"qa","course":"OM","topic":"Forecasting","tags":["Gleitender-Durchschnitt","Moving-Average"],"difficulty":1,
"front":"Wie berechnet man einen k-Perioden Moving Average?",
"back":"F(t+1) = [A(t) + A(t-1) + ... + A(t-k+1)] / k\n\n• Letzte k Werte werden gleichgewichtet gemittelt\n• Einfach zu berechnen, reagiert träge\n• k = 3: schnell. k = 12: langsam, glättet Saisonalität\n\nNachteil vs. Exp. Smoothing:\n• Benötigt alle historischen Daten\n• Gleichgewichtet (älter = gleich wichtig wie neuer)"},

// ── Inventory Management ─────────────────────────────────────────
{"id":"om02-01","type":"qa","course":"OM","topic":"Inventory Management","tags":["EOQ","Lagerkosten","Bestellkosten","Formel"],"difficulty":2,
"front":"EOQ-Formel: wie lautet sie und was bedeuten die Variablen?",
"back":"EOQ = √(2·D·S / H)\n\n• D = Jahresbedarf (units/year)\n• S = Bestellkosten (CHF/order, setup cost)\n• H = Lagerkosten (CHF/unit/year)\n  → Oft H = i · c (Zinssatz × Stückpreis)\n\nBei EOQ: Bestellkosten = Lagerkosten (symmetrischer Minimum-Punkt)\n\nSensitivität: EOQ ist robust! Fehler von 10% in D → nur ~5% Fehler in EOQ"},

{"id":"om02-02","type":"qa","course":"OM","topic":"Inventory Management","tags":["ROP","Safety-Stock","Servicegrad"],"difficulty":2,
"front":"Wie berechnet man den Reorder Point (ROP) mit Safety Stock?",
"back":"Ohne Safety Stock:\nROP = d · L\n• d = durchschnittliche Tagesnachfrage\n• L = Lead Time (Lieferzeit in Tagen)\n\nMit Safety Stock:\nROP = d·L + Z · σ_L\n• Z = z-Wert für gewünschten Servicegrad\n  - 95%: Z = 1.645\n  - 99%: Z = 2.326\n• σ_L = Standardabweichung der Nachfrage über Lead Time\n\nPrüfungsfalle: ROP ≠ EOQ! ROP bestimmt WANN bestellt wird, EOQ WIE VIEL."},

{"id":"om02-03","type":"qa","course":"OM","topic":"Inventory Management","tags":["ABC-Analyse","Pareto"],"difficulty":1,
"front":"Was ist die ABC-Analyse im Inventory Management?",
"back":"ABC-Analyse: Klassifizierung von Artikeln nach Wert-Volumen-Beitrag\n\n• A-Artikel (~20% Artikel, ~80% Wert): enges Monitoring, häufige Kontrolle, JIT\n• B-Artikel (~30% Artikel, ~15% Wert): periodische Überprüfung\n• C-Artikel (~50% Artikel, ~5% Wert): einfache Verwaltung, grosser Sicherheitsbestand ok\n\nBasiert auf Pareto-Prinzip (80/20 Regel)\nPraxis: A-Artikel binden Kapital → maximale Aufmerksamkeit"},

// ── Aggregate Planning ───────────────────────────────────────────
{"id":"om03-01","type":"qa","course":"OM","topic":"Aggregate Planning & S&OP","tags":["Aggregate-Planning","Chase-Strategy","Level-Strategy"],"difficulty":2,
"front":"Chase-Strategie vs. Level-Strategie im Aggregate Planning: Vergleich?",
"back":"Chase-Strategie:\n• Produktionsvolumen passt sich der Nachfrage an\n• Vorteile: minimaler Lagerbestand\n• Nachteile: häufige Einstellungen/Entlassungen, Überstunden\n• Passend für: verderbliche Güter, arbeitsintensive Produktion\n\nLevel-Strategie:\n• Konstante Produktionsrate, Nachfragepuffer durch Lager\n• Vorteile: stabile Belegschaft, hohe Effizienz\n• Nachteile: hohe Lagerkosten, Gefahr von Überbeständen\n• Passend für: kapitalintensive Produktion, hochwertige Arbeitskräfte\n\nHybridstrategie: Mix aus beidem, oft optimal"},

{"id":"om03-02","type":"qa","course":"OM","topic":"Aggregate Planning & S&OP","tags":["S&OP","Kapazität","Bottleneck"],"difficulty":2,
"front":"Was ist S&OP (Sales & Operations Planning) und welche Kapazitätsoptionen gibt es?",
"back":"S&OP: Koordinationsprozess zwischen Vertrieb, Produktion, Supply Chain\n• Horizont: 3-18 Monate\n• Ziel: Nachfrage-Kapazitäts-Ausgleich\n\nKapazitätsoptionen:\n• Überstunden / Kurzarbeit\n• Temporäre Mitarbeiter\n• Outsourcing / Subcontracting\n• Lageraufbau/-abbau (Demand smoothing)\n• Backordering (Aufträge zurückstellen)\n• Nachfragesteuerung (Preise, Promotions, Yield Management)"},

// ── MRP & Scheduling ─────────────────────────────────────────────
{"id":"om04-01","type":"qa","course":"OM","topic":"MRP & Scheduling","tags":["MRP","BOM","Master-Schedule","Lead-Time"],"difficulty":3,
"front":"Was ist MRP und wie läuft die MRP-Logik ab?",
"back":"MRP (Material Requirements Planning): Bedarfsplanung für abhängige Güter\n\nInputs:\n• Master Production Schedule (MPS): was wird wann produziert?\n• Bill of Materials (BOM): welche Teile braucht man?\n• Lagerbestandsdaten: was ist schon vorhanden?\n\nMRP-Rechnung (pro Artikel):\n1. Gross Requirement = Bedarf aus MPS × BOM-Menge\n2. Net Requirement = Gross - vorhandener Bestand\n3. Planned Order Release = Net, rückdatiert um Lead Time\n\nZiel: 'richtige Teile, richtige Menge, richtiger Zeitpunkt'"},

{"id":"om04-02","type":"qa","course":"OM","topic":"MRP & Scheduling","tags":["Critical-Path","Scheduling","Gantt"],"difficulty":2,
"front":"Was ist der Critical Path in einem Projektplan?",
"back":"Critical Path: Längster Weg durch das Netzwerk von Start bis Ende\n→ Bestimmt die MINIMUM-Projektdauer\n\nAktivitäten auf dem Critical Path:\n• Float/Slack = 0 (kein Zeitpuffer)\n• Verzögerung verzögert das gesamte Projekt\n\nNon-Critical-Path Aktivitäten:\n• Haben Float (können sich verzögern ohne Projektende zu beeinflussen)\n\nCPM vs. PERT:\n• CPM: deterministische Zeiten\n• PERT: probabilistische Zeiten (optimistisch, wahrscheinlich, pessimistisch)"},

// ── Quality Management ───────────────────────────────────────────
{"id":"om05-01","type":"qa","course":"OM","topic":"Quality Management","tags":["TQM","Six-Sigma","DMAIC"],"difficulty":2,
"front":"Was ist Six Sigma und welche Phasen hat der DMAIC-Prozess?",
"back":"Six Sigma: Qualitätsmanagement-Methode zur Fehlerreduzierung\n• Ziel: < 3.4 Defekte pro Million Möglichkeiten (DPMO)\n• 6σ bedeutet: Prozessmitte ist 6 Standardabweichungen vom nächsten Spec-Limit\n\nDMAIC-Phasen:\n• Define: Problem und Scope festlegen\n• Measure: aktuelle Performance messen\n• Analyze: Ursachen identifizieren (Fishbone, Pareto)\n• Improve: Lösungen entwickeln und testen\n• Control: Verbesserungen sichern (Control Charts)"},

{"id":"om05-02","type":"qa","course":"OM","topic":"Quality Management","tags":["Control-Chart","Cpk","statistische-Prozesskontrolle"],"difficulty":3,
"front":"Was ist ein Control Chart und was ist der Cpk-Index?",
"back":"Control Chart (Shewhart): visualisiert Prozessleistung über Zeit\n• UCL = x̄ + 3σ, LCL = x̄ - 3σ (Upper/Lower Control Limit)\n• Punkte ausserhalb UCL/LCL oder spezielle Muster → Prozess 'out of control'\n\nCpk (Process Capability):\nCpk = min[(USL-μ)/3σ, (μ-LSL)/3σ]\n• USL/LSL = Spec-Grenzen (vom Kunden definiert)\n• Cpk ≥ 1.33: gut (4σ-Prozess)\n• Cpk ≥ 1.67: sehr gut (5σ)\n• Cpk < 1.0: Prozess produziert Ausschuss\n\nUnterschied: Control Limits (statistisch) ≠ Spec Limits (kundenbasiert)"}

]; // end FLASHCARD_DATA
})();
