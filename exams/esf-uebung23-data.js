window.EXAM_DATA_ESF_UEBUNG23 = {
  id: 'esf-uebung23',
  title: 'ESF — Übungsklausur HS 2023',
  course: 'Empirische Sozialforschung',
  courseColor: '#7c3aed',
  duration_minutes: 60,
  total_points: 58,
  exam_info: {
    date: '23.06.2026',
    duration: '60 Minuten',
    format: 'Single Choice (Teil I–IV) + Multiple Choice (Teil V)',
    allowed_aids: 'Keine',
    grading: 'Note 6.0: ≥85%, Note 5.5: ≥75%, Note 5.0: ≥65%, Note 4.5: ≥55%, Note 4.0: ≥45%',
    note: 'Frage 18 fehlte in der digitalen Version (Bildbasierte Aufgabe). Max. Punkte = 58.'
  },
  scoring_rules: {
    single_choice: { correct: 2, wrong: 0, blank: 0 },
    multiple_choice: { all_correct: 2, any_wrong: 0, blank: 0 }
  },
  sections: [
    {
      id: 'teil1',
      title: 'Teil I: Fragetypen und Experimente (6 Punkte)',
      description: 'Fragen 1–3 beziehen sich auf einen Auszug aus dem Harvard Business Review (HBR, 5. Februar 2020) über Geschlechterdiskriminierung. 115 Wirtschaftsstudierende einer kanadischen Universität (59% Frauen) lasen entweder eine Beschreibung historischer Ungerechtigkeiten gegenüber Frauen oder eine neutrale Beschreibung. Danach wurden sie zu Einstellungen gegenüber Geschlechterdiskriminierung und zur Unterstützung eines Chancengleichheitsprogramms befragt. Single Choice: richtig = 2 Punkte.',
      points: 6,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-uebung23-01',
          number: 1,
          points: 2,
          text: 'Welche Aussage über das Design der HBR-Studie ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Studierenden nahmen an einem Quasi-Experiment im Labor teil.' },
            { key: 'B', text: 'Die Studierenden nahmen an einer Mixed-Methods Studie teil.' },
            { key: 'C', text: 'Die Studierenden nahmen an einem Online-Experiment teil.' },
            { key: 'D', text: 'Die Studierenden nahmen an einer Fallstudie teil.' },
            { key: 'E', text: 'Die Studierenden nahmen an einer Online-Fokusgruppe teil.' }
          ],
          correct: ['C'],
          explanation: 'Die Studie wurde online durchgeführt. Die Studierenden wurden zufällig einer von zwei Konditionen zugeteilt (historische Ungerechtigkeiten vs. neutrale Beschreibung) und bearbeiteten anschliessend einen Fragebogen. Das ist ein klassisches Online-Experiment mit between-subjects Design. Kein Labor, keine Mixed-Methods, keine Fokusgruppe.',
          topics: ['Experiment', 'Forschungsdesign', 'Online-Methoden'],
        },
        {
          id: 'esf-uebung23-02',
          number: 2,
          points: 2,
          text: 'Was war die unabhängige Variable (UV) in der HBR-Studie?',
          choices: [
            { key: 'A', text: 'Fokus auf historische Ungerechtigkeiten' },
            { key: 'B', text: 'Unterstützung für Sanierungsprogramme' },
            { key: 'C', text: 'Einschreibung in ein kooperatives Bildungsprogramm' },
            { key: 'D', text: 'Geschlecht (männlich vs. weiblich)' },
            { key: 'E', text: 'Einstellungen zum aktuellen Stand der Geschlechterdiskriminierung' }
          ],
          correct: ['A'],
          explanation: 'Die UV ist das, was die Forschenden manipuliert haben: Die eine Gruppe las über historische Ungerechtigkeiten gegenüber Frauen, die andere eine neutrale Beschreibung. Dieser Unterschied ist die Manipulation — also die UV. B und E sind abhängige Variablen (gemessene Outcomes), D ist eine Kontrollvariable.',
          topics: ['UV', 'Experiment', 'Hypothesen'],
        },
        {
          id: 'esf-uebung23-03',
          number: 3,
          points: 2,
          text: 'Was ist richtig in Bezug auf die Art der Fragen, die die Studierenden in der HBR-Studie zu (1) ihrer Einstellung gegenüber geschlechtsspezifischer Diskriminierung und (2) ihrem Grad der Unterstützung für ein Programm für Chancengleichheit bei der Arbeit beantworten sollten?',
          choices: [
            { key: 'A', text: 'Die Fragen zu (1) wurden als Multiple-Choice-Fragen und die Fragen zu (2) als Likert-Skala Fragen konzipiert.' },
            { key: 'B', text: 'Die Fragen zu (1) wurden als Likert-Skala Fragen konzipiert. Es ist nicht ganz klar, wie die Fragen zu (2) konzipiert wurden.' },
            { key: 'C', text: 'Die Fragen zu (1) wurden als Likert-Skala Fragen und die Fragen zu (2) als offene Fragen konzipiert.' },
            { key: 'D', text: 'Die Fragen zu (1) wurden als semantische Differentialfragen konzipiert. Es ist nicht ganz klar, wie die Fragen zu (2) konzipiert wurden.' },
            { key: 'E', text: 'Es ist nicht möglich zu sagen, wie die Fragen konzipiert wurden.' }
          ],
          correct: ['B'],
          explanation: 'Für (1) beschreibt der Text explizit Aussagen auf einer Skala von 1–7 («trifft überhaupt nicht zu» bis «trifft voll und ganz zu») — das ist eine Likert-Skala. Für (2) heisst es nur, die Studierenden sollten «ihren Grad der Unterstützung bewerten» — das Format (Skala, offen, MC?) ist nicht präzisiert. Also ist B korrekt.',
          topics: ['Befragung', 'Skalen', 'Likert'],
        }
      ]
    },
    {
      id: 'teil2',
      title: 'Teil II: Forschungsfragen, Hypothesen und Experimente (4 Punkte)',
      description: 'Fragen 4–5 beziehen sich auf einen Auszug aus dem MIT Sloan (23. April 2020) über COVID-19-Prävention. N = 2176 US-amerikanische Teilnehmende (Amazon Mechanical Turk), between-subjects Design mit drei Konditionen (persönlicher / öffentlicher / persönlicher + öffentlicher Nutzen). Single Choice: richtig = 2 Punkte.',
      points: 4,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-uebung23-04',
          number: 4,
          points: 2,
          text: 'Was ist bzgl. der beschriebenen MIT-Studie am zutreffendsten?\n\nHintergrund: Die Studie untersuchte, ob die Botschaft «öffentlicher Nutzen» oder «persönlicher Nutzen» wirksamer ist, um Präventionsverhalten in der Pandemie zu fördern. Ergebnis: Die öffentliche Kondition war wirksamer.',
          choices: [
            { key: 'A', text: '«Sollten sich Mitteilungen über öffentliche Gesundheit auf den Nutzen der Prävention für den Einzelnen, die Gesellschaft oder auf beide konzentrieren?» ist eine deduktive Forschungsfrage.' },
            { key: 'B', text: '«Sollten sich Mitteilungen über öffentliche Gesundheit auf den Nutzen der Prävention für den Einzelnen, die Gesellschaft oder auf beide konzentrieren?» ist eine deskriptive Forschungsfrage.' },
            { key: 'C', text: '«Die Betonung des öffentlichen (vs. persönlichen) Nutzens von Präventionsmassnahmen ist eine wirksamere Reaktionsstrategie» ist eine Schlussfolgerung der Studienergebnisse.' },
            { key: 'D', text: '«Die Betonung des öffentlichen (vs. persönlichen) Nutzens von Präventionsmassnahmen ist eine wirksamere Reaktionsstrategie» ist ein interpretativer Anspruch.' },
            { key: 'E', text: '«Die Betonung des öffentlichen (vs. persönlichen) Nutzens von Präventionsmassnahmen ist eine wirksamere Reaktionsstrategie» ist die Nullhypothese.' }
          ],
          correct: ['C'],
          explanation: 'Die Forschenden haben ein Experiment durchgeführt und dann aus den Daten gefolgert, dass öffentliches Framing wirksamer ist. Das ist eine Schlussfolgerung (conclusion) — sie ergibt sich aus den Ergebnissen. A ist falsch: die Forschungsfrage ist kausal-explorativ, nicht deduktiv im Sinne einer Theorie, die geprüft wird. E ist falsch: die Nullhypothese wäre «kein Unterschied zwischen den Konditionen».',
          topics: ['Hypothesen', 'Forschungsprozess', 'Experiment'],
        },
        {
          id: 'esf-uebung23-05',
          number: 5,
          points: 2,
          text: 'Was ist in Bezug auf die drei Flyer in der Abbildung der MIT-Studie am zutreffendsten? (Die drei Flyer zeigen je eine der drei Versuchskonditionen: persönlicher Nutzen / öffentlicher Nutzen / persönlicher + öffentlicher Nutzen.)',
          choices: [
            { key: 'A', text: 'Jedem/jeder Teilnehmer*in wurde einer der drei Flyer gezeigt.' },
            { key: 'B', text: 'Allen Teilnehmenden wurden die drei Flyer gezeigt.' },
            { key: 'C', text: 'Der Flyer auf der rechten Seite stellt die Kontrollkondition dar.' },
            { key: 'D', text: 'Nur der Flyer auf der rechten Seite stellt die Versuchskondition dar.' },
            { key: 'E', text: '«Persönlicher Gesundheitsnotfall» und «Persönlicher und öffentlicher Gesundheitsnotfall» beziehen sich auf die abhängige Variable (AV), die gemessen wird.' }
          ],
          correct: ['A'],
          explanation: 'Das between-subjects Design bedeutet: Jede Person sieht genau eine Kondition — also einen von drei Flyern. B wäre within-subjects (alle sehen alles). C/D sind falsch, weil alle drei Konditionen Versuchskonditionen sind (keine echte Kontrollkondition ohne COVID-Bezug). E ist falsch: die Flyer-Botschaften sind die UV (Manipulation), nicht die AV.',
          topics: ['Experiment', 'UV', 'Forschungsdesign'],
        }
      ]
    },
    {
      id: 'teil3',
      title: 'Teil III: Forschungsmethodologie und Studiendesign (10 Punkte)',
      description: 'Fragen 6–10 beziehen sich auf den Artikel «Emotional Branding and the Strategic Value of the Doppelgänger Brand Image» (Thompson et al., 2006): Qualitative Studie, 2 Jahre Datenerhebung, 36 phänomenologische Tiefeninterviews mit Kaffeehaus-Besucher*innen, Feldnotizen und Fotos. Hermeneutische Analyse. Single Choice: richtig = 2 Punkte.',
      points: 10,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-uebung23-06',
          number: 6,
          points: 2,
          text: 'Auszug aus der Methodik: «During the course of this study, we collected data over a two-year period, using a multisite approach. Our primary data consist of tape-recorded phenomenological interviews with 36 coffee shop patrons across two locations… These interviews were supplemented by extensive field notes and numerous photographs from on-site observations of patrons across six different local coffee shops.»\n\nWelche Antwort ist am wenigsten zutreffend?',
          choices: [
            { key: 'A', text: 'Die Forschenden nehmen eine interpretivistische Perspektive ein.' },
            { key: 'B', text: 'Subjektivität stellt ein Problem bei der Datenanalyse dar.' },
            { key: 'C', text: 'Diese Methode folgt einem induktiven Ansatz von der Empirie zur Theorie.' },
            { key: 'D', text: 'Die Forschenden verwenden die Mixed-Methods Methode.' },
            { key: 'E', text: 'Die Forschenden betreiben mit dieser Herangehensweise kein Hypothesentesten.' }
          ],
          correct: ['D'],
          explanation: 'D ist am wenigsten zutreffend: Mixed-Methods kombiniert systematisch quantitative UND qualitative Ansätze. Thompson et al. verwenden ausschliesslich qualitative Methoden (Tiefeninterviews, Feldnotizen, Fotos). A ist korrekt (interpretivistisch). B ist korrekt (Subjektivität ist eine Limitation qualitativer Forschung). C ist korrekt (induktiver, explorativer Ansatz). E ist korrekt (keine Hypothesen werden getestet).',
          topics: ['Qualitativ', 'Forschungsdesign', 'Induktion'],
        },
        {
          id: 'esf-uebung23-07',
          number: 7,
          points: 2,
          text: 'Weiterer Auszug aus der Methodik: «We interpreted this body of qualitative data using a hermeneutic approach (Thompson 1997). In this approach, provisional understandings are formed, challenged, revised, and further developed through an iterative movement between individual transcripts and the emerging understanding of the entire set of textual data. Thus, each interview was initially treated as a separate idiographic case in which we attempted to uncover the salient meanings and identity projects…»\n\nDie Forschenden gehen hier auf einen Ihnen bekannten Prozess ein. Welche Antwort ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Zielgruppenauswahl' },
            { key: 'B', text: 'Kodierung' },
            { key: 'C', text: 'Ethnographie' },
            { key: 'D', text: 'Präregistrierung' },
            { key: 'E', text: 'Anthropologie' }
          ],
          correct: ['B'],
          explanation: 'Der hermeneutische Ansatz beschreibt das iterative Hin- und Herwechseln zwischen Transkripten und aufkommendem Verständnis — das ist Kodierung (qualitative Analyse). Provisional understandings, die revidiert werden, entsprechen dem Kodierungsprozess (offen → axial → selektiv). Ethnographie wäre ein Forschungsdesign, Präregistrierung ein quantitatives Konzept, Anthropologie eine Disziplin.',
          topics: ['Qualitativ', 'Kodierung', 'Methode'],
        },
        {
          id: 'esf-uebung23-08',
          number: 8,
          points: 2,
          text: 'Empirische Sozialforschung kann von hoher Relevanz für Unternehmen sein. In der genannten Arbeit werden ebenfalls praktische Implikationen diskutiert.\n\nWelche der folgenden Implikationen ist am wenigsten zutreffend?',
          choices: [
            { key: 'A', text: 'Manager*innen sollten genau beobachten, wie sich popkulturelle Narrative rund um die eigene Marke entwickeln.' },
            { key: 'B', text: 'Manager*innen sollten soziale Medien beobachten, um frühzeitig «vermeidende» Verhaltensweisen und Kundensegmente zu identifizieren.' },
            { key: 'C', text: 'Wenn die eigene Markenstrategie noch ihre Zwecke erfüllt, sollte nicht proaktiv gehandelt werden.' },
            { key: 'D', text: 'Fokusgruppen und Tiefeninterviews sollten die Identifikation von negativen Markenbildern und ihren Identitätsmotiven unterstützen.' },
            { key: 'E', text: 'Alternative Narrative sollten mithilfe projektiver Techniken getestet werden, um essentielle Einblicke in popkulturelle Entwicklungen rund um die eigene Marke zu generieren.' }
          ],
          correct: ['C'],
          explanation: 'C ist am wenigsten zutreffend. Thompson et al. argumentieren explizit für PROAKTIVES Brand-Image-Management. Doppelgänger Brand Images entstehen schleichend; erst wenn sie sichtbar werden, ist es oft zu spät. A, B, D und E sind alle Implikationen, die sich direkt aus dem Paper ableiten lassen.',
          topics: ['Qualitativ', 'Forschungsprozess', 'Kausalität'],
        },
        {
          id: 'esf-uebung23-09',
          number: 9,
          points: 2,
          text: 'Diese Forschung folgt einem klaren Ansatz der Wissensgenerierung.\n\nWelcher Ansatz ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Deduktion' },
            { key: 'B', text: 'Vaduktion' },
            { key: 'C', text: 'Abduktion' },
            { key: 'D', text: 'Induktion' },
            { key: 'E', text: 'Konduktion' }
          ],
          correct: ['D'],
          explanation: 'Thompson et al. gehen von Daten (36 Tiefeninterviews) aus und entwickeln daraus ein Verständnis des Doppelgänger Brand Image — ein induktiver Ansatz: vom Spezifischen (Einzelinterviews) zum Allgemeinen (Theorie). Deduktion würde bedeuten, eine Theorie vorab aufzustellen und dann zu testen. Vaduktion und Konduktion existieren nicht.',
          topics: ['Induktion', 'Forschungsprozess', 'Qualitativ'],
        },
        {
          id: 'esf-uebung23-10',
          number: 10,
          points: 2,
          text: 'Welche der folgenden Aussagen hinsichtlich der durchgeführten Forschung ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Anders als bei quantitativer Forschung ergeben sich keine Privatsphärebedenken hinsichtlich gesammelter Daten.' },
            { key: 'B', text: 'Das sogenannte p-hacking stellt in dieser Forschung ein Problem dar.' },
            { key: 'C', text: 'Generalisierbarkeit ist in dieser Forschung nur in geringem Masse gegeben.' },
            { key: 'D', text: 'Eine Präregistrierung der Hypothesen hätte die Glaubwürdigkeit der Forschung weiter erhöht.' },
            { key: 'E', text: 'Bei Interviews dieser Art ergeben sich keine Probleme mit der Forschungsethik.' }
          ],
          correct: ['C'],
          explanation: 'C ist korrekt: Qualitative Forschung mit purposivem Sampling (36 Kaffeehausbesucher*innen) erhebt keinen Anspruch auf statistische Generalisierbarkeit. A ist falsch: Privatsphäre ist auch bei Interviews ein Thema (sensible persönliche Daten). B ist falsch: p-hacking ist ein quantitatives Problem (p-Wert-Manipulation). D ist falsch: Präregistrierung macht für induktiv-explorative Forschung keinen Sinn. E ist falsch: Einwilligung, Vertraulichkeit und Datenschutz sind auch bei Interviews relevant.',
          topics: ['Qualitativ', 'Gütekriterien', 'Open Science'],
        }
      ]
    },
    {
      id: 'teil4',
      title: 'Teil IV: Allgemeine Single-Choice-Fragen (18 Punkte)',
      description: 'Fragen 11–20 (ohne Frage 18, die in der digitalen Version nicht erfasst werden konnte). Single Choice: richtig = 2 Punkte.',
      points: 18,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-uebung23-11',
          number: 11,
          points: 2,
          text: 'Nachfolgend finden Sie fünf Aussagen über die Grounded Theory. Welche Aussage trifft am wenigsten zu?',
          choices: [
            { key: 'A', text: 'Der Fokus der Grounded Theory liegt auf der Generierung theoretischer Ideen (oder Hypothesen) auf Basis von Daten.' },
            { key: 'B', text: 'Die Grounded Theory ist nicht empirisch fundiert. Ihr grundlegendes Interesse ist die Rekonstruktion subjektiver Ansichten.' },
            { key: 'C', text: 'Die Grounded Theory ist hilfreich, um ein Verständnis für Phänomene zu entwickeln, die nicht durch bestehende Theorien erklärt werden können.' },
            { key: 'D', text: 'Die Grounded Theory wird als radikaler Ansatz betrachtet.' },
            { key: 'E', text: 'Die Grounded Theory beginnt mit den Daten selbst.' }
          ],
          correct: ['B'],
          explanation: 'B ist am wenigsten zutreffend. Grounded Theory IST empirisch fundiert — der Name sagt es: sie ist in empirischen Daten «verankert» (grounded). Ihr Ziel ist Theorieentwicklung aus Daten, nicht die Rekonstruktion subjektiver Ansichten (das wäre eher phänomenologische Forschung). A, C, D und E sind korrekte Aussagen über GT.',
          topics: ['Qualitativ', 'Induktion', 'Methode'],
        },
        {
          id: 'esf-uebung23-12',
          number: 12,
          points: 2,
          text: 'In der empirischen Sozialforschung ist die Unterscheidung zwischen Korrelation und Kausalität wichtig. In einer Abbildung sehen Sie acht Beobachtungen auf zwei Dimensionen (als Variablen x und y bezeichnet), die zufällig verstreut sind ohne erkennbares Muster. Welche der folgenden Aussagen ist am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Abbildung zeigt eine stark positive Korrelation zwischen x und y.' },
            { key: 'B', text: 'Die Abbildung zeigt eine stark negative Korrelation zwischen x und y.' },
            { key: 'C', text: 'Die Abbildung zeigt keine klare Korrelation zwischen x und y.' },
            { key: 'D', text: 'Die Abbildung zeigt einen positiven kausalen Effekt von x auf y.' },
            { key: 'E', text: 'Die Abbildung zeigt einen kausalen Effekt von x auf y, wobei die Richtung des Effekts unklar ist.' }
          ],
          correct: ['C'],
          explanation: 'Wenn die Punkte zufällig verstreut sind und kein systematischer Zusammenhang erkennbar ist, gibt es keine klare Korrelation. D und E sind generell falsch: Streudiagramme zeigen Korrelation, niemals Kausalität. Kausalität erfordert Experimente, nicht blosse Beobachtung.',
          topics: ['Kausalität', 'Korrelation', 'Statistik'],
        },
        {
          id: 'esf-uebung23-13',
          number: 13,
          points: 2,
          text: 'Auszug aus dem Harvard Business Review (November-Dezember 2018): «Im Jahr 2009 führte Nivea eine Online-Analyse, oder auch __________, der Diskussionen über Deodorant-Gebrauch auf 200 Social-Media-Websites durch. Entgegen den Erwartungen ging es dabei nicht um Duft, Wirksamkeit oder Irritation, sondern um die Fleckenbildung auf Klamotten.»\n\nWelcher Begriff eignet sich am besten, um die Lücke im obigen Auszug zu füllen?',
          choices: [
            { key: 'A', text: 'Ethnographie' },
            { key: 'B', text: 'Organisationelle Ethnographie' },
            { key: 'C', text: 'Anthropologie' },
            { key: 'D', text: 'Netnographie' },
            { key: 'E', text: 'Fokusgruppe' }
          ],
          correct: ['D'],
          explanation: 'Netnographie (von Kozinets) bezeichnet die ethnographische Analyse von Online-Communities und Social-Media-Diskussionen. Der Begriff kombiniert «Internet» und «Ethnographie». Hier analysiert Nivea 200 Social-Media-Websites — das ist klassische Netnographie. Keine Fokusgruppe (moderiert, mit echten Teilnehmenden), keine klassische Ethnographie (Feldbeobachtung).',
          topics: ['Qualitativ', 'Datenerhebung', 'Methode'],
        },
        {
          id: 'esf-uebung23-14',
          number: 14,
          points: 2,
          text: 'Sehen Sie sich die folgende Hypothese an: «Grüne Verpackung (im Vergleich zu andersfarbiger Verpackung) von Lebensmitteln werden von Verbraucher*innen als gesünder empfunden.» Was ist hinsichtlich der angegebenen Variablen am ehesten richtig?',
          choices: [
            { key: 'A', text: 'Es ist unklar, welche Variable die unabhängige Variable und welche die abhängige Variable ist.' },
            { key: 'B', text: 'Die Verpackungsfarbe ist die unabhängige Variable und Gesundheitsempfindung ist die abhängige Variable.' },
            { key: 'C', text: 'Die Verpackungsfarbe ist die abhängige Variable und Gesundheitsempfindung ist die unabhängige Variable.' },
            { key: 'D', text: 'Grüne Verpackung ist die unabhängige Variable und andersfarbige Verpackung ist die abhängige Variable.' },
            { key: 'E', text: 'Grüne Verpackung ist die abhängige Variable und andersfarbige Verpackung ist die unabhängige Variable.' }
          ],
          correct: ['B'],
          explanation: 'UV ist das, was manipuliert wird (die Ursache): die Verpackungsfarbe. AV ist das, was gemessen wird (der Effekt): die Gesundheitsempfindung. D und E sind falsch, weil UV/AV nicht einzelne Ausprägungen (grün vs. farbig), sondern ganze Variablen sind. C hat UV und AV vertauscht.',
          topics: ['UV', 'Hypothesen', 'Experiment'],
        },
        {
          id: 'esf-uebung23-15',
          number: 15,
          points: 2,
          text: 'Worauf bezieht sich die folgende Definition? «Ein systematischer Fehler bei Selbstbeurteilungsmessungen, der aus dem Wunsch der Befragten resultiert, Blamage zu vermeiden und anderen ein positives Bild von sich zu vermitteln» (Fischer 1993).',
          choices: [
            { key: 'A', text: 'Beobachter-Erwartungseffekt' },
            { key: 'B', text: 'Item-Priming-Effekt' },
            { key: 'C', text: 'Verlustaversion' },
            { key: 'D', text: 'Soziale Erwünschtheit' },
            { key: 'E', text: 'Befragtenerwünschtheitseffekt' }
          ],
          correct: ['D'],
          explanation: 'Soziale Erwünschtheit (social desirability bias) beschreibt die Tendenz, so zu antworten, wie man glaubt, dass es gesellschaftlich erwartet wird — um ein positives Bild zu hinterlassen oder Blamage zu vermeiden. Der Beobachter-Erwartungseffekt (A) betrifft Forschende, nicht Befragte. Verlustaversion (C) ist ein Konzept der Verhaltensökonomie.',
          topics: ['Befragung', 'Gütekriterien', 'Interne Validität'],
        },
        {
          id: 'esf-uebung23-16',
          number: 16,
          points: 2,
          text: 'Eine Skala enthält zwei Items zu sozialen Medien mit Zustimmungsabstufungen von «stimme gar nicht zu» bis «stimme voll zu». Was ist in Bezug auf die beiden in der Skala dargestellten Items am zutreffendsten?',
          choices: [
            { key: 'A', text: 'Die Items sind Interviewfragen.' },
            { key: 'B', text: 'Die Items sind Fragen, die sich definitiv auf die unabhängige Variable beziehen.' },
            { key: 'C', text: 'Die Items werden auf einer Sieben-Punkte-Skala bewertet.' },
            { key: 'D', text: 'Die Items sind pragmatische Differentialfragen.' },
            { key: 'E', text: 'Die Items werden auf sieben Items bewertet.' }
          ],
          correct: ['C'],
          explanation: 'Likert-Skalen mit «stimme gar nicht zu» bis «stimme voll zu» werden typischerweise auf einer Sieben-Punkte-Skala (1–7) gemessen — das ist der Standard. A ist falsch (das sind Fragebogenitems, keine Interviewfragen). B ist falsch (sie könnten AV, UV oder Kontrollvariable sein). D ist falsch (semantische Differentiale haben entgegengesetzte Pole, keine Zustimmungsskala). E ist grammatikalisch und inhaltlich falsch.',
          topics: ['Skalen', 'Likert', 'Befragung'],
        },
        {
          id: 'esf-uebung23-17',
          number: 17,
          points: 2,
          text: 'Wie sieht die typische Reihenfolge der Schritte bei der Durchführung qualitativer Tiefeninterviews aus?\n\n1. Sammeln der Daten\n2. Axiale Kodierung\n3. Offene Kodierung\n4. Entwickeln einer Theorie\n5. Transkribieren der Daten',
          choices: [
            { key: 'A', text: '1, 5, 2, 3, 4' },
            { key: 'B', text: '2, 3, 5, 4, 1' },
            { key: 'C', text: '1, 2, 5, 4, 3' },
            { key: 'D', text: '3, 5, 2, 1, 4' },
            { key: 'E', text: '1, 5, 3, 2, 4' }
          ],
          correct: ['E'],
          explanation: 'Korrekte Reihenfolge: (1) Daten sammeln → (5) Daten transkribieren → (3) Offene Kodierung (erste Codes vergeben) → (2) Axiale Kodierung (Codes zu Kategorien gruppieren) → (4) Theorie entwickeln (selektive Kodierung, Kernkategorie). A ordnet axiale vor offener Kodierung — das ist falsch.',
          topics: ['Qualitativ', 'Kodierung', 'Forschungsprozess'],
        },
        {
          id: 'esf-uebung23-19',
          number: 19,
          points: 2,
          text: 'Was ist in Bezug auf Google Scholar und Web of Science richtig?',
          choices: [
            { key: 'A', text: 'Google Scholar und Web of Science sind nicht-wissenschaftliche Datenbanken.' },
            { key: 'B', text: 'Google Scholar und Web of Science führen beide die Anzahl an Zitierungen auf, wenn auch nicht auf genau gleiche Art und Weise.' },
            { key: 'C', text: 'Google Scholar und Web of Science werden im Forschungsprozess für unterschiedliche Zwecke verwendet.' },
            { key: 'D', text: 'Google Scholar enthält nur Arbeiten, die nach der Gründung von Google im Jahr 1996 veröffentlicht wurden.' },
            { key: 'E', text: 'Google Scholar erlaubt die Auswahl einer Zeitspanne, Web of Science hingegen nicht.' }
          ],
          correct: ['B'],
          explanation: 'Beide Plattformen zeigen Zitierungszahlen an, aber auf unterschiedliche Weise: Google Scholar zeigt in der Regel mehr Zitierungen an (da es auch graue Literatur und nicht-peer-reviewte Quellen einschliesst), Web of Science ist restriktiver. A ist falsch (beide sind wissenschaftlich). C ist falsch (beide dienen der Literaturrecherche). D ist falsch. E ist falsch (beide erlauben Zeitraum-Filter).',
          topics: ['Forschungsprozess', 'Publikation', 'Literaturrecherche'],
        },
        {
          id: 'esf-uebung23-20',
          number: 20,
          points: 2,
          text: 'Was sind Median, Mittelwert und Modus der folgenden Zahlenreihe: 4, 5, 7, 8, 5, 1?',
          choices: [
            { key: 'A', text: 'Median = 4, Mittelwert = 5, Modus = 6' },
            { key: 'B', text: 'Median = 6, Mittelwert = 5, Modus = 4' },
            { key: 'C', text: 'Median = 5, Mittelwert = 5, Modus = 1' },
            { key: 'D', text: 'Median = 5, Mittelwert = 5, Modus = 5' },
            { key: 'E', text: 'Median = 5, Mittelwert = 6, Modus = 1' }
          ],
          correct: ['D'],
          explanation: 'Sortiert: 1, 4, 5, 5, 7, 8. Median = Durchschnitt der 3. und 4. Zahl = (5+5)/2 = 5. Mittelwert = (1+4+5+5+7+8)/6 = 30/6 = 5. Modus = häufigster Wert = 5 (erscheint zweimal). Alle drei Lagemassse sind 5.',
          topics: ['Statistik', 'Deskriptive Statistik', 'Kausalität'],
        }
      ]
    },
    {
      id: 'teil5',
      title: 'Teil V: Allgemeine Multiple-Choice-Fragen (20 Punkte)',
      description: 'Fragen 21–30. Multiple Choice: Alle korrekten Antworten müssen markiert sein für 2 Punkte. Jede falsche oder fehlende Markierung ergibt 0 Punkte.',
      points: 20,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-uebung23-21',
          number: 21,
          points: 2,
          text: 'In der Vorlesung wurde der Begriff «Blindness» («Blindheit») im Rahmen eines empirischen Forschungsdesigns diskutiert. Welche Aussagen sind richtig?',
          choices: [
            { key: 'A', text: 'Eine einfachblinde Studie bedeutet in der Regel, dass sich die Versuchsteilnehmenden des spezifischen Zwecks einer Studie nicht bewusst sind.' },
            { key: 'B', text: 'Eine doppelblinde Studie bedeutet in der Regel, dass sich die Versuchsteilnehmenden und die/der Forschende des spezifischen Zwecks einer Studie nicht bewusst sind.' },
            { key: 'C', text: 'Eine dreifachblinde Studie bedeutet in der Regel, dass sich die Versuchsteilnehmenden, die/der Forschende und die Gutachter*innen des spezifischen Zwecks einer Studie nicht bewusst sind.' },
            { key: 'D', text: 'Blindness soll ausschliesslich die Reliabilität einer Studie erhöhen.' },
            { key: 'E', text: 'Blindness soll ausschliesslich die Validität einer Studie erhöhen.' }
          ],
          correct: ['A', 'B'],
          explanation: 'A und B sind korrekt. Einfachblind = Teilnehmende wissen nicht, in welcher Kondition sie sind. Doppelblind = auch die Forschenden wissen nicht, wer welche Behandlung erhält (z.B. Placebo-Studien). C ist falsch: dreifachblind schliesst typischerweise die Statistiker*innen ein, nicht die Gutachter*innen. D und E sind beide falsch: Blindness schützt sowohl interne Validität (gegen Erwartungseffekte) als auch Reliabilität — «ausschliesslich» macht beide Aussagen falsch.',
          topics: ['Experiment', 'Interne Validität', 'Gütekriterien'],
        },
        {
          id: 'esf-uebung23-22',
          number: 22,
          points: 2,
          text: 'Erinnern Sie sich an das Poster «Zero-Sum Beliefs in Autonomy» aus den Insight Files. Die Studie untersuchte, wie Konsument*innen auf autonome Produkte (z.B. selbstfahrende Autos) reagieren, und ob die Überzeugung «wenn das Produkt autonomer wird, verliere ich Autonomie» ihr Verhalten beeinflusst.\n\nWelche Aussagen treffen am wenigsten zu?',
          choices: [
            { key: 'A', text: 'Die Forschenden führten quantitative Studien durch.' },
            { key: 'B', text: 'Ein Ergebnis der Studien ist, dass wahrgenommene Autonomie durch autonome Produkte verringert wird.' },
            { key: 'C', text: 'Die Forschenden führten Experimente durch.' },
            { key: 'D', text: '«Zero-Sum Beliefs» war eine unabhängige Variable.' },
            { key: 'E', text: 'Konsument*innen denken, dass durch autonome Produkte ihre Autonomie gesteigert wird.' }
          ],
          correct: ['D', 'E'],
          explanation: 'D und E sind am wenigsten zutreffend. E ist klar falsch: Zero-Sum Beliefs bedeuten, dass Konsumenten glauben, ihre Autonomie werde VERRINGERT (nicht gesteigert) — das ist der Kern des zero-sum Gedankens. D ist falsch: In der Studie war ZSB typischerweise eine gemessene Eigenschaft (Moderatorvariable), nicht eine manipulierte UV. A und C sind korrekt (quantitative Experimente). B beschreibt die Consumer-Überzeugung, die Teil des Forschungsgegenstands ist.',
          topics: ['Experiment', 'UV', 'Forschungsdesign'],
        },
        {
          id: 'esf-uebung23-23',
          number: 23,
          points: 2,
          text: 'Eine Skala besteht aus einer Reihe von Wörtern, die verschiedene Gefühle und Emotionen beschreiben (z.B. entschlossen, nervös, feindselig, wachsam, ängstlich, aufmerksam, beschämt, inspiriert, verärgert, aktiv). Die Befragten geben an, inwieweit sie sich gegenwärtig so fühlen, auf einer Skala von «überhaupt nicht» bis «sehr».\n\nDie folgenden Aussagen beziehen sich auf diese Skala. Welche Aussagen sind richtig?',
          choices: [
            { key: 'A', text: 'Die Skala muss immer zu Beginn (vs. am Ende) einer Studie angegeben werden.' },
            { key: 'B', text: 'Die Skala kann als Kontrollvariable verwendet werden, um für Gefühle und Emotionen in einem Experiment zu kontrollieren.' },
            { key: 'C', text: 'Die Endpunkte der Skala sind «überhaupt nicht» und «sehr».' },
            { key: 'D', text: 'Die Skala umfasst sieben Items.' },
            { key: 'E', text: 'Die Skala kann als abhängige Variable verwendet werden, um die Gefühle und Emotionen der Teilnehmenden zu messen.' }
          ],
          correct: ['B', 'C', 'E'],
          explanation: 'B, C und E sind korrekt. Die Skala kann als Kontrollvariable (vor dem Experiment erheben, um Baseline-Stimmung herauszurechnen) oder als AV (emotionale Reaktion messen) dienen. Die Endpunkte «überhaupt nicht» und «sehr» sind im Beschrieb angegeben. A ist falsch: die Platzierung im Fragebogen hängt vom Studiendesign ab. D ist falsch: es sind 10 Emotionswörter aufgelistet, nicht sieben.',
          topics: ['Skalen', 'Befragung', 'Experiment'],
        },
        {
          id: 'esf-uebung23-24',
          number: 24,
          points: 2,
          text: 'Einem Fragebogen sind typische demographische Angaben zu entnehmen (Alter als Drop-Down, Geschlecht als dichotome Frage, Bildungsniveau als Auswahlliste etc.).\n\nWelche der untenstehenden Aussagen zu diesen Fragen sind richtig?',
          choices: [
            { key: 'A', text: 'Diese Fragen werden häufig als Kontrollvariablen verwendet.' },
            { key: 'B', text: 'Diese Fragen beziehen sich auf typische demographische Informationen.' },
            { key: 'C', text: 'Zu diesen Fragen gehören Drop-Down-Fragen und dichotome Fragen.' },
            { key: 'D', text: 'Diese Fragen werden nur selten in sozialwissenschaftlichen Studien verwendet.' },
            { key: 'E', text: 'Diese Fragen werden immer am Ende (vs. am Anfang) einer Studie gestellt.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'A, B und C sind korrekt. Demographische Angaben (Alter, Geschlecht, Bildung) sind typische Kontrollvariablen (A). Sie sind per Definition demographisch (B). Sie umfassen oft Drop-Down-Menüs und dichotome Fragen (C). D ist falsch: Demographics sind sehr häufig in sozialwissenschaftlichen Studien. E ist falsch: Sie können am Anfang oder Ende platziert werden — am Anfang kann jedoch Priming-Effekte erzeugen, weswegen viele sie ans Ende stellen, aber «immer» ist zu absolut.',
          topics: ['Befragung', 'Forschungsdesign', 'Skalen'],
        },
        {
          id: 'esf-uebung23-25',
          number: 25,
          points: 2,
          text: 'Ein Screenshot aus dem Marketing Scales Handbook zeigt die Skala «Creative Task Competence» (Dahl & Moreau, 2007). Die Items lauten z.B. «not at all competent / very competent», «not at all intelligent / very intelligent» (4 Items, bewertet auf bipolaren Ankern). Das Cronbach\'s Alpha der Skala beträgt 0.88.\n\nWelche der folgenden Aussagen über die Skala sind korrekt?',
          choices: [
            { key: 'A', text: 'Die Items sind als semantische Differentiale formuliert.' },
            { key: 'B', text: 'Das Cronbach\'s Alpha der Skala ist gut.' },
            { key: 'C', text: 'Die Items werden auf einer 7-Punkte-Skala gemessen.' },
            { key: 'D', text: 'Die Skala kann als abhängige Variable (AV) verwendet werden.' },
            { key: 'E', text: 'Das Cronbach\'s Alpha der Skala ist lediglich ausreichend.' }
          ],
          correct: ['A', 'B', 'D'],
          explanation: 'A ist korrekt: «not at all X / very X» sind bipolare Endpunkte — das ist die Definition eines semantischen Differentials. B ist korrekt: Cronbach\'s Alpha von 0.88 ist gut (Faustregel: ≥0.80 = gut, ≥0.70 = akzeptabel). D ist korrekt: Die Skala misst wahrgenommene Kompetenz nach einer kreativen Aufgabe — typisch als AV. C ist falsch (das Format wird nicht näher spezifiziert als 7-Punkte). E widerspricht B (0.88 > 0.80 → gut, nicht nur ausreichend).',
          topics: ['Skalen', 'Gütekriterien', 'Reliabilität'],
        },
        {
          id: 'esf-uebung23-26',
          number: 26,
          points: 2,
          text: 'Auszug aus Forbes (4. November 2011): «In der vergangenen Woche berichteten Hunderte Nachrichtensender über eine alarmierende Studie aus der wissenschaftlichen Zeitschrift Injury Prevention. In der Studie wurde behauptet, dass das Trinken von kalorienreichem (non-diet) Soda mit erhöhter Gewalt unter 1.800 Teenager*innen in Bostons öffentlichen High Schools verbunden sei.»\n\nWelche der untenstehenden Aussagen über den obigen Auszug sind richtig?',
          choices: [
            { key: 'A', text: 'Die Forschenden zeigen eindeutig eine direkte Kausalität (Ursache-Wirkungs-Beziehung) zwischen dem Trinken von kalorienreichem (non-diet) Soda und der Gewalt unter Teenager*innen.' },
            { key: 'B', text: 'Die Forschenden zeigen eindeutig eine umgekehrte Kausalität (Ursache-Wirkungs-Beziehung) zwischen dem Trinken von kalorienreichem (non-diet) Soda und der Gewalt unter Teenager*innen.' },
            { key: 'C', text: 'Die Forschenden zeigen eindeutig eine bidirektionale Kausalität (Ursache-Wirkungs-Beziehung) zwischen dem Trinken von kalorienreichem (non-diet) Soda und der Gewalt unter Teenager*innen.' },
            { key: 'D', text: 'Die Forschenden zeigen eine Korrelation zwischen dem Trinken von kalorienreichem (non-diet) Soda und der Gewalt unter Teenager*innen.' },
            { key: 'E', text: 'Der beobachtete Effekt kann an einer privaten (vs. öffentlichen) High School unterschiedlich sein.' }
          ],
          correct: ['D', 'E'],
          explanation: 'D ist korrekt: «verbunden» (associated) = Korrelation, keine Kausalität. Beobachtungsstudien zeigen Zusammenhänge, keine kausalen Effekte. A, B und C sind falsch: ohne kontrolliertes Experiment keine Kausalaussage — Confounder (z.B. sozioökonomischer Status) könnten beide Variablen treiben. E ist korrekt: externe Validität ist begrenzt; der Kontext (öffentliche vs. private Schule, USA vs. andere Länder) beeinflusst den Befund.',
          topics: ['Kausalität', 'Korrelation', 'Externe Validität'],
        },
        {
          id: 'esf-uebung23-27',
          number: 27,
          points: 2,
          text: 'Was sind Kanäle des wissenschaftlichen Ideenaustauschs?',
          choices: [
            { key: 'A', text: 'Konferenzbeiträge' },
            { key: 'B', text: 'Poster' },
            { key: 'C', text: 'Podcasts' },
            { key: 'D', text: 'Fachzeitschriftenbeiträge' },
            { key: 'E', text: 'Open Science Framework-Dokumente (Präregistrierungen)' }
          ],
          correct: ['A', 'B', 'D', 'E'],
          explanation: 'A, B, D und E sind anerkannte wissenschaftliche Kanäle. Konferenzbeiträge (A) und Fachzeitschriften (D) sind klassische Disseminationswege. Poster (B) werden ebenfalls bei Konferenzen präsentiert. Präregistrierungen auf dem OSF (E) sind ein Open-Science-Instrument zur Transparenz. Podcasts (C) sind generell kein peer-reviewter wissenschaftlicher Kanal.',
          topics: ['Publikation', 'Open Science', 'Forschungsprozess'],
        },
        {
          id: 'esf-uebung23-28',
          number: 28,
          points: 2,
          text: 'Welche Aussagen hinsichtlich «Big Data» sind laut Gary King zutreffend?',
          choices: [
            { key: 'A', text: 'Die wirkliche Revolution unter «Big Data» besteht laut King vor allen in den neuen analytischen Methoden, diese Daten in nutzbare Implikationen umzumünzen.' },
            { key: 'B', text: 'King ist der Meinung, dass es wichtig ist, dass nicht nur Informationswissenschaftler, sondern auch Sozialwissenschaftler bei der Entwicklung von Methoden für «Big Data»-Analysen mitarbeiten.' },
            { key: 'C', text: 'Eine einflussreiche Arbeit von King handelt von der politischen Zensur der sozialen Medien in China.' },
            { key: 'D', text: 'Laut King haben die Fortschritte rund um «Big Data» mehr Nachteile (z.B. Manipulation, Zensur) als Vorteile.' },
            { key: 'E', text: 'King schaut aus einer positivistischen Perspektive auf soziale Phänomene.' }
          ],
          correct: ['B', 'C'],
          explanation: 'B ist korrekt: King betont, dass Sozialwissenschaftler*innen mit ihrem Verständnis sozialer Phänomene in Big-Data-Methoden einbezogen werden müssen. C ist korrekt: Kings einflussreiche Studie über die Zensur chinesischer Social-Media-Beiträge ist weit bekannt. A ist falsch oder zu stark vereinfacht (King betont sowohl neue Daten als auch neue Methoden, aber der «grösste Schatz» ist das Datenpotenzial). D ist falsch (King ist insgesamt optimistisch). E ist zu kategorisch — Kings Arbeit ist empirisch-quantitativ, aber nicht einseitig positivistisch.',
          topics: ['Big Data', 'Forschungsprozess', 'Methode'],
        },
        {
          id: 'esf-uebung23-29',
          number: 29,
          points: 2,
          text: 'Welche der folgenden Aussagen treffen auf Skalen zu?',
          choices: [
            { key: 'A', text: 'Skalen haben immer mehr als drei Items.' },
            { key: 'B', text: 'Gut etablierte Skalen finden sich typischerweise in viel zitierten wissenschaftlichen Zeitschriften (Journals) oder Verzeichnissen wie dem Marketing Scales Handbook.' },
            { key: 'C', text: 'Die Qualität einer Skala wird unter anderem durch ihre Validität und Reliabilität beurteilt.' },
            { key: 'D', text: 'Einige wissenschaftliche Artikel (Paper) widmen sich der empirischen Erstellung neuer Skalen.' },
            { key: 'E', text: 'Skalen umfassen in der Regel offene und geschlossene Fragen.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'B, C und D sind korrekt. Etablierte Skalen werden in Journals publiziert oder in Verzeichnissen wie dem Marketing Scales Handbook gesammelt (B). Validität und Reliabilität sind zentrale Qualitätskriterien für Skalen (C). Skalenentwicklungs-Artikel sind ein eigenes Genre (D). A ist falsch: Skalen können auch zwei oder drei Items haben. E ist falsch: Skalen bestehen typischerweise aus geschlossenen (strukturierten) Items, nicht aus offenen Fragen.',
          topics: ['Skalen', 'Gütekriterien', 'Reliabilität'],
        },
        {
          id: 'esf-uebung23-30',
          number: 30,
          points: 2,
          text: 'Was sollte beim Design einer empirischen Studie beachtet werden?',
          choices: [
            { key: 'A', text: 'Der Zitierstandard der angestrebten wissenschaftlichen Zeitschrift (Journal).' },
            { key: 'B', text: 'Die Durchführbarkeit der Studie in Bezug auf personelle und finanzielle Ressourcen.' },
            { key: 'C', text: 'Die Zugänglichkeit von Teilnehmenden und Räumlichkeiten (sofern erforderlich).' },
            { key: 'D', text: 'Frühzeitige Klärung ethischer Fragen, die während der Untersuchung auftreten können.' },
            { key: 'E', text: 'Die Analyse der empirischen Daten.' }
          ],
          correct: ['B', 'C', 'D'],
          explanation: 'B, C und D sind zentrale Designüberlegungen. Durchführbarkeit (B) und Teilnehmendenzugang (C) bestimmen, ob eine Studie realisierbar ist. Ethische Fragen (D) müssen frühzeitig geklärt werden (z.B. Einwilligung, Datenschutz). A (Zitierstandard) betrifft die Publikation, nicht das Design. E (Datenanalyse) ist ein wichtiger Schritt, der aber typischerweise erst nach der Datenerhebung durchgeführt wird — es empfiehlt sich jedoch, die Analysestrategie bereits im Design zu planen (Pre-Analyse-Plan).',
          topics: ['Forschungsdesign', 'Forschungsprozess', 'Gütekriterien'],
        }
      ]
    }
  ]
};
