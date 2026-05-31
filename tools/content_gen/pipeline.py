#!/usr/bin/env python3
"""
K-Learning Course Content Pipeline
Generates flashcards + reel scripts for any course, module by module.

Usage:
  python3 pipeline.py --course statistik
  python3 pipeline.py --course esf --step flashcards
  python3 pipeline.py --course statistik --step reels --module m03
  python3 pipeline.py --course statistik --step flashcards,commit

Steps: flashcards | reels | render | deploy | commit | all
       (comma-separated, default: all)
"""

import argparse, json, re, subprocess, sys, ast
from pathlib import Path
import anthropic

TOOLS_DIR = Path(__file__).parent
REPO_DIR  = TOOLS_DIR.parent.parent  # K-Learning root
REEL_CORE = Path("/home/raphael/ESF_Reels")  # gen_reels_v2.py lives here

# ─── Course config ────────────────────────────────────────────────────────────

def load_course(course_id: str) -> dict:
    path = TOOLS_DIR / "courses" / f"{course_id}.json"
    if not path.exists():
        sys.exit(f"ERROR: No config for course '{course_id}' at {path}")
    return json.loads(path.read_text(encoding="utf-8"))


# ─── Content reading ──────────────────────────────────────────────────────────

def read_module_content(module: dict, max_chars: int = 8000) -> str:
    chunks = []
    for fpath in module.get("content_files", []):
        p = Path(fpath)
        if p.exists():
            text = p.read_text(encoding="utf-8")[:max_chars]
            chunks.append(f"### {p.stem}\n\n{text}")
        else:
            print(f"  WARN: content file not found: {fpath}")
    return "\n\n---\n\n".join(chunks)


# ─── Flashcard generation ─────────────────────────────────────────────────────

FLASHCARD_SYSTEM = """You are an expert HSG exam tutor. You create precise, exam-focused flashcards.
Output ONLY valid JavaScript card objects — no outer array, no variable declaration, no markdown fences."""

def generate_flashcards(client: anthropic.Anthropic, course: dict, module: dict) -> str | None:
    content = read_module_content(module)
    if not content.strip():
        print("  No content — skip flashcards")
        return None

    prefix   = f"{course['flashcard_prefix']}-{module['id']}"
    count    = module.get("flashcard_count", 20)
    exam_fmt = course.get("exam_format", "30 MC-Fragen (Single + Multiple Choice)")

    prompt = f"""Create {count} exam-focused flashcards for HSG course "{course['display_name']}".

Module: {module['name']}
Key topics: {', '.join(module.get('topics', []))}
Exam format: {exam_fmt}
Card ID prefix: {prefix} → IDs: {prefix}-01 … {prefix}-{count:02d}

MODULE CONTENT:
{content}

RULES:
• Format: JavaScript object literals, section comment first
• Types: "qa" (Q&A), "cloze" (fill-blank with {{{{answer}}}}), "why" (explain why)
• difficulty: 1=recall, 2=understanding, 3=application
• back must include MERKE: (key insight) and FALLSTRICK: (common wrong answer) where relevant
• Use abstract/new examples — not verbatim exam questions — so patterns transfer
• Coverage: proportional across all listed topics
• Include 2–3 "prüfungstyp" cards that simulate the actual exam question style
• Last card has NO trailing comma

START with:
// ── {module['name']} ────────────────────────────────────���─────
{{"id":"{prefix}-01", ...}},
"""

    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=8000,
        system=FLASHCARD_SYSTEM,
        messages=[{"role": "user", "content": prompt}]
    )
    return resp.content[0].text.strip()


# ─── Reel script generation ───────────────────────────────────────────────────

REEL_SYSTEM = """You are an expert at creating TikTok-style educational video scripts for HSG students.
Output ONLY a complete, runnable Python script — no explanation, no markdown fences."""

