#!/usr/bin/env bash
# ── R2 Upload Pipeline ────────────────────────────────────────────────────────
# Uploads HLS output directory to Cloudflare R2 via wrangler
# Usage: ./upload_r2.sh [hls_dir] [bucket_name]

set -euo pipefail

HLS_DIR="${1:-/home/raphael/lernplattform/hls}"
BUCKET="${2:-k-learning-videos}"

# Token kommt aus Umgebung: source ~/.config/kcloud/.env
: "${CLOUDFLARE_API_TOKEN:?Bitte CLOUDFLARE_API_TOKEN setzen (source ~/.config/kcloud/.env)}"
export CLOUDFLARE_API_TOKEN

echo "▶ Uploading HLS from $HLS_DIR → R2 bucket: $BUCKET"

# Create bucket if it doesn't exist
npx wrangler r2 bucket create "$BUCKET" 2>/dev/null || echo "   Bucket already exists"

# Upload all files
find "$HLS_DIR" -type f | while read -r file; do
  key="${file#$HLS_DIR/}"

  if [[ "$file" == *.m3u8 ]]; then
    content_type="application/vnd.apple.mpegurl"
  elif [[ "$file" == *.ts ]]; then
    content_type="video/mp2t"
  else
    content_type="application/octet-stream"
  fi

  echo "   uploading: $key"
  npx wrangler r2 object put "$BUCKET/$key" \
    --file "$file" \
    --content-type "$content_type" \
    --cache-control "public, max-age=31536000" 2>/dev/null
done

echo "✅ Upload complete"
echo "   Public URL base: https://pub-<BUCKET_ID>.r2.dev/$BUCKET/"
echo "   → After enabling public access in Cloudflare Dashboard: R2 → $BUCKET → Settings → Public Access"
