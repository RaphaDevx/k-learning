window.EXAM_DATA_MAKRO_TB4 = {
  id: 'makro-tb4',
  title: 'Makro II — TB4: Inflation, Phillipskurve & NAIRU',
  course: 'MakroII',
  courseColor: '#059669',
  duration_minutes: 40,
  total_points: 40,
  exam_info: {
    date: 'Jederzeit',
    duration: '~40 Minuten',
    format: 'Multiple Choice mit Sofortfeedback',
    allowed_aids: 'Keine',
    grading: 'Sofortfeedback nach jeder Frage'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'tb4-sc',
      title: 'Seignorage-Berechnungen: Single Choice',
      description: 'Pro Frage ist genau eine Antwort richtig.',
      points: 8,
      question_type: 'single_choice',
      questions: [
        {
          id: 'makro-tb4-q03', number: 3, points: 2,
          text: 'Nimm an, der Staat wolle ein Defizit von 5% des BIP vollständig mit Seignorage finanzieren. Nimm zusätzlich an, dass die Quote von Zentralbankgeld zum BIP gleich 0.5 ist. Die Wachstumsrate der nominalen Geldmenge muss gleich ... sein. (Hinweis: Es gilt $\\text{Seignorage/BIP} = \\frac{\\Delta M}{M} \\cdot \\frac{M}{P \\cdot Y}$.)',
          choices: [
            { key: 'A', text: '0.25%' },
            { key: 'B', text: '0.5%' },
            { key: 'C', text: '2.5%' },
            { key: 'D', text: '5%' },
            { key: 'E', text: '10%' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Seignorage/BIP = $\\frac{\\Delta M}{M} \\cdot \\frac{M}{PY}$. Also $0.05 = \\frac{\\Delta M}{M} \\cdot 0.5$, woraus $\\frac{\\Delta M}{M} = \\frac{0.05}{0.5} = 10\\%$ folgt.',
          topics: ['Seignorage', 'Geldmengen-Wachstum', 'Inflation']
        },
        {
          id: 'makro-tb4-q04', number: 4, points: 2,
          text: 'Nimm an, die Quote von Zentralbankgeld zum BIP sei gleich 2 und die Wachstumsrate der nominalen Geldmenge sei 7%. Was ist die Quote von Seignorage relativ zum BIP?',
          choices: [
            { key: 'A', text: '2%' },
            { key: 'B', text: '7%' },
            { key: 'C', text: '3.5%' },
            { key: 'D', text: '14%' },
            { key: 'E', text: '28%' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D'],
          explanation: 'Seignorage/BIP = $\\frac{\\Delta M}{M} \\cdot \\frac{M}{PY} = 0.07 \\cdot 2 = 14\\%$.',
          topics: ['Seignorage', 'Geldmengen-Wachstum', 'Inflation']
        },
        {
          id: 'makro-tb4-q08', number: 8, points: 2,
          text: 'Nimm nun an, dass es keine Verpflichtung gibt. Nimm weiterhin an, dass ursprünglich $a = b = 1$, $y^* = 1.02$, $\\overline{y} = 1$ und $\\pi^* = 0.02$. Die Regierung minimiert $\\Lambda = \\frac{1}{2}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$ mit Angebotsfunktion $y = \\overline{y} + b(\\pi - \\pi^e)$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Steigung der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 1.' },
            { key: 'B', text: 'Die Steigung der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 2.' },
            { key: 'C', text: 'Die Steigung der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich $\\frac{1}{2}$.' },
            { key: 'D', text: 'Der vertikale Achsenabschnitt der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 0.04.' },
            { key: 'E', text: 'Im Gleichgewicht ist $\\pi = 0.02$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C'],
          explanation: 'Die Reaktionsfunktion lautet $\\pi = \\frac{b^2}{a + b^2} \\pi^e + \\frac{a}{a + b^2} \\pi^* + \\frac{b}{a + b^2}(y^* - \\overline{y})$. Mit $a = b = 1$: Steigung $= \\frac{1}{2}$. Achsenabschnitt $= \\frac{1}{2}(0.02) + \\frac{1}{2}(0.02) = 0.02$. Im Gleichgewicht ($\\pi = \\pi^e$): $\\pi = 0.04$, was über dem Ziel liegt (Inflationsbias).',
          topics: ['Zeitinkonsistenz', 'Reaktionsfunktion', 'Inflationsbias']
        },
        {
          id: 'makro-tb4-q10', number: 10, points: 2,
          text: 'Nimm wieder an, dass es keine Verpflichtung gibt ($a = b = 1$, $y^* = 1.02$, $\\overline{y} = 1$, $\\pi^* = 0.02$). Betrachte nun das Szenario, in dem die staatliche Verlustfunktion Inflation stärker bestraft: $a_{neu} = 2$. Die Regierung minimiert $\\Lambda = \\frac{1}{2}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$ mit $y = \\overline{y} + b(\\pi - \\pi^e)$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Verglichen mit der ursprünglichen Situation ist die Steigung der geldpolitischen Reaktionsfunktion grösser.' },
            { key: 'B', text: 'Verglichen mit der ursprünglichen Situation ändert sich die Steigung der geldpolitischen Reaktionsfunktion nicht.' },
            { key: 'C', text: 'Die Steigung der geldpolitischen Reaktionsfunktion ist nun gleich $\\frac{1}{3}$.' },
            { key: 'D', text: 'Der vertikale Achsenabschnitt der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist nun kleiner als 0.02.' },
            { key: 'E', text: 'Im Gleichgewicht ist $\\pi = 0.04$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C'],
          explanation: 'Mit $a_{neu} = 2$, $b = 1$: Steigung $= \\frac{b^2}{a + b^2} = \\frac{1}{3}$. Im Gleichgewicht $\\pi = \\pi^e$: $\\pi = 0.02 + \\frac{b(y^* - \\overline{y})}{a} = 0.02 + \\frac{1 \\cdot 0.02}{2} = 0.03$. Höheres $a$ reduziert den Inflationsbias.',
          topics: ['Zeitinkonsistenz', 'Reaktionsfunktion', 'Inflationsbias']
        }
      ]
    },
    {
      id: 'tb4-mc',
      title: 'Inflation, Phillipskurve & Geldpolitik: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen. Auch wenn nur eine Option korrekt ist, bleibt die Frage eine Mehrfachauswahl-Frage.',
      points: 32,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb4-q01', number: 1, points: 2,
          text: 'Die Phillips-Kurve ...',
          choices: [
            { key: 'A', text: 'beschreibt einen negativen Zusammenhang zwischen Output und Arbeitslosigkeit.' },
            { key: 'B', text: 'impliziert, dass wenn wir die Inflation reduzieren, die Arbeitslosigkeit sinken wird.' },
            { key: 'C', text: 'impliziert, dass unerwartete Inflation zu einer Änderung der natürlichen Arbeitslosenquote führt.' },
            { key: 'D', text: 'impliziert, dass höher als erwartete Inflation bedeutet, dass die Arbeitslosenquote unter ihrem natürlichen Niveau ist.' },
            { key: 'E', text: 'impliziert, dass wenn die Inflation wie erwartet ist, sich die Arbeitslosenquote auf ihrem natürlichen Niveau befindet.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Die Phillipskurve $\\pi_t = \\pi_t^e - \\alpha(u_t - u_n)$ zeigt: Ist $\\pi_t > \\pi_t^e$, dann ist $u_t < u_n$ (D). Ist $\\pi_t = \\pi_t^e$, dann ist $u_t = u_n$ (E). Unerwartete Inflation ändert nicht die NAIRU, und Disinflation erhöht kurzfristig die Arbeitslosigkeit.',
          topics: ['Phillipskurve', 'NAIRU', 'Inflation', 'Erwartungen']
        },
        {
          id: 'makro-tb4-q02', number: 2, points: 2,
          text: 'Markiere die wahren Aussagen zu Seignorage.',
          choices: [
            { key: 'A', text: 'Seignorage sind die realen Einnahmen des Staates durch Steuern.' },
            { key: 'B', text: 'Seignorage ist gleich Geldschöpfung geteilt durch das BIP.' },
            { key: 'C', text: 'Seignorage kann als Produkt der Wachstumsrate der nominalen Geldmenge und der realen Geldmenge beschrieben werden.' },
            { key: 'D', text: 'Seignorage ist gleich Geldschöpfung geteilt durch das Preisniveau.' },
            { key: 'E', text: 'Seignorage impliziert, dass der Staat seine Defizite mit Geldschöpfung finanzieren sollte.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Seignorage $= \\frac{\\Delta M}{P}$ (reale Einnahmen durch Geldschöpfung, also $\\Delta M / P$). Es gilt auch: $\\frac{\\Delta M}{P} = \\frac{\\Delta M}{M} \\cdot \\frac{M}{P}$, also Produkt aus Wachstumsrate der Geldmenge und realer Geldmenge (C, D). Seignorage ist keine Steuereinnahme im klassischen Sinne (A falsch).',
          topics: ['Seignorage', 'Inflation', 'Geldschöpfung']
        },
        {
          id: 'makro-tb4-q05', number: 5, points: 2,
          text: 'Markiere die wahren Aussagen zur optimalen Inflationsrate.',
          choices: [
            { key: 'A', text: 'Hohe Inflation wird typischerweise von niedriger Inflationsvolatilität begleitet.' },
            { key: 'B', text: 'Schuhsohleneffekte können als Kosten von Inflation gesehen werden.' },
            { key: 'C', text: 'Geldillusion hat einen uneindeutigen Effekt auf die optimale Inflationsrate.' },
            { key: 'D', text: 'Hohe Inflation kann einen negativen Realzins implizieren.' },
            { key: 'E', text: 'In den meisten entwickelten Volkswirtschaften ist das Inflationsziel 0%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'Schuhsohleneffekte (häufigere Bankbesuche zur Minimierung der Kassenhaltung) sind Kosten der Inflation (B). Geldillusion kann helfen, Reallöhne zu senken (Vorteil), aber schafft auch Verzerrungen (Nachteil) — der Nettoeffekt ist uneindeutig (C). Hohe Inflation kann den Nominalzins unter die Inflationsrate drücken, sodass der Realzins negativ wird (D). Typische Inflationsziele liegen bei ~2%, nicht 0% (E falsch).',
          topics: ['Inflation', 'Kosten der Inflation', 'Geldillusion', 'Schuhsohleneffekte']
        },
        {
          id: 'makro-tb4-q06', number: 6, points: 2,
          text: 'Die Lucas-Kritik ...',
          choices: [
            { key: 'A', text: 'impliziert, dass Fiskalpolitik nie das Outputniveau verändern kann.' },
            { key: 'B', text: 'besagt, dass die marginale Konsumquote in makroökonomischen Modellen als exogen behandelt werden sollte.' },
            { key: 'C', text: 'impliziert, dass wir die Effekte wirtschaftspolitischer Massnahmen nicht vom Zusammenhang aggregierter makroökonomischer Variablen in der Vergangenheit ableiten können.' },
            { key: 'D', text: 'verlangt, dass die Erwartungsbildung der Agenten explizit modelliert wird.' },
            { key: 'E', text: 'bedeutet, dass nur erwartete Änderungen wirtschaftspolitischer Variablen den Output verändern können.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Die Lucas-Kritik besagt: Wenn Agenten rational sind, ändern sie ihr Verhalten als Reaktion auf Politikänderungen — historische Zusammenhänge zwischen Variablen bleiben dann nicht stabil (C). Deshalb müssen Erwartungen explizit modelliert werden (D), statt sie aus historischen Daten abzuleiten.',
          topics: ['Lucas-Kritik', 'Rationale Erwartungen', 'Wirtschaftspolitik']
        },
        {
          id: 'makro-tb4-q07', number: 7, points: 2,
          text: 'Betrachte das vereinfachte Modell der Zeitinkonsistenz: $\\Lambda = \\frac{1}{2}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$, Angebotsfunktion $y = \\overline{y} + b(\\pi - \\pi^e)$, $\\overline{y} \\leq y^*$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Mit Verpflichtung wissen wir, dass $\\pi = \\pi^e$.' },
            { key: 'B', text: 'Mit Verpflichtung gibt es Inflationsbias.' },
            { key: 'C', text: 'Mit Verpflichtung implementiert die Zentralbank das Inflationsziel $\\pi^*$.' },
            { key: 'D', text: 'Ohne Verpflichtung gibt es Inflationsbias.' },
            { key: 'E', text: 'Ohne Verpflichtung impliziert das Gleichgewicht, dass $\\pi = \\pi^e$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D', 'E'],
          explanation: 'Mit Verpflichtung setzt die Zentralbank glaubhaft $\\pi = \\pi^* = \\pi^e$ (kein Inflationsbias). Ohne Verpflichtung: Im Gleichgewicht gilt zwar $\\pi = \\pi^e$ (Erwartungen bestätigen sich), aber die Inflation liegt über dem Ziel — das ist der Inflationsbias.',
          topics: ['Zeitinkonsistenz', 'Inflationsbias', 'Verpflichtung', 'Geldpolitik']
        },
        {
          id: 'makro-tb4-q09', number: 9, points: 2,
          text: 'Nimm an, dass es keine Verpflichtung gibt ($a = b = 1$, $y^* = 1.02$, $\\overline{y} = 1$, $\\pi^* = 0.02$). Die Regierung minimiert $\\Lambda = \\frac{1}{2}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$ mit $y = \\overline{y} + b(\\pi - \\pi^e)$. Betrachte nun $b_{neu} = 2$ (steilere Angebotskurve). Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Verglichen mit der ursprünglichen Situation ist die Steigung der geldpolitischen Reaktionsfunktion kleiner.' },
            { key: 'B', text: 'Verglichen mit der ursprünglichen Situation ändert sich die Steigung der geldpolitischen Reaktionsfunktion nicht.' },
            { key: 'C', text: 'Die Steigung der geldpolitischen Reaktionsfunktion ist nun gleich $\\frac{2}{5}$.' },
            { key: 'D', text: 'Der vertikale Achsenabschnitt der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist nun kleiner als 0.02.' },
            { key: 'E', text: 'Im Gleichgewicht ist $\\pi = 0.06$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Mit $b_{neu} = 2$, $a = 1$: Steigung $= \\frac{4}{5}$ (grösser als vorher). Achsenabschnitt $= \\frac{a}{a + b^2}(\\pi^* + \\frac{b}{a}(y^* - \\overline{y})) = \\frac{1}{5}(\\pi^* + 2 \\cdot 0.02) < 0.02$ ist plausibel. Im Gleichgewicht ($\\pi = \\pi^e$): $\\pi = \\pi^* + \\frac{b(y^* - \\overline{y})}{a} = 0.02 + \\frac{2 \\cdot 0.02}{1} = 0.06$. Höheres $b$ erhöht den Inflationsbias.',
          topics: ['Zeitinkonsistenz', 'Reaktionsfunktion', 'Inflationsbias', 'Angebotskurve']
        },
        {
          id: 'makro-tb4-q11', number: 11, points: 2,
          text: 'Betrachte eine modifizierte Verlustfunktion $\\Lambda = \\frac{1}{3}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$ (mehr Gewicht auf Inflationsabweichungen als in der Standard-Verlustfunktion). Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Ohne Verpflichtung gibt es im Gleichgewicht keinen Gesamtproduktionszuwachs durch Inflations-Überraschungen.' },
            { key: 'B', text: 'Ohne Verpflichtung wissen wir, dass $\\pi < \\pi^e$.' },
            { key: 'C', text: 'Mit Verpflichtung gibt es keinen Inflationsbias (d.h. der Bias ist 0).' },
            { key: 'D', text: 'Mit Verpflichtung ist der Inflationsbias strikt positiv.' },
            { key: 'E', text: 'Geldpolitik ohne Verpflichtung führt zu höherer Inflation.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'E'],
          explanation: 'Im Gleichgewicht ohne Verpflichtung gilt $\\pi = \\pi^e$, daher $y = \\overline{y}$ — kein Produktionszuwachs (A). Mit Verpflichtung setzt die Zentralbank das Inflationsziel durch, Bias = 0 (C). Ohne Verpflichtung liegt die Gleichgewichtsinflation über dem Ziel — Inflationsbias (E).',
          topics: ['Zeitinkonsistenz', 'Inflationsbias', 'Verpflichtung', 'Verlustfunktion']
        },
        {
          id: 'makro-tb4-q12', number: 12, points: 2,
          text: 'Verlustfunktion $\\Lambda = \\frac{1}{3}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$, keine Verpflichtung, $a = b = 1$, $y^* = 1.02$, $\\overline{y} = 1$, $\\pi^* = 0.02$. Runde auf zwei Nachkommastellen. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Steigung der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich $\\frac{1}{2}$.' },
            { key: 'B', text: 'Die Steigung der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 0.2.' },
            { key: 'C', text: 'Die Steigung der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 0.4.' },
            { key: 'D', text: 'Der vertikale Achsenabschnitt der geldpolitischen Reaktionsfunktion ist gleich 0.02.' },
            { key: 'E', text: 'Im Gleichgewicht ist $\\pi = \\pi^* = 0.02$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Mit $\\Lambda = \\frac{1}{3}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$ ergibt sich eine modifizierte Reaktionsfunktion. Die Steigung ist $\\frac{b^2 \\cdot (2/3)}{a + b^2 \\cdot (2/3)} = \\frac{2/3}{1 + 2/3} = 0.4$ (C). Der Achsenabschnitt bleibt 0.02 (D). Im Gleichgewicht liegt $\\pi$ über dem Ziel (Inflationsbias).',
          topics: ['Zeitinkonsistenz', 'Reaktionsfunktion', 'Verlustfunktion']
        },
        {
          id: 'makro-tb4-q13', number: 13, points: 2,
          text: 'Verlustfunktion $\\Lambda = \\frac{1}{3}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$, keine Verpflichtung. Ursprünglich: $a = b = 1$, $y^* = 1.02$, $\\overline{y} = 1$, $\\pi^* = 0.02$. Nun: $b_{neu} = 0.5$ (flachere Angebotskurve). Runde auf zwei Nachkommastellen. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Steigung der neuen geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 0.6.' },
            { key: 'B', text: 'Verglichen mit der ursprünglichen Situation ist die Steigung der geldpolitischen Reaktionsfunktion niedriger.' },
            { key: 'C', text: 'Der vertikale Achsenabschnitt der geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ändert sich nicht.' },
            { key: 'D', text: 'Die Steigung der neuen geldpolitischen Reaktionsfunktion $\\pi(\\pi^e)$ ist gleich 0.14.' },
            { key: 'E', text: 'Verglichen mit der ursprünglichen Situation ist die Inflation im Gleichgewicht höher.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'Mit $b_{neu} = 0.5$: neue Steigung $= \\frac{(0.5)^2 \\cdot (2/3)}{1 + (0.5)^2 \\cdot (2/3)} \\approx 0.14$ — niedriger als 0.4 (B, D). Der Achsenabschnitt ändert sich bei dieser Verlustfunktionsvariante nicht (C). Geringeres $b$ bedeutet weniger Inflationsbias, also niedrigere Gleichgewichtsinflation (E falsch).',
          topics: ['Zeitinkonsistenz', 'Reaktionsfunktion', 'Angebotskurve']
        },
        {
          id: 'makro-tb4-q14', number: 14, points: 2,
          text: 'Verlustfunktion $\\Lambda = \\frac{1}{3}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$, keine Verpflichtung. Ursprünglich: $a = b = 1$, $y^* = 1.02$, $\\overline{y} = 1$, $\\pi^* = 0.02$. Nun: $a_{neu} = 0.5$. Runde auf zwei Nachkommastellen. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Verglichen mit der ursprünglichen Situation ist die Steigung der geldpolitischen Reaktionsfunktion höher.' },
            { key: 'B', text: 'Verglichen mit der ursprünglichen Situation ist die Steigung der geldpolitischen Reaktionsfunktion niedriger.' },
            { key: 'C', text: 'Im Gleichgewicht ist $\\pi = 0.05$.' },
            { key: 'D', text: 'Der Inflationsbias ist grösser als 0.03.' },
            { key: 'E', text: 'Verglichen mit der ursprünglichen Situation ist der vertikale Achsenabschnitt der neuen geldpolitischen Reaktionsfunktion höher.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C'],
          explanation: 'Niedrigeres $a$ bedeutet weniger Gewicht auf Inflation — die Reaktionsfunktion reagiert stärker auf Erwartungen (höhere Steigung, A). Im Gleichgewicht: $\\pi = \\pi^* + \\frac{b(y^* - \\overline{y})}{a_{eff}} = 0.02 + \\frac{2/3 \\cdot 0.02}{0.5} \\approx 0.05$ (C). Inflationsbias = 0.03, also nicht grösser (D falsch).',
          topics: ['Zeitinkonsistenz', 'Reaktionsfunktion', 'Inflationsbias']
        },
        {
          id: 'makro-tb4-q15', number: 15, points: 2,
          text: 'Markiere die wahren Aussagen zur Seignorage.',
          choices: [
            { key: 'A', text: 'Für eine gegebene Wachstumsrate der nominalen Geldmenge hängt Seignorage positiv von der gehaltenen Geldmenge (Geldbasis) ab.' },
            { key: 'B', text: 'Seignorage ist die nominale Einnahme der Regierung durch Geldschöpfung.' },
            { key: 'C', text: 'Seignorage ist die reale Einnahme der Regierung durch Steuern.' },
            { key: 'D', text: 'Seignorage ist die reale Einnahme der Regierung durch Geldschöpfung.' },
            { key: 'E', text: 'Für eine gegebene gehaltene Geldmenge (Geldbasis) hängt Seignorage negativ von der Wachstumsrate der nominalen Geldmenge ab.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D'],
          explanation: 'Seignorage $= \\frac{\\Delta M}{P} = \\frac{\\Delta M}{M} \\cdot \\frac{M}{P}$: reale Einnahme durch Geldschöpfung (D). Für gegebene Wachstumsrate steigt Seignorage mit der Geldbasis $M/P$ (A). Seignorage ist nominal, nicht real — nein, sie ist real: $\\Delta M / P$ (B falsch, weil dort "nominal" steht).',
          topics: ['Seignorage', 'Geldschöpfung', 'Inflation']
        },
        {
          id: 'makro-tb4-q16', number: 16, points: 2,
          text: 'Markiere die wahren Aussagen über die Vorteile der Inflation.',
          choices: [
            { key: 'A', text: 'Seignorage spielt eine vernachlässigbare Rolle für entwickelte Volkswirtschaften.' },
            { key: 'B', text: 'Geldillusion kann dabei helfen, Reallöhne zu senken.' },
            { key: 'C', text: 'Niedrige Inflation mindert im Falle einer Rezession das Risiko, die Untergrenze des Nominalzinses zu erreichen.' },
            { key: 'D', text: 'Permanent niedrige Inflation könnte wegen der Untergrenze des Nominalzinses die Fähigkeit der Zentralbank mindern, die Realzinsen zu senken.' },
            { key: 'E', text: 'Eine Volkswirtschaft mit einer höheren durchschnittlichen Inflation könnte mehr geldpolitischen Spielraum haben, um die Gesamtproduktion in einer Rezession zu stabilisieren.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'Seignorage ist in entwickelten Ländern marginal (A). Geldillusion erlaubt nominale Lohnrigiditäten bei sinkenden Reallöhnen — ein Vorteil für Arbeitsmärkte (B). Niedrige Inflation erhöht die Wahrscheinlichkeit, die Nullzinsgrenze zu erreichen und begrenzt den geldpolitischen Spielraum (D, E). C ist falsch: niedrige Inflation erhöht das Risiko, die Nullzinsgrenze zu erreichen.',
          topics: ['Inflation', 'Geldpolitik', 'Nullzinsgrenze', 'Geldillusion']
        },
        {
          id: 'makro-tb4-q17', number: 17, points: 2,
          text: 'Markiere die wahren Aussagen über die Kosten der Inflation.',
          choices: [
            { key: 'A', text: 'Inflation macht es für Wirtschaftssubjekte leichter, die Änderung des Realeinkommens im Zeitablauf zu verfolgen.' },
            { key: 'B', text: 'Volatilität der Inflation impliziert, dass Investoren gegen hohe Inflation versichert sind, wenn sie nominale Anleihen kaufen.' },
            { key: 'C', text: 'Die schleichende Steuerprogression beschreibt den Effekt, dass Steuerpflichtige aufgrund von steigendem Nominaleinkommen (und nicht Realeinkommen) in eine höhere Steuerklasse rutschen.' },
            { key: 'D', text: 'Steuern auf Kapitalgewinne für Vermögensgegenstände mit höherem realen Wert sind eine Form von Steuerverzerrung aufgrund von Inflation.' },
            { key: 'E', text: 'Schuhsohleneffekte sind gewöhnlich klein in Zeiten mit moderater Inflation.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: 'Kalte Progression (schleichende Steuerprogression): nominale Lohnerhöhung durch Inflation schiebt in höhere Steuerklasse, ohne dass das Realeinkommen steigt (C). Bei moderater Inflation sind Schuhsohleneffekte gering (E). Inflation erschwert die Verfolgung des Realeinkommens (A falsch). Nominale Anleihen schützen nicht vor Inflation (B falsch).',
          topics: ['Inflation', 'Kosten der Inflation', 'Schuhsohleneffekte', 'Steuerverzerrung']
        },
        {
          id: 'makro-tb4-q18', number: 18, points: 2,
          text: 'Markiere die wahren Aussagen über rationale Erwartungen.',
          choices: [
            { key: 'A', text: 'Vor der Einführung von rationalen Erwartungen in ökonomischen Modellen dachte man, Wirtschaftspolitik sei das Resultat eines Spieles zwischen Wirtschaftsakteuren und politischen Entscheidungsträgern.' },
            { key: 'B', text: 'In der Realität agieren Menschen, Firmen und Akteure am Finanzmarkt immer rational, d.h. sie verwenden ihr Wissen, so gut sie können.' },
            { key: 'C', text: 'Die Lucas-Kritik besagt, dass vergangene Zusammenhänge zwischen Variablen gut geeignet sind, um die Effektivität von neuen wirtschaftspolitischen Massnahmen zu schätzen.' },
            { key: 'D', text: 'Rationale Erwartungen können implizieren, dass das Konsumverhalten unvorhersehbar ist, d.h. dass Konsum einem Random Walk folgt.' },
            { key: 'E', text: 'Die Lucas-Kritik besagt, dass aggregierte makroökonomische Modelle, die nicht mikrofundiert sind, sich nicht dazu eignen, die Effektivität neuer wirtschaftspolitischer Massnahmen zu schätzen, weil diese Massnahmen das Verhalten von Akteuren in der Volkswirtschaft verändern könnten.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Rationale Erwartungen und die Permanente-Einkommens-Hypothese implizieren, dass Konsum einem Random Walk folgt — zukünftige Konsumschwankungen sind unvorhersehbar (D). Die Lucas-Kritik fordert mikrofundierte Modelle, weil Politikänderungen das Verhalten der Agenten verändern (E). C ist das Gegenteil der Lucas-Kritik.',
          topics: ['Rationale Erwartungen', 'Lucas-Kritik', 'Random Walk', 'Konsum']
        },
        {
          id: 'makro-tb4-q19', number: 19, points: 2,
          text: 'Nimm an, dass die Phillips-Kurve $\\pi_t = \\pi_t^e - \\alpha(u_t - u_n)$ gilt. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Phillips-Kurve und rationale Erwartungen implizieren, dass Entscheidungsträger den Trade-Off zwischen Inflation und Arbeitslosigkeit nicht systematisch ausnutzen können.' },
            { key: 'B', text: 'Eine Zunahme der Arbeitslosigkeit erhöht auch die Inflation.' },
            { key: 'C', text: 'Die Phillips-Kurve impliziert, dass, wenn das Inflationsniveau den Erwartungen entspricht, die Arbeitslosenrate auf ihrem natürlichen Niveau ist.' },
            { key: 'D', text: 'Ein unerwarteter Inflationsanstieg senkt die Arbeitslosigkeit.' },
            { key: 'E', text: 'Entscheidungsträger können Inflationserwartungen kontrollieren und deshalb auch das Verhältnis zwischen Inflation und Arbeitslosigkeit.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'Mit rationalen Erwartungen antizipieren Agenten die Politik — ein systematischer Trade-off existiert nicht mehr (A). Ist $\\pi_t = \\pi_t^e$, folgt $u_t = u_n$ (C). Ist $\\pi_t > \\pi_t^e$ (unerwartete Inflation), dann $u_t < u_n$ (D). Steigende Arbeitslosigkeit ($u_t > u_n$) senkt die Inflation — nicht erhöht sie (B falsch).',
          topics: ['Phillipskurve', 'NAIRU', 'Rationale Erwartungen', 'Inflation', 'Arbeitslosigkeit']
        },
        {
          id: 'makro-tb4-q20', number: 20, points: 2,
          text: 'Betrachte das vereinfachte Modell der Zeitinkonsistenz: $\\Lambda = \\frac{1}{2}(y - y^*)^2 + \\frac{1}{2}a(\\pi - \\pi^*)^2$, $y = \\overline{y} + b(\\pi - \\pi^e)$, $\\overline{y} < y^*$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Mit Verpflichtung minimiert die Zentralbank die Verlustfunktion, wenn sie $\\pi = \\pi^e$ setzt.' },
            { key: 'B', text: 'Mit Verpflichtung wissen wir, dass $\\pi < \\pi^e$.' },
            { key: 'C', text: 'Mit Verpflichtung gibt es keinen Inflationsbias (d.h. der Bias ist 0).' },
            { key: 'D', text: 'Mit Verpflichtung minimiert die Zentralbank die Verlustfunktion, wenn sie $\\pi = \\pi^*$ setzt.' },
            { key: 'E', text: 'Geldpolitik ohne Verpflichtung führt zu höherer Inflation.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: 'Mit Verpflichtung setzt die Zentralbank glaubhaft $\\pi = \\pi^*$ (D) — Agenten erwarten dies, kein Inflationsbias (C). Ohne Verpflichtung führt die diskretionäre Optimierung zu $\\pi > \\pi^*$ (Inflationsbias, E). A ist unvollständig: Mit Verpflichtung gilt $\\pi = \\pi^* = \\pi^e$, nicht einfach $\\pi = \\pi^e$.',
          topics: ['Zeitinkonsistenz', 'Inflationsbias', 'Verpflichtung', 'Geldpolitik']
        }
      ]
    }
  ]
};
