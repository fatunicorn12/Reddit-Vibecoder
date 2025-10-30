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
// Initialize the CryoLemon Burst application
const initApp = () => {
  // DOM element references
  const freezeSlider = document.getElementById('freeze-slider');
  const barrelContainer = document.getElementById('barrel-container');
  const juice = document.getElementById('juice');
  const statusDisplay = document.getElementById('status-display');
  const freezingLevelDisplay = statusDisplay.querySelector('.freezing-level');
  const statusText = statusDisplay.querySelector('.status-text');
  const resetBtn = document.getElementById('reset-btn');
  const instructionsBtn = document.getElementById('instructions-btn');
  const instructionsModal = document.getElementById('instructions-modal');
  const closeBtn = instructionsModal.querySelector('.close-btn');
  const mainContainer = document.querySelector('.main-container');
  const frostLayer = document.querySelector('.frost-layer');
  const strainLines = document.querySelector('.strain-lines');
  const particlesContainer = document.getElementById('particles-container');
  
  // Audio elements
  const ambientAudio = document.getElementById('ambient-audio');
  const burstAudio = document.getElementById('burst-audio');
  
  // Application state
  let freezingLevel = 0;
  const burstThreshold = 92;
  let isBursted = false;
  let particlesActive = false;
  
  // Initialize audio
  ambientAudio.volume = 0;
  ambientAudio.currentTime = 0;
  
  // Create synthetic audio context for better browser compatibility
  const createAudioContext = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      return audioContext;
    } catch (e) {
      console.log('Audio not supported');
      return null;
    }
  };
  
  const audioContext = createAudioContext();
  
  // Utility functions
  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  const hslToRgb = (h, s, l) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    
    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  };
  
  // Particle system
  const createParticles = () => {
    if (particlesActive) return;
    particlesActive = true;
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999';
    
    particlesContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const barrelRect = barrelContainer.getBoundingClientRect();
    const centerX = barrelRect.left + barrelRect.width / 2;
    const centerY = barrelRect.top + barrelRect.height / 2;
    
    // Create ice shard particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20 - 5,
        size: Math.random() * 8 + 2,
        color: `hsl(${Math.random() * 60 + 180}, 70%, ${Math.random() * 30 + 60}%)`,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        type: 'ice'
      });
    }
    
    // Create lemon juice particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 3,
        size: Math.random() * 6 + 3,
        color: `hsl(${Math.random() * 30 + 45}, 90%, ${Math.random() * 20 + 50}%)`,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
        type: 'juice'
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.vx *= 0.99; // air resistance
        
        // Update life
        p.life -= p.decay;
        
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        
        if (p.type === 'ice') {
          // Draw angular ice shard
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.atan2(p.vy, p.vx));
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          // Draw round juice droplet
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
      
      if (particles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        particlesContainer.removeChild(canvas);
        particlesActive = false;
      }
    };
    
    animate();
  };
  
  // Update all visual elements based on freezing level
  const updateVisuals = () => {
    if (isBursted) return;
    
    const factor = freezingLevel / 100;
    
    // Update status display
    freezingLevelDisplay.textContent = `${freezingLevel}%`;
    
    // Update status text and color
    if (freezingLevel < 30) {
      statusText.textContent = 'Stable';
      statusText.style.color = '#27ae60';
    } else if (freezingLevel < 60) {
      statusText.textContent = 'Expanding...';
      statusText.style.color = '#f39c12';
    } else if (freezingLevel < burstThreshold - 15) {
      statusText.textContent = 'Critical Expansion';
      statusText.style.color = '#e67e22';
    } else {
      statusText.textContent = 'CRITICAL!';
      statusText.style.color = '#e74c3c';
    }
    
    // Barrel expansion
    const scaleX = 1 + factor * 0.4;
    const scaleY = 1 + factor * 0.3;
    barrelContainer.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;
    
    // Juice color transformation
    const hue = lerp(45, 200, factor); // Yellow to light blue
    const saturation = lerp(90, 30, factor);
    const lightness = lerp(60, 85, factor);
    const [r, g, b] = hslToRgb(hue, saturation / 100, lightness / 100);
    juice.style.background = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${Math.max(0, r-30)}, ${Math.max(0, g-30)}, ${Math.max(0, b-30)}))`;
    
    // Background color change
    const bgHue = lerp(45, 200, factor);
    const bgSat = lerp(100, 60, factor);
    const bgLight = lerp(70, 85, factor);
    const [bgR, bgG, bgB] = hslToRgb(bgHue, bgSat / 100, bgLight / 100);
    mainContainer.style.background = `linear-gradient(135deg, rgb(${bgR}, ${bgG}, ${bgB}), rgb(${Math.max(0, bgR-40)}, ${Math.max(0, bgG-40)}, ${Math.max(0, bgB-40)}))`;
    
    // Frost layer
    frostLayer.style.opacity = Math.min(factor * 1.2, 0.8);
    
    // Strain lines
    if (factor > 0.6) {
      strainLines.style.opacity = (factor - 0.6) * 2;
    } else {
      strainLines.style.opacity = 0;
    }
    
    // Material strain effects
    const brightness = lerp(1, 0.8, factor);
    const contrast = lerp(1, 1.3, factor);
    barrelContainer.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    
    // Critical warning effects
    if (freezingLevel >= burstThreshold - 15 && freezingLevel < burstThreshold) {
      barrelContainer.classList.add('critical-warning');
    } else {
      barrelContainer.classList.remove('critical-warning');
    }
    
    // Ambient audio
    if (ambientAudio && !ambientAudio.paused) {
      ambientAudio.volume = Math.min(factor * 0.3, 0.3);
      ambientAudio.playbackRate = 1 + factor * 0.5;
    }
  };
  
  // Check if burst condition is met
  const checkBurstCondition = () => {
    if (freezingLevel >= burstThreshold && !isBursted) {
      triggerBurst();
    }
  };
  
  // Trigger the burst effect
  const triggerBurst = () => {
    isBursted = true;
    freezeSlider.disabled = true;
    
    // Update status
    statusText.textContent = 'BURSTED!';
    statusText.style.color = '#e74c3c';
    statusText.style.fontSize = '1.5rem';
    statusDisplay.classList.add('bursted');
    
    // Hide barrel
    barrelContainer.style.opacity = '0';
    barrelContainer.classList.remove('critical-warning');
    
    // Screen shake
    mainContainer.classList.add('screen-shake');
    setTimeout(() => {
      mainContainer.classList.remove('screen-shake');
    }, 500);
    
    // Stop ambient audio and play burst sound
    if (ambientAudio) {
      ambientAudio.pause();
    }
    
    if (burstAudio) {
      burstAudio.currentTime = 0;
      burstAudio.volume = 0.5;
      burstAudio.play().catch(() => {
        // Handle audio play failure silently
      });
    }
    
    // Create particle explosion
    createParticles();
  };
  
  // Reset the simulation
  const resetSimulation = () => {
    // Reset state
    freezingLevel = 0;
    isBursted = false;
    
    // Reset UI elements
    freezeSlider.value = 0;
    freezeSlider.disabled = false;
    barrelContainer.style.opacity = '1';
    barrelContainer.classList.remove('critical-warning');
    statusDisplay.classList.remove('bursted');
    mainContainer.classList.remove('screen-shake');
    
    // Reset status text style
    statusText.style.fontSize = '1.2rem';
    
    // Clear any active particles
    while (particlesContainer.firstChild) {
      particlesContainer.removeChild(particlesContainer.firstChild);
    }
    particlesActive = false;
    
    // Restart ambient audio
    if (ambientAudio) {
      ambientAudio.currentTime = 0;
      ambientAudio.volume = 0;
      ambientAudio.play().catch(() => {
        // Handle audio play failure silently
      });
    }
    
    // Update visuals to initial state
    updateVisuals();
  };
  
  // Event listeners
  if (freezeSlider) {
    freezeSlider.addEventListener('input', (e) => {
      if (isBursted) return;
      
      freezingLevel = parseInt(e.target.value);
      updateVisuals();
      checkBurstCondition();
    });
    
    // Start ambient audio on first interaction
    freezeSlider.addEventListener('input', () => {
      if (ambientAudio && ambientAudio.paused) {
        ambientAudio.play().catch(() => {
          // Handle audio play failure silently
        });
      }
    }, { once: true });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', resetSimulation);
  }
  
  if (instructionsBtn) {
    instructionsBtn.addEventListener('click', () => {
      instructionsModal.style.display = 'block';
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      instructionsModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  if (instructionsModal) {
    instructionsModal.addEventListener('click', (e) => {
      if (e.target === instructionsModal) {
        instructionsModal.style.display = 'none';
      }
    });
  }
  
  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && instructionsModal.style.display === 'block') {
      instructionsModal.style.display = 'none';
    }
  });
  
  // Initialize the application
  updateVisuals();
  
  // Preload audio
  if (ambientAudio) {
    ambientAudio.load();
  }
  if (burstAudio) {
    burstAudio.load();
  }
};

}