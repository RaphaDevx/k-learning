window.EXAM_DATA_STATISTIK_TOPIC4 = {
  id: 'statistik-topic4',
  title: 'Statistik — Topic Quiz 4: Stichprobenverteilungen & Schätztheorie',
  course: 'Statistik',
  courseColor: '#2563eb',
  duration_minutes: 15,
  total_points: 20,
  exam_info: {
    date: '2026',
    duration: '15 Minuten',
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
      title: 'Stichprobenverteilungen & Schätztheorie',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-t4-01',
          number: 1,
          points: 2,
          text: 'Der zentrale Grenzwertsatz (ZGS) besagt: Bei zufälligem Ziehen einer Stichprobe der Grösse n aus einer Grundgesamtheit mit Mittelwert μ und Varianz σ². Welche Aussage ist FALSCH?',
          choices: [
            { key: 'A', text: 'Die Stichprobenverteilung von x̄ hat den Mittelwert μ.' },
            { key: 'B', text: 'Der Standardfehler von x̄ beträgt σ/√n.' },
            { key: 'C', text: 'Für n > 30 ist x̄ approximativ normalverteilt, unabhängig von der Form der Grundgesamtheit.' },
            { key: 'D', text: 'Für grössere n wird die Stichprobenverteilung von x̄ breiter (grössere Varianz).' },
            { key: 'E', text: 'Der ZGS gilt auch wenn die Grundgesamtheit nicht normalverteilt ist.' }
          ],
          correct: ['D'],
          explanation: 'D ist falsch: Für grössere n wird die Stichprobenverteilung von x̄ schmaler (geringere Varianz = σ²/n), nicht breiter. Die Standardabweichung σ/√n nimmt mit wachsendem n ab.'
        },
        {
          id: 'stat-t4-02',
          number: 2,
          points: 2,
          text: 'In einem grossen Unternehmen beträgt die durchschnittliche Überstundenzahl 62 pro Jahr mit σ = 15. In einer Stichprobe von n=36 Mitarbeitern: wie gross ist P(x̄ < 65)?',
          choices: [
            { key: 'A', text: '0.8849' },
            { key: 'B', text: '0.8413' },
            { key: 'C', text: '0.9772' },
            { key: 'D', text: '0.5793' },
            { key: 'E', text: '0.9332' }
          ],
          correct: ['A'],
          explanation: 'Standardfehler: σ_x̄ = σ/√n = 15/√36 = 15/6 = 2.5. z = (65 − 62) / 2.5 = 3/2.5 = 1.2. P(x̄ < 65) = Φ(1.2) = 0.8849. Option B (0.8413) entspräche z = 1.0, Option C (0.9772) entspräche z = 2.0.'
        },
        {
          id: 'stat-t4-03',
          number: 3,
          points: 2,
          text: 'Eine Produktionslinie hat σ = 0.3 cm. Eine Stichprobe von n=30 ergibt x̄ = 15.05 cm. Wie lautet das 99%-Konfidenzintervall für μ?',
          choices: [
            { key: 'A', text: '[14.909; 15.191]' },
            { key: 'B', text: '[14.960; 15.140]' },
            { key: 'C', text: '[14.872; 15.228]' },
            { key: 'D', text: '[14.993; 15.107]' },
            { key: 'E', text: '[14.940; 15.160]' }
          ],
          correct: ['A'],
          explanation: 'z_{0.995} = 2.576 ≈ 2.58 (99%). Standardfehler: σ/√n = 0.3/√30 = 0.0548. Halbbreite: 2.58 × 0.0548 = 0.141. KI: [15.05 − 0.141; 15.05 + 0.141] = [14.909; 15.191].'
        },
        {
          id: 'stat-t4-04',
          number: 4,
          points: 2,
          text: 'Aus 20000 Studierenden der Universität Zürich werden 600 befragt. 360 davon besitzen ein Natel-Abo. Wie lautet das 95%-Konfidenzintervall für den Anteil π der Natel-Abo-Besitzer?',
          choices: [
            { key: 'A', text: '[0.52; 0.68]' },
            { key: 'B', text: '[0.56; 0.64]' },
            { key: 'C', text: '[0.54; 0.66]' },
            { key: 'D', text: '[0.58; 0.62]' },
            { key: 'E', text: '[0.50; 0.70]' }
          ],
          correct: ['B'],
          explanation: 'p = 360/600 = 0.6. s_p = √(p(1−p)/n) = √(0.6·0.4/600) = √(0.0004) = 0.02. KI: [0.6 − 1.96·0.02; 0.6 + 1.96·0.02] = [0.6 − 0.0392; 0.6 + 0.0392] ≈ [0.56; 0.64].'
        },
        {
          id: 'stat-t4-05',
          number: 5,
          points: 2,
          text: 'Eine Professorin zieht n=64 Beobachtungen aus einer Normalverteilung mit μ=100 und σ²=4. Was ist das 95. Perzentil Q95 der Stichprobenverteilung von x̄?',
          choices: [
            { key: 'A', text: '100.12' },
            { key: 'B', text: '100.41' },
            { key: 'C', text: '100.33' },
            { key: 'D', text: '101.96' },
            { key: 'E', text: '100.25' }
          ],
          correct: ['B'],
          explanation: 'z_{0.95} = 1.645. Standardfehler = σ/√n = 2/√64 = 2/8 = 0.25. Q95 = μ + z·(σ/√n) = 100 + 1.645·0.25 = 100 + 0.411 = 100.41.'
        },
        {
          id: 'stat-t4-06',
          number: 6,
          points: 2,
          text: 'Für SMI-Tagesrenditen über 10 Handelstage gilt x̄ = 0.54% und s = 0.707%. Wie lautet das 90%-Konfidenzintervall (t-Verteilung, df=9, t_{0.05}^9 = 1.833)?',
          choices: [
            { key: 'A', text: '[0.13%; 0.95%]' },
            { key: 'B', text: '[0.20%; 0.88%]' },
            { key: 'C', text: '[0.00%; 1.08%]' },
            { key: 'D', text: '[0.40%; 0.68%]' },
            { key: 'E', text: '[-0.12%; 1.20%]' }
          ],
          correct: ['A'],
          explanation: 'Standardfehler: s/√n = 0.707/√10 = 0.2236. Halbbreite: 1.833 × 0.2236 = 0.41. KI: [0.54 − 0.41; 0.54 + 0.41] = [0.13%; 0.95%].'
        },
        {
          id: 'stat-t4-07',
          number: 7,
          points: 2,
          text: 'Was ist die korrekte Interpretation eines 95%-Konfidenzintervalls für μ?',
          choices: [
            { key: 'A', text: 'Der Stichprobenmittelwert x̄ liegt mit 95% Wahrscheinlichkeit im Intervall.' },
            { key: 'B', text: 'Bei 100 unabhängig konstruierten Konfidenzintervallen erwarten wir, dass 95 davon den wahren Wert μ enthalten.' },
            { key: 'C', text: 'μ liegt mit 95% Wahrscheinlichkeit im berechneten Intervall.' },
            { key: 'D', text: '95% aller Beobachtungen der Grundgesamtheit liegen im Intervall.' },
            { key: 'E', text: 'Das Intervall enthält mit Sicherheit den wahren Wert μ.' }
          ],
          correct: ['B'],
          explanation: 'Die korrekte frequentistische Interpretation: Bei wiederholter Stichprobenziehung und Konstruktion von 95%-KI würden 95% dieser Intervalle den wahren Parameter μ enthalten. Der wahre μ ist fix (kein Zufall), das Intervall ist zufällig. C klingt ähnlich, ist aber streng genommen falsch (μ ist nicht zufällig).'
        },
        {
          id: 'stat-t4-08',
          number: 8,
          points: 2,
          text: 'Es ist bekannt, dass 17% der Aktienfonds-Besitzer Rentner sind (π = 0.17). In einer Stichprobe von n=400: Wie gross ist die Wahrscheinlichkeit, dass der Stichprobenanteil p ≥ 20%?',
          choices: [
            { key: 'A', text: '0.0548' },
            { key: 'B', text: '0.1587' },
            { key: 'C', text: '0.0793' },
            { key: 'D', text: '0.0548' },
            { key: 'E', text: '0.0274' }
          ],
          correct: ['A'],
          explanation: 'E(p) = π = 0.17. σ_p = √(π(1−π)/n) = √(0.17·0.83/400) = √(0.000353) = 0.01878. z = (0.20 − 0.17) / 0.01878 = 1.598 ≈ 1.60. P(p ≥ 0.20) = 1 − Φ(1.60) = 1 − 0.9452 = 0.0548.'
        },
        {
          id: 'stat-t4-09',
          number: 9,
          points: 2,
          text: 'Der Proteingehalt von Erbsen-Burgern folgt N(μ=26%, σ=4.1%). Bei n=100 Stichproben: In welchem Intervall liegen 95% der Stichprobenmittelwerte?',
          choices: [
            { key: 'A', text: '[17.96%; 34.04%]' },
            { key: 'B', text: '[25.19%; 26.81%]' },
            { key: 'C', text: '[25.2%; 26.8%]' },
            { key: 'D', text: '[24.7%; 27.3%]' },
            { key: 'E', text: '[25.9%; 26.1%]' }
          ],
          correct: ['C'],
          explanation: 'Standardfehler = σ/√n = 4.1/√100 = 0.41. Prognoseintervall: μ ± z·(σ/√n) = 26 ± 1.96·0.41 = 26 ± 0.80. Intervall: [25.2%; 26.8%].'
        },
        {
          id: 'stat-t4-10',
          number: 10,
          points: 2,
          text: 'Eine Bierbrauerei füllt Flaschen mit μ=50.2cl und σ²=3.84cl². Bei n=600 Flaschen: Wie gross ist die Wahrscheinlichkeit, dass der durchschnittliche Flascheninhalt unter 50cl liegt?',
          choices: [
            { key: 'A', text: '0.0228' },
            { key: 'B', text: '0.0062' },
            { key: 'C', text: '0.0500' },
            { key: 'D', text: '0.0013' },
            { key: 'E', text: '0.0082' }
          ],
          correct: ['B'],
          explanation: 'Standardfehler: σ/√n = √3.84/√600 = 1.96/24.49 = 0.080. z = (50 − 50.2)/0.08 = −0.2/0.08 = −2.5. P(x̄ ≤ 50) = Φ(−2.5) = 1 − Φ(2.5) = 1 − 0.9938 = 0.0062.'
        }
      ]
    }
  ]
};