def generate_reel_script(client: anthropic.Anthropic, course: dict, module: dict) -> str | None:
    content = read_module_content(module, max_chars=5000)
    if not content.strip():
        print("  No content — skip reels")
        return None

    count     = module.get("reel_count", 3)
    id_start  = module.get("reel_id_start", 100)
    cid       = course["id"]
    color     = course.get("course_color", "#7c3aed")

    # Build ID range examples
    ids = [f"{cid}-sv-{id_start + i:02d}" for i in range(count)]
    fns = [f"{cid}_{id_start + i:02d}_{module['id']}_topic.mp4" for i in range(count)]

    prompt = f"""Create {count} TikTok-style educational reels for HSG "{course['display_name']}".

Module: {module['name']}
Topics: {', '.join(module.get('topics', []))}
Reel IDs: {', '.join(ids)}
Filenames (replace 'topic' with descriptive snake_case): like {fns[0]}, {fns[1]}...

MODULE CONTENT:
{content}

Write a COMPLETE, RUNNABLE Python script with this exact structure:

#!/usr/bin/env python3
\"\"\"Reels: {course['display_name']} — {module['name']}\"\"\"
import sys, asyncio
sys.path.insert(0, '/home/raphael/ESF_Reels')
from pathlib import Path
from gen_reels_v2 import (
    render_reel, CYAN, PINK, YELL, GREEN, RED, PURPLE, ORANGE, GRAY, WHITE,
    make_compare_svg, make_process_svg, make_ab_test_svg
)

OUT_DIR = Path("/home/raphael/ESF_Reels/output_v2")

REELS = [
    {{
        "id": "...",
        "filename": "...",
        "title": "...",
        "subtitle": "...",
        "description": "...",
        "topics": [...],
        "block": "{module['name']}",
        "brand": "{course['display_name']} · HSG · Topic",
        "scenes": [
            dict(
                tts="German TTS text 15-25 words",
                tag=None,  # or "HOOK"/"DEFINITION"/"SCHRITT 1"/"WICHTIG"/"MERKE"/"FALLSTRICK"
                main=["SHORT", "LINES"],  # 2-3 words max per line, shown HUGE
                sub="subtitle line",
                accent=CYAN,  # CYAN/PINK/YELL/GREEN/RED/PURPLE/ORANGE
                style="hook",
                step_n=None, total_steps=None,
                svg=None,  # or make_compare_svg(...) / make_process_svg(...) / make_ab_test_svg(...)
            ),
            # ... 5-7 scenes: Hook → Definition → Example/SVG → Key insight → Merke
        ]
    }},
]

async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for reel in REELS:
        await render_reel(reel, OUT_DIR)
    print("Done: {module['name']} reels")

if __name__ == "__main__":
    asyncio.run(main())

KEY RULES:
• TTS: natural conversational German, 15-25 words per scene
• main[]: displayed HUGE — max 2-3 words per element
• Use make_compare_svg for comparisons, make_process_svg for steps, make_ab_test_svg for A/B
• Each reel 5-7 scenes following Hook→Def→Example→Key→Merke pattern
• Pick exam-critical topics (formulae, definitions, common traps)
"""

    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=8000,
        system=REEL_SYSTEM,
        messages=[{"role": "user", "content": prompt}]
    )
    text = resp.content[0].text.strip()
    # Strip markdown fences if model added them
    if text.startswith("```"):
        lines = text.split("\n")
        start = 1 if lines[0].startswith("```") else 0
        end   = next((i for i in range(len(lines)-1, 0, -1) if lines[i].strip() == "```"), len(lines))
        text  = "\n".join(lines[start:end]).strip()
    return text


# ─── Flashcard insertion ──────────────────────────────────────────────────────

def insert_flashcards_into_file(course: dict, module: dict, fc_content: str) -> bool:
    fp = Path(course["flashcard_data_path"])
    content = fp.read_text(encoding="utf-8")

    prefix = f"{course['flashcard_prefix']}-{module['id']}"
    if f'"id":"{prefix}-01"' in content:
        print(f"  Already exists: {prefix} — skip insert")
        return False

    marker = course.get("flashcard_insert_before", "// OM (OPERATIONS MANAGEMENT)")
    idx = content.find(marker)
    if idx < 0:
        idx = content.rfind("];")  # fallback: before closing bracket
    if idx < 0:
        print("  ERROR: could not find insertion point")
        return False

    new_content = content[:idx] + fc_content.strip() + "\n\n" + content[idx:]
    fp.write_text(new_content, encoding="utf-8")

    ids = re.findall(rf'"id":"{re.escape(prefix)}-\d+"', new_content)
    print(f"  Inserted {len(ids)} cards ({prefix})")
    return True


# ─── Reel script output ───────────────────────────────────────────────────────

