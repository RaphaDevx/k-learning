window.EXAM_DATA_MAKRO_TB2 = {
  id: 'makro-tb2',
  title: 'Makro II — TB2: IS-LM, Konsum & Euler-Gleichung',
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
      id: 'tb2-mc',
      title: 'IS-LM, Konsum & Investitionen: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen. Sofortfeedback nach jeder Frage.',
      points: 40,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb2-q01', number: 1, points: 2,
          text: 'Betrachte ein intertemporales Optimierungsproblem über zwei Perioden (streng konkave Nutzenfunktion $u(C)$, Diskontfaktor $\\beta \\in (0;1)$, konstanter Realzins $r$, kein anfängliches Vermögen, keine Vererbung). Die Euler-Gleichung ...',
          choices: [
            { key: 'A', text: 'ist $u\'(C_2) = \\beta(1+r)u\'(C_1)$, wobei $u\'(\\cdot)$ die erste Ableitung der Nutzenfunktion darstellt.' },
            { key: 'B', text: 'impliziert, dass der Grenznutzen aus Konsum in der ersten Periode immer kleiner als in der zweiten Periode sein muss, da diskontiert wird.' },
            { key: 'C', text: 'reicht allein aus, um das optimale Konsumniveau zu bestimmen.' },
            { key: 'D', text: 'zeigt, dass die Haushalte die gleiche Menge in beiden Perioden konsumieren.' },
            { key: 'E', text: 'erlaubt es, die Wachstumsrate des Konsums zwischen den beiden Perioden zu bestimmen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Die Euler-Gleichung $u\'(C_1) = \\beta(1+r)u\'(C_2)$ bestimmt das Verhältnis der Grenznutzen und damit die Wachstumsrate des Konsums, aber nicht das absolute Niveau. Dafür wird zusätzlich die Budgetbeschränkung benötigt.',
          topics: ['Euler-Gleichung', 'Konsum', 'Intertemporale Optimierung']
        },
        {
          id: 'makro-tb2-q02', number: 2, points: 2,
          text: 'Nimm zusätzlich an, dass $u(C) = \\ln(C)$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Euler-Gleichung ist nun $C_2 = \\beta(1+r)C_1$.' },
            { key: 'B', text: 'Für diese spezielle Nutzenfunktion erlaubt es die Euler-Gleichung allein die Konsumniveaus zu bestimmen.' },
            { key: 'C', text: 'Wenn $\\beta = \\frac{1}{1+r}$ wissen wir, dass $C_2 > C_1$.' },
            { key: 'D', text: 'Wenn $\\beta < \\frac{1}{1+r}$ wissen wir, dass $C_1 > C_2$.' },
            { key: 'E', text: 'Wenn $\\beta = \\frac{1}{1+r}$ wissen wir, dass $Y_1 = Y_2$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Bei $u(C)=\\ln(C)$ lautet die Euler-Gleichung $C_2 = \\beta(1+r)C_1$. Wenn $\\beta = \\frac{1}{1+r}$, dann $C_2 = C_1$ (nicht $C_2 > C_1$). Wenn $\\beta < \\frac{1}{1+r}$, dann $\\beta(1+r) < 1$, also $C_2 < C_1$, d.h. $C_1 > C_2$ ist korrekt.',
          topics: ['Euler-Gleichung', 'Log-Nutzenfunktion', 'Konsum']
        },
        {
          id: 'makro-tb2-q03', number: 3, points: 2,
          text: 'Nimm an $u(C) = \\ln(C)$, $r = 0$, $\\beta = 1$, $Y_1 = 10$ und $Y_2 = 10$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Euler-Gleichung lässt sich vereinfachen zu $C_1 = 2C_2$.' },
            { key: 'B', text: 'Die Euler-Gleichung lässt sich vereinfachen zu $C_1 = C_2$.' },
            { key: 'C', text: 'Die Menge, die in Periode 1 gespart wird, ist 10.' },
            { key: 'D', text: 'Die Menge, die in Periode 1 gespart wird, ist 0.' },
            { key: 'E', text: 'Der Konsum in Periode 2 ist gleich 10.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'Mit $r=0$ und $\\beta=1$ gilt $C_2 = C_1$. Mit $Y_1=Y_2=10$ und Budgetbeschränkung $C_1 + \\frac{C_2}{1} = 20$ folgt $C_1 = C_2 = 10$. Ersparnis $= Y_1 - C_1 = 0$.',
          topics: ['Euler-Gleichung', 'Konsum', 'Ersparnis']
        },
        {
          id: 'makro-tb2-q04', number: 4, points: 2,
          text: 'Nimm an $u(C) = \\ln(C)$, $\\beta = 1$, $Y_1 = 10$, $Y_2 = 10$ und $r = 10\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Auf zwei Nachkommastellen gerundet, ist $C_1 = 10.00$.' },
            { key: 'B', text: 'Auf zwei Nachkommastellen gerundet, ist $C_1 = 10.55$.' },
            { key: 'C', text: 'Auf zwei Nachkommastellen gerundet, ist $C_1 = 9.55$.' },
            { key: 'D', text: 'Auf zwei Nachkommastellen gerundet, ist $C_2 = 9.55$.' },
            { key: 'E', text: 'Die Menge, die in Periode 1 gespart wird, ist positiv.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: 'Mit $\\beta=1$ und $r=10\\%$ gilt $C_2 = 1.1 \\cdot C_1$. Budgetbeschränkung: $C_1 + \\frac{C_2}{1.1} = 10 + \\frac{10}{1.1} \\approx 19.09$, also $C_1 + C_1 = 19.09$, $C_1 \\approx 9.55$. Da $C_1 < Y_1$, ist die Ersparnis positiv.',
          topics: ['Euler-Gleichung', 'Konsum', 'Zins', 'Ersparnis']
        },
        {
          id: 'makro-tb2-q05', number: 5, points: 2,
          text: 'Nimm an $u(C) = C^{1/3}$, $r = 0$, $\\beta = 1$, $Y_1 = 10$ und $Y_2 = 10$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Menge, die in Periode 2 gespart wird, ist 0.' },
            { key: 'B', text: 'Die Menge, die in Periode 1 gespart wird, ist 0.' },
            { key: 'C', text: 'Die Euler-Gleichung lässt sich vereinfachen zu $C_1 = \\frac{1}{3}C_2$.' },
            { key: 'D', text: 'Die Euler-Gleichung lässt sich vereinfachen zu $C_1 = C_2$.' },
            { key: 'E', text: 'Die Menge, die in Periode 1 gespart wird, ist positiv.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D'],
          explanation: 'Mit $u(C)=C^{1/3}$ gilt $u\'(C) = \\frac{1}{3}C^{-2/3}$. Euler-Gleichung mit $\\beta=1$, $r=0$: $C_1^{-2/3} = C_2^{-2/3}$, also $C_1=C_2$. Mit $Y_1=Y_2=10$ folgt $C_1=C_2=10$, Ersparnis=0 in beiden Perioden.',
          topics: ['Euler-Gleichung', 'Konsum', 'Nutzenfunktion']
        },
        {
          id: 'makro-tb2-q06', number: 6, points: 2,
          text: 'Nimm an $u(C) = C^{1/3}$, $\\beta = 1$, $Y_1 = 10$, $Y_2 = 10$ und $r = 10\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Euler-Gleichung impliziert nun, dass der Konsum in beiden Perioden nicht gleich hoch ist.' },
            { key: 'B', text: 'Die Menge, die in Periode 1 gespart wird, ist grösser als 0.' },
            { key: 'C', text: 'Die Menge, die in Periode 1 gespart wird, ist grösser als 0.5.' },
            { key: 'D', text: 'In Periode 2 konsumieren Haushalte mehr als ihr Einkommen, d.h. $C_2 > Y_2$.' },
            { key: 'E', text: '$C_1 + C_2 > Y_1 + Y_2$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'C', 'D', 'E'],
          explanation: 'Mit $r=10\\%>0$ und $\\beta=1$: Euler-Gleichung impliziert $C_2 > C_1$. Haushalt spart in Periode 1 (positiv) und konsumiert in Periode 2 mehr als sein Einkommen. Da $r>0$ werden Zinsen erwirtschaftet, daher $C_1+C_2 > Y_1+Y_2$.',
          topics: ['Euler-Gleichung', 'Konsum', 'Zins', 'Ersparnis']
        },
        {
          id: 'makro-tb2-q07', number: 7, points: 2,
          text: 'Markiere die wahren Aussagen zu Investitionen.',
          choices: [
            { key: 'A', text: 'Im IS-LM Modell hängen die Investitionen vom Zins ab.' },
            { key: 'B', text: 'Im IS-LM Modell hängen die Investitionen von der Abschreibungsrate ab.' },
            { key: 'C', text: 'Im Investitionsentscheidungsmodell (Kap. 15) hängen die Investitionen von den heutigen Gewinnen $\\Pi_t$ ab.' },
            { key: 'D', text: 'Im Investitionsentscheidungsmodell (Kap. 15) hängen die Investitionen von den erwarteten zukünftigen Gewinnen ab.' },
            { key: 'E', text: 'Im Investitionsentscheidungsmodell (Kap. 15) hängen die Investitionen von der Abschreibungsrate ab.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D', 'E'],
          explanation: 'Im IS-LM Modell hängen Investitionen vom Zins ab. Im detaillierten Investitionsmodell hängen sie von heutigen und zukünftigen Gewinnen sowie von der Abschreibungsrate ab (über die Mietkosten $r+\\delta$). Im IS-LM Modell ist die Abschreibungsrate kein expliziter Parameter.',
          topics: ['Investitionen', 'IS-LM', 'Tobins q']
        },
        {
          id: 'makro-tb2-q08', number: 8, points: 2,
          text: 'Betrachte das Investitionsentscheidungsmodell (Kapitel 15). Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Investitionen sollten steigen, wenn die heutigen Gewinne sinken.' },
            { key: 'B', text: 'Die Investitionen sollten steigen, wenn die erwarteten zukünftigen Gewinne steigen.' },
            { key: 'C', text: 'Die Investitionen sollten steigen, wenn die Abschreibungsrate steigt.' },
            { key: 'D', text: 'Die Investitionen sollten steigen, wenn der Realzins steigt.' },
            { key: 'E', text: 'Die Investitionen sollten steigen, wenn die Mietkosten steigen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: 'Höhere erwartete zukünftige Gewinne erhöhen den Gegenwartswert der Investition und machen sie lohnenswerter. Steigende Abschreibungsrate, Realzins oder Mietkosten erhöhen dagegen die Kosten der Investition und senken sie.',
          topics: ['Investitionen', 'Gegenwartswert', 'Mietkosten']
        },
        {
          id: 'makro-tb2-q09', number: 9, points: 2,
          text: 'Betrachte das Investitionsbeispiel aus der Vorlesung. Eine Maschine, die in $t$ gekauft wird, ist ab $t+1$ nutzbar und verliert danach an Wert. Realzins $r=2\\%$, Abschreibungsrate $\\delta=10\\%$, erwartete Gewinne $\\Pi_{t+1}^e = \\$100$ und $\\Pi_{t+2}^e = \\$110$. Nach $t+2$ keine weiteren Gewinne. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Barwert zum Zeitpunkt $t$ des erwarteten Gewinns im Jahr $t+1$ ist grösser als $\\$98$.' },
            { key: 'B', text: 'Der Barwert zum Zeitpunkt $t$ des erwarteten Gewinns im Jahr $t+1$ ist kleiner als $\\$98$.' },
            { key: 'C', text: 'Der Barwert zum Zeitpunkt $t$ des erwarteten Gewinns nach Abschreibungen im Jahr $t+2$ ist kleiner als $\\$96$.' },
            { key: 'D', text: 'Der Barwert zum Zeitpunkt $t$ des erwarteten Gewinns nach Abschreibungen im Jahr $t+2$ ist kleiner als $\\$95$.' },
            { key: 'E', text: 'Der Barwert zum Zeitpunkt $t$ der erwarteten Gewinne (Gl. 15.3) für zwei Perioden ist grösser als $\\$200$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C'],
          explanation: 'Barwert von $\\Pi_{t+1}^e$: $\\frac{100}{1.02} \\approx 98.04 > 98$. Barwert von $(1-\\delta)\\Pi_{t+2}^e$: $\\frac{0.9 \\times 110}{1.02^2} \\approx \\frac{99}{1.0404} \\approx 95.15 < 96$. Gesamtbarwert $\\approx 98.04 + 95.15 = 193.19 < 200$.',
          topics: ['Investitionen', 'Barwert', 'Abschreibung']
        },
        {
          id: 'makro-tb2-q10', number: 10, points: 2,
          text: 'Betrachte das erweiterte IS-LM Modell (Kapitel 16) mit Erwartungen. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die IS-Kurve im erweiterten Modell ist horizontal.' },
            { key: 'B', text: 'Wenn der erwartete Output steigt, steigt der jetzige Output.' },
            { key: 'C', text: 'Wenn die erwarteten Steuern steigen, sinkt der jetzige Output.' },
            { key: 'D', text: 'Notenbanken können den jetzigen Output erhöhen, indem sie glaubhaft einen niedrigeren Zins in der Zukunft versprechen.' },
            { key: 'E', text: 'Im erweiterten IS-LM Modell ist der Staatsausgabenmultiplikator 0.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'Im erweiterten IS-LM Modell beeinflusst höherer erwarteter Output den heutigen Konsum positiv (B). Höhere erwartete Steuern senken das erwartete verfügbare Einkommen und damit den heutigen Konsum (C). Forward Guidance über niedrigere Zukunftszinsen verschiebt die IS-Kurve nach rechts (D).',
          topics: ['IS-LM', 'Erwartungen', 'Fiskalpolitik', 'Geldpolitik']
        },
        {
          id: 'makro-tb2-q11', number: 11, points: 2,
          text: 'Markiere die wahren Aussagen zu Konsum und Einkommen (Kapitel 15 des Lehrbuchs).',
          choices: [
            { key: 'A', text: 'Konsum hängt von den Erwartungen über Finanzvermögen, und Immobilien- und Sachvermögen ab.' },
            { key: 'B', text: 'Konsum hängt von den Erwartungen über Humanvermögen ab.' },
            { key: 'C', text: 'Optimaler Konsum ändert sich nicht, solange das gegenwärtige Einkommen konstant bleibt.' },
            { key: 'D', text: 'Der Konsum sinkt nur eins-zu-eins mit dem Einkommen, wenn der unerwartete Einkommensverlust permanent ist.' },
            { key: 'E', text: 'Konsum reagiert weniger als eins-zu-eins auf temporäre, unerwartete Fluktuationen im gegenwärtigen Einkommen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'Konsum hängt vom gesamten Vermögen ab (Human-, Finanz-, Sach-/Immobilienvermögen). Ein permanenter, unerwarteter Einkommensverlust schlägt sich 1:1 im Konsum nieder. Temporäre Schocks werden über die Zeit verteilt (Consumption Smoothing), daher reagiert Konsum weniger als eins-zu-eins.',
          topics: ['Konsum', 'Humanvermögen', 'Permanentes Einkommen']
        },
        {
          id: 'makro-tb2-q12', number: 12, points: 2,
          text: 'Markiere die wahren Aussagen zu Investitionen.',
          choices: [
            { key: 'A', text: 'Ein Unternehmen sollte eine Investition tätigen, falls der Gegenwartswert der erwarteten Profite grösser ist als die Kosten der Investition.' },
            { key: 'B', text: 'Ein Unternehmen sollte eine Investition tätigen, falls der Gegenwartswert der erwarteten Profite grösser ist als 0.' },
            { key: 'C', text: 'Der erwartete Realzins und das Investitionsniveau sind positiv korreliert.' },
            { key: 'D', text: 'Der erwartete Gegenwartswert von zukünftigen Profiten und das Investitionsniveau sind negativ korreliert.' },
            { key: 'E', text: 'Die Gebrauchs- bzw. Mietkosten und das Investitionsniveau sind negativ korreliert.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'E'],
          explanation: 'Investitionsentscheid: Barwert der Profite > Kosten (nicht nur > 0). Höhere Mietkosten ($r+\\delta$) erhöhen die Hürde und senken das Investitionsniveau (negative Korrelation). Höherer Realzins erhöht Mietkosten und senkt daher Investitionen (negative Korrelation, nicht positiv).',
          topics: ['Investitionen', 'Mietkosten', 'Realzins']
        },
        {
          id: 'makro-tb2-q13', number: 13, points: 2,
          text: 'Markiere die korrekten Aussagen zur Volatilität von Konsum und Investitionen.',
          choices: [
            { key: 'A', text: 'Investitionen und Konsum tragen in etwa gleichem Masse zu den Schwankungen der Gesamtproduktion bei.' },
            { key: 'B', text: 'Investitionen sind sehr viel volatiler als Konsum.' },
            { key: 'C', text: 'Investitionen haben den grössten Anteil an der Gesamtproduktion und sind bedeutsamer für Schwankungen.' },
            { key: 'D', text: 'Konsum trägt mehr zu den Schwankungen bei als Investitionen, weil Konsum einen grösseren Anteil an der Gesamtproduktion hat.' },
            { key: 'E', text: 'Investitionen sind weniger volatil in den Daten, weil Haushalte stark auf Einkommensänderungen reagieren.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'B'],
          explanation: 'Empirisch sind Investitionen viel volatiler als Konsum. Obwohl Konsum einen grösseren BIP-Anteil hat, gleicht sich das aus: Investitionen sind so viel volatiler, dass beide in etwa gleich viel zu BIP-Schwankungen beitragen.',
          topics: ['Konsum', 'Investitionen', 'Volatilität', 'Konjunktur']
        },
        {
          id: 'makro-tb2-q14', number: 14, points: 2,
          text: 'Betrachte das Investitionsentscheidungsproblem eines Unternehmens (Maschine ab $t+1$ nutzbar, Abschreibungsrate $\\delta$, Profite $\\Pi_{t+1}^e$ und $\\Pi_{t+2}^e$, ab $t+3$ alle Profite null). Nimm an: $\\Pi_{t+1}^e=102$, $\\Pi_{t+2}^e=104$, $r_t=2\\%$, $r_{t+1}^e=3\\%$, $\\delta=5\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Gegenwartswert der erwarteten Profite in Periode $t$ ist genau 194.' },
            { key: 'B', text: 'Die Gebrauchs- bzw. Mietkosten in Periode $t$ sind gleich 8%.' },
            { key: 'C', text: 'Der Gegenwartswert der erwarteten Profite in Periode $t$ ist kleiner als 195.' },
            { key: 'D', text: 'Der Gegenwartswert der erwarteten Profite in Periode $t$ ist grösser als 194.' },
            { key: 'E', text: 'Die Gebrauchs- bzw. Mietkosten in Periode $t+1$ sind gleich 8%.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: 'Barwert: $\\frac{102}{1.02} + \\frac{(1-0.05) \\times 104}{1.02 \\times 1.03} = 100 + \\frac{98.8}{1.0506} \\approx 100 + 94.04 \\approx 194.04$. Also $> 194$ und $< 195$. Mietkosten in $t+1$: $r_{t+1}^e + \\delta = 3\\% + 5\\% = 8\\%$.',
          topics: ['Investitionen', 'Barwert', 'Mietkosten']
        },
        {
          id: 'makro-tb2-q15', number: 15, points: 2,
          text: 'Gegeben: $\\Pi_{t+1}^e = 102$, $r_t = 2\\%$, $r_{t+1}^e = 3\\%$, $\\delta = 5\\%$. Das Unternehmen strebt einen Gegenwartswert von mindestens $V(\\Pi_t^e) = 200$ an. Markiere die korrekten Aussagen.',
          choices: [
            { key: 'A', text: 'Falls $\\Pi_{t+2}^e < 110$, wird das Unternehmen den angestrebten Gegenwartswert nicht erreichen.' },
            { key: 'B', text: '$\\Pi_{t+2}^e$ muss grösser sein als CHF 111, um $V(\\Pi_t^e) = 200$ zu erreichen.' },
            { key: 'C', text: 'Ceteris paribus führt eine Erhöhung der Mietkosten zu einer Senkung der benötigten Profite in $t+2$.' },
            { key: 'D', text: 'Ceteris paribus führt eine Senkung der Mietkosten zu einer Senkung der benötigten Profite in $t+2$, um $V = 200$ zu erreichen.' },
            { key: 'E', text: 'Falls $\\Pi_{t+2}^e < 110$, wird das Unternehmen den angestrebten Gegenwartswert erreichen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D'],
          explanation: 'Barwert des ersten Terms: $\\frac{102}{1.02} = 100$. Um $V=200$ zu erreichen, muss der zweite Term $= 100$ sein: $(1-0.05)\\Pi_{t+2}^e / (1.02 \\times 1.03) = 100$, also $\\Pi_{t+2}^e \\approx 110.6 > 110$. Senkung der Mietkosten erhöht den Barwert je Einheit Profit, daher sind weniger Profite nötig.',
          topics: ['Investitionen', 'Barwert', 'Mietkosten']
        },
        {
          id: 'makro-tb2-q16', number: 16, points: 2,
          text: 'Betrachte das erweiterte IS-LM Modell (Kapitel 16) mit Erwartungen. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die neue IS-Kurve ist steiler, weil Geldpolitik einen starken Einfluss auf die Gesamtproduktion hat, wenn Erwartungen eine Rolle spielen.' },
            { key: 'B', text: 'Die neue IS-Kurve ist steiler, weil die erwartete zukünftige Gesamtproduktion und der erwartete Realzins konstant gehalten werden, wenn man sich entlang der IS-Kurve bewegt. Dies impliziert einen kleineren Effekt einer heutigen Zinssenkung.' },
            { key: 'C', text: 'Eine Erhöhung der erwarteten zukünftigen Gesamtproduktion verschiebt die IS-Kurve nach rechts.' },
            { key: 'D', text: 'Änderungen von erwarteten zukünftigen Variablen, die für aggregierten Privatkonsum eine Rolle spielen, verschieben die IS-Kurve.' },
            { key: 'E', text: 'Die neue IS-Kurve beinhaltet auch Erwartungen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D', 'E'],
          explanation: 'Im erweiterten Modell sind Erwartungen in die IS-Kurve eingebettet. Hält man Erwartungen konstant, ist der Effekt einer Zinssenkung entlang der IS-Kurve kleiner (steiler). Änderungen in Erwartungen verschieben die IS-Kurve.',
          topics: ['IS-LM', 'Erwartungen', 'IS-Kurve']
        },
        {
          id: 'makro-tb2-q17', number: 17, points: 2,
          text: 'Betrachte das erweiterte IS-LM Modell (Kapitel 16) mit Erwartungen. Nimm an, dass die Zentralbank den Zins $r$ verringert. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die LM-Kurve verschiebt sich nach unten.' },
            { key: 'B', text: 'Wenn zusätzlich erwartet wird, dass der zukünftige Realzins sinkt, verschiebt sich die IS-Kurve nach links.' },
            { key: 'C', text: 'Wenn zusätzlich erwartet wird, dass der zukünftige Realzins steigt, verschiebt sich die IS-Kurve nach rechts.' },
            { key: 'D', text: 'Wenn zusätzlich erwartet wird, dass die zukünftige Gesamtproduktion höher ist, verschiebt sich die IS-Kurve nach rechts.' },
            { key: 'E', text: 'Im erweiterten IS-LM Modell mit Erwartungen führt eine Änderung des Zinses zu keiner Änderung der Gesamtproduktion.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D'],
          explanation: 'Eine Zinssenkung senkt die LM-Kurve nach unten (A). Höhere erwartete zukünftige Produktion erhöht heutigen Konsum und verschiebt IS nach rechts (D). Ein erwarteter Rückgang des Zukunftszinses (nicht Anstieg) würde IS nach rechts verschieben.',
          topics: ['IS-LM', 'Geldpolitik', 'Erwartungen']
        },
        {
          id: 'makro-tb2-q18', number: 18, points: 2,
          text: 'Betrachte das erweiterte IS-LM Modell (Kapitel 16) mit Erwartungen. Markiere die wahren Aussagen über Geldpolitik und Erwartungen.',
          choices: [
            { key: 'A', text: 'Wenn die Zentralbank glaubhaft den erwarteten Realzins ändern kann, ändert sich der Zins heute.' },
            { key: 'B', text: 'Wenn die Zentralbank glaubhaft den erwarteten Realzins ändern kann, beeinflusst dieser Zins die Gesamtproduktion heute.' },
            { key: 'C', text: 'Wenn die Zentralbank glaubhaft den erwarteten Realzins ändern kann, kann sie den derzeitigen Realzins nicht beeinflussen.' },
            { key: 'D', text: 'Wenn die Zentralbank den heutigen Realzins senkt und gleichzeitig glaubhaft den erwarteten Realzins senkt, verschiebt sich die LM-Kurve nach unten.' },
            { key: 'E', text: 'Wenn die Zentralbank den heutigen Realzins senkt und gleichzeitig glaubhaft den erwarteten Realzins senkt, verschiebt sich die IS-Kurve nach rechts.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'Forward Guidance (glaubhafte Ankündigung niedrigerer Zukunftszinsen) beeinflusst Investitions- und Konsumentscheidungen heute (B). Senkung des heutigen Zinses verschiebt LM nach unten (D), sinkende erwartete Zukunftszinsen verschieben IS nach rechts (E).',
          topics: ['Geldpolitik', 'Forward Guidance', 'IS-LM', 'Erwartungen']
        },
        {
          id: 'makro-tb2-q19', number: 19, points: 2,
          text: 'Betrachte das erweiterte IS-LM Modell (Kapitel 16) mit Erwartungen. Markiere die wahren Aussagen über eine Reduzierung der Staatsausgaben.',
          choices: [
            { key: 'A', text: 'Eine Reduzierung der Staatsausgaben führt immer zu einer geringeren Gesamtproduktion, auch wenn erwartete zukünftige Produktion und Zins sich ebenfalls ändern.' },
            { key: 'B', text: 'Eine Reduzierung der Staatsausgaben führt immer zu einer höheren Gesamtproduktion, auch wenn erwartete zukünftige Produktion und Zins sich ebenfalls ändern.' },
            { key: 'C', text: 'Die Zentralbank kann die negativen Folgen einer Reduzierung der Staatsausgaben abchwächen, indem sie den Zins erhöht.' },
            { key: 'D', text: 'Wenn $\\Delta G < 0$ zu $\\Delta Y\'^e > 0$ und $\\Delta r\'^e < 0$ führt, kann die Gesamtproduktion $Y$ steigen.' },
            { key: 'E', text: 'Die Zentralbank kann die negativen Folgen einer Reduzierung der Staatsausgaben abschwächen, wenn sie glaubhaft den erwarteten Zins senkt.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D', 'E'],
          explanation: 'Im erweiterten Modell sind die Effekte von Fiskalpolitik nicht eindeutig, wenn Erwartungen reagieren. Falls die Sparmassnahmen Vertrauen wecken ($Y\'^e \\uparrow$, $r\'^e \\downarrow$), kann die IS-Kurve nach rechts rücken und Produktion steigen (D). Die Zentralbank kann mit Forward Guidance unterstützen (E).',
          topics: ['Fiskalpolitik', 'IS-LM', 'Erwartungen', 'Multiplikator']
        },
        {
          id: 'makro-tb2-q20', number: 20, points: 2,
          text: 'Betrachte das erweiterte IS-LM Modell (Kapitel 16) mit Erwartungen. Nimm an, die Wirtschaft befindet sich an der Zinsuntergrenze, sodass die Zentralbank den Zins $r$ nicht weiter senken kann. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'An der Zinsuntergrenze können Änderungen in der Fiskalpolitik ($G$ und $T$) die Gesamtproduktion nicht mehr beeinflussen.' },
            { key: 'B', text: 'An der Zinsuntergrenze können Änderungen in $T\'^e$ die Gesamtproduktion nicht mehr beeinflussen.' },
            { key: 'C', text: 'Die Zentralbank kann die Gesamtproduktion verringern, indem sie den Zins $r$ erhöht.' },
            { key: 'D', text: 'Die Zentralbank kann die Gesamtproduktion erhöhen, indem sie glaubhaft den erwarteten zukünftigen Zins $r\'^e$ (über der Zinsuntergrenze) senkt.' },
            { key: 'E', text: 'Falls die Zentralbank $r\'^e$ glaubhaft senken kann, verschiebt sich die IS-Kurve nach rechts.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: 'An der Zinsuntergrenze kann der aktuelle Zins nicht weiter gesenkt werden, aber erhöht werden (C). Fiskalpolitik ($G$, $T$, $T\'^e$) wirkt weiterhin. Forward Guidance über niedrigere Zukunftszinsen ist wirksam: die IS-Kurve verschiebt sich nach rechts (D, E).',
          topics: ['Zinsuntergrenze', 'IS-LM', 'Geldpolitik', 'Forward Guidance']
        }
      ]
    }
  ]
};
