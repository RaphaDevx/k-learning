window.EXAM_DATA_MAKRO_TB1_TEIL1 = {
  id: 'makro-tb1-teil1',
  title: 'Makro II — TB1 Teil 1: Zinsstrukturkurve, Anleihen & Aktienmarkt',
  course: 'MakroII',
  courseColor: '#059669',
  duration_minutes: 18,
  total_points: 24,
  exam_info: {
    date: 'Jederzeit',
    duration: '~18 Minuten',
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
      id: 'tb1-teil1-sc',
      title: 'Zinsstrukturkurve: Single Choice',
      description: 'Pro Frage ist genau eine Antwort richtig.',
      points: 2,
      question_type: 'single_choice',
      questions: [
        {
          id: 'makro-tb1-q02', number: 2, points: 2,
          text: 'Betrachte eine sichere zweijährige Nullkupon-Anleihe (Nennwert $F_{2,t+2}=\\$100$, jährlicher Zins $i_{2,t}$) und eine sichere einjährige Nullkupon-Anleihe (Nennwert $F_{1,t+1}=\\$100$, jährlicher Zins $i_{1,t}$), beide ausgegeben in Periode t. Die Investoren sind risikoneutral, es gibt keine Liquiditätsprämie und keine Inflation. Wenn $i_{1,t} = 2\\%$ ist, ist der jährliche Zins $i_{2,t}$ für unsere zweijährige Anleihe, wenn wir die praktische Annäherungsformel aus dem Lehrbuch verwenden, ...',
          choices: [
            { key: 'A', text: 'gleich 1%.' },
            { key: 'B', text: 'gleich 2%.' },
            { key: 'C', text: 'zwangsläufig gleich $i_{1,t}$.' },
            { key: 'D', text: 'zwangsläufig grösser als $i_{1,t}$.' },
            { key: 'E', text: 'nicht anhand der gegebenen Informationen bestimmbar.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['E'],
          explanation: 'Die Näherungsformel $i_{2,t} \\approx \\frac{i_{1,t} + i_{1,t+1}^e}{2}$ benötigt den erwarteten zukünftigen Zins $i_{1,t+1}^e$. Da dieser hier nicht gegeben ist, lässt sich $i_{2,t}$ nicht bestimmen.',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Näherungsformel']
        }
      ]
    },
    {
      id: 'tb1-teil1-mc',
      title: 'Zinsstrukturkurve, Anleihen & Aktienmarkt: Multiple Choice',
      description: 'Markiere alle zutreffenden Aussagen. Auch wenn nur eine Option korrekt ist, bleibt die Frage eine Mehrfachauswahl-Frage.',
      points: 22,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'makro-tb1-q01', number: 1, points: 2,
          text: 'Markiere die wahren Aussagen zur Zinsstrukturkurve.',
          choices: [
            { key: 'A', text: 'Empirisch betrachtet verläuft die Zinsstrukturkurve normalerweise fallend.' },
            { key: 'B', text: 'Die Zinsstrukturkurve zeigt den Zusammenhang zwischen der Rendite und dem Preis einer Anleihe.' },
            { key: 'C', text: 'Eine fallend verlaufende Zinsstrukturkurve kann auf eine bevorstehende Rezession hindeuten.' },
            { key: 'D', text: 'Eine Änderung der Erwartungen zukünftiger Zinsen kann die Steigung der Zinsstrukturkurve ändern.' },
            { key: 'E', text: 'Empirisch erklärt Risiko, warum die Zinsstrukturkurve tendenziell fallend verläuft.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Die Zinsstrukturkurve zeigt den Zusammenhang zwischen Rendite und Laufzeit (nicht Preis) einer Anleihe (b falsch). Empirisch verläuft sie meist steigend statt fallend (a falsch), und die Risikoprämie erklärt eher die typische Steigung als ein Fallen der Kurve (e falsch). Eine inverse (fallende) Kurve gilt als Vorlaufindikator für eine Rezession (c), und über die Erwartungshypothese verändern Erwartungsänderungen zukünftiger Zinsen die Steigung der Kurve (d).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Erwartungshypothese']
        },
        {
          id: 'makro-tb1-q03', number: 3, points: 2,
          text: 'Nimm nun an, dass $i_{1,t} = 5\\%$ ist und Investoren erwarten, dass der Zins auf einjährige Anleihen für immer konstant bleibt. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Zinsstrukturkurve ist horizontal.' },
            { key: 'B', text: 'Die Zinsstrukturkurve verläuft steigend.' },
            { key: 'C', text: 'Die Zinsstrukturkurve verläuft fallend.' },
            { key: 'D', text: 'Der jährliche Zins $i_{2,t}$ für unsere zweijährige Anleihe ist gleich 5%, wenn wir die praktische Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'E', text: 'Der Preis der einjährigen Anleihe heute ist unter \\$96.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'D', 'E'],
          explanation: 'Da der einjährige Zins für immer bei 5% erwartet wird ($i_{1,t+1}^e=5\\%$), liefert die Näherungsformel $i_{2,t} \\approx \\frac{i_{1,t}+i_{1,t+1}^e}{2}=5\\%=i_{1,t}$ — die Zinsstrukturkurve ist also horizontal (a, d). Der Preis der einjährigen Anleihe ist $P_{1,t}=\\frac{100}{1.05}\\approx95.24$ CHF, also unter 96 CHF (e).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Anleihenpreise']
        },
        {
          id: 'makro-tb1-q04', number: 4, points: 2,
          text: 'Nimm nun an, dass $i_{1,t} = 2\\%$ ist und dass die Investoren erwarten, dass der Zins auf einjährige Anleihen nächstes Jahr $i_{1,t+1}^e = 4\\%$ sein wird und für immer auf diesem Niveau bleiben wird. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Zinsstrukturkurve verläuft steigend.' },
            { key: 'B', text: 'Die Zinsstrukturkurve verläuft fallend.' },
            { key: 'C', text: 'Der jährliche Zins $i_{2,t}$ für unsere zweijährige Anleihe ist 4%, wenn wir die praktische Annäherungsformel aus dem Lehrbuch verwenden.' },
            { key: 'D', text: 'Der Preis für die einjährige Anleihe heute ist kleiner als \\$96.' },
            { key: 'E', text: 'Der Preis für die zweijährige Anleihe heute ist kleiner als \\$95.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A', 'E'],
          explanation: 'Mit der Näherungsformel ergibt sich $i_{2,t} \\approx \\frac{i_{1,t}+i_{1,t+1}^e}{2}=\\frac{2\\%+4\\%}{2}=3\\% > i_{1,t}=2\\%$ — die Zinsstrukturkurve verläuft daher steigend (a), nicht fallend (b falsch), und $i_{2,t}$ ist 3%, nicht 4% (c falsch). Der Preis der zweijährigen Anleihe ist $P_{2,t}=\\frac{100}{1.03^2}\\approx94.26$ CHF $<95$ CHF (e). Der Preis der einjährigen Anleihe ist $P_{1,t}=\\frac{100}{1.02}\\approx98.04$ CHF, also nicht kleiner als 96 CHF (d falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Anleihenpreise']
        },
        {
          id: 'makro-tb1-q05', number: 5, points: 2,
          text: 'Nimm nun an, dass $i_{1,t}=4\\%$ ist und dass die Investoren erwarten, dass der Zins auf einjährige Anleihen nächstes Jahr $i_{1,t+1}^e=0\\%$ sein wird und für immer auf diesem Niveau bleiben wird. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die Zinsstrukturkurve verläuft steigend.' },
            { key: 'B', text: 'Die Zinsstrukturkurve verläuft fallend.' },
            { key: 'C', text: 'Der exakte jährliche Zins $i_{2,t}$ für unsere zweijährige Anleihe, auf zwei Nachkommastellen gerundet, ist gleich 2.01%.' },
            { key: 'D', text: 'Der Preis der einjährigen Anleihe entspricht dem Preis der zweijährigen Anleihe.' },
            { key: 'E', text: 'Der Preis der zweijährigen Anleihe ist unter \\$96.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: 'Mit $i_{1,t+1}^e=0\\% < i_{1,t}=4\\%$ ergibt die Näherungsformel $i_{2,t}\\approx\\frac{4\\%+0\\%}{2}=2\\% < i_{1,t}$ — die Zinsstrukturkurve verläuft fallend (b). Der exakte zweijährige Zins folgt aus $(1+i_{2,t})^2=(1+i_{1,t})(1+i_{1,t+1}^e)=1.04\\cdot1.00$, also $i_{2,t}\\approx1.98\\%$ (nicht 2.01%, c falsch). Damit gilt $P_{2,t}=\\frac{100}{(1+i_{2,t})^2}=\\frac{100}{1.04}\\approx96.15=P_{1,t}=\\frac{100}{1.04}$ — die Preise der ein- und zweijährigen Anleihe sind heute gleich (d), und $P_{2,t}$ liegt über (nicht unter) 96 CHF (e falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve', 'Anleihenpreise']
        },
        {
          id: 'makro-tb1-q06', number: 6, points: 2,
          text: 'Investoren wählen zwischen einer sicheren einjährigen Nullkupon-Anleihe mit Zins $i_{1,t}$ und einer risikoreichen Aktie mit heutigem Kurs $Q_t$ (ex Dividende), die im nächsten Jahr die erwartete Dividende $D_{t+1}^e$ auszahlt und zum erwarteten Preis $Q_{t+1}^e$ verkauft wird. Die Aktie bietet eine Risikoprämie x. Markiere die wahren Aussagen. Ceteris paribus:',
          choices: [
            { key: 'A', text: 'Je höher die Aktienprämie x, desto höher ist der Aktienpreis $Q_t$.' },
            { key: 'B', text: 'Je höher die erwartete Dividende, desto höher ist der Aktienpreis $Q_t$.' },
            { key: 'C', text: 'Je höher der Zins $i_{1,t}$, desto höher ist der Aktienpreis $Q_t$.' },
            { key: 'D', text: 'Der Aktienpreis $Q_t$ ist unabhängig vom Zins $i_{1,t}$.' },
            { key: 'E', text: 'Je höher die erwartete Dividende $D_{t+1}^e$, desto niedriger ist der Aktienpreis $Q_t$.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B'],
          explanation: 'Aus der Arbitragebedingung $Q_t = \\frac{D_{t+1}^e + Q_{t+1}^e}{1+i_{1,t}+x}$ folgt: Eine höhere erwartete Dividende erhöht den Zähler und damit $Q_t$ (b). Eine höhere Risikoprämie x oder ein höherer Zins $i_{1,t}$ erhöhen den Nenner und senken $Q_t$ (a, c, d falsch); e widerspricht b und ist daher falsch.',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Aktienbewertung']
        },
        {
          id: 'makro-tb1-q07', number: 7, points: 2,
          text: 'Nimm an, dass $i_{1,t}=1\\%$, $x=4\\%$, $Q_t=100$ CHF und $Q_{t+1}^e=100$ CHF (gleicher Kontext: Investoren wählen zwischen der einjährigen Anleihe und einer risikoreichen Aktie mit Risikoprämie x). Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Die erwartete Dividende muss dem einjährigen Zins entsprechen, also $D_{t+1}^e = i_{1,t}$.' },
            { key: 'B', text: 'Die erwartete Dividende relativ zum Aktienpreis muss dem einjährigen Zins entsprechen, also $D_{t+1}^e/Q_t = i_{1,t}$.' },
            { key: 'C', text: 'Dies kann kein Gleichgewicht sein, da die Aktie keinen Kursgewinn verzeichnet und der Zins positiv ist.' },
            { key: 'D', text: 'Die erwartete Dividende muss gleich 5 CHF sein.' },
            { key: 'E', text: 'Die erwartete Dividende muss gleich 0.04 CHF sein.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['D'],
          explanation: 'Aus der Arbitragebedingung $Q_t(1+i_{1,t}+x) = D_{t+1}^e + Q_{t+1}^e$ folgt mit den gegebenen Werten $100\\cdot1.05 = D_{t+1}^e + 100$, also $D_{t+1}^e = 5$ CHF (d). Aussage (c) ist falsch: Die Dividende von 5 CHF kompensiert den fehlenden Kursgewinn — ein Gleichgewicht ohne Kursgewinn ist möglich, solange die Dividendenrendite Zins plus Risikoprämie deckt.',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Arbitrage']
        },
        {
          id: 'makro-tb1-q08', number: 8, points: 2,
          text: 'Nimm an, dass $i_{1,t}=0\\%$, $x=4\\%$, $D_{t+1}^e=10$ CHF und $Q_{t+1}^e=110$ CHF. Markiere die wahren Aussagen.',
          choices: [
            { key: 'A', text: 'Der Aktienpreis muss der erwarteten Dividende entsprechen, also $Q_t = D_{t+1}^e$.' },
            { key: 'B', text: 'Es wird erwartet, dass der Aktienpreis über das Jahr steigt.' },
            { key: 'C', text: 'Es wird erwartet, dass der Aktienpreis über das Jahr sinkt.' },
            { key: 'D', text: 'Der Aktienkurs heute ist über 110 CHF.' },
            { key: 'E', text: 'Der Aktienkurs heute ist über 114 CHF.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: '$Q_t = \\frac{D_{t+1}^e+Q_{t+1}^e}{1+i_{1,t}+x} = \\frac{10+110}{1.04} \\approx 115.38$ CHF. Da $Q_t \\approx 115.38 > Q_{t+1}^e=110$, wird ein Kursrückgang erwartet (c), und $Q_t$ liegt über 110 CHF (d) und über 114 CHF (e).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Arbitrage']
        },
        {
          id: 'makro-tb1-q09', number: 9, points: 2,
          text: 'Markiere die wahren Aussagen zum Aktienmarkt.',
          choices: [
            { key: 'A', text: 'Bewegungen von Aktienpreisen werden durch vergangene Zinsen und Dividenden hervorgerufen.' },
            { key: 'B', text: 'Der fundamentale Wert einer Aktie entspricht dem Barwert der erwarteten Dividenden.' },
            { key: 'C', text: 'Abweichungen vom fundamentalen Wert einer Aktie sind immer irrational.' },
            { key: 'D', text: 'Wenn eine geldpolitische Expansion des Fed unerwartet die Zinsen ändert, steigt die Bewertung des Aktienmarktes.' },
            { key: 'E', text: 'Wenn eine geldpolitische Expansion des Fed unerwartet die Zinsen ändert, sinkt die Bewertung des Aktienmarktes.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'D'],
          explanation: 'Der Fundamentalwert einer Aktie ist der Barwert aller erwarteten zukünftigen Dividenden (b). Eine unerwartete expansive Geldpolitik senkt die (erwarteten) Zinsen, wodurch der Diskontfaktor sinkt und der Barwert/die Bewertung der Aktien steigt (d). Aktienpreise reagieren auf Erwartungsänderungen, nicht primär auf vergangene Werte (a falsch), und Abweichungen vom Fundamentalwert sind nicht automatisch irrational (c falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Aktienmarkt', 'Fundamentalwert']
        },
        {
          id: 'makro-tb1-q10', number: 10, points: 2,
          text: 'Markiere die wahren Aussagen zu unkonventioneller Geldpolitik.',
          choices: [
            { key: 'A', text: 'Die quantitative Lockerung (QE) hat zu einem Rückgang der Geldbasis geführt.' },
            { key: 'B', text: 'Das Ziel der quantitativen Lockerung (QE) ist es, den Leitzins unter null zu senken.' },
            { key: 'C', text: 'Die quantitative Lockerung (QE) soll Zinsen von längerfristigen Anleihen senken.' },
            { key: 'D', text: 'In den USA hat die quantitative Lockerung (QE) das Verhältnis von Zentralbankgeld zum BIP auf mehr als 50% erhöht.' },
            { key: 'E', text: 'Die quantitative Lockerung (QE) soll die zukünftigen Renditen der erworbenen Anleihen senken.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C', 'E'],
          explanation: 'QE erhöht die Geldbasis durch Anleihekäufe der Zentralbank (a falsch) und zielt darauf ab, die Renditen/Zinsen der erworbenen, meist längerfristigen Anleihen zu senken (c, e richtig) — nicht darauf, den Leitzins selbst unter null zu drücken (b falsch), denn QE wird gerade eingesetzt, wenn der Leitzins bereits an der Zinsuntergrenze ist.',
          topics: ['Finanzmärkte & Geldpolitik', 'Quantitative Lockerung', 'Unkonventionelle Geldpolitik']
        },
        {
          id: 'makro-tb1-q11', number: 11, points: 2,
          text: 'Markiere die wahren Aussagen zur Zinsstrukturkurve.',
          choices: [
            { key: 'A', text: 'Eine steigend verlaufende Zinsstrukturkurve deutet darauf hin, dass die Risikoprämie von Aktien voraussichtlich steigt.' },
            { key: 'B', text: 'Eine fallend verlaufende Zinsstrukturkurve deutet darauf hin, dass die Zentralbank die Zinsen in der Zukunft wahrscheinlich erhöhen wird.' },
            { key: 'C', text: 'Eine steigend verlaufende Zinsstrukturkurve kann auf eine sich erholende Wirtschaft hindeuten.' },
            { key: 'D', text: 'Eine horizontal verlaufende Zinsstrukturkurve ist ein Zeichen für konstantes wirtschaftliches Wachstum ohne grössere Fluktuationen anderer makroökonomischer Variablen.' },
            { key: 'E', text: 'Eine steigend verlaufende Zinsstrukturkurve deutet darauf hin, dass das Risiko einer Rezession in der Zukunft zunimmt.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['C'],
          explanation: 'Eine steigend verlaufende Zinsstrukturkurve wird häufig mit einer sich erholenden bzw. expandierenden Wirtschaft assoziiert, da höhere erwartete zukünftige Zinsen auf erwartetes Wachstum hindeuten (c). Eine fallende (inverse) Kurve ist klassischerweise ein Rezessionssignal — das Gegenteil von (e), und die Zentralbank würde die Zinsen bei einer fallenden Kurve eher senken als erhöhen (b falsch). Eine horizontale Kurve erlaubt keine derart allgemeine Aussage über Wachstum und Fluktuationen (d falsch).',
          topics: ['Finanzmärkte & Geldpolitik', 'Zinsstrukturkurve']
        },
        {
          id: 'makro-tb1-q12', number: 12, points: 2,
          text: 'Markiere die wahren Aussagen zu Arbitrage.',
          choices: [
            { key: 'A', text: 'Gemäss der Definition aus dem Lehrbuch von Blanchard/Illing ist Arbitrage die Differenz zwischen der erwarteten Rendite einer risikolosen Anleihe und einer Aktie.' },
            { key: 'B', text: 'Arbitrage bedeutet, dass die diskontierten erwarteten Gegenwartswerte zweier Investmentportfolios von gleicher Grösse und mit gleichem Zeithorizont gleich gross sind, auch wenn die Anleihen der zwei Portfolios verschieden lange Laufzeiten haben.' },
            { key: 'C', text: 'Das Konzept Arbitrage ist nur beim Vergleich von Vermögenswerten mit gleicher Laufzeit anwendbar.' },
            { key: 'D', text: 'Gemäss der Erwartungshypothese spielen sowohl die erwartete Rendite als auch die Preisvolatilität eine Rolle.' },
            { key: 'E', text: 'Unter der Erwartungshypothese impliziert Arbitrage, dass die erwartete, auf Jahresbasis umgerechnete Rendite zweier Vermögenstitel gleich hoch sein muss.' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['B', 'E'],
          explanation: 'Arbitrage bedeutet, dass gleich grosse, gleich lang gehaltene Portfolios den gleichen erwarteten (diskontierten) Wert haben müssen — unabhängig von der Laufzeit der einzelnen Anleihen (b). Unter der Erwartungshypothese (Risikoneutralität, keine Liquiditätsprämie) impliziert dies, dass die annualisierten erwarteten Renditen verschiedener Anleihen gleich sein müssen (e). Arbitrage ist nicht auf gleiche Laufzeiten beschränkt (c falsch), und die Erwartungshypothese blendet Risiko/Volatilität gerade aus (d falsch); (a) verwechselt Arbitrage mit der Definition der Risikoprämie.',
          topics: ['Finanzmärkte & Geldpolitik', 'Arbitrage', 'Erwartungshypothese']
        }
      ]
    }
  ]
};
