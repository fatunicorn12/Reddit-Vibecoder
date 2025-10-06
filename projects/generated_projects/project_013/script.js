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
function once the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #f0f2f5;
    color: #333;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
}

.container {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

h1 {
    color: #4CAF50;
    margin-bottom: 20px;
    font-size: 2.5em;
}

p {
    font-size: 1.1em;
    margin-bottom: 30px;
    line-height: 1.5;
}

input[type="text"] {
    width: calc(100% - 20px);
    padding: 12px;
    margin-bottom: 25px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1.1em;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

input[type="text"]:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

#result {
    margin-top: 35px;
    font-size: 1.6em;
    color: #2196F3;
    background-color: #e3f2fd;
    padding: 20px;
    border-radius: 10px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.1);
    animation: slideInUp 0.6s ease-out forwards;
    opacity: 0; /* Initially hidden */
}

@keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Optional responsive adjustments */
@media (max-width: 600px) {
    .container {
        padding: 25px;
    }
    h1 {
        font-size: 2em;
    }
    p {
        font-size: 1em;
    }
    input[type="text"], button {
        font-size: 1em;
        padding: 10px;
    }
    button {
        padding: 12px 25px;
    }
    #result {
        font-size: 1.3em;
        padding: 15px;
    }
}
function initApp() {
    // a. Define an array of strings called `affirmations`
    const affirmations = [
        'You are truly amazing!',
        'You\'re doing great, keep shining!',
        'Your presence makes the world brighter.',
        'You are capable of incredible things!',
        'Believe in yourself, you are powerful!',
        'You are worthy of all the good things that come your way.',
        'Your unique qualities make you special and valuable.',
        'Every day is a new opportunity for you to succeed.',
        'You are a source of inspiration to others.',
        'Embrace your journey, you are doing wonderfully!'
    ];

    // b. Get references to the HTML elements
    const userInput = document.getElementById('userInput');
    const rateButton = document.getElementById('rateButton');
    const resultDiv = document.getElementById('result');

    // Ensure elements exist before attaching listeners or accessing properties
    if (!userInput || !rateButton || !resultDiv) {
        console.error("One or more required DOM elements were not found. Check index.html for correct IDs.");
        return; // Exit if critical elements are missing
    }

    // c. Add an event listener to the `rateButton` that triggers on a 'click'.
    rateButton.addEventListener('click', () => {
        // d. Inside the click event handler function:
        // i. Retrieve the trimmed value from the `userInput` field.
        const userName = userInput.value.trim();

        // ii. Generate a random index to select an affirmation from the `affirmations` array.
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        const selectedAffirmation = affirmations[randomIndex];

        // iii. Construct the message string. Start with 'You are a magnificent 10/10! '.
        let finalMessage = 'You are a magnificent 10/10! ';

        // iv. If `userName` is not empty, prepend 'Hey ' + `userName` + ', ' to the selected affirmation.
        let personalizedAffirmation = selectedAffirmation;
        if (userName !== '') {
            personalizedAffirmation = `Hey ${userName}, ${selectedAffirmation}`;
        }

        // v. Append the personalized (or standard) affirmation to the initial '10/10' message.
        finalMessage += personalizedAffirmation;

        // vi. Update the `innerHTML` of the `result` div with the final constructed message.
        resultDiv.innerHTML = finalMessage;
        
        // Reset and re-trigger animation for the result div
        resultDiv.style.opacity = 0; 
        resultDiv.style.animation = 'none'; 
        void resultDiv.offsetWidth; // Trigger reflow to restart animation
        resultDiv.style.animation = 'slideInUp 0.6s ease-out forwards';
    });
}
// The initApp function is called by the DOMContentLoaded event listener in index.html.