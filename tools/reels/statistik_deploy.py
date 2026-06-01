#!/usr/bin/env python3
"""
Upload rendered Statistik reels to Supabase + update feed-data.js + git push.
Run AFTER gen_statistik_m[01-06]_reels.py have been executed.
"""
import subprocess, json, re, os
from pathlib import Path

SUPABASE_URL = "https://ifmwcgwfvunjbnfwwbtr.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_ANON_KEY", "sb_publishable__h4cSWEEpNBjY3XGPvh0_A_ipyoeEjO")
BUCKET = "videos"
OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")
FEED_DATA = Path("/home/raphael/K-Learning/data/feed-data.js")

REELS_META = [
    # M01 — Grundlagen & Deskriptive Statistik
    {"id":"statistik-sv-02","filename":"statistik_02_m01_skalenniveaus.mp4","title":"Skalenniveaus","subtitle":"Nominal → Ordinal → Intervall → Verhältnis","description":"Welche Berechnungen erlaubt welches Skalenniveau? Der häufigste Prüfungsfehler erklärt.","topics":["Skalenniveau","Nominal","Ordinal","Intervall","Verhältnis"],"block":"M01 — Grundlagen & Deskriptive Statistik","emoji":"📏"},
    {"id":"statistik-sv-03","filename":"statistik_03_m01_lageparameter.mp4","title":"Lageparameter","subtitle":"Mittelwert, Median, Modus — und wann welcher?","description":"Median immer aus sortierter Liste! Und warum der Mittelwert bei Rechtsschiefe den Median überholt.","topics":["Mittelwert","Median","Modus","Schiefe","Lageparameter"],"block":"M01 — Grundlagen & Deskriptive Statistik","emoji":"📊"},
    {"id":"statistik-sv-04","filename":"statistik_04_m01_streuungsmasse.mp4","title":"Streuungsmasse","subtitle":"Varianz, Standardabweichung & IQR","description":"Warum durch (n-1)? Varianz vs. IQR bei Ausreißern — die wichtigsten Streuungsmaße.","topics":["Varianz","Standardabweichung","IQR","Streuung","n-1"],"block":"M01 — Grundlagen & Deskriptive Statistik","emoji":"📐"},
    # M02 — Wahrscheinlichkeitsrechnung
    {"id":"statistik-sv-05","filename":"statistik_05_m02_bedingte_wahrscheinlichkeit.mp4","title":"Bedingte Wahrscheinlichkeit","subtitle":"P(B|A) = P(A∩B) / P(A) — richtig anwenden","description":"Bedingte Wahrscheinlichkeit, Multiplikationssatz und stochastische Unabhängigkeit erklärt.","topics":["Bedingte Wahrscheinlichkeit","Multiplikationssatz","Unabhängigkeit","P(B|A)"],"block":"M02 — Wahrscheinlichkeitsrechnung","emoji":"🎲"},
    {"id":"statistik-sv-06","filename":"statistik_06_m02_satz_von_bayes.mp4","title":"Satz von Bayes","subtitle":"Warum der Virustest täuscht — P(K|T+) = 15%?","description":"Satz von Bayes mit dem Virus-Testbeispiel: Sensitivität 90%, aber nur 15% wirklich krank.","topics":["Bayes","Totale Wahrscheinlichkeit","Falsch-Positiv","Diagnostik"],"block":"M02 — Wahrscheinlichkeitsrechnung","emoji":"🔬"},
    {"id":"statistik-sv-07","filename":"statistik_07_m02_kombinatorik.mp4","title":"Kombinatorik","subtitle":"Permutation vs. Kombination — n! und C(n,k)","description":"Wann zählt die Reihenfolge? Fakultät, Permutation und Binomialkoeffizient mit Beispielen.","topics":["Kombinatorik","Permutation","Kombination","Binomialkoeffizient","Fakultät"],"block":"M02 — Wahrscheinlichkeitsrechnung","emoji":"🔢"},
    # M03 — Wahrscheinlichkeitsverteilungen
    {"id":"statistik-sv-08","filename":"statistik_08_m03_binomialverteilung.mp4","title":"Binomialverteilung","subtitle":"P(X=x) = C(n,x)·πˣ·(1-π)ⁿ⁻ˣ","description":"Binomialverteilung: Formel, Erwartungswert μ=nπ, Varianz σ²=nπ(1-π) — mit Rechenbeispiel.","topics":["Binomialverteilung","Bernoulli","Erwartungswert","Varianz","Wahrscheinlichkeit"],"block":"M03 — Wahrscheinlichkeitsverteilungen","emoji":"📈"},
    {"id":"statistik-sv-09","filename":"statistik_09_m03_normalverteilung.mp4","title":"Normalverteilung","subtitle":"z = (X-μ)/σ und die 68-95-99.7-Regel","description":"Standardisierung, z-Transformation und Tabellenwerte: So löst du Normalverteilungsaufgaben.","topics":["Normalverteilung","z-Transformation","Standardnormalverteilung","68-95-99.7","Quantil"],"block":"M03 — Wahrscheinlichkeitsverteilungen","emoji":"🔔"},
    {"id":"statistik-sv-10","filename":"statistik_10_m03_poissonverteilung.mp4","title":"Poissonverteilung","subtitle":"E(X) = Var(X) = μ — der Grenzfall der Binomial","description":"Poissonverteilung als Grenzfall: Wann π < 0.05? Formel und der einzigartige E=Var Zusammenhang.","topics":["Poissonverteilung","Grenzfall","Binomial","Erwartungswert","Varianz"],"block":"M03 — Wahrscheinlichkeitsverteilungen","emoji":"⚡"},
    # M04 — Stichprobenverteilungen & Schätztheorie
    {"id":"statistik-sv-11","filename":"statistik_11_m04_zentraler_grenzwertsatz.mp4","title":"Zentraler Grenzwertsatz","subtitle":"Für n≥30 ist X̄ approximativ normalverteilt","description":"Der Zentraler Grenzwertsatz: Warum der Stichprobenmittelwert immer normalverteilt wird.","topics":["Zentraler Grenzwertsatz","Stichprobenmittelwert","Standardfehler","Normalverteilung"],"block":"M04 — Stichprobenverteilungen & Schätztheorie","emoji":"🎯"},
    {"id":"statistik-sv-12","filename":"statistik_12_m04_konfidenzintervall_z_vs_t.mp4","title":"Konfidenzintervall","subtitle":"z bei σ bekannt — t bei σ unbekannt","description":"KI für den Mittelwert: Wann z-Tabelle, wann t-Tabelle? Die Entscheidungsregel einfach erklärt.","topics":["Konfidenzintervall","z-Verteilung","t-Verteilung","σ bekannt","Schätztheorie"],"block":"M04 — Stichprobenverteilungen & Schätztheorie","emoji":"📐"},
    {"id":"statistik-sv-13","filename":"statistik_13_m04_stichprobenumfang.mp4","title":"Stichprobenumfang","subtitle":"n = (z·σ/e)² — wie groß muss die Stichprobe sein?","description":"Stichprobenumfang berechnen für Mittelwert und Anteilswert — mit der konservativen p=0.5 Schätzung.","topics":["Stichprobenumfang","Fehlertoleranz","Konfidenzintervall","Anteilswert"],"block":"M04 — Stichprobenverteilungen & Schätztheorie","emoji":"🔭"},
    # M05 — Hypothesentests
    {"id":"statistik-sv-14","filename":"statistik_14_m05_fehlerarten_pwert.mp4","title":"Fehler & p-Wert","subtitle":"α-Fehler, β-Fehler und der p-Wert erklärt","description":"Fehler 1. und 2. Art, ihr Trade-off, und was der p-Wert wirklich bedeutet.","topics":["Fehler 1. Art","Fehler 2. Art","p-Wert","Signifikanzniveau","Power"],"block":"M05 — Hypothesentests","emoji":"⚠️"},
    {"id":"statistik-sv-15","filename":"statistik_15_m05_ztest_vs_ttest.mp4","title":"z-Test vs t-Test","subtitle":"σ bekannt → z | σ unbekannt → t mit df=n-1","description":"Entscheidungsbaum: Welchen Test wähle ich? z-Test vs t-Test mit Prüfgrößen-Formeln.","topics":["z-Test","t-Test","Entscheidungsbaum","Prüfgröße","Freiheitsgrade"],"block":"M05 — Hypothesentests","emoji":"🔍"},
    {"id":"statistik-sv-16","filename":"statistik_16_m05_zweistichproben_welch_pooled.mp4","title":"Welch vs. Pooled t-Test","subtitle":"F-Test vorher — dann Welch oder Pooled?","description":"Zweistichprobentest: F-Test auf Varianzhomogenität, dann Welch (ungleich) oder Pooled (gleich).","topics":["Welch-Test","Pooled t-Test","F-Test","Zweistichproben","Varianzhomogenität"],"block":"M05 — Hypothesentests","emoji":"⚖️"},
    # M06 — ANOVA & Regression
    {"id":"statistik-sv-17","filename":"statistik_17_m06_anova_ftest.mp4","title":"ANOVA F-Test","subtitle":"SST = SSTR + SSE — zwischen vs. innerhalb","description":"Einfaktorielle ANOVA: Quadratsummenzerlegung, F = MSTR/MSE und der kritische F-Wert.","topics":["ANOVA","F-Test","SST","SSTR","SSE","Varianzanalyse"],"block":"M06 — ANOVA & Regression","emoji":"📊"},
    {"id":"statistik-sv-18","filename":"statistik_18_m06_linreg_ols.mp4","title":"Lineare Regression OLS","subtitle":"β̂ = (XᵀX)⁻¹Xᵀy und R² = SSR/SST","description":"OLS-Schätzung, Bestimmtheitsmaß R² und Signifikanztest der Regression erklärt.","topics":["OLS","Regression","R²","β-Koeffizienten","Bestimmtheitsmaß"],"block":"M06 — ANOVA & Regression","emoji":"📉"},
    {"id":"statistik-sv-19","filename":"statistik_19_m06_multiple_regression.mp4","title":"Multiple Regression","subtitle":"Ceteris paribus + adj. R² + Multikollinearität","description":"Multiple Regression: ceteris-paribus-Interpretation, adjustiertes R² und Multikollinearitätsfallen.","topics":["Multiple Regression","adj. R²","Multikollinearität","ceteris paribus","Interpretation"],"block":"M06 — ANOVA & Regression","emoji":"📐"},
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
        ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "json", str(local_path)],
        capture_output=True, text=True)
    try:
        secs = float(json.loads(r.stdout)["format"]["duration"])
        return f"{int(secs//60)}:{int(secs%60):02d}"
    except Exception:
        return "1:00"


