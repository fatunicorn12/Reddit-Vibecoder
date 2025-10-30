// Base template JavaScript
// Claude will append generated code to this file

document.addEventListener("DOMContentLoaded", () => {
  console.log("Reddit Vibecoder - App Initialized");
  
  try {
    // Initialize the generated app
    initApp();
    console.log("✅ App loaded successfully");
  } catch (error) {
    console.error("❌ App initialization failed:", error);
    // Show error to user
    const appDiv = document.getElementById("app");
    if (appDiv) {
      appDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #e74c3c;">
          <h2>⚠️ App Failed to Load</h2>
          <p>Check the browser console (F12) for error details.</p>
          <p style="font-size: 14px; color: #7f8c8d;">Error: ${error.message}</p>
        </div>
      `;
    }
  }
});

// Placeholder function - Claude will inject initialization code here
function initApp() {
  
  // Journey data - Santa's route around the world
  const journeyData = [
    { name: "North Pole", lat: 90, lng: 0, x: 500, y: 50 },
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, x: 850, y: 180 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, x: 880, y: 350 },
    { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, x: 720, y: 220 },
    { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708, x: 680, y: 200 },
    { name: "Moscow, Russia", lat: 55.7558, lng: 37.6176, x: 620, y: 120 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278, x: 480, y: 130 },
    { name: "Paris, France", lat: 48.8566, lng: 2.3522, x: 490, y: 140 },
    { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, x: 510, y: 160 },
    { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, x: 580, y: 190 },
    { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241, x: 540, y: 380 },
    { name: "São Paulo, Brazil", lat: -23.5505, lng: -46.6333, x: 320, y: 330 },
    { name: "Buenos Aires, Argentina", lat: -34.6118, lng: -58.3960, x: 300, y: 380 },
    { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332, x: 200, y: 220 },
    { name: "Los Angeles, USA", lat: 34.0522, lng: -118.2437, x: 150, y: 180 },
    { name: "New York, USA", lat: 40.7128, lng: -74.0060, x: 280, y: 160 },
    { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832, x: 260, y: 140 },
    { name: "Reykjavik, Iceland", lat: 64.1466, lng: -21.9426, x: 450, y: 100 },
    { name: "Stockholm, Sweden", lat: 59.3293, lng: 18.0686, x: 540, y: 110 },
    { name: "Beijing, China", lat: 39.9042, lng: 116.4074, x: 800, y: 160 },
    { name: "North Pole", lat: 90, lng: 0, x: 500, y: 50 }
  ];
  
  // Game state
  let currentCityIndex = 0;
  let journeyProgress = 0;
  let isJourneyActive = false;
  let isPaused = false;
  let animationId = null;
  let speedMultiplier = 1;
  let cityMarkers = [];
  let lastUpdateTime = 0;
  let journeyStartTime = null;
  
  // DOM elements
  let santaSleigh, progressFill, currentCitySpan, nextCitySpan, etaSpan, citiesVisitedSpan;
  let startBtn, pauseBtn, resetBtn, speedSlider, speedValue, statusMessage;
  let particlesContainer;
  
  // Christmas countdown
  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 24, 20, 0, 0); // Dec 24, 8 PM
    
    if (now > christmas) {
      christmas = new Date(currentYear + 1, 11, 24, 20, 0, 0);
    }
    
    const timeDiff = christmas - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    updateCountdownDisplay('days', days);
    updateCountdownDisplay('hours', hours);
    updateCountdownDisplay('minutes', minutes);
    updateCountdownDisplay('seconds', seconds);
  }
  
  function updateCountdownDisplay(id, value) {
    const element = document.getElementById(id);
    const formattedValue = value.toString().padStart(2, '0');
    
    if (element.textContent !== formattedValue) {
      element.classList.add('number-change');
      element.textContent = formattedValue;
      setTimeout(() => element.classList.remove('number-change'), 500);
    }
  }
  
  // Create city markers
  function createCityMarkers() {
    const mapContainer = document.getElementById('world-map');
    
    journeyData.forEach((city, index) => {
      if (index === journeyData.length - 1) return; // Skip duplicate North Pole
      
      const marker = document.createElement('div');
      marker.className = 'city-marker';
      marker.style.left = `${(city.x / 1000) * 100}%`;
      marker.style.top = `${(city.y / 500) * 100}%`;
      marker.title = city.name;
      
      mapContainer.appendChild(marker);
      cityMarkers.push(marker);
    });
  }
  
  // Update Santa's position
  function updateSantaPosition(progress) {
    if (currentCityIndex >= journeyData.length - 1) return;
    
    const currentCity = journeyData[currentCityIndex];
    const nextCity = journeyData[currentCityIndex + 1];
    
    const x = currentCity.x + (nextCity.x - currentCity.x) * progress;
    const y = currentCity.y + (nextCity.y - currentCity.y) * progress;
    
    santaSleigh.style.left = `${(x / 1000) * 100}%`;
    santaSleigh.style.top = `${(y / 500) * 100}%`;
    
    // Create particle effects
    createParticleEffect(x, y);
    
    // Update map panning to follow Santa
    updateMapPanning(x, y);
  }
  
  // Create particle effects
  function createParticleEffect(x, y) {
    if (Math.random() < 0.3) { // 30% chance per frame
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${(x / 1000) * 100}%`;
      particle.style.top = `${(y / 500) * 100}%`;
      
      // Add some randomness to particle position
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1500);
    }
  }
  
  // Update map panning
  function updateMapPanning(x, y) {
    const mapContainer = document.getElementById('world-map');
    const containerWidth = mapContainer.offsetWidth;
    const containerHeight = mapContainer.offsetHeight;
    
    // Calculate offset to center Santa
    const offsetX = Math.max(0, Math.min(containerWidth - 1000, (containerWidth / 2) - x));
    const offsetY = Math.max(0, Math.min(containerHeight - 500, (containerHeight / 2) - y));
    
    mapContainer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
  
  // Update city highlights
  function updateCityHighlights() {
    // Clear all highlights
    cityMarkers.forEach(marker => {
      marker.classList.remove('current-city-highlight', 'next-city-highlight');
    });
    
    // Highlight current and next cities
    if (currentCityIndex < cityMarkers.length) {
      cityMarkers[currentCityIndex].classList.add('current-city-highlight');
    }
    
    if (currentCityIndex + 1 < cityMarkers.length) {
      cityMarkers[currentCityIndex + 1].classList.add('next-city-highlight');
    }
  }
  
  // Update information panel
  function updateInfoPanel() {
    const current = journeyData[currentCityIndex];
    const next = currentCityIndex + 1 < journeyData.length ? journeyData[currentCityIndex + 1] : null;
    
    currentCitySpan.textContent = current.name;
    nextCitySpan.textContent = next ? next.name : "Journey Complete!";
    citiesVisitedSpan.textContent = `${currentCityIndex} / ${journeyData.length - 1}`;
    
    // Calculate ETA
    if (isJourneyActive && journeyStartTime && next) {
      const elapsed = Date.now() - journeyStartTime;
      const totalEstimated = (elapsed / (currentCityIndex + journeyProgress)) * journeyData.length;
      const remaining = totalEstimated - elapsed;
      const eta = new Date(Date.now() + remaining);
      etaSpan.textContent = eta.toLocaleTimeString();
    } else {
      etaSpan.textContent = "--:--";
    }
  }
  
  // Animation loop
  function animateJourney(currentTime) {
    if (!isJourneyActive || isPaused) return;
    
    if (!lastUpdateTime) lastUpdateTime = currentTime;
    const deltaTime = currentTime - lastUpdateTime;
    lastUpdateTime = currentTime;
    
    // Update journey progress
    const baseSpeed = 0.001; // Base speed
    journeyProgress += (baseSpeed * speedMultiplier * deltaTime);
    
    if (journeyProgress >= 1) {
      // Move to next city
      journeyProgress = 0;
      currentCityIndex++;
      
      if (currentCityIndex >= journeyData.length - 1) {
        // Journey complete
        completeJourney();
        return;
      }
      
      updateCityHighlights();
    }
    
    // Update Santa position
    updateSantaPosition(journeyProgress);
    
    // Update progress bar
    const overallProgress = (currentCityIndex + journeyProgress) / (journeyData.length - 1);
    progressFill.style.width = `${overallProgress * 100}%`;
    
    // Update info panel
    updateInfoPanel();
    
    animationId = requestAnimationFrame(animateJourney);
  }
  
  // Start journey
  function startJourney() {
    if (isJourneyActive && !isPaused) return;
    
    if (isPaused) {
      // Resume
      isPaused = false;
      lastUpdateTime = 0;
      animationId = requestAnimationFrame(animateJourney);
      startBtn.textContent = "Start Journey";
      pauseBtn.disabled = false;
      statusMessage.textContent = "Journey resumed! Santa is back on his way!";
    } else {
      // Start new journey
      isJourneyActive = true;
      isPaused = false;
      journeyStartTime = Date.now();
      lastUpdateTime = 0;
      
      updateCityHighlights();
      animationId = requestAnimationFrame(animateJourney);
      
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      statusMessage.textContent = "Ho ho ho! Santa has begun his magical journey!";
      statusMessage.className = "status-message success";
    }
  }
  
  // Pause journey
  function pauseJourney() {
    if (!isJourneyActive || isPaused) return;
    
    isPaused = true;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    startBtn.disabled = false;
    startBtn.textContent = "Resume";
    pauseBtn.disabled = true;
    statusMessage.textContent = "Journey paused. Santa is taking a quick break!";
    statusMessage.className = "status-message";
  }
  
  // Reset journey
  function resetJourney() {
    isJourneyActive = false;
    isPaused = false;
    currentCityIndex = 0;
    journeyProgress = 0;
    journeyStartTime = null;
    lastUpdateTime = 0;
    
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // Reset UI
    startBtn.disabled = false;
    startBtn.textContent = "Start Journey";
    pauseBtn.disabled = true;
    progressFill.style.width = "0%";
    
    // Reset Santa position
    updateSantaPosition(0);
    updateCityHighlights();
    updateInfoPanel();
    
    // Clear particles
    particlesContainer.innerHTML = '';
    
    statusMessage.textContent = "Ready to begin the magical journey!";
    statusMessage.className = "status-message";
  }
  
  // Complete journey
  function completeJourney() {
    isJourneyActive = false;
    progressFill.style.width = "100%";
    
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    
    statusMessage.textContent = "🎉 Journey Complete! All gifts have been delivered! Merry Christmas! 🎄";
    statusMessage.className = "status-message success";
    
    // Clear all city highlights
    cityMarkers.forEach(marker => {
      marker.classList.remove('current-city-highlight', 'next-city-highlight');
    });
    
    updateInfoPanel();
  }
  
  // Speed control
  function updateSpeed() {
    speedMultiplier = parseFloat(speedSlider.value);
    speedValue.textContent = `${speedMultiplier}x`;
    
    // Save to localStorage
    localStorage.setItem('santaJourneySpeed', speedMultiplier);
  }
  
  // Load saved preferences
  function loadPreferences() {
    const savedSpeed = localStorage.getItem('santaJourneySpeed');
    if (savedSpeed) {
      speedMultiplier = parseFloat(savedSpeed);
      speedSlider.value = speedMultiplier;
      speedValue.textContent = `${speedMultiplier}x`;
    }
  }
  
  // Initialize the application
  function init() {
    // Get DOM elements
    santaSleigh = document.getElementById('santa-sleigh');
    progressFill = document.getElementById('progress-fill');
    currentCitySpan = document.getElementById('current-city');
    nextCitySpan = document.getElementById('next-city');
    etaSpan = document.getElementById('eta');
    citiesVisitedSpan = document.getElementById('cities-visited');
    startBtn = document.getElementById('start-btn');
    pauseBtn = document.getElementById('pause-btn');
    resetBtn = document.getElementById('reset-btn');
    speedSlider = document.getElementById('speed-slider');
    speedValue = document.getElementById('speed-value');
    statusMessage = document.getElementById('journey-status');
    particlesContainer = document.getElementById('santa-particles');
    
    // Create city markers
    createCityMarkers();
    
    // Set initial state
    updateSantaPosition(0);
    updateCityHighlights();
    updateInfoPanel();
    
    // Load preferences
    loadPreferences();
    
    // Event listeners
    startBtn.addEventListener('click', startJourney);
    pauseBtn.addEventListener('click', pauseJourney);
    resetBtn.addEventListener('click', resetJourney);
    speedSlider.addEventListener('input', updateSpeed);
    
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    console.log("🎅 Santa's Global Gift Dash initialized!");
  }
  
  // Initialize when DOM is ready
  init();
}