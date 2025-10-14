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
  const toys = [
    '🎾 Bouncy Ball',
    '🦆 Rubber Duck',
    '🧸 Teddy Bear',
    '🚗 Toy Car',
    '🧩 Puzzle Pieces',
    '🪀 Yo-Yo',
    '🎲 Dice',
    '🏀 Basketball',
    '🎯 Dartboard',
    '🪁 Kite',
    '🎪 Circus Ball',
    '🎨 Paint Set',
    '📚 Storybook',
    '🎵 Music Box',
    '🔔 Bell'
  ];

  const toyButton = document.getElementById('toy-button');
  const toyDisplay = document.getElementById('toy-display');

  if (!toyButton || !toyDisplay) {
    console.error('Required elements not found');
    return;
  }

  toyButton.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * toys.length);
    const selectedToy = toys[randomIndex];
    
    toyDisplay.classList.remove('toy-selected');
    
    setTimeout(() => {
      toyDisplay.innerHTML = `<p>Rocco got a ${selectedToy}!</p>`;
      toyDisplay.classList.add('toy-selected');
    }, 50);
  });
}