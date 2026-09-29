window.EXAM_DATA_ESF_SITZUNG3 = {
  id: 'esf-sitzung3',
  title: 'ESF Sitzung 3 — Quantitative Methoden: Experimente & Skalen',
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
      id: 'sitzung3-sc',
      title: 'Sitzung 3: Single Choice (18 Punkte)',
      description: '9 Fragen zu Fragetypen, Experimenten, Kausalität und Metaanalyse. Pro Frage ist genau eine Antwort richtig.',
      points: 18,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-s3-q02', number: 2, points: 2,
          text: 'Welcher der folgenden Punkte stellt KEINEN Vorteil bei der Verwendung von geschlossenen Fragen in einer Umfrage dar?',
          choices: [
            { key: 'A', text: 'Geschlossene Fragen erleichtern die Verarbeitung und Analyse von Antworten.' },
            { key: 'B', text: 'Antworten auf geschlossene Fragen sind im Vergleich zu Antworten auf offene Fragen seltener unerwartet.' },
            { key: 'C', text: 'Geschlossene Fragen sind im Vergleich zu offenen Fragen schneller und einfacher für die Befragten zu beantworten.' },
            { key: 'D', text: 'Antworten auf geschlossene Fragen sind im Vergleich zu Antworten auf offene Fragen tendenziell nicht mehrdeutig.' }
          ],
          correct: ['B'],
          explanation: 'A, C und D sind klassische Vorteile geschlossener Fragen (einfachere Auswertung, schnellere Beantwortung, geringere Mehrdeutigkeit). Dass Antworten seltener "unerwartet" ausfallen, ist dagegen kein Vorteil, sondern eher die Kehrseite: Geschlossene Fragen schränken den Antwortraum auf vordefinierte Kategorien ein, wodurch unerwartete, aber potenziell wertvolle Erkenntnisse (das "Warum") verloren gehen können — ein Vorteil, der eher offenen Fragen zugeschrieben wird.',
          topics: ['Fragetypen und Skalen', 'Offene vs. geschlossene Fragen']
        },
        {
          id: 'esf-s3-q04', number: 4, points: 2,
          text: 'Was für ein Fragetyp ist ein semantisches Differenzial?',
          choices: [
            { key: 'A', text: 'Eine geschlossene, skalierte Frage' },
            { key: 'B', text: 'Eine geschlossene, dichotome Frage' },
            { key: 'C', text: 'Eine offene, dichotome Frage' },
            { key: 'D', text: 'Eine Multiple-Choice-Frage' }
          ],
          correct: ['A'],
          explanation: 'Beim semantischen Differenzial werden entgegengesetzte Wortpaare (z.B. fröhlich – traurig) auf einer mehrstufigen Skala präsentiert, um zu erfassen, zu welcher Seite die befragte Person tendiert. Es handelt sich also um eine geschlossene, skalierte Frage — nicht um eine dichotome (nur 2 Optionen) oder offene Frage.',
          topics: ['Fragetypen und Skalen', 'Skalenniveaus']
        },
        {
          id: 'esf-s3-q06', number: 6, points: 2,
          text: 'Wie kann folgende Aussage interpretiert werden: "Fussballteams mit roten Trikots gewinnen häufiger."?',
          choices: [
            { key: 'A', text: 'Direkte Kausalität' },
            { key: 'B', text: 'Indirekte Kausalität' },
            { key: 'C', text: 'Umgekehrte Kausalität' },
            { key: 'D', text: 'Kausalität unklar' }
          ],
          correct: ['D'],
          explanation: 'Die blosse Beobachtung einer Korrelation zwischen Trikotfarbe und Siegquote lässt keinen eindeutigen kausalen Schluss zu. Es könnte direkte Kausalität (Rot beeinflusst Gegner/Schiedsrichter), umgekehrte Kausalität (erfolgreiche/dominante Teams wählen eher Rot) oder ein Drittfaktor vorliegen. Ohne kontrolliertes Experiment bleibt die Kausalität unklar — Korrelation ist nicht gleich Kausalität.',
          topics: ['Kausalität vs. Korrelation', 'Experimente']
        },
        {
          id: 'esf-s3-q07', number: 7, points: 2,
          text: 'Bitte ergänzen Sie: Bei einem Experiment findet die Manipulation der ___ Variable(n) ___ der Abfrage der ___ Variable statt.',
          choices: [
            { key: 'A', text: 'unabhängigen / vor / abhängigen' },
            { key: 'B', text: 'abhängigen / vor / unabhängigen' },
            { key: 'C', text: 'unabhängigen / nach / abhängigen' },
            { key: 'D', text: 'abhängigen / nach / unabhängigen' }
          ],
          correct: ['A'],
          explanation: 'Bei einem Experiment wird zunächst die unabhängige Variable manipuliert (z.B. Versuchsgruppe vs. Kontrollgruppe), und erst danach wird die abhängige Variable erhoben, um den Effekt der Manipulation zu messen.',
          topics: ['Experimente', 'UV und AV']
        },
        {
          id: 'esf-s3-q08', number: 8, points: 2,
          text: 'Was ist KEIN Vorteil von Online-Experimenten im Vergleich zu Laborexperimenten?',
          choices: [
            { key: 'A', text: 'Einfachere Generierung einer kulturellen Vielfalt in der Stichprobe' },
            { key: 'B', text: 'Hohe Geschwindigkeit der Ergebnisgenerierung' },
            { key: 'C', text: 'Einfache Klärung von Missverständnissen bei der Beantwortung von Fragen' }
          ],
          correct: ['C'],
          explanation: 'Online-Experimente ermöglichen eine schnelle Datenerhebung (B) und den Zugang zu kulturell vielfältigeren Stichproben (A), da Teilnehmende weltweit rekrutiert werden können. Die Klärung von Missverständnissen ist dagegen im Laborexperiment einfacher, da die Forschenden persönlich anwesend sind und Rückfragen direkt beantworten können — bei Online-Experimenten ist dies kaum möglich.',
          topics: ['Experimente', 'Online-Experimente']
        },
        {
          id: 'esf-s3-q10', number: 10, points: 2,
          text: 'Was zeichnet ein Quasi-Experiment aus?',
          choices: [
            { key: 'A', text: 'Eine randomisierte Zuteilung zu Versuchsgruppen ist nicht möglich.' },
            { key: 'B', text: 'Die Strukturgleichheit zwischen den Konditionen kann immer sichergestellt werden.' },
            { key: 'C', text: 'Die abhängige Variable wird manipuliert.' },
            { key: 'D', text: 'Keiner der genannten Punkte ist richtig.' }
          ],
          correct: ['A'],
          explanation: 'Ein Quasi-Experiment unterscheidet sich von einem echten Experiment dadurch, dass keine randomisierte Zuteilung der Teilnehmenden zu den Versuchsgruppen möglich ist (z.B. bei natürlich vorkommenden Gruppen). Dadurch kann die Strukturgleichheit zwischen den Gruppen nicht garantiert werden (B falsch), und manipuliert wird stets die unabhängige, nicht die abhängige Variable (C falsch).',
          topics: ['Experimente', 'Quasi-Experiment']
        },
        {
          id: 'esf-s3-q11', number: 11, points: 2,
          text: 'Zu welchem der folgenden Zwecke wird KEINE klassische Meta-Analyse durchgeführt?',
          choices: [
            { key: 'A', text: 'Um den Stand der Forschung in einem bestimmten Gebiet aufzuzeigen.' },
            { key: 'B', text: 'Um mehrere empirische Paper miteinander zu vergleichen.' },
            { key: 'C', text: 'Zur statistischen Synthese mehrerer Studien eines Artikels.' },
            { key: 'D', text: 'Zur Analyse der Ergebnisse von Studien, wenn viele Forschungsartikel mit unterschiedlichen Ergebnissen zu einem bestimmten Thema geschrieben wurden.' }
          ],
          correct: ['C'],
          explanation: 'Eine klassische Meta-Analyse fasst die Ergebnisse mehrerer unabhängiger Studien aus verschiedenen Forschungsartikeln statistisch zusammen, um den Stand der Forschung zu einem Thema aufzuzeigen, Paper zu vergleichen und uneinheitliche Befunde einzuordnen (A, B, D). Sie bezieht sich jedoch nicht auf mehrere Studien EINES einzelnen Artikels (C) — das wäre keine Meta-Analyse im klassischen Sinn.',
          topics: ['Metaanalyse', 'Forschungsprozess']
        },
        {
          id: 'esf-s3-q12', number: 12, points: 2,
          text: 'Sie nehmen an, dass ein kausaler Zusammenhang zwischen der Kalorienaufnahme von Personen (unabhängige Variable) und deren Gewicht (abhängige Variable) besteht. Zusätzlich wollen Sie bei Ihrer Analyse den Einfluss des Wetters auf das Gewicht einbeziehen. Das Wetter ist somit eine...',
          choices: [
            { key: 'A', text: 'Kontrollvariable' },
            { key: 'B', text: 'Regressand' },
            { key: 'C', text: 'Mediatorvariable' },
            { key: 'D', text: 'Moderatorvariable' }
          ],
          correct: ['A'],
          explanation: 'Das Wetter steht sowohl mit der unabhängigen als auch der abhängigen Variable in Zusammenhang und könnte den Zusammenhang zwischen Kalorienaufnahme und Gewicht verzerren (Konfundierung). Indem man bei der Analyse (z.B. per Regression) für das Wetter kontrolliert, behandelt man es als Kontrollvariable, um eine Verzerrung der Ergebnisse zu vermeiden.',
          topics: ['Experimente', 'Konfundierung', 'Kontrollvariable']
        },
        {
          id: 'esf-s3-q15', number: 15, points: 2,
          text: 'Welcher der folgenden Punkte erklärt am besten, warum kontrollierte Experimente für die Feststellung kausaler Zusammenhänge in der quantitativen Forschung unerlässlich sind, wie im Insight File "Leaders: Stop Confusing Correlation with Causation" beschrieben?',
          choices: [
            { key: 'A', text: 'Kontrollierte Experimente helfen, Korrelationen zu bestätigen, indem sie die Menge der verfügbaren Daten erhöhen.' },
            { key: 'B', text: 'Kontrollierte Experimente stellen sicher, dass nur die abhängige Variable das Ergebnis beeinflusst.' },
            { key: 'C', text: 'Kontrollierte Experimente ermöglichen es Forschenden, mögliche Störfaktoren zu isolieren und dadurch festzustellen, ob ein beobachteter Zusammenhang tatsächlich kausal ist.' },
            { key: 'D', text: 'Kontrollierte Experimente beseitigen automatisch alle möglichen Biases und garantieren, dass die Ergebnisse auf jede Situation übertragbar sind.' }
          ],
          correct: ['C'],
          explanation: 'Kontrollierte Experimente ermöglichen es, Stör- und Drittvariablen gezielt auszuschalten oder konstant zu halten. Dadurch kann klarer festgestellt werden, ob tatsächlich die unabhängige Variable die beobachtete Veränderung verursacht. Reine Beobachtungsdaten führen oft zu irreführenden Korrelationen, weil andere Faktoren das Ergebnis beeinflussen können — Experimente machen Kausalität überprüfbar.',
          topics: ['Experimente', 'Kausalität vs. Korrelation']
        }
      ]
    },
    {
      id: 'sitzung3-mc',
      title: 'Sitzung 3: Multiple Choice (12 Punkte)',
      description: '6 Fragen zu Fragetypen, Pretest, Experimenten und Kausalität. Alle richtigen Kreuze nötig.',
      points: 12,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-s3-q01', number: 1, points: 2,
          text: 'Welche Aussagen über eine offene Frage sind zutreffend? Eine offene Frage...',
          choices: [
            { key: 'A', text: '...ermöglicht es den befragten Personen, in ihren eigenen Worten zu antworten.' },
            { key: 'B', text: '...gibt keine begrenzte Anzahl an Antwortmöglichkeiten vor.' },
            { key: 'C', text: '...kann helfen herauszufinden, warum ein/e Studienteilnehmer*in eine bestimmte Antwort gegeben hat.' },
            { key: 'D', text: '...ist in der Regel schneller und leichter zu analysieren als eine geschlossene Frage.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Offene Fragen lassen den Befragten freie Formulierung zu (A), schränken die Anzahl möglicher Antworten nicht ein (B) und ermöglichen es, das "Warum" hinter einer Antwort zu verstehen (C). D ist falsch: Geschlossene Fragen sind aufgrund vordefinierter Kategorien schneller und leichter zu analysieren als offene Fragen.',
          topics: ['Fragetypen und Skalen', 'Offene vs. geschlossene Fragen']
        },
        {
          id: 'esf-s3-q03', number: 3, points: 2,
          text: 'Worüber sollte ein Pretest Informationen liefern?',
          choices: [
            { key: 'A', text: 'Verständlichkeit der Fragen' },
            { key: 'B', text: 'Technisches Problem mit dem Fragebogen' },
            { key: 'C', text: 'Dauer der Umfrage' },
            { key: 'D', text: 'Ob die Hypothese bestätigt werden kann' },
            { key: 'E', text: 'Interesse und Aufmerksamkeit der Befragten für individuelle Fragen' },
            { key: 'F', text: 'Ob die Hypothese verworfen werden kann' }
          ],
          correct: ['A', 'B', 'C', 'E'],
          explanation: 'Ein Pretest ist eine Miniaturversion der Hauptstudie zum Testen der Funktionalität des Studiendesigns. Er liefert Informationen über Verständlichkeit der Fragen, technische Probleme mit dem Fragebogen, Dauer der Umfrage sowie Interesse und Aufmerksamkeit der Befragten — nicht aber über die Bestätigung oder Verwerfung der Hypothese, denn Hypothesen werden erst mit der Hauptstudie getestet.',
          topics: ['Quantitative Studiendesigns', 'Pretest']
        },
        {
          id: 'esf-s3-q05', number: 5, points: 2,
          text: 'Welche der folgenden Aussagen zu Fragetypen und Skalen sind zutreffend?',
          choices: [
            { key: 'A', text: 'Die Frage "Wenn Sie sich für ein Produkt entscheiden, was ist Ihnen wichtiger: Farbe oder Preis?" ist ein Beispiel für einen Paarvergleich, da die Befragten zwischen zwei Alternativen wählen müssen.' },
            { key: 'B', text: 'Um den Neuigkeitsgehalt eines Forschungsprojekts zu steigern, sollte man immer eine eigene Skala entwickeln, auch wenn bereits etablierte, valide Skalen für das Konstrukt existieren.' },
            { key: 'C', text: 'Die Frage "Welche Marken kommen Ihnen in den Sinn, wenn Sie an Schokolade denken?" ist ein Beispiel für eine Wortverbindungsfrage.' },
            { key: 'D', text: 'Wortverbindungsfragen gehören zu den offenen Fragen.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'A korrekt: Bei einem Paarvergleich müssen die Teilnehmenden zwischen zwei Alternativen wählen. C und D korrekt: Bei Wortverbindungsfragen werden Befragte gebeten anzugeben, welche Wörter sie mit einem Begriff (hier: Schokolade) verbinden — dies ist eine offene Frage, da die Antwort frei formuliert wird. B ist falsch: Existieren bereits etablierte, reliable und valide Skalen aus hochrangigen Zeitschriften für ein Konstrukt, sollte man auf diese zurückgreifen, statt unnötig eine neue Skala zu entwickeln.',
          topics: ['Fragetypen und Skalen', 'Skalenentwicklung']
        },
        {
          id: 'esf-s3-q09', number: 9, points: 2,
          text: 'Was sind Vorteile von Feldexperimenten?',
          choices: [
            { key: 'A', text: 'Hohe externe Validität' },
            { key: 'B', text: 'Natürliche Umwelt' },
            { key: 'C', text: 'Hohe Kontrolle über Variablen' },
            { key: 'D', text: 'Einfache Replikation' }
          ],
          correct: ['A', 'B'],
          explanation: 'Stärken von Feldexperimenten sind eine hohe externe Validität, hohe Repräsentativität, geringe Reaktivität und die natürliche Umwelt, in der sie stattfinden. Zu den Nachteilen gehören dagegen die fehlende Kontrolle über Störvariablen und die erschwerte Replikation der Ergebnisse — C und D sind daher Nachteile, nicht Vorteile.',
          topics: ['Experimente', 'Feldexperiment']
        },
        {
          id: 'esf-s3-q13', number: 13, points: 2,
          text: 'Ordnen Sie die folgenden Aussagen ihrer korrekten Kausalitätsform zu. Welche der folgenden Zuordnungen sind richtig?',
          choices: [
            { key: 'A', text: '"Gamifizierte Informationspräsentation steigert den Absatz von Produktinnovationen, indem sie die Neugier der Verbraucher*innen anregt." → indirekte Kausalität' },
            { key: 'B', text: '"Durch Konsumenten*innen, die einen Produktkatalog von einem Einzelhändler erhalten, können höhere Umsätze erzielt werden." → direkte Kausalität' },
            { key: 'C', text: '"Der Bekanntheitsgrad eines Produkts beeinflusst den Verkauf des Produkts, was wiederum den Bekanntheitsgrad des Produkts beeinflusst." → bidirektionale Kausalität' },
            { key: 'D', text: '"Je höher der Pro-Kopf-Verbrauch von Mozzarella ist, desto grösser ist die Zahl der Doktorierenden in den Ingenieurwissenschaften." → keine Kausalität' },
            { key: 'E', text: '"Der Bekanntheitsgrad eines Produkts beeinflusst den Verkauf des Produkts, was wiederum den Bekanntheitsgrad des Produkts beeinflusst." → umgekehrte Kausalität' },
            { key: 'F', text: '"Je höher der Pro-Kopf-Verbrauch von Mozzarella ist, desto grösser ist die Zahl der Doktorierenden in den Ingenieurwissenschaften." → Multikausalität' }
          ],
          correct: ['A', 'B', 'C', 'D'],
          explanation: 'A: X (Gamification) verursacht Z (Neugier), welches Y (Absatz) verursacht → indirekte Kausalität. B: X (Katalog) verursacht direkt Y (Umsatz) → direkte Kausalität. C: X (Bekanntheit) verursacht Y (Verkauf) UND Y verursacht X → bidirektionale Kausalität. D: Der Zusammenhang zwischen Mozzarella-Konsum und der Zahl der Ingenieurs-Doktorierenden ist eine Scheinkorrelation/Zufall → keine Kausalität. E und F sind falsche Zuordnungen: C ist bidirektional (nicht umgekehrt), und D zeigt keine Kausalität (nicht Multikausalität).',
          topics: ['Kausalität vs. Korrelation', 'Kausalitätsformen']
        },
        {
          id: 'esf-s3-q14', number: 14, points: 2,
          text: 'Anna nimmt an einer experimentellen Online-Studie mit within-subjects Design teil (zwei Konditionen: Vermenschlichung eines Staubsaugerroboters vs. keine Vermenschlichung/Kontrollkondition). Anna gibt ihre Kaufbereitschaft auf einer 7-stufigen Likert-Skala (1 = "stimme überhaupt nicht zu" bis 7 = "stimme voll und ganz zu") an. Welche der folgenden Aussagen sind richtig?',
          choices: [
            { key: 'A', text: 'Im Experiment wird Anna einen Staubsaugerroboter mit Augen sehen.' },
            { key: 'B', text: 'Im Experiment wird Anna einen Staubsaugerroboter ohne Augen sehen.' },
            { key: 'C', text: 'Anna wird den Staubsaugerroboter mit 50% Wahrscheinlichkeit mit Augen sehen und mit 50% Wahrscheinlichkeit ohne Augen sehen.' },
            { key: 'D', text: 'Die Forschenden manipulieren die Vermenschlichung des Staubsaugerroboters.' },
            { key: 'E', text: 'Wie menschenähnlich der Staubsaugerroboter wahrgenommen wird, ist die abhängige Variable im Experiment.' },
            { key: 'F', text: 'Die unabhängige Variable ist: keine Vermenschlichung vs. Vermenschlichung.' },
            { key: 'G', text: 'Die abhängige Variable ist eine Likert-Frage.' },
            { key: 'H', text: 'Die unabhängige Variable ist dichotom.' },
            { key: 'I', text: 'Die Hauptanalyse ist vermutlich eine Clusteranalyse.' }
          ],
          correct: ['A', 'B', 'D', 'F', 'G', 'H'],
          explanation: 'Bei einem within-subjects Design wird jede Person allen Konditionen ausgesetzt — Anna sieht also beide Versionen des Roboters (A, B richtig; C falsch, da es kein Zufallsexperiment mit 50/50-Wahrscheinlichkeit pro Person ist, sondern beide Konditionen durchlaufen werden). D korrekt: Die Vermenschlichung wird von den Forschenden manipuliert — das ist die UV. F und H korrekt: Die UV (keine Vermenschlichung vs. Vermenschlichung) besteht aus zwei Kategorien, ist also dichotom. E ist falsch: Die wahrgenommene Menschenähnlichkeit wäre ein Manipulationscheck, nicht die AV — die AV ist die Kaufbereitschaft. G korrekt: Die Kaufbereitschaft wird über eine Likert-Frage (1-7) erhoben. I ist falsch: Bei Gruppenunterschieden zwischen zwei Konditionen wird vermutlich ein t-Test, keine Clusteranalyse durchgeführt.',
          topics: ['Experimente', 'UV und AV', 'Within-Subjects-Design']
        }
      ]
    }
  ]
};
