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
      * Must be simple, replayable, and fun (like Flappy Bird, Snake, Pong).
      * Must have clear objectives (e.g. score points, reach a goal).
      * Must have loss conditions (e.g. game over).
      * Should be endless or restartable.
      * Prefer Pygame.
    - If it's a PROGRAM:
      * Must perform a clear, useful task (e.g. bracket generator, password tool).
      * Must run to completion with correct, visible output.
      * Prefer Python stdlib or Tkinter if GUI is needed.
    - If it's a WEB APP:
      * Must output static files (index.html, style.css, script.js).
      * Must be runnable locally by opening index.html in a browser.
    - Do NOT create vague demos or incomplete apps.
    - Keep the plan achievable in under ~200 lines of code.
    - Do not include anything outside the JSON.
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
