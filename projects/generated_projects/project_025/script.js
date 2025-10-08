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
  const canvas = document.getElementById('grimeCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const BRUSH_SIZE = 30;
  
  let isWiping = false;
  
  // Set canvas dimensions
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  
  function initializeCanvas() {
    // Draw clean background (gradient from light blue to white)
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#F0F8FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Add some decorative elements to the clean surface
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(150, 100, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(400, 250, 80, 60);
    
    ctx.fillStyle = '#4ECDC4';
    ctx.beginPath();
    ctx.arc(300, 200, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw grime layer over everything
    ctx.fillStyle = 'rgba(101, 67, 33, 0.8)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Add texture to grime layer
    ctx.fillStyle = 'rgba(139, 90, 43, 0.6)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * CANVAS_WIDTH;
      const y = Math.random() * CANVAS_HEIGHT;
      const size = Math.random() * 3 + 1;
      ctx.fillRect(x, y, size, size);
    }
  }
  
  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  
  function wipeAt(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_SIZE, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
  
  // Mouse event listeners
  canvas.addEventListener('mousedown', (e) => {
    isWiping = true;
    const pos = getMousePos(e);
    wipeAt(pos.x, pos.y);
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (!isWiping) return;
    const pos = getMousePos(e);
    wipeAt(pos.x, pos.y);
  });
  
  canvas.addEventListener('mouseup', () => {
    isWiping = false;
  });
  
  canvas.addEventListener('mouseleave', () => {
    isWiping = false;
  });
  
  // Touch support for mobile
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isWiping = true;
    const touch = e.touches[0];
    const pos = getMousePos(touch);
    wipeAt(pos.x, pos.y);
  });
  
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isWiping) return;
    const touch = e.touches[0];
    const pos = getMousePos(touch);
    wipeAt(pos.x, pos.y);
  });
  
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    isWiping = false;
  });
  
  // Initialize the canvas
  initializeCanvas();
}