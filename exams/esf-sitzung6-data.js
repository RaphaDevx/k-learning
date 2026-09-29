window.EXAM_DATA_ESF_SITZUNG6 = {
  id: 'esf-sitzung6',
  title: 'ESF Sitzung 6 — Datenvisualisierung, Publikationsprozess & Akademisches Schreiben',
  course: 'ESF',
  courseColor: '#16a34a',
  duration_minutes: 15,
  total_points: 30,
  exam_info: {
    date: 'Jederzeit',
    duration: '~15 Minuten',
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
      id: 'sitzung6-sc',
      title: 'Single Choice',
      description: 'Pro Frage ist genau eine Antwort richtig.',
      points: 12,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-s6-q03', number: 3, points: 2,
          text: 'Was sind Median, Modus und Mittelwert der folgenden Zahlenreihe: $1, 2, 4, 6, 4, 7$?',
          choices: [
            { key: 'A', text: 'Median = 4, Modus = 4, Mittelwert = 4' },
            { key: 'B', text: 'Median = 4.5, Modus = 4, Mittelwert = 4' },
            { key: 'C', text: 'Median = 4, Modus = 6, Mittelwert = 4.5' },
            { key: 'D', text: 'Median = 5, Modus = 7, Mittelwert = 4' },
            { key: 'E', text: 'Median = 4, Modus = 1, Mittelwert = 5' },
            { key: 'F', text: 'Keine der oben genannten Antworten.' }
          ],
          correct: ['A'],
          explanation: 'Sortiert ergibt sich 1, 2, 4, 4, 6, 7. Der Median (Durchschnitt der beiden mittleren Werte 4 und 4) ist 4. Der Modus (häufigster Wert) ist ebenfalls 4, da die 4 zweimal vorkommt. Der Mittelwert berechnet sich als $(1+2+4+6+4+7)/6 = 24/6 = 4$. In diesem Beispiel sind also alle drei Kennzahlen gleich 4.',
          topics: ['Deskriptive Statistik', 'Datenanalyse']
        },
        {
          id: 'esf-s6-q06', number: 6, points: 2,
          text: 'Welche der folgenden Quellenangaben ist gemäss APA Style Guide (7th Edition) korrekt zitiert?',
          choices: [
            { key: 'A', text: 'Franke, N., Schreier, M., & Kaiser, U. (2010). The "I designed it myself" effect in mass customization. *Management Science, 56*(1), 125–140.' },
            { key: 'B', text: 'Franke, Nikolaus, Schreier, Martin, & Kaiser, Ulrike (2010). The "I designed it myself" effect in mass customization. *Management Science, 56*(1), 125–140.' },
            { key: 'C', text: 'Franke, N., Schreier, M., & Kaiser, U. (2010). *The "I designed it myself" effect in mass customization*. Management Science, 56(1), p. 125–140.' },
            { key: 'D', text: 'Franke, N., Schreier, M., & Kaiser, U. The "I designed it myself" effect in mass customization. Management Science, 56(1), p. 125–140 (2010).' }
          ],
          correct: ['A'],
          explanation: 'Variante A entspricht dem APA-7-Standard: Vornamen werden als Initialen abgekürzt, die Jahresangabe steht in Klammern direkt hinter den Autorennamen, der Zeitschriftentitel (inkl. Bandnummer) wird kursiv geschrieben, und vor der Seitenangabe steht kein "p."/"S.". B ist falsch, da die Vornamen ausgeschrieben statt abgekürzt sind. C ist falsch, da der Artikeltitel statt des Zeitschriftentitels kursiv gesetzt ist und zusätzlich "p." vor der Seitenzahl steht. D ist falsch, da die Jahresangabe ans Ende verschoben ist und ebenfalls "p." verwendet wird.',
          topics: ['Akademisches Schreiben', 'APA-Zitierweise']
        },
        {
          id: 'esf-s6-q07', number: 7, points: 2,
          text: 'In welchem der folgenden Textausschnitte wurde gemäss APA Style Guide (7th Edition) im Text korrekt zitiert?',
          choices: [
            { key: 'A', text: 'Besides the narcissistic clinical disorder, narcissism has been conceptualized as a relatively prevalent personality dimension (Chatterjee & Hambrick, 2007; Emmons, 1984; Emmons, 1987; Raskin & Terry, 1988). Narcissism is commonly defined as an unjustified conceit, implying an excessive motive to self-enhance (Lee et al., 2013).' },
            { key: 'B', text: 'Besides the narcissistic clinical disorder, narcissism has been conceptualized as a relatively prevalent personality dimension (Chatterjee, A., & Hambrick, D. C., 2007; Emmons, R. A., 1984). Narcissism is commonly defined as an unjustified conceit, implying an excessive motive to self-enhance (Lee, S. Y., Gregg, A. P., & Park, S. H., 2013).' },
            { key: 'C', text: 'Besides the narcissistic clinical disorder, narcissism has been conceptualized as a relatively prevalent personality dimension (Chatterjee and Hambrick, 2007; Emmons, 1984; Emmons, 1987; Raskin and Terry, 1988). Narcissism is commonly defined as an unjustified conceit, implying an excessive motive to self-enhance (Lee, Gregg, and Park, 2013).' },
            { key: 'D', text: 'Besides the narcissistic clinical disorder, narcissism has been conceptualized as a relatively prevalent personality dimension (Chatterjee & Hambrick, 2007) (Emmons, 1984) (Emmons, 1987) (Raskin & Terry, 1988). Narcissism is commonly defined as an unjustified conceit, implying an excessive motive to self-enhance (Lee, Gregg, & Park, 2013).' }
          ],
          correct: ['A'],
          explanation: 'A entspricht APA 7: Bei Klammerzitaten werden nur Nachnamen genannt, mehrere Quellen innerhalb derselben Klammer werden durch ";" getrennt, zwischen Autorennamen steht "&" statt "and", und bei drei oder mehr Autor*innen wird ab der ersten Zitation nur der erste Autor gefolgt von "et al." genannt (Lee et al., 2013). B ist falsch, da vollständige Initialen aller Autor*innen im Text genannt werden. C ist falsch, da "and" statt "&" verwendet wird und bei Lee et al. alle Autorennamen ausgeschrieben sind statt "et al." zu nutzen. D ist falsch, da jede Quelle in einer eigenen Klammer steht statt durch ";" getrennt zu werden, und auch hier bei Lee et al. alle Namen ausgeschrieben sind.',
          topics: ['Akademisches Schreiben', 'APA-Zitierweise']
        },
        {
          id: 'esf-s6-q09', number: 9, points: 2,
          text: 'Was ist wichtig beim akademischen Schreiben?',
          choices: [
            { key: 'A', text: 'Es ist wichtig, kompliziert formulierte, inhaltlich anspruchsvolle Texte mit vielen verschachtelten Sätzen zu verfassen.' },
            { key: 'B', text: 'Jede Art von Leser*in muss die Einführung und den Theorieteil verstehen können.' },
            { key: 'C', text: 'Die Struktur sollte ähnlich wie bei einem Roman gestaltet werden, um die Spannung aufrechtzuerhalten.' },
            { key: 'D', text: 'Keiner der genannten Punkte.' }
          ],
          correct: ['D'],
          explanation: 'Keiner der genannten Punkte ist richtig. Beim akademischen Schreiben sind ein roter Faden und eine klare, präzise Struktur entscheidend, unnötige Wörter und komplizierte Sprache sollten vermieden werden (A ist daher falsch). Für jede Art von Leser*in verständlich sein müssen nur Einleitung und Diskussion – nicht zwingend der oft fachspezifische Theorieteil (B ist daher falsch). Die Struktur sollte sich an guten Artikeln anderer Autor*innen orientieren und nicht der eines Romans ähneln, der bewusst Spannung aufbaut (C ist daher falsch).',
          topics: ['Akademisches Schreiben']
        },
        {
          id: 'esf-s6-q12', number: 12, points: 2,
          text: 'Szenario: Ein etablierter St. Galler Metzger bietet zu seinen OLMA Bratwürsten optional Senf, Cocktailsauce oder keine Sauce an und möchte wissen, ob er etwas am Saucenangebot ändern soll. Wie gehen Sie als Berater*in bei diesem Projekt vor?',
          choices: [
            { key: 'A', text: 'Sie raten dem Metzger, dass er gar keine Saucen mehr anbieten soll, denn man isst weder Senf noch Cocktailsauce zur OLMA Bratwurst.' },
            { key: 'B', text: 'Sie erheben mit Hilfe einer dichotomen Skala das Alter der Kund*innen des Metzgers, um ihm nach eingehender Analyse Ratschläge für verschiedene Altersgruppen geben zu können.' },
            { key: 'C', text: 'Um einen ersten Eindruck von der Beliebtheit der jeweiligen Saucenalternative zu bekommen, betrachten Sie die Häufigkeiten, mit denen die Saucenalternativen gewählt wurden, in einer Häufigkeitstabelle.' },
            { key: 'D', text: 'Sie suchen im Internet, ob bereits eine Studie zu dieser Frage existiert, und präsentieren dem Metzger die Ergebnisse, ohne auf den/die Urheber*in zu verweisen, falls Sie fündig werden.' }
          ],
          correct: ['C'],
          explanation: 'C ist richtig: Die Saucenwahl ist eine nominalskalierte Variable (Senf, Cocktailsauce, keine Sauce sind qualitativ unterschiedliche, nicht ordnenbare Kategorien). Bei Nominalskalen sind keine Rechenoperationen möglich, sondern nur Häufigkeiten – eine univariate Häufigkeitstabelle ist daher der passende erste Analyseschritt. A ist falsch, da wissenschaftliche Beratung nicht auf Alltagsweisheiten, sondern auf geeigneter Forschungsmethodik beruhen sollte. B ist falsch, da eine dichotome Skala nur zwei Kategorien umfasst (z.B. Geschlecht) – das Alter würde man mit einer Intervallskala erheben. D ist falsch, da Ergebnisse fremder Studien immer mit Quellenangabe präsentiert werden müssen, sonst handelt es sich um ein Plagiat.',
          topics: ['Skalenniveaus', 'Datenanalyse']
        },
        {
          id: 'esf-s6-q13', number: 13, points: 2,
          text: 'Lesen Sie folgenden Auszug einer Studie zum Coronavirus (National Geographic) und wählen Sie die Variante, welche die Lücken korrekt ergänzt: "Da die Studie im Labor durchgeführt wurde, fand sie nicht in der ___ statt. Daher sind sowohl die ___ Validität als auch die ___ der Ergebnisse nicht garantiert."',
          choices: [
            { key: 'A', text: '...natürlichen Umgebung statt. Daher sind sowohl die externe Validität als auch die Verallgemeinerbarkeit der Ergebnisse nicht garantiert.' },
            { key: 'B', text: '...realen Welt statt. Daher sind sowohl die externe Validität als auch die Generalisierbarkeit der Ergebnisse nicht garantiert.' },
            { key: 'C', text: '...natürlichen Umwelt statt. Daher sind sowohl die interne Validität als auch die Realität der Ergebnisse nicht garantiert.' },
            { key: 'D', text: '...Realität statt. Daher sind sowohl die ökologische Validität als auch die Generalisierbarkeit der Ergebnisse nicht garantiert.' }
          ],
          correct: ['A'],
          explanation: 'Da die Studie unter streng kontrollierten Laborbedingungen (nicht in der natürlichen Umgebung) durchgeführt wurde, sind externe Validität und Verallgemeinerbarkeit der Ergebnisse nicht gewährleistet. Bei der externen Validität geht es darum, ob Studienergebnisse auf andere Kontexte übertragen werden können – Feldexperimente in natürlicher Umgebung haben hier gegenüber Laborstudien einen Vorteil. Die übrigen Optionen kombinieren Begriffe wie "interne Validität", "ökologische Validität" oder "Realität", die im Originaltext nicht in diesem Zusammenhang verwendet werden.',
          topics: ['Gütekriterien', 'Externe Validität']
        }
      ]
    },
    {
      id: 'sitzung6-mc',
      title: 'Multiple Choice',
      description: 'Mehrere Antworten können korrekt sein. Alle richtigen Kreuze nötig.',
      points: 18,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-s6-q01', number: 1, points: 2,
          text: 'Welche der folgenden Aussagen sind WAHR?',
          choices: [
            { key: 'A', text: 'Um den Zusammenhang zwischen mehr als zwei Variablen zu untersuchen, eignen sich qualitative Untersuchungsmethoden am besten.' },
            { key: 'B', text: 'Häufige Fehler im Schreibprozess umfassen beispielsweise eine unklare Fragestellung und einen fehlenden roten Faden.' },
            { key: 'C', text: 'Die Abstände zwischen den Werten ordinaler Variablen sind immer gleich.' },
            { key: 'D', text: 'Ein Desk Reject heisst, dass ein Journal das Manuskript direkt ablehnt und es keinen Reviewprozess gibt.' },
            { key: 'E', text: 'Mit "ggplot()" (Programmiersprache R) können beispielsweise Balkendiagramme (Barplots) erstellt werden.' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'B, D und E sind korrekt: Häufige Schreibfehler sind unklare Fragestellungen und ein fehlender roter Faden (B); ein Desk Reject bedeutet die direkte Ablehnung durch den Editor ohne Peer Review (D); mit ggplot() lassen sich u.a. Barplots erstellen (E). A ist falsch, da für den Zusammenhang von mehr als zwei Variablen quantitative, multivariate Analysemethoden geeignet sind. C ist falsch, da bei ordinalen Variablen nur eine Rangfolge, aber keine gleichen Abstände zwischen den Werten angenommen werden können (z.B. Schulnoten, Zufriedenheit auf einer Skala von 1-5).',
          topics: ['Datenanalyse', 'Akademisches Schreiben', 'Publikationsprozess']
        },
        {
          id: 'esf-s6-q02', number: 2, points: 2,
          text: 'Welche Aussagen sind im Hinblick auf Datenvisualisierung richtig?',
          choices: [
            { key: 'A', text: 'Datenvisualisierung basiert immer auf qualitativen Daten und wird verwendet, um qualitative Ergebnisse zu visualisieren.' },
            { key: 'B', text: 'Datenvisualisierung unterstützt die Erkundung und Kommunikation von Daten.' },
            { key: 'C', text: 'Datenvisualisierung basiert immer auf kleinen Datenmengen.' },
            { key: 'D', text: 'Datenvisualisierung hilft dabei, Muster und Trends visuell sichtbar zu machen.' },
            { key: 'E', text: 'Visualisierungen sollten möglichst viel Text und Farbe haben.' }
          ],
          correct: ['B', 'D'],
          explanation: 'B und D sind korrekt: Datenvisualisierung unterstützt Erkundung, Untersuchung und Kommunikation von Daten und macht Muster und Trends sichtbar. A ist falsch, da auch (und sogar sehr häufig) quantitative Daten visualisiert werden. C ist falsch, da auch sehr grosse Datenmengen visualisiert werden können. E ist falsch, da nach dem Prinzip "less is more" unnötiger Text, Hintergrund und zu viele Farben vermieden werden sollten.',
          topics: ['Datenvisualisierung']
        },
        {
          id: 'esf-s6-q04', number: 4, points: 2,
          text: 'Welche Aussagen in Bezug auf wissenschaftliche Zeitschriften (Journals) sind richtig?',
          choices: [
            { key: 'A', text: 'Die Vorgaben von verschiedenen Journals in Bezug auf die Zitierweise sind immer die gleichen.' },
            { key: 'B', text: 'Es gibt verschiedene offizielle Rankings von Journals.' },
            { key: 'C', text: '10% der Paper werden direkt bei der ersten Einreichung (Submission) akzeptiert.' },
            { key: 'D', text: 'Der Publikationsprozess ist meist ein langjähriger Prozess.' },
            { key: 'E', text: 'In der VHB Journal Liste ("Jourqual") ist "A+" nicht das beste Ranking.' }
          ],
          correct: ['B', 'D'],
          explanation: 'B und D sind korrekt: Es existieren verschiedene offizielle Journal-Rankings (z.B. das VHB-Ranking), und der Publikationsprozess zieht sich aufgrund mehrerer Review-Runden meist über Jahre. A ist falsch, da sich Zitiervorgaben zwischen Journals oft unterscheiden (z.B. APA vs. MLA oder eigene Standards). C ist falsch, da z.B. beim Journal of Consumer Research die Gesamtakzeptanzquote bei nur rund 10% liegt – eine Annahme direkt bei der ersten Einreichung ist extrem selten. E ist falsch, da "A+" in der VHB-Liste das beste Ranking darstellt.',
          topics: ['Publikationsprozess']
        },
        {
          id: 'esf-s6-q05', number: 5, points: 2,
          text: 'Welche Aussagen bezüglich eines idealen Forschungsprozesses sind korrekt?',
          choices: [
            { key: 'A', text: 'Daten sollten so lange bereinigt werden, bis die gewünschten Effekte gezeigt werden können.' },
            { key: 'B', text: 'Studien sollten so lange wiederholt werden, bis man Evidenz für die Hypothesen gefunden hat.' },
            { key: 'C', text: 'Studien sollten online vorangemeldet werden, damit kein anderer Forscher dieselbe Fragestellung bearbeitet.' },
            { key: 'D', text: 'Eine umfassende Literaturrecherche sollte vor der Datenerhebung durchgeführt werden.' },
            { key: 'E', text: 'In einer Forschungsarbeit sollten Fragen klar formuliert werden, und die Beantwortung der Fragen sollte relevante Erkenntnisse generieren.' }
          ],
          correct: ['D', 'E'],
          explanation: 'D und E sind korrekt: Eine umfassende Literaturrecherche vor der Datenerhebung sowie klar formulierte, erkenntnisrelevante Forschungsfragen gehören zu einem idealen Forschungsprozess. A ist falsch, da eine Datenbereinigung niemals dazu dienen darf, gewünschte Effekte zu erzeugen, sondern nur die Datenqualität sicherzustellen. B ist falsch, da Studienwiederholungen ausschliesslich der Replikation (Überprüfung von Ergebnissen) dienen dürfen, nicht der "Bestätigung" von Hypothesen. C ist falsch, da Präregistrierung dazu dient, Hypothesen und Studiendesign vorab festzulegen – nicht, um andere Forschende von derselben Fragestellung abzuhalten.',
          topics: ['Open Science', 'Forschungsprozess']
        },
        {
          id: 'esf-s6-q08', number: 8, points: 2,
          text: 'Wodurch zeichnet sich gutes akademisches Schreiben aus?',
          choices: [
            { key: 'A', text: 'Gleichzeitiges Schreiben und Editieren' },
            { key: 'B', text: 'Vermeidung von Wiederholungen und Parallelkonstruktionen' },
            { key: 'C', text: 'Beantwortung einer sehr klaren Fragestellung' },
            { key: 'D', text: 'Hervorhebung des theoretischen Beitrags' },
            { key: 'E', text: 'Verwendung zahlreicher Synonyme, um Eintönigkeit zu vermeiden' }
          ],
          correct: ['C', 'D'],
          explanation: 'C und D sind korrekt: Gutes akademisches Schreiben beantwortet eine klar formulierte Fragestellung und hebt den theoretischen Beitrag deutlich hervor. A ist falsch, da gleichzeitiges Schreiben und Editieren vermieden werden sollte – beide Tätigkeiten sollten getrennt erfolgen. B und E sind falsch, da Wiederholungen, Parallelkonstruktionen und konsistente Begriffe (statt vieler Synonyme) bewusst eingesetzt werden sollten, um den Lesefluss und die Lesbarkeit zu verbessern.',
          topics: ['Akademisches Schreiben']
        },
        {
          id: 'esf-s6-q10', number: 10, points: 2,
          text: 'Was gilt NICHT als Plagiat?',
          choices: [
            { key: 'A', text: 'Copy & Paste aus einem Journal für die Bachelorarbeit (ohne Hinweis auf die Quelle).' },
            { key: 'B', text: 'Anlehnung an fremde Gedanken ohne Nennung der Quelle.' },
            { key: 'C', text: 'Freund*innen nach Feedback fragen (ohne Hinweis der Person im Literaturverzeichnis).' },
            { key: 'D', text: 'Paraphrasieren mit Quellenangabe.' },
            { key: 'E', text: 'Ein Literaturverwaltungsprogramm verwenden.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: 'C, D und E gelten nicht als Plagiat: Freund*innen um Feedback zu bitten ist üblich und muss nicht im Literaturverzeichnis vermerkt werden, korrektes Paraphrasieren mit Quellenangabe ist zulässig, und die Nutzung eines Literaturverwaltungsprogramms (z.B. Mendeley) ist eine empfohlene Organisationshilfe. A und B sind dagegen klassische Plagiatsformen, da fremde Texte bzw. Gedanken ohne Quellenangabe übernommen werden.',
          topics: ['Akademisches Schreiben', 'Plagiat']
        },
        {
          id: 'esf-s6-q11', number: 11, points: 2,
          text: 'Welche der folgenden Punkte gehören zu den 10 Prinzipien bzgl. Effektivität und Relevanz von Datenvisualisierungen?',
          choices: [
            { key: 'A', text: 'Richtige Software verwenden' },
            { key: 'B', text: 'Farbe hat immer eine Bedeutung' },
            { key: 'C', text: 'Daten = Modelle' },
            { key: 'D', text: 'Simple Visualisierung' },
            { key: 'E', text: 'Beschriftungen vermeiden' },
            { key: 'F', text: 'Feedback einholen' }
          ],
          correct: ['A', 'B', 'D', 'F'],
          explanation: 'A, B, D und F gehören zu den 10 Prinzipien: die richtige Software zu verwenden, dass Farbe immer eine Bedeutung haben sollte, eine möglichst simple Visualisierung sowie das Einholen von Feedback von Leser*innen. C ist falsch, da Daten und Modelle laut den Prinzipien explizit unterschiedliche Dinge sind, die nicht gleichgesetzt werden dürfen. E ist falsch, da eine simple Visualisierung mit detaillierter Beschriftung kombiniert werden soll – Beschriftungen sollten also gezielt eingesetzt und nicht vermieden werden.',
          topics: ['Datenvisualisierung']
        },
        {
          id: 'esf-s6-q14', number: 14, points: 2,
          text: 'Sie haben ein Experiment mit zwei Konditionen (Interaktion mit Chatbot vs. mit vermenschlichtem Chatbot) durchgeführt und möchten die Mittelwerte der Zufriedenheit der Gruppen mit R und der Funktion "ggplot()" als Barplot visualisieren. Was müssen Sie dabei beachten?',
          choices: [
            { key: 'A', text: 'Sie müssen den Datensatz in der Funktion "ggplot()" angeben.' },
            { key: 'B', text: 'Sie müssen die Achsen definieren.' },
            { key: 'C', text: 'Sie müssen die Farbe für die Achsenbeschriftungen festlegen (in der Regel blau).' },
            { key: 'D', text: 'Sie müssen die Schriftart festlegen.' },
            { key: 'E', text: 'Sie müssen festlegen, welche Art von Diagramm erstellt wird.' },
            { key: 'F', text: 'Sie müssen einen Hintergrund festlegen.' }
          ],
          correct: ['A', 'B', 'E'],
          explanation: 'A, B und E sind korrekt: In ggplot() muss der Datensatz angegeben, die Achsen definiert (z.B. via aes()) und die Diagrammart festgelegt werden (z.B. über geom_bar() für ein Balkendiagramm). C, D und F sind falsch, da nach dem Prinzip "less is more" weder eine spezielle Farbe für Achsenbeschriftungen noch eine bestimmte Schriftart oder ein Hintergrund festgelegt werden müssen – im Gegenteil, solche zusätzlichen Elemente sollten vermieden werden, um die Visualisierung einfach und verständlich zu halten.',
          topics: ['Datenvisualisierung', 'R / ggplot()']
        },
        {
          id: 'esf-s6-q15', number: 15, points: 2,
          text: 'Welche Aussagen zur Struktur qualitativer und quantitativer wissenschaftlicher Arbeiten sind richtig?',
          choices: [
            { key: 'A', text: 'Der praktische/theoretische Beitrag wird in der Einleitung diskutiert, damit die Relevanz der Fragestellung klar wird.' },
            { key: 'B', text: 'Bei qualitativen Arbeiten werden Kontext und Methodik getrennt beschrieben.' },
            { key: 'C', text: 'Die Diskussion steht bei qualitativen Arbeiten immer vor den "Findings".' },
            { key: 'D', text: 'In quantitativen Arbeiten erfolgt die Diskussion der Ergebnisse direkt nach jeder Studie und zusätzlich gesammelt in der "General Discussion".' },
            { key: 'E', text: 'Quantitative Arbeiten haben manchmal mehrere Studien unter einem Abschnitt "Studies".' }
          ],
          correct: ['D', 'E'],
          explanation: 'D und E sind korrekt: In quantitativen Arbeiten mit mehreren Studien wird jede Studie direkt im Anschluss diskutiert, zusätzlich erfolgt am Ende eine "General Discussion", in der alle Studien gemeinsam eingeordnet werden; solche Arbeiten enthalten häufig einen gemeinsamen Abschnitt "Studies". A ist falsch, da der konkrete praktische/theoretische Beitrag meist erst in der General Discussion (am Ende) genannt wird, während die Einleitung primär die Relevanz der Fragestellung adressiert. B ist falsch, da bei qualitativer Forschung Kontext und Methodik eng miteinander verwoben in einem gemeinsamen Abschnitt behandelt werden. C ist falsch, da bei qualitativer Forschung zunächst die "Findings" dargestellt und erst danach in der Diskussion eingeordnet und mit der Theorie verknüpft werden.',
          topics: ['Wissenschaftliches Schreiben', 'Qualitativ vs. quantitativ']
        }
      ]
    }
  ]
};
