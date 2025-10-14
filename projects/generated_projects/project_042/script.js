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
  const inputText = document.getElementById('input-text');
  const interpretBtn = document.getElementById('interpret-btn');
  const outputText = document.getElementById('output-text');
  
  if (!inputText || !interpretBtn || !outputText) {
    console.error('Required elements not found');
    return;
  }

  const interpretations = {
    'literally': 'a sacred incantation of absolute truth and precision',
    'I can\'t even': 'a mathematical expression indicating computational limitations',
    'this slaps': 'a reference to ancient physical punishment rituals, indicating approval',
    'no cap': 'a clothing regulation indicating hatless communication',
    'it\'s giving': 'a ceremonial gift-exchange protocol',
    'slay': 'evidence of widespread violent conquest culture',
    'periodt': 'obsession with menstrual cycles and punctuation',
    'that\'s fire': 'indication of frequent combustion events in daily life',
    'lowkey': 'a primitive encryption method using musical terminology',
    'highkey': 'the advanced form of their crude cryptographic system',
    'sus': 'shortened form of "sustainable," showing environmental consciousness',
    'bet': 'evidence of a gambling-based economy',
    'facts': 'redundant emphasis suggesting widespread misinformation',
    'deadass': 'anatomical reference to posterior mortality',
    'vibes': 'primitive understanding of sound wave physics',
    'mood': 'emotional state documentation for historical record',
    'stan': 'worship of an unknown deity named Stan',
    'tea': 'obsessive beverage consumption culture',
    'shade': 'preoccupation with solar protection and shadows',
    'woke': 'past tense of awakening, indicating chronic sleep disorders',
    '💀': 'death imagery suggesting high mortality rates',
    '😂': 'crying faces indicate widespread sadness despite smiling',
    '🔥': 'fire symbols confirm frequent combustion references',
    '💯': 'mathematical obsession with the number 100',
    '👀': 'eye symbols suggest surveillance state',
    '🤡': 'clown imagery indicates circus-based society',
    '💅': 'nail care was apparently central to their civilization',
    'bruh': 'familial address system for male siblings',
    'bestie': 'superlative friendship ranking system',
    'iconic': 'everything was apparently represented by small pictures'
  };

  function generateInterpretation(text) {
    if (!text.trim()) {
      return 'No textual evidence provided for analysis.';
    }

    let interpretedText = text;
    
    for (const [phrase, interpretation] of Object.entries(interpretations)) {
      const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      interpretedText = interpretedText.replace(regex, `[${interpretation}]`);
    }

    const reportTemplate = `
      <p class="interpretation">
        <strong>Date of Analysis:</strong> 3087 CE<br>
        <strong>Archaeological Team:</strong> Digital Linguistics Division<br><br>
        
        <strong>Transcription of Digital Fragment:</strong><br>
        "${interpretedText}"<br><br>
        
        <strong>Preliminary Analysis:</strong><br>
        This fragment provides fascinating insight into the highly ritualistic and literal communication patterns of early 21st century digital inhabitants. The frequent references to violence, death, and physical sensations suggest a civilization in constant peril, yet paradoxically obsessed with entertainment and social hierarchies.<br><br>
        
        <strong>Cultural Implications:</strong><br>
        The literal interpretation of these symbols reveals a society that documented every emotional state, maintained complex ranking systems for relationships, and possessed an unusual fixation on combustion, mortality, and mathematical precision. Further study is recommended to understand how they survived with such apparent chaos in their daily communications.
      </p>
    `;

    return reportTemplate;
  }

  interpretBtn.addEventListener('click', function() {
    const userInput = inputText.value;
    const interpretation = generateInterpretation(userInput);
    outputText.innerHTML = interpretation;
  });

  inputText.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      interpretBtn.click();
    }
  });
}