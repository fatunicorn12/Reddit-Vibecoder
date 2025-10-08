# reddit_fetcher.py
import os
import praw
import random
from prawcore.exceptions import ResponseException
from dotenv import load_dotenv
load_dotenv()

def fetch_subreddit_posts(subreddit_name='Confession'):
    try:
        reddit = praw.Reddit(
            client_id=os.getenv("REDDIT_CLIENT_ID"),
            client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
            user_agent=os.getenv("REDDIT_USER_AGENT"),
            check_for_async=False,
        )

        subreddit = reddit.subreddit(subreddit_name)
        # Fetch up to 10 hot posts
        posts = [post for post in subreddit.hot(limit=10)]
        
        # Shuffle the posts list
        random.shuffle(posts)
        
        # Choose the first post from the shuffled list
        random_post = posts[0]
        
        title = random_post.title
        body = random_post.selftext if random_post.selftext else "[No Text in Body]"
        post_url = f"https://reddit.com{random_post.permalink}"

        print(f"Title: {title}")
        print(f"Body: {body}")

        return title, body, post_url

    except ResponseException as e:
        print(f"Failed to fetch subreddit posts: {e}")
        return None, None


if __name__ == '__main__':
    fetch_subreddit_posts()
