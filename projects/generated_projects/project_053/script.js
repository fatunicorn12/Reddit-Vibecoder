// Base template JavaScript
// Claude will append generated code to this file

document.addEventListener("DOMContentLoaded", () => {
  console.log("Reddit Vibecoder - App Initialized");
  
  // Initialize the generated app
  initApp();
});

// Placeholder function - Claude will override this
function initApp() {
const curatedContent = [
  'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif',
  'https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif',
  'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
  'https://media.giphy.com/media/8VrtCswiLDNnO/giphy.gif',
  'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif',
  'https://media.giphy.com/media/14ut8PhnIwzros/giphy.gif',
  'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
  'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif'
];

let currentContentUrl = '';
let backgroundIndex = 1;

// Utility functions
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const isVideoUrl = (url) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes('video');
};

// LocalStorage functions
const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('instantGrinFavorites') || '[]');
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem('instantGrinFavorites', JSON.stringify(favorites));
};

const getUserGrins = () => {
  try {
    return JSON.parse(localStorage.getItem('instantGrinUserContent') || '[]');
  } catch {
    return [];
  }
};

const saveUserGrins = (userGrins) => {
  localStorage.setItem('instantGrinUserContent', JSON.stringify(userGrins));
};

const isFavorited = (url) => getFavorites().includes(url);

const addFavorite = (url) => {
  const favorites = getFavorites();
  if (!favorites.includes(url)) {
    favorites.push(url);
    saveFavorites(favorites);
  }
};

const removeFavorite = (url) => {
  const favorites = getFavorites().filter(fav => fav !== url);
  saveFavorites(favorites);
};

// Toast notifications
const showToast = (toastId) => {
  const toast = document.getElementById(toastId);
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
};

// Background gradient rotation
const rotateBackground = () => {
  const contentArea = document.querySelector('.content-area');
  if (contentArea) {
    contentArea.className = contentArea.className.replace(/bg-gradient-\d+/, '');
    contentArea.classList.add(`bg-gradient-${backgroundIndex}`);
    backgroundIndex = (backgroundIndex % 8) + 1;
  }
};

// Content display functions
const showLoading = () => {
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.classList.add('show');
  }
};

const hideLoading = () => {
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.classList.remove('show');
  }
};

const displayContent = (url, element) => {
  const contentDisplay = document.getElementById('contentDisplay');
  if (!contentDisplay) return;

  // Clear previous content
  contentDisplay.innerHTML = '';
  
  // Add new element
  contentDisplay.appendChild(element);
  
  // Trigger animation after a brief delay
  setTimeout(() => {
    element.classList.add('loaded');
  }, 50);
  
  hideLoading();
  updateFavoriteButton();
  rotateBackground();
};

const displayError = () => {
  const contentDisplay = document.getElementById('contentDisplay');
  if (!contentDisplay) return;

  contentDisplay.innerHTML = `
    <div class="error-message">
      <div>😅 Oops! That grin broke!</div>
      <div style="font-size: 16px; margin-top: 10px;">Loading a new one...</div>
    </div>
  `;
  
  hideLoading();
  
  // Auto-load next content after 2 seconds
  setTimeout(displayRandomContent, 2000);
};

const displayRandomContent = () => {
  const allContent = [...curatedContent, ...getUserGrins()];
  if (allContent.length === 0) return;
  
  showLoading();
  currentContentUrl = getRandomItem(allContent);
  
  if (isVideoUrl(currentContentUrl)) {
    const video = document.createElement('video');
    video.src = currentContentUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.controls = true;
    
    video.onloadeddata = () => displayContent(currentContentUrl, video);
    video.onerror = displayError;
  } else {
    const img = document.createElement('img');
    img.src = currentContentUrl;
    
    img.onload = () => displayContent(currentContentUrl, img);
    img.onerror = displayError;
  }
};

// Favorite functionality
const updateFavoriteButton = () => {
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (!favoriteBtn) return;

  const heartIcon = favoriteBtn.querySelector('.heart-icon');
  if (isFavorited(currentContentUrl)) {
    heartIcon.textContent = '♥';
    favoriteBtn.classList.add('favorited');
  } else {
    heartIcon.textContent = '♡';
    favoriteBtn.classList.remove('favorited');
  }
};

const toggleFavorite = () => {
  if (!currentContentUrl) return;

  if (isFavorited(currentContentUrl)) {
    removeFavorite(currentContentUrl);
  } else {
    addFavorite(currentContentUrl);
  }
  
  updateFavoriteButton();
};

