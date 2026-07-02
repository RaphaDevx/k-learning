window.EXAM_DATA_MAKRO_TB6 = {
  id: 'makro-tb6',
  title: 'Makro II — TB6: Staatsverschuldung & Fiskalregeln',
  course: 'MakroII',
  courseColor: '#059669',
  duration_minutes: 40,
  total_points: 40,
  exam_info: {
    date: 'Jederzeit',
    duration: '~40 Minuten',
    format: 'Single Choice + Multiple Choice mit Sofortfeedback',
    allowed_aids: 'Keine',
    grading: 'Sofortfeedback nach jeder Frage'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'tb6-sc',
      title: 'Schuldenquoten-Gleichgewicht: Single Choice',
      description: 'Pro Frage ist genau eine Antwort richtig.',
      points: 12,
      question_type: 'single_choice',
      questions: [
        {
          id: 'makro-tb6-q01', number: 1, points: 2,
          text: 'Betrachte ein Land mit einem Primärüberschuss von 6% (in Prozent des BIP), realem Outputwachstum von 6% und einem realen Zinssatz von 4%. Was ist die langfristige Gleichgewichtsschuldenquote?',
          choices: [
            { key: 'A', text: '3%' },
            { key: 'B', text: '−3%' },
            { key: 'C', text: '−300%' },
            { key: 'D', text: '300%' },
            { key: 'E', text: '100%' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C'],
          explanation: 'Im Gleichgewicht gilt $\\Delta b = 0$, also $b^* = -(t-g)/(r-y) = -0.06/(0.04-0.06) = -0.06/(-0.02) = 3$. Da wir einen Primärüberschuss haben ($t > g$, d.h. $t - g = 6\\%$) und $r < y$, ist $b^* = -6\\%/(-2\\%) = -300\\%$.',
          topics: ['Staatsverschuldung', 'Schuldenquoten-Dynamik', 'Gleichgewichtsschuldenquote']
        },
        {
          id: 'makro-tb6-q04', number: 4, points: 2,
          text: 'Laut dem Ricardianischen Äquivalenztheorem...',
          choices: [
            { key: 'A', text: 'hat eine Erhöhung der Staatsausgaben einen negativen Effekt auf den privaten Konsum.' },
            { key: 'B', text: 'ist eine Reduzierung der Steuern gleichzusetzen mit einer Reduzierung der Staatsausgaben.' },
            { key: 'C', text: 'ist eine durch Steuern finanzierte Erhöhung der Staatsausgaben einer schuldenfinanzierten Erhöhung der Staatsausgaben vorzuziehen.' },
            { key: 'D', text: 'sollten Steuern reduziert werden.' },
            { key: 'E', text: 'hat der Finanzierungsmix für einen vorgegebenen Pfad der Staatsausgaben keinen Effekt auf den privaten Konsum.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Das Ricardianische Äquivalenztheorem besagt: Ob Staatsausgaben durch Steuern oder Schulden finanziert werden, ist für den privaten Konsum irrelevant. Rationale Haushalte antizipieren künftige Steuern und sparen heute entsprechend mehr.',
          topics: ['Staatsverschuldung', 'Ricardianische Äquivalenz', 'Fiskalpolitik']
        },
        {
          id: 'makro-tb6-q05', number: 5, points: 2,
          text: 'Nimm an, dass risikoneutrale Investoren entscheiden, ob sie in eine risikolose Anleihe mit Zinssatz $i^0$ oder in eine Staatsanleihe mit Ausfallrisiko investieren. Die Wahrscheinlichkeit, dass Investoren ihr Investment in die Staatsanleihe verlieren (einschliesslich der Zinszahlungen) ist $\\omega$. Mit Wahrscheinlichkeit $1 - \\omega$ erhalten die Investoren den Zinssatz $i$ als Ertrag. Nimm an, dass die Ausfallwahrscheinlichkeit des Landes gegeben ist durch $\\omega = \\omega^0 + \\beta \\cdot i$. Für $\\omega^0 = \\beta = 0.25$ und $i^0 = 0$, markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Es gibt exakt einen Gleichgewichtszinssatz.' },
            { key: 'B', text: 'Es gibt exakt einen Gleichgewichtszinssatz, nämlich $i = 0\\%$.' },
            { key: 'C', text: 'Es gibt exakt einen Gleichgewichtszinssatz, nämlich $i = 50\\%$.' },
            { key: 'D', text: 'Ein Gleichgewicht existiert bei $i = 0\\%$.' },
            { key: 'E', text: 'Ein Gleichgewicht existiert bei $i = 25\\%$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A'],
          explanation: 'Die Arbitrage-Bedingung lautet $(1-\\omega) \\cdot (1+i) = 1 + i^0$. Mit $\\omega = 0.25 + 0.25i$ und $i^0 = 0$ ergibt sich eine quadratische Gleichung mit genau einer reellen Lösung im zulässigen Bereich. Es gibt exakt einen Gleichgewichtszinssatz (die Kurven berühren sich tangential).',
          topics: ['Staatsverschuldung', 'Ausfallrisiko', 'Staatsanleihen-Gleichgewicht']
        },
        {
          id: 'makro-tb6-q07', number: 7, points: 2,
          text: 'Die dynamische Staatsverschuldungsgleichung sei gegeben durch $\\Delta b = g - t + (r - y)b$. Nimm an, dass $t = 10\\%$, $y = 1\\%$, $r = 0.5\\%$ und $g = 11\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote kann nicht stabil sein, weil der Staat konstant mehr ausgibt, als er einnimmt ($g > t$).' },
            { key: 'B', text: 'Die Defizitquote im Gleichgewicht ist gleich 11%.' },
            { key: 'C', text: 'Die Gleichgewichtsschuldenquote ist gleich −200%.' },
            { key: 'D', text: 'Die Defizitquote im Gleichgewicht ist gleich 2%.' },
            { key: 'E', text: 'Die Defizitquote im Gleichgewicht ist gleich 1%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D'],
          explanation: 'Im Gleichgewicht: $b^* = (g-t)/(y-r) = (11\\%-10\\%)/(1\\%-0.5\\%) = 1\\%/0.5\\% = 200\\%$. Die Defizitquote im Gleichgewicht: $\\Delta B/Y = y \\cdot b^* = 1\\% \\times 200\\% = 2\\%$. Auch wenn $g > t$, ist die Schuldenquote stabil, da $r < y$.',
          topics: ['Staatsverschuldung', 'Schuldenquoten-Dynamik', 'Defizitquote']
        },
        {
          id: 'makro-tb6-q11', number: 11, points: 2,
          text: 'Betrachte ein Land mit einem Primärüberschuss von 1% (in Prozent des BIP), realem Outputwachstum von 3% und einem Realzins von 1%. Was ist die langfristige Gleichgewichtsschuldenquote?',
          choices: [
            { key: 'A', text: '50%' },
            { key: 'B', text: '−500%' },
            { key: 'C', text: '−200%' },
            { key: 'D', text: '5%' },
            { key: 'E', text: '−50%' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Im Gleichgewicht gilt $b^* = -(t-g)/(r-y)$. Mit Primärüberschuss $= t - g = 1\\%$, $r = 1\\%$, $y = 3\\%$: $b^* = -1\\%/(1\\%-3\\%) = -1\\%/(-2\\%) = -50\\%$. Da $r < y$, ist das Gleichgewicht stabil.',
          topics: ['Staatsverschuldung', 'Gleichgewichtsschuldenquote', 'Schuldenquoten-Dynamik']
        },
        {
          id: 'makro-tb6-q15', number: 15, points: 2,
          text: 'Betrachte ein Land mit einem Primärdefizit von 1% (in Prozent des BIP), einem realen Produktionswachstum von 4% und einem realen Zinssatz von 2%. Wie hoch ist die langfristige Gleichgewichtsschuldenquote?',
          choices: [
            { key: 'A', text: '−50%' },
            { key: 'B', text: '50%' },
            { key: 'C', text: '500%' },
            { key: 'D', text: '−200%' },
            { key: 'E', text: '5%' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: 'Mit Primärdefizit: $g - t = 1\\%$, $r = 2\\%$, $y = 4\\%$: $b^* = (g-t)/(y-r) = 1\\%/(4\\%-2\\%) = 1\\%/2\\% = 50\\%$. Da $r < y$, ist das Gleichgewicht stabil.',
          topics: ['Staatsverschuldung', 'Gleichgewichtsschuldenquote', 'Primärdefizit']
        }
      ]
    },
    {
      id: 'tb6-mc',
      title: 'Staatsverschuldung & Schuldenquoten-Dynamik: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen.',
      points: 28,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb6-q02', number: 2, points: 2,
          text: 'Die dynamische Staatsverschuldungsgleichung ist gegeben durch $\\Delta b = g - t + (r - y)b$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist stabil falls $r > g$.' },
            { key: 'B', text: 'Die Gleichgewichtsschuldenquote ist stabil falls $g < y$.' },
            { key: 'C', text: 'Die Gleichgewichtsschuldenquote ist positiv falls $r < y$ und $g < t$.' },
            { key: 'D', text: 'Bei einem Primärdefizit wächst das Niveau der Schulden $B$ im langfristigen Gleichgewicht bei hohem Wachstum ($y > r$).' },
            { key: 'E', text: 'Wenn $g = t$, dann ist das Niveau der Schulden $B$ bei hohem Wachstum ($y > r$) konstant im langfristigen Gleichgewicht.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Stabilität hängt vom Vorzeichen von $(r - y)$ ab: stabil wenn $r < y$. Bei $g > t$ (Primärdefizit) und $r < y$ ist $b^* > 0$; die Schulden wachsen im Gleichgewicht mit der Rate $y$ (D). Bei $g = t$ und $r < y$: $b^* = 0$, d.h. $B$ ist im Gleichgewicht konstant (E).',
          topics: ['Staatsverschuldung', 'Schuldenquoten-Dynamik', 'Stabilitätsbedingung']
        },
        {
          id: 'makro-tb6-q03', number: 3, points: 2,
          text: 'Die dynamische Gleichung der Staatsverschuldung sei gegeben durch $\\Delta b = g - t + (r - y)b$. Nimm an, dass $t = 3\\%$, $y = 4\\%$, $r = 2\\%$ und $g = 2\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist stabil.' },
            { key: 'B', text: 'Die Defizitquote im Gleichgewicht ist 2%.' },
            { key: 'C', text: 'Die Gleichgewichtsschuldenquote ist −50%.' },
            { key: 'D', text: 'Die Defizitquote im Gleichgewicht ist −2%.' },
            { key: 'E', text: 'Die Gleichgewichtsschuldenquote ist instabil.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'Da $r < y$ (2% < 4%), ist das Gleichgewicht stabil (A). $b^* = (g-t)/(y-r) = (2\\%-3\\%)/(4\\%-2\\%) = -1\\%/2\\% = -50\\%$ (C). Defizitquote: $y \\cdot b^* = 4\\% \\times (-50\\%) = -2\\%$ (D, also Überschuss).',
          topics: ['Staatsverschuldung', 'Schuldenquoten-Dynamik', 'Gleichgewichtsschuldenquote']
        },
        {
          id: 'makro-tb6-q06', number: 6, points: 2,
          text: 'Die dynamische Staatsverschuldungsgleichung lautet: $\\Delta b = g - t + (r - y)b$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist instabil, wenn $r > g$.' },
            { key: 'B', text: 'Die Gleichgewichtsschuldenquote ist stabil, wenn $g < t$.' },
            { key: 'C', text: 'Die Gleichgewichtsschuldenquote ist negativ, wenn $r < y$ und $g < t$.' },
            { key: 'D', text: 'Die Gleichgewichtsschuldenquote ist positiv, wenn $r < y$ und $g > t$.' },
            { key: 'E', text: 'Der vertikale Achsenabschnitt der Phasenlinie $\\Delta b(b)$ ist positiv, wenn $g > t$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: 'Stabilität hängt von $(r - y)$ ab, nicht von $g$ vs. $t$. Wenn $r < y$, ist die Steigung der Phasenlinie negativ → stabil. $b^* = (g-t)/(y-r)$: bei $g < t$ und $r < y$ ist $b^* < 0$ (C); bei $g > t$ und $r < y$ ist $b^* > 0$ (D). Der $y$-Achsenabschnitt ist $\\Delta b(0) = g - t > 0$ wenn $g > t$ (E).',
          topics: ['Staatsverschuldung', 'Phasenlinie', 'Stabilitätsbedingung']
        },
        {
          id: 'makro-tb6-q08', number: 8, points: 2,
          text: 'Die dynamische Gleichung sei $\\Delta b = g - t + (r - y)b$ mit $t = 10\\%$, $y = 1\\%$, $r = 0.5\\%$. Der Staat führt ein Austeritätsprogramm durch und senkt die Ausgaben um die Hälfte auf $g_{neu} = 5.5\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Defizitquote im Gleichgewicht steigt um sieben Prozentpunkte.' },
            { key: 'B', text: 'Die Defizitquote im Gleichgewicht sinkt um sieben Prozentpunkte.' },
            { key: 'C', text: 'Die Phasenlinie $\\Delta b(b)$ verschiebt sich nach unten.' },
            { key: 'D', text: 'Die Defizitquote im Gleichgewicht ist jetzt negativ.' },
            { key: 'E', text: 'Die Gleichgewichtsschuldenquote ist instabil.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Durch die Senkung von $g$ auf 5.5% gilt nun $g < t$ (Primärüberschuss). Der $y$-Achsenabschnitt $g - t = 5.5\\% - 10\\% = -4.5\\% < 0$, die Phasenlinie verschiebt nach unten (C). Da $r < y$ bleibt das Gleichgewicht stabil und $b^* < 0$, was eine negative Defizitquote impliziert (D).',
          topics: ['Staatsverschuldung', 'Austerität', 'Phasenlinie', 'Defizitquote']
        },
        {
          id: 'makro-tb6-q09', number: 9, points: 2,
          text: 'Die dynamische Staatsverschuldungsgleichung lautet: $\\Delta b = g - t + (r - y)b$. Nimm an, dass $t = 2\\%$, $y = 1\\%$, $r = 3\\%$ und $g = 5\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist nicht stabil, weil der Realzins höher ist als das Wachstum der realen Gesamtproduktion ($r > y$).' },
            { key: 'B', text: 'Die Gleichgewichtsschuldenquote ist stabil, weil die Staatsausgaben höher sind als die Steuereinnahmen ($g > t$).' },
            { key: 'C', text: 'Eine kleine Abweichung von der Gleichgewichtsschuldenquote impliziert eine Divergenz weg von ihr.' },
            { key: 'D', text: 'Die Gleichgewichtsschuldenquote ist gleich −200%.' },
            { key: 'E', text: 'Die Haushaltspolitik der Regierung impliziert eine Primärdefizitquote von 3%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'E'],
          explanation: 'Da $r > y$ (3% > 1%), ist die Steigung der Phasenlinie positiv → instabiles Gleichgewicht (A, C). Das Primärdefizit beträgt $g - t = 5\\% - 2\\% = 3\\%$ (E). Die Gleichgewichtsschuldenquote liegt zwar bei $b^* = (g-t)/(y-r) = 3\\%/(1\\%-3\\%) = -150\\%$, ist aber instabil.',
          topics: ['Staatsverschuldung', 'Stabilitätsbedingung', 'Primärdefizit']
        },
        {
          id: 'makro-tb6-q10', number: 10, points: 2,
          text: 'Die dynamische Gleichung lautet $\\Delta b = g - t + (r - y)b$ mit $t = 2\\%$, $y = 1\\%$, $g = 5\\%$. Die Zentralbank senkt den Zins auf $r_{neu} = 0.5\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist gleich −600%.' },
            { key: 'B', text: 'Die Schuldenquote am vertikalen Achsenabschnitt von $\\Delta b(b)$ im Phasendiagramm ändert sich nicht.' },
            { key: 'C', text: 'Die Gleichgewichtsschuldenquote ist nach der Änderung des Zinses auf $r_{neu}$ stabil.' },
            { key: 'D', text: 'Die Defizitquote im Gleichgewicht ist gleich 6%.' },
            { key: 'E', text: 'Die Steigung von $\\Delta b(b)$ im Phasendiagramm ist negativ.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D', 'E'],
          explanation: 'Der $y$-Achsenabschnitt $\\Delta b(0) = g - t = 5\\% - 2\\% = 3\\%$ ändert sich nicht (B). Da $r_{neu} = 0.5\\% < y = 1\\%$, ist die Steigung $r_{neu} - y = -0.5\\% < 0$ (E), also stabiles Gleichgewicht (C). $b^* = 3\\%/(1\\%-0.5\\%) = 600\\%$. Defizitquote: $y \\cdot b^* = 1\\% \\times 600\\% = 6\\%$ (D).',
          topics: ['Staatsverschuldung', 'Geldpolitik', 'Phasenlinie', 'Defizitquote']
        },
        {
          id: 'makro-tb6-q12', number: 12, points: 2,
          text: 'Risikoneutrale Investoren entscheiden, ob sie in eine risikolose Anleihe mit Zinssatz $i^0$ oder in eine Staatsanleihe mit Ausfallwahrscheinlichkeit $\\omega = \\omega^0 + \\beta \\cdot i$ investieren. Mit Wahrscheinlichkeit $\\omega$ verlieren sie das Investment. Für $\\omega^0 = 0$, $\\beta = 0.5$ und $i^0 = 0.1$, markiere die wahren Aussagen (Ergebnis auf zwei Nachkommastellen runden).',
          choices: [
            { key: 'A', text: 'Es gibt exakt einen Gleichgewichtszins.' },
            { key: 'B', text: 'Es gibt zwei Gleichgewichtszinssätze.' },
            { key: 'C', text: 'Ein Gleichgewichtszins ist $i = 72.36\\%$.' },
            { key: 'D', text: 'Ein Gleichgewichtszins ist $i = 7.24\\%$.' },
            { key: 'E', text: 'Ein Gleichgewichtszins ist $i = 27.64\\%$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'E'],
          explanation: 'Die Arbitrage-Bedingung $(1-\\omega)(1+i) = 1 + i^0$ mit $\\omega = 0.5i$ ergibt $(1 - 0.5i)(1+i) = 1.1$, also eine quadratische Gleichung mit zwei Lösungen: $i \\approx 27.64\\%$ (stabiles Gleichgewicht) und $i \\approx 72.36\\%$ (instabiles Gleichgewicht).',
          topics: ['Staatsverschuldung', 'Ausfallrisiko', 'Multiple Gleichgewichte', 'Staatsanleihen']
        },
        {
          id: 'makro-tb6-q13', number: 13, points: 2,
          text: 'Risikoneutrale Anleger entscheiden zwischen risikoloser Anleihe ($i^0$) und Staatsanleihe mit $\\omega = \\omega^0 + \\beta \\cdot i$. Für $\\omega^0 = 0.01$, $\\beta = 0.4$ und $i^0 = 0.2$, markiere die richtigen Antworten (Ergebnis in Prozent, zwei Dezimalstellen).',
          choices: [
            { key: 'A', text: 'Es gibt ein Gleichgewicht bei $i = 60\\%$.' },
            { key: 'B', text: 'Es gibt ein Gleichgewicht bei $i = 87.50\\%$.' },
            { key: 'C', text: 'Das stabile Gleichgewicht liegt bei $i = 60\\%$.' },
            { key: 'D', text: 'Das stabile Gleichgewicht liegt bei $i = 87.50\\%$.' },
            { key: 'E', text: 'Es gibt zwei Gleichgewichtszinssätze mit endlichen, strikt positiven Werten.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C', 'E'],
          explanation: 'Mit $\\omega = 0.01 + 0.4i$ und $i^0 = 0.2$ ergibt die Arbitrage-Bedingung zwei Lösungen: $i = 60\\%$ (stabiles Gleichgewicht) und $i = 87.5\\%$ (instabiles Gleichgewicht). Das stabile liegt beim niedrigeren Zinssatz (C).',
          topics: ['Staatsverschuldung', 'Ausfallrisiko', 'Multiple Gleichgewichte']
        },
        {
          id: 'makro-tb6-q14', number: 14, points: 2,
          text: 'Ausgangslage: $\\omega^0 = 0.01$, $\\beta = 0.4$, $i^0 = 0.2$. Nun gilt $\\beta_{neu} = 0.3$. Markiere die richtigen Antworten (Ergebnis in Prozent, zwei Dezimalstellen).',
          choices: [
            { key: 'A', text: 'Im Vergleich zum ursprünglichen stabilen Gleichgewicht liegt das neue stabile Gleichgewicht bei einem höheren Zinssatz.' },
            { key: 'B', text: 'Es gibt nur einen Gleichgewichtszinssatz.' },
            { key: 'C', text: 'Im Vergleich zum ursprünglichen stabilen Gleichgewicht liegt das neue stabile Gleichgewicht bei einem niedrigeren Zinssatz.' },
            { key: 'D', text: 'Es gibt ein neues Gleichgewicht bei $i = 87.50\\%$.' },
            { key: 'E', text: 'Es gibt ein neues Gleichgewicht bei $i = 36.10\\%$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: 'Ein niedrigeres $\\beta$ bedeutet, dass der Zinsanstieg die Ausfallwahrscheinlichkeit weniger stark erhöht. Das stabile Gleichgewicht verschiebt sich nach unten — ein niedrigeres $i$ (C). Mit $\\omega = 0.01 + 0.3i$ und $i^0 = 0.2$ liegt das neue stabile Gleichgewicht bei ca. $i = 36.10\\%$.',
          topics: ['Staatsverschuldung', 'Ausfallrisiko', 'Multiple Gleichgewichte', 'Komparative Statik']
        },
        {
          id: 'makro-tb6-q16', number: 16, points: 2,
          text: 'Die dynamische Staatsverschuldungsgleichung lautet: $\\Delta b = g - t + (r - y)b$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist positiv, wenn $r < y$ und $g > t$.' },
            { key: 'B', text: 'Ein Primärdefizit bedeutet, dass die Staatsausgaben die Steuereinnahmen des Staates übersteigen, d.h. $g > t$.' },
            { key: 'C', text: 'Ein Primärdefizit bedeutet, dass die Staatsausgaben geringer sind als die Steuereinnahmen des Staates, d.h. $g < t$.' },
            { key: 'D', text: 'Die Gleichgewichtsschuldenquote ist instabil, wenn $r > y$.' },
            { key: 'E', text: 'Die Gleichgewichtsschuldenquote ist immer stabil, wenn $g > t$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D'],
          explanation: 'Bei $r < y$ und $g > t$: $b^* = (g-t)/(y-r) > 0$ (A). Primärdefizit = Ausgaben übersteigen Einnahmen, also $g > t$ (B). Instabilität tritt auf, wenn $r > y$, weil die Steigung der Phasenlinie dann positiv ist (D).',
          topics: ['Staatsverschuldung', 'Primärdefizit', 'Stabilitätsbedingung']
        },
        {
          id: 'makro-tb6-q17', number: 17, points: 2,
          text: 'Die dynamische Gleichung lautet $\\Delta b = g - t + (r - y)b$. Nimm an, dass $t = 1\\%$, $y = 4\\%$, $r = 2\\%$ und $g = 3\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Gleichgewichtsschuldenquote ist gleich 100%.' },
            { key: 'B', text: 'Der Staatshaushalt impliziert eine Primärüberschussquote von 2%.' },
            { key: 'C', text: 'Der Staatshaushalt impliziert eine Primärdefizitquote von 2%.' },
            { key: 'D', text: 'Die Gleichgewichtsschuldenquote ist stabil, weil der reale Zinssatz niedriger ist als das reale Produktionswachstum ($r < y$).' },
            { key: 'E', text: 'Die Gleichgewichtsschuldenquote ist gleich −100%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: '$b^* = (g-t)/(y-r) = (3\\%-1\\%)/(4\\%-2\\%) = 2\\%/2\\% = 100\\%$ (A). Primärdefizit: $g - t = 3\\% - 1\\% = 2\\%$ (C). Da $r = 2\\% < y = 4\\%$, ist das Gleichgewicht stabil (D).',
          topics: ['Staatsverschuldung', 'Gleichgewichtsschuldenquote', 'Primärdefizit']
        },
        {
          id: 'makro-tb6-q18', number: 18, points: 2,
          text: 'Es gibt weder geldpolitikfinanzierte Staatsausgaben noch Inflation. Ursprünglich gilt $g = 1\\%$, $t = 3\\%$, $r = 2\\%$, $y = 4\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die langfristige Schuldenquote im Gleichgewicht ist positiv.' },
            { key: 'B', text: 'Die langfristige Schuldenquote im Gleichgewicht ist negativ.' },
            { key: 'C', text: 'Die langfristige Schuldenquote im Gleichgewicht ist stabil.' },
            { key: 'D', text: 'Die Defizitquote im Gleichgewicht ist −5%.' },
            { key: 'E', text: 'Die Defizitquote im Gleichgewicht ist −4%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'E'],
          explanation: '$b^* = (g-t)/(y-r) = (1\\%-3\\%)/(4\\%-2\\%) = -2\\%/2\\% = -100\\%$ → negativ (B). Da $r < y$, ist das Gleichgewicht stabil (C). Defizitquote: $y \\cdot b^* = 4\\% \\times (-100\\%) = -4\\%$ (E, also ein Überschuss).',
          topics: ['Staatsverschuldung', 'Gleichgewichtsschuldenquote', 'Defizitquote']
        },
        {
          id: 'makro-tb6-q19', number: 19, points: 2,
          text: 'Weiterhin: $g = 1\\%$, $t = 3\\%$, $r = 2\\%$, $y = 4\\%$. Markiere die wahren Aussagen zur Phasenlinie $\\Delta b(b)$.',
          choices: [
            { key: 'A', text: 'Der vertikale Achsenabschnitt der Phasenlinie $\\Delta b(b)$ ist negativ.' },
            { key: 'B', text: 'Der vertikale Achsenabschnitt der Phasenlinie $\\Delta b(b)$ ist positiv.' },
            { key: 'C', text: 'Die Steigung der Phasenlinie $\\Delta b(b)$ ist negativ.' },
            { key: 'D', text: 'Im langfristigen Gleichgewicht ist die nominale Verschuldung $B$ konstant.' },
            { key: 'E', text: 'Im langfristigen Gleichgewicht muss gelten, dass $b = 0$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C'],
          explanation: 'Der $y$-Achsenabschnitt: $\\Delta b(0) = g - t = 1\\% - 3\\% = -2\\% < 0$ (A). Die Steigung ist $r - y = 2\\% - 4\\% = -2\\% < 0$ (C), was die Stabilität des Gleichgewichts bestätigt. $B$ wächst im Gleichgewicht mit der Rate $y$ (nicht konstant).',
          topics: ['Staatsverschuldung', 'Phasenlinie', 'Stabilitätsbedingung']
        },
        {
          id: 'makro-tb6-q20', number: 20, points: 2,
          text: 'Wir befinden uns im ursprünglichen langfristigen Gleichgewicht ($g = 1\\%$, $t = 3\\%$, $r = 2\\%$, $y = 4\\%$). Plötzlich steigen die Staatsausgaben auf $g_{neu} = 4\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Phasenlinie $\\Delta b(b)$ verschiebt sich nach oben.' },
            { key: 'B', text: 'Die Steigung der Phasenlinie $\\Delta b(b)$ bleibt gleich.' },
            { key: 'C', text: 'Die Schuldenquote steigt im Übergang zur neuen langfristigen Schuldenquote im Gleichgewicht.' },
            { key: 'D', text: 'Die neue langfristige Schuldenquote im Gleichgewicht ist stabil.' },
            { key: 'E', text: 'Die Defizitquote im neuen langfristigen Gleichgewicht ist 0%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C', 'D'],
          explanation: 'Der Anstieg von $g$ erhöht den $y$-Achsenabschnitt → Phasenlinie verschiebt nach oben (A). Die Steigung $r - y$ ändert sich nicht (B). Das neue $b^* = (4\\%-3\\%)/(4\\%-2\\%) = 50\\%$ ist höher als das alte $b^* = -100\\%$ → Schuldenquote steigt (C). Da $r < y$ bleibt, bleibt das Gleichgewicht stabil (D). Die Defizitquote im neuen GG: $y \\cdot 50\\% = 2\\% \\neq 0$ (E ist falsch).',
          topics: ['Staatsverschuldung', 'Phasenlinie', 'Fiskalschock', 'Schuldenquoten-Dynamik']
        }
      ]
    }
  ]
};
