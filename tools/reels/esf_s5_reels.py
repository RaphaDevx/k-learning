#!/usr/bin/env python3
"""ESF Sitzung 5 Reels — Gütekriterien & Open Science"""
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [

    # ── Reel 20: Gütekriterien ────────────────────────────────────────────────
    {
        "id": "esf-sv-20",
        "filename": "esf_20_guetekriterien.mp4",
        "title": "Gütekriterien",
        "subtitle": "Reliabilität, Validität, Objektivität — und ihr Verhältnis",
        "description": "Was macht eine Messung gut? Die drei klassischen Gütekriterien und die entscheidende Beziehung zwischen Reliabilität und Validität.",
        "topics": ["Gütekriterien", "Reliabilität", "Validität", "Objektivität", "Cronbachs Alpha"],
        "block": "Gütekriterien & Open Science",
        "brand": "ESF · HSG · Gütekriterien",
        "scenes": [
            dict(
                tts="Stell dir vor: Du entwickelst einen Fragebogen, um Stress zu messen. Aber woher weisst du, ob dein Instrument wirklich funktioniert? Dafür gibt es drei Gütekriterien.",
                tag=None,
                main=["GUTE", "MESSUNG?"],
                sub="3 Kriterien entscheiden",
                accent=CYAN, style="hook"
            ),
            dict(
                tts="Erstes Gütekriterium: Reliabilität. Das bedeutet Konsistenz — dein Instrument misst dasselbe Ergebnis, wenn die Bedingungen gleich sind. Tests dafür: Test-Retest, Split-Half oder Cronbachs Alpha.",
                tag="KRITERIUM 1",
                main=["RELIABI-", "LITÄT"],
                sub="Test-Retest · Split-Half · Cronbachs Alpha",
                accent=CYAN, style="step", step_n=1, total_steps=3
            ),
            dict(
                tts="Zweites Gütekriterium: Validität. Misst dein Instrument wirklich das, was es messen soll? Man unterscheidet Kriteriumsvalidität, Konstruktvalidität und Inhaltsvalidität.",
                tag="KRITERIUM 2",
                main=["VALIDI-", "TÄT"],
                sub="Kriteriums- · Konstrukt- · Inhaltsvalidität",
                accent=CYAN, style="step", step_n=2, total_steps=3
            ),
            dict(
                tts="Drittes Gütekriterium: Objektivität. Das Ergebnis darf nicht davon abhängen, wer das Instrument durchführt, auswertet oder interpretiert. Die Person spielt keine Rolle.",
                tag="KRITERIUM 3",
                main=["OBJEKTI-", "VITÄT"],
                sub="unabhängig von der durchführenden Person",
                accent=CYAN, style="step", step_n=3, total_steps=3
            ),
            dict(
                tts="Jetzt der entscheidende Zusammenhang: Reliabilität ist notwendig, aber nicht hinreichend für Validität. Man kann zuverlässig falsch messen — reliabel aber nicht valide. Aber valide messen ohne reliabel zu sein — das ist unmöglich.",
                tag="WICHTIG",
                main=["RELIABEL", "≠", "VALIDE"],
                accent=RED, style="concept",
                svg=make_compare_svg(
                    "RELIABEL",
                    "VALIDE",
                    ["Konsistent", "Stabil", "Wiederholbar", "Aber: kann falsch messen"],
                    ["Misst was es soll", "Setzt Reliab. voraus", "Ist das eigentl. Ziel", "Schwerer zu pruefen"],
                    CYAN, GREEN
                )
            ),
            dict(
                tts="Einfaches Beispiel: Eine kaputte Waage zeigt immer 70 Kilo an, egal wie schwer du bist. Reliabel? Ja — immer dasselbe Ergebnis. Valide? Nein — sie misst nicht wirklich dein Gewicht.",
                tag="BEISPIEL",
                main=["KAPUTTE", "WAAGE"],
                sub="immer 70kg = reliabel, aber nicht valide",
                accent=YELL, style="example"
            ),
            dict(
                tts="Merke für die Prüfung: Reliabilität ist notwendig aber nicht hinreichend für Validität. Objektivität ist Voraussetzung für Reliabilität. Die Kette lautet: Objektivität, dann Reliabilität, dann Validität.",
                tag="MERKE",
                main=["OBJ.", "REL.", "VAL."],
                sub="Objektivität → Reliabilität → Validität",
                accent=CYAN, style="summary"
            ),
        ]
    },

    # ── Reel 21: Replikationskrise ────────────────────────────────────────────
    {
        "id": "esf-sv-21",
        "filename": "esf_21_replikationskrise.mp4",
        "title": "Die Replikationskrise",
        "subtitle": "Warum sind so viele Studien nicht reproduzierbar?",
        "description": "Die Replikationskrise erschüttert die Sozialwissenschaften. Zahlen, Ursachen und was p-Hacking wirklich bedeutet.",
        "topics": ["Replikationskrise", "p-Hacking", "HARKing", "Publikationsbias", "Open Science"],
        "block": "Gütekriterien & Open Science",
        "brand": "ESF · HSG · Replikationskrise",
        "scenes": [
            dict(
                tts="Ein berühmtes Experiment zeigt: Wenn du dir vorstellt alt zu sein, gehst du langsamer. Klingt faszinierend. Problem: Niemand konnte das Ergebnis je wiederholen.",
                tag=None,
                main=["NICHT", "WIEDER-", "HOLBAR"],
                sub="die Krise der Wissenschaft",
                accent=RED, style="hook"
            ),
            dict(
                tts="Die Zahlen sind erschreckend: In der Psychologie konnten nur 36 Prozent der Studien repliziert werden. Cancer Biology 46 Prozent. Sozialwissenschaften 62 Prozent. Das ist die Replikationskrise.",
                tag="ZAHLEN",
                main=["NUR 36%", "REPLIZ."],
                sub="Psychologie · Cancer Bio · Sozialwiss.",
                accent=RED, style="concept"
            ),
            dict(
                tts="Vier Hauptursachen. Erstens: Fragwürdige Forschungspraktiken — dazu gleich mehr. Zweitens: Publikationsbias. Drittens: Tiefe statistische Power. Viertens: Falsche akademische Anreize.",
                tag="4 URSACHEN",
                main=["WARUM?"],
                accent=RED, style="concept",
                svg=make_process_svg(
                    ["Fragwuerd. Praktiken", "Publikationsbias", "Tiefe Power", "Falsche Anreize"],
                    RED
                )
            ),
            dict(
                tts="Fragwürdige Praktiken im Detail: P-Hacking bedeutet, so lange Daten zu analysieren, bis p kleiner 0.05 herauskommt. HARKing heisst, Hypothesen nach der Datenanalyse zu formulieren — als wären sie vorher da gewesen. Optional Stopping und Outcome Switching gehören dazu.",
                tag="FALLSTRICK",
                main=["P-HACK-", "ING &", "HARKING"],
                sub="Hypothesen NACH Daten formulieren",
                accent=RED, style="concept"
            ),
            dict(
                tts="Publikationsbias ist strukturell: Zeitschriften veröffentlichen fast nur signifikante Ergebnisse. Nullresultate landen in der Schublade. Das verzerrt das gesamte wissenschaftliche Bild.",
                tag="PROBLEM",
                main=["NUR", "SIGNIFI-", "KANTE"],
                sub="Nullresultate = Schublade",
                accent=ORANGE, style="con"
            ),
            dict(
                tts="Tiefe Power bedeutet: zu kleine Stichproben. Wenn eine Studie nur 20 Personen hat, ist die Chance hoch, einen Effekt durch Zufall zu finden — und ihn nie wieder zu finden.",
                tag="PROBLEM",
                main=["N = 20?"],
                sub="zu klein = zufaellige Effekte",
                accent=ORANGE, style="con"
            ),
            dict(
                tts="Merke: Die Replikationskrise entsteht durch p-Hacking, HARKing, Publikationsbias, tiefe Power und falsche Anreize. Die Lösung kommt im nächsten Reel — Open Science.",
                tag="MERKE",
                main=["REPLI-", "KATIONS-", "KRISE"],
                sub="p-Hacking · Bias · Power · Anreize",
                accent=RED, style="summary"
            ),
        ]
    },

    # ── Reel 22: Open Science ─────────────────────────────────────────────────
    {
        "id": "esf-sv-22",
        "filename": "esf_22_open_science.mp4",
        "title": "Open Science",
        "subtitle": "Wie Open Science die Replikationskrise löst",
        "description": "Präregistrierung, Registered Reports, Open Data — die konkreten Instrumente von Open Science und wie sie fragwürdige Praktiken verhindern.",
        "topics": ["Open Science", "Präregistrierung", "Registered Report", "Open Data", "Transparenz"],
        "block": "Gütekriterien & Open Science",
        "brand": "ESF · HSG · Open Science",
        "scenes": [
            dict(
                tts="Wir kennen die Probleme: p-Hacking, Publikationsbias, HARKing. Aber es gibt eine Bewegung, die das alles strukturell löst. Sie heisst Open Science.",
                tag=None,
                main=["OPEN", "SCIENCE"],
                sub="die Antwort auf die Replikationskrise",
                accent=GREEN, style="hook"
            ),
            dict(
                tts="Open Science bedeutet: Transparentes, zugängliches Wissen, das durch kollaborative Netzwerke geteilt wird. Nicht Geheimniskrämerei, sondern Offenheit auf allen Ebenen — von der Hypothese bis zu den Rohdaten.",
                tag="DEFINITION",
                main=["TRANSPA-", "RENZ &", "OFFENHEIT"],
                sub="kollaborativ · zugaenglich · geteilt",
                accent=GREEN, style="concept"
            ),
            dict(
                tts="Instrument Nummer eins: Präregistrierung. Du registrierst deinen Forschungsplan — Hypothesen, Methoden, Analysen — bevor du die Daten sammelst. Damit wird HARKing unmöglich und p-Hacking sofort erkennbar.",
                tag="INSTRUMENT 1",
                main=["PRÄREG-", "ISTRIERUNG"],
                sub="Plan VOR Datenerhebung registrieren",
                accent=GREEN, style="step", step_n=1, total_steps=3
            ),
            dict(
                tts="Instrument Nummer zwei: Registered Report. Hier bekommst du Peer Review, bevor du die Studie durchführst. Das Journal akzeptiert die Studie auf Basis der Methode — nicht des Ergebnisses. Publikationsbias? Strukturell beseitigt.",
                tag="INSTRUMENT 2",
                main=["REGISTER-", "ED", "REPORT"],
                sub="Peer Review VOR Durchfuehrung",
                accent=GREEN, style="step", step_n=2, total_steps=3
            ),
            dict(
                tts="Instrument Nummer drei: Open Data. Du machst deine Rohdaten öffentlich zugänglich. Andere Forscher können deine Analysen nachprüfen, Fehler finden und auf deinen Daten aufbauen.",
                tag="INSTRUMENT 3",
                main=["OPEN", "DATA"],
                sub="Rohdaten oeffentlich verfuegbar",
                accent=GREEN, style="step", step_n=3, total_steps=3
            ),
            dict(
                tts="So löst Open Science die Krise: Präregistrierung verhindert p-Hacking und HARKing. Registered Reports bekämpfen Publikationsbias. Open Data ermöglicht echte Replikation. Jedes Problem bekommt ein konkretes Gegenmittel.",
                tag="LOESUNG",
                main=["PROBLEM", "vs.", "LOESUNG"],
                accent=GREEN, style="pro",
                svg=make_compare_svg(
                    "PROBLEM",
                    "OPEN SCIENCE",
                    ["p-Hacking", "HARKing", "Publikationsbias", "Nicht replizierbar"],
                    ["Praereg. verhindert", "Praereg. verhindert", "Reg. Report loest", "Open Data ermoegl."],
                    RED, GREEN
                )
            ),
            dict(
                tts="Merke: Open Science löst die Replikationskrise durch drei Instrumente. Präregistrierung gegen p-Hacking und HARKing. Registered Report gegen Publikationsbias. Open Data für echte Nachprüfbarkeit.",
                tag="MERKE",
                main=["OPEN", "SCIENCE"],
                sub="Praereg. · Reg.Report · Open Data",
                accent=GREEN, style="summary"
            ),
        ]
    },

]


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"ESF Sitzung 5 — {len(REELS)} Reels: Gütekriterien & Open Science")
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("\nDone! Sitzung 5 Reels generated.")
    for f in sorted(OUT_DIR.glob("esf_2*.mp4")):
        print(f"  {f.name}  ({f.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    asyncio.run(main())
