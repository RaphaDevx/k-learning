#!/bin/bash
# ── Migrate videos: Supabase Storage → Cloudflare R2 ─────────────────────────
# Token-Source: /home/claude/.keys/tokens.env  (chmod 600 — nie Token hardcoden)
# USAGE: bash scripts/migrate-to-r2.sh [all | phase 1|2|3]
# ─────────────────────────────────────────────────────────────────────────────

set -e

# Keystore laden
source /home/claude/.keys/tokens.env
export CLOUDFLARE_API_TOKEN

SUPABASE_BASE="https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos"
R2_BUCKET_NAME="k-learning-videos"
TMP_DIR="/tmp/r2-migration"
PHASE="${2:-all}"

# Nach R2-Bucket-Erstellung + Public Access aktivieren:
# Dashboard → R2 → k-learning-videos → Settings → Public URL
R2_PUBLIC_URL="https://pub-c9ae7dac5a4b4514a6048354bd2bde9c.r2.dev"

# Liste aller 69 Video-Dateien
VIDEOS=(
  "esf_01_was_ist_esf_v2.mp4"
  "esf_04_laborexperiment_v2.mp4"
  "esf_05_qualitativ_quantitativ_v2.mp4"
  "esf_01_was_ist_esf.mp4"
  "laborexperiment_reel.mp4"
  "esf_02_forschungsprozess.mp4"
  "esf_03_forschungsdesign.mp4"
  "esf_05_qualitativ_quantitativ.mp4"
  "esf_06_mixed_methods.mp4"
  "esf_07_primaer_sekundaer.mp4"
  "esf_01_deduktion_vs_induktion.mp4"
  "esf_02_forschungsdesigns.mp4"
  "esf_03_forschungsprozess_v2.mp4"
  "esf-s1-was-ist-esf.mp4"
  "esf-s1-forschungsprozess.mp4"
  "esf-s1-forschungsdesign.mp4"
  "esf-s1-primaer-sekundaer.mp4"
  "esf-s4-ipa.mp4"
  "stats_zweistichproben.mp4"
  "statistik_02_m01_skalenniveaus.mp4"
  "statistik_03_m01_lageparameter.mp4"
  "statistik_04_m01_streuungsmasse.mp4"
  "statistik_05_m02_bedingte_wahrscheinlichkeit.mp4"
  "statistik_06_m02_satz_von_bayes.mp4"
  "statistik_07_m02_kombinatorik.mp4"
  "statistik_08_m03_binomialverteilung.mp4"
  "statistik_09_m03_normalverteilung.mp4"
  "statistik_10_m03_poissonverteilung.mp4"
  "statistik_11_m04_zentraler_grenzwertsatz.mp4"
  "statistik_12_m04_konfidenzintervall_z_vs_t.mp4"
  "statistik_13_m04_stichprobenumfang.mp4"
  "statistik_14_m05_fehlerarten_pwert.mp4"
  "statistik_15_m05_ztest_vs_ttest.mp4"
  "statistik_16_m05_zweistichproben_welch_pooled.mp4"
  "statistik_17_m06_anova_ftest.mp4"
  "statistik_18_m06_linreg_ols.mp4"
  "statistik_19_m06_multiple_regression.mp4"
  "statistik_t1_deskriptiv.mp4"
  "statistik_t2_wahrscheinlichkeit.mp4"
  "statistik_t3_verteilungen.mp4"
  "statistik_t4_schaetztheorie.mp4"
  "statistik_t5_hypothesentests.mp4"
  "statistik_t6_anova_regression.mp4"
  "om_bullwhip_effect.mp4"
  "om_bullwhip_effekt.mp4"
  "om_epq_lagerbestand.mp4"
  "om_mrp1_material_requirements.mp4"
  "om_mrp2_schritte.mp4"
  "om_mrp2_vollstaendig.mp4"
  "om_newsvendor_critical_ratio.mp4"
  "om_newsvendor_excel_stepbystep.mp4"
  "om_q12_quantity_discount.mp4"
  "om_q19_hs23_bom_excel_v2.mp4"
  "om_sc_without_postponement_latex.mp4"
  "ESF_Paper1_AI_Assessment_Effect_v3.mp4"
  "ESF_Paper2_Doppelgaenger_Brand_Image_v3.mp4"
  "ESF_Paper3_Open_Science_Replikationskrise_v3.mp4"
  "ESF_Paper4_Luca_Korrelation_Kausalitaet_v3.mp4"
  "ESF_Paper5_de_Bellis_Manual_Labor_v3.mp4"
  "ESF_S4_V1_Grundlagen_Datenerhebung_v3.mp4"
  "ESF_S4_V2_Sampling_Kodierung_GroundedTheory_v3.mp4"
  "ESF_S4_V3_Inhaltsanalyse_Pruefungsfallen_v3.mp4"
  "ESF_S5_V1_Guetekriterien_v3.mp4"
  "ESF_S5_V2_Replikationskrise_OpenScience_v3.mp4"
  "ESF_S5_V3_NeueTechnologien_Pruefungsfallen_v3.mp4"
  "ESF_S6_V1_Akademisches_Schreiben_v3.mp4"
  "ESF_S6_V2_APA_Plagiate_v3.mp4"
  "ESF_S6_V3_Datenvisualisierung_v3.mp4"
  "ESF_S6_V4_Publikation_Pruefungsfallen_v3.mp4"
)