// Favorites modal
const renderFavoritesGallery = () => {
  const favoritesGrid = document.getElementById('favoritesGrid');
  if (!favoritesGrid) return;

  const favorites = getFavorites();
  
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = `
      <div class="empty-favorites">
        <span>😔</span>
        <div>No favorites yet!</div>
        <div style="font-size: 14px; margin-top: 10px;">Click the heart on content you love</div>
      </div>
    `;
    return;
  }
  
  favoritesGrid.innerHTML = favorites.map(url => `
    <div class="favorite-item" data-url="${url}">
      ${isVideoUrl(url) 
        ? `<video src="${url}" muted></video>` 
        : `<img src="${url}" alt="Favorite grin">`
      }
      <button class="remove-btn" data-url="${url}">×</button>
    </div>
  `).join('');
  
  // Add event listeners
  favoritesGrid.querySelectorAll('.favorite-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) return;
      
      const url = item.dataset.url;
      currentContentUrl = url;
      
      if (isVideoUrl(url)) {
        const video = document.createElement('video');
        video.src = url;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.controls = true;
        video.classList.add('loaded');
        displayContent(url, video);
      } else {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('loaded');
        displayContent(url, img);
      }
      
      closeFavoritesModal();
    });
  });
  
  favoritesGrid.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = btn.dataset.url;
      removeFavorite(url);
      renderFavoritesGallery();
      if (currentContentUrl === url) {
        updateFavoriteButton();
      }
    });
  });
};

const showFavoritesModal = () => {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    renderFavoritesGallery();
    modal.classList.add('show');
  }
};

const closeFavoritesModal = () => {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.remove('show');
  }
};

// Content sharing
const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('shareToast');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('shareToast');
    });
  }
};

// User content management
const isValidUrl = (url) => {
  try {
    new URL(url);
    return /\.(gif|jpg|jpeg|png|webp|mp4|webm|ogg|mov)$/i.test(url) || 
           url.includes('giphy.com') || 
           url.includes('imgur.com');
  } catch {
    return false;
  }
};

const addUserGrin = () => {
  const input = document.getElementById('userGrinInput');
  if (!input) return;

  const url = input.value.trim();
  
  if (!url) {
    showToast('errorToast');
    return;
  }
  
  if (!isValidUrl(url)) {
    showToast('errorToast');
    return;
  }
  
  const userGrins = getUserGrins();
  if (!userGrins.includes(url)) {
    userGrins.push(url);
    saveUserGrins(userGrins);
    input.value = '';
    showToast('addToast');
  } else {
    showToast('errorToast');
  }
};

const clearUserGrins = () => {
  if (confirm('Are you sure you want to clear all your added grins?')) {
    saveUserGrins([]);
    showToast('addToast');
  }
};

// Initialize the app
const initApp = () => {
  // Initial content display
  displayRandomContent();
  
  // Event listeners
  const nextGrinBtn = document.getElementById('nextGrinBtn');
  if (nextGrinBtn) {
    nextGrinBtn.addEventListener('click', displayRandomContent);
  }
  
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', toggleFavorite);
  }
  
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (currentContentUrl) {
        copyToClipboard(currentContentUrl);
      }
    });
  }
  
  const viewFavoritesBtn = document.getElementById('viewFavoritesBtn');
  if (viewFavoritesBtn) {
    viewFavoritesBtn.addEventListener('click', showFavoritesModal);
  }
  
  const closeFavoritesBtn = document.getElementById('closeFavoritesBtn');
  if (closeFavoritesBtn) {
    closeFavoritesBtn.addEventListener('click', closeFavoritesModal);
  }
  
  const addGrinBtn = document.getElementById('addGrinBtn');
  if (addGrinBtn) {
    addGrinBtn.addEventListener('click', addUserGrin);
  }
  
  const clearUserGrinsBtn = document.getElementById('clearUserGrinsBtn');
  if (clearUserGrinsBtn) {
    clearUserGrinsBtn.addEventListener('click', clearUserGrins);
  }
  
  const userGrinInput = document.getElementById('userGrinInput');
  if (userGrinInput) {
    userGrinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addUserGrin();
      }
    });
  }
  
  // Modal overlay click to close
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeFavoritesModal);
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      displayRandomContent();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFavorite();
    } else if (e.key === 's' || e.key === 'S') {
      if (currentContentUrl) {
        copyToClipboard(currentContentUrl);
      }
    } else if (e.key === 'Escape') {
      closeFavoritesModal();
    }
  });
};
}