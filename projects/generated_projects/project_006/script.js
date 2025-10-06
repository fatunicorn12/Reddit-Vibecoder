const scenarioText = document.getElementById('scenario-text');
const choicesDiv = document.getElementById('choices');
const motivationScoreDisplay = document.getElementById('motivation-score');
const restartBtn = document.getElementById('restart-btn');


// --- Game Data ---
const MIN_MOTIVATION = 0;
const MAX_MOTIVATION = 100;
let motivation = 50;
let currentScenarioIndex = 0;

const scenarios = [
    {
        text: "You wake up feeling tired. Do you:",
        options: [
            { text: "Go for a run to wake up", impact: +10 },
            { text: "Stay in bed scrolling your phone", impact: -10 }
        ]
    },
    {
        text: "It’s lunchtime! What do you eat?",
        options: [
            { text: "A balanced meal with protein and veggies", impact: +15 },
            { text: "Fast food burger and fries", impact: -15 }
        ]
    },
    {
        text: "You’re deciding what to do tonight. Do you:",
        options: [
            { text: "Go to the gym for a quick workout", impact: +20 },
            { text: "Binge-watch a show until midnight", impact: -20 }
        ]
    }
];


// --- 4. Functions ---

// Function to update the motivation score display
function updateMotivationDisplay() {
    motivationScoreDisplay.textContent = `Motivation: ${motivation}`;
    // Optional: Add a visual cue for high/low motivation
    if (motivation >= 70) {
        motivationScoreDisplay.style.color = '#27ae60'; // Green
    } else if (motivation <= 30) {
        motivationScoreDisplay.style.color = '#e74c3c'; // Red
    } else {
        motivationScoreDisplay.style.color = '#e67e22'; // Orange/Default
    }
}

// Function to display the current scenario and its choices
function displayScenario() {
    // Reset any game over/complete messages or styles
    scenarioText.style.color = ''; 
    scenarioText.classList.remove('game-over', 'game-complete');

    if (currentScenarioIndex < scenarios.length) {
        const currentScenario = scenarios[currentScenarioIndex];
        scenarioText.textContent = currentScenario.text;

        // Clear previous choice buttons
        choicesDiv.innerHTML = '';

        // Create new choice buttons
        currentScenario.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.onclick = () => handleChoice(option.impact); // Use arrow function to pass impact
            choicesDiv.appendChild(button);
        });
        choicesDiv.style.display = 'flex'; // Ensure choices are visible
    } else {
        // This case should primarily be handled by handleChoice's game end check
        endGame(true); // Game complete
    }
}

// Function to handle user choice
function handleChoice(impact) {
    motivation += impact;
    
    // Clamp motivation between MIN_MOTIVATION and MAX_MOTIVATION
    if (motivation > MAX_MOTIVATION) {
        motivation = MAX_MOTIVATION;
    } else if (motivation < MIN_MOTIVATION) {
        motivation = MIN_MOTIVATION;
    }

    updateMotivationDisplay();
    currentScenarioIndex++;

    // Check for game end conditions
    if (motivation <= MIN_MOTIVATION) {
        endGame(false); // Game Over (motivation dropped to zero)
    } else if (currentScenarioIndex >= scenarios.length) {
        endGame(true); // All scenarios played (game complete)
    } else {
        displayScenario(); // Load next scenario
    }
}

// Function to handle game end (Game Over or Game Complete)
function endGame(gameComplete) {
    if (gameComplete) {
        scenarioText.textContent = "Congratulations! You completed all scenarios and maintained your motivation!";
        scenarioText.style.color = '#27ae60'; // Green for success
        scenarioText.classList.add('game-complete');
    } else {
        scenarioText.textContent = "Game Over! Your motivation dropped to zero. Better luck next time!";
        scenarioText.style.color = '#e74c3c'; // Red for failure
        scenarioText.classList.add('game-over');
    }
    
    choicesDiv.style.display = 'none'; // Hide choice buttons
    restartBtn.style.display = 'block'; // Show restart button
}


// Function to start or restart the game
function startGame() {
    currentScenarioIndex = 0;
    motivation = 50; // Reset to starting motivation
    
    restartBtn.style.display = 'none'; // Hide restart button
    choicesDiv.style.display = 'flex'; // Ensure choices are visible again

    updateMotivationDisplay(); // Update score display
    displayScenario(); // Display the first scenario
}

// --- 5. Event Listeners ---
restartBtn.addEventListener('click', startGame);

// --- 6. Initialize the App ---
startGame(); // Call startGame once to set up the initial game state