# ── Phase 1: Download von Supabase ───────────────────────────────────────────
phase1_download() {
  echo "📥 Phase 1: Download ${#VIDEOS[@]} Videos von Supabase..."
  mkdir -p "$TMP_DIR"
  local ok=0 fail=0
  for f in "${VIDEOS[@]}"; do
    local url="$SUPABASE_BASE/$f"
    local dest="$TMP_DIR/$f"
    if [ -f "$dest" ]; then
      echo "  ⏭  $f (schon vorhanden)"
      ok=$((ok + 1))
      continue
    fi
    echo -n "  ↓  $f ... "
    if curl -s -f -o "$dest" "$url"; then
      local size=$(du -sh "$dest" | cut -f1)
      echo "✅ ($size)"
      ok=$((ok + 1))
    else
      echo "❌ FEHLER"
      fail=$((fail + 1))
    fi
  done
  echo ""
  echo "Phase 1 fertig: $ok OK, $fail Fehler"
}

# ── Phase 2: Upload nach R2 ──────────────────────────────────────────────────
phase2_upload() {
  echo "☁️  Phase 2: Upload nach R2 Bucket '$R2_BUCKET_NAME'..."
  local ok=0 fail=0
  for f in "${VIDEOS[@]}"; do
    local src="$TMP_DIR/$f"
    if [ ! -f "$src" ]; then
      echo "  ⚠️  $f fehlt lokal — Phase 1 zuerst ausführen"
      fail=$((fail + 1))
      continue
    fi
    echo -n "  ↑  $f ... "
    if wrangler r2 object put "$R2_BUCKET_NAME/$f" \
        --file "$src" \
        --content-type "video/mp4" \
        --cache-control "public, max-age=31536000" 2>/dev/null; then
      echo "✅"
      ok=$((ok + 1))
    else
      echo "❌"
      fail=$((fail + 1))
    fi
  done
  echo ""
  echo "Phase 2 fertig: $ok OK, $fail Fehler"
}

# ── Phase 3: URLs in feed-data.js patchen ────────────────────────────────────
phase3_patch_urls() {
  if [ -z "$R2_PUBLIC_URL" ]; then
    echo "❌ R2_PUBLIC_URL nicht gesetzt!"
    echo ""
    echo "So findest du die URL:"
    echo "  1. https://dash.cloudflare.com → R2 → $R2_BUCKET_NAME"
    echo "  2. Settings → Public Access → Enable"
    echo "  3. Kopiere die 'Public Bucket URL' (z.B. https://pub-abc123.r2.dev)"
    echo "  4. Trage sie als R2_PUBLIC_URL in dieses Skript ein"
    exit 1
  fi

  local OLD="https://ifmwcgwfvunjbnfwwbtr.supabase.co/storage/v1/object/public/videos"
  local NEW="$R2_PUBLIC_URL"
  local TARGET="../data/feed-data.js"

  cd "$(dirname "$0")"

  echo "🔗 Phase 3: URLs patchen..."
  echo "  Von: $OLD"
  echo "  Nach: $NEW"
  echo ""

  local count=$(grep -c "$OLD" "$TARGET" 2>/dev/null || echo 0)
  echo "  $count URLs gefunden — ersetze..."

  sed -i "s|$OLD|$NEW|g" "$TARGET"

  echo "  ✅ feed-data.js gepatcht ($count URLs)"
  echo ""
  echo "Nächste Schritte:"
  echo "  cd /home/raphael/K-Learning"
  echo "  git add data/feed-data.js"
  echo "  git commit -m 'feat(videos): migrate video URLs from Supabase to Cloudflare R2'"
  echo "  git push origin main"
}

# ── Main ─────────────────────────────────────────────────────────────────────
echo "═══════════════════════════════════════════════════"
echo " K-Learning — Supabase → Cloudflare R2 Migration"
echo "═══════════════════════════════════════════════════"
echo ""

case "${1:-all}" in
  --phase|phase)
    case "$2" in
      1) phase1_download ;;
      2) phase2_upload ;;
      3) phase3_patch_urls ;;
      *) echo "Ungültige Phase. Nutze: 1, 2 oder 3" ;;
    esac
    ;;
  all)
    phase1_download
    echo ""
    phase2_upload
    echo ""
    echo "⏸  Bitte R2_PUBLIC_URL setzen, dann Phase 3 ausführen:"
    echo "   bash scripts/migrate-to-r2.sh phase 3"
    ;;
  *)
    echo "Usage: bash scripts/migrate-to-r2.sh [all | phase 1|2|3]"
    ;;
esac
