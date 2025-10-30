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
  const ALBUMS = [
    {
      id: 1,
      title: "In the Aeroplane Over the Sea",
      artist: "Neutral Milk Hotel",
      genre: "Indie Folk",
      description: "A deeply emotional concept album about Anne Frank and love, featuring unique instrumentation and Jeff Mangum's distinctive vocals.",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/5COXoP5kdc9tHm2IgBHPar"
    },
    {
      id: 2,
      title: "Cosmogramma",
      artist: "Flying Lotus",
      genre: "Electronic Jazz",
      description: "An experimental fusion of electronic beats, jazz harmonies, and cosmic themes that pushes the boundaries of instrumental music.",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/1WjlFCHVONpcWNTNAFy5Vr"
    },
    {
      id: 3,
      title: "Carrie & Lowell",
      artist: "Sufjan Stevens",
      genre: "Indie Folk",
      description: "An intimate meditation on family, loss, and forgiveness, featuring delicate fingerpicked guitar and whispered vocals.",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/0U8DeqqKDgIhIiWOdqiQXE"
    },
    {
      id: 4,
      title: "Deathconsciousness",
      artist: "Have a Nice Life",
      genre: "Post-Punk",
      description: "A haunting double album exploring themes of depression and mortality with wall-of-sound production and ethereal melodies.",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/7FRrWLJVTNHjeRKjVTEsWo"
    },
    {
      id: 5,
      title: "Illinois",
      artist: "Sufjan Stevens",
      genre: "Baroque Pop",
      description: "An orchestral indie masterpiece celebrating and deconstructing American mythology through the lens of Illinois history.",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/6b8Zo4OrpjFVNrZN8VkzVs"
    },
    {
      id: 6,
      title: "Spiderland",
      artist: "Slint",
      genre: "Post-Rock",
      description: "A groundbreaking album that defined post-rock with its quiet-loud dynamics, mathematical precision, and narrative spoken vocals.",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/6VaRDloOGLhq6PNhvFmMKa"
    },
    {
      id: 7,
      title: "The Glow Pt. 2",
      artist: "The Microphones",
      genre: "Lo-Fi Indie",
      description: "Phil Elvrum's magnum opus of lo-fi indie rock, featuring nature imagery, distorted production, and deeply personal songwriting.",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/6b8Zo4OrpjFVNrZN8VkzVs"
    },
    {
      id: 8,
      title: "Since I Left You",
      artist: "The Avalanches",
      genre: "Plunderphonics",
      description: "A sample-based masterpiece built from thousands of vinyl records, creating a cohesive journey through decades of music history.",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/4VyQTZttCXp8DlKKKfgkDn"
    },
    {
      id: 9,
      title: "Laughing Stock",
      artist: "Talk Talk",
      genre: "Post-Rock",
      description: "A pioneering work of ambient post-rock that influenced countless artists with its impressionistic approach to song structure.",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/5COXoP5kdc9tHm2IgBHPar"
    },
    {
      id: 10,
      title: "Hissing Fauna, Are You the Destroyer?",
      artist: "of Montreal",
      genre: "Psychedelic Pop",
      description: "Kevin Barnes' exploration of mental health and identity crisis through kaleidoscopic psychedelic pop arrangements.",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/1WjlFCHVONpcWNTNAFy5Vr"
    },
    {
      id: 11,
      title: "Drukqs",
      artist: "Aphex Twin",
      genre: "IDM",
      description: "Richard D. James' double album showcasing both brutal breakbeats and delicate prepared piano compositions in perfect balance.",
      cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/7FRrWLJVTNHjeRKjVTEsWo"
    },
    {
      id: 12,
      title: "Red House Painters",
      artist: "Red House Painters",
      genre: "Slowcore",
      description: "Mark Kozelek's sprawling debut of melancholic slowcore, featuring extended guitar passages and introspective lyricism.",
      cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      listenUrl: "https://open.spotify.com/album/6VaRDloOGLhq6PNhvFmMKa"
    }
  ];

  let state = {
    currentAlbumId: null,
    listenedAlbumIds: [],
    allAlbumsPlayed: false
  };

  // DOM Elements
  const progressCounter = document.getElementById('progress-counter');
  const albumCard = document.getElementById('album-card');
  const albumCover = document.getElementById('album-cover');
  const albumTitle = document.getElementById('album-title');
  const albumArtist = document.getElementById('album-artist');
  const albumGenre = document.getElementById('album-genre');
  const albumDescription = document.getElementById('album-description');
  const listenLink = document.getElementById('listen-link');
  const markListenedBtn = document.getElementById('mark-listened');
  const skipAlbumBtn = document.getElementById('skip-album');
  const resetProgressBtn = document.getElementById('reset-progress');
  const historyList = document.getElementById('history-list');

  if (!progressCounter || !albumCard || !albumCover || !albumTitle || !albumArtist || 
      !albumGenre || !albumDescription || !listenLink || !markListenedBtn || 
      !skipAlbumBtn || !resetProgressBtn || !historyList) {
    console.error('Required DOM elements not found');
    return;
  }

  function loadState() {
    const savedState = localStorage.getItem('albumApp_state');
    if (savedState) {
      try {
        state = JSON.parse(savedState);
      } catch (e) {
        console.error('Error parsing saved state:', e);
        state = {
          currentAlbumId: null,
          listenedAlbumIds: [],
          allAlbumsPlayed: false
        };
      }
    }
  }

  function saveState() {
    localStorage.setItem('albumApp_state', JSON.stringify(state));
  }

  function getAlbumById(id) {
    return ALBUMS.find(album => album.id === id);
  }

  function selectNextAlbumId(isSkipping = false) {
    const unplayedAlbums = ALBUMS.filter(album => 
      !state.listenedAlbumIds.includes(album.id)
    );

    let selectedId;

    if (unplayedAlbums.length > 0) {
      let availableAlbums = unplayedAlbums;
      
      if (isSkipping && unplayedAlbums.length > 1 && state.currentAlbumId) {
        availableAlbums = unplayedAlbums.filter(album => 
          album.id !== state.currentAlbumId
        );
        if (availableAlbums.length === 0) {
          availableAlbums = unplayedAlbums;
        }
      }
      
      selectedId = availableAlbums[Math.floor(Math.random() * availableAlbums.length)].id;
      state.allAlbumsPlayed = false;
    } else {
      let availableAlbums = ALBUMS;
      
      if (isSkipping && state.currentAlbumId) {
        availableAlbums = ALBUMS.filter(album => album.id !== state.currentAlbumId);
        if (availableAlbums.length === 0) {
          availableAlbums = ALBUMS;
        }
      }
      
      selectedId = availableAlbums[Math.floor(Math.random() * availableAlbums.length)].id;
      state.allAlbumsPlayed = true;
    }

    state.currentAlbumId = selectedId;
    saveState();
    return selectedId;
  }

  function renderAlbumCard(albumId) {
    const album = getAlbumById(albumId);
    if (!album) return;

    albumCover.src = album.cover;
    albumCover.alt = `${album.title} by ${album.artist}`;
    albumTitle.textContent = album.title;
    albumArtist.textContent = album.artist;
    albumGenre.textContent = album.genre;
    
    let description = album.description;
    if (state.allAlbumsPlayed) {
      description += "\n\n🔄 You've listened to all unique albums! Now cycling through your collection.";
    }
    albumDescription.textContent = description;
    
    listenLink.href = album.listenUrl;
    listenLink.textContent = "Listen Now";
  }

  function updateProgressCounter() {
    progressCounter.textContent = `${state.listenedAlbumIds.length} albums completed`;
  }

  function addAlbumToHistoryList(album) {
    const li = document.createElement('li');
    li.classList.add('history-item-entering');
    li.innerHTML = `
      <strong>${album.title}</strong>
      <span>by ${album.artist}</span>
    `;
    
    historyList.prepend(li);
    
    requestAnimationFrame(() => {
      li.classList.remove('history-item-entering');
    });
  }

  function renderHistory() {
    historyList.innerHTML = '';
    
    if (state.listenedAlbumIds.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'empty-state';
      emptyLi.textContent = 'No albums listened yet!';
      historyList.appendChild(emptyLi);
      return;
    }

    const reversedIds = [...state.listenedAlbumIds].reverse();
    reversedIds.forEach((id, index) => {
      const album = getAlbumById(id);
      if (album) {
        setTimeout(() => {
          addAlbumToHistoryList(album);
        }, index * 100);
      }
    });
  }

  function createStreakAnimation() {
    progressCounter.classList.add('streak-animation');
    
    const streakNotification = document.createElement('div');
    streakNotification.className = 'streak-notification';
    streakNotification.textContent = '+1';
    
    progressCounter.parentElement.style.position = 'relative';
    progressCounter.parentElement.appendChild(streakNotification);
    
    setTimeout(() => {
      progressCounter.classList.remove('streak-animation');
    }, 300);
    
    setTimeout(() => {
      if (streakNotification.parentElement) {
        streakNotification.parentElement.removeChild(streakNotification);
      }
    }, 1500);
  }

  function performCardTransition(callback) {
    albumCard.classList.add('is-leaving');
    
    setTimeout(() => {
      if (callback) callback();
      albumCard.classList.remove('is-leaving');
      albumCard.classList.add('is-entering');
      
      setTimeout(() => {
        albumCard.classList.remove('is-entering');
      }, 100);
    }, 250);
  }

  function markAsListened() {
    if (!state.currentAlbumId) return;
    
    const currentAlbum = getAlbumById(state.currentAlbumId);
    if (!currentAlbum) return;

    if (!state.listenedAlbumIds.includes(state.currentAlbumId)) {
      state.listenedAlbumIds.push(state.currentAlbumId);
      createStreakAnimation();
      addAlbumToHistoryList(currentAlbum);
    }

    saveState();
    updateProgressCounter();

    performCardTransition(() => {
      selectNextAlbumId();
      renderAlbumCard(state.currentAlbumId);
    });
  }

  function skipAlbum() {
    performCardTransition(() => {
      selectNextAlbumId(true);
      renderAlbumCard(state.currentAlbumId);
    });
  }

  function resetProgress() {
    if (confirm('Are you sure you want to reset all your listening progress?')) {
      localStorage.removeItem('albumApp_state');
      window.location.reload();
    }
  }

  // Event Listeners
  markListenedBtn.addEventListener('click', markAsListened);
  skipAlbumBtn.addEventListener('click', skipAlbum);
  resetProgressBtn.addEventListener('click', resetProgress);

  // Initialize App
  loadState();
  
  if (!state.currentAlbumId) {
    selectNextAlbumId();
  }
  
  renderAlbumCard(state.currentAlbumId);
  updateProgressCounter();
  renderHistory();
}