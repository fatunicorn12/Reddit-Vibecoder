from reddit_fetcher import fetch_subreddit_posts
from reddit_post_to_idea import generate_project_idea
from idea_to_plan import generate_project_plan
from plan_to_code import generate_code_from_plan, save_code, detect_project_type 
from controls_detector import detect_controls_inputs
import os
import json
from auto_screenshot import auto_screenshot_project

# --- Helper: get next available project path ---
def get_next_project_path(base_dir="projects/generated_projects"):
    os.makedirs(base_dir, exist_ok=True)

    existing = [
        d for d in os.listdir(base_dir)
        if os.path.isdir(os.path.join(base_dir, d)) and d.startswith("project_")
    ]
    numbers = [int(d.split("_")[1]) for d in existing if "_" in d and d.split("_")[1].isdigit()]
    next_num = max(numbers) + 1 if numbers else 1

    folder_name = f"project_{next_num:03d}"
    project_path = os.path.join(base_dir, folder_name)
    os.makedirs(project_path, exist_ok=True)
    return project_path

def main():
    # Step 1: Fetch Reddit post
    title, body, post_url = fetch_subreddit_posts("Confession")

    if not title:
        print("❌ Could not fetch a Reddit post. Exiting.")
        return

    print("\n📌 Reddit Post:")
    print("Title:", title)
    if body and body != "[No Text in Body]":
        print("Body:", body[:200] + ("..." if len(body) > 200 else ""))

    # Step 2: Generate project idea
    idea = generate_project_idea(title, body)
    print("\n💡 Project Idea:", idea)

    # Step 3: Generate structured plan (JSON)
    plan = generate_project_plan(idea)
    if not plan:
        print("❌ Could not generate a valid plan. Exiting.")
        return
    print("\n📋 Project Plan:")
    print(json.dumps(plan, indent=2))

    # Step 4: Generate code from plan
    code = generate_code_from_plan(plan)
    if not code:
        print("❌ Failed to generate code. Exiting.")
        return

    # Step 5: Save to unique project folder
    project_dir = get_next_project_path()

    # Save plan
    with open(os.path.join(project_dir, "plan.json"), "w", encoding="utf-8") as f:
        json.dump(plan, f, indent=2)

    # Save code (handles Python vs Web app automatically)
    save_code(project_dir, code, plan)
    project_type = detect_project_type(code, plan)
    controls_text = detect_controls_inputs(project_dir, project_type)

    # Save requirements (only if dependencies exist)
    if "dependencies" in plan and plan["dependencies"]:
        with open(os.path.join(project_dir, "requirements.txt"), "w", encoding="utf-8") as f:
            f.write("\n".join(plan["dependencies"]))

    # Save README
    with open(os.path.join(project_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(f"# {idea}\n\n{plan['description']}\n\n")

        # --- Reddit Source Attribution ---
        f.write("## Source Reddit Post\n")
        f.write(f"[View original post]({post_url})\n\n")

        f.write("## Features\n")
        f.write("\n".join(f"- {feat}" for feat in plan["features"]))
        f.write("\n\n")

        f.write("## How to Run\n")
        project_type = detect_project_type(code, plan)

        if project_type == "web":
            f.write("- Open `index.html` in your browser\n\n")
        elif project_type == "python":
            f.write("- Run with: `python main.py`\n\n")
        else:
            f.write("- (Unknown project type — check generated files)\n\n")

        print(f"\n✅ Project files saved to {project_dir}")

    # Step 6: Automatically run and capture screenshot
    try:
        auto_screenshot_project(project_dir)
        print("📸 Screenshot captured and added to README.")
    except Exception as e:
        print(f"⚠️ Auto-screenshot failed for {project_dir}: {e}")


if __name__ == "__main__":
    main()
