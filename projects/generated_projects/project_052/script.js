// Base template JavaScript
// Claude will append generated code to this file

document.addEventListener("DOMContentLoaded", () => {
  console.log("Reddit Vibecoder - App Initialized");
  
  // Initialize the generated app
  initApp();
});

// Placeholder function - Claude will override this
function initApp() {
  // Game Rules Definition
  const RULES = [
    {
      id: 'personal-attacks',
      name: 'No Personal Attacks',
      description: 'Prohibits insults, harassment, and toxic behavior toward other users',
      keywords: ['idiot', 'stupid', 'moron', 'dumb', 'loser', 'pathetic', 'worthless', 'hate you', 'kill yourself', 'scum'],
      severity: 2
    },
    {
      id: 'spam',
      name: 'No Spam',
      description: 'Prevents repetitive content and excessive self-promotion',
      keywords: ['buy now', 'click here', 'free money', 'get rich quick', 'limited time', 'act now', 'guaranteed', 'miracle'],
      severity: 1
    },
    {
      id: 'off-topic',
      name: 'No Off-Topic Content',
      description: 'Content must be relevant to the subreddit theme',
      keywords: ['completely unrelated', 'wrong subreddit', 'this has nothing to do', 'random topic', 'irrelevant'],
      severity: 1
    },
    {
      id: 'low-effort',
      name: 'No Low Effort Posts',
      description: 'Requires substantial content and meaningful discussion',
      keywords: ['lol', 'this', 'same', 'first', 'upvote if', 'am I the only one', 'does anyone else'],
      severity: 1
    },
    {
      id: 'misinformation',
      name: 'No Misinformation',
      description: 'Prohibits false or misleading information',
      keywords: ['vaccines cause autism', 'earth is flat', 'fake news', 'conspiracy', 'proven fact that'],
      severity: 3
    }
  ];

  // Post Templates for Content Generation
  const POST_TEMPLATES = [
    {
      titleParts: ['Question about', 'Help with', 'Discussion on', 'Thoughts on', 'Anyone else experienced'],
      bodyParts: ['I was wondering if anyone could help me understand', 'Has anyone else noticed that', 'I think we should discuss', 'My experience with this has been'],
      topics: ['programming', 'cooking', 'gaming', 'movies', 'books', 'travel', 'fitness', 'technology'],
      violationHints: {
        'personal-attacks': ['Anyone who disagrees is an idiot', 'People who think otherwise are stupid'],
        'spam': ['Click here for amazing deals!', 'Buy now and get rich quick!'],
        'off-topic': ['This is completely unrelated to anything', 'Wrong subreddit but whatever'],
        'low-effort': ['lol', 'this', 'same here'],
        'misinformation': ['Its a proven fact that vaccines cause autism', 'The earth is obviously flat']
      }
    }
  ];

  const AUTHORS = ['TechGuru2023', 'CookingMaster', 'GameLover99', 'BookWorm42', 'FitnessFreak', 'MovieBuff', 'TravelAddict', 'CodeNinja', 'FoodieLife', 'SportsFan'];

  // Game State
  let gameState = {
    score: 0,
    lives: 3,
    difficulty: 1,
    streak: 0,
    bestStreak: 0,
    activeRules: [],
    currentPost: null,
    isGameActive: false
  };

  // DOM Elements
  const screens = {
    mainMenu: document.getElementById('main-menu'),
    game: document.getElementById('game-screen'),
    instructions: document.getElementById('instructions-screen'),
    settings: document.getElementById('settings-screen'),
    highScores: document.getElementById('high-scores-screen'),
    gameOver: document.getElementById('game-over-screen')
  };

  // Initialize Application
  function init() {
    setupEventListeners();
    loadSettings();
    loadHighScores();
    populateRulesSettings();
    showScreen('main-menu');
  }

  // Screen Management
  function showScreen(screenId) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
      if (screen) {
        screen.classList.remove('active');
      }
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      setTimeout(() => {
        targetScreen.classList.add('active');
      }, 150);
    }

    // Handle specific screen logic
    if (screenId === 'game-screen') {
      startGame();
    } else if (screenId === 'high-scores-screen') {
      updateHighScoresDisplay();
    }
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Menu navigation
    document.querySelectorAll('[data-screen]').forEach(button => {
      button.addEventListener('click', (e) => {
        const targetScreen = e.target.getAttribute('data-screen');
        showScreen(targetScreen);
      });
    });

    // Game actions
    const approveBtn = document.getElementById('approve-btn');
    const removeBtn = document.getElementById('remove-btn');
    const skipBtn = document.getElementById('skip-btn');

    if (approveBtn) approveBtn.addEventListener('click', () => handleDecision('approve'));
    if (removeBtn) removeBtn.addEventListener('click', () => handleDecision('remove'));
    if (skipBtn) skipBtn.addEventListener('click', () => handleDecision('skip'));

    // Settings
    const saveSettingsBtn = document.getElementById('save-settings');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', saveSettings);
    }

    // Play again
    const playAgainBtn = document.getElementById('play-again-btn');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => showScreen('game-screen'));
    }
  }

  // Settings Management
  function populateRulesSettings() {
    const rulesList = document.getElementById('rules-list');
    if (!rulesList) return;

    rulesList.innerHTML = '';
    RULES.forEach(rule => {
      const ruleItem = document.createElement('div');
      ruleItem.className = 'rule-item';
      ruleItem.innerHTML = `
        <input type="checkbox" class="rule-checkbox" id="rule-${rule.id}" ${gameState.activeRules.includes(rule.id) ? 'checked' : ''}>
        <div class="rule-info">
          <label for="rule-${rule.id}" class="rule-name">${rule.name}</label>
          <div class="rule-description">${rule.description}</div>
        </div>
      `;
      rulesList.appendChild(ruleItem);
    });
  }

  function saveSettings() {
    const activeRules = [];
    document.querySelectorAll('.rule-checkbox:checked').forEach(checkbox => {
      const ruleId = checkbox.id.replace('rule-', '');
      activeRules.push(ruleId);
    });
    
    gameState.activeRules = activeRules;
    localStorage.setItem('activeRules', JSON.stringify(activeRules));
    
    // Show feedback
    const saveBtn = document.getElementById('save-settings');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    saveBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
    
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = '';
    }, 1500);
  }

  function loadSettings() {
    try {
      const savedRules = JSON.parse(localStorage.getItem('activeRules') || '[]');
      gameState.activeRules = savedRules.length > 0 ? savedRules : ['personal-attacks', 'spam', 'off-topic'];
    } catch (e) {
      gameState.activeRules = ['personal-attacks', 'spam', 'off-topic'];
    }
  }

  // High Score Management
  function loadHighScores() {
    try {
      const highScore = parseInt(localStorage.getItem('highScore') || '0');
      const lastScore = parseInt(localStorage.getItem('lastScore') || '0');
      return { highScore, lastScore };
    } catch (e) {
      return { highScore: 0, lastScore: 0 };
    }
  }

  function saveHighScore() {
    const { highScore } = loadHighScores();
    const isNewHighScore = gameState.score > highScore;
    
    if (isNewHighScore) {
      localStorage.setItem('highScore', gameState.score.toString());
    }
    localStorage.setItem('lastScore', gameState.score.toString());
    
    return isNewHighScore;
  }

  function updateHighScoresDisplay() {
    const { highScore, lastScore } = loadHighScores();
    const highScoreEl = document.getElementById('high-score-value');
    const lastScoreEl = document.getElementById('last-score-value');
    
    if (highScoreEl) highScoreEl.textContent = highScore;
    if (lastScoreEl) lastScoreEl.textContent = lastScore;
  }

  // Game Logic
  function startGame() {
    gameState = {
      score: 0,
      lives: 3,
      difficulty: 1,
      streak: 0,
      bestStreak: 0,
      activeRules: gameState.activeRules,
      currentPost: null,
      isGameActive: true
    };
    
    updateGameUI();
    generateNewPost();
  }

  function updateGameUI() {
    const scoreEl = document.getElementById('current-score');
    const livesEl = document.getElementById('current-lives');
    const streakEl = document.getElementById('current-streak');
    const difficultyFill = document.getElementById('difficulty-fill');

    if (scoreEl) scoreEl.textContent = gameState.score;
    if (livesEl) livesEl.textContent = gameState.lives;
    if (streakEl) streakEl.textContent = gameState.streak;
    
    if (difficultyFill) {
      const difficultyPercent = Math.min((gameState.difficulty * 20), 100);
      difficultyFill.style.width = difficultyPercent + '%';
    }
  }

  function generateNewPost() {
    if (!gameState.isGameActive) return;

    const template = POST_TEMPLATES[0];
    const topic = template.topics[Math.floor(Math.random() * template.topics.length)];
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
    
    // Determine if this post should violate a rule
    const shouldViolate = Math.random() < (0.4 + gameState.difficulty * 0.1);
    let violatedRule = null;
    let violationText = '';

    if (shouldViolate && gameState.activeRules.length > 0) {
      const activeRuleIds = gameState.activeRules;
      const randomRuleId = activeRuleIds[Math.floor(Math.random() * activeRuleIds.length)];
      violatedRule = RULES.find(rule => rule.id === randomRuleId);
      
      if (violatedRule && template.violationHints[randomRuleId]) {
        const hints = template.violationHints[randomRuleId];
        violationText = hints[Math.floor(Math.random() * hints.length)];
      }
    }

    // Generate post content
    const titlePart = template.titleParts[Math.floor(Math.random() * template.titleParts.length)];
    const bodyPart = template.bodyParts[Math.floor(Math.random() * template.bodyParts.length)];
    
    let title = `${titlePart} ${topic}`;
    let body = `${bodyPart} ${topic}. I've been thinking about this for a while and wanted to get everyone's thoughts.`;
    
    // Inject violation if needed
    if (violationText) {
      if (Math.random() < 0.5) {
        title += ` - ${violationText}`;
      } else {
        body += ` ${violationText}`;
      }
    }

    // Create post object
    gameState.currentPost = {
      title,
      body,
      author,
      timestamp: generateTimestamp(),
      upvotes: Math.floor(Math.random() * 1000),
      isViolating: shouldViolate && violatedRule !== null,
      violatedRule: violatedRule
    };

    displayPost(gameState.currentPost);
    enableActionButtons();
  }

  function generateTimestamp() {
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 24);
    const pastTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    return `${hoursAgo}h ago`;
  }

  function displayPost(post) {
    const titleEl = document.getElementById('post-title');
    const bodyEl = document.getElementById('post-body');
    const authorEl = document.getElementById('post-author');
    const timestampEl = document.getElementById('post-timestamp');
    const upvotesEl = document.getElementById('post-upvotes');

    if (titleEl) titleEl.textContent = post.title;
    if (bodyEl) bodyEl.textContent = post.body;
    if (authorEl) authorEl.textContent = post.author;
    if (timestampEl) timestampEl.textContent = post.timestamp;
    if (upvotesEl) upvotesEl.textContent = post.upvotes;
  }

  function handleDecision(decision) {
    if (!gameState.isGameActive || !gameState.currentPost) return;

    disableActionButtons();

    let isCorrect = false;
    const post = gameState.currentPost;

    // Determine if decision is correct
    if (decision === 'approve' && !post.isViolating) {
      isCorrect = true;
    } else if (decision === 'remove' && post.isViolating) {
      isCorrect = true;
    } else if (decision === 'skip') {
      isCorrect = null; // Neutral
    } else {
      isCorrect = false;
    }

    // Update game state and show feedback
    if (isCorrect === true) {
      handleCorrectDecision();
    } else if (isCorrect === false) {
      handleIncorrectDecision();
    } else {
      handleSkip();
    }

    // Continue game or end
    setTimeout(() => {
      if (gameState.lives <= 0 || gameState.score < -50) {
        endGame();
      } else {
        generateNewPost();
      }
    }, 2000);
  }

  function handleCorrectDecision() {
    gameState.streak++;
    if (gameState.streak > gameState.bestStreak) {
      gameState.bestStreak = gameState.streak;
    }
    
    const basePoints = 10;
    const streakMultiplier = Math.floor(gameState.streak / 3) + 1;
    const points = basePoints * streakMultiplier;
    
    gameState.score += points;
    
    showFeedback('correct', `+${points} points`);
    updateDifficulty();
    updateGameUI();
  }

  function handleIncorrectDecision() {
    gameState.lives--;
    gameState.streak = 0;
    gameState.score -= 5;
    
    showFeedback('incorrect', '-5 points, -1 life');
    updateGameUI();
  }

  function handleSkip() {
    showFeedback('skip', 'Skipped');
  }

  function showFeedback(type, scoreText) {
    const postCard = document.querySelector('.post-card');
    const feedbackOverlay = document.getElementById('feedback-overlay');

    // Flash the post card
    if (type === 'correct') {
      postCard.classList.add('correct-flash');
      setTimeout(() => postCard.classList.remove('correct-flash'), 600);
    } else if (type === 'incorrect') {
      postCard.classList.add('incorrect-flash');
      setTimeout(() => postCard.classList.remove('incorrect-flash'), 600);
    }

    // Show feedback message
    const feedbackMsg = document.createElement('div');
    feedbackMsg.className = `feedback-message feedback-${type === 'skip' ? 'correct' : type}`;
    feedbackMsg.textContent = type === 'correct' ? 'Correct!' : type === 'incorrect' ? 'Incorrect!' : 'Skipped';
    feedbackMsg.style.left = '50%';
    feedbackMsg.style.top = '30%';
    feedbackMsg.style.transform = 'translateX(-50%) translateY(-50%)';
    
    feedbackOverlay.appendChild(feedbackMsg);
    
    setTimeout(() => {
      if (feedbackOverlay.contains(feedbackMsg)) {
        feedbackOverlay.removeChild(feedbackMsg);
      }
    }, 2000);

    // Show score popup if not skip
    if (type !== 'skip') {
      const scorePopup = document.createElement('div');
      scorePopup.className = `score-popup score-${type === 'correct' ? 'positive' : 'negative'}`;
      scorePopup.textContent = scoreText;
      
      const rect = postCard.getBoundingClientRect();
      scorePopup.style.left = (rect.left + rect.width / 2) + 'px';
      scorePopup.style.top = (rect.top + rect.height / 2) + 'px';
      scorePopup.style.position = 'fixed';
      
      feedbackOverlay.appendChild(scorePopup);
      
      setTimeout(() => {
        if (feedbackOverlay.contains(scorePopup)) {
          feedbackOverlay.removeChild(scorePopup);
        }
      }, 1500);
    }
  }

  function updateDifficulty() {
    if (gameState.score > 0 && gameState.score % 50 === 0) {
      gameState.difficulty = Math.min(gameState.difficulty + 1, 5);
    }
  }

  function enableActionButtons() {
    const buttons = ['approve-btn', 'remove-btn', 'skip-btn'];
    buttons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = false;
    });
  }

  function disableActionButtons() {
    const buttons = ['approve-btn', 'remove-btn', 'skip-btn'];
    buttons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = true;
    });
  }

  function endGame() {
    gameState.isGameActive = false;
    const isNewHighScore = saveHighScore();
    
    // Update game over screen
    const finalScoreEl = document.getElementById('final-score');
    const bestStreakEl = document.getElementById('best-streak');
    const newHighScoreEl = document.getElementById('new-high-score');
    
    if (finalScoreEl) finalScoreEl.textContent = gameState.score;
    if (bestStreakEl) bestStreakEl.textContent = gameState.bestStreak;
    
    if (newHighScoreEl) {
      if (isNewHighScore) {
        newHighScoreEl.classList.remove('hidden');
      } else {
        newHighScoreEl.classList.add('hidden');
      }
    }
    
    showScreen('game-over-screen');
  }

  // Initialize the application
  init();
}