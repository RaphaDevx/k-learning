#!/usr/bin/env python3
"""ESF Sitzung 6 Reels — Schreiben, Visualisierung & Publikation"""
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [

    # ── Reel 23: Pruefungsstrategie ESF ──────────────────────────────────────
    {
        "id": "esf-sv-23",
        "filename": "esf_23_pruefungsstrategie.mp4",
        "title": "Pruefungsstrategie ESF",
        "subtitle": "Single Choice, Multiple Choice & wie du optimal vorgehst",
        "description": "30 Fragen, 60 Minuten, 60 Punkte — der Fallstrick bei Multiple Choice und wie du ihn vermeidest.",
        "topics": ["Pruefung", "Single Choice", "Multiple Choice", "Strategie", "ESF HSG"],
        "block": "Schreiben & Publikation",
        "brand": "ESF  ·  HSG  ·  Pruefungsstrategie",
        "scenes": [
            dict(
                tts="30 Fragen. 60 Minuten. 60 Punkte. Klingt einfach — aber es gibt einen Fallstrick, der viele Punkte kostet. Den zeige ich dir jetzt.",
                tag=None,
                main=["30 FRAGEN", "60 MIN."],
                sub="Achtung: ein Fallstrick!",
                accent=YELL, style="hook",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Das Prüfungsformat: 30 Fragen, jede bringt zwei Punkte, macht 60 Punkte total. Du hast 60 Minuten Zeit — das sind zwei Minuten pro Frage. Kein Abzug für falsche Antworten.",
                tag="DEFINITION",
                main=["2P", "PRO", "FRAGE"],
                sub="kein Abzug — aber ein Haken",
                accent=YELL, style="concept",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Typ eins: Single Choice. Genau eine Antwort ist richtig. Wählst du eine falsche, bekommst du null Punkte. Kein Abzug — also immer antworten, nie leer lassen.",
                tag="SINGLE CHOICE",
                main=["EINE", "ANTWORT"],
                sub="eine falsch = 0P — nie leer lassen",
                accent=YELL, style="step",
                step_n=None, total_steps=None,
                svg=make_compare_svg(
                    "SINGLE CH.", "MULTIPLE CH.",
                    ["Eine Antwort korrekt", "Eine falsch = 0P", "Kein Abzug"],
                    ["ALLE Haken korrekt", "Einer fehlt = 0P", "Alle prufen!"],
                    YELL, RED
                )
            ),
            dict(
                tts="Typ zwei: Multiple Choice. Das ist der Fallstrick. Nur wenn ALLE Hakchen korrekt gesetzt sind, bekommst du die zwei Punkte. Fehlt ein Haken — oder ist einer zu viel — gibt es null Punkte.",
                tag="FALLSTRICK",
                main=["ALLE", "HAKEN", "KORREKT"],
                sub="einer fehlt oder zuviel = 0P",
                accent=RED, style="warn",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Die Konsequenz: Bei Multiple Choice nicht bei der ersten richtigen Option aufhoren. ALLE Optionen prufen. Frag dich bei jeder einzelnen: richtig oder falsch? Erst dann abschicken.",
                tag="STRATEGIE",
                main=["ALLE", "OPTIONEN", "PRUFEN"],
                sub="nicht bei der ersten richtigen aufhoren",
                accent=RED, style="pro",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Vorbereitung: Videos und Vorlesungsfolien fur die Kerninhalte. Die Quizze in der Lernplattform fur Vertiefung und Selbsttest. Wer beides macht, ist gut vorbereitet.",
                tag="VORBEREITUNG",
                main=["VIDEOS", "+", "QUIZZE"],
                sub="Kerninhalte + Vertiefung",
                accent=YELL, style="step",
                step_n=None, total_steps=None,
                svg=make_process_svg(
                    ["Videos + Vorlesungen: Kerninhalte",
                     "Quizze: Vertiefung & Selbsttest",
                     "MC: ALLE Optionen prufen"],
                    YELL
                )
            ),
            dict(
                tts="Merke: 30 mal zwei gleich 60 Punkte. Single Choice — eine richtig reicht. Multiple Choice — ALLE Haken mussen stimmen, sonst null Punkte. Nie leer lassen, kein Abzug.",
                tag="MERKE",
                main=["MC =", "ALLE", "ODER 0P"],
                sub="Single: eine richtig — MC: alle korrekt",
                accent=YELL, style="summary",
                step_n=None, total_steps=None, svg=None
            ),
        ]
    },

    # ── Reel 24: 10 Prinzipien der Datenvisualisierung ────────────────────────
    {
        "id": "esf-sv-24",
        "filename": "esf_24_datenvisualisierung.mp4",
        "title": "10 Prinzipien der Datenvisualisierung",
        "subtitle": "Was macht eine gute Datenvisualisierung aus?",
        "description": "Definition, 5 Kernprinzipien und warum weniger mehr ist.",
        "topics": ["Datenvisualisierung", "Prinzipien", "Farbe", "Unsicherheit", "Kommunikation"],
        "block": "Schreiben & Publikation",
        "brand": "ESF  ·  HSG  ·  Datenvisualisierung",
        "scenes": [
            dict(
                tts="Ein Bild sagt mehr als tausend Worte — aber nur, wenn es richtig gemacht ist. Schlechte Visualisierungen verfalschenDaten, gute Visualisierungen erklaren sie in Sekunden.",
                tag=None,
                main=["DATEN-", "VISUALI-", "SIERUNG"],
                sub="richtig gemacht vs. irrefuhrend",
                accent=PURPLE, style="hook",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Definition: Datenvisualisierung ist ein Prozess, der auf Daten basiert und zu einem Bild fuhrt — das Erkundung und Kommunikation unterstuetzt. Zwei Ziele: explorieren und kommunizieren.",
                tag="DEFINITION",
                main=["DATEN", "→ BILD"],
                sub="Erkundung und Kommunikation unterstuetzen",
                accent=PURPLE, style="concept",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Prinzip eins — die wichtigste Frage: Was will ich kommunizieren? Bevor du irgendetwas zeichnest, musst du diese Frage beantwortet haben. Alle anderen Entscheidungen folgen daraus.",
                tag="PRINZIP 1",
                main=["WAS WILL", "ICH SAGEN?"],
                sub="immer zuerst diese Frage stellen",
                accent=PURPLE, style="step",
                step_n=1, total_steps=5, svg=None
            ),
            dict(
                tts="Prinzip zwei: Effektive Formen verwenden. Linien zeigen Trends, Balken zeigen Vergleiche, Flachen zeigen Proportionen. Quadrate und Kreise haben verschiedene Wahrnehmungsscharfen — Linien sind am prazisesten.",
                tag="PRINZIP 2",
                main=["FORM", "FOLGT", "FUNKTION"],
                sub="Linie = Trend · Balken = Vergleich",
                accent=PURPLE, style="step",
                step_n=2, total_steps=5, svg=None
            ),
            dict(
                tts="Prinzip vier: Farbe hat immer eine Bedeutung. Nutzt du Farbe ohne Bedeutung, verwirrt sie. Nutzt du sie gezielt, lenkt sie den Blick genau dorthin, wo die Information steckt.",
                tag="PRINZIP 4",
                main=["FARBE =", "BEDEU-", "TUNG"],
                sub="immer — keine Deko",
                accent=PURPLE, style="step",
                step_n=3, total_steps=5, svg=None
            ),
            dict(
                tts="Prinzip funf: Unsicherheit miteinbeziehen. Fehlerbalken, Konfidenzintervalle, Schattierungen — wer Unsicherheit weglasst, tauscht eine falsche Prazision vor. Das ist unehrlich.",
                tag="PRINZIP 5",
                main=["UNSICHER-", "HEIT", "ZEIGEN"],
                sub="Fehlerbalken · Konfidenzintervall",
                accent=PURPLE, style="step",
                step_n=4, total_steps=5, svg=None
            ),
            dict(
                tts="Prinzip acht: Simple Visualisierung, detaillierte Beschreibung. Weniger ist mehr im Bild — aber der Text drumherum darf und soll erklaren. Die Grafik zeigt, die Beschreibung vertieft.",
                tag="PRINZIP 8",
                main=["SIMPLE", "VISUAL.", "DETAIL.", "TEXT"],
                sub="weniger ist mehr im Bild",
                accent=PURPLE, style="step",
                step_n=5, total_steps=5,
                svg=make_compare_svg(
                    "BILD", "TEXT",
                    ["Einfach halten", "Ein Kernpunkt", "Weniger ist mehr"],
                    ["Detailliert erklaren", "Kontext geben", "Tiefer gehen"],
                    PURPLE, CYAN
                )
            ),
            dict(
                tts="Merke: Erst die Botschaft klaren, dann die Form wahlen, Farbe gezielt einsetzen, Unsicherheit zeigen, und im Bild selbst simpel bleiben. So entstehen Visualisierungen, die uberzeugen.",
                tag="MERKE",
                main=["BOTSCHAFT", "FORM", "FARBE"],
                sub="simpel im Bild · detailliert im Text",
                accent=PURPLE, style="summary",
                step_n=None, total_steps=None, svg=None
            ),
        ]
    },

    # ── Reel 25: Der Publikationsprozess ─────────────────────────────────────
    {
        "id": "esf-sv-25",
        "filename": "esf_25_publikationsprozess.mp4",
        "title": "Der Publikationsprozess",
        "subtitle": "Wie kommt Forschung in ein Journal?",
        "description": "Von der Einreichung bis zur Akzeptanz — Desk Review, Reviewer-Empfehlungen und die VHB Jourqual-Skala.",
        "topics": ["Publikation", "Peer Review", "Journal", "VHB Jourqual", "Akzeptanzquote"],
        "block": "Schreiben & Publikation",
        "brand": "ESF  ·  HSG  ·  Publikationsprozess",
        "scenes": [
            dict(
                tts="Du hast eine Studie abgeschlossen. Jetzt willst du sie publizieren. Aber wie kommt Forschung eigentlich in ein wissenschaftliches Journal? Der Weg ist langer als du denkst.",
                tag=None,
                main=["PUBLISH", "OR", "PERISH"],
                sub="der Weg ins Journal",
                accent=ORANGE, style="hook",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Schritt eins: Du reichst dein Manuskript ein. Dann folgt der Desk Review durch den Editor. Er prueft: passt das thematisch? Ist die Qualitat grundsatzlich ausreichend? Viele Papiere fallen hier bereits raus.",
                tag="SCHRITT 1",
                main=["DESK", "REVIEW"],
                sub="Editor entscheidet: passt es uberhaupt?",
                accent=ORANGE, style="step",
                step_n=1, total_steps=4, svg=None
            ),
            dict(
                tts="Schritt zwei: Der Editor schickt das Papier an externe Reviewer — meist zwei bis drei Experten im Fachgebiet. Diese lesen blind und bewerten Methodik, Theorie und Beitrag.",
                tag="SCHRITT 2",
                main=["EXTERNAL", "REVIEW"],
                sub="2-3 Experten · blind · anonym",
                accent=ORANGE, style="step",
                step_n=2, total_steps=4, svg=None
            ),
            dict(
                tts="Die Reviewer geben Empfehlungen: Accept — sofort. Conditional Accept — kleinere Korrekturen. Revision — grosse Uberarbeitung. Risky Revision — sehr unsicher. Reject oder Desk Reject — abgelehnt.",
                tag="ENTSCHEIDUNG",
                main=["6 EMP-", "FEHLUNGEN"],
                sub=None,
                accent=ORANGE, style="concept",
                step_n=None, total_steps=None,
                svg=make_process_svg(
                    ["Accept — sofort angenommen",
                     "Conditional Accept — kleine Fixes",
                     "Revision — grosse Uberarbeitung",
                     "Risky Revision — sehr unsicher",
                     "Reject / Desk Reject"],
                    ORANGE
                )
            ),
            dict(
                tts="Schritt drei: Du uberarbeitest basierend auf dem Feedback — und reichst wieder ein. Dieser Kreislauf kann mehrere Runden dauern. Am Ende: Akzeptanz oder endgultiges Reject.",
                tag="SCHRITT 3",
                main=["REVISION", "→ RESUBMIT"],
                sub="mehrere Runden moglich",
                accent=ORANGE, style="step",
                step_n=3, total_steps=4, svg=None
            ),
            dict(
                tts="Schritt vier: Akzeptanz. Bei top Journals wie dem Journal of Consumer Research liegt die Akzeptanzquote bei rund zehn Prozent. Das ist hart — aber genau das macht eine Publikation dort wertvoll.",
                tag="SCHRITT 4",
                main=["~10%", "AKZEPTANZ"],
                sub="bei Top-Journals wie JCR",
                accent=ORANGE, style="step",
                step_n=4, total_steps=4, svg=None
            ),
            dict(
                tts="Journal-Qualitat wird im VHB Jourqual eingestuft: A-Plus fur die besten Journals weltweit, dann A, B, C, D, E. Top Marketing-Journals: Journal of Marketing und Journal of Consumer Research — beide A-Plus.",
                tag="VHB JOURQUAL",
                main=["A+", "BIS E"],
                sub="JoM + JCR = A+ (beste weltweit)",
                accent=ORANGE, style="concept",
                step_n=None, total_steps=None,
                svg=make_compare_svg(
                    "A+ JOURNALS", "PROZESS",
                    ["Journal of Marketing", "J. Consumer Research", "~10% Akzeptanz"],
                    ["Einreichung", "Desk + Peer Review", "Revision → Akzeptanz"],
                    ORANGE, YELL
                )
            ),
            dict(
                tts="Merke: Einreichung, Desk Review, externe Reviewer, Revision, Akzeptanz. Bei Top-Journals nur zehn Prozent Chance. VHB Jourqual stuft ein von A-Plus bis E — A-Plus sind die besten Journals der Welt.",
                tag="MERKE",
                main=["PEER", "REVIEW", "PROZESS"],
                sub="A+ = beste Journals · ~10% Akzeptanz",
                accent=ORANGE, style="summary",
                step_n=None, total_steps=None, svg=None
            ),
        ]
    },

]


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("Done! Sitzung 6 Reels generated.")


if __name__ == "__main__":
    asyncio.run(main())
