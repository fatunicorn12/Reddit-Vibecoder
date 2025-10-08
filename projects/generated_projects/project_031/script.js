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
  let currentBill = 0;
  
  const movies = [
    { title: 'Midnight Desires', price: 5.99 },
    { title: 'Forbidden Paradise', price: 6.99 },
    { title: 'Temptation Island', price: 4.99 },
    { title: 'Sensual Nights', price: 7.99 },
    { title: 'Private Affairs', price: 5.49 },
    { title: 'Secret Encounters', price: 6.49 },
    { title: 'Passion Play', price: 8.99 },
    { title: 'After Dark Special', price: 9.99 }
  ];
  
  const movieList = document.getElementById('movie-list');
  const billAmount = document.getElementById('bill-amount');
  const cancelBillBtn = document.getElementById('cancel-bill');
  
  if (!movieList || !billAmount || !cancelBillBtn) {
    console.error('Required elements not found');
    return;
  }
  
  function updateBillDisplay() {
    billAmount.textContent = `$${currentBill.toFixed(2)}`;
  }
  
  function populateMovies() {
    movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.className = 'movie-item';
      
      const titleDiv = document.createElement('div');
      titleDiv.className = 'movie-title';
      titleDiv.textContent = movie.title;
      
      const watchBtn = document.createElement('button');
      watchBtn.className = 'watch-btn';
      watchBtn.textContent = `Watch - $${movie.price}`;
      
      watchBtn.onclick = function() {
        currentBill += movie.price;
        updateBillDisplay();
      };
      
      movieItem.appendChild(titleDiv);
      movieItem.appendChild(watchBtn);
      movieList.appendChild(movieItem);
    });
  }
  
  cancelBillBtn.onclick = function() {
    currentBill = 0;
    updateBillDisplay();
  };
  
  populateMovies();
  updateBillDisplay();
}