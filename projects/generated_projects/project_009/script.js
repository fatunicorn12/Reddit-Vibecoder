document.addEventListener("DOMContentLoaded", () => {
  console.log("Base template loaded");

  // App placeholder
  initApp();
});

function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = "<p>This is the base template. Gemini will add features here.</p>";
}

// Gemini Generated
document.getElementById('compliment-display');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const selectedCompliment = compliments[randomIndex];
    const fullMessage = selectedCompliment + " You're a perfect 10/10!";
    complimentDisplay.textContent = fullMessage;
});