# reddit_fetcher.py
import os
import praw
import random
from prawcore.exceptions import ResponseException
from dotenv import load_dotenv
load_dotenv()

# Expanded and varied subreddit pool
SUBREDDITS = [
    "Confession", "offmychest", "TrueOffMyChest", "TIFU", "PettyRevenge", "MaliciousCompliance",
    "prorevenge", "AmItheAsshole", "relationship_advice", "relationships",
    "AskReddit", "Showerthoughts", "UnpopularOpinion", "LifeProTips", "TodayILearned",
    "MadeMeSmile", "AskMen", "AskWomen", "CasualConversation", "mildlyinteresting", "UpliftingNews",
    "ExplainLikeImFive", "AskScience", "AskHistorians", "dataisbeautiful", "Futurology",
    "GetMotivated", "DecidingToBeBetter", "selfimprovement"
]

def fetch_subreddit_posts(subreddit_name=None):
    try:
        reddit = praw.Reddit(
            client_id=os.getenv("REDDIT_CLIENT_ID"),
            client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
            user_agent=os.getenv("REDDIT_USER_AGENT"),
            check_for_async=False,
        )

        # Randomize subreddit if not provided
        if subreddit_name is None:
            subreddit_name = random.choice(SUBREDDITS)

        subreddit = reddit.subreddit(subreddit_name)
        print(f"Fetching from r/{subreddit_name}...")

        # Fetch up to 10 hot posts and filter out NSFW ones
        posts = [post for post in subreddit.hot(limit=10) if not post.over_18]
        if not posts:
            print(f"No suitable (SFW) posts found in r/{subreddit_name}")
            return None, None, None

        # Randomly pick 1 from the 10
        random_post = random.choice(posts)

        title = random_post.title
        body = random_post.selftext if random_post.selftext else "[No Text in Body]"
        post_url = f"https://reddit.com{random_post.permalink}"

        print(f"Title: {title}")
        print(f"Body: {body[:200]}{'...' if len(body) > 200 else ''}")

        return title, body, post_url

    except ResponseException as e:
        print(f"Failed to fetch subreddit posts: {e}")
        return None, None, None


if __name__ == '__main__':
    fetch_subreddit_posts()
