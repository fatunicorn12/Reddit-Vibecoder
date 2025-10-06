document.addEventListener("DOMContentLoaded", () => {
  console.log("Base template loaded");

  // App placeholder
  initApp();
});

function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = "<p>This is the base template. Gemini will add features here.</p>";
}

// Gemini Generated
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    const scamKeywords = {
      'urgent transfer': 10,
      'inheritance': 7,
      'lottery winner': 8,
      'prince': 5,
      'bank account': 6,
      'send money': 10,
      'western union': 9,
      'tax customs fee': 8,
      'stranded': 7,
      'secret deal': 6,
      'investment opportunity': 5,
      'wire transfer': 9
    };

    const storyInput = document.getElementById('storyInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const redFlagsOutput = document.getElementById('redFlagsOutput');
    const scoreOutput = document.getElementById('scoreOutput');

    analyzeButton.addEventListener('click', analyzeStory);

    function analyzeStory() {
      const story = storyInput.value.toLowerCase();
      let scamScore = 0;
      const detectedFlags = [];

      for (const keyword in scamKeywords) {
        if (story.includes(keyword)) {
          scamScore += scamKeywords[keyword];
          detectedFlags.push(keyword);
        }
      }

      let flagsHtml = '<strong>Detected Red Flags:</strong> ';
      if (detectedFlags.length > 0) {
        flagsHtml += detectedFlags.map(flag => `<span style="color: red;">${flag}</span>`).join(', ') + '.';
      } else {
        flagsHtml += 'None detected.';
      }
      redFlagsOutput.innerHTML = flagsHtml;

      const maxPossibleScore = Object.values(scamKeywords).reduce((a, b) => a + b, 0);
      scoreOutput.innerHTML = `<strong>Scam Likelihood Score:</strong> ${scamScore} / ${maxPossibleScore} (Higher score indicates higher likelihood).`;
    }
}