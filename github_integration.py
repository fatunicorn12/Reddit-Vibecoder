# github_integration.py
import os
from github import Github
from dotenv import load_dotenv

load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

if not GITHUB_TOKEN:
    raise ValueError("❌ Missing GITHUB_TOKEN in .env")

# ---- Initialize GitHub ----
g = Github(GITHUB_TOKEN)
user = g.get_user()
print(f"✅ Authenticated as: {user.login}")

def create_repo_for_project(project_name: str, project_path: str):
    """
    Creates a private repo for a generated project and uploads its files.
    """
    repo_name = project_name.replace(" ", "-").lower()
    print(f"📦 Creating repo: {repo_name}")

    # Create new private repo
    repo = user.create_repo(repo_name, private=True, description=f"Auto-generated project: {project_name}")
    print(f"✅ Repo created: {repo.html_url}")

    # Walk through project folder and upload files
    for root, _, files in os.walk(project_path):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            rel_path = os.path.relpath(file_path, project_path).replace("\\", "/")

            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            # Create file in GitHub
            repo.create_file(
                rel_path,
                f"Add {rel_path}",
                content
            )
            print(f"📤 Uploaded: {rel_path}")

    print(f"✅ All files uploaded to: {repo.html_url}")
    return repo.html_url
