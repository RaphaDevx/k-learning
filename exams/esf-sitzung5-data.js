window.EXAM_DATA_ESF_SITZUNG5 = {
  id: 'esf-sitzung5',
  title: 'ESF Sitzung 5 — Gütekriterien & Open Science',
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
      id: 'sitzung5-sc',
      title: 'Sitzung 5: Single Choice (6 Punkte)',
      description: '3 Fragen zu Mixed-Method-Gütekriterien, Reliabilität/Validität und Open Science. Pro Frage ist genau eine Antwort richtig.',
      points: 6,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-s5-q07', number: 7, points: 2,
          text: 'Ist folgende Aussage korrekt? "Bei Mixed-Method-Ansätzen finden lediglich die Gütekriterien von qualitativer oder quantitativer Forschung Anwendung. Spezifische Mixed-Method-Gütekriterien sind nicht relevant!"',
          choices: [
            { key: 'A', text: 'Wahr' },
            { key: 'B', text: 'Falsch' }
          ],
          correct: ['B'],
          explanation: 'Die Aussage ist falsch. Neben den Gütekriterien von qualitativer und quantitativer Forschung müssen Forschende bei Mixed-Methods-Ansätzen zusätzlich spezifische Mixed-Methods-Gütekriterien beachten — z.B. "Triangulation" und "Konsistenz" — um sicherzustellen, dass die qualitativen und quantitativen Komponenten sinnvoll integriert sind und ein umfassendes Verständnis des Forschungsproblems ermöglichen.',
          topics: ['Gütekriterien', 'Mixed Methods', 'Open Science']
        },
        {
          id: 'esf-s5-q08', number: 8, points: 2,
          text: 'Welche Aussage in Bezug auf folgendes Statement ist richtig? "Verbraucher*innen, die auf einem Fragebogen zur Messung des Einkaufsvergnügens am Samstagnachmittag schlecht abschneiden, werden wahrscheinlich eine Woche später auf der gleichen Skala ebenfalls schlecht abschneiden."',
          choices: [
            { key: 'A', text: 'Diese Aussage weist auf eine hohe Reliabilität hin, und es kann keine Aussage über die Validität gemacht werden.' },
            { key: 'B', text: 'Die Aussage weist auf eine hohe Validität und eine hohe Reliabilität hin.' },
            { key: 'C', text: 'Die Aussage weist auf eine hohe Validität hin, es kann jedoch keine Aussage über die Reliabilität gemacht werden.' },
            { key: 'D', text: 'Diese Aussage weist auf eine hohe Reliabilität und eine niedrige Validität hin.' }
          ],
          correct: ['A'],
          explanation: 'Die Aussage deutet auf eine hohe Reliabilität hin, da mehrmaliges Verwenden derselben Skala zu ähnlichen Ergebnissen führt (Test-Retest-Stabilität). Die hohe Reliabilität eines Fragebogens sagt jedoch nichts über seine Validität aus — der Fragebogen kann eine niedrige oder hohe Validität haben, dafür wären weitere Informationen nötig.',
          topics: ['Gütekriterien', 'Reliabilität vs. Validität']
        },
        {
          id: 'esf-s5-q12', number: 12, points: 2,
          text: 'Ist die folgende Aussage wahr? "Open Science bezeichnet öffentlich käufliches Wissen, das durch Unternehmen erworben und gehandelt werden kann."',
          choices: [
            { key: 'A', text: 'Wahr' },
            { key: 'B', text: 'Falsch' }
          ],
          correct: ['B'],
          explanation: 'Die Aussage ist falsch. Open Science bezeichnet transparentes und zugängliches Wissen, das durch kollaborative Netzwerke geteilt und (weiter)entwickelt wird — nicht käufliches, von Unternehmen gehandeltes Wissen. Zentrale Merkmale sind Transparenz in Methodik und Datensammlung, öffentliche Verfügbarkeit und Wiederverwendbarkeit von Forschungsdaten, offener Zugang zu wissenschaftlicher Kommunikation und webbasierte Kollaborationstools — alles mit dem Ziel der Qualitätssicherung in der Forschung.',
          topics: ['Open Science', 'Replikationskrise']
        }
      ]
    },
    {
      id: 'sitzung5-mc',
      title: 'Sitzung 5: Multiple Choice (24 Punkte)',
      description: '12 Fragen zu Gütekriterien, Primär-/Sekundärdaten, Replikationskrise, neuen Technologien und akademischem Arbeiten. Alle richtigen Kreuze nötig.',
      points: 24,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-s5-q01', number: 1, points: 2,
          text: 'Welche der folgenden Begriffe gehören zu den drei zentralen Gütekriterien der empirischen Sozialforschung (laut Vorlesung)?',
          choices: [
            { key: 'A', text: 'Validität' },
            { key: 'B', text: 'Objektivität' },
            { key: 'C', text: 'Reliabilität' },
            { key: 'D', text: 'Generalisierbarkeit' },
            { key: 'E', text: 'Signifikanz' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'Die drei zentralen Gütekriterien der empirischen Sozialforschung sind Reliabilität (Genauigkeit/Zuverlässigkeit der Messung), Objektivität (Unabhängigkeit der Ergebnisse von der durchführenden bzw. auswertenden Person) und Validität (Ausmass, in dem das Messinstrument tatsächlich das misst, was es messen soll). Generalisierbarkeit und statistische Signifikanz sind ebenfalls wichtige Konzepte, gehören aber nicht zu diesen drei klassischen Gütekriterien.',
          topics: ['Gütekriterien']
        },
        {
          id: 'esf-s5-q02', number: 2, points: 2,
          text: 'Welche Aussage(n) in Bezug auf "Objektivität" sind richtig?',
          choices: [
            { key: 'A', text: 'Objektivität beschreibt die Unabhängigkeit des Ergebnisses vom/von Forscher*in.' },
            { key: 'B', text: 'Um objektive Ergebnisse zu erhalten, ist es z.B. zu empfehlen, die Interaktion zwischen Versuchsleiter*in und Proband*innen zu maximieren (Durchführungsobjektivität).' },
            { key: 'C', text: 'Die Objektivität lässt sich erhöhen, indem man eine gemeinsame Auswertung — also nicht einzelne, unabhängige Auswertungen — von mehreren Personen gleichzeitig durchführen lässt (Auswertungsobjektivität).' },
            { key: 'D', text: 'Die Interpretationsobjektivität lässt sich durch die Übereinstimmung der Interpretationen verschiedener Forscher*innen abschätzen.' }
          ],
          correct: ['A', 'D'],
          explanation: 'A korrekt: Das ist die Definition von Objektivität — das Ergebnis soll unabhängig von der durchführenden Person sein. D korrekt: Interpretationsobjektivität ist gegeben, wenn Interpretationen unabhängig von der interpretierenden Person sind; überprüfbar durch die Korrelation der Ergebnisse verschiedener Forscher*innen. B ist falsch: Durchführungsobjektivität wird durch MINIMIERUNG (nicht Maximierung) der Interaktion zwischen Versuchsleiter*in und Proband*innen erreicht — z.B. durch standardisierte, computergestützte Durchführung. C ist falsch: Auswertungsobjektivität erfordert PARALLELE, unabhängige Auswertungen durch mehrere Personen — nicht eine gemeinsame Auswertung.',
          topics: ['Gütekriterien', 'Objektivität']
        },
        {
          id: 'esf-s5-q03', number: 3, points: 2,
          text: 'Welche Aussage(n) in Bezug auf "Validität" sind richtig?',
          choices: [
            { key: 'A', text: 'Validität bedeutet, dass mehrere Messungen zum gleichen Ergebnis führen.' },
            { key: 'B', text: 'Inhaltsvalidität beschreibt die Verallgemeinerbarkeit des Ergebnisses auf andere Inhalte.' },
            { key: 'C', text: 'Kriteriumsvalidität beschreibt den Zusammenhang zwischen einem Messergebnis und relevanten anderen Variablen (Aussenkriterien).' },
            { key: 'D', text: 'Validität bedeutet, dass das gemessen wurde, was gemessen werden sollte.' }
          ],
          correct: ['C', 'D'],
          explanation: 'C korrekt: Kriteriumsvalidität betrachtet den Zusammenhang zwischen den Ergebnissen einer Messung und einem empirischen Aussenkriterium (z.B. IQ-Testergebnis und spätere Schulnoten). D korrekt: Das ist die Definition von Validität. A ist falsch: Dass mehrere Messungen zum gleichen Ergebnis führen, beschreibt Reliabilität, nicht Validität. B ist falsch: Inhaltsvalidität bedeutet, dass die Messung eines Konstrukts dessen Inhalte in allen Aspekten vollständig erfasst (z.B. müssten für die Messung von Intelligenz mehr als nur Rechenaufgaben verwendet werden) — nicht die Verallgemeinerbarkeit auf andere Inhalte.',
          topics: ['Gütekriterien', 'Validität']
        },
        {
          id: 'esf-s5-q04', number: 4, points: 2,
          text: 'Welche Aussage(n) in Bezug auf "Reliabilität" sind richtig?',
          choices: [
            { key: 'A', text: 'Reliabilität bezeichnet die Genauigkeit von Messungen.' },
            { key: 'B', text: 'Hohe Reliabilität bedeutet, dass wiederholte Untersuchungen zu sehr ähnlichen (oder sogar gleichen) Messergebnissen gelangen.' },
            { key: 'C', text: 'Die Reliabilität kann mit Hilfe von Testwiederholungen bestimmt werden (Test-Retest-Reliabilität).' },
            { key: 'D', text: 'Der Begriff Reliabilität entspringt dem lateinischen Wort "religare" ("anbinden") und meint, dass das gemessen wird, was gemessen werden soll.' }
          ],
          correct: ['A', 'B', 'C'],
          explanation: 'A, B und C beschreiben korrekt die Definition und Messung von Reliabilität: Genauigkeit der Messung, Stabilität bei wiederholter Durchführung, und Bestimmung mittels Test-Retest-Verfahren (Korrelation zwischen Testwiederholungen als Indikator). D ist falsch: Der Begriff stammt laut Duden vom englischen Wort "reliability" (= verlässlich), nicht vom Lateinischen "religare". Zudem beschreibt "das gemessen wird, was gemessen werden soll" die Validität, nicht die Reliabilität.',
          topics: ['Gütekriterien', 'Reliabilität']
        },
        {
          id: 'esf-s5-q05', number: 5, points: 2,
          text: 'Zwei Szenarien: (1) Forschende möchten die Intelligenz ihrer Teilnehmer*innen messen, aber wiederholte Tests mit demselben Intelligenztest führen zu höheren IQ-Werten. (2) In einer weiteren Studie geben zwei Versuchsleiter*innen dieselbe schriftliche Instruktion ("Arbeiten Sie möglichst ohne Fehler, aber so schnell Sie können") mündlich mit jeweils unterschiedlicher Betonung weiter. Welche Aussagen zu den verletzten Gütekriterien sind korrekt?',
          choices: [
            { key: 'A', text: 'In Szenario 1 ist die Reliabilität verletzt, da der Lerneffekt bei Testwiederholung zu unterschiedlichen (besseren) Ergebnissen führt.' },
            { key: 'B', text: 'In Szenario 1 ist die Validität verletzt, da der Test nicht die Intelligenz misst.' },
            { key: 'C', text: 'In Szenario 2 ist die Durchführungsobjektivität verletzt, da das Ergebnis von der durchführenden Person (und deren Betonung) abhängt.' },
            { key: 'D', text: 'In Szenario 2 ist die Reliabilität verletzt, da die Testwiederholung zu unterschiedlichen Ergebnissen führt.' }
          ],
          correct: ['A', 'C'],
          explanation: 'Szenario 1: Reliabilität betrifft die Messgenauigkeit bei Wiederholung. Wird derselbe Test mehrfach durchgeführt, entsteht ein Lerneffekt, der zu besseren Ergebnissen führt — die Reliabilität ist hier nicht gegeben (A korrekt, B falsch — die Validität wird hier nicht thematisiert). Szenario 2: Ein Test ist durchführungsobjektiv, wenn das Ergebnis nicht davon abhängt, welche Person den Test durchführt. Da die beiden Versuchsleiter*innen die Instruktion unterschiedlich betonen, ist die Durchführungsobjektivität verletzt (C korrekt, D falsch — hier geht es um unterschiedliche Versuchsleiter*innen, nicht um Testwiederholung).',
          topics: ['Gütekriterien', 'Reliabilität', 'Objektivität']
        },
        {
          id: 'esf-s5-q06', number: 6, points: 2,
          text: 'Stellen Sie sich eine Zielscheiben-Analogie vor: Mehrere Messversuche einer neu entwickelten Skala landen alle eng beieinander, jedoch deutlich abseits der Mitte (des "wahren Werts"). Welche beiden Aussagen zusammen beschreiben dieses Szenario am besten?',
          choices: [
            { key: 'A', text: 'Die Skala ist reliabel.' },
            { key: 'B', text: 'Die Skala ist nicht reliabel.' },
            { key: 'C', text: 'Die Skala ist valide.' },
            { key: 'D', text: 'Die Skala ist nicht valide.' }
          ],
          correct: ['A', 'D'],
          explanation: 'Die enge Streuung der Messwerte zeigt, dass wiederholte Messungen zu sehr ähnlichen Ergebnissen führen — die Skala ist reliabel (A). Da die Messwerte jedoch systematisch vom wahren Wert (Zielscheibenmitte) abweichen, misst die Skala nicht das, was sie messen soll — sie ist nicht valide (D). Dieses Beispiel zeigt: Reliabilität ist eine notwendige, aber keine hinreichende Bedingung für Validität.',
          topics: ['Gütekriterien', 'Reliabilität vs. Validität']
        },
        {
          id: 'esf-s5-q09', number: 9, points: 2,
          text: 'Welche der folgenden Aussagen zu Primär- und Sekundärdaten sind korrekt?',
          choices: [
            { key: 'A', text: 'Primärdaten sind i.d.R. teurer in der Erhebung als Sekundärdaten.' },
            { key: 'B', text: 'Sekundärdaten sind stets optimal auf die eigene Forschungsfrage zugeschnitten.' },
            { key: 'C', text: 'Primärdaten ermöglichen eine bessere Kontrolle über die Datenqualität als Sekundärdaten.' },
            { key: 'D', text: 'Primärdaten sind Echtzeitdaten, während Sekundärdaten bereits in der Vergangenheit für einen anderen Zweck erhoben wurden.' },
            { key: 'E', text: 'Die Erhebung von Primärdaten ist i.d.R. weniger zeitaufwendig als die Nutzung von Sekundärdaten.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'Primärdaten werden eigens für das aktuelle Forschungsprojekt in Echtzeit erhoben (D), sind dadurch i.d.R. teurer (A) und zeitaufwendiger als Sekundärdaten, bieten aber eine bessere Kontrolle über die Datenqualität (C) und sind besser auf die eigene Forschungsfrage zugeschnitten. B ist falsch: Sekundärdaten wurden für einen ANDEREN Zweck erhoben und passen oft NICHT optimal zur eigenen Forschungsfrage. E ist falsch: Die Erhebung von Primärdaten ist i.d.R. zeitaufwendiger, nicht weniger zeitaufwendig, als die Nutzung bereits vorhandener Sekundärdaten.',
          topics: ['Primärdaten und Sekundärdaten', 'Datenerhebung']
        },
        {
          id: 'esf-s5-q10', number: 10, points: 2,
          text: 'Welche der folgenden Kritikpunkte werden typischerweise der QUALITATIVEN Forschung zugeordnet?',
          choices: [
            { key: 'A', text: 'Statische Ansicht des Sozialverhaltens' },
            { key: 'B', text: 'Zu subjektiv (Forscher*in entscheidet, worauf er/sie sich fokussiert)' },
            { key: 'C', text: 'Künstliches und falsches Verständnis von Präzision und Genauigkeit' },
            { key: 'D', text: 'Schwierig zu replizieren (unstrukturiertes Format)' },
            { key: 'E', text: 'Generalisierbarkeit problematisch/nicht möglich (Stichproben, die nicht für alle Fälle "repräsentativ" sind)' }
          ],
          correct: ['B', 'D', 'E'],
          explanation: 'Die Kritikpunkte B, D und E (zu subjektiv, schwer zu replizieren, problematische Generalisierbarkeit) werden typischerweise der QUALITATIVEN Forschung zugeschrieben. A (statische Ansicht des Sozialverhaltens) und C (künstliches/falsches Verständnis von Präzision und Genauigkeit) werden dagegen typischerweise der QUANTITATIVEN Forschung zugeschrieben.',
          topics: ['Qualitativ vs. quantitativ', 'Kritik an Forschungsansätzen']
        },
        {
          id: 'esf-s5-q11', number: 11, points: 2,
          text: 'Was sind die wesentlichen Ursachen für die Reproduzierungs- und Replikationskrise?',
          choices: [
            { key: 'A', text: 'Publikations-Bias' },
            { key: 'B', text: '"Open Data"-Standards' },
            { key: 'C', text: 'Voranmeldung wissenschaftlicher Studien (Pre-Registration)' },
            { key: 'D', text: 'Akademische Fehlanreize & Publikationsdruck' },
            { key: 'E', text: 'Open Science Framework (OSF)' },
            { key: 'F', text: 'Fragwürdige Forschungsmethoden (z.B. p-hacking)' },
            { key: 'G', text: 'Zu geringe statistische Aussagekraft (Low Power)' }
          ],
          correct: ['A', 'D', 'F', 'G'],
          explanation: 'Zu den wesentlichen Ursachen der Replikationskrise zählen fragwürdige Forschungsmethoden wie p-hacking, HARKing, Optional Stopping oder Outcome Switching (F), Publikations-Bias — nur "spannende"/signifikante Ergebnisse werden veröffentlicht (A), zu geringe statistische Aussagekraft der Studien (G) sowie akademische Fehlanreize und Publikationsdruck, die solche Praktiken begünstigen (D). "Open Data"-Standards (B), Pre-Registration (C) und das Open Science Framework (E) sind dagegen GEGENMASSNAHMEN zur Bekämpfung der Replikationskrise, keine Ursachen.',
          topics: ['Replikationskrise', 'Open Science']
        },
        {
          id: 'esf-s5-q13', number: 13, points: 2,
          text: 'Welche der folgenden Aussagen zu Wahrnehmungshilfen und neuen Technologien sind WAHR?',
          choices: [
            { key: 'A', text: '"Face Recognition" ist ein anderer Begriff für "Emotion Recognition".' },
            { key: 'B', text: 'Experimente zielen darauf ab, Kausalhypothesen herzuleiten (zu generieren).' },
            { key: 'C', text: 'Emotion Recognition erkennt die Emotionen einer Person.' },
            { key: 'D', text: 'Eye-Tracking erfasst Augenbewegungen.' },
            { key: 'E', text: 'Galvanic Skin Response misst den elektrischen Leitwert der Haut.' }
          ],
          correct: ['C', 'D', 'E'],
          explanation: 'C, D und E sind korrekt: Emotion Recognition erkennt Emotionen einer Person, Eye-Tracking erfasst Augenbewegungen, und Galvanic Skin Response (Hautleitwertmessung) misst den elektrischen Leitwert der Haut. A ist falsch: Face Recognition erkennt Personen auf Fotos/Videos wieder, während Emotion Recognition Emotionen erkennt — zwei unterschiedliche Technologien. B ist falsch: Experimente zielen darauf ab, bereits aufgestellte Kausalhypothesen zu TESTEN, nicht sie erst herzuleiten/zu generieren.',
          topics: ['Neue Technologien', 'Wahrnehmungshilfen', 'Experimente']
        },
        {
          id: 'esf-s5-q14', number: 14, points: 2,
          text: 'Was gehört zu den "Dos" der Bachelorarbeit?',
          choices: [
            { key: 'A', text: 'Ein Thema wählen, das persönlich sehr spannend/interessant ist.' },
            { key: 'B', text: 'Personen zum Korrekturlesen anfragen.' },
            { key: 'C', text: 'Direkt mit Schreiben anfangen (erst einmal ohne Struktur).' },
            { key: 'D', text: 'Wenig Zeit einplanen und nebenbei idealerweise Vollzeit arbeiten.' }
          ],
          correct: ['A', 'B'],
          explanation: 'Zu den "Dos" gehören u.a.: ein Thema wählen, das einen wirklich interessiert (A), genügend Zeit einrechnen, Personen zum Korrekturlesen anfragen (B) und sich mit Freunden über Tipps und Learnings austauschen. Zu den "Don\'ts" gehört dagegen: zu wenig Zeit einrechnen und nebenbei Vollzeit arbeiten/ein Praktikum absolvieren (D) sowie gleich mit Schreiben anfangen, ohne vorher zu recherchieren oder zu strukturieren (C).',
          topics: ['Akademisches Schreiben', 'Bachelorarbeit']
        },
        {
          id: 'esf-s5-q15', number: 15, points: 2,
          text: 'Im NYT-Artikel "The Harvard Professor and the Bloggers" geht es um Vorwürfe der Datenmanipulation gegen Dr. Gino. Welche Aussagen dazu sind korrekt?',
          choices: [
            { key: 'A', text: 'Die Beweise zur Datenmanipulation gegen Dr. Gino führen zu einer eindeutigen Beweislage.' },
            { key: 'B', text: 'Die Harvard Business School löste direkt eine interne Untersuchung aus, die etwa zwei Jahre später dazu führen sollte, dass Dr. Gino von den Vorwürfen der Datenmanipulation freigesprochen wurde.' },
            { key: 'C', text: 'Ein Team aus Verhaltenswissenschaftler*innen schrieb auf dem Blog Data Colada, dass Dr. Gino die Daten ihrer Studien manipuliert habe, um ihre Ergebnisse eindrucksvoller erscheinen zu lassen.' },
            { key: 'D', text: 'Dr. Gino reichte eine Verleumdungsklage gegen die Universität und die Blogger ein und forderte mindestens 25 Mio. USD Schadensersatz; ihre Harvard-Kolleg*innen waren sich unumstritten einig, dass sie ein ordnungsgemässes Untersuchungsverfahren erhalten hatte.' },
            { key: 'E', text: 'Den Co-Autor*innen von Dr. Gino sind die Vorwürfe gleichgültig — sie sind sich sicher, dass ihre gemeinsamen Arbeiten einwandfrei sind und keine weitere Prüfung benötigen.' },
            { key: 'F', text: 'Data Colada ist ein Blog, der sich auf die Verlässlichkeit (wissenschaftliche Integrität) sozialwissenschaftlicher Forschung konzentriert.' }
          ],
          correct: ['C', 'F'],
          explanation: 'C ist korrekt: Die Blogger von Data Colada (ein Team von Verhaltenswissenschaftler*innen) berichteten, dass Dr. Gino Daten manipuliert habe, um ihre Studienergebnisse eindrucksvoller wirken zu lassen. F ist korrekt: Data Colada ist ein Blog, der sich mit der Verlässlichkeit sozialwissenschaftlicher/verhaltenswissenschaftlicher Forschung beschäftigt. A ist falsch: Die Beweise bleiben Indizien, keine eindeutige Beweislage — Dr. Gino bestreitet die Vorwürfe. B ist falsch: Die Untersuchung führte NICHT zu einem Freispruch, sondern dazu, dass Harvard Dr. Gino in unbezahlten Urlaub versetzte und ihre Anstellung zu widerrufen versuchte. D ist falsch: Unter den Harvard-Kolleg*innen entstand eine Debatte darüber, ob das Verfahren ordnungsgemäss war — keine einstimmige Zustimmung. E ist falsch: Zahlreiche Co-Autor*innen von Dr. Gino überprüfen nun aktiv ihre gemeinsamen Arbeiten.',
          topics: ['Open Science', 'Replikationskrise', 'Fallbeispiel Datenmanipulation']
        }
      ]
    }
  ]
};
