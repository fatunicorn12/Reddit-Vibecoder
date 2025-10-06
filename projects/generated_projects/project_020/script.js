document.addEventListener("DOMContentLoaded", () => {
  console.log("Base template loaded");

  // App placeholder
  initApp();
});

function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = "<p>This is the base template. Gemini will add features here.</p>";
}

// Claude Generated
function initApp() {
  const birthdayMessage = document.getElementById('birthdayMessage');
  const celebrateButton = document.getElementById('celebrateButton');
  
  // Get user's name on page load
  let userName = prompt("What's your name?");
  if (!userName || userName.trim() === '') {
    userName = 'Friend';
  }
  
  // Update the birthday message
  birthdayMessage.textContent = `Happy Birthday, ${userName}!`;
  
  // Simple confetti function since we can't use external libraries
  function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.style.position = 'fixed';
      confettiPiece.style.width = '10px';
      confettiPiece.style.height = '10px';
      confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confettiPiece.style.left = Math.random() * 100 + 'vw';
      confettiPiece.style.top = '-10px';
      confettiPiece.style.zIndex = '1000';
      confettiPiece.style.borderRadius = '50%';
      confettiPiece.style.pointerEvents = 'none';
      
      document.body.appendChild(confettiPiece);
      
      const fallDuration = Math.random() * 2 + 2;
      const horizontalMovement = (Math.random() - 0.5) * 200;
      
      confettiPiece.animate([
        {
          transform: 'translateY(0px) translateX(0px) rotate(0deg)',
          opacity: 1
        },
        {
          transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(360deg)`,
          opacity: 0
        }
      ], {
        duration: fallDuration * 1000,
        easing: 'ease-in'
      });
      
      setTimeout(() => {
        if (confettiPiece.parentNode) {
          confettiPiece.parentNode.removeChild(confettiPiece);
        }
      }, fallDuration * 1000);
    }
  }
  
  // Add event listener to celebrate button
  celebrateButton.addEventListener('click', createConfetti);
}