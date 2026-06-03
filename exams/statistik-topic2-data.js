window.EXAM_DATA_STATISTIK_TOPIC2 = {
  id: 'statistik-topic2',
  title: 'Statistik — Topic Quiz 2: Wahrscheinlichkeitsrechnung',
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
      title: 'Wahrscheinlichkeitsrechnung',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-t2-01',
          number: 1,
          points: 2,
          text: 'Ein Kraftfahrzeughändler weiss: 50% der Wagen haben Motorschäden (M), 70% haben Karosserieschäden (K), und 30% haben beide Schäden. Wie gross ist die Wahrscheinlichkeit, dass ein Wagen weder Motor- noch Karosserieschäden aufweist?',
          choices: [
            { key: 'A', text: 'P(M̄ ∩ K̄) = 0.20' },
            { key: 'B', text: 'P(M̄ ∩ K̄) = 0.10' },
            { key: 'C', text: 'P(M̄ ∩ K̄) = 0.30' },
            { key: 'D', text: 'P(M̄ ∩ K̄) = 0.15' },
            { key: 'E', text: 'P(M̄ ∩ K̄) = 0.05' }
          ],
          correct: ['B'],
          explanation: 'Additionssatz: P(M ∪ K) = P(M) + P(K) − P(M ∩ K) = 0.5 + 0.7 − 0.3 = 0.9. Gegenwahrscheinlichkeit: P(M̄ ∩ K̄) = 1 − P(M ∪ K) = 1 − 0.9 = 0.10.'
        },
        {
          id: 'stat-t2-02',
          number: 2,
          points: 2,
          text: 'Für denselben Händler (M: 50%, K: 70%, M∩K: 30%): Wie gross ist die Wahrscheinlichkeit, dass ein Wagen auch einen Motorschaden hat, wenn bekannt ist, dass er einen Karosserieschaden hat?',
          choices: [
            { key: 'A', text: 'P(M|K) = 0.50' },
            { key: 'B', text: 'P(M|K) = 0.43' },
            { key: 'C', text: 'P(M|K) = 0.60' },
            { key: 'D', text: 'P(M|K) = 0.30' },
            { key: 'E', text: 'P(M|K) = 0.21' }
          ],
          correct: ['B'],
          explanation: 'Bedingte Wahrscheinlichkeit: P(M|K) = P(M ∩ K) / P(K) = 0.30 / 0.70 = 0.4286 ≈ 0.43.'
        },
        {
          id: 'stat-t2-03',
          number: 3,
          points: 2,
          text: 'Ein Koch bereitet 70% der Gerichte zu, eine Küchenhilfe 30%. Der Koch spuckt mit 8% auf ein Gericht, die Küchenhilfe mit 6%. Ein angespucktes Gericht wird zufällig entdeckt. Mit welcher Wahrscheinlichkeit stammt es vom Koch (Satz von Bayes; auf zwei Nachkommastellen)?',
          choices: [
            { key: 'A', text: '0.56' },
            { key: 'B', text: '0.70' },
            { key: 'C', text: '0.76' },
            { key: 'D', text: '0.84' },
            { key: 'E', text: '0.91' }
          ],
          correct: ['C'],
          explanation: 'Bayes: P(K|S) = P(S|K)·P(K) / [P(S|K)·P(K) + P(S|KH)·P(KH)] = (0.08·0.7) / (0.08·0.7 + 0.06·0.3) = 0.056 / (0.056 + 0.018) = 0.056 / 0.074 ≈ 0.76.'
        },
        {
          id: 'stat-t2-04',
          number: 4,
          points: 2,
          text: 'In einer Befragung hatten 90.3% der über 25-jährigen Arbeitnehmer einen Highschool-Abschluss (H). 30.8% hatten insgesamt einen College-Abschluss (C), wobei C einen Highschool-Abschluss voraussetzt. Wie gross ist P(C|H)?',
          choices: [
            { key: 'A', text: 'P(C|H) = 0.308' },
            { key: 'B', text: 'P(C|H) = 0.341' },
            { key: 'C', text: 'P(C|H) = 0.278' },
            { key: 'D', text: 'P(C|H) = 0.903' },
            { key: 'E', text: 'P(C|H) = 0.595' }
          ],
          correct: ['B'],
          explanation: 'Da C einen H-Abschluss voraussetzt, gilt P(C ∩ H) = P(C) = 0.308. Also: P(C|H) = P(C ∩ H) / P(H) = 0.308 / 0.903 = 0.341.'
        },
        {
          id: 'stat-t2-05',
          number: 5,
          points: 2,
          text: 'In einer Lostrommel mit 2000 Losen befinden sich 10 erste Gewinne (I) und 80 zweite Gewinne (II). Wie gross ist die Wahrscheinlichkeit, einen ersten ODER zweiten Gewinn zu ziehen?',
          choices: [
            { key: 'A', text: '0.005' },
            { key: 'B', text: '0.040' },
            { key: 'C', text: '0.045' },
            { key: 'D', text: '0.050' },
            { key: 'E', text: '0.090' }
          ],
          correct: ['C'],
          explanation: 'P(I) = 10/2000 = 0.005; P(II) = 80/2000 = 0.04. Da I und II sich gegenseitig ausschliessen (P(I∩II)=0): P(I∪II) = 0.005 + 0.04 = 0.045.'
        },
        {
          id: 'stat-t2-06',
          number: 6,
          points: 2,
          text: 'In einer Urne befinden sich 20 rote und 30 grüne Kugeln. 5 rote und 10 grüne Kugeln sind mit einem * markiert. Wie gross ist P(rot ODER markiert)?',
          choices: [
            { key: 'A', text: '0.50' },
            { key: 'B', text: '0.60' },
            { key: 'C', text: '0.55' },
            { key: 'D', text: '0.45' },
            { key: 'E', text: '0.70' }
          ],
          correct: ['B'],
          explanation: 'P(R) = 20/50 = 0.4; P(*) = 15/50 = 0.3; P(R ∩ *) = 5/50 = 0.1. Additionssatz: P(R ∪ *) = 0.4 + 0.3 − 0.1 = 0.6.'
        },
        {
          id: 'stat-t2-07',
          number: 7,
          points: 2,
          text: 'Ein elektronisches Schloss verwendet eine vierstellige Geheimzahl aus den Ziffern 0–9, wobei jede Ziffer beliebig oft vorkommen darf. Wie viele mögliche Kombinationen gibt es?',
          choices: [
            { key: 'A', text: '5040 (geordnete Auswahl ohne Zurücklegen)' },
            { key: 'B', text: '210 (Kombinationen ohne Zurücklegen)' },
            { key: 'C', text: '10000 (geordnete Auswahl mit Zurücklegen)' },
            { key: 'D', text: '1000 (nur Ziffern 1–9)' },
            { key: 'E', text: '720 (Permutationen von 6 Ziffern)' }
          ],
          correct: ['C'],
          explanation: 'Mit Zurücklegen, Reihenfolge relevant: n^r = 10^4 = 10000. Ohne Zurücklegen wäre es: 10!/(10-4)! = 5040.'
        },
        {
          id: 'stat-t2-08',
          number: 8,
          points: 2,
          text: 'Ein Aussendienstmitarbeiter muss 12 Kunden besuchen, hat aber nur Zeit für 8 Termine. Wie viele verschiedene Kombinationen sind möglich (Reihenfolge irrelevant)?',
          choices: [
            { key: 'A', text: '19958400' },
            { key: 'B', text: '95040' },
            { key: 'C', text: '495' },
            { key: 'D', text: '792' },
            { key: 'E', text: '66' }
          ],
          correct: ['C'],
          explanation: 'Kombinationen ohne Zurücklegen (Reihenfolge irrelevant): C(12,8) = 12! / (8! × 4!) = (12 × 11 × 10 × 9) / (4 × 3 × 2 × 1) = 11880/24 = 495.'
        },
        {
          id: 'stat-t2-09',
          number: 9,
          points: 2,
          text: 'Welche der folgenden Aussagen zu den Kolmogorov-Axiomen der Wahrscheinlichkeit ist FALSCH?',
          choices: [
            { key: 'A', text: 'Für jedes Ereignis A gilt: P(A) ≥ 0.' },
            { key: 'B', text: 'Für das sichere Ereignis gilt: P(Ω) = 1.' },
            { key: 'C', text: 'Für sich gegenseitig ausschliessende Ereignisse A und B gilt: P(A ∪ B) = P(A) + P(B).' },
            { key: 'D', text: 'Für ein beliebiges Ereignis A gilt: P(A) + P(Ā) = 0.' },
            { key: 'E', text: 'Für das unmögliche Ereignis gilt: P(∅) = 0.' }
          ],
          correct: ['D'],
          explanation: 'D ist falsch. Der korrekte Satz lautet: P(A) + P(Ā) = 1 (Komplementärereignis). P(A) + P(Ā) = 0 würde bedeuten, dass beide Wahrscheinlichkeiten 0 sind, was der Axiomatik widerspricht.'
        },
        {
          id: 'stat-t2-10',
          number: 10,
          points: 2,
          text: 'Zwei Ereignisse A und B sind stochastisch unabhängig, wenn gilt:',
          choices: [
            { key: 'A', text: 'P(A|B) = P(B)' },
            { key: 'B', text: 'P(A ∩ B) = P(A) + P(B)' },
            { key: 'C', text: 'P(A ∩ B) = P(A) · P(B)' },
            { key: 'D', text: 'P(A ∪ B) = P(A) · P(B)' },
            { key: 'E', text: 'P(A|B) = 1 − P(B|A)' }
          ],
          correct: ['C'],
          explanation: 'Stochastische Unabhängigkeit: P(A ∩ B) = P(A) · P(B). Äquivalent: P(A|B) = P(A) und P(B|A) = P(B). Option A ist falsch (P(A|B) = P(A) wäre korrekt). Option B ist der Additionssatz für disjunkte Ereignisse.'
        }
      ]
    }
  ]
};
