document.getElementById('comments-container');
const responseDisplay = document.getElementById('response-display');

// Initialize the response display div with a default encouraging message when the page loads.
responseDisplay.textContent = "Click on a 'sabotaging' comment to find your positive counter-argument!";

// Loop through the data array to create buttons.
commentsData.forEach(item => {
    // Create a new <button> element.
    const button = document.createElement('button');
    // Set its textContent to the comment from the current object.
    button.textContent = item.comment;
    // Add a CSS class to the button for styling.
    button.classList.add('comment-button');
    // Attach a data-response attribute to the button, storing the corresponding response string.
    button.dataset.response = item.response;

    // Append each created button to the button container div.
    commentsContainer.appendChild(button);
});

// Add a single event listener to the button container (event delegation).
commentsContainer.addEventListener('click', (event) => {
    // Check if the clicked element is a button with the 'comment-button' class.
    if (event.target.classList.contains('comment-button')) {
        // Retrieve the data-response attribute from the clicked button.
        const response = event.target.dataset.response;
        // Update the textContent of the response display div with this value.
        responseDisplay.textContent = response;
    }
});