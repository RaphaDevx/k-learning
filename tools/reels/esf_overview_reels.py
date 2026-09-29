#!/usr/bin/env python3
"""ESF Sitzungen 3–6 — Kompakte Übersichtsreels (je ein Reel pro Sitzung)"""
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [

    # ── Reel 26: S3-Überblick — Quantitative Datenerhebung ───────────────────
    {
        "id": "esf-sv-26",
        "filename": "esf_26_s3_ueberblick.mp4",
        "title": "S3: Quantitative Forschung — Vollständige Übersicht",
        "subtitle": "Experimente · Skalen · Kausalität · Datenanalyse",
        "description": "Kompakter Überblick über alle Prüfungsthemen aus Sitzung 3: Kausalität, Experiment-Typen, Skalenniveaus, Fragetypen und Datenanalyse.",
        "topics": ["Kausalität", "Experiment", "Skalenniveau", "UV/AV", "Datenanalyse", "Likert"],
        "block": "Quantitative Forschung",
        "brand": "ESF  ·  HSG  ·  S3 Überblick",
        "scenes": [
            dict(
                tts="Sitzung 3: die dichteste Prüfungssitzung im ESF-Kurs. Kausalität, Experimente, Skalen, Datenanalyse — hier liegt das meiste Punktepotenzial. Dieser Überblick geht jeden Abschnitt durch.",
                tag=None,
                main=["S3:", "QUANT.", "FORSCH."],
                sub="Kausalität · Experiment · Skalen · Analyse",
                accent=CYAN, style="hook"
            ),
            dict(
                tts="Block eins: Kausalität. Zwischen zwei Variablen gibt es sechs Beziehungstypen — direkte Kausalität, umgekehrte Kausalität, gemeinsame Ursache, bidirektional, Mediator und Scheinkorrelation. Korrelation ist notwendig, aber nicht hinreichend für Kausalität.",
                tag="KAUSALITÄT",
                main=["6 BEZIE-", "HUNGS-", "TYPEN"],
                sub="Scheinkorrelation ≠ Kausalität",
                accent=RED, style="concept",
                svg=make_process_svg(
                    ["Direkte Kausalität: A → B",
                     "Umgekehrte Kausalität: B → A",
                     "Gemeinsame Ursache: C → A, B",
                     "Mediator / Scheinkorrelation"],
                    RED
                )
            ),
            dict(
                tts="Block zwei: Experimente. Das Experiment hat vier Kernelemente — manipulierbare UV, messbare AV, Randomisierung und Kontrollgruppe. Wichtig: die UV kommt IMMER zeitlich vor der AV. Das Beispiel Schokolade und Nobelpreise — keine Kausalität, gemeinsame Ursache ist Wohlstand.",
                tag="EXPERIMENT",
                main=["UV → AV"],
                sub="zeitliche Reihenfolge · Randomisierung · Kontrolle",
                accent=CYAN, style="step", step_n=1, total_steps=4
            ),
            dict(
                tts="Drei Experiment-Arten: Labor mit hoher interner, geringer externer Validität. Feld mit hoher externer, geringer interner Validität. Online günstig und schnell, aber unkontrolliert. Dazu: Between-subjects — verschiedene Gruppen. Within-subjects — alle Probanden sehen alle Konditionen.",
                tag="DESIGN",
                main=["LABOR", "FELD", "ONLINE"],
                sub="Between: Gruppen · Within: alle Konditionen",
                accent=CYAN, style="step", step_n=2, total_steps=4,
                svg=make_compare_svg(
                    "BETWEEN", "WITHIN",
                    ["Versch. Gruppen", "Kein Transfer", "Weniger Effiz."],
                    ["Alle Konditionen", "Lerneffekt mögl.", "Mehr Power"],
                    CYAN, GREEN
                )
            ),
            dict(
                tts="Block drei: Fragetypen und Skalenniveaus. Geschlossene Fragen — vorgegebene Antworten, einfach auszuwerten. Offene Fragen — freie Antworten, reich aber aufwändig. Das semantische Differential ist eine geschlossene, skalierte Frage — Prüfungsfalle: es ist NICHT offen.",
                tag="FRAGETYPEN",
                main=["SEMAN-", "TISCHES", "DIFFER."],
                sub="geschlossen · skaliert · NICHT offen",
                accent=YELL, style="step", step_n=3, total_steps=4
            ),
            dict(
                tts="Skalenniveaus: Dichotom, Nominal, Ordinal, Intervall-Ratio. Die kritische Prüfungsfalle: Ordinale Skalen wie die Likert-Skala haben UNGLEICHE Abstände — keine Rechenoperationen erlaubt! Mittelwert bei ordinal ist formal falsch.",
                tag="SKALA",
                main=["ORDINAL", "≠", "INTERVALL"],
                sub="Likert = ordinal · keine Mittelwerte!",
                accent=RED, style="warn"
            ),
            dict(
                tts="Block vier: Datenanalyse. Lageparameter: Modus für alle, Median ab Ordinal, Mittelwert nur ab Intervall. Analysemethoden: univariat eine Variable, bivariat zwei, multivariat drei oder mehr. Metaanalyse bedeutet: mehrere Artikel werden zusammengefasst — keine neue Primärstudie.",
                tag="ANALYSE",
                main=["MULTI-", "VARIATE", "≥ 3 VAR."],
                sub="Modus · Median · Mittelwert · Metaanalyse",
                accent=CYAN, style="step", step_n=4, total_steps=4,
                svg=make_process_svg(
                    ["Modus: alle Niveaus",
                     "Median: ab Ordinal",
                     "Mittelwert: ab Intervall",
                     "Multivariat: ≥ 3 Variablen"],
                    CYAN
                )
            ),
            dict(
                tts="Die fünf grössten Prüfungsfallen aus Sitzung 3: UV kommt immer VOR AV. Semantisches Differential ist geschlossen, nicht offen. Ordinal: Abstände ungleich, keine Rechenoperationen. Metaanalyse fasst Artikel zusammen, nicht neue Studie. Within-subjects: alle Probanden sehen alle Konditionen.",
                tag="FALLSTRICKE",
                main=["5 FALLEN"],
                sub="S3 · Prüfung · ESF",
                accent=RED, style="warn",
                svg=make_process_svg(
                    ["UV immer vor AV",
                     "Semantisch. Diff. = geschlossen",
                     "Ordinal ≠ gleiche Abstände",
                     "Metaanalyse = fasst Artikel zusammen",
                     "Within = alle sehen alle Konditionen"],
                    RED
                )
            ),
            dict(
                tts="Zusammenfassung Sitzung 3: Sechs Kausalitätstypen. Vier Experimentelemente. Labor intern, Feld extern. Between verschiedene Gruppen, Within alle Konditionen. Ordinal ungleiche Abstände. Mittelwert erst ab Intervall. Metaanalyse fasst Studien zusammen.",
                tag="MERKE",
                main=["S3", "QUIZ-", "BEREIT"],
                sub="Kausalität · Experiment · Skalen · Analyse",
                accent=CYAN, style="summary"
            ),
        ]
    },

    # ── Reel 27: S4-Überblick — Qualitative Forschung ────────────────────────
    {
        "id": "esf-sv-27",
        "filename": "esf_27_s4_ueberblick.mp4",
        "title": "S4: Qualitative Forschung — Vollständige Übersicht",
        "subtitle": "Paradigmen · Methoden · Sampling · Kodierung",
        "description": "Kompakter Überblick über Sitzung 4: interpretatives Paradigma, Interview-Typen, Sampling, Grounded Theory und qualitative Inhaltsanalyse.",
        "topics": ["Qualitative Forschung", "Grounded Theory", "Sampling", "Interview", "Kodierung", "Induktiv"],
        "block": "Qualitative Forschung",
        "brand": "ESF  ·  HSG  ·  S4 Überblick",
        "scenes": [
            dict(
                tts="Sitzung 4: Qualitative Forschung. Warum kaufen Harley-Davidson-Fahrer kein anderes Motorrad — obwohl günstigere Alternativen existieren? Diese Frage beantwortet die Statistik nicht. Dafür braucht es qualitative Methoden.",
                tag=None,
                main=["WARU M?", "WIE?", "WARUM?"],
                sub="Qualitative Forschung erklärt das Unsichtbare",
                accent=PURPLE, style="hook"
            ),
            dict(
                tts="Block eins: Paradigmen. Positivismus — objektive Realität, Vorhersage, deduktiv. Interpretivismus — subjektive Realität, Verständnis, induktiv. Qualitative Forschung folgt meist dem interpretativen Paradigma. Ziel: Tiefenverständnis, keine statistische Prüfung.",
                tag="PARADIGMA",
                main=["INDUK-", "TIV", "EXPLOR."],
                sub="Interpretivismus · subjektiv · kontextabhängig",
                accent=PURPLE, style="concept",
                svg=make_compare_svg(
                    "POSITIVISMUS", "INTERPRETIV.",
                    ["Objektiv", "Vorhersage", "Deduktiv"],
                    ["Subjektiv", "Verständnis", "Induktiv"],
                    CYAN, PURPLE
                )
            ),
            dict(
                tts="Block zwei: Datenerhebung. Interview-Typen — unstrukturiert: kein Leitfaden, sehr explorativ. Semi-strukturiert: flexibler Leitfaden, Standard in qualitativer Forschung. Strukturiert: rigid, kaum Tiefe. Prüfungsfalle: strukturierte Interviews eignen sich NICHT für explorative Phasen.",
                tag="INTERVIEWS",
                main=["SEMI-", "STRUK-", "TURIERT"],
                sub="Standard · Leitfaden · flexibel",
                accent=PURPLE, style="step", step_n=1, total_steps=4,
                svg=make_process_svg(
                    ["Unstrukturiert: kein Leitfaden, explorativ",
                     "Semi-strukturiert: flexibel, Standard",
                     "Strukturiert: rigid, kaum Tiefe"],
                    PURPLE
                )
            ),
            dict(
                tts="Fokusgruppen: sechs bis zwölf Teilnehmende, moderierte Diskussion. Gut für Marktforschung und Exploration. Nicht geeignet für intime Themen — Gruppendynamik hemmt Offenheit. Weitere Methoden: teilnehmende Beobachtung, Dokumentanalyse, Ethnographie, qualitative Fallstudien.",
                tag="METHODEN",
                main=["FOKUS-", "GRUPPE"],
                sub="6–12 Personen · nicht für intime Themen",
                accent=PURPLE, style="step", step_n=2, total_steps=4
            ),
            dict(
                tts="Block drei: Stichprobenauswahl. Theoretisches Sampling: Auswahl während des Prozesses, endet bei theoretischer Sättigung — Grösse NICHT vorab festlegbar. Selektives Sampling: Kriterien vor der Erhebung. Purposive Sampling: gezielte Auswahl für die Forschungsfrage.",
                tag="SAMPLING",
                main=["THEOR.", "SAMPLING"],
                sub="endet bei Sättigung · Grösse nicht vorab",
                accent=PURPLE, style="step", step_n=3, total_steps=4,
                svg=make_process_svg(
                    ["Theoretisch: im Prozess · Sättigung",
                     "Selektiv: Kriterien vorab",
                     "Purposive: relevanz-gesteuert"],
                    PURPLE
                )
            ),
            dict(
                tts="Block vier: Datenanalyse. Transkription ist das Verschriftlichen von Audio — keine Grammatik, keine statistische Analyse. Kodierung in drei Stufen: offenes Kodieren, axiales Kodieren, selektives Kodieren. Daraus entsteht bei der Grounded Theory eine neue, induktive Theorie.",
                tag="KODIERUNG",
                main=["OFFEN", "AXIAL", "SELEKT."],
                sub="Grounded Theory: Theorie aus Daten",
                accent=PURPLE, style="step", step_n=4, total_steps=4
            ),
            dict(
                tts="Prüfungsfallen Sitzung 4: Qualitative Forschung ist häufig induktiv — NICHT deduktiv. Ethnographie prüft keine Hypothesen. Transkription ist Verschriftlichen, nicht statistische Analyse. Beim theoretischen Sampling kann die Stichprobengrösse NICHT vorab festgelegt werden. Fokusgruppen: nicht für intime Themen.",
                tag="FALLSTRICKE",
                main=["5 FALLEN"],
                sub="S4 · Qualitativ · Prüfung",
                accent=RED, style="warn",
                svg=make_process_svg(
                    ["Qualitativ oft induktiv, nicht deduktiv",
                     "Ethnographie: keine Hypothesentests",
                     "Transkription = Verschriftlichen",
                     "Theoret. Sampling: Grösse nicht vorab",
                     "Fokusgruppe: nicht für intime Themen"],
                    RED
                )
            ),
            dict(
                tts="Zusammenfassung Sitzung 4: Interpretivismus und Induktion. Semi-strukturiertes Interview als Standard. Fokusgruppen nicht für intime Themen. Drei Sampling-Typen — theoretisches Sampling endet bei Sättigung. Grounded Theory: offenes, axiales, selektives Kodieren ergibt neue Theorie.",
                tag="MERKE",
                main=["S4", "QUIZ-", "BEREIT"],
                sub="Interpretiv · induktiv · Sättigung · Kodierung",
                accent=PURPLE, style="summary"
            ),
        ]
    },

    # ── Reel 28: S5-Überblick — Gütekriterien & Open Science ────────────────
    {
        "id": "esf-sv-28",
        "filename": "esf_28_s5_ueberblick.mp4",
        "title": "S5: Gütekriterien & Open Science — Vollständige Übersicht",
        "subtitle": "Reliabilität · Validität · Replikationskrise · Open Science",
        "description": "Kompakter Überblick über Sitzung 5: die drei Gütekriterien, Ursachen der Replikationskrise, Open Science Massnahmen und neue Forschungstechnologien.",
        "topics": ["Reliabilität", "Validität", "Objektivität", "Replikationskrise", "Open Science", "p-Hacking"],
        "block": "Gütekriterien",
        "brand": "ESF  ·  HSG  ·  S5 Überblick",
        "scenes": [
            dict(
                tts="2015 hat die Open Science Collaboration etwas Erschreckendes gezeigt: nur 36 Prozent der psychologischen Studien konnten repliziert werden. Sitzung 5 erklärt warum — und was die Wissenschaft dagegen tut.",
                tag=None,
                main=["36%", "REPLI-", "ZIERT"],
                sub="Replikationskrise · Open Science · Gütekriterien",
                accent=ORANGE, style="hook"
            ),
            dict(
                tts="Block eins: Gütekriterien. Die drei zentralen Gütekriterien sind Reliabilität, Validität und Objektivität. Sie sind unabhängig voneinander — hohe Reliabilität bedeutet NICHT automatisch hohe Validität. Das ist die häufigste Verwechslung im Quiz.",
                tag="GÜTEKRITERIEN",
                main=["RELIAB.", "VALID.", "OBJEKT."],
                sub="drei unabhängige Kriterien",
                accent=ORANGE, style="concept"
            ),
            dict(
                tts="Reliabilität: wiederholte Messungen ergeben dasselbe Ergebnis. Prüfmethoden: Test-Retest, Split-Half, Paralleltest, Cronbachs Alpha. Validität: das Richtige messen. Arten: Kriteriumsvalidität, Konstruktvalidität, Inhaltsvalidität, externe Validität. Laborstudie gefährdet externe Validität.",
                tag="RELIAB./VALID.",
                main=["GLEICH-", "ES", "ERGEBNIS"],
                sub="Reliabilität ≠ das Richtige messen",
                accent=ORANGE, style="step", step_n=1, total_steps=3,
                svg=make_compare_svg(
                    "RELIABILITÄT", "VALIDITÄT",
                    ["Gleiche Ergebnisse", "Test-Retest", "Cronbachs Alpha"],
                    ["Richtiges messen", "Konstruktvalid.", "Externe Valid."],
                    CYAN, GREEN
                )
            ),
            dict(
                tts="Objektivität: Ergebnisse unabhängig von beteiligten Personen. Durchführungsobjektivität: Interaktion minimieren — NICHT maximieren. Auswertungsobjektivität: unabhängig parallel auswerten — NICHT gemeinsam. Interpretationsobjektivität: Übereinstimmung der Interpretationen.",
                tag="OBJEKTIVITÄT",
                main=["INTER-", "AKTION", "MINIMIER."],
                sub="Durchführung min. · Auswertung parallel",
                accent=ORANGE, style="step", step_n=2, total_steps=3
            ),
            dict(
                tts="Block zwei: Replikationskrise. Vier Ursachen: erstens fragwürdige Methoden — p-Hacking, HARKing, Optional Stopping, Outcome Switching. Zweitens Publikations-Bias. Drittens tiefe statistische Power. Viertens akademische Fehlanreize. Konsequenz: falsch positive Ergebnisse und verzerrte Metaanalysen.",
                tag="REPLIKATION",
                main=["P-", "HACKING", "HARKING"],
                sub="4 Ursachen · Fehler 1. Art · Publikations-Bias",
                accent=RED, style="step", step_n=3, total_steps=3,
                svg=make_process_svg(
                    ["p-Hacking: selektives Berichten",
                     "HARKing: Hyp. nach Ergebnissen",
                     "Optional Stopping",
                     "Outcome Switching"],
                    RED
                )
            ),
            dict(
                tts="Block drei: Open Science. Definition: transparentes, zugängliches Wissen — NICHT öffentlich käufliches Wissen. Vier Elemente: Präregistrierung, Registered Reports, OSF als Plattform, Open Data. Präregistrierung und Registered Reports bekämpfen HARKing und Publikations-Bias direkt.",
                tag="OPEN SCIENCE",
                main=["PRÄREG.", "REGIST.", "REPORT"],
                sub="transparent · zugänglich · kollaborativ",
                accent=GREEN, style="example",
                svg=make_process_svg(
                    ["Präregistrierung: vor Durchführung",
                     "Registered Report: Peer-Review vorab",
                     "OSF: offene Plattform",
                     "Open Data: frei zugänglich"],
                    GREEN
                )
            ),
            dict(
                tts="Block vier: Neue Technologien. Virtual Reality: misst Verhalten in kontrollierten Umgebungen. Eye-Tracking: Fixationen und Sakkaden. Emotion Recognition: erkennt Emotionen aus Gesichtsausdrücken — NICHT Face Recognition, das erkennt Personen. Galvanic Skin Response: misst Intensität der Erregung — NICHT die Art der Emotion.",
                tag="NEU. TECHNOL.",
                main=["GSR", "=", "INTENSITÄT"],
                sub="nicht Art der Emotion · Face ≠ Emotion Recog.",
                accent=YELL, style="warn"
            ),
            dict(
                tts="Die fünf grössten Prüfungsfallen aus Sitzung 5: Reliabilität sagt nichts über Validität. Interaktion MINIMIEREN für Durchführungsobjektivität. p-Hacking, HARKing, Optional Stopping, Outcome Switching kennen. Open Science ist nicht käuflich. Galvanic Skin Response misst Intensität, nicht Art der Emotion.",
                tag="MERKE",
                main=["S5", "QUIZ-", "BEREIT"],
                sub="Reliab. · Replikationskrise · Open Science · GSR",
                accent=ORANGE, style="summary"
            ),
        ]
    },

    # ── Reel 29: S6-Überblick — Schreiben, Visualisierung, Publikation ────────
    {
        "id": "esf-sv-29",
        "filename": "esf_29_s6_ueberblick.mp4",
        "title": "S6: Schreiben, Visualisierung & Publikation — Vollständige Übersicht",
        "subtitle": "APA · 10 Prinzipien · VHB-Ranking · Peer Review",
        "description": "Kompakter Überblick über Sitzung 6: Schreibprozess, Artikelstruktur, APA-Zitation, 10 Visualisierungsprinzipien und der akademische Publikationsprozess.",
        "topics": ["APA", "Datenvisualisierung", "Publikation", "VHB-Ranking", "Desk Reject", "Peer Review"],
        "block": "Akademisches Schreiben",
        "brand": "ESF  ·  HSG  ·  S6 Überblick",
        "scenes": [
            dict(
                tts="Wie überlebt ein Paper den Peer-Review-Prozess? Im Journal of Consumer Research werden nur etwa 10 Prozent aller Einreichungen angenommen — und kaum eine davon bei der ersten Einreichung. Sitzung 6 zeigt den ganzen Weg.",
                tag=None,
                main=["10%", "AKZEP-", "TIERT"],
                sub="Schreiben · Visualisierung · Publikation",
                accent=PINK, style="hook"
            ),
            dict(
                tts="Block eins: Akademisches Schreiben. Fünf Phasen: Themenwahl und Überblick, Fokussieren und Planen, Lesen und Rohfassung, Überarbeiten, Abschliessen. Writing Framework: Sätze maximal 20 bis 25 Wörter, Subjekt plus Verb plus Prädikat. Häufiger Fehler: gleichzeitig schreiben und editieren.",
                tag="SCHREIBEN",
                main=["5 PHASEN", "20–25", "WÖRTER"],
                sub="Aktiv · kurze Sätze · nicht editieren während",
                accent=PINK, style="concept",
                svg=make_process_svg(
                    ["1 Themenwahl & Überblick",
                     "2 Fokussieren & Planen",
                     "3 Lesen & Rohfassung",
                     "4 Überarbeiten & ergänzen",
                     "5 Abschliessen & korrigieren"],
                    PINK
                )
            ),
            dict(
                tts="Struktur wissenschaftlicher Artikel. Quantitativ: Abstract, Introduction, Theoretical Background, Studies mit Method und Results, General Discussion. Qualitativ: Abstract, Introduction, Analytical Lens, Kontext und Methode GEMEINSAM — das ist die Prüfungsfalle — Findings, Discussion, Limitations.",
                tag="STRUKTUR",
                main=["KONTEXT", "+", "METHODE"],
                sub="Qualitativ: gemeinsam in einem Abschnitt",
                accent=PINK, style="step", step_n=1, total_steps=4,
                svg=make_compare_svg(
                    "QUANTITATIV", "QUALITATIV",
                    ["Theory Background", "Studies: M+R+D", "General Discussion"],
                    ["Analytical Lens", "Kontext & Methode", "Findings · Discuss."],
                    CYAN, PURPLE
                )
            ),
            dict(
                tts="Block zwei: APA-Zitation, siebte Auflage. Die vier wichtigsten Regeln: Vornamen als Initialen, nicht ausgeschrieben. Zwischen Autoren im Text kaufmännisches Und — nicht and. Mehrere Quellen in einer Klammer mit Semikolon getrennt. Ab drei Autoren — auch bei der allerersten Zitation — nur et al.",
                tag="APA",
                main=["INITIA-", "LEN", "ET AL."],
                sub="& im Text · ; bei Mehrfachquellen · 3+ → et al.",
                accent=PINK, style="step", step_n=2, total_steps=4,
                svg=make_process_svg(
                    ["Vornamen als Initialen: N. statt Nikolaus",
                     "Im Text: & (nicht 'and')",
                     "Mehrere Quellen: (Q1; Q2) eine Klammer",
                     "3+ Autoren: et al. schon bei Erstnennung"],
                    PINK
                )
            ),
            dict(
                tts="Block drei: Datenvisualisierung. Die wichtigsten der 10 Prinzipien — less is more: kein Hintergrund, wenig Farbe. Prinzip sieben: Daten und Modelle sind unterschiedliche Dinge. Prinzip acht: simple Visualisierung plus detaillierte Beschriftung — NICHT detaillierte Visualisierung. Limitationen: falsche Kausalität, Garbage in, Fehlinterpretation.",
                tag="VISUALIS.",
                main=["SIMPLE", "+", "DETAIL."],
                sub="Prinzip 8: einfach zeigen · ausführlich beschriften",
                accent=YELL, style="step", step_n=3, total_steps=4,
                svg=make_compare_svg(
                    "RICHTIG", "FALSCH",
                    ["Simple Visualis.", "Detaill. Beschrft.", "Less is more"],
                    ["Detaill. Visualis.", "Simple Beschrift.", "Overdesign"],
                    GREEN, RED
                )
            ),
            dict(
                tts="Block vier: Publikationsprozess. VHB-Jourqual-Ranking: A-Plus ist das BESTE — nicht A oder B. Die vier A-Plus-Marketing-Journals: Journal of Marketing Research, Journal of Marketing, Journal of Consumer Research, Marketing Science. Reviewer-Empfehlungen: Accept, Conditional Accept, Revision, Reject. Desk Reject: Ablehnung durch den Editor ohne Weiterleitung an Reviewer.",
                tag="PUBLIKATION",
                main=["A+", "=", "BESTES"],
                sub="Desk Reject: kein Peer Review · 10% JCR",
                accent=PINK, style="step", step_n=4, total_steps=4,
                svg=make_process_svg(
                    ["Einreichung beim Journal",
                     "Editor: Desk Reject oder weiterleiten?",
                     "Peer Review: Accept / Revision / Reject",
                     "Revise-and-Resubmit (Monate bis Jahre)"],
                    PINK
                )
            ),
            dict(
                tts="Die grössten Prüfungsfallen aus Sitzung 6: APA — Initialen, kaufm. Und, Semikolon, et al. ab drei Autoren auch bei Erstnennung. Qualitativ: Kontext und Methode zusammen. Theoretischer Beitrag in der General Discussion, nicht Einleitung. Wiederholungen sind gut — nicht schlecht. Prinzip acht: simple Visualisierung, detaillierte Beschriftung. A-Plus ist das beste VHB-Ranking.",
                tag="FALLSTRICKE",
                main=["6 FALLEN"],
                sub="S6 · Schreiben · Visualisierung · Publikation",
                accent=RED, style="warn",
                svg=make_process_svg(
                    ["APA: Initialen · & · ; · et al. ab 3",
                     "Qualitativ: Kontext+Methode gemeinsam",
                     "Theor. Beitrag in General Discussion",
                     "Wiederholungen sind gewollt!",
                     "Prinzip 8: simple + detaillierte Beschrftg.",
                     "A+ = bestes VHB-Ranking"],
                    RED
                )
            ),
            dict(
                tts="Zusammenfassung Sitzung 6: Fünf Schreibphasen. Qualitativ: Kontext und Methode zusammen. APA: Initialen, kaufm. Und, Semikolon, et al. ab drei. Less is more in der Visualisierung. Prinzip sieben: Daten ungleich Modelle. Prinzip acht: simple Visualisierung, detaillierte Beschriftung. A-Plus ist das beste VHB-Ranking. Desk Reject ohne Peer Review.",
                tag="MERKE",
                main=["S6", "QUIZ-", "BEREIT"],
                sub="APA · Visualisierung · VHB · Desk Reject",
                accent=PINK, style="summary"
            ),
        ]
    },

]


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"ESF Übersichts-Reel Generator — {len(REELS)} Reels (S3–S6)")
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("\nDone! Übersichtsreels generated.")
    for f in sorted(OUT_DIR.glob("esf_2[6789]_*.mp4")):
        print(f"  {f.name}  ({f.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    asyncio.run(main())
