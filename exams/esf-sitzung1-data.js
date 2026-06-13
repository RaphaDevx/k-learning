window.EXAM_DATA_ESF_SITZUNG1 = {
  id: 'esf-sitzung1',
  title: 'ESF Sitzung 1 — Forschungsgrundlagen & Forschungsprozess',
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
      id: 'sitzung1-sc',
      title: 'Sitzung 1: Single Choice (12 Punkte)',
      description: '6 Fragen zu Empirie/Theorie, Forschungsprozess und Forschungsdesign. Pro Frage ist genau eine Antwort richtig.',
      points: 12,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-s1-q01', number: 1, points: 2,
          text: 'Beurteilen Sie die folgende Aussage als wahr oder falsch: "Unter Empirie wird ein System bzw. ein Netzwerk von widerspruchsfreien Aussagen verstanden, um Erkenntnisse über einen Bereich von Sachverhalten zu ordnen, um Tatbestände zu erklären und um diese vorherzusagen."',
          choices: [
            { key: 'A', text: 'Wahr' },
            { key: 'B', text: 'Falsch' }
          ],
          correct: ['B'],
          explanation: 'Falsch. Diese Definition beschreibt **Theorie**, nicht Empirie. Empirie bezeichnet Aussagen zur Beschreibung der Wirklichkeit, die sich noch nicht (ausreichend und umfassend) in der Praxis bewährt haben — im Gegensatz zur Theorie, die als widerspruchsfreies System bereits bewährter Aussagen gilt.',
          topics: ['Forschungsgrundlagen', 'Theorie vs. Empirie']
        },
        {
          id: 'esf-s1-q03', number: 3, points: 2,
          text: 'Wie lautet die korrekte Reihenfolge der sieben Phasen des Forschungsprozesses nach Bryman? Die Phasen sind: [1] Stichprobenauswahl, [2] Schreiben, [3] Datenanalyse, [4] Konzeption und Theorie, [5] Literaturrecherche, [6] Forschungsfrage, [7] Datenerhebung.',
          choices: [
            { key: 'A', text: '1, 3, 7, 6, 2, 4, 5' },
            { key: 'B', text: '5, 6, 4, 7, 1, 3, 2' },
            { key: 'C', text: '4, 5, 3, 7, 6, 1, 2' },
            { key: 'D', text: '5, 4, 6, 1, 7, 3, 2' },
            { key: 'E', text: '4, 6, 5, 7, 1, 2, 3' }
          ],
          correct: ['D'],
          explanation: 'Die korrekte Reihenfolge ist [5] Literaturrecherche → [4] Konzeption und Theorie → [6] Forschungsfrage → [1] Stichprobenauswahl → [7] Datenerhebung → [3] Datenanalyse → [2] Schreiben. Der Forschungsprozess beginnt mit der Orientierung in der bestehenden Literatur und endet mit der schriftlichen Aufarbeitung der Ergebnisse.',
          topics: ['Forschungsprozess', 'Bryman']
        },
        {
          id: 'esf-s1-q06', number: 6, points: 2,
          text: 'Beurteilen Sie die folgende Aussage als wahr oder falsch: "Qualitative Verfahren werden meist eingesetzt, um neue Forschungsfragen zu generieren und neue Themengebiete zu erschliessen. Sie sind weniger zum Testen von Hypothesen geeignet und sind deshalb eng verbunden mit der deduktiven Vorgehensweise."',
          choices: [
            { key: 'A', text: 'Wahr' },
            { key: 'B', text: 'Falsch' }
          ],
          correct: ['B'],
          explanation: 'Falsch. Qualitative Verfahren sind eng mit der **induktiven** Vorgehensweise verbunden (vom Spezifischen zum Allgemeinen). Quantitative Verfahren testen Hypothesen und sind mit der deduktiven Vorgehensweise verbunden.',
          topics: ['Qualitativ vs Quantitativ', 'Induktion vs Deduktion']
        },
        {
          id: 'esf-s1-q07', number: 7, points: 2,
          text: 'Tim schreibt seine Bachelorarbeit zum Thema "Soziale Medien im Marketing". Er hat eine Betreuerin gesucht, das Thema von ihr erhalten, Literatur recherchiert, sich auf Konzeption und Theorie fokussiert, Hypothesen abgeleitet, die Untersuchungseinheit ausgewählt, ein quantitatives Online-Experiment durchgeführt und ist nun bei der Datenanalyse. Welchen wesentlichen Schritt im Forschungsprozess hat Tim übersprungen?',
          choices: [
            { key: 'A', text: 'Die explizite Formulierung einer Forschungsfrage' },
            { key: 'B', text: 'Die Stichprobenauswahl' },
            { key: 'C', text: 'Die Literaturrecherche' },
            { key: 'D', text: 'Die Wahl eines quantitativen Forschungsdesigns' },
            { key: 'E', text: 'Die Datenerhebung' }
          ],
          correct: ['A'],
          explanation: 'Tim ist direkt von Literaturrecherche/Konzeption zu den Hypothesen übergegangen, ohne zuvor eine **explizite Forschungsfrage** zu formulieren. Die Forschungsfrage ist im Forschungsprozess nach Bryman ein zentraler Schritt und Ausgangspunkt für die Hypothesenbildung.',
          topics: ['Forschungsprozess', 'Forschungsfrage']
        },
        {
          id: 'esf-s1-q08', number: 8, points: 2,
          text: 'Was beschreibt den Mixed-Methods-Ansatz am besten?',
          choices: [
            { key: 'A', text: 'Er ersetzt quantitative durch rein qualitative Methoden.' },
            { key: 'B', text: 'Er vereint Aspekte qualitativer und quantitativer Forschung, um die Vorteile beider Ansätze zu nutzen und eine umfassendere Antwort auf die Forschungsfrage zu erhalten.' },
            { key: 'C', text: 'Er beschränkt sich auf die Analyse von Sekundärdaten.' },
            { key: 'D', text: 'Er verzichtet auf die Formulierung von Hypothesen.' },
            { key: 'E', text: 'Er ist nur in der Marktforschung zulässig.' }
          ],
          correct: ['B'],
          explanation: 'Der Mixed-Methods-Ansatz kombiniert qualitative und quantitative Methoden gezielt, um die jeweiligen Stärken beider Ansätze zu nutzen und so eine umfassendere Antwort auf die Forschungsfrage zu erhalten.',
          topics: ['Mixed Methods', 'Forschungsdesign']
        },
        {
          id: 'esf-s1-q09', number: 9, points: 2,
          text: 'Welche der folgenden Bedingungen wäre ein guter Grund, eine qualitative Datenerhebung durchzuführen?',
          choices: [
            { key: 'A', text: 'Sie glauben, dass der Gegenstand nicht quantitativ messbar ist.' },
            { key: 'B', text: 'In der Literatur wurden bisher nur quantitative Studien zu Ihrem Forschungsvorhaben durchgeführt.' },
            { key: 'C', text: 'Sie möchten Zusammenhänge erklären und Gesetze auf Gültigkeit prüfen.' },
            { key: 'D', text: 'Ihnen stehen sehr viele numerische Daten zur Verfügung, die Sie lediglich auswerten müssten.' },
            { key: 'E', text: 'Ihnen ist die Vergleichbarkeit der erhaltenen Antworten sehr wichtig.' }
          ],
          correct: ['A'],
          explanation: 'Ein guter Grund für qualitative Forschung ist die Annahme, dass sich der Gegenstand nicht quantitativ messen lässt. Die übrigen Optionen (Forschungslücke allein, Prüfung von Gesetzen/Zusammenhängen, vorhandene numerische Daten, Vergleichbarkeit) sprechen eher für ein quantitatives Vorgehen.',
          topics: ['Qualitativ vs Quantitativ', 'Forschungsdesign']
        }
      ]
    },
    {
      id: 'sitzung1-mc',
      title: 'Sitzung 1: Multiple Choice (18 Punkte)',
      description: '9 Fragen zu Zugängen, Zielen, Datentypen und Marktforschung. Mehrere Antworten können korrekt sein — alle richtigen Kreuze nötig.',
      points: 18,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-s1-q02', number: 2, points: 2,
          text: 'Welche drei wesentlichen forschungsmethodischen Zugänge gibt es in der empirischen Sozialforschung?',
          choices: [
            { key: 'A', text: 'Qualitativ' },
            { key: 'B', text: 'Quantitativ' },
            { key: 'C', text: 'Mixed Methods' },
            { key: 'D', text: 'Empirie' },
            { key: 'E', text: 'Theorie' },
            { key: 'F', text: 'Methodik' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Die drei forschungsmethodischen Zugänge sind qualitativ, quantitativ und Mixed Methods (eine Kombination beider Ansätze). Empirie, Theorie und Methodik sind übergeordnete wissenschaftstheoretische Grundbegriffe, aber keine methodischen Zugänge selbst.',
          topics: ['Forschungsgrundlagen', 'Qualitativ vs Quantitativ', 'Mixed Methods']
        },
        {
          id: 'esf-s1-q04', number: 4, points: 2,
          text: 'Welche der folgenden Punkte sind allgemeine Prinzipien des wissenschaftlichen Arbeitens?',
          choices: [
            { key: 'A', text: 'Zuverlässige Sicherung und Aufbewahrung der Primärdaten' },
            { key: 'B', text: 'Objektive Auswertung und Verweis auf die verwendete Literatur' },
            { key: 'C', text: 'Keine Behinderung der wissenschaftlichen Arbeit von anderen' },
            { key: 'D', text: 'Kein Hinterfragen von Inhalten aus bereits veröffentlichten Artikeln' },
            { key: 'E', text: 'Eindeutige und nachvollziehbare Dokumentation der angewandten Verfahren' }
          ],
          correct: ['A', 'B', 'C', 'E'],
          explanation: 'Zu den Prinzipien guter wissenschaftlicher Praxis zählen die zuverlässige Aufbewahrung der Primärdaten (üblicherweise mind. 10 Jahre), objektive Auswertung mit korrektem Literaturverweis, keine Behinderung der Forschung anderer sowie eine eindeutige, nachvollziehbare Dokumentation (z.B. Code-Buch). Falsch ist D — im Gegenteil gehört das **kritische** Hinterfragen bereits veröffentlichter Inhalte zu guter wissenschaftlicher Praxis.',
          topics: ['Forschungsgrundlagen', 'Gute wissenschaftliche Praxis']
        },
        {
          id: 'esf-s1-q05', number: 5, points: 2,
          text: 'Was sind wesentliche Ziele der empirischen Sozialforschung?',
          choices: [
            { key: 'A', text: 'Aufbau von Wissen über Naturgesetze' },
            { key: 'B', text: 'Verwendung von Forschung zur Lösung gesellschaftlicher Probleme' },
            { key: 'C', text: 'Hermeneutische Interpretation von Texten' },
            { key: 'D', text: 'Beschreibung und Erklärung des sozialen Lebens' },
            { key: 'E', text: 'Systematische Literaturanalyse' },
            { key: 'F', text: 'Aufbau von Verständnis über das menschliche Verhalten' },
            { key: 'G', text: 'Denkend-reflexive Theorieentwicklung' },
            { key: 'H', text: 'Entwickeln und Testen von Theorien' }
          ],
          correct: ['B', 'D', 'F', 'H'],
          explanation: 'Empirische Sozialforschung zielt auf die Beschreibung und Erklärung des sozialen Lebens (durch zuverlässige, valide und dokumentierte Informationen), den Aufbau von Verständnis über menschliches Verhalten, das Entwickeln und Testen von Theorien sowie die Nutzung von Forschung zur Lösung gesellschaftlicher Probleme. Wissen über Naturgesetze, hermeneutische Textinterpretation, reine Literaturanalyse und denkend-reflexive Theorieentwicklung gehören nicht dazu.',
          topics: ['Forschungsgrundlagen', 'Ziele der ESF']
        },
        {
          id: 'esf-s1-q10', number: 10, points: 2,
          text: 'Welche der folgenden Forschungsfragen sind als quantitative Forschungsfragen einzustufen (d.h. mit vorgegebenen, geschlossenen Antwortkategorien)?',
          choices: [
            { key: 'A', text: '"Wie würden Sie die Preise für unsere Glacé im Vergleich zu Konkurrenzprodukten einschätzen?" (Antwortoptionen: Höher / Etwa gleich / Niedriger)' },
            { key: 'B', text: '"Was hat Ihnen bei dieser Konferenz am besten gefallen?" (offene Antwort)' },
            { key: 'C', text: '"Was denken Sie allgemein über Videospiele?" (Bewertung auf vorgegebenen Skalen wie spannend/unterhaltsam/aufregend)' }
          ],
          correct: ['A', 'C'],
          explanation: 'A und C sind quantitative Forschungsfragen, da jeweils vordefinierte Antwortkategorien vorgegeben werden und die Teilnehmenden nur daraus auswählen können. B ist eine qualitative Forschungsfrage: Sie lässt offene, frei formulierte Antworten zu, mit denen Eindrücke, Meinungen und Motivationen tief erfasst werden.',
          topics: ['Qualitativ vs Quantitativ', 'Forschungsfrage']
        },
        {
          id: 'esf-s1-q11', number: 11, points: 2,
          text: 'Welche zwei Arten von Rohdaten werden in der empirischen Sozialforschung unterschieden?',
          choices: [
            { key: 'A', text: 'Primärdaten' },
            { key: 'B', text: 'Sekundärdaten' },
            { key: 'C', text: 'Metadaten' },
            { key: 'D', text: 'Tertiärdaten' },
            { key: 'E', text: 'Zensusdaten' }
          ],
          correct: ['A', 'B'],
          explanation: 'Man unterscheidet Primärdaten (von den Forschenden selbst erhoben, um die eigene Forschungsfrage zu beantworten) und Sekundärdaten (bereits vorhandene Daten, die für die eigene Forschungsfrage genutzt werden).',
          topics: ['Primärdaten und Sekundärdaten', 'Datentypen']
        },
        {
          id: 'esf-s1-q12', number: 12, points: 2,
          text: 'Wie können Primärdaten erhoben werden?',
          choices: [
            { key: 'A', text: 'Befragungen' },
            { key: 'B', text: 'Experimente' },
            { key: 'C', text: 'Dissertationen' },
            { key: 'D', text: 'Öffentliche Daten (z.B. amtliche Statistiken)' },
            { key: 'E', text: 'Qualitative Studien' },
            { key: 'F', text: 'Panelerhebungen' },
            { key: 'G', text: 'Beobachtungen' },
            { key: 'H', text: 'Geschäftsberichte' }
          ],
          correct: ['A', 'B', 'E', 'F', 'G'],
          explanation: 'Primärdaten werden von den Forschenden selbst zur Beantwortung ihrer Forschungsfrage erhoben — z.B. über Befragungen, Experimente, Beobachtungen, Panelerhebungen oder qualitative Studien. Dissertationen, öffentliche Daten und Geschäftsberichte sind hingegen bereits vorhandene Quellen und zählen zu den Sekundärdaten.',
          topics: ['Primärdaten und Sekundärdaten']
        },
        {
          id: 'esf-s1-q13', number: 13, points: 2,
          text: 'Welche der folgenden Datenquellen sind NICHT den Sekundärdaten zuzuordnen (d.h. liefern Primärdaten)?',
          choices: [
            { key: 'A', text: 'Ein/e Forscher*in erstellt eine eigene Unipark-Online-Umfrage, um seine/ihre Forschungsfrage zu beantworten.' },
            { key: 'B', text: 'Ein/e Forscher*in liest Informationen vom Vista-Blog (HSG Executive School).' },
            { key: 'C', text: 'Ein/e Forscher*in nutzt den monatlichen Analysebericht von Socialbakers.' },
            { key: 'D', text: 'Ein/e Forscher*in analysiert die Samsung-Nation-Fan-Website.' },
            { key: 'E', text: 'Ein/e Forscher*in testet mit dem GfK-BehaviorScan in Haßloch ein neues Werbeformat.' }
          ],
          correct: ['A', 'E'],
          explanation: 'Eine eigene Unipark-Umfrage (A) und ein eigener Testmarkt-Versuch wie GfK-BehaviorScan (E) erzeugen Primärdaten, da die Daten gezielt für die eigene Forschungsfrage neu erhoben werden. Vista-Blog, Socialbakers-Berichte und die Samsung-Nation-Website liefern bereits vorhandene Informationen, die für einen anderen Zweck erstellt wurden — also Sekundärdaten.',
          topics: ['Primärdaten und Sekundärdaten']
        },
        {
          id: 'esf-s1-q14', number: 14, points: 2,
          text: 'Forschungsfrage: "Wie gross ist der Einfluss der Coronavirus-Pandemie auf das Kaufverhalten der Schweizer Konsument*innen?" Welche der folgenden Aussagen sind im Kontext dieser Forschungsfrage korrekt?',
          choices: [
            { key: 'A', text: 'Da es sich um ein neues Virus handelt, sollte die Frage mit einem qualitativen Ansatz untersucht werden.' },
            { key: 'B', text: 'Da es sich bei einer Pandemie um eine weltweite Epidemie handelt, ist es nicht möglich, die Forschungsfrage auf Schweizer Konsument*innen zu beschränken.' },
            { key: 'C', text: 'Die Frage kann teilweise mit Sekundärdaten beantwortet werden, z.B. durch Analyse der Verkaufszahlen von Digitec vor/während der Pandemie.' },
            { key: 'D', text: 'Die Forschungsfrage lässt sich mit einem quantitativen Design beantworten, dessen Vorteil ist, dass grosse Datenmengen in kurzer Zeit verarbeitet werden können.' }
          ],
          correct: ['C', 'D'],
          explanation: 'C und D sind korrekt: Die Frage hat einen quantitativen Schwerpunkt (sie fragt nach dem "Ausmass" eines Einflusses) und lässt sich teilweise mit bereits vorhandenen Sekundärdaten (z.B. Verkaufszahlen) beantworten. A ist falsch, da ein qualitativer Ansatz nicht zur quantitativen Fragestellung passt. B ist falsch — eine Forschungsfrage darf und sollte regional eingegrenzt werden, um beantwortbar zu sein.',
          topics: ['Forschungsfrage', 'Primärdaten und Sekundärdaten', 'Forschungsdesign']
        },
        {
          id: 'esf-s1-q15', number: 15, points: 2,
          text: 'Im Insight File "Business failures and the case for better research" werden Beispiele gescheiterter Marktforschung diskutiert (z.B. New Coke, McDonald\'s Arch Deluxe). Welche der folgenden Aussagen zu Marktforschungsansätzen sind zutreffend?',
          choices: [
            { key: 'A', text: 'Marktforschende sollten auch die emotionale/psychologische Wirkung von Marketingmassnahmen berücksichtigen.' },
            { key: 'B', text: 'Kundenbefragungen und Interviews können wirksam eingesetzt werden, um Kund*innen und ihre Bedürfnisse besser zu verstehen.' },
            { key: 'C', text: 'Marktforschung besteht im Wesentlichen aus der Sammlung und Analyse von Primärdaten (z.B. Interviews, Zufriedenheitsumfragen).' },
            { key: 'D', text: 'Marktforschung soll vor allem Erkenntnisse liefern, die Marketingverantwortliche hören wollen.' },
            { key: 'E', text: 'Die Marktforschung sollte repräsentativ für den Zielmarkt sein.' }
          ],
          correct: ['A', 'B', 'E'],
          explanation: 'A, B und E sind korrekt: Marktforschung sollte emotionale Reaktionen mitberücksichtigen (Beispiel New Coke), Befragungen/Interviews helfen, Kundenbedürfnisse zu verstehen (Beispiel Rocky Mountain Sparkling Water), und sie muss repräsentativ für den Zielmarkt sein (Gegenbeispiel: McDonald\'s Arch Deluxe). C ist falsch — Marktforschung nutzt auch Sekundärdaten (z.B. Social-Media-Analysen). D ist falsch — gute Marktforschung liefert auch unbequeme Erkenntnisse, die nicht immer den Erwartungen entsprechen.',
          topics: ['Forschungsgrundlagen', 'Marktforschung']
        }
      ]
    }
  ]
};
