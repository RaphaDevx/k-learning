window.EXAM_DATA_STATISTIK_PK2 = {
  id: 'statistik-pk2',
  title: 'Statistik — Probeklausur 2',
  course: 'Statistik',
  courseColor: '#2563eb',
  duration_minutes: 90,
  total_points: 90,
  exam_info: {
    date: '01.07.2026',
    duration: '90 Minuten',
    format: 'Single Choice (Teil I) + Multiple Choice (Teil II)',
    allowed_aids: 'Formelsammlung (wird ausgeteilt)',
    grading: 'Note 6.0: ≥85%, Note 5.5: ≥75%, Note 5.0: ≥65%, Note 4.5: ≥55%, Note 4.0: ≥45%, Note 3.5: ≥35%, Note 3.0: ≥25%'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'teil1',
      title: 'Teil I: Single Choice Fragen',
      description: 'Pro Frage ist genau eine Antwort richtig. Richtig = 2 Punkte, Falsch/Leer = 0 Punkte.',
      points: 70,
      question_type: 'single_choice',
      questions: [
        {
          id: 'stat-pk2-01',
          number: 1,
          points: 2,
          text: 'Welcher der folgenden Lage- bzw. Streuungsparameter wird NICHT in der gleichen Einheit wie die zugrundeliegende Zufallsvariable gemessen?',
          choices: [
            { key: 'A', text: 'Standardabweichung' },
            { key: 'B', text: 'Arithmetisches Mittel' },
            { key: 'C', text: 'Spannweite' },
            { key: 'D', text: 'Variationskoeffizient' },
            { key: 'E', text: 'Mittlere Absolute Abweichung' }
          ],
          correct: ['D'],
          explanation: 'Der Variationskoeffizient wird berechnet als Quotient aus Standardabweichung und Mittelwert und ist somit einheitenlos.'
        },
        {
          id: 'stat-pk2-02',
          number: 2,
          points: 2,
          text: 'Das Bruttoinlandsprodukt (BIP) pro Kopf ist in den fünf Jahren vor der Pandemie in der Schweiz stetig gestiegen (2015: 81.59, 2016: 81.86, 2017: 82.08, 2018: 84.52, 2019: 84.77 TCHF). Wie hoch ist in diesem Zeitraum die mittlere Zuwachsrate des BIP pro Kopf (Ergebnis auf zwei Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '0.96%' },
            { key: 'B', text: '1.96%' },
            { key: 'C', text: '0.30%' },
            { key: 'D', text: '1.30%' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'Mittlere Wachstumsrate: g = (84.77/81.59)^(1/4) - 1 = 1.0096 - 1 = 0.96% pro Jahr.'
        },
        {
          id: 'stat-pk2-03',
          number: 3,
          points: 2,
          text: 'Ein Doktorand erstellt einen Boxplot [BILD: Boxplot mit Median bei 4, unterem Quartil bei 3, oberem Quartil bei 9, Minimum bei 0, Maximum bei 12]. Er hat vergessen, für welche Zahlenreihe er die Grafik erstellt hat. Alle Variablen weisen 15 Beobachtungen auf. Welche Variable passt zu diesem Boxplot?',
          choices: [
            { key: 'A', text: 'Variable 1: 0,0,1,2,3,3,4,4,5,6,8,10,10,11,12' },
            { key: 'B', text: 'Variable 2: 0,1,2,3,4,4,4,4,5,5,8,9,11,12,12' },
            { key: 'C', text: 'Variable 3: -1,0,1,2,3,3,4,4,5,7,8,9,10,12,13' },
            { key: 'D', text: 'Variable 4: 0,1,2,3,3,3,4,5,6,7,8,9,11,12,12' },
            { key: 'E', text: 'Keine der Variablen passt zum obigen Boxplot.' }
          ],
          correct: ['B'],
          explanation: 'Variable 2 erstreckt sich von 0 bis 12 (Spannweite). Der Median (Position x[8]) liegt bei 4, das untere Quartil (x[4]) bei 3 und das obere Quartil (x[12]) bei 9.'
        },
        {
          id: 'stat-pk2-04',
          number: 4,
          points: 2,
          text: 'Eine Doktorandin möchte mit intervallskalierten Variablen Berechnungen durchführen. Sie weiss, dass die zulässigen mathematischen sowie logischen Operationen vom Skalenniveau abhängen. Welche Operationen sind in ihrem Fall NICHT zulässig?',
          choices: [
            { key: 'A', text: 'Gleichung = und Ungleichung ≠' },
            { key: 'B', text: 'Vergleiche < / >' },
            { key: 'C', text: 'Addition + und Subtraktion −' },
            { key: 'D', text: 'Division ÷ und Multiplikation ×' },
            { key: 'E', text: 'Alle genannten Operationen können für intervallskalierte Variablen verwendet werden.' }
          ],
          correct: ['D'],
          explanation: 'Division und Multiplikation dürfen nur mit verhältnisskalierten Variablen durchgeführt werden. Die Division ergibt eine einheitslose Zahl und die Multiplikation liefert ein Merkmal als Ergebnis.'
        },
        {
          id: 'stat-pk2-05',
          number: 5,
          points: 2,
          text: 'Gegeben sei ein Scatterplot der Zufallsvariablen X und Y [BILD: Scatterplot zeigt kreisförmige/unkorrelierte Punktewolke ohne linearen Trend]. Welche Aussage über den Korrelationskoeffizienten von Bravais-Pearson bzw. die Kovarianz ist RICHTIG?',
          choices: [
            { key: 'A', text: 'X und Y sind perfekt korreliert mit ρ(X, Y) = 1.' },
            { key: 'B', text: 'X und Y sind unkorreliert mit ρ(X, Y) = 0.' },
            { key: 'C', text: 'X und Y sind leicht negativ korreliert mit -0.5 ≤ ρ(X, Y) < 0.' },
            { key: 'D', text: 'X und Y sind leicht positiv korreliert mit 0 < ρ(X, Y) ≤ 0.5.' },
            { key: 'E', text: 'Der Korrelationskoeffizient kann in diesem Fall nicht valide berechnet werden. Nur die Kovarianz kann diesen Zusammenhang zwischen X und Y quantifizieren.' }
          ],
          correct: ['B'],
          explanation: 'Der Scatterplot zeigt eine kreisförmige Punktwolke ohne erkennbaren linearen Zusammenhang, d.h. ρ(X, Y) = 0.'
        },
        {
          id: 'stat-pk2-06',
          number: 6,
          points: 2,
          text: 'Gegeben seien drei diskrete Zufallsvariablen X, Y und Z mit Y = 4X + 3 und Z = 3X − 4. Welche Aussage kann über den Korrelationskoeffizienten von Bravais-Pearson gemacht werden?',
          choices: [
            { key: 'A', text: 'ρ(X, Y) > ρ(X, Z)' },
            { key: 'B', text: 'ρ(X, Y) < ρ(X, Z)' },
            { key: 'C', text: 'ρ(X, Y) = ρ(X, Z)' },
            { key: 'D', text: 'Bei negativen Werten von X gilt ρ(X, Y) > ρ(X, Z) und bei positiven Werten gilt ρ(X, Y) < ρ(X, Z).' },
            { key: 'E', text: 'Es liegen nicht genügend Informationen für die Berechnung der Korrelationen vor.' }
          ],
          correct: ['C'],
          explanation: 'Der Korrelationskoeffizient von Bravais-Pearson ist für ρ(X, Y) und ρ(X, Z) gleich 1. Beide linearen Beziehungen sind perfekt positiv korreliert (beide haben positive Steigungen).'
        },
        {
          id: 'stat-pk2-07',
          number: 7,
          points: 2,
          text: 'Ein Koch bereitet 70% der Gerichte zu und eine Küchenhilfe die restlichen 30%. Mit einer Wahrscheinlichkeit von 8% spuckt der Koch auf ein von ihm zubereitetes Gericht. Die Küchenhilfe tut dies nur mit einer Wahrscheinlichkeit von 6%. Wie gross ist die Wahrscheinlichkeit, dass ein zufällig entdecktes angespucktes Gericht vom Koch produziert wurde (Ergebnis auf zwei Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '0.91' },
            { key: 'B', text: '0.09' },
            { key: 'C', text: '0.76' },
            { key: 'D', text: '0.24' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'Mit dem Satz von Bayes: P(K|S) = P(S|K)·P(K) / [P(S|K)·P(K) + P(S|KH)·P(KH)] = (0.08 × 0.7) / (0.08 × 0.7 + 0.06 × 0.3) = 0.056 / 0.074 = 0.76.'
        },
        {
          id: 'stat-pk2-08',
          number: 8,
          points: 2,
          text: 'In einer Fernsehshow darf ein Teilnehmer dreimal an einem Glücksrad drehen (Sektoren: 2, 4, 5, 6, 8 CHF, gleichwahrscheinlich). Die Gewinne werden aufsummiert. Welche der folgenden Aussagen ist FALSCH?',
          choices: [
            { key: 'A', text: 'Die Menge aller möglichen Ereignisse besteht aus 5³ = 125 Elementen. Der Ereignisraum ist Ω = {(x, y, z) | x, y, z ∈ {2, 4, 5, 6, 8}}.' },
            { key: 'B', text: 'In zwölf möglichen Ereignissen dreht der Teilnehmer genau zweimal die Zahl 5. Diese umfassen (x,5,5), (5,y,5) und (5,5,z), wobei x, y, z ∈ {2,4,6,8}.' },
            { key: 'C', text: 'In 13 möglichen Ereignissen gewinnt der Teilnehmer genau 15 CHF. Dies entspricht einer Wahrscheinlichkeit von 10.4%.' },
            { key: 'D', text: 'Nachdem die erste Drehung die Zahl 5 ergibt, hat der Teilnehmer noch eine Wahrscheinlichkeit von 25.2%, um 15 CHF zu gewinnen.' },
            { key: 'E', text: 'In 25 möglichen Ereignissen dreht der Teilnehmer das Glücksrad bei der ersten Drehung auf die Zahl 8.' }
          ],
          correct: ['D'],
          explanation: 'Es gibt insgesamt 25 Elementarereignisse der Form (5,y,z). Bei der Bedingung "erste Drehung = 5" gibt es 2+2+1=5 günstige Ereignisse für 15 CHF, also eine Wahrscheinlichkeit von 5/25 = 20%, nicht 25.2%.'
        },
        {
          id: 'stat-pk2-09',
          number: 9,
          points: 2,
          text: 'Welche der folgenden Eigenschaften trifft auf eine Exponentialverteilung NICHT zu?',
          choices: [
            { key: 'A', text: 'Die Fläche unter der Dichtefunktion f(x) = λe^(−λx) ergibt 1.' },
            { key: 'B', text: 'Der quadrierte Kehrwert des Parameters λ ergibt die Varianz.' },
            { key: 'C', text: 'Mittelwert und Standardabweichung sind stets identisch.' },
            { key: 'D', text: 'Der Parameter λ bestimmt die Form der Verteilungs- und Dichtefunktion.' },
            { key: 'E', text: 'Die Wahrscheinlichkeit P(X ≤ x) entspricht e^(−λx).' }
          ],
          correct: ['E'],
          explanation: 'Die Wahrscheinlichkeit P(X ≤ x) entspricht F(x) = 1 − e^(−λx), nicht e^(−λx). Die angegebene Formel ist 1 − F(x) = P(X > x).'
        },
        {
          id: 'stat-pk2-10',
          number: 10,
          points: 2,
          text: 'Für welchen Binomialkoeffizienten wurde der dazugehörige Wert in Pascals Dreieck richtig markiert (eingekreist)? [BILD: Pascals Dreieck, Option D zeigt Binomialkoeffizient (3 über 2) = 3 korrekt in der 4. Reihe (n=3) an Position k=2 markiert]',
          choices: [
            { key: 'A', text: 'Binomialkoeffizient 1 (laut Bild markierter Wert inkorrekt)' },
            { key: 'B', text: 'Binomialkoeffizient 2 (laut Bild markierter Wert inkorrekt)' },
            { key: 'C', text: 'Binomialkoeffizient 3: (4 über 3) (laut Bild markierter Wert inkorrekt)' },
            { key: 'D', text: 'Binomialkoeffizient 4: (3 über 2) (laut Bild markierter Wert korrekt = 3)' },
            { key: 'E', text: 'Pascals Dreieck und Binomialkoeffizienten stehen in keinem direkten Zusammenhang.' }
          ],
          correct: ['D'],
          explanation: 'In Pascals Dreieck steht in der n-ten Zeile und am k-ten Platz der Wert des Binomialkoeffizienten C(n,k). Der Zeilen- bzw. Platzindex beginnt bei 0. Binomialkoeffizient (3 über 2) = 3 ist korrekt markiert.'
        },
        {
          id: 'stat-pk2-11',
          number: 11,
          points: 2,
          text: 'Gegeben sei eine Verteilung mit einem Mittelwert μ = 0, einer Standardabweichung σ = 1 und einer Schiefe η = −1. Nach der Tschebyscheff-Ungleichung liegen mindestens 50% der Beobachtungen im Intervall [μ − kσ, μ + kσ], falls der Parameter k mindestens welchen Wert annimmt?',
          choices: [
            { key: 'A', text: '50' },
            { key: 'B', text: '1' },
            { key: 'C', text: '√2' },
            { key: 'D', text: '0.5' },
            { key: 'E', text: 'Die Tschebyscheff-Ungleichung kann in diesem Fall nicht angewendet werden.' }
          ],
          correct: ['C'],
          explanation: 'Die Tschebyscheff-Ungleichung: P(|X − μ| < kσ) ≥ 1 − 1/k². Für mind. 50%: 1 − 1/k² ≥ 0.5 → k² ≥ 2 → k = √2. Die Schiefe spielt dabei keine Rolle.'
        },
        {
          id: 'stat-pk2-12',
          number: 12,
          points: 2,
          text: 'In einer Lieferung von 100 SARS-CoV-2 Antigen Schnelltests sind 3% der Tests mangelhaft. Es werden 10 Tests zur Probe entnommen. Wie gross ist die Wahrscheinlichkeit, dass in dieser Stichprobe kein defekter (X=0) bzw. genau drei mangelhafte Tests (X=3) enthalten sind (hypergeometrisch verteilt, Ergebnis auf fünf Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: 'P(X=0) = 0.72653 und P(X=3) = 0.00074' },
            { key: 'B', text: 'P(X=0) = 0.73742 und P(X=3) = 0.00262' },
            { key: 'C', text: 'P(X=0) = 0.74789 und P(X=3) = 0.00045' },
            { key: 'D', text: 'P(X=0) = 0.75218 und P(X=3) = 0.00174' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'Hypergeometrische Verteilung: P(X=0) = C(3,0)·C(97,10)/C(100,10) = 0.72653 und P(X=3) = C(3,3)·C(97,7)/C(100,10) = 0.00074.'
        },
        {
          id: 'stat-pk2-13',
          number: 13,
          points: 2,
          text: 'Bambi möchte eine Rehfamilie gründen. Wie viele Kitze müsste Bambi mindestens zur Welt bringen, um mit mindestens 95%iger Wahrscheinlichkeit mindestens ein Rehkitz (weiblich, p=52%) zu bekommen (Ergebnis auf drei Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '4.082' },
            { key: 'B', text: '4.581' },
            { key: 'C', text: '4.915' },
            { key: 'D', text: '5.049' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'Über das Gegenereignis: P(X=0) = 0.48^n < 0.05 → n·ln(0.48) < ln(0.05) → n > ln(0.05)/ln(0.48) = 4.082.'
        },
        {
          id: 'stat-pk2-14',
          number: 14,
          points: 2,
          text: 'Die Anzahl der Tollpatsche, die in St. Gallen pro Stunde auf einer Treppe stolpern, folgt der Poissonverteilung mit einem Erwartungswert von 1. Wie gross ist die Wahrscheinlichkeit, dass genau zwei Tollpatsche in der gleichen Stunde stolpern (Ergebnis auf drei Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '0.224' },
            { key: 'B', text: '0.184' },
            { key: 'C', text: '0.547' },
            { key: 'D', text: '0.368' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'P(X=x) = (λ^x · e^(−λ)) / x! mit λ=1: P(X=2) = (1² · e^(−1)) / 2! = 0.367879 / 2 = 0.184.'
        },
        {
          id: 'stat-pk2-15',
          number: 15,
          points: 2,
          text: 'Gegeben sei die diskrete Zufallsvariable X mit f(x) = (x+5)/c für x = 2, 3, 4, 5, 6 (sonst 0). Für welchen Wert des Parameters c ist f(x) eine gültige Wahrscheinlichkeitsfunktion?',
          choices: [
            { key: 'A', text: '25' },
            { key: 'B', text: '30' },
            { key: 'C', text: '35' },
            { key: 'D', text: '40' },
            { key: 'E', text: '45' }
          ],
          correct: ['E'],
          explanation: 'Die Summe aller Wahrscheinlichkeiten muss 1 ergeben: (2+5)/c + (3+5)/c + (4+5)/c + (5+5)/c + (6+5)/c = (7+8+9+10+11)/c = 45/c = 1 → c = 45.'
        },
        {
          id: 'stat-pk2-16',
          number: 16,
          points: 2,
          text: 'Gegeben sei die stetige Zufallsvariable X. Die Wahrscheinlichkeit P(X = 10) entspricht welcher Fläche unterhalb der Dichtefunktion f(x)?',
          choices: [
            { key: 'A', text: 'Die Wahrscheinlichkeit entspricht der Fläche unter der Dichtefunktion für x < 10.' },
            { key: 'B', text: 'Die Wahrscheinlichkeit entspricht der Fläche unter der Dichtefunktion für x > 10.' },
            { key: 'C', text: 'Die Wahrscheinlichkeit entspricht der Fläche unter der Dichtefunktion für x ≤ 10.' },
            { key: 'D', text: 'Die Wahrscheinlichkeit entspricht der Fläche unter der Dichtefunktion für x ≥ 10.' },
            { key: 'E', text: 'In diesem Fall kann keine Fläche unter der Dichtefunktion berechnet werden.' }
          ],
          correct: ['E'],
          explanation: 'Punktwahrscheinlichkeiten sind bei stetigen Verteilungen nicht definiert (= 0). Es kann nur die Wahrscheinlichkeit über ein Intervall berechnet werden.'
        },
        {
          id: 'stat-pk2-17',
          number: 17,
          points: 2,
          text: 'Gegeben sei die stetige Zufallsvariable X mit linearer Dichtefunktion [BILD: Dichtefunktion f(x) ist linear fallend von f(0)=0.2 auf f(10)=0, dreieckige Form]. Wie gross ist die Wahrscheinlichkeit P(X < 5)?',
          choices: [
            { key: 'A', text: '0.15' },
            { key: 'B', text: '0.25' },
            { key: 'C', text: '0.50' },
            { key: 'D', text: '0.75' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'Die lineare Dichtefunktion lautet f(x) = 0.2 − 0.02x. Stammfunktion: F(x) = 0.2x − 0.01x². P(X < 5) = F(5) − F(0) = (0.2·5 − 0.01·25) − 0 = 1 − 0.25 = 0.75.'
        },
        {
          id: 'stat-pk2-18',
          number: 18,
          points: 2,
          text: 'Gegeben sei eine normalverteilte Zufallsvariable X mit μ = 18 und σ = 4. Standardisiert: Z = (X−18)/4. Welche der folgenden Aussagen ist NICHT korrekt?',
          choices: [
            { key: 'A', text: 'Die Variable Z ist normalverteilt.' },
            { key: 'B', text: 'Die Wahrscheinlichkeit, dass Z in das Intervall (−1, 1] fällt, beträgt 68.26%.' },
            { key: 'C', text: 'Die Wahrscheinlichkeit P[−1 ≤ Z ≤ +1] ist identisch zu P[14 ≤ X ≤ 22].' },
            { key: 'D', text: 'Die Wahrscheinlichkeit P[10 ≤ X ≤ 22] beträgt 97.72%.' },
            { key: 'E', text: 'Die Wahrscheinlichkeit P[X ≥ 32] beträgt weniger als ein Tausendstel.' }
          ],
          correct: ['D'],
          explanation: 'P[10 ≤ X ≤ 22] = P[−2 ≤ Z ≤ +1] = Φ(1) − Φ(−2) = 0.8413 − (1 − 0.9772) = 0.8413 − 0.0228 = 0.8185. Das sind 81.85%, nicht 97.72%.'
        },
        {
          id: 'stat-pk2-19',
          number: 19,
          points: 2,
          text: 'Gegeben seien die unabhängigen Zufallsvariablen X und Y. Z = X + Y. Welche Aussage über die Verteilung von Z ist FALSCH?',
          choices: [
            { key: 'A', text: 'Z folgt einer Binomialverteilung, wenn X und Y mit demselben Anteilswert binomialverteilt sind.' },
            { key: 'B', text: 'Z folgt einer Normalverteilung, wenn X und Y mit denselben Parametern normalverteilt sind.' },
            { key: 'C', text: 'Z folgt einer Normalverteilung, wenn X und Y standardnormalverteilt sind.' },
            { key: 'D', text: 'Z folgt einer Standardnormalverteilung, wenn X und Y standardnormalverteilt sind.' },
            { key: 'E', text: 'Z folgt einer Poissonverteilung, wenn X und Y mit dem gleichen Erwartungswert poissonverteilt sind.' }
          ],
          correct: ['D'],
          explanation: 'D ist falsch: Die Varianzen addieren sich. Wenn X ~ N(0,1) und Y ~ N(0,1), dann Z = X+Y ~ N(0, 2) — also nicht standardnormalverteilt, da die Varianz 2 ist, nicht 1.'
        },
        {
          id: 'stat-pk2-20',
          number: 20,
          points: 2,
          text: 'Gegeben seien zwei diskrete Zufallsvariablen X und Y. Welche der folgenden Aussagen über ihre gemeinsame Wahrscheinlichkeitsfunktion ist KORREKT?',
          choices: [
            { key: 'A', text: 'Wenn die Randverteilungen f_x(x_i) und f_y(y_i) bekannt sind, kann die gemeinsame Wahrscheinlichkeitsfunktion f(x_i, y_i) immer berechnet werden.' },
            { key: 'B', text: 'Wenn X und Y unabhängig sind, kann die gemeinsame Wahrscheinlichkeitsfunktion f(x_i, y_i) aus den Randverteilungen berechnet werden.' },
            { key: 'C', text: 'Wenn Cov(X, Y) ≠ 0, dann sind X und Y meistens abhängig.' },
            { key: 'D', text: 'Cov(X,Y) = 0 nur, wenn E(XY) = E(X)·E(Y).' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'Nur im unabhängigen Fall kann die gemeinsame Wahrscheinlichkeitsfunktion berechnet werden, wenn ausschliesslich die Randverteilungen bekannt sind: f(x_i, y_i) = f_x(x_i) · f_y(y_i).'
        },
        {
          id: 'stat-pk2-21',
          number: 21,
          points: 2,
          text: 'Falls bei einer Varianzanalyse die wahren Mittelwerte aus k Grundgesamtheiten gleich sind, dann sollte die Testgrösse MSTR/MSE...',
          choices: [
            { key: 'A', text: 'grösser als 1.0 sein.' },
            { key: 'B', text: 'ungefähr gleich 1.0 sein.' },
            { key: 'C', text: 'ungefähr gleich 0.0 sein.' },
            { key: 'D', text: 'kleiner als 0.0 sein.' },
            { key: 'E', text: 'Keine der übrigen Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'Unter der Nullhypothese gilt E(MSTR) = E(MSE) = σ², also E(MSTR/MSE) = 1. Die Testgrösse sollte nahe 1.0 sein. Wenn sich die Mittelwerte signifikant unterscheiden, ist die Testgrösse deutlich grösser als 1.0.'
        },
        {
          id: 'stat-pk2-22',
          number: 22,
          points: 2,
          text: 'Gegeben seien X und Y mit gemeinsamer Wahrscheinlichkeitsfunktion: f(0,0)=0.1, f(0,2)=0.3, f(0,3)=0.05, f(0,4)=0.05, f(2,0)=0.05, f(2,2)=0.2, f(2,3)=0.05, f(2,4)=0, f(5,0)=0.05, f(5,2)=0.1, f(5,3)=0.05, f(5,4)=0. Wie gross ist die Kovarianz zwischen X und Y? Wie gross ist die Wahrscheinlichkeit f(y1|x1)?',
          choices: [
            { key: 'A', text: '0.04 und 0.50' },
            { key: 'B', text: '−0.11 und 0.20' },
            { key: 'C', text: '−0.07 und 0.20' },
            { key: 'D', text: '0.13 und 0.50' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'E(Y) = 0·0.2 + 2·0.6 + 3·0.15 + 4·0.05 = 1.85; E(X) = 0·0.5 + 2·0.3 + 5·0.2 = 1.6; E(XY) = 2·2·0.2 + 2·5·0.1 + 3·2·0.05 + 3·5·0.05 = 2.85; Cov = 2.85 − 1.85·1.6 = −0.11. f(y1|x1) = f(0,0)/f_x(0) = 0.1/0.5 = 0.20.'
        },
        {
          id: 'stat-pk2-23',
          number: 23,
          points: 2,
          text: 'Was folgt nach dem zentralen Grenzwertsatz beim zufälligen Ziehen einer Stichprobe der Grösse n aus einer grossen Grundgesamtheit?',
          choices: [
            { key: 'A', text: 'Die Stichprobenverteilung von x̄ hat den Mittelwert μ_x̄ = μ.' },
            { key: 'B', text: 'Die Stichprobenverteilung von x̄ hat die Standardabweichung σ_x̄ = σ/√n.' },
            { key: 'C', text: 'Die Stichprobenverteilung von x̄ ist asymptotisch normalverteilt, wenn n > 30 ist.' },
            { key: 'D', text: 'Der Anteilswert der Stichprobenverteilung entspricht p = π.' },
            { key: 'E', text: 'Alle genannten Antworten sind korrekt.' }
          ],
          correct: ['E'],
          explanation: 'Alle Aussagen A–D sind Kernaussagen des zentralen Grenzwertsatzes. Die Verteilung des arithmetischen Mittelwerts strebt mit wachsendem n gegen eine Normalverteilung mit μ und σ²/n.'
        },
        {
          id: 'stat-pk2-24',
          number: 24,
          points: 2,
          text: 'Eine Professorin erhebt eine Stichprobe mit n = 64 Beobachtungen aus einer normalverteilten Grundgesamtheit mit μ = 100 und σ² = 4. Was ist das 95. Perzentil Q95 der Stichprobenverteilung von x̄ (Ergebnis auf zwei Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '99.18' },
            { key: 'B', text: '100.12' },
            { key: 'C', text: '100.41' },
            { key: 'D', text: '102.82' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'z = 1.645 (für 95%). Standardfehler = σ/√n = 2/8 = 0.25. Q95 = μ + z·σ/√n = 100 + 1.645·0.25 = 100.41.'
        },
        {
          id: 'stat-pk2-25',
          number: 25,
          points: 2,
          text: 'Gegeben sei eine Grafik [BILD: Simulation des Standardfehlers des Stichprobenmittelwerts über wachsende Stichprobengrösse, mit fallender Trendlinie und Streuung um diese], die zeigt, wie der Standardfehler mit steigendem n abnimmt. Welche Aussage ist FALSCH?',
          choices: [
            { key: 'A', text: 'Bei grösseren Stichproben ist der Standardfehler des Stichprobenmittelwerts geringer.' },
            { key: 'B', text: 'Die Grafik impliziert, dass ein Konfidenzintervall des Mittelwerts genauer ist, wenn die zugrundeliegende Stichprobe grösser ist.' },
            { key: 'C', text: 'Bei einer kleinen Stichprobengrösse ist der Standardfehler gross und schwankend, was eine ungenaue Schätzung impliziert.' },
            { key: 'D', text: 'Eine Simulation des Standardfehlers des Anteilswertes über eine wachsende Stichprobenverteilung würde ein ähnliches Bild liefern.' },
            { key: 'E', text: 'Die Abweichungen der Standardfehler von der eingezeichneten Trendlinie sind nicht dem statistischen Zufall geschuldet.' }
          ],
          correct: ['E'],
          explanation: 'E ist falsch. Die Abweichungen der Standardfehler von der Trendlinie sind dem statistischen Zufall geschuldet — jede Stichprobe liefert zufällig etwas andere Schätzer.'
        },
        {
          id: 'stat-pk2-26',
          number: 26,
          points: 2,
          text: 'Der Proteingehalt von Erbsen-Burgern folgt einer Normalverteilung mit μ = 26% und σ = 4.1%. In welchem Wahrscheinlichkeitsintervall befinden sich 95% der Stichprobenmittelwerte, wenn n = 100 Stichproben gezogen werden (Ergebnis auf eine Nachkommastellen)?',
          choices: [
            { key: 'A', text: 'In 95% aller Stichproben liegt der mittlere Proteingehalt zwischen 25.2% und 26.8%.' },
            { key: 'B', text: 'In 95% aller Stichproben liegt der mittlere Proteingehalt zwischen 22.7% und 29.3%.' },
            { key: 'C', text: 'In 95% aller Stichproben liegt der mittlere Proteingehalt zwischen 25.9% und 26.1%.' },
            { key: 'D', text: 'In 95% aller Stichproben liegt der mittlere Proteingehalt zwischen 25.3% und 26.7%.' },
            { key: 'E', text: 'In diesem Fall sollte kein Wahrscheinlichkeitsintervall berechnet werden. Ein Konfidenzintervall wäre die richtige Methode.' }
          ],
          correct: ['A'],
          explanation: 'μ ± z_(α/2) · σ/√n = 26 ± 1.96 · (4.1/√100) = 26 ± 0.80 → [25.20%, 26.80%].'
        },
        {
          id: 'stat-pk2-27',
          number: 27,
          points: 2,
          text: 'Mark Zuckerberg berechnet ein 90%-Konfidenzintervall für den Anteilswert der TikTok-Nutzer bei Jugendlichen von [0.423, 0.479]. Welche Aussage ist KORREKT?',
          choices: [
            { key: 'A', text: 'Der Stichprobenanteilswert p liegt zwischen 42.3% und 47.9% mit einer Wahrscheinlichkeit von 0.90.' },
            { key: 'B', text: 'Der wahre Anteilswert π der TikTok-Nutzer liegt zwischen 42.3% und 47.9% mit einer Wahrscheinlichkeit von 0.90.' },
            { key: 'C', text: 'Bei 100 gleichberechneten Konfidenzintervallen erwarten wir, dass 100 den wahren Anteilswert π abdecken.' },
            { key: 'D', text: 'Bei 100 gleichberechneten Konfidenzintervallen erwarten wir, dass 90 den Stichprobenanteilswert p abdecken.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'Die korrekte Interpretation: Der wahre Parameter π liegt mit 90%iger Wahrscheinlichkeit im Konfidenzintervall. Bei 100 Wiederholungen würden 90 Intervalle den wahren Wert enthalten.'
        },
        {
          id: 'stat-pk2-28',
          number: 28,
          points: 2,
          text: 'Ein Wunderheiler behauptet, dass nach seiner Behandlung mehr als 75% der Männer mit Haarausfall wieder Haarwuchs haben. Diese Behauptung soll widerlegt werden. Welche Nullhypothese H0 und Alternativhypothese H1 muss formuliert werden?',
          choices: [
            { key: 'A', text: 'H0: p ≥ 0.75 und H1: p < 0.75' },
            { key: 'B', text: 'H0: p ≤ 0.75 und H1: p > 0.75' },
            { key: 'C', text: 'H0: π ≥ 0.75 und H1: π < 0.75' },
            { key: 'D', text: 'H0: π ≤ 0.75 und H1: π > 0.75' },
            { key: 'E', text: 'Keine der aufgestellten Hypothesen ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'C: Die Nullhypothese enthält die Behauptung des Heilers (π ≥ 0.75). Die Gegenhypothese entspricht der Interessenslage (π < 0.75). Kann H0 verworfen werden, spricht das für die eigene Vermutung. A und B enthalten den empirischen Anteilswert p statt den Parameter π.'
        },
        {
          id: 'stat-pk2-29',
          number: 29,
          points: 2,
          text: 'Die Teststatistik entspricht z = 1.78 bei einem Test H0: μ = 200 gegen H1: μ ≠ 200. Wie gross ist der dazugehörige p-Wert?',
          choices: [
            { key: 'A', text: '0.9625' },
            { key: 'B', text: '0.9250' },
            { key: 'C', text: '0.0750' },
            { key: 'D', text: '0.0375' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'Zweiseitiger Test: Φ(1.78) ≈ 0.9625. p-Wert = (1 − 0.9625) × 2 = 0.0375 × 2 = 0.0750.'
        },
        {
          id: 'stat-pk2-30',
          number: 30,
          points: 2,
          text: 'Eine Leiterin führt eine Qualitätsüberprüfung von Mobiltelefonen (32/700 defekt) und Tablets (30/400 defekt) durch. Sie testet H0: π_M − π_T = 0. Was kann anhand des R-Outputs (p-Wert ≈ 0.05874) gemacht werden?',
          choices: [
            { key: 'A', text: 'Auf einem Signifikanzniveau von 1% kann die Nullhypothese verworfen werden. Die beiden Produkte weisen eine unterschiedliche Defektrate auf.' },
            { key: 'B', text: 'Auf einem Signifikanzniveau von 5% kann die Alternativhypothese angenommen werden. Die beiden Produkte weisen eine unterschiedliche Defektrate auf.' },
            { key: 'C', text: 'Auf einem Signifikanzniveau von 10% kann die Nullhypothese verworfen werden. Die beiden Produkte weisen eine unterschiedliche Defektrate auf.' },
            { key: 'D', text: 'Der errechnete p-Wert beträgt 3.5725.' },
            { key: 'E', text: 'Der Anteil der defekten Mobiltelefone beträgt 7.5%.' }
          ],
          correct: ['C'],
          explanation: 'Mit einem p-Wert von 0.05874 kann die Nullhypothese auf einem Signifikanzniveau von 10% (p < 0.1) abgelehnt werden, aber nicht auf 5%- oder 1%-Niveau.'
        },
        {
          id: 'stat-pk2-31',
          number: 31,
          points: 2,
          text: 'Eine Wissenschaftlerin möchte Mittelwerte von zwei unabhängigen Stichproben (je n=50) vergleichen. Es gilt die Annahme einer normalverteilten Grundgesamtheit sowie gleicher Varianzen. Welcher Test muss angewendet werden, um H0: μ1 − μ2 = 0 zu testen?',
          choices: [
            { key: 'A', text: 'z-Test: z = [(x̄1 − x̄2) − (μ1 − μ2)_0] / √[σ²(1/n1 + 1/n2)]' },
            { key: 'B', text: 'Paired t-Test: t = d̄ / (s_d/√n)' },
            { key: 'C', text: 'Pooled Variance t-Test: t = [(x̄1 − x̄2) − (μ1 − μ2)_0] / √[s_p²(1/n1 + 1/n2)]' },
            { key: 'D', text: 'F-Test: s1²/s2² oder s2²/s1²' },
            { key: 'E', text: 'Keine der genannten Tests ist passend.' }
          ],
          correct: ['C'],
          explanation: 'Pooled Variance t-Test, da: gleiche Varianzen angenommen werden, unabhängige Stichproben vorliegen, und die Grundgesamtheit normalverteilt ist.'
        },
        {
          id: 'stat-pk2-32',
          number: 32,
          points: 2,
          text: 'Eine Doktorandin möchte ein simples lineares Regressionsmodell mit der Methode der kleinsten Quadrate (OLS) schätzen. Welcher Wert wird bei diesem Schätzverfahren minimiert?',
          choices: [
            { key: 'A', text: 'Totale Quadratsumme (SST)' },
            { key: 'B', text: 'Erklärte Quadratsumme (SSR)' },
            { key: 'C', text: 'Residuenquadratsumme (SSE)' },
            { key: 'D', text: 'Bestimmtheitsmass R²' },
            { key: 'E', text: 'F-Statistik' }
          ],
          correct: ['C'],
          explanation: 'Bei OLS (Ordinary Least Squares) wird die Residuenquadratsumme SSE = Σ(yi − ŷi)² minimiert.'
        },
        {
          id: 'stat-pk2-33',
          number: 33,
          points: 2,
          text: 'Für eine multiple Regression sind bekannt: Σ(ŷi − ȳ)² = 292\'000 (SSR) und Σ(yi − ŷi)² = 308\'000 (SSE). Kann das Bestimmtheitsmass R² berechnet werden? Wenn ja, wie gross ist R² (auf drei Nachkommastellen)?',
          choices: [
            { key: 'A', text: 'Nein, es fehlen die Informationen zur Stichprobengrösse n.' },
            { key: 'B', text: 'Ja, das Bestimmtheitsmass R² beträgt 0.487.' },
            { key: 'C', text: 'Ja, das Bestimmtheitsmass R² beträgt 0.948.' },
            { key: 'D', text: 'Nein, es fehlen die Informationen zu SST = Σ(yi − ȳ)².' },
            { key: 'E', text: 'Ja, das Bestimmtheitsmass R² beträgt 0.513.' }
          ],
          correct: ['B'],
          explanation: 'SST = SSR + SSE = 292\'000 + 308\'000 = 600\'000. R² = SSR/SST = 292\'000 / 600\'000 = 0.4867 ≈ 0.487.'
        },
        {
          id: 'stat-pk2-34',
          number: 34,
          points: 2,
          text: 'Ein Botaniker schätzt das Modell: Mais_i = β1 + β2·TEMP_i + δ1·SONNE_i + δ2·(TEMP_i × SONNE_i) + e_i. Er will prüfen, ob sich der Steigungskoeffizient für sonnige Tage signifikant von dem für nicht sonnige Tage unterscheidet. Wie lautet die mögliche Nullhypothese?',
          choices: [
            { key: 'A', text: 'H0: β1 = β2 = δ1 = δ2 = 0' },
            { key: 'B', text: 'H0: δ2 = β2 = 0' },
            { key: 'C', text: 'H0: β2 = 0' },
            { key: 'D', text: 'H0: δ2 = 0' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'Der Unterschied in den Steigungskoeffizienten zwischen sonnigen und nicht-sonnigen Tagen wird durch δ2 (den Interaktionsterm) erfasst. Daher H0: δ2 = 0.'
        },
        {
          id: 'stat-pk2-35',
          number: 35,
          points: 2,
          text: 'Ein Geologe möchte die Dauer eines Vulkanausbruches (Eruptions_i in Min.) durch die Wartezeit seit dem vorherigen Ausbruch (Waiting_i in Min.) erklären. Der R-Output zeigt: Konstante = −1.874016, Steigung = 0.075628, F-Test signifikant, adj. R² = 0.8108. Welche Aussage ist FALSCH?',
          choices: [
            { key: 'A', text: 'Die geschätzte Konstante beträgt −1.874016, der Steigungskoeffizient 0.075628.' },
            { key: 'B', text: 'Der F-Test bestätigt die Signifikanz des Modells auf allen herkömmlichen Niveaus.' },
            { key: 'C', text: 'Nach 150 Minuten Wartezeit dauert der nächste Ausbruch im Durchschnitt 9.47 Minuten (−1.874016 + 150 × 0.075628 = 9.470184).' },
            { key: 'D', text: 'Die Schätzungen beider Koeffizienten unterscheiden sich nur auf einem Signifikanzniveau von α = 0.05 signifikant von Null.' },
            { key: 'E', text: 'Das korrigierte Bestimmtheitsmass beträgt 0.8108.' }
          ],
          correct: ['D'],
          explanation: 'D ist falsch: Wenn der F-Test auf allen üblichen Niveaus (1%, 5%, 10%) signifikant ist, dann sind auch die Koeffizienten auf diesen Niveaus signifikant — nicht nur auf α = 0.05.'
        }
      ]
    },
    {
      id: 'teil2',
      title: 'Teil II: Multiple Choice Fragen',
      description: 'Pro Frage können mehrere Antworten richtig sein. Nur wenn ALLE Kreuze korrekt: 2 Punkte. Sonst 0 Punkte.',
      points: 20,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'stat-pk2-36',
          number: 36,
          points: 2,
          text: 'Die untenstehende Grafik zeigt die Simulation der Wahrscheinlichkeit in einer Versuchsreihe, dass mit einem Würfel die Augenzahl "2" geworfen wird [BILD: Relative Häufigkeit konvergiert mit zunehmendem n gegen 1/6 ≈ 0.167]. Welche Aussagen sind FALSCH?',
          choices: [
            { key: 'A', text: 'Diese Simulation orientiert sich am zentralen Grenzwertsatz.' },
            { key: 'B', text: 'Die simulierte Wahrscheinlichkeit entspricht 0.167 (gerundet).' },
            { key: 'C', text: 'Die dargestellte Wahrscheinlichkeit ergibt sich aus: P = Anzahl Versuche mit Augenzahl 2 / Gesamtanzahl Versuche.' },
            { key: 'D', text: 'Diese Simulation ist repräsentativ für den axiomatischen Wahrscheinlichkeitsbegriff.' },
            { key: 'E', text: 'In der Versuchsreihe wurde kein fairer Würfel verwendet.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'Diese Simulation orientiert sich am Gesetz der grossen Zahlen (statistischer Wahrscheinlichkeitsbegriff), nicht am zentralen Grenzwertsatz (A ist falsch). Der axiomatische Wahrscheinlichkeitsbegriff bezieht sich auf mathematische Axiome, nicht auf empirische Simulation (D ist falsch). Da die Häufigkeit gegen 1/6 konvergiert, wurde ein fairer Würfel verwendet (E ist falsch).'
        },
        {
          id: 'stat-pk2-37',
          number: 37,
          points: 2,
          text: 'Gegeben sei eine Korrelationstabelle für Variablen aus der Sportmedizin (Geschlecht, Alter, Athlet, Gewicht, Grösse, BMI, VO2max). Welche Aussagen können korrekt aus der Tabelle abgelesen werden und sind RICHTIG?',
          choices: [
            { key: 'A', text: 'Die Variablen Grösse und Geschlecht sind positiv korreliert mit ρ = 0.471.' },
            { key: 'B', text: 'Nur die Variable Alter ist negativ mit anderen Variablen korreliert.' },
            { key: 'C', text: 'Zwischen den Variablen BMI und Geschlecht liegt beinahe kein Zusammenhang vor.' },
            { key: 'D', text: 'Die geringe positive Korrelation zwischen BMI und Athlet legt nahe, dass zwischen diesen Variablen ein quadratischer Zusammenhang vorliegen muss.' },
            { key: 'E', text: 'Die stärkste lineare Beziehung besteht zwischen den Variablen Geschlecht und VO2max.' }
          ],
          correct: ['A', 'C', 'E'],
          explanation: 'B ist falsch: Auch andere Variablen weisen negative Korrelationen auf (z.B. Grösse und BMI = −0.23). D ist falsch: Ein Korrelationskoeffizient nahe Null impliziert keine quadratische Beziehung.'
        },
        {
          id: 'stat-pk2-38',
          number: 38,
          points: 2,
          text: 'Der Direktor der Universität St. Gallen erhebt einen Datensatz über den Kurs Statistik. Welche der folgenden Zufallsvariablen in diesem Datensatz sind STETIG?',
          choices: [
            { key: 'A', text: 'Variable V = Punktezahl in der Klausur' },
            { key: 'B', text: 'Variable W = Anteilswert der Frauen in einem Tutorium' },
            { key: 'C', text: 'Variable X = Zeit zwischen zwei Nervenzusammenbrüchen in der Vorlesung' },
            { key: 'D', text: 'Variable Y = Alkoholkonsum (in ml) eines Studenten nach abgelegter Prüfung' },
            { key: 'E', text: 'Variable Z = Klausurnote' }
          ],
          correct: ['C', 'D'],
          explanation: 'Stetig sind Variablen, die jeden Wert in einem Intervall annehmen können. Zeit (X) und Alkoholkonsum in ml (Y) sind stetig. Punktezahl (V), Anteilswert (W, diskret durch endliche Anzahl Studenten) und Note (Z, diskrete Skala) sind diskret.'
        },
        {
          id: 'stat-pk2-39',
          number: 39,
          points: 2,
          text: 'Die Infektionswahrscheinlichkeit mit COVID-19 ist P(C) = 0.01. Ein Antigentest ergibt für Kranke P(T|C) = 0.9 und für Gesunde P(T|C̄) = 0.1 positiv. Welche der folgenden Wahrscheinlichkeiten sind FALSCH?',
          choices: [
            { key: 'A', text: 'Die Wahrscheinlichkeit, dass eine zufällig gewählte Person gesund ist, beträgt P(C̄) = 0.99.' },
            { key: 'B', text: 'Eine positiv getestete Person ist tatsächlich infiziert: P(C|T) = 0.083.' },
            { key: 'C', text: 'Eine positiv getestete Person ist tatsächlich gesund: P(C̄|T) = 0.917.' },
            { key: 'D', text: 'Eine gesunde Person wird mit P(T̄|C̄) = 0.1 negativ getestet.' },
            { key: 'E', text: 'Eine infizierte Person wird mit P(T̄|C) = 0.9 negativ getestet.' }
          ],
          correct: ['D', 'E'],
          explanation: 'D ist falsch: P(T̄|C̄) = 1 − P(T|C̄) = 1 − 0.1 = 0.9 (nicht 0.1). E ist falsch: P(T̄|C) = 1 − P(T|C) = 1 − 0.9 = 0.1 (nicht 0.9).'
        },
        {
          id: 'stat-pk2-40',
          number: 40,
          points: 2,
          text: 'Ein Geologe prüft H0: µ = 105cm gegen H1: µ ≠ 105cm mit einem 95%-Konfidenzintervall [104.13, 106.91]. Welche der folgenden Aussagen sind RICHTIG?',
          choices: [
            { key: 'A', text: 'Die Nullhypothese wird auf einem Signifikanzniveau von α = 0.05 angenommen.' },
            { key: 'B', text: 'Die Nullhypothese wird auf einem Signifikanzniveau von α = 0.05 abgelehnt.' },
            { key: 'C', text: 'Die Alternativhypothese wird auf einem Signifikanzniveau von α = 0.05 angenommen.' },
            { key: 'D', text: 'Die Alternativhypothese wird auf einem Signifikanzniveau von α = 0.05 abgelehnt.' },
            { key: 'E', text: 'Mit einem Konfidenzintervall kann der Geologe keine Hypothesen überprüfen.' }
          ],
          correct: ['A', 'D'],
          explanation: 'Der hypothetische Mittelwert μ = 105 liegt im 95%-Konfidenzintervall [104.13, 106.91]. Daher wird H0 auf dem Niveau α = 0.05 angenommen und H1 abgelehnt.'
        },
        {
          id: 'stat-pk2-41',
          number: 41,
          points: 2,
          text: 'Pharmaunternehmen testet Medikament in 3 Dosierungsgruppen (niedrig/mittel/hoch) mit je 4 Testpersonen (unterschiedliche Virenstämme). Wartezeiten bis Besserung (Stunden) und Zwischenergebnisse gegeben. Welche Antworten sind korrekt für eine Varianzanalyse mit 5% Irrtumswahrscheinlichkeit?',
          choices: [
            { key: 'A', text: 'Ohne Virusstamm (Einfaktor-ANOVA): Testgrösse 3.95, kritischer Wert 4.26 → H0 nicht verworfen.' },
            { key: 'B', text: 'Ohne Virusstamm (Einfaktor-ANOVA): Testgrösse 7.46, kritischer Wert 4.26 → H0 verworfen.' },
            { key: 'C', text: 'Mit Virusstamm (Randomized Block Design): Testgrösse 15.45, kritischer Wert 5.14 → H0 verworfen.' },
            { key: 'D', text: 'Mit Virusstamm (Randomized Block Design): Testgrösse 20.60, kritischer Wert 5.14 → H0 verworfen.' },
            { key: 'E', text: 'Keine der übrigen Antworten ist korrekt.' }
          ],
          correct: ['A', 'C'],
          explanation: 'Einfaktor-ANOVA: SSTR = 4 × 0.515 = 2.06; SSE = 4.41 − 2.06 = 2.35; F = (2.06/2)/(2.35/9) = 3.95 < F(0.05; 2,9) = 4.26 → H0 nicht verworfen. Randomized Block: SSB = 3 × 0.65 = 1.95; SSE* = 4.41 − 2.06 − 1.95 = 0.4; F* = (2.06/2)/(0.4/6) = 15.45 > F(0.05; 2,6) = 5.14 → H0 verworfen.'
        },
        {
          id: 'stat-pk2-42',
          number: 42,
          points: 2,
          text: 'Gegeben sei ein Regressionsmodell y_i = β1 + β2·x_i + e_i, welches alle Annahmen der simplen linearen Regression erfüllt. Welche Aussagen über den Fehlerterm e_i sind KORREKT?',
          choices: [
            { key: 'A', text: 'Der Fehlerterm e_i ist normalverteilt.' },
            { key: 'B', text: 'Die Varianz des Fehlerterms e_i ist über alle Ausprägungen x_i konstant (Homoskedastizität).' },
            { key: 'C', text: 'Der Mittelwert von e_i ist definiert durch Σ β_i + β2·x_i.' },
            { key: 'D', text: 'e1, e2, ..., e_k sind voneinander unabhängig.' },
            { key: 'E', text: 'Keine der übrigen Antworten ist korrekt.' }
          ],
          correct: ['A', 'B', 'D'],
          explanation: 'C ist falsch: Der Erwartungswert des Fehlerterms ist E[e_i|x_i] = 0 (nicht β1 + β2·x_i). Alle anderen Aussagen entsprechen den Gauss-Markov-Annahmen.'
        },
        {
          id: 'stat-pk2-43',
          number: 43,
          points: 2,
          text: 'Ein lineares Regressionsmodell y_i = β1 + β2·x_i + e_i soll mit einer Stichprobe geschätzt werden, die einige Ausreisser für die beobachteten Werte x_i enthält. Welche Aussagen sind RICHTIG?',
          choices: [
            { key: 'A', text: 'Die Ausreisser können den geschätzten Steigungskoeffizienten b2 erhöhen.' },
            { key: 'B', text: 'Die Ausreisser können den geschätzten Steigungskoeffizienten b2 verringern.' },
            { key: 'C', text: 'Die Ausreisser können die geschätzte Konstante b1 erhöhen.' },
            { key: 'D', text: 'Die Ausreisser können die geschätzte Konstante b1 verringern.' },
            { key: 'E', text: 'Die Ausreisser verringern die Signifikanz des Regressionsmodells durch eine Erhöhung der Standardfehler der Koeffizienten.' }
          ],
          correct: ['A', 'B', 'C', 'D', 'E'],
          explanation: 'Alle Aussagen sind korrekt. Ausreisser können je nach Position die Schätzer in beide Richtungen verzerren und erhöhen generell die Standardfehler.'
        },
        {
          id: 'stat-pk2-44',
          number: 44,
          points: 2,
          text: 'Ein Pizzaiolo erklärt Pizzaausgaben durch Einkommen, Alter und Geschlecht (FEMALE_i = 1 für Studentinnen; MALE_i = 1 − FEMALE_i). Welche möglichen Regressionsmodelle fallen NICHT auf die Dummy Variable Trap herein?',
          choices: [
            { key: 'A', text: 'Pizza_i = δ1·FEMALE_i + δ2·MALE_i + β2·INCOME_i + β3·AGE_i + e_i' },
            { key: 'B', text: 'Pizza_i = β1 + δ1·FEMALE_i + β2·INCOME_i + β3·AGE_i + γ1·INCOME_i×FEMALE_i + e_i' },
            { key: 'C', text: 'Pizza_i = β1 + δ1·FEMALE_i + β2·INCOME_i + β3·AGE_i + γ1·INCOME_i×MALE_i + e_i' },
            { key: 'D', text: 'Pizza_i = β1 + δ1·FEMALE_i + δ2·MALE_i + β2·INCOME_i + β3·AGE_i + e_i' },
            { key: 'E', text: 'Pizza_i = β1 + β2·INCOME_i + β3·AGE_i + γ1·INCOME_i×FEMALE_i + γ2·AGE_i×MALE_i + e_i' }
          ],
          correct: ['A', 'B', 'C', 'E'],
          explanation: 'D fällt in die Dummy Variable Trap: Konstante β1 + FEMALE_i + MALE_i ergibt perfekte Multikollinearität, da FEMALE + MALE = 1 = Konstante. In A gibt es keine Konstante, daher kein Problem.'
        },
        {
          id: 'stat-pk2-45',
          number: 45,
          points: 2,
          text: 'Eine Sozialforscherin berechnet ein Regressionsmodell zur Fertilität in 47 Schweizer Bezirken mit Education_i (%) und Catholic_i (%) als Regressoren. Das R²-adj. = 0.5552. Welche der folgenden Aussagen sind KORREKT?',
          choices: [
            { key: 'A', text: 'Es wurden in 47 Schweizer Bezirken Daten zur Fertilität erhoben und ausgewertet.' },
            { key: 'B', text: 'Die Variable Catholic_i fliesst in das Regressionsmodell als Interaktionsterm ein.' },
            { key: 'C', text: 'Durch die Hinzunahme einer weiteren unabhängigen Variablen würde sich das korrigierte Bestimmtheitsmass von 0.5552 sicherlich erhöhen.' },
            { key: 'D', text: 'Eine Erhöhung von Catholic_i um einen Prozentpunkt hat im Mittel eine Steigerung der Fertilitätsrate um 0.11 Kinder unter 1000 Frauen pro Jahr zur Folge.' },
            { key: 'E', text: 'Der Standardfehler der geschätzten Konstante beträgt 2.35197.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'B ist falsch: Catholic_i ist ein einfacher Regressor, kein Interaktionsterm. C ist falsch: Das korrigierte R² berücksichtigt die Anzahl Parameter und kann sinken, wenn eine neue Variable keinen signifikanten Beitrag leistet.'
        }
      ]
    }
  ]
};
