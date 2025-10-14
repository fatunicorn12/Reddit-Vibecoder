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
  const currentScoreEl = document.getElementById('current-score');
  const highScoreEl = document.getElementById('high-score');
  const timeLeftEl = document.getElementById('time-left');
  const questionTextEl = document.getElementById('question-text');
  const choiceButtonsEl = document.getElementById('choice-buttons');
  const choice1Btn = document.getElementById('choice-1');
  const choice2Btn = document.getElementById('choice-2');
  const feedbackEl = document.getElementById('feedback');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');

  let currentScore = 0;
  let highScore = parseInt(localStorage.getItem('perceptionHighScore') || '0');
  let timeLeft = 10;
  let timePerQuestion = 10;
  let gameTimer = null;
  let currentQuestion = null;
  let gameActive = false;

  const deathCauses = [
    { name: "Shark attacks", fatalities: 5, sensationalized: true },
    { name: "Heart disease", fatalities: 655000, sensationalized: false },
    { name: "Lightning strikes", fatalities: 20, sensationalized: true },
    { name: "Cancer", fatalities: 599000, sensationalized: false },
    { name: "Terrorism", fatalities: 50, sensationalized: true },
    { name: "Medical errors", fatalities: 250000, sensationalized: false },
    { name: "Plane crashes", fatalities: 500, sensationalized: true },
    { name: "Car accidents", fatalities: 38000, sensationalized: false },
    { name: "Snake bites", fatalities: 5, sensationalized: true },
    { name: "Diabetes", fatalities: 83000, sensationalized: false },
    { name: "Dog attacks", fatalities: 30, sensationalized: true },
    { name: "Stroke", fatalities: 147000, sensationalized: false },
    { name: "Spider bites", fatalities: 7, sensationalized: true },
    { name: "Kidney disease", fatalities: 51000, sensationalized: false },
    { name: "Bee stings", fatalities: 100, sensationalized: true },
    { name: "Flu", fatalities: 36000, sensationalized: false }
  ];

  function updateDisplay() {
    currentScoreEl.textContent = currentScore;
    highScoreEl.textContent = highScore;
    timeLeftEl.textContent = timeLeft;
  }

  function getRandomQuestion() {
    const sensationalized = deathCauses.filter(cause => cause.sensationalized);
    const common = deathCauses.filter(cause => !cause.sensationalized);
    
    const cause1 = sensationalized[Math.floor(Math.random() * sensationalized.length)];
    const cause2 = common[Math.floor(Math.random() * common.length)];
    
    return Math.random() < 0.5 ? [cause1, cause2] : [cause2, cause1];
  }

  function displayQuestion() {
    currentQuestion = getRandomQuestion();
    questionTextEl.textContent = "Which cause of death claims more lives annually?";
    choice1Btn.textContent = currentQuestion[0].name;
    choice2Btn.textContent = currentQuestion[1].name;
    choice1Btn.disabled = false;
    choice2Btn.disabled = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
  }

  function checkAnswer(choiceIndex) {
    if (!gameActive) return;
    
    const chosen = currentQuestion[choiceIndex];
    const other = currentQuestion[1 - choiceIndex];
    const correct = chosen.fatalities > other.fatalities;
    
    choice1Btn.disabled = true;
    choice2Btn.disabled = true;
    
    if (correct) {
      currentScore++;
      feedbackEl.textContent = `Correct! ${chosen.name}: ~${chosen.fatalities.toLocaleString()} vs ${other.name}: ~${other.fatalities.toLocaleString()}`;
      feedbackEl.className = "feedback correct";
      
      // Increase difficulty every 5 correct answers
      if (currentScore % 5 === 0 && timePerQuestion > 3) {
        timePerQuestion--;
      }
      
      setTimeout(() => {
        if (gameActive) {
          timeLeft = timePerQuestion;
          displayQuestion();
        }
      }, 2000);
    } else {
      feedbackEl.textContent = `Wrong! ${other.name}: ~${other.fatalities.toLocaleString()} vs ${chosen.name}: ~${chosen.fatalities.toLocaleString()}`;
      feedbackEl.className = "feedback incorrect";
      setTimeout(gameOver, 2000);
    }
    
    updateDisplay();
  }

  function startTimer() {
    gameTimer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      
      if (timeLeft <= 0) {
        feedbackEl.textContent = "Time's up!";
        feedbackEl.className = "feedback incorrect";
        setTimeout(gameOver, 1500);
      }
    }, 1000);
  }

  function stopTimer() {
    if (gameTimer) {
      clearInterval(gameTimer);
      gameTimer = null;
    }
  }

  function startGame() {
    currentScore = 0;
    timePerQuestion = 10;
    timeLeft = timePerQuestion;
    gameActive = true;
    
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    choiceButtonsEl.style.display = 'flex';
    
    displayQuestion();
    startTimer();
    updateDisplay();
  }

  function gameOver() {
    gameActive = false;
    stopTimer();
    
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem('perceptionHighScore', highScore.toString());
      feedbackEl.textContent += " NEW HIGH SCORE!";
    }
    
    choiceButtonsEl.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    questionTextEl.textContent = `Game Over! Final Score: ${currentScore}`;
    
    updateDisplay();
  }

  function restartGame() {
    stopTimer();
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    questionTextEl.textContent = "Click Start Game to begin!";
    restartBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
    choiceButtonsEl.style.display = 'none';
  }

  // Event listeners
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', restartGame);
  choice1Btn.addEventListener('click', () => checkAnswer(0));
  choice2Btn.addEventListener('click', () => checkAnswer(1));

  // Initialize display
  highScoreEl.textContent = highScore;
  updateDisplay();
}