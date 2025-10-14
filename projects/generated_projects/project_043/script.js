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
  const scientificFields = [
    { specificField: "Neuropathology", generalField: "Biology" },
    { specificField: "Quantum Mechanics", generalField: "Physics" },
    { specificField: "Social Psychology", generalField: "Social Sciences" },
    { specificField: "Organic Chemistry", generalField: "Chemistry" },
    { specificField: "Developmental Biology", generalField: "Biology" },
    { specificField: "Thermodynamics", generalField: "Physics" },
    { specificField: "Anthropology", generalField: "Social Sciences" },
    { specificField: "Biochemistry", generalField: "Chemistry" },
    { specificField: "Astrophysics", generalField: "Physics" },
    { specificField: "Cognitive Psychology", generalField: "Social Sciences" },
    { specificField: "Molecular Biology", generalField: "Biology" },
    { specificField: "Physical Chemistry", generalField: "Chemistry" },
    { specificField: "Particle Physics", generalField: "Physics" },
    { specificField: "Sociology", generalField: "Social Sciences" },
    { specificField: "Genetics", generalField: "Biology" },
    { specificField: "Inorganic Chemistry", generalField: "Chemistry" }
  ];

  const generalFields = ["Biology", "Physics", "Chemistry", "Social Sciences"];

  let currentScore = 0;
  let highScore = parseInt(localStorage.getItem('scientificFieldHighScore') || '0');
  let currentQuestionIndex = 0;
  let gameTimer = null;
  let timeRemaining = 10;
  let baseTimePerQuestion = 10;
  let shuffledFields = [];
  let currentCorrectAnswer = "";

  const currentScoreEl = document.getElementById('current-score');
  const highScoreEl = document.getElementById('high-score');
  const timerEl = document.getElementById('timer');
  const specificFieldEl = document.getElementById('specific-field');
  const answerButtonsEl = document.getElementById('answer-buttons');
  const gameAreaEl = document.getElementById('game-area');
  const gameOverEl = document.getElementById('game-over');
  const finalScoreEl = document.getElementById('final-score');
  const restartBtnEl = document.getElementById('restart-btn');
  const startBtnEl = document.getElementById('start-btn');
  const startScreenEl = document.getElementById('start-screen');

  if (!currentScoreEl || !highScoreEl || !timerEl || !specificFieldEl || !answerButtonsEl || 
      !gameAreaEl || !gameOverEl || !finalScoreEl || !restartBtnEl || !startBtnEl || !startScreenEl) {
    console.error('Required DOM elements not found');
    return;
  }

  function updateDisplay() {
    currentScoreEl.textContent = currentScore;
    highScoreEl.textContent = highScore;
    timerEl.textContent = timeRemaining;
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function startTimer() {
    const timePerQuestion = Math.max(3, baseTimePerQuestion - Math.floor(currentScore / 3));
    timeRemaining = timePerQuestion;
    updateDisplay();
    
    gameTimer = setInterval(() => {
      timeRemaining--;
      updateDisplay();
      
      if (timeRemaining <= 0) {
        clearInterval(gameTimer);
        gameOver();
      }
    }, 1000);
  }

  function nextQuestion() {
    if (gameTimer) {
      clearInterval(gameTimer);
    }

    if (currentQuestionIndex >= shuffledFields.length) {
      shuffledFields = shuffleArray(scientificFields);
      currentQuestionIndex = 0;
    }

    const currentField = shuffledFields[currentQuestionIndex];
    currentCorrectAnswer = currentField.generalField;
    
    specificFieldEl.textContent = currentField.specificField;
    
    const incorrectAnswers = generalFields.filter(field => field !== currentCorrectAnswer);
    const shuffledIncorrect = shuffleArray(incorrectAnswers).slice(0, 3);
    const allAnswers = shuffleArray([currentCorrectAnswer, ...shuffledIncorrect]);
    
    answerButtonsEl.innerHTML = '';
    
    allAnswers.forEach(answer => {
      const button = document.createElement('button');
      button.className = 'answer-btn';
      button.textContent = answer;
      button.addEventListener('click', () => handleAnswer(answer));
      answerButtonsEl.appendChild(button);
    });
    
    currentQuestionIndex++;
    startTimer();
  }

  function handleAnswer(selectedAnswer) {
    if (gameTimer) {
      clearInterval(gameTimer);
    }
    
    if (selectedAnswer === currentCorrectAnswer) {
      currentScore++;
      updateDisplay();
      nextQuestion();
    } else {
      gameOver();
    }
  }

  function gameOver() {
    if (gameTimer) {
      clearInterval(gameTimer);
    }
    
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem('scientificFieldHighScore', highScore.toString());
      updateDisplay();
    }
    
    finalScoreEl.textContent = currentScore;
    gameAreaEl.classList.add('hidden');
    gameOverEl.classList.remove('hidden');
  }

  function startGame() {
    currentScore = 0;
    currentQuestionIndex = 0;
    shuffledFields = shuffleArray(scientificFields);
    
    startScreenEl.classList.add('hidden');
    gameOverEl.classList.add('hidden');
    gameAreaEl.classList.remove('hidden');
    
    updateDisplay();
    nextQuestion();
  }

  function restartGame() {
    startGame();
  }

  startBtnEl.addEventListener('click', startGame);
  restartBtnEl.addEventListener('click', restartGame);

  updateDisplay();
}