#reddit_post_to_idea.py

import os
from google import genai
from dotenv import load_dotenv

# Load variables from .env into environment
load_dotenv()

client = genai.Client()


def generate_project_idea(title: str, body: str) -> str:
    prompt = f"""
    You are given a Reddit post with this title and body:

    Title: {title}
    Body: {body}

    From this, invent a simple project idea for an MVP.
    
    Constraints:
    - It must be either:
      * A simple, replayable GAME (like Snake, Pong, Flappy Bird) with clear objectives and a game-over condition.
      * A functional PROGRAM that performs one clear task well (e.g. tournament bracket generator, password manager).
      * A static WEB APP using HTML/CSS/JS that can run locally by opening index.html.
    - The idea should be fun, useful, or quirky — but it must be implementable.
    - Do not suggest vague or incomplete concepts.

    Return only the project idea as a single sentence.
    """

    # Generate content
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    # Debug: see raw response
    print("🔍 Raw response:", response)

    # Depending on SDK version, text may be nested
    if hasattr(response, "text") and response.text:
        return response.text.strip()
    elif hasattr(response, "candidates") and len(response.candidates) > 0:
        return response.candidates[0].content.parts[0].text.strip()
    else:
        return "❌ No text returned from Gemini"

if __name__ == "__main__":
    idea = generate_project_idea("Why do cats knock things over?", "Cats always seem to push objects off tables.")
    print("💡 Project Idea:", idea)