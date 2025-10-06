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
  const postData = [
    { text: "Just watched the new Marvel movie! The special effects were incredible! 🎬✨", category: "Entertainment" },
    { text: "Breaking: New tax legislation passed in Congress today affecting middle-class families", category: "Political" },
    { text: "This celebrity couple just announced their engagement! So happy for them! 💕", category: "Entertainment" },
    { text: "Local mayor announces new infrastructure spending plan for downtown renovation", category: "Political" },
    { text: "OMG this new Netflix series has me binge-watching all weekend! Anyone else obsessed?", category: "Entertainment" },
    { text: "Senate committee hearing on healthcare reform scheduled for next week", category: "Political" },
    { text: "Concert last night was AMAZING! The lead singer's voice gave me chills 🎵", category: "Entertainment" },
    { text: "Governor signs new environmental protection bill into law", category: "Political" },
    { text: "Can't stop listening to this new album! Track 3 is my favorite so far", category: "Entertainment" },
    { text: "City council debates proposed changes to local zoning regulations", category: "Political" }
  ];

  let score = 0;
  let timeLeft = 60;
  let currentPostIndex = 0;
  let gameInterval = null;
  let shuffledPosts = [];

  const startScreen = document.getElementById('start-screen');
  const gameContainer = document.getElementById('game-container');
  const gameOverScreen = document.getElementById('game-over-screen');
  const postContent = document.getElementById('post-content');
  const postDisplay = document.getElementById('post-display');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const finalScoreDisplay = document.getElementById('final-score');
  const btnStartGame = document.getElementById('btn-start-game');
  const btnEntertainment = document.getElementById('btn-entertainment');
  const btnPolitical = document.getElementById('btn-political');
  const btnRestart = document.getElementById('btn-restart');

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function displayPost() {
    postContent.textContent = shuffledPosts[currentPostIndex].text;
  }

  function handleChoice(chosenCategory) {
    const correctCategory = shuffledPosts[currentPostIndex].category;
    const isCorrect = chosenCategory === correctCategory;

    if (isCorrect) {
      score++;
      postDisplay.classList.add('correct-flash');
    } else {
      timeLeft = Math.max(0, timeLeft - 2);
      postDisplay.classList.add('incorrect-flash');
    }

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    setTimeout(() => {
      postDisplay.classList.remove('correct-flash', 'incorrect-flash');
      currentPostIndex++;
      
      if (currentPostIndex >= shuffledPosts.length) {
        shuffledPosts = shuffleArray(postData);
        currentPostIndex = 0;
      }
      
      if (timeLeft > 0) {
        displayPost();
      }
    }, 300);
  }

  function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      endGame();
    }
  }

  function startGame() {
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    
    score = 0;
    timeLeft = 60;
    currentPostIndex = 0;
    
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    
    shuffledPosts = shuffleArray(postData);
    displayPost();
    
    gameInterval = setInterval(updateTimer, 1000);
  }

  function endGame() {
    clearInterval(gameInterval);
    gameContainer.classList.add('hidden');
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
  }

  btnStartGame.addEventListener('click', startGame);
  btnEntertainment.addEventListener('click', () => handleChoice('Entertainment'));
  btnPolitical.addEventListener('click', () => handleChoice('Political'));
  btnRestart.addEventListener('click', startGame);
}