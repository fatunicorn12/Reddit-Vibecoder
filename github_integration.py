#github_integration.py

import os
from github import Github
from dotenv import load_dotenv
load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

if not GITHUB_TOKEN:
    raise ValueError("❌ GitHub token not found. Make sure it's in your environment variables or .env file.")

# ---- Authenticate ----
g = Github(GITHUB_TOKEN)
user = g.get_user()

print(f"✅ Authenticated as: {user.login}")

# ---- Create test repo ----
repo_name = "test-delete-me"
print(f"📦 Creating repo: {repo_name}")
repo = user.create_repo(repo_name, private=True, description="Temporary repo for token test")

print(f"✅ Repo created at: {repo.html_url}")

# ---- Delete test repo ----
print("🗑️ Deleting test repo...")
repo.delete()

print("✅ Repo successfully deleted. GitHub token works!")
