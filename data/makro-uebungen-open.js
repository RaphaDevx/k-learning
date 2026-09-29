// ── Makro II Übungen — Offene Aufgaben ────────────────────────────────────
// Wird via index.html geladen und zu window.LERNSET_DATA gepusht (s. unten)

(function() {
const items = [

// ════════════════════════════════════════════════════════════════
// MAKROII — Übungen (offene Fragen)
// ════════════════════════════════════════════════════════════════

// ── Übung 01: Finanzmärkte & Geldpolitik ──────────────────────

{
  id: 'makro-ub01-open-01',
  type: 'open',
  course: 'MakroII',
  topic: 'Finanzmärkte & Geldpolitik',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Barwert', 'Zinsen', 'Diskontierung'],
  prompt: 'Ein Anlagegegenstand zahlt $z_t$ in Periode $t$, $z_{t+1}^e$ in Periode $t+1$ und $z_{t+2}^e$ in Periode $t+2$. Der aktuelle Zins ist $i_t$, der erwartete Zins $i_{t+1}^e$. Schreibe den Ausdruck für den diskontierten Barwert $V_t$ auf. Wie verändert sich $V_t$, wenn $z_{t+2}^e$ sinkt?',
  modelAnswer: 'Der Barwert ergibt sich als $V_t = z_t + \\frac{z_{t+1}^e}{1+i_t} + \\frac{z_{t+2}^e}{(1+i_t)(1+i_{t+1}^e)}$. Wenn $z_{t+2}^e$ sinkt, sinkt der Zähler des dritten Terms — der Barwert fällt. Die Intuition: zukünftige Zahlungsströme tragen weniger zum heutigen Wert bei, weil sie stärker diskontiert werden, je weiter sie in der Zukunft liegen.',
  explanation: 'Gleichung (14.3) im Blanchard/Illing. Der Nenner des letzten Terms enthält beide Zinsen, weil zweimal abgezinst wird.',
},

{
  id: 'makro-ub01-open-02',
  type: 'open',
  course: 'MakroII',
  topic: 'Finanzmärkte & Geldpolitik',
  difficulty: 2,
  requiresCalculator: true,
  tags: ['Barwert', 'Zinsen', 'Rechnung'],
  prompt: 'Ein Anlagegegenstand zahlt $z_t = z_{t+1}^e = z_{t+2}^e = 100$ CHF. Aktueller Zins: $i_t = 1\\%$, erwarteter Zins: $i_{t+1}^e = 3\\%$. Berechne den Barwert $V_t$.',
  modelAnswer: '$V_t = 100 + \\frac{100}{1{,}01} + \\frac{100}{1{,}01 \\cdot 1{,}03} \\approx 100 + 99{,}01 + 96{,}12 \\approx 295{,}13$ CHF. Der erste Zahlungsstrom wird nicht diskontiert, der zweite einmal mit $1{,}01$, der dritte mit dem Produkt $1{,}01 \\times 1{,}03$.',
},

{
  id: 'makro-ub01-open-03',
  type: 'open',
  course: 'MakroII',
  topic: 'Finanzmärkte & Geldpolitik',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Aktienpreise', 'Geldpolitik', 'IS-LM', 'Erwartungen'],
  prompt: 'Die EZB senkt den aktuellen Realzins von $r = 3\\%$ auf $r = 1\\%$. Die Zinssenkung wird als **dauerhaft** wahrgenommen; die realen Dividendenzahlungen ändern sich nicht. Wie reagieren die Aktienkurse? Vergleiche qualitativ mit dem Fall einer nur **vorübergehenden** Zinssenkung.',
  modelAnswer: 'Bei einer dauerhaften Zinssenkung sinkt sowohl $r$ als auch $r^e$ — alle zukünftigen Dividenden werden mit einem niedrigeren Zinssatz diskontiert, was den Barwert (= Aktienkurs) stark erhöht. Bei einer nur vorübergehenden Senkung bleibt $r^e$ bei 3 %; nur der erste Diskontierungsfaktor ändert sich, weshalb der Kursanstieg deutlich geringer ausfällt. Der Effekt ist beim dauerhaften Fall also bedeutend größer, weil er alle Terme der Barwertformel betrifft.',
  explanation: 'Gleichung (14.16) im Blanchard/Illing zeigt, dass sämtliche erwarteten künftigen Zinsen im Nenner stehen.',
},

{
  id: 'makro-ub01-open-04',
  type: 'open',
  course: 'MakroII',
  topic: 'Finanzmärkte & Geldpolitik',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Immobilienpreise', 'Barwert', 'Risiko'],
  prompt: 'Erkläre: (a) Sollte man zur Berechnung des Fundamentalwertes einer Immobilie Realzinsen und reale Mieterträge verwenden, oder Nominalzinsen und nominale Mieterträge? (b) Wie wirkt ein Anstieg der wahrgenommenen Risikoprämie auf das Verhältnis von Immobilienpreis zu Jahresmiete?',
  modelAnswer: '(a) Beide Ansätze sind äquivalent — solange man konsistent vorgeht (real mit real, nominal mit nominal), erhält man denselben Barwert. In der Praxis nutzt man oft den Realzins, weil reale Mietströme stabiler prognostizierbar sind. (b) Eine höhere Risikoprämie erhöht den Diskontierungssatz im Nenner der Barwertformel. Damit sinkt der Fundamentalwert der Immobilie relativ zu den (unveränderten) Mieteinnahmen — das Preis-Miete-Verhältnis fällt.',
},

{
  id: 'makro-ub01-open-05',
  type: 'open',
  course: 'MakroII',
  topic: 'Finanzmärkte & Geldpolitik',
  difficulty: 3,
  requiresCalculator: false,
  tags: ['Aktienpreise', 'Geldpolitik', 'Dividenden', 'Rezession'],
  prompt: 'Der Zinsrückgang der EZB (von $r=3\\%$ auf $r=1\\%$) wird als dauerhaft wahrgenommen, **und** die zukünftig erwarteten Dividendenzahlungen sinken ebenfalls (wegen einer erwarteten Rezession). In welche Richtung verändert sich der Aktienkurs? Ist das Vorzeichen eindeutig?',
  modelAnswer: 'Der Effekt ist a priori unbestimmt: Der Zinsrückgang wirkt kurserhöhend (niedrigerer Diskontierungssatz), der Rückgang der erwarteten Dividenden wirkt kurssenkend (niedrigere Zähler in der Barwertformel). Der Nettoeffekt hängt davon ab, welcher der beiden Effekte dominiert. In einer tiefen Rezession kann der Dividendenrückgang überwiegen, sodass der Kurs fällt, obwohl der Zins sinkt — dies erklärt, warum Aktienkurse in Rezessionen trotz Zinssenkungen oft fallen.',
},

// ── Übung 02: Konsum & IS-LM ──────────────────────────────────

{
  id: 'makro-ub02-open-01',
  type: 'open',
  course: 'MakroII',
  topic: 'Konsum & IS-LM',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Budgetbeschränkung', 'Intertemporale Optimierung', 'Herleitung'],
  prompt: 'Ein Haushalt lebt zwei Perioden. Er erhält reales Nettoeinkommen $(Y_1 - T_1)$ bzw. $(Y_2 - T_2)$, startet mit Vermögen $A_1$ und kann zu Realzins $r_2$ leihen/sparen. Leite die intertemporale Budgetbeschränkung her, indem du die Periodenbeschränkungen aufstellst und kombinierst.',
  modelAnswer: 'Periode 1: $A_2 = (1+r_2) A_1 + (Y_1 - T_1) - C_1$. Periode 2: $C_2 = (1+r_2) A_2 + (Y_2 - T_2)$ (kein Erbe). Einsetzen und vereinfachen liefert die intertemporale Budgetbeschränkung: $C_1 + \\frac{C_2}{1+r_2} = (1+r_2) A_1 + (Y_1 - T_1) + \\frac{Y_2 - T_2}{1+r_2}$. Die linke Seite ist der Barwert des Konsums, die rechte Seite der Barwert des gesamten Lebenseinkommens inkl. Anfangsvermögen.',
},

{
  id: 'makro-ub02-open-02',
  type: 'open',
  course: 'MakroII',
  topic: 'Konsum & IS-LM',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Euler-Gleichung', 'Konsumglättung', 'Intuition'],
  prompt: 'Was ist die Euler-Gleichung des Konsums? Schreibe die allgemeine Form auf und erkläre die ökonomische Intuition.',
  modelAnswer: 'Die Euler-Gleichung lautet $u\'(C_1) = \\beta (1+r_2) u\'(C_2)$. Sie besagt, dass der Grenznutzen eines weiteren Konsums heute gleich dem diskontierten, zinsbewerteten Grenznutzen eines Konsums morgen sein muss. Intuition: Ein Haushalt, der einen Euro mehr in Periode 1 konsumiert, verliert $u\'(C_1)$ Nutzeneinheiten. Spart er ihn stattdessen, erhält er $(1+r_2)$ Euro in Periode 2 mit Grenznutzen $u\'(C_2)$, diskontiert mit $\\beta$. Im Optimum sind diese Werte gleich — es lohnt sich weder, mehr zu sparen noch mehr zu konsumieren.',
},

{
  id: 'makro-ub02-open-03',
  type: 'open',
  course: 'MakroII',
  topic: 'Konsum & IS-LM',
  difficulty: 2,
  requiresCalculator: true,
  tags: ['Euler-Gleichung', 'Konsumoptimum', 'Rechnung', 'Log-Nutzen'],
  prompt: 'Gegeben: $u(C) = \\ln(C)$, $A_1 = 0$, $Y_1 = 10$, $Y_2 = 20$, $T_1 = T_2 = 0$, $\\beta = 1$, $r_2 = 0$. Bestimme mithilfe der Euler-Gleichung und der intertemporalen Budgetbeschränkung die optimalen Konsumniveaus $C_1^*$ und $C_2^*$. Wieviel spart der Haushalt in Periode 1?',
  modelAnswer: 'Mit $u(C) = \\ln(C)$ gilt $u\'(C) = 1/C$. Die Euler-Gleichung $\\frac{1}{C_1} = \\beta(1+r_2)\\frac{1}{C_2} = \\frac{1}{C_2}$ ergibt $C_1 = C_2$. Die intertemporale Budgetbeschränkung (mit $r_2=0$): $C_1 + C_2 = 10 + 20 = 30$. Also $C_1^* = C_2^* = 15$. In Periode 1 spart der Haushalt $A_2 = Y_1 - C_1^* = 10 - 15 = -5$, d.h. er nimmt Kredit auf.',
},

{
  id: 'makro-ub02-open-04',
  type: 'open',
  course: 'MakroII',
  topic: 'Konsum & IS-LM',
  difficulty: 3,
  requiresCalculator: false,
  tags: ['Erwartungen', 'IS-LM', 'Fiskalpolitik', 'Zentralbank'],
  prompt: 'Ein neu gewählter Bundeskanzler kündigt künftige Steuererhöhungen an. Die Öffentlichkeit glaubt den Ankündigungen. Analysiere den Effekt auf die heutige Produktion $Y$, wenn (a) die Zentralbank den heutigen Zins konstant hält, und (b) die Zentralbank eine Änderung von $Y$ vollständig verhindert.',
  modelAnswer: '(a) Erwartete höhere Steuern $T^e \\uparrow$ reduzieren das erwartete Zukunftseinkommen $Y^e \\downarrow$ und den erwarteten Zins $r^e \\downarrow$. Die IS-Kurve verschiebt sich nach links (niedrigerer Konsum und Investitionen). Bei konstantem Zins fällt die Produktion heute. (b) Um $Y$ konstant zu halten, muss die Zentralbank den Zins senken, um die IS-Kontraktion zu kompensieren und die Investitionsnachfrage zu stützen. Die LM-Kurve verschiebt sich entsprechend nach unten.',
},

// ── Übung 03: Offene Volkswirtschaft ──────────────────────────

{
  id: 'makro-ub03-open-01',
  type: 'open',
  course: 'MakroII',
  topic: 'Offene Volkswirtschaft',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['IS-LM-ZP', 'Wechselkurs', 'Auslandsschock'],
  prompt: 'Im Ausland sinken $Y^*$ und $i^*$ infolge restriktiver Fiskalpolitik. Der Wechselkurs ist flexibel. Was passiert mit Output $Y$ und Wechselkurs $E$ im Inland, wenn die heimische Zentralbank den Zins **unverändert** lässt?',
  modelAnswer: 'Ein Rückgang von $i^*$ macht ausländische Anlagen relativ unattraktiver. Gemäß der Zinsparitätsbedingung (ZP-Kurve) wertet die heimische Währung auf ($E \\uparrow$, also weniger Einheiten ausländischer Währung je Inlandswährung). Die Aufwertung verteuert heimische Exporte und verbilligt Importe — die Nettoexporte fallen. Gleichzeitig sinkt $Y^*$, was die Exportnachfrage direkt senkt. Die IS-Kurve verschiebt sich nach links; bei konstantem Zins fällt die Inlandsproduktion $Y$.',
},

{
  id: 'makro-ub03-open-02',
  type: 'open',
  course: 'MakroII',
  topic: 'Offene Volkswirtschaft',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Festkurs', 'Leitwährung', 'Geldpolitik', 'Mundell-Fleming'],
  prompt: 'In einem Leitwährungssystem (Land 2 fixiert seinen Wechselkurs gegenüber dem Leitwährungsland) senkt das Leitwährungsland seinen Zins $i^*$. Welche Auswirkung hat das auf Zins und Produktion in Land 2? Hat Land 2 die Möglichkeit, eine eigenständige Geldpolitik zu betreiben?',
  modelAnswer: 'Bei festem Wechselkurs und perfekter Kapitalmobilität muss Land 2 seinen Zins an den Leitwährungszins anpassen: $i = i^*$. Sinkt $i^*$, sinkt auch $i$ in Land 2 — die Geldmenge in Land 2 erhöht sich automatisch (die Zentralbank muss intervenieren, um den Kurs zu halten). Die LM-Kurve verschiebt sich nach rechts, die Produktion $Y$ steigt. Land 2 hat keine autonome Geldpolitik: es "importiert" die Geldpolitik des Leitwährungslandes. Dies ist das klassische Trilemma.',
},

{
  id: 'makro-ub03-open-03',
  type: 'open',
  course: 'MakroII',
  topic: 'Offene Volkswirtschaft',
  difficulty: 3,
  requiresCalculator: false,
  tags: ['Aufwertung', 'Glaubwürdigkeit', 'Zinsparität', 'Festkurs'],
  prompt: 'Eine Notenbank wertet die heimische Währung auf (neuer fixer Kurs $E\' > E$). Die Aufwertung gilt als glaubwürdig — keine weitere Änderung wird erwartet. (a) Wie ändert sich der heimische Zins nach der Aufwertung? (b) Welche Wirkung hat die Aufwertung auf die IS-Kurve?',
  modelAnswer: '(a) Da der neue Wechselkurs als dauerhaft gilt, ändert sich der erwartete zukünftige Kurs nicht mehr: $E^e = E\'$. Gemäß der Zinsparitätsbedingung $i = i^* + \\frac{E^e - E}{E}$ ist der Klammerterm nun null, also $i = i^*$. Der Zins bleibt bei $i^*$. (b) Die Aufwertung ($E\' > E$) macht heimische Güter teurer für Ausländer. Die Nettoexporte sinken, die IS-Kurve verschiebt sich nach links — Produktion fällt, sofern keine geldpolitische Gegensteuering erfolgt.',
},

{
  id: 'makro-ub03-open-04',
  type: 'open',
  course: 'MakroII',
  topic: 'Offene Volkswirtschaft',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Flexible Wechselkurse', 'Geldpolitik', 'Mundell-Fleming'],
  prompt: 'Das Geschäftsklima verschlechtert sich (Investitionsnachfrage sinkt). Erkläre, warum eine Zentralbank im flexiblen Wechselkurssystem effektiver gegensteuern kann als in einem System fester Wechselkurse.',
  modelAnswer: 'Bei flexiblen Wechselkursen kann die Zentralbank den Zins senken. Dadurch wertet die Währung ab, was die Nettoexporte erhöht — dieser Wechselkurskanal verstärkt den expansiven Impuls zusätzlich zum direkten Zinseffekt auf Investitionen. Im Festkurssystem ist die Geldpolitik wirkungslos: Jede Zinssenkung würde die Währung unter Abwertungsdruck setzen und die Zentralbank zur Intervention zwingen, die Geldmenge wieder abschöpft. Der Multiplikator ist bei flexiblen Kursen also größer.',
},

// ── Übung 04: Inflation & Phillipskurve ───────────────────────
// (Originaldatei leer — Fragen aus Lehrplankontext des Themenblocks)

{
  id: 'makro-ub04-open-01',
  type: 'open',
  course: 'MakroII',
  topic: 'Inflation & Phillipskurve',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Phillipskurve', 'NAIRU', 'Erwartungen'],
  prompt: 'Schreibe die erwartungserweiterte Phillipskurve auf und erkläre die Bedeutung jedes Terms. Was ist die NAIRU und wie lässt sie sich aus der Phillipskurve ableiten?',
  modelAnswer: 'Die erwartungserweiterte Phillipskurve lautet $\\pi_t = \\pi_t^e - \\alpha (u_t - u_n)$, wobei $\\pi_t$ die Inflation, $\\pi_t^e$ die erwartete Inflation, $u_t$ die tatsächliche und $u_n$ die natürliche Arbeitslosigkeit ist. Der Term $-\\alpha(u_t - u_n)$ zeigt: Liegt die Arbeitslosigkeit unter $u_n$, steigt die Inflation über das erwartete Niveau. Die NAIRU (Non-Accelerating Inflation Rate of Unemployment) ist $u_n$ — jene Arbeitslosigkeit, bei der $\\pi_t = \\pi_t^e$ gilt und die Inflation weder steigt noch fällt.',
},

{
  id: 'makro-ub04-open-02',
  type: 'open',
  course: 'MakroII',
  topic: 'Inflation & Phillipskurve',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Inflationserwartungen', 'Geldpolitik', 'Glaubwürdigkeit'],
  prompt: 'Erkläre den Unterschied zwischen adaptiven und rationalen Inflationserwartungen. Warum ist die Unterscheidung für die Geldpolitik relevant?',
  modelAnswer: 'Bei adaptiven Erwartungen orientieren sich die Akteure an der Vergangenheit: $\\pi_t^e = \\pi_{t-1}$. Bei rationalen Erwartungen nutzen sie alle verfügbaren Informationen optimal, einschliesslich des geldpolitischen Kurses. Für die Geldpolitik bedeutet das: Eine glaubwürdige Desinflationspolitik kann bei rationalen Erwartungen die Inflationserwartungen sofort senken — der Desinflationsschmerz (Rezession, höhere Arbeitslosigkeit) ist geringer als bei adaptiven Erwartungen, wo die Akteure der Vergangenheit nachlaufen und die Desinflation mit höheren Reallohnforderungen bremsen.',
},

{
  id: 'makro-ub04-open-03',
  type: 'open',
  course: 'MakroII',
  topic: 'Inflation & Phillipskurve',
  difficulty: 3,
  requiresCalculator: false,
  tags: ['EZB', 'Inflation', 'Geldpolitik', 'Taylor-Regel'],
  prompt: 'Die EZB folgt einer Taylor-ähnlichen Reaktionsfunktion. Erkläre: Wenn die Inflation über dem Ziel liegt, was macht die EZB typischerweise, und wie wirkt das über den IS-LM-Mechanismus auf Inflation und Output?',
  modelAnswer: 'Bei Inflation über dem Ziel erhöht die EZB den Leitzins $i$. Ein höherer Nominalzins erhöht den Realzins (kurzfristig), was Investitionen und Konsum dämpft — die IS-Kurve wird kontrahiert, das Output $Y$ sinkt unter das Potenzial. Damit steigt die Arbeitslosigkeit über die NAIRU, was gemäß der Phillipskurve den Inflationsdruck reduziert. Mittelfristig kehrt die Wirtschaft zum Gleichgewicht zurück, wenn die Inflationserwartungen wieder mit dem EZB-Ziel übereinstimmen.',
},

// ── Übung 05: Staatsausgaben ───────────────────────────────────

{
  id: 'makro-ub05-open-01',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsausgaben',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Budgetbeschränkung', 'Staatsausgaben', 'Ricardianische Äquivalenz'],
  prompt: 'Ein Haushalt erhält Transfers $V_t$ und zahlt Pauschalsteuern $T_t$ in jeder Periode. Der Staatshaushalt muss in jeder Periode ausgeglichen sein ($G_t = T_t - V_t$). Leite die intertemporale Budgetbeschränkung des Haushalts her und zeige, wie Staatsausgaben $G_t$ das verfügbare Budget beeinflussen.',
  modelAnswer: 'Mit ausgeglichenem Staatshaushalt gilt $T_t - V_t = G_t$, also $V_t - T_t = -G_t$. Das Nettotransfereinkommen des Haushalts sinkt um $G_t$. Die intertemporale Budgetbeschränkung des Haushalts wird: $C_1 + \\frac{C_2}{1+r} = W L - G_1 - \\frac{G_2}{1+r}$, wobei $WL$ den Barwert des Arbeitseinkommens bezeichnet. Höhere Staatsausgaben (bei ausgeglichenem Haushalt) reduzieren direkt das für den Konsum verfügbare Lebenseinkommen — der Barwert des Konsums sinkt im Umfang des Barwerts der Staatsausgaben.',
},

{
  id: 'makro-ub05-open-02',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsausgaben',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Optimaler Konsum', 'Lagrange', 'Log-Nutzen', 'Staatsausgaben'],
  prompt: 'Haushalt maximiert $\\ln(C_1) + \\beta \\ln(C_2)$ mit verschwenderischen Staatsausgaben $G_t$ (kein direkter Nutzen aus $G_t$). Bestimme den optimalen Konsum $C_1^*$ in der ersten Periode mittels Lagrange-Methode.',
  modelAnswer: 'Die Lagrange-Funktion lautet $\\mathcal{L} = \\ln(C_1) + \\beta \\ln(C_2) + \\lambda \\left(C_1 + \\frac{C_2}{1+r} - \\Omega\\right)$, wobei $\\Omega$ das Netto-Lebenseinkommen ist. Bedingungen erster Ordnung: $\\frac{1}{C_1} = \\lambda$ und $\\frac{\\beta}{C_2} = \\frac{\\lambda}{1+r}$. Aus der Euler-Gleichung folgt $C_2 = \\beta(1+r) C_1$. Einsetzen in die Budgetbeschränkung ergibt $C_1^* = \\frac{\\Omega}{1+\\beta}$. Der optimale erste-Perioden-Konsum ist ein konstanter Anteil $\\frac{1}{1+\\beta}$ des gesamten Barwert-Lebenseinkommens.',
},

{
  id: 'makro-ub05-open-03',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsausgaben',
  difficulty: 3,
  requiresCalculator: false,
  tags: ['Nutzenstiftende Staatsausgaben', 'Crowding-Out', 'Konsum'],
  prompt: 'Jetzt stiften Staatsausgaben Nutzen: $U(C_t) = G_t \\ln(C_t)$. Die Regierung kündigt an, $G_2$ zu erhöhen (bei unverändertem $G_1$). Welchen Effekt hat das auf $C_1$? Ist der Effekt derselbe, wenn $G_1$ und $G_2$ gleichzeitig um denselben Anteil steigen?',
  modelAnswer: 'Wenn nur $G_2$ steigt, ändert sich die optimale Aufteilung: Eine höhere Gewichtung des Nutzens in Periode 2 (über $G_2$) erhöht den relativen Nutzenwert des Konsums in Periode 2. Der Haushalt substituiert Konsum in Periode 1 durch Konsum in Periode 2 — $C_1$ sinkt. Wenn beide $G_1$ und $G_2$ proportional steigen, bleibt die relative Gewichtung der Perioden unverändert: die Euler-Gleichung und damit die Aufteilung des Konsums zwischen den Perioden ändern sich nicht. Das Niveau des Konsums wird weiterhin durch das (nach Steuern verbleibende) Einkommen bestimmt.',
},

// ── Übung 06: Staatsverschuldung ──────────────────────────────

{
  id: 'makro-ub06-open-01',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsverschuldung',
  difficulty: 2,
  requiresCalculator: false,
  tags: ['Ricardianische Äquivalenz', 'Fiskalpolitik', 'IS-LM'],
  prompt: 'Ricardianische Äquivalenz gilt **nicht**. Die Regierung erhöht Staatsausgaben, finanziert durch Schulden (kein Steuererhöhung heute). Was passiert im IS-LM-Modell mit dem Einkommen, wenn die Zentralbank den Zins konstant hält? Was passiert, wenn stattdessen die Ausgaben durch Steuern finanziert werden?',
  modelAnswer: 'Schuldenfinanzierte Ausgaben: Die IS-Kurve verschiebt sich nach rechts (höhere Staatsnachfrage ohne direkten privaten Konsumrückgang). Bei konstantem Zins steigt das Einkommen $Y$ um den Multiplikator mal $\\Delta G$. Steuerfinanzierte Ausgaben: Höhere Steuern $T$ reduzieren das verfügbare Einkommen und damit den Konsum. Der Anstieg der Staatsausgaben und der Rückgang des Privatkonsums heben sich teilweise auf. Beim Ausgabenmultiplikator minus Steuermultiplikator (Haavelmo-Theorem) bleibt bei ausgeglichenem Haushalt netto ein Multiplikator von 1.',
},

{
  id: 'makro-ub06-open-02',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsverschuldung',
  difficulty: 2,
  requiresCalculator: true,
  tags: ['Schuldendynamik', 'Schuldenquote', 'Blanchard', 'r vs g'],
  prompt: 'Ein Land hat eine Primärdefizitquote von 4%, Einkommenswachstum $g = 4\\%$ und Realzins $r = 2\\%$. (a) Was ist die Schuldenquote im Gleichgewicht? Ist dieses Gleichgewicht stabil? (b) Die Regierung erhöht das Primärdefizit auf 10%. Wie hoch ist die neue Gleichgewichtsschuldenquote?',
  modelAnswer: '(a) Die Schuldendynamik lautet $\\Delta b = d + (r - g) b$, wobei $b$ die Schuldenquote und $d$ das Primärdefizit ist. Im Gleichgewicht ($\\Delta b = 0$): $b^* = \\frac{d}{g - r} = \\frac{0{,}04}{0{,}04 - 0{,}02} = \\frac{0{,}04}{0{,}02} = 2 = 200\\%$. Das Gleichgewicht ist stabil, weil $g > r$ — bei Abweichungen zieht die Schuldenquote wieder zum Gleichgewicht zurück. (b) Neues Gleichgewicht: $b^* = \\frac{0{,}10}{0{,}02} = 5 = 500\\%$.',
},

{
  id: 'makro-ub06-open-03',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsverschuldung',
  difficulty: 2,
  requiresCalculator: true,
  tags: ['Maastricht', 'Schuldenquote', 'Primärdefizit'],
  prompt: 'Gegeben: $g = 4\\%$, $r = 2\\%$. Das Land möchte die Maastricht-Schuldenquote von 60% im Gleichgewicht erreichen. Wie hoch darf die Primärdefizitquote maximal sein? Erfüllt dieses Gleichgewicht auch das Maastricht-Defizitkriterium von 3%?',
  modelAnswer: 'Aus $b^* = d/(g-r)$ folgt $d = b^* \\cdot (g-r) = 0{,}6 \\cdot 0{,}02 = 0{,}012 = 1{,}2\\%$. Die Primärdefizitquote darf maximal 1,2% betragen. Das Gesamtdefizit im Gleichgewicht ist Primärdefizit plus Zinszahlungen: $d_{gesamt} = d + r \\cdot b^* = 0{,}012 + 0{,}02 \\cdot 0{,}6 = 0{,}012 + 0{,}012 = 2{,}4\\%$. Das Gesamtdefizit von 2,4% liegt unter der Maastricht-Grenze von 3% — das Kriterium wird also eingehalten.',
},

{
  id: 'makro-ub06-open-04',
  type: 'open',
  course: 'MakroII',
  topic: 'Staatsverschuldung',
  difficulty: 3,
  requiresCalculator: true,
  tags: ['Staatsschuldenkrise', 'Ausfallwahrscheinlichkeit', 'Zinsparität', 'Multiple Gleichgewichte'],
  context: 'Risikoneutrale Investoren wählen zwischen einer risikolosen Anleihe ($i^0 = 0\\%$) und einer Staatsanleihe. Mit Wahrscheinlichkeit $\\omega$ verlieren sie die gesamte Anlage. Die Arbitrage-Bedingung lautet $i = (i^0 + \\omega)/(1 - \\omega)$. Die Ausfallwahrscheinlichkeit steigt mit dem Zins: $\\omega = \\omega_0 + \\beta i$ mit $i^0 = 0\\%$, $\\omega_0 = 0\\%$, $\\beta = 0{,}5$.',
  prompt: 'Berechne die Gleichgewichtszinssätze und die zugehörigen Ausfallwahrscheinlichkeiten. Was bedeutet das Ergebnis für die Möglichkeit einer Staatsschuldenkrise?',
  modelAnswer: 'Einsetzen: $i = (0 + \\omega_0 + \\beta i)/(1 - \\omega_0 - \\beta i) = 0{,}5i/(1 - 0{,}5i)$. Umformen: $i(1 - 0{,}5i) = 0{,}5i \\Rightarrow i - 0{,}5i^2 = 0{,}5i \\Rightarrow 0{,}5i - 0{,}5i^2 = 0 \\Rightarrow 0{,}5i(1 - i) = 0$. Lösungen: $i = 0\\%$ (mit $\\omega = 0\\%$) und $i = 100\\%$ (mit $\\omega = 50\\%$). Es existieren zwei Gleichgewichte: ein günstiges ohne Ausfallrisiko und ein schlechtes mit hohem Zinssatz und hoher Ausfallwahrscheinlichkeit — dies ist das Modell selbsterfüllender Schuldenkrisen (sunspot equilibria).',
},

];
if (window.LERNSET_DATA) window.LERNSET_DATA.push(...items);
})();