def write_reel_script(course: dict, module: dict, script_text: str) -> Path:
    out_dir = Path(course.get("reel_scripts_dir", str(REEL_CORE)))
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"gen_{course['id']}_{module['id']}_reels.py"
    path.write_text(script_text, encoding="utf-8")
    # Quick syntax check
    try:
        ast.parse(script_text)
        print(f"  Script written + syntax OK: {path.name}")
    except SyntaxError as e:
        print(f"  WARNING: syntax error in script: {e}")
    return path


# ─── Rendering ───────────────────────────────────────────────────────────────

def render_reels(script_path: Path):
    print(f"  Rendering: {script_path.name}")
    subprocess.run(["python3", str(script_path)], check=True)


# ─── Deploy: upload + feed-data.js + git ─────────────────────────────────────

def deploy_reels(course: dict, rendered_scripts: list[Path]):
    deploy_script = TOOLS_DIR.parent / "reels" / f"{course['id']}_deploy.py"
    if deploy_script.exists():
        print(f"  Running deploy: {deploy_script.name}")
        subprocess.run(["python3", str(deploy_script)], check=True)
    else:
        print(f"  No deploy script found at {deploy_script} — skipping upload")
        print("  Videos rendered to output_v2/. Upload manually or write a deploy script.")


# ─── Git commit ───────────────────────────────────────────────────────────────

def git_commit(course: dict, message: str | None = None):
    repo = str(REPO_DIR)
    subprocess.run(["git", "-C", repo, "add", "data/flashcard-data.js"], check=True)
    msg = message or f"feat(cards): add {course['display_name']} flashcards — pipeline generated"
    result = subprocess.run(["git", "-C", repo, "commit", "-m", msg])
    if result.returncode == 0:
        subprocess.run(["git", "-C", repo, "push"], check=True)
        print("  Committed + pushed")
    else:
        print("  Nothing to commit")


# ─── Main pipeline ────────────────────────────────────────────────────────────

def run_pipeline(course_id: str, steps: list[str], module_filter: str | None = None):
    course  = load_course(course_id)
    client  = anthropic.Anthropic()
    modules = course["modules"]

    if module_filter:
        modules = [m for m in modules if m["id"] == module_filter]
        if not modules:
            sys.exit(f"ERROR: Module '{module_filter}' not found in {course_id}")

    do_fc     = "all" in steps or "flashcards" in steps
    do_reels  = "all" in steps or "reels" in steps
    do_render = "all" in steps or "render" in steps
    do_deploy = "all" in steps or "deploy" in steps
    do_commit = "all" in steps or "commit" in steps

    print(f"\n{'═'*55}")
    print(f"  Course Pipeline: {course['display_name']}")
    print(f"  Modules: {len(modules)}  |  Steps: {', '.join(steps)}")
    print(f"{'═'*55}")

    rendered_scripts: list[Path] = []

    for i, module in enumerate(modules, 1):
        print(f"\n[{i}/{len(modules)}] {module['name']}")

        if do_fc:
            print("  → Generating flashcards...")
            fc = generate_flashcards(client, course, module)
            if fc:
                insert_flashcards_into_file(course, module, fc)

        if do_reels:
            print("  → Generating reel script...")
            script = generate_reel_script(client, course, module)
            if script:
                path = write_reel_script(course, module, script)
                rendered_scripts.append(path)

        if do_render and rendered_scripts:
            render_reels(rendered_scripts[-1])

    if do_commit:
        git_commit(course)

    if do_deploy and rendered_scripts:
        deploy_reels(course, rendered_scripts)

    print(f"\n✓ Pipeline done for {course['display_name']}")
    print(f"  Flashcards: {'generated' if do_fc else 'skipped'}")
    print(f"  Reel scripts: {len(rendered_scripts) if do_reels else 'skipped'}")
    print(f"  Rendered: {'yes' if do_render else 'no'}")


# ─── Entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    p = argparse.ArgumentParser(description="K-Learning Course Content Pipeline")
    p.add_argument("--course", required=True,
                   help="Course ID matching courses/<id>.json (e.g. statistik, esf)")
    p.add_argument("--step",   default="all",
                   help="Steps (comma-separated): flashcards|reels|render|deploy|commit|all")
    p.add_argument("--module", default=None,
                   help="Only run for one module (e.g. m03)")
    args = p.parse_args()

    steps = [s.strip() for s in args.step.split(",")]
    run_pipeline(args.course, steps, args.module)
