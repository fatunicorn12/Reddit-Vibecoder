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
  const comfortingMessages = [
    "This too shall pass. Every storm eventually gives way to calm skies.",
    "You are stronger than you know, and this challenge is helping you discover that strength.",
    "What feels overwhelming now is simply life asking you to grow into who you're meant to become.",
    "Sometimes the most beautiful flowers grow in the most difficult soil.",
    "Your feelings are valid, but they don't define your future. You have the power to create change.",
    "Every setback is a setup for a comeback. Trust in your resilience.",
    "You've overcome challenges before, and you carry that same strength within you now.",
    "This moment of difficulty is not your final destination, just a stop along your journey.",
    "Be gentle with yourself. Healing and growth take time, and that's perfectly okay.",
    "You are not alone in this struggle. Many have walked similar paths and found their way to peace.",
    "What you're experiencing now is temporary, but the wisdom you'll gain is permanent.",
    "Your worth is not determined by your struggles, but by your courage to face them.",
    "Sometimes we need to feel lost to discover who we truly are.",
    "This challenge is not punishment, but preparation for something greater ahead.",
    "You have survived 100% of your difficult days so far. Your track record is perfect.",
    "Trust the process of your life. Even confusion and pain can lead to clarity and joy.",
    "Your current chapter is not your whole story. Keep writing.",
    "You are exactly where you need to be to learn what you need to learn.",
    "Breathe deeply. Ground yourself. You have everything within you to handle this moment.",
    "What seems like an ending might actually be a beautiful new beginning in disguise."
  ];

  const wordInput = document.getElementById('wordInput');
  const receiveBtn = document.getElementById('receiveBtn');
  const messageDisplay = document.getElementById('messageDisplay');

  if (!wordInput || !receiveBtn || !messageDisplay) {
    console.error('Required elements not found');
    return;
  }

  function displayRandomMessage() {
    const randomIndex = Math.floor(Math.random() * comfortingMessages.length);
    const selectedMessage = comfortingMessages[randomIndex];
    
    messageDisplay.classList.remove('show');
    
    setTimeout(() => {
      messageDisplay.textContent = selectedMessage;
      messageDisplay.classList.add('show');
    }, 150);
  }

  receiveBtn.addEventListener('click', displayRandomMessage);

  wordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      displayRandomMessage();
    }
  });
}