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
  let cost = 0;
  let impact = 0;
  let postIntervalId;

  const complaintTopicInput = document.getElementById('complaintTopic');
  const startButton = document.getElementById('startButton');
  const costMeterDisplay = document.getElementById('costMeter');
  const impactMeterDisplay = document.getElementById('impactMeter');
  const postStreamContainer = document.getElementById('postStream');

  if (!complaintTopicInput || !startButton || !costMeterDisplay || !impactMeterDisplay || !postStreamContainer) {
    console.error('Required DOM elements not found');
    return;
  }

  const BOT_PROFILES = [
    { name: 'ConcernedCitizen', sentiment: 'negative' },
    { name: 'NeutralObserver', sentiment: 'neutral' },
    { name: 'SupportiveVoice', sentiment: 'positive' },
    { name: 'ActivistAlert', sentiment: 'negative' },
    { name: 'PolicyWonk', sentiment: 'neutral' },
    { name: 'OptimisticOllie', sentiment: 'positive' },
    { name: 'SkepticalSarah', sentiment: 'negative' },
    { name: 'FactChecker', sentiment: 'neutral' }
  ];

  const PHRASE_TEMPLATES = [
    "I can't believe [TOPIC] is still an issue!",
    "Someone needs to address [TOPIC] immediately.",
    "My thoughts on [TOPIC]: it's getting worse.",
    "Finally, someone is talking about [TOPIC].",
    "[TOPIC] has been bothering me for weeks now.",
    "Does anyone else think [TOPIC] is out of control?",
    "The situation with [TOPIC] needs urgent attention.",
    "I'm tired of hearing about [TOPIC] everywhere.",
    "What's the real solution to [TOPIC]?",
    "Here's my take on the whole [TOPIC] situation...",
    "Why isn't anyone doing anything about [TOPIC]?",
    "The [TOPIC] debate is more complex than people think.",
    "I have mixed feelings about [TOPIC].",
    "Let's have a rational discussion about [TOPIC].",
    "Actually, [TOPIC] isn't as bad as everyone says.",
    "There are some positive aspects to [TOPIC]."
  ];

  function updateMetersDisplay() {
    costMeterDisplay.textContent = cost.toString();
    impactMeterDisplay.textContent = impact.toFixed(2);
  }

  function generateAndDisplayPost() {
    const topic = complaintTopicInput.value.trim();
    if (!topic) return;

    const randomBot = BOT_PROFILES[Math.floor(Math.random() * BOT_PROFILES.length)];
    const randomPhrase = PHRASE_TEMPLATES[Math.floor(Math.random() * PHRASE_TEMPLATES.length)];
    const postText = randomPhrase.replace('[TOPIC]', topic);

    const postCost = Math.floor(Math.random() * 16) + 5; // 5-20
    const postImpact = Math.random() * 0.2 + 0.05; // 0.05-0.25

    cost += postCost;
    impact += postImpact;

    const postDiv = document.createElement('div');
    postDiv.className = 'social-post';
    
    const timestamp = new Date().toLocaleTimeString();
    
    postDiv.innerHTML = `
      <div class="post-header">@${randomBot.name}</div>
      <div class="post-content">${postText}</div>
      <div class="post-timestamp">${timestamp}</div>
    `;

    postStreamContainer.prepend(postDiv);
    updateMetersDisplay();
  }

  function startSimulation() {
    const topic = complaintTopicInput.value.trim();
    if (!topic) {
      alert('Please enter a complaint topic first!');
      return;
    }

    if (postIntervalId) {
      clearInterval(postIntervalId);
    }

    cost = 0;
    impact = 0;
    updateMetersDisplay();

    complaintTopicInput.disabled = true;
    startButton.disabled = true;
    startButton.textContent = 'Simulation Running...';

    postStreamContainer.innerHTML = '';

    postIntervalId = setInterval(generateAndDisplayPost, 2500);

    // Re-enable controls after 30 seconds
    setTimeout(() => {
      if (postIntervalId) {
        clearInterval(postIntervalId);
        postIntervalId = null;
      }
      complaintTopicInput.disabled = false;
      startButton.disabled = false;
      startButton.textContent = 'Start Simulation';
    }, 30000);
  }

  startButton.addEventListener('click', startSimulation);

  // Allow Enter key to start simulation
  complaintTopicInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      startSimulation();
    }
  });
}