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
  // Claude will inject initialization code here
}