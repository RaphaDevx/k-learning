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

// ── Wissenschaftstheorie ─────────────────────────────────────────
{"id":"esf01-01","type":"qa","course":"ESF","topic":"Wissenschaftstheorie & Forschungslogik","tags":["Forschungsprozess","Hypothesen","Deduktion"],"difficulty":2,
"front":"Was ist der Unterschied zwischen deduktiver und induktiver Forschungslogik?",
"back":"Deduktiv (Top-Down):\n• Theorie → Hypothese → Daten → Test\n• Hypothesenprüfend, quantitativ\n• 'Theorien können nur falsifiziert, nicht bewiesen werden' (Popper)\n\nInduktiv (Bottom-Up):\n• Beobachtung → Muster → Theorie\n• Typisch für qualitative Forschung\n• Grounded Theory: Theorie aus Daten entwickeln\n\nHybrid: Abduktion — beste Erklärung für überraschende Beobachtungen"},

{"id":"esf01-02","type":"qa","course":"ESF","topic":"Wissenschaftstheorie & Forschungslogik","tags":["Forschungsdesign","explorativ","deskriptiv","kausal"],"difficulty":2,
"front":"Erkläre exploratives, deskriptives und kausales Forschungsdesign.",
"back":"Explorativ: Neues erkunden, noch keine klaren Hypothesen\n• Qualitativ, kleine Stichprobe, offene Fragen\n• Ziel: Erkenntnisse generieren\n\nDeskriptiv: Zustand beschreiben und quantifizieren\n• Befragungen, Beobachtungen, Häufigkeiten\n• Ziel: Wie häufig? Wie verteilt?\n\nKausal: Ursache-Wirkung nachweisen\n• Braucht ein randomisiertes Experiment\n• Ziel: X verursacht Y?\n\nReihenfolge: Erst explorieren, dann deskriptiv, dann kausal!"},

// ── Quantitative Methoden ────────────────────────────────────────
{"id":"esf02-01","type":"qa","course":"ESF","topic":"Quantitative Methoden","tags":["Experiment","Randomisierung","Kausalität"],"difficulty":2,
"front":"Warum beweist nur ein randomisiertes Experiment Kausalität?",
"back":"Randomisierung: Probanden zufällig auf Experimental- und Kontrollgruppe aufteilen\n→ Störvariablen (Confounds) werden GLEICHMÄSSIG verteilt\n→ Unterschied zwischen Gruppen kann nur von UV kommen\n\nOhne Randomisierung:\n• Selection Bias: Gruppen unterscheiden sich systematisch\n• Confounds: Dritte Variable erklärt Zusammenhang\n\nBeispiel: Schokolade & Nobelpreise korrelieren — Confound = Wohlstand"},

{"id":"esf02-02","type":"qa","course":"ESF","topic":"Quantitative Methoden","tags":["Experiment","Labor","Feld","Online"],"difficulty":2,
"front":"Labor-, Feld- und Online-Experiment: Unterschiede in Validität?",
"back":"Labor:\n• Hohe interne Validität (Kontrolle)\n• Geringe externe Validität (künstliche Umgebung)\n\nFeld:\n• Hohe externe Validität (natürliche Umgebung)\n• Schwerer zu kontrollieren (interne Validität leidet)\n\nOnline:\n• Grosse Stichprobe, kostengünstig\n• Wenig Kontrolle, Attention-Checks nötig\n• Demographic Bias (Internet-User ≠ Bevölkerung)"},

{"id":"esf02-03","type":"qa","course":"ESF","topic":"Quantitative Methoden","tags":["Survey","Befragung","Stichprobe","Sampling"],"difficulty":2,
"front":"Was ist der Unterschied zwischen Zufallsstichprobe und Quotenstichprobe?",
"back":"Zufallsstichprobe (Probability Sampling):\n• Jedes Element hat eine bekannte Auswahlwahrscheinlichkeit\n• Erlaubt statistisch valide Generalisierung\n• Aufwändig: Vollständige Population muss bekannt sein\n\nQuotenstichprobe (Non-Probability):\n• Quoten nach demographischen Merkmalen festgelegt\n• Kosteneffizient, aber keine Randomisierung\n• Keine formale statistische Inferenz möglich\n\nFaustregel: Für kausale Schlüsse → Zufallsstichprobe; für explorative Zwecke → Quotenstichprobe ok"},

