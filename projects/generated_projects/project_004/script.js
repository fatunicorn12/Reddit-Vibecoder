document.getElementById('confessionInput');
const submitBtn = document.getElementById('submitBtn');
const confessionsDisplay = document.getElementById('confessionsDisplay');
const clearAllBtn = document.getElementById('clearAllBtn');

const LOCAL_STORAGE_KEY = 'anonymousUnburdenConfessions';

// `loadConfessions()` Function
function loadConfessions() {
    // Retrieve the `confessions` array from `localStorage`
    // Parse JSON, default to empty array if null
    const confessions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    // Clear the current content of `confessionsDisplay`
    confessionsDisplay.innerHTML = '';

    // If no confessions, display a message
    if (confessions.length === 0) {
        const noConfessionsMessage = document.createElement('p');
        noConfessionsMessage.textContent = 'No confessions yet. Be the first to unburden!';
        noConfessionsMessage.style.textAlign = 'center';
        noConfessionsMessage.style.color = '#777';
        confessionsDisplay.appendChild(noConfessionsMessage);
        return;
    }

    // Loop through the `confessions` array:
    confessions.forEach(confessionText => {
        // For each confession, create a new `<div>` element.
        const confessionDiv = document.createElement('div');
        confessionDiv.classList.add('confession-item'); // Apply styling class
        // Set its `textContent` to the confession text.
        confessionDiv.textContent = confessionText;
        // Append the new `<div>` to `confessionsDisplay`.
        confessionsDisplay.appendChild(confessionDiv);
    });
}

// `saveConfession()` Function
function saveConfession() {
    // Get the current `confessions` array (similar to `loadConfessions`).
    const confessions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    // Get the value from `confessionInput` and trim whitespace.
    const newConfession = confessionInput.value.trim();

    // If the input is not empty, add the new confession to the array.
    if (newConfession) {
        confessions.unshift(newConfession); // Add to the beginning to show newest first
        // Store the updated `confessions` array back into `localStorage` (stringify JSON).
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(confessions));
        
        // Call `loadConfessions()` to refresh the display.
        loadConfessions();
        
        // Clear the `confessionInput.value`.
        confessionInput.value = '';
    } else {
        alert('Confession cannot be empty!');
    }
}

// `clearAllConfessions()` Function
function clearAllConfessions() {
    // Add a `confirm()` dialog for user verification.
    if (confirm('Are you sure you want to clear ALL your confessions? This action cannot be undone.')) {
        // Remove the 'confessions' item from `localStorage`.
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        // Call `loadConfessions()` to clear the display.
        loadConfessions();
    }
}

// Event Listeners:
// Add an event listener to `submitBtn` for the 'click' event, calling `saveConfession()`.
submitBtn.addEventListener('click', saveConfession);

// Add an event listener to `clearAllBtn` for the 'click' event, calling `clearAllConfessions()`.
clearAllBtn.addEventListener('click', clearAllConfessions);

// Initial Load: Call `loadConfessions()` when the script runs
// (due to 'defer' attribute, this runs after HTML is parsed)
// to display any existing confessions.
loadConfessions();