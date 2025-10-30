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
    - Fixes common escape sequence issues
    - Strips whitespace
    """
    # Remove opening/closing code fences like ```json or ```
    cleaned = re.sub(r"^```(?:json)?", "", raw_text.strip(), flags=re.IGNORECASE | re.MULTILINE)
    cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE)
    
    # Fix common JSON issues that Gemini produces:
    # 1. Replace invalid escape sequences like \' with just '
    # This regex looks for \' that's not part of a valid escape sequence
    cleaned = re.sub(r"\\(')", r"\1", cleaned)
    
    # 2. Fix any remaining problematic escapes in strings
    # Replace \" inside already-quoted strings (keep track of quote context)
    # This is more conservative - just removes unnecessary backslashes before quotes
    
    return cleaned.strip()

def generate_project_plan(idea: str):
    prompt = f"""
    Given this project idea: "{idea}"

    Create a structured, AMBITIOUS MVP development plan that will result in an impressive, polished demo.
    The plan must be in strict JSON format with these keys:

    {{
      "title": "short, catchy project name (2-4 words, like 'Snake Challenge' or 'Calorie Tracker Pro')",
      "description": "short summary of the program",
      "features": ["list of 7-12 core features - be generous with feature count"],
      "ui_polish": ["list of 3-5 visual enhancements: animations, transitions, particle effects, visual feedback, color schemes, hover states, etc."],
      "steps": ["detailed step-by-step instructions to implement ALL features and polish"],
      "dependencies": ["list of required libraries"]
    }}

  Rules:
  - If it's a GAME:
    * The game must be procedural and endlessly replayable (not story-driven or choice-based).
    * The game must have clear objectives, visible scoring, and a loss condition.
    * The game must increase difficulty as time or score progresses (e.g., speed, spawn rate, or challenge scaling).
    * The game must track and display both current score and a persistent high score (use localStorage for web apps).
    * The game must have a main menu screen with options (Start Game, View Instructions, etc.).
    * The game must ALWAYS include a "Return to Main Menu" button accessible during gameplay and game-over.
    * The game must restart cleanly after a game-over with smooth transitions.
    * STRONGLY prefer Web-based (HTML/JS) for games unless it requires complex physics or 3D.
    * Include power-ups, obstacles, or variety to prevent monotony.
    * Add visual juice: particle effects on events, screen shake, smooth animations, score pop-ups, color changes.
    * Avoid narrative text adventures, quizzes, or branching-choice games—focus on mechanical gameplay.

  - If it's a FUNCTIONAL TOOL/PROGRAM:
    * Must solve a real, specific problem mentioned or implied in the Reddit post.
    * Must have a complete, intuitive UI with clear instructions.
    * Should include data persistence (localStorage), input validation, error handling.
    * Must provide immediate visual feedback for all user actions.
    * Add helpful features: export data, reset functionality, tooltips, examples.
    * Make it USEFUL and COMPLETE, not just a proof-of-concept.
    * Prefer Web apps (HTML/JS) for accessibility - anyone can open a browser.

  - If it's a WEB APP (PREFERRED):
    * Must output static files: index.html, style.css, script.js.
    * Must be runnable locally by opening index.html in a browser (no servers or frameworks).
    * Use CSS animations, transitions, and hover effects generously.
    * Ensure responsive behavior within a container (don't worry about mobile).
    * Add loading states, success/error messages, and visual feedback.
    * Use localStorage for any data persistence needs.

  - AMBITION LEVEL:
    * Aim for 8-10 features minimum - think "impressive portfolio piece" not "hello world".
    * Every interaction should have visual feedback.
    * Include edge case handling in the steps.
    * Make it feel polished and complete, not bare-bones.

  - CRITICAL JSON RULES:
    * Use double quotes for all JSON strings, never single quotes.
    * Avoid backslash escapes in JSON string values - use plain apostrophes instead.
    * If you need an apostrophe in text, just use it directly (e.g., "I'm" not "I\'m").
    * Keep all content within JSON values simple and avoid special characters that need escaping.
    * Do not include code examples with quotes/escapes inside JSON string values.

  - Always prefer WEB APPS over Python unless the concept fundamentally requires a different medium.
  - Do NOT create vague demos or incomplete apps.
  - Output structured JSON only—no explanations or commentary.


    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    raw_text = response.text.strip()
    print("📄 Raw response:\n", raw_text)

    # Clean fences before parsing
    cleaned_text = clean_json_response(raw_text)

    try:
        plan = json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse JSON:", e)
        print("\n🔍 Problematic section:")
        # Show the area around the error
        start = max(0, e.pos - 100)
        end = min(len(cleaned_text), e.pos + 100)
        print(cleaned_text[start:end])
        print(" " * min(100, e.pos - start) + "^ Error here")
        
        # Try one more time with additional cleaning
        print("\n🔧 Attempting additional JSON repairs...")
        
        # More aggressive cleaning
        repaired = cleaned_text
        # Remove any stray backslashes before quotes
        repaired = repaired.replace("\\'", "'")
        repaired = repaired.replace('\\"', '"')
        
        try:
            plan = json.loads(repaired)
            print("✅ Successfully parsed after repairs!")
        except json.JSONDecodeError:
            print("❌ Still unable to parse JSON after repairs.")
            print("\n💡 Tip: The AI generated invalid JSON. This usually happens with:")
            print("   - Escape sequences in strings (like \\')")
            print("   - Missing commas or brackets")
            print("   - Code examples inside JSON strings")
            return None

    return plan


if __name__ == "__main__":
    # Test with a sample idea
    test_idea = "Build a physics simulator where cats knock objects off tables."
    plan = generate_project_plan(test_idea)

    if plan:
        print("\n✅ Parsed JSON Plan:")
        print(json.dumps(plan, indent=2))