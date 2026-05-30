#!/usr/bin/env bash
# ── HLS Transcoding Pipeline ──────────────────────────────────────────────────
# Converts MP4 → HLS (360p + 720p) ready for Cloudflare R2 + adaptive playback
# Usage: ./transcode_hls.sh <input.mp4> [output_dir]
# Output: <output_dir>/<name>/master.m3u8 + segments

set -euo pipefail

INPUT="${1:?Usage: $0 <input.mp4> [output_dir]}"
NAME=$(basename "$INPUT" .mp4 | tr ' ' '_' | tr '[:upper:]' '[:lower:]')
OUT_BASE="${2:-/home/raphael/lernplattform/hls}"
OUT="$OUT_BASE/$NAME"

mkdir -p "$OUT"

echo "▶ Transcoding: $INPUT → $OUT"

# Detect if video is portrait (shorts/reels) or landscape
WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$INPUT" 2>/dev/null)
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$INPUT" 2>/dev/null)
FILESIZE=$(stat -c%s "$INPUT")

echo "   Resolution: ${WIDTH}x${HEIGHT}, Size: $(( FILESIZE / 1024 / 1024 ))MB"

# Small files (<8MB): single quality only, no ABR overhead needed
if [ "$FILESIZE" -lt 8388608 ]; then
  echo "   Mode: Single quality (small file)"
  ffmpeg -i "$INPUT" -y \
    -c:v libx264 -preset fast -crf 23 \
    -vf "scale=w=trunc(oh*a/2)*2:h=720:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
    -c:a aac -b:a 128k -ar 44100 \
    -f hls \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUT/seg_%03d.ts" \
    "$OUT/stream.m3u8"

  # Write a master.m3u8 for compatibility
  cat > "$OUT/master.m3u8" << EOF
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=1500000,RESOLUTION=${WIDTH}x720
stream.m3u8
EOF

else
  # Large files: 360p + 720p ABR
  echo "   Mode: Adaptive (360p + 720p)"
  ffmpeg -i "$INPUT" -y \
    -filter_complex \
      "[0:v]split=2[v1][v2]; \
       [v1]scale=w=trunc(oh*a/2)*2:h=360:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2[v360]; \
       [v2]scale=w=trunc(oh*a/2)*2:h=720:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2[v720]" \
    \
    -map "[v360]" -c:v:0 libx264 -preset fast -b:v:0 600k  -maxrate:v:0 700k  -bufsize:v:0 1000k \
    -map "[v720]" -c:v:1 libx264 -preset fast -b:v:1 2000k -maxrate:v:1 2200k -bufsize:v:1 3000k \
    -map 0:a      -c:a aac -b:a 128k -ar 44100 \
    \
    -f hls \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUT/stream_%v/seg_%03d.ts" \
    -master_pl_name master.m3u8 \
    -var_stream_map "v:0,a:0 v:1,a:0" \
    "$OUT/stream_%v.m3u8"
fi

echo "✅ Done: $OUT/master.m3u8"
echo "   Segments:"
find "$OUT" -name "*.ts" | wc -l | xargs echo "   "
du -sh "$OUT"