// ── Qualitative Methoden ─────────────────────────────────────────
{"id":"esf03-01","type":"qa","course":"ESF","topic":"Qualitative Methoden","tags":["Interview","Grounded-Theory","Ethnographie"],"difficulty":2,
"front":"Unterschiede zwischen strukturiertem, semi-strukturiertem und unstrukturiertem Interview?",
"back":"Strukturiert:\n• Fester Fragebogen, gleiche Reihenfolge für alle\n• Gut vergleichbar, wenig Flexibilität\n\nSemi-strukturiert (häufigste Form):\n• Leitfaden mit offenen Fragen, flexibel erweiterbar\n• Balance zwischen Vergleichbarkeit und Tiefe\n\nUnstrukturiert / narrativ:\n• Offene Gesprächsführung, kein Leitfaden\n• Für explorative, sensitive Themen\n• Sehr schwer auswertbar"},

{"id":"esf03-02","type":"qa","course":"ESF","topic":"Qualitative Methoden","tags":["Grounded-Theory","Sättigung","Sampling"],"difficulty":3,
"front":"Was ist Theoretical Sampling in der Grounded Theory?",
"back":"Theoretical Sampling: Datenerhebung und -analyse laufen parallel.\nNächste Stichprobe wird AUFGRUND bisheriger Analyse gewählt.\n\nZiel: Theoretische Sättigung erreichen\n→ Neue Fälle liefern keine neuen Informationen mehr\n\nAbgrenzung zum convenience sampling:\n• Nicht 'wer verfügbar', sondern 'wer liefert maximalen theoretischen Mehrwert'\n\nFolge: Stichprobengrösse nicht vorab festgelegt!"},

{"id":"esf03-03","type":"qa","course":"ESF","topic":"Qualitative Methoden","tags":["Inhaltsanalyse","Kodierung","Mayring"],"difficulty":2,
"front":"Was ist qualitative Inhaltsanalyse (nach Mayring)?",
"back":"Systematisches, regelgeleitetes Auswerten von Textmaterial\n\n3 Grundformen:\n• Zusammenfassung: Material komprimieren\n• Explikation: unklare Stellen erklären\n• Strukturierung: Kategorien deduktiv oder induktiv anlegen\n\nKodierung:\n1. Deduktiv: Kategorien vorab aus Theorie (top-down)\n2. Induktiv: Kategorien aus Material entwickeln (bottom-up)\n\nInterkoderreliabilität: Cohens κ > 0.7 als Richtwert"},

// ── Skalierung & Messung ─────────────────────────────────────────
{"id":"esf04-01","type":"qa","course":"ESF","topic":"Skalierung & Messung","tags":["Skalenniveau","Nominal","Ordinal","Intervall","Ratio"],"difficulty":2,
"front":"Nenne die 4 Skalenniveaus und welche Operationen jeweils erlaubt sind.",
"back":"Nominal: Kategorien ohne Rangfolge\n• Erlaubt: Gleich/Ungleich (=, ≠), Häufigkeiten\n• Bsp: Nationalität, Geschlecht, Farbe\n\nOrdinal: Rangfolge, aber Abstände nicht gleich\n• Erlaubt: >, <, =, ≠ (keine Abstände)\n• Bsp: Schulnoten, Likert-Skala (streng)\n\nIntervall: Gleiche Abstände, kein echter Nullpunkt\n• Erlaubt: +, − (keine ×, ÷)\n• Bsp: Temperatur in °C, IQ-Werte\n\nRatio: Gleiche Abstände + echter Nullpunkt\n• Alle Operationen erlaubt\n• Bsp: Einkommen, Alter, Gewicht"},

