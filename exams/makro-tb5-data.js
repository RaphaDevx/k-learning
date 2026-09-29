window.EXAM_DATA_MAKRO_TB5 = {
  id: 'makro-tb5',
  title: 'Makro II — TB5: Staatsausgaben & Fiskalpolitik',
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
      id: 'tb5-mc',
      title: 'Staatsausgaben, Ricardianische Äquivalenz & Fiskalpolitik: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen.',
      points: 40,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb5-q01', number: 1, points: 2,
          text: 'Mundell-Fleming (IS-LM-ZP) mit flexiblen Wechselkursen: Der Staat erhöht seine Ausgaben. Die Zentralbank lässt den Zinssatz unverändert. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Output bleibt unverändert.' },
            { key: 'B', text: 'Der Output sinkt, da Haushalte einen Staatsbankrott fürchten.' },
            { key: 'C', text: 'Output steigt.' },
            { key: 'D', text: 'Der nominale Wechselkurs verändert sich nicht.' },
            { key: 'E', text: 'Die ZP-Kurve verlagert sich nach links.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Bei festem Zinssatz wirkt die Fiskalpolitik im Mundell-Fleming-Modell mit flexiblen Wechselkursen: die IS-Kurve verschiebt sich nach rechts, der Output steigt. Da der Zinssatz konstant bleibt, bleibt der nominale Wechselkurs ebenfalls unverändert (die ZP-Bedingung bestimmt den Wechselkurs über den Zins).',
          topics: ['Mundell-Fleming', 'Fiskalpolitik', 'Wechselkurs']
        },
        {
          id: 'makro-tb5-q02', number: 2, points: 2,
          text: 'Mundell-Fleming (IS-LM-ZP) mit flexiblen Wechselkursen: Der Staat erhöht seine Ausgaben. Die Zentralbank lässt den Zinssatz unverändert. Markiere die wahren Aussagen zu Konsum, Exporten und Importen.',
          choices: [
            { key: 'A', text: 'Die Nettoexporte sinken.' },
            { key: 'B', text: 'Die Importe steigen, weil der Wechselkurs steigt.' },
            { key: 'C', text: 'Die Importe sinken.' },
            { key: 'D', text: 'Der Konsum steigt.' },
            { key: 'E', text: 'Die Exporte bleiben unverändert.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'Output und Konsum steigen (D). Da der Wechselkurs konstant bleibt, ändern sich die Exporte nicht (E). Die Importe steigen mit dem höheren Output, sodass die Nettoexporte sinken (A). (B) ist falsch, weil der Wechselkurs unverändert ist.',
          topics: ['Mundell-Fleming', 'Nettoexporte', 'Konsum', 'Fiskalpolitik']
        },
        {
          id: 'makro-tb5-q03', number: 3, points: 2,
          text: 'Mundell-Fleming (IS-LM-ZP) mit flexiblen Wechselkursen: Der Staat erhöht seine Ausgaben. Die Zentralbank will den Output auf dem ursprünglichen Niveau halten. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Nettoexporte steigen.' },
            { key: 'B', text: 'Die heimische Währung wertet auf.' },
            { key: 'C', text: 'Die Exporte sinken.' },
            { key: 'D', text: 'Der Konsum sinkt.' },
            { key: 'E', text: 'Die Investitionen sinken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C', 'D', 'E'],
          explanation: 'Um Output konstant zu halten, muss die Zentralbank den Zinssatz erhöhen. Der höhere Zins lässt die Währung aufwerten (B), Exporte sinken (C), Nettoexporte steigen (A) nur relativ zum neuen Gleichgewicht ohne Intervention — bei konstantem Output verschiebt sich die Zusammensetzung: G steigt, I und C sinken (D, E) wegen höherem Zins.',
          topics: ['Mundell-Fleming', 'Crowding-Out', 'Wechselkurs', 'Geldpolitik']
        },
        {
          id: 'makro-tb5-q04', number: 4, points: 2,
          text: 'IS-LM-PC Modell: Der Staat erhöht seine Ausgaben. Die Zentralbank reagiert unmittelbar, um den Output auf dem ursprünglichen Niveau zu halten. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Output bleibt unverändert.' },
            { key: 'B', text: 'Die Zusammensetzung des Outputs bleibt unverändert.' },
            { key: 'C', text: 'Die Investitionen steigen.' },
            { key: 'D', text: 'Die Investitionen sinken.' },
            { key: 'E', text: 'Die Zentralbank muss den Zinssatz erhöhen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'Wenn die Zentralbank Output konstant hält, muss sie den Zinssatz erhöhen (E), um den durch die höheren Staatsausgaben entstehenden Nachfrageboom zu neutralisieren. Das höhere G verdrängt private Investitionen (D — Crowding-Out). Der Output bleibt zwar gleich (A), aber die Zusammensetzung ändert sich: mehr G, weniger I.',
          topics: ['IS-LM-PC', 'Crowding-Out', 'Fiskalpolitik', 'Geldpolitik']
        },
        {
          id: 'makro-tb5-q05', number: 5, points: 2,
          text: 'Die intertemporale Budgetbeschränkung des Haushaltes (ohne anfängliches Vermögen $X_1$)...',
          choices: [
            { key: 'A', text: '$C_1 + \\frac{C_2}{1+r} = \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + V_1 - T_1 + \\frac{V_2 - T_2}{1+r}$' },
            { key: 'B', text: '$C_1 + \\frac{C_2}{1+r} = X_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + V_1 - T_1 + \\frac{V_2 - T_2}{1+r}$' },
            { key: 'C', text: '$C_1 + \\frac{C_2}{1+r} = \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + V_1 - T_1 + \\frac{X_1}{1+r} + \\frac{V_2 - T_2}{1+r}$' },
            { key: 'D', text: '$X_1 + \\left(\\frac{W}{P}\\right)_1 L + V_1 - T_1 - C_1 + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + \\frac{V_2 - T_2}{1+r} - \\frac{C_2}{1+r} = 0$' },
            { key: 'E', text: 'Impliziert, dass der Haushalt sein Einkommen in jeder Periode t konsumieren muss: $C_t = \\left(\\frac{W}{P}\\right)_t L + V_t - T_t$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: '(B) ist die korrekte Darstellung mit anfänglichem Vermögen $X_1$ auf der rechten Seite. (D) ist eine äquivalente Umformung, bei der alle Terme auf einer Seite stehen (Ersparnis Periode 1 plus Barwert Periode 2 = 0). (A) fehlt $X_1$; (C) diskontiert $X_1$ falsch; (E) wäre nur bei Kreditmarktausschluss richtig.',
          topics: ['Intertemporale Budgetbeschränkung', 'Haushalt', 'Ricardianische Äquivalenz']
        },
        {
          id: 'makro-tb5-q06', number: 6, points: 2,
          text: 'Die intertemporale Budgetbeschränkung des Staates (mit Transfers $V_t$ und Steuern $T_t$) kann geschrieben werden als...',
          choices: [
            { key: 'A', text: '$G_1 + \\frac{G_2}{1+r} - V_1 - \\frac{V_2}{1+r} = T_1 + \\frac{T_2}{1+r}$' },
            { key: 'B', text: '$G_1 + \\frac{G_2}{1+r} = T_1 + \\frac{T_2}{1+r} + V_1 + \\frac{V_2}{1+r}$' },
            { key: 'C', text: '$G_1 + \\frac{G_2}{1+r} = T_1 + \\frac{T_2}{1+r}$' },
            { key: 'D', text: '$G_1 + \\frac{G_2}{1+r} + V_1 + \\frac{V_2}{1+r} = T_1 + \\frac{T_2}{1+r}$' },
            { key: 'E', text: '$G_1 + V_1 - T_1 + \\frac{G_2 + V_2 - T_2}{1+r} = 0$' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Der Staat muss Ausgaben $G_t$ plus Transfers $V_t$ durch Steuern $T_t$ finanzieren. (D) ist die Barwertform: PV(G) + PV(V) = PV(T). (E) ist die äquivalente Umformung mit allen Termen auf einer Seite. (C) vernachlässigt die Transfers.',
          topics: ['Intertemporale Budgetbeschränkung', 'Staat', 'Fiskalpolitik']
        },
        {
          id: 'makro-tb5-q07', number: 7, points: 2,
          text: 'Die Nutzenfunktion des Haushaltes ist $u(C) = 2\\sqrt{C}$. Markiere die wahren Aussagen zur Euler-Gleichung.',
          choices: [
            { key: 'A', text: 'Die Euler-Gleichung vereinfacht sich zu $C_1 = [\\beta(1+r)]^2 C_2$.' },
            { key: 'B', text: 'Die Euler-Gleichung vereinfacht sich zu $C_2 = [\\beta(1+r)]^2 C_1$.' },
            { key: 'C', text: 'Die Euler-Gleichung vereinfacht sich zu $C_1 = \\left[\\beta \\frac{1}{(1+r)}\\right]^2 C_2$.' },
            { key: 'D', text: 'Die Euler-Gleichung vereinfacht sich zu $C_2 = \\left[\\beta \\frac{1}{(1+r)}\\right]^2 C_1$.' },
            { key: 'E', text: 'Optimaler Konsum in der ersten Periode ist $C_1 = \\frac{1}{1+\\beta}\\left[X_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r}L - G_1 - \\frac{G_2}{1+r}\\right]$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: 'Für $u(C) = 2\\sqrt{C}$ gilt $u\'(C) = C^{-1/2}$. Die Euler-Gleichung lautet $u\'(C_1) = \\beta(1+r)u\'(C_2)$, also $C_1^{-1/2} = \\beta(1+r)C_2^{-1/2}$. Quadrieren beider Seiten ergibt $C_2 = [\\beta(1+r)]^2 C_1$ (B). (A) hat die Perioden vertauscht.',
          topics: ['Euler-Gleichung', 'Optimaler Konsum', 'Intertemporale Optimierung']
        },
        {
          id: 'makro-tb5-q08', number: 8, points: 2,
          text: 'Nutzenfunktion $u(C) = 2\\sqrt{C}$, $\\beta = \\frac{1}{1+r}$, $r > 0$. Markiere die wahren Aussagen zum optimalen Konsum.',
          choices: [
            { key: 'A', text: 'Optimaler Konsum in der ersten Periode hängt positiv vom ursprünglichen Vermögensniveau $X_1$ ab.' },
            { key: 'B', text: 'Optimaler Konsum in der ersten Periode hängt positiv vom Einkommen in der ersten Periode $\\left(\\frac{W}{P}\\right)_1 L$ ab.' },
            { key: 'C', text: 'Optimaler Konsum in der ersten Periode hängt positiv vom Einkommen in der zweiten Periode $\\left(\\frac{W}{P}\\right)_2 L$ ab.' },
            { key: 'D', text: 'Optimaler Konsum in der zweiten Periode hängt positiv vom ursprünglichen Vermögensniveau $X_1$ ab.' },
            { key: 'E', text: 'Optimaler Konsum in der zweiten Periode hängt positiv vom Einkommen in der ersten Periode $\\left(\\frac{W}{P}\\right)_1 L$ ab.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C', 'D', 'E'],
          explanation: 'Bei $\\beta = \\frac{1}{1+r}$ gilt $C_1 = C_2$ (Consumption Smoothing). Der optimale Konsum beider Perioden ist ein fixer Anteil des Lebenseinkommens (PV aller Ressourcen). Damit hängt $C_1$ und $C_2$ positiv von $X_1$, $\\left(\\frac{W}{P}\\right)_1 L$ und $\\left(\\frac{W}{P}\\right)_2 L$ ab — alle Aussagen (A)–(E) sind wahr.',
          topics: ['Optimaler Konsum', 'Consumption Smoothing', 'Intertemporale Optimierung']
        },
        {
          id: 'makro-tb5-q09', number: 9, points: 2,
          text: 'Nutzenfunktion $u(C) = 2\\sqrt{C}$, $\\beta = \\frac{1}{1+r}$, $r > 0$. Markiere die wahren Aussagen zu den Auswirkungen höherer Staatsausgaben auf den optimalen Konsum.',
          choices: [
            { key: 'A', text: 'Wären die Staatsausgaben in der ersten Periode um eine Einheit höher, wäre der optimale Konsum in der ersten Periode eine Einheit höher, $\\frac{\\partial C_1}{\\partial G_2} = 1$.' },
            { key: 'B', text: 'Wären die Staatsausgaben in der ersten Periode um eine Einheit höher, wäre der optimale Konsum in der ersten Periode eine Einheit niedriger, $\\frac{\\partial C_1}{\\partial G_1} = -1$.' },
            { key: 'C', text: 'Wären die Staatsausgaben in der ersten Periode um eine Einheit höher, wäre der optimale Konsum in der ersten Periode um mehr als eine halbe Einheit niedriger, $\\frac{\\partial C_1}{\\partial G_1} < -0.5$.' },
            { key: 'D', text: 'Unabhängig davon, ob die Staatsausgaben in der ersten oder zweiten Periode um eine Einheit steigen, der optimale Konsum in der ersten Periode ändert sich um denselben Betrag, $\\frac{\\partial C_1}{\\partial G_1} = \\frac{\\partial C_1}{\\partial G_2}$.' },
            { key: 'E', text: 'Wären die Staatsausgaben in der zweiten Periode um eine Einheit höher, wäre der optimale Konsum in der zweiten Periode um weniger als eine halbe Einheit niedriger, $\\frac{\\partial C_2}{\\partial G_2} > -0.5$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: 'Da $\\beta(1+r)=1$, ist $C_1 = C_2$. Die Steuerlast der Staatsausgaben verteilt sich auf beide Perioden. Daher gilt $\\frac{\\partial C_1}{\\partial G_1} < -0.5$ (C): ein Teil der Steuererhöhung wird in Periode 2 getragen, also sinkt $C_1$ um mehr als die Hälfte. Analog ist $\\frac{\\partial C_2}{\\partial G_2} > -0.5$ (E), weil ein Teil auf Periode 1 entfällt.',
          topics: ['Fiskalmultiplikator', 'Ricardianische Äquivalenz', 'Optimaler Konsum']
        },
        {
          id: 'makro-tb5-q10', number: 10, points: 2,
          text: 'Nutzenfunktion $u(C) = 2\\sqrt{C}$ (ohne Einschränkung $\\beta = \\frac{1}{1+r}$). Markiere die wahren Aussagen zum Effekt einer Erhöhung der Staatsausgaben in Periode 1 auf den optimalen Konsum in Periode 1.',
          choices: [
            { key: 'A', text: 'Der Effekt hängt vom Zinssatz r ab.' },
            { key: 'B', text: 'Der Effekt hängt davon ab, ob der Staat Steuern oder Schulden verwendet, um die Ausgaben zu finanzieren.' },
            { key: 'C', text: 'Der Effekt wäre höher, wenn der Staat in der ersten Periode Schulden aufnimmt anstatt Steuern zu erheben.' },
            { key: 'D', text: 'Der Effekt hängt vom Diskontfaktor $\\beta$ ab.' },
            { key: 'E', text: 'Der Effekt hängt vom Vermögensniveau $X_1$ ab.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D'],
          explanation: 'Das ist der Kernpunkt der Ricardianischen Äquivalenz: Die Finanzierungsform (Steuern vs. Schulden) ist irrelevant (B und C falsch). Der Effekt hängt von r (A) und $\\beta$ (D) ab, weil diese bestimmen, wie die intertemporale Steuerlast aufgeteilt wird. Das Vermögensniveau $X_1$ beeinflusst die Konsumniveaus, nicht den marginalen Effekt von $G_1$ (E falsch).',
          topics: ['Ricardianische Äquivalenz', 'Fiskalpolitik', 'Optimaler Konsum']
        },
        {
          id: 'makro-tb5-q11', number: 11, points: 2,
          text: 'Markiere die wahren Aussagen zu Staatsausgaben.',
          choices: [
            { key: 'A', text: 'In Staatsausgaben ist der staatliche Erwerb von Gütern und Dienstleistungen enthalten.' },
            { key: 'B', text: 'In Staatsausgaben sind Zinszahlungen enthalten.' },
            { key: 'C', text: 'In Staatsausgaben sind Transferzahlungen enthalten.' },
            { key: 'D', text: 'Über die letzten 30 Jahre sind in der Schweiz die Staatsausgaben in Prozent des BIP durchweg gestiegen.' },
            { key: 'E', text: 'Staatsausgaben entsprechen immer dem Budgetdefizit.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Staatsausgaben umfassen Käufe von Gütern und Dienstleistungen (A), Zinszahlungen auf Staatsschulden (B) und Transferzahlungen wie Sozialleistungen (C). (D) ist empirisch falsch; die Schweizer Staatsquote war relativ stabil. (E) ist grundlegend falsch: das Budgetdefizit ist Ausgaben minus Einnahmen.',
          topics: ['Staatsausgaben', 'Fiskalpolitik', 'Schweizer Fiskalgeschichte']
        },
        {
          id: 'makro-tb5-q12', number: 12, points: 2,
          text: 'Intertemporales 2-Perioden-Modell mit nutzenstiftenden Staatsausgaben. Der Haushalt hat anfängliches Vermögen $Z_1 > 0$. Die intertemporale Budgetbeschränkung des Haushaltes...',
          choices: [
            { key: 'A', text: '$C_1 + \\frac{C_2}{1+r} = \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + V_1 - T_1 + \\frac{V_2 - T_2}{1+r}$ (ohne $Z_1$)' },
            { key: 'B', text: '$C_1 + \\frac{C_2}{1+r} = Z_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + V_1 - T_1 + \\frac{V_2 - T_2}{1+r}$' },
            { key: 'C', text: '$C_1 + \\frac{C_2}{1+r} = \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r} L + V_1 - T_1 + \\frac{Z_1}{1+r} + \\frac{V_2 - T_2}{1+r}$ ($Z_1$ falsch diskontiert)' },
            { key: 'D', text: 'Impliziert, dass der Haushalt sein Einkommen in jeder Periode t konsumieren muss: $C_t = \\left(\\frac{W}{P}\\right)_t L + V_t - T_t$.' },
            { key: 'E', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: '(B) ist korrekt: Das anfängliche Vermögen $Z_1$ (inklusive Zinszahlungen) steht vollständig auf der rechten Seite als Ressource in Periode 1. (A) lässt $Z_1$ weg; (C) diskontiert $Z_1$ falsch — es ist bereits in Periode 1 verfügbar und muss nicht abgezinst werden.',
          topics: ['Intertemporale Budgetbeschränkung', 'Haushalt', 'Vermögen']
        },
        {
          id: 'makro-tb5-q13', number: 13, points: 2,
          text: 'Intertemporales 2-Perioden-Modell mit nutzenstiftenden Staatsausgaben. Die intertemporale Budgetbeschränkung des Staates kann aufgeschrieben werden als...',
          choices: [
            { key: 'A', text: '$G_1 + \\frac{G_2}{1+r} - V_1 - \\frac{V_2}{1+r} = T_1 + \\frac{T_2}{1+r}$' },
            { key: 'B', text: '$G_1 + \\frac{G_2}{1+r} = T_1 + \\frac{T_2}{1+r} + V_1 + \\frac{V_2}{1+r}$ (Transfers auf falscher Seite)' },
            { key: 'C', text: '$G_1 + \\frac{G_2}{1+r} = T_1 + \\frac{T_2}{1+r}$ (Transfers fehlen)' },
            { key: 'D', text: '$G_1 + \\frac{G_2}{1+r} + V_1 + \\frac{V_2}{1+r} = T_1 + \\frac{T_2}{1+r}$' },
            { key: 'E', text: '$G_1 + V_1 - T_1 + \\frac{G_2 + V_2 - T_2}{1+r} = 0$' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Der Staat finanziert Ausgaben $G_t$ und Transfers $V_t$ aus Steuern $T_t$. In Barwertform: PV(G) + PV(V) = PV(T), also (D). Äquivalent lässt sich schreiben, dass das primäre Defizit über beide Perioden null ergibt (E). (C) ignoriert Transfers, (A) und (B) haben die Vorzeichen falsch.',
          topics: ['Intertemporale Budgetbeschränkung', 'Staat', 'Transfers']
        },
        {
          id: 'makro-tb5-q14', number: 14, points: 2,
          text: 'Nutzenfunktion $u(C, G) = 2\\sqrt{C \\cdot G}$ (nutzenstiftende Staatsausgaben). Die Euler-Gleichung des Haushalts kann vereinfacht werden zu...',
          choices: [
            { key: 'A', text: '$C_1 = [\\beta(1+r)]^2 C_2$' },
            { key: 'B', text: '$C_2 = [\\beta(1+r)]^2 C_1$' },
            { key: 'C', text: '$C_1 = \\left[\\beta \\frac{1}{(1+r)}\\right] G_2 C_2$' },
            { key: 'D', text: '$C_1 = \\left[\\beta \\frac{1}{(1+r)}\\right]^2 \\left(\\frac{G_2}{G_1}\\right)^2 C_1$' },
            { key: 'E', text: '$C_2 = [\\beta(1+r)]^2 \\frac{G_2}{G_1} C_1$' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Für $u(C,G) = 2\\sqrt{CG}$ gilt $\\frac{\\partial u}{\\partial C} = \\sqrt{G/C}$. Die Euler-Gleichung lautet $\\sqrt{G_1/C_1} = \\beta(1+r)\\sqrt{G_2/C_2}$. Quadrieren ergibt $\\frac{G_1}{C_1} = [\\beta(1+r)]^2 \\frac{G_2}{C_2}$, umgeformt zu $C_2 = [\\beta(1+r)]^2 \\frac{G_2}{G_1} C_1$ (E). Die Staatsausgaben beeinflussen die Euler-Gleichung, weil $G$ im Nutzen erscheint.',
          topics: ['Euler-Gleichung', 'Nutzenstiftende Staatsausgaben', 'Intertemporale Optimierung']
        },
        {
          id: 'makro-tb5-q15', number: 15, points: 2,
          text: 'Nutzenfunktion $u(C, G) = 2\\sqrt{C \\cdot G}$. Markiere die wahren Aussagen zum optimalen Konsum.',
          choices: [
            { key: 'A', text: 'Der optimale Konsum in der ersten Periode hängt positiv vom anfänglichen Vermögen $Z_1$ ab.' },
            { key: 'B', text: 'Der optimale Konsum in der ersten Periode hängt negativ vom Einkommen in der ersten Periode $\\left(\\frac{W}{P}\\right)_1 L$ ab.' },
            { key: 'C', text: 'Der optimale Konsum in der ersten Periode hängt positiv vom Einkommen in der zweiten Periode $\\left(\\frac{W}{P}\\right)_2 L$ ab.' },
            { key: 'D', text: 'Der optimale Konsum in der zweiten Periode hängt positiv vom anfänglichen Vermögen $Z_1$ ab.' },
            { key: 'E', text: 'Der optimale Konsum in der zweiten Periode hängt negativ vom Einkommen in der ersten Periode $\\left(\\frac{W}{P}\\right)_1 L$ ab.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: '(A) und (D): Mehr Anfangsvermögen $Z_1$ erhöht das Lebenseinkommen, wodurch Konsum in beiden Perioden steigt. (C): Höheres Einkommen in Periode 2 erhöht das Lebensvermögen, sodass $C_1$ steigt. (B) und (E) sind falsch — höheres Einkommen erhöht den Konsum, senkt ihn nicht.',
          topics: ['Optimaler Konsum', 'Nutzenstiftende Staatsausgaben', 'Lebenseinkommen']
        },
        {
          id: 'makro-tb5-q16', number: 16, points: 2,
          text: 'Nutzenfunktion $u(C, G) = 2\\sqrt{C \\cdot G}$, $\\beta = \\frac{1}{1+r}$, $r > 0$. Der optimale Konsum in der ersten Periode ist...',
          choices: [
            { key: 'A', text: '$C_1 = \\frac{1}{1+r}\\left[Z_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r}L - G_1 - \\frac{G_2}{1+r}\\right]$' },
            { key: 'B', text: '$C_1 = Z_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r}L - G_1 - \\frac{G_2}{1+r}$' },
            { key: 'C', text: '$C_1 = \\frac{1}{1+\\beta \\frac{G_1}{G_2}}\\left[Z_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r}L - G_1 - \\frac{G_2}{1+r}\\right]$' },
            { key: 'D', text: '$C_1 = \\frac{1}{1+\\frac{1}{1+r}\\frac{G_2}{G_1}}\\left[Z_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r}L - G_1 - \\frac{G_2}{1+r}\\right]$' },
            { key: 'E', text: '$C_1 = \\frac{1}{1+\\beta \\frac{G_2}{G_1}}\\left[Z_1 + \\left(\\frac{W}{P}\\right)_1 L + \\frac{\\left(\\frac{W}{P}\\right)_2}{1+r}L - G_1 - \\frac{G_2}{1+r}\\right]$' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Aus der Euler-Gleichung $C_2 = [\\beta(1+r)]^2 \\frac{G_2}{G_1} C_1$ und der Budgetbeschränkung ergibt sich $C_1$ als Anteil des verfügbaren Lebenseinkommens. Mit $\\beta = \\frac{1}{1+r}$ vereinfacht sich der Faktor zu $\\frac{1}{1+\\beta \\frac{G_2}{G_1}}$ (E) bzw. äquivalent $\\frac{1}{1+\\frac{1}{1+r}\\frac{G_2}{G_1}}$ (D). Die Staatsausgaben bestimmen über die Euler-Gleichung den Anteil, der in Periode 1 konsumiert wird.',
          topics: ['Optimaler Konsum', 'Nutzenstiftende Staatsausgaben', 'Euler-Gleichung']
        },
        {
          id: 'makro-tb5-q17', number: 17, points: 2,
          text: 'Nutzenfunktion $u(C, G) = 2\\sqrt{C \\cdot G}$, $\\beta = 1$, $r = 0$, $\\overline{G} = G_1 = G_2$ (gleiche Staatsausgaben in beiden Perioden). Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Wenn die Staatsausgaben $\\overline{G}$ eine Einheit höher sind, ist der optimale Konsum in der zweiten Periode eine Einheit niedriger, $\\frac{\\partial C_2}{\\partial \\overline{G}} = -1$.' },
            { key: 'B', text: 'Wenn die Staatsausgaben $\\overline{G}$ eine Einheit höher sind, ist der optimale Konsum in der ersten Periode eine Einheit höher, $\\frac{\\partial C_1}{\\partial \\overline{G}} = 1$.' },
            { key: 'C', text: 'Wenn die Staatsausgaben $\\overline{G}$ eine Einheit höher sind, ist der optimale Konsum in der zweiten Periode zwei Einheiten niedriger, $\\frac{\\partial C_2}{\\partial \\overline{G}} = -2$.' },
            { key: 'D', text: 'Wenn die Staatsausgaben $\\overline{G}$ eine Einheit höher sind, ist der optimale Konsum in der ersten Periode eine halbe Einheit niedriger, $\\frac{\\partial C_1}{\\partial \\overline{G}} = -0.5$.' },
            { key: 'E', text: 'Wenn die Staatsausgaben $\\overline{G}$ eine Einheit höher sind, ändert sich der optimale Konsum in der ersten Periode nicht, $\\frac{\\partial C_1}{\\partial \\overline{G}} = 0$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A'],
          explanation: 'Mit $\\beta = 1$, $r = 0$ und $G_1 = G_2 = \\overline{G}$ gilt aus der Euler-Gleichung $C_1 = C_2$. Aus der Budgetbeschränkung $C_1 + C_2 = W - 2\\overline{G}$ (W = Lebensvermögen) ergibt sich $C_1 = C_2 = \\frac{W - 2\\overline{G}}{2}$. Damit gilt $\\frac{\\partial C_2}{\\partial \\overline{G}} = -1$ (A) und $\\frac{\\partial C_1}{\\partial \\overline{G}} = -1$, nicht $-0.5$ oder $0$.',
          topics: ['Optimaler Konsum', 'Nutzenstiftende Staatsausgaben', 'Fiskalpolitik']
        },
        {
          id: 'makro-tb5-q18', number: 18, points: 2,
          text: 'Mundell-Fleming (IS-LM-ZP) mit flexiblen Wechselkursen, Ausgangslage im Gleichgewicht. Nun sinkt der Zins im Rest der Welt $i^*$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Output bleibt unverändert.' },
            { key: 'B', text: 'Der Output sinkt.' },
            { key: 'C', text: 'Die IS-Kurve verschiebt sich nach links.' },
            { key: 'D', text: 'Die Nettoexporte, Investitionen und der Konsum sinken.' },
            { key: 'E', text: 'Die heimische Währung wertet auf.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D', 'E'],
          explanation: 'Ein sinkender Auslandszins $i^*$ bedeutet, dass ausländische Anlagen weniger attraktiv werden. Der Kapitalzufluss ins Inland steigt, die heimische Währung wertet auf (E). Die Aufwertung macht Exporte teurer und reduziert die Nettoexporte — die IS-Kurve verschiebt sich nach links (C). Output sinkt (B) und damit auch Konsum, Investitionen und Nettoexporte (D).',
          topics: ['Mundell-Fleming', 'Wechselkurs', 'Auslandszins', 'IS-Kurve']
        },
        {
          id: 'makro-tb5-q19', number: 19, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen: $i^*$ sinkt. Der Staat interveniert mit Ausgabenänderungen, sodass der Output auf dem ursprünglichen Niveau bleibt. Vergleich mit dem Gleichgewicht vor der Änderung von $i^*$: Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Nettoexporte sinken.' },
            { key: 'B', text: 'Die Importe steigen.' },
            { key: 'C', text: 'Die Importe sinken.' },
            { key: 'D', text: 'Der Konsum ändert sich nicht.' },
            { key: 'E', text: 'Die Investitionen steigen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D'],
          explanation: 'Der Staat erhöht G, um das gesunkene Auslandsnachfrage-Defizit zu kompensieren. Bei gleichem Output (D: Konsum bleibt unverändert) und aufgewertetem Wechselkurs steigen die Importe (B) und sinken die Exporte, sodass die Nettoexporte fallen (A). Die Investitionen bleiben unverändert (E falsch), weil der Zinssatz sich nicht ändert (ZP-Bedingung mit gleichem i).',
          topics: ['Mundell-Fleming', 'Fiskalpolitik', 'Nettoexporte', 'Staatsintervention']
        },
        {
          id: 'makro-tb5-q20', number: 20, points: 2,
          text: 'Mundell-Fleming mit flexiblen Wechselkursen: $i^*$ sinkt. Der Staat interveniert, sodass Output auf ursprünglichem Niveau bleibt. Vergleich mit dem Gleichgewicht NACH der Änderung von $i^*$ OHNE staatliche Intervention: Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Nettoexporte sinken.' },
            { key: 'B', text: 'Der Output sinkt.' },
            { key: 'C', text: 'Der Wechselkurs steigt.' },
            { key: 'D', text: 'Der Konsum ändert sich nicht.' },
            { key: 'E', text: 'Der Zins sinkt.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A'],
          explanation: 'Verglichen mit dem Nicht-Interventions-Gleichgewicht (niedriger Output, aufgewertete Währung): Die staatliche Intervention erhöht G und Output. Damit steigen die Importe stärker als ohne Intervention, die Exporte sind ähnlich (Wechselkurs durch ZP bestimmt), daher sind die Nettoexporte im Interventionsfall niedriger (A). Der Wechselkurs und der Zins sind durch die ZP-Bedingung festgelegt und ändern sich nicht durch die Fiskalpolitik bei flexiblen Kursen.',
          topics: ['Mundell-Fleming', 'Staatsintervention', 'Fiskalpolitik', 'Nettoexporte']
        }
      ]
    }
  ]
};
