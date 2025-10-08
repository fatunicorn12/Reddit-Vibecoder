"""
auto_screenshot.py
Automatically runs generated projects (Python or Web), takes screenshots,
and embeds them into each project's README.md.
"""

import chromedriver_autoinstaller
chromedriver_autoinstaller.install()
import os
import time
import subprocess
import pyautogui
from PIL import Image
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import pygetwindow as gw


# --- Detect project type ---
def detect_project_type(code: str, plan: dict = None) -> str:
    code_lower = code.lower()
    if any(k in code_lower for k in ["---index.html---", "<html", "javascript", "document.getelementbyid"]):
        return "web"
    return "python"


# --- Helpers ---
def get_project_code_snippet(project_path: str) -> str:
    if os.path.exists(os.path.join(project_path, "index.html")):
        with open(os.path.join(project_path, "index.html"), "r", encoding="utf-8") as f:
            return f.read()
    elif any(f.endswith(".py") for f in os.listdir(project_path)):
        py_file = [f for f in os.listdir(project_path) if f.endswith(".py")][0]
        with open(os.path.join(project_path, py_file), "r", encoding="utf-8") as f:
            return f.read()
    return ""


def update_readme(project_path: str, screenshot_path: str):
    """Append or replace a '## Preview' section in the project's README.md."""
    readme_path = os.path.join(project_path, "README.md")
    rel_path = os.path.relpath(screenshot_path, project_path).replace("\\", "/")
    preview_section = f"\n## Preview\n![Screenshot]({rel_path})\n"

    if not os.path.exists(readme_path):
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(preview_section.strip() + "\n")
        print(f"📝 Created new README with preview: {readme_path}")
        return

    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "## Preview" in content:
        start = content.find("## Preview")
        end = content.find("\n## ", start + 1)
        if end == -1:
            updated = content[:start] + preview_section
        else:
            updated = content[:start] + preview_section + content[end:]
    else:
        updated = content.strip() + "\n\n" + preview_section

    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"🖼️ Added preview to: {readme_path}")


# --- Capture Python window only ---
def capture_python_app(project_path: str, timeout: int = 6) -> str:
    py_files = [f for f in os.listdir(project_path) if f.endswith(".py")]
    if not py_files:
        raise FileNotFoundError("No Python file found.")
    main_file = os.path.join(project_path, py_files[0])
    os.makedirs("screenshots", exist_ok=True)
    screenshot_path = os.path.join("screenshots", f"{os.path.basename(project_path)}.png")

    print(f"🧩 Running Python project: {main_file}")
    proc = subprocess.Popen(["python", main_file])
    time.sleep(timeout)

    try:
        windows = gw.getWindowsWithTitle("")
        # pick the most recently opened visible window
        visible_windows = [w for w in windows if w.isVisible]
        if visible_windows:
            target = visible_windows[-1]
            box = (target.left, target.top, target.right, target.bottom)
            full_shot = pyautogui.screenshot()
            cropped = full_shot.crop(box)
            cropped.save(screenshot_path)
            print(f"📸 Cropped to active window: {target.title}")
        else:
            raise Exception("No visible window found.")
    except Exception as e:
        print(f"⚠️ Could not locate window ({e}); capturing full screen instead.")
        pyautogui.screenshot(screenshot_path)

    proc.terminate()
    time.sleep(0.5)

    # resize to consistent dimensions
    img = Image.open(screenshot_path)
    img.thumbnail((800, 600))
    img.save(screenshot_path)

    print(f"✅ Screenshot saved: {screenshot_path}")
    return screenshot_path


# --- Capture HTML full page ---
def capture_html_app(project_path: str) -> str:
    index_path = os.path.join(project_path, "index.html")
    if not os.path.exists(index_path):
        raise FileNotFoundError("No index.html found.")
    os.makedirs("screenshots", exist_ok=True)
    screenshot_path = os.path.join("screenshots", f"{os.path.basename(project_path)}.png")

    print(f"🌐 Rendering HTML project: {index_path}")
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--hide-scrollbars")
    chrome_options.add_argument("--window-size=1280,720")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(f"file://{os.path.abspath(index_path)}")

    time.sleep(2)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(0.5)

    # dynamically fit height
    page_height = driver.execute_script("return document.body.scrollHeight")
    driver.set_window_size(1280, page_height)
    driver.save_screenshot(screenshot_path)
    driver.quit()

    # resize for uniformity
    img = Image.open(screenshot_path)
    img.thumbnail((800, 600))
    img.save(screenshot_path)

    print(f"✅ Screenshot saved: {screenshot_path}")
    return screenshot_path


# --- Core dispatcher ---
def capture_project(project_path: str):
    print(f"\n📁 Processing project: {project_path}")
    code = get_project_code_snippet(project_path)
    project_type = detect_project_type(code)

    if project_type == "python":
        screenshot = capture_python_app(project_path)
    elif project_type == "web":
        screenshot = capture_html_app(project_path)
    else:
        print("⚠️ Unknown project type; skipping.")
        return None

    update_readme(project_path, screenshot)
    return screenshot


# --- Runner ---
def main():
    base_path = os.path.join("projects", "generated_projects")
    if not os.path.exists(base_path):
        print("❌ No /projects folder found.")
        return

    projects = [os.path.join(base_path, d)
                for d in os.listdir(base_path)
                if os.path.isdir(os.path.join(base_path, d))]
    if not projects:
        print("⚠️ No projects found.")
        return

    print(f"🔍 Found {len(projects)} projects. Capturing screenshots...\n")
    success, fail = 0, 0
    for project in projects:
        try:
            capture_project(project)
            success += 1
        except Exception as e:
            print(f"❌ Error processing {project}: {e}")
            fail += 1

    print(f"\n✅ Done! {success} succeeded, {fail} failed.")


def auto_screenshot_project(project_path: str):
    """Run auto-screenshot on a single generated project folder."""
    code = get_project_code_snippet(project_path)
    project_type = detect_project_type(code)

    if project_type == "web":
        screenshot = capture_html_app(project_path)
    else:
        screenshot = capture_python_app(project_path)

    update_readme(project_path, screenshot)
    return screenshot


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python auto_screenshot.py <project_path>")
    else:
        auto_screenshot_project(sys.argv[1])
