// ── Lernset Data ──────────────────────────────────────────────────────────
// "Lernset"-Modus: interaktive Übungen neben den Lernkarten und Quizzen
// Format: { id, type, course, topic, difficulty(1-3), tags[], ...typ-spezifische Felder }
//
// Typen:
//   "order"     — Reihenfolge: items[] in der RICHTIGEN Reihenfolge angeben.
//                  Wird beim Anzeigen gemischt; User muss sie zurück in die
//                  korrekte Reihenfolge bringen (Drag oder Pfeile).
//   "truefalse" — Wahr/Falsch: statements[] = [{ text, isTrue, explanation }]
//   "single"    — Single Choice: question, options[], correctIndex, explanation
//   "multiple"  — Multiple Choice: question, options[], correctIndices[], explanation

(function() {
window.LERNSET_DATA = [

// ════════════════════════════════════════════════════════════════
// MAKROII — Finanzmärkte & Geldpolitik (Themenblock 1)
// ════════════════════════════════════════════════════════════════

// ── Reihenfolge ──────────────────────────────────────────────────
{
  "id": "makro01-order-01", "type": "order", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 2,
  "tags": ["Wirkungskette", "Geldpolitik", "Transmission"],
  "prompt": "Bringe die Wirkungskette der Geldpolitik in die richtige Reihenfolge:",
  "items": [
    "Geldpolitik (Leitzinsänderung)",
    "Erwartungen",
    "Preise von Vermögenswerten",
    "Wirtschaftsaktivität"
  ],
  "explanation": "Die Zentralbank verändert den Leitzins → dies beeinflusst die Erwartungen der Marktteilnehmer (z.B. über künftige Zinsen) → diese Erwartungen wirken auf die Preise von Vermögenswerten (Anleihen, Aktien, Immobilien) → welche wiederum über Konsum und Investitionen die gesamtwirtschaftliche Aktivität beeinflussen (mit Feedback zurück auf ökonomische Entscheidungen)."
},

{
  "id": "makro01-order-02", "type": "order", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 3,
  "tags": ["QE", "Transmission", "Zinsstrukturkurve"],
  "prompt": "Bringe den Wirkungskanal von Quantitative Easing (QE) in die richtige Reihenfolge:",
  "items": [
    "Zentralbank kauft Staatsanleihen am Markt",
    "Nachfrage nach diesen Anleihen steigt (Angebot unverändert)",
    "Anleihepreise steigen, Renditen sinken",
    "Mittel- und langfristige Zinsen sinken"
  ],
  "explanation": "QE wirkt über Angebot und Nachfrage: Die Zentralbank kauft grossvolumig Anleihen → bei unverändertem Angebot steigt deren Preis und die Rendite sinkt → dadurch sinken die mittel- und langfristigen Zinsen, selbst wenn der kurzfristige Leitzins bereits an der Nullzinsgrenze (ZLB) liegt."
},

// ── Wahr/Falsch ──────────────────────────────────────────────────
{
  "id": "makro01-tf-01", "type": "truefalse", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 2,
  "tags": ["Anleihen", "Zinsstrukturkurve", "Prüfungsfalle"],
  "prompt": "Anleihen & Zinsstrukturkurve — wahr oder falsch?",
  "statements": [
    {
      "text": "Sinkt der Zins i1t, steigt der Preis P1t einer einjährigen Nullkuponanleihe.",
      "isTrue": true,
      "explanation": "Anleihepreis und Rendite (Zins) bewegen sich invers zueinander (Prüfungsfalle 1)."
    },
    {
      "text": "Eine normale (steigende) Zinsstrukturkurve bedeutet, dass der Markt fallende künftige Kurzfristzinsen erwartet.",
      "isTrue": false,
      "explanation": "Eine normale/steigende Kurve bedeutet das Gegenteil: Der Markt erwartet STEIGENDE künftige Kurzfristzinsen."
    },
    {
      "text": "Eine inverse (fallende) Zinsstrukturkurve gilt häufig als Rezessionsindikator.",
      "isTrue": true,
      "explanation": "Inverse Kurven signalisieren erwartete sinkende Kurzfristzinsen und werden oft als Vorbote einer Rezession interpretiert."
    },
    {
      "text": "Die Zinsstrukturkurve zeigt den Zusammenhang zwischen dem Preis und der Rendite einer Anleihe.",
      "isTrue": false,
      "explanation": "Die Zinsstrukturkurve zeigt Rendite vs. Laufzeit (für Anleihen mit gleichem Ausfallrisiko) — nicht Rendite vs. Preis."
    },
    {
      "text": "Liquiditäts- und Risikoprämien können die Form der Zinsstrukturkurve verändern, ohne dass sich die reinen Zinserwartungen ändern.",
      "isTrue": true,
      "explanation": "Langfristige Zinsen enthalten zusätzlich Liquiditäts- und Risikoprämien — Rückschlüsse von der Kurvenform auf reine Zinserwartungen sind daher nur bedingt möglich."
    }
  ]
},

{
  "id": "makro01-tf-02", "type": "truefalse", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 3,
  "tags": ["QE", "Zentralbankbilanz", "Prüfungsfalle"],
  "prompt": "Quantitative Easing (QE) — wahr oder falsch?",
  "statements": [
    {
      "text": "QE führt zu einem Anstieg der Zentralbankreserven (Geldbasis).",
      "isTrue": true,
      "explanation": "QE erhöht die Reserven der Geschäftsbanken bei der Zentralbank — empirisch ist das Verhältnis Geldbasis/BIP dadurch z.B. in den USA stark gestiegen."
    },
    {
      "text": "QE ist gleichbedeutend mit 'Gelddrucken' im engeren Sinn.",
      "isTrue": false,
      "explanation": "'QE = Gelddrucken' ist eine Vereinfachung. Ob die breitere Geldmenge (M1) steigt, hängt davon ab, ob Banken die zusätzlichen Reserven für Kredite nutzen."
    },
    {
      "text": "QE verändert nur die Aktivseite der Zentralbankbilanz, nicht die Passivseite.",
      "isTrue": false,
      "explanation": "QE verändert BEIDE Seiten der Bilanz: Aktivseite (mehr Wertpapiere) und Passivseite (mehr Reserven der Geschäftsbanken)."
    },
    {
      "text": "QE ist ein unkonventionelles (unorthodoxes) geldpolitisches Instrument.",
      "isTrue": true,
      "explanation": "QE wird typischerweise eingesetzt, wenn der kurzfristige Leitzins bereits an der Nullzinsgrenze (ZLB) liegt und konventionelle Zinspolitik nicht mehr wirkt."
    },
    {
      "text": "Ob QE die Geldmenge M1 erhöht, hängt davon ab, ob Banken die zusätzlichen Reserven für Kreditvergabe nutzen.",
      "isTrue": true,
      "explanation": "Banken können die zusätzlichen Reserven auch einfach halten, statt sie als Kredite in den Wirtschaftskreislauf zu geben — das ist der entscheidende Unterschied zu 'Gelddrucken' im engeren Sinn."
    }
  ]
},

{
  "id": "makro01-tf-03", "type": "truefalse", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 3,
  "tags": ["Aktienkurse", "Geldpolitik", "Spekulationsblasen", "Prüfungsfalle"],
  "prompt": "Aktienkurse & Geldpolitik — wahr oder falsch?",
  "statements": [
    {
      "text": "Eine vollständig antizipierte geldpolitische Massnahme verändert die Aktienkurse nicht.",
      "isTrue": true,
      "explanation": "War die Massnahme bereits erwartet, ist die Information bereits in den Kursen eingepreist — es gibt keine zusätzliche Reaktion."
    },
    {
      "text": "Eine Zinserhöhung führt immer zu fallenden Aktienkursen.",
      "isTrue": false,
      "explanation": "Die Reaktion ist nicht eindeutig: Eine Zinserhöhung kann auch zu steigenden Kursen führen, wenn sie als Signal für bessere Konjunkturaussichten und höhere künftige Dividenden interpretiert wird."
    },
    {
      "text": "Eine höhere Risikoprämie x senkt ceteris paribus den heutigen Aktienpreis Qt.",
      "isTrue": true,
      "explanation": "Eine höhere Risikoprämie erhöht den Diskontsatz (i + x) und senkt damit den Barwert der erwarteten Dividenden, also Qt."
    },
    {
      "text": "Alle Abweichungen vom Fundamentalwert einer Aktie sind rationale Spekulationsblasen.",
      "isTrue": false,
      "explanation": "Nicht jede Abweichung ist eine rationale Blase — Abweichungen können auch durch übermässigen Optimismus (Verhaltensökonomik), also irrational, entstehen."
    }
  ]
},

// ── Single Choice ────────────────────────────────────────────────
{
  "id": "makro01-single-01", "type": "single", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 2,
  "tags": ["Barwert", "Ewige Rente", "Formel"],
  "question": "Wie lautet die Formel für den Barwert Vt einer ewigen Rente mit konstantem Zahlungsstrom z (ab t+1) und konstantem Zins i > 0?",
  "options": [
    "Vt = z / (1 + i)",
    "Vt = z / i",
    "Vt = z · i",
    "Vt = z · (1 + i)"
  ],
  "correctIndex": 1,
  "explanation": "Vt = z / i. Der Ausdruck z/(1+i) ist nur der Barwert der ERSTEN Zahlung, nicht der gesamten ewigen Rente — eine häufige Verwechslung."
},

{
  "id": "makro01-single-02", "type": "single", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 3,
  "tags": ["Zinsstrukturkurve", "Arbitrage", "Formel"],
  "question": "Welche Approximationsformel beschreibt den Zusammenhang zwischen dem zweijährigen Zins i2t und den (erwarteten) einjährigen Zinsen?",
  "options": [
    "i2t ≈ ½ · (i1t + i1t+1^e)",
    "i2t ≈ i1t · i1t+1^e",
    "i2t ≈ i1t + i1t+1^e",
    "i2t ≈ ½ · (i1t − i1t+1^e)"
  ],
  "correctIndex": 0,
  "explanation": "Der zweijährige Zins ist approximativ das arithmetische Mittel aus dem heutigen einjährigen Zins und dem für nächstes Jahr erwarteten einjährigen Zins: i2t ≈ ½(i1t + i1t+1^e)."
},

{
  "id": "makro01-single-03", "type": "single", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 2,
  "tags": ["Aktienkurse", "Risikoprämie", "Komparative Statik"],
  "question": "Was passiert mit dem fundamentalen Aktienpreis Qt, wenn die Risikoprämie x steigt (ceteris paribus)?",
  "options": [
    "Qt steigt",
    "Qt sinkt",
    "Qt bleibt unverändert",
    "Qt wird unendlich gross"
  ],
  "correctIndex": 1,
  "explanation": "Eine höhere Risikoprämie x erhöht den Diskontsatz (i1t + x) im Nenner — der Barwert der erwarteten Dividenden und damit Qt sinkt."
},

{
  "id": "makro01-single-04", "type": "single", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 1,
  "tags": ["Anleihen", "Grundbegriffe"],
  "question": "Was zahlt eine Nullkuponanleihe (Diskontanleihe) während der Laufzeit?",
  "options": [
    "Periodische Kuponzahlungen plus Nennwert am Ende",
    "Nur eine einzige Summe (Nennwert) am Ende der Laufzeit",
    "Nur periodische Kuponzahlungen, keinen Nennwert",
    "Variable Zahlungen je nach Marktzins"
  ],
  "correctIndex": 1,
  "explanation": "Eine Nullkuponanleihe zahlt keine Zwischenzahlungen — nur den Nennwert (Nominalwert) am Ende der Laufzeit."
},

// ── Multiple Choice ──────────────────────────────────────────────
{
  "id": "makro01-multi-01", "type": "multiple", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 3,
  "tags": ["QE", "Zentralbankbilanz", "Prüfungsfalle"],
  "question": "Welche der folgenden Aussagen zu Quantitative Easing (QE) sind korrekt?",
  "options": [
    "QE erhöht die Zentralbankreserven (Geldbasis).",
    "QE ist gleichzusetzen mit 'Gelddrucken' im engeren Sinn.",
    "QE ist ein unkonventionelles geldpolitisches Instrument.",
    "QE verändert nur die Aktivseite der Zentralbankbilanz."
  ],
  "correctIndices": [0, 2],
  "explanation": "QE erhöht die Reserven (Aktiv- UND Passivseite der Bilanz ändern sich gleichermassen). Es ist ein unkonventionelles Instrument — aber 'Gelddrucken' im engeren Sinn nur, wenn Banken die Reserven tatsächlich für zusätzliche Kredite nutzen."
},

{
  "id": "makro01-multi-02", "type": "multiple", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 3,
  "tags": ["Aktienkurse", "Komparative Statik", "Formel"],
  "question": "Welche der folgenden Aussagen zur komparativen Statik des Aktienpreises Qt sind korrekt?",
  "options": [
    "Eine steigende erwartete Dividende Dt+1^e erhöht Qt.",
    "Ein steigender heutiger oder erwarteter Zins it senkt Qt.",
    "Eine steigende Risikoprämie x erhöht Qt.",
    "Ein höherer Zins erhöht den Diskontsatz und senkt damit den Barwert der erwarteten Dividenden."
  ],
  "correctIndices": [0, 1, 3],
  "explanation": "Höhere erwartete Dividenden erhöhen Qt; ein höherer (heutiger oder erwarteter) Zins erhöht den Diskontsatz und senkt dadurch den Barwert der Dividenden, also Qt. Eine steigende Risikoprämie x SENKT Qt (nicht: erhöht) — diese Aussage ist falsch."
},

{
  "id": "makro01-multi-03", "type": "multiple", "course": "MakroII",
  "topic": "Finanzmärkte & Geldpolitik", "difficulty": 2,
  "tags": ["Geldpolitik", "Aktienkurse", "Erwartungen"],
  "question": "Welche Aussagen zur Reaktion des Aktienmarktes auf eine Zinsänderung sind korrekt?",
  "options": [
    "Eine unerwartete Zinssenkung erhöht ceteris paribus den fundamentalen Aktienpreis.",
    "Eine Zinserhöhung führt immer und eindeutig zu fallenden Aktienkursen.",
    "Eine Zinserhöhung kann mit positiver Signalwirkung (bessere Konjunkturaussichten) auch zu steigenden Kursen führen.",
    "Die Reaktion des Aktienmarktes hängt von den Erwartungen der Investoren vor der Massnahme ab."
  ],
  "correctIndices": [0, 2, 3],
  "explanation": "Die Reaktion ist generell unklar/kontextabhängig: Unerwartete Zinssenkungen erhöhen typischerweise den Kurs (niedrigere Diskontierung), aber auch Zinserhöhungen können über Signalwirkung zu steigenden Kursen führen. 'Immer eindeutig' ist daher falsch."
},


// ════════════════════════════════════════════════════════════════
// OM — Block 3/4: Bootstrapping & Supply Chain Management
// ════════════════════════════════════════════════════════════════

// ── Bootstrapping in der Produktion ──────────────────────────────
{
  "id": "om-bs-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 3 — Production & Quality Management", "difficulty": 2,
  "tags": ["Bootstrapping", "Statistik", "Prüfungsfalle", "Konfidenzintervall"],
  "question": "Ein Produktionsleiter testet einen Roboter seines Hauptlieferanten in China. Er hat eine kleine Stichprobe von Messwerten und möchte Bootstrapping anwenden. Welche der folgenden Aussagen über Bootstrapping treffen zu? (Mehrfachauswahl)",
  "options": [
    "Bootstrapping kann angewendet werden, selbst wenn keine Annahmen zur Verteilung der Stichproben bekannt sind.",
    "Bootstrapping kann angewendet werden — dass die Datenmenge klein ist, ist kein grundlegendes Hindernis.",
    "Umso grösser das angenommene Konfidenzniveau (z.B. 95% statt 90%), desto präziser kann eine Hypothese abgesichert werden.",
    "In diesem Fall empfiehlt sich ein Hypothesentest für eine abhängige Stichprobe (Dependent Sample Hypothesis Testing).",
    "Erstellt man 25 Bootstrap-Stichproben, erhält man ein verlässliches Resultat."
  ],
  "correctIndices": [0, 1, 2],
  "explanation": "A ✓: Bootstrapping ist verteilungsfrei — keine parametrischen Annahmen nötig. B ✓: Kleine Stichproben sind kein Ausschlusskriterium. C ✓: Höheres Konfidenzniveau → breiteres Intervall → stärkere (konservativere) Absicherung. D ✗: Es liegt keine abhängige Stichprobe vor (kein Vorher-Nachher-Design). E ✗: 25 Bootstraps sind nicht ausreichend — in der Praxis mindestens 500–1000."
},

{
  "id": "om-bs-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 3 — Production & Quality Management", "difficulty": 2,
  "tags": ["Bootstrapping", "Statistik", "Prüfungsfalle"],
  "prompt": "Bootstrapping — wahr oder falsch?",
  "statements": [
    {
      "text": "Bootstrapping setzt voraus, dass die Daten normalverteilt sind.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Bootstrapping ist gerade dann wertvoll, wenn die Verteilung unbekannt ist. Es zieht mit Zurücklegen aus der vorhandenen Stichprobe — keine Verteilungsannahme nötig."
    },
    {
      "text": "Eine sehr kleine Stichprobe (z.B. n = 10) macht Bootstrapping grundsätzlich unzulässig.",
      "isTrue": false,
      "explanation": "Kleine Stichproben sind kein grundlegendes Hindernis. Bootstrapping kann auch bei kleinem n angewendet werden — die Qualität der Schätzung leidet zwar, aber die Methode ist anwendbar."
    },
    {
      "text": "Ein höheres Konfidenzniveau (95% statt 90%) führt zu einem breiteren Konfidenzintervall.",
      "isTrue": true,
      "explanation": "Höheres Konfidenzniveau → man muss mehr Bereich des Bootstrap-Verteilung abdecken → das Intervall wird breiter (präzisere Absicherung, aber weniger informativ)."
    },
    {
      "text": "25 Bootstrap-Stichproben genügen für ein verlässliches Resultat.",
      "isTrue": false,
      "explanation": "25 Bootstraps sind viel zu wenig. In der Praxis werden mindestens 500, besser 1000–10000 Bootstrap-Ziehungen empfohlen, damit die Bootstrap-Verteilung stabil ist."
    },
    {
      "text": "Bootstrapping zieht wiederholt Stichproben mit Zurücklegen aus der vorhandenen Stichprobe.",
      "isTrue": true,
      "explanation": "Das ist das Kernprinzip: Aus der Originalstichprobe (n Beobachtungen) werden viele neue Stichproben gleicher Grösse mit Zurücklegen gezogen — jede kann dieselbe Beobachtung mehrfach enthalten."
    }
  ]
},

{
  "id": "om-bs-single-01", "type": "single", "course": "OM",
  "topic": "Block 3 — Production & Quality Management", "difficulty": 1,
  "tags": ["Bootstrapping", "Statistik"],
  "question": "Wie viele Bootstrap-Stichproben werden in der Praxis mindestens empfohlen, um ein verlässliches Resultat zu erhalten?",
  "options": ["25", "100", "500–1000", "Exakt 50"],
  "correctIndex": 2,
  "explanation": "In der Praxis gelten 500–1000 Bootstrap-Wiederholungen als Mindeststandard für stabile Ergebnisse. 25 oder 100 Wiederholungen sind zu wenig — die geschätzte Bootstrap-Verteilung wäre zu stark vom Zufall abhängig."
},

// ── Bullwhip Effect ───────────────────────────────────────────────
{
  "id": "om-sc-order-01", "type": "order", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 1,
  "tags": ["Bullwhip-Effect", "Supply-Chain", "Wirkungskette"],
  "prompt": "Bringe die Parteien einer typischen Supply Chain in der Reihenfolge des Güterflusses (upstream → downstream) an:",
  "items": ["Supplier", "Manufacturer", "Wholesaler", "Retailer"],
  "explanation": "Güter fliessen von Supplier → Manufacturer → Wholesaler → Retailer (downstream). Bestellinformationen fliessen in umgekehrter Richtung (upstream). Der Bullwhip-Effekt beschreibt, wie Nachfrageschwankungen beim Retailer sich upstream verstärken."
},

{
  "id": "om-sc-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 2,
  "tags": ["Bullwhip-Effect", "Prüfungsfalle", "Supply-Chain"],
  "prompt": "Bullwhip-Effekt — wahr oder falsch?",
  "statements": [
    {
      "text": "Der Bullwhip-Effekt tritt nur auf, wenn die Endkundennachfrage stark schwankt.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Der Bullwhip-Effekt tritt auch bei konstanter, flacher Endkundennachfrage auf. Die Nachfrageschwankungen entstehen durch das Bestellverhalten der verschiedenen Supply-Chain-Stufen selbst."
    },
    {
      "text": "Der Bullwhip-Effekt führt gleichzeitig zu Stockouts UND Overstock in der Supply Chain.",
      "isTrue": true,
      "explanation": "Genau: Hohe Schwankungen bedeuten Phasen mit zu wenig Bestand (Stockout) und Phasen mit zu viel (Overstock). Diese treten in verschiedenen Perioden oder bei verschiedenen Parteien gleichzeitig auf."
    },
    {
      "text": "Je weiter upstream in der Supply Chain, desto kleiner die Nachfrageschwankungen.",
      "isTrue": false,
      "explanation": "Das Gegenteil: Schwankungen verstärken sich upstream. Beim Supplier sind die Ausschläge am grössten — daher 'Bullwhip' (Peitsche: kleiner Ruck am Griff = grosser Ausschlag am Ende)."
    },
    {
      "text": "Niedrige Maschinenauslastung (Utilization) ist eine direkte Konsequenz des Bullwhip-Effekts.",
      "isTrue": true,
      "explanation": "Schwankende Nachfrage führt zu Phasen von Überauslastung und Unterauslastung. Niedrige durchschnittliche Utilization senkt die Profitabilität der Maschinen und Anlagen."
    },
    {
      "text": "Der Bullwhip-Effekt kann durch bessere Informationsweitergabe in der Supply Chain reduziert werden.",
      "isTrue": true,
      "explanation": "Einer der Hauptgründe für den Bullwhip-Effekt ist fehlende Transparenz über die tatsächliche Endkundennachfrage. Wenn alle Parteien Echtzeit-Verkaufsdaten des Retailers sehen (z.B. VMI), werden Überreaktionen im Bestellverhalten reduziert."
    }
  ]
},

{
  "id": "om-sc-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 2,
  "tags": ["Bullwhip-Effect", "Konsequenzen", "Supply-Chain"],
  "question": "Welche der folgenden Konsequenzen werden direkt durch den Bullwhip-Effekt verursacht? (Mehrfachauswahl)",
  "options": [
    "Stockouts (Fehlmengen) bei Nachfragespitzen",
    "Overstock (Überbestand) in Niedrigphasen",
    "Niedrige Maschinenauslastung in bestimmten Perioden",
    "Stabile, vorhersagbare Cycle Times",
    "Höhere Gesamtkosten in der Supply Chain"
  ],
  "correctIndices": [0, 1, 2, 4],
  "explanation": "Alle ausser D sind direkte Folgen. D ist falsch: Der Bullwhip-Effekt erhöht und destabilisiert Cycle Times — er macht sie gerade NICHT stabil und vorhersagbar. Stockouts, Overstock, niedrige Auslastung und höhere Gesamtkosten sind die vier Kernkonsequenzen aus dem Lecture-Video."
},

{
  "id": "om-sc-single-01", "type": "single", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 1,
  "tags": ["Bullwhip-Effect", "Definition"],
  "question": "Was beschreibt der Begriff 'Cycle Time' im Kontext des Bullwhip-Effekts?",
  "options": [
    "Die Zeit zwischen zwei aufeinanderfolgenden Bestellungen eines Retailers",
    "Die Gesamtzeit zur Produktion und Lieferung einer Einheit Output",
    "Die Dauer eines vollständigen Demand-Forecasting-Zyklus",
    "Die Zeit zwischen Bullwhip-Ausschlägen in der Supply Chain"
  ],
  "correctIndex": 1,
  "explanation": "Cycle Time = Gesamtzeit zur Produktion UND Lieferung einer Einheit Output (Durchlaufzeit). Der Bullwhip-Effekt erhöht und destabilisiert diese Zeit, weil schwankende Auslastung zu unplanbaren Wartezeiten führt."
}

,

// ════════════════════════════════════════════════════════════════
// OM — Block A: Production, SCM & Revenue Management
// Prüfungsvorbereitung FS26 — Q14–Q16, Q20–Q22, Q26–Q28
// ════════════════════════════════════════════════════════════════

// ── MRP II ───────────────────────────────────────────────────────
{
  "id": "om-mrp-order-01", "type": "order", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 1,
  "tags": ["MRP II", "Produktionsplanung", "Wirkungskette"],
  "prompt": "Bringe die 5 Schritte von MRP II in der richtigen Reihenfolge (1 = strategisch/jährlich bis 5 = operativ/täglich):",
  "items": [
    "Business Planning (jährlich)",
    "Sales & Operations Planning (monatlich)",
    "Master Production Scheduling (wöchentlich)",
    "Material Requirements Planning (wöchentlich)",
    "Production Activity Control (täglich)"
  ],
  "explanation": "MRP II hat genau 5 Schritte: von Business Planning (jährlich, strategisch) über S&OP und MPS bis zu MRP (Schritt 4, wöchentlich) und Production Activity Control (täglich, operativ). Merkformel: 5-4-W — 5 Schritte, MRP = Schritt 4, Weekly."
},

{
  "id": "om-mrp-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["MRP II", "Prüfungsfalle", "Produktionsplanung"],
  "prompt": "MRP II — wahr oder falsch?",
  "statements": [
    {
      "text": "MRP (Material Requirements Planning) ist Schritt 4 von MRP II und läuft wöchentlich.",
      "isTrue": true,
      "explanation": "Korrekt: MRP ist Schritt 4 (nicht 3!) und läuft wöchentlich. Prüfungsfalle: viele Studierende verwechseln MRP mit MPS (Schritt 3) oder denken, MRP läuft jährlich."
    },
    {
      "text": "MRP II besteht aus 6 Schritten.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: MRP II hat genau 5 Schritte, nicht 6. Die 5 Schritte: Business Planning → S&OP → MPS → MRP → Production Activity Control."
    },
    {
      "text": "Sales & Operations Planning (Schritt 2) arbeitet mit aggregierten Produktfamilien, nicht mit einzelnen SKUs.",
      "isTrue": true,
      "explanation": "S&OP plant auf Ebene von Produktfamilien (aggregiert) und bezieht Maschinen und Mitarbeiter ein. Einzelne Produkte werden erst im Master Production Scheduling (Schritt 3) geplant."
    },
    {
      "text": "MRP II hat keinen Feedback-Loop — Ist-Daten fliessen nicht zurück in die Planung.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Das Gegenteil ist richtig. MRP II ist ein geschlossener Kreislauf (closed-loop) — Ist-Daten aus der Produktion fliessen zurück an Business Planning. Das unterscheidet MRP II von MRP I."
    },
    {
      "text": "Business Planning (Schritt 1) findet jährlich statt.",
      "isTrue": true,
      "explanation": "Business Planning ist die strategische Ebene und findet jährlich statt. Danach wird monatlich (S&OP), wöchentlich (MPS, MRP) und täglich (Production Activity Control) geplant."
    }
  ]
},

{
  "id": "om-mrp-single-01", "type": "single", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 1,
  "tags": ["MRP II", "Merkformel", "Produktionsplanung"],
  "question": "In welchem Schritt von MRP II findet Material Requirements Planning (MRP) statt — und wie oft?",
  "options": [
    "Schritt 3, monatlich",
    "Schritt 4, wöchentlich",
    "Schritt 4, jährlich",
    "Schritt 5, täglich"
  ],
  "correctIndex": 1,
  "explanation": "MRP = Schritt 4, wöchentlich. Merkformel: 5-4-W — 5 Schritte insgesamt, MRP ist Schritt 4, Weekly (wöchentlich). Schritt 3 ist MPS (Master Production Scheduling), auch wöchentlich, aber nicht MRP."
},

{
  "id": "om-mrp-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["MRP II", "Prüfungsfrage", "Produktionsplanung"],
  "question": "Welche der folgenden Aussagen zu MRP II sind korrekt? (Mehrfachauswahl)",
  "options": [
    "Business Planning ist der erste Schritt und findet jährlich statt.",
    "Sales & Operations Planning plant aggregiert auf Produktfamilien-Ebene (inkl. Maschinen und Mitarbeiter).",
    "MRP (Schritt 4) findet jährlich statt.",
    "MRP II enthält einen Feedback-Loop: Ist-Daten fliessen zurück in die Planung.",
    "MRP II besteht aus 6 Planungsschritten."
  ],
  "correctIndices": [0, 1, 3],
  "explanation": "A ✓ Business Planning = Schritt 1, jährlich. B ✓ S&OP = aggregiert (Produktfamilien, Maschinen + MA). D ✓ MRP II ist closed-loop mit Feedback. C ✗ MRP läuft WÖCHENTLICH, nicht jährlich. E ✗ MRP II hat 5 Schritte, nicht 6."
},

// ── JIT & Sequenzplanung ──────────────────────────────────────────
{
  "id": "om-jit-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["JIT", "Just-in-Time", "Prüfungsfalle", "Sequenzplanung"],
  "prompt": "JIT & Sequenzplanung — wahr oder falsch?",
  "statements": [
    {
      "text": "Just-in-Time basiert auf dem Pull-Prinzip: Nachfrage wird vom Kunden gezogen, nicht vom Hersteller gestossen.",
      "isTrue": true,
      "explanation": "Korrekt: JIT nutzt das Pull-Prinzip (Kanban). Produktion wird erst ausgelöst, wenn tatsächliche Nachfrage vorliegt — im Gegensatz zum Push-Prinzip bei MRP."
    },
    {
      "text": "JIT ist generell besser als MRP II und sollte immer bevorzugt werden.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: JIT ist nicht pauschal besser. JIT eignet sich für stabile, repetitive Nachfrage. MRP II ist besser bei komplexen, variablen Produktionsprogrammen. Der Kontext entscheidet."
    },
    {
      "text": "Standardisierung ist ein zentrales Element von JIT, um Waste zu reduzieren.",
      "isTrue": true,
      "explanation": "Standardisierung gehört zu den JIT-Prinzipien: Einheitliche Prozesse reduzieren Variabilität und damit Verschwendung (Waste / Muda). Standardisierung ist eine der 7 Waste-Kategorien-Gegenmassnahmen."
    },
    {
      "text": "Kein Sequenzierungsregel (SPT, EDD, etc.) ist in allen Situationen überlegen.",
      "isTrue": true,
      "explanation": "Jede Sequenzierungsregel optimiert ein anderes Ziel: SPT (Shortest Processing Time) minimiert durchschnittliche Durchlaufzeit, EDD (Earliest Due Date) minimiert maximale Verspätung. Keine Regel dominiert alle Kriterien gleichzeitig."
    },
    {
      "text": "Sequenzplanung ist nur für produzierende Unternehmen relevant, nicht für Dienstleistungsbetriebe.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Sequenzplanung gilt auch für Services (z.B. Reihenfolge von Patientenbehandlungen im Spital, Warteschlangen bei Callcentern). Das Grundprinzip — optimale Reihenfolge von Aufträgen — ist branchenunabhängig."
    }
  ]
},

{
  "id": "om-jit-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["JIT", "Just-in-Time", "Prüfungsfrage"],
  "question": "Welche der folgenden Aussagen zu Just-in-Time (JIT) sind korrekt? (Mehrfachauswahl)",
  "options": [
    "JIT basiert auf dem Push-Prinzip: Produktion stösst Nachfrage vorwärts.",
    "JIT nutzt das Pull-Prinzip: Nachfrage des Kunden löst Produktion aus.",
    "Standardisierung ist ein wichtiges JIT-Element zur Reduktion von Waste.",
    "JIT ist in jeder Situation besser als MRP II."
  ],
  "correctIndices": [1, 2],
  "explanation": "B ✓ Pull-Prinzip (Kanban). C ✓ Standardisierung reduziert Waste. A ✗ JIT nutzt Pull, nicht Push — Push ist MRP. D ✗ JIT ist nicht pauschal überlegen — Kontext (stabile vs. variable Nachfrage) entscheidet."
},

// ── SCM & Postponement ───────────────────────────────────────────
{
  "id": "om-sc-tf-02", "type": "truefalse", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 2,
  "tags": ["Postponement", "Safety-Stock", "SCM", "Prüfungsfalle"],
  "prompt": "Postponement & SCM — wahr oder falsch?",
  "statements": [
    {
      "text": "Durch Postponement (Risikoausgleich/Pooling) erhöht sich der benötigte Safety Stock insgesamt.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Das Gegenteil! Pooling REDUZIERT den benötigten Safety Stock. Wenn Nachfrageschwankungen verschiedener Märkte teilweise gegenläufig sind, kompensieren sie sich — der Gesamtbestand sinkt."
    },
    {
      "text": "Supply Chain Management umfasst nur den Bereich upstream (Beschaffung), nicht downstream (Vertrieb).",
      "isTrue": false,
      "explanation": "Prüfungsfalle: SCM umfasst die gesamte Kette — Beschaffung (upstream) + Produktion + Versand/Distribution (downstream). Eine Sichtweise nur auf upstream ist falsch und eine häufige Prüfungsfalle."
    },
    {
      "text": "Postponement verschiebt den Customization-Point möglichst nah zum Kunden, um mit generischen Vorprodukten zu arbeiten.",
      "isTrue": true,
      "explanation": "Postponement bedeutet: Endkonfiguration (Customization) wird so spät wie möglich vorgenommen. Vorher werden generische, undifferenzierte Produkte gelagert — das reduziert Safety Stock durch Pooling-Effekte."
    },
    {
      "text": "Quantity Discounts beim Lieferanten können den Bullwhip-Effekt verstärken.",
      "isTrue": true,
      "explanation": "Forward Buying: Wenn Lieferanten Mengenrabatte anbieten, bestellen Kunden bei Promotion viel mehr als nötig und danach wenig. Diese künstlichen Bestellschwankungen verstärken den Bullwhip-Effekt upstream."
    }
  ]
},

{
  "id": "om-sc-multi-02", "type": "multiple", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 2,
  "tags": ["SCM", "Grundlagen", "Prüfungsfrage"],
  "question": "Welche der folgenden Aussagen zu Supply Chain Management (SCM) sind korrekt? (Mehrfachauswahl)",
  "options": [
    "Quantity Discounts beim Lieferanten können den Bullwhip-Effekt auslösen (Forward Buying).",
    "SCM umfasst nur den upstream-Teil der Wertschöpfungskette (Beschaffung).",
    "Konflikte bei Liefermengen zwischen Partnern sind typische SCM-Herausforderungen.",
    "SCM umfasst Beschaffung, Produktion und Versand/Distribution."
  ],
  "correctIndices": [0, 2, 3],
  "explanation": "A ✓ Mengenrabatte → Forward Buying → Bullwhip. C ✓ Liefermengen-Konflikte zwischen Partnern sind klassische SCM-Probleme. D ✓ SCM umfasst die gesamte Kette. B ✗ SCM ist nicht nur upstream — es umfasst die ganze Kette inkl. downstream."
},

{
  "id": "om-sc-multi-03", "type": "multiple", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 2,
  "tags": ["Postponement", "Safety-Stock", "Prüfungsfrage"],
  "question": "Welche der folgenden Aussagen zu Postponement sind korrekt? (Mehrfachauswahl)",
  "options": [
    "Durch Postponement (Pooling) addieren sich die Safety Stocks der Märkte — der Gesamtbestand steigt.",
    "Der Customization-Point kann sowohl nahe beim Kunden als auch nahe beim Hersteller liegen.",
    "Postponement ermöglicht flexible Reaktion auf verschiedene Teilmärkte.",
    "Der Customization-Point liegt bei Postponement immer beim Hersteller, nie beim Kunden."
  ],
  "correctIndices": [1, 2],
  "explanation": "B ✓ Der Customization-Point kann beide Positionen einnehmen — je nach Strategie. C ✓ Flexibilität auf Teilmärkte ist ein Hauptvorteil. A ✗ Prüfungsfalle: Pooling REDUZIERT Safety Stock! D ✗ Prüfungsfalle: Der Punkt liegt bei Postponement eher beim Kunden (späte Differenzierung), kann aber auch näher am Hersteller sein."
},

{
  "id": "om-sc-multi-04", "type": "multiple", "course": "OM",
  "topic": "Block 4 — Supply Chain Management", "difficulty": 2,
  "tags": ["Bullwhip-Effect", "Ursachen", "Prüfungsfrage"],
  "question": "Welche der folgenden Aussagen zum Bullwhip-Effekt sind korrekt? (Mehrfachauswahl)",
  "options": [
    "Der Bullwhip-Effekt verstärkt sich downstream (Richtung Endkunde).",
    "Preisschwankungen und Promotions verstärken den Bullwhip-Effekt.",
    "Forecasts basierend auf Forecasts (Demand Signal Processing) verstärken den Bullwhip-Effekt.",
    "Leerkapazität in der Fabrik ist ein Haupttreiber des Bullwhip-Effekts.",
    "Bessere Koordination und Informationsaustausch reduzieren den Bullwhip-Effekt."
  ],
  "correctIndices": [1, 2, 4],
  "explanation": "B ✓ Preisschwankungen → Forward Buying → Bullwhip. C ✓ Jede Stufe prognostiziert auf Basis der Prognose der nächsten Stufe → Verzerrung wächst. E ✓ Transparenz (z.B. Vendor-Managed Inventory) reduziert Überreaktionen. A ✗ Bullwhip verstärkt sich UPSTREAM (Richtung Lieferant), nicht downstream! D ✗ Leerkapazität ist eine Konsequenz, kein Treiber."
},

// ── Revenue Management ───────────────────────────────────────────
{
  "id": "om-rm-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 5 — Revenue Management", "difficulty": 2,
  "tags": ["Revenue Management", "Prüfungsfalle", "Fencing"],
  "prompt": "Revenue Management — wahr oder falsch?",
  "statements": [
    {
      "text": "Revenue Management setzt konstante, stabile Nachfrage voraus.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Das Gegenteil. RM braucht variable, ungewisse und segmentierbare Nachfrage. Bei konstanter Nachfrage gibt es keinen Grund zur Differenzierung."
    },
    {
      "text": "Niedrige Grenzkosten (z.B. bei Airlines und Hotels) sind eine typische Voraussetzung für Revenue Management.",
      "isTrue": true,
      "explanation": "Niedrige Grenzkosten bedeuten: Eine zusätzlich verkaufte Einheit (Sitzplatz, Zimmer) kostet wenig extra. Dadurch lohnt sich auch ein niedriger Preis für Restkapazität — das ist die Basis für RM-Preisdifferenzierung."
    },
    {
      "text": "Religion ist ein zulässiger Fencing-Mechanismus im Revenue Management.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Religion ist ein UNGÜLTIGER Fence — es wäre Diskriminierung. Gültige Fences sind z.B. Region, Produktvariante, Buchungszeitpunkt, Flexibilität (refundable vs. non-refundable)."
    },
    {
      "text": "Flexibilität (z.B. refundable vs. non-refundable Ticket) ist ein gültiger Fencing-Mechanismus.",
      "isTrue": true,
      "explanation": "Korrekt: Flexibilität ist ein klassischer Fence. Kunden mit hoher Zahlungsbereitschaft buchen oft kurzfristig und flexibel → zahlen mehr. Preissensitive Kunden buchen früh und akzeptieren keine Rückgabe → zahlen weniger."
    },
    {
      "text": "Revenue Management gilt ausschliesslich für physische Produkte, nicht für Dienstleistungen.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: RM ist besonders geeignet für DIENSTLEISTUNGEN mit nicht-lagerbarer Kapazität (Hotels, Airlines, Mietwagen). Bei physischen Produkten mit lagerbarer Kapazität ist RM weniger typisch."
    }
  ]
},

{
  "id": "om-rm-single-01", "type": "single", "course": "OM",
  "topic": "Block 5 — Revenue Management", "difficulty": 1,
  "tags": ["Revenue Management", "Voraussetzungen"],
  "question": "Welche Aussage beschreibt eine FALSCHE Voraussetzung für Revenue Management?",
  "options": [
    "Die Kapazität ist kurzfristig fix und nicht erweiterbar.",
    "Die Nachfrage ist segmentierbar (verschiedene Zahlungsbereitschaften).",
    "Die Nachfrage ist konstant und gut vorhersagbar.",
    "Die Grenzkosten einer zusätzlichen Einheit sind niedrig."
  ],
  "correctIndex": 2,
  "explanation": "C ist FALSCH als Voraussetzung: RM setzt gerade VARIABLE, unsichere Nachfrage voraus — nicht konstante. A, B und D sind echte RM-Voraussetzungen: fixe Kapazität, segmentierbare Nachfrage und niedrige Grenzkosten."
},

{
  "id": "om-rm-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 5 — Revenue Management", "difficulty": 2,
  "tags": ["Revenue Management", "Merkmale", "Prüfungsfrage"],
  "question": "Welche der folgenden Aussagen zu Revenue Management (RM) sind korrekt? (Mehrfachauswahl)",
  "options": [
    "RM nutzt preisabhängige Nachfrage zur Kapazitätsoptimierung.",
    "Kapazitätsoptimierung ist ein Kernziel von RM.",
    "RM gilt ausschliesslich für physische Produkte (nicht Dienstleistungen).",
    "Product Bundling ist eine Technik im Revenue Management."
  ],
  "correctIndices": [0, 1, 3],
  "explanation": "A ✓ Preisabhängige Nachfrage ist Grundlage von RM. B ✓ Kapazitätsoptimierung (wer bekommt welche Kapazität zu welchem Preis?) ist das Kernziel. D ✓ Product Bundling (z.B. Flug + Hotel) gehört zu RM-Techniken. C ✗ RM gilt NICHT nur für Produkte — es ist typisch für Dienstleistungen mit nicht-lagerbarer Kapazität."
},

{
  "id": "om-rm-multi-02", "type": "multiple", "course": "OM",
  "topic": "Block 5 — Revenue Management", "difficulty": 2,
  "tags": ["Revenue Management", "Voraussetzungen", "Prüfungsfrage"],
  "question": "Welche der folgenden Eigenschaften sind typische Voraussetzungen für den Einsatz von Revenue Management? (Mehrfachauswahl)",
  "options": [
    "Kapazität ist verderblich / nicht lagerbar (z.B. Hotelzimmer, Flugplatz).",
    "Nachfrage ist konstant und vorhersagbar.",
    "Niedrige Grenzkosten je zusätzlicher Einheit.",
    "Nachfrage ist segmentierbar in Gruppen mit unterschiedlicher Zahlungsbereitschaft.",
    "Kapazität ist kurzfristig fix."
  ],
  "correctIndices": [0, 2, 3, 4],
  "explanation": "A ✓ Verderbliche/nicht lagerbare Kapazität (perishability). C ✓ Niedrige Grenzkosten ermöglichen Restkapazitäts-Verkauf zu reduzierten Preisen. D ✓ Segmentierbarkeit erlaubt Preisdifferenzierung. E ✓ Fixe Kapazität schafft den Optimierungsdruck. B ✗ FALSCH: RM braucht VARIABLE, unsichere Nachfrage — nicht konstante."
},

{
  "id": "om-rm-multi-03", "type": "multiple", "course": "OM",
  "topic": "Block 5 — Revenue Management", "difficulty": 2,
  "tags": ["Revenue Management", "Fencing", "Prüfungsfalle"],
  "question": "Ein Airline möchte Fencing-Bedingungen einsetzen, um verschiedene Kundensegmente zu trennen. Welche der folgenden Fencing-Mechanismen sind zulässig? (Mehrfachauswahl)",
  "options": [
    "Geographische Region (z.B. anderer Preis für Schweiz vs. Deutschland)",
    "Produktvariante (z.B. Economy vs. Business Class)",
    "Religion des Kunden",
    "Flexibilität (z.B. non-refundable vs. refundable Ticket)",
    "Kapazitätsbeschränkung als grundsätzliches Hindernis für Fencing"
  ],
  "correctIndices": [0, 1, 3],
  "explanation": "A ✓ Region/Geografie ist ein klassischer, gültiger Fence. B ✓ Produktvariante (Economy/Business) ist gültiger Fence. D ✓ Flexibilität (Rückgaberecht) ist gültiger Fence. C ✗ Religion ist ungültig — diskriminierend und rechtlich unzulässig. E ✗ Kapazitätsbeschränkung ist kein Fence-Mechanismus, sondern eine Rahmenbedingung."
}

,

// ════════════════════════════════════════════════════════════════
// OM — Block B: Excel-Formeln (Q10–Q13, Q17–Q19)
// EOQ / EPQ / Newsvendor / Make-or-Buy / Chase-Level / BOM
// ════════════════════════════════════════════════════════════════

// ── EOQ & EPQ ────────────────────────────────────────────────────
{
  "id": "om-eoq-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 2,
  "tags": ["EOQ", "EPQ", "Durchschnittslager", "Prüfungsfalle", "Excel"],
  "prompt": "EOQ & EPQ Formeln — wahr oder falsch?",
  "statements": [
    {
      "text": "Das durchschnittliche Lager (Average Stock) beim EOQ-Modell berechnet sich als Q*/2.",
      "isTrue": true,
      "explanation": "Korrekt: EOQ Avg Stock = Q*/2. Prüfungsfalle: manche Studierende schreiben nochmals die vollständige SQRT-Formel — falsch! Es ist einfach Q_star / 2, also die Zelle mit dem berechneten Q* durch 2 teilen."
    },
    {
      "text": "Das durchschnittliche Lager beim EPQ-Modell berechnet sich ebenfalls als Q*/2 (gleich wie EOQ).",
      "isTrue": false,
      "explanation": "Prüfungsfalle: EPQ Avg Stock = Q*/2 × (1 − d/p). Der Korrekturfaktor (1 − d/p) berücksichtigt, dass während der Produktion gleichzeitig verbraucht wird. Nur EOQ hat einfach Q*/2."
    },
    {
      "text": "Die EPQ-Formel enthält den Korrekturfaktor p/(p−d) im Vergleich zur EOQ-Formel.",
      "isTrue": true,
      "explanation": "EPQ: Q* = SQRT(2·D·S/H · p/(p−d)). Der Faktor p/(p−d) > 1 vergrössert die optimale Losgrösse, weil während der Produktion gleichzeitig Bedarf gedeckt wird."
    },
    {
      "text": "Das EOQ-Modell setzt voraus, dass Nachschub sofort (unendlich schnell) eintrifft.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: EOQ setzt voraus, dass Nachschub auf einen Schlag eintrifft (nicht unendlich schnell produziert wird). Im EPQ-Modell wird hingegen mit endlicher Produktionsrate p gearbeitet."
    },
    {
      "text": "Beim EPQ-Modell gilt: Durchschnittslager = Q*/2 × (1 − d/p), wobei d die Nachfragerate und p die Produktionsrate ist.",
      "isTrue": true,
      "explanation": "Korrekt: EPQ Avg Stock = Q*/2 × (1 − d/p). Wenn p = d (Produktion gleich Verbrauch), wäre der Lager 0 — das macht intuitiv Sinn. In Excel: =F11/2*(1-D5/D6)."
    }
  ]
},

{
  "id": "om-eoq-single-01", "type": "single", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 1,
  "tags": ["EPQ", "Durchschnittslager", "Formel", "Excel"],
  "question": "Welche Excel-Formel berechnet das durchschnittliche Lager beim EPQ-Modell korrekt? (Q_star steht in Zelle F11, d in D5, p in D6)",
  "options": [
    "=SQRT(2*D*S/H * p/(p-d)) / 2",
    "=F11/2",
    "=F11/2*(1-D5/D6)",
    "=F11*(1-D5/D6)"
  ],
  "correctIndex": 2,
  "explanation": "EPQ Avg Stock = Q*/2 × (1−d/p). In Excel: =F11/2*(1-D5/D6). Häufiger Fehler: nochmals die SQRT-Formel schreiben (A) oder den Korrekturfaktor vergessen (B wie bei EOQ). D fehlt die Division durch 2."
},

{
  "id": "om-eoq-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 2,
  "tags": ["EOQ", "EPQ", "Theorie", "Prüfungsfrage"],
  "question": "Welche der folgenden Aussagen zu EOQ und EPQ sind korrekt? (Mehrfachauswahl)",
  "options": [
    "EOQ und EPQ können nicht gleichzeitig für dasselbe Produkt verwendet werden.",
    "Das EPQ-Modell bestimmt die optimale Produktionslosgrösse, um Setup- und Lagerkosten zu minimieren.",
    "Das EOQ-Modell setzt linearen Lagerabbau und gebündelten Nachschub voraus.",
    "Das EPQ-Modell hat einen höheren Average Stock als das EOQ-Modell bei gleichen Parametern."
  ],
  "correctIndices": [0, 1, 2],
  "explanation": "A ✓ EOQ und EPQ können nicht gleichzeitig genutzt werden — EOQ bestellt extern, EPQ produziert intern. B ✓ EPQ minimiert Setup- + Lagerkosten. C ✓ EOQ: linearer Abbau, Nachschub auf einmal. D ✗ EPQ hat KLEINEREN Average Stock weil (1−d/p) < 1 — der Lager baut sich während der Produktion durch gleichzeitigen Verbrauch langsamer auf."
},

// ── Newsvendor / ROP ─────────────────────────────────────────────
{
  "id": "om-news-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 2,
  "tags": ["Newsvendor", "ROP", "Servicegrad", "Prüfungsfalle", "Excel"],
  "prompt": "Newsvendor & ROP Formeln — wahr oder falsch?",
  "statements": [
    {
      "text": "Der ROP (Reorder Point) bei einem Servicegrad von SL berechnet sich als: ROP = μ + NORM.S.INV(SL) × σ",
      "isTrue": true,
      "explanation": "Korrekt: ROP = μ + z × σ, wobei z = NORM.S.INV(SL). In Excel: =E3 + NORM.S.INV(E6)*E5. Diese Formel gibt den Bestellpunkt an, ab dem in (1−SL)% der Fälle Stockout eintritt."
    },
    {
      "text": "In Excel lautet die korrekte Formel für den ROP: =E3*E6 (Mittelwert multipliziert mit Servicegrad).",
      "isTrue": false,
      "explanation": "Prüfungsfalle: =E3*E6 ist FALSCH! Das multipliziert nur μ mit SL — das ergibt keinen Sinn. Korrekt: =E3 + NORM.S.INV(E6)*E5, also μ + z·σ."
    },
    {
      "text": "Der Critical Ratio im Newsvendor-Modell berechnet sich als Cu / (Cu + Co).",
      "isTrue": true,
      "explanation": "CR = Cu/(Cu+Co), wobei Cu = Underage Cost (Kosten bei zu wenig bestellt) und Co = Overage Cost (Kosten bei zu viel bestellt). CR bestimmt den optimalen Servicegrad."
    },
    {
      "text": "Wenn der Critical Ratio < 0.5 ist, sollte man eher mehr bestellen (höherer Bestand).",
      "isTrue": false,
      "explanation": "Prüfungsfalle: CR < 0.5 bedeutet, die Overage Costs überwiegen → man sollte WENIGER bestellen (vorsichtiger). Erst wenn CR > 0.5 lohnt sich ein höherer Bestand."
    },
    {
      "text": "NORM.S.INV(0.98) in Excel gibt den z-Wert zurück, der einem Servicegrad von 98% entspricht.",
      "isTrue": true,
      "explanation": "Korrekt: NORM.S.INV gibt den Quantilwert der Standardnormalverteilung zurück. NORM.S.INV(0.98) ≈ 2.054. Dieser z-Wert multipliziert mit σ ergibt den Safety Stock für 98% Servicegrad."
    }
  ]
},

{
  "id": "om-news-single-01", "type": "single", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 1,
  "tags": ["ROP", "Newsvendor", "Excel", "Formel"],
  "question": "Welche Excel-Formel berechnet den ROP korrekt? (μ in E3, σ in E5, Servicegrad in E6)",
  "options": [
    "=E3*E6",
    "=E3 + E6*E5",
    "=E3 + NORM.S.INV(E6)*E5",
    "=NORM.S.INV(E6) + E3/E5"
  ],
  "correctIndex": 2,
  "explanation": "ROP = μ + NORM.S.INV(SL) × σ → =E3 + NORM.S.INV(E6)*E5. A ist falsch (μ × SL hat keine Bedeutung). B ist falsch (E6 direkt als z-Wert, aber E6 ist der Servicegrad, nicht der z-Wert). D ergibt keinen Sinn."
},

// ── Bullwhip Effect & Order-Up-To Policy ─────────────────────────
{
  "id": "om-sc-single-05", "type": "single", "course": "OM",
  "topic": "Block 4 — SCM & Forecasting", "difficulty": 2,
  "tags": ["Bullwhip", "SCM", "Varianz", "Excel"],
  "question": "Was misst der Bullwhip-Effekt und wie wird er berechnet?",
  "options": [
    "Bullwhip = Var(Demand) / Var(Orders) — misst wie stabil die Nachfrage ist",
    "Bullwhip = Var(Orders) / Var(Demand) — misst wie stark Bestellungen relativ zur Nachfrage schwanken",
    "Bullwhip = Mean(Orders) / Mean(Demand) — misst den durchschnittlichen Bestellüberhang",
    "Bullwhip = Var(Forecast Error) / Var(Demand) — misst die Prognosegenauigkeit"
  ],
  "correctIndex": 1,
  "explanation": "Bullwhip = Var(Orders)/Var(Demand). In Excel: =VAR(L9:L18)/VAR(D9:D18). Wert > 1 bedeutet: Bestellungen schwanken stärker als die Nachfrage. Sinnvoll weil: Demand ist das 'echte Signal', Orders sind die 'Reaktion' — je stärker die Reaktion im Vergleich zum Signal, desto ausgeprägter der Bullwhip-Effekt. HS23: Bullwhip ≈ 19."
},
{
  "id": "om-sc-tf-05", "type": "truefalse", "course": "OM",
  "topic": "Block 4 — SCM & Forecasting", "difficulty": 3,
  "tags": ["Bullwhip", "Target Level", "Order-Up-To", "Prüfungsfalle", "Excel"],
  "prompt": "Bullwhip-Modell: Order-Up-To Policy — wahr oder falsch?",
  "statements": [
    {
      "text": "Der Target Level (Auffüllziel) berechnet sich als: S = (LT+1) × Forecast + z × SQRT(Varianz) × SQRT(LT+1)",
      "isTrue": true,
      "explanation": "Korrekt: S = (LT+1)×E_t + z×σ̂×√(LT+1). Der erste Teil (LT+1)×E_t ist die erwartete Nachfrage über Lead Time + aktuelle Periode. Der zweite Teil ist der Safety Stock. In Excel: =($F$3+1)*E9 + $F$4*SQRT(H9)*SQRT($F$3+1)."
    },
    {
      "text": "Die Error Variance wird berechnet als laufende Varianz der Forecast-Fehler: =VAR($F$9:F11)",
      "isTrue": true,
      "explanation": "Korrekt: VAR($F$9:F11) berechnet die Stichprobenvarianz aller bisherigen Forecast-Fehler (F-Spalte). Je mehr Perioden, desto stabiler die Schätzung. Das $F$9 bleibt fix (Startpunkt), der zweite Bezug läuft mit."
    },
    {
      "text": "Wenn der Bullwhip-Wert = 1 ist, schwanken Bestellungen genauso stark wie die Nachfrage — kein Bullwhip-Effekt.",
      "isTrue": true,
      "explanation": "Korrekt: Bullwhip = 1 bedeutet Var(Orders) = Var(Demand) — perfekte Weitergabe des Nachfragesignals ohne Verstärkung. In der Praxis fast nie erreicht. Wert > 1 = Bullwhip, Wert < 1 theoretisch möglich bei Glättungsstrategien."
    },
    {
      "text": "Der Target Level ohne Forecast-Term — also nur S = z × SQRT(Varianz) × SQRT(LT+1) — ist ausreichend.",
      "isTrue": false,
      "explanation": "Prüfungsfalle HS23: Nur Safety Stock als Target Level vergisst die erwartete Nachfrage über LT+1 Perioden! Resultat: Target Level zu klein → Bestellungen werden wild negativ/positiv → Bullwhip massiv überschätzt (314 statt 19). Immer beide Terme: Basis + Safety Stock."
    },
    {
      "text": "Die Bestellmenge in der Order-Up-To Policy berechnet sich als: Order = Target Level − Actual Inventory − Pipeline Inventory",
      "isTrue": true,
      "explanation": "Korrekt: L_t = I_t − J_t − K_t. Du bestellst so viel, dass deine gesamte Inventory Position (on-hand + pipeline) den Target Level erreicht. Negative Orders bedeuten: Bestand überschreitet bereits den Target → kein Bestellbedarf."
    }
  ]
},

// ── Newsvendor Postponement & f01 ────────────────────────────────
{
  "id": "om-news-single-02", "type": "single", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 2,
  "tags": ["Newsvendor", "Postponement", "f01", "Critical Ratio", "Excel"],
  "question": "Welche Excel-Formel berechnet die partielle Erwartung f01(z*) korrekt? (z* steht in Zelle F7)",
  "options": [
    "=NORM.S.DIST(F7;TRUE)",
    "=NORM.S.DIST(F7;FALSE) - F7*(1-NORM.S.DIST(F7;TRUE))",
    "=NORM.S.INV(F7) - F7*NORM.S.DIST(F7;FALSE)",
    "=1 - NORM.S.DIST(F7;TRUE)"
  ],
  "correctIndex": 1,
  "explanation": "f01(z) = φ(z) − z·(1−Φ(z)). In Excel: φ(z) = NORM.S.DIST(z;FALSE) ist der PDF-Wert, Φ(z) = NORM.S.DIST(z;TRUE) ist der CDF-Wert. Also: =NORM.S.DIST(F7;FALSE)-F7*(1-NORM.S.DIST(F7;TRUE)). Merkhilfe: FALSE=Kurve (φ), TRUE=Fläche (Φ)."
},
{
  "id": "om-news-tf-03", "type": "truefalse", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 3,
  "tags": ["Newsvendor", "Postponement", "Critical Ratio", "Pooling", "Prüfungsfalle"],
  "prompt": "Newsvendor mit Postponement — wahr oder falsch?",
  "statements": [
    {
      "text": "Der Critical Ratio für den Newsvendor mit Penalty-Kosten p und Holding-Kosten h lautet: CR = p / (p + h)",
      "isTrue": true,
      "explanation": "Korrekt: CR = p/(p+h). In Excel: =F5/(F5+F4). Für h=8, p=120: CR = 120/128 = 0.9375. CR > 0.5 → eher mehr bestellen (Strafe fürs Fehlen ist teuer)."
    },
    {
      "text": "Die σ eines gepoolten Lagers berechnet sich als: σ_pool = σ_1 + σ_2 + σ_3 + σ_4 (einfache Summe).",
      "isTrue": false,
      "explanation": "Prüfungsfalle! Einfache Summe ist FALSCH. Korrekt: σ_pool = SQRT(σ_1² + σ_2² + σ_3² + σ_4²) — Wurzel der Summe der Quadrate. In Excel: =SQRT(E13^2+E14^2+E15^2+E16^2). Pooling reduziert σ weil sich Schwankungen teilweise ausgleichen."
    },
    {
      "text": "Die erwarteten Kosten ohne Postponement sind immer höher als mit Postponement, weil Pooling σ reduziert.",
      "isTrue": true,
      "explanation": "Ja: C* = (h+p) × σ × SQRT(LT+1) × f01(z*). Da σ_pool < Σσ_i (Pooling-Effekt), sind die Kosten mit Postponement immer tiefer. Die Einsparung = (ΣC*_i - C*_pool) / ΣC*_i × 100%."
    },
    {
      "text": "Q* mit Lead Time lautet: Q* = μ + z·σ (wie beim Standard-Newsvendor).",
      "isTrue": false,
      "explanation": "Prüfungsfalle! Mit Lead Time LT gilt: Q* = μ·(LT+1) + z·σ·SQRT(LT+1). Der Mittelwert skaliert mit (LT+1), die Standardabweichung nur mit SQRT(LT+1) — weil σ bei unabhängigen Perioden quadratisch wächst."
    }
  ]
},

// ── Newsvendor Theorie: σ vs σ², Inputs, Anwendung ───────────────
{
  "id": "om-news-tf-02", "type": "truefalse", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 2,
  "tags": ["Newsvendor", "ROP", "Servicegrad", "Standardabweichung", "Excel"],
  "prompt": "Newsvendor Formel Q* = μ + z·σ — wahr oder falsch?",
  "statements": [
    {
      "text": "Im Newsvendor-Modell wird σ (Standardabweichung) verwendet, nicht σ² (Varianz), weil σ in der gleichen Einheit wie die Bestellmenge ist.",
      "isTrue": true,
      "explanation": "σ² wäre in 'Einheiten²' — das macht physisch keinen Sinn als Bestellmenge. σ ist in 'Einheiten', genau wie μ und Q*. Wenn σ² gegeben ist: σ = SQRT(σ²). In Excel: E5 = SQRT(E4)."
    },
    {
      "text": "Wenn die Varianz σ² = 144 gegeben ist, setzt man in die Formel Q* = μ + z × 144 ein.",
      "isTrue": false,
      "explanation": "Prüfungsfalle! Niemals σ² direkt einsetzen. Erst umrechnen: σ = SQRT(144) = 12. Dann: Q* = μ + z × 12. In der HS23 Prüfung war σ² = 145 gegeben → σ = 12.04 (Zelle E5 = SQRT(E4))."
    },
    {
      "text": "Der z-Wert NORM.S.INV(0.98) ≈ 2.054 gibt an, wie viele Standardabweichungen über dem Mittelwert 98% der Nachfrage liegen.",
      "isTrue": true,
      "explanation": "Genau: z = NORM.S.INV(SL) ist der Quantilwert der Standardnormalverteilung. z×σ = Safety Stock. Je höher SL, desto grösser z, desto mehr Puffer nötig."
    },
    {
      "text": "Die Formel Q* = μ + z·σ gilt nur für den Newsvendor, nicht für den Reorder Point (ROP).",
      "isTrue": false,
      "explanation": "Die Formel ist identisch für beide! ROP = μ_LT + z·σ_LT (Nachfrage über Lead Time). Newsvendor Q* = μ + z·σ. Beide addieren Safety Stock (z·σ) auf den Mittelwert."
    },
    {
      "text": "Was immer gegeben ist: μ und σ² (oder σ). Was immer berechnet wird: σ = SQRT(σ²), z = NORM.S.INV(SL), dann Q* = μ + z·σ.",
      "isTrue": true,
      "explanation": "Das ist das Standard-Schema in JEDER OM-Prüfung: (1) σ aus σ² berechnen falls nötig, (2) z-Wert via NORM.S.INV(Servicegrad), (3) Q* = μ + z·σ. Die Inputs μ, σ², SL sind immer gegeben — nie Q* direkt."
    }
  ]
},

// ── Make-or-Buy & Chase/Level ─────────────────────────────────────
{
  "id": "om-prod-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["Make-or-Buy", "Chase", "Level", "Prüfungsfalle", "Excel"],
  "prompt": "Make-or-Buy & Chase/Level Strategien — wahr oder falsch?",
  "statements": [
    {
      "text": "Bei der Chase-Strategie wird die Mitarbeiterzahl jeden Monat neu angepasst (ROUNDUP pro Monat).",
      "isTrue": true,
      "explanation": "Chase folgt der Nachfrage: Mitarbeiter_t = ROUNDUP(Demand_t / Output_pro_MA, 0) — für jeden Monat separat. Die Belegschaft schwankt stark, was zu hohen Hire/Fire-Kosten führt."
    },
    {
      "text": "Bei der Level-Strategie wird die Mitarbeiterzahl monatlich angepasst, um Kosten zu sparen.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Level macht das Gegenteil — eine FIXE Mitarbeiterzahl für alle Monate. Diese wird auf Basis des Maximalmonats bestimmt: MAX(alle ROUNDUP-Werte). Dadurch entstehen in schwachen Monaten Überkapazitäten."
    },
    {
      "text": "Beim Make-or-Buy wird für In-house-Produktion die Anzahl Mitarbeiter auf Basis des MAXIMALEN Monatsbedarfs bestimmt.",
      "isTrue": true,
      "explanation": "Korrekt: Bei In-house-Produktion mit fixer Belegschaft stellt man genug Mitarbeiter für den stärksten Monat ein. Formel: ROUNDUP(Max_Demand / Output_pro_MA / Stunden, 0)."
    },
    {
      "text": "Der Kostenvorteil der Chase-Strategie gegenüber Level liegt immer darin, dass die Gesamtkosten kleiner sind.",
      "isTrue": false,
      "explanation": "Nicht immer: Chase ist günstiger wenn Hire/Fire-Kosten niedrig sind und Flexibilität wichtig ist. Level ist günstiger wenn die Überkapazitätskosten geringer als die Anpassungskosten sind. Die Aufgabe berechnet die Differenz — nicht automatisch eine Strategie ist besser."
    }
  ]
},

{
  "id": "om-prod-single-01", "type": "single", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["Chase", "Level", "Excel", "Formel"],
  "question": "Wie wird bei der Level-Strategie die (fixe) Mitarbeiterzahl für alle Monate bestimmt?",
  "options": [
    "AVERAGE aller monatlichen ROUNDUP-Werte",
    "ROUNDUP des Durchschnittsmonats",
    "MAX aller monatlichen ROUNDUP-Werte",
    "MIN aller monatlichen ROUNDUP-Werte"
  ],
  "correctIndex": 2,
  "explanation": "Level: Eine FIXE Mitarbeiterzahl = MAX(ROUNDUP(Demand_1/Output,0), ROUNDUP(Demand_2/Output,0), ...). Man muss den stärksten Monat abdecken können. AVERAGE würde in Spitzenmonaten zu Unterkapazität führen, MIN wäre fast immer zu wenig."
},

// ── BOM ──────────────────────────────────────────────────────────
{
  "id": "om-bom-order-01", "type": "order", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 1,
  "tags": ["BOM", "Bill-of-Materials", "Wirkungskette", "Excel"],
  "prompt": "Bringe die Schritte zur Berechnung der BOM-Gesamtkosten in die richtige Reihenfolge:",
  "items": [
    "Komponenten auf tiefstem Level identifizieren (Level 2 / Einzelteile)",
    "Kosten = Menge × Stückpreis für jede Komponente berechnen",
    "Kosten auf nächsthöheres Level aufsummieren (+ Fertigungskosten)",
    "Schritte wiederholen bis Level 0 (Endprodukt) erreicht"
  ],
  "explanation": "BOM-Kosten immer von unten nach oben (bottom-up): Erst die untersten Komponenten berechnen (Menge × Preis), dann aufaddieren inkl. Fertigungskosten auf jeder Ebene. Niemals top-down! Prüfungsfalle: Menge × Preis = Multiplikation, nicht Addition."
},

{
  "id": "om-bom-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 2,
  "tags": ["BOM", "Bill-of-Materials", "Prüfungsfalle", "Excel"],
  "prompt": "BOM-Kosten in Excel — wahr oder falsch?",
  "statements": [
    {
      "text": "Die Kosten einer BOM-Komponente berechnen sich als Menge × Stückpreis (Multiplikation).",
      "isTrue": true,
      "explanation": "Korrekt: Kosten = Menge * Preis — immer Multiplikation. Prüfungsfalle: viele addieren stattdessen (Menge + Preis), was keinen Sinn ergibt."
    },
    {
      "text": "Bei einem mehrstufigen BOM beginnt die Berechnung beim Endprodukt (Level 0) und arbeitet sich nach unten.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: IMMER bottom-up! Zuerst die tiefsten Komponenten (Level 2, Einzelteile) berechnen, dann nach oben aufsummieren bis Level 0 (Endprodukt). Top-down führt zu Fehlern, weil Unterkomponenten-Kosten noch unbekannt sind."
    },
    {
      "text": "Wenn eine Komponente in mehreren Stellen des BOM vorkommt, wird ihre Menge für jede Verwendung separat multipliziert.",
      "isTrue": true,
      "explanation": "Korrekt: Bei Multi-Level-BOM muss man die Hierarchie beachten. Eine Schraube, die in zwei verschiedenen Baugruppen vorkommt, wird für jede Baugruppe separat mit der jeweiligen Menge multipliziert."
    },
    {
      "text": "Fertigungskosten (Manufacturing Costs) auf einem BOM-Level werden nur einmal am Ende addiert.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Fertigungskosten werden auf JEDER Ebene separat addiert, nicht nur am Ende. Jede Baugruppe hat ihre eigenen Fertigungskosten, die beim Aufsummieren einbezogen werden müssen."
    }
  ]
},

{
  "id": "om-bom-single-01", "type": "single", "course": "OM",
  "topic": "Block 3 — Production Management", "difficulty": 1,
  "tags": ["BOM", "Formel", "Excel"],
  "question": "In welcher Reihenfolge werden BOM-Kosten bei einem mehrstufigen Stücklisten-Baum berechnet?",
  "options": [
    "Top-down: Endprodukt (Level 0) zuerst, dann Baugruppen, dann Einzelteile",
    "Bottom-up: Einzelteile (tiefstes Level) zuerst, dann aufsummieren bis Level 0",
    "Alphabetisch nach Komponentenname",
    "Nach absteigenden Stückkosten (teuerste Komponente zuerst)"
  ],
  "correctIndex": 1,
  "explanation": "Immer bottom-up: Erst die tiefsten Ebenen (Einzelteile) berechnen, dann die Kosten nach oben aufsummieren. Top-down (A) ist unmöglich, weil die Kosten der Unterkomponenten erst bekannt sein müssen, bevor man die übergeordnete Ebene berechnen kann."
}

,

// ════════════════════════════════════════════════════════════════
// OM — Block C: Gesamtüberblick alle 5 Blöcke (Prüfungssimulation)
// Forecasting + Inventory + Production + SCM + Revenue Mgmt
// ════════════════════════════════════════════════════════════════

// ── Forecasting Konzepte (Block 1) ───────────────────────────────
{
  "id": "om-fc-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 1 — Forecasting", "difficulty": 2,
  "tags": ["Forecasting", "MAD", "MAPE", "MEE", "Prüfungsfalle"],
  "prompt": "Forecasting Fehlermaße — wahr oder falsch?",
  "statements": [
    {
      "text": "MEE (Mean Exponential Error) ist ein standardmässiges Fehlermaß in der Prognose.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: MEE existiert NICHT als Standardmaß. Es gibt MAD, MSE, MAPE und Bias — aber kein MEE. Wenn MEE in einer Antwortmöglichkeit steht, immer streichen."
    },
    {
      "text": "MAPE ist einheitenlos und erlaubt den Vergleich von Prognosefehlern über verschiedene Produkte.",
      "isTrue": true,
      "explanation": "Korrekt: MAPE = Ø |Ist−Prognose|/Ist — prozentualer Fehler, daher einheitenlos und produktübergreifend vergleichbar."
    },
    {
      "text": "MSE gewichtet grosse Fehler stärker als kleine Fehler.",
      "isTrue": true,
      "explanation": "Korrekt: MSE verwendet quadratische Fehler — ein Fehler von 10 geht mit 100 ein, ein Fehler von 1 nur mit 1. Grosse Fehler werden überproportional bestraft."
    },
    {
      "text": "Ein Moving Average mit grösserem k reagiert schneller auf Trendveränderungen.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Grösseres k → träger, langsamer. Mehr Perioden werden gemittelt → Veränderungen werden durch ältere Daten abgedämpft. Kleineres k = reaktiver."
    },
    {
      "text": "Holt-Winters ist die beste Methode, wenn Daten sowohl Trend als auch Saisonalität aufweisen.",
      "isTrue": true,
      "explanation": "Korrekt: Holt-Winters (Triple Exponential Smoothing) modelliert explizit Trend UND Saisonalität. Einfaches ES oder MA können beides nicht gleichzeitig abbilden."
    }
  ]
},

{
  "id": "om-fc-single-01", "type": "single", "course": "OM",
  "topic": "Block 1 — Forecasting", "difficulty": 1,
  "tags": ["CMA", "Saisonalität", "Forecasting", "Excel"],
  "question": "Ab welcher Periode t ist der CMA(k=12) zum ersten Mal berechenbar?",
  "options": ["t = 6", "t = 7", "t = 12", "t = 13"],
  "correctIndex": 1,
  "explanation": "CMA(k=12) benötigt zwei überlappende 12er-MAs: einen zentriert bei t=6.5 (t=1..12) und einen bei t=7.5 (t=2..13). Deren Durchschnitt ergibt den CMA bei t=7. Excel: =AVERAGE(AVERAGE(D2:D13), AVERAGE(D3:D14))."
},

{
  "id": "om-fc-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block 1 — Forecasting", "difficulty": 2,
  "tags": ["Forecasting", "Prüfungsfragen", "MAD", "MSE"],
  "question": "Welche der folgenden Aussagen zur Prognosequalität sind korrekt? (Mehrfachauswahl)",
  "options": [
    "Der Mean Error (Bias) ist kein geeignetes finales Gütemaß, weil sich positive und negative Fehler aufheben.",
    "Der MEE (Mean Exponential Error) ist geeignet, wenn Fehlerkosten exponentiell steigen.",
    "MAD und MSE messen beide absolute Fehler — MSE bestraft grosse Abweichungen stärker.",
    "MAPE eignet sich nicht, wenn die tatsächliche Nachfrage Null erreichen kann."
  ],
  "correctIndices": [0, 2, 3],
  "explanation": "A ✓ Bias hebt sich auf — daher zur Endbeurteilung ungeeignet, nur als Tendenzindikator. C ✓ MSE = quadratisch, MAD = linear; MSE bestraft grosse Fehler stärker. D ✓ MAPE Division durch Null bei Null-Nachfrage. B ✗ MEE existiert NICHT als Standardmaß."
},

// ── Inventory Konzepte (Block 2) ─────────────────────────────────
{
  "id": "om-inv-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block 2 — Inventory Management", "difficulty": 2,
  "tags": ["EOQ", "Servicegrad", "Newsvendor", "Prüfungsfalle"],
  "prompt": "Inventory Management — wahr oder falsch?",
  "statements": [
    {
      "text": "Das EOQ-Modell minimiert die Summe aus Bestell- und Lagerkosten.",
      "isTrue": true,
      "explanation": "Korrekt: EOQ (Economic Order Quantity) findet Q*, bei dem Ordering Cost = Holding Cost. Die Summe beider Kostenkurven wird minimiert."
    },
    {
      "text": "Ein Servicegrad (Type I) von 98% bedeutet, dass 98% der Bestellungen vollständig geliefert werden können.",
      "isTrue": false,
      "explanation": "Prüfungsfalle: Type I Servicegrad = Wahrscheinlichkeit, dass kein Stockout in einer Bestellperiode eintritt. 98% bedeutet: In 98% der Nachschubzyklen gibt es keinen Fehlbestand — nicht 98% der Einheiten werden geliefert (das wäre Type II / Fill Rate)."
    },
    {
      "text": "Im Newsvendor-Modell gilt: Je höher der Critical Ratio, desto höher der optimale Bestand.",
      "isTrue": true,
      "explanation": "Korrekt: CR = Cu/(Cu+Co). Hoher CR → hohe Underage Costs → es lohnt sich, mehr zu bestellen. Niedriger CR → hohe Overage Costs → lieber weniger bestellen."
    },
    {
      "text": "Der Reorder Point (ROP) gibt an, bei welcher Lagerbestandsmenge eine neue Bestellung ausgelöst wird.",
      "isTrue": true,
      "explanation": "Korrekt: ROP = d × L (+ Safety Stock bei Unsicherheit). Wenn der Bestand auf den ROP fällt, wird die Bestellung ausgelöst, damit sie genau dann eintrifft, wenn der Bestand Null erreicht."
    }
  ]
},

// ── Gesamtüberblick Prüfungssimulation ───────────────────────────
{
  "id": "om-all-order-01", "type": "order", "course": "OM",
  "topic": "Block C — Gesamtüberblick", "difficulty": 1,
  "tags": ["MRP II", "Prüfungssimulation", "Reihenfolge"],
  "prompt": "Bringe die 5 Themenblöcke in der Reihenfolge ihrer Prüfungsrelevanz (häufigste zuerst):",
  "items": [
    "Forecasting — in jeder Prüfung (sehr hoch)",
    "Inventory Management — in jeder Prüfung (sehr hoch)",
    "Production Management — in ~75% der Prüfungen (hoch)",
    "Supply Chain Management — in ~75% der Prüfungen (hoch)",
    "Revenue Management — in ~60% der Prüfungen (mittel-hoch)"
  ],
  "explanation": "Forecasting und Inventory sind Pflichtthemen in jeder OM-Prüfung. Production und SCM erscheinen in ca. 75% aller Prüfungen. Revenue Management ist etwas seltener (~60%). Für den Endspurt: Blöcke 1+2 haben die höchste Rendite pro Lernstunde."
},

{
  "id": "om-all-multi-01", "type": "multiple", "course": "OM",
  "topic": "Block C — Gesamtüberblick", "difficulty": 3,
  "tags": ["Prüfungssimulation", "Alle Blöcke", "Formeln"],
  "question": "Welche der folgenden Formeln sind korrekt? (Mehrfachauswahl)",
  "options": [
    "EOQ: $Q^* = \\sqrt{\\frac{2 \\cdot D \\cdot S}{H}}$",
    "EPQ Avg Stock: $= Q^*/2$",
    "EPQ Avg Stock: $= Q^*/2 \\cdot (1 - d/p)$",
    "Newsvendor ROP: $= \\mu \\cdot SL$",
    "Newsvendor ROP: $= \\mu + \\text{NORM.S.INV}(SL) \\cdot \\sigma$"
  ],
  "correctIndices": [0, 2, 4],
  "explanation": "A ✓ EOQ-Formel korrekt. C ✓ EPQ Avg Stock braucht Korrekturfaktor (1−d/p). E ✓ Newsvendor ROP = μ + z·σ. B ✗ EPQ Avg Stock ist NICHT gleich EOQ (fehlender Korrekturfaktor). D ✗ μ × SL ist keine sinnvolle Formel."
},

{
  "id": "om-all-single-01", "type": "single", "course": "OM",
  "topic": "Block C — Gesamtüberblick", "difficulty": 2,
  "tags": ["Prüfungssimulation", "Alle Blöcke", "Fallen"],
  "question": "Welche der folgenden Aussagen ist die EINZIGE, die in der OM-Prüfung IMMER falsch ist?",
  "options": [
    "JIT ist in bestimmten Kontexten besser als MRP II.",
    "Bullwhip-Effekt verstärkt sich upstream.",
    "MEE ist ein geeignetes Fehlermaß für Prognosen.",
    "Revenue Management setzt niedrige Grenzkosten voraus."
  ],
  "correctIndex": 2,
  "explanation": "C ist immer falsch: MEE existiert nicht als Standardfehlermaß. A ist situativ wahr (JIT kann besser sein). B ist wahr (Bullwhip geht upstream). D ist wahr (niedrige Grenzkosten sind RM-Voraussetzung)."
},

{
  "id": "om-all-tf-01", "type": "truefalse", "course": "OM",
  "topic": "Block C — Gesamtüberblick", "difficulty": 3,
  "tags": ["Prüfungssimulation", "Alle Blöcke", "Fallen"],
  "prompt": "OM Gesamtcheck — Die 7 grössten Prüfungsfallen. Wahr oder falsch?",
  "statements": [
    {
      "text": "MEE existiert als Standardfehlermaß neben MAD, MSE und MAPE.",
      "isTrue": false,
      "explanation": "FALLE 1: MEE existiert NICHT. Immer streichen."
    },
    {
      "text": "MRP II hat genau 5 Schritte, und MRP läuft als Schritt 4 wöchentlich.",
      "isTrue": true,
      "explanation": "Korrekt: 5 Schritte (nicht 6!), MRP = Schritt 4, wöchentlich (nicht jährlich!). Merkformel: 5-4-W."
    },
    {
      "text": "Newsvendor ROP in Excel: =mu * Servicegrad.",
      "isTrue": false,
      "explanation": "FALLE 3: Formel ist FALSCH. Korrekt: =mu + NORM.S.INV(Servicegrad) * sigma."
    },
    {
      "text": "Der Bullwhip-Effekt verstärkt sich upstream (Richtung Lieferant), nicht downstream.",
      "isTrue": true,
      "explanation": "Korrekt: Kleine Schwankungen beim Endkunden werden auf dem Weg zum Lieferant immer grösser — wie ein Peitschenknall."
    },
    {
      "text": "Postponement (Pooling) reduziert den benötigten Safety Stock.",
      "isTrue": true,
      "explanation": "Korrekt: Pooling kombiniert Nachfrageschwankungen, die sich teilweise ausgleichen → geringerer Gesamt-Safety-Stock. FALLE wäre: 'SS addiert sich' — falsch!"
    },
    {
      "text": "EPQ Durchschnittslager = Q*/2 (gleich wie EOQ).",
      "isTrue": false,
      "explanation": "FALLE 6: EPQ Avg Stock = Q*/2 × (1−d/p). Der Korrekturfaktor fehlt! Nur EOQ hat einfach Q*/2."
    },
    {
      "text": "Religion ist ein ungültiger Fencing-Mechanismus im Revenue Management.",
      "isTrue": true,
      "explanation": "Korrekt: Religion wäre Diskriminierung. Gültige Fences: Region, Produktvariante, Flexibilität (refundable/non-refundable), Buchungszeitpunkt."
    }
  ]
}

,

// ════════════════════════════════════════════════════════════════
// ESF HS2019 — Herbstsemester 2019
// ════════════════════════════════════════════════════════════════

{
  "id": "esf-19-sc-01", "type": "single", "course": "ESF",
  "topic": "Forschungsdesign & Methoden", "difficulty": 1,
  "tags": ["Mixed Methods", "Forschungsdesign", "IKEA"],
  "question": "IKEA befragte 20'000 Menschen in 22 Ländern, interviewte Experten für Industriedesign und Psychologie, besuchte 36 Menschen in ihren Wohnungen und chattete mit 650 Menschen in Online-Communitys. Welches Forschungsdesign macht sich IKEA am ehesten zunutze?",
  "options": [
    "A. Qualitative Forschung",
    "B. Mixed-Methods-Forschung",
    "C. Quantitative Forschung",
    "D. Tiefeninterviews",
    "E. Case Studies"
  ],
  "correctIndex": 1,
  "explanation": "IKEA kombiniert quantitative Methoden (20'000 Befragungen) mit qualitativen Methoden (Experteninterviews, Hausbesuche, Online-Communitys). Der Einsatz beider Methodentypen kennzeichnet Mixed-Methods-Forschung."
},

{
  "id": "esf-19-sc-02", "type": "single", "course": "ESF",
  "topic": "Stichproben & Repräsentativität", "difficulty": 2,
  "tags": ["Repräsentativität", "Stichprobe", "Kritik"],
  "question": "Was trifft auf die Auswahl der Versuchsteilnehmer durch IKEA (20'000 Befragte in 22 Ländern, 36 Hausbesuche, 650 Online-Chats) NICHT zu?",
  "options": [
    "A. Das Befragen von Personen aus unterschiedlichen Ländern kann Aufschluss über verschiedene Kulturen geben.",
    "B. Die empirischen Ergebnisse aus den Experteninterviews decken sich nicht zwingend mit denjenigen aus den Online-Communitys.",
    "C. Das Befragen von Experten in Industriedesign und Psychologie gibt Aufschluss über verschiedene Fachdisziplinen.",
    "D. Die Grösse der Stichprobe von über 20'000 Personen bedeutet, dass die Stichprobe auf jeden Fall repräsentativ ist.",
    "E. Die Stichprobengrösse von 36 Personen wäre für eine quantitative Untersuchung knapp bemessen."
  ],
  "correctIndex": 3,
  "explanation": "Aussage D ist falsch: Repräsentativität hängt von der Methode der Stichprobenziehung ab, nicht allein von der absoluten Grösse. Eine grosse Stichprobe kann trotzdem verzerrt sein (z.B. Selbstselektion). Die Stichprobengrösse allein garantiert keine Repräsentativität."
},

{
  "id": "esf-19-sc-03", "type": "single", "course": "ESF",
  "topic": "Experimente & Studiendesign", "difficulty": 2,
  "tags": ["Experiment", "Randomisierung", "Manipulation"],
  "question": "In einer HSG-Studie werden Kunden zufällig einer von zwei Versuchsgruppen zugeteilt: Feedback zum Exterieur oder Interieur ihrer Fahrzeugkonfiguration. Was für ein Studiendesign liegt vor?",
  "options": [
    "A. Experiment",
    "B. Umfrage",
    "C. Quasi-Experiment",
    "D. Fokusgruppe",
    "E. Beobachtung"
  ],
  "correctIndex": 0,
  "explanation": "Da Versuchspersonen per Zufallsgenerator den Versuchsgruppen zugeteilt werden (Randomisierung) und die unabhängige Variable (Exterieur vs. Interieur Feedback) aktiv manipuliert wird, handelt es sich um ein echtes Experiment — nicht um ein Quasi-Experiment, das keine echte Randomisierung aufweist."
},

{
  "id": "esf-19-sc-04", "type": "single", "course": "ESF",
  "topic": "Forschungslogik: Induktion & Deduktion", "difficulty": 2,
  "tags": ["Induktion", "Deduktion", "Forschungslogik", "Empirie"],
  "question": "Im dialektischen Verhältnis zwischen Theorie und Empirie: Welches Vorgehen beschreibt die Richtung von Theorie zu Empirie (1) und von Empirie zurück zu Theorie (2)?",
  "options": [
    "A. 1) Induktiv; 2) Deduktiv",
    "B. 1) Abduktiv; 2) Induktiv",
    "C. 1) Abduktiv; 2) Deduktiv",
    "D. 1) Deduktiv; 2) Induktiv",
    "E. 1) Induktiv; 2) Abduktiv"
  ],
  "correctIndex": 3,
  "explanation": "Deduktiv: Von der Theorie ausgehend werden Hypothesen abgeleitet und empirisch getestet (Theorie → Empirie). Induktiv: Aus empirischen Beobachtungen werden allgemeine Muster und Theorien abgeleitet (Empirie → Theorie)."
},

{
  "id": "esf-19-sc-05", "type": "single", "course": "ESF",
  "topic": "Gütekriterien: Validität & Reliabilität", "difficulty": 2,
  "tags": ["Validität", "Reliabilität", "Gütekriterien"],
  "question": "In einem Quadrantenmodell mit Validität (hoch/niedrig) auf einer Achse und Reliabilität (hoch/niedrig) auf der anderen: In welchem Quadranten ist die Reliabilität niedrig und die Validität hoch?",
  "options": [
    "A. Quadrant 1",
    "B. Quadrant 2",
    "C. Quadrant 3",
    "D. Quadrant 4",
    "E. In Quadranten 2 und 4"
  ],
  "correctIndex": 1,
  "explanation": "Niedrige Reliabilität + hohe Validität bedeutet: Die Messungen sind im Mittel richtig (valide), aber nicht konsistent reproduzierbar. Im Standardmodell entspricht das Quadrant 2. Wichtig: Reliabilität ist eine notwendige, aber nicht hinreichende Bedingung für Validität — nicht umgekehrt."
},

{
  "id": "esf-19-sc-06", "type": "single", "course": "ESF",
  "topic": "Replikationskrise", "difficulty": 1,
  "tags": ["Replikationskrise", "Open Science", "Wissenschaftstheorie"],
  "question": "Im Jahr 2018 hat die Psychologie-Fachschaften-Konferenz ein Positionspapier zu einem aktuellen Thema erstellt. Um welches Thema handelt es sich?",
  "options": [
    "A. der Redundanz-Krise",
    "B. der Vertrauenskrise",
    "C. des Mere-Measurement-Effekts",
    "D. der Wirtschaftskrise",
    "E. der Replikationskrise"
  ],
  "correctIndex": 4,
  "explanation": "Die Replikationskrise (auch 'replication crisis') beschreibt das Problem, dass viele publizierte wissenschaftliche Ergebnisse sich in Folgestudien nicht reproduzieren lassen. Die Psychologie war eine der ersten Disziplinen, die dieses Problem prominent adressiert hat."
},

{
  "id": "esf-19-sc-07", "type": "single", "course": "ESF",
  "topic": "Hypothesen & Variablen", "difficulty": 2,
  "tags": ["Hypothesen", "gerichtet", "ungerichtet", "UV", "AV"],
  "question": "Hypothese: «Der Verzehr von Schokolade führt zu höherer Zufriedenheit als derjenige von Gummibären». Welche Aussage trifft zu?",
  "options": [
    "A. Die Hypothese ist gerichtet formuliert.",
    "B. Die Hypothese ist nicht gerichtet formuliert.",
    "C. Die Hypothese ist empirisch nicht überprüfbar.",
    "D. Die unabhängige Variable ist Zufriedenheit.",
    "E. Es ist unklar, welches die unabhängige und welches die abhängige Variable ist."
  ],
  "correctIndex": 0,
  "explanation": "Die Hypothese ist gerichtet, weil sie nicht nur einen Unterschied postuliert, sondern auch die Richtung angibt (Schokolade > Gummibären). Die unabhängige Variable (UV) ist der Verzehr (Schokolade vs. Gummibären), die abhängige Variable (AV) ist die Zufriedenheit."
},

{
  "id": "esf-19-sc-08", "type": "single", "course": "ESF",
  "topic": "Stichprobenverfahren", "difficulty": 2,
  "tags": ["Stichprobenverfahren", "Konzentrationsverfahren", "Sampling"],
  "question": "Bei welcher Stichprobe handelt es sich um ein Konzentrationsverfahren?",
  "options": [
    "A. Die Stichprobe besteht aus leicht verfügbaren Personen (z.B. Studierende).",
    "B. Die Stichprobe soll die relativen Häufigkeiten in Kategorien wie Alter und Geschlecht der Population wiedergeben.",
    "C. Am Ende der Untersuchung werden Probanden gebeten, weitere Personen zu benennen (Schneeballsystem).",
    "D. Die Stichprobe besteht aus Personen mit besonderen (seltenen) Eigenschaften (z.B. Millionäre).",
    "E. Die Stichprobe besteht aus zufällig ausgewählten Passanten."
  ],
  "correctIndex": 3,
  "explanation": "Das Konzentrationsverfahren (auch 'purposive sampling' / 'Extremgruppenauswahl') zielt bewusst auf Personen mit besonderen oder seltenen Merkmalen ab. Es ist ein nicht-probabilistisches Verfahren und wird eingesetzt, wenn spezifisches Wissen oder seltene Eigenschaften relevant sind."
},

{
  "id": "esf-19-sc-09", "type": "single", "course": "ESF",
  "topic": "Forschungsprozess & Ethik", "difficulty": 2,
  "tags": ["p-hacking", "Replikationskrise", "Forschungsethik"],
  "question": "Was sollte man im Forschungsprozess auf keinen Fall tun?",
  "options": [
    "A. Die Stichprobe so lange erhöhen, bis der Effekt signifikant wird.",
    "B. Seine Forschung von der Ethikkommission begutachten lassen.",
    "C. Die verwendete Forschungsmethode ausführlich beschreiben, sodass Ergebnisse repliziert werden können.",
    "D. Eine Forschungsfrage wählen, die noch nicht untersucht wurde.",
    "E. Bereits vor Durchführung die entsprechende Analysemethode antizipieren."
  ],
  "correctIndex": 0,
  "explanation": "Das schrittweise Erhöhen der Stichprobe, bis p < .05 erreicht ist, nennt man 'Optional Stopping' — eine Form des p-Hacking. Es führt zu einer erhöhten Wahrscheinlichkeit für falsch-positive Ergebnisse und ist eine der Hauptursachen der Replikationskrise."
},

{
  "id": "esf-19-sc-10", "type": "single", "course": "ESF",
  "topic": "Skalenniveaus & Variablentypen", "difficulty": 2,
  "tags": ["Skalenniveau", "nominal", "ordinal", "intervall", "dichotom"],
  "question": "Welche Aussagen zu Variablen stimmen? (Wähle die korrekte Kombination)",
  "options": [
    "A. Farben (grün, rot, orange) = nominal; Likert-Skala 1–7 = nominal; Kontinente = ordinal",
    "B. Farben = nominal; Ja/Nein = dichotom; Temperatur in Celsius = intervall",
    "C. Farben = ordinal; Ja/Nein = nominal; Temperatur in Celsius = ratio",
    "D. Likert-Skala 1–7 = intervall; Kontinente = nominal; Temperatur in Kelvin = intervall",
    "E. Farben = nominal; Kontinente = ordinal; Temperatur in Celsius = ratio"
  ],
  "correctIndex": 1,
  "explanation": "Korrekt: Farben (nominalskaliert, keine natürliche Reihenfolge); Ja/Nein (dichotome Variable, Sonderfall der Nominalskala mit nur 2 Ausprägungen); Temperatur in Grad Celsius (intervallskaliert, kein absoluter Nullpunkt — 0°C ist nicht 'keine Temperatur'). Likert-Skalen sind ordinal (streng genommen), Kontinente sind nominal."
},

{
  "id": "esf-19-sc-11", "type": "single", "course": "ESF",
  "topic": "Publikationsprozess & Journals", "difficulty": 2,
  "tags": ["Publikationsprozess", "Journals", "VHB", "Peer-Review"],
  "question": "Welche Aussage stimmt in Bezug auf wissenschaftliche Zeitschriften (Journals)?",
  "options": [
    "A. Die Anforderungen verschiedener Journals in Bezug auf die Zitierweise sind immer dieselben.",
    "B. Es gibt nur ein offizielles Ranking von Journals.",
    "C. Ein erheblicher Teil der Artikel wird direkt bei der ersten Einreichung akzeptiert.",
    "D. Der Publikationsprozess ist oftmals ein langjähriger Prozess.",
    "E. In der VHB Journal Liste ist «A+» nicht das beste Ranking."
  ],
  "correctIndex": 3,
  "explanation": "Der Publikationsprozess in wissenschaftlichen Journals ist typischerweise sehr langwierig: Nach Einreichung folgt ein mehrmonatiger Peer-Review-Prozess, oft mehrere Revisionsrunden (major/minor revision), bis ein Artikel akzeptiert wird. Es gibt mehrere Ranking-Systeme (VHB, ABS, FT50), und VHB A+ ist tatsächlich das höchste Ranking."
},

{
  "id": "esf-19-sc-12", "type": "single", "course": "ESF",
  "topic": "Primär- und Sekundärdaten", "difficulty": 1,
  "tags": ["Primärdaten", "Sekundärdaten", "Datenerhebung"],
  "question": "Welche Aussage über Sekundärdaten ist richtig?",
  "options": [
    "A. Sekundärdaten sind sekundär, d.h. weniger relevant als Primärdaten.",
    "B. Der Forschende hat einen hohen Einfluss auf die Datenqualität.",
    "C. Sekundärdaten passen immer gut zur Forschungsfrage.",
    "D. Die Erhebung von Sekundärdaten ist sehr personal- und kostenintensiv.",
    "E. Der Forschende hat keinen Einfluss darauf, wie die Daten erhoben wurden."
  ],
  "correctIndex": 4,
  "explanation": "Sekundärdaten wurden von anderen erhoben, für andere Zwecke. Der Forschende kann weder die Erhebungsmethode noch die Operationalisierung der Konstrukte beeinflussen. Dies ist ein zentraler Nachteil: Die Daten passen möglicherweise nicht optimal zur eigenen Forschungsfrage."
},

// ════════════════════════════════════════════════════════════════
// ESF HS2020 — Herbstsemester 2020
// ════════════════════════════════════════════════════════════════

{
  "id": "esf-20-sc-01", "type": "single", "course": "ESF",
  "topic": "Experimente & Studiendesign", "difficulty": 2,
  "tags": ["Cronbach Alpha", "Reliabilität", "Skalen", "Messung"],
  "question": "Markensympathie wird auf einer 7-Punkte Likert-Skala gemessen. Das Cronbachs Alpha beträgt α = 0.85. Welche Aussage ist am zutreffendsten?",
  "options": [
    "A. «Markensympathie» wird anhand einer 2-Punkte Skala gemessen.",
    "B. Das Cronbachs Alpha von α = 0.85 deutet auf eine ausreichend hohe Validität der Skala hin.",
    "C. Der Mittelwert der Gesamtskala lässt sich lediglich mithilfe eines einzigen Items berechnen.",
    "D. Das Cronbachs Alpha von α = 0.85 deutet auf eine ausreichend hohe Reliabilität der Skala hin.",
    "E. Der Median lässt sich lediglich mithilfe eines einzigen Items berechnen."
  ],
  "correctIndex": 3,
  "explanation": "Cronbachs Alpha ist ein Mass der internen Konsistenz — ein Reliabilitätsmass. α = 0.85 gilt als gut (Schwellenwert: α > 0.7 akzeptabel, α > 0.9 sehr gut). Cronbachs Alpha misst NICHT Validität. Der Mittelwert einer Skala wird aus allen Items berechnet, nicht nur aus einem."
},

{
  "id": "esf-20-sc-02", "type": "single", "course": "ESF",
  "topic": "Experimente & Studiendesign", "difficulty": 2,
  "tags": ["Between-Subjects", "Randomisierung", "Manipulation", "Experiment"],
  "question": "Chatbot-Experiment: 735 Teilnehmende werden per Zufallsgenerator entweder einer Chatbot-Gruppe oder einer Online-Fragebogen-Gruppe zugeteilt. Welche Aussage ist am zutreffendsten?",
  "options": [
    "A. Allen Teilnehmenden wurden beide Screen-Designs gezeigt.",
    "B. Das Screen-Design (Chatbot vs. Online-Fragebogen) wurde manipuliert.",
    "C. Die Stichprobe von 735 Teilnehmenden ist eher klein für eine quantitative Studie.",
    "D. Der Zufallsgenerator sorgt dafür, dass nur bestimmte Teilnehmende in die Versuchsgruppen gelangen.",
    "E. Das Experiment benutzt ein «Within-Subjects Design»."
  ],
  "correctIndex": 1,
  "explanation": "Das Screen-Design ist die unabhängige Variable (UV) und wurde aktiv manipuliert. Es handelt sich um ein Between-Subjects Design (jede Person sieht nur ein Design, nicht beide). 735 Teilnehmende ist eine solide Stichprobengrösse. Der Zufallsgenerator randomisiert, macht aber keine Selektion."
},

{
  "id": "esf-20-sc-03", "type": "single", "course": "ESF",
  "topic": "Statistische Signifikanz & Mittelwerte", "difficulty": 2,
  "tags": ["Signifikanz", "Mittelwert", "p-Wert", "Ergebnisinterpretation"],
  "question": "Ergebnis Experiment 1: MChatbot = 4.06 vs. MOnline-Formular = 3.70, p < .05. Der Mittelwert MChatbot = 4.06 — was entspricht er?",
  "options": [
    "A. Dem Durchschnitt der Angaben aller 735 Teilnehmenden.",
    "B. Die Differenz der beiden Mittelwerte ist statistisch nicht signifikant.",
    "C. Dem Durchschnitt der Angaben aller Teilnehmenden, die mit dem Chatbot agierten.",
    "D. Die Differenz der Mittelwerte muss mindestens 0.5 betragen, um signifikant zu sein.",
    "E. Die Marke war Teilnehmenden mit Online-Formular sympathischer als Teilnehmenden mit Chatbot."
  ],
  "correctIndex": 2,
  "explanation": "MChatbot ist der Gruppenmittelwert der Chatbot-Bedingung — also nur der Teilnehmenden, die den Chatbot genutzt haben. p < .05 bedeutet, die Differenz ist statistisch signifikant (auf dem 5%-Niveau). Es gibt keinen allgemeinen Mindestwert für Signifikanz — das hängt von Stichprobengrösse und Effektvarianz ab."
},

{
  "id": "esf-20-sc-04", "type": "single", "course": "ESF",
  "topic": "Forschungsdesign: Kausal, Deskriptiv, Vergleichend", "difficulty": 2,
  "tags": ["Forschungsfragen", "kausal", "deskriptiv", "vergleichend"],
  "question": "Vier Forschungsfragen: (1) SmartFuture-Vorgehen zur Produktverbesserung, (2) Unterschiede zwischen autonomen und smarten Produkten, (3) Autonomiegrad und Konsumentenzufriedenheit, (4) Gemeinsamkeiten intelligenter und autonomer Produkte. Welche Typenverteilung stimmt?",
  "options": [
    "A. 1. Kausal, 2. Vergleich, 3. Deskriptiv, 4. Vergleich",
    "B. 1. Deskriptiv, 2. Vergleich, 3. Deskriptiv, 4. Vergleich",
    "C. 1. Vergleich, 2. Kausal, 3. Kausal, 4. Deskriptiv",
    "D. 1. Kausal, 2. Vergleich, 3. Kausal, 4. Deskriptiv",
    "E. 1. Deskriptiv, 2. Vergleich, 3. Kausal, 4. Vergleich"
  ],
  "correctIndex": 4,
  "explanation": "(1) «Wie wird SmartFuture vorgehen?» = deskriptiv (beschreibt einen Sachverhalt). (2) «Was sind die Unterschiede?» = vergleichend. (3) «Beeinflusst der Autonomiegrad die Zufriedenheit?» = kausal (Ursache-Wirkung). (4) «Was sind die Gemeinsamkeiten?» = vergleichend (Ähnlichkeiten statt Unterschiede, aber ebenfalls komparativ)."
},

{
  "id": "esf-20-sc-05", "type": "single", "course": "ESF",
  "topic": "Hypothesen: Null- und Alternativhypothese", "difficulty": 2,
  "tags": ["Nullhypothese", "Alternativhypothese", "Hypothesenformulierung"],
  "question": "Alternativhypothese: «Der Verzehr von Schokolade führt zu einer höheren Zufriedenheit als derjenige von Gummibärchen.» Welche Nullhypothese gehört dazu?",
  "options": [
    "A. Der Verzehr von Gummibärchen führt zu einer höheren Zufriedenheit als derjenige von Schokolade.",
    "B. Der Verzehr von Gummibärchen führt zu einer niedrigeren Zufriedenheit.",
    "C. Der gemeinsame Verzehr führt zu einer sehr hohen Zufriedenheit.",
    "D. Der Verzehr von Schokolade führt zu keiner höheren Zufriedenheit als derjenige von Gummibärchen.",
    "E. Je grösser der Schokoladenkonsum, desto höher die Zufriedenheit."
  ],
  "correctIndex": 3,
  "explanation": "Die Nullhypothese (H₀) negiert die Alternativhypothese (H₁): Wenn H₁ behauptet 'Schokolade > Gummibärchen', dann negiert H₀ genau diese Richtungsaussage: 'Schokolade ist NICHT besser als Gummibärchen' (d.h. kein Effekt oder gegenteiliger Effekt). Die Nullhypothese ist nie eine Aussage über einen anderen Zusammenhang."
},

{
  "id": "esf-20-sc-06", "type": "single", "course": "ESF",
  "topic": "Stichprobenverfahren", "difficulty": 2,
  "tags": ["systematische Zufallsstichprobe", "Schneeballsystem", "Stichprobenverfahren"],
  "question": "Drei Methoden: (1) Jede 10. Person einer sortierten Liste (ab zufälligem Startpunkt), (2) Zufallsmechanismus wählt 10% aus, (3) Schneeballsystem. Welche Zuordnung ist korrekt?",
  "options": [
    "A. 1. systematisch: nicht zufällig; 2. einfache Zufallsstichprobe: zufällig; 3. Schneeball: nicht zufällig",
    "B. 1. systematische Zufallsstichprobe: zufällig; 2. einfache Zufallsstichprobe: zufällig; 3. Schneeball: nicht zufällig",
    "C. 1. Geratewohl: zufällig; 2. einfache Zufallsstichprobe: zufällig; 3. Quotenstichprobe: zufällig",
    "D. 1. geschichtete Zufallsstichprobe: zufällig; 2. einfache Zufallsstichprobe: zufällig; 3. Schneeball: zufällig",
    "E. 1. geschichtete Stichprobe: zufällig; 2. Quotenstichprobe: zufällig; 3. Geratewohl: nicht zufällig"
  ],
  "correctIndex": 1,
  "explanation": "(1) Systematische Zufallsstichprobe: Der Startpunkt ist zufällig gewählt, dann wird jede k-te Person ausgewählt — das ist probabilistisch. (2) Einfache Zufallsstichprobe: Jede Person hat die gleiche Chance, ausgewählt zu werden. (3) Schneeballsystem: Nicht zufällig — die nächsten Teilnehmenden werden von bestehenden Teilnehmenden empfohlen (soziale Netzwerke verzerren die Auswahl)."
},

{
  "id": "esf-20-sc-07", "type": "single", "course": "ESF",
  "topic": "Gütekriterien: Reliabilität", "difficulty": 2,
  "tags": ["Reliabilität", "Validität", "Cronbach Alpha", "Gütekriterien"],
  "question": "Welche Aussage zur Reliabilität ist am WENIGSTEN zutreffend?",
  "options": [
    "A. Hohe Reliabilität bedeutet, dass wiederholte Untersuchungen zu sehr ähnlichen Messergebnissen gelangen.",
    "B. Die Reliabilität einer Skala kann anhand des Cronbachs Alpha gemessen werden.",
    "C. Reliabilität ist nur dann gegeben, wenn die Ergebnisse auch valide sind.",
    "D. Reliabilität kann mit Hilfe von Testwiederholungen bestimmt werden (Test-Retest-Reliabilität).",
    "E. Reliabilität stellt neben Validität und Objektivität eine der wichtigsten Gütekriterien dar."
  ],
  "correctIndex": 2,
  "explanation": "C ist falsch: Reliabilität ist KEINE hinreichende Bedingung für Validität — aber auch Validität ist keine Bedingung für Reliabilität. Eine Messung kann hochreliabel (konsistent) aber trotzdem nicht valide sein (z.B. misst man immer präzise die falsche Sache). Das korrekte Verhältnis: Reliabilität ist eine notwendige Bedingung für Validität — ohne Reliabilität kann es keine Validität geben."
},

{
  "id": "esf-20-sc-08", "type": "single", "course": "ESF",
  "topic": "Interne & Externe Validität", "difficulty": 3,
  "tags": ["interne Validität", "Kausalität", "Konfundierung", "Korrelation"],
  "question": "Zwei Forscher stellen fest: «Je mehr Desinfektionsmittel verkauft wird, desto mehr Menschen erkranken an Covid». Sie schliessen daraus, dass Desinfektionsmittel die Erkrankung verursacht. Was ist auf jeden Fall NICHT gegeben?",
  "options": [
    "A. Interne Validität",
    "B. Korrelation",
    "C. Auswertungsobjektivität",
    "D. Durchführungsobjektivität",
    "E. Interne Konsistenz"
  ],
  "correctIndex": 0,
  "explanation": "Korrelation liegt vor (beide Variablen steigen gemeinsam). Auswertungs- und Durchführungsobjektivität sind gegeben (beide Forscher kommen unabhängig zum gleichen Ergebnis). Aber interne Validität fehlt: Die Schlussfolgerung, Desinfektionsmittel VERURSACHE Erkrankungen, ist falsch — es liegt eine Drittvariable vor (die Pandemie selbst treibt sowohl Erkrankungen als auch Desinfektionsmittelkäufe)."
},

{
  "id": "esf-20-sc-09", "type": "single", "course": "ESF",
  "topic": "Qualitative Methoden: Interviews & Fokusgruppen", "difficulty": 2,
  "tags": ["Fokusgruppen", "Nachteile", "Qualitative Methoden"],
  "question": "Was sind Nachteile bei Fokusgruppen?",
  "options": [
    "A. Nur Groupthink als Nachteil",
    "B. Nur die Unmöglichkeit, in die Tiefe zu gehen",
    "C. Groupthink, geringe Tiefe, Hemmungen vor der Gruppe, dominante Teilnehmende",
    "D. Fokusgruppen finden in zu natürlicher Umgebung statt",
    "E. Zu hohe Kosten und zu lange Dauer"
  ],
  "correctIndex": 2,
  "explanation": "Fokusgruppen haben mehrere Nachteile: (A) Groupthink/Konformitätsdruck, (B) geringe Tiefe pro Teilnehmende, (C) Hemmungen, persönliche Dinge vor der Gruppe zu äussern, (D) dominante Teilnehmende können das Gespräch dominieren. E ist falsch: Fokusgruppen finden typischerweise in einem Laborumfeld statt, nicht in natürlicher Umgebung."
},

{
  "id": "esf-20-sc-10", "type": "single", "course": "ESF",
  "topic": "Primär- und Sekundärdaten", "difficulty": 1,
  "tags": ["Primärdaten", "Sekundärdaten", "Beispiele"],
  "question": "Bei welchen Beispielen handelt es sich um die Sammlung von Sekundärdaten?",
  "options": [
    "A. Nur: Daten aus einem Marktforschungsinstitut von 2009–2012",
    "B. Nur: Facebook Posts via Web Scraping",
    "C. Daten aus Marktforschungsinstitut (2009–2012) UND Facebook Posts via Web Scraping",
    "D. Emotion-Recognition-Technik an Werbespot UND RFID-Tracking in Geschäften",
    "E. Experiment zu mündlichem vs. schriftlichem Feedback"
  ],
  "correctIndex": 2,
  "explanation": "Sekundärdaten = bereits vorhandene Daten, nicht für die aktuelle Fragestellung erhoben. (A) Marktforschungsdaten aus 2009–2012: wurden für andere Zwecke erhoben → Sekundärdaten. (C) Facebook Posts: existieren bereits, werden nur heruntergeladen → Sekundärdaten. Emotion-Recognition, RFID und Experimente erzeugen neue Messdaten → Primärdaten."
},

{
  "id": "esf-20-sc-11", "type": "single", "course": "ESF",
  "topic": "Paradigmen: Positivismus & Interpretivismus", "difficulty": 3,
  "tags": ["Positivismus", "Interpretivismus", "Phänomenologie", "Paradigmen"],
  "question": "Welche Aussagen zu Paradigmen in den Sozialwissenschaften sind richtig?",
  "options": [
    "A. Phänomenologie ist positivistisch; positivistische Forschung ist subjektiv",
    "B. Beim positivistischen Ansatz unterscheiden sich Forscher/in und Subjekt; beim interpretativen Ansatz sind sie in Wechselwirkung",
    "C. Wirkungsrichtung ist beim positivistischen Ansatz häufig unscharf",
    "D. Alle Ansätze sind gleichermassen objektiv",
    "E. Phänomenologie und Ethnographie sind positivistische Methoden"
  ],
  "correctIndex": 1,
  "explanation": "Positivismus: Forscher/in und Forschungssubjekt sind getrennt (Distanz); Kausalbeziehungen sind klar definiert; Objektivität als Ideal. Interpretivismus (inkl. Phänomenologie, Ethnographie): Forscher/in und Subjekt beeinflussen sich gegenseitig; Wirkungsrichtung ist häufig unscharf; subjektive Bedeutungskonstruktion steht im Vordergrund."
},

{
  "id": "esf-20-sc-12", "type": "single", "course": "ESF",
  "topic": "Netnographie & Ethnographie", "difficulty": 2,
  "tags": ["Netnographie", "Ethnographie", "Kozinets", "Online-Forschung"],
  "question": "Kozinets (2010) identifiziert vier kritische Unterschiede zwischen ethnographischer und netnographischer Forschung. Welcher zählt NICHT dazu?",
  "options": [
    "A. Änderung (alteration): Die Art der Interaktion verändert sich online.",
    "B. Anonymität (anonymity): Online-Interaktionen sind zumeist anonymer.",
    "C. Zugänglichkeit (accessibility): Zugang zu Online-Foren.",
    "D. Archivierung (archiving): Automatische Archivierung von Online-Konversationen.",
    "E. Sprache (language): Bei Online-Interaktionen ist die Sprache weniger verständlich."
  ],
  "correctIndex": 4,
  "explanation": "Die vier Kernunterschiede nach Kozinets sind: Änderung (A), Anonymität (B), Zugänglichkeit (C) und Archivierung (D). 'Sprache ist weniger verständlich' ist kein anerkannter systematischer Unterschied — tatsächlich kann Online-Kommunikation sowohl formaler als auch informeller sein, je nach Kontext."
},

// ════════════════════════════════════════════════════════════════
// ESF FS2023 — Frühlingssemester 2023 (Englisch)
// ════════════════════════════════════════════════════════════════

{
  "id": "esf-fs23-sc-01", "type": "single", "course": "ESF",
  "topic": "Experimente & Studiendesign", "difficulty": 2,
  "tags": ["Laborstudie", "externe Validität", "Stärken und Schwächen"],
  "question": "What is NOT a strength of laboratory experiments?",
  "options": [
    "A. High internal and external validity",
    "B. High control over variables",
    "C. Replication of the results",
    "D. Accurate measurements possible",
    "E. Complex measurements possible (e.g., brain activity, galvanic skin response)"
  ],
  "correctIndex": 0,
  "explanation": "Laboratory experiments have HIGH internal validity (controlled environment minimizes confounds), but typically LOW external validity (artificial setting reduces generalizability to real-world settings). This is the classic trade-off: the tighter the control, the less the findings generalize. All other options (B–E) are genuine strengths of lab experiments."
},

{
  "id": "esf-fs23-sc-02", "type": "single", "course": "ESF",
  "topic": "Forschungsdesign: Kausal, Deskriptiv, Vergleichend", "difficulty": 2,
  "tags": ["Forschungsfragen", "kausal", "deskriptiv", "vergleichend", "Englisch"],
  "question": "Which type classification is correct? (1) Swiss vs. German consumers' attitudes towards organic products, (2) common features of misinformation mechanisms, (3) mental health of teachers in Switzerland, (4) does age influence emotional brand relationships?",
  "options": [
    "A. 1. Causal, 2. Comparative, 3. Descriptive, 4. Comparative",
    "B. 1. Comparative, 2. Comparative, 3. Causal, 4. Descriptive",
    "C. 1. Comparative, 2. Comparative, 3. Descriptive, 4. Causal",
    "D. 1. Causal, 2. Comparative, 3. Causal, 4. Descriptive",
    "E. 1. Comparative, 2. Comparative, 3. Descriptive, 4. Descriptive"
  ],
  "correctIndex": 2,
  "explanation": "(1) 'Differences between Swiss and German' = comparative. (2) 'Common features' = comparative (comparing mechanisms). (3) 'How good is mental health' = descriptive (no comparison, no causation). (4) 'Does age influence' = causal (tests whether X causes/affects Y). Key rule: Causal questions ask about influence/effect; comparative about differences; descriptive about the state of a phenomenon."
},

{
  "id": "esf-fs23-sc-03", "type": "single", "course": "ESF",
  "topic": "Experimente & Studiendesign", "difficulty": 3,
  "tags": ["Between-Subjects", "Randomisierung", "Moral Dilemma", "Experiment"],
  "question": "Study 1 (N = 316): 2 (agent: self in conventional vehicle vs. autonomous vehicle) × 2 (perspective: driver vs. pedestrian) between-subjects design. Random assignment to one of four conditions. Which statement is most true?",
  "options": [
    "A. This is a longitudinal study.",
    "B. The study design is a meta-analysis because there are multiple conditions.",
    "C. There are 90 participants per condition.",
    "D. Response bias due to social desirability is not likely in this study.",
    "E. Random assignment minimizes potential confounding by uncontrolled variables."
  ],
  "correctIndex": 4,
  "explanation": "Randomization is the gold standard for eliminating confounds: by randomly assigning participants to conditions, personality, prior attitudes, and other variables are distributed equally across conditions. 316/4 = 79 participants per condition (not 90). It is not a longitudinal study (single point in time) or a meta-analysis (one new study, not a synthesis of existing ones). Social desirability can still occur."
},

{
  "id": "esf-fs23-sc-04", "type": "single", "course": "ESF",
  "topic": "Replikationskrise", "difficulty": 2,
  "tags": ["Replikationskrise", "p-Hacking", "HARKing", "Open Science"],
  "question": "What contributes to the replication crisis? Which statement is NOT correct?",
  "options": [
    "A. Meta-analyses require complex statistical analysis that often result in mistakes, leading to the true effect not being reliably estimated.",
    "B. Academic journals look for 'surprising' and 'exciting' results.",
    "C. Questionable research practices such as p-hacking, HARKing, Optional Stopping, or Outcome Switching contribute to the replication crisis.",
    "D. Researchers often have too few incentives to disclose their data and methods.",
    "E. Researchers often have too few resources to conduct studies with sufficient statistical power."
  ],
  "correctIndex": 0,
  "explanation": "A is incorrect: Meta-analyses are actually a SOLUTION to the replication crisis, not a cause. They aggregate results across many studies to estimate the true effect size. The real causes are: publication bias (B), questionable research practices (C), lack of transparency (D), and underpowered studies (E)."
},

{
  "id": "esf-fs23-sc-05", "type": "single", "course": "ESF",
  "topic": "Qualitative Forschung", "difficulty": 1,
  "tags": ["qualitative Forschung", "Tiefenverständnis", "induktiv"],
  "question": "Which statement about qualitative research is most true?",
  "options": [
    "A. Qualitative research is used to understand complex phenomena in depth.",
    "B. In qualitative research, statistical data analysis such as t-test, ANOVA, or regression analysis are used.",
    "C. Qualitative research typically follows a deductive approach.",
    "D. Qualitative research is used to test hypotheses.",
    "E. Qualitative research shows causalities and works with standardized surveys."
  ],
  "correctIndex": 0,
  "explanation": "Qualitative research aims for in-depth understanding of complex phenomena — why and how, not just how much. It is typically inductive (B, C are wrong), does not test hypotheses (D), does not establish causality in the experimental sense (E), and does not use statistical tests (B is wrong). Methods include interviews, focus groups, ethnography, and case studies."
},

{
  "id": "esf-fs23-sc-06", "type": "single", "course": "ESF",
  "topic": "Gütekriterien: Validität & Reliabilität", "difficulty": 2,
  "tags": ["Validität", "Reliabilität", "Objektivität", "Messqualität"],
  "question": "Which answer is most true regarding measurement quality criteria?",
  "options": [
    "A. High variability of measured values across multiple time points indicates high reliability.",
    "B. Individual and flexible execution of measurements speaks for high objectivity.",
    "C. Validity can be promoted by careful selection or development of measurement instruments based on theoretical and empirical foundations.",
    "D. An example of lack of objectivity is an unclear or misleading operationalization of a construct.",
    "E. An example of high validity is high precision or consistency of measurement instruments."
  ],
  "correctIndex": 2,
  "explanation": "C is correct: Validity is enhanced by grounding measurement instruments in established theory (content validity) and prior empirical work. A is wrong: high variability indicates LOW reliability. B is wrong: flexible execution reduces objectivity. D is wrong: unclear operationalization is a validity problem, not objectivity. E is wrong: precision/consistency describes reliability, not validity."
},

{
  "id": "esf-fs23-sc-07", "type": "single", "course": "ESF",
  "topic": "Open Science", "difficulty": 2,
  "tags": ["Open Science", "Preregistration", "OSF", "Transparenz"],
  "question": "Which statement about Open Science in the social sciences is most true?",
  "options": [
    "A. The review process aims to disseminate research findings to a wide audience in academia and the general public.",
    "B. For a preregistration, it is sufficient to roughly outline the research project; hypotheses do not need to be stated.",
    "C. Pre-registration cannot reduce p-hacking.",
    "D. The Open Science Framework (OSF) enables registration of research projects and joint collaborations.",
    "E. Besides Open Science, no other measures are needed to guarantee a scientific and fair way of working."
  ],
  "correctIndex": 3,
  "explanation": "The OSF (Open Science Framework) is the most widely used platform for preregistering studies and sharing data and materials. Preregistration DOES reduce p-hacking (C is wrong) by committing to hypotheses and analysis plans in advance. A describes the purpose of publication/dissemination, not peer review. Preregistration requires specific hypotheses and methods (B is wrong). Other measures (replication studies, open data) are also needed (E is wrong)."
},

{
  "id": "esf-fs23-sc-08", "type": "single", "course": "ESF",
  "topic": "Forschungsprozess & Hypothesen", "difficulty": 2,
  "tags": ["Hypothesen", "Nullhypothese", "Forschungsfragen", "Qualitätskriterien"],
  "question": "What is true regarding research questions and hypotheses?",
  "options": [
    "A. There are three distinct types of research questions.",
    "B. An example of a null hypothesis is: 'There is no difference in political interest between men and women.'",
    "C. An example of a specific hypothesis is: 'The average job satisfaction of teachers is 10% higher than that of employees in other occupations.'",
    "D. A causal question aims to describe a phenomenon and often uses 'how' questions.",
    "E. An example of a directed hypothesis is: 'The higher a person's education level, the higher his or her political interest.'"
  ],
  "correctIndex": 0,
  "explanation": "All of A, B, C, and E are correct: (A) Three types: descriptive, causal, comparative. (B) Null hypothesis correctly states 'no difference'. (C) Specific hypothesis names the precise magnitude (10%). (E) Directed hypothesis specifies the direction (higher education → higher interest). D is wrong: causal questions ask about cause-effect relationships (e.g., 'does X cause Y?'), not descriptions — descriptive questions use 'how' or 'what'."
},

{
  "id": "esf-fs23-sc-09", "type": "single", "course": "ESF",
  "topic": "Qualitative Forschung: Grounded Theory", "difficulty": 3,
  "tags": ["Grounded Theory", "Kodierung", "Transkription", "qualitative Forschung"],
  "question": "Study 5 is a/an __(1)__ study. Using the __(2)__ Theory methodology, we __(3)__ the __(4)__ audio recordings for emergent themes. Considering the previous __(5)__ studies... Which answer correctly completes the text?",
  "options": [
    "A. (1) inductive, (2) Grounded, (3) coded, (4) transcribed, (5) abductive",
    "B. (1) inductive, (2) Grounded, (3) coded, (4) experimental, (5) qualitative",
    "C. (1) qualitative, (2) Grounded, (3) coded, (4) transcribed, (5) experimental",
    "D. (1) experimental, (2) Mere Measurement, (3) coded, (4) transcribed, (5) inductive",
    "E. (1) qualitative, (2) Mere Measurement, (3) transcribed, (4) coded, (5) experimental"
  ],
  "correctIndex": 2,
  "explanation": "Grounded Theory is a qualitative methodology (not 'inductive' as a type label). The process: audio recordings are first transcribed (turning speech into text), then coded (identifying themes). The preceding studies 1–3 were experimental (quantitative), making them the 'experimental' studies referenced. Mere Measurement Theory is a different concept entirely."
},

{
  "id": "esf-fs23-sc-10", "type": "single", "course": "ESF",
  "topic": "Forschungsprozess: Qualitativ", "difficulty": 2,
  "tags": ["Forschungsprozess", "qualitativ", "Reihenfolge", "Kodierung"],
  "question": "Put the steps of the qualitative research process in the typical order: (1) Coding of data, (2) Definition of research question & method selection, (3) Sample selection & recruitment, (4) Collection & transcription, (5) Theory building & compilation, (6) Evaluation & interpretation of codes.",
  "options": [
    "A. (1), (3), (5), (2), (4), (6)",
    "B. (2), (3), (4), (1), (6), (5)",
    "C. (2), (3), (4), (1), (5), (6)",
    "D. (5), (6), (2), (1), (4), (3)",
    "E. (3), (2), (1), (6), (4), (5)"
  ],
  "correctIndex": 1,
  "explanation": "Correct order: (2) Define research question → (3) Select sample/recruit → (4) Collect & transcribe data → (1) Code the data → (6) Evaluate & interpret codes → (5) Build theory & compile results. This follows the standard qualitative research cycle: planning, fieldwork, analysis, synthesis. Note C has steps 5 and 6 swapped: you first evaluate/interpret codes (6) before building the full theory (5)."
},

{
  "id": "esf-fs23-sc-11", "type": "single", "course": "ESF",
  "topic": "Doppelganger Brand Image (Thomspon et al., 2006)", "difficulty": 3,
  "tags": ["Doppelganger Brand Image", "Positivismus", "Phänomenologie", "Fallstudie"],
  "question": "About 'Emotional Branding and the Strategic Value of the Doppelganger Brand Image' (Thompson et al., 2006) — which statement is NOT correct?",
  "options": [
    "A. The data consists of phenomenological interviews with coffee shop patrons at various locations.",
    "B. The researchers take a positivist approach.",
    "C. The researchers identify different types of doppelganger brand images constructed by consumers.",
    "D. Doppelganger brand images can be used as early warning signs when emotional branding loses effectiveness.",
    "E. The researchers show how doppelganger brand images influence Starbucks' brand identity and personality."
  ],
  "correctIndex": 1,
  "explanation": "B is incorrect: Thompson et al. (2006) use a phenomenological, interpretive approach — not positivism. They conduct qualitative interviews to understand how consumers construct brand images. Positivism would use quantitative methods, hypothesis testing, and assume an objective reality. The study is a classic example of interpretive consumer research."
},


// ── ESF HS2022 ──────────────────────────────────────────────────────────────
{
  id: "esf-22-sc-01",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Kodierung",
  difficulty: 2,
  tags: ["ESF", "Kodierung", "Grounded Theory", "qualitative Forschung"],
  question: "Ein Artikel untersucht virale Memes im Marketing (Malodia et al., 2022). Im Abschnitt «Ergebnisse» findet sich eine Tabelle mit drei Spalten: «Nullte Ordnung» (z. B. Beliebt, Themenbezogen, Bekannt), «Erste Ordnung» (z. B. Relevanz, Ikonizität) und «Zweite Ordnung» (z. B. Inhaltsbezogene Faktoren). Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Die Tabelle stammt höchstwahrscheinlich aus einem Experiment mit drei Konditionen (nullte, erste, zweite Ordnung).",
    "B. Die Tabelle spiegelt eine positivistische Forschungsmethodologie wider.",
    "C. Die Tabelle beschreibt höchstwahrscheinlich das Ergebnis eines Kodierungsprozesses, bei dem Codes «nullter Ordnung» zu Codes «zweiter Ordnung» zusammengefasst werden.",
    "D. Die Tabelle ist das Ergebnis eines Stichprobenverfahrens mit offenem, axialem und selektivem Sampling.",
    "E. Da die Daten in drei Gruppen vorliegen, sind sie nicht dichotom."
  ],
  correctIndex: 2,
  explanation: "Die Hierarchie von nullter zu zweiter Ordnung ist charakteristisch für den qualitativen Kodierungsprozess (z. B. Grounded Theory): Codes niedrigerer Ordnung werden zu abstrakteren Kategorien höherer Ordnung aggregiert. Die Tabelle zeigt kein Experiment, sondern das Ergebnis einer induktiven Inhaltsanalyse."
},
{
  id: "esf-22-sc-02",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Sampling",
  difficulty: 2,
  tags: ["ESF", "Theoretisches Sampling", "Tiefeninterviews", "qualitative Forschung"],
  question: "Malodia et al. (2022) führten 35 Tiefeninterviews mit 20 Meme-Nutzenden, 6 Meme-Kreierenden, 4 Influencer*innen und 5 Markenmanager*innen über 8 Wochen durch und wählten die Teilnehmenden mittels theoretischem Sampling aus. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Die Methode der Datenerhebung lässt sich am besten als teilnehmende Beobachtung beschreiben.",
    "B. Der Stichprobenfehler ist hier ein grosses Problem.",
    "C. Anstelle des theoretischen Samplings hätten die Forschenden auch heimliches Sampling verwenden können.",
    "D. Die Dauer der Datenerhebung (8 Wochen) ist zu kurz für 35 Tiefeninterviews.",
    "E. Die Vielfalt der befragten Teilnehmenden trägt dazu bei, dass die Ergebnisse breiter angelegt sind (verschiedene Perspektiven und Motivationen erfassen)."
  ],
  correctIndex: 4,
  explanation: "E ist korrekt: Die Einbeziehung verschiedener Stakeholder-Gruppen (Nutzende, Kreative, Influencer, Manager) erhöht die Breite und Perspektivenvielfalt der Studie, was in der qualitativen Forschung oft bewusst angestrebt wird. Stichprobenfehler ist primär ein Problem der quantitativen Forschung; die Methode sind Tiefeninterviews, keine Beobachtung."
},
{
  id: "esf-22-sc-03",
  type: "single",
  course: "ESF",
  topic: "Grounded Theory",
  difficulty: 2,
  tags: ["ESF", "Grounded Theory", "induktiv", "qualitative Forschung"],
  question: "Vervollständigen Sie den Auszug aus Malodia et al. (2022): «Da die Literatur zu Memes begrenzt ist, war ein (1)__ Forschungsdesign erforderlich, das auf der (2)__ Theory basiert. Gemäss dem (2)__ Theory-Ansatz muss die Forschung mit (3)__ selbst beginnen. Die daraus resultierende Theorie basiert auf (4)__ und ist hilfreich, um ein Phänomen zu verstehen, das durch bestehende Theorien (5)__ ist.»",
  options: [
    "A. (1) deduktives, (2) Grounded, (3) den Daten, (4) empirischen Daten, (5) nicht erklärbar",
    "B. (1) induktives, (2) Grounded, (3) der Theorie, (4) empirischen Daten, (5) nicht erklärbar",
    "C. (1) induktives, (2) Grounded, (3) den Daten, (4) empirischen Daten, (5) nicht erklärbar",
    "D. (1) induktives, (2) Mere Measurement, (3) den Daten, (4) qualitativen Daten, (5) gut etabliert",
    "E. (1) abduktives, (2) Grounded, (3) der Beobachtung, (4) logischen Analysen, (5) nicht erklärbar"
  ],
  correctIndex: 2,
  explanation: "Grounded Theory ist induktiv (beginnt bei Daten, nicht Theorie), basiert auf empirischen Daten und eignet sich für Phänomene, die nicht durch bestehende Theorien erklärt werden können. Die Forschung beginnt mit den Daten selbst (nicht mit Theorie oder reiner Beobachtung)."
},
{
  id: "esf-22-sc-04",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Hypothesen",
  difficulty: 1,
  tags: ["ESF", "Hypothese", "Testosteron", "Experiment"],
  question: "Nave et al. (2018) untersuchen den Einfluss von Testosteron auf Markenpräferenzen. Der Titel lautet: «Einmalige Verabreichung von Testosteron erhöht die Präferenz von Männern für Statusgüter». Welche Hypothese haben die Forschenden höchstwahrscheinlich untersucht?",
  options: [
    "A. Ein erhöhter Testosteronspiegel führt dazu, dass Männer eine stärkere Präferenz für Güter zeigen, die ihren sozialen Rang fördern.",
    "B. Ein erhöhter Testosteronspiegel führt dazu, dass Männer eine stärkere Präferenz für Güter zeigen, die ihren sozialen Rang schmälern.",
    "C. Ein gleichbleibender Testosteronspiegel führt dazu, dass Männer eine stärkere Präferenz für statusfördernde Güter zeigen.",
    "D. Ein erhöhter Testosteronspiegel führt dazu, dass Männer (im Gegensatz zu Frauen) eine stärkere Präferenz für statusfördernde Güter zeigen.",
    "E. Ein erhöhter Testosteronspiegel (im Gegensatz zu einem erhöhten Östrogenspiegel) führt zu einer stärkeren Präferenz für statusfördernde Güter."
  ],
  correctIndex: 0,
  explanation: "A entspricht direkt dem Titel und dem Studiendesign (Testosteron vs. Placebo, Messung der Präferenz für Statusgüter). D und E fügen Vergleiche ein (Männer vs. Frauen; Testosteron vs. Östrogen), die im Artikel nicht untersucht werden. C geht von gleichbleibendem Spiegel aus — das widerspricht dem experimentellen Design."
},
{
  id: "esf-22-sc-05",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Doppelblinddesign",
  difficulty: 2,
  tags: ["ESF", "Doppelblind", "Experiment", "Kontrollgruppe"],
  question: "In Nave et al. (2018) wurden 243 Männern in einer Doppelblindstudie entweder Testosteron (N=125) oder Placebo (N=118) als topisches Gel verabreicht. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Es handelt sich um ein quasi-natürliches Experiment.",
    "B. Das Design folgte einem 2 (Testosteron vs. Placebo) × 2 (Doppelblind vs. Nicht-Doppelblind) Design.",
    "C. Die Stichprobengrösse von weniger als 150 Teilnehmern pro Kondition ist nicht ausreichend.",
    "D. Das Doppelblindverfahren erbringt Korrelationsnachweise für die Wirkung von Testosteron.",
    "E. Das doppelblinde Protokoll stellt sicher, dass weder die Teilnehmer noch die durchführenden Forschenden wissen, welche Behandlung verabreicht wird."
  ],
  correctIndex: 4,
  explanation: "E ist die korrekte Definition des Doppelblindverfahrens: Weder Teilnehmende noch Forschende wissen, wer Testosteron und wer Placebo erhält. Dies eliminiert Erwartungseffekte auf beiden Seiten. Es handelt sich um ein echtes Experiment (nicht quasi-natürlich), und das Design hat nur eine UV mit zwei Stufen (kein 2×2)."
},
{
  id: "esf-22-sc-06",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Kausalität vs. Korrelation",
  difficulty: 2,
  tags: ["ESF", "Kausalität", "Korrelation", "Experiment", "Ergebnisinterpretation"],
  question: "Im Experiment von Nave et al. (2018) zeigen die Ergebnisse, dass Teilnehmende in der Testosterongruppe im Durchschnitt eine höhere Präferenz für Marken mit hohem sozialem Rang hatten. Welche Aussage ist — in Anbetracht des Doppelblinddesigns — am zutreffendsten?",
  options: [
    "A. Alle Teilnehmer in der Testosterongruppe hatten eine höhere Präferenz für Hochrang-Marken als alle Teilnehmer in der Placebogruppe.",
    "B. Der durchschnittliche Teilnehmer in der Placebogruppe hat eine geringere Präferenz für die Marke mit niedrigem Rang.",
    "C. Ein höherer Testosteronspiegel führt kausal zu einer höheren Präferenz für Marken mit hohem sozialem Rang.",
    "D. Ein höherer Testosteronspiegel korreliert mit einer höheren Präferenz für Marken mit hohem sozialem Rang.",
    "E. Das Modell kann mit einem t-Test für abhängige Stichproben getestet werden."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Da es sich um ein randomisiertes Doppelblindexperiment handelt, sind kausale Schlüsse zulässig. D (Korrelation) wäre die korrekte Aussage bei einer Beobachtungsstudie — hier jedoch wurde Testosteron aktiv manipuliert, weshalb Kausalität behauptet werden kann. A trifft für Gruppenvergleiche nicht zu (es geht um Mittelwerte)."
},
{
  id: "esf-22-sc-07",
  type: "single",
  course: "ESF",
  topic: "Messung: Skalendesign",
  difficulty: 2,
  tags: ["ESF", "Skala", "Messung", "Likert", "Ausgangspunkt"],
  question: "In Nave et al. (2018) wird eine visuelle Analogskala zur Messung der Markenpräferenz verwendet. Welche Aussage über die Skala ist am zutreffendsten?",
  options: [
    "A. Als eindimensionale Skala kann sie nicht das gesamte Konzept der Markenpräferenz erfassen.",
    "B. Die Skala ist ratioskaliert.",
    "C. Bei dieser Skala ist nicht eindeutig, welche Antwort als «indifferent» gilt.",
    "D. Es spielt keine Rolle, wo der Cursor zu Beginn platziert ist.",
    "E. Ob man eine 11- oder 10-Punkte-Skala verwendet, hätte keinen Einfluss auf die Antworten."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Bei einer visuellen Analogskala zwischen zwei Marken ist nicht immer klar, welcher Punkt genau «Indifferenz» (keine Präferenz) entspricht, insbesondere wenn die Skala keine explizite Mittelpunktmarkierung hat. Die Startposition des Cursors beeinflusst Antworten (Ankereffekt), weshalb D falsch ist."
},
{
  id: "esf-22-sc-08",
  type: "single",
  course: "ESF",
  topic: "Datenvisualisierung",
  difficulty: 2,
  tags: ["ESF", "Datenvisualisierung", "y-Achse", "Täuschung", "Skalierung"],
  question: "Eine Grafik des Instagram-Accounts der deutschen Grünen Partei zeigt die Erhöhung des deutschen Mindestlohns. Der Nullpunkt der y-Achse liegt nicht bei null, sondern höher. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Die x-Achse (Jahre) ist verkürzt, was eine sinnvolle Interpretation verhindert.",
    "B. Es gibt keinen erkennbaren Zusammenhang zwischen Zeit und Mindestlohn.",
    "C. Der Mindestlohn hat sich von 2021 bis 2022 absolut mehr als verdoppelt.",
    "D. Da der Nullpunkt der y-Achse höher als der natürliche Nullpunkt liegt, wird der relative Anstieg des Mindestlohns verzerrt dargestellt.",
    "E. Der absolute Mindestlohn stagnierte zwischen 2017 und 2020."
  ],
  correctIndex: 3,
  explanation: "D ist korrekt: Wenn die y-Achse nicht bei null beginnt, wirken selbst kleine absolute Veränderungen dramatisch gross. Dies ist ein klassisches Mittel der irreführenden Datenvisualisierung — der relative Anstieg erscheint grösser als er ist."
},
{
  id: "esf-22-sc-09",
  type: "single",
  course: "ESF",
  topic: "Gütekriterien: Reliabilität und Validität",
  difficulty: 2,
  tags: ["ESF", "Cronbach's Alpha", "Reliabilität", "Skala", "Gütekriterien"],
  question: "Sie wollen eine Skala zur Messung von «Offenheit gegenüber Augmented und Mixed Reality» aus dem Marketing Scales Handbook bewerten. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Die Skala sollte nicht eindimensional sein, um alle Dimensionen zu erfassen.",
    "B. Die Skala sollte nach 2015 veröffentlicht worden sein, um neueste Technologien zu berücksichtigen.",
    "C. Eine mehrdimensionale Skala sollte bestenfalls ein Cronbach's Alpha von mehr als 0.7 aufweisen; ist die Skala eindimensional, benötigen wir andere Kriterien.",
    "D. Das Cronbach's Beta sollte grösser als 0.8 sein.",
    "E. Die Skala sollte mindestens 10-mal zitiert worden sein, da dies ihre Nützlichkeit gewährleistet."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Cronbach's Alpha > 0.7 ist ein Standardkriterium für interne Konsistenz bei mehrdimensionalen Skalen. Bei eindimensionalen Konstrukten sind andere Kriterien (z. B. Faktorladungen, konvergente Validität) relevanter. «Cronbach's Beta» existiert nicht als Standardmasszahl."
},
{
  id: "esf-22-sc-10",
  type: "single",
  course: "ESF",
  topic: "Empirische Sozialforschung: Grundkomponenten",
  difficulty: 1,
  tags: ["ESF", "Empirie", "Theorie", "Methode", "Grundkomponenten"],
  question: "Welche Aussage zu den zentralen Komponenten der empirischen Sozialforschung trifft am wenigsten zu?",
  options: [
    "A. Es gibt drei zentrale Komponenten.",
    "B. Mindestens eine der zentralen Komponenten befasst sich mit der Sammlung von Daten.",
    "C. Empirie und Forschungsmethode sind zentrale Komponenten.",
    "D. Eine Komponente befasst sich mit widerspruchsfreien Aussagen zur Ordnung des Wissens.",
    "E. Praktische Implikationen sind eine der zentralen Komponenten der empirischen Sozialforschung."
  ],
  correctIndex: 4,
  explanation: "E trifft am wenigsten zu: Die drei zentralen Komponenten der empirischen Sozialforschung sind Empirie (Daten), Theorie und Methode. Praktische Implikationen können eine wichtige Rolle spielen, sind aber keine der drei Kernkomponenten."
},
{
  id: "esf-22-sc-11",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Feldforschung",
  difficulty: 2,
  tags: ["ESF", "Mears", "ethnographisch", "teilnehmende Beobachtung", "qualitative Forschung"],
  question: "Ashley Mears beschreibt in «Very Important People» (2020) ihre Forschung über den globalen Partykreislauf. Welche Aussage über ihre Forschung ist am wenigsten zutreffend?",
  options: [
    "A. Sie vertritt eine interpretivistische Perspektive.",
    "B. «Männer mit Geld und Frauen mit Schönheit» ist die zentrale soziale Gleichung, die sie gefunden hat.",
    "C. Der wirtschaftliche Austausch ist asymmetrisch, aber nicht völlig einseitig, da die «Mädchen» von sozialen Ressourcen profitieren.",
    "D. Mears reflektiert kritisch den teilnehmenden Charakter ihrer Forschung.",
    "E. Bei ihrer Forschung setzte sie vor allem auf qualitative Arbeit mit Fokusgruppen."
  ],
  correctIndex: 4,
  explanation: "E trifft am wenigsten zu: Mears verwendete teilnehmende Beobachtung und Tiefeninterviews — keine Fokusgruppen. Sie hat sich aktiv in das Partymilieu eingebettet (ethnographischer Ansatz), was Fokusgruppen methodisch grundlegend unterscheidet."
},
{
  id: "esf-22-sc-12",
  type: "single",
  course: "ESF",
  topic: "Forschungsprozess: Reihenfolge",
  difficulty: 1,
  tags: ["ESF", "Forschungsprozess", "Reihenfolge", "Schritte"],
  question: "Bringen Sie die folgenden Schritte des Forschungsprozesses in die typische Reihenfolge: (1) Daten analysieren, (2) Forschungsfrage formulieren, (3) Literaturrecherche durchführen, (4) Manuskript überarbeiten, (5) Stichprobe ziehen.",
  options: [
    "A. (1), (3), (5), (2), (4)",
    "B. (2), (3), (5), (1), (4)",
    "C. (2), (3), (5), (4), (1)",
    "D. (5), (3), (2), (1), (4)",
    "E. (3), (2), (1), (5), (4)"
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Zuerst Forschungsfrage formulieren (2), dann Literaturrecherche (3), dann Stichprobe ziehen (5), dann Daten analysieren (1), schliesslich Manuskript überarbeiten (4). Die Literaturrecherche folgt auf die Forschungsfrage, um die Frage zu präzisieren und den Stand der Forschung zu kennen."
},
{
  id: "esf-22-sc-13",
  type: "single",
  course: "ESF",
  topic: "Open Science: Präregistrierung",
  difficulty: 2,
  tags: ["ESF", "Präregistrierung", "Open Science", "p-hacking", "Transparenz"],
  question: "Barnea et al. (2022) betonen, dass sie «ihre Hypothese in zehn präregistrierten Online-Studien (insgesamt N=17.620) testen». Welche Aussage ist am wenigsten zutreffend?",
  options: [
    "A. Wir könnten die Präregistrierung lesen und prüfen, ob die präregistrierte Hypothese mit der tatsächlich geprüften übereinstimmt.",
    "B. Die Forschenden schaffen Transparenz bezüglich ihrer Forschung.",
    "C. Wir haben mehr Gewissheit, dass p-Hacking ausgeschlossen ist.",
    "D. Die Präregistrierung beschreibt die Veröffentlichung von Hypothesen und Analyseplänen vor der eigentlichen Analyse.",
    "E. Aus diesen Informationen können wir schliessen, dass die Forschenden zehn Experimente durchgeführt haben."
  ],
  correctIndex: 4,
  explanation: "E trifft am wenigsten zu: «Zehn präregistrierte Studien» bedeutet nicht zwingend zehn Experimente — es könnten auch andere Studiendesigns (Korrelationsstudien, Surveys) sein. Die Anzahl der Studien sagt nichts über den Typ aus. Präregistrierung und Transparenz sind korrekt beschrieben in A, B, C und D."
},
{
  id: "esf-22-sc-14",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Merkmale",
  difficulty: 1,
  tags: ["ESF", "qualitative Forschung", "Merkmale", "statistische Analyse"],
  question: "Welche Aussage zur qualitativen Forschung trifft am ehesten zu?",
  options: [
    "A. In der qualitativen Forschung gibt es keine Daten.",
    "B. In der qualitativen Forschung gibt es keine statistische Datenanalyse.",
    "C. Qualitative Forschung folgt typischerweise der Deduktion.",
    "D. Qualitative Forschung wird eingesetzt, um verallgemeinerbare Erkenntnisse zu gewinnen.",
    "E. Qualitative Forschung erklärt Effekte via Mediation und Moderation."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Qualitative Forschung arbeitet mit nicht-numerischen Daten (Text, Bilder, Beobachtungen) und nutzt interpretative statt statistische Analysemethoden. Es gibt zwar Daten (A ist falsch), aber keine Inferenzstatistik. Qualitative Forschung ist typischerweise induktiv (C falsch) und zielt auf Tiefenverstehen, nicht Generalisierbarkeit (D falsch)."
},
{
  id: "esf-22-sc-15",
  type: "single",
  course: "ESF",
  topic: "Datenvisualisierung: Interpretation",
  difficulty: 2,
  tags: ["ESF", "Datenvisualisierung", "Korrelation", "Blasendiagramm"],
  question: "In Yam et al. (2022) zeigt eine Visualisierung US-Bundesstaaten als Kreise; die Kreisgrösse repräsentiert die Anzahl Roboter pro 1000 Arbeitende, die Schattierung das Ausmass an Arbeitsplatzunsicherheit. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Je dunkler der Kreis, desto mehr «Arbeitsplatzinteresse» ist dokumentiert.",
    "B. Die Kreisgrösse nimmt mit zunehmender Anzahl Roboter pro 1000 Arbeitende ab.",
    "C. Es gibt ein klares Muster: mehr Roboter an der US-Westküste als an der Ostküste.",
    "D. Die Beziehung zwischen «Arbeitsplatzinteresse» und «Roboter pro 1000 Arbeitende» liesse sich mithilfe einer Korrelationsstudie analysieren.",
    "E. Die Ergebnisse dieser Studie sind ohne Einschränkungen auf das Jahr 2022 anwendbar."
  ],
  correctIndex: 3,
  explanation: "D ist korrekt: Eine Korrelationsstudie wäre geeignet, den Zusammenhang zwischen zwei kontinuierlichen Variablen (Roboterdichte und Arbeitsplatzinteresse) zu analysieren. E ist falsch, da externe Validität zeitliche Grenzen hat. B widerspricht der Visualisierungslogik (grössere Kreise = mehr Roboter)."
},

// ── ESF HS2023 Offizielle Prüfung ──────────────────────────────────────────
{
  id: "esf-23p-sc-01",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Studiendesign",
  difficulty: 2,
  tags: ["ESF", "longitudinal", "qualitative Forschung", "Studiendesign"],
  question: "Mardon et al. (2023) führten 25 Tiefeninterviews mit britischen Konsumierenden über ihre digitalen Besitztümer durch; Interviews wurden wiederholt über mehrere Monate bis zu zwei Jahren durchgeführt. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Es handelt sich um eine longitudinale Studie.",
    "B. Es handelt sich um eine persönliche Umfrage mit Fragebogen.",
    "C. Die Forschenden folgen einem positivistischen Ansatz.",
    "D. Teil der Studie war eine Dokumentenauswertung bereits bestehender Dokumente.",
    "E. Ziel ist es, Erwartungen an digitale Objekte durch demographische Variablen vorherzusagen."
  ],
  correctIndex: 0,
  explanation: "A ist korrekt: Da dieselben Teilnehmenden über einen längeren Zeitraum (mehrere Monate bis zwei Jahre) wiederholt befragt wurden, handelt es sich um eine longitudinale Studie. Die Methode ist qualitativ-interpretativ (kein positivistischer Ansatz, kein Fragebogen)."
},
{
  id: "esf-23p-sc-02",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Sampling und Stichprobe",
  difficulty: 2,
  tags: ["ESF", "qualitative Stichprobe", "Repräsentativität", "theoretische Sättigung"],
  question: "In der Studie von Mardon et al. (2023) wurde die Stichprobengrösse nicht im Voraus festgelegt; die Datenerhebung lief bis zur theoretischen Sättigung. Welche Aussage zur Stichprobe und Datenerhebung ist am zutreffendsten?",
  options: [
    "A. Es gibt in dieser Studie keine organisatorischen oder sozialen Barrieren beim Zugang zur Stichprobe.",
    "B. Die Dateninterpretation sollte unter Berücksichtigung der betrachteten Stichprobe erfolgen.",
    "C. Der iterative Wechsel zwischen Datenerhebung und -analyse ist in der qualitativen Forschung unüblich.",
    "D. Die exakte Stichprobengrösse wird im Vorhinein festgelegt, ähnlich wie bei einem Experiment.",
    "E. Die Stichprobe bei qualitativer Forschung sollte immer repräsentativ sein."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: In qualitativer Forschung ist die Stichprobe bewusst klein und nicht repräsentativ — Ergebnisse müssen stets im Kontext der untersuchten Gruppe interpretiert werden. Der iterative Wechsel zwischen Erhebung und Analyse (C) ist typisch, nicht unüblich. Stichprobengrösse wird nicht vorab festgelegt (D falsch)."
},
{
  id: "esf-23p-sc-03",
  type: "single",
  course: "ESF",
  topic: "Qualitative Methoden: Grounded Theory",
  difficulty: 2,
  tags: ["ESF", "Grounded Theory", "Analysemethoden", "qualitative Forschung"],
  question: "Welche Analysemethode ist für die Studie von Mardon et al. (2023) zu digitalen Besitztümern am ehesten geeignet?",
  options: [
    "A. Grounded Theory: deduktiv von bestehender Theorie auf das Phänomen schliessen.",
    "B. Binomialtest: testen, ob die Nutzung digitaler Objekte einer vermuteten Verteilung entspricht.",
    "C. Grounded Theory: durch systematische Prozessschritte tieferes Verständnis der Teilnehmendenerfahrungen gewinnen.",
    "D. Qualitative Inhaltsanalyse: zahlenmässige Muster aufdecken und allgemeingültige Gesetzmässigkeiten festlegen.",
    "E. Faktoranalyse: die Beziehung von Faktoren untersuchen und auf einen Faktor reduzieren."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Grounded Theory ist geeignet, weil sie induktiv vorgeht und aus den Daten heraus Theorien entwickelt — ideal für ein wenig erforschtes Phänomen. A ist falsch: Grounded Theory ist induktiv, nicht deduktiv. Binomialtest und Faktoranalyse sind quantitative Methoden und passen nicht zu qualitativen Tiefeninterviews."
},
{
  id: "esf-23p-sc-04",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Studiendesign",
  difficulty: 2,
  tags: ["ESF", "between-subjects", "ANOVA", "multifaktoriell", "Experiment"],
  question: "In Zhu et al. (2022) nehmen 162 Teilnehmende an einem 2 (Standard vs. erweitert) × 2 (Büro vs. Schule) between-subjects Design teil. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Es handelt sich um ein Experiment mit vier Konditionen, bei dem alle Teilnehmenden alle vier Konditionen durchlaufen.",
    "B. Eine multifaktorielle ANOVA ist eine angemessene Methode der Datenanalyse.",
    "C. Unkontrollierte Variablen können durch zufällige Zuteilung nicht minimiert werden.",
    "D. Eine einfaktorielle ANOVA ist angemessen für dieses Design.",
    "E. Die Teilnehmenden werden zufällig einer von zwei Konditionen zugeteilt."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Ein 2×2 between-subjects Design mit zwei unabhängigen Variablen erfordert eine multifaktorielle (zweifaktorielle) ANOVA, um Haupt- und Interaktionseffekte zu analysieren. A ist falsch (between-subjects: jede Person nur in einer Kondition). E ist falsch (vier Konditionen, nicht zwei)."
},
{
  id: "esf-23p-sc-05",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Externe Validität",
  difficulty: 2,
  tags: ["ESF", "externe Validität", "Generalisierbarkeit", "virtuelles Experiment"],
  question: "In der Studie von Zhu et al. (2022) wurden Lehrende und Bürokräfte in einer virtuellen Simulation einem Amoklauf ausgesetzt. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Zur besseren Generalisierbarkeit könnte die Studie in mehreren Ländern durchgeführt werden.",
    "B. Die hypothetische Natur des Szenarios ist kein Problem.",
    "C. Die externe Validität ist als sehr hoch einzuschätzen.",
    "D. Das Design erlaubt keine kausalen Rückschlüsse hinsichtlich der Effekte der Gegenmassnahmen.",
    "E. Die Ungleichheit im Geschlechterverhältnis ist ein gravierendes Problem."
  ],
  correctIndex: 0,
  explanation: "A ist korrekt: Eine internationale Replikation würde die Generalisierbarkeit erhöhen, da es grosse Länderunterschiede bei der Häufigkeit von Amokläufen und Sicherheitskulturen gibt. C ist falsch: Virtuelle Experimente haben tendenziell eingeschränkte externe Validität. D ist falsch: Das between-subjects Experiment erlaubt kausale Schlüsse."
},
{
  id: "esf-23p-sc-06",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Limitationen",
  difficulty: 2,
  tags: ["ESF", "Limitationen", "Generalisierbarkeit", "Stichprobe"],
  question: "Welche Aussage zu möglichen Limitationen der Studie von Zhu et al. (2022) ist am zutreffendsten?",
  options: [
    "A. Da es sich bei den Teilnehmenden um Bürokräfte und Lehrende handelte, sind die Resultate nicht auf Kinder übertragbar.",
    "B. Teilnehmende sind bei Online-Simulationen generell unaufmerksam, was die Aussagekraft stark limitiert.",
    "C. Die abhängigen Variablen (Reaktionszeit, Entscheidungen) sind in einem reellen Kontext nicht entscheidend.",
    "D. Alle abhängigen Variablen basieren auf selbstberichteten Daten mit möglichen Verzerrungen.",
    "E. Die Stichprobengrösse ist eindeutig zu klein."
  ],
  correctIndex: 0,
  explanation: "A ist korrekt: Die Stichprobe aus Bürokräften und Lehrenden schränkt die Generalisierbarkeit der Ergebnisse auf andere Personengruppen (z. B. Kinder in Schulen) ein. Dies ist eine valide Limitation. B ist eine pauschale Aussage ohne Evidenz. D ist teilweise falsch: Reaktionszeit ist keine selbstberichtete Variable."
},
{
  id: "esf-23p-sc-07",
  type: "single",
  course: "ESF",
  topic: "Forschungsethik",
  difficulty: 2,
  tags: ["ESF", "Forschungsethik", "ethische Genehmigung", "IRB"],
  question: "Welche Aussage über die Methodik der Studie von Zhu et al. (2022) ist am zutreffendsten?",
  options: [
    "A. Im between-subjects Design bedarf es keiner randomisierten Zuteilung.",
    "B. Bei der Messung der Reaktionszeit spielt soziale Erwünschtheit eine wichtige Rolle.",
    "C. Für eine solche Studie mit psychisch belastenden Szenarien ist die Zustimmung der ethischen Beratungsstelle der Universität vorab einzuholen.",
    "D. Da schnelle intuitive Entscheidungen abgefragt werden, sollten Teilnehmende zu Beginn nicht über den Studieninhalt informiert werden.",
    "E. Immersive Technologien (z. B. VR) könnten die externe Validität nicht weiter erhöhen."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Studien mit potenziell traumatisierenden Szenarien (Amoklauf-Simulation) müssen von einer Ethikkommission genehmigt werden, um den Schutz der Teilnehmenden sicherzustellen. A ist falsch (Randomisierung ist auch im between-subjects Design wichtig). E ist falsch (VR würde die externe Validität durch realistischere Szenarien erhöhen)."
},
{
  id: "esf-23p-sc-08",
  type: "single",
  course: "ESF",
  topic: "Primär- und Sekundärdaten",
  difficulty: 1,
  tags: ["ESF", "Primärdaten", "Sekundärdaten", "Datenerhebung"],
  question: "Welche Aussage über Primär- und Sekundärdaten ist am zutreffendsten?",
  options: [
    "A. Sekundärdaten sind immer qualitativer Natur, Primärdaten immer quantitativer Natur.",
    "B. Führen Forschende ein Interview, eine Beobachtung oder ein Experiment durch, erheben sie Primärdaten.",
    "C. Fan-Communities, Social Media, Blogs und Foren gehören nicht zu möglichen Quellen für Sekundärdaten.",
    "D. Sekundärdaten zeichnen sich durch hohe Aktualität, gute Passung zur Forschungsfrage und grösseren Zeitbedarf aus.",
    "E. Primärdaten zeichnen sich durch schnelle Verfügbarkeit und niedrige Kosten aus."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Primärdaten werden direkt vom Forschenden für die eigene Studie erhoben (Interviews, Beobachtungen, Experimente). Sekundärdaten sind bereits vorhandene Daten, die für eine andere Studie erhoben wurden. C ist falsch (Social Media ist eine typische Sekundärdatenquelle)."
},
{
  id: "esf-23p-sc-09",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Konzepte: Begriffsdefinitionen",
  difficulty: 2,
  tags: ["ESF", "Mediator", "Moderator", "Störvariable", "Pretest", "interne Validität"],
  question: "Ordnen Sie die Begriffe den Definitionen zu: (1) Miniaturversion der Hauptstudie, (2) Variable, die den Zusammenhang zwischen UV und AV erklärt, (3) Variable, die die UV-AV-Beziehung verzerren kann, (4) Variable, die den Effekt einer Variable auf eine andere verändert, (5) Gütekriterium, das zeigt, dass nur getestete Variablen das Ergebnis beeinflussen.",
  options: [
    "A. 1. Interne Validität, 2. Mediator, 3. Moderator, 4. Störvariable, 5. Externe Validität",
    "B. 1. Pretest, 2. Moderator, 3. Störvariable, 4. Mediator, 5. Interne Validität",
    "C. 1. Pretest, 2. Mediator, 3. Störvariable, 4. Moderator, 5. Externe Validität",
    "D. 1. Pretest, 2. Störvariable, 3. Mediator, 4. Moderator, 5. Interne Validität",
    "E. 1. Pretest, 2. Mediator, 3. Störvariable, 4. Moderator, 5. Interne Validität"
  ],
  correctIndex: 4,
  explanation: "E ist korrekt: (1) Pretest = Miniaturversion/Pilottest, (2) Mediator = erklärt den Mechanismus zwischen UV und AV, (3) Störvariable = nicht kontrollierte Variable, die die UV-AV-Beziehung verzerrt, (4) Moderator = verändert die Stärke/Richtung des Effekts, (5) Interne Validität = Gütekriterium für kausale Schlüsse."
},
{
  id: "esf-23p-sc-10",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Grundlagen",
  difficulty: 1,
  tags: ["ESF", "Stichprobengrösse", "theoretische Sättigung", "qualitative Forschung"],
  question: "Welche Aussage zur qualitativen Forschung ist am zutreffendsten?",
  options: [
    "A. Die Transkription beschreibt das Erfassen von reflektierenden Gedanken, um ein Thema mit Relevanz für die Forschungsfrage zu identifizieren.",
    "B. Bei qualitativer Forschung kann die genaue Stichprobengrösse im Vorhinein meist nicht festgelegt werden, da die Erreichung einer theoretischen Sättigung angestrebt wird.",
    "C. Qualitative Fallstudien haben zum Ziel, ein Forschungssubjekt in einer künstlichen, kontrollierten Umgebung detailliert zu untersuchen.",
    "D. Die qualitative Datenerhebung beschreibt die systematische Erhebung nichtstandardisierter Daten aus einer kleinen, aber repräsentativen Stichprobe.",
    "E. Die Schritte der Datenkodierung bestehen in der Abfolge: (1) selektives Kodieren, (2) axiales Kodieren, (3) offenes Kodieren."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: In qualitativer Forschung (insbesondere Grounded Theory) wird so lange erhoben, bis theoretische Sättigung erreicht ist — d. h., bis keine neuen Erkenntnisse mehr aus neuen Daten entstehen. Die Stichprobengrösse ist damit nicht vorab fixierbar. E ist falsch: Korrekte Reihenfolge ist offenes → axiales → selektives Kodieren."
},
{
  id: "esf-23p-sc-11",
  type: "single",
  course: "ESF",
  topic: "Literaturrecherche",
  difficulty: 1,
  tags: ["ESF", "Literaturrecherche", "Primärdaten", "Forschungsprozess"],
  question: "Welche Aussage über die Literaturrecherche trifft am wenigsten zu?",
  options: [
    "A. Die Literaturrecherche ermöglicht die Feststellung der wichtigsten Methoden und Theorien in einem Forschungsbereich.",
    "B. Mit der Literaturrecherche kann ermittelt werden, welche Konstrukte bereits untersucht wurden.",
    "C. Die Literaturrecherche ermöglicht das Erheben von Primärdaten.",
    "D. Ein Ziel der Literaturrecherche ist die Identifizierung von Lücken in der Literatur.",
    "E. Die Literaturrecherche ist keine eigenständige Forschungsmethode."
  ],
  correctIndex: 2,
  explanation: "C trifft am wenigsten zu: Literaturrecherche analysiert bereits vorhandene (Sekundär-)Quellen — sie erhebt keine neuen Primärdaten. Primärdaten werden durch eigene Beobachtungen, Interviews oder Experimente erhoben."
},
{
  id: "esf-23p-sc-12",
  type: "single",
  course: "ESF",
  topic: "Grundbegriffe: Deduktion, Induktion, Theorie",
  difficulty: 2,
  tags: ["ESF", "Deduktion", "Induktion", "Theorie", "Konzeptionelles Modell", "Randomisierung"],
  question: "Ordnen Sie die Definitionen den Begriffen zu: (1) Schlussfolgern vom Allgemeinen zum Spezifischen, (2) Verallgemeinerte Aussage über Zusammenhänge, (3) Wiedergabe der kausalen Wechselbeziehung zwischen Variablen, (4) Verallgemeinerung vom Spezifischen zum Allgemeinen, (5) Fragt nach der Ursache einer Kausalbeziehung, (6) Zufällige Zuordnung zu experimentellen Konditionen.",
  options: [
    "A. 1. Deduktion, 2. Theorie, 3. Konzeptionelles Modell, 4. Induktion, 5. Kausalfrage, 6. Randomisierung",
    "B. 1. Induktion, 2. Theorie, 3. Konzeptionelles Modell, 4. Deduktion, 5. Kausalfrage, 6. Randomisierung",
    "C. 1. Deduktion, 2. Theorie, 3. Konzeptionelles Modell, 4. Induktion, 5. Kausalfrage, 6. Manipulation",
    "D. 1. Deduktion, 2. Theorie, 3. Konzeptionelles Modell, 4. Induktion, 5. Vergleichsfrage, 6. Randomisierung",
    "E. 1. Induktion, 2. konzeptionelles Modell, 3. Theorie, 4. Deduktion, 5. Kausalfrage, 6. Randomisierung"
  ],
  correctIndex: 0,
  explanation: "A ist korrekt: Deduktion = allgemein zu spezifisch (aus Theorie Hypothesen ableiten); Theorie = verallgemeinerte Aussage über Zusammenhänge; konzeptionelles Modell = Darstellung kausaler Beziehungen; Induktion = spezifisch zu allgemein; Kausalfrage = nach Ursachen fragend; Randomisierung = zufällige Zuteilung zu Konditionen."
},
{
  id: "esf-23p-sc-13",
  type: "single",
  course: "ESF",
  topic: "Metaanalyse und Publikations-Bias",
  difficulty: 3,
  tags: ["ESF", "Publikations-Bias", "Metaanalyse", "Replikation", "Open Science"],
  question: "Macnamara & Burgoyne (2023) überprüften 63 Studien (N=97.672) zur Wirksamkeit von Growth-Mindset-Interventionen. Nach Korrektur des Publikations-Bias fanden sie keine Evidenz für einen Effekt. Welche Aussage ist am zutreffendsten?",
  options: [
    "A. Das Korrigieren des Publikations-Bias ist nicht nötig, da genügend Publikationen vorliegen.",
    "B. Publikations-Bias bedeutet, dass nur Studien ohne Effekt veröffentlicht wurden.",
    "C. Eine mögliche Ursache für den Publikations-Bias: nur Studien, die für Growth-Mindset sprechen, wurden veröffentlicht.",
    "D. Der Publikations-Bias beeinträchtigt nicht nur die Effektschätzung, sondern auch die Qualität der Studien.",
    "E. Eine Ursache für den Publikations-Bias könnte eine sehr hohe Power des Effekts sein."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Publikations-Bias entsteht typischerweise dadurch, dass positive Befunde (die für einen Effekt sprechen) eher veröffentlicht werden als Nullergebnisse. Dieses «file drawer problem» verzerrt den geschätzten wahren Effekt nach oben. D ist falsch: Publikations-Bias beeinträchtigt die Schätzung des Effekts, aber nicht die interne Qualität der einzelnen Studien."
},
{
  id: "esf-23p-sc-14",
  type: "single",
  course: "ESF",
  topic: "Qualitative Forschung: Mythen",
  difficulty: 2,
  tags: ["ESF", "qualitative Forschung", "Mythen", "Generalisierbarkeit"],
  question: "Welche der folgenden Aussagen zur qualitativen Forschung ist KEIN Mythos (d. h., welche ist tatsächlich wahr)?",
  options: [
    "A. Qualitative Daten sind subjektiv und können nicht systematisch analysiert werden.",
    "B. Qualitative Forschung ist einfacher und schneller als quantitative Forschung.",
    "C. Qualitative Forschung eignet sich nur für vorläufige Studien.",
    "D. Qualitative Daten sind weniger «wissenschaftlich» als andere Methoden.",
    "E. Qualitative Forschung liefert detaillierte Einblicke, aber diese Stärke kann die Generalisierbarkeit einschränken."
  ],
  correctIndex: 4,
  explanation: "E ist kein Mythos: Es ist tatsächlich wahr, dass qualitative Forschung durch die Tiefe des Verstehens und kleine, nicht-repräsentative Stichproben in ihrer Generalisierbarkeit eingeschränkt ist. Das ist eine reale methodische Limitation, kein Mythos. Alle anderen Aussagen (A–D) sind Mythen, die qualitative Forschung unfair abwerten."
},
{
  id: "esf-23p-sc-15",
  type: "single",
  course: "ESF",
  topic: "Datenmanipulation und Forschungsintegrität",
  difficulty: 2,
  tags: ["ESF", "Forschungsintegrität", "Datenfälschung", "p-Hacking", "Replikation"],
  question: "Im Kontext der Vorwürfe gegen Francesca Gino (Datenfälschung): Welche Aussage zu Methoden in den Verhaltenswissenschaften ist am zutreffendsten?",
  options: [
    "A. «Social Priming» ist eine allseits anerkannte Methodik in den Verhaltenswissenschaften.",
    "B. Statistisch gesehen kann die Manipulation von nur 20 von 500 Antworten das Ergebnis einer Studie massgeblich verzerren.",
    "C. Verhaltensforschende gehen davon aus, dass es kein irrationales Verhalten gibt.",
    "D. Falls eine Studie nicht repliziert werden kann, spricht dies für Datenfälschung.",
    "E. Auch bei vorher festgelegtem Erhebungszeitraum können Forschende die Datenerhebung früher abbrechen."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Selbst eine kleine Manipulation (z. B. 20 von 500 Antworten = 4%) kann statistisch signifikante Ergebnisse erzeugen, besonders bei knappen p-Werten. Dies zeigt, wie leicht Datenfälschung im kleinen Massstab grosse Auswirkungen hat. D ist falsch: Nicht-Replizierbarkeit kann viele Ursachen haben (Stichprobenvariation, Kontextunterschiede) und beweist keine Fälschung."
},

// ── ESF HS2023 Übungsklausur ────────────────────────────────────────────────
{
  id: "esf-23u-sc-01",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Online-Experiment",
  difficulty: 1,
  tags: ["ESF", "Online-Experiment", "between-subjects", "Studiendesign"],
  question: "Eine HBR-Studie lässt 115 Wirtschaftsstudierende eine kurze historische Beschreibung lesen: die Hälfte las eine über vergangene Ungerechtigkeiten gegenüber Frauen, die andere Hälfte eine neutrale Beschreibung. Danach wurden Einstellungen zu aktueller Geschlechterdiskriminierung gemessen. Welche Aussage über das Design ist am zutreffendsten?",
  options: [
    "A. Die Studierenden nahmen an einem Quasi-Experiment im Labor teil.",
    "B. Die Studierenden nahmen an einer Mixed-Methods-Studie teil.",
    "C. Die Studierenden nahmen an einem Online-Experiment teil.",
    "D. Die Studierenden nahmen an einer Fallstudie teil.",
    "E. Die Studierenden nahmen an einer Online-Fokusgruppe teil."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Die Studie wurde online durchgeführt (Online-Studie laut Text), mit zufälliger Zuteilung zu zwei Textkonditionen — das ist ein Online-Experiment mit between-subjects Design. Es ist kein Quasi-Experiment (da echte Randomisierung vorlag) und keine Fallstudie oder Fokusgruppe."
},
{
  id: "esf-23u-sc-02",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: UV und AV",
  difficulty: 1,
  tags: ["ESF", "UV", "AV", "unabhängige Variable", "abhängige Variable"],
  question: "Was war die unabhängige Variable (UV) in der HBR-Studie zur Geschlechterdiskriminierung?",
  options: [
    "A. Fokus auf historische Ungerechtigkeiten (vs. neutrale Beschreibung)",
    "B. Unterstützung für Sanierungsprogramme",
    "C. Einschreibung in ein kooperatives Bildungsprogramm",
    "D. Geschlecht (männlich vs. weiblich)",
    "E. Einstellungen zum aktuellen Stand der Geschlechterdiskriminierung"
  ],
  correctIndex: 0,
  explanation: "A ist korrekt: Die UV ist das, was die Forschenden manipuliert haben — die Art der gelesenen Beschreibung (historische Ungerechtigkeiten vs. neutral). Die Einstellungen (B, E) sind abhängige Variablen. Das Geschlecht (D) ist eine demographische Kontrollvariable, nicht die manipulierte UV."
},
{
  id: "esf-23u-sc-03",
  type: "single",
  course: "ESF",
  topic: "Messung: Skalentypen",
  difficulty: 2,
  tags: ["ESF", "Likert-Skala", "Fragebogen", "Messung"],
  question: "In der HBR-Studie sollten Studierende (1) ihre Einstellungen zu Geschlechterdiskriminierung (Aussagen mit 1–7 Zustimmungsskala) und (2) ihren Grad der Unterstützung für ein Chancengleichheitsprogramm bewerten. Was ist richtig bezüglich der Fragetypen?",
  options: [
    "A. Fragen zu (1) als Multiple-Choice, Fragen zu (2) als Likert-Skala.",
    "B. Fragen zu (1) als Likert-Skala. Es ist nicht ganz klar, wie Fragen zu (2) konzipiert wurden.",
    "C. Fragen zu (1) als Likert-Skala, Fragen zu (2) als offene Fragen.",
    "D. Fragen zu (1) als semantische Differentialfragen. Es ist nicht klar, wie (2) konzipiert wurde.",
    "E. Es ist nicht möglich zu sagen, wie die Fragen konzipiert wurden."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Der Text beschreibt für (1) explizit eine 1-7 Zustimmungsskala (Likert-Format). Für (2) wird nur erwähnt, dass Unterstützung bewertet wurde — ohne genauen Skalentyp zu nennen. Daher ist B die präziseste Aussage."
},
{
  id: "esf-23u-sc-04",
  type: "single",
  course: "ESF",
  topic: "Forschungsfragen und Hypothesen",
  difficulty: 2,
  tags: ["ESF", "Forschungsfrage", "deskriptiv", "Hypothese", "Schlussfolgerung"],
  question: "Die MIT-Studie zu COVID-Präventionsmassnahmen stellt die Frage: «Sollten Mitteilungen den Nutzen für den Einzelnen, die Gesellschaft oder beide hervorheben?» und findet: öffentliche Formulierung > persönliche Formulierung. Was ist am zutreffendsten?",
  options: [
    "A. Die Frage «Sollten...?» ist eine deduktive Forschungsfrage.",
    "B. Die Frage ist eine deskriptive Forschungsfrage.",
    "C. «Die Betonung des öffentlichen Nutzens ist eine wirksamere Strategie» ist eine Schlussfolgerung.",
    "D. «Die Betonung des öffentlichen Nutzens ist eine wirksamere Strategie» ist ein interpretativer Anspruch.",
    "E. «Die Betonung des öffentlichen Nutzens ist eine wirksamere Strategie» ist die Nullhypothese."
  ],
  correctIndex: 2,
  explanation: "C ist korrekt: Die Aussage «öffentliche Betonung ist wirksamer» ist das Ergebnis der Studie — eine empirisch gestützte Schlussfolgerung aus den Daten. Sie ist nicht die Nullhypothese (E wäre korrekt, wenn die Aussage lautete «es gibt keinen Unterschied»). Eine deduktive Forschungsfrage beginnt mit einer Theorie, die hier nicht der Ausgangspunkt ist."
},
{
  id: "esf-23u-sc-05",
  type: "single",
  course: "ESF",
  topic: "Experimentelle Forschung: Konditionen",
  difficulty: 1,
  tags: ["ESF", "between-subjects", "Konditionen", "Kontrollgruppe"],
  question: "In der MIT-Studie zu COVID-Prävention werden drei Flyer-Versionen verwendet: (1) persönlicher Nutzen, (2) öffentlicher Nutzen, (3) persönlicher + öffentlicher Nutzen. Jeder Teilnehmende sieht nur eine Version (between-subjects). Was ist am zutreffendsten?",
  options: [
    "A. Jedem/jeder Teilnehmer*in wurde einer der drei Flyer gezeigt.",
    "B. Allen Teilnehmenden wurden alle drei Flyer gezeigt.",
    "C. Der rechte Flyer stellt die Kontrollkondition dar.",
    "D. Nur der rechte Flyer stellt die Versuchskondition dar.",
    "E. «Persönlicher Gesundheitsnotfall» bezieht sich auf die abhängige Variable."
  ],
  correctIndex: 0,
  explanation: "A ist korrekt: Bei einem between-subjects Design sieht jede Person nur eine Kondition — hier also nur einen der drei Flyer. B (within-subjects) wäre falsch. Die Kontrollkondition könnte der Flyer ohne spezifische Nutzenbetonung sein, nicht notwendigerweise der rechte."
},
{
  id: "esf-23u-sc-06",
  type: "single",
  course: "ESF",
  topic: "Doppelgänger Brand Image: Forschungsdesign",
  difficulty: 2,
  tags: ["ESF", "Doppelgänger Brand Image", "Thompson", "interpretativ", "qualitative Forschung"],
  question: "Thompson et al. (2006) sammelten Daten über zwei Jahre mit einem Multisite-Ansatz: tape-recorded phenomenological interviews mit 36 Café-Besuchenden sowie Feldnotizen und Fotos aus Beobachtungen. Welche Aussage ist am wenigsten zutreffend?",
  options: [
    "A. Die Forschenden nehmen eine interpretivistische Perspektive ein.",
    "B. Subjektivität ist ein Problem bei der Datenanalyse.",
    "C. Diese Methode folgt einem induktiven Ansatz von der Empirie zur Theorie.",
    "D. Die Forschenden verwenden die Mixed-Methods-Methode.",
    "E. Die Forschenden betreiben kein Hypothesentesten."
  ],
  correctIndex: 3,
  explanation: "D trifft am wenigsten zu: Thompson et al. arbeiten rein qualitativ (phänomenologische Interviews + Beobachtungen) — keine Mixed-Methods. Mixed-Methods würde eine Kombination aus qualitativen und quantitativen Methoden erfordern, was hier nicht der Fall ist."
},
{
  id: "esf-23u-sc-07",
  type: "single",
  course: "ESF",
  topic: "Qualitative Analyse: Hermeneutik",
  difficulty: 2,
  tags: ["ESF", "Hermeneutik", "Kodierung", "qualitative Analyse", "Thompson"],
  question: "Thompson et al. (2006) beschreiben: «Wir interpretierten die qualitativen Daten mit einem hermeneutischen Ansatz. Vorläufige Verständnisse werden gebildet, hinterfragt, revidiert und weiterentwickelt durch eine iterative Bewegung zwischen einzelnen Transkripten und dem aufkommenden Gesamtverständnis.» Auf welchen Prozess gehen die Forschenden hier ein?",
  options: [
    "A. Zielgruppenauswahl",
    "B. Kodierung",
    "C. Ethnographie",
    "D. Präregistrierung",
    "E. Anthropologie"
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Die iterative Bewegung zwischen einzelnen Transkripten und dem Gesamtverständnis beschreibt den qualitativen Kodierungsprozess. Das Revidieren und Weiterentwickeln von Codes entspricht dem axialen und selektiven Kodieren in der Grounded Theory. Die Hermeneutik ist die theoretische Basis, aber der beschriebene Prozess ist Kodierung."
},
{
  id: "esf-23u-sc-08",
  type: "single",
  course: "ESF",
  topic: "Grounded Theory: Merkmale",
  difficulty: 2,
  tags: ["ESF", "Grounded Theory", "induktiv", "empirisch"],
  question: "Welche Aussage zur Grounded Theory trifft am wenigsten zu?",
  options: [
    "A. Der Fokus liegt auf der Generierung theoretischer Ideen auf Basis von Daten.",
    "B. Die Grounded Theory ist nicht empirisch fundiert; ihr Interesse ist die Rekonstruktion subjektiver Ansichten.",
    "C. Die Grounded Theory ist hilfreich, um Phänomene zu verstehen, die nicht durch bestehende Theorien erklärt werden können.",
    "D. Die Grounded Theory wird als radikaler Ansatz betrachtet.",
    "E. Die Grounded Theory beginnt mit den Daten selbst."
  ],
  correctIndex: 1,
  explanation: "B trifft am wenigsten zu: Grounded Theory ist sehr wohl empirisch fundiert — sie basiert explizit auf empirischen Daten (daher «grounded»). Sie zielt auf Theorieentwicklung aus Daten, nicht bloss auf Rekonstruktion subjektiver Ansichten (das wäre eher Phänomenologie). Alle anderen Aussagen (A, C, D, E) beschreiben korrekte Merkmale."
},
{
  id: "esf-23u-sc-09",
  type: "single",
  course: "ESF",
  topic: "Forschungsprozess: Qualitative Tiefeninterviews",
  difficulty: 2,
  tags: ["ESF", "Tiefeninterview", "Kodierung", "Reihenfolge", "Transkription"],
  question: "Wie lautet die typische Reihenfolge der Schritte bei qualitativen Tiefeninterviews? (1) Sammeln der Daten, (2) Axiale Kodierung, (3) Offene Kodierung, (4) Entwickeln einer Theorie, (5) Transkribieren der Daten.",
  options: [
    "A. 1, 5, 2, 3, 4",
    "B. 2, 3, 5, 4, 1",
    "C. 1, 2, 5, 4, 3",
    "D. 3, 5, 2, 1, 4",
    "E. 1, 5, 3, 2, 4"
  ],
  correctIndex: 4,
  explanation: "E ist korrekt: Zuerst Daten sammeln (1), dann transkribieren (5), dann offen kodieren (3), dann axial kodieren (2), schliesslich Theorie entwickeln (4). Die Reihenfolge offenes → axiales Kodieren ist zentral in der Grounded Theory: vom Aufdecken erster Codes bis zur Verknüpfung und Theoriebildung."
},
{
  id: "esf-23u-sc-10",
  type: "single",
  course: "ESF",
  topic: "UV und AV: Hypothesen",
  difficulty: 1,
  tags: ["ESF", "UV", "AV", "Hypothese", "Verpackungsfarbe"],
  question: "Betrachten Sie die Hypothese: «Grüne Verpackung (im Vergleich zu andersfarbiger Verpackung) von Lebensmitteln wird von Verbraucher*innen als gesünder empfunden.» Was ist hinsichtlich der Variablen am ehesten richtig?",
  options: [
    "A. Es ist unklar, welche Variable UV und welche AV ist.",
    "B. Die Verpackungsfarbe ist die UV und Gesundheitsempfindung ist die AV.",
    "C. Die Verpackungsfarbe ist die AV und Gesundheitsempfindung ist die UV.",
    "D. Grüne Verpackung ist die UV und andersfarbige Verpackung ist die AV.",
    "E. Grüne Verpackung ist die AV und andersfarbige Verpackung ist die UV."
  ],
  correctIndex: 1,
  explanation: "B ist korrekt: Die Verpackungsfarbe wird manipuliert (grün vs. andere Farben) — sie ist die unabhängige Variable (UV). Die Gesundheitsempfindung wird als Reaktion gemessen — sie ist die abhängige Variable (AV). D und E verwechseln die Stufen der UV mit der UV selbst."
},
{
  id: "esf-23u-sc-11",
  type: "single",
  course: "ESF",
  topic: "Soziale Erwünschtheit",
  difficulty: 1,
  tags: ["ESF", "soziale Erwünschtheit", "Messverzerrung", "Bias"],
  question: "Worauf bezieht sich die folgende Definition? «Ein systematischer Fehler bei Selbstbeurteilungsmessungen, der aus dem Wunsch der Befragten resultiert, Blamage zu vermeiden und anderen ein positives Bild von sich zu vermitteln.»",
  options: [
    "A. Beobachter-Erwartungseffekt",
    "B. Item-Priming-Effekt",
    "C. Verlustaversion",
    "D. Soziale Erwünschtheit",
    "E. Befragtenerwünschtheitseffekt"
  ],
  correctIndex: 3,
  explanation: "D ist korrekt: Soziale Erwünschtheit (social desirability bias) beschreibt genau die Tendenz, Antworten zu geben, die gesellschaftlich akzeptabel erscheinen, anstatt ehrlich zu antworten. Dies ist ein zentrales Problem bei Selbstberichtsmessungen in Umfragen."
},
{
  id: "esf-23u-sc-12",
  type: "single",
  course: "ESF",
  topic: "Deskriptive Statistik",
  difficulty: 1,
  tags: ["ESF", "Median", "Mittelwert", "Modus", "deskriptive Statistik"],
  question: "Berechnen Sie Median, Mittelwert und Modus der Zahlenreihe: 4, 5, 7, 8, 5, 1.",
  options: [
    "A. Median=4, Mittelwert=5, Modus=6",
    "B. Median=6, Mittelwert=5, Modus=4",
    "C. Median=5, Mittelwert=5, Modus=1",
    "D. Median=5, Mittelwert=5, Modus=5",
    "E. Median=5, Mittelwert=5, Modus=5 — korrigiert: Median=5, Mittelwert=5, Modus=5"
  ],
  correctIndex: 3,
  explanation: "Sortiert: 1, 4, 5, 5, 7, 8. Median = Durchschnitt der 3. und 4. Zahl = (5+5)/2 = 5. Mittelwert = (1+4+5+7+8+5)/6 = 30/6 = 5. Modus = 5 (kommt zweimal vor). Also: Median=5, Mittelwert=5, Modus=5 → Antwort D."
}

,

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 1: Deskriptive Statistik
// ════════════════════════════════════════════════════════════════

{
  id: "stat01-order-01", type: "order", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 1,
  tags: ["Median", "Berechnungsschritte", "Lageparameter"],
  prompt: "Bringe die Schritte zur Berechnung des Medians in die richtige Reihenfolge:",
  items: [
    "Datenreihe der Grösse nach sortieren",
    "Anzahl der Beobachtungen n bestimmen",
    "Position des Medians berechnen: (n+1)/2",
    "Bei geradem n: Durchschnitt der zwei mittleren Werte bilden"
  ],
  explanation: "Der Median erfordert zwingend eine sortierte Datenreihe — das ist die häufigste Prüfungsfalle. Danach bestimmt man n, lokalisiert die Position und bildet ggf. den Durchschnitt der zwei Mittelwerte."
},
{
  id: "stat01-tf-01", type: "truefalse", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 2,
  tags: ["Prüfungsfalle", "Varianz", "Mittelwert", "Skalenniveau"],
  prompt: "Deskriptive Statistik — wahr oder falsch?",
  statements: [
    { text: "Die Stichprobenvarianz wird durch n-1 (nicht n) im Nenner berechnet.", isTrue: true, explanation: "Korrekt — Division durch n-1 liefert einen unverzerrten Schätzer der Grundgesamtheitsvarianz (Bessel-Korrektur)." },
    { text: "Der Median kann ohne vorherige Sortierung der Daten bestimmt werden.", isTrue: false, explanation: "Falsch — der Median setzt eine sortierte Datenreihe voraus. Ohne Sortierung ist die Mittelposition bedeutungslos." },
    { text: "Auf einer Nominalskala ist der Mittelwert eine sinnvolle Kenngrösse.", isTrue: false, explanation: "Falsch — auf Nominalskala (z.B. Nationalität, Beruf) sind nur Häufigkeiten und Modus sinnvoll. Mittelwert und Median setzen mindestens Ordinalskalierung voraus." },
    { text: "Der Variationskoeffizient (VK) ist dimensionslos und ermöglicht Vergleiche zwischen Variablen mit unterschiedlichen Einheiten.", isTrue: true, explanation: "Korrekt — VK = s/x̄ ist eine relative Streuungsgrösse ohne Einheit und erlaubt Vergleiche (z.B. Streuung von Einkommen vs. Alter)." },
    { text: "Bei einem rechtsschiefen Datensatz gilt: Modus < Median < Mittelwert.", isTrue: true, explanation: "Korrekt — bei Rechtsschief­heit zieht der lange rechte Ausläufer den Mittelwert nach oben, während der Modus am linken Gipfel liegt." },
    { text: "Das geometrische Mittel eignet sich für durchschnittliche Wachstumsraten.", isTrue: true, explanation: "Korrekt — für Wachstumsraten und Indizes wird das geometrische Mittel verwendet: $\\bar{x}_g = \\sqrt[n]{x_1 \\cdot x_2 \\cdots x_n}$." }
  ]
},
{
  id: "stat01-single-01", type: "single", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 1,
  tags: ["Skalenniveau", "Nominal", "Ordinal", "Kardinal"],
  question: "Schulnoten (1–6 in der Schweiz) sind auf welchem Skalenniveau gemessen?",
  options: [
    "Nominalskala — nur Kategorien, keine Rangordnung",
    "Ordinalskala — Rangordnung, aber Abstände nicht interpretierbar",
    "Intervallskala — Abstände gleich gross, kein absoluter Nullpunkt",
    "Verhältnisskala — Abstände gleich gross, absoluter Nullpunkt"
  ],
  correctIndex: 1,
  explanation: "Schulnoten sind ordinal: man kann sagen, Note 5 ist besser als Note 4, aber der Abstand zwischen 5 und 6 ist nicht zwingend gleich gross wie zwischen 4 und 5. Es gibt keinen absoluten Nullpunkt und keine interpre­tierbare Abstands­gleichheit."
},
{
  id: "stat01-single-02", type: "single", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 2,
  tags: ["Mittelwert", "Median", "Berechnung", "Lageparameter"],
  question: "Blog-Besucher der letzten 7 Tage: 17, 18, 19, 19, 21, 22, 25. Was ist der Median?",
  options: ["18", "19", "20", "21"],
  correctIndex: 1,
  explanation: "Die Daten sind bereits sortiert. n=7 (ungerade) → Median = Wert an Position (7+1)/2 = 4. Der 4. Wert ist 19. Mittelwert wäre (17+18+19+19+21+22+25)/7 = 141/7 ≈ 20.1."
},
{
  id: "stat01-single-03", type: "single", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 2,
  tags: ["Geometrisches Mittel", "Wachstumsrate", "Mittelwert"],
  question: "Eine Gemeinde wächst von 20'000 auf 48'826 Einwohner in 4 Jahren. Welches Mittel ist für die durchschnittliche Wachstumsrate korrekt?",
  options: [
    "Arithmetisches Mittel der jährlichen Wachstumsraten",
    "Geometrisches Mittel der jährlichen Wachstumsfaktoren",
    "Harmonisches Mittel der jährlichen Wachstumsraten",
    "Gewichtetes arithmetisches Mittel"
  ],
  correctIndex: 1,
  explanation: "Für Wachstumsraten und Indizes gilt: geometrisches Mittel. $\\bar{w}_g = \\sqrt[4]{\\frac{48826}{20000}} - 1 \\approx 24.9\\%$ p.a. Das arithmetische Mittel überschätzt systematisch, weil es den Zinseszinseffekt ignoriert."
},
{
  id: "stat01-multi-01", type: "multiple", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 1,
  tags: ["Bestandsgrössen", "Stromgrössen", "Klassifikation"],
  question: "Welche der folgenden Grössen sind Stromgrössen (nicht Bestandsgrössen)? (Mehrfachauswahl)",
  options: [
    "Anzahl der eingeschriebenen Studenten an der HSG heute",
    "Neuanmeldungen auf Facebook pro Woche",
    "Anzahl Maschinenausfälle in einer Fabrik pro Monat",
    "Warteschlange der Kunden im Arbeitsamt",
    "Schweizerisches Bruttoinlandsprodukt (BIP)"
  ],
  correctIndices: [1, 2, 4],
  explanation: "Stromgrössen messen Flüsse über einen Zeitraum: Neuanmeldungen/Woche, Ausfälle/Monat, BIP (= Produktion pro Jahr). Bestandsgrössen messen einen Zustand zu einem Zeitpunkt: eingeschriebene Studenten heute, Warteschlange jetzt."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 2: Wahrscheinlichkeitsrechnung
// ════════════════════════════════════════════════════════════════

{
  id: "stat02-tf-01", type: "truefalse", course: "Statistik",
  topic: "Wahrscheinlichkeitsrechnung", difficulty: 2,
  tags: ["Prüfungsfalle", "Bedingte Wahrscheinlichkeit", "Unabhängigkeit", "Bayes"],
  prompt: "Wahrscheinlichkeitsrechnung — wahr oder falsch?",
  statements: [
    { text: "Wenn $\\text{cov}(X,Y) = 0$, dann sind X und Y stochastisch unabhängig.", isTrue: false, explanation: "Falsch — Kovarianz 0 bedeutet nur kein linearer Zusammenhang. Nicht-lineare Abhängigkeiten werden nicht erfasst. Stochastische Unabhängigkeit impliziert cov=0, aber nicht umgekehrt." },
    { text: "$P(A|B) = P(B|A)$ gilt nur, wenn $P(A) = P(B)$.", isTrue: false, explanation: "Falsch — nach Bayes gilt $P(A|B) = P(B|A) \\cdot P(A)/P(B)$. Die beiden sind nur gleich, wenn P(A)=P(B). Vertauschung ist eine klassische Prüfungsfalle." },
    { text: "Für unabhängige Ereignisse A und B gilt: $P(A \\cap B) = P(A) \\cdot P(B)$.", isTrue: true, explanation: "Korrekt — das ist die Definition stochastischer Unabhängigkeit. Im abhängigen Fall gilt der allgemeine Multiplikationssatz: $P(A \\cap B) = P(A|B) \\cdot P(B)$." },
    { text: "Der Additionssatz für zwei Ereignisse lautet: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.", isTrue: true, explanation: "Korrekt — ohne den Subtraktionsterm würde die Schnittmenge doppelt gezählt. Bei disjunkten Ereignissen entfällt der Term, weil $P(A \\cap B) = 0$." },
    { text: "Bei einem Laplace-Experiment sind alle Ergebnisse gleichwahrscheinlich.", isTrue: true, explanation: "Korrekt — beim Laplace-Experiment gilt $P(A) = \\text{günstige Ergebnisse} / \\text{alle Ergebnisse}$. Typisches Beispiel: idealer Würfel, faire Münze." }
  ]
},
{
  id: "stat02-single-01", type: "single", course: "Statistik",
  topic: "Wahrscheinlichkeitsrechnung", difficulty: 2,
  tags: ["Bedingte Wahrscheinlichkeit", "Vierfeldertafel"],
  question: "In einer Arbeitsgruppe sind 60 Personen (36 Frauen, 24 Männer). Davon rauchen 9 Frauen und 16 Männer. Wie gross ist die Wahrscheinlichkeit, dass eine zufällig gewählte Person raucht, gegeben dass sie eine Frau ist?",
  options: ["25%", "36%", "42%", "15%"],
  correctIndex: 0,
  explanation: "$P(\\text{Raucher}|\\text{Frau}) = P(\\text{Raucher} \\cap \\text{Frau}) / P(\\text{Frau}) = (9/60) / (36/60) = 9/36 = 0.25 = 25\\%$. Die Quote (Odds) bei Frauen: 9:27 = 1:3, bei Männern: 16:8 = 2:1 — Männer rauchen relativ deutlich häufiger."
},
{
  id: "stat02-single-02", type: "single", course: "Statistik",
  topic: "Wahrscheinlichkeitsrechnung", difficulty: 2,
  tags: ["Binomialverteilung", "Erwartungswert", "Varianz"],
  question: "Eine binomialverteilte Zufallsvariable X hat E(X) = 2 und Var(X) = 4/3. Wie gross ist n?",
  options: ["n = 3", "n = 6", "n = 4", "n = 12"],
  correctIndex: 1,
  explanation: "Aus $E(X) = n \\cdot p = 2$ und $\\text{Var}(X) = n \\cdot p \\cdot (1-p) = 4/3$ folgt: $(1-p) = (4/3)/2 = 2/3$, also $p = 1/3$. Damit: $n = E(X)/p = 2/(1/3) = 6$."
},
{
  id: "stat02-single-03", type: "single", course: "Statistik",
  topic: "Wahrscheinlichkeitsrechnung", difficulty: 2,
  tags: ["Hypergeometrisch", "Kombinatorik", "Verteilung"],
  question: "Aus 14 Bewerbern (5 erfahren, 9 unerfahren) werden 5 ausgewählt. Welche Verteilung beschreibt die Anzahl erfahrener Mitglieder korrekt?",
  options: [
    "Binomialverteilung — n=14, p=5/14",
    "Poissonverteilung — λ=5·(5/14)",
    "Hypergeometrische Verteilung — Ziehen ohne Zurücklegen",
    "Normalverteilung — Approximation"
  ],
  correctIndex: 2,
  explanation: "Ziehen ohne Zurücklegen aus einer endlichen Grundgesamtheit → Hypergeometrische Verteilung. Binomial wäre nur korrekt, wenn mit Zurücklegen gezogen würde (oder die Grundgesamtheit sehr gross wäre)."
},
{
  id: "stat02-single-04", type: "single", course: "Statistik",
  topic: "Wahrscheinlichkeitsrechnung", difficulty: 2,
  tags: ["Poisson", "Approximation", "Binomial"],
  question: "2% der Mitarbeiter leiden unter Depressionen. Bei n=100 Mitarbeitern: Wann ist die Poisson-Approximation der Binomialverteilung sinnvoll?",
  options: [
    "Immer, wenn n > 30",
    "Wenn n gross (n ≥ 50) und p klein (p ≤ 0.1) sind, so dass λ = n·p klein bleibt",
    "Wenn p nahe bei 0.5 liegt",
    "Nur wenn n·p > 5"
  ],
  correctIndex: 1,
  explanation: "Faustregel: Poisson-Approximation ist gut, wenn n ≥ 50 und p ≤ 0.1. Hier: λ = n·p = 100·0.02 = 2. Die Approximation ist gut, weil n gross und p sehr klein. Für p ≈ 0.5 ist stattdessen die Normalapproximation sinnvoll."
},
{
  id: "stat02-multi-01", type: "multiple", course: "Statistik",
  topic: "Wahrscheinlichkeitsrechnung", difficulty: 2,
  tags: ["Kombinatorik", "Permutation", "Kombination"],
  question: "Welche Aussagen über Kombinatorik treffen zu? (Mehrfachauswahl)",
  options: [
    "Die Anzahl Permutationen von n Elementen beträgt n!",
    "Eine Kombination ohne Wiederholung aus n Elementen zu k lautet $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$",
    "Bei einem 4-stelligen Code aus Ziffern 0–9 mit Wiederholung gibt es 10! Möglichkeiten",
    "Beim Aussendienstmitarbeiter (12 Kunden, 8 Termine) gibt es $\\binom{12}{8}$ Möglichkeiten"
  ],
  correctIndices: [0, 1, 3],
  explanation: "Option A und B sind Standarddefinitionen. Option D: $\\binom{12}{8} = \\binom{12}{4} = 495$ — Reihenfolge spielt keine Rolle, also Kombination. Option C ist falsch: mit Wiederholung gibt es $10^4 = 10'000$ Möglichkeiten, nicht 10!."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 3: Wahrscheinlichkeitsverteilungen
// ════════════════════════════════════════════════════════════════

{
  id: "stat03-order-01", type: "order", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Normalverteilung", "Standardisierung", "Schritte"],
  prompt: "Bringe die Schritte zur Normalverteilungs-Berechnung von $P(X \\leq x)$ in die richtige Reihenfolge:",
  items: [
    "Z-Wert berechnen: $Z = (x - \\mu) / \\sigma$",
    "Normalverteilungstabelle aufschlagen",
    "$\\Phi(z)$ ablesen — das ist $P(X \\leq x)$",
    "Vorzeichen prüfen: bei negativem z gilt $\\Phi(-z) = 1 - \\Phi(z)$"
  ],
  explanation: "Zuerst standardisieren (Z-Transform), dann in der Standardnormalverteilungs-Tabelle nachschlagen. Bei negativem z: die meisten Tabellen geben nur positive Werte — Symmetrie der Normalverteilung nutzen: $\\Phi(-z) = 1 - \\Phi(z)$."
},
{
  id: "stat03-tf-01", type: "truefalse", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Prüfungsfalle", "Normalverteilung", "t-Verteilung", "Verteilungsauswahl"],
  prompt: "Verteilungen — wahr oder falsch?",
  statements: [
    { text: "Die t-Verteilung wird verwendet, wenn die Grundgesamtheitsvarianz $\\sigma^2$ unbekannt ist.", isTrue: true, explanation: "Korrekt — bei unbekanntem σ² schätzt man s² aus der Stichprobe und verwendet die t-Verteilung mit (n-1) Freiheitsgraden statt der z-Standardnormalverteilung." },
    { text: "Bei der Standardisierung gilt: $Z = (X - \\mu) / \\sigma^2$.", isTrue: false, explanation: "Falsch — korrekt ist $Z = (X - \\mu) / \\sigma$, also Division durch die Standardabweichung (nicht die Varianz). Das ist eine der häufigsten Flüchtigkeitsfehler." },
    { text: "Für grosse n nähert sich die t-Verteilung der Standardnormalverteilung an.", isTrue: true, explanation: "Korrekt — für $n \\to \\infty$ (bzw. df $\\to \\infty$) gilt $t(df) \\to N(0,1)$. Als Faustregel: ab n ≈ 30 sind die Unterschiede gering." },
    { text: "Die Poisson-Verteilung hat die Eigenschaft: $E(X) = \\text{Var}(X) = \\lambda$.", isTrue: true, explanation: "Korrekt — Erwartungswert und Varianz sind bei der Poisson-Verteilung gleich (beide = λ). Das ist ein eindeutiges Erkennungsmerkmal." },
    { text: "Beim χ²-Test testet man eine Hypothese über den Mittelwert.", isTrue: false, explanation: "Falsch — der χ²-Test (Einstichprobe) testet eine Hypothese über die Varianz $\\sigma^2$, nicht den Mittelwert. Für den Mittelwert verwendet man z-Test oder t-Test." }
  ]
},
{
  id: "stat03-single-01", type: "single", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Normalverteilung", "Standardisierung", "Berechnung"],
  question: "Haushalts­einkommen: $\\mu = 7416$ CHF, $\\sigma = 910$ CHF (normalverteilt). Welcher Anteil der Haushalte verdient mehr als 10'000 CHF?",
  options: [
    "ca. 0.2%",
    "ca. 2.4%",
    "ca. 5.0%",
    "ca. 11.5%"
  ],
  correctIndex: 1,
  explanation: "$Z = (10000 - 7416) / 910 = 2584/910 \\approx 2.84$. $P(X > 10000) = 1 - \\Phi(2.84) \\approx 1 - 0.9977 = 0.0023 \\approx 2.3\\%$. Bei z ≈ 2.84 liegt man sehr weit rechts im Schwanz der Normalverteilung."
},
{
  id: "stat03-single-02", type: "single", course: "Statistik",
  topic: "Verteilungen", difficulty: 1,
  tags: ["Verteilungsauswahl", "Binomial", "Poisson", "Hypergeometrisch", "Normal"],
  question: "In einem Produktionsunternehmen fallen durchschnittlich 0.4 Virusattacken/Woche auf das Netz an. Welche Verteilung ist geeignet?",
  options: [
    "Binomialverteilung B(n, p)",
    "Poisson-Verteilung Poi(λ)",
    "Normalverteilung N(μ, σ²)",
    "Hypergeometrische Verteilung"
  ],
  correctIndex: 1,
  explanation: "Seltene Ereignisse in einem Zeitintervall → Poisson mit λ = 0.4. Erkennungsmerkmal: 'im Mittel x Ereignisse pro Zeiteinheit', keine feste Anzahl Versuche n bekannt, Ereignisse selten und unabhängig."
},
{
  id: "stat03-multi-01", type: "multiple", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Verteilungsauswahl", "Merkmale", "Übersicht"],
  question: "Welche Situationen passen zur Binomialverteilung? (Mehrfachauswahl)",
  options: [
    "n unabhängige Versuche, jeder mit Erfolgswahrscheinlichkeit p",
    "Ziehen ohne Zurücklegen aus einer kleinen Grundgesamtheit",
    "7-maliges Drehen eines Glücksrads, Zählen der Treffer auf Feld 8",
    "Anzahl Virusattacken pro Woche bei sehr seltenen Angriffen",
    "Anzahl Studenten mit Teilzeitjob in einer Stichprobe von n=20 (p=0.4)"
  ],
  correctIndices: [0, 2, 4],
  explanation: "Binomial: festes n, unabhängige Versuche, konstantes p, zwei Ausgänge (Treffer/kein Treffer). Option B ist hypergeometrisch (ohne Zurücklegen, endliche GG). Option D ist Poisson (seltene Ereignisse, kein festes n)."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 4: Schätztheorie & Konfidenzintervalle
// ════════════════════════════════════════════════════════════════

{
  id: "stat04-order-01", type: "order", course: "Statistik",
  topic: "Schätztheorie", difficulty: 2,
  tags: ["Konfidenzintervall", "Berechnungsschritte", "KI"],
  prompt: "Bringe die Schritte zur Berechnung eines Konfidenzintervalls für μ in die richtige Reihenfolge:",
  items: [
    "Prüfen: ist σ bekannt? → z-Wert; unbekannt? → t-Wert (n-1 df)",
    "Signifikanzniveau α festlegen, kritischen Wert $z_{\\alpha/2}$ bzw. $t_{n-1,\\,\\alpha/2}$ ablesen",
    "Stichprobenmittelwert $\\bar{x}$ und ggf. $s$ berechnen",
    "KI berechnen: $\\bar{x} \\pm z_{\\alpha/2} \\cdot \\sigma / \\sqrt{n}$"
  ],
  explanation: "Die Reihenfolge ist: zuerst Stichprobenstatistiken bestimmen, dann entscheiden ob σ bekannt (z) oder unbekannt (t), dann kritischen Wert ablesen, schliesslich das Intervall berechnen."
},
{
  id: "stat04-tf-01", type: "truefalse", course: "Statistik",
  topic: "Schätztheorie", difficulty: 2,
  tags: ["Prüfungsfalle", "Konfidenzintervall", "Interpretation", "Stichprobenumfang"],
  prompt: "Konfidenzintervalle — wahr oder falsch?",
  statements: [
    { text: "Ein 95%-KI bedeutet: 'Der wahre Parameter liegt mit 95% Wahrscheinlichkeit in diesem Intervall.'", isTrue: false, explanation: "Falsch — diese Interpretation ist die häufigste Prüfungsfalle! Korrekt: 'Bei 100 wiederholten Stichproben würde das konstruierte KI in 95 Fällen den wahren Parameter enthalten.' Der Parameter ist fix, nicht zufällig." },
    { text: "Mit wachsendem Stichprobenumfang n wird das Konfidenzintervall enger.", isTrue: true, explanation: "Korrekt — die Länge des KI ist proportional zu $\\sigma/\\sqrt{n}$. Grösseres n → kleinerer Standardfehler → engeres KI." },
    { text: "Für ein KI für den Anteilswert p wird die Formel $p \\pm z_{\\alpha/2} \\cdot \\sqrt{p(1-p)/n}$ verwendet.", isTrue: true, explanation: "Korrekt — das ist das KI für einen Anteilswert (Bernoulli-Variable). Voraussetzung: n·p ≥ 5 und n·(1-p) ≥ 5 für die Normalapproximation." },
    { text: "Ein breiteres Konfidenzintervall bedeutet mehr Präzision.", isTrue: false, explanation: "Falsch — ein breiteres KI bedeutet weniger Präzision (grössere Unsicherheit). Engere Intervalle sind präziser. Man erhält engere Intervalle durch grösseres n oder durch Senkung des Konfidenzniveaus." }
  ]
},
{
  id: "stat04-single-01", type: "single", course: "Statistik",
  topic: "Schätztheorie", difficulty: 2,
  tags: ["KI für μ", "σ bekannt", "z-Wert"],
  question: "Produktionslinie: σ=0.3cm bekannt, n=30, x̄=15.05cm. Welche Formel für das 99%-KI?",
  options: [
    "$15.05 \\pm 1.645 \\cdot 0.3/\\sqrt{30}$",
    "$15.05 \\pm 1.96 \\cdot 0.3/\\sqrt{30}$",
    "$15.05 \\pm 2.576 \\cdot 0.3/\\sqrt{30}$",
    "$15.05 \\pm t_{29,\\,0.005} \\cdot 0.3/\\sqrt{30}$"
  ],
  correctIndex: 2,
  explanation: "σ ist bekannt → z-Verteilung (nicht t). Für 99%-KI: $\\alpha = 0.01$, $\\alpha/2 = 0.005$ → $z_{0.005} = 2.576$. Merke die drei wichtigsten z-Werte: 1.645 (90%), 1.96 (95%), 2.576 (99%)."
},
{
  id: "stat04-single-02", type: "single", course: "Statistik",
  topic: "Schätztheorie", difficulty: 2,
  tags: ["Stichprobenumfang", "Fehlergrenze", "KI für Anteil"],
  question: "600 Studenten befragt, 360 haben Natel-Abo. Welches ist der korrekte Punktschätzer für den Anteil in der Grundgesamtheit?",
  options: ["p̂ = 0.5", "p̂ = 0.6", "p̂ = 0.65", "p̂ = 0.36"],
  correctIndex: 1,
  explanation: "$\\hat{p} = 360/600 = 0.60 = 60\\%$. Das 95%-KI wäre: $0.60 \\pm 1.96 \\cdot \\sqrt{0.60 \\cdot 0.40 / 600} = 0.60 \\pm 0.039$, also ca. [56.1%, 63.9%]."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 5: Hypothesentests
// ════════════════════════════════════════════════════════════════

{
  id: "stat05-order-01", type: "order", course: "Statistik",
  topic: "Hypothesentests", difficulty: 1,
  tags: ["Testschema", "Hypothesentest", "Schritte"],
  prompt: "Bringe das Standard-Testschema in die richtige Reihenfolge:",
  items: [
    "$H_0$ und $H_1$ formulieren",
    "Signifikanzniveau α festlegen",
    "Teststatistik berechnen",
    "Kritischen Wert aus Tabelle ablesen",
    "Entscheidungsregel anwenden und Ergebnis interpretieren"
  ],
  explanation: "Das Testschema ist immer gleich — auswendig lernen! Wichtig: H0 und H1 zuerst klar formulieren, bevor man rechnet. Die Entscheidungsregel: |T| > k_krit → H0 ablehnen. Alternativ: p-Wert < α → H0 ablehnen."
},
{
  id: "stat05-tf-01", type: "truefalse", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["Prüfungsfalle", "α-Fehler", "β-Fehler", "Welch", "Pooled"],
  prompt: "Hypothesentests — wahr oder falsch?",
  statements: [
    { text: "Der α-Fehler (Typ-I-Fehler) ist die Wahrscheinlichkeit, H0 fälschlicherweise abzulehnen.", isTrue: true, explanation: "Korrekt — α-Fehler = 'false positive', H0 ist wahr, wird aber abgelehnt. Das Signifikanzniveau α ist genau diese Fehlerwahrscheinlichkeit, die man im Voraus festlegt." },
    { text: "Bei einem zweiseitigen Test mit α=0.05 liest man $z_{0.05}$ = 1.645 aus der Tabelle ab.", isTrue: false, explanation: "Falsch — beim zweiseitigen Test teilt man α auf beide Seiten auf: $\\alpha/2 = 0.025$, also $z_{0.025} = 1.96$. $z_{0.05} = 1.645$ gilt für einseitige Tests auf dem 5%-Niveau." },
    { text: "Für den Welch-t-Test braucht man keinen vorherigen F-Test auf Varianzhomogenität.", isTrue: true, explanation: "Korrekt — Welch ist immer anwendbar (robust gegenüber ungleichen Varianzen). Der Pooled t-Test setzt Varianzhomogenität voraus, die zuerst per F-Test geprüft werden muss." },
    { text: "Ein kleiner p-Wert spricht gegen die Nullhypothese.", isTrue: true, explanation: "Korrekt — der p-Wert ist die Wahrscheinlichkeit, die beobachteten Daten (oder extremere) zu erhalten, wenn H0 wahr wäre. Kleiner p-Wert = die Daten sind unter H0 unwahrscheinlich → H0 ablehnen." },
    { text: "Beim F-Test für Varianzhomogenität lautet die H0: $\\sigma_1^2 \\neq \\sigma_2^2$.", isTrue: false, explanation: "Falsch — H0 beim F-Test für Varianzhomogenität lautet $\\sigma_1^2 = \\sigma_2^2$ (Varianzen sind gleich). H1 wäre $\\sigma_1^2 \\neq \\sigma_2^2$. Wenn H0 nicht abgelehnt wird → Pooled t-Test, sonst → Welch." }
  ]
},
{
  id: "stat05-single-01", type: "single", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["z-Test", "t-Test", "Testauswahl"],
  question: "Stanzmaschine: σ=0.7mm bekannt, n=35, x̄=2.025cm, μ₀=2cm, α=0.01. Welcher Test ist korrekt?",
  options: [
    "t-Test (einseitig), weil n < 30",
    "z-Test (zweiseitig), weil σ bekannt und μ₀ = 2 cm geprüft wird",
    "F-Test, weil Varianzen verglichen werden",
    "χ²-Test, weil über die Streuung geurteilt wird"
  ],
  correctIndex: 1,
  explanation: "σ bekannt → z-Test. Die Frage lautet 'sollte die Maschine neu justiert werden?' = Abweichung in beide Richtungen relevant → zweiseitig. $T = (\\bar{x} - \\mu_0)/(\\sigma/\\sqrt{n}) = (2.025-2.0)/(0.07/\\sqrt{35}) \\approx 2.11$. Kritischer Wert: $z_{0.005} = 2.576$. Da |T| < 2.576 → H0 nicht abgelehnt."
},
{
  id: "stat05-single-02", type: "single", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["Zweistichproben", "Welch", "Pooled", "Entscheidung"],
  question: "Reifenvergleich: $s_1 = 4000$km, $s_2 = 3000$km. Der F-Test ergibt, dass die Varianzen signifikant verschieden sind. Welcher Test ist jetzt korrekt für den Mittelwertvergleich?",
  options: [
    "Pooled t-Test (Varianzhomogenität vorausgesetzt)",
    "Welch t-Test (robuster gegenüber ungleichen Varianzen)",
    "z-Test (Normalapproximation)",
    "χ²-Test (Varianzvergleich)"
  ],
  correctIndex: 1,
  explanation: "Wenn der F-Test H0 (Varianzhomogenität) ablehnt → Varianzen sind signifikant verschieden → Pooled t-Test wäre verletzt → Welch t-Test verwenden. Merke: F-Test zuerst → wenn H0 nicht abgelehnt → Pooled; wenn H0 abgelehnt → Welch."
},
{
  id: "stat05-multi-01", type: "multiple", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["Einseitig", "Zweiseitig", "H0 Formulierung"],
  question: "Bei welchen Fragestellungen ist ein einseitiger Test (und nicht zweiseitig) angebracht? (Mehrfachauswahl)",
  options: [
    "Untersuchung der Zunahme der Luftverschmutzung (hat sie zugenommen?)",
    "Prüfung der Abweichung eines technischen Normteils von der vorgegebenen Norm",
    "Prüfung ob eine Partei die 5%-Hürde überwindet (überwindet sie?)",
    "Untersuchung ob sich der Alkoholkonsum verändert hat"
  ],
  correctIndices: [0, 2],
  explanation: "Einseitig: wenn man nur an einer Richtung interessiert ist. 'Zunahme Luftverschmutzung' (nur H1: μ > μ₀) und '5%-Hürde überwunden' (nur H1: p > 0.05) → einseitig. 'Abweichung vom Normteil' (beide Richtungen, zu lang oder zu kurz) und 'Änderung Alkohol' (zu- oder abnehmend) → zweiseitig."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 6: ANOVA & Regression
// ════════════════════════════════════════════════════════════════

{
  id: "stat06-tf-01", type: "truefalse", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 2,
  tags: ["Prüfungsfalle", "ANOVA", "R²", "Regression"],
  prompt: "ANOVA und Regression — wahr oder falsch?",
  statements: [
    { text: "Bei der ANOVA gilt: $SST = SSB + SSW$ (Gesamtstreuung = Streuung zwischen den Gruppen + Streuung innerhalb der Gruppen).", isTrue: true, explanation: "Korrekt — das ist die Zerlegung der Gesamtstreuung. SST = Sum of Squares Total, SSB = Between Groups, SSW = Within Groups. Der F-Test prüft ob SSB relativ zu SSW gross genug ist." },
    { text: "Ein $R^2 = 0.85$ bedeutet, dass 85% der Varianz in Y durch das Regressionsmodell erklärt werden.", isTrue: true, explanation: "Korrekt — das Bestimmtheitsmass $R^2 = SSR/SST = 1 - SSE/SST$ gibt den Anteil der erklärten Varianz an. $R^2 \\in [0,1]$; höherer Wert bedeutet bessere Modellanpassung." },
    { text: "Eine hohe Kovarianz zwischen X und Y beweist einen kausalen Einfluss von X auf Y.", isTrue: false, explanation: "Falsch — Korrelation und Kovarianz messen nur den linearen Zusammenhang, nicht Kausalität. 'Korrelation ≠ Kausalität' ist ein Grundprinzip der Statistik." },
    { text: "Der KQ-Schätzer $\\hat{\\beta}_1$ minimiert die Summe der quadrierten Residuen.", isTrue: true, explanation: "Korrekt — die Methode der kleinsten Quadrate (KQ/OLS) findet jene $\\hat{\\beta}_0$ und $\\hat{\\beta}_1$, die $\\sum(y_i - \\hat{y}_i)^2$ minimieren." },
    { text: "Bei der ANOVA ist der F-Test immer zweiseitig.", isTrue: false, explanation: "Falsch — der F-Test bei der ANOVA ist einseitig (rechtsseitig), weil der F-Wert immer positiv ist. H0: alle Gruppenmittelwerte gleich; H1: mindestens zwei Mittelwerte verschieden." }
  ]
},
{
  id: "stat06-single-01", type: "single", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 2,
  tags: ["ANOVA", "F-Test", "Freiheitsgrade"],
  question: "Drei Gruppen (k=3), insgesamt n=18 Beobachtungen. Wie lauten die Freiheitsgrade des F-Tests bei der einfachen ANOVA?",
  options: [
    "df₁ = 2, df₂ = 15",
    "df₁ = 3, df₂ = 15",
    "df₁ = 2, df₂ = 17",
    "df₁ = 3, df₂ = 14"
  ],
  correctIndex: 0,
  explanation: "$df_1 = k-1 = 3-1 = 2$ (zwischen den Gruppen), $df_2 = n-k = 18-3 = 15$ (innerhalb der Gruppen). Der F-Test lautet: $F = (SSB/(k-1)) / (SSW/(n-k)) \\sim F(2, 15)$."
},
{
  id: "stat06-single-02", type: "single", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 2,
  tags: ["Regression", "β₁", "Steigung", "KQ"],
  question: "Welche Formel berechnet die KQ-Schätzung für den Regressionskoeffizient $\\hat{\\beta}_1$?",
  options: [
    "$\\hat{\\beta}_1 = \\bar{y} / \\bar{x}$",
    "$\\hat{\\beta}_1 = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sum(x_i - \\bar{x})^2}$",
    "$\\hat{\\beta}_1 = \\frac{\\sum x_i y_i}{\\sum x_i^2}$",
    "$\\hat{\\beta}_1 = \\text{cov}(X,Y) / \\text{Var}(Y)$"
  ],
  correctIndex: 1,
  explanation: "$\\hat{\\beta}_1 = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{\\sum(x_i-\\bar{x})^2} = \\frac{\\text{cov}_{XY}}{s_X^2}$. Danach: $\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\cdot \\bar{x}$. Die Regressionsgerade geht immer durch $(\\bar{x}, \\bar{y})$."
},
{
  id: "stat06-single-03", type: "single", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 2,
  tags: ["Korrelation", "Kovarianz", "Interpretation"],
  question: "Bravais-Pearson Korrelationskoeffizient $\\rho_{XY} = 0$. Was folgt daraus?",
  options: [
    "X und Y sind stochastisch unabhängig",
    "Es besteht kein linearer Zusammenhang zwischen X und Y",
    "Die Regressionsgerade hat die Steigung 0 und Bestimmtheitsmass R²=0",
    "Sowohl B als auch C treffen zu, aber nicht A"
  ],
  correctIndex: 3,
  explanation: "$\\rho = 0$ bedeutet: kein linearer Zusammenhang (also B). Daraus folgt auch $\\hat{\\beta}_1 = 0$ und $R^2 = 0$ (also C). Aber stochastische Unabhängigkeit (A) folgt nicht — es könnte ein nicht-linearer Zusammenhang bestehen (z.B. quadratisch)."
},
{
  id: "stat06-multi-01", type: "multiple", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 3,
  tags: ["ANOVA", "Regression", "Voraussetzungen"],
  question: "Welche Aussagen über die einfache lineare Regression sind korrekt? (Mehrfachauswahl)",
  options: [
    "Die Regressionsgerade minimiert die Summe der quadrierten vertikalen Abstände (Residuen)",
    "$R^2$ kann negativ werden, wenn das Modell sehr schlecht ist",
    "$\\hat{\\beta}_0$ ist der y-Achsenabschnitt — der vorhergesagte Y-Wert wenn X=0",
    "Die Regressionsgerade verläuft stets durch den Punkt $(\\bar{x}, \\bar{y})$",
    "Korrelation und Kausalität sind dasselbe, wenn R² > 0.9"
  ],
  correctIndices: [0, 2, 3],
  explanation: "A: Korrekt — KQ-Methode minimiert $\\sum(y_i - \\hat{y}_i)^2$. C: Korrekt — $\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\bar{x}$. D: Korrekt — beweisbar aus der KQ-Herleitung. B: Falsch — $R^2 \\in [0,1]$ ist immer nicht-negativ. E: Falsch — Korrelation ≠ Kausalität, egal wie hoch."
}

,

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 1b: Häufigkeitsverteilung & Quartile
// ════════════════════════════════════════════════════════════════

{
  id: "stat01-single-04", type: "single", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 2,
  tags: ["Häufigkeitsverteilung", "Kumuliert", "Relative Häufigkeit"],
  question: "Stadt: 457 Haushalte mit 1 Person, 628 mit 2, 612 mit 3, 526 mit 4, 344 mit 5+. Gesamt: 2567. Wie viele Haushalte haben 3 oder weniger Personen (relativ, kumuliert)?",
  options: ["42.3%", "66.1%", "86.6%", "53.8%"],
  correctIndex: 1,
  explanation: "Kumulierte relative Häufigkeit bis x=3: $F(3) = (457+628+612)/2567 = 1697/2567 \\approx 0.661 = 66.1\\%$. Aufbau der Häufigkeitsverteilung: absolute Häufigkeiten $n_i$, relative $f(x_i) = n_i/n$, kumulierte $F(x_i) = \\sum_{j \\leq i} f(x_j)$."
},
{
  id: "stat01-single-05", type: "single", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 2,
  tags: ["Quartile", "IQR", "Quartilsabstand"],
  question: "Was ist der Quartilsabstand (IQR) und wofür wird er verwendet?",
  options: [
    "IQR = Q3 + Q1; misst die Gesamtspannweite",
    "IQR = Q3 - Q1; robustes Streuungsmass, das 50% der mittleren Daten umfasst",
    "IQR = Median - Mittelwert; misst die Schiefe der Verteilung",
    "IQR = (xmax - xmin)/4; der vierte Teil der Spannweite"
  ],
  correctIndex: 1,
  explanation: "$IQR = Q_3 - Q_1$ umfasst die mittleren 50% der Daten. Er ist robust gegenüber Ausreissern (anders als die Spannweite). Quartilsposition: $Q_i$ liegt an Position $i \\cdot (n+1)/4$ in der sortierten Reihe."
},
{
  id: "stat01-tf-02", type: "truefalse", course: "Statistik",
  topic: "Deskriptive Statistik", difficulty: 1,
  tags: ["Häufigkeitsverteilung", "Quartile", "Grundbegriffe"],
  prompt: "Häufigkeiten und Quartile — wahr oder falsch?",
  statements: [
    { text: "Die kumulierte relative Häufigkeit $F(x_i)$ liegt immer zwischen 0 und 1.", isTrue: true, explanation: "Korrekt — $F(x_i) = \\sum_{j \\leq i} f(x_j)$, wobei $\\sum_i f(x_i) = 1$. Damit gilt $0 \\leq F(x_i) \\leq 1$." },
    { text: "Der Interquartilsabstand IQR = Q3 - Q1 enthält genau 50% aller Datenpunkte.", isTrue: true, explanation: "Korrekt — Q1 ist das 25%-Quantil und Q3 das 75%-Quantil, also liegen genau 50% der Beobachtungen im Bereich [Q1, Q3]." },
    { text: "Für die Position von Q1 in einer sortierten Reihe gilt: Position = n/4.", isTrue: false, explanation: "Falsch — korrekt ist Position = 1·(n+1)/4 (nicht n/4). Für Q2 (Median): 2·(n+1)/4 = (n+1)/2. Für Q3: 3·(n+1)/4." },
    { text: "Das erste Dezil $D_1$ entspricht dem 10%-Quantil der Verteilung.", isTrue: true, explanation: "Korrekt — Dezile teilen die sortierte Datenreihe in 10 gleiche Teile. $D_1$ ist das 10%-Quantil, Position = 1·(n+1)/10." }
  ]
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 3b: Exponentialverteilung & ZGS
// ════════════════════════════════════════════════════════════════

{
  id: "stat03-single-03", type: "single", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Exponentialverteilung", "Lebensdauer", "Verteilung"],
  question: "Ein Bauteil hält im Schnitt 10 Jahre (exponentialverteilt). Mit welcher Wahrscheinlichkeit hält es 8 Jahre oder kürzer?",
  options: ["ca. 33%", "ca. 45%", "ca. 55%", "ca. 80%"],
  correctIndex: 2,
  explanation: "$E(X) = 1/\\lambda = 10 \\Rightarrow \\lambda = 0.1$. $P(X \\leq 8) = F(8) = 1 - e^{-\\lambda x} = 1 - e^{-0.1 \\cdot 8} = 1 - e^{-0.8} \\approx 1 - 0.449 = 0.551 \\approx 55\\%$."
},
{
  id: "stat03-single-04", type: "single", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Exponentialverteilung", "Formel", "P(X≥x)"],
  question: "Zugverspätungen sind exponentialverteilt mit mittlerer Verspätung = 5 Min. Wie gross ist $P(X \\geq 10)$?",
  options: ["$e^{-2} \\approx 13.5\\%$", "$1-e^{-2} \\approx 86.5\\%$", "$e^{-0.5} \\approx 60.7\\%$", "$1-e^{-0.5} \\approx 39.3\\%$"],
  correctIndex: 0,
  explanation: "$\\lambda = 1/5 = 0.2$. $P(X \\geq 10) = 1 - F(10) = e^{-\\lambda x} = e^{-0.2 \\cdot 10} = e^{-2} \\approx 0.135$. Merke: $P(X \\geq x) = e^{-\\lambda x}$ — das ist die komplementäre Verteilungsfunktion der Exponentialverteilung."
},
{
  id: "stat03-tf-02", type: "truefalse", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["ZGS", "Stichprobenverteilung", "Zentraler Grenzwertsatz"],
  prompt: "Zentraler Grenzwertsatz (ZGS) — wahr oder falsch?",
  statements: [
    { text: "Der ZGS besagt: Für grosse n ist $\\bar{X} \\approx N(\\mu, \\sigma^2/n)$, unabhängig von der Grundgesamtheitsverteilung.", isTrue: true, explanation: "Korrekt — das ist der Kern des ZGS. Ab n ≈ 30 gilt diese Approximation. Der Standardfehler des Mittelwerts ist $\\sigma/\\sqrt{n}$." },
    { text: "Mit steigendem Stichprobenumfang n nimmt die Streuung des Stichprobenmittelwerts zu.", isTrue: false, explanation: "Falsch — es gilt $\\text{Var}(\\bar{X}) = \\sigma^2/n$. Mit wachsendem n nimmt die Streuung von $\\bar{X}$ ab. Dies ist der Grund, warum grössere Stichproben präzisere Schätzer liefern." },
    { text: "Für den Stichprobenanteil $\\hat{p}$ gilt näherungsweise: $\\hat{p} \\approx N(\\pi, \\pi(1-\\pi)/n)$.", isTrue: true, explanation: "Korrekt — Voraussetzung: $n \\cdot \\pi \\geq 5$ und $n \\cdot (1-\\pi) \\geq 5$. Der Standardfehler des Anteils ist $\\sqrt{\\pi(1-\\pi)/n}$." },
    { text: "Der ZGS gilt nur, wenn die Grundgesamtheit normalverteilt ist.", isTrue: false, explanation: "Falsch — gerade das Gegenteil ist die Aussage des ZGS: er gilt für beliebige Grundgesamtheitsverteilungen (mit endlicher Varianz), sofern n gross genug ist (n ≥ 30 als Faustregel)." }
  ]
},
{
  id: "stat03-single-05", type: "single", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["ZGS", "Stichprobenverteilung", "Standardfehler"],
  question: "Überstunden pro Jahr: μ=62, σ=15. Stichprobe n=36. Wie gross ist $P(\\bar{X} < 65)$?",
  options: ["ca. 88%", "ca. 92%", "ca. 97%", "ca. 84%"],
  correctIndex: 0,
  explanation: "Standardfehler: $\\sigma_{\\bar{X}} = \\sigma/\\sqrt{n} = 15/\\sqrt{36} = 2.5$. Standardisieren: $Z = (65-62)/2.5 = 1.2$. $P(\\bar{X} < 65) = \\Phi(1.2) \\approx 0.885 \\approx 88\\%$."
},
{
  id: "stat03-single-06", type: "single", course: "Statistik",
  topic: "Verteilungen", difficulty: 2,
  tags: ["Stichprobenverteilung", "Anteil", "Normalapproximation"],
  question: "17% der Aktienfonds-Besitzer sind Rentner (π=0.17). Stichprobe n=400. Was ist der Standardfehler von $\\hat{p}$?",
  options: ["$\\approx 1.87\\%$", "$\\approx 3.42\\%$", "$\\approx 5.00\\%$", "$\\approx 0.43\\%$"],
  correctIndex: 0,
  explanation: "$SE(\\hat{p}) = \\sqrt{\\pi(1-\\pi)/n} = \\sqrt{0.17 \\cdot 0.83 / 400} = \\sqrt{0.1411/400} = \\sqrt{0.000353} \\approx 0.0188 = 1.88\\%$. Damit: $P(\\hat{p} \\geq 0.20) = P(Z \\geq (0.20-0.17)/0.0188) = P(Z \\geq 1.60) = 1 - \\Phi(1.60) \\approx 5.5\\%$."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 4b: Prognoseintervall & Stichprobenumfang
// ════════════════════════════════════════════════════════════════

{
  id: "stat04-tf-02", type: "truefalse", course: "Statistik",
  topic: "Schätztheorie", difficulty: 3,
  tags: ["Prognoseintervall", "Konfidenzintervall", "Unterschied"],
  prompt: "Prognoseintervall vs. Konfidenzintervall — wahr oder falsch?",
  statements: [
    { text: "Das Konfidenzintervall schätzt den unbekannten Parameter $\\mu$ der Grundgesamtheit.", isTrue: true, explanation: "Korrekt — KI ist ein Rückschluss von der Stichprobe auf den fixen, unbekannten Parameter der Grundgesamtheit (Repräsentationsschluss)." },
    { text: "Das Prognoseintervall gibt an, in welchem Bereich eine neue Einzelbeobachtung mit Wahrscheinlichkeit $(1-\\alpha)$ liegt.", isTrue: true, explanation: "Korrekt — das Prognoseintervall (Inklusionsschluss) schliesst von bekannten Parametern auf eine noch unbekannte Beobachtung. Es ist breiter als das KI, da es die Streuung einer Einzelbeobachtung, nicht des Mittelwerts, abdeckt." },
    { text: "Das Prognoseintervall ist immer enger als das Konfidenzintervall für denselben Parameter.", isTrue: false, explanation: "Falsch — das Prognoseintervall ist breiter, weil es die Variabilität einer Einzelbeobachtung ($\\sigma^2$) abdeckt, während das KI die deutlich geringere Variabilität des Stichprobenmittelwerts ($\\sigma^2/n$) abdeckt." },
    { text: "Bei der Formel für das KI des Anteils gilt als Voraussetzung: $n \\cdot \\hat{p} \\geq 5$ und $n(1-\\hat{p}) \\geq 5$.", isTrue: true, explanation: "Korrekt — diese Faustregeln stellen sicher, dass die Normalapproximation der Binomialverteilung ausreichend gut ist, damit das KI-Verfahren valide ist." }
  ]
},
{
  id: "stat04-single-03", type: "single", course: "Statistik",
  topic: "Schätztheorie", difficulty: 3,
  tags: ["Stichprobenumfang", "Fehlergrenze", "Berechnung"],
  question: "Gesucht: Mindest-n damit das 95%-KI für einen Anteilswert die Fehlergrenze $\\varepsilon = 0.03$ nicht überschreitet (konservative Schätzung mit $\\hat{p} = 0.5$).",
  options: ["n = 752", "n = 1068", "n = 267", "n = 384"],
  correctIndex: 1,
  explanation: "$n = \\left(\\frac{z_{\\alpha/2}}{\\varepsilon}\\right)^2 \\cdot \\hat{p}(1-\\hat{p}) = \\left(\\frac{1.96}{0.03}\\right)^2 \\cdot 0.5 \\cdot 0.5 = 4268.4 \\cdot 0.25 = 1067.1 \\Rightarrow n = 1068$. Konservativ: $\\hat{p} = 0.5$ maximiert $\\hat{p}(1-\\hat{p}) = 0.25$."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 5b: χ²-Test, Zweistichproben-Anteil, β-Fehler
// ════════════════════════════════════════════════════════════════

{
  id: "stat05-single-03", type: "single", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["χ²-Test", "Varianztest", "Teststatistik"],
  question: "Für den χ²-Test der Varianz ($H_0: \\sigma^2 = \\sigma_0^2$) lautet die Teststatistik:",
  options: [
    "$T = (\\bar{x} - \\mu_0)/(s/\\sqrt{n})$",
    "$T = (n-1) \\cdot s^2 / \\sigma_0^2$",
    "$T = s^2 / \\sigma_0^2$",
    "$T = n \\cdot s^2 / \\sigma_0^2$"
  ],
  correctIndex: 1,
  explanation: "$T = \\frac{(n-1) \\cdot s^2}{\\sigma_0^2} \\sim \\chi^2(n-1)$ unter $H_0$. Wichtig: im Zähler steht $(n-1) \\cdot s^2$, nicht $n \\cdot s^2$. Der kritische Bereich hängt davon ab, ob man $H_1: \\sigma^2 > \\sigma_0^2$ (rechtsseitig) oder zweiseitig testet."
},
{
  id: "stat05-single-04", type: "single", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["Zweistichproben", "Anteil", "z-Test"],
  question: "HSG vs. Uni Bern: Anteil Befürworter bargeldloser Zahlung. $n_1=1200, \\hat{p}_1=0.56$ vs. $n_2=900, \\hat{p}_2=0.61$. Welcher Test ist korrekt?",
  options: [
    "t-Test für abhängige Stichproben",
    "z-Test für zwei Anteile (da n gross genug)",
    "F-Test für Varianzhomogenität",
    "χ²-Anpassungstest"
  ],
  correctIndex: 1,
  explanation: "Bei Zweistichproben-Vergleich von Anteilen mit grossem n ($n_1 \\cdot \\hat{p} \\geq 5$ etc.) → z-Test. Teststatistik: $T = (\\hat{p}_1 - \\hat{p}_2)/SE$, wobei $SE = \\sqrt{\\hat{p}(1-\\hat{p})(1/n_1+1/n_2)}$ mit gepooltem $\\hat{p} = (n_1\\hat{p}_1 + n_2\\hat{p}_2)/(n_1+n_2)$."
},
{
  id: "stat05-tf-02", type: "truefalse", course: "Statistik",
  topic: "Hypothesentests", difficulty: 3,
  tags: ["β-Fehler", "Macht", "Teststärke"],
  prompt: "β-Fehler und Teststärke — wahr oder falsch?",
  statements: [
    { text: "Der β-Fehler (Typ-II-Fehler) ist die Wahrscheinlichkeit, H0 fälschlicherweise beizubehalten, obwohl H1 wahr ist.", isTrue: true, explanation: "Korrekt — β-Fehler = 'false negative'. Man übersieht einen echten Effekt. Die Teststärke (Power) = 1 - β." },
    { text: "α und β können gleichzeitig beliebig klein gemacht werden, ohne n zu erhöhen.", isTrue: false, explanation: "Falsch — α und β stehen in einem Trade-off: verkleinert man α (strengeres Kriterium), wird β grösser (man übersieht echte Effekte häufiger). Nur grösseres n reduziert beide gleichzeitig." },
    { text: "Die Teststärke (Power = 1-β) gibt die Wahrscheinlichkeit an, einen echten Effekt zu entdecken.", isTrue: true, explanation: "Korrekt — Power = P(H0 ablehnen | H1 wahr) = 1-β. Eine Teststärke von 0.8 bedeutet: bei 100 Wiederholungen würde man den echten Effekt in 80 Fällen korrekt entdecken." },
    { text: "Je grösser der wahre Effekt $|\\mu_1 - \\mu_0|$, desto kleiner ist der β-Fehler.", isTrue: true, explanation: "Korrekt — je grösser der Effekt, desto weiter liegen die Verteilungen unter H0 und H1 auseinander, desto leichter unterscheidet man sie → kleineres β, grössere Teststärke." }
  ]
},
{
  id: "stat05-multi-02", type: "multiple", course: "Statistik",
  topic: "Hypothesentests", difficulty: 2,
  tags: ["Testauswahl", "Übersicht", "Wann welcher Test"],
  question: "Welche Tests werden für Mittelwertvergleiche verwendet? Ordne richtig zu: (Mehrfachauswahl der korrekten Aussagen)",
  options: [
    "z-Test: σ bekannt (oder n gross genug, σ ≈ s)",
    "t-Test (Einstichprobe): σ unbekannt, n klein",
    "Welch-t-Test: zwei Stichproben, Varianzen ungleich",
    "F-Test: Mittelwertvergleich mehr als 2 Gruppen",
    "χ²-Test: Test auf Varianzhomogenität"
  ],
  correctIndices: [0, 1, 2],
  explanation: "A: z-Test wenn σ bekannt. B: t-Test Einstichprobe wenn σ unbekannt. C: Welch für zwei Stichproben mit ungleichen Varianzen. D falsch: F-Test vergleicht Varianzen (nicht Mittelwerte) — für >2 Gruppen-Mittelwertvergleich ist ANOVA zuständig. E falsch: χ²-Test testet Varianz einer Stichprobe, nicht Varianzhomogenität (das macht der F-Test)."
},

// ════════════════════════════════════════════════════════════════
// STATISTIK — Block 6b: Regression Interpretation & ANOVA Details
// ════════════════════════════════════════════════════════════════

{
  id: "stat06-single-04", type: "single", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 2,
  tags: ["Regression", "β₀", "y-Achsenabschnitt", "Interpretation"],
  question: "Einfache Regression: $\\hat{Y} = 2.4 + 0.8 \\cdot X$ (X = Anrufe/Monat, Y = Vertragsabschlüsse). Wie viele Abschlüsse werden bei 0 Anrufen erwartet?",
  options: ["0 Abschlüsse", "0.8 Abschlüsse", "2.4 Abschlüsse", "3.2 Abschlüsse"],
  correctIndex: 2,
  explanation: "$\\hat{\\beta}_0 = 2.4$ ist der y-Achsenabschnitt: der vorhergesagte Wert von Y, wenn X=0. Hier also 2.4 Abschlüsse ohne Anrufe (Basiswert). $\\hat{\\beta}_1 = 0.8$ bedeutet: jeder zusätzliche Anruf bringt im Schnitt 0.8 weitere Abschlüsse."
},
{
  id: "stat06-single-05", type: "single", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 3,
  tags: ["ANOVA", "Zweifaktoriell", "Blocking"],
  question: "ANOVA mit Blockbildung (zweifaktorielle ANOVA): Warum wird ein Block-Faktor zusätzlich modelliert?",
  options: [
    "Um die Zahl der Freiheitsgrade zu erhöhen",
    "Um den Einfluss einer Störvariable (z.B. Virusstamm) herauszurechnen und die Trennschärfe zu erhöhen",
    "Um die Berechnung des F-Tests zu vereinfachen",
    "Weil bei kleinem n die einfache ANOVA nicht funktioniert"
  ],
  correctIndex: 1,
  explanation: "Im Medikamenten-Beispiel: Blockfaktor = Virusstamm. Durch Modellierung des Blockfaktors wird seine Varianz aus SSW herausgenommen → kleinerer SSW → grössere F-Statistik → mehr Teststärke. Man kann echte Dosierungseffekte besser nachweisen, weil 'Rauschen' durch den Blockfaktor erklärt wird."
},
{
  id: "stat06-order-01", type: "order", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 2,
  tags: ["Regression", "KQ", "Schritte"],
  prompt: "Bringe die Schritte einer einfachen linearen Regression in die richtige Reihenfolge:",
  items: [
    "$\\bar{x}$ und $\\bar{y}$ berechnen",
    "$\\hat{\\beta}_1 = \\frac{\\sum(x_i-\\bar{x})(y_i-\\bar{y})}{\\sum(x_i-\\bar{x})^2}$ berechnen",
    "$\\hat{\\beta}_0 = \\bar{y} - \\hat{\\beta}_1 \\cdot \\bar{x}$ berechnen",
    "$R^2 = 1 - SSE/SST$ berechnen und Modell beurteilen"
  ],
  explanation: "Reihenfolge: Mittelwerte → Steigung β₁ → Achsenabschnitt β₀ → Gütemass R². Die Regressionsgerade verläuft immer durch (x̄, ȳ) — das folgt direkt aus der KQ-Bedingung."
},
{
  id: "stat06-multi-02", type: "multiple", course: "Statistik",
  topic: "ANOVA & Regression", difficulty: 3,
  tags: ["ANOVA", "SST", "SSB", "SSW", "Interpretation"],
  question: "Welche Aussagen über die ANOVA-Zerlegung sind korrekt? (Mehrfachauswahl)",
  options: [
    "$SST = SSB + SSW$ ist die Grundzerlegung der Gesamtstreuung",
    "Grosses SSB relativ zu SSW spricht für unterschiedliche Gruppenmittelwerte",
    "Bei H0 (alle Mittelwerte gleich) folgt der F-Wert einer t-Verteilung",
    "df für SSB = k-1, df für SSW = n-k (k = Gruppen, n = Gesamtbeobachtungen)",
    "R² aus der Regression ist dasselbe wie der F-Wert in der ANOVA"
  ],
  correctIndices: [0, 1, 3],
  explanation: "A: Korrekt — SST (gesamt) = SSB (zwischen Gruppen) + SSW (innerhalb). B: Korrekt — F = (SSB/(k-1))/(SSW/(n-k)); grosses F → H0 ablehnen. D: Korrekt — df1=k-1, df2=n-k. C: Falsch — F-Statistik folgt F-Verteilung, nicht t-Verteilung. E: Falsch — R² misst erklärte Varianz in Regression, nicht dasselbe wie F-Wert (obwohl beide auf ähnlicher Varianzzerlegung basieren)."
}

];
})();
