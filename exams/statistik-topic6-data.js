window.EXAM_DATA_STATISTIK_TOPIC6 = {
  id: 'statistik-topic6',
  title: 'Statistik — Topic Quiz 6: ANOVA & Regression',
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
      title: 'ANOVA & Regression',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-t6-01',
          number: 1,
          points: 2,
          text: 'Für eine einfaktorielle ANOVA mit k=3 Gruppen und n=18 Beobachtungen (je 6 pro Gruppe): SSTR=108.04, SSE=216.58. Wie gross ist die F-Testgrösse?',
          choices: [
            { key: 'A', text: 'F = 54.02 / 14.44 = 3.74' },
            { key: 'B', text: 'F = 108.04 / 216.58 = 0.499' },
            { key: 'C', text: 'F = 36.01 / 14.44 = 2.49' },
            { key: 'D', text: 'F = 54.02 / 216.58 = 0.25' },
            { key: 'E', text: 'F = 108.04 / 14.44 = 7.48' }
          ],
          correct: ['A'],
          explanation: 'MSTR = SSTR/(k−1) = 108.04/2 = 54.02. MSE = SSE/(n−k) = 216.58/15 = 14.44. F = MSTR/MSE = 54.02/14.44 = 3.74. Der kritische Wert F(0.05; 2, 15) = 3.68, also wird H0 knapp verworfen.'
        },
        {
          id: 'stat-t6-02',
          number: 2,
          points: 2,
          text: 'Ein Pharmatest untersucht 3 Dosierungen (je n=4 Personen). SSTR=2.06, SSE=2.35. F-Testgrösse und Ergebnis bei F(0.05; 2, 9)=4.26?',
          choices: [
            { key: 'A', text: 'F = 3.95 < 4.26 → H0 nicht verwerfen (kein signifikanter Dosierungseffekt)' },
            { key: 'B', text: 'F = 3.95 > 3.55 → H0 verwerfen (signifikanter Effekt auf α=0.10)' },
            { key: 'C', text: 'F = 7.86 > 4.26 → H0 verwerfen (signifikanter Dosierungseffekt)' },
            { key: 'D', text: 'F = 3.95 > 4.26 → H0 verwerfen' },
            { key: 'E', text: 'F = 1.97 < 4.26 → H0 nicht verwerfen' }
          ],
          correct: ['A'],
          explanation: 'MSTR = 2.06/(3−1) = 1.03. MSE = 2.35/(12−3) = 0.261. F = 1.03/0.261 = 3.95. Da F = 3.95 < F(0.05; 2, 9) = 4.26, kann H0 nicht verworfen werden. Kein signifikanter Dosierungseffekt nachgewiesen.'
        },
        {
          id: 'stat-t6-03',
          number: 3,
          points: 2,
          text: 'Im selben Pharmatest werden nachträglich Virenstämme als Blockfaktor berücksichtigt (Randomized Block Design). SSB=1.95, SST=4.41, SSTR=2.06. Wie lautet F* für die Dosierung (F(0.05; 2, 6)=5.14)?',
          choices: [
            { key: 'A', text: 'F* = 3.95 < 5.14 → H0 nicht verworfen' },
            { key: 'B', text: 'F* = 15.45 > 5.14 → H0 verworfen (Dosierung signifikant)' },
            { key: 'C', text: 'F* = 7.73 > 5.14 → H0 verworfen' },
            { key: 'D', text: 'F* = 20.60 > 5.14 → H0 verworfen' },
            { key: 'E', text: 'F* = 9.75 > 5.14 → H0 verworfen' }
          ],
          correct: ['B'],
          explanation: 'SSE* = SST − SSTR − SSB = 4.41 − 2.06 − 1.95 = 0.40. F* = [SSTR/(t−1)] / [SSE*/((t−1)(b−1))] = [2.06/2] / [0.40/(2·3)] = 1.03 / 0.0667 = 15.45. Da F* = 15.45 > F(0.05; 2, 6) = 5.14, wird H0 verworfen. Nach Berücksichtigung des Virusstamms ist der Dosierungseffekt signifikant.'
        },
        {
          id: 'stat-t6-04',
          number: 4,
          points: 2,
          text: 'Falls bei einer Varianzanalyse die wahren Mittelwerte aller k Gruppen gleich sind (H0 gilt), sollte die F-Testgrösse MSTR/MSE...',
          choices: [
            { key: 'A', text: '...grösser als k sein.' },
            { key: 'B', text: '...gleich 0.0 sein.' },
            { key: 'C', text: '...ungefähr gleich 1.0 sein.' },
            { key: 'D', text: '...kleiner als 0.5 sein.' },
            { key: 'E', text: '...genau dem kritischen F-Wert entsprechen.' }
          ],
          correct: ['C'],
          explanation: 'Unter H0 (alle Gruppenmittelwerte gleich) gilt E(MSTR) = E(MSE) = σ², daher E(F) = E(MSTR/MSE) ≈ 1.0. Wenn sich Mittelwerte unterscheiden (H0 falsch), ist E(MSTR) > σ² und F > 1.'
        },
        {
          id: 'stat-t6-05',
          number: 5,
          points: 2,
          text: 'Bei OLS (Methode der kleinsten Quadrate) in der simplen linearen Regression: Welche Grösse wird minimiert?',
          choices: [
            { key: 'A', text: 'Die totale Quadratsumme SST = Σ(yi − ȳ)²' },
            { key: 'B', text: 'Die erklärte Quadratsumme SSR = Σ(ŷi − ȳ)²' },
            { key: 'C', text: 'Die Residuenquadratsumme SSE = Σ(yi − ŷi)²' },
            { key: 'D', text: 'Das Bestimmtheitsmass R²' },
            { key: 'E', text: 'Die Summe der Residuen Σ(yi − ŷi)' }
          ],
          correct: ['C'],
          explanation: 'OLS (Ordinary Least Squares) minimiert die Residuenquadratsumme SSE = Σ(yi − ŷi)². Die Summe der Residuen Σeᵢ = 0 ist eine Konsequenz (nicht das Ziel), und SST = SSR + SSE ist per Definition konstant für gegebene y-Werte.'
        },
        {
          id: 'stat-t6-06',
          number: 6,
          points: 2,
          text: 'Ein Geologe schätzt: Eruption_i = β₁ + β₂·Waiting_i + e_i. Ergebnis: β̂₁ = −1.874, β̂₂ = 0.0756, adj. R² = 0.8108. Wie lange dauert der nächste Ausbruch im Durchschnitt nach 150 Minuten Wartezeit?',
          choices: [
            { key: 'A', text: 'ŷ = −1.874 + 0.0756 × 150 = 9.47 Minuten' },
            { key: 'B', text: 'ŷ = 0.0756 × 150 = 11.34 Minuten' },
            { key: 'C', text: 'ŷ = −1.874 × 150 = −281.1 Minuten' },
            { key: 'D', text: 'ŷ = 150 − 1.874 = 148.13 Minuten' },
            { key: 'E', text: 'ŷ = (−1.874 + 150) × 0.0756 = 11.19 Minuten' }
          ],
          correct: ['A'],
          explanation: 'Einsetzen in die Regressionsgleichung: ŷ = β̂₁ + β̂₂·x = −1.874016 + 0.075628 × 150 = −1.874 + 11.344 = 9.470 Minuten. Das adj. R² = 0.8108 bedeutet, dass ca. 81% der Variation der Ausbruchsdauer durch die Wartezeit erklärt wird.'
        },
        {
          id: 'stat-t6-07',
          number: 7,
          points: 2,
          text: 'Für eine multiple Regression gilt: SSR = 292\'000 und SSE = 308\'000. Wie gross ist das Bestimmtheitsmass R²?',
          choices: [
            { key: 'A', text: 'R² = 0.513' },
            { key: 'B', text: 'R² = 0.948' },
            { key: 'C', text: 'R² = 0.487' },
            { key: 'D', text: 'R² = 0.308' },
            { key: 'E', text: 'R² kann ohne Angabe von n nicht berechnet werden.' }
          ],
          correct: ['C'],
          explanation: 'SST = SSR + SSE = 292\'000 + 308\'000 = 600\'000. R² = SSR/SST = 292\'000/600\'000 = 0.4867 ≈ 0.487. R² gibt an, welcher Anteil der Gesamtvariation durch das Modell erklärt wird.'
        },
        {
          id: 'stat-t6-08',
          number: 8,
          points: 2,
          text: 'In einem multiplen Regressionsmodell Pizza_i = β₁ + β₂·INCOME_i + β₃·AGE_i + δ₁·FEMALE_i + δ₂·MALE_i + e_i gilt FEMALE_i + MALE_i = 1. Was ist das Problem?',
          choices: [
            { key: 'A', text: 'Keine Freiheitsgrade vorhanden' },
            { key: 'B', text: 'Dummy Variable Trap: perfekte Multikollinearität mit der Konstanten β₁' },
            { key: 'C', text: 'AGE_i und INCOME_i können nicht im selben Modell sein' },
            { key: 'D', text: 'Das Modell hat zu viele Regressoren' },
            { key: 'E', text: 'δ₁ und δ₂ können nicht gleichzeitig signifikant sein' }
          ],
          correct: ['B'],
          explanation: 'Dummy Variable Trap: Da FEMALE + MALE = 1 = Konstante, besteht perfekte Multikollinearität zwischen den Dummy-Variablen und der Konstanten. Das Modell ist nicht identifizierbar. Lösung: entweder Konstante oder eine Dummy-Variable weglassen (z.B. nur FEMALE beibehalten).'
        },
        {
          id: 'stat-t6-09',
          number: 9,
          points: 2,
          text: 'Ein Botaniker schätzt: Mais_i = β₁ + β₂·TEMP_i + δ₁·SONNE_i + δ₂·(TEMP_i × SONNE_i) + e_i. Er will prüfen, ob der Steigungskoeffizient bei TEMP für sonnige Tage verschieden ist von dem für nicht-sonnige Tage. Wie lautet die Nullhypothese?',
          choices: [
            { key: 'A', text: 'H0: β₁ = β₂ = δ₁ = δ₂ = 0' },
            { key: 'B', text: 'H0: β₂ = 0' },
            { key: 'C', text: 'H0: δ₂ = 0' },
            { key: 'D', text: 'H0: δ₂ = β₂ = 0' },
            { key: 'E', text: 'H0: δ₁ = 0' }
          ],
          correct: ['C'],
          explanation: 'Der Interaktionsterm δ₂·(TEMP × SONNE) misst den zusätzlichen Effekt der Temperatur an sonnigen Tagen. An nicht-sonnigen Tagen (SONNE=0) ist die Steigung β₂. An sonnigen Tagen (SONNE=1) ist sie β₂ + δ₂. Der Unterschied zwischen beiden Steigungen ist δ₂. Daher: H0: δ₂ = 0 (kein Unterschied).'
        },
        {
          id: 'stat-t6-10',
          number: 10,
          points: 2,
          text: 'Welche der folgenden Gauss-Markov-Annahmen für den Fehlerterm e_i in y_i = β₁ + β₂x_i + e_i ist FALSCH?',
          choices: [
            { key: 'A', text: 'E[e_i | x_i] = 0' },
            { key: 'B', text: 'Var(e_i) = σ² (Homoskedastizität, konstant für alle x_i)' },
            { key: 'C', text: 'e₁, e₂, …, e_n sind voneinander unabhängig' },
            { key: 'D', text: 'e_i ist normalverteilt' },
            { key: 'E', text: 'E[e_i | x_i] = β₁ + β₂x_i' }
          ],
          correct: ['E'],
          explanation: 'E ist falsch: Der Erwartungswert des Fehlerterms ist E[e_i | x_i] = 0 (nicht β₁ + β₂x_i). Der Erwartungswert des bedingten y_i ist E[y_i | x_i] = β₁ + β₂x_i, aber e_i = y_i − E[y_i | x_i] hat per Definition Erwartungswert 0. A–D sind korrekte Gauss-Markov-Annahmen.'
        }
      ]
    }
  ]
};
