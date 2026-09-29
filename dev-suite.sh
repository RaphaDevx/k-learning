#!/usr/bin/env bash
# K-Dev Suite — Alle Development-Server starten
# Verwendung: bash dev-suite.sh [--update-graph]

set -e

KLEARNING_DIR="$(cd "$(dirname "$0")" && pwd)"
STUDIO_DIR="/home/raphael/K-Creative-Cloud/studio"
GRAPH_DIR="$KLEARNING_DIR/graphify-out"
GRAPHIFY="$HOME/.local/bin/graphify"
PORTAL_URL="http://localhost:4099/portal.html"

# Farben
GRN='\033[0;32m'; YLW='\033[0;33m'; BLU='\033[0;34m'; PRP='\033[0;35m'
CYN='\033[0;36m'; GRY='\033[0;90m'; RST='\033[0m'; BLD='\033[1m'

echo ""
echo -e "${PRP}${BLD}╔══════════════════════════════════════════╗${RST}"
echo -e "${PRP}${BLD}║          K-Dev Suite Launcher            ║${RST}"
echo -e "${PRP}${BLD}╚══════════════════════════════════════════╝${RST}"
echo ""

# ── 1. Brand Studio (Port 7000) ───────────────────────────────────────────────
echo -e "${BLD}[1/3] Brand Studio (Port 7000)${RST}"
if curl -s --max-time 1 http://localhost:7000/api/check >/dev/null 2>&1; then
    echo -e "  ${GRN}✓${RST} Bereits aktiv"
else
    echo -e "  ${YLW}→${RST} Starte Server..."
    cd "$STUDIO_DIR"
    nohup python3 server.py >/tmp/k-studio.log 2>&1 &
    STUDIO_PID=$!
    echo "$STUDIO_PID" > /tmp/k-studio.pid
    sleep 2
    if curl -s --max-time 2 http://localhost:7000/api/check >/dev/null 2>&1; then
        echo -e "  ${GRN}✓${RST} Gestartet (PID $STUDIO_PID)"
    else
        echo -e "  ${YLW}⚠${RST} Möglicherweise noch nicht bereit — Log: /tmp/k-studio.log"
    fi
fi

# ── 2. Graphify / DevTools Server (Port 4099) ─────────────────────────────────
echo ""
echo -e "${BLD}[2/3] Code Graph Server (Port 4099)${RST}"
if curl -s --max-time 1 http://localhost:4099/graph.json >/dev/null 2>&1; then
    echo -e "  ${GRN}✓${RST} Bereits aktiv"
else
    echo -e "  ${YLW}→${RST} Starte HTTP-Server..."
    nohup python3 -m http.server 4099 --directory "$GRAPH_DIR" >/tmp/k-graph.log 2>&1 &
    GRAPH_PID=$!
    echo "$GRAPH_PID" > /tmp/k-graph.pid
    sleep 1
    echo -e "  ${GRN}✓${RST} Gestartet (PID $GRAPH_PID)"
fi

# ── 3. Graph Update (optional) ────────────────────────────────────────────────
echo ""
echo -e "${BLD}[3/3] Graph-Status${RST}"
if [ "$1" = "--update-graph" ]; then
    echo -e "  ${YLW}→${RST} Aktualisiere Graph (kein API-Cost)..."
    cd "$KLEARNING_DIR"
    "$GRAPHIFY" update . 2>&1 | tail -3 | sed 's/^/  /'
    echo -e "  ${GRN}✓${RST} Graph aktualisiert"
else
    BUILT=$(python3 -c "import json; d=json.load(open('$GRAPH_DIR/graph.json')); print(d.get('built_at_commit','?')[:7])" 2>/dev/null || echo "?")
    HEAD=$(cd "$KLEARNING_DIR" && git rev-parse --short=7 HEAD 2>/dev/null || echo "?")
    if [ "$BUILT" = "$HEAD" ]; then
        echo -e "  ${GRN}✓${RST} Graph aktuell (Commit $HEAD)"
    else
        echo -e "  ${YLW}⚠${RST} Graph veraltet — Commit ${BUILT} vs HEAD ${HEAD}"
        echo -e "  ${GRY}  → Neu bauen: bash dev-suite.sh --update-graph${RST}"
    fi
fi

# ── ÜBERSICHT ─────────────────────────────────────────────────────────────────
echo ""
echo -e "${PRP}──────────────────────────────────────────────${RST}"
echo -e "${BLD}${GRN}  Dev Suite läuft${RST}"
echo ""
echo -e "  ${CYN}🚀 Portal:${RST}         ${BLD}$PORTAL_URL${RST}"
echo -e "  ${BLU}🎨 Design System:${RST}  http://localhost:7000/static/designsystem-v1.html"
echo -e "  ${PRP}⬡  Code Graph:${RST}     http://localhost:4099/devtools.html"
echo -e "  ${GRY}🗄  Supabase:${RST}       https://supabase.com/dashboard/project/ifmwcgwfvunjbnfwwbtr"
echo ""
echo -e "  ${GRY}Logs: /tmp/k-studio.log | /tmp/k-graph.log${RST}"
echo -e "  ${GRY}Stop: kill \$(cat /tmp/k-studio.pid /tmp/k-graph.pid 2>/dev/null)${RST}"
echo -e "${PRP}──────────────────────────────────────────────${RST}"
echo ""
