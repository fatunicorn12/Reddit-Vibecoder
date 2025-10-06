document.addEventListener("DOMContentLoaded", () => {
  console.log("Base template loaded");

  // App placeholder
  initApp();
});

function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = "<p>This is the base template. Gemini will add features here.</p>";
}

// Gemini Generated
document.addEventListener('DOMContentLoaded', () => {
    // 1. Define an array of healthy activity suggestions
    const suggestions = [
        'Take 5 deep breaths.',
        'Go for a 10-minute walk.',
        'Drink a glass of water.',
        'Stretch for 5 minutes.',
        'Write down 3 things you\'re grateful for.',
        'Listen to your favorite calming song.',
        'Read a few pages of a book.',
        'Clean a small area of your space.',
        'Do a quick meditation for 2 minutes.',
        'Call a friend or family member.',
        'Engage in a quick creative activity (doodle, write).',
        'Spend 5 minutes in nature, if possible.',
        'Do 10 jumping jacks or simple exercises.'
    ];

    // 2. Get references to the HTML elements
    const suggestionDisplay = document.getElementById('suggestion-display');
    const newSuggestionBtn = document.getElementById('new-suggestion-btn');
    const counterDisplay = document.getElementById('counter-display');
    const incrementCounterBtn = document.getElementById('increment-counter-btn');

    let diversionCounter = 0; // Initialize counter in script

    // 3. Implement loadCounter() function
    function loadCounter() {
        const storedCounter = localStorage.getItem('diversionCounter');
        diversionCounter = storedCounter ? parseInt(storedCounter, 10) : 0;
        counterDisplay.textContent = diversionCounter;
    }

    // 4. Implement saveCounter(count) function
    function saveCounter(count) {
        diversionCounter = count;
        localStorage.setItem('diversionCounter', count.toString());
        counterDisplay.textContent = diversionCounter;
    }

    // 5. Implement getRandomSuggestion() function
    function getRandomSuggestion() {
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        return suggestions[randomIndex];
    }

    // 6. Implement displaySuggestion() function
    function displaySuggestion() {
        suggestionDisplay.textContent = getRandomSuggestion();
    }

    // 7. Add an event listener to new-suggestion-btn
    newSuggestionBtn.addEventListener('click', displaySuggestion);

    // 8. Add an event listener to increment-counter-btn
    incrementCounterBtn.addEventListener('click', () => {
        // Get the current counter value
        // Increment it by 1
        // Call saveCounter() with the new value
        saveCounter(diversionCounter + 1);
    });

    // 9. On page load:
    loadCounter(); // Initialize and display the counter
    displaySuggestion(); // Show an initial suggestion
});