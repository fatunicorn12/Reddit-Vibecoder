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
  let score = 0;
  let highScore = parseInt(localStorage.getItem('firefighter-high-score') || '0');
  let timeLeft = 60;
  let gameInterval = null;
  let fireSpawnIntervalId = null;
  let activeFires = [];
  let fireSpawnDelay = 1500;
  
  const gameArea = document.getElementById('game-area');
  const currentScoreDisplay = document.getElementById('current-score');
  const highScoreDisplay = document.getElementById('high-score');
  const timeLeftDisplay = document.getElementById('time-left');
  const gameOverScreen = document.getElementById('game-over-screen');
  const restartButton = document.getElementById('restart-button');
  const finalScoreDisplay = document.getElementById('final-score');
  
  if (!gameArea || !currentScoreDisplay || !highScoreDisplay || !timeLeftDisplay || !gameOverScreen || !restartButton || !finalScoreDisplay) {
    console.error('Required DOM elements not found');
    return;
  }
  
  function initGame() {
    score = 0;
    timeLeft = 60;
    fireSpawnDelay = 1500;
    
    // Clear existing fires
    activeFires.forEach(fire => {
      if (fire.parentNode) {
        fire.parentNode.removeChild(fire);
      }
    });
    activeFires = [];
    
    // Hide game over screen
    gameOverScreen.style.display = 'none';
    
    // Update displays
    updateDisplays();
    
    // Start game intervals
    gameInterval = setInterval(updateGame, 1000);
    fireSpawnIntervalId = setInterval(spawnFire, fireSpawnDelay);
  }
  
  function spawnFire() {
    const fire = document.createElement('div');
    fire.className = 'fire';
    
    // Random position within game area bounds
    const maxX = gameArea.offsetWidth - 40;
    const maxY = gameArea.offsetHeight - 40;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    fire.style.left = x + 'px';
    fire.style.top = y + 'px';
    
    fire.onclick = function() {
      extinguishFire(fire);
    };
    
    gameArea.appendChild(fire);
    activeFires.push(fire);
    
    // Auto-remove fire after 3 seconds if not clicked
    setTimeout(() => {
      if (fire.parentNode) {
        extinguishFire(fire, false);
      }
    }, 3000);
  }
  
  function extinguishFire(fireElement, addScore = true) {
    if (fireElement.parentNode) {
      fireElement.parentNode.removeChild(fireElement);
    }
    
    const index = activeFires.indexOf(fireElement);
    if (index > -1) {
      activeFires.splice(index, 1);
    }
    
    if (addScore) {
      score += 10;
      updateDisplays();
    }
  }
  
  function updateGame() {
    timeLeft--;
    updateDisplays();
    
    // Difficulty scaling
    if (score > 0 && score % 100 === 0 && fireSpawnDelay > 500) {
      fireSpawnDelay = Math.max(500, fireSpawnDelay - 200);
      clearInterval(fireSpawnIntervalId);
      fireSpawnIntervalId = setInterval(spawnFire, fireSpawnDelay);
    }
    
    if (timeLeft <= 0) {
      gameOver();
    }
  }
  
  function updateDisplays() {
    currentScoreDisplay.textContent = score;
    highScoreDisplay.textContent = highScore;
    timeLeftDisplay.textContent = timeLeft;
  }
  
  function gameOver() {
    clearInterval(gameInterval);
    clearInterval(fireSpawnIntervalId);
    
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('firefighter-high-score', highScore.toString());
      updateDisplays();
    }
    
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'block';
  }
  
  restartButton.onclick = function() {
    initGame();
  };
  
  // Initialize high score display and start game
  updateDisplays();
  initGame();
}