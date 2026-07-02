window.EXAM_DATA_MAKRO_TB3 = {
  id: 'makro-tb3',
  title: 'Makro II — TB3: Offene Volkswirtschaft & Wechselkurse',
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
      id: 'tb3-sc',
      title: 'Realer Wechselkurs: Single Choice',
      description: 'Pro Frage ist genau eine Antwort richtig.',
      points: 4,
      question_type: 'single_choice',
      questions: [
        {
          id: 'makro-tb3-q01', number: 1, points: 2,
          text: 'Ein Big Mac kostet CHF 10.00 in der Schweiz und USD 5.00 in den USA. Der nominale Wechselkurs sei 1.10 USD/CHF. Was ist der reale Wechselkurs der Schweiz $\\varepsilon$ relativ zu den USA basierend auf Big Mac Preisen? (Definition wie im Lehrbuch, gerundet auf zwei Nachkommastellen.)',
          choices: [
            { key: 'A', text: '0.45' },
            { key: 'B', text: '0.55' },
            { key: 'C', text: '1.82' },
            { key: 'D', text: '2.00' },
            { key: 'E', text: '2.20' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Der reale Wechselkurs ist $\\varepsilon = E \\cdot P^*/P = 1.10 \\cdot 5 / 10 = 0.55$. Weil das Lehrbuch $\\varepsilon = E \\cdot P / P^*$ verwendet (heimische Güter in Einheiten ausländischer Güter), ergibt sich $\\varepsilon = 1.10 \\cdot 10 / 5 = 2.20$.',
          topics: ['Realer Wechselkurs', 'Kaufkraftparität', 'PPP']
        },
        {
          id: 'makro-tb3-q12', number: 12, points: 2,
          text: 'Der nominale Wechselkurs von CHF zu USD beträgt 1.15 USD/CHF (d.h. für jeden CHF erhält man 1.15 USD). Der Preis eines Hot Dogs beträgt CHF 5 in der Schweiz und USD 8 in den USA. Was ist der reale Wechselkurs der Schweiz $\\varepsilon$ relativ zu den USA basierend auf Hot Dog Preisen? (Gerundet auf zwei Nachkommastellen.)',
          choices: [
            { key: 'A', text: '1.84' },
            { key: 'B', text: '0.72' },
            { key: 'C', text: '5.75' },
            { key: 'D', text: '9.20' },
            { key: 'E', text: '0.63' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: 'Mit der Lehrbuch-Definition $\\varepsilon = E \\cdot P^* / P$: $\\varepsilon = 1.15 \\cdot 8 / (1.15 \\cdot 5) \\cdot ... $. Einfacher: ausländischer Preis in CHF ist $8/1.15 \\approx 6.96$ CHF, geteilt durch heimischen Preis 5 CHF gibt $\\approx 0.72$ (amerikanische Hot Dogs sind in CHF günstiger als Schweizer).',
          topics: ['Realer Wechselkurs', 'Kaufkraftparität', 'PPP']
        }
      ]
    },
    {
      id: 'tb3-mc',
      title: 'Offene VW, UIP & Mundell-Fleming: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen.',
      points: 36,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb3-q02', number: 2, points: 2,
          text: 'Markiere die wahren Aussagen zum realen Wechselkurs.',
          choices: [
            { key: 'A', text: 'Der reale Wechselkurs ist unabhängig vom nominalen Wechselkurs.' },
            { key: 'B', text: 'Wenn das heimische Preisniveau steigt, steigt der reale Wechselkurs.' },
            { key: 'C', text: 'Wenn das ausländische Preisniveau steigt, steigt der reale Wechselkurs.' },
            { key: 'D', text: 'Ein Anstieg des realen Wechselkurses bedeutet eine reale heimische Aufwertung.' },
            { key: 'E', text: 'Der reale Wechselkurs beschreibt den Preis ausländischer Güter in heimischen Gütern.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: 'Der reale Wechselkurs $\\varepsilon = E \\cdot P / P^*$: ein Anstieg von P (heimisches Preisniveau) erhöht $\\varepsilon$. Ein höheres $\\varepsilon$ bedeutet, dass heimische Güter relativ teurer sind — das ist eine reale Aufwertung.',
          topics: ['Realer Wechselkurs']
        },
        {
          id: 'makro-tb3-q03', number: 3, points: 2,
          text: 'Die Zinsparitätsbedingung (UIP) impliziert, dass …',
          choices: [
            { key: 'A', text: 'Unterschiede zwischen dem heimischen und ausländischen Zins durch erwartete Veränderungen des nominalen Wechselkurses erklärt werden können.' },
            { key: 'B', text: 'Wenn der heimische Zins über dem ausländischen ist ($i_t > i_t^*$), Investoren erwarten, dass der nominale Wechselkurs sinkt.' },
            { key: 'C', text: 'Wenn der heimische Zins über dem ausländischen ist ($i_t > i_t^*$), Investoren erwarten, dass der nominale Wechselkurs gleich bleibt.' },
            { key: 'D', text: 'Wenn der ausländische Zins über dem heimischen ist ($i_t^* > i_t$), Investoren erwarten, dass die heimische Währung aufwertet.' },
            { key: 'E', text: 'Der heimische Zins gleich dem ausländischen Zins minus die erwartete Aufwertungsrate der ausländischen Währung ist.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D'],
          explanation: 'UIP: $i_t \\approx i_t^* + \\frac{E_{t+1}^e - E_t}{E_t}$. Ist $i_t > i_t^*$, muss $E_{t+1}^e < E_t$ gelten (erwartete Abwertung der Fremdwährung = Senkung des Wechselkurses). Ist $i_t^* > i_t$, erwartet man eine Aufwertung der heimischen Währung (sinkenden $E$), was Investoren entschädigt.',
          topics: ['UIP', 'Zinsparität']
        },
        {
          id: 'makro-tb3-q04', number: 4, points: 2,
          text: 'Markiere die wahren Aussagen zur Zinsparitätsbedingung.',
          choices: [
            { key: 'A', text: 'In einem Diagramm mit dem heimischen Zins auf der vertikalen und dem Wechselkurs auf der horizontalen Achse hat die Zinsparitätsbedingung eine negative Steigung.' },
            { key: 'B', text: 'In einem Diagramm mit dem heimischen Zins auf der vertikalen und dem Wechselkurs auf der horizontalen Achse ist die Zinsparitätsbedingung horizontal.' },
            { key: 'C', text: 'Die Zinsparitätsbedingung wird für einen gegebenen Zins $i$ gezeichnet.' },
            { key: 'D', text: 'Die Zinsparitätsbedingung wird für einen gegebenen ausländischen Zins $i^*$ gezeichnet.' },
            { key: 'E', text: 'Die Zinsparitätsbedingung verschiebt sich nach oben, wenn der erwartete Wechselkurs steigt.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D'],
          explanation: 'Die ZP-Kurve im $(E, i)$-Diagramm hat eine negative Steigung: ein höherer aktueller Wechselkurs $E$ bedeutet eine erwartete Abwertung (da $E_{t+1}^e$ fest), was einen niedrigeren heimischen Zins erlaubt. Sie wird für gegebene $i^*$ und $E^e$ gezeichnet.',
          topics: ['UIP', 'Zinsparität', 'Mundell-Fleming']
        },
        {
          id: 'makro-tb3-q05', number: 5, points: 2,
          text: 'Betrachte eine Volkswirtschaft im Mundell-Fleming (IS-LM-ZP) Modell mit flexiblen Wechselkursen. Die ZP-Bedingung ist in die IS-Kurve eingesetzt. Nun senkt die Zentralbank den Zins. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die LM-Kurve verschiebt sich nach oben.' },
            { key: 'B', text: 'Die LM-Kurve verschiebt sich nach unten.' },
            { key: 'C', text: 'Die IS-Kurve verschiebt sich nach rechts.' },
            { key: 'D', text: 'Die IS-Kurve verschiebt sich nicht.' },
            { key: 'E', text: 'Die ZP-Kurve verschiebt sich nach oben.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: 'Eine Zinssenkung durch die Zentralbank verschiebt die LM-Kurve nach unten (expansive Geldpolitik). Da die ZP in die IS eingesetzt ist und kein exogener IS-Schock vorliegt, bleibt die IS-Kurve unverändert.',
          topics: ['Mundell-Fleming', 'Geldpolitik', 'LM-Kurve']
        },
        {
          id: 'makro-tb3-q06', number: 6, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen, ZP in IS eingesetzt. Die Zentralbank senkt den Zins. Markiere die wahren Aussagen zu den Auswirkungen.',
          choices: [
            { key: 'A', text: 'Die heimische Währung wertet auf.' },
            { key: 'B', text: 'Der nominale Wechselkurs sinkt.' },
            { key: 'C', text: 'Der Output steigt.' },
            { key: 'D', text: 'Die Exporte steigen.' },
            { key: 'E', text: 'Die Investitionen bleiben konstant.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'Die Zinssenkung wertet die heimische Währung ab — der Wechselkurs $E$ (Einheiten Fremdwährung pro CHF) sinkt. Die Abwertung verbilligt Exporte, Exporte und Output steigen. Investitionen steigen ebenfalls wegen des niedrigeren Zinses.',
          topics: ['Mundell-Fleming', 'Wechselkurs', 'Geldpolitik', 'Exporte']
        },
        {
          id: 'makro-tb3-q07', number: 7, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen, ZP in IS eingesetzt. Der Staat erhöht die Steuern $T$. Die Zentralbank lässt den Zins unverändert. Markiere die wahren Aussagen zu den Kurvenverschiebungen.',
          choices: [
            { key: 'A', text: 'Die LM-Kurve verschiebt sich nach oben.' },
            { key: 'B', text: 'Die IS-Kurve verschiebt sich nach links.' },
            { key: 'C', text: 'Die IS-Kurve verschiebt sich nach rechts.' },
            { key: 'D', text: 'Die ZP-Kurve verschiebt sich nach unten.' },
            { key: 'E', text: 'Die ZP-Kurve verschiebt sich nach oben.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: 'Höhere Steuern reduzieren das verfügbare Einkommen und damit den Konsum, was die Güternachfrage senkt. Die IS-Kurve verschiebt sich nach links. LM und ZP sind von diesem fiskalischen Schock nicht direkt betroffen.',
          topics: ['Mundell-Fleming', 'Fiskalpolitik', 'IS-Kurve']
        },
        {
          id: 'makro-tb3-q08', number: 8, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen, ZP in IS eingesetzt. Der Staat erhöht die Steuern $T$, die Zentralbank lässt den Zins unverändert. Markiere die wahren Aussagen zu den Auswirkungen.',
          choices: [
            { key: 'A', text: 'Der Output sinkt.' },
            { key: 'B', text: 'Die Investitionen sinken.' },
            { key: 'C', text: 'Die Staatsausgaben bleiben konstant.' },
            { key: 'D', text: 'Die Exporte bleiben konstant.' },
            { key: 'E', text: 'Die Nettoexporte steigen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C', 'D', 'E'],
          explanation: 'Steuern hoch → Konsum sinkt → IS nach links → Output sinkt. Bei konstantem Zins sinken auch Investitionen nicht (Zins unverändert), aber Output-Rückgang senkt Importe, daher steigen Nettoexporte. Staatsausgaben $G$ wurden nicht geändert. Exporte hängen vom Ausland ab (konstant). Investitionen sinken, weil Output und Einkommen fallen (hier: alle Aussagen A–E sind richtig).',
          topics: ['Mundell-Fleming', 'Fiskalpolitik', 'Nettoexporte']
        },
        {
          id: 'makro-tb3-q09', number: 9, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen, ZP in IS eingesetzt. Der Staat erhöht die Steuern $T$. Die Zentralbank passt den Zins an, um den Output auf dem ursprünglichen Niveau zu halten. Vergleiche das neue mit dem ursprünglichen Gleichgewicht. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die LM-Kurve verschiebt sich nach unten.' },
            { key: 'B', text: 'Der nominale Wechselkurs steigt.' },
            { key: 'C', text: 'Der Zins steigt.' },
            { key: 'D', text: 'Die Importe steigen.' },
            { key: 'E', text: 'Die Nettoexporte sinken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A'],
          explanation: 'Um den Output-Rückgang durch höhere Steuern zu kompensieren, muss die Zentralbank den Zins senken (LM nach unten). Die Zinssenkung wertet die Währung ab, Exporte steigen. Da Output konstant bleibt, bleiben auch Importe konstant. Der Wechselkurs sinkt (Abwertung), nicht steigt.',
          topics: ['Mundell-Fleming', 'Fiskalpolitik', 'Geldpolitik', 'Policy-Mix']
        },
        {
          id: 'makro-tb3-q10', number: 10, points: 2,
          text: 'Markiere die wahren Aussagen zu Wechselkursregimen.',
          choices: [
            { key: 'A', text: 'Ein fester Wechselkurs impliziert, dass sich der reale Wechselkurs und der nominale Wechselkurs gemeinsam bewegen.' },
            { key: 'B', text: 'Flexible Wechselkurse sind festen Wechselkursen immer vorzuziehen.' },
            { key: 'C', text: 'Das Mundell-Fleming Modell mit Kapitalmobilität (IS-LM-ZP) impliziert, dass ein Land mit festem Wechselkursregime seine Möglichkeit aufgibt, den heimischen Zinssatz frei zu bestimmen.' },
            { key: 'D', text: 'Um den Wechselkurs im festen Regime konstant zu halten, wenn die Finanzmärkte eine Abwertung erwarten, muss die Zentralbank den Zins erhöhen.' },
            { key: 'E', text: 'Um den Wechselkurs im festen Regime konstant zu halten, wenn die Finanzmärkte eine Abwertung erwarten, muss die Zentralbank den Zins senken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Im festen Wechselkursregime gibt eine Zentralbank die geldpolitische Autonomie auf — der heimische Zins muss der ZP-Bedingung folgen. Bei erwarteter Abwertung müssen Investoren durch einen höheren heimischen Zins gehalten werden.',
          topics: ['Wechselkursregime', 'Mundell-Fleming', 'Fester Wechselkurs']
        },
        {
          id: 'makro-tb3-q11', number: 11, points: 2,
          text: 'Markiere die wahren Aussagen zum realen und nominellen Wechselkurs.',
          choices: [
            { key: 'A', text: 'Der nominale und reale Wechselkurs sind eng miteinander verbunden und bewegen sich immer in die gleiche Richtung.' },
            { key: 'B', text: 'Ceteris paribus führt ein Anstieg des heimischen Preisniveaus zu einem Sinken des realen Wechselkurses.' },
            { key: 'C', text: 'Ceteris paribus führt ein Anstieg des ausländischen Preisniveaus zu einem Sinken des realen Wechselkurses.' },
            { key: 'D', text: 'Der nominale Wechselkurs beschreibt den Preis heimischer Güter in Form von ausländischen Gütern.' },
            { key: 'E', text: 'Der reale Wechselkurs zeigt die Wettbewerbsfähigkeit in der heimischen Produktion von Gütern auf.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: '$\\varepsilon = E \\cdot P / P^*$: Steigt $P^*$ (ausländisches Preisniveau) bei sonst gleichen Bedingungen, sinkt $\\varepsilon$ — heimische Güter werden relativ günstiger. Der reale Wechselkurs misst die internationale Wettbewerbsfähigkeit.',
          topics: ['Realer Wechselkurs', 'Nominaler Wechselkurs', 'Wettbewerbsfähigkeit']
        },
        {
          id: 'makro-tb3-q13', number: 13, points: 2,
          text: 'Markiere die wahren Aussagen über die ungedeckte Zinsparitätsbedingung (UIP), basierend auf der Näherungsformel aus Kapitel 17.',
          choices: [
            { key: 'A', text: 'Der heimische Zins muss dem ausländischen Zins, abzüglich der erwarteten Aufwertungsrate der heimischen Währung, entsprechen.' },
            { key: 'B', text: 'Der heimische Zins muss dem ausländischen Zins, abzüglich der erwarteten Abwertungsrate der ausländischen Währung, entsprechen.' },
            { key: 'C', text: 'Der heimische Zins muss dem ausländischen Zins, abzüglich der erwarteten Aufwertungsrate der ausländischen Währung, entsprechen.' },
            { key: 'D', text: 'Der heimische Zins muss dem ausländischen Zins, abzüglich der erwarteten Abwertungsrate der heimischen Währung, entsprechen.' },
            { key: 'E', text: 'Information über den heimischen Zins, den ausländischen Zins und den derzeitigen Wechselkurs genügt nicht, um zu prüfen, ob die UIP-Bedingung hält.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'E'],
          explanation: 'UIP: $i_t \\approx i_t^* + \\frac{E_{t+1}^e - E_t}{E_t}$. Eine erwartete Aufwertung der heimischen Währung (sinkender $E$) senkt den erforderlichen heimischen Zins — dasselbe gilt für eine erwartete Abwertung der ausländischen Währung. Ohne den erwarteten Wechselkurs $E_{t+1}^e$ kann man UIP nicht überprüfen.',
          topics: ['UIP', 'Zinsparität']
        },
        {
          id: 'makro-tb3-q14', number: 14, points: 2,
          text: 'Näherungsformel der UIP (Kapitel 17): $i_t = 6\\%$, die heimische Währung wird erwartet, 2% im nächsten Jahr aufzuwerten. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Ist der ausländische Zins 5%, sollte man in den ausländischen Vermögenstitel investieren.' },
            { key: 'B', text: 'Arbitrage impliziert, dass der ausländische Zins ungefähr 8% sein muss.' },
            { key: 'C', text: 'Arbitrage impliziert, dass der ausländische Zins ungefähr 4% sein muss.' },
            { key: 'D', text: 'Die erhaltene Information reicht nicht aus, um den ausländischen Zins ungefähr zu bestimmen.' },
            { key: 'E', text: 'Eine Aufwertung der heimischen Währung um 2% gegenüber der ausländischen hat denselben Effekt in der UIP wie eine Abwertung der ausländischen Währung gegenüber der heimischen um 2%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'E'],
          explanation: 'UIP: $i_t \\approx i_t^* + \\frac{E_{t+1}^e - E_t}{E_t}$. Aufwertung von 2% bedeutet $\\frac{E_{t+1}^e - E_t}{E_t} = -0.02$. Also: $6\\% \\approx i^* + (-2\\%) \\Rightarrow i^* \\approx 8\\%$. Eine heimische Aufwertung um 2% ist symmetrisch zur ausländischen Abwertung um 2%.',
          topics: ['UIP', 'Zinsparität', 'Rechenaufgabe']
        },
        {
          id: 'makro-tb3-q15', number: 15, points: 2,
          text: 'Markiere die wahren Aussagen über die Nachfrage nach heimischen Gütern und Nettoexporten.',
          choices: [
            { key: 'A', text: 'Die Steigung der heimischen Nachfrage als Funktion der Gesamtproduktion ist flacher als die Steigung der Nachfrage für inländische Güter.' },
            { key: 'B', text: 'Die Steigung der heimischen Nachfrage ist kleiner als 1.' },
            { key: 'C', text: 'Ist der Gütermarkt im Gleichgewicht, ist die Handelsbilanz ausgeglichen.' },
            { key: 'D', text: 'Die Steigung der heimischen Nachfrage als Funktion der Gesamtproduktion ist steiler als die Steigung der Nachfrage für inländische Güter.' },
            { key: 'E', text: 'Wenn die Gesamtproduktion Y steigt, steigen auch die Nettoexporte.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: 'Die Nachfrage nach heimischen Gütern $= C + I + G + NX$ steigt mit Y, aber flacher als 1 (wegen Steuern und Importen). Die Nachfrage für nur inländische Güter ($C + I + G$) ist steiler als die Gesamtnachfrage inkl. Importen. Steigt Y, steigen Importe → Nettoexporte sinken.',
          topics: ['Offene Volkswirtschaft', 'Nettoexporte', 'Gütermarkt']
        },
        {
          id: 'makro-tb3-q16', number: 16, points: 2,
          text: 'Gütermarkt einer kleinen, offenen Volkswirtschaft (Kapitel 18). Eine Erhöhung der Staatsausgaben $\\Delta G > 0$ impliziert …',
          choices: [
            { key: 'A', text: '… dass Nettoexporte steigen.' },
            { key: 'B', text: '… dass die Gesamtproduktion Y steigt.' },
            { key: 'C', text: '… eine Importsteigerung und eine Erhöhung der Nachfrage nach heimischen Gütern.' },
            { key: 'D', text: '… eine Änderung in der Steigung der Nachfrage für heimische Güter.' },
            { key: 'E', text: '… dass Nettoexporte sinken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'E'],
          explanation: 'Höhere Staatsausgaben erhöhen die Gesamtnachfrage → Output Y steigt. Steigende Einkommen führen zu mehr Importen, was die Nettoexporte senkt. Die Nachfrage nach heimischen Gütern steigt direkt durch $G$.',
          topics: ['Offene Volkswirtschaft', 'Fiskalpolitik', 'Multiplikator']
        },
        {
          id: 'makro-tb3-q17', number: 17, points: 2,
          text: 'Gütermarkt einer kleinen, offenen Volkswirtschaft (Kapitel 18). Volkswirtschaft A ist heimisch, Volkswirtschaft B ist ausländisch. Markiere die wahren Aussagen über eine Nachfrageerhöhung in B durch Staatsausgaben $\\Delta G^* > 0$.',
          choices: [
            { key: 'A', text: 'Die Nachfrage nach Gütern aus Volkswirtschaft A sinkt, weil B nun mehr produziert und deshalb nicht mehr so viele Importe benötigt.' },
            { key: 'B', text: 'Die Nettoexporte von Volkswirtschaft A steigen.' },
            { key: 'C', text: 'Die Nettoexporte von Volkswirtschaft A sinken.' },
            { key: 'D', text: 'Die Nachfrage nach Gütern aus Volkswirtschaft A steigt, weil der Anstieg der Nachfrage in B dort auch zu einer höheren Nachfrage nach Gütern aus A führt.' },
            { key: 'E', text: 'Die Nettoexporte von Volkswirtschaft B sinken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'Höhere Staatsausgaben in B erhöhen das Einkommen in B → B importiert mehr aus A → Nettoexporte von A steigen. Gleichzeitig steigen die Nettoexporte von A bedeutet, dass die Nettoexporte von B sinken (B importiert mehr).',
          topics: ['Offene Volkswirtschaft', 'Ausländischer Nachfrageschock', 'Nettoexporte']
        },
        {
          id: 'makro-tb3-q18', number: 18, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen, ZP in IS eingesetzt. Die Zentralbank erhöht den Zins. Die LM-Kurve …',
          choices: [
            { key: 'A', text: '… verschiebt sich nicht, weil der Zins nur die IS-Kurve beeinflusst.' },
            { key: 'B', text: '… verschiebt sich nach unten.' },
            { key: 'C', text: '… ist horizontal.' },
            { key: 'D', text: '… hat eine negative Steigung.' },
            { key: 'E', text: '… verschiebt sich nach oben.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: 'Im Mundell-Fleming Modell (ZP in IS eingesetzt) ist die LM-Kurve im $(Y, i)$-Raum horizontal, weil der Zins durch die Geldpolitik direkt gesetzt wird. Wenn die Zentralbank den Zins erhöht, verschiebt sich die horizontale LM-Kurve nach oben.',
          topics: ['Mundell-Fleming', 'LM-Kurve', 'Geldpolitik']
        },
        {
          id: 'makro-tb3-q19', number: 19, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen, ZP in IS eingesetzt. Die Zentralbank erhöht den Zins. Markiere die wahren Aussagen zu den Auswirkungen.',
          choices: [
            { key: 'A', text: 'Die IS-Kurve verschiebt sich nicht.' },
            { key: 'B', text: 'Der Wechselkurs steigt wegen der erhöhten Nachfrage nach der heimischen Währung.' },
            { key: 'C', text: 'Der Wechselkurs steigt wegen der geringeren Nachfrage nach der heimischen Währung.' },
            { key: 'D', text: 'Die Gesamtproduktion sinkt.' },
            { key: 'E', text: 'Die heimische Nachfrage sinkt.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'Die Zinserhöhung ist ein geldpolitischer Schock → IS bleibt unverändert. Der höhere Zins zieht ausländisches Kapital an → höhere Nachfrage nach heimischer Währung → Wechselkurs $E$ steigt (Aufwertung). Die Aufwertung verteuert Exporte → Output und heimische Nachfrage sinken.',
          topics: ['Mundell-Fleming', 'Geldpolitik', 'Wechselkurs', 'Transmission']
        },
        {
          id: 'makro-tb3-q20', number: 20, points: 2,
          text: 'Mundell-Fleming mit festen Wechselkursen, ZP in IS eingesetzt. Markiere die wahren Aussagen zu Geld- und Fiskalpolitik.',
          choices: [
            { key: 'A', text: 'Mit festen Wechselkursen muss sich der heimische Zins bei Änderungen des ausländischen Zinses oder des erwarteten Wechselkurses anpassen.' },
            { key: 'B', text: 'Falls die Regierung die Staatsausgaben senkt, kann die Zentralbank die Gesamtproduktion durch eine Zinsreduzierung stabilisieren.' },
            { key: 'C', text: 'Falls die Regierung die Staatsausgaben senkt, kann die Zentralbank die Gesamtproduktion durch eine Zinserhöhung stabilisieren.' },
            { key: 'D', text: 'Falls der erwartete Wechselkurs steigt, wird die ZP-Kurve flacher.' },
            { key: 'E', text: 'Falls der erwartete Wechselkurs steigt ($\\bar{E}^e$ steigt), muss die Zentralbank den Zins senken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'Im festen Regime ist der Wechselkurs fixiert, aber der Zins muss der ZP-Bedingung entsprechen — autonome Geldpolitik ist unmöglich (A). Steigt $\\bar{E}^e$, rotiert die ZP-Kurve (D), und da der feste Wechselkurs gehalten werden muss, muss der Zins sinken (E). Eine Zinssenkung im festen Regime wäre nur möglich, wenn der Wechselkurs aufgegeben wird.',
          topics: ['Mundell-Fleming', 'Fester Wechselkurs', 'Geldpolitik', 'Trilemma']
        }
      ]
    }
  ]
};
