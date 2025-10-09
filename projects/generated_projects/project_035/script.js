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
  let timeLeft = 60;
  let highScore = 0;
  let gameRunning = false;
  let timerIntervalId = null;
  let currentSnippetObject = { text: '', expectedClassification: '' };
  
  const GAME_DURATION = 60;
  const INITIAL_VIOLATION_CHANCE = 0.3;
  const BAD_KEYWORDS = ['spam', 'scam', 'hate', 'abuse', 'fraud', 'cheat', 'fake', 'illegal', 'steal', 'virus'];
  const GOOD_WORDS = ['great', 'amazing', 'wonderful', 'helpful', 'friendly', 'awesome', 'excellent', 'fantastic', 'perfect', 'beautiful', 'love', 'enjoy', 'happy', 'good', 'nice', 'cool', 'fun', 'interesting', 'quality', 'best'];
  
  const currentScoreEl = document.getElementById('current-score');
  const timeLeftEl = document.getElementById('time-left');
  const highScoreEl = document.getElementById('high-score');
  const textSnippetEl = document.getElementById('text-snippet');
  const acceptableBtn = document.getElementById('acceptable-btn');
  const violatesBtn = document.getElementById('violates-btn');
  const gameOverOverlay = document.getElementById('game-over-overlay');
  const finalScoreEl = document.getElementById('final-score');
  const finalHighScoreEl = document.getElementById('final-high-score');
  const playAgainBtn = document.getElementById('play-again-btn');
  
  if (!currentScoreEl || !timeLeftEl || !highScoreEl || !textSnippetEl || 
      !acceptableBtn || !violatesBtn || !gameOverOverlay || 
      !finalScoreEl || !finalHighScoreEl || !playAgainBtn) {
    console.error('Required DOM elements not found');
    return;
  }
  
  function loadHighScore() {
    const saved = localStorage.getItem('textClassifierHighScore');
    return saved ? parseInt(saved, 10) : 0;
  }
  
  function saveHighScore(score) {
    localStorage.setItem('textClassifierHighScore', score.toString());
  }
  
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  function generateSnippet() {
    const violationChance = Math.min(0.8, INITIAL_VIOLATION_CHANCE + score * 0.01);
    const willViolate = Math.random() < violationChance;
    
    let snippet = '';
    const numWords = 3 + Math.floor(Math.random() * 4);
    
    if (willViolate) {
      const badKeyword = getRandomElement(BAD_KEYWORDS);
      const insertPosition = Math.floor(Math.random() * numWords);
      
      for (let i = 0; i < numWords; i++) {
        if (i === insertPosition) {
          snippet += badKeyword + ' ';
        } else {
          snippet += getRandomElement(GOOD_WORDS) + ' ';
        }
      }
      
      currentSnippetObject.expectedClassification = 'Violates Rule';
    } else {
      for (let i = 0; i < numWords; i++) {
        snippet += getRandomElement(GOOD_WORDS) + ' ';
      }
      currentSnippetObject.expectedClassification = 'Acceptable';
    }
    
    currentSnippetObject.text = snippet.trim();
    textSnippetEl.textContent = currentSnippetObject.text;
  }
  
  function handlePlayerChoice(choice) {
    if (!gameRunning) return;
    
    const correct = choice === currentSnippetObject.expectedClassification;
    
    if (correct) {
      score++;
    } else {
      score = Math.max(0, score - 1);
    }
    
    currentScoreEl.textContent = score;
    generateSnippet();
  }
  
  function updateTimer() {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(timerIntervalId);
      endGame();
    }
  }
  
  function startGame() {
    score = 0;
    timeLeft = GAME_DURATION;
    highScore = loadHighScore();
    
    currentScoreEl.textContent = score;
    timeLeftEl.textContent = timeLeft;
    highScoreEl.textContent = highScore;
    
    gameOverOverlay.classList.add('hidden');
    gameRunning = true;
    
    timerIntervalId = setInterval(updateTimer, 1000);
    generateSnippet();
  }
  
  function endGame() {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    
    gameRunning = false;
    
    if (score > highScore) {
      highScore = score;
      saveHighScore(highScore);
    }
    
    finalScoreEl.textContent = score;
    finalHighScoreEl.textContent = highScore;
    gameOverOverlay.classList.remove('hidden');
  }
  
  acceptableBtn.addEventListener('click', () => handlePlayerChoice('Acceptable'));
  violatesBtn.addEventListener('click', () => handlePlayerChoice('Violates Rule'));
  playAgainBtn.addEventListener('click', startGame);
  
  startGame();
}