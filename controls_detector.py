import os
from google import genai

# Initialize Gemini client once
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def detect_controls_inputs(project_dir: str, project_type: str) -> str:
    """
    Uses Gemini to analyze the generated code (Python or JS) and extract
    any keyboard, mouse, or UI controls in Markdown bullet format.
    """
    try:
        # Pick correct file to read
        file_path = (
            os.path.join(project_dir, "main.py")
            if project_type == "python"
            else os.path.join(project_dir, "script.js")
        )

        if not os.path.exists(file_path):
            return "(No specific inputs detected. Likely mouse or keyboard interactions.)"

        # Read the code
        with open(file_path, "r", encoding="utf-8") as f:
            code = f.read()

        # Build Gemini prompt
        prompt = f"""
You are analyzing source code to document its user controls.

Code: {code[:12000]} # truncate long code for safety


Task:
List all user input mechanisms (keyboard keys, mouse clicks, buttons, input fields, etc.) used in this program.
Format your response as Markdown bullet points.
If no explicit inputs are found, respond with:
(No specific inputs detected. Likely mouse or keyboard interactions.)
"""

        # Call Gemini
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        raw_text = getattr(response, "text", None)
        if not raw_text and hasattr(response, "candidates"):
            raw_text = response.candidates[0].content.parts[0].text

        if not raw_text or not raw_text.strip():
            return "(No specific inputs detected. Likely mouse or keyboard interactions.)"

        return raw_text.strip()

    except Exception as e:
        print(f"⚠️ Failed to detect controls: {e}")
        return "(No specific inputs detected. Likely mouse or keyboard interactions.)"
