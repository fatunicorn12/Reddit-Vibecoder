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

BASE_TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "base_flexible")

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
    # Verify BASE_TEMPLATE_DIR exists
    if not os.path.exists(BASE_TEMPLATE_DIR):
        raise FileNotFoundError(
            f"Base template directory not found: {BASE_TEMPLATE_DIR}\n"
            f"Please create the 'base_flexible/' directory with template files.\n"
            f"See QUICK_DEPLOY_TEMPLATE.md for instructions."
        )
    
    for filename in ["index.html", "style.css", "script.js"]:
        src = os.path.join(BASE_TEMPLATE_DIR, filename)
        dst = os.path.join(project_dir, filename)
        
        if not os.path.exists(src):
            raise FileNotFoundError(
                f"Template file not found: {src}\n"
                f"Please ensure {filename} exists in the base_flexible/ directory."
            )
        
        shutil.copy(src, dst)
        print(f"✅ Copied template: {filename}")

# --- Core ---
def generate_code_from_plan(plan: dict, max_retries: int = 2) -> str:
    """Generate code from a plan, retrying if compile/runtime fails (Python only)."""
    attempt = 0
    error_message = None

    while attempt <= max_retries:
        attempt += 1

        # Extract ui_polish if it exists in the plan
        ui_polish_section = ""
        if "ui_polish" in plan and plan["ui_polish"]:
            ui_polish_section = f"""
UI POLISH REQUIREMENTS (MUST IMPLEMENT):
{chr(10).join(f"- {polish}" for polish in plan["ui_polish"])}
"""

        prompt = f"""
You are an expert software engineer generating complete, working, POLISHED code from a structured JSON plan.
The plan describes what to build. Implement it fully so the result runs locally without modification AND looks impressive.

Plan:
{plan}

{ui_polish_section}

Follow these rules for all project types:

GAME (Pygame or Tkinter):
- The game MUST be procedural and endlessly replayable (no static or choice-based story games).
- The game MUST include a continuous main loop with clear objectives and win/loss conditions.
- The game MUST have visible scoring, a persistent high score (stored in localStorage for web or file for Python), and clear on-screen feedback.
- The game MUST increase difficulty over time (e.g., faster speed, more enemies, smaller gaps, tighter timing).
- The game MUST have a main menu screen that appears on load (with options like Start, Instructions, High Scores).
- The game MUST include a "Return to Main Menu" button that is ALWAYS accessible during gameplay and on game-over screen.
- The game MUST be restartable without closing the program with smooth transitions.
- Prefer Web-based (HTML/JS) unless the concept clearly requires Pygame (physics, complex 2D graphics).
- IMPLEMENT ALL FEATURES from the plan - don't skip any.
- ADD VISUAL POLISH: smooth animations, particle effects, color transitions, visual feedback for all events.
- Always include control instructions displayed prominently.
- Make it feel COMPLETE and FUN, not like a tech demo.

PROGRAM (CLI or script):
- Must perform its task correctly with visible, correct output.
- Implement proper error handling and input validation.
- Prefer Python standard library or Tkinter if GUI is needed.

WEB APP (HTML/CSS/JS) - PREFERRED:
- Output exactly three files in this format:
  ---index.html---
  [HTML content to inject inside <div id="app"> - NO outer <div id="app"> tag, just the inner content]
  ---style.css---
  [New CSS rules to append to base stylesheet]
  ---script.js---
  [JavaScript code - ONLY the function body, NOT the function declaration]

- TEMPLATE STRUCTURE YOU'RE WORKING WITH:
  * The base template already has: <html>, <head>, <body>, <header>, <footer>, <div id="app">, and <script src="script.js">
  * The script.js file already has: document.addEventListener("DOMContentLoaded", ...) and an empty function initApp() {{ }}
  * Your HTML goes INSIDE the existing <div id="app">
  * Your CSS gets APPENDED to the existing stylesheet
  * Your JavaScript goes INSIDE the existing initApp() function

- CRITICAL JAVASCRIPT RULES (READ CAREFULLY):
  ⚠️ DO NOT write "function initApp() {{" - this already exists in the template!
  ⚠️ DO NOT write any code outside the initApp function scope!
  âœ… ONLY write the code that goes INSIDE the initApp() function body
  âœ… Start your JS directly with variable declarations and function definitions
  
  Example of CORRECT script.js output:
  ---script.js---
  // Your variables and functions here (they'll be scoped inside initApp)
  const myData = [...];
  let currentState = 'initial';
  
  function handleClick() {{
    // ...
  }}
  
  // Your initialization code
  const button = document.getElementById('myButton');
  button.addEventListener('click', handleClick);
  
  Example of INCORRECT script.js output (DON'T DO THIS):
  ---script.js---
  function initApp() {{  // ❌ WRONG - function already exists!
    const myData = [...];
    // ...
  }}

- CRITICAL HTML RULES:
  ⚠️ DO NOT include <div id="app"> in your HTML output - this already exists!
  ⚠️ DO NOT include <html>, <head>, <body>, <header>, <footer>, or <script> tags!
  âœ… ONLY write the content that goes INSIDE the existing <div id="app">
  
  Example of CORRECT index.html output:
  ---index.html---
  <div class="game-container">
    <canvas id="gameCanvas"></canvas>
    <button id="startBtn">Start Game</button>
  </div>
  
  Example of INCORRECT index.html output (DON'T DO THIS):
  ---index.html---
  <div id="app">  // ❌ WRONG - this tag already exists!
    <div class="game-container">
      ...
    </div>
  </div>

- OTHER CRITICAL RULES:
  * Query DOM elements safely (check if they exist before use)
  * Use localStorage for data persistence (high scores, user data, preferences)
  * No external libraries or APIs
  * Ensure zero console errors

- LAYOUT STABILITY RULES (prevent layout shift - critical for UX):
  * Reserve space with min-height for content that loads dynamically
  * Use CSS transforms for animations - NEVER change width/height/padding
  * Modals and overlays MUST use position: fixed
  * Buttons should use transform for hover effects, NOT size changes

- POLISH REQUIREMENTS:
  * IMPLEMENT ALL FEATURES and ALL UI POLISH from the plan
  * Every button click, input change, and interaction must have visual feedback
  * Add success/error states, loading animations, smooth transitions
  * Make it feel COMPLETE and PROFESSIONAL

CRITICAL IMPLEMENTATION RULES:
- Implement EVERY feature listed in the plan's "features" array - do not skip any.
- Implement EVERY polish item listed in the plan's "ui_polish" array.
- Follow ALL steps in the plan's "steps" array carefully.
- If a feature seems complex, implement a simplified but working version - never skip it entirely.
- Test edge cases and add appropriate error handling.
- Make the UI intuitive - users shouldn't need documentation to understand how to use it.

If any ambiguity arises, assume the most polished, complete, and impressive implementation.
Now output ONLY the code in the specified format, with no commentary or markdown outside the file delimiters.

"""
        prompt = textwrap.dedent(prompt).strip()

        if error_message:
            prompt += f"\n\nPREVIOUS ATTEMPT FAILED - FIX THIS ERROR:\n{error_message}\n\nRegenerate the complete code with this error fixed.\n"

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
    Uses flexible base template for web apps and injects project metadata.
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

        # Inject HTML content into #app div
        if html_content:
            index_path = os.path.join(project_dir, "index.html")
            with open(index_path, "r+", encoding="utf-8") as f:
                html = f.read()
                
                # Check if Claude mistakenly included <div id="app"> wrapper
                if '<div id="app">' in html_content:
                    print("⚠️ WARNING: Claude included <div id='app'> wrapper. Removing it...")
                    # Remove outer <div id="app">...</div> wrapper
                    html_content = re.sub(r'^\s*<div id="app">\s*', '', html_content)
                    html_content = re.sub(r'\s*</div>\s*$', '', html_content)
                
                # Replace placeholder comment (not append!)
                if "<!-- Claude will inject here -->" in html:
                    html = html.replace(
                        "<!-- Claude will inject here -->",
                        html_content
                    )
                else:
                    print("⚠️ WARNING: Placeholder comment not found in template!")
                
                # Inject project metadata
                project_name = plan.get("title", "")
                if not project_name:
                    project_name = plan.get("description", "Generated Project")
                    if "." in project_name:
                        project_name = project_name.split(".")[0]
                    project_name = project_name[:50] + ("..." if len(project_name) > 50 else "")
                
                project_desc = plan.get("description", "")
                if len(project_desc) > 120:
                    project_desc = project_desc[:120] + "..."
                
                html = html.replace("{{PROJECT_NAME}}", project_name)
                html = html.replace("{{PROJECT_DESCRIPTION}}", project_desc)
                
                f.seek(0)
                f.write(html)
                f.truncate()
            
            print("✅ HTML injected successfully")

        # Append CSS content
        if css_content:
            with open(os.path.join(project_dir, "style.css"), "a", encoding="utf-8") as f:
                f.write("\n\n/* ===== CLAUDE GENERATED STYLES ===== */\n")
                f.write(css_content)
            print("✅ CSS appended successfully")

        # Inject JS content into initApp function body
        if js_content:
            script_path = os.path.join(project_dir, "script.js")
            with open(script_path, "r", encoding="utf-8") as f:
                base_js = f.read()
            
            # Clean the JS content
            js_clean = js_content.strip()
            
            # Check if Claude mistakenly generated function wrapper
            if "function initApp" in js_clean:
                print("⚠️ WARNING: Claude generated function wrapper despite instructions!")
                # Try to extract just the body
                match = re.search(r'function\s+initApp\s*\([^)]*\)\s*\{(.*)\}', js_clean, re.DOTALL)
                if match:
                    js_clean = match.group(1).strip()
                    print("✅ Extracted function body from wrapper")
                else:
                    print("⚠️ Could not extract function body cleanly")
            
            # Inject into placeholder function
            # Pattern: function initApp() { // comment }
            pattern = r'(function\s+initApp\s*\(\s*\)\s*\{\s*)//[^\n]*\n\s*(\})'
            
            # Add proper indentation
            indented_js = '\n  '.join(js_clean.split('\n'))
            replacement = r'\1\n  ' + indented_js + r'\n\2'
            
            base_js_new = re.sub(pattern, replacement, base_js, flags=re.MULTILINE)
            
            # Verify replacement worked
            if base_js_new == base_js:
                print("❌ ERROR: JS injection failed!")
                # Debug: save what we tried to inject
                with open(os.path.join(project_dir, "injection_debug.txt"), "w", encoding="utf-8") as f:
                    f.write("INJECTION FAILED\n\n")
                    f.write("Pattern used:\n")
                    f.write(pattern + "\n\n")
                    f.write("Content to inject:\n")
                    f.write(js_clean[:1000] + "...\n\n")
                    f.write("Base JS (first 500 chars):\n")
                    f.write(base_js[:500])
                
                # Last resort: try broader pattern
                print("⚠️ Trying fallback injection method...")
                pattern2 = r'(function\s+initApp\s*\(\s*\)\s*\{)[^}]*(\})'
                replacement2 = r'\1\n  ' + indented_js + r'\n\2'
                base_js_new = re.sub(pattern2, replacement2, base_js, flags=re.DOTALL)
                
                if base_js_new == base_js:
                    print("❌ CRITICAL: All injection methods failed!")
                else:
                    print("✅ Fallback injection succeeded")
            else:
                print("✅ JavaScript injected successfully")
            
            with open(script_path, "w", encoding="utf-8") as f:
                f.write(base_js_new)

        # Log warnings
        warnings = []
        if js_content and ("<html" in js_content.lower() or "<body" in js_content.lower()):
            warnings.append("⚠️ HTML leaked into script.js")
        if js_content and "<style" in js_content.lower():
            warnings.append("⚠️ CSS leaked into script.js")
        if html_content and '<div id="app">' in html_content:
            warnings.append("⚠️ HTML contained duplicate <div id='app'> wrapper")
        if not any([html_content, css_content, js_content]):
            warnings.append("⚠️ No valid content parsed from Claude output")

        if warnings:
            with open(os.path.join(project_dir, "warnings.txt"), "w", encoding="utf-8") as f:
                f.write("\n".join(warnings))
            print("\n".join(warnings))

    else:
        # Python projects - save directly
        with open(os.path.join(project_dir, "main.py"), "w", encoding="utf-8") as f:
            f.write(code)
        print("✅ Python project saved")