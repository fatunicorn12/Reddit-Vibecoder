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
  const generateButton = document.getElementById('generateButton');
  const scenarioOutput = document.getElementById('scenarioOutput');
  const sparkCanvas = document.getElementById('sparkCanvas');
  
  if (!generateButton || !scenarioOutput || !sparkCanvas) {
    console.error('Required elements not found');
    return;
  }
  
  const ctx = sparkCanvas.getContext('2d');
  
  const scenarios = [
    "What if you had said yes that day?",
    "What if that message had been sent?",
    "What if paths crossed again at the perfect moment?",
    "What if the timing had been different?",
    "What if you had stayed just five minutes longer?",
    "What if that conversation had continued?",
    "What if courage had outweighed fear?",
    "What if the stars had aligned differently?",
    "What if that door had opened instead of closed?",
    "What if you had followed your heart?",
    "What if distance wasn't a barrier?",
    "What if that spark had ignited into flame?",
    "What if second chances were first chances?",
    "What if the universe conspired to reunite you?",
    "What if that moment could be lived again?"
  ];
  
  let animationId;
  let particles = [];
  
  function createParticles() {
    particles = [];
    const centerX = sparkCanvas.width / 2;
    const centerY = sparkCanvas.height / 2;
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.01,
        size: Math.random() * 4 + 2,
        hue: Math.random() * 60 + 300
      });
    }
  }
  
  function drawSpark() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    
    let aliveParticles = 0;
    
    particles.forEach(particle => {
      if (particle.life <= 0) return;
      
      aliveParticles++;
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      const alpha = Math.max(0, particle.life);
      ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${particle.hue}, 100%, 60%)`;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
    });
    
    if (aliveParticles > 0) {
      animationId = requestAnimationFrame(drawSpark);
    }
  }
  
  function generateSpark() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    scenarioOutput.textContent = randomScenario;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    
    createParticles();
    drawSpark();
  }
  
  generateButton.addEventListener('click', generateSpark);
  
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect(0, 0, sparkCanvas.width, sparkCanvas.height);
}