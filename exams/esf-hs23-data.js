window.EXAM_DATA_ESF_HS23 = {
  id: 'esf-hs23',
  title: 'ESF — Prüfung HS 2023',
  course: 'Empirische Sozialforschung',
  courseColor: '#16a34a',
  duration_minutes: 60,
  total_points: 60,
  exam_info: {
    date: '23.06.2026',
    duration: '60 Minuten',
    format: 'Single Choice (Teil I–III) + Multiple Choice (Teil IV)',
    allowed_aids: 'Keine',
    grading: 'Note 6.0: ≥85%, Note 5.5: ≥75%, Note 5.0: ≥65%, Note 4.5: ≥55%, Note 4.0: ≥45%, Note 3.5: ≥35%, Note 3.0: ≥25%'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'teil1',
      title: 'Teil I: Forschungsmethoden (6 Punkte)',
      description: 'Fragen 1–3 beziehen sich auf einen Artikel über digitale Besitztümer (Mardon et al., 2023). Qualitative Tiefeninterviews mit 25 britischen Konsumierenden, Schneeballsystem, iterative Datenerhebung bis theoretische Sättigung. Single Choice: Eine Antwort pro Frage, richtig = 2 Punkte.',
      points: 6,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-hs23-01',
          number: 1,
          points: 2,
          text: 'Die Studie über digitale Besitztümer (Mardon et al., 2023) führte 25 Tiefeninterviews durch, mit wiederholten Interviews über mehrere Monate bis zu zwei Jahren. Die Datenerhebung erfolgte gleichzeitig mit der Analyse bis zur theoretischen Sättigung. Welche Aussage zur Studie ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Es handelt sich um eine longitudinale Studie.' },
            { key: 'B', text: 'Es handelt sich um eine persönliche Umfrage, bei der mittels eines Fragebogens Daten erhoben werden.' },
            { key: 'C', text: 'Die Forschenden folgen einem positivistischen Ansatz.' },
            { key: 'D', text: 'Teil der Studie war eine Dokumentenauswertung, da bereits bestehende Dokumente analysiert wurden.' },
            { key: 'E', text: 'Ziel der Forschenden in dieser qualitativen Studie ist es, Erwartungen an digitale Objekte durch demographische Variablen vorherzusagen.' }
          ],
          correct: ['A'],
          explanation: 'Da Interviews über mehrere Monate bis Jahre wiederholt wurden, um Veränderungen zu erfassen, handelt es sich um eine longitudinale Studie.',
          topics: ['Längsschnitt', 'Qualitativ', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-02',
          number: 2,
          points: 2,
          text: 'Welche Aussage in Bezug auf die in der Studie (Mardon et al., 2023) verwendete qualitative Stichprobe und Datenerhebung ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Es gibt in dieser Studie keine organisatorischen oder sozialen Barrieren beim Zugang zur Stichprobe.' },
            { key: 'B', text: 'Die Dateninterpretation sollte unter Berücksichtigung der betrachteten Stichprobe erfolgen.' },
            { key: 'C', text: 'Der iterative Wechsel zwischen Datenerhebung und Datenanalyse ist in der qualitativen Forschung unüblich.' },
            { key: 'D', text: 'Die exakte Stichprobengrösse wird, ähnlich wie bei einem experimentellen Ansatz, im Vorhinein festgelegt.' },
            { key: 'E', text: 'Die Stichprobe bei qualitativer Forschung sollte immer repräsentativ sein.' }
          ],
          correct: ['B'],
          explanation: 'In qualitativer Forschung wird eine gezielte (theoretische) Stichprobe gewählt, keine repräsentative. Ergebnisse sind auf den untersuchten Kontext beschränkt und sollten entsprechend interpretiert werden.',
          topics: ['Qualitativ', 'Datenerhebung', 'Befragung'],
        },
        {
          id: 'esf-hs23-03',
          number: 3,
          points: 2,
          text: 'Welche Analysemethode wäre für die Studie über digitale Besitztümer (Mardon et al., 2023) am ehesten geeignet?',
          choices: [
            { key: 'A', text: 'Grounded Theory: Hiermit könnte man deduktiv von der zuvor erarbeiteten Theorie auf das vorliegende Phänomen schliessen.' },
            { key: 'B', text: 'Binomialtest: Hiermit könnte man testen, ob die Verteilung einer dichotomen Variable der vermuteten Verteilung entspricht.' },
            { key: 'C', text: 'Grounded Theory: Hiermit könnte durch eine Reihe von systematischen Prozessschritten ein tieferes Verständnis der Erfahrungen der Teilnehmenden gewonnen werden.' },
            { key: 'D', text: 'Qualitative Inhaltsanalyse: Hiermit könnten zahlenmässige Muster aufgedeckt und allgemeingültige Gesetzmässigkeiten festgelegt werden.' },
            { key: 'E', text: 'Faktoranalyse: Hiermit könnte die Beziehung der Faktoren auf einen zugrunde liegenden Faktor reduziert werden.' }
          ],
          correct: ['C'],
          explanation: 'Grounded Theory ist eine induktive qualitative Methode, die durch systematische Prozessschritte (offenes, axiales, selektives Kodieren) ein tieferes Verständnis von Phänomenen entwickelt — passend für diese explorative qualitative Studie.',
          topics: ['Qualitativ', 'Induktion', 'Methode'],
        }
      ]
    },
    {
      id: 'teil2',
      title: 'Teil II: Experimentelle Forschung (8 Punkte)',
      description: 'Fragen 4–7 beziehen sich auf ein virtuelles Experiment (Zhu et al., 2022) mit 162 Teilnehmenden, 2×2 between-subjects Design (Design: Standard vs. erweitert; Gebäude: Büro vs. Schule). Single Choice: richtig = 2 Punkte.',
      points: 8,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-hs23-04',
          number: 4,
          points: 2,
          text: 'Welche Aussage über die erwähnten Variablen aus dem Methodenteil des Experiments (Zhu et al., 2022, 2×2 between-subjects Design, 4 Konditionen, 162 Teilnehmende) ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Bei der Studie handelt es sich um ein Experiment mit vier Konditionen, bei dem alle Teilnehmenden alle vier Konditionen durchlaufen.' },
            { key: 'B', text: 'Eine multifaktorielle ANOVA ist eine angemessene Methode der Datenanalyse bei dieser Studie.' },
            { key: 'C', text: 'Eine mögliche Konfundierung durch unkontrollierte Variablen kann durch die zufällige Zuteilung nicht minimiert werden.' },
            { key: 'D', text: 'Eine einfaktorielle ANOVA ist eine angemessene Methode der Datenanalyse bei dieser Studie.' },
            { key: 'E', text: 'In dem Experiment werden die Teilnehmenden zufällig einer von zwei Konditionen zugeordnet.' }
          ],
          correct: ['B'],
          explanation: 'Bei einem 2×2-Design mit zwei unabhängigen Variablen ist eine multifaktorielle (zweifaktorielle) ANOVA angemessen, da sie Haupt- und Interaktionseffekte testen kann.',
          topics: ['Experiment', 'UV', 'AV', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-05',
          number: 5,
          points: 2,
          text: 'Welche der folgenden Aussagen zur Studie über Verhalten bei aktiven Schiessvorfällen (Zhu et al., 2022) ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Zur besseren Generalisierbarkeit könnte die Studie in mehreren Ländern durchgeführt werden.' },
            { key: 'B', text: 'In der Studie ist die hypothetische Natur des Szenarios kein Problem.' },
            { key: 'C', text: 'Die externe Validität der Studie ist als sehr hoch einzuschätzen.' },
            { key: 'D', text: 'Das Design erlaubt keine kausalen Rückschlüsse hinsichtlich der Effekte der Gegenmassnahmen auf Verhaltensweisen.' },
            { key: 'E', text: 'Die Ungleichheit im Geschlechterverhältnis stellt ein gravierendes Problem hinsichtlich der Forschungsfrage und des Designs dar.' }
          ],
          correct: ['A'],
          explanation: 'Da es grosse Unterschiede in der Häufigkeit von Amokläufen und in Sicherheitspraktiken über verschiedene Länder hinweg gibt, würde eine multi-nationale Studie die externe Validität (Generalisierbarkeit) verbessern.',
          topics: ['Experiment', 'Interne Validität', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-06',
          number: 6,
          points: 2,
          text: 'Welche Aussage zu möglichen Limitationen der Studie (Zhu et al., 2022) ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Da es sich bei den Teilnehmenden um Bürokräfte und Lehrende handelte, sind die Resultate nicht auf Kinder übertragbar.' },
            { key: 'B', text: 'Teilnehmende sind bei Onlinesimulationen generell unaufmerksam, was die Aussagekraft stark limitiert.' },
            { key: 'C', text: 'Die abhängigen Variablen (Reaktionszeit und Entscheidungen) sind in einem reellen Kontext nicht entscheidend.' },
            { key: 'D', text: 'Alle abhängigen Variablen basieren auf selbstberichteten Daten, welche Verzerrungen aufweisen können.' },
            { key: 'E', text: 'Die Stichprobengrösse ist eindeutig zu klein, um aussagekräftige Resultate zu erhalten.' }
          ],
          correct: ['A'],
          explanation: 'Es ist eine legitime Limitation, dass die Stichprobe aus Erwachsenen (Bürokräfte, Lehrende) besteht und die Ergebnisse möglicherweise nicht auf andere Gruppen wie Kinder übertragbar sind.',
          topics: ['Experiment', 'Datenerhebung', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-07',
          number: 7,
          points: 2,
          text: 'Welche Aussage über die Methodik des Artikels (Zhu et al., 2022) ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Im Experiment bedarf es keiner randomisierten Zuteilung, da jede und jeder Teilnehmende alle Konditionen durchläuft.' },
            { key: 'B', text: 'Bei der Messung der Reaktionszeit spielt soziale Erwünschtheit eine wichtige Rolle.' },
            { key: 'C', text: 'Für eine solche Studie, die psychisch belastende Szenarien enthält, ist es wichtig, dass im Vorhinein die Zustimmung der ethischen Beratungsstelle eingeholt wird.' },
            { key: 'D', text: 'Da schnelle und intuitive Entscheidungen unter Zeitdruck abgefragt werden, ist es besonders wichtig, dass Teilnehmende zu Beginn nicht über den Inhalt informiert werden.' },
            { key: 'E', text: 'Anwendung von immersiven Technologien (z.B. Virtual Reality) könnte die externe Validität nicht weiter erhöhen.' }
          ],
          correct: ['C'],
          explanation: 'Bei Studien mit psychisch belastenden Inhalten (wie simulierten Amokläufen) ist ethische Genehmigung durch eine institutionelle Prüfungskommission zwingend erforderlich.',
          topics: ['Experiment', 'Forschungsprozess', 'Randomisierung'],
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
          id: 'esf-hs23-08',
          number: 8,
          points: 2,
          text: 'Welche Aussage über Primär- und Sekundärdaten ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Sekundärdaten sind immer qualitativer Natur, während Primärdaten immer quantitativer Natur sind.' },
            { key: 'B', text: 'Führen Forschende ein Interview, eine Beobachtung oder ein Experiment durch, erheben sie primäre Daten.' },
            { key: 'C', text: 'Fan-Communities, Social Media, Blogs und Foren gehören nicht zu möglichen Quellen für Sekundärdaten.' },
            { key: 'D', text: 'Sekundärdaten zeichnen sich durch eine hohe Aktualität, eine gute Passung zur Forschungsfrage und grösseren Zeitbedarf aus.' },
            { key: 'E', text: 'Primärdaten zeichnen sich durch eine schnelle Verfügbarkeit und niedrige Kosten aus.' }
          ],
          correct: ['B'],
          explanation: 'Primärdaten sind Daten, die direkt für den Forschungszweck erhoben werden (Interviews, Beobachtungen, Experimente). Sekundärdaten sind bereits vorhandene Daten, die für andere Zwecke erhoben wurden.',
          topics: ['Primärdaten', 'Sekundärdaten', 'Datenerhebung'],
        },
        {
          id: 'esf-hs23-09',
          number: 9,
          points: 2,
          text: 'Ordnen Sie die Begriffe den Definitionen zu: 1=Miniaturversion zum Testen des Studiendesigns, 2=Variable, die den Zusammenhang zwischen UV und AV erklärt, 3=Variable, die die Beziehung zwischen UV und AV verzerren kann, 4=Variable, die den Effekt einer Variable auf eine andere verändert, 5=Gütekriterium, das zeigt, dass nur getestete Variablen das Ergebnis beeinflussen. Welche Option ist am zutreffendsten?',
          choices: [
            { key: 'A', text: '1=Interne Validität, 2=Mediator, 3=Moderator, 4=Störvariable, 5=Externe Validität' },
            { key: 'B', text: '1=Pretest, 2=Moderator, 3=Störvariable, 4=Mediator, 5=Interne Validität' },
            { key: 'C', text: '1=Pretest, 2=Mediator, 3=Störvariable, 4=Moderator, 5=Externe Validität' },
            { key: 'D', text: '1=Pretest, 2=Störvariable, 3=Mediator, 4=Moderator, 5=Interne Validität' },
            { key: 'E', text: '1=Pretest, 2=Mediator, 3=Störvariable, 4=Moderator, 5=Interne Validität' }
          ],
          correct: ['E'],
          explanation: 'Pretest = Miniaturversion; Mediator = erklärt den Zusammenhang zwischen UV und AV; Störvariable = verzerrt die Beziehung; Moderator = verändert die Stärke/Richtung des Effekts; Interne Validität = nur untersuchte Variablen beeinflussen das Ergebnis.',
          topics: ['UV', 'AV', 'Interne Validität', 'Experiment'],
        },
        {
          id: 'esf-hs23-10',
          number: 10,
          points: 2,
          text: 'Welche Aussage zur qualitativen Forschung ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Transkription beschreibt das Erfassen von reflektierenden Gedanken über die gesammelten Daten zur Identifizierung von Themen.' },
            { key: 'B', text: 'Bei qualitativer Forschung kann die genaue Stichprobengrösse im Vorhinein meist nicht festgelegt werden, da vordergründig die Erreichung einer theoretischen Sättigung angestrebt wird.' },
            { key: 'C', text: 'Qualitative Fallstudien haben zum Ziel, ein Forschungssubjekt in einer künstlichen, kontrollierten Umgebung zu untersuchen.' },
            { key: 'D', text: 'Die qualitative Datenerhebung beschreibt die systematische Erhebung von nichtstandardisierten Daten aus einer kleinen, aber repräsentativen Stichprobe.' },
            { key: 'E', text: 'Die Schritte der Datenkodierung bestehen in der Abfolge: (1) selektives Kodieren, (2) axiales Kodieren, (3) offenes Kodieren.' }
          ],
          correct: ['B'],
          explanation: 'In qualitativer Forschung wird die Stichprobengrösse nicht vorab festgelegt; stattdessen wird so lange erhoben, bis theoretische Sättigung erreicht ist (d.h. keine neuen Erkenntnisse mehr entstehen).',
          topics: ['Qualitativ', 'Datenerhebung', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-11',
          number: 11,
          points: 2,
          text: 'Welche Aussage über die Literaturrecherche trifft am WENIGSTEN zu?',
          choices: [
            { key: 'A', text: 'Die Literaturrecherche ermöglicht die Feststellung wichtiger Methoden und Forschungstheorien in einem Forschungsbereich.' },
            { key: 'B', text: 'Mit der Literaturrecherche kann ermittelt werden, welche Konstrukte und Variablen bereits untersucht wurden.' },
            { key: 'C', text: 'Die Literaturrecherche ermöglicht das Erheben von primären Daten.' },
            { key: 'D', text: 'Ein Ziel der Literaturrecherche ist die Identifizierung von Lücken in der Literatur.' },
            { key: 'E', text: 'Die Literaturrecherche ist keine eigenständige Forschungsmethode.' }
          ],
          correct: ['C'],
          explanation: 'Die Literaturrecherche bezieht sich auf bereits vorhandene (sekundäre) Quellen. Primärdaten werden durch eigene Datenerhebung gewonnen (Interviews, Experimente etc.), nicht durch Literaturrecherche.',
          topics: ['Sekundärdaten', 'Primärdaten', 'Forschungsprozess'],
        },
        {
          id: 'esf-hs23-12',
          number: 12,
          points: 2,
          text: 'Ordnen Sie die Definitionen zu: 1=Schlussfolgern vom Allgemeinen zum Spezifischen, 2=Verallgemeinerte Aussage über einen Zusammenhang, 3=Wiedergabe der kausalen Wechselbeziehung zwischen Variablen, 4=Verallgemeinerung vom Spezifischen zum Allgemeinen, 5=Fragestellung nach der Ursache und Kausalbeziehung, 6=Zufällige Zuordnung zu einer Kondition. Welche Reihenfolge ist am zutreffendsten?',
          choices: [
            { key: 'A', text: '1=Deduktion, 2=Theorie, 3=Konzeptionelles Modell, 4=Induktion, 5=Kausalfrage, 6=Randomisierung' },
            { key: 'B', text: '1=Induktion, 2=Theorie, 3=Konzeptionelles Modell, 4=Deduktion, 5=Kausalfrage, 6=Randomisierung' },
            { key: 'C', text: '1=Deduktion, 2=Theorie, 3=Konzeptionelles Modell, 4=Induktion, 5=Kausalfrage, 6=Manipulation' },
            { key: 'D', text: '1=Deduktion, 2=Theorie, 3=Konzeptionelles Modell, 4=Induktion, 5=Vergleichsfrage, 6=Randomisierung' },
            { key: 'E', text: '1=Induktion, 2=konzeptionelles Modell, 3=Theorie, 4=Deduktion, 5=Kausalfrage, 6=Randomisierung' }
          ],
          correct: ['A'],
          explanation: 'Deduktion = vom Allgemeinen zum Spezifischen; Theorie = verallgemeinerte Aussage; Konzeptionelles Modell = kausale Wechselbeziehungen; Induktion = vom Spezifischen zum Allgemeinen; Kausalfrage = fragt nach Ursachen; Randomisierung = zufällige Zuteilung.',
          topics: ['Deduktion', 'Induktion', 'Forschungslogik', 'Randomisierung'],
        },
        {
          id: 'esf-hs23-13',
          number: 13,
          points: 2,
          text: 'Ein Artikel (Macnamara & Burgoyne, 2023) überprüfte 63 Studien (N=97\'672) zur Wirksamkeit von Growth-Mindset-Interventionen. Nach Korrektur des Publikations-Bias fanden die Forschenden keine Evidenz für einen Effekt. Welche Aussage über diese Metaanalyse ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Das Korrigieren des Publikations-Bias ist nicht nötig, da eine ausreichend grosse Stichprobenzahl vorliegt.' },
            { key: 'B', text: 'Publikations-Bias bedeutet hier, dass nur diejenigen Studien veröffentlicht wurden, die gegen einen Effekt von Growth-Mindset sprechen.' },
            { key: 'C', text: 'Eine Ursache für den Publikations-Bias könnte gewesen sein, dass nur Studien veröffentlicht wurden, die für Growth-Mindset sprechen.' },
            { key: 'D', text: 'Der Publikations-Bias beeinträchtigt nicht nur die Schätzung des wahren Effektes, sondern auch die Qualität der Studien.' },
            { key: 'E', text: 'Eine Ursache für den Publikations-Bias könnte gewesen sein, dass der untersuchte Effekt eine sehr hohe Power hat.' }
          ],
          correct: ['C'],
          explanation: 'Publikations-Bias entsteht typischerweise dadurch, dass positive Ergebnisse häufiger veröffentlicht werden als negative. Hier hätten Studien, die einen positiven Effekt von Growth-Mindset zeigen, bevorzugt publiziert worden sein können.',
          topics: ['Publikation', 'Empirie', 'Forschungsprozess'],
        },
        {
          id: 'esf-hs23-14',
          number: 14,
          points: 2,
          text: 'Sie hören ein Gespräch über qualitative Forschung. Bei welcher der folgenden Aussagen handelt es sich NICHT um einen Mythos (also um eine zutreffende Aussage)?',
          choices: [
            { key: 'A', text: 'Qualitative Daten sind oftmals subjektiv und können somit nicht systematisch analysiert werden.' },
            { key: 'B', text: 'Die qualitative Forschung ist oft einfacher und schneller als quantitative Forschung; die Kodierung und Interpretation von Textdaten ist sehr zeiteffizient.' },
            { key: 'C', text: 'Qualitative Forschung ist nur für vorläufige Studien geeignet und kann nicht für umfassende Untersuchungen verwendet werden.' },
            { key: 'D', text: 'Qualitative Daten werden interpretativ ausgewertet und sind somit oftmals weniger "wissenschaftlich" als andere Forschungsmethoden.' },
            { key: 'E', text: 'Die Stärke der qualitativen Forschung liegt in ihrer Fähigkeit, detaillierte und kontextspezifische Einblicke zu liefern, aber diese Stärke kann auch die Generalisierbarkeit einschränken.' }
          ],
          correct: ['E'],
          explanation: 'E ist keine Falschaussage (kein Mythos), sondern eine korrekte Beschreibung des Trade-offs in der qualitativen Forschung: tiefe, kontextspezifische Erkenntnisse versus eingeschränkte Generalisierbarkeit.',
          topics: ['Qualitativ', 'Forschungsparadigmen'],
        },
        {
          id: 'esf-hs23-15',
          number: 15,
          points: 2,
          text: 'Eine Datenvisualisierung (Duckworth & Seligman, 2005) zeigt den Notendurchschnitt (GPA) als Funktion der Quintile von IQ und Selbstdisziplin [BILD: Balkendiagramm, beide Variablen steigen positiv mit GPA, Selbstdisziplin zeigt stärkere Differenzierung]. Welche Aussage zur Visualisierung ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Visualisierung zeigt einen negativen, approximativ linearen Zusammenhang zwischen Selbstdisziplin und Notendurchschnitt.' },
            { key: 'B', text: 'Es gibt einen Unterschied zwischen der Stärke der Korrelation der Selbstdisziplin mit dem GPA und der Stärke der Korrelation des IQs mit dem GPA.' },
            { key: 'C', text: 'Ein t-Test für abhängige Stichproben wäre für die Analyse der Beziehung zwischen GPA und Selbstdisziplin geeignet.' },
            { key: 'D', text: 'Der Notendurchschnitt ist unabhängig von der Selbstdisziplin und dem IQ.' },
            { key: 'E', text: 'Der IQ hat in den höheren Quintilen einen stärkeren Einfluss auf den GPA als die Selbstdisziplin.' }
          ],
          correct: ['B'],
          explanation: 'Die Grafik zeigt, dass Selbstdisziplin und IQ unterschiedlich stark mit dem GPA korrelieren — Selbstdisziplin zeigt eine stärkere Differenzierung über die Quintile hinweg.',
          topics: ['Empirie', 'Quantitativ', 'Methode'],
        },
        {
          id: 'esf-hs23-16',
          number: 16,
          points: 2,
          text: 'Ausgehend vom Artikel "Die Harvard-Professorin und die Blogger" (Vorwürfe gegen Francesca Gino): Welche Aussage zu Methoden und Praktiken in den Verhaltenswissenschaften ist am zutreffendsten?',
          choices: [
            { key: 'A', text: '"Social Priming" ist eine allseits anerkannte Methodik in den Verhaltenswissenschaften.' },
            { key: 'B', text: 'Statistisch gesehen kann schon die Manipulation eines geringfügigen Teils einer erhobenen Stichprobe (z.B. 20 von 500 Antworten) das Ergebnis einer Studie massgeblich lenken.' },
            { key: 'C', text: 'Verhaltensforschende gehen davon aus, dass es kein irrationales Verhalten gibt.' },
            { key: 'D', text: 'Falls eine Studie nicht repliziert werden kann, spricht dies dafür, dass Daten gefälscht wurden.' },
            { key: 'E', text: 'Auch bei vorheriger Festlegung des Erhebungszeitraums können Forschende die Datenerhebung früher abbrechen, ohne die Gütekriterien zu verletzen.' }
          ],
          correct: ['B'],
          explanation: 'Schon geringe Manipulationen kleiner Teile eines Datensatzes können statistische Ergebnisse signifikant verändern, da Effekte oft klein sind und Signifikanz von der Fehlerstreuung abhängt.',
          topics: ['Empirie', 'Forschungsprozess', 'Publikation'],
        },
        {
          id: 'esf-hs23-17',
          number: 17,
          points: 2,
          text: 'Welche Aussage über den Artikel "Emotional Branding and the Strategic Value of the Doppelgänger Brand Image" (Thompson et al., 2006) ist am WENIGSTEN zutreffend?',
          choices: [
            { key: 'A', text: 'Eine emotionale Markenstrategie des Unternehmens begünstigt die Entstehung eines Doppelgänger-Markenbildes.' },
            { key: 'B', text: 'Die Forschenden verfolgen einen interpretativen Ansatz.' },
            { key: 'C', text: 'Die Forschenden führen ein strukturiertes Interview mit einem detaillierten, unflexiblen Gesprächsleitfaden.' },
            { key: 'D', text: 'Die Forschenden argumentieren, dass ein Doppelgänger-Markenbild die wahrgenommene Authentizität untergraben kann.' },
            { key: 'E', text: 'Die gesammelten Daten bestehen aus phänomenologischen Interviews mit Café-Besuchern an verschiedenen Standorten.' }
          ],
          correct: ['C'],
          explanation: 'Bei einem interpretativen qualitativen Ansatz werden typischerweise halbstrukturierte oder unstrukturierte Interviews geführt, nicht stark strukturierte. Ein detaillierter, unflexibler Leitfaden wäre eher für quantitative Umfragen typisch.',
          topics: ['Qualitativ', 'Befragung', 'Forschungsparadigmen'],
        },
        {
          id: 'esf-hs23-18',
          number: 18,
          points: 2,
          text: 'Welches der folgenden Stichwörter ist KEIN Merkmal der quantitativen Forschung?',
          choices: [
            { key: 'A', text: 'Standardisierte Befragungen' },
            { key: 'B', text: 'Grosse Stichproben' },
            { key: 'C', text: 'Induktion' },
            { key: 'D', text: 'Hypothesentestung' },
            { key: 'E', text: 'Hohe Reliabilität' }
          ],
          correct: ['C'],
          explanation: 'Quantitative Forschung folgt einem deduktiven Ansatz (von der Theorie zur Hypothese zur Prüfung). Induktion (vom Einzelfall zur Theorie) ist ein Merkmal qualitativer Forschung.',
          topics: ['Quantitativ', 'Induktion', 'Deduktion', 'Forschungslogik'],
        },
        {
          id: 'esf-hs23-19',
          number: 19,
          points: 2,
          text: 'Ordnen Sie die Begriffe im Schema zu Open Science Praktiken und Gütekriterien: 1=Ergebnisse lassen sich mit denselben Daten und Methoden reproduzieren, 2=Ergebnisse gelten für andere Kontexte, 3=Ergebnisse sind robust gegenüber Variation in Methodik, 4=Ergebnisse lassen sich mit neuen Daten bestätigen. Welche Option ist am zutreffendsten?',
          choices: [
            { key: 'A', text: '1=Reproduzierbarkeit, 2=Replizierbarkeit, 3=Robustheit, 4=Generalisierbarkeit' },
            { key: 'B', text: '1=Robustheit, 2=Replizierbarkeit, 3=Reproduzierbarkeit, 4=Generalisierbarkeit' },
            { key: 'C', text: '1=Reproduzierbarkeit, 2=Metaanalyse, 3=Robustheit, 4=Generalisierbarkeit' },
            { key: 'D', text: '1=Reproduzierbarkeit, 2=Metaanalyse, 3=Generalisierbarkeit, 4=Interne Validität' },
            { key: 'E', text: '1=Metaanalyse, 2=Reproduzierbarkeit, 3=Robustheit, 4=Interne Validität' }
          ],
          correct: ['A'],
          explanation: 'Reproduzierbarkeit = gleiche Daten, gleiche Methoden; Replizierbarkeit = neue Daten bestätigen Ergebnisse; Robustheit = stabil gegenüber Methodenvariationen; Generalisierbarkeit = Übertragbarkeit auf andere Kontexte.',
          topics: ['Empirie', 'Forschungsprozess', 'Interne Validität'],
        },
        {
          id: 'esf-hs23-20',
          number: 20,
          points: 2,
          text: 'Welche Aussage zum Artikel "Meaning of Manual Labor Impedes Consumer Adoption of Autonomous Products" (de Bellis et al., 2023) über den Theorieteil und die Übersicht der Studien ist am WENIGSTEN zutreffend?',
          choices: [
            { key: 'A', text: 'Konsumierende nehmen autonome Produkte als risikoreicher und komplexer, aber auch effizienter und komfortabler wahr.' },
            { key: 'B', text: 'Die Forschenden argumentieren, dass Menschen ihren Lebenssinn aus verschiedenen Quellen schöpfen und ein Mangel durch eine andere Quelle kompensiert werden kann.' },
            { key: 'C', text: 'Eine Aversion gegen generell innovative Produkte wurde als alternativer Erklärungsansatz untersucht und empirisch ausgeschlossen.' },
            { key: 'D', text: 'In einer möglichen Werbestrategie könnte hervorgehoben werden, dass durch autonome Produkte gewonnene Zeit für andere sinnvolle Aktivitäten genutzt werden kann.' },
            { key: 'E', text: 'Die Forschenden konzentrieren sich auf autonome Produkte, die manuelle, intellektuelle oder kreative Tätigkeiten übernehmen.' }
          ],
          correct: ['E'],
          explanation: 'Laut dem Artikel konzentrieren sich de Bellis et al. auf autonome Produkte, die speziell manuelle Tätigkeiten übernehmen — nicht intellektuelle oder kreative. Das ist die am wenigsten zutreffende Aussage.',
          topics: ['Theorie', 'Empirie', 'Forschungsdesign'],
        }
      ]
    },
    {
      id: 'teil4',
      title: 'Teil IV: Allgemeine Multiple-Choice-Fragen (20 Punkte)',
      description: 'Fragen 21–30. Multiple Choice: Nur wenn ALLE Kreuze korrekt = 2 Punkte, sonst 0 Punkte.',
      points: 20,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-hs23-21',
          number: 21,
          points: 2,
          text: 'Welche der folgenden Aussagen bzgl. des Videos "Artificial Intelligence: Last Week Tonight with John Oliver" sind zutreffend?',
          choices: [
            { key: 'A', text: 'ChatGPT gehört in die Kategorie der "allgemeinen" KI (AGI), da es generelles intelligentes Verhalten zeigt.' },
            { key: 'B', text: 'Um zu verstehen, warum ein Chatbot falsche Informationen erzeugt, genügt eine Analyse der Chatgespräche ohne Analyse des Trainingsdatensatzes.' },
            { key: 'C', text: 'Eine KI lernt unberechtigte Zusammenhänge (z.B. Lineal als Anzeichen für Hautkrebs), die bei Training mit sehr grossen, objektiven Datensätzen nicht entstehen.' },
            { key: 'D', text: 'KI ist nicht erst seit Einführung von ChatGPT Teil unseres Alltags (Gesichtserkennung, Filter, Empfehlungen).' },
            { key: 'E', text: 'Teilt man einer KI mit, Geschlecht oder Rasse unbeachtet zu lassen, wird die KI trotzdem nicht zwingend objektiv entscheiden.' }
          ],
          correct: ['D', 'E'],
          explanation: 'D ist korrekt: KI existiert schon länger (vor ChatGPT). E ist korrekt: Verzerrungen in KI entstehen durch Trainingsdaten und Algorithmen, nicht durch explizite Anweisungen lösbar. A ist falsch: ChatGPT ist "narrow AI". B ist falsch: Trainingsdaten-Analyse ist notwendig. C ist falsch: Auch grosse Datensätze enthalten Verzerrungen.',
          topics: ['Empirie', 'Methode'],
        },
        {
          id: 'esf-hs23-22',
          number: 22,
          points: 2,
          text: 'Welche Aussagen zu Herausforderungen bei der Verwendung von Large Language Models (LLMs) wie ChatGPT sind zutreffend?',
          choices: [
            { key: 'A', text: 'LLMs, die mit sehr grossen Datensätzen trainiert wurden, "fabrizieren" nicht — sie erzeugen keine falschen Informationen.' },
            { key: 'B', text: 'Basierend auf den Trainingsdaten können Verzerrungen entstehen (Geschlecht, Rasse, Meinungen), die von LLM zu LLM variieren.' },
            { key: 'C', text: 'Daten, die in LLMs eingegeben werden, können für das Trainieren weiterer LLMs verwendet werden.' },
            { key: 'D', text: 'Der gleiche Prompt mit dem gleichen LLM führt immer zum gleichen Ergebnis.' },
            { key: 'E', text: 'LLMs werden mit grossen Datensätzen trainiert, die vorhersagen, welches Wort als Nächstes folgt (ähnlich Autovervollständigung).' }
          ],
          correct: ['B', 'C', 'E'],
          explanation: 'B, C, E sind korrekt. A ist falsch: LLMs halluzinieren (erzeugen falsche Infos). D ist falsch: LLMs sind probabilistisch und erzeugen variable Ergebnisse.',
          topics: ['Empirie', 'Methode', 'Datenerhebung'],
        },
        {
          id: 'esf-hs23-23',
          number: 23,
          points: 2,
          text: 'Eine Studie über Mikrokredite erhebt Daten durch Umfragen und Interviews und identifiziert Schlüsselfaktoren des Erfolgs in verschiedenen Kontexten. Die Ergebnisse können von Entscheidungstragenden genutzt werden. Welche Aussagen sind zutreffend?',
          choices: [
            { key: 'A', text: 'Diese Studie hat weder einen praktischen noch einen theoretischen Beitrag geleistet.' },
            { key: 'B', text: 'Diese Studie hat einen theoretischen Beitrag geleistet, da ein Mixed Method-Ansatz verwendet wird.' },
            { key: 'C', text: 'Die Studie hat einen praktischen Beitrag geleistet, da die Ergebnisse von Entscheidungstragenden und Mikrofinanzinstitutionen genutzt werden können.' },
            { key: 'D', text: 'Inwiefern die Studie einen theoretischen Beitrag geleistet hat, lässt sich ohne Kenntnis der entsprechenden Literatur nur schwer feststellen.' },
            { key: 'E', text: 'Die Formulierung der "wichtigsten Erfolgsfaktoren von Mikrokrediten in verschiedenen Kontexten" ist genügend spezifisch als Formulierung für einen theoretischen Beitrag.' }
          ],
          correct: ['C', 'D'],
          explanation: 'C ist korrekt: Praktische Implikationen für Entscheidungstragende sind gegeben. D ist korrekt: Ein theoretischer Beitrag setzt Kenntnis der bestehenden Literatur voraus, um eine Forschungslücke zu identifizieren. E ist falsch: Die Formulierung ist zu vage für einen klaren theoretischen Beitrag.',
          topics: ['Mixed Methods', 'Forschungsprozess', 'Befragung'],
        },
        {
          id: 'esf-hs23-24',
          number: 24,
          points: 2,
          text: 'Ein Student plant folgendes Forschungsdesign zur Frage "Welche psychosozialen Auswirkungen hat eine zweisprachige Erziehung?": (1) Statistiken zur Häufigkeit durch Literaturrecherche, (2) Beobachtung seiner zwei besten Freunde, die zweisprachig aufwuchsen. Welche Aussagen bzgl. diesem Forschungsdesign sind NICHT zutreffend?',
          choices: [
            { key: 'A', text: 'Bei dem Forschungsdesign werden ausschliesslich Primärdaten erhoben.' },
            { key: 'B', text: 'Das Forschungsdesign folgt einem Mixed Methods Ansatz: Auswertung qualitativer Sekundärdaten kombiniert mit quantitativen Primärdaten.' },
            { key: 'C', text: 'Bei dem Forschungsdesign wird unter anderem eine Ethnographie durchgeführt.' },
            { key: 'D', text: 'Die Generalisierbarkeit der Ergebnisse ist aufgrund der Wahl der Teilnehmenden sehr hoch.' },
            { key: 'E', text: 'Das Forschungsdesign ist nicht gut angepasst. Die Forschungsfrage bedingt ein ausschliesslich quantitatives Design.' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'A ist falsch: Literaturrecherche = Sekundärdaten. B ist falsch: Die Sekundärdaten sind quantitativ (Statistiken), die Beobachtung sind qualitative Primärdaten. D ist falsch: 2 Freunde = sehr geringe Generalisierbarkeit. E ist falsch: Die Forschungsfrage ist explorativ und erfordert kein rein quantitatives Design.',
          topics: ['Mixed Methods', 'Primärdaten', 'Sekundärdaten', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-25',
          number: 25,
          points: 2,
          text: 'Ausgehend vom Titel "Können grüne Investitionen den Gewinn steigern? Evidenz von sozialen Hedgefonds": Welche Aussagen bzgl. guter Hypothesen und Forschungsfragen sind zutreffend?',
          choices: [
            { key: 'A', text: 'Eine gute Hypothese sollte von Natur aus diagnostisch sein, muss aber nicht die Beziehung der vorhergesagten Variablen beinhalten.' },
            { key: 'B', text: 'Eine gute Hypothese könnte lauten: "Sozial verantwortliche Hedgefonds sind mit einem starken Anstieg des CSR-Wertes des Zielunternehmens verbunden im Vergleich mit nicht sozial verantwortlichen Hedgefonds."' },
            { key: 'C', text: 'Eine gute Hypothese könnte lauten: "Sozial verantwortliche Hedgefonds könnten möglicherweise die grünen Aktivitäten ihrer Zielunternehmen beeinflussen."' },
            { key: 'D', text: 'Eine gute Hypothese könnte lauten: "Der CSR-Wert eines Unternehmens korreliert positiv mit der Wahrscheinlichkeit, von einem sozial verantwortlichen Hedgefonds finanziert zu werden."' },
            { key: 'E', text: 'Eine gute Hypothese ist eine gültige Aussage zu realen, empirisch testbaren Fakten, die über Einzelfälle hinausgeht.' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'B und D sind klar formulierte, testbare Hypothesen mit Richtungsangabe. E beschreibt korrekt das Gütekriterium einer Hypothese. A ist falsch: Eine gute Hypothese muss die Beziehung zwischen Variablen spezifizieren. C ist falsch: "könnten möglicherweise" ist zu vage und nicht testbar.',
          topics: ['Hypothesen', 'Forschungsprozess', 'Empirie'],
        },
        {
          id: 'esf-hs23-26',
          number: 26,
          points: 2,
          text: 'Was ist hinsichtlich der Operationalisierung von Variablen zutreffend?',
          choices: [
            { key: 'A', text: 'Die uneindeutige Operationalisierung einer Variable führt zu Problemen bei der Replikation.' },
            { key: 'B', text: 'Eine Operationalisierung von Variablen ist in qualitativen und quantitativen Studien notwendig.' },
            { key: 'C', text: 'Die Operationalisierung von Variablen hat Einfluss auf die Gültigkeit und Zuverlässigkeit einer Studie.' },
            { key: 'D', text: 'Die Operationalisierung beinhaltet zwingend die Auswahl der Stichprobe für die Studie.' },
            { key: 'E', text: 'Eine optimale Operationalisierung für "Mentale Gesundheit von Jugendlichen" könnte lauten: "wird durch Befragung der Eltern zu sportlichen Aktivitäten gemessen."' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'A, B, C sind korrekt. D ist falsch: Stichprobenauswahl ist ein separater Schritt im Forschungsdesign. E ist falsch: Sportliche Aktivitäten sind keine valide Messung für mentale Gesundheit (fehlende Konstruktvalidität).',
          topics: ['Operationalisierung', 'Forschungsprozess', 'Interne Validität'],
        },
        {
          id: 'esf-hs23-27',
          number: 27,
          points: 2,
          text: 'Grafik des Bundesamts für Statistik: Zusammengefasste Erstheiratsziffer nach Geschlecht von 1950 bis ~2020 [BILD: Zeitreihe, beide Linien fallen langfristig, Frauen zeigen früher höhere Werte als Männer, dann umgekehrt]. Welche Aussagen über die Datenvisualisierung sind zutreffend?',
          choices: [
            { key: 'A', text: 'Zwischen 1950 und 1960 hatten zeitweise alle ledigen Männer vor dem 50. Lebensjahr bereits einmal geheiratet.' },
            { key: 'B', text: 'Bis ca. 1956 machen Männer den grösseren Prozentanteil aus; zwischen 1960 und 1970 kehrt sich das Geschlechterverhältnis um.' },
            { key: 'C', text: 'Basierend auf dieser Grafik kann man davon ausgehen, dass der Prozentanteil von Männern in naher Zukunft höher ist als der von Frauen.' },
            { key: 'D', text: 'Die Grafik stellt eine zeitliche Entwicklung dar.' },
            { key: 'E', text: 'Basierend auf dieser Darstellung kann man nicht schlussfolgern, ob es einen wesentlichen Geschlechterunterschied gibt, da nicht angegeben ist, ob der Unterschied signifikant ist.' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'A, B, D, E sind korrekt. C ist falsch: Eine Extrapolation in die nahe Zukunft lässt sich aus dem fallenden Trend nicht sicher ableiten.',
          topics: ['Längsschnitt', 'Empirie', 'Quantitativ'],
        },
        {
          id: 'esf-hs23-28',
          number: 28,
          points: 2,
          text: 'Welche Aussagen zu Forschungspraktiken in der Marktforschung sind NICHT zutreffend?',
          choices: [
            { key: 'A', text: 'In der Marktforschung sollten stets geschlossene Fragen und Umfragen verwendet werden, da diese zu präziseren Daten führen.' },
            { key: 'B', text: 'Kundenbedürfnisse zu verstehen, stellt für die Marktforschung ein übergeordnetes Primärziel dar.' },
            { key: 'C', text: 'Die Resultate einer Studie können stets generalisiert werden, auch für Segmente, die nicht in der Stichprobe vertreten waren.' },
            { key: 'D', text: 'Das reale Verhalten der Konsumierenden ist nicht entscheidend; das Messen von Einstellungen und Emotionen ist ausreichend.' },
            { key: 'E', text: 'In der angewandten Marktforschung sollte die Fragestellung für den wissenschaftlichen Diskurs relevant sein und eine Forschungslücke schliessen.' }
          ],
          correct: ['A', 'C', 'D', 'E'],
          explanation: 'A ist falsch: Offene Fragen sind in der qualitativen Marktforschung wertvoll. C ist falsch: Generalisierung setzt eine repräsentative Stichprobe voraus. D ist falsch: Verhalten ist oft relevanter als Einstellungen. E ist falsch: Angewandte Marktforschung hat praktische Ziele, nicht zwingend wissenschaftliche Lücken zu schliessen.',
          topics: ['Befragung', 'Datenerhebung', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-29',
          number: 29,
          points: 2,
          text: 'Tabelle zeigt vier Studien aus de Bellis et al. (2023) über "Meaning of Manual Labor" (MML) und Adoption autonomer Produkte. Welche Aussagen bzgl. der Methodik des Artikels sind zutreffend?',
          choices: [
            { key: 'A', text: 'Das Testen mehrerer alternativer Erklärungen (z.B. "Conservatism") dient der Verbesserung der internen Validität.' },
            { key: 'B', text: 'Die Autorinnen testen den Effekt von MML im Kontext unterschiedlicher autonomer Produkte, um die interne Validität zu erhöhen.' },
            { key: 'C', text: 'Mit Studie 4 zeigen die Autorinnen, wie über "sinnhaften Zeitgewinn" ein negativer Effekt von MML kompensiert werden kann.' },
            { key: 'D', text: 'Die Autorinnen schliessen unterschiedliche abhängige Variablen ein, um die externe Validität zu erhöhen.' },
            { key: 'E', text: 'Das verwendete Studiendesign war in allen vier Studien ausschliesslich ein experimentelles between-subjects Design.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'A korrekt: Alternative Erklärungen ausschliessen stärkt interne Validität. C korrekt: Studie 4 zeigt den Moderator "meaningful time gain". D korrekt: Verschiedene AVs (Präferenz, Einstellung, Adoption) erhöhen externe Validität. B ist falsch: Verschiedene Produkte erhöhen externe, nicht interne Validität. E ist falsch: Studie 1 und 4 sind auch korrelative/Längsschnittdesigns.',
          topics: ['Interne Validität', 'AV', 'Experiment', 'Forschungsdesign'],
        },
        {
          id: 'esf-hs23-30',
          number: 30,
          points: 2,
          text: 'Grafik aus Rifkin et al. (2023) über Selbstgeschenke bei zeitlicher Einschränkung [BILD: 2×2-Design, starke vs. schwache Einschränkung x Selbstgeschenk vs. neutrales Framing; bei schwacher Einschränkung kaufen Teilnehmende mit Selbstgeschenk-Framing signifikant mehr]. Welche Aussagen sind in Anbetracht der Kenntnisse und Ergebnisse zutreffend?',
          choices: [
            { key: 'A', text: 'Teilnehmende mit starker zeitlicher Einschränkung entschieden sich immer eher für den Kauf als diejenigen mit schwacher Einschränkung.' },
            { key: 'B', text: 'Das neutrale Framing führte bei schwacher Einschränkung zu signifikant geringerem Kaufverhalten verglichen mit starker Einschränkung.' },
            { key: 'C', text: 'Die zeitliche Einschränkung beeinflusst den Effekt von Framing auf das Kaufverhalten.' },
            { key: 'D', text: 'Eine mögliche Interpretation: Personen unter Zeitdruck neigen dazu, sich selbst keine Geschenke zu machen; verringert sich der Zeitdruck, erhöht sich diese Tendenz.' },
            { key: 'E', text: 'Das Selbstgeschenk-Framing führte bei schwacher Einschränkung zu signifikant geringerem Kaufverhalten verglichen mit starker Einschränkung.' }
          ],
          correct: ['C', 'D'],
          explanation: 'C korrekt: Die Grafik zeigt einen Interaktionseffekt zwischen Einschränkung und Framing. D korrekt: Bei schwachem Zeitdruck + Selbstgeschenk-Framing ist das Kaufverhalten höher. A falsch: Bei Selbstgeschenk-Framing kaufen Personen mit schwacher Einschränkung mehr. B und E sind empirisch nicht korrekt basierend auf der beschriebenen Grafik.',
          topics: ['Experiment', 'UV', 'AV', 'Kausalität'],
        }
      ]
    }
  ]
};
