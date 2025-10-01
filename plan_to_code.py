import os
import subprocess
import tempfile
import re
from typing import Tuple
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

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
        - If it's a GAME:
        * Must be playable with objectives and game-over conditions.
        * Must include scoring or progress tracking.
        * Must be restartable/replayable.
        - If it's a PROGRAM:
        * Must perform its task correctly, with visible output.
        - If it's a WEB APP:
        * Must produce index.html, style.css, and script.js.
        * Must include sample data inline (e.g., if commentsData is used, define it in script.js).
        * Must include at least basic styling: centered layout, padding/margin, hover effects, readable font.
        * Must be static and runnable locally.
        - Use only the listed dependencies.
        - Include all necessary imports (or script tags).
        - Do not leave undefined variables or functions.
        - Do not include Markdown fences (```).
        - Do not include explanation text before or after the code.
        """

        if error_message:
            prompt += f"\nAlso, fix this Python error:\n{error_message}\n"

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

        if project_type == "python":
            # Step 1: Syntax check
            success, err = compile_check(code)
            if not success:
                print(f"❌ Compile failed (attempt {attempt}): {err}")
                error_message = err
                continue

            # Step 2: Runtime check
            success, err = runtime_check(code)
            if not success:
                print(f"❌ Runtime failed (attempt {attempt}): {err}")
                error_message = err
                continue

        # If it's web, skip compile/runtime checks
        return code

    return None

def save_code(project_dir: str, code: str, plan: dict):
    """
    Save generated code based on project type.
    - If it's a web app: split into index.html, style.css, script.js.
    - Otherwise: save as main.py.
    """
    project_type = detect_project_type(code, plan)

    if project_type == "web":
        # Save HTML
        html_match = re.search(r"(<!DOCTYPE html>.*?</html>)", code, re.DOTALL | re.IGNORECASE)
        with open(os.path.join(project_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(html_match.group(1).strip() if html_match else code)

        # Save CSS
        css_match = re.search(r"([^{]+\{[^}]+\})", code, re.DOTALL)
        with open(os.path.join(project_dir, "style.css"), "w", encoding="utf-8") as f:
            f.write(css_match.group(0).strip() if css_match else "body { font-family: sans-serif; }")

        # Save JS
        js_match = re.search(r"(function\s.*|document\.|console\.log|window\.)", code, re.DOTALL)
        with open(os.path.join(project_dir, "script.js"), "w", encoding="utf-8") as f:
            f.write(code[code.find(js_match.group(0)):] if js_match else "console.log('Hello from script.js');")

    else:
        # Python project
        with open(os.path.join(project_dir, "main.py"), "w", encoding="utf-8") as f:
            f.write(code)
