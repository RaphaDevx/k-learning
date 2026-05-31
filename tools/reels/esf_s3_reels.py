#!/usr/bin/env python3
"""ESF Sitzung 3 Reels — Quantitative Datenerhebung"""
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [

    # ── Reel 14: Kausalität vs. Korrelation ──────────────────────────────────
    {
        "id": "esf-sv-14",
        "filename": "esf_14_kausalitaet_korrelation.mp4",
        "title": "Kausalität vs. Korrelation",
        "subtitle": "6 Beziehungstypen — warum Korrelation nicht reicht",
        "description": "Die 6 Beziehungstypen zwischen Variablen: von echter Kausalität bis zur Scheinkorrelation.",
        "topics": ["Kausalität", "Korrelation", "Scheinkorrelation", "Mediator", "Störvariable"],
        "block": "Quantitative Forschung",
        "brand": "ESF  ·  HSG  ·  Kausalität",
        "scenes": [
            dict(
                tts="Schokoladenkonsum und Nobelpreise korrelieren stark. Heisst das, Schokolade macht schlauer? Nein. Und genau hier liegt einer der häufigsten Denkfehler in der Forschung.",
                tag=None,
                main=["SCHOKO =", "NOBEL-", "PREIS?"],
                sub="Korrelation ist nicht Kausalität",
                accent=RED, style="hook"
            ),
            dict(
                tts="Korrelation bedeutet nur: zwei Variablen verändern sich gemeinsam. Kausalität bedeutet: eine Variable verursacht die andere. Das ist ein riesiger Unterschied.",
                tag="DEFINITION",
                main=["KORREL.", "≠", "KAUSAL."],
                sub="gemeinsam verändern ≠ verursachen",
                accent=RED, style="concept"
            ),
            dict(
                tts="Es gibt sechs Beziehungstypen. Erstens: direkte Kausalität — A verursacht B. Zweitens: umgekehrte Kausalität — eigentlich verursacht B das A. Drittens: gemeinsame Ursache — C verursacht sowohl A als auch B.",
                tag="TYPEN 1–3",
                main=["6 TYPEN"],
                sub="zwischen zwei Variablen",
                accent=RED, style="step", step_n=1, total_steps=3,
                svg=make_process_svg(
                    ["Direkte Kausalität: A → B",
                     "Umgekehrte Kausalität: B → A",
                     "Gemeinsame Ursache: C → A, B"],
                    RED
                )
            ),
            dict(
                tts="Viertens: bidirektionale Kausalität — A und B bedingen sich gegenseitig. Fünftens: indirekte Kausalität über einen Mediator — A wirkt auf B, aber nur über C. Sechstens: gar keine Kausalität — reine Scheinkorrelation.",
                tag="TYPEN 4–6",
                main=["SCHEIN-", "KORREL."],
                sub="der gefährlichste Typ",
                accent=RED, style="step", step_n=2, total_steps=3,
                svg=make_process_svg(
                    ["Bidirektional: A ↔ B",
                     "Mediator: A → C → B",
                     "Scheinkorrelation: kein Zusammenhang"],
                    RED
                )
            ),
            dict(
                tts="Zurück zum Beispiel: Schokolade und Nobelpreise. Die gemeinsame Ursache ist der Wohlstand eines Landes — reiche Länder essen mehr Schokolade UND fördern mehr Forschung. Typ drei: gemeinsame Ursache.",
                tag="BEISPIEL",
                main=["WOHLSTAND", "=", "URSACHE"],
                sub="Schokolade · Nobelpreis · DrittVariable",
                accent=ORANGE, style="example"
            ),
            dict(
                tts="Der Prüfungs-Fallstrick: Korrelation ist eine notwendige, aber keine hinreichende Bedingung für Kausalität. Nur das Experiment mit Randomisierung kann echte Kausalität beweisen.",
                tag="FALLSTRICK",
                main=["NOTWEN-", "DIG ≠", "HINREICH."],
                sub="nur Experiment beweist Kausalität",
                accent=RED, style="warn"
            ),
            dict(
                tts="Merke für die Prüfung: Sechs Beziehungstypen. Korrelation allein beweist keine Kausalität. Scheinkorrelation entsteht durch eine dritte Variable. Experiment mit Randomisierung ist der Goldstandard.",
                tag="MERKE",
                main=["KORREL.", "≠", "KAUSAL."],
                sub="6 Typen · Scheinkorr. · Experiment nötig",
                accent=RED, style="summary"
            ),
        ]
    },

    # ── Reel 15: Experiment-Typen ─────────────────────────────────────────────
    {
        "id": "esf-sv-15",
        "filename": "esf_15_experiment_typen.mp4",
        "title": "Experiment-Typen",
        "subtitle": "Labor vs. Feld vs. Online — wann welches?",
        "description": "Die drei Experimenttypen im Vergleich: Stärken, Schwächen und wann man welches Design wählt.",
        "topics": ["Laborexperiment", "Feldexperiment", "Online-Experiment", "Quasi-Experiment", "Validität"],
        "block": "Quantitative Forschung",
        "brand": "ESF  ·  HSG  ·  Experiment-Typen",
        "scenes": [
            dict(
                tts="Du willst testen, ob ein neues Produktdesign die Kaufbereitschaft steigert. Machst du das im Labor, im echten Laden oder online? Die Wahl des Experiments entscheidet alles.",
                tag=None,
                main=["WELCHES", "EXPERI-", "MENT?"],
                sub="Labor · Feld · Online",
                accent=YELL, style="hook"
            ),
            dict(
                tts="Drei klassische Experimenttypen, eine Grundfrage: Wie viel Kontrolle brauche ich — und wie realistisch soll es sein? Das sind die zwei Achsen, zwischen denen du abwägst.",
                tag="ÜBERBLICK",
                main=["KONTROLLE", "VS.", "REALITÄT"],
                sub="die zentrale Abwägung",
                accent=YELL, style="concept"
            ),
            dict(
                tts="Das Laborexperiment: maximale Kontrolle, Randomisierung möglich, hohe interne Validität. Dafür: künstliche Umgebung, wenig Übertragbarkeit auf den Alltag — geringe externe Validität.",
                tag="LABOR",
                main=["LABOR"],
                sub="hohe interne · geringe externe Validität",
                accent=CYAN, style="step", step_n=1, total_steps=3,
                svg=make_compare_svg(
                    "STÄRKEN", "SCHWÄCHEN",
                    ["Hohe Kontrolle", "Randomisierung", "Intern. Validität"],
                    ["Künstlich", "Wenig Transfer", "Extern. Validität"],
                    GREEN, RED
                )
            ),
            dict(
                tts="Das Feldexperiment: findet in der echten Welt statt — im Laden, auf der Strasse, im Unterricht. Hohe externe Validität, echtes Verhalten. Dafür kaum Kontrolle über Störvariablen.",
                tag="FELD",
                main=["FELD"],
                sub="hohe externe · geringe interne Validität",
                accent=GREEN, style="step", step_n=2, total_steps=3,
                svg=make_compare_svg(
                    "STÄRKEN", "SCHWÄCHEN",
                    ["Echte Umgebung", "Extern. Validität", "Nat. Verhalten"],
                    ["Wenig Kontrolle", "Störvariablen", "Intern. Validität"],
                    GREEN, RED
                )
            ),
            dict(
                tts="Das Online-Experiment: günstig, schnell, global skalierbar. Grosse Stichproben leicht erreichbar. Nachteil: unkontrollierte Umgebung, mögliche Ablenkungen, Qualität der Teilnehmenden unsicher.",
                tag="ONLINE",
                main=["ONLINE"],
                sub="günstig · schnell · aber unkontrolliert",
                accent=PURPLE, style="step", step_n=3, total_steps=3,
                svg=make_compare_svg(
                    "STÄRKEN", "SCHWÄCHEN",
                    ["Günstig/schnell", "Global", "Grosse N"],
                    ["Kontrollverlust", "Ablenkung", "Qualität?"],
                    GREEN, RED
                )
            ),
            dict(
                tts="Sonderfall: das Quasi-Experiment. Hier gibt es keine Randomisierung — zum Beispiel weil du vorhandene Gruppen vergleichst. Kausalität ist dann nur eingeschränkt möglich.",
                tag="FALLSTRICK",
                main=["QUASI-", "EXPERI-", "MENT"],
                sub="keine Randomisierung → Kausalität bedingt",
                accent=ORANGE, style="warn"
            ),
            dict(
                tts="Merke: Labor gleich hohe interne, geringe externe Validität. Feld umgekehrt. Online günstig aber Kontrollverlust. Quasi-Experiment ohne Randomisierung — Kausalität nur bedingt.",
                tag="MERKE",
                main=["LABOR", "FELD", "ONLINE"],
                sub="Kontrolle ↔ Realismus · Validität entscheidet",
                accent=YELL, style="summary"
            ),
        ]
    },

    # ── Reel 16: Skalenniveau ─────────────────────────────────────────────────
    {
        "id": "esf-sv-16",
        "filename": "esf_16_skalenniveau.mp4",
        "title": "Skalenniveau",
        "subtitle": "Die 4 Levels — welches Niveau hat welche Variable?",
        "description": "Dichotom, Nominal, Ordinal, Intervall/Ratio: Skalenniveaus und der häufigste Prüfungsfehler.",
        "topics": ["Skalenniveau", "Nominal", "Ordinal", "Intervall", "Likert", "Messniveau"],
        "block": "Quantitative Forschung",
        "brand": "ESF  ·  HSG  ·  Skalenniveau",
        "scenes": [
            dict(
                tts="Du fragst jemanden: Wie zufrieden sind Sie? Sehr zufrieden, zufrieden, unzufrieden. Ist das eine Zahl? Kann man damit rechnen? Die Antwort entscheidet, welche Statistik du verwenden darfst.",
                tag=None,
                main=["SKALEN-", "NIVEAU"],
                sub="entscheidet über Statistik",
                accent=GREEN, style="hook"
            ),
            dict(
                tts="Das Skalenniveau beschreibt, welche Eigenschaften eine Variable hat — ob sie Kategorien bildet, eine Reihenfolge hat, oder echte gleichmässige Abstände besitzt.",
                tag="DEFINITION",
                main=["4 LEVEL", "EINE", "REGEL"],
                sub="höheres Niveau = mehr Statistik erlaubt",
                accent=GREEN, style="concept"
            ),
            dict(
                tts="Stufe eins: Dichotom. Nur zwei Kategorien — Kauf oder kein Kauf, ja oder nein. Kein Abstand, keine Reihenfolge. Einfachstes Messniveau.",
                tag="NIVEAU 1",
                main=["DICHO-", "TOM"],
                sub="2 Kategorien: Kauf / kein Kauf",
                accent=GREEN, style="step", step_n=1, total_steps=4,
                svg=make_process_svg(
                    ["Dichotom: nur 2 Kategorien",
                     "Nominal: Kategorien, ungeordnet",
                     "Ordinal: Reihenfolge, ungl. Abstände",
                     "Intervall/Ratio: gleiche Abstände"],
                    GREEN
                )
            ),
            dict(
                tts="Stufe zwei: Nominal. Mehrere Kategorien ohne Reihenfolge — Geschlecht, Nationalität, Farbe. Du kannst zählen, aber nicht sagen welche Kategorie 'grösser' ist.",
                tag="NIVEAU 2",
                main=["NOMINAL"],
                sub="Kategorien · keine Reihenfolge",
                accent=GREEN, style="step", step_n=2, total_steps=4
            ),
            dict(
                tts="Stufe drei: Ordinal. Jetzt gibt es eine Reihenfolge — Schulnoten, Likert-Skalen. Aber Achtung: die Abstände zwischen den Stufen sind nicht gleich gross. Eins zu zwei ist nicht dasselbe wie drei zu vier.",
                tag="NIVEAU 3",
                main=["ORDINAL"],
                sub="Reihenfolge · aber UNGLEICHE Abstände",
                accent=YELL, style="step", step_n=3, total_steps=4
            ),
            dict(
                tts="Stufe vier: Intervall und Ratio. Gleiche, messbare Abstände — Alter, Temperatur, Einkommen. Damit darfst du Mittelwerte berechnen, addieren, subtrahieren. Das meiste, was du in der Statistik kennst.",
                tag="NIVEAU 4",
                main=["INTER-", "VALL"],
                sub="gleiche Abstände · Mittelwert erlaubt",
                accent=GREEN, style="step", step_n=4, total_steps=4
            ),
            dict(
                tts="Der klassische Prüfungsfehler: Likert-Skalen — stimme völlig zu bis stimme gar nicht zu — werden oft als Intervallskala behandelt. Falsch! Likert ist ordinal, weil die Abstände nicht garantiert gleich sind.",
                tag="FALLSTRICK",
                main=["LIKERT", "=", "ORDINAL!"],
                sub="nicht Intervall — Prüfungsfalle!",
                accent=RED, style="warn"
            ),
            dict(
                tts="Merke: Dichotom zwei Kategorien, Nominal ungeordnete Kategorien, Ordinal geordnet aber ungleiche Abstände, Intervall gleiche Abstände. Und: Likert ist ordinal, nicht Intervall!",
                tag="MERKE",
                main=["ORDINAL", "≠", "INTERVALL"],
                sub="Dichotom · Nominal · Ordinal · Intervall",
                accent=GREEN, style="summary"
            ),
        ]
    },

]


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"ESF Sitzung 3 Reel Generator — {len(REELS)} Reels")
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("\nDone! Sitzung 3 Reels generated.")
    for f in sorted(OUT_DIR.glob("esf_1[456]_*.mp4")):
        print(f"  {f.name}  ({f.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    asyncio.run(main())
