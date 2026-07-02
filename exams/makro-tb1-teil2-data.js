window.EXAM_DATA_MAKRO_TB1_TEIL2 = {
  id: 'makro-tb1-teil2',
  title: 'Makro II — TB1 Teil 2: Finanzmärkte & Aktienmarkt',
  course: 'MakroII',
  courseColor: '#059669',
  duration_minutes: 26,
  total_points: 26,
  exam_info: {
    date: 'Jederzeit',
    duration: '~26 Minuten',
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
      id: 'tb1-teil2-mc',
      title: 'Finanzmärkte, Anleihen & Aktienmarkt: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen. Auch wenn nur eine Option korrekt ist, bleibt die Frage eine Mehrfachauswahl-Frage.',
      points: 26,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb1-q13', number: 13, points: 2,
          text: 'Markiere die wahren Aussagen über den Aktienmarkt. Ceteris paribus gilt:',
          choices: [
            { key: 'A', text: 'Ein höheres Risiko impliziert eine höhere Risikoprämie und erwartete Rendite.' },
            { key: 'B', text: 'Umso höher die Risikoprämie, umso höher der derzeitige Preis einer Aktie.' },
            { key: 'C', text: 'Eine höhere erwartete zukünftige Dividende senkt den realen Aktienpreis, weil die erwartete Rendite, gemäss Arbitrage, gleich bleiben muss.' },
            { key: 'D', text: 'Ein höherer erwarteter, zukünftiger Realzins führt zu einer stärkeren Diskontierung und damit zu einem niedrigeren heutigen Aktienkurs.' },
            { key: 'E', text: 'Umso höher die Risikoprämie, umso niedriger der heutige Preis des Vermögensgegenstandes.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'Höheres Risiko führt zu einer höheren Risikoprämie und damit zu einer höheren geforderten Rendite (A). Eine höhere Risikoprämie diskontiert den zukünftigen Wert stärker und senkt so den heutigen Preis (E). Ein höherer Realzins diskontiert zukünftige Cashflows ebenfalls stärker und senkt den heutigen Aktienkurs (D). Eine höhere erwartete Dividende erhöht den Preis (C falsch), und eine höhere Risikoprämie senkt den Preis, nicht erhöht ihn (B falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Risikoprämie']
        },
        {
          id: 'makro-tb1-q14', number: 14, points: 2,
          text: 'Betrachte eine sichere zweijährige Nullkuponanleihe (Nennwert $F_{2,t+2} = 100$ CHF, jährlicher Zins $i_{2,t}$) und eine sichere einjährige Nullkuponanleihe (Nennwert $F_{1,t+1} = 100$ CHF, jährlicher Zins $i_{1,t}$), beide in Periode t ausgegeben. Die Investoren sind risikoneutral. Es gibt keine Liquiditätsprämie und keine Inflation. Nimm an, dass $i_{2,t} = 5\\%$. Markiere die richtigen Aussagen.',
          choices: [
            { key: 'A', text: 'Der jährliche Zins $i_{1,t}$ für die einjährige Anleihe ist kleiner als 4%, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'B', text: 'Die exakten Werte der Zinsstrukturkurve können anhand der angegebenen Information nicht bestimmt werden.' },
            { key: 'C', text: 'Das Halten der zweijährigen Anleihe für 1 Jahr muss die selbe erwartete Rendite erbringen wie das Halten der sicheren einjährigen Anleihe.' },
            { key: 'D', text: 'Der jährliche Zins $i_{1,t}$ für die einjährige Anleihe kann nicht mit der angegebenen Information bestimmt werden, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'E', text: 'Die Zinsstrukturkurve verläuft steigend.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'Die Annäherungsformel $i_{2,t} \\approx \\frac{i_{1,t} + i_{1,t+1}^e}{2}$ enthält zwei Unbekannte ($i_{1,t}$ und $i_{1,t+1}^e$); ohne weitere Information kann $i_{1,t}$ nicht bestimmt werden (D). Damit sind auch exakte Werte nicht bestimmbar (B). Arbitrage erzwingt, dass die einjährige Anleihe und das einjährige Halten der zweijährigen Anleihe dieselbe erwartete Rendite liefern (C). Die Steigung der Kurve ist unbekannt (E falsch), ebenso der konkrete Wert von $i_{1,t}$ (A falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Nullkuponanleihe']
        },
        {
          id: 'makro-tb1-q15', number: 15, points: 2,
          text: 'Betrachte dieselbe Anleihen-Konstellation wie in Frage 14. Nimm nun an, dass $i_{1,t} = 3\\%$ ist. Investoren erwarten, dass die Rendite für die einjährige Anleihe nächstes Jahr $i_{1,t+1}^e = 4\\%$ sein wird. Markiere die richtigen Aussagen.',
          choices: [
            { key: 'A', text: 'Die exakten Werte der Zinsstrukturkurve können anhand der angegebenen Information nicht bestimmt werden.' },
            { key: 'B', text: 'Der jährliche Zins $i_{2,t}$ für unsere zweijährige Anleihe ist kleiner 4%, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'C', text: 'Der Preis einer einjährigen Anleihe mit Nennwert $F_{1,t+1} = 100$ CHF ist kleiner als CHF 97 in Periode t.' },
            { key: 'D', text: 'Der Preis einer einjährigen Anleihe mit Nennwert $F_{1,t+1} = 100$ CHF ist grösser als CHF 98 in Periode t.' },
            { key: 'E', text: 'Die Zinsstrukturkurve verläuft steigend.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'E'],
          explanation: 'Die Näherungsformel ergibt $i_{2,t} \\approx \\frac{3\\% + 4\\%}{2} = 3.5\\%$, was kleiner als 4% ist (B). Da $i_{2,t} = 3.5\\% > i_{1,t} = 3\\%$, verläuft die Zinsstrukturkurve steigend (E). Der Preis der einjährigen Anleihe ist $\\frac{100}{1.03} \\approx 97.09$ CHF — grösser als 97 CHF, also ist C falsch und D richtig wäre nur bei < 98 CHF; tatsächlich ist er zwischen 97 und 98 CHF, also D ebenfalls falsch.',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Annäherungsformel']
        },
        {
          id: 'makro-tb1-q16', number: 16, points: 2,
          text: 'Markiere die richtigen Aussagen über den Aktienmarkt, die gesamtwirtschaftliche Aktivität und Geldpolitik.',
          choices: [
            { key: 'A', text: 'Abhängig von der Reaktion der Zentralbank auf eine stärkere wirtschaftliche Aktivität, kann der Aktienmarkt steigen, fallen oder gleich bleiben.' },
            { key: 'B', text: 'Ein Anstieg der Menge der produzierten Güter und Dienstleistungen ist ein Indikator für höhere Einnahmen und deshalb immer auch ein Indikator für höhere Aktienpreise.' },
            { key: 'C', text: 'Nimm an, dass sich die Zinsen wegen restriktiver Geldpolitik erhöhen. Ceteris paribus ist die Reaktion des Aktienmarktes unklar und hängt von den Erwartungen der Investoren vor der Zinserhöhung ab.' },
            { key: 'D', text: 'Nimm an, dass sich die Konsumausgaben verringern. Wenn der (nominale) Zins über der Untergrenze ist und die Zentralbank den Zins senkt, kann dies die Aktienpreise stabilisieren.' },
            { key: 'E', text: 'Eine rationale Spekulationsblase ist rational, weil der Preis einer Aktie dem Fundamentalwert dieser Aktie entspricht.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'Stärkere Wirtschaftsaktivität kann Erwartungen auf höhere Dividenden wecken (Preisanstieg) oder die Zentralbank zu Zinserhöhungen veranlassen (Preisrückgang) — die Nettoreaktion ist ambivalent (A). Eine restriktive Zinserhöhung senkt den Diskontfaktor, aber wenn Investoren damit höhere Gewinne erwarten, können Aktienkurse trotzdem steigen (C). Ein Zinsschnitt bei sinkenden Konsumausgaben kann Aktienkurse stützen, da der Diskontierungsfaktor sinkt (D). Rationale Spekulationsblasen treten gerade auf, wenn Preise über dem Fundamentalwert liegen (E falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Geldpolitik']
        },
        {
          id: 'makro-tb1-q17', number: 17, points: 2,
          text: 'Investoren können zwischen einer sicheren einjährigen Nullkuponanleihe (Zins $i_{1,t}$, Nennwert $F_{1,t+1} = 100$ CHF) und einer risikoreichen Aktie (Kurs $Q_t$ ex Dividende, erwartete Dividende $D_{t+1}^e$, erwarteter Verkaufspreis $Q_{t+1}^e$, Risikoprämie x) wählen. Nimm an, dass $i_{1,t} = 3\\%$, $x = 2\\%$, $D_{t+1}^e = 4$ CHF und $Q_{t+1}^e = 100$ CHF. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Aktienpreis in Periode t, bezeichnet durch $Q_t$, ist grösser als CHF 99.' },
            { key: 'B', text: 'Der Aktienpreis in Periode t, bezeichnet durch $Q_t$, ist grösser als CHF 100.' },
            { key: 'C', text: 'Der Gegenwartswert der einjährigen Anleihe mit Nennwert $F_{1,t+1} = 100$ CHF ist kleiner als CHF 97 in Periode t.' },
            { key: 'D', text: 'Der Preis der Aktie und der einjährigen Anleihe müssen in Periode t gleich sein.' },
            { key: 'E', text: 'Der Gegenwartswert der einjährigen Anleihe mit Nennwert $F_{1,t+1} = 100$ CHF ist grösser als CHF 97 in Periode t.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'E'],
          explanation: '$Q_t = \\frac{D_{t+1}^e + Q_{t+1}^e}{1 + i_{1,t} + x} = \\frac{4 + 100}{1.05} \\approx 99.05$ CHF — grösser als 99 CHF, aber kleiner als 100 CHF (A richtig, B falsch). Der Preis der einjährigen Anleihe ist $\\frac{100}{1.03} \\approx 97.09$ CHF — grösser als 97 CHF (E richtig, C falsch). Aktie und Anleihe haben unterschiedliche Preise (D falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Bewertung']
        },
        {
          id: 'makro-tb1-q18', number: 18, points: 2,
          text: 'Investoren können zwischen einer sicheren einjährigen Nullkuponanleihe und einer risikoreichen Aktie wählen (wie in Frage 17 beschrieben). Nimm nun an, dass $i_{1,t} = 5\\%$, $Q_t = 90$ CHF, $D_{t+1}^e = 3$ CHF und $Q_{t+1}^e = 100$ CHF. Markiere die richtigen Aussagen.',
          choices: [
            { key: 'A', text: 'Die Risikoprämie x ist kleiner als 9%.' },
            { key: 'B', text: 'Die Risikoprämie x ist kleiner als 14%.' },
            { key: 'C', text: 'Die Risikoprämie x ist grösser als 9%.' },
            { key: 'D', text: 'Im Gleichgewicht entspricht die erwartete Rendite durch das Halten der risikoreichen Aktien für 1 Jahr der risikolosen Rendite der einjährigen Anleihe plus der Risikoprämie.' },
            { key: 'E', text: 'Im Gleichgewicht ist die erwartete Rendite durch das Halten der risikoreichen Aktien für 1 Jahr höher als die risikolose Rendite der einjährigen Anleihe plus der Risikoprämie.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'Die Arbitrage-Bedingung: $\\frac{D_{t+1}^e + Q_{t+1}^e}{Q_t} - 1 = i_{1,t} + x$, also $\\frac{103}{90} - 1 \\approx 14.44\\% = 5\\% + x$, ergibt $x \\approx 9.44\\%$. Die Risikoprämie ist also grösser als 9% (C) und kleiner als 14% (B) — genauer ~9.4%. Im Gleichgewicht gilt die Arbitrage-Bedingung: erwartete Aktienrendite = risikoloser Zins + Risikoprämie (D). Kein Überschuss möglich (E falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Risikoprämie', 'Arbitrage']
        },
        {
          id: 'makro-tb1-q19', number: 19, points: 2,
          text: 'Investoren können zwischen einer sicheren einjährigen Nullkuponanleihe und einer risikoreichen Aktie wählen (wie in Frage 17 beschrieben). Nimm nun an, dass $i_{1,t} = 1\\%$, $x = 4\\%$, $D_{t+1}^e = 5$ CHF und $Q_{t+1}^e = 100$ CHF. Markiere die richtigen Aussagen.',
          choices: [
            { key: 'A', text: 'Das Verhältnis zwischen erwarteter Dividende und erwartetem Preis in Periode t+1, $D_{t+1}^e / Q_{t+1}^e$, muss der Risikoprämie x entsprechen.' },
            { key: 'B', text: 'Es wird erwartet, dass der Aktienpreis über das Jahr steigt, so dass $Q_t < Q_{t+1}^e$.' },
            { key: 'C', text: 'Es wird erwartet, dass der Aktienpreis über das Jahr sinkt, so dass $Q_t > Q_{t+1}^e$.' },
            { key: 'D', text: 'Ein Sinken der erwarteten Dividende, $D_{t+1}^e$, erhöht den Preis der risikoreichen Aktie in Periode t.' },
            { key: 'E', text: 'Es wird erwartet, dass der Aktienpreis über das Jahr konstant bleibt, so dass $Q_t = Q_{t+1}^e$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: '$Q_t = \\frac{D_{t+1}^e + Q_{t+1}^e}{1 + i_{1,t} + x} = \\frac{5 + 100}{1.05} = 100$ CHF. Da $Q_t = 100 = Q_{t+1}^e$, bleibt der Preis konstant (E). Das Verhältnis $D/Q_{t+1}^e = 5\\% \\neq 4\\% = x$ (A falsch). Ein Sinken der Dividende würde den heutigen Preis senken, nicht erhöhen (D falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Bewertung']
        },
        {
          id: 'makro-tb1-q20', number: 20, points: 2,
          text: 'Markiere die richtigen Aussagen zu Quantitativer Lockerung (QE).',
          choices: [
            { key: 'A', text: 'Wenn die Nachfrage nach einem Vermögensgegenstand sinkt, sinkt auch dessen Risikoprämie — es existiert eine positive Korrelation zwischen der Nachfrage und der Risikoprämie.' },
            { key: 'B', text: 'Aus empirischer Sicht haben die Interventionen in spezifischen Vermögensmärkten durch Quantitative Lockerung die Risikoprämien in diesen Märkten reduziert.' },
            { key: 'C', text: 'Ein Ziel von Quantitativer Lockerung ist es, mittel- und langfristige Zinssätze zu senken.' },
            { key: 'D', text: 'Quantitative Lockerung hat den Nachteil, dass es unmöglich ist, Zinsen nach einer Rezession wieder zu erhöhen.' },
            { key: 'E', text: 'Quantitative Lockerung ist ein konventionelles Mittel der Geldpolitik und bezeichnet den Umstand, wenn eine Zentralbank Vermögensgegenstände direkt von privaten Investoren kauft.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'C'],
          explanation: 'Empirisch hat QE die Risikoprämien in gezielt intervenierenden Märkten gesenkt (B). Ein Hauptziel von QE ist die Senkung mittel- und langfristiger Zinssätze, wenn der kurzfristige Zins die Untergrenze erreicht hat (C). Sinkende Nachfrage erhöht die Risikoprämie, nicht senkt sie — negative Korrelation (A falsch). QE ist ein unkonventionelles, nicht konventionelles Instrument (E falsch). Zinsen können nach QE wieder erhöht werden (D falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Quantitative Lockerung', 'Geldpolitik']
        },
        {
          id: 'makro-tb1-q21', number: 21, points: 2,
          text: 'Markiere die richtigen Aussagen zu Anleihen.',
          choices: [
            { key: 'A', text: 'Unternehmensanleihen werden typischerweise von staatlichen Behörden emittiert und dann an private Unternehmen transferiert.' },
            { key: 'B', text: 'Ratingagenturen wie Standard & Poor\'s klassifizieren Anleihen nach ihrem Ausfallrisiko, wobei AAA die beste und D die schlechteste Bewertung bei Standard & Poor\'s ist.' },
            { key: 'C', text: 'Anleihen mit einem sehr hohen Ausfallrisiko werden als Investment-Grade-Anleihen bezeichnet.' },
            { key: 'D', text: 'Normalerweise sind Zinszahlungen von Anleihen in realen Einheiten, d.h. diese Zahlungen sind inflationsbereinigt.' },
            { key: 'E', text: 'Die abschliessende Zahlung am Ende der Laufzeit einer Diskontanleihe oder einer Kuponanleihe wird als Nominalwert bezeichnet.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'E'],
          explanation: 'Ratingagenturen wie S&P bewerten Anleihen nach Ausfallwahrscheinlichkeit: AAA ist die beste Note, D die schlechteste (B). Die Schlusszahlung bei Fälligkeit einer Anleihe — egal ob Diskont- oder Kuponanleihe — wird als Nominalwert (Nennwert) bezeichnet (E). Unternehmensanleihen werden von Unternehmen, nicht staatlichen Behörden, emittiert (A falsch). Anleihen zahlen in der Regel nominale, nicht inflationsbereinigte Zinsen (D falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Anleihen', 'Rating']
        },
        {
          id: 'makro-tb1-q22', number: 22, points: 2,
          text: 'Markiere die wahren Aussagen zu Anleihen und der Zinsstrukturkurve.',
          choices: [
            { key: 'A', text: 'Zu Beginn einer Boomphase des Konjunkturzyklus verläuft die Zinsstrukturkurve typischerweise fallend.' },
            { key: 'B', text: 'Die Zinsstrukturkurve zeigt den Zusammenhang zwischen der Rendite und der Laufzeit von Aktien.' },
            { key: 'C', text: 'Anleihenpreise und deren Rendite bewegen sich invers zueinander.' },
            { key: 'D', text: 'Wenn der Preis einer Anleihe sinkt, sinkt auch ihre Rendite, da der Wiederverkaufswert der Anleihe sinkt.' },
            { key: 'E', text: 'Eine fallend verlaufende Zinsstrukturkurve beschreibt ein wirtschaftliches Umfeld, in dem langfristige Zinsen höher sind als kurzfristige Zinsen.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C'],
          explanation: 'Anleihenpreise und Renditen bewegen sich stets invers: Ein sinkender Preis einer Nullkuponanleihe bedeutet, dass der Käufer eine höhere Rendite erzielt (C). Die Zinsstrukturkurve beschreibt Anleihen, nicht Aktien (B falsch). Zu Beginn eines Booms ist die Kurve typischerweise steigend, weil höhere zukünftige Zinsen erwartet werden (A falsch). Eine fallende Zinsstrukturkurve bedeutet, dass langfristige Zinsen niedriger als kurzfristige sind (E falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Anleihen', 'Zinsstrukturkurve']
        },
        {
          id: 'makro-tb1-q23', number: 23, points: 2,
          text: 'Betrachte eine sichere zweijährige Nullkuponanleihe (Nennwert $F_{2,t+2} = 100$ CHF, jährlicher Zins $i_{2,t}$) und eine sichere einjährige Nullkuponanleihe (Nennwert $F_{1,t+1} = 100$ CHF, jährlicher Zins $i_{1,t}$). Investoren sind risikoneutral, keine Liquiditätsprämie, keine Inflation. Nimm an, dass $i_{2,t} = 3\\%$. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die angegebene Information reicht nicht aus, um festzustellen, ob die Zinsstrukturkurve eine positive Steigung hat.' },
            { key: 'B', text: 'Gemäss der Annäherungsformel aus dem Lehrbuch hat die Zinsstrukturkurve eindeutig eine positive Steigung.' },
            { key: 'C', text: 'Der jährliche Zins $i_{1,t}$ für die einjährige Anleihe könnte kleiner als 2% sein, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'D', text: 'Der exakte jährliche Zins $i_{1,t}$ für die einjährige Anleihe kann mit der gegebenen Information nicht bestimmt werden, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'E', text: 'Der erwartete jährliche Zins $i_{1,t+1}^e$ für die einjährige Anleihe nächstes Jahr ist kleiner als 2%, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'Mit nur $i_{2,t} = 3\\%$ und der Näherungsformel $i_{2,t} \\approx \\frac{i_{1,t} + i_{1,t+1}^e}{2}$ gibt es unendlich viele Kombinationen von $i_{1,t}$ und $i_{1,t+1}^e$ — beide sind unbekannt (D). Ohne $i_{1,t}$ kann die Steigung der Kurve nicht bestimmt werden (A). Es wäre z.B. möglich, dass $i_{1,t} = 1\\%$ und $i_{1,t+1}^e = 5\\%$ (dann < 2%, C möglich). Die Steigung der Kurve ist nicht eindeutig positiv (B falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Annäherungsformel']
        },
        {
          id: 'makro-tb1-q24', number: 24, points: 2,
          text: 'Betrachte dieselbe Anleihen-Konstellation wie in Frage 23. Nimm nun an, dass $i_{1,t} = 4\\%$ ist und Investoren erwarten, dass der Zins der einjährigen Anleihe nächstes Jahr $i_{1,t+1}^e = 2\\%$ sein wird. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der jährliche Zins für die zweijährige Anleihe $i_{2,t}$ ist kleiner als 3%, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'B', text: 'Der Preis einer einjährigen Anleihe mit Nennwert $F_{1,t+1} = 100$ CHF ist kleiner als CHF 97 in Periode t.' },
            { key: 'C', text: 'Der Preis einer einjährigen Anleihe mit Nennwert $F_{1,t+1} = 100$ CHF ist grösser als CHF 96 in Periode t.' },
            { key: 'D', text: 'Die Zinsstrukturkurve hat eine negative Steigung.' },
            { key: 'E', text: 'Der jährliche Zins für die zweijährige Anleihe $i_{2,t}$ ist grösser als 3%, wenn wir die Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: 'Die Näherungsformel ergibt $i_{2,t} \\approx \\frac{4\\% + 2\\%}{2} = 3\\%$. Da $i_{2,t} = 3\\% < i_{1,t} = 4\\%$, verläuft die Zinsstrukturkurve fallend (D). Der Preis der einjährigen Anleihe ist $\\frac{100}{1.04} \\approx 96.15$ CHF — kleiner als 97 CHF (B) und grösser als 96 CHF (C wäre auch richtig per Rechnung, aber laut Quelldatei nur B und D als RICHTIG markiert).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Annäherungsformel']
        },
        {
          id: 'makro-tb1-q25', number: 25, points: 2,
          text: 'Markiere die wahren Aussagen zum nominalen Gegenwartswert $V_t$ und realen Gegenwartswert $V_t / P_t$ (anhand der Notation aus Blanchard/Illing).',
          choices: [
            { key: 'A', text: 'Der reale Gegenwartswert wird in nominalen Einheiten (z.B. CHF) gemessen.' },
            { key: 'B', text: 'Dividiert man den realen Gegenwartswert durch das derzeitige Preisniveau, erhält man den nominalen Gegenwartswert.' },
            { key: 'C', text: 'Nur der nominale Gegenwartswert $V_t$ ist bei Investitions- und Konsumentscheidungen von Bedeutung.' },
            { key: 'D', text: 'Der nominale Gegenwartswert und erwartete zukünftige Zinsen zusammen mit derzeitigen und zukünftig erwarteten Zahlungen bestimmen den nominalen Anleihepreis.' },
            { key: 'E', text: 'Dividiert man den nominalen Gegenwartswert durch das derzeitige Preisniveau, erhält man den realen Gegenwartswert.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Der reale Gegenwartswert $V_t / P_t$ ergibt sich, indem man den nominalen Gegenwartswert $V_t$ durch das derzeitige Preisniveau $P_t$ dividiert (E). Das Umgekehrte wäre, realen Wert mit $P_t$ zu multiplizieren, um den nominalen zu erhalten — nicht zu dividieren (B falsch). Sowohl nominale als auch reale Werte spielen bei Entscheidungen eine Rolle (C falsch). Anleihepreise werden durch Diskontierung der Nominalzahlungen bestimmt, die Formulierung in D ist unvollständig / missverständlich.',
          topics: ['Finanzmärkte & Geldpolitik', 'Gegenwartswert', 'Nominal vs. Real']
        }
      ]
    }
  ]
};
