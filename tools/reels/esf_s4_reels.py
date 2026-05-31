#!/usr/bin/env python3
"""ESF Sitzung 4 Reels — Qualitative Forschung"""
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [

    # ── Reel 17: Positivismus vs. Interpretivismus ─────────────────────────────
    {
        "id": "esf-sv-17",
        "filename": "esf_17_positivismus_interpretivismus.mp4",
        "title": "Positivismus vs. Interpretivismus",
        "subtitle": "Zwei Weltbilder der Forschung — wann welches Paradigma?",
        "description": "Positivistisch vs. interpretativ: Ziele, Annahmen, Methoden und die entscheidende Rolle des Forschers.",
        "topics": ["Positivismus", "Interpretivismus", "Paradigma", "Qualitativ", "Quantitativ"],
        "block": "Qualitative Forschung",
        "brand": "ESF  ·  HSG  ·  Paradigmen",
        "scenes": [
            dict(
                tts="Zwei Forscher untersuchen dasselbe Phänomen — und kommen zu völlig verschiedenen Antworten. Nicht weil einer falsch liegt. Sondern weil sie von zwei verschiedenen Weltbildern ausgehen.",
                tag=None,
                main=["ZWEI", "WELT-", "BILDER"],
                sub="Positivismus vs. Interpretivismus",
                accent=PURPLE, style="hook"
            ),
            dict(
                tts="Das positivistische Paradigma geht davon aus: Es gibt eine objektive Realität da draussen. Diese Realität ist unabhängig von Zeit und Kontext. Und sie lässt sich messen, testen und vorhersagen.",
                tag="POSITIVISMUS",
                main=["OBJEKTIVE", "REALITÄT"],
                sub="messen · testen · vorhersagen",
                accent=CYAN, style="concept",
                svg=make_compare_svg(
                    "POSITIV.",
                    "INTERPRET.",
                    ["Vorhersage", "Objektiv", "Zeitunabh.", "Quant. Meth."],
                    ["Verstaendnis", "Subjektiv", "Kontextabh.", "Qual. Meth."],
                    CYAN, PURPLE
                )
            ),
            dict(
                tts="Das interpretative Paradigma denkt anders: Realität ist subjektiv. Sie wird von Menschen konstruiert und ist immer kontextabhängig. Verstehen ist wichtiger als Vorhersagen.",
                tag="INTERPRETIVISMUS",
                main=["SUBJEK-", "TIVE", "REALITÄT"],
                sub="verstehen · konstruiert · kontextabhaengig",
                accent=PURPLE, style="concept"
            ),
            dict(
                tts="Der entscheidende Unterschied liegt in der Rolle des Forschers. Im positivistischen Paradigma ist der Forscher neutral — er steht ausserhalb des Forschungsgegenstands. Im interpretativen Paradigma ist er Teil davon.",
                tag="WICHTIG",
                main=["FORSCHER", "=", "TEIL"],
                sub="interpretative Forscher sind NICHT neutral",
                accent=PURPLE, style="pro",
                svg=make_ab_test_svg("NEUTRAL", "INVOLVIERT", CYAN, PURPLE, "FORSCHER-ROLLE")
            ),
            dict(
                tts="Praktisch: Positivismus passt, wenn du Hypothesen testen und Ursache-Wirkung nachweisen willst — klassisch quantitative Methoden. Interpretivismus passt, wenn du Bedeutungen, Erfahrungen und Motive verstehen willst — Interviews, Ethnographie.",
                tag="WANN WELCHES?",
                main=["FRAGE", "ENTSCHEI-", "DET"],
                sub="Hypothesen testen → positiv. | Bedeutungen → interpret.",
                accent=YELL, style="example"
            ),
            dict(
                tts="Merke fuer die Pruefung: Positivismus gleich Vorhersage, objektive Realität, zeit- und kontextunabhängig, quantitative Methoden. Interpretivismus gleich Verständnis, subjektive Realität, kontextabhängig, qualitative Methoden. Und: interpretative Forscher sind TEIL des Forschungssubjekts.",
                tag="MERKE",
                main=["PARA-", "DIGMA", "PRÜFEN"],
                sub="Positiv: objektiv · zeitunabh. | Interpret: subjektiv · kontextabh.",
                accent=PURPLE, style="summary"
            ),
        ]
    },

    # ── Reel 18: Qualitative Interview-Typen ──────────────────────────────────
    {
        "id": "esf-sv-18",
        "filename": "esf_18_interview_typen.mp4",
        "title": "Qualitative Interview-Typen",
        "subtitle": "Unstrukturiert vs. Semi-strukturiert vs. Strukturiert",
        "description": "Die drei Interview-Formen im Vergleich: Struktur, Steuerung, Aufwand, Tiefe — plus Fokusgruppe.",
        "topics": ["Interview", "Unstrukturiert", "Semi-strukturiert", "Strukturiert", "Fokusgruppe"],
        "block": "Qualitative Forschung",
        "brand": "ESF  ·  HSG  ·  Interview-Typen",
        "scenes": [
            dict(
                tts="Du willst qualitative Daten erheben. Du setzt dich hin. Und jetzt? Fragst du einfach drauf los? Arbeitest du mit einem Leitfaden? Oder hältst du alles starr fest? Das sind drei verschiedene Interview-Typen.",
                tag=None,
                main=["3 INTER-", "VIEW-", "TYPEN"],
                sub="unstrukturiert · semi · strukturiert",
                accent=CYAN, style="hook"
            ),
            dict(
                tts="Das unstrukturierte Interview: kein Leitfaden, kein festes Schema. Der Informant führt das Gespräch. Das ist sehr explorativ — und sehr zeitaufwändig. Gut für komplexe, unbekannte Themen.",
                tag="UNSTRUKTURIERT",
                main=["KEIN", "LEIT-", "FADEN"],
                sub="Informant fuehrt · sehr explorativ · zeitaufwaendig",
                accent=CYAN, style="concept",
                svg=make_compare_svg(
                    "UNSTRUKTURIERT",
                    "STRUKTURIERT",
                    ["Kein Leitfaden", "Informant fuehrt", "Sehr explorativ", "Zeitaufwaendig"],
                    ["Starrer Leitfaden", "Forscher fuehrt", "Schnell/effizient", "Oft oberflaechl."],
                    CYAN, PINK
                )
            ),
            dict(
                tts="Das semi-strukturierte Interview: Du hast einen flexiblen Leitfaden mit offenen Fragen. Die Reihenfolge kann variieren, neue Themen können auftauchen. Das Gespräch fliesst kohärent — und du kannst trotzdem tief gehen. Das ist die am häufigsten verwendete Form.",
                tag="SEMI-STRUKTURIERT",
                main=["FLEXI-", "BLER", "LEITFADEN"],
                sub="am haeufigsten verwendet · offen · dynamisch",
                accent=GREEN, style="concept",
                step_n=2, total_steps=3
            ),
            dict(
                tts="Das strukturierte Interview: Ein starrer Leitfaden, feste Reihenfolge, der Forscher führt. Schnell und effizient — aber oft oberflächlich. Gut wenn du viele Interviews vergleichen willst.",
                tag="STRUKTURIERT",
                main=["STARRER", "LEIT-", "FADEN"],
                sub="Forscher fuehrt · schnell · oft oberflaechlich",
                accent=PINK, style="concept",
                step_n=3, total_steps=3
            ),
            dict(
                tts="Bonus: Die Fokusgruppe. Sechs bis zwölf Teilnehmende diskutieren moderiert ein Thema. Du kriegst Gruppeninteraktion und soziale Dynamiken — Dinge, die im Einzelinterview unsichtbar bleiben.",
                tag="FOKUSGRUPPE",
                main=["6–12", "TEIL-", "NEHMER"],
                sub="moderierte Diskussion · Gruppeninteraktion",
                accent=YELL, style="example",
                svg=make_process_svg(
                    ["Thema vorgeben", "Gruppe diskutiert", "Moderator steuert", "Interaktion auswerten"],
                    YELL
                )
            ),
            dict(
                tts="Merke: Unstrukturiert gleich kein Leitfaden, Informant führt, explorativ, zeitaufwändig. Semi-strukturiert gleich flexibler Leitfaden, offen, kohärent — am häufigsten! Strukturiert gleich starr, schnell, oft oberflächlich. Fokusgruppe gleich sechs bis zwölf Personen, moderierte Diskussion.",
                tag="MERKE",
                main=["SEMI =", "MOST", "COMMON"],
                sub="Unstruk. explorativ | Semi flexibel | Struk. effizient",
                accent=CYAN, style="summary"
            ),
        ]
    },

    # ── Reel 19: Qualitative Stichprobenauswahl ───────────────────────────────
    {
        "id": "esf-sv-19",
        "filename": "esf_19_sampling.mp4",
        "title": "Qualitative Stichprobenauswahl",
        "subtitle": "Theoretisches vs. Selektives vs. Purposive Sampling",
        "description": "Wie wähle ich qualitative Stichproben aus? Die drei Strategien und ihre Logik.",
        "topics": ["Sampling", "Theoretisches Sampling", "Selektives Sampling", "Purposive Sampling", "Theoretische Saettigung"],
        "block": "Qualitative Forschung",
        "brand": "ESF  ·  HSG  ·  Qual. Sampling",
        "scenes": [
            dict(
                tts="Quantitativ ist es einfach: Du ziehst eine Zufallsstichprobe. Qualitativ ist es komplexer. Wen du befragst — und wann — hängt von deiner Forschungsstrategie ab. Drei Strategien musst du kennen.",
                tag=None,
                main=["3 SAMP-", "LING-", "STRATE-", "GIEN"],
                sub="theoretisch · selektiv · purposive",
                accent=GREEN, style="hook"
            ),
            dict(
                tts="Theoretisches Sampling passiert IM PROZESS der Datenerhebung. Du sammelst Daten, analysierst sie — und entscheidest DANACH, wen du als nächstes befragst. Du weisst den Umfang nicht vorher. Du hörst auf, wenn du theoretische Sättigung erreichst.",
                tag="THEORETISCH",
                main=["IM", "PROZESS"],
                sub="Umfang nicht vorab festlegbar · endet bei Saettigung",
                accent=GREEN, style="concept",
                svg=make_process_svg(
                    ["Daten erheben", "Analysieren", "Naechsten Fall waehlen", "Theoret. Saettigung?"],
                    GREEN
                )
            ),
            dict(
                tts="Theoretische Sättigung bedeutet: Du befragst neue Personen — und lernst nichts wirklich Neues mehr dazu. Dann ist deine Theorie gesättigt. Das ist der Stopppunkt beim theoretischen Sampling.",
                tag="SAETTIGUNG",
                main=["THEOR.", "SAETT-", "IGUNG"],
                sub="kein neues Wissen mehr → STOP",
                accent=GREEN, style="pro"
            ),
            dict(
                tts="Selektives Sampling definiert die Auswahlkriterien VOR der Datenerhebung. Unabhängig vom Material selbst. Zum Beispiel: Du willst Frauen zwischen zwanzig und dreissig aus der Deutschschweiz befragen — das steht vorher fest.",
                tag="SELEKTIV",
                main=["KRITERIEN", "VORHER", "FEST"],
                sub="Geschlecht · Alter · Region — unabhaengig vom Material",
                accent=YELL, style="concept",
                svg=make_ab_test_svg("VORHER DEFINIERT", "IM PROZESS", YELL, GREEN, "ZEITPUNKT DER AUSWAHL")
            ),
            dict(
                tts="Purposive Sampling wählt Fälle nach ihrer RELEVANZ für die Forschungsfrage aus. Extremfälle, typische Fälle, besonders informationsreiche Fälle. Das Ziel ist maximaler Erkenntnisgewinn — nicht statistische Repräsentativität.",
                tag="PURPOSIVE",
                main=["RELE-", "VANZ"],
                sub="Extremfaelle · typische Faelle · informationsreich",
                accent=ORANGE, style="concept"
            ),
            dict(
                tts="Merke fuer die Pruefung: Theoretisches Sampling läuft im Prozess und endet bei theoretischer Sättigung — Umfang nicht vorab bestimmbar. Selektives Sampling legt Kriterien vor der Erhebung fest. Purposive Sampling wählt nach Relevanz für die Forschungsfrage.",
                tag="MERKE",
                main=["WANN", "WAS?"],
                sub="Theor: im Prozess | Selektiv: vorher | Purposive: Relevanz",
                accent=GREEN, style="summary"
            ),
        ]
    },

]


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"ESF Sitzung 4 Reels — {len(REELS)} Reels")
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("Done! Sitzung 4 Reels generated.")
    for f in sorted(OUT_DIR.glob("esf_1[789]_*.mp4")):
        print(f"  {f.name}  ({f.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    asyncio.run(main())
