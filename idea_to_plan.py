import os
import json
import re
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def clean_json_response(raw_text: str) -> str:
    """
    Cleans Gemini's response so it's valid JSON:
    - Removes triple backtick code fences
    - Removes 'json' language hint
    - Strips whitespace
    """
    # Remove opening/closing code fences like ```json or ```
    cleaned = re.sub(r"^```(?:json)?", "", raw_text.strip(), flags=re.IGNORECASE | re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE)
    return cleaned.strip()

def generate_project_plan(idea: str):
    prompt = f"""
    Given this project idea: "{idea}"

    Create a structured MVP development plan.
    The plan must be in strict JSON format with these keys:

    {{
      "description": "short summary of the program",
      "features": ["list of core features"],
      "steps": ["step-by-step instructions to implement"],
      "dependencies": ["list of required libraries"]
    }}

  Rules:
  - If it's a GAME:
    * The game must be procedural and endlessly replayable (not story-driven or choice-based).
    * The game must have clear objectives, visible scoring, and a loss condition.
    * The game must increase difficulty as time or score progresses (e.g., speed, spawn rate, or challenge scaling).
    * The game must track and display both current score and a persistent high score within the same session.
    * The game must restart cleanly after a game-over.
    * Prefer Pygame for most games, or Tkinter if GUI-based.
    * Only use a Web-based implementation (HTML/JS) if the game concept *naturally fits* the browser (e.g., clicker, idle, or simple arcade games).
    * Avoid narrative text adventures, quizzes, or branching-choice games—focus on mechanical gameplay.
    * Keep the scope small, fun, and under ~200 lines of code.

  - If it's a PROGRAM:
    * Must perform a clear, useful, or interesting task (e.g., generator, calculator, analyzer, data visualizer).
    * Must execute fully and show visible, correct output.
    * Prefer Python standard library; use Tkinter only if a graphical interface improves clarity.

  - If it's a WEB APP:
    * Must output static files: index.html, style.css, script.js.
    * Must be runnable locally by opening index.html in a browser (no servers or frameworks).
    * Reserve this format for non-game interactive tools or when the concept explicitly requires a browser interface (e.g., dashboards, visualizers, simulators).

  - Always choose the *most natural medium* for the concept (Python vs. web).
  - Do NOT create vague demos or incomplete apps.
  - Keep all plans achievable in under ~200 lines of code.
  - Output structured JSON only—no explanations or commentary.


    """



    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    raw_text = response.text.strip()
    print("🔍 Raw response:\n", raw_text)

    # Clean fences before parsing
    cleaned_text = clean_json_response(raw_text)

    try:
        plan = json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse JSON:", e)
        return None

    return plan


if __name__ == "__main__":
    # Test with a sample idea
    test_idea = "Build a physics simulator where cats knock objects off tables."
    plan = generate_project_plan(test_idea)

    if plan:
        print("\n✅ Parsed JSON Plan:")
        print(json.dumps(plan, indent=2))
