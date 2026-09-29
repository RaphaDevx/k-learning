window.EXAM_DATA_ESF_SITZUNG2 = {
  id: 'esf-sitzung2',
  title: 'ESF Sitzung 2 — Forschungsfrage, Hypothesen & Literatur',
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
      id: 'sitzung2-sc',
      title: 'Sitzung 2: Single Choice (20 Punkte)',
      description: '10 Fragen zu Forschungsfrage, Literaturrecherche, Hypothesen und Theorien. Pro Frage ist genau eine Antwort richtig.',
      points: 20,
      question_type: 'single_choice',
      questions: [
        {
          id: 'esf-s2-q01', number: 1, points: 2,
          text: 'Welches Kriterium sollte ein Forschungsthema (insb. für eine Seminar- oder Abschlussarbeit) erfüllen?',
          choices: [
            { key: 'A', text: 'Es sollte interessant und höchst emotional sein.' },
            { key: 'B', text: 'Es sollte aktuell sein, z.B. einen laufenden oder sich abzeichnenden wissenschaftlichen Diskurs ansprechen.' },
            { key: 'C', text: 'Es sollte höchst komplex sein.' },
            { key: 'D', text: 'Es sollte relevant und dennoch vollständig unerforscht sein.' }
          ],
          correct: ['B'],
          explanation: 'Das Thema sollte zeitgemäss/aktuell sein. Es darf zwar interessant sein, aber möglichst wenig emotional, damit es sachlich bearbeitet werden kann. Es sollte relevant, aber nicht vollständig unbearbeitet sein — sonst fehlt ausreichend Literatur. Und es sollte nicht zu komplex sein, da Komplexität direkt den Bearbeitungsaufwand erhöht.',
          topics: ['Forschungsfrage', 'Themenwahl']
        },
        {
          id: 'esf-s2-q02', number: 2, points: 2,
          text: 'Welche Aussage bezüglich Forschungsfragen ist korrekt?',
          choices: [
            { key: 'A', text: 'Forschungsfragen können deskriptiv sein.' },
            { key: 'B', text: 'Forschungsfragen und Hypothesen sind synonym zu verstehen.' },
            { key: 'C', text: 'Forschungsfragen sind entweder induktiv, deduktiv oder abduktiv.' },
            { key: 'D', text: 'Forschungsfragen sind ausschliesslich Teil von qualitativer Forschung.' }
          ],
          correct: ['A'],
          explanation: 'Die Haupttypen von Forschungsfragen sind Vergleichsfragen, Kausalfragen und deskriptive Fragen — Forschungsfragen können also deskriptiv sein. Forschungsfragen und Hypothesen sind keine Synonyme: Aus einer Forschungsfrage werden Hypothesen abgeleitet. Induktiv/deduktiv/abduktiv beschreiben das generelle Forschungsvorgehen, nicht die Forschungsfrage selbst. Forschungsfragen gibt es sowohl in qualitativer als auch in quantitativer und Mixed-Methods-Forschung.',
          topics: ['Forschungsfrage']
        },
        {
          id: 'esf-s2-q06', number: 6, points: 2,
          text: 'Wählen Sie aus der folgenden Liste aus, bei welcher Option es sich um eine Sekundärquelle handelt.',
          choices: [
            { key: 'A', text: 'Bibliothekskataloge' },
            { key: 'B', text: 'Lehrbücher' },
            { key: 'C', text: 'Interviews' },
            { key: 'D', text: 'Tagebücher' },
            { key: 'E', text: 'Journalartikel' }
          ],
          correct: ['B'],
          explanation: 'Primärquellen sind unverarbeitete, ursprüngliche Informationsquellen (Interviews, Tagebücher, Journalartikel). Sekundärquellen analysieren oder interpretieren Primärdaten — z.B. Lehrbücher. Tertiärquellen stellen Daten zu einem Thema zusammen, z.B. Bibliothekskataloge.',
          topics: ['Literaturrecherche', 'Primär- und Sekundärquellen']
        },
        {
          id: 'esf-s2-q07', number: 7, points: 2,
          text: 'Der induktive Ansatz wird oft verwendet...',
          choices: [
            { key: 'A', text: '...wenn ein Thema noch weitgehend unerforscht ist und neue Phänomene untersucht und Theorien bestätigt werden sollen.' },
            { key: 'B', text: '...wenn ein Thema bereits erforscht ist und neue Hypothesen bestätigt werden sollen.' },
            { key: 'C', text: '...wenn ein Thema noch weitgehend unerforscht ist und neue Phänomene untersucht und Theorien gebildet werden sollen.' },
            { key: 'D', text: '...wenn ein Thema bereits erforscht ist und Wissen zusammengefasst werden soll.' }
          ],
          correct: ['C'],
          explanation: 'Der induktive Ansatz wird verwendet, wenn der Wissensstand zu einem Phänomen noch sehr gering ist und keine geeignete Theorie existiert. Basierend auf der Forschungsfrage werden meist qualitative Daten gesammelt und analysiert, mit dem Ziel, eine neue Theorie zu formulieren (nicht zu bestätigen — das wäre deduktiv).',
          topics: ['Induktion vs Deduktion', 'Konzeptualisierung']
        },
        {
          id: 'esf-s2-q08', number: 8, points: 2,
          text: 'Prof. X bildet basierend auf der Flow-Theorie (Flow = "ein vollkommenes Aufgehen in der Tätigkeit") verschiedene Hypothesen, z.B.: "Nur positives Verhalten führt zu einem Flow-Zustand." Um die Hypothesen zu testen, sammelt er Daten mit einem Experiment und wertet diese mit R aus. Welchem Ansatz folgt Prof. X?',
          choices: [
            { key: 'A', text: 'Prof. X folgt dem deduktiven Ansatz.' },
            { key: 'B', text: 'Prof. X folgt dem induktiven Ansatz.' }
          ],
          correct: ['A'],
          explanation: 'Beim deduktiven Ansatz wird vom Allgemeinen (bestehende Theorie) auf das Spezifische (Hypothesen) geschlossen, die dann mit quantitativen Daten getestet werden. Prof. X leitet seine Hypothesen aus einer bestehenden Theorie (Flow-Theorie) ab und testet sie experimentell mit quantitativen Daten — klassisch deduktiv.',
          topics: ['Induktion vs Deduktion', 'Hypothesen']
        },
        {
          id: 'esf-s2-q09', number: 9, points: 2,
          text: 'Eine Hypothese wird typischerweise eingesetzt...',
          choices: [
            { key: 'A', text: '...wenn bereits vertieftes Wissen zu einem bestimmten Thema vorhanden ist.' },
            { key: 'B', text: '...wenn noch kein vertieftes Wissen zu einem bestimmten Thema vorhanden ist.' },
            { key: 'C', text: '...wenn ein qualitatives Forschungsdesign verwendet wird.' },
            { key: 'D', text: '...wenn bereits Daten zur Bestätigung der Hypothese vorliegen.' },
            { key: 'E', text: '...wenn man keine Forschungsfrage formulieren möchte.' }
          ],
          correct: ['A'],
          explanation: 'Hypothesen werden in der Regel in der quantitativen Forschung eingesetzt, d.h. wenn bereits vertieftes Wissen zu einem Thema vorhanden ist. Bei qualitativer Forschung gibt es i.d.R. Forschungsziele, aber keine zu testenden Hypothesen. Eine Hypothese sollte formuliert werden, BEVOR Daten gesammelt werden, und setzt eine zuvor formulierte Forschungsfrage voraus.',
          topics: ['Hypothesen']
        },
        {
          id: 'esf-s2-q10', number: 10, points: 2,
          text: 'Es ist in der Regel wissenschaftlicher...',
          choices: [
            { key: 'A', text: '...eine ungerichtete Hypothese anstelle einer gerichteten Hypothese zu untersuchen.' },
            { key: 'B', text: '...eine gerichtete Hypothese anstelle einer spezifischen Hypothese zu untersuchen.' },
            { key: 'C', text: '...eine Kausalhypothese statt einer nicht-kausalen Hypothese zu untersuchen.' },
            { key: 'D', text: 'Weder noch — es gibt kein "besser" oder "schlechter" bei der Art der Hypothese.' }
          ],
          correct: ['D'],
          explanation: 'Es gibt kein generelles "besser" oder "schlechter" zwischen gerichteten/ungerichteten oder kausalen/nicht-kausalen Hypothesen. Entscheidend ist, dass die gewählte Art der Hypothese zum Forschungsdesign, zur Methode und zur generellen Forschungsfrage passt.',
          topics: ['Hypothesen']
        },
        {
          id: 'esf-s2-q11', number: 11, points: 2,
          text: 'Alternativhypothese: "Verbraucher*innen, die hungrig sind, unterscheiden sich in ihrem Kaufverhalten von denjenigen Verbraucher*innen, die nicht hungrig sind." Wie lautet die zugehörige Nullhypothese?',
          choices: [
            { key: 'A', text: 'Verbraucher*innen, die hungrig sind, unterscheiden sich NICHT in ihrem Kaufverhalten von denjenigen, die nicht hungrig sind.' },
            { key: 'B', text: 'Verbraucher*innen, die hungrig sind, unterscheiden sich in ihrem Kaufverhalten von denjenigen, die nicht hungrig sind.' },
            { key: 'C', text: 'Verbraucher*innen, die hungrig sind, kaufen mehr als diejenigen, die nicht hungrig sind.' },
            { key: 'D', text: 'Es gibt keinen Unterschied zwischen hungrigen und nicht-hungrigen Verbraucher*innen hinsichtlich ihres Geschlechts.' }
          ],
          correct: ['A'],
          explanation: 'Eine Nullhypothese (H0) besagt, dass KEIN Zusammenhang bzw. KEIN Unterschied zwischen den Variablen besteht — sie ist das logische Gegenstück zur Alternativhypothese (H1). H1 behauptet einen Unterschied im Kaufverhalten; H0 verneint diesen Unterschied genau bezogen auf dieselben Variablen (hungrig/nicht hungrig, Kaufverhalten).',
          topics: ['Hypothesen', 'Nullhypothese']
        },
        {
          id: 'esf-s2-q12', number: 12, points: 2,
          text: 'Eine Abbildung zeigt den Zusammenhang zwischen Bildungsniveau (x-Achse) und Einkommen (y-Achse) als zunehmend steil ansteigende Kurve (das Einkommen wächst mit höherem Bildungsniveau immer stärker). Welche Hypothese beschreibt diese Beziehung am besten?',
          choices: [
            { key: 'A', text: 'Je höher das Bildungsniveau, desto höher das Einkommen.' },
            { key: 'B', text: 'Wenn das Bildungsniveau hoch ist, dann ist auch das Einkommen hoch.' },
            { key: 'C', text: 'Es besteht eine inverse Beziehung zwischen Bildungsniveau und Einkommen.' },
            { key: 'D', text: 'Mit steigendem Bildungsniveau nimmt auch das Einkommenswachstum zu.' },
            { key: 'E', text: 'Es besteht eine U-förmige Beziehung zwischen Bildungsniveau und Einkommen.' }
          ],
          correct: ['D'],
          explanation: 'A und B beschreiben nur einen generellen positiven Zusammenhang (linear), erfassen aber nicht, dass die Steigung selbst zunimmt. C (invers) und E (U-förmig) widersprechen der dargestellten durchgehend positiven, zunehmend steilen Kurve. D erfasst präzise, dass nicht nur das Einkommen steigt, sondern auch dessen Wachstumsrate mit dem Bildungsniveau zunimmt — das entspricht einer konvexen (zunehmend steigenden) Kurve.',
          topics: ['Hypothesen', 'Konzeptualisierung']
        },
        {
          id: 'esf-s2-q15', number: 15, points: 2,
          text: 'Die folgenden Aussagen beziehen sich auf den Artikel "AI assessment changes human behavior" (Insight File zu Sitzung 2). Welche Aussage ist zutreffend?',
          choices: [
            { key: 'A', text: 'Bevor die Forschenden ihre Hypothesen experimentell testeten, führten sie Interviews durch, um den "analytical priority lay belief" explorativ zu untersuchen.' },
            { key: 'B', text: '"Wenn Teilnehmende wissen, dass sie von einer KI (vs. von einem Menschen) bewertet werden, wählen sie eine analytischere Herangehensweise." ist eine ungerichtete Hypothese.' },
            { key: 'C', text: 'Die Forschenden arbeiten mit Primärdaten.' },
            { key: 'D', text: 'In einem konzeptionellen Modell würde das allgemeine Vertrauen in KI eine zentrale Rolle spielen.' },
            { key: 'E', text: 'In einem konzeptionellen Modell ist der "Analytical priority lay belief" ein Moderator, da diese Variable den Zusammenhang zwischen "AI assessment" und "analytical task approach" erklärt.' }
          ],
          correct: ['C'],
          explanation: 'Nur C ist richtig: Es handelt sich um ein rein quantitatives, experimentelles Forschungsprojekt über acht Studien hinweg — die Forschenden erheben also Primärdaten. A ist falsch (keine vorgeschalteten explorativen Interviews). B ist falsch — die Hypothese ist **gerichtet**, da sie angibt, welche Gruppe einen höheren Wert aufweist. D ist falsch — nicht das allgemeine Vertrauen in KI, sondern KI- vs. Mensch-Bewertung, Herangehensweise und "analytical priority lay belief" gehören ins Modell. E ist falsch — "Analytical priority lay belief" erklärt die Beziehung zwischen den Variablen und ist daher ein **Mediator**, kein Moderator.',
          topics: ['Konzeptualisierung', 'Primärdaten und Sekundärdaten', 'Hypothesen']
        }
      ]
    },
    {
      id: 'sitzung2-mc',
      title: 'Sitzung 2: Multiple Choice (10 Punkte)',
      description: '5 Fragen zu Forschungsfragentypen, Literaturübersicht, Journals, konzeptionellen Modellen und Theorien. Mehrere Antworten können korrekt sein.',
      points: 10,
      question_type: 'multiple_choice',
      questions: [
        {
          id: 'esf-s2-q03', number: 3, points: 2,
          text: 'Welche der folgenden Forschungsfragen sind KAUSALE Forschungsfragen?',
          choices: [
            { key: 'A', text: '"Beeinflusst die CO2-Menge im Mineralwasser verschiedener Marken deren tägliche Verkaufsmenge in der Schweiz in den Sommermonaten?"' },
            { key: 'B', text: '"Beeinflusst das Format der Produktpräsentation (Print, Online) die Zufriedenheit der Schweizer Konsument*innen nach dem Kauf?"' },
            { key: 'C', text: '"Was ist der Unterschied bezüglich der Spielzeiten zwischen männlichem und weiblichem eSport-Konsum in der Schweiz?"' },
            { key: 'D', text: '"Wie unterscheidet sich die Verwendung von Sozialen Medien bei der Prüfungsvorbereitung von Studierenden vor und während der Coronavirus-Pandemie?"' },
            { key: 'E', text: '"Wie ist das Betriebswirtschaftsstudium an den Schweizer Universitäten strukturiert?"' }
          ],
          correct: ['A', 'B'],
          explanation: 'A und B sind kausale Forschungsfragen: Sie untersuchen, ob ein Phänomen (CO2-Menge bzw. Präsentationsformat) einen kausalen Effekt auf ein anderes (Verkaufsmenge bzw. Zufriedenheit) hat. C und D sind vergleichende Forschungsfragen — sie untersuchen Unterschiede zwischen Gruppen (Geschlecht) bzw. Zeiträumen (vor/während Pandemie). E ist eine deskriptive Forschungsfrage ("Wie ist ... strukturiert?").',
          topics: ['Forschungsfrage', 'Forschungsfragentypen']
        },
        {
          id: 'esf-s2-q04', number: 4, points: 2,
          text: 'Welche der folgenden Elemente sind Teil einer Literaturübersicht?',
          choices: [
            { key: 'A', text: 'Identifizierung von Forschenden, die in einem bestimmten Bereich arbeiten.' },
            { key: 'B', text: 'Bereitstellung eines Rahmens für die eigene Forschung.' },
            { key: 'C', text: 'Identifizierung von Lücken in der Literatur.' },
            { key: 'D', text: 'Einführung in das Forschungsthema.' },
            { key: 'E', text: 'Bereitstellung von Literaturzusammenfassungen, die jeder für seine eigenen Artikel kopieren kann.' }
          ],
          correct: ['A', 'B', 'C', 'D'],
          explanation: 'Eine Literaturübersicht führt in das Themengebiet ein (D), identifiziert relevante Forschende und deren Beiträge (A), ordnet die eigene Forschung in den bestehenden Kontext ein und liefert damit einen Rahmen (B), und identifiziert Forschungslücken (C). E ist falsch: Man darf die Arbeit anderer niemals einfach kopieren — man muss stets auf die Autor*innen verweisen.',
          topics: ['Literaturrecherche', 'Literaturübersicht']
        },
        {
          id: 'esf-s2-q05', number: 5, points: 2,
          text: 'Welche Aussagen zu akademischen Journals und Rankings sind richtig?',
          choices: [
            { key: 'A', text: 'Auf Basis des VHB JOURQUAL Rankings hat ein Journal mit der Metrik A eine höhere Qualität als ein Journal mit Ranking C.' },
            { key: 'B', text: 'Die FT50-Liste gibt eine Übersicht über die 50 relevantesten akademischen Fachzeitschriften in verschiedenen wissenschaftlichen Disziplinen.' },
            { key: 'C', text: 'Qualitätsrankings von akademischen Journals beruhen in der Regel auf der Anzahl der im Journal veröffentlichten Beiträge.' },
            { key: 'D', text: 'Das FT50-Ranking (Financial Times 50) betrachtet ausschliesslich Fachzeitschriften im Finance-Bereich.' },
            { key: 'E', text: 'Google Scholar, Web of Science und Ebsco Host geben das VHB-JOURQUAL-Ranking als Qualitätsmerkmal neben der Anzahl der Zitationen an.' },
            { key: 'F', text: 'Beim VHB-JOURQUAL-Ranking entspricht A+ der besten Bewertung.' }
          ],
          correct: ['A', 'F'],
          explanation: 'Das VHB-JOURQUAL-Ranking reicht von A+ (beste Bewertung) bis D (schlechteste) — A liegt über C, A+ ist die Spitze (A und F korrekt). B ist falsch: FT50 umfasst ausschliesslich wirtschaftswissenschaftliche Zeitschriften, nicht "verschiedene Disziplinen". C ist falsch: Qualität beruht v.a. auf Gutachterverfahren (Peer Review), nicht auf der Artikelanzahl. D ist falsch: FT50 deckt verschiedene wirtschaftswissenschaftliche Bereiche ab, nicht nur Finance. E ist falsch: Diese Datenbanken geben das VHB-Ranking nicht an.',
          topics: ['Literaturrecherche', 'Journal-Rankings']
        },
        {
          id: 'esf-s2-q13', number: 13, points: 2,
          text: 'Welche Aussagen in Hinblick auf ein "konzeptionelles Modell" sind richtig?',
          choices: [
            { key: 'A', text: 'Ist immer völlig unabhängig von den Hypothesen.' },
            { key: 'B', text: 'Gibt die kausale Wechselbeziehung zwischen Variablen wieder.' },
            { key: 'C', text: 'Umfasst nie mehr als drei Variablen.' },
            { key: 'D', text: 'Ziel eines konzeptionellen Modells ist es, die Literaturübersicht graphisch darzustellen.' },
            { key: 'E', text: 'Ziel eines konzeptionellen Modells ist es, die Forschungslücke graphisch darzustellen.' },
            { key: 'F', text: 'Wird in quantitativen Forschungsprojekten verwendet.' },
            { key: 'G', text: 'Wird in qualitativen Forschungsprojekten verwendet.' }
          ],
          correct: ['B', 'F'],
          explanation: 'Ein konzeptionelles Modell veranschaulicht die erwartete kausale Wechselbeziehung zwischen Variablen (B) und wird in der quantitativen Forschung verwendet (F). Es ist NICHT unabhängig von den Hypothesen (A falsch), kann mehr als drei Variablen umfassen, z.B. mit Mediatoren (C falsch), stellt nicht die Literaturübersicht (D) oder Forschungslücke (E) graphisch dar, und wird nicht in qualitativer Forschung verwendet (G falsch).',
          topics: ['Konzeptualisierung', 'Konzeptionelles Modell']
        },
        {
          id: 'esf-s2-q14', number: 14, points: 2,
          text: 'Welche Aussagen zu Theorien sind korrekt?',
          choices: [
            { key: 'A', text: 'Theorien können wissenschaftlich getestet werden.' },
            { key: 'B', text: 'Theorien sind, im Gegensatz zu Hypothesen, nicht verwerfbar.' },
            { key: 'C', text: 'Neue Theorien können aus dem Prozess der Untersuchung empirischer Daten entstehen.' },
            { key: 'D', text: 'Theorien erhöhen das Bewusstsein für Zusammenhänge von Variablen.' }
          ],
          correct: ['A', 'C', 'D'],
          explanation: 'Theorien werden getestet, indem aus ihnen Hypothesen abgeleitet und empirisch geprüft werden (A korrekt). Neue Theorien können aus der Analyse empirischer Daten entstehen, z.B. im Rahmen induktiver Forschung (C korrekt). Theorien erhöhen das Verständnis von Zusammenhängen zwischen Variablen (D korrekt). B ist falsch: Auch Theorien sind verwerfbar bzw. anpassbar — sprechen neue empirische Erkenntnisse gegen eine etablierte Theorie, muss diese angepasst oder verworfen werden.',
          topics: ['Konzeptualisierung', 'Theorie vs. Empirie']
        }
      ]
    }
  ]
};