{"id":"esf04-02","type":"qa","course":"ESF","topic":"Skalierung & Messung","tags":["Likert","Cronbach","Skalierung"],"difficulty":2,
"front":"Was ist Cronbach's Alpha und ab welchem Wert ist eine Skala reliabel?",
"back":"Cronbach's α misst interne Konsistenz einer Skala:\n• Wie gut messen alle Items das gleiche Konstrukt?\n\nFormel basiert auf Inter-Item-Korrelationen\n\nRichtlinien:\n• α ≥ 0.9: exzellent\n• α ≥ 0.8: gut\n• α ≥ 0.7: akzeptabel (Mindeststandard)\n• α < 0.7: fraglich\n• α < 0.6: schlecht\n\nProblem: α steigt automatisch mit mehr Items → nicht 'je mehr desto besser'!"},

{"id":"esf04-03","type":"why","course":"ESF","topic":"Skalierung & Messung","tags":["Messfehler","Reliabilität","Validität"],"difficulty":3,
"front":"Warum kann ein sehr reliables Instrument trotzdem unvalide sein?",
"back":"Reliabilität = Konsistenz der Messung (misst immer gleich)\nValidität = Messung trifft das gemeinte Konstrukt\n\nBeispiel:\n• Körpergrösse als 'Intelligenz-Messung': hoch reliabel (immer gleiche Werte), aber misst nicht Intelligenz\n• Thermometer als Leistungsmesser: reliabel, aber unvalide\n\nVisualierung: Zielscheibe\n• Reliabel aber nicht valide: Treffer dicht beieinander, aber weit von Mitte\n• Valide und reliabel: Dicht beieinander UND in der Mitte\n\nFolgerung: Reliabilität ist notwendige, aber nicht hinreichende Bedingung für Validität"},

// ── Gütekriterien ────────────────────────────────────────────────
{"id":"esf05-01","type":"qa","course":"ESF","topic":"Gütekriterien & Forschungsethik","tags":["Reliabilität","Validität","Objektivität"],"difficulty":2,
"front":"Was sind die 3 klassischen Gütekriterien der quantitativen Forschung?",
"back":"Objektivität: Ergebnisse sind unabhängig vom Forscher\n• Durchführungs-, Auswertungs-, Interpretationsobjektivität\n\nReliabilität: Messung ist konsistent, stabil, wiederholbar\n• Test-Retest, Paralleltest, Split-Half, Cronbach's α\n\nValidität: Messung trifft das gemeinte Konstrukt\n• Inhaltsvalidität: deckt Konstrukt vollständig ab?\n• Konstruktvalidität: theoretisch korrekt?\n• Externe Validität: generalisierbar?\n\nHierarchie: Objektivität → Reliabilität → Validität (jedes basiert auf dem vorherigen)"},

{"id":"esf05-02","type":"qa","course":"ESF","topic":"Gütekriterien & Forschungsethik","tags":["Replikation","Open-Science","Pre-Registration"],"difficulty":2,
"front":"Was ist die Replikationskrise und wie reagiert die Wissenschaft darauf?",
"back":"Replikationskrise: Viele publizierte Studien konnten nicht repliziert werden\n• Open Science Collaboration 2015: ~60% Psychologiestudien nicht replizierbar\n• Gründe: kleine Stichproben, p-Hacking, HARKing (hypothesizing after results)\n\nAntworten der Wissenschaft:\n• Pre-Registration: Hypothesen und Methoden vorab registrieren\n• Open Data: Rohdaten veröffentlichen\n• Power Analysis: Stichprobenplanung vorab\n• Replikationsstudien gezielt fördern\n• Registered Reports: Review VOR Datenerhebung"},

{"id":"esf05-03","type":"cloze","course":"ESF","topic":"Gütekriterien & Forschungsethik","tags":["p-Hacking","α-Fehler","Multiple-Testing"],"difficulty":3,
"front":"P-Hacking: Bei {{20}} unabhängigen Tests mit α = 5% findet man im Schnitt {{1}} falsch positives Ergebnis. Das nennt sich {{Family-wise Error Rate}} Problem.",
"back":"P-Hacking: Bei 20 unabhängigen Tests mit α = 5% findet man im Schnitt 1 falsch positives Ergebnis. Das nennt sich Family-wise Error Rate Problem.\n\nLösungen:\n• Bonferroni-Korrektur: α_korrigiert = α/n\n• Holm-Methode (weniger konservativ)\n• Pre-Registration verhindert post-hoc Test-Shopping"},

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
