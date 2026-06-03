window.EXAM_DATA_STATISTIK_TOPIC3 = {
  id: 'statistik-topic3',
  title: 'Statistik — Topic Quiz 3: Wahrscheinlichkeitsverteilungen',
  course: 'Statistik',
  courseColor: '#2563eb',
  duration_minutes: 20,
  total_points: 20,
  exam_info: {
    date: '2026',
    duration: '20 Minuten',
    format: 'Single Choice (10 Fragen × 2 Punkte)',
    allowed_aids: 'Keine',
    grading: 'Note 6.0: ≥90%, Note 5.5: ≥80%, Note 5.0: ≥70%, Note 4.5: ≥60%, Note 4.0: ≥50%, Note 3.5: ≥40%'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'teil1',
      title: 'Wahrscheinlichkeitsverteilungen',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-t3-01',
          number: 1,
          points: 2,
          text: 'Ein Glücksrad hat 9 gleichgrosse Felder (1–9). Es wird 7-mal gedreht. Wie gross ist die Wahrscheinlichkeit, dass das Rad genau 2-mal auf Feld 8 stehen bleibt (auf 4 Nachkommastellen)?',
          choices: [
            { key: 'A', text: '0.0159' },
            { key: 'B', text: '0.1439' },
            { key: 'C', text: '0.2341' },
            { key: 'D', text: '0.0833' },
            { key: 'E', text: '0.3333' }
          ],
          correct: ['B'],
          explanation: 'Binomialverteilung: π = 1/9, n = 7, x = 2. f(2) = C(7,2) · (1/9)² · (8/9)⁵ = 21 · (1/81) · (32768/59049) = 21 · 0.4050/59049 × 32768 ≈ 0.1439.'
        },
        {
          id: 'stat-t3-02',
          number: 2,
          points: 2,
          text: 'Eine binomialverteilte Zufallsvariable X hat E(X) = 2 und Var(X) = 4/3. Welche Parameter n und π hat diese Verteilung, und wie gross ist P(X = 2)?',
          choices: [
            { key: 'A', text: 'n = 6, π = 1/3, P(X=2) = 0.3292' },
            { key: 'B', text: 'n = 4, π = 1/2, P(X=2) = 0.3750' },
            { key: 'C', text: 'n = 6, π = 1/2, P(X=2) = 0.2344' },
            { key: 'D', text: 'n = 3, π = 2/3, P(X=2) = 0.4444' },
            { key: 'E', text: 'n = 8, π = 1/4, P(X=2) = 0.3115' }
          ],
          correct: ['A'],
          explanation: 'E(X) = nπ = 2 und Var(X) = nπ(1-π) = 4/3. Aus nπ = 2: (1-π) = (4/3)/2 = 2/3, also π = 1/3, n = 6. P(X=2) = C(6,2)·(1/3)²·(2/3)⁴ = 15·(1/9)·(16/81) = 240/729 ≈ 0.3292.'
        },
        {
          id: 'stat-t3-03',
          number: 3,
          points: 2,
          text: 'Für die Mitarbeit in einem Komitee haben sich 14 Personen beworben, 5 davon mit Erfahrung. Es werden 5 per Losentscheid ausgewählt. Welche Verteilung ist anzuwenden, und wie gross ist P(genau 3 Erfahrene)?',
          choices: [
            { key: 'A', text: 'Binomialverteilung; P(X=3) = 0.0879' },
            { key: 'B', text: 'Hypergeometrische Verteilung; P(X=3) = 0.1798' },
            { key: 'C', text: 'Poissonverteilung; P(X=3) = 0.2240' },
            { key: 'D', text: 'Hypergeometrische Verteilung; P(X=3) = 0.3516' },
            { key: 'E', text: 'Binomialverteilung; P(X=3) = 0.2646' }
          ],
          correct: ['B'],
          explanation: 'Ziehen ohne Zurücklegen aus endlicher Population → Hypergeometrische Verteilung. N=14, s=5, n=5, x=3: P = C(5,3)·C(9,2) / C(14,5) = 10·36 / 2002 = 360/2002 ≈ 0.1798.'
        },
        {
          id: 'stat-t3-04',
          number: 4,
          points: 2,
          text: '2% der Angestellten eines Unternehmens leiden unter Depressionen. Wie gross ist die Wahrscheinlichkeit, dass unter 100 zufällig ausgewählten Mitarbeitern mindestens 3 betroffen sind (Poissonverteilung mit λ = 2)?',
          choices: [
            { key: 'A', text: '0.1353' },
            { key: 'B', text: '0.1465' },
            { key: 'C', text: '0.3233' },
            { key: 'D', text: '0.4060' },
            { key: 'E', text: '0.5940' }
          ],
          correct: ['C'],
          explanation: 'λ = n·π = 100·0.02 = 2. P(X≥3) = 1 − P(X=0) − P(X=1) − P(X=2) = 1 − e⁻²[1 + 2 + 2] = 1 − 5e⁻² = 1 − 5·0.1353 = 1 − 0.6767 = 0.3233.'
        },
        {
          id: 'stat-t3-05',
          number: 5,
          points: 2,
          text: 'Das Universitätsnetz ist im Mittel 0.4 Virusattacken pro Woche ausgesetzt (Poissonverteilt). Mit welcher Wahrscheinlichkeit tritt in der kommenden Woche kein Virus auf?',
          choices: [
            { key: 'A', text: '0.4000' },
            { key: 'B', text: '0.5488' },
            { key: 'C', text: '0.6703' },
            { key: 'D', text: '0.7261' },
            { key: 'E', text: '0.8187' }
          ],
          correct: ['C'],
          explanation: 'P(X=0) = (λ⁰·e^(−λ)) / 0! = e^(−0.4) = 0.6703. Mit dem erwarteten Schaden von CHF 1000 pro Virus: E[Schaden] = λ · 1000 = 0.4 · 1000 = CHF 400.'
        },
        {
          id: 'stat-t3-06',
          number: 6,
          points: 2,
          text: 'Das Durchschnittseinkommen der Schweizer Haushalte (2003) betrug CHF 7416 mit σ = CHF 910 (normalverteilt). Wie gross ist der Anteil der Haushalte mit einem Einkommen über CHF 10000?',
          choices: [
            { key: 'A', text: 'ca. 0.50%' },
            { key: 'B', text: 'ca. 0.23%' },
            { key: 'C', text: 'ca. 2.28%' },
            { key: 'D', text: 'ca. 5.00%' },
            { key: 'E', text: 'ca. 1.14%' }
          ],
          correct: ['B'],
          explanation: 'Standardisierung: z = (10000 − 7416) / 910 = 2584/910 ≈ 2.84. P(X > 10000) = 1 − Φ(2.84) ≈ 1 − 0.9977 = 0.0023 ≈ 0.23%. Option C (2.28%) entspräche z = 2.0 (d.h. nur 2 Standardabweichungen über dem Mittelwert). Bei z ≈ 2.84 liegt der Anteil bei knapp 0.23%.'
        },
        {
          id: 'stat-t3-07',
          number: 7,
          points: 2,
          text: 'Beat benötigt für den Weg zur Uni im Schnitt 18 Min. mit σ = 4 Min. (normalverteilt). Beat hat gerade seine Wohnung verlassen. Er hat noch genau 20 Minuten. Wie gross ist die Wahrscheinlichkeit, dass er rechtzeitig ankommt?',
          choices: [
            { key: 'A', text: 'P(X ≤ 20) = 0.6915' },
            { key: 'B', text: 'P(X ≤ 20) = 0.7734' },
            { key: 'C', text: 'P(X ≤ 20) = 0.8413' },
            { key: 'D', text: 'P(X ≤ 20) = 0.9332' },
            { key: 'E', text: 'P(X ≤ 20) = 0.5000' }
          ],
          correct: ['A'],
          explanation: 'Standardisierung: z = (20 − 18) / 4 = 2/4 = 0.5. P(X ≤ 20) = Φ(0.5) = 0.6915. Beat kommt also mit etwa 69.15%iger Wahrscheinlichkeit rechtzeitig an. Option C würde z = 1.0 entsprechen, Option D entspricht z = 1.5.'
        },
        {
          id: 'stat-t3-08',
          number: 8,
          points: 2,
          text: 'Ein elektrisches Bauteil hält durchschnittlich 10 Jahre (Exponentialverteilung). Mit welcher Wahrscheinlichkeit hält es weniger als 8 Jahre (auf 3 Nachkommastellen)?',
          choices: [
            { key: 'A', text: '0.449' },
            { key: 'B', text: '0.551' },
            { key: 'C', text: '0.550' },
            { key: 'D', text: '0.632' },
            { key: 'E', text: '0.330' }
          ],
          correct: ['B'],
          explanation: 'Exponentialverteilung: λ = 1/10 = 0.1. F(x) = 1 − e^(−λx). P(X < 8) = 1 − e^(−0.1 × 8) = 1 − e^(−0.8) = 1 − 0.449 = 0.551.'
        },
        {
          id: 'stat-t3-09',
          number: 9,
          points: 2,
          text: 'Ungefähr 40% der Studierenden üben eine Teilzeitbeschäftigung aus. X ~ B(n=20, π=0.4). Wie gross sind Erwartungswert und Standardabweichung von X?',
          choices: [
            { key: 'A', text: 'E(X) = 8, σ(X) = 4.80' },
            { key: 'B', text: 'E(X) = 8, σ(X) = 2.19' },
            { key: 'C', text: 'E(X) = 8, σ(X) = 1.79' },
            { key: 'D', text: 'E(X) = 8, σ(X) = 4.00' },
            { key: 'E', text: 'E(X) = 10, σ(X) = 2.19' }
          ],
          correct: ['B'],
          explanation: 'E(X) = n·π = 20·0.4 = 8. Varianz: Var(X) = n·π·(1−π) = 20·0.4·0.6 = 4.8. Standardabweichung: σ = √4.8 ≈ 2.19.'
        },
        {
          id: 'stat-t3-10',
          number: 10,
          points: 2,
          text: 'Die gemeinsame Wahrscheinlichkeitsfunktion von X und Y sei gegeben. E(X) = 1.6, E(Y) = 1.85, E(XY) = 2.85. Wie gross ist Cov(X, Y)?',
          choices: [
            { key: 'A', text: 'Cov(X,Y) = 2.85' },
            { key: 'B', text: 'Cov(X,Y) = 0.09' },
            { key: 'C', text: 'Cov(X,Y) = −0.11' },
            { key: 'D', text: 'Cov(X,Y) = 0.00' },
            { key: 'E', text: 'Cov(X,Y) = 1.60' }
          ],
          correct: ['C'],
          explanation: 'Kovarianz: Cov(X,Y) = E(XY) − E(X)·E(Y) = 2.85 − 1.6·1.85 = 2.85 − 2.96 = −0.11.'
        }
      ]
    }
  ]
};
