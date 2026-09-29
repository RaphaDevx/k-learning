#!/usr/bin/env python3
"""
Upload newly rendered ESF reels (Sitzungen 2-6) to Supabase + update feed-data.js + git push.
Run AFTER gen_s2..6_reels.py have been executed and output_v2/ contains the MP4 files.
"""
import subprocess, json, re, os
from pathlib import Path

SUPABASE_URL = "https://ifmwcgwfvunjbnfwwbtr.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY", "sb_publishable__h4cSWEEpNBjY3XGPvh0_A_ipyoeEjO")
BUCKET = "videos"
OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")
FEED_DATA = Path("/home/raphael/K-Learning/data/feed-data.js")

REELS_META = [
    # Sitzung 2
    {"id":"esf-sv-11","filename":"esf_11_forschungsfrage.mp4","title":"Die Forschungsfrage","subtitle":"Deskriptiv, Vergleich & Kausal — 3 Typen erklärt","description":"Was macht eine gute Forschungsfrage? Die 3 Typen und 6 Kriterien.","topics":["Forschungsfrage","Typen","Kriterien","Forschungslücke"],"block":"Forschungsfrage & Hypothesen","emoji":"❓"},
    {"id":"esf-sv-12","filename":"esf_12_hypothesen.mp4","title":"Hypothesen","subtitle":"H0 vs H1, gerichtet & ungerichtet","description":"Hypothesen korrekt formulieren: H0/H1, gerichtet vs. ungerichtet, Eigenschaften.","topics":["Hypothesen","H0","H1","Nullhypothese","Alternativhypothese"],"block":"Forschungsfrage & Hypothesen","emoji":"H0"},
    {"id":"esf-sv-13","filename":"esf_13_mediation_moderation.mp4","title":"Mediation vs. Moderation","subtitle":"UV, AV & Variablentypen im konzept. Modell","description":"Mediator erklärt WIE, Moderator verändert die STÄRKE — der Unterschied.","topics":["Mediator","Moderator","UV","AV","Konzeptionelles Modell"],"block":"Forschungsfrage & Hypothesen","emoji":"📐"},
    # Sitzung 3
    {"id":"esf-sv-14","filename":"esf_14_kausalitaet_korrelation.mp4","title":"Kausalität vs. Korrelation","subtitle":"Die 6 Beziehungstypen — Prüfungsklassiker","description":"Direkte, umgekehrte, indirekte Kausalität und Scheinkorrelation: alle 6 Typen.","topics":["Kausalität","Korrelation","Scheinkorrelation","Beziehungstypen"],"block":"Quantitative Forschung","emoji":"🔗"},
    {"id":"esf-sv-15","filename":"esf_15_experiment_typen.mp4","title":"Experiment-Typen","subtitle":"Labor vs. Feld vs. Online — wann welches?","description":"Interne vs. externe Validität: Labor-, Feld- und Online-Experiment im Vergleich.","topics":["Laborexperiment","Feldexperiment","Online-Experiment","Validität","Quasi-Experiment"],"block":"Quantitative Forschung","emoji":"🧪"},
    {"id":"esf-sv-16","filename":"esf_16_skalenniveau.mp4","title":"Skalenniveau","subtitle":"Nominal, Ordinal, Intervall — was ist was?","description":"Die 4 Skalenniveaus und der häufigste Prüfungsfehler: Likert ist ORDINAL!","topics":["Skalenniveau","Nominal","Ordinal","Intervall","Likert"],"block":"Quantitative Forschung","emoji":"📊"},
    # Sitzung 4
    {"id":"esf-sv-17","filename":"esf_17_positivismus_interpretivismus.mp4","title":"Positivismus vs. Interpretivismus","subtitle":"Zwei Weltbilder der Sozialforschung","description":"Positivistisch = Vorhersage, objektiv; Interpretativ = Verstehen, subjektiv konstruiert.","topics":["Positivismus","Interpretivismus","Paradigmen","Qualitativ","Quantitativ"],"block":"Qualitative Forschung","emoji":"🔭"},
    {"id":"esf-sv-18","filename":"esf_18_interview_typen.mp4","title":"Interview-Typen","subtitle":"Unstrukturiert, semi-strukturiert & strukturiert","description":"Qualitative Interviews: Flexibilität vs. Effizienz — wann welcher Typ?","topics":["Interview","Semi-strukturiert","Fokusgruppe","Qualitative Methoden"],"block":"Qualitative Forschung","emoji":"🎤"},
    {"id":"esf-sv-19","filename":"esf_19_sampling.mp4","title":"Qualitative Stichproben","subtitle":"Theoretisch, selektiv & purposive Sampling","description":"Theoretische Sättigung, Kriterien vorab vs. im Prozess — die 3 Samplingmethoden.","topics":["Theoretisches Sampling","Selektives Sampling","Purposive Sampling","Stichprobe"],"block":"Qualitative Forschung","emoji":"🎯"},
    # Sitzung 5
    {"id":"esf-sv-20","filename":"esf_20_guetekriterien.mp4","title":"Gütekriterien","subtitle":"Reliabilität, Validität & Objektivität","description":"Zuverlässig ≠ gültig: das Verhältnis der 3 Gütekriterien und Cronbach's Alpha.","topics":["Reliabilität","Validität","Objektivität","Cronbachs Alpha","Gütekriterien"],"block":"Gütekriterien & Open Science","emoji":"✓"},
    {"id":"esf-sv-21","filename":"esf_21_replikationskrise.mp4","title":"Replikationskrise","subtitle":"Warum scheitern 64% aller Studien?","description":"p-hacking, HARKing, Publikationsbias: Die 4 Ursachen der Replikationskrise.","topics":["Replikationskrise","p-hacking","HARKing","Publikationsbias","Power"],"block":"Gütekriterien & Open Science","emoji":"⚠"},
    {"id":"esf-sv-22","filename":"esf_22_open_science.mp4","title":"Open Science","subtitle":"Präregistrierung, Registered Report & Open Data","description":"Open Science als Antwort auf die Replikationskrise: 3 zentrale Praktiken.","topics":["Open Science","Präregistrierung","Registered Report","Open Data"],"block":"Gütekriterien & Open Science","emoji":"🔓"},
    # Sitzung 6
    {"id":"esf-sv-23","filename":"esf_23_pruefungsstrategie.mp4","title":"Prüfungsstrategie ESF","subtitle":"30 Fragen, Single vs. Multiple Choice","description":"Das Prüfungsformat: Single Choice (1 richtig) vs. Multiple Choice (alle oder 0P).","topics":["Prüfung","Multiple Choice","Single Choice","Strategie"],"block":"Schreiben & Publikation","emoji":"★"},
    {"id":"esf-sv-24","filename":"esf_24_datenvisualisierung.mp4","title":"Datenvisualisierung","subtitle":"10 Prinzipien für gute Visualisierungen","description":"Die 10 Prinzipien: Botschaft definieren, Farbe bedeutet etwas, weniger ist mehr.","topics":["Datenvisualisierung","Prinzipien","ggplot2","Visualisierung"],"block":"Schreiben & Publikation","emoji":"📈"},
    {"id":"esf-sv-25","filename":"esf_25_publikationsprozess.mp4","title":"Publikationsprozess","subtitle":"Einreichung → Review → Akzeptanz (~10%)","description":"Der Weg vom Manuskript zur Publikation: 6 Reviewer-Empfehlungen, ~10% Akzeptanz.","topics":["Publikation","Peer Review","VHB","Journal","Reviewer"],"block":"Schreiben & Publikation","emoji":"📝"},
]


def upload_video(filename):
    local_path = OUT_DIR / filename
    if not local_path.exists():
        print(f"  SKIP (not found): {local_path}")
        return None
    upload_url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{filename}"
    print(f"  Uploading {filename} ({local_path.stat().st_size/1024/1024:.1f} MB)...")
    result = subprocess.run([
        "curl", "-s", "-w", "\n%{http_code}",
        "-X", "POST",
        "-H", f"Authorization: Bearer {SUPABASE_KEY}",
        "-H", f"apikey: {SUPABASE_KEY}",
        "-H", "Content-Type: video/mp4",
        "--data-binary", f"@{local_path}", upload_url,
    ], capture_output=True, text=True)
    lines = result.stdout.strip().split("\n")
    http_code = lines[-1] if lines else "?"
    body = "\n".join(lines[:-1])
    if http_code in ("200", "201"):
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{filename}"
        print(f"  OK → {public_url}")
        return public_url
    elif http_code == "409":
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET}/{filename}"
        print(f"  EXISTS → {public_url}")
        return public_url
    else:
        print(f"  FAIL HTTP {http_code}: {body[:150]}")
        return None


def get_duration(filename):
    local_path = OUT_DIR / filename
    if not local_path.exists():
        return "1:00"
    r = subprocess.run(
        ["ffprobe","-v","quiet","-show_entries","format=duration","-of","json",str(local_path)],
        capture_output=True, text=True)
    try:
        secs = float(json.loads(r.stdout)["format"]["duration"])
        return f"{int(secs//60)}:{int(secs%60):02d}"
    except:
        return "1:00"


def build_entry(meta, public_url, duration):
    topics_js = json.dumps(meta["topics"], ensure_ascii=False)
    return f"""  {{
    id: "{meta['id']}",
    type: "localvideo",
    course: "ESF", courseColor: "#7c3aed",
    emoji: "{meta['emoji']}",
    title: "{meta['title']}",
    subtitle: "{meta['subtitle']}",
    description: "{meta['description']}",
    topics: {topics_js},
    duration: "{duration}",
    level: "Prüfungsrelevant ⚡",
    video_src: "{public_url}",
    thumbnail_emoji: "{meta['emoji']}",
    block: "{meta['block']}"
  }}"""


def update_feed(new_entries):
    content = FEED_DATA.read_text(encoding='utf-8')
    existing_ids = set(re.findall(r'id:\s*"(esf-sv-\d+)"', content))
    to_add = [(m, s) for m, s in new_entries if m["id"] not in existing_ids]
    if not to_add:
        print("  All entries already in feed-data.js")
        return
    entries_js = ",\n".join(s for _, s in to_add)
    new_content = content.replace("];", f",\n{entries_js},\n];")
    FEED_DATA.write_text(new_content, encoding='utf-8')
    print(f"  Added {len(to_add)} entries")
    for m, _ in to_add:
        print(f"    + {m['id']}: {m['title']}")


def main():
    print("ESF Reels Deploy — Sitzungen 2-6")
    new_entries = []
    for meta in REELS_META:
        print(f"\n[{meta['id']}] {meta['title']}")
        url = upload_video(meta["filename"])
        if url:
            dur = get_duration(meta["filename"])
            entry = build_entry(meta, url, dur)
            new_entries.append((meta, entry))

    if new_entries:
        print(f"\nUpdating feed-data.js ({len(new_entries)} entries)...")
        update_feed(new_entries)
        repo = "/home/raphael/K-Learning"
        subprocess.run(["git","-C",repo,"add","data/feed-data.js"], check=True)
        msg = f"feat(feed): add {len(new_entries)} ESF reels (Sitzungen 2-6)"
        subprocess.run(["git","-C",repo,"commit","-m",msg], check=True)
        subprocess.run(["git","-C",repo,"push"], check=True)
        print("\nDone! Reels live on K-Learning.")
    else:
        print("\nNo videos found — run gen_s[N]_reels.py first.")


if __name__ == "__main__":
    main()
