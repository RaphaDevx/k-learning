window.EXAM_DATA_STATISTIK_TOPIC1 = {
  id: 'statistik-topic1',
  title: 'Statistik — Topic Quiz 1: Deskriptive Statistik',
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
      title: 'Deskriptive Statistik',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-t1-01',
          number: 1,
          points: 2,
          text: 'Ein Blog-Betreiber hat in den letzten 7 Tagen folgende Besucherzahlen: 17, 18, 19, 19, 21, 22, 25. Wie gross sind Mittelwert, Median und Modus?',
          choices: [
            { key: 'A', text: 'Mittelwert = 20.14, Median = 19, Modus = 19' },
            { key: 'B', text: 'Mittelwert = 20.14, Median = 21, Modus = 17' },
            { key: 'C', text: 'Mittelwert = 19.00, Median = 19, Modus = 19' },
            { key: 'D', text: 'Mittelwert = 20.14, Median = 19, Modus = 21' },
            { key: 'E', text: 'Mittelwert = 21.00, Median = 21, Modus = 19' }
          ],
          correct: ['A'],
          explanation: 'Mittelwert: (17+18+19+19+21+22+25)/7 = 141/7 = 20.14. Median: n=7 (ungerade), Position (n+1)/2 = 4 → x[4] = 19. Modus: 19 kommt zweimal vor → Modus = 19.'
        },
        {
          id: 'stat-t1-02',
          number: 2,
          points: 2,
          text: 'Für den Datensatz 17, 18, 19, 19, 21, 22, 25 beträgt die Stichprobenvarianz (auf zwei Nachkommastellen gerundet):',
          choices: [
            { key: 'A', text: '5.92' },
            { key: 'B', text: '6.43' },
            { key: 'C', text: '7.48' },
            { key: 'D', text: '8.00' },
            { key: 'E', text: '7.75' }
          ],
          correct: ['C'],
          explanation: 'Mittelwert = 20.14. Summe der quadratischen Abweichungen: (17−20.14)² + ... + (25−20.14)² = 44.857. Stichprobenvarianz s² = 44.857/(n−1) = 44.857/6 = 7.48.'
        },
        {
          id: 'stat-t1-03',
          number: 3,
          points: 2,
          text: 'In einer Stadt gibt es 2567 Tausend Haushalte: 457 mit 1 Person, 628 mit 2, 612 mit 3, 526 mit 4, 344 mit ≥5 Personen. Wie gross ist der Anteil der Haushalte mit 3 oder weniger Personen (gerundet auf eine Nachkommastelle)?',
          choices: [
            { key: 'A', text: '52.2%' },
            { key: 'B', text: '61.5%' },
            { key: 'C', text: '66.1%' },
            { key: 'D', text: '72.3%' },
            { key: 'E', text: '42.3%' }
          ],
          correct: ['C'],
          explanation: 'Haushalte mit ≤3 Personen: 457 + 628 + 612 = 1697. Anteil: 1697 / 2567 = 0.661 = 66.1%. F(3) = 0.178 + 0.245 + 0.238 = 0.661.'
        },
        {
          id: 'stat-t1-04',
          number: 4,
          points: 2,
          text: 'Die Bevölkerung einer Gemeinde wächst von 2013 bis 2017: 20000, 32000, 41600, 44387, 48826. Welches Mittel ist zur Berechnung der durchschnittlichen Wachstumsrate korrekt?',
          choices: [
            { key: 'A', text: 'Arithmetisches Mittel der jährlichen Wachstumsraten' },
            { key: 'B', text: 'Geometrisches Mittel der Wachstumsfaktoren' },
            { key: 'C', text: 'Harmonisches Mittel der Wachstumsfaktoren' },
            { key: 'D', text: 'Arithmetisches Mittel der Bevölkerungszahlen' },
            { key: 'E', text: 'Median der Wachstumsraten' }
          ],
          correct: ['B'],
          explanation: 'Bei zeitlich aufeinander folgenden Wachstumsraten ist das geometrische Mittel der korrekte Durchschnittswert. G = ⁴√(1.6 × 1.3 × 1.067 × 1.1) = 1.2499, also ca. 25% p.a.'
        },
        {
          id: 'stat-t1-05',
          number: 5,
          points: 2,
          text: 'Für einen Datensatz mit n=50 Monatseinkommen ergibt sich Q1 = 2505.75 und Q3 = 2980.75. Welche Aussage über den Interquartilsabstand (IQR) ist korrekt?',
          choices: [
            { key: 'A', text: 'IQR = 475; er umfasst die mittleren 50% der Daten.' },
            { key: 'B', text: 'IQR = 237.5; er umfasst die mittleren 25% der Daten.' },
            { key: 'C', text: 'IQR = 475; er umfasst alle Daten ohne Ausreisser.' },
            { key: 'D', text: 'IQR = 950; er entspricht der doppelten Spannweite der mittleren Hälfte.' },
            { key: 'E', text: 'IQR = 475; er ist nur für normalverteilte Daten definiert.' }
          ],
          correct: ['A'],
          explanation: 'IQR = Q3 − Q1 = 2980.75 − 2505.75 = 475. Der IQR umfasst per Definition die mittleren 50% aller Beobachtungen und ist robust gegenüber Ausreissern.'
        },
        {
          id: 'stat-t1-06',
          number: 6,
          points: 2,
          text: 'Welches Skalenniveau besitzen die Variable "Schulnote (1–6)" und die Variable "Körpergrösse (in cm)"?',
          choices: [
            { key: 'A', text: 'Schulnote: nominal; Körpergrösse: ordinal' },
            { key: 'B', text: 'Schulnote: ordinal; Körpergrösse: metrisch (verhältnisskaliert)' },
            { key: 'C', text: 'Schulnote: metrisch; Körpergrösse: metrisch' },
            { key: 'D', text: 'Schulnote: ordinal; Körpergrösse: ordinal' },
            { key: 'E', text: 'Schulnote: nominal; Körpergrösse: metrisch' }
          ],
          correct: ['B'],
          explanation: 'Schulnoten sind ordinalskaliert: eine Rangordnung ist möglich (1 < 2 < ... < 6), aber ein Abstandsvergleich (z.B. "Unterschied zwischen 1 und 2 = Unterschied zwischen 5 und 6") ist nicht sinnvoll. Körpergrösse in cm ist verhältnisskaliert (metrisch), da ein absoluter Nullpunkt existiert.'
        },
        {
          id: 'stat-t1-07',
          number: 7,
          points: 2,
          text: 'Ein Boxplot zeigt: Minimum = 0, Q1 = 3, Median = 4, Q3 = 9, Maximum = 12. Welche der folgenden 15-elementigen Datensätze passt genau zu diesem Boxplot?',
          choices: [
            { key: 'A', text: '0,0,1,2,3,3,4,4,5,6,8,10,10,11,12' },
            { key: 'B', text: '0,1,2,3,4,4,4,4,5,5,8,9,11,12,12' },
            { key: 'C', text: '-1,0,1,2,3,3,4,4,5,7,8,9,10,12,13' },
            { key: 'D', text: '0,1,2,3,3,3,4,5,6,7,8,9,11,12,12' },
            { key: 'E', text: '0,1,2,2,3,3,4,5,7,8,9,9,10,11,12' }
          ],
          correct: ['B'],
          explanation: 'Variable B: Min=0, Max=12 ✓. Median = x[8] = 4 ✓. Q1 = x[(n+1)/4] = x[4] = 3 ✓. Q3 = x[3(n+1)/4] = x[12] = 9 ✓. Alle vier Kennzahlen passen.'
        },
        {
          id: 'stat-t1-08',
          number: 8,
          points: 2,
          text: 'Der Variationskoeffizient (VC) ist definiert als sx / |x̄|. Was trifft auf den VC zu?',
          choices: [
            { key: 'A', text: 'Er hat dieselbe Einheit wie die Ausgangsvariable.' },
            { key: 'B', text: 'Er ist ein relatives, einheitenloses Streuungsmass.' },
            { key: 'C', text: 'Er kann nur für intervallskalierte Daten berechnet werden.' },
            { key: 'D', text: 'Er ist gleich der Varianz dividiert durch den Mittelwert.' },
            { key: 'E', text: 'Ein VC > 1 ist per Definition nicht möglich.' }
          ],
          correct: ['B'],
          explanation: 'Der VC = sx / |x̄| ist einheitenlos (Standardabweichung / Mittelwert = gleiche Einheit / gleiche Einheit). Er ist ein relatives Streuungsmass und erlaubt den Vergleich der Streuung verschiedener Datensätze mit unterschiedlichen Skalen oder Einheiten.'
        },
        {
          id: 'stat-t1-09',
          number: 9,
          points: 2,
          text: 'Ein HSG-Student hat wöchentliche Ausgaben von 250 CHF im 1. Semester und 600 CHF im 3. Semester. Wie hoch war die durchschnittliche Ausgabensteigerung pro Semester (auf ganze Prozent gerundet)?',
          choices: [
            { key: 'A', text: '58% pro Semester' },
            { key: 'B', text: '34% pro Semester' },
            { key: 'C', text: '42% pro Semester' },
            { key: 'D', text: '175% Gesamtsteigerung, kein Durchschnitt sinnvoll' },
            { key: 'E', text: '58% Gesamtsteigerung' }
          ],
          correct: ['B'],
          explanation: 'Geometrisches Mittel über n=2 Semester: G = ³√(600/250) = ³√2.4 = 1.34. Durchschnittliche Steigerung von 34% pro Semester. (Achtung: 2 Wachstumsperioden zwischen Semester 1 und Semester 3, also n=2 Perioden.)'
        },
        {
          id: 'stat-t1-10',
          number: 10,
          points: 2,
          text: 'Welche der folgenden Aussagen über ein Histogramm ist FALSCH?',
          choices: [
            { key: 'A', text: 'Die Fläche aller Balken zusammen ergibt 1 (bei relativen Häufigkeiten).' },
            { key: 'B', text: 'Bei gleicher Klassenbreite ist die Balkenhöhe proportional zur relativen Häufigkeit.' },
            { key: 'C', text: 'Ein Histogramm wird ausschliesslich für stetige Merkmale verwendet.' },
            { key: 'D', text: 'Die Balkenfläche (nicht Höhe) repräsentiert die relative Häufigkeit der Klasse.' },
            { key: 'E', text: 'Bei ungleichen Klassenbreiten muss die Häufigkeitsdichte (relative Häufigkeit / Klassenbreite) auf der y-Achse abgetragen werden.' }
          ],
          correct: ['C'],
          explanation: 'C ist falsch: Histogramme können auch für diskrete Merkmale mit vielen Ausprägungen oder für klassierte stetige Daten verwendet werden. Die Aussage, dass sie ausschliesslich für stetige Merkmale gelten, ist zu restriktiv.'
        }
      ]
    }
  ]
};
