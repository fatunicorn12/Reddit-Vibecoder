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
document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>

style.css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #f4f7f6;
    color: #333;
    text-align: center;
}

#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px;
}

#display-area {
    font-size: 1.8em;
    margin-bottom: 30px;
    min-height: 100px; /* Ensure space even with short text */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    color: #555;
}

#reflect-button {
    padding: 15px 30px;
    background-color: #4CAF50; /* A nice green */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

#reflect-button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

#reflect-button:active {
    background-color: #3e8e41;
    transform: translateY(0);
}

script.js
function initApp() {
    const prompts = [
        "What am I truly grateful for in this moment?",
        "Is this decision aligned with my core values?",
        "What's one small step I can take right now to improve my situation?",
        "Am I reacting, or am I responding thoughtfully?",
        "What would I advise a friend in this exact situation?",
        "What assumption am I making that might not be true?",
        "How can I bring more kindness into this interaction?",
        "I am capable of handling this challenge.",
        "Every breath I take is a new opportunity.",
        "My strength is greater than any struggle.",
        "What's the most compassionate way to view this?",
        "Am I holding onto something that no longer serves me?",
        "What can I let go of right now?",
        "I am enough, just as I am.",
        "What would 'future me' thank me for doing today?",
        "How can I simplify this?",
        "What's the lesson here?",
        "I choose peace over perfection.",
        "What's truly important to me right now?",
        "How can I appreciate this moment more fully?"
    ];

    const reflectButton = document.getElementById('reflect-button');
    const displayArea = document.getElementById('display-area');

    function getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        return prompts[randomIndex];
    }

    function updateDisplay() {
        displayArea.textContent = getRandomPrompt();
    }

    reflectButton.addEventListener('click', updateDisplay);

    // Display an initial prompt when the page loads
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', initApp);