from anthropic import Anthropic
import os
from dotenv import load_dotenv

load_dotenv()
client = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

response = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=100,
    messages=[{"role": "user", "content": "Say 'Hello from Claude!'"}]
)

print(response.content[0].text)
