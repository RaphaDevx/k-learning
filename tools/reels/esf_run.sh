#!/usr/bin/env bash
# Run all ESF reel generators sequentially
# Usage: bash run_all_reels.sh [s1|s2|s3|s4|s5|s6|all]
set -e

SESSION="${1:-all}"
DIR="$(cd "$(dirname "$0")" && pwd)"

run_session() {
    local n="$1"
    echo ""
    echo "════════════════════════════════════════"
    echo "  Generating Sitzung $n Reels..."
    echo "════════════════════════════════════════"
    python3 "$DIR/gen_s${n}_reels.py"
}

case "$SESSION" in
    s1) python3 "$DIR/gen_reels_v2.py" ;;
    s2) run_session 2 ;;
    s3) run_session 3 ;;
    s4) run_session 4 ;;
    s5) run_session 5 ;;
    s6) run_session 6 ;;
    all)
        python3 "$DIR/gen_reels_v2.py"
        for n in 2 3 4 5 6; do
            run_session $n
        done
        echo ""
        echo "All sessions done."
        ls -lh "$DIR/output_v2/"*.mp4 2>/dev/null | awk '{print $5, $9}'
        ;;
    *)
        echo "Usage: $0 [s1|s2|s3|s4|s5|s6|all]"
        exit 1
        ;;
esac
