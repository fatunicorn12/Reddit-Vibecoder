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
  const gameArea = document.getElementById('game-area');
  const spark = document.getElementById('spark');
  const currentScoreDisplay = document.getElementById('current-score');
  const highScoreDisplay = document.getElementById('high-score');
  const gameOverScreen = document.getElementById('game-over-screen');
  const restartButton = document.getElementById('restart-button');
  const finalScoreDisplay = document.getElementById('final-score');

  if (!gameArea || !spark || !currentScoreDisplay || !highScoreDisplay || !gameOverScreen || !restartButton || !finalScoreDisplay) {
    console.error('Required DOM elements not found');
    return;
  }

  let currentStreak = 0;
  let highScore = parseInt(localStorage.getItem('sparkHighScore') || '0');
  let sparkX = 0;
  let sparkY = 0;
  let sparkDX = 2;
  let sparkDY = 1.5;
  let sparkFadeTimeoutId = null;
  let animationFrameId = null;
  let sparkFadeDuration = 3000;
  let gameActive = false;

  const gameAreaRect = gameArea.getBoundingClientRect();
  const sparkSize = 30;

  function initGame() {
    currentStreak = 0;
    sparkDX = 2;
    sparkDY = 1.5;
    sparkFadeDuration = 3000;
    gameActive = true;
    
    gameOverScreen.style.display = 'none';
    spark.style.display = 'block';
    
    updateScoreDisplays();
    resetSpark();
    gameLoop();
  }

  function gameLoop() {
    if (!gameActive) return;

    sparkX += sparkDX;
    sparkY += sparkDY;

    if (sparkX <= 0 || sparkX >= gameArea.offsetWidth - sparkSize) {
      sparkDX = -sparkDX;
      sparkX = Math.max(0, Math.min(sparkX, gameArea.offsetWidth - sparkSize));
    }

    if (sparkY <= 0 || sparkY >= gameArea.offsetHeight - sparkSize) {
      sparkDY = -sparkDY;
      sparkY = Math.max(0, Math.min(sparkY, gameArea.offsetHeight - sparkSize));
    }

    spark.style.left = sparkX + 'px';
    spark.style.top = sparkY + 'px';

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function resetSpark() {
    if (sparkFadeTimeoutId) {
      clearTimeout(sparkFadeTimeoutId);
    }

    sparkX = Math.random() * (gameArea.offsetWidth - sparkSize);
    sparkY = Math.random() * (gameArea.offsetHeight - sparkSize);

    spark.style.left = sparkX + 'px';
    spark.style.top = sparkY + 'px';

    const difficultyFactor = Math.floor(currentStreak / 5) * 200;
    const currentFadeDuration = Math.max(1000, sparkFadeDuration - difficultyFactor);
    
    sparkFadeTimeoutId = setTimeout(gameOver, currentFadeDuration);
  }

  function onSparkClick(event) {
    event.stopPropagation();
    if (!gameActive) return;

    currentStreak++;
    
    if (currentStreak > highScore) {
      highScore = currentStreak;
    }

    const speedIncrease = 0.3;
    sparkDX += sparkDX > 0 ? speedIncrease : -speedIncrease;
    sparkDY += sparkDY > 0 ? speedIncrease : -speedIncrease;

    updateScoreDisplays();
    resetSpark();
  }

  function onGameAreaClick(event) {
    if (!gameActive) return;
    if (event.target === spark) return;
    
    gameOver();
  }

  function updateScoreDisplays() {
    currentScoreDisplay.textContent = `Streak: ${currentStreak}`;
    highScoreDisplay.textContent = `Best: ${highScore}`;
  }

  function gameOver() {
    gameActive = false;
    
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    if (sparkFadeTimeoutId) {
      clearTimeout(sparkFadeTimeoutId);
    }

    finalScoreDisplay.textContent = `Final Score: ${currentStreak}`;
    gameOverScreen.style.display = 'flex';
    
    localStorage.setItem('sparkHighScore', highScore.toString());
  }

  spark.addEventListener('click', onSparkClick);
  gameArea.addEventListener('click', onGameAreaClick);
  restartButton.addEventListener('click', initGame);

  updateScoreDisplays();
  initGame();
}