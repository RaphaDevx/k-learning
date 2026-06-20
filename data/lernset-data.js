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

];
})();
