import os
import subprocess
import tempfile
import re
import shutil
import textwrap
from typing import Tuple
from google import genai
from anthropic import Anthropic, APIError, RateLimitError
from dotenv import load_dotenv

# --- Load keys ---
load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
claude = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

BASE_TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "base")

# --- Helpers ---
def clean_code_output(raw: str) -> str:
    """Normalize Claude/Gemini output by removing markdown fences and trimming."""
    code = raw.strip()
    code = re.sub(r"^```[a-zA-Z0-9]*", "", code)
    code = re.sub(r"```$", "", code)
    return code.strip()

def compile_check(code: str) -> Tuple[bool, str]:
    """Check if code compiles (Python only)."""
    with tempfile.NamedTemporaryFile(suffix=".py", delete=False, mode="w", encoding="utf-8") as tmp:
        tmp.write(code)
        tmp_path = tmp.name
    try:
        subprocess.check_output(["python", "-m", "py_compile", tmp_path], stderr=subprocess.STDOUT)
        return True, ""
    except subprocess.CalledProcessError as e:
        return False, e.output.decode()
    finally:
        try: os.remove(tmp_path)
        except: pass

def runtime_check(code: str, timeout: int = 5) -> Tuple[bool, str]:
    """Run Python code in a subprocess to catch runtime errors."""
    with tempfile.NamedTemporaryFile(suffix=".py", delete=False, mode="w", encoding="utf-8") as tmp:
        tmp.write(code)
        tmp_path = tmp.name
    try:
        subprocess.check_output(["python", tmp_path], stderr=subprocess.STDOUT, timeout=timeout)
        return True, ""
    except subprocess.CalledProcessError as e:
        return False, e.output.decode()
    except subprocess.TimeoutExpired:
        return True, ""  # ran long enough
    finally:
        try: os.remove(tmp_path)
        except: pass

def detect_project_type(code: str, plan: dict) -> str:
    """Guess project type from code/plan content."""
    code_lower = code.lower()
    if any(k in code_lower for k in ["---index.html---", "<html", "javascript", "document.getelementbyid"]):
        return "web"
    return "python"

def copy_base_template(project_dir: str):
    """Copies base template files into the project directory."""
    for filename in ["index.html", "style.css", "script.js"]:
        src = os.path.join(BASE_TEMPLATE_DIR, filename)
        dst = os.path.join(project_dir, filename)
        if os.path.exists(src):
            shutil.copy(src, dst)

# --- Core ---
def generate_code_from_plan(plan: dict, max_retries: int = 2) -> str:
    """Generate code from a plan, retrying if compile/runtime fails (Python only)."""
    attempt = 0
    error_message = None

    while attempt <= max_retries:
        attempt += 1

        prompt = f"""
You are an expert software engineer generating complete, working code from a structured JSON plan.
The plan describes what to build. Implement it fully so the result runs locally without modification.

Plan:
{plan}

Follow these rules for all project types:

GAME (Pygame or Tkinter):
- The game MUST be procedural and endlessly replayable (no static or choice-based story games).
- The game MUST include a continuous main loop with clear objectives and win/loss conditions.
- The game MUST have visible scoring, a persistent high score (stored in memory across runs), and clear on-screen feedback.
- The game MUST increase difficulty over time (e.g., faster speed, more enemies, smaller gaps, tighter timing).
- The game MUST be restartable without closing the program.
- Prefer Pygame (or Tkinter if GUI-based) unless the concept clearly fits a browser-based game (e.g., clicker, idle, or simple arcade web game).
- Always include control instructions displayed in-game or in the console.
- Keep it fun and simple

PROGRAM (CLI or script):
- Must perform its task correctly with visible, correct output.
- Prefer Python standard library or Tkinter if GUI is needed.

WEB APP (HTML/CSS/JS):
- Output exactly three files in this format:
  ---index.html---
  [HTML injected inside <div id="app"> only]
  ---style.css---
  [New CSS rules appended to base]
  ---script.js---
  [JavaScript placed inside initApp()]
- The base project already includes index.html, style.css, and script.js.
- Do NOT recreate <html>, <head>, <body>, or <script> tags.
- All JS must remain inside initApp() with defined variables (const/let), no globals, and no embedded HTML/CSS.
- Query each DOM element once, verify it exists before use, and ensure zero console errors.
- No external libraries or APIs.

If any ambiguity arises, assume the most playable and self-contained implementation.
Now output ONLY the code in the specified format, with no commentary or markdown outside the file delimiters.

"""
        prompt = textwrap.dedent(prompt).strip()

        if error_message:
            prompt += f"\nAlso, fix this error and regenerate cleanly:\n{error_message}\n"

