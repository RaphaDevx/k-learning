window.EXAM_DATA_ESF_SITZUNG4 = {
  id: 'esf-sitzung4',
  title: 'ESF Sitzung 4 — Qualitative Methoden',
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
      id: 'sitzung4-sc',
      title: 'Sitzung 4: Single Choice (4 Punkte)',
      description: '2 Fragen zu Transkription und Datenanalyse. Pro Frage ist genau eine Antwort richtig.',
      points: 4,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-s4-q05', number: 5, points: 2,
          text: 'Wahr oder falsch: "Transkription bezeichnet in der qualitativen Sozialforschung den systematischen Prozess der statistischen Analyse von semantischen Bestandteilen einer verbalen Kommunikation, die auf Video- oder Tonträgern aufgezeichnet wurde."',
          choices: [
            { key: 'A', text: 'Wahr' },
            { key: 'B', text: 'Falsch' }
          ],
          correct: ['B'],
          explanation: 'Die Aussage ist falsch. Transkription bezeichnet das Verschriftlichen (nicht die statistische Analyse) von gesprochener, teilweise auch non-verbaler Kommunikation, die auf Video- oder Tonträgern aufgezeichnet wurde — also die Vorbereitung der Daten für die spätere Analyse, nicht die Analyse selbst.',
          topics: ['Datenanalyse qualitativer Forschung', 'Transkription']
        },
        {
          id: 'esf-s4-q07', number: 7, points: 2,
          text: 'In welcher Reihenfolge werden qualitative Daten üblicherweise verarbeitet?',
          choices: [
            { key: 'A', text: '1. Sammeln von Daten → 2. Transkribieren → 3. Daten dekonstruieren/offene Kodes bilden → 4. Axiales Kodieren (Gruppen aus offenen Kodes) → 5. Selektives Kodieren (Verdichtung) → 6. Ableitung einer neuen Theorie' },
            { key: 'B', text: '1. Transkribieren → 2. Sammeln von Daten → 3. Axiales Kodieren → 4. Offene Kodes bilden → 5. Selektives Kodieren → 6. Ableitung einer neuen Theorie' },
            { key: 'C', text: '1. Sammeln von Daten → 2. Offene Kodes bilden → 3. Transkribieren → 4. Selektives Kodieren → 5. Axiales Kodieren → 6. Ableitung einer neuen Theorie' },
            { key: 'D', text: '1. Ableitung einer Theorie → 2. Sammeln von Daten → 3. Transkribieren → 4. Offene Kodes bilden → 5. Axiales Kodieren → 6. Selektives Kodieren' }
          ],
          correct: ['A'],
          explanation: 'Qualitative Daten werden üblicherweise in dieser Reihenfolge verarbeitet: Sammeln der Daten → Transkribieren → Dekonstruktion der Daten und Bildung offener Kodes → Bildung von Kode-Gruppen durch axiales Kodieren → Verdichtung der Kode-Gruppen durch selektives Kodieren → Ableitung einer neuen, auf den Daten basierenden Theorie. Dieser Prozess ist in der Praxis oft iterativ, die Reihenfolge gibt aber die grobe Struktur vor.',
          topics: ['Datenanalyse qualitativer Forschung', 'Kodierprozess']
        }
      ]
    },
    {
      id: 'sitzung4-mc',
      title: 'Sitzung 4: Multiple Choice (26 Punkte)',
      description: '13 Fragen zu qualitativen Designs, Ethnographie, Sampling, Interviews und Grounded Theory. Alle richtigen Kreuze nötig.',
      points: 26,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-s4-q01', number: 1, points: 2,
          text: 'Welche der folgenden Aussagen über qualitative Forschung sind korrekt?',
          choices: [
            { key: 'A', text: 'Qualitative Forschung ist häufig induktiv.' },
            { key: 'B', text: 'Qualitative Forschung strebt ein tiefgreifendes Verständnis eines Phänomens, einer Kultur oder einer sozialen Gruppierung an.' },
            { key: 'C', text: 'Qualitative Forschung ist explorativ.' },
            { key: 'D', text: 'Qualitative Forschung ist immer deduktiv.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Qualitative Forschung ist häufig induktiv: Forschende begeben sich ins Feld, sammeln Daten und leiten daraus eine Theorie ab (Schluss vom Besonderen aufs Allgemeine). Ziel ist ein tiefgreifendes Verständnis des untersuchten Phänomens, weshalb qualitative Forschung typischerweise explorativ (statt hypothesenprüfend) angelegt ist. D ist falsch: Qualitative Forschung ist gerade NICHT immer deduktiv — das wäre eher charakteristisch für quantitative Forschung.',
          topics: ['Grundlagen qualitativer Forschung', 'Induktion vs. Deduktion']
        },
        {
          id: 'esf-s4-q02', number: 2, points: 2,
          text: 'Zur Untersuchung welcher der folgenden Fragestellungen bzw. Annahmen bietet sich ein qualitatives Untersuchungsdesign an?',
          choices: [
            { key: 'A', text: 'Warum und in welchen Situationen konsumieren Konsument*innen Produkte der Marke Coca-Cola?' },
            { key: 'B', text: 'Zur Überprüfung der Hypothese: Konsument*innen sind bereit, mehr Geld für Coca-Cola auszugeben, wenn die Flasche ein neues Design hat.' },
            { key: 'C', text: 'Wie stark ist der Bekanntheitsgrad der Marke Coca-Cola nach der letzten Werbekampagne gestiegen?' },
            { key: 'D', text: 'Was bedeutet der Konsum von Produkten der Marke Coca-Cola für den/die Konsument*in?' }
          ],
          correct: ['A', 'D'],
          explanation: 'A fragt nach den tieferen Motiven des Konsums ("Warum") — dafür ist ein qualitatives Design geeignet. D fragt nach der subjektiven Bedeutung des Konsums — ebenfalls explorativ-qualitativ. B testet eine vorab formulierte Hypothese über einen Variablenzusammenhang → deduktiv-quantitativ. C fragt nach einem messbaren Prozentsatz (Veränderung des Bekanntheitsgrads) → quantitativ.',
          topics: ['Qualitativ vs. quantitativ', 'Forschungsfrage']
        },
        {
          id: 'esf-s4-q03', number: 3, points: 2,
          text: 'Welche der folgenden Aussagen über Ethnographie sind korrekt?',
          choices: [
            { key: 'A', text: 'Ethnographie dient vor allem dazu, Hypothesen zu prüfen.' },
            { key: 'B', text: 'Der/die Ethnograph*in nimmt am Alltag der erforschten Personen selbst teil.' },
            { key: 'C', text: 'Die teilnehmende Beobachtung ist eine der primären Quellen der Datenerhebung im Rahmen von Ethnographie.' },
            { key: 'D', text: 'Um objektive und reliable Daten zu sammeln, müssen Ethnograph*innen mindestens eine Woche im Feld verbringen.' }
          ],
          correct: ['B', 'C'],
          explanation: 'Ethnograph*innen begeben sich selbst ins Feld und nehmen am Alltag der untersuchten Personen teil (B); die teilnehmende Beobachtung gilt dabei als primäre Datenquelle (C). A ist falsch: Ethnographie dient NICHT der Hypothesenprüfung, sondern folgt dem Prinzip der Grounded Theory. D ist falsch: Für die Dauer der Datenerhebung lässt sich keine allgemeingültige Aussage treffen — eine feste Mindestdauer von einer Woche existiert nicht.',
          topics: ['Ethnographie', 'Qualitative Datenerhebung']
        },
        {
          id: 'esf-s4-q04', number: 4, points: 2,
          text: 'Welche der folgenden Methoden können der qualitativen Sozialforschung zugeordnet werden?',
          choices: [
            { key: 'A', text: 'Quasi-Experiment' },
            { key: 'B', text: 'Interviews' },
            { key: 'C', text: 'Fokusgruppen' },
            { key: 'D', text: 'Repräsentative Online-Umfrage' },
            { key: 'E', text: 'Fallstudien' },
            { key: 'F', text: 'Experimente' },
            { key: 'G', text: 'Teilnehmende Beobachtung' }
          ],
          correct: ['B', 'C', 'E', 'G'],
          explanation: 'Zu den qualitativen Forschungsmethoden zählen u.a. Interviews, teilnehmende Beobachtung, Fallstudien, Fokusgruppen, Dokumentanalysen und Ethnographie. Quasi-Experimente, Experimente und repräsentative Online-Umfragen gehören dagegen zu den quantitativen Forschungsmethoden.',
          topics: ['Qualitative Datenerhebung', 'Qualitativ vs. quantitativ']
        },
        {
          id: 'esf-s4-q06', number: 6, points: 2,
          text: 'Welche der folgenden Verfahren gehören zu den drei wesentlichen Formen der qualitativen Stichprobenauswahl (laut Vorlesung)?',
          choices: [
            { key: 'A', text: 'Theoretisches Sampling' },
            { key: 'B', text: 'Selektives Sampling' },
            { key: 'C', text: 'Purposive Sampling' },
            { key: 'D', text: 'Snowball Sampling' },
            { key: 'E', text: 'Convenience Sampling' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Die drei wesentlichen Formen der qualitativen Stichprobenauswahl sind: (1) Theoretisches Sampling — die Auswahl erfolgt im Prozess der Datenerhebung/-auswertung mit Fokus auf Theorieentwicklung; (2) Selektives Sampling — Auswahlkriterien (z.B. Geschlecht, Alter, Bildung) werden unabhängig vom Material vorab festgelegt; (3) Purposive Sampling — Fälle werden gezielt nach ihrer Relevanz für die Forschungsfrage ausgewählt. Snowball- und Convenience-Sampling sind ebenfalls gängige qualitative Stichprobenverfahren, gehören aber nicht zu diesen drei in der Vorlesung hervorgehobenen Formen.',
          topics: ['Qualitative Stichproben', 'Sampling-Verfahren']
        },
        {
          id: 'esf-s4-q08', number: 8, points: 2,
          text: 'Bitte ergänzen Sie: Die Fallstudie ...',
          choices: [
            { key: 'A', text: '... ist eine Methode, mit der ein breites Forschungsfeld auf ein leicht zu erforschendes Thema eingegrenzt werden kann.' },
            { key: 'B', text: '... bezeichnet die detaillierte Untersuchung eines spezifischen Business Cases.' },
            { key: 'C', text: '... dient zum Vergleich einer Vielzahl von Business Cases.' },
            { key: 'D', text: '... eignet sich lediglich für das Verständnis eines spezifischen Einzelfalls.' },
            { key: 'E', text: '... führt zu einem besseren Allgemeinverständnis auf Grundlage eines Einzelfalls.' }
          ],
          correct: ['A', 'B', 'E'],
          explanation: 'Die Fallstudie hilft, ein breites und komplexes Forschungsfeld auf einen kompakten, leichter erforschbaren Bereich einzugrenzen (A) und einen sorgfältig ausgewählten, spezifischen Forschungsgegenstand detailliert zu untersuchen (B). Aussagen, die auf der intensiven Beschäftigung mit einem Einzelfall beruhen, können dabei einen gewissen Grad an Allgemeingültigkeit erreichen (E). C ist falsch: Eine einzelne Fallstudie dient nicht dem Vergleich vieler Business Cases (dafür bräuchte man mehrere Fallstudien mit Queranalysen). D ist falsch: Es ist ein Missverständnis, dass Fallstudien nur für das Verständnis des Einzelfalls nützlich sind und nicht zur wissenschaftlichen Erkenntnis beitragen können.',
          topics: ['Fallstudie', 'Qualitative Datenerhebung']
        },
        {
          id: 'esf-s4-q09', number: 9, points: 2,
          text: 'Welche der folgenden Fragen sind für ein qualitatives Interview geeignet?',
          choices: [
            { key: 'A', text: 'Ist Berlin die Hauptstadt von Deutschland?' },
            { key: 'B', text: 'Wie verläuft ein typischer Montagmorgen bei Ihnen?' },
            { key: 'C', text: 'Welche unterbewussten Faktoren beeinflussen Sie in Ihrer Kaufentscheidung?' },
            { key: 'D', text: 'Was bedeutet Ihnen die Kleidung, die Sie heute tragen?' }
          ],
          correct: ['B', 'D'],
          explanation: 'Gute qualitative Interviewfragen lassen sich nicht einfach mit Ja/Nein beantworten und zielen auf das "Wie" und "Warum". B ist eine gute Einstiegsfrage, die leicht zu beantworten ist und ein tieferes Verständnis des Alltags ermöglicht. D fragt nach der subjektiven Bedeutung — ebenfalls geeignet. A ist eine geschlossene Faktenfrage (eindeutige Antwort) und daher ungeeignet. C verlangt eine zu abstrakte, selbstreflektierte Antwort über unbewusste Prozesse, die Befragte in der Regel nicht introspektiv beantworten können.',
          topics: ['Qualitatives Interview', 'Fragetypen']
        },
        {
          id: 'esf-s4-q10', number: 10, points: 2,
          text: 'Welche der folgenden Aussagen über strukturierte Interviews sind korrekt?',
          choices: [
            { key: 'A', text: 'Strukturierte Interviews sind einfach zu analysieren, liefern jedoch häufig eher oberflächliche Daten.' },
            { key: 'B', text: 'Strukturierte Interviews eignen sich besonders in einer explorativen Untersuchungsphase.' },
            { key: 'C', text: 'Strukturierte Interviews sind offen gestaltet und die Reihenfolge der Fragen muss nicht eingehalten werden.' },
            { key: 'D', text: 'Der/die Informant*in strukturiert das Interview.' }
          ],
          correct: ['A'],
          explanation: 'Da Fragen und Reihenfolge bei strukturierten Interviews für alle Befragten identisch und vorab vom/von der Forscher*in festgelegt sind, sind die Antworten gut vergleichbar und einfach auszuwerten — gleichzeitig wird dadurch oft versäumt, einzelne Aspekte individuell zu vertiefen, was zu eher oberflächlichen Daten führt (A korrekt). B ist falsch: Für explorative Phasen sind offene Interviews besser geeignet, da strukturierte Interviews die Forschungsrichtung zu stark einschränken. C ist falsch: Bei strukturierten Interviews ist die Reihenfolge fest vorgegeben. D ist falsch: Der/die Forscher*in (nicht der/die Informant*in) legt die Struktur fest.',
          topics: ['Qualitatives Interview', 'Strukturierte Interviews']
        },
        {
          id: 'esf-s4-q11', number: 11, points: 2,
          text: 'Welche der folgenden Aussagen über Fokusgruppen-Interviews sind korrekt?',
          choices: [
            { key: 'A', text: 'Fokusgruppen eignen sich, wenn man Daten schnell und einfach auswerten möchte.' },
            { key: 'B', text: 'Fokusgruppen eignen sich, um intime Themen in der Gruppe zu besprechen.' },
            { key: 'C', text: 'Durch die Dynamik der Fokusgruppen eignen sich diese, um z.B. die Marktakzeptanz zu bewerten oder Herausforderungen und Probleme zu erfassen.' },
            { key: 'D', text: 'Fokusgruppen eignen sich, um Themen explorativ zu untersuchen.' }
          ],
          correct: ['C', 'D'],
          explanation: 'Fokusgruppen sind besonders für explorative Forschung geeignet (D), da Forschende viel aus der offenen Gruppendiskussion lernen können — z.B. zur Bewertung der Marktakzeptanz oder zur Identifikation von Herausforderungen und Problemen (C). A ist falsch: Die Auswertung von Fokusgruppen ist deutlich komplexer als bei unstrukturierten Einzelinterviews. B ist falsch: Fokusgruppen eignen sich NICHT für intime oder persönliche Themen, da diese in der Gruppe nur ungern besprochen werden (auch scheinbar alltägliche Themen wie Essgewohnheiten können als intim wahrgenommen werden).',
          topics: ['Fokusgruppen', 'Qualitative Datenerhebung']
        },
        {
          id: 'esf-s4-q12', number: 12, points: 2,
          text: 'Welche Forschungsmethoden eignen sich am besten, um folgende Forschungsfrage explorativ zu beantworten: "Wie erleben und erreichen Konsument*innen Entschleunigung im offlinebasierten Alltag?"',
          choices: [
            { key: 'A', text: 'Fokusgruppen' },
            { key: 'B', text: 'Teilnehmende Beobachtung' },
            { key: 'C', text: 'Online-Befragung' },
            { key: 'D', text: 'Experimente' },
            { key: 'E', text: 'Interviewstudie' }
          ],
          correct: ['A', 'B', 'E'],
          explanation: 'Teilnehmende Beobachtung ermöglicht es Forschenden, das Phänomen selbst zu erleben und die Informant*innen in der Situation zu studieren. Eine Interviewstudie liefert Informationen über Meinungen, Werte und Motivationen, die durch Beobachtung allein nicht zugänglich sind. Fokusgruppen ermöglichen kontroverse Meinungen und Diskussionen unter den Teilnehmenden. Eine Online-Befragung mit vordefinierten Fragen (C) ist für explorative Forschungsfragen ungeeignet, da sie eher für quantitative Fragestellungen taugt. Experimente (D) sind ungeeignet, da hier keine Hypothese getestet werden soll.',
          topics: ['Qualitative Datenerhebung', 'Explorative Forschung']
        },
        {
          id: 'esf-s4-q13', number: 13, points: 2,
          text: 'Welche der folgenden Aussagen über die Grounded Theory sind korrekt?',
          choices: [
            { key: 'A', text: 'Die Grounded Theory ist ein sozialwissenschaftlicher Ansatz für die systematische Sammlung und Auswertung von vor allem qualitativen Daten (z.B. Interviewtranskripte, Beobachtungsprotokolle) mit dem Ziel der Theoriebildung.' },
            { key: 'B', text: 'Bei Anwendung der Grounded Theory werden weder eine eingehende theoretische Recherche betrieben noch Hypothesen aufgestellt, bevor der/die Forschende anfängt, Daten zu sammeln.' },
            { key: 'C', text: 'Die Grounded Theory basiert auf dem Prinzip der "komparativen Analyse": Der Prozess erfolgt im iterativen Wechsel zwischen Datenerhebung, Datenanalyse und Datenauswertung, bis theoretische Sättigung erreicht ist.' },
            { key: 'D', text: 'Die Grounded Theory testet primär vorab festgelegte Hypothesen mittels statistischer Verfahren.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Die Grounded Theory ist ein induktiver, datengetriebener Ansatz zur Theoriebildung aus qualitativen Daten (A). Es wird bewusst auf umfassende Vorab-Theorierecherche und Hypothesenbildung verzichtet (B), und der Forschungsprozess verläuft iterativ zwischen Erhebung, Analyse und Auswertung bis zur theoretischen Sättigung (C). D beschreibt das Gegenteil — einen deduktiven, hypothesentestenden quantitativen Ansatz — und ist daher falsch.',
          topics: ['Grounded Theory', 'Datenanalyse qualitativer Forschung']
        },
        {
          id: 'esf-s4-q14', number: 14, points: 2,
          text: 'Bei welchen der folgenden Forschungsfragen bietet sich ein Grounded-Theory-Ansatz an?',
          choices: [
            { key: 'A', text: 'Wie werden die Schuhe von Dr. Martens in der Subkultur der Techno-Szene mit Bedeutung aufgeladen?' },
            { key: 'B', text: 'Bei welchem Preis für eine Dose Red Bull kann der grösste Umsatz erzielt werden?' },
            { key: 'C', text: 'Wie und warum versuchen immer mehr Arbeitnehmer*innen, ihren Alltag mittels extremer Sportarten zu entfliehen?' },
            { key: 'D', text: 'Inwiefern steigert der neue Werbeslogan der Lindt & Sprüngli AG den Markenwert von Lindt & Sprüngli auf dem Schweizer Markt?' }
          ],
          correct: ['A', 'C'],
          explanation: 'A und C sind "Wie/Warum"-Fragen, die nach Prozessen und tieferen Motiven fragen, sich nicht aus bestehenden Theorien ableiten lassen und nur mit qualitativen Daten beantwortet werden können — klassische Grounded-Theory-Fragestellungen. B und D sind dagegen eher quantitativer Natur: Hier lassen sich bereits im Vorfeld Hypothesen formulieren, die mittels Experiment bzw. quantitativer Erhebung getestet werden können.',
          topics: ['Grounded Theory', 'Forschungsfrage']
        },
        {
          id: 'esf-s4-q15', number: 15, points: 2,
          text: 'Schouten & McAlexander (1995) untersuchten in ihrer Ethnographie "Subcultures of Consumption: An Ethnography of the New Bikers" die Harley-Davidson-Subkultur. Welche Aussage zur angewendeten qualitativen Forschungsmethode ist zutreffend?',
          choices: [
            { key: 'A', text: 'Die durchgeführten qualitativen Interviews wurden durch Online-Umfragen mit 350 Teilnehmenden verstreut über verschiedene Harley-Davidson-Standorte ergänzt; zudem wurden Feldnotizen als Datengrundlage herangezogen.' },
            { key: 'B', text: 'Die ethnographische Datenerhebung erfolgte primär aus formellen und informellen Interviews, teilnehmender und nicht-teilnehmender Beobachtung sowie aus Fotografie.' },
            { key: 'C', text: 'Es wurde eine experimentelle Harley-Davidson-Studie in einem "Between-Subject Design" durchgeführt.' },
            { key: 'D', text: 'Die qualitative Datenerhebung erfolgte lediglich mittels strukturierter Interviews mit einem von den Forschenden vorgegebenen Gesprächsleitfaden, der keine Abweichung vom Protokoll erlaubte.' }
          ],
          correct: ['B'],
          explanation: 'Laut Artikel bestand die Datenerhebung "mostly of formal and informal interviews, nonparticipant and participant observation, and photography" — also B. Die Forschenden führten über drei Jahre eine ethnografische Feldstudie durch und entwickelten sich dabei progressiv von "Outsidern" zu "Insidern". A ist falsch (keine Online-Umfrage mit 350 Teilnehmenden erwähnt), C ist falsch (kein Experiment, sondern eine ethnografische Feldstudie), und D ist falsch, da die Datenerhebung gerade NICHT auf strukturierte Interviews mit starrem Protokoll beschränkt war, sondern formelle und informelle Interviews sowie Beobachtung und Fotografie umfasste.',
          topics: ['Ethnographie', 'Qualitative Datenerhebung', 'Fallbeispiel']
        }
      ]
    }
  ]
};
