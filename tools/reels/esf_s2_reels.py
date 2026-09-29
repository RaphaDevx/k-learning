#!/usr/bin/env python3
"""ESF Sitzung 2 Reels — Forschungsfrage & Hypothesen"""
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [

    # ── Reel 11: Forschungsfrage ──────────────────────────────────────────────
    {
        "id": "esf-sv-11",
        "filename": "esf_11_forschungsfrage.mp4",
        "title": "Die Forschungsfrage",
        "subtitle": "Was macht eine gute Forschungsfrage?",
        "description": "3 Typen, 6 Kriterien, Forschungslücke — alles was du für die Prüfung brauchst.",
        "topics": ["Forschungsfrage", "Deskriptiv", "Kausal", "Forschungslücke", "Kriterien"],
        "block": "Forschungsfrage & Hypothesen",
        "brand": "ESF  ·  HSG  ·  Forschungsfrage",
        "scenes": [
            dict(
                tts="Jede Studie steht und fällt mit einer Frage. Aber was macht eine Forschungsfrage eigentlich gut? Das klären wir jetzt.",
                tag=None,
                main=["DIE", "RICHTIGE", "FRAGE"],
                sub="Grundlage jeder Studie",
                accent=CYAN, style="hook",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Es gibt drei Typen von Forschungsfragen. Erstens deskriptiv: Wie ist etwas? Zweitens Vergleich: Gibt es Unterschiede zwischen Gruppen? Drittens kausal: Was verursacht was?",
                tag="DEFINITION",
                main=["3 TYPEN"],
                sub=None,
                accent=CYAN, style="concept",
                step_n=None, total_steps=None,
                svg=make_compare_svg(
                    "DESKRIPTIV", "KAUSAL",
                    ["Wie ist es?", "Beschreibt Zustand", "z.B. Wie viele?"],
                    ["Was bewirkt was?", "Ursache-Wirkung", "z.B. Warum?"],
                    CYAN, PURPLE
                )
            ),
            dict(
                tts="Typ zwei ist der Vergleich — Gruppenunterschiede. Zum Beispiel: Unterscheiden sich Männer und Frauen in ihrer Wahlentscheidung? Du brauchst mindestens zwei Gruppen.",
                tag="SCHRITT 1",
                main=["VERGLEICH"],
                sub="Gruppenunterschiede messen",
                accent=YELL, style="step",
                step_n=1, total_steps=3, svg=None
            ),
            dict(
                tts="Eine gute Forschungsfrage erfüllt sechs Kriterien: klar, fokussiert, prägnant, eindeutig, exklusiv — und ethisch vertretbar. Fehlt eines davon, ist die Frage schwach.",
                tag="WICHTIG",
                main=["6 KRITE-", "RIEN"],
                sub="klar · fokussiert · prägnant · eindeutig · exklusiv · ethisch",
                accent=CYAN, style="pro",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Jede gute Forschungsfrage füllt eine Forschungslücke — ein Defizit in der bestehenden Forschung. Was wissen wir noch nicht? Wo fehlt Evidenz? Das ist der Ausgangspunkt.",
                tag="KONZEPT",
                main=["FORSCHUNGS-", "LÜCKE"],
                sub="Defizit in bestehender Forschung",
                accent=CYAN, style="concept",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Merke: Eine Forschungsfrage ist deskriptiv, vergleichend oder kausal. Sie muss klar, fokussiert, prägnant, eindeutig, exklusiv und ethisch sein — und eine Forschungslücke adressieren.",
                tag="MERKE",
                main=["KLAR", "FOKUS-", "SIERT"],
                sub="3 Typen · 6 Kriterien · Forschungslücke",
                accent=CYAN, style="summary",
                step_n=None, total_steps=None, svg=None
            ),
        ]
    },

    # ── Reel 12: Hypothesen ───────────────────────────────────────────────────
    {
        "id": "esf-sv-12",
        "filename": "esf_12_hypothesen.mp4",
        "title": "Hypothesen",
        "subtitle": "H0 vs H1, Typen & was eine gute Hypothese ausmacht",
        "description": "Nullhypothese, Alternativhypothese, gerichtet vs ungerichtet — alles auf den Punkt.",
        "topics": ["Hypothese", "H0", "H1", "Nullhypothese", "gerichtet", "ungerichtet"],
        "block": "Forschungsfrage & Hypothesen",
        "brand": "ESF  ·  HSG  ·  Hypothesen",
        "scenes": [
            dict(
                tts="Was erwartest du, bevor du deine Daten siehst? Genau das ist eine Hypothese. Und sie entscheidet, wie du deine ganze Studie aufbaust.",
                tag=None,
                main=["HYPO-", "THESE"],
                sub="Erwartung vor den Daten",
                accent=PINK, style="hook",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Es gibt immer zwei Hypothesen. Die Nullhypothese H-null sagt: Es gibt keinen Effekt, keinen Unterschied. Die Alternativhypothese H-eins sagt: Doch, es gibt einen Effekt.",
                tag="DEFINITION",
                main=["H0", "vs H1"],
                sub=None,
                accent=PINK, style="concept",
                step_n=None, total_steps=None,
                svg=make_compare_svg(
                    "H0", "H1",
                    ["Kein Effekt", "Kein Unterschied", "Status quo"],
                    ["Effekt vorhanden", "Unterschied existiert", "Deine Erwartung"],
                    GRAY, PINK
                )
            ),
            dict(
                tts="Hypothesen gibt es in zwei Richtungen. Gerichtet heisst: Je mehr X, desto mehr Y. Du sagst die Richtung voraus. Ungerichtet heisst nur: X hat einen Effekt auf Y — ohne Richtung.",
                tag="TYPEN",
                main=["GERICHTET", "vs UN-", "GERICHTET"],
                sub="Je mehr X, desto mehr Y — vs — X wirkt auf Y",
                accent=PINK, style="concept",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Drei Regeln für gute Hypothesen: Erstens — sie werden VOR der Datenerhebung definiert. Zweitens — empirisch testbar. Drittens — prognostisch, also zukunftsgerichtet.",
                tag="WICHTIG",
                main=["VOR DEN", "DATEN"],
                sub="testbar · prognostisch · klar formuliert",
                accent=PINK, style="pro",
                step_n=None, total_steps=None,
                svg=make_process_svg(
                    ["VOR Datenerhebung definieren",
                     "Empirisch testbar formulieren",
                     "Prognostisch — Zukunft beschreiben"],
                    PINK
                )
            ),
            dict(
                tts="Wichtig: Du testest nie direkt die Alternativhypothese. Du versuchst, die Nullhypothese zu widerlegen. Schaffst du das — gilt H-eins als gestützt.",
                tag="MERKE",
                main=["H0", "WIDER-", "LEGEN"],
                sub="H0 falsifizieren → H1 gilt als gestützt",
                accent=PINK, style="summary",
                step_n=None, total_steps=None, svg=None
            ),
        ]
    },

    # ── Reel 13: Mediation vs. Moderation ─────────────────────────────────────
    {
        "id": "esf-sv-13",
        "filename": "esf_13_mediation_moderation.mp4",
        "title": "Mediation vs. Moderation",
        "subtitle": "Konzeptionelles Modell & Variablentypen",
        "description": "UV, AV, Mediator, Moderator — was ist was und wozu?",
        "topics": ["Mediation", "Moderation", "UV", "AV", "Mediator", "Moderator", "konzeptionelles Modell"],
        "block": "Forschungsfrage & Hypothesen",
        "brand": "ESF  ·  HSG  ·  Mediation & Moderation",
        "scenes": [
            dict(
                tts="Warum wirkt etwas? Oder wie stark wirkt es? Das sind zwei völlig verschiedene Fragen. Und je nachdem brauchst du einen Mediator oder einen Moderator.",
                tag=None,
                main=["WARUM?", "WIE STARK?"],
                sub="Mediator vs. Moderator",
                accent=PURPLE, style="hook",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Im konzeptionellen Modell hast du immer eine unabhängige Variable UV und eine abhängige Variable AV. Der direkte Pfeil von UV zu AV ist der Basiseffekt.",
                tag="DEFINITION",
                main=["UV", "→ AV"],
                sub="unabhängige → abhängige Variable",
                accent=PURPLE, style="concept",
                step_n=None, total_steps=None, svg=None
            ),
            dict(
                tts="Ein Mediator erklärt, wie oder warum ein Effekt zustande kommt. Beispiel: Bildung steigert Einkommen — weil sie den Job verbessert. Der Job ist hier der Mediator.",
                tag="MEDIATOR",
                main=["ERKLÄRT", "WIE?", "WARUM?"],
                sub="UV → Mediator → AV",
                accent=CYAN, style="step",
                step_n=1, total_steps=2, svg=None
            ),
            dict(
                tts="Ein Moderator verändert die Stärke oder Richtung eines Effekts. Beispiel: Koffein steigert Konzentration — aber nur bei wenig Schlaf. Schlaf ist der Moderator.",
                tag="MODERATOR",
                main=["VERÄNDERT", "STÄRKE"],
                sub="UV + Moderator → AV",
                accent=ORANGE, style="step",
                step_n=2, total_steps=2, svg=None
            ),
            dict(
                tts="Hier siehst du den Unterschied direkt: Mediation fragt nach dem Warum und Wie — über einen Zwischenschritt. Moderation fragt unter welchen Bedingungen — die Stärke variiert.",
                tag="VERGLEICH",
                main=["MEDIATION", "vs", "MODERA-TION"],
                sub=None,
                accent=PURPLE, style="concept",
                step_n=None, total_steps=None,
                svg=make_compare_svg(
                    "MEDIATION", "MODERATION",
                    ["Erklärt WIE/WARUM", "UV → M → AV", "Zwischenvariable"],
                    ["Verändert STÄRKE", "UV × Mo → AV", "Bedingungsvariable"],
                    CYAN, ORANGE
                )
            ),
            dict(
                tts="Merke: Mediator erklärt den Mechanismus — wie oder warum. Moderator verändert die Stärke des Effekts — unter welchen Bedingungen. Beides gehört ins konzeptionelle Modell.",
                tag="MERKE",
                main=["MEDI-", "ATOR", "≠ MODI-", "ERATOR"],
                sub="Mechanismus ≠ Bedingung",
                accent=PURPLE, style="summary",
                step_n=None, total_steps=None, svg=None
            ),
        ]
    },

]


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("Done! Sitzung 2 Reels generated.")


if __name__ == "__main__":
    asyncio.run(main())