# --- Call Claude API (with streaming) ---
        try:
            raw_code = ""
            with claude.messages.stream(
                model="claude-sonnet-4-20250514",
                max_tokens=32000,
                temperature=0.7,
                messages=[{"role": "user", "content": prompt}]
            ) as stream:
                for text in stream.text_stream:
                    raw_code += text
                    # Optional: print progress indicator
                    # print(".", end="", flush=True)
            
            if not raw_code.strip():
                raise ValueError("Claude returned an empty response")

        except (APIError, RateLimitError, Exception) as e:
            print(f"❌ Claude API call failed (attempt {attempt}): {e}")
            error_message = str(e)
            continue

        # --- Clean and detect ---
        code = clean_code_output(raw_code)
        project_type = detect_project_type(code, plan)

        if not code.strip():
            print(f"⚠️ Empty or invalid code output (attempt {attempt}). Retrying...")
            error_message = "Empty output or format mismatch."
            continue

        # --- Python projects ---
        if project_type == "python":
            success, err = compile_check(code)
            if not success:
                print(f"❌ Compile failed (attempt {attempt}): {err}")
                error_message = err
                continue
            success, err = runtime_check(code)
            if not success:
                print(f"❌ Runtime failed (attempt {attempt}): {err}")
                error_message = err
                continue
            print("✅ Python project generated successfully.")
            return code

        # --- Web apps ---
        elif project_type == "web":
            if "---index.html---" not in code or "---script.js---" not in code:
                print(f"⚠️ Missing required file delimiters (attempt {attempt}). Retrying...")
                error_message = "Missing file delimiters in web app output."
                continue

            if "<html" in code.lower() or "<body" in code.lower() or "<style" in code.lower():
                with open("warnings.log", "a", encoding="utf-8") as f:
                    f.write("⚠️ Claude output for script.js contained HTML/CSS fragments.\n")
            print("✅ Web app project generated successfully.")
            return code

    print("❌ Failed to generate valid code after retries.")
    return None

def save_code(project_dir: str, code: str, plan: dict):
    """
    Save generated code based on project type.
    Uses base template for web apps and injects cleanly.
    Supports Claude output format with ---index.html---, ---style.css---, and ---script.js--- sections.
    """
    project_type = detect_project_type(code, plan)

    # Always log raw output for debugging
    with open(os.path.join(project_dir, "claude_raw_output.txt"), "w", encoding="utf-8") as f:
        f.write(code)

    if project_type == "web":
        copy_base_template(project_dir)
        sections = re.split(r"---(index\.html|style\.css|script\.js)---", code)
        html_content = css_content = js_content = ""

        for i in range(1, len(sections), 2):
            filename = sections[i].strip().lower()
            content = sections[i + 1].strip()
            if filename == "index.html":
                html_content = content
            elif filename == "style.css":
                css_content = content
            elif filename == "script.js":
                js_content = content

        if html_content:
            index_path = os.path.join(project_dir, "index.html")
            with open(index_path, "r+", encoding="utf-8") as f:
                html = f.read().replace(
                    "<!-- Gemini will inject here -->",
                    html_content + "\n<!-- Gemini will inject here -->"
                )
                f.seek(0); f.write(html); f.truncate()

        if css_content:
            with open(os.path.join(project_dir, "style.css"), "a", encoding="utf-8") as f:
                f.write("\n/* Claude Generated */\n" + css_content)

        if js_content:
            with open(os.path.join(project_dir, "script.js"), "a", encoding="utf-8") as f:
                f.write("\n// Claude Generated\n" + js_content)

        warnings = []
        if "<html" in js_content.lower() or "<body" in js_content.lower():
            warnings.append("⚠️ HTML leaked into script.js")
        if "<style" in js_content.lower():
            warnings.append("⚠️ CSS leaked into script.js")
        if not any([html_content, css_content, js_content]):
            warnings.append("⚠️ No valid content parsed from Claude output")

        if warnings:
            with open(os.path.join(project_dir, "warnings.txt"), "w", encoding="utf-8") as f:
                f.write("\n".join(warnings))

    else:
        with open(os.path.join(project_dir, "main.py"), "w", encoding="utf-8") as f:
            f.write(code)
