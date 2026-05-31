window.EXAM_DATA_ESF_HS22 = {
  id: 'esf-hs22',
  title: 'ESF — Prüfung HS 2022',
  course: 'Empirische Sozialforschung',
  courseColor: '#16a34a',
  duration_minutes: 60,
  total_points: 60,
  exam_info: {
    date: '23.06.2026',
    duration: '60 Minuten',
    format: 'Single Choice (Teil I–III) + Multiple Choice (Teil IV)',
    allowed_aids: 'Keine',
    grading: 'Basierend auf Notenschlüssel HS23 (skaliert auf 60 Punkte)'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'teil1',
      title: 'Teil I: Forschungsmethoden (6 Punkte)',
      description: 'Fragen 1–3 beziehen sich auf den Artikel "Meme marketing: How can marketers drive better engagement using viral memes?" (Malodia et al., 2022). 35 Tiefeninterviews mit 20 Meme-Nutzenden, 6 Meme-Kreierenden, 4 Influencer*innen und 5 Markenmanager*innen. Theoretisches Sampling. Single Choice: richtig = 2 Punkte.',
      points: 6,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-hs22-01',
          number: 1,
          points: 2,
          text: 'Die folgende Tabelle zeigt Ergebnisse aus dem Abschnitt "Ergebnisse" des Artikels. Sie zeigt Codes in drei Ordnungen: Nullte Ordnung (Beliebt, Themenbezogen, Bekannt, ...), Erste Ordnung (Relevanz, Ikonizität, ...) und Zweite Ordnung (Inhaltsbezogene Faktoren). Welche Aussage zur Tabelle ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Tabelle stammt höchstwahrscheinlich aus einem Experiment mit drei Konditionen (nullte, erste, zweite Ordnung).' },
            { key: 'B', text: 'Die Tabelle spiegelt eine positivistische Forschungsmethodologie wider.' },
            { key: 'C', text: 'Die Tabelle beschreibt höchstwahrscheinlich das Ergebnis eines Kodierungsprozesses, in dem Codes "nullter Ordnung" hin zu Codes "zweiter Ordnung" zusammengefasst werden.' },
            { key: 'D', text: 'Die Tabelle ist das Ergebnis eines Stichprobenverfahrens, das offene, axiale und selektive Stichprobenziehungen umfasst.' },
            { key: 'E', text: 'Da die Daten in drei Gruppen vorliegen, sind sie nicht dichotom.' }
          ],
          correct: ['C'],
          explanation: 'In der Grounded Theory werden Rohdaten (nullte Ordnung) durch offenes, axiales und selektives Kodieren schrittweise zu abstrakteren Kategorien (zweite Ordnung) zusammengefasst. Die Tabelle zeigt genau diesen Aggregationsprozess — typisch für induktive qualitative Forschung.'
        },
        {
          id: 'esf-hs22-02',
          number: 2,
          points: 2,
          text: '35 Tiefeninterviews wurden mit 20 Meme-Nutzenden, 6 Meme-Kreierenden (4M/2F), 4 Influencer*innen (3M/1F) und 5 Markenmanager*innen (2M/3F) über 8 Wochen durchgeführt, ausgewählt via theoretisches Sampling. Welche Aussage in Bezug auf den Textauszug ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Methode der Datenerhebung lässt sich am besten als teilnehmende Beobachtung beschreiben.' },
            { key: 'B', text: 'Der Stichprobenfehler ist hier ein grosses Problem, da die Stichprobe nicht repräsentativ ist.' },
            { key: 'C', text: 'Anstelle des gewählten Stichprobenverfahrens hätten die Forschenden auch eine heimliche Stichprobenziehung verwenden können.' },
            { key: 'D', text: 'Die Dauer der Datenerhebung (8 Wochen) ist zu kurz für 35 Tiefeninterviews.' },
            { key: 'E', text: 'Die Vielfalt der befragten Teilnehmenden trägt höchstwahrscheinlich dazu bei, dass die Ergebnisse auf Kosten der Tiefe breiter angelegt sind (d.h. verschiedene Perspektiven und Nutzungsmotivationen erfassen).' }
          ],
          correct: ['E'],
          explanation: 'In qualitativer Forschung besteht ein klassischer Trade-off: Eine heterogene Stichprobe (verschiedene Rollen: Nutzende, Kreierenden, Influencer, Manager) erfasst ein breiteres Spektrum an Perspektiven, verliert aber Tiefe im Vergleich zu einer homogenen Fokussierung. B ist falsch: Stichprobenfehler ist ein quantitatives Konzept; qualitative Forschung erhebt keinen Anspruch auf Repräsentativität.'
        },
        {
          id: 'esf-hs22-03',
          number: 3,
          points: 2,
          text: 'Vervollständigen Sie den Auszug aus dem Abschnitt "Methoden": "Da die Literatur zu Memes begrenzt ist, war ein (1)___ Forschungsdesign erforderlich, das auf der (2)___ Theory basiert. Gemäss dem Ansatz muss die Forschung mit (3)___ selbst beginnen. Die daraus resultierende Theorie basiert auf (4)___ und ist hilfreich, um ein Phänomen zu verstehen, das durch bestehende Theorien (5)___ ist." Welche Wörter sind am ehesten richtig?',
          choices: [
            { key: 'A', text: '(1) deduktives, (2) Grounded, (3) den Daten, (4) empirischen Daten, (5) nicht erklärbar' },
            { key: 'B', text: '(1) induktives, (2) Grounded, (3) der Theorie, (4) empirischen Daten, (5) nicht erklärbar' },
            { key: 'C', text: '(1) induktives, (2) Grounded, (3) den Daten, (4) empirischen Daten, (5) nicht erklärbar' },
            { key: 'D', text: '(1) induktives, (2) Mere Measurement, (3) den Daten, (4) qualitativen Daten, (5) gut etabliert' },
            { key: 'E', text: '(1) abduktives, (2) Grounded, (3) der Beobachtung, (4) logischen Analysen, (5) nicht erklärbar' }
          ],
          correct: ['C'],
          explanation: 'Grounded Theory ist induktiv (theoriebauend, nicht -prüfend). Sie beginnt mit den Daten selbst (nicht mit Theorie), baut auf empirischen Daten auf und wird für Phänomene genutzt, die durch bestehende Theorien nicht erklärt werden können. B ist falsch: Grounded Theory beginnt explizit mit den Daten, nicht mit der Theorie.'
        }
      ]
    },
    {
      id: 'teil2',
      title: 'Teil II: Experimentelle Forschung (8 Punkte)',
      description: 'Fragen 4–7 beziehen sich auf den Artikel "Single-dose testosterone administration increases men\'s preference for status goods" (Nave et al., 2018). 243 Männer, Doppelblind-Design, Testosteron- (N=125) vs. Placebo-Gruppe (N=118). Single Choice: richtig = 2 Punkte.',
      points: 8,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-hs22-04',
          number: 4,
          points: 2,
          text: 'Aufbauend auf Tierversuchen und frühen Korrelationsstudien beim Menschen untersuchen die Forschenden den Einfluss von Testosteron auf die Präferenzen für Statusgüter. Welche Hypothese ist angesichts des Titels und des Texts am ehesten die von den Forschenden untersuchte?',
          choices: [
            { key: 'A', text: 'Ein erhöhter Testosteronspiegel führt dazu, dass Männer eine stärkere Präferenz für Güter zeigen, die ihren sozialen Rang fördern.' },
            { key: 'B', text: 'Ein erhöhter Testosteronspiegel führt dazu, dass Männer eine stärkere Präferenz für Güter zeigen, die ihren sozialen Rang schmälern.' },
            { key: 'C', text: 'Ein gleichbleibender Testosteronspiegel führt dazu, dass Männer eine stärkere Präferenz für Güter zeigen, die ihren sozialen Rang schmälern.' },
            { key: 'D', text: 'Ein erhöhter Testosteronspiegel führt dazu, dass Männer (im Gegensatz zu Frauen) eine stärkere Präferenz für Statusgüter zeigen.' },
            { key: 'E', text: 'Ein erhöhter Testosteronspiegel (im Gegensatz zu einem erhöhten Östrogenspiegel) führt zu stärkerer Präferenz für Statusgüter.' }
          ],
          correct: ['A'],
          explanation: 'A ist die präziseste Hypothese, die direkt dem Titel entspricht. D und E fügen Vergleiche (zu Frauen, zu Östrogen) hinzu, die im Abstract nicht genannt werden. Eine gute Hypothese enthält nur das, was die Studie tatsächlich testet.'
        },
        {
          id: 'esf-hs22-05',
          number: 5,
          points: 2,
          text: '243 Männern wurden in einer Doppelblindstudie entweder Testosteron (N=125) oder Placebo (N=118) als topisches Gel verabreicht. Welche der folgenden Aussagen über diese Methode ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Es handelt sich um ein quasi-natürliches Experiment.' },
            { key: 'B', text: 'Das experimentelle Design folgte einem 2 (Testosteron vs. Placebo) × 2 (Doppelblind vs. Nicht Doppelblind) Design.' },
            { key: 'C', text: 'Die Stichprobengrösse von weniger als 150 Teilnehmern pro Kondition ist nicht ausreichend, um signifikante Ergebnisse zu erzielen.' },
            { key: 'D', text: 'Mit dem Doppelblindverfahren werden Korrelationsnachweise für die Wirkung von Testosteron erbracht.' },
            { key: 'E', text: 'Das doppelblinde Forschungsprotokoll stellt sicher, dass weder die Teilnehmer noch die durchführenden Forschenden wissen, welche Behandlung einem Teilnehmer verabreicht wird.' }
          ],
          correct: ['E'],
          explanation: 'E ist die exakte Definition des Doppelblindverfahrens: Weder Teilnehmende noch Forschende wissen, wer welche Behandlung erhalten hat — schützt vor Erwartungseffekten auf beiden Seiten. D ist falsch: Ein randomisiertes Experiment erlaubt kausale Schlüsse, keine blossen Korrelationen. A ist falsch: Es ist ein randomisiertes kontrolliertes Experiment, kein quasi-natürliches.'
        },
        {
          id: 'esf-hs22-06',
          number: 6,
          points: 2,
          text: 'Die Ergebnisstudie zeigt, dass die Testosterongruppe im Durchschnitt eine höhere Präferenz für Marken mit hohem sozialem Rang aufweist als die Placebogruppe [Grafik: Balkendiagramm, Testosteron-Gruppe zeigt höhere Präferenz für High-Status-Marke]. Welche Aussage ist in Anbetracht der Methode (Frage 5) und der Ergebnisse am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Alle Teilnehmer in der Testosterongruppe hatten ohne Ausnahme eine höhere Präferenz für die Marke mit hohem sozialem Rang als alle Teilnehmer in der Placebogruppe.' },
            { key: 'B', text: 'Der durchschnittliche Teilnehmer in der Placebogruppe hat eine höhere Präferenz für die Marke mit niedrigem sozialem Rang als der durchschnittliche Teilnehmer in der Testosterongruppe.' },
            { key: 'C', text: 'Ein höherer Testosteronspiegel führt zu einer höheren Präferenz für Marken mit hohem sozialem Rang.' },
            { key: 'D', text: 'Ein höherer Testosteronspiegel korreliert mit einer höheren Präferenz für Marken mit hohem sozialem Rang.' },
            { key: 'E', text: 'Das Modell kann mit einem t-Test für abhängige Stichproben getestet werden.' }
          ],
          correct: ['C'],
          explanation: 'Da es sich um ein randomisiertes Doppelblind-Experiment handelt, sind kausale Schlussfolgerungen ("führt zu") gerechtfertigt — das ist gerade der Vorteil des experimentellen Designs gegenüber Beobachtungsstudien. D ("korreliert") wäre für eine Beobachtungsstudie korrekt, schwächt aber die kausal zulässige Aussage unnötig. E ist falsch: Bei einem between-subjects Design mit zwei unabhängigen Gruppen wird ein t-Test für unabhängige Stichproben verwendet.'
        },
        {
          id: 'esf-hs22-07',
          number: 7,
          points: 2,
          text: 'Die Skala zur Messung der Markenpräferenzen ist eine bipolare, kontinuierliche Schieberegler-Skala (Slider von 0 bis 100), bei der die Teilnehmenden durch horizontales Verschieben ihre Präferenz zwischen zwei Marken angeben. Welche Aussage über die Skala ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Als eindimensionale Skala kann sie nicht das gesamte Konzept der Markenpräferenz erfassen.' },
            { key: 'B', text: 'Die Skala ist ratioskaliert.' },
            { key: 'C', text: 'Bei dieser Skala ist nicht eindeutig, welche Antwort als "indifferent" gilt.' },
            { key: 'D', text: 'Es spielt keine Rolle, wo der Cursor zu Beginn platziert ist, d.h. an welcher Stelle der Teilnehmer den Cursor sieht.' },
            { key: 'E', text: 'Ob eine 11- oder 10-Punkte-Likert-Skala verwendet wird, hätte keinen Einfluss auf die Antworten.' }
          ],
          correct: ['C'],
          explanation: 'Bei einer bipolaren kontinuierlichen Skala (0–100) gibt es keinen klar definierten "indifferenten" Mittelpunkt. Im Gegensatz zu einer 5- oder 7-Punkte-Likert-Skala mit einem expliziten Mittelwert (z.B. "weder noch") ist bei einem Slider der Indifferenzpunkt unklar. Zudem beeinflusst die Startposition des Cursors die Antwort (Anchoring-Effekt), weshalb D falsch ist.'
        }
      ]
    },
    {
      id: 'teil3',
      title: 'Teil III: Allgemeine Single-Choice-Fragen (26 Punkte)',
      description: 'Fragen 8–20. Single Choice: Eine Antwort pro Frage, richtig = 2 Punkte.',
      points: 26,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-hs22-08',
          number: 8,
          points: 2,
          text: 'Grafik (Instagram der deutschen Grünen Partei) zeigt den deutschen Mindestlohn von 2015–2022. Die y-Achse beginnt nicht beim Nullpunkt. Welche Aussage über die Datenvisualisierung ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die x-Achse (Jahre) ist verkürzt, was eine sinnvolle Interpretation verhindert.' },
            { key: 'B', text: 'Es gibt keinen erkennbaren Zusammenhang zwischen Zeit und Mindestlohn.' },
            { key: 'C', text: 'Der Mindestlohn hat sich von 2021 bis 2022 in absoluten Zahlen mehr als verdoppelt.' },
            { key: 'D', text: 'Da der Nullpunkt der y-Achse höher als der natürliche Nullpunkt liegt, wird der relative Anstieg des Mindestlohns verzerrt dargestellt.' },
            { key: 'E', text: 'Der absolute Mindestlohn stagnierte zwischen 2017 und 2020.' }
          ],
          correct: ['D'],
          explanation: 'Wenn die y-Achse nicht bei Null beginnt, werden kleine absolute Unterschiede optisch dramatisch vergrössert. Dies ist eine klassische Technik zur irreführenden Visualisierung: Ein Anstieg von 10.45 auf 12.00 EUR (ca. 15%) sieht in der Grafik wie eine Verdoppelung aus. Diese Verzerrung kann bewusst für politische Kommunikation genutzt werden.'
        },
        {
          id: 'esf-hs22-09',
          number: 9,
          points: 2,
          text: 'Sie wollen im Rahmen Ihrer Bachelorarbeit das Konstrukt "Offenheit gegenüber Augmented und Mixed Reality" messen und haben im Marketing Scales Handbook eine vielversprechende Skala gefunden. Welche Antwort zur Qualitätsbewertung dieser Skala ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Skala sollte nicht eindimensional sein, da so sichergestellt wird, dass genügend Dimensionen erfasst werden.' },
            { key: 'B', text: 'Die Skala sollte nach 2015 veröffentlicht worden sein, damit neueste Technologien (z.B. Oculus Rift) berücksichtigt werden.' },
            { key: 'C', text: 'Die Skala, sofern mehrdimensional, sollte ein Cronbach\'s Alpha von mehr als 0.7 aufweisen; ist die Skala eindimensional, benötigen wir andere Kriterien (z.B. Zitationen).' },
            { key: 'D', text: 'Das Cronbach\'s Beta der Skala sollte grösser als 0.8 sein, um die Zuverlässigkeit zu gewährleisten.' },
            { key: 'E', text: 'Die Skala sollte mindestens 10-mal in anderen Arbeiten zitiert worden sein, da dies ihre Nützlichkeit gewährleistet.' }
          ],
          correct: ['C'],
          explanation: 'Cronbach\'s Alpha misst die interne Konsistenz einer mehrdimensionalen Skala. Ein Wert > 0.7 gilt als akzeptabel. Für eindimensionale Skalen (single-item) ist Alpha nicht anwendbar — dort sind andere Gütekriterien relevant. D ist ein Trick: Es gibt kein "Cronbach\'s Beta" — nur Alpha. A ist falsch: Eindimensionale Skalen können ein Konstrukt vollständig erfassen; ob ein Konstrukt ein- oder mehrdimensional ist, hängt von der Theorie ab.'
        },
        {
          id: 'esf-hs22-10',
          number: 10,
          points: 2,
          text: 'Welche Aussage zu den zentralen Komponenten der empirischen Sozialforschung trifft am WENIGSTEN zu?',
          choices: [
            { key: 'A', text: 'Es gibt drei zentrale Komponenten.' },
            { key: 'B', text: 'Mindestens eine der zentralen Komponenten befasst sich mit der Sammlung von Daten.' },
            { key: 'C', text: 'Empirie und Forschungsmethode sind für die empirische Sozialforschung zentrale Komponenten.' },
            { key: 'D', text: 'Eine Komponente befasst sich mit widerspruchsfreien Aussagen zur Ordnung des Wissens.' },
            { key: 'E', text: 'Praktische Implikationen sind eine der zentralen Komponenten der empirischen Sozialforschung.' }
          ],
          correct: ['E'],
          explanation: 'Die drei zentralen Komponenten der empirischen Sozialforschung sind: (1) Theorie (Ordnung des Wissens), (2) Empirie (Datenerhebung), (3) Methode (Forschungsmethodik). Praktische Implikationen sind ein wertvolles Ergebnis von Forschung, aber keine definitorische Kernkomponente — sie gehören zur Anwendung, nicht zur Grundstruktur. E trifft am wenigsten zu.'
        },
        {
          id: 'esf-hs22-11',
          number: 11,
          points: 2,
          text: 'In "Very Important People" (2020) beschreibt Ashley Mears ihre Forschung über den globalen Partykreislauf der Superreichen. Welche Aussage über ihre Forschung ist am WENIGSTEN zutreffend?',
          choices: [
            { key: 'A', text: 'Sie vertritt eine interpretivistische Perspektive der sozialwissenschaftlichen Forschung.' },
            { key: 'B', text: '"Männer mit Geld und Frauen mit Schönheit" ist die zentrale soziale Gleichung, die sie in diesem Kreislauf gefunden hat.' },
            { key: 'C', text: 'Der wirtschaftliche Austausch in diesem Kreislauf ist asymmetrisch, aber nicht völlig einseitig, da die "Mädchen" von sozialen Ressourcen profitieren.' },
            { key: 'D', text: 'Mears reflektiert kritisch den teilnehmenden Charakter ihrer Forschung.' },
            { key: 'E', text: 'Bei ihrer Forschung setzte sie vor allem auf qualitative Arbeit mit Fokusgruppen.' }
          ],
          correct: ['E'],
          explanation: 'Mears verwendete teilnehmende Beobachtung (participant observation), indem sie sich selbst in den VIP-Partykreislauf integrierte. Fokusgruppen wären für diese ethnographische Forschung völlig unpassend. E ist die falsche Aussage — Fokusgruppen hätten keine Einblicke in die tatsächliche soziale Dynamik dieses exklusiven Kreislaufs ermöglicht.'
        },
        {
          id: 'esf-hs22-12',
          number: 12,
          points: 2,
          text: 'Bringen Sie die folgenden Schritte des Forschungsprozesses in die typische Reihenfolge: (1) Daten analysieren, (2) Forschungsfrage formulieren, (3) Literaturrecherche durchführen, (4) Manuskript überarbeiten, (5) Stichprobe ziehen. Welche Reihenfolge ist am zutreffendsten?',
          choices: [
            { key: 'A', text: '(1), (3), (5), (2), (4)' },
            { key: 'B', text: '(2), (3), (5), (1), (4)' },
            { key: 'C', text: '(2), (3), (5), (4), (1)' },
            { key: 'D', text: '(5), (3), (2), (1), (4)' },
            { key: 'E', text: '(3), (2), (1), (5), (4)' }
          ],
          correct: ['B'],
          explanation: 'Der typische Forschungsprozess: Forschungsfrage formulieren → Literaturrecherche → Stichprobe ziehen → Daten analysieren → Manuskript überarbeiten. B ist korrekt: (2)→(3)→(5)→(1)→(4). Die Literaturrecherche folgt auf die initiale Forschungsfrage und kann diese schärfen; die Stichprobe wird erst nach der Konzeption gezogen.'
        },
        {
          id: 'esf-hs22-13',
          number: 13,
          points: 2,
          text: 'Aus dem Artikel "The effects of content ephemerality on information processing" (Barnea et al., 2022): Die Forschenden heben hervor, dass sie "ihre Hypothese in zehn präregistrierten Online-Studien (insgesamt N=17.620) testen". Was bedeutet das aus Sicht der Lesenden? Welche Aussage ist am WENIGSTEN zutreffend?',
          choices: [
            { key: 'A', text: 'Wir könnten die Präregistrierung lesen und prüfen, ob die präregistrierte Hypothese mit der tatsächlich geprüften übereinstimmt.' },
            { key: 'B', text: 'Die Forschenden schaffen Transparenz bezüglich ihrer Forschung.' },
            { key: 'C', text: 'Wir haben mehr Gewissheit, dass p-hacking ausgeschlossen ist.' },
            { key: 'D', text: 'Die Präregistrierung beschreibt die Veröffentlichung von Hypothesen und Analyseplänen vor der eigentlichen Analyse.' },
            { key: 'E', text: 'Aus diesen Informationen können wir schliessen, dass die Forschenden zehn Experimente durchgeführt haben.' }
          ],
          correct: ['E'],
          explanation: 'Der Text sagt "präregistrierte Online-Studien" — Studien sind nicht dasselbe wie Experimente. Online-Studien können Umfragen, Beobachtungsstudien, korrelative Designs etc. sein, nicht nur Experimente. E ist die am wenigsten zutreffende Aussage, da sie zu Unrecht von Studien auf Experimente schliesst.'
        },
        {
          id: 'esf-hs22-14',
          number: 14,
          points: 2,
          text: 'Welche Aussage zur qualitativen Forschung trifft am EHESTEN zu?',
          choices: [
            { key: 'A', text: 'In der qualitativen Forschung gibt es keine Daten.' },
            { key: 'B', text: 'In der qualitativen Forschung gibt es keine statistische Datenanalyse.' },
            { key: 'C', text: 'Qualitative Forschung folgt typischerweise der Deduktion.' },
            { key: 'D', text: 'Qualitative Forschung wird eingesetzt, um verallgemeinerbare Erkenntnisse zu gewinnen.' },
            { key: 'E', text: 'Qualitative Forschung erklärt auftretende Effekte via Mediation und Moderation.' }
          ],
          correct: ['B'],
          explanation: 'B ist korrekt: Qualitative Forschung verwendet keine statistischen Analysemethoden. Stattdessen werden Daten durch interpretative Verfahren wie Themenanalyse, Diskursanalyse oder Kodierung ausgewertet. A ist falsch (qualitative Daten = Texte, Bilder, Audio). C ist falsch (qualitativ = induktiv). D ist falsch (qualitativ zielt auf Tiefe, nicht Generalisierbarkeit). E ist falsch (Mediation/Moderation = quantitative Konzepte).'
        },
        {
          id: 'esf-hs22-15',
          number: 15,
          points: 2,
          text: 'Datenvisualisierung aus "The rise of robots increases job insecurity" (Yam et al., 2022): Blasendiagramm für US-Bundesstaaten mit "Roboter pro 1000 Arbeitende" (x-Achse) und "Arbeitsplatzinteresse" (Blasengrösse/y-Achse). Welche Aussage zur Visualisierung ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Je dunkler der Kreis, desto mehr "Arbeitsplatzinteresse" ist dokumentiert.' },
            { key: 'B', text: 'Die Kreisgrösse nimmt mit zunehmender Anzahl "Roboter pro 1000 Arbeitende" ab.' },
            { key: 'C', text: 'Es gibt ein klares Muster einer höheren Roboterdichte an der US-Westküste im Vergleich zur US-Ostküste.' },
            { key: 'D', text: 'Die Beziehung zwischen "Arbeitsplatzinteresse" und "Roboter pro 1000 Arbeitende" liesse sich mithilfe einer Korrelationsstudie analysieren.' },
            { key: 'E', text: 'Die Ergebnisse dieser Studie sind ohne Einschränkungen auf das Jahr 2022 anwendbar.' }
          ],
          correct: ['D'],
          explanation: 'D ist korrekt: Wenn zwei kontinuierliche Variablen (Roboterdichte und Arbeitsplatzinteresse) untersucht werden, ist eine Korrelationsstudie die geeignete Methode zur Analyse ihrer Beziehung. E ist falsch: Zeitliche Einschränkungen, technologische Veränderungen und andere Kontextfaktoren schränken die Übertragbarkeit auf andere Zeitpunkte ein.'
        },
        {
          id: 'esf-hs22-16',
          number: 16,
          points: 2,
          text: 'Wie hätte Pepsi den Misserfolg seiner Crystal Pepsi in den 1990er Jahren vermeiden können? Welche Option hätte der Geschäftsführung von Pepsi am WENIGSTEN geholfen?',
          choices: [
            { key: 'A', text: 'Kopieren der Strategie des engen Konkurrenten Coca-Cola für transparente und leichtere Erfrischungsgetränke.' },
            { key: 'B', text: 'Durchführung von Fokusgruppen, die das Gesamtprodukt einschliesslich Preis, Verpackung, Geschmack und Konkurrenzprodukte bewerten.' },
            { key: 'C', text: 'Interviews mit 60 zufällig ausgewählten Pepsi-Kunden zu ihrer Meinung über Crystal Pepsi im Vergleich zu normaler Pepsi.' },
            { key: 'D', text: 'Durchführung von Experimenten, in denen die Zahlungsbereitschaft für Crystal Pepsi durch Variation von Aussehen, Geschmack und Positionierung untersucht wird.' },
            { key: 'E', text: 'Einführung in einem Testmarkt und Beobachtung der Reaktionen über einen längeren Zeitraum.' }
          ],
          correct: ['A'],
          explanation: 'Das blosse Kopieren einer Konkurrenzstrategie (ohne eigene Forschung) hilft am wenigsten — die Strategie des Konkurrenten könnte selbst schlecht sein oder auf andere Marktbedingungen ausgerichtet sein. Alle anderen Optionen beinhalten eigene Primärforschung (Fokusgruppen, Interviews, Experimente, Testmärkte), die valide Erkenntnisse für die eigene Entscheidung liefern würden.'
        },
        {
          id: 'esf-hs22-17',
          number: 17,
          points: 2,
          text: 'Welche Aussage über den Publikationsprozess in den Sozialwissenschaften ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Das Review-Verfahren zielt darauf ab, Forschungsergebnisse einem breiten Publikum bekannt zu machen.' },
            { key: 'B', text: 'Die Qualität von nicht peer-reviewten Arbeiten ist im Allgemeinen mit peer-reviewten Arbeiten vergleichbar.' },
            { key: 'C', text: 'Die persönliche Meinung der Gutachtenden spielt bei der Peer-Review eine untergeordnete Rolle.' },
            { key: 'D', text: 'Die Entscheidung, bei welcher Zeitschrift man einreicht, spielt für die Publikationschancen keine Rolle.' },
            { key: 'E', text: 'Der langwierige Publikationsprozess in den Sozialwissenschaften kann einer schnellen Verbreitung aktueller Themen im Wege stehen.' }
          ],
          correct: ['E'],
          explanation: 'E ist korrekt: Peer-Review-Verfahren dauern oft Monate bis Jahre, was die schnelle Dissemination von aktuellen Forschungsergebnissen erschwert. Das erklärt, warum Preprints (z.B. auf arXiv oder SSRN) zunehmend an Bedeutung gewinnen. A ist falsch: Der Zweck des Review-Verfahrens ist Qualitätssicherung, nicht Popularisierung. D ist falsch: Die Zeitschrift beeinflusst Peer-Reviewer-Profil und Akzeptanzraten erheblich.'
        },
        {
          id: 'esf-hs22-18',
          number: 18,
          points: 2,
          text: 'Welches der folgenden Stichwörter ist KEIN Merkmal der qualitativen Forschung?',
          choices: [
            { key: 'A', text: 'Theorie-Prüfung' },
            { key: 'B', text: 'Kleine Stichproben' },
            { key: 'C', text: 'Reflexivität' },
            { key: 'D', text: 'Kommunikation' },
            { key: 'E', text: 'Subjektivität' }
          ],
          correct: ['A'],
          explanation: 'Theorie-Prüfung (Hypothesentestung) ist ein Merkmal quantitativer Forschung, die deduktiv vorgeht. Qualitative Forschung ist typischerweise induktiv und theoriebauend (Grounded Theory) oder -erkundend — sie entwickelt und verfeinert Theorien, anstatt vorformulierte Hypothesen zu testen. B, C, D, E sind alle Merkmale qualitativer Forschung.'
        },
        {
          id: 'esf-hs22-19',
          number: 19,
          points: 2,
          text: 'Sozialwissenschaftliche Studien zu gesellschaftlich relevanten Themen (Verteilung von Anti-Malaria-Bettnetzen, Mikrokredite, Bildungsausgaben) werden diskutiert. Die entscheidende Frage ist, wie Studienergebnisse wirkungsvoller für politische Entscheidungsträger eingesetzt werden können. Welches Kriterium der empirischen Sozialforschung wird in diesen Diskussionen am ehesten thematisiert?',
          choices: [
            { key: 'A', text: 'Subjektivität und interne Validität der Studien' },
            { key: 'B', text: 'Reliabilität von Messinstrumenten über die Zeit hinweg' },
            { key: 'C', text: 'Unmittelbare Beteiligung der Interessengruppen und starke Finanzierung' },
            { key: 'D', text: 'Quantitative anstelle von qualitativen Untersuchungen' },
            { key: 'E', text: 'Verallgemeinerbarkeit über Studien hinweg' }
          ],
          correct: ['E'],
          explanation: 'Der Kern dieser Diskussion ist Generalisierbarkeit (externe Validität): Können Erkenntnisse aus spezifischen Kontexten (z.B. Bettnetze in Kenia) auf andere Länder, Kulturen und Situationen übertragen werden? Nur wenn Ergebnisse verallgemeinerbar sind, können sie breit für Politikentscheidungen genutzt werden. Metaanalysen und systematische Reviews sind Instrumente zur Erhöhung dieser Verallgemeinerbarkeit.'
        },
        {
          id: 'esf-hs22-20',
          number: 20,
          points: 2,
          text: 'Autonome Produkte (z.B. Rasenmähroboter) können Menschen eine Quelle für "Sinnhaftigkeit" nehmen — eine Adoptionsbarriere. Sie haben eine Möglichkeit kennengelernt, wie diese Barriere umgangen werden kann. Welche Antwort beschreibt diese Möglichkeit am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Rückgabe von Kontrolle über die vom Produkt ausgeführte Tätigkeit (z.B. Rasenmähen)' },
            { key: 'B', text: 'Reduktion des Anschaffungspreises' },
            { key: 'C', text: 'Hervorheben der gewonnenen Zeit für sinnstiftende Aktivitäten' },
            { key: 'D', text: 'Erhöhung der Autonomie des Produktes' },
            { key: 'E', text: 'Verringerung der Identitätsrelevanz der vom Produkt ausgeführten Tätigkeit' }
          ],
          correct: ['C'],
          explanation: 'De Bellis et al. (2023) zeigten, dass der Moderator "Meaningful Time Gain" (sinnhafter Zeitgewinn) den negativen Effekt von MML (Meaning of Manual Labor) auf die Adoptionsbereitschaft kompensiert. Wenn Konsumierende sehen, dass die durch das autonome Produkt gewonnene Zeit für sinnvolle Aktivitäten (Familie, Hobbys) genutzt werden kann, sinkt die Adoptionsbarriere.'
        }
      ]
    },
    {
      id: 'teil4',
      title: 'Teil IV: Allgemeine Multiple-Choice-Fragen (20 Punkte)',
      description: 'Fragen 21–30. Multiple Choice: Nur wenn ALLE angekreuzten Antworten korrekt sind = 2 Punkte, sonst 0 Punkte.',
      points: 20,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-hs22-21',
          number: 21,
          points: 2,
          text: 'Welche der folgenden Zusammenhänge beschreibt "Ockhams Rasiermesser" (Ockham\'s Razor)?',
          choices: [
            { key: 'A', text: 'Je länger Theorien bestehen, desto wahrscheinlicher sind diese korrekt.' },
            { key: 'B', text: 'Zu jedem vorstellbaren Zeitpunkt sind lediglich bestimmte Vorstellungshorizonte "realistisch", alles andere gilt als "utopisch".' },
            { key: 'C', text: 'Besteht eine Theorie den Test der Falsifizierbarkeit, wird diese als bestmögliche Alternative anerkannt.' },
            { key: 'D', text: 'Eine Theorie A, die auf zwei Annahmen beruht, und eine Theorie B, die auf drei Annahmen beruht, sind bei gleicher Erklärungskraft nicht gleich wahrscheinlich — Theorie A ist wahrscheinlicher.' },
            { key: 'E', text: 'Passieren zwei Dinge nacheinander, ist es höchst wahrscheinlich, dass diese voneinander abhängen.' }
          ],
          correct: ['D'],
          explanation: 'Ockhams Rasiermesser (Prinzip der Sparsamkeit / Parsimonie): Von zwei Theorien, die dasselbe erklären, ist die einfachere (mit weniger Annahmen) vorzuziehen. D beschreibt genau dieses Prinzip. E beschreibt den Post-hoc-ergo-propter-hoc-Fehlschluss (Korrelation ≠ Kausalität). C beschreibt das Falsifikationsprinzip Poppers.'
        },
        {
          id: 'esf-hs22-22',
          number: 22,
          points: 2,
          text: 'Nachfolgend finden Sie Aussagen zur Forschung und Kontroverse rund um "Power Posing" (Amy Cuddy et al.). Welche Aussagen sind zutreffend?',
          choices: [
            { key: 'A', text: 'Es besteht ein wissenschaftlich nachgewiesener Zusammenhang zwischen expansiven Posen und Gefühlen von Macht.' },
            { key: 'B', text: 'Es besteht kein eindeutig wissenschaftlich nachgewiesener Zusammenhang zwischen expansiven Posen und Veränderungen im menschlichen Hormonhaushalt.' },
            { key: 'C', text: 'In der Kontroverse spielen rein wissenschaftliche Faktoren eine Rolle; andere Aspekte (z.B. persönliche Kommunikation, Empowerment) spielen keine Rolle.' },
            { key: 'D', text: '"Power Posing" ist reine Pseudowissenschaft.' },
            { key: 'E', text: 'Die Kontroverse rund um "Power Posing" ist typisch für die Kritikkultur im akademischen Umfeld.' }
          ],
          correct: ['A', 'B'],
          explanation: 'A: Der psychologische Effekt (Gefühle der Macht) ist durch replizierbare Studien zumindest teilweise belegt. B: Der physiologische Effekt (Hormonveränderungen wie Testosteronanstieg) konnte in Replikationsstudien nicht zuverlässig bestätigt werden. C ist falsch: Die Kontroverse hatte auch persönliche und gesellschaftliche Dimensionen. D ist zu extrem: Power Posing hat empirische Befunde, auch wenn einige nicht replizieren.'
        },
        {
          id: 'esf-hs22-23',
          number: 23,
          points: 2,
          text: 'Welche Optionen bzgl. Reproduzierbarkeit in der Sozialforschung sind zutreffend? Man erreicht die Resultate der Originalforschung für…',
          choices: [
            { key: 'A', text: '…dieselbe Analyse angewendet auf einen anderen Datensatz.' },
            { key: 'B', text: '…unterschiedliche Analysen desselben Datensatzes.' },
            { key: 'C', text: '…einen ähnlichen Datensatz, auf den dieselbe Analyse angewandt wird.' },
            { key: 'D', text: '…dieselbe Analyse angewandt auf denselben Datensatz.' },
            { key: 'E', text: '…eine ähnliche Analyse eines ähnlichen Datensatzes.' }
          ],
          correct: ['D'],
          explanation: 'Reproduzierbarkeit (Reproducibility) bedeutet: Dieselben Daten + dieselbe Analyse = dieselben Ergebnisse. Nur D erfüllt diese Definition exakt. A beschreibt Replizierbarkeit (neue Daten, gleiche Methode). B beschreibt Robustheit (gleiche Daten, verschiedene Methoden). C und E sind Mischformen.'
        },
        {
          id: 'esf-hs22-24',
          number: 24,
          points: 2,
          text: 'Was sind Limitationen der Datenvisualisierung?',
          choices: [
            { key: 'A', text: 'Falsches Verständnis von Kausalität (Korrelation wird als Kausalität missverstanden)' },
            { key: 'B', text: 'Fehler in den Daten können noch verstärkt werden (garbage in, garbage out)' },
            { key: 'C', text: 'Täuschungspotenzial neuer Visualisierungsformate' },
            { key: 'D', text: 'Komprimierung und Zusammenfassung von Daten' },
            { key: 'E', text: 'Fehlende Bezüge zwischen Visualisierung und dem Zweck der Evaluation' }
          ],
          correct: ['A', 'B', 'C', 'E'],
          explanation: 'A, B, C, E sind Limitationen: Visualisierungen können kausal missverstanden werden (A), Datenfehler sichtbarer/verstärkt machen (B), durch neue/unbekannte Formate täuschen (C), und den eigentlichen Evaluationszweck verfehlen (E). D (Komprimierung) ist eigentlich eine EIGENSCHAFT der Visualisierung — sie vereinfacht Komplexität, was sowohl Stärke als auch Schwäche sein kann, aber nicht primär als Limitation gilt.'
        },
        {
          id: 'esf-hs22-25',
          number: 25,
          points: 2,
          text: 'Titel einer Veröffentlichung: "Vorurteile gegenüber KI-Komponierenden: Hörende mögen Musik weniger, wenn sie glauben, dass sie von einer KI komponiert wurde" (Shank et al., 2022). Wie könnten Sie den vorgeschlagenen Effekt testen?',
          choices: [
            { key: 'A', text: 'Between-subjects Experiment: Dieselbe Musik wird mit der Angabe "KI-komponiert" vs. "menschlich komponiert" präsentiert; Teilnehmende bewerten, wie sehr sie die Musik mögen.' },
            { key: 'B', text: 'Within-subject Experiment: Teilnehmende hören nacheinander zwei Musikstücke, wobei eines als KI- und eines als menschlich-komponiert beschrieben wird (in zufälliger Reihenfolge).' },
            { key: 'C', text: 'Sekundärdaten von Soundcloud (menschliche Musik + Reviews) werden mit Primärdaten verglichen: Dieselbe Musik wird einer MTurk-Stichprobe als KI-komponiert präsentiert und deren Reviews verglichen.' },
            { key: 'D', text: 'Einen einzelnen Song wird einer Fokusgruppe vorgespielt; danach wird sie gefragt, ob sie glaubt, es sei von einer KI oder einem Menschen komponiert.' },
            { key: 'E', text: 'Nur KI-komponierte Musik wird Teilnehmenden vorgespielt und deren Bewertung gemessen.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'A (between-subjects) und B (within-subjects) sind klassische experimentelle Designs, die den Kausal-Effekt der Urheberschafts-Information testen. C ist methodisch aufwendiger aber valide: Derselbe Stimulus, aber unterschiedliche Kontextinformation (KI vs. Mensch). D ist keine Prüfung des Effekts (Fokusgruppe ohne Vergleichsbedingung). E fehlt eine Vergleichsbedingung (keine menschlich-komponierte Musik).'
        },
        {
          id: 'esf-hs22-26',
          number: 26,
          points: 2,
          text: 'Die Sozialforschung unterscheidet zwischen quantitativer und qualitativer Forschung. Was ist hinsichtlich beider Ansätze zutreffend?',
          choices: [
            { key: 'A', text: '"Positivisten" betreiben typischerweise qualitative Forschung.' },
            { key: 'B', text: 'Über die Überlegenheit qualitativer gegenüber quantitativen Methoden besteht weithin Einigkeit.' },
            { key: 'C', text: 'Quantitative und qualitative Forschung sind für die Sozialforschung gleichermassen wichtig und relevant.' },
            { key: 'D', text: 'Die beiden Ansätze können mittels Triangulation kombiniert werden, um mit Hilfe beider Ansätze Erkenntnisse zu gewinnen.' },
            { key: 'E', text: 'Forschende müssen in der quantitativen vs. qualitativen Debatte Partei ergreifen, da die Ansätze unvereinbar sind.' }
          ],
          correct: ['C', 'D'],
          explanation: 'C: Beide Ansätze haben ihre Stärken und sind je nach Forschungsfrage gleich wertvoll. D: Mixed-Methods-Forschung (Triangulation) kombiniert beide Ansätze, um Erkenntnisse zu vertiefen. A ist falsch: Positivisten bevorzugen quantitative Methoden. B ist falsch: Es gibt keine Einigkeit über die Überlegenheit einer Methode. E ist falsch: Mixed-Methods zeigen gerade die Vereinbarkeit.'
        },
        {
          id: 'esf-hs22-27',
          number: 27,
          points: 2,
          text: 'Diagramme aus "The effects of content ephemerality on information processing" (Barnea et al., 2022): Vergängliche (ephemeral) vs. dauerhafte (perpetual) Inhalte als Faktor. Gemessen wurden kognitive Anstrengung, Sympathie und Interesse. Ergebnisse zeigen: Vergängliche Inhalte führen zu mehr kognitiver Anstrengung UND mehr Sympathie/Interesse. Welche Schlussfolgerungen können aus den Ergebnissen gezogen werden?',
          choices: [
            { key: 'A', text: 'Vergängliche Inhalte führen zu einer geringeren kognitiven Anstrengung, was wiederum die Sympathie und das Interesse am Video erhöht.' },
            { key: 'B', text: 'Dauerhafte Inhalte führen zu einem Rückgang des Interesses am Video.' },
            { key: 'C', text: 'Es gibt keinen erkennbaren Unterschied zwischen den beiden Gruppen.' },
            { key: 'D', text: 'Es gibt durchgehend Hinweise auf einen Mittelwertunterschied zwischen den beiden Gruppen für die untersuchten Variablen.' },
            { key: 'E', text: 'Den Ergebnissen zufolge geht erhöhte kognitive Anstrengung mit mehr Sympathie und Interesse einher (korrelativer Zusammenhang).' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'B: Da vergängliche Inhalte zu mehr Interesse führen als dauerhafte, ist der Umkehrschluss korrekt. D: Die Grafiken zeigen konsistente Mittelwertunterschiede über alle drei Variablen. E: Da vergängliche Inhalte sowohl mehr kognitive Anstrengung als AUCH mehr Sympathie/Interesse erzeugen, besteht ein positiver Zusammenhang zwischen Anstrengung und Sympathie. A ist falsch: Vergängliche Inhalte erhöhen (nicht senken) die kognitive Anstrengung.'
        },
        {
          id: 'esf-hs22-28',
          number: 28,
          points: 2,
          text: 'Sie haben Forschung kennengelernt, dass autonome Produkte bei Konsumierenden auf Widerstand stossen, da sie manuelle Tätigkeiten und damit "Sinnhaftigkeit" ersetzen (de Bellis et al., 2023). Als Manager*in des Schweizer Unternehmens "Nachwerk" (autonome Produkte): Welche Strategien lassen sich direkt aus der kennengelernten Forschung ableiten?',
          choices: [
            { key: 'A', text: 'Design von Segmentierungsstrategien basierend auf der wahrgenommenen "Sinnhaftigkeit von manuellen Tätigkeiten" (Meaning of Manual Labor, MML).' },
            { key: 'B', text: 'Kreation von Werbekampagnen, die die bereits vorhandene "Sinnhaftigkeit im Leben" hervorheben (z.B. Plakate mit Familie am Point of Sale).' },
            { key: 'C', text: 'Positionierung der autonomen Produkte als praktische "Zeitsparer" im Alltag.' },
            { key: 'D', text: 'Hervorhebung der bereits vorhandenen Vertrautheit mit dem Produkt.' },
            { key: 'E', text: 'Preisreduktionen im Bereich von 10–20%.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'A: MML als Segmentierungsvariable ist direkt aus der Forschung ableitbar (Studie 1 des Artikels). B: Hervorheben von Sinnquellen im Leben (Familienzeit) kompensiert den Verlust manueller Sinnhaftigkeit — Studie 4 zeigt den "meaningful time gain"-Moderator. C: Zeitersparnis als Positionierung adressiert direkt den Mechanismus. D und E sind allgemeine Marketingstrategien, die nicht spezifisch aus dieser Forschung folgen.'
        },
        {
          id: 'esf-hs22-29',
          number: 29,
          points: 2,
          text: 'Welche der folgenden Aussagen sind zutreffend?',
          choices: [
            { key: 'A', text: 'Ist eine Theorie nicht widerlegbar, dann gilt diese automatisch als belegt und damit als wahr.' },
            { key: 'B', text: 'Wissenschaft, und damit die empirische Sozialwissenschaft, ist keine Demokratie.' },
            { key: 'C', text: 'Kritisches Denken und Methodenverständnis sind der Schlüssel zur Einordnung von wissenschaftlichen Erkenntnissen.' },
            { key: 'D', text: 'In der empirischen Sozialforschung versammelt die stärkste Evidenz eine Mehrheit hinter sich.' },
            { key: 'E', text: 'Wissenschaftliche Ergebnisse sind nur aussagekräftig, wenn man weiss, wie diese entstanden sind.' }
          ],
          correct: ['B', 'C', 'D', 'E'],
          explanation: 'B: Wissenschaft folgt Evidenz, nicht Mehrheitsentscheidungen. C: Methodenkenntnisse ermöglichen kritische Einordnung von Studien. D: Starke Evidenz setzt sich langfristig durch und überzeugt die Mehrheit der Fachgemeinschaft. E: Ohne Kenntnis der Methodik ist eine Einordnung der Ergebnisse unmöglich. A ist falsch (Popper): Nicht-falsifizierbare Theorien sind unwissenschaftlich — ihre Nicht-Widerlegbarkeit bedeutet nicht, dass sie wahr sind.'
        },
        {
          id: 'esf-hs22-30',
          number: 30,
          points: 2,
          text: 'Das untenstehende Bild zeigt ein unvollständiges Diagramm zu den zentralen Bestandteilen der empirischen Sozialforschung mit vier Feldern (1), (2), (3), (4), die durch Pfeile verbunden sind (Kreislaufmodell: Theorie ↔ Empirie, verbunden durch deduktive und induktive Schlüsse). Welche Antworten sind bei der Vervollständigung zutreffend?',
          choices: [
            { key: 'A', text: '(1) Theorie, (2) Empirie, (3) Induktion, (4) Deduktion' },
            { key: 'B', text: '(1) Induktion, (2) Deduktion, (3) Abduktion, (4) Obduktion' },
            { key: 'C', text: '(1) Empirie, (2) Daten, (3) Deduktion, (4) Induktion' },
            { key: 'D', text: '(1) Methode, (2) Analyse, (3) Induktion, (4) Deduktion' },
            { key: 'E', text: '(1) Empirie, (2) Theorie, (3) Induktion, (4) Abduktion' }
          ],
          correct: ['A'],
          explanation: 'Das Kreislaufmodell der empirischen Sozialforschung: (1) Theorie → (4) Deduktion → (2) Empirie → (3) Induktion → zurück zu (1) Theorie. Deduktion = von der Theorie zur Hypothese/Beobachtung. Induktion = von der Beobachtung zur Theorie. A ist die einzig korrekte Zuordnung.'
        }
      ]
    }
  ]
};
