window.EXAM_DATA_STATISTIK_TOPIC5 = {
  id: 'statistik-topic5',
  title: 'Statistik — Topic Quiz 5: Hypothesentests',
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
      title: 'Hypothesentests',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-t5-01',
          number: 1,
          points: 2,
          text: 'Eine Stanzmaschine produziert Bauteile mit Solllänge μ₀ = 2 cm (σ = 0.07 cm, bekannt). Eine Stichprobe von n=35 ergibt x̄ = 2.025 cm. Testet man H0: μ = 2 gegen H1: μ ≠ 2 (α = 0.01), was ist das Ergebnis?',
          choices: [
            { key: 'A', text: 'z = 2.11 > z_{0.995} = 2.58 → H0 verwerfen' },
            { key: 'B', text: 'z = 2.11 < z_{0.995} = 2.58 → H0 nicht verwerfen' },
            { key: 'C', text: 'z = 1.79 > z_{0.995} = 1.96 → H0 verwerfen' },
            { key: 'D', text: 'z = 2.11 > z_{0.975} = 1.96 → H0 verwerfen' },
            { key: 'E', text: 'z = 3.14 > z_{0.995} = 2.58 → H0 verwerfen' }
          ],
          correct: ['B'],
          explanation: 'Testgrösse: z = (x̄ − μ₀) / (σ/√n) = (2.025 − 2) / (0.07/√35) = 0.025 / 0.01183 = 2.11. Kritischer Wert bei α=0.01 (zweiseitig): z_{0.995} = 2.576. Da 2.11 < 2.576, kann H0 nicht verworfen werden. Der p-Wert beträgt 2·(1−0.9826) = 0.0348, also > 0.01.'
        },
        {
          id: 'stat-t5-02',
          number: 2,
          points: 2,
          text: 'Beim letzten Examen haben 88 von 100 Kandidaten bestanden. Historisch gilt π = 0.8. Testet man H0: π = 0.8 gegen H1: π ≠ 0.8 (α = 0.05), was folgt?',
          choices: [
            { key: 'A', text: 'z = 2.0; da z > 1.96, wird H0 verworfen.' },
            { key: 'B', text: 'z = 2.0; da z < 2.58, wird H0 nicht verworfen.' },
            { key: 'C', text: 'z = 1.5; da z < 1.96, wird H0 nicht verworfen.' },
            { key: 'D', text: 'z = 3.0; da z > 1.96, wird H0 verworfen.' },
            { key: 'E', text: 'z = 2.0; da z > 2.576, wird H0 verworfen.' }
          ],
          correct: ['A'],
          explanation: 'σ_π = √(π₀(1−π₀)/n) = √(0.8·0.2/100) = √0.0016 = 0.04. z = (p − π₀)/σ_π = (0.88 − 0.8)/0.04 = 2.0. Kritischer Wert: z_{0.975} = 1.96. Da |z| = 2.0 > 1.96, wird H0 auf α = 0.05 verworfen.'
        },
        {
          id: 'stat-t5-03',
          number: 3,
          points: 2,
          text: 'Ein Wunderheiler behauptet, dass nach seiner Behandlung mehr als 75% der Männer mit Haarausfall wieder Haarwuchs haben. Diese Behauptung soll widerlegt werden. Welche Hypothesen sind korrekt?',
          choices: [
            { key: 'A', text: 'H0: π ≤ 0.75 und H1: π > 0.75' },
            { key: 'B', text: 'H0: π ≥ 0.75 und H1: π < 0.75' },
            { key: 'C', text: 'H0: π = 0.75 und H1: π ≠ 0.75' },
            { key: 'D', text: 'H0: p ≥ 0.75 und H1: p < 0.75' },
            { key: 'E', text: 'H0: π ≠ 0.75 und H1: π = 0.75' }
          ],
          correct: ['B'],
          explanation: 'Um die Behauptung (π > 0.75) zu widerlegen, muss sie als Nullhypothese formuliert werden: H0: π ≥ 0.75 (Behauptung des Heilers). Die Gegenhypothese (unsere Vermutung): H1: π < 0.75 (einseitiger Test). Man beachte: Hypothesen beziehen sich auf den Parameter π (Grundgesamtheit), nicht den Stichprobenanteil p.'
        },
        {
          id: 'stat-t5-04',
          number: 4,
          points: 2,
          text: 'Ein Paketgewicht-Test ergibt: n=25, x̄=4990g, s²=625g². Soll bei α=0.05 gezeigt werden, dass Pakete < 5000g wiegen (H0: μ ≥ 5000, H1: μ < 5000). Welches Ergebnis ist korrekt (t_{0.05}^{24} = −1.711)?',
          choices: [
            { key: 'A', text: 't = −2.0; da t < −1.711, wird H0 verworfen. Pakete sind leicht genug.' },
            { key: 'B', text: 't = −2.0; da t > −1.711, wird H0 nicht verworfen.' },
            { key: 'C', text: 't = 2.0; da t > 1.711, wird H0 verworfen.' },
            { key: 'D', text: 't = −1.5; da |t| < 1.711, wird H0 nicht verworfen.' },
            { key: 'E', text: 't = −2.0; da t < −1.96, wird H0 auf 5%-Niveau verworfen.' }
          ],
          correct: ['A'],
          explanation: 't = (x̄ − μ₀) / (s/√n) = (4990 − 5000) / (√625/√25) = −10 / (25/5) = −10/5 = −2.0. Kritischer Wert (einseitig links): t_{0.05}^{24} = −1.711. Da t = −2.0 < −1.711, wird H0 verworfen. Die Pakete wiegen im Mittel signifikant weniger als 5000g.'
        },
        {
          id: 'stat-t5-05',
          number: 5,
          points: 2,
          text: 'Die Teststatistik eines zweiseitigen z-Tests beträgt z = 1.78 (H0: μ = 200). Wie gross ist der zugehörige p-Wert?',
          choices: [
            { key: 'A', text: '0.9625' },
            { key: 'B', text: '0.0375' },
            { key: 'C', text: '0.0750' },
            { key: 'D', text: '0.1250' },
            { key: 'E', text: '0.9250' }
          ],
          correct: ['C'],
          explanation: 'Φ(1.78) ≈ 0.9625. Einseitiger p-Wert: 1 − 0.9625 = 0.0375. Zweiseitiger p-Wert: 2 × 0.0375 = 0.0750. Interpretation: Bei α = 0.10 wird H0 verworfen, nicht bei α = 0.05.'
        },
        {
          id: 'stat-t5-06',
          number: 6,
          points: 2,
          text: 'Zwei unabhängige Stichproben sollen hinsichtlich ihrer Mittelwerte verglichen werden. Stichprobe 1: n1=101, x̄1=52800km, s1=4000km. Stichprobe 2: n2=46, x̄2=51500km, s2=3000km. Die Varianzen sind unbekannt, aber n1, n2 > 30. Welcher Test ist anzuwenden?',
          choices: [
            { key: 'A', text: 'Gepoolter t-Test (Pooled Variance t-Test), da gleiche Varianzen angenommen werden' },
            { key: 'B', text: 'Gepaarter t-Test, da Stichproben abhängig sind' },
            { key: 'C', text: 'z-Test mit σ bekannt' },
            { key: 'D', text: 'z-Test als Approximation, da n > 30 (Approximation der t-Verteilung durch Normalverteilung)' },
            { key: 'E', text: 'χ²-Test, da Varianzen unbekannt sind' }
          ],
          correct: ['D'],
          explanation: 'Da beide Stichproben > 30 sind, kann die t-Verteilung durch eine Normalverteilung approximiert werden (z-Test). Die Testgrösse ist z = (x̄1 − x̄2) / SE mit SE = √(s1²/n1 + s2²/n2). Bei n1 = 101 und n2 = 46 gilt n > 30 für beide Gruppen.'
        },
        {
          id: 'stat-t5-07',
          number: 7,
          points: 2,
          text: 'Für den Vergleich zweier Vermögensverwalter (Aufgabe 5, Übungsblatt 5): Welcher Test ist zu wählen, wenn ein F-Test auf Varianzgleichheit die H0: σ1² = σ2² verworfen hat?',
          choices: [
            { key: 'A', text: 'Pooled Variance t-Test (gleiche Varianzen)' },
            { key: 'B', text: 'Gepaarter t-Test (verbundene Stichproben)' },
            { key: 'C', text: 'Welch\'s t-Test (ungleiche Varianzen)' },
            { key: 'D', text: 'z-Test (da n > 30)' },
            { key: 'E', text: 'Mann-Whitney U-Test (nichtparametrisch)' }
          ],
          correct: ['C'],
          explanation: 'Wenn der F-Test die H0 gleicher Varianzen verwirft, sind unterschiedliche Varianzen anzunehmen. In diesem Fall ist Welch\'s t-Test ("Fall 2a") zu verwenden, der mit einer Welch-Korrektur der Freiheitsgrade arbeitet. Der Pooled Variance t-Test ist nicht robust gegen Varianzinhomogenität.'
        },
        {
          id: 'stat-t5-08',
          number: 8,
          points: 2,
          text: 'An der HSG (n1=900, p1=0.61) und Uni Bern (n2=1200, p2=0.56) wurde die Unterstützung für bargeldlose Mensazahlung befragt. Testet man H0: π1=π2 gegen H1: π1≠π2 (α=0.05), ergibt sich p̄ = 0.58 und z ≈ −2.30. Was ist das Ergebnis?',
          choices: [
            { key: 'A', text: '|z| = 2.30 < 1.96 → H0 nicht verwerfen (kein signifikanter Unterschied)' },
            { key: 'B', text: '|z| = 2.30 > 1.96 → H0 verwerfen (signifikanter Unterschied bei α = 0.05)' },
            { key: 'C', text: '|z| = 2.30 > 2.58 → H0 verwerfen (signifikanter Unterschied bei α = 0.01)' },
            { key: 'D', text: 'p-Wert = 0.05 → H0 gerade verwerfen bei α = 0.05' },
            { key: 'E', text: 'Kein Test möglich, da Anteilswerte verglichen werden' }
          ],
          correct: ['B'],
          explanation: 'z = (p1 − p2) / √(p̄(1−p̄)(1/n1+1/n2)) = (0.61−0.56)/√(0.58·0.42·(1/900+1/1200)) ≈ −2.297. Da |z| = 2.30 > 1.96 = z_{0.975}, wird H0 auf α = 0.05 verworfen. Es besteht ein signifikanter Unterschied zwischen HSG und Bern.'
        },
        {
          id: 'stat-t5-09',
          number: 9,
          points: 2,
          text: 'Eine Qualitätsprüfung ergibt: 32/700 Mobiltelefone und 30/400 Tablets sind defekt. Der p-Wert des Tests H0: πM − πT = 0 beträgt ca. 0.058. Was kann geschlussfolgert werden?',
          choices: [
            { key: 'A', text: 'Auf α = 0.01 wird H0 verworfen.' },
            { key: 'B', text: 'Auf α = 0.05 wird H0 verworfen.' },
            { key: 'C', text: 'Auf α = 0.10 wird H0 verworfen; auf α = 0.05 nicht.' },
            { key: 'D', text: 'H0 kann auf keinem üblichen Niveau verworfen werden.' },
            { key: 'E', text: 'Der p-Wert von 0.058 bedeutet, dass die Defektrate genau 5.8% beträgt.' }
          ],
          correct: ['C'],
          explanation: 'p-Wert = 0.058. Da p-Wert < 0.10, wird H0 auf dem 10%-Niveau verworfen. Da p-Wert > 0.05, kann H0 auf dem 5%-Niveau nicht verworfen werden. Der p-Wert gibt die Wahrscheinlichkeit an, unter H0 eine mindestens so extreme Teststatistik zu beobachten.'
        },
        {
          id: 'stat-t5-10',
          number: 10,
          points: 2,
          text: 'Was beschreibt der Fehler 2. Art (β-Fehler) bei einem Hypothesentest?',
          choices: [
            { key: 'A', text: 'Die Wahrscheinlichkeit, H0 zu verwerfen, obwohl H0 wahr ist.' },
            { key: 'B', text: 'Die Wahrscheinlichkeit, H0 nicht zu verwerfen, obwohl H0 falsch ist.' },
            { key: 'C', text: 'Die Wahrscheinlichkeit, H1 anzunehmen, obwohl H1 wahr ist.' },
            { key: 'D', text: 'Die Signifikanzniveauwahrscheinlichkeit α.' },
            { key: 'E', text: 'Die Teststärke (Power) des Tests.' }
          ],
          correct: ['B'],
          explanation: 'Fehler 1. Art (α-Fehler): H0 verwerfen, obwohl H0 wahr ist. Fehler 2. Art (β-Fehler): H0 NICHT verwerfen, obwohl H0 falsch ist (d.h. H1 gilt). Die Teststärke (Power) = 1 − β gibt an, mit welcher Wahrscheinlichkeit H0 korrekt verworfen wird.'
        }
      ]
    }
  ]
};
