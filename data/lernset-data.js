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
}

];
})();
