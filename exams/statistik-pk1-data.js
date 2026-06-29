window.EXAM_DATA_STATISTIK_PK1 = {
  id: 'statistik-pk1',
  title: 'Statistik — Probeklausur 1',
  course: 'Statistik',
  courseColor: '#2563eb',
  duration_minutes: 90,
  total_points: 90,
  exam_info: {
    date: '01.07.2026',
    duration: '90 Minuten',
    format: 'Single Choice (Teil I) + Multiple Choice (Teil II)',
    allowed_aids: 'Formelsammlung (wird ausgeteilt)',
    grading: 'Echte FS26-Kurve noch unbekannt. Historische Kurven (UniClubs): HS25 (Schürle): 4.0=30 Pts, 5.0=46 Pts, 6.0=62 Pts | HS24 (Füss): 4.0=45 Pts, 5.0=65 Pts, 6.0=85 Pts | HS20: 4.0=32 Pts, 5.0=44 Pts, 6.0=56 Pts | Maximum immer 90 Pts'
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
          id: 'stat-pk1-01',
          number: 1,
          points: 2,
          text: 'Ein Doktorand möchte eine **ordinalskalierte** Variable in einem Datensatz untersuchen. Welche zwei Lageparameter eignen sich dazu?',
          choices: [
            { key: 'A', text: 'Modus und Median' },
            { key: 'B', text: 'Median und arithmetisches Mittel' },
            { key: 'C', text: 'Arithmetisches Mittel und Modus' },
            { key: 'D', text: 'Gewichtetes Mittel und Median' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'Bei einer ordinalskalierten Variable eignen sich nur der Modus und der Median, um die Ausprägung der Variable zu beschreiben.'
        },
        {
          id: 'stat-pk1-02',
          number: 2,
          points: 2,
          text: 'Gegeben sei eine **intervallskalierte** Zufallsvariable X. Welches Skalenniveau weist die Zufallsvariable Y auf, welche sich durch Y = 2^X errechnet?',
          choices: [
            { key: 'A', text: 'Nominal' },
            { key: 'B', text: 'Ordinal' },
            { key: 'C', text: 'Intervall' },
            { key: 'D', text: 'Verhältnis' },
            { key: 'E', text: 'Das neue Skalenniveau kann nicht eindeutig bestimmt werden.' }
          ],
          correct: ['C'],
          explanation: 'Durch eine monotone Transformation bleibt die Skalierung dieselbe!'
        },
        {
          id: 'stat-pk1-03',
          number: 3,
          points: 2,
          text: 'Im folgenden Streudiagramm wird der studentische Bierkonsum in der Woche vor der Statistikklausur und die erreichten Noten gegenübergestellt. Die siebte Beobachtung (4,4) in der Grafik ist ein Ausreisser. Welche Aussage über die Kovarianz bzw. den Korrelationskoeffizienten zwischen dem Bierkonsum und den erreichten Noten ist richtig, wenn der Ausreisser in der Analyse nicht mehr berücksichtigt wird? [Streudiagramm zeigt negative Korrelation]',
          choices: [
            { key: 'A', text: 'Ein Ausschluss des Ausreissers erhöht die Kovarianz bzw. den Korrelationskoeffizienten.' },
            { key: 'B', text: 'Ein Ausschluss des Ausreissers verringert nur die nicht-standardisierte Kovarianz. Der Korrelationskoeffizient bleibt gleich.' },
            { key: 'C', text: 'Ein Ausschluss des Ausreissers hat keinen Effekt auf die Kovarianz bzw. den Korrelationskoeffizienten.' },
            { key: 'D', text: 'Ein Ausschluss des Ausreissers verringert die Kovarianz bzw. den Korrelationskoeffizienten.' },
            { key: 'E', text: 'Ein Ausschluss des Ausreissers erhöht nur die nicht-standardisierte Kovarianz. Der Korrelationskoeffizient bleibt gleich.' }
          ],
          correct: ['D'],
          explanation: 'Der Bierkonsum und die erreichte Note sind negativ korreliert. Durch die Bereinigung des Ausreissers wird diese Beziehung noch eindeutiger und die Kovarianz bzw. der Korrelationskoeffizient verringern sich.'
        },
        {
          id: 'stat-pk1-04',
          number: 4,
          points: 2,
          text: 'Welcher der folgenden Lageparameter ist **am empfindlichsten** gegen Ausreisser?',
          choices: [
            { key: 'A', text: 'Modus' },
            { key: 'B', text: 'Median' },
            { key: 'C', text: 'Arithmetisches Mittel' },
            { key: 'D', text: 'Oberes/unteres Quartil' },
            { key: 'E', text: 'Alle genannten Lageparameter werden gleichermassen von Ausreissern beeinflusst.' }
          ],
          correct: ['C'],
          explanation: 'Das arithmetische Mittel ist am empfindlichsten gegen Ausreisser in einem Datensatz.'
        },
        {
          id: 'stat-pk1-05',
          number: 5,
          points: 2,
          text: 'Welche Aussage über die Extremwerte einer Verteilung mit **negativer** Schiefe ist **korrekt**?',
          choices: [
            { key: 'A', text: 'Extremwerte auf der linken Seite sind unwahrscheinlicher als bei einer Normalverteilung.' },
            { key: 'B', text: 'Extremwerte auf der rechten Seite sind unwahrscheinlicher als bei einer Normalverteilung.' },
            { key: 'C', text: 'Extremwerte auf der linken Seite sind gleich wahrscheinlich wie bei einer Normalverteilung.' },
            { key: 'D', text: 'Extremwerte auf der rechten Seite sind wahrscheinlicher als bei einer Normalverteilung.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'Das lange Ende einer Verteilung mit negativer Schiefe ist auf der linken Seite bzw. die Verteilung ist rechtssteil. Somit sind Extremwerte auf der linken (rechten) Seite wahrscheinlicher (unwahrscheinlicher) als bei der symmetrischen Normalverteilung.'
        },
        {
          id: 'stat-pk1-06',
          number: 6,
          points: 2,
          text: 'Gegeben sei der folgende Boxplot einer Verteilung [Boxplot: Median bei ca. 8, Q1≈4, Q3≈9, min=0, max=12, Median näher an Q3]. Welche Aussage über die zugrundeliegende Verteilung kann aufgrund des Boxplots gemacht werden?',
          choices: [
            { key: 'A', text: 'Es handelt sich um eine symmetrische Verteilung.' },
            { key: 'B', text: 'Die Verteilung besitzt eine positive Schiefe.' },
            { key: 'C', text: 'Die Verteilung ist rechtssteil bzw. linksschief.' },
            { key: 'D', text: 'Die Verteilung ist linkssteil bzw. rechtsschief.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'Im Boxplot kann anhand des Medians, der Quartile und der Range abgelesen werden, dass die Verteilung eine negative Schiefe aufweist (rechtssteil bzw. linksschief).'
        },
        {
          id: 'stat-pk1-07',
          number: 7,
          points: 2,
          text: 'Der klassische Wahrscheinlichkeitsbegriff geht zurück auf:',
          choices: [
            { key: 'A', text: 'Pierre-Simon de Laplace' },
            { key: 'B', text: 'Andrei Kolmogorow' },
            { key: 'C', text: 'Pafnuty Chebyshev' },
            { key: 'D', text: 'Blaise Pascal' },
            { key: 'E', text: 'Daniel Bernoulli' }
          ],
          correct: ['A'],
          explanation: 'Der klassische Wahrscheinlichkeitsbegriff geht auf Pierre-Simon de Laplace zurück.'
        },
        {
          id: 'stat-pk1-08',
          number: 8,
          points: 2,
          text: 'Zwei herkömmliche Würfel (sechsseitig) werden gleichzeitig geworfen. Wie gross ist die Wahrscheinlichkeit, dass die Augensumme der beiden Würfel maximal 6 beträgt?',
          choices: [
            { key: 'A', text: '1/6' },
            { key: 'B', text: '7/12' },
            { key: 'C', text: '5/18' },
            { key: 'D', text: '5/12' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'Jedes Zahlenpaar tritt mit gleicher Wahrscheinlichkeit auf. Insgesamt gibt es 36 Elementarereignisse mit einer Wahrscheinlichkeit von 1/36. 15 Elementarereignisse haben eine Augensumme ≤ 6. Die gesuchte Wahrscheinlichkeit beträgt P(Augensumme ≤ 6) = 15/36 = 5/12.'
        },
        {
          id: 'stat-pk1-09',
          number: 9,
          points: 2,
          text: 'Auf einem Flugzeugträger gibt es während des Starts eines Düsenjets drei Fahnensignale. Jedes dieser Fahnensignale kann vom Matrosen zu einem richtigen (R) oder falschen (F) Zeitpunkt gegeben werden. Für das zusammengesetzte Ereignis Aᵢ gilt: Aᵢ = {i-tes Fahnensignal ist zum richtigen Zeitpunkt erfolgt}, wobei i ∈ {1, 2, 3}. Welche Aussage ist in diesem Zusammenhang **falsch**?',
          choices: [
            { key: 'A', text: 'Die Menge aller möglichen Ereignisse besteht aus 2³ = 8 Elementen: {(F,F,F),(F,F,R),(F,R,F),(F,R,R),(R,F,F),(R,F,R),(R,R,F),(R,R,R)}.' },
            { key: 'B', text: 'Das zusammengesetzte Ereignis A₃ umfasst folgende Elemente: {(F,F,R),(F,R,R),(R,F,R),(R,R,R)}.' },
            { key: 'C', text: 'Das zusammengesetzte Ereignis B₁ = {mindestens ein Fahnensignal erfolgt zum richtigen Zeitpunkt} kann durch die zusammengesetzten Ereignisse Aᵢ wie folgt beschrieben werden: B₁ = (A₁ ∪ A₂ ∪ A₃).' },
            { key: 'D', text: 'Das zusammengesetzte Ereignis B₂ = {erstes Fahnensignal zum richtigen Zeitpunkt und von den anderen höchstens eines zum richtigen Zeitpunkt} kann durch die zusammengesetzten Ereignisse Aᵢ wie folgt beschrieben werden: B₂ = A₁ ∩ (A₂ ∩ A₃).' },
            { key: 'E', text: 'Das zusammengesetzte Ereignis B₃ = (Ā₁ ∩ A₂ ∩ A₃) ∪ (A₁ ∩ Ā₂ ∩ A₃) ∪ (A₁ ∩ A₂ ∩ Ā₃) beschreibt die Ereignisse, wenn genau ein Fahnensignal zum falschen Zeitpunkt erfolgt.' }
          ],
          correct: ['D'],
          explanation: 'Das zusammengesetzte Ereignis B₂ müsste wie folgt beschrieben werden: B̄₂ = A₁ ∩ (Ā₂ ∩ A₃)'
        },
        {
          id: 'stat-pk1-10',
          number: 10,
          points: 2,
          text: 'An einer Kaffeefahrt nehmen 50 Seniorinnen und 20 Senioren teil. Davon präferieren 35 Frauen und 5 Männer Süssstoff im Kaffee. Der Rest bevorzugt Zucker. Welche der Aussagen ist **falsch**?',
          choices: [
            { key: 'A', text: 'Die Verwendung von Süssstoff ist abhängig vom Geschlecht.' },
            { key: 'B', text: 'Die Frauen haben ein 7-mal grösseres Chancenverhältnis als Männer für die Vorliebe zu Süssstoff im Kaffee.' },
            { key: 'C', text: 'Die bedingte Wahrscheinlichkeit P(Süssstoff | Mann) entspricht 1/7.' },
            { key: 'D', text: 'Die Wahrscheinlichkeit für Süssstoff unter den Männern beträgt 1/4.' },
            { key: 'E', text: 'Die Quote der Süssstoff-Liebhaber unter den Frauen beträgt 7:3.' }
          ],
          correct: ['C'],
          explanation: 'P(S|M) = (5/70)×(70/20) = 5/20 = 1/4, nicht 1/7. Quote Frauen: 35:15 = 7:3. Chancenverhältnis: (7/3)/(1/3) = 7.'
        },
        {
          id: 'stat-pk1-11',
          number: 11,
          points: 2,
          text: 'Ein Pokémon GO-Spieler spaziert durch eine amerikanische Grossstadt mit gitterförmigem Strassennetz. Er befindet sich am Punkt A (0,0), als ein sehr seltenes Pokémon am anderen Ende der Stadt am Punkt B (16,9) auftaucht. Wie viele mögliche kürzeste Wege kann der Spieler nehmen?',
          choices: [
            { key: 'A', text: '11\'440' },
            { key: 'B', text: '167\'960' },
            { key: 'C', text: '1\'675\'980' },
            { key: 'D', text: '2\'042\'975' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'C(25,9) = 2\'042\'975. Insgesamt sind es 25 Wegstücke. Er muss 9 auswählen, bei denen er nach unten geht. Die Lösung ergibt sich aus dem Binomialkoeffizienten.'
        },
        {
          id: 'stat-pk1-12',
          number: 12,
          points: 2,
          text: 'Gegeben sei eine diskrete Zufallsvariable X mit der folgenden Wahrscheinlichkeitsfunktion: X: -4,-3,-2,-1,0,1,2,3,4 | f(x): 2θ, 0.1, 3θ, 0.1-θ², 0.1-θ, 0.1+θ², 4θ-0.3, 0.05, 0.05. Welchen Wert hat der Parameter θ?',
          choices: [
            { key: 'A', text: '0.20' },
            { key: 'B', text: '0.15' },
            { key: 'C', text: '0.10' },
            { key: 'D', text: '0.05' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'Die Summe der einzelnen Wahrscheinlichkeiten muss 1 ergeben: 1 = 2θ + 0.1 + 3θ + 0.1 - θ² + 0.1 - θ + 0.1 + θ² + 4θ - 0.3 + 0.05 + 0.05. Daraus folgt: 8θ + 0.2 = 1, θ = 0.1'
        },
        {
          id: 'stat-pk1-13',
          number: 13,
          points: 2,
          text: 'Gegeben seien 5 rote und 25 schwarze Kugeln. Es werden 5 Kugeln ohne Zurücklegen gezogen. Was ist der Erwartungswert und die Varianz der Anzahl gezogener roter Kugeln sowie die Wahrscheinlichkeit, dass genau 3 rote Kugeln gezogen werden (Ergebnisse auf 4 Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: 'E(X) = 0.5453; σ² = 0.4749 und P(X=3) = 0.0152' },
            { key: 'B', text: 'E(X) = 0.6856; σ² = 0.5328 und P(X=3) = 0.0395' },
            { key: 'C', text: 'E(X) = 0.7521; σ² = 0.4756 und P(X=3) = 0.0326' },
            { key: 'D', text: 'E(X) = 0.8333; σ² = 0.5987 und P(X=3) = 0.0211' },
            { key: 'E', text: 'Keine der genannten Antworten ist richtig.' }
          ],
          correct: ['D'],
          explanation: 'E(X) = (5×5)/30 = 0.8333. Varianz σ² = ((5×5)×(30-5))/30² × (30-5)/(30-1) = 0.5987. P(X=3) = C(5,3)×C(25,2)/C(30,5) = 10×300/142506 = 0.0211'
        },
        {
          id: 'stat-pk1-14',
          number: 14,
          points: 2,
          text: 'Gegeben seien vier Poissonverteilungen (A: n=40, Varianz=20; B: n=40, Varianz=16; C: n=40, Varianz=9; D: n=40, Varianz=3). Welche dieser Poissonverteilungen hat eine Standardabweichung von 4?',
          choices: [
            { key: 'A', text: 'Verteilung A' },
            { key: 'B', text: 'Verteilung B' },
            { key: 'C', text: 'Verteilung C' },
            { key: 'D', text: 'Verteilung D' },
            { key: 'E', text: 'Verteilung B und D haben beide eine Standardabweichung von 4.' }
          ],
          correct: ['B'],
          explanation: 'Bei der Poissonverteilung ist der Erwartungswert gleich der Varianz. Verteilung B: n=40, Varianz=16, SD = √16 = 4.'
        },
        {
          id: 'stat-pk1-15',
          number: 15,
          points: 2,
          text: 'Die Anzahl der Kunden, die pro Minute eine Bank betreten, folgt der Poissonverteilung mit einem Erwartungswert von 3.0. Was ist die Wahrscheinlichkeit, dass mehr als drei Kunden in der gleichen Minute eintreffen (Ergebnis auf 4 Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '0.2240' },
            { key: 'B', text: '0.3528' },
            { key: 'C', text: '0.4232' },
            { key: 'D', text: '0.5768' },
            { key: 'E', text: '0.6472' }
          ],
          correct: ['B'],
          explanation: 'P(x > 3) = 1 - P(x=0) - P(x=1) - P(x=2) - P(x=3). P(0)=0.0498; P(1)=0.1494; P(2)=0.2240; P(3)=0.2240. P(x>3) = 1 - 0.0498 - 0.1494 - 0.2240 - 0.2240 = 0.3528'
        },
        {
          id: 'stat-pk1-16',
          number: 16,
          points: 2,
          text: 'Ein Restauranttester beobachtet, dass 86.8% der zubereiteten Steaks in einem Restaurant dem vom Kunden gewünschten Gargrad entsprechen. An einem Samstagabend werden 3 Steaks unabhängig voneinander im Restaurant bestellt. Was ist die Wahrscheinlichkeit, dass mindestens zwei Steaks perfekt nach Kundenwunsch gegart werden (Ergebnis auf 2 Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '0.92' },
            { key: 'B', text: '0.93' },
            { key: 'C', text: '0.94' },
            { key: 'D', text: '0.95' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'P(x≥2) = P(x=2) + P(x=3). P(x=2|n=3,π=0.868) = 3!/(2!1!) × 0.868² × 0.132 = 0.30. P(x=3|n=3,π=0.868) = 0.868³ = 0.65. P(x≥2) = 0.30 + 0.65 = 0.95'
        },
        {
          id: 'stat-pk1-17',
          number: 17,
          points: 2,
          text: 'Welche Eigenschaft trifft **nicht** auf eine Normalverteilung zu?',
          choices: [
            { key: 'A', text: 'Der Mittelwert entspricht dem Modus.' },
            { key: 'B', text: 'Die Verteilung ist symmetrisch um den Median.' },
            { key: 'C', text: 'Die Fläche unterhalb der Dichtefunktion beträgt immer 1.' },
            { key: 'D', text: 'Die Dichtefunktion wird allein durch vier Parameter (Mittelwert, Varianz, Schiefe und Kurtosis) vollständig charakterisiert.' },
            { key: 'E', text: 'Die Standardabweichung beträgt nicht immer 1.' }
          ],
          correct: ['D'],
          explanation: 'Die Normalverteilung ist durch zwei Parameter vollständig charakterisiert: Mittelwert und Standardabweichung.'
        },
        {
          id: 'stat-pk1-18',
          number: 18,
          points: 2,
          text: 'Ein Drogenhändler packt Marihuana in Säckchen zum Verkauf ab. Eine Stichprobe hat gezeigt, dass das Gewicht der Säckchen normalverteilt ist mit einem durchschnittlichen Gewicht von 30g und einer Standardabweichung von 8g. Was ist das Gewicht, das nur von 5% aller Marihuana-Säckchen unterschritten wird (Ergebnis auf 3 Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '16.800g' },
            { key: 'B', text: '16.825g' },
            { key: 'C', text: '16.840g' },
            { key: 'D', text: '16.880g' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'z = -1.645 entspricht 0.05. z = (w-30)/8 → -1.645 = (w-30)/8 → w = 16.840g'
        },
        {
          id: 'stat-pk1-19',
          number: 19,
          points: 2,
          text: 'Am Sonntagmorgen treffen in einer Bäckerei laufend Kunden ein, um frische Croissants zu kaufen. Die Zeit zwischen den einzelnen Kunden ist exponentialverteilt mit einer Varianz von 4 Minuten. Was ist die Wahrscheinlichkeit, dass der nächste Kunde weniger als 4 Minuten auf sich warten lässt (Ergebnis auf 4 Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: '0.8647' },
            { key: 'B', text: '0.7769' },
            { key: 'C', text: '0.2231' },
            { key: 'D', text: '0.1353' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'Var(X) = 1/λ² = 4, daher λ = 1/2. F(X=4) = 1 - e^(-λx) = 1 - e^(-1/2 × 4) = 1 - e^(-2) = 0.8647'
        },
        {
          id: 'stat-pk1-20',
          number: 20,
          points: 2,
          text: 'Sie führen mit einem vorläufigen Datensatz eine einfaktorielle Varianzanalyse durch. Danach erhalten Sie überraschend weitere Daten für die gleichen Gruppen, wodurch sich der Umfang für alle Teilstichproben jeweils um den Faktor 10 vergrössert, gleichzeitig hat sich die Schwankung innerhalb der Gruppen substanziell reduziert. Welche der folgenden Aussagen ist **nicht** korrekt?',
          choices: [
            { key: 'A', text: 'Der Freiheitsgrad des Fehlerterms hat sich erhöht.' },
            { key: 'B', text: 'Der Freiheitsgrad der Abweichungsquadrate (Treatment-Term) zwischen den Gruppen hat sich erhöht.' },
            { key: 'C', text: 'Die Summe der Abweichungen innerhalb der Gruppen ist zurückgegangen.' },
            { key: 'D', text: 'Der F-Wert hat sich verändert.' },
            { key: 'E', text: 'Der kritische Wert hat sich verändert.' }
          ],
          correct: ['B'],
          explanation: 'Der Freiheitsgrad des Treatment-Terms wird bestimmt durch die Anzahl der Gruppen, diese ist gleichgeblieben (df_treatment = k-1). Nur df_error und df_total hängen von n ab.'
        },
        {
          id: 'stat-pk1-21',
          number: 21,
          points: 2,
          text: 'Gegeben sind die Zufallsvariablen X und Y und ihre gemeinsame Wahrscheinlichkeitsfunktion f(x,y): f(0,2)=0.05, f(1,2)=0.15, f(2,2)=0.05, f(3,2)=0.05; f(0,3)=0.30, f(1,3)=0, f(2,3)=0, f(3,3)=0; f(0,4)=0.15, f(1,4)=0.15, f(2,4)=0.10, f(3,4)=0. Liegt stochastische Unabhängigkeit vor?',
          choices: [
            { key: 'A', text: 'Nein, da Cov(X,Y) = -0.15' },
            { key: 'B', text: 'Nein, da Cov(X,Y) = -0.125' },
            { key: 'C', text: 'Nein, da Cov(X,Y) = -0.10' },
            { key: 'D', text: 'Ja, da Cov(X,Y) = -0.15' },
            { key: 'E', text: 'Ja, da Cov(X,Y) = 0.' }
          ],
          correct: ['B'],
          explanation: 'E(X)=0.75, E(Y)=3.1, E(X,Y)=2.2. Cov(X,Y) = 2.2 - 0.75×3.1 = -0.125. Keine stochastische Unabhängigkeit.'
        },
        {
          id: 'stat-pk1-22',
          number: 22,
          points: 2,
          text: 'Gegeben ist das Konfidenzintervall Prob(p - z_{α/2}·√(p(1-p)/n) < π < p + z_{α/2}·√(p(1-p)/n)) = 1-α für den Anteilswert π ausgehend vom Stichprobenanteilswert p. Welche der folgenden Aussagen ist **falsch**?',
          choices: [
            { key: 'A', text: 'Der Term p(1-p)/n ist eine Schätzung des Standardfehlers σ_p.' },
            { key: 'B', text: 'Bei genügend grossem Stichprobenumfang n ist der Anteilswert p normalverteilt, wenn gilt n(1-p) ≥ 5 und np ≥ 5.' },
            { key: 'C', text: 'Die Grenzen des Konfidenzintervalls sind stochastisch.' },
            { key: 'D', text: 'Der z-Score eines gewissen Anteilswerts p einer Stichprobe ergibt sich durch die folgende Formel: z = (p-π)/σ_p.' },
            { key: 'E', text: 'Für α = 0.05 entspricht der z-Score einem Wert von 1.96.' }
          ],
          correct: ['A'],
          explanation: 'Der Term p(1-p)/n ist eine Schätzung für σ_p² (die Varianz des Stichprobenanteilswerts), nicht den Standardfehler σ_p selbst.'
        },
        {
          id: 'stat-pk1-23',
          number: 23,
          points: 2,
          text: 'Welche der nachfolgenden Aussagen trifft **nicht** auf eine Stichprobenverteilung zu?',
          choices: [
            { key: 'A', text: 'Die Verteilung der Stichprobenmittel weist den gleichen Mittelwert wie die Grundgesamtheit auf.' },
            { key: 'B', text: 'Die Standardabweichung der Verteilung des Stichprobenmittels folgt aus dem zentralen Grenzwertsatz.' },
            { key: 'C', text: 'Ist die Grundgesamtheit normalverteilt, so ist auch die Stichprobenverteilung des Mittelwerts normalverteilt.' },
            { key: 'D', text: 'Ist die Grundgesamtheit nicht normalverteilt, so gilt gemäss dem zentralen Grenzwertsatz, dass die Verteilung des Mittelwerts von unabhängigen Zufallsvariablen mit wachsendem Stichprobenumfang gegen eine Normalverteilung strebt.' },
            { key: 'E', text: 'Keine der genannten Antworten ist falsch.' }
          ],
          correct: ['E'],
          explanation: 'Alle Aussagen A-D sind korrekt.'
        },
        {
          id: 'stat-pk1-24',
          number: 24,
          points: 2,
          text: 'Ein Doktorand möchte für seine Dissertation eine Stichprobe mit dem Umfang n erheben. Er will ein Konfidenzintervall für den Mittelwert mit der Irrtumswahrscheinlichkeit α berechnen. Sein Doktorvater rät ihm, einen Stichprobenumfang n + x (x<0) und eine Irrtumswahrscheinlichkeit α/2 zu wählen. Welche Auswirkung haben diese Ratschläge auf das zu berechnende Konfidenzintervall?',
          choices: [
            { key: 'A', text: 'Das Konfidenzintervall wird enger.' },
            { key: 'B', text: 'Das Konfidenzintervall wird weiter.' },
            { key: 'C', text: 'Das Konfidenzintervall bleibt gleich.' },
            { key: 'D', text: 'Die Veränderung des Konfidenzintervalls ist unklar.' },
            { key: 'E', text: 'Das Konfidenzintervall ist nun fehlerhaft.' }
          ],
          correct: ['B'],
          explanation: 'Die Verkleinerung der Stichprobe (x<0) führt zu einem weiteren Intervall. Die Verkleinerung der Irrtumswahrscheinlichkeit (α/2 statt α) macht das Intervall ebenfalls weiter (höherer z-Wert).'
        },
        {
          id: 'stat-pk1-25',
          number: 25,
          points: 2,
          text: 'Welche Aussage über die Student t-Verteilung ist **falsch**?',
          choices: [
            { key: 'A', text: 'Im Unterschied zur Standardnormalverteilung ordnet die t-Verteilung Extremwerten eine höhere Wahrscheinlichkeit zu.' },
            { key: 'B', text: 'Mit wachsendem Stichprobenumfang n nähert sich die t-Verteilung der Standardnormalverteilung.' },
            { key: 'C', text: 'Im Unterschied zur Standardnormalverteilung ordnet die t-Verteilung dem Modus eine weniger hohe Wahrscheinlichkeit zu.' },
            { key: 'D', text: 'Der Mathematiker und Statistiker William Gosset entwickelte die t-Verteilung unter dem Pseudonym «Student».' },
            { key: 'E', text: 'Die t-Verteilung muss bei der Berechnung von Konfidenzintervallen für den Mittelwert verwendet werden, wenn die Stichprobe klein (n < 30), die Grundgesamtheit normalverteilt und wenn die Varianz bekannt ist.' }
          ],
          correct: ['E'],
          explanation: 'Die t-Verteilung würde bei kleinen Stichproben und normalverteilter Grundgesamtheit eingesetzt werden, wenn die Varianz **unbekannt** ist.'
        },
        {
          id: 'stat-pk1-26',
          number: 26,
          points: 2,
          text: 'Ein Copy-Shop druckt Visitenkarten mit einer durchschnittlichen Länge von 8.5cm und einer Standardabweichung von 0.06cm. In der letzten Stichprobe von 100 Visitenkarten beträgt die durchschnittliche Länge der Karten 8.51cm. Berechne das 95% Konfidenzintervall und beurteile, ob der Drucker der Visitenkarten fehlerfrei läuft.',
          choices: [
            { key: 'A', text: 'Das 95% Konfidenzintervall ist [8.50013, 8.51987]. Der Drucker ist mit hoher Wahrscheinlichkeit fehlerhaft.' },
            { key: 'B', text: 'Das 95% Konfidenzintervall ist [8.50013, 8.51987]. Der Drucker ist mit hoher Wahrscheinlichkeit **nicht** fehlerhaft.' },
            { key: 'C', text: 'Das 95% Konfidenzintervall ist [8.49824, 8.52176]. Der Drucker ist mit hoher Wahrscheinlichkeit fehlerhaft.' },
            { key: 'D', text: 'Das 95% Konfidenzintervall ist [8.49824, 8.52176]. Der Drucker ist mit hoher Wahrscheinlichkeit **nicht** fehlerhaft.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'x̄ ± z_{α/2} × σ/√n = 8.51 ± 1.96 × 0.06/√100 = 8.51 ± 0.01176. KI = [8.49824, 8.52176]. μ₀ = 8.5 liegt im KI → Drucker nicht fehlerhaft.'
        },
        {
          id: 'stat-pk1-27',
          number: 27,
          points: 2,
          text: 'Ein Wissenschaftler erhebt eine Stichprobe mit n = 25 Observationen aus einer normalverteilten Grundgesamtheit und berechnet einen Stichprobenmittelwert x̄ und die Standardabweichung s (σ unbekannt). Der Forscher führt einen Hypothesentest über den Mittelwert durch und errechnet einen p-Wert, der nicht zur Ablehnung seiner Nullhypothese führt. Was passiert mit dem p-Wert, wenn der Wissenschaftler den gleichen Hypothesentest erneut für eine Stichprobe mit n < 25 durchführt (x̄ und s bleibt gleich)?',
          choices: [
            { key: 'A', text: 'Der p-Wert wird kleiner.' },
            { key: 'B', text: 'Der p-Wert wird grösser.' },
            { key: 'C', text: 'Der p-Wert bleibt gleich.' },
            { key: 'D', text: 'Die Veränderung des p-Werts ist unklar.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'Der p-Wert wird grösser, da die errechnete Teststatistik bei einer kleineren Stichprobe kleiner wird. t = (x̄ - μ₀)/(s/√n) → kleineres n → kleineres |t| → grösserer p-Wert.'
        },
        {
          id: 'stat-pk1-28',
          number: 28,
          points: 2,
          text: 'Ein Wissenschaftler berechnet eine Schätzung θ̂ für den wahren Parameter θ. Für den geschätzten Parameter gilt E[θ̂] = θ. Der geschätzte Parameter ist daher:',
          choices: [
            { key: 'A', text: 'effizient' },
            { key: 'B', text: 'konsistent' },
            { key: 'C', text: 'erwartungstreu bzw. unverzerrt' },
            { key: 'D', text: 'der OLS Schätzer' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'Ein Schätzer ist dann erwartungstreu, wenn sein Erwartungswert immer gleich dem zu schätzenden Parameter ist.'
        },
        {
          id: 'stat-pk1-29',
          number: 29,
          points: 2,
          text: 'Gegeben sei eine Stichprobe, die die wöchentlichen Essensausgaben yᵢ und die wöchentlichen Einkommen xᵢ von Studenten misst. Wir wollen den Zusammenhang E[yᵢ|xᵢ] durch eine einfache lineare Regressionsanalyse valide schätzen. Welche Aussage ist in diesem Zusammenhang **falsch**?',
          choices: [
            { key: 'A', text: 'Wir nehmen an, dass E[yᵢ|xᵢ] eine lineare Funktion ist.' },
            { key: 'B', text: 'E[y|x] wollen wir auf der Stichprobe basierend schätzen.' },
            { key: 'C', text: 'yᵢ ist eine Zufallsvariable.' },
            { key: 'D', text: 'yᵢ muss normalverteilt sein.' },
            { key: 'E', text: 'eᵢ := yᵢ - E[yᵢ|xᵢ] ist der Fehlerterm unserer Schätzung.' }
          ],
          correct: ['D'],
          explanation: 'Die Residuen sollen normalverteilt sein. Die Variablen müssen nicht normalverteilt sein.'
        },
        {
          id: 'stat-pk1-30',
          number: 30,
          points: 2,
          text: 'Das Gauss-Markov Theorem sagt über den OLS-Schätzer, dass:',
          choices: [
            { key: 'A', text: 'er die kleinste Varianz aller linearen und unverzerrten Schätzer besitzt.' },
            { key: 'B', text: 'er die kleinste Kovarianz aller linearen und unverzerrten Schätzer besitzt.' },
            { key: 'C', text: 'er den grössten Erwartungswert aller linearen und unverzerrten Schätzer besitzt.' },
            { key: 'D', text: 'er der konsistenteste unter allen linearen und unverzerrten Schätzern ist.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'Die OLS Schätzer besitzen die kleinste Varianz unter allen linearen und unverzerrten Schätzern. Sie sind daher BLUE (Best Linear Unbiased Estimators).'
        },
        {
          id: 'stat-pk1-31',
          number: 31,
          points: 2,
          text: 'Eine Fast-Food-Kette untersucht den Zusammenhang zwischen Hamburgerabsatz (yᵢ in Stück) und Werbeausgaben (xᵢ in CHF). R-Output: β̂₀=74.1797, β̂₁=1.7326, SE(β̂₁)=0.8903, t=1.946, p=0.0555, df=73. Welche Aussage über das 95% Konfidenzintervall des Steigungskoeffizienten ist **richtig**?',
          choices: [
            { key: 'A', text: 'Das 95% Konfidenzintervall deckt den geschätzten Steigungskoeffizienten nicht ab.' },
            { key: 'B', text: 'Das 95% Konfidenzintervall beinhaltet Werte, welche von einem zweiseitigen t-Test auf einem Signifikanzniveau von 5% abgelehnt werden.' },
            { key: 'C', text: 'Das 95% Konfidenzintervall errechnet sich aus 1.7326 ± 1.993 × 0.8903.' },
            { key: 'D', text: 'Das 95% Konfidenzintervall zeigt uns, dass sich der geschätzte Steigungskoeffizient signifikant von Null unterscheidet.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'Unter Verwendung von t_{0.025}^{73} = 1.993 für die Berechnung der Intervallgrenzen.'
        },
        {
          id: 'stat-pk1-32',
          number: 32,
          points: 2,
          text: 'Eine Wissenschaftlerin regressiert yᵢ auf xᵢ und erhält ŷᵢ = 100 + 3.5xᵢ. Sie ändert die Zufallsvariable yᵢ zu yᵢ/100 und wiederholt die Schätzung. Welchen Wert muss die Konstante aufweisen?',
          choices: [
            { key: 'A', text: '10' },
            { key: 'B', text: '1' },
            { key: 'C', text: '0.1' },
            { key: 'D', text: '0.01' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['B'],
          explanation: 'Durch die neue Skalierung der Zufallsvariable yᵢ ändert sich die Konstante zu 100/100 = 1.'
        },
        {
          id: 'stat-pk1-33',
          number: 33,
          points: 2,
          text: 'Ein Mitglied der Gewerkschaft möchte die Gehälter durch Schulbildung erklären und geschlechtsspezifische Unterschiede miteinbeziehen: Gehaltᵢ = β₁ + β₂BILDUNGᵢ + δ₁FRAUᵢ + δ₂(BILDUNGᵢ × FRAUᵢ) + eᵢ. FRAUᵢ = 1 für weibliche Arbeitnehmerinnen, 0 für männliche. Für Frauen gilt — die Konstante ist ... und der Steigungskoeffizient ist ...',
          choices: [
            { key: 'A', text: 'Die Konstante ist β₁ und der Steigungskoeffizient ist β₂.' },
            { key: 'B', text: 'Die Konstante ist δ₁ und der Steigungskoeffizient ist δ₂.' },
            { key: 'C', text: 'Die Konstante ist (β₁ + δ₁) und der Steigungskoeffizient ist β₂.' },
            { key: 'D', text: 'Die Konstante ist (β₁ + δ₁) und der Steigungskoeffizient ist (β₂ + δ₂).' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['D'],
          explanation: 'Der Interaktionsterm erlaubt, dass sich die Steigung für Männer und Frauen unterscheidet. Für Frauen: Gehalt = (β₁+δ₁) + (β₂+δ₂)×BILDUNG.'
        },
        {
          id: 'stat-pk1-34',
          number: 34,
          points: 2,
          text: 'Ein Biologe untersucht die Maisernte mit dem Modell: Ernteᵢ = β₁ + β₂TEMPᵢ + δ₁WIRBELᵢ + δ₂(TEMPᵢ × WIRBELᵢ) + eᵢ. Er will testen, ob sich die Regressionsgeraden für Regionen mit und ohne Wirbelsturm signifikant unterscheiden. Wie lautet die mögliche Nullhypothese?',
          choices: [
            { key: 'A', text: 'H₀: δ₁ = 0' },
            { key: 'B', text: 'H₀: δ₂ = 0' },
            { key: 'C', text: 'H₀: δ₁ = δ₂ = 0' },
            { key: 'D', text: 'H₀: β₁ = β₂ = δ₁ = δ₂ = 0' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C'],
          explanation: 'δ₁ heisst keine Niveauverschiebung und δ₂ heisst gleicher Temperatureffekt, d.h. wenn beides zusammen Null, dann identische Regressionsgerade ohne/mit Wirbelsturm.'
        },
        {
          id: 'stat-pk1-35',
          number: 35,
          points: 2,
          text: 'Für eine multiple Regression mit 25 Datenpunkten und 5 unabhängigen Variablen ist SST = 500 und SSR = 300 gegeben. Berechne das F-Ratio (auf eine Nachkommastelle gerundet).',
          choices: [
            { key: 'A', text: '5.7' },
            { key: 'B', text: '6.0' },
            { key: 'C', text: '2.3' },
            { key: 'D', text: '2.4' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['A'],
          explanation: 'SSE = SST - SSR = 200. MSR = SSR/k = 300/5 = 60. MSE = SSE/(n-k-1) = 200/(25-5-1) = 10.5263. F = 60/10.5263 = 5.7'
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
          id: 'stat-pk1-36',
          number: 36,
          points: 2,
          text: 'Welche Aussagen über eine Verteilung mit positiver Schiefe in Verbindung mit dem Tschebyscheff-Theorem sind **richtig**?',
          choices: [
            { key: 'A', text: 'Laut einer der Faustregeln des Tschebyscheff-Theorems liegen 95% der Beobachtungen innerhalb von zwei Standardabweichungen um den Mittelwert dieser Verteilung.' },
            { key: 'B', text: 'Laut einer der Faustregeln des Tschebyscheff-Theorems liegen 68% der Beobachtungen innerhalb einer Standardabweichung um den Mittelwert dieser Verteilung.' },
            { key: 'C', text: 'Die obigen Faustregeln des Tschebyscheff-Theorems sind für diese Verteilung nicht gültig.' },
            { key: 'D', text: 'Das Tschebyscheff-Theorem ist für diese Verteilung gültig.' },
            { key: 'E', text: 'Keine der genannten Antworten ist korrekt.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Das Tschebyscheff-Theorem ist für jede Verteilung gültig. Die genannten Faustregeln gelten jedoch nur für glockenförmige, symmetrische Verteilungen.'
        },
        {
          id: 'stat-pk1-37',
          number: 37,
          points: 2,
          text: 'Ein 99% Konfidenzintervall für die durchschnittliche Punktezahl in einem Videospiel ist [89, 111]. Welche der folgenden Aussagen sind **falsch**?',
          choices: [
            { key: 'A', text: 'Bei 100 gleichberechneten Konfidenzintervallen erwarten wir, dass 99 den Stichproben-Mittelwert x̄ abdecken.' },
            { key: 'B', text: 'Bei 100 gleichberechneten Konfidenzintervallen erwarten wir, dass 100 den Erwartungswert μ der Grundgesamtheit abdecken.' },
            { key: 'C', text: 'Der Stichprobenmittelwert x̄ liegt innerhalb von 89 und 111 Punkten in 99% aller Stichproben.' },
            { key: 'D', text: '99% aller Spieler erreichen eine Punktezahl zwischen 89 und 111.' },
            { key: 'E', text: 'Der wahre Erwartungswert μ der Grundgesamtheit liegt zwischen 89 und 111 Punkten mit einer Wahrscheinlichkeit von 1 - 99%.' }
          ],
          correct: ['A', 'B', 'C', 'D', 'E'],
          explanation: 'Das KI deckt in 99% der Fälle den wahren Parameterwert μ ab (nicht x̄, nicht alle 100 KIs). x̄ variiert pro Stichprobe. Das KI macht keine Aussage über einzelne Spieler.'
        },
        {
          id: 'stat-pk1-38',
          number: 38,
          points: 2,
          text: 'Eine Mitgliederumfrage unter 16\'375 Illuminaten will die primären Gründe für den Beitritt zum Geheimorden erheben. Die häufigsten primären Beitrittsgründe sind: Macht M mit 7\'860, Geld G mit 2\'129 und Kontakte K mit 1\'801 Antworten. Welche der folgenden Wahrscheinlichkeiten sind **falsch** (Ergebnis auf 2 Nachkommastellen gerundet)?',
          choices: [
            { key: 'A', text: 'P(M∩G) = 0; P(G∩K) = 0 und P(M∩K) = 0' },
            { key: 'B', text: 'P(M∩G) ≠ 0; P(G∩K) ≠ 0 und P(M∩K) ≠ 0' },
            { key: 'C', text: 'P(M∪G) = 0.63' },
            { key: 'D', text: 'P(G∪K) = 0.24' },
            { key: 'E', text: 'P(M) = 0.48; P(G) = 0.13 und P(K) = 0.11' }
          ],
          correct: ['B', 'C'],
          explanation: 'Die Ereignisse M, G, K schliessen sich gegenseitig aus (nur ein primärer Beitrittsgrund pro Mitglied). P(M∩G)=0. P(M∪G) = 0.48 + 0.13 - 0.00 = 0.61 (nicht 0.63).'
        },
        {
          id: 'stat-pk1-39',
          number: 39,
          points: 2,
          text: 'Bei welchen Verteilungen ist die Punktwahrscheinlichkeit **nicht** definiert?',
          choices: [
            { key: 'A', text: 'Exponentialverteilung' },
            { key: 'B', text: 'Normalverteilung' },
            { key: 'C', text: 'Hypergeometrische Verteilung' },
            { key: 'D', text: 'Standardnormalverteilung' },
            { key: 'E', text: 'Student\'s t-Verteilung' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'Punktwahrscheinlichkeiten sind nur für diskrete Verteilungen definiert. Exponential, Normal, Standardnormal und t-Verteilung sind stetige Verteilungen.'
        },
        {
          id: 'stat-pk1-40',
          number: 40,
          points: 2,
          text: 'Welche Aussagen zur einfaktoriellen Varianzanalyse sind **richtig**?',
          choices: [
            { key: 'A', text: 'Die Varianzanalyse erlaubt den simultanen Vergleich mehrerer Mittelwerte bei sonst gleichem Ergebnis wie paarweise t-Tests.' },
            { key: 'B', text: 'Voraussetzungen sind u.a. normalverteilte Grundgesamtheiten, Varianzhomogenität und eine mindestens intervallskalierte unabhängige Variable.' },
            { key: 'C', text: 'Die Prüfgrösse berechnet sich aus dem mittleren Abweichungsquadrat zwischen den Gruppen geteilt durch das mittlere Abweichungsquadrat innerhalb der Gruppen.' },
            { key: 'D', text: 'Zur Durchführung des Verfahrens müssten die Stichproben nicht notwendigerweise gleich gross sein.' },
            { key: 'E', text: 'Die Verwerfung der Nullhypothese bedeutet, dass die Mittelwerte aller Stichproben signifikant voneinander verschieden sind.' }
          ],
          correct: ['C', 'D'],
          explanation: 'A ist falsch (ANOVA vermeidet α-Kumulierung). B ist falsch (unabhängige Variable braucht nur Nominalskala). E ist falsch (nur MINDESTENS zwei Mittelwerte unterscheiden sich).'
        }
      ]
    }
  ]
};
