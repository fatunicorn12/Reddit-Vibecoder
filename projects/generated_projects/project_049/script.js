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
  // Game States
  const GAME_STATES = {
    START: 'start',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'game_over',
    TUTORIAL: 'tutorial'
  };

  // Task Types
  const TASK_TYPES = {
    CLICK: 'click',
    KEY_PRESS: 'key_press',
    SEQUENCE: 'sequence'
  };

  // Game State
  let currentGameState = GAME_STATES.START;
  let currentScore = 0;
  let difficultyLevel = 1;
  let blinkIntervalDuration = 3000; // Initial 3 seconds
  let highScore = parseInt(localStorage.getItem('blinkSurvivalHighScore')) || 0;
  let globalDeaths = parseInt(localStorage.getItem('blinkSurvivalGlobalDeaths')) || 0;

  // Game Loop Variables
  let gameLoopId = null;
  let blinkTimeoutId = null;
  let roundStartTime = 0;
  let isPaused = false;
  let pausedTimeRemaining = 0;

  // Current Task Variables
  let currentTaskType = null;
  let activeTasks = [];
  let currentSequence = [];
  let sequenceProgress = 0;
  let requiredKey = '';

  // DOM Elements
  const gameContainer = document.querySelector('.game-container');
  const startScreen = document.getElementById('start-screen');
  const gameArea = document.getElementById('game-area');
  const gameOverScreen = document.getElementById('game-over-screen');
  const pauseMenu = document.getElementById('pause-menu');
  const tutorialModal = document.getElementById('tutorial-modal');
  const taskContainer = document.getElementById('task-container');
  const taskInstructions = document.getElementById('task-instructions');
  const timerBar = document.getElementById('timer-bar');
  const currentScoreDisplay = document.getElementById('current-score-display');
  const highScoreDisplay = document.getElementById('high-score-display');
  const globalDeathsDisplay = document.getElementById('global-deaths-display');
  const finalScoreDisplay = document.getElementById('final-score-display');
  const finalHighScoreDisplay = document.getElementById('final-high-score-display');
  const finalGlobalDeathsDisplay = document.getElementById('final-global-deaths-display');
  const particleContainer = document.getElementById('particle-container');
  const floatingTextContainer = document.getElementById('floating-text-container');

  // Buttons
  const startGameBtn = document.getElementById('start-game-btn');
  const tutorialBtn = document.getElementById('tutorial-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resumeBtn = document.getElementById('resume-btn');
  const playAgainBtn = document.getElementById('play-again-btn');
  const closeTutorialBtn = document.getElementById('close-tutorial-btn');

  // Verify DOM elements exist
  const elements = [
    gameContainer, startScreen, gameArea, gameOverScreen, pauseMenu, tutorialModal,
    taskContainer, taskInstructions, timerBar, currentScoreDisplay, highScoreDisplay,
    globalDeathsDisplay, finalScoreDisplay, finalHighScoreDisplay, finalGlobalDeathsDisplay,
    particleContainer, floatingTextContainer, startGameBtn, tutorialBtn, pauseBtn,
    resumeBtn, playAgainBtn, closeTutorialBtn
  ];

  if (elements.some(el => !el)) {
    console.error('Some DOM elements are missing');
    return;
  }

  // Initialize
  function init() {
    updateStartScreenStats();
    showScreen(GAME_STATES.START);
    setupEventListeners();
    updateDynamicColors();
  }

  // Screen Management
  function showScreen(state) {
    hideAllScreens();
    currentGameState = state;
    
    switch(state) {
      case GAME_STATES.START:
        startScreen.classList.remove('hidden');
        updateStartScreenStats();
        break;
      case GAME_STATES.PLAYING:
        gameArea.classList.remove('hidden');
        break;
      case GAME_STATES.PAUSED:
        pauseMenu.classList.remove('hidden');
        break;
      case GAME_STATES.GAME_OVER:
        gameOverScreen.classList.remove('hidden');
        updateGameOverStats();
        break;
      case GAME_STATES.TUTORIAL:
        tutorialModal.classList.remove('hidden');
        break;
    }
  }

  function hideAllScreens() {
    const screens = [startScreen, gameArea, gameOverScreen, pauseMenu, tutorialModal];
    screens.forEach(screen => screen.classList.add('hidden'));
  }

  // Event Listeners
  function setupEventListeners() {
    startGameBtn.addEventListener('click', startGame);
    tutorialBtn.addEventListener('click', () => showScreen(GAME_STATES.TUTORIAL));
    pauseBtn.addEventListener('click', pauseGame);
    resumeBtn.addEventListener('click', resumeGame);
    playAgainBtn.addEventListener('click', startGame);
    closeTutorialBtn.addEventListener('click', () => showScreen(GAME_STATES.START));

    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent context menu on right click
    document.addEventListener('contextmenu', e => e.preventDefault());
  }

  // Game Logic
  function startGame() {
    currentScore = 0;
    difficultyLevel = 1;
    blinkIntervalDuration = 3000;
    isPaused = false;
    pausedTimeRemaining = 0;
    
    clearTasks();
    updateScore();
    updateDynamicColors();
    
    showScreen(GAME_STATES.PLAYING);
    startBlinkInterval();
  }

  function startBlinkInterval() {
    if (isPaused) return;
    
    roundStartTime = Date.now();
    spawnTask();
    startGameLoop();
    
    blinkTimeoutId = setTimeout(() => {
      if (!isPaused && currentGameState === GAME_STATES.PLAYING) {
        gameOver();
      }
    }, blinkIntervalDuration);
  }

  function startGameLoop() {
    function loop() {
      if (currentGameState === GAME_STATES.PLAYING && !isPaused) {
        updateTimerBar();
        gameLoopId = requestAnimationFrame(loop);
      }
    }
    gameLoopId = requestAnimationFrame(loop);
  }

  function updateTimerBar() {
    if (!timerBar) return;
    
    const elapsed = Date.now() - roundStartTime;
    const progress = Math.max(0, 1 - (elapsed / blinkIntervalDuration));
    
    timerBar.style.width = `${progress * 100}%`;
    
    if (progress < 0.3) {
      timerBar.classList.add('blink-warning');
    } else {
      timerBar.classList.remove('blink-warning');
    }
  }

  function spawnTask() {
    clearTasks();
    
    // Determine task type based on difficulty
    let taskType;
    if (difficultyLevel < 3) {
      taskType = TASK_TYPES.CLICK;
    } else if (difficultyLevel < 6) {
      taskType = Math.random() < 0.7 ? TASK_TYPES.CLICK : TASK_TYPES.KEY_PRESS;
    } else {
      const rand = Math.random();
      if (rand < 0.5) taskType = TASK_TYPES.CLICK;
      else if (rand < 0.8) taskType = TASK_TYPES.KEY_PRESS;
      else taskType = TASK_TYPES.SEQUENCE;
    }
    
    currentTaskType = taskType;
    
    switch(taskType) {
      case TASK_TYPES.CLICK:
        spawnClickTask();
        break;
      case TASK_TYPES.KEY_PRESS:
        spawnKeyPressTask();
        break;
      case TASK_TYPES.SEQUENCE:
        spawnSequenceTask();
        break;
    }
  }

  function spawnClickTask() {
    const numTargets = Math.min(1 + Math.floor(difficultyLevel / 3), 5);
    activeTasks = [];
    
    taskInstructions.textContent = `Click all ${numTargets} target${numTargets > 1 ? 's' : ''}!`;
    
    for (let i = 0; i < numTargets; i++) {
      const target = document.createElement('div');
      target.className = 'target';
      target.textContent = i + 1;
      
      // Random position within task container
      const containerRect = taskContainer.getBoundingClientRect();
      const margin = 60;
      const x = Math.random() * (containerRect.width - margin * 2) + margin;
      const y = Math.random() * (containerRect.height - margin * 2) + margin;
      
      target.style.left = `${x - 30}px`;
      target.style.top = `${y - 30}px`;
      
      target.addEventListener('click', () => handleTargetClick(target));
      
      taskContainer.appendChild(target);
      activeTasks.push(target);
    }
  }

  function spawnKeyPressTask() {
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    requiredKey = keys[Math.floor(Math.random() * keys.length)];
    
    taskInstructions.textContent = `Press the "${requiredKey}" key!`;
    
    const keyTask = document.createElement('div');
    keyTask.className = 'key-task';
    keyTask.textContent = requiredKey;
    
    taskContainer.appendChild(keyTask);
    activeTasks = [keyTask];
  }

  function spawnSequenceTask() {
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sequenceLength = Math.min(2 + Math.floor(difficultyLevel / 8), 5);
    
    currentSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      currentSequence.push(keys[Math.floor(Math.random() * keys.length)]);
    }
    
    sequenceProgress = 0;
    
    taskInstructions.textContent = `Press keys in order: ${currentSequence.join(' → ')}`;
    
    const sequenceTask = document.createElement('div');
    sequenceTask.className = 'sequence-task';
    sequenceTask.innerHTML = `
      <div>${currentSequence.join(' → ')}</div>
      <div class="sequence-progress">Press: ${currentSequence[0]}</div>
    `;
    
    taskContainer.appendChild(sequenceTask);
    activeTasks = [sequenceTask];
  }

  function handleTargetClick(target) {
    if (currentGameState !== GAME_STATES.PLAYING || isPaused) return;
    
    target.classList.add('hit');
    createParticles(target.getBoundingClientRect().left + 30, target.getBoundingClientRect().top + 30, 'success');
    createFloatingText('+1', target.getBoundingClientRect().left + 30, target.getBoundingClientRect().top + 30, 'score');
    
    setTimeout(() => {
      if (target.parentNode) {
        target.parentNode.removeChild(target);
      }
    }, 300);
    
    activeTasks = activeTasks.filter(t => t !== target);
    
    if (activeTasks.length === 0) {
      taskCompleted();
    }
  }

  function handleKeyDown(event) {
    if (currentGameState !== GAME_STATES.PLAYING || isPaused) return;
    
    const key = event.key.toUpperCase();
    
    if (currentTaskType === TASK_TYPES.KEY_PRESS) {
      if (key === requiredKey) {
        const taskElement = activeTasks[0];
        if (taskElement) {
          const rect = taskElement.getBoundingClientRect();
          createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'success');
          createFloatingText('Perfect!', rect.left + rect.width / 2, rect.top + rect.height / 2, 'success');
        }
        taskCompleted();
      } else {
        createFailureEffects();
      }
    } else if (currentTaskType === TASK_TYPES.SEQUENCE) {
      if (key === currentSequence[sequenceProgress]) {
        sequenceProgress++;
        
        const taskElement = activeTasks[0];
        if (taskElement) {
          const progressElement = taskElement.querySelector('.sequence-progress');
          if (sequenceProgress < currentSequence.length) {
            progressElement.textContent = `Press: ${currentSequence[sequenceProgress]}`;
          } else {
            progressElement.textContent = 'Complete!';
          }
          
          const rect = taskElement.getBoundingClientRect();
          createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'success');
        }
        
        if (sequenceProgress >= currentSequence.length) {
          createFloatingText('Perfect!', window.innerWidth / 2, window.innerHeight / 2, 'success');
          taskCompleted();
        }
      } else {
        createFailureEffects();
      }
    }
    
    // Pause functionality
    if (key === 'P' || key === 'ESCAPE') {
      if (currentGameState === GAME_STATES.PLAYING) {
        pauseGame();
      } else if (currentGameState === GAME_STATES.PAUSED) {
        resumeGame();
      }
    }
  }

  function taskCompleted() {
    if (blinkTimeoutId) {
      clearTimeout(blinkTimeoutId);
    }
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
    }
    
    currentScore++;
    updateScore();
    nextRound();
  }

  function nextRound() {
    difficultyLevel++;
    
    // Decrease blink interval duration
    blinkIntervalDuration = Math.max(800, blinkIntervalDuration * 0.92);
    
    updateDynamicColors();
    
    // Screen shake on difficulty milestones
    if (difficultyLevel % 5 === 0) {
      gameContainer.classList.add('shake');
      setTimeout(() => gameContainer.classList.remove('shake'), 500);
    }
    
    // Brief pause before next round
    setTimeout(() => {
      if (currentGameState === GAME_STATES.PLAYING) {
        startBlinkInterval();
      }
    }, 500);
  }

  function gameOver() {
    if (blinkTimeoutId) {
      clearTimeout(blinkTimeoutId);
    }
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
    }
    
    // Update high score
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem('blinkSurvivalHighScore', highScore.toString());
    }
    
    // Increment global deaths
    globalDeaths++;
    localStorage.setItem('blinkSurvivalGlobalDeaths', globalDeaths.toString());
    
    // Screen shake effect
    gameContainer.classList.add('shake');
    setTimeout(() => gameContainer.classList.remove('shake'), 500);
    
    // Show failure effects
    createFloatingText('GAME OVER!', window.innerWidth / 2, window.innerHeight / 2, 'failure');
    createParticles(window.innerWidth / 2, window.innerHeight / 2, 'failure');
    
    clearTasks();
    
    setTimeout(() => {
      showScreen(GAME_STATES.GAME_OVER);
    }, 1000);
  }

  function pauseGame() {
    if (currentGameState !== GAME_STATES.PLAYING) return;
    
    isPaused = true;
    pausedTimeRemaining = blinkIntervalDuration - (Date.now() - roundStartTime);
    
    if (blinkTimeoutId) {
      clearTimeout(blinkTimeoutId);
    }
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
    }
    
    showScreen(GAME_STATES.PAUSED);
  }

  function resumeGame() {
    if (currentGameState !== GAME_STATES.PAUSED) return;
    
    isPaused = false;
    roundStartTime = Date.now() - (blinkIntervalDuration - pausedTimeRemaining);
    
    showScreen(GAME_STATES.PLAYING);
    startGameLoop();
    
    blinkTimeoutId = setTimeout(() => {
      if (!isPaused && currentGameState === GAME_STATES.PLAYING) {
        gameOver();
      }
    }, pausedTimeRemaining);
  }

  function clearTasks() {
    taskContainer.innerHTML = '';
    activeTasks = [];
    currentSequence = [];
    sequenceProgress = 0;
    requiredKey = '';
    taskInstructions.textContent = '';
  }

  // UI Updates
  function updateScore() {
    if (currentScoreDisplay) {
      currentScoreDisplay.textContent = currentScore.toString();
    }
  }

  function updateStartScreenStats() {
    if (highScoreDisplay) {
      highScoreDisplay.textContent = highScore.toString();
    }
    if (globalDeathsDisplay) {
      globalDeathsDisplay.textContent = globalDeaths.toString();
    }
  }

  function updateGameOverStats() {
    if (finalScoreDisplay) {
      finalScoreDisplay.textContent = currentScore.toString();
    }
    if (finalHighScoreDisplay) {
      finalHighScoreDisplay.textContent = highScore.toString();
    }
    if (finalGlobalDeathsDisplay) {
      finalGlobalDeathsDisplay.textContent = globalDeaths.toString();
    }
  }

  function updateDynamicColors() {
    const hue = Math.max(0, 180 - difficultyLevel * 8);
    const intensity = Math.min(2, 1 + difficultyLevel * 0.05);
    
    document.documentElement.style.setProperty('--difficulty-hue', hue.toString());
    document.documentElement.style.setProperty('--game-intensity', intensity.toString());
  }

  // Effects
  function createParticles(x, y, type) {
    if (!particleContainer) return;
    
    const numParticles = type === 'success' ? 8 : 5;
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.className = `particle ${type}`;
      
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x + (Math.random() - 0.5) * 40}px`;
      particle.style.top = `${y + (Math.random() - 0.5) * 40}px`;
      
      particleContainer.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  }

  function createFloatingText(text, x, y, type) {
    if (!floatingTextContainer) return;
    
    const floatingText = document.createElement('div');
    floatingText.className = `floating-text ${type}`;
    floatingText.textContent = text;
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingText.style.transform = 'translate(-50%, -50%)';
    
    floatingTextContainer.appendChild(floatingText);
    
    setTimeout(() => {
      if (floatingText.parentNode) {
        floatingText.parentNode.removeChild(floatingText);
      }
    }, 2000);
  }

  function createFailureEffects() {
    createFloatingText('MISS!', window.innerWidth / 2, window.innerHeight / 2 - 100, 'failure');
    createParticles(window.innerWidth / 2, window.innerHeight / 2 - 100, 'failure');
    
    // Subtle screen shake
    gameContainer.classList.add('shake');
    setTimeout(() => gameContainer.classList.remove('shake'), 300);
  }

  // Initialize the game
  init();
}