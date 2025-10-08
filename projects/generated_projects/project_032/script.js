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
  const prompts = [
    "If you could have dinner with any fictional character, who would it be and what would you ask them?",
    "What's the most unusual skill you wish you could master overnight?",
    "If you had to live in a world from any book or movie, which would you choose and why?",
    "What would you do if you discovered you could communicate with one species of animal?",
    "If you could eliminate one everyday inconvenience from your life forever, what would it be?",
    "What's something everyone seems to love that you just don't understand?",
    "If you could witness any event in history, what would it be?",
    "What's the weirdest compliment you've ever received or would like to receive?",
    "If you had to teach a class on something you're passionate about, what would the subject be?",
    "What's a conspiracy theory you've made up about something totally mundane?",
    "If you could add one rule that everyone in the world had to follow, what would it be?",
    "What's the most interesting thing you've learned recently that most people don't know?",
    "If you could have any superpower, but it only worked on Tuesdays, what would you choose?",
    "What would your ideal theme park be like?",
    "If you had to create a new holiday, what would it celebrate and how would people observe it?"
  ];

  const promptDisplay = document.getElementById('prompt-display');
  const generateBtn = document.getElementById('generate-btn');

  if (!promptDisplay || !generateBtn) {
    console.error('Required elements not found');
    return;
  }

  function generatePrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  }

  function displayPrompt() {
    const newPrompt = generatePrompt();
    promptDisplay.style.opacity = '0.5';
    
    setTimeout(() => {
      promptDisplay.textContent = newPrompt;
      promptDisplay.style.opacity = '1';
    }, 150);
  }

  generateBtn.addEventListener('click', displayPrompt);

  displayPrompt();
}