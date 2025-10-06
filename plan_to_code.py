import os
import subprocess
import tempfile
import re
import shutil
from typing import Tuple
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

BASE_TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "base")

# --- Helpers ---
def clean_code_output(raw: str) -> str:
    """Strips Markdown fences and explanation text from Gemini output."""
    code = raw.strip()
    if "```" in code:
        parts = code.split("```")
        for part in parts:
            if part.strip().startswith("python"):
                return part.strip()[len("python"):].strip()
            elif not part.strip().startswith("json"):
                return part.strip()
    return code

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
    """Guess project type from code/plan."""
    if "<html" in code.lower() or "javascript" in code.lower() or any("html" in d.lower() for d in plan.get("dependencies", [])):
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
        Based on this structured JSON plan:

        {plan}

        Write a complete MVP implementation.

        Rules:
        - If it's a GAME (Pygame or Tkinter):
        * Must be playable with clear objectives and game-over conditions.
        * Must include scoring and display the current score.
        * Must track and display a high score (stored in memory across runs).
        * Must gradually increase difficulty over time (e.g., faster enemies, smaller gaps, faster speed).
        * Must be restartable/replayable without closing the program.
        * Must include basic controls instructions (printed in console or shown on screen).
        - If it's a PROGRAM:
        * Must perform its task correctly, with visible output.
        - If it's a WEB APP:
        * Output all three files in this format:
            ---index.html---
            [HTML injected inside <div id="app"> only]
            ---style.css---
            [new CSS rules appended to base]
            ---script.js---
            [JavaScript inside initApp()]
        * Use the existing template files; do not recreate <html>, <head>, <body>, or <script>.
        * Keep code self-contained, under ~200 lines total.
        * Ensure zero console errors when opened locally.

        Now write the full, runnable code output in the specified format only.
        Do not include explanations or markdown outside the file delimiters.
        """

        if error_message:
            prompt += f"\nAlso, fix this error:\n{error_message}\n"

        # --- Call Gemini ---
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        raw_code = getattr(response, "text", None)
        if not raw_code and hasattr(response, "candidates"):
            raw_code = response.candidates[0].content.parts[0].text
        if not raw_code:
            return None

        code = clean_code_output(raw_code)
        project_type = detect_project_type(code, plan)

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

            return code

        # --- Web apps ---
        elif project_type == "web":
            # Basic validator: ensure no HTML/CSS leaked into script.js
            if "<html" in code.lower() or "<body" in code.lower() or "<style" in code.lower():
                with open(os.path.join("warnings.log"), "a", encoding="utf-8") as f:
                    f.write("⚠️ Gemini output for script.js contained HTML/CSS fragments.\n")
            return code

    return None

def save_code(project_dir: str, code: str, plan: dict):
    """
    Save generated code based on project type.
    Uses base template for web apps and injects cleanly.
    """
    project_type = detect_project_type(code, plan)

    if project_type == "web":
        # Copy base template first
        copy_base_template(project_dir)

        html_content, css_content, js_content = "", "", ""

        # Extract HTML <body> content
        html_match = re.search(r"<body.*?>(.*?)</body>", code, re.DOTALL | re.IGNORECASE)
        if html_match:
            html_content = html_match.group(1).strip()

        # Extract CSS
        css_blocks = re.findall(r"<style.*?>(.*?)</style>", code, re.DOTALL | re.IGNORECASE)
        css_content = "\n".join(css_blocks).strip()

        # Extract JS
        js_blocks = re.findall(r"<script.*?>(.*?)</script>", code, re.DOTALL | re.IGNORECASE)
        js_content = "\n".join(js_blocks).strip()

        # --- Inject HTML ---
        if html_content:
            index_path = os.path.join(project_dir, "index.html")
            with open(index_path, "r+", encoding="utf-8") as f:
                html = f.read()
                html = html.replace(
                    "<!-- Gemini will inject here -->",
                    html_content + "\n<!-- Gemini will inject here -->"
                )
                f.seek(0); f.write(html); f.truncate()

        # --- Append CSS ---
        if css_content:
            with open(os.path.join(project_dir, "style.css"), "a", encoding="utf-8") as f:
                f.write("\n/* Gemini Generated */\n")
                f.write(css_content)

        # --- Append JS ---
        if js_content:
            with open(os.path.join(project_dir, "script.js"), "a", encoding="utf-8") as f:
                f.write("\n// Gemini Generated\n")
                f.write(js_content)

        # --- Validation: log warnings if leakage ---
        warnings = []
        if "<html" in js_content.lower() or "<body" in js_content.lower():
            warnings.append("⚠️ HTML leaked into script.js")
        if "<style" in js_content.lower():
            warnings.append("⚠️ CSS leaked into script.js")

        if warnings:
            with open(os.path.join(project_dir, "warnings.txt"), "w", encoding="utf-8") as f:
                f.write("\n".join(warnings))

    else:
        # Python project
        with open(os.path.join(project_dir, "main.py"), "w", encoding="utf-8") as f:
            f.write(code)
