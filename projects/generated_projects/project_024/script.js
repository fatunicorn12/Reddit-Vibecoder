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
  const calloutComments = [
    'Truly appalling.',
    'How could you?',
    'Shame!',
    'Seek redemption.',
    'Unacceptable.',
    'What were you thinking?',
    'Disappointing behavior.',
    'You should know better.',
    'That was selfish.',
    'Time to make amends.',
    'Reflect on your actions.',
    'Do better next time.',
    'Not your finest moment.',
    'This is concerning.',
    'You owe someone an apology.'
  ];

  const actionInput = document.getElementById('actionInput');
  const submitBtn = document.getElementById('submitBtn');
  const displayContainer = document.getElementById('displayContainer');

  if (!actionInput || !submitBtn || !displayContainer) {
    console.error('Required elements not found');
    return;
  }

  function getRandomComment() {
    const randomIndex = Math.floor(Math.random() * calloutComments.length);
    return calloutComments[randomIndex];
  }

  function getRandomCommentCount() {
    return Math.floor(Math.random() * 2) + 2; // Returns 2 or 3
  }

  function createConfessionElement(actionText) {
    const confessionDiv = document.createElement('div');
    confessionDiv.className = 'confession-item';

    const actionP = document.createElement('p');
    actionP.className = 'action-text';
    actionP.textContent = actionText;
    confessionDiv.appendChild(actionP);

    const commentCount = getRandomCommentCount();
    const usedComments = new Set();

    for (let i = 0; i < commentCount; i++) {
      let comment;
      do {
        comment = getRandomComment();
      } while (usedComments.has(comment) && usedComments.size < calloutComments.length);
      
      usedComments.add(comment);

      const commentP = document.createElement('p');
      commentP.className = 'comment-text';
      commentP.textContent = `"${comment}"`;
      confessionDiv.appendChild(commentP);
    }

    return confessionDiv;
  }

  submitBtn.addEventListener('click', function() {
    const actionText = actionInput.value.trim();
    
    if (actionText !== '') {
      const confessionElement = createConfessionElement(actionText);
      displayContainer.insertBefore(confessionElement, displayContainer.firstChild);
      actionInput.value = '';
    }
  });

  actionInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      submitBtn.click();
    }
  });
}