def build_entry(meta, public_url, duration):
    topics_js = json.dumps(meta["topics"], ensure_ascii=False)
    return f"""  {{
    id: "{meta['id']}",
    type: "localvideo",
    course: "Statistik", courseColor: "#0ea5e9",
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
    content = FEED_DATA.read_text(encoding="utf-8")
    existing_ids = set(re.findall(r'id:\s*"(statistik-sv-\d+)"', content))
    to_add = [(m, s) for m, s in new_entries if m["id"] not in existing_ids]
    if not to_add:
        print("  All entries already in feed-data.js")
        return
    entries_js = ",\n".join(s for _, s in to_add)
    new_content = content.replace("];", f",\n{entries_js},\n];")
    FEED_DATA.write_text(new_content, encoding="utf-8")
    print(f"  Added {len(to_add)} entries")
    for m, _ in to_add:
        print(f"    + {m['id']}: {m['title']}")


def main():
    print("Statistik Reels Deploy — M01–M06 (18 Reels)")
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
        subprocess.run(["git", "-C", repo, "add", "data/feed-data.js"], check=True)
        msg = f"feat(feed): add {len(new_entries)} Statistik reels (M01–M06)"
        subprocess.run(["git", "-C", repo, "commit", "-m", msg], check=True)
        subprocess.run(["git", "-C", repo, "push"], check=True)
        print("\nDone! Statistik Reels live on K-Learning.")
    else:
        print("\nNo videos found — run gen_statistik_m[XX]_reels.py first.")


if __name__ == "__main__":
    main()
