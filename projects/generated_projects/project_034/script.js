document.addEventListener("DOMContentLoaded", () => {
  console.log("Base template loaded");

  // App placeholder
  initApp();
});

function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = "<p>This is the base template</p>";
}

// Claude Generated
function initApp() {
  const prompts = {
    Creative: [
      "Write a haiku about the last thing you ate",
      "Draw something using only circles and triangles",
      "Create a 30-second song using household items as instruments",
      "Design a logo for a fictional company using just your name initials",
      "Write a short story that's exactly 55 words long",
      "Take a photo that tells a story without showing any people",
      "Invent a new color and describe what it looks like"
    ],
    Physical: [
      "Learn to juggle with 2 tennis balls for 5 minutes",
      "Try to balance on one foot for 60 seconds",
      "Do 10 pushups in the slowest way possible",
      "Practice walking backwards for 2 minutes",
      "Learn one basic yoga pose and hold it for 30 seconds",
      "Try to write your name with your non-dominant hand",
      "Dance to your favorite song like nobody's watching"
    ],
    Intellectual: [
      "Learn 5 words in a language you don't speak",
      "Research a historical event that happened on your birthday",
      "Try to solve a math problem using a method you've never used",
      "Read about a scientific concept you don't understand",
      "Learn the capitals of 5 countries you've never visited",
      "Practice memorizing a short poem",
      "Research how something you use daily actually works"
    ],
    Social: [
      "Call someone you haven't talked to in months",
      "Give a genuine compliment to a stranger",
      "Ask someone about their favorite hobby and really listen",
      "Practice introducing yourself in a confident way",
      "Write a thank you note to someone who helped you recently",
      "Start a conversation about something you're passionate about",
      "Practice active listening in your next conversation"
    ],
    Practical: [
      "Learn to tie a knot you've never tied before",
      "Organize one small area of your living space",
      "Learn a keyboard shortcut you don't know",
      "Practice folding clothes in a new way",
      "Research a life skill you wish you had",
      "Try cooking something with ingredients you already have",
      "Learn how to properly clean something you use often"
    ]
  };

  const promptDisplay = document.getElementById('prompt-display');
  const generateBtn = document.getElementById('generate-btn');
  const categoryDisplay = document.getElementById('category-display');

  if (!promptDisplay || !generateBtn || !categoryDisplay) {
    console.error('Required elements not found');
    return;
  }

  function generatePrompt() {
    const categories = Object.keys(prompts);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryPrompts = prompts[randomCategory];
    const randomPrompt = categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
    
    promptDisplay.textContent = randomPrompt;
    categoryDisplay.textContent = `Category: ${randomCategory}`;
  }

  generateBtn.addEventListener('click', generatePrompt);
  
  // Generate initial prompt
  generatePrompt();
}