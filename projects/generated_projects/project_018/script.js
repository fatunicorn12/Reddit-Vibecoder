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
  const clubScene = document.getElementById('club-scene');
  const scoreDisplay = document.getElementById('score');
  const livesDisplay = document.getElementById('lives');
  const startButton = document.getElementById('start-button');
  const gameMessage = document.getElementById('game-message');

  let score = 0;
  let lives = 3;
  let gameRunning = false;
  let troubleEvents = [];
  let spawnIntervalId = null;
  let eventIdCounter = 0;

  function updateUI() {
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
  }

  function spawnTroubleEvent() {
    if (!gameRunning) return;

    const eventId = ++eventIdCounter;
    const maxX = clubScene.clientWidth - 24;
    const maxY = clubScene.clientHeight - 24;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    const eventDiv = document.createElement('div');
    eventDiv.className = 'trouble-event';
    eventDiv.style.left = `${randomX}px`;
    eventDiv.style.top = `${randomY}px`;
    eventDiv.dataset.eventId = eventId;

    eventDiv.onclick = function(e) {
      handleEventClick(e, eventId);
    };

    clubScene.appendChild(eventDiv);

    const timeoutId = setTimeout(() => {
      handleEventEscalation(eventId);
    }, 2500);

    troubleEvents.push({ id: eventId, timeoutId: timeoutId, element: eventDiv });
  }

  function handleEventClick(event, eventId) {
    event.preventDefault();
    
    const eventIndex = troubleEvents.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return;

    const troubleEvent = troubleEvents[eventIndex];
    clearTimeout(troubleEvent.timeoutId);
    clubScene.removeChild(troubleEvent.element);
    troubleEvents.splice(eventIndex, 1);

    score += 10;
    updateUI();
    gameMessage.textContent = 'Trouble Averted! +10 points';
    setTimeout(() => {
      if (gameRunning) gameMessage.textContent = '';
    }, 1000);
  }

  function handleEventEscalation(eventId) {
    const eventIndex = troubleEvents.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return;

    const troubleEvent = troubleEvents[eventIndex];
    if (troubleEvent.element.parentNode) {
      clubScene.removeChild(troubleEvent.element);
    }
    troubleEvents.splice(eventIndex, 1);

    lives--;
    updateUI();
    gameMessage.textContent = 'Trouble Escalated! -1 Life';

    if (lives <= 0) {
      endGame();
    } else {
      setTimeout(() => {
        if (gameRunning) gameMessage.textContent = '';
      }, 1000);
    }
  }

  function startGame() {
    score = 0;
    lives = 3;
    gameRunning = true;
    troubleEvents = [];
    
    // Clear any existing events
    const existingEvents = clubScene.querySelectorAll('.trouble-event');
    existingEvents.forEach(event => clubScene.removeChild(event));

    updateUI();
    gameMessage.textContent = 'Game Started! Click on trouble events!';
    startButton.textContent = 'Restart';

    spawnIntervalId = setInterval(spawnTroubleEvent, 1800);
    
    setTimeout(() => {
      if (gameRunning) gameMessage.textContent = '';
    }, 2000);
  }

  function endGame() {
    gameRunning = false;
    
    // Clear spawn interval
    if (spawnIntervalId) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
    }

    // Clear all active events
    troubleEvents.forEach(event => {
      clearTimeout(event.timeoutId);
      if (event.element.parentNode) {
        clubScene.removeChild(event.element);
      }
    });
    troubleEvents = [];

    gameMessage.textContent = `Game Over! Final Score: ${score}`;
    startButton.textContent = 'Play Again';
  }

  startButton.addEventListener('click', startGame);
  
  updateUI();
}