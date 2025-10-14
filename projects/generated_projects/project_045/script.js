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
    const sentenceCorpus = [
        "The lighthouse keeper's cat refused to eat fish on Tuesdays.",
        "Margaret discovered that her grandmother's recipe called for exactly seventeen cloves.",
        "The subway musician played the same melody for three decades without knowing its name.",
        "Every morning at 6:47 AM, the traffic light on Elm Street stays yellow for an extra second.",
        "The library's oldest book contains a pressed flower from 1892.",
        "Dr. Chen's patients always complimented his unusual collection of vintage door knobs.",
        "The bakery on Fifth Avenue sells exactly 127 croissants every Thursday.",
        "Sarah's dreams were always in black and white until she turned thirty-five.",
        "The museum's security guard secretly rearranged the modern art when no one was looking.",
        "A single red balloon has been trapped in the airport's ceiling for eight months.",
        "The clockmaker's workshop contained 400 timepieces, but none showed the correct time.",
        "Every full moon, Mrs. Peterson's roses grew an inch taller overnight.",
        "The taxi driver collected lost buttons from his backseat in a mason jar.",
        "The university's chemistry lab smelled perpetually of cinnamon and regret.",
        "A family of raccoons held weekly meetings in the abandoned shopping mall.",
        "The fortune teller's crystal ball was actually a paperweight from a garage sale.",
        "The town's only stop sign was installed backwards and nobody ever corrected it.",
        "Professor Williams discovered that his students learned better when he wore mismatched socks.",
        "The old theater's ghost only appeared during romantic comedies.",
        "A message in a bottle washed ashore every Tuesday for six consecutive weeks.",
        "The ice cream truck's melody was composed by a failed opera singer in 1963.",
        "The janitor at City Hall had been using the same mop for twelve years.",
        "A murder of crows gathered every sunset to judge the local scarecrow competition.",
        "The antique shop owner's parrot spoke only in Shakespearean insults.",
        "The bridge's thirteenth step creaked in the key of B-flat.",
        "A time capsule buried in 1975 contained nothing but rubber bands and optimism.",
        "The diner's coffee machine played jazz music when it needed cleaning.",
        "Every photograph taken in the town square came out slightly blurry on the left side.",
        "The mailman delivered letters to a house that had been demolished five years ago.",
        "A colony of bees built their hive in the shape of a perfect question mark."
    ];

    function getRandomSentences() {
        const numSentences = Math.random() < 0.5 ? 2 : 3;
        const selectedSentences = [];
        const usedIndices = new Set();
        
        while (selectedSentences.length < numSentences) {
            const randomIndex = Math.floor(Math.random() * sentenceCorpus.length);
            if (!usedIndices.has(randomIndex)) {
                usedIndices.add(randomIndex);
                selectedSentences.push(sentenceCorpus[randomIndex]);
            }
        }
        
        return selectedSentences;
    }

    function displaySentences() {
        const sentences = getRandomSentences();
        const displayDiv = document.getElementById('sentence-display');
        
        if (displayDiv) {
            displayDiv.innerHTML = '';
            
            sentences.forEach(sentence => {
                const p = document.createElement('p');
                p.textContent = sentence;
                displayDiv.appendChild(p);
            });
        }
    }

    const generateButton = document.getElementById('generate-button');
    if (generateButton) {
        generateButton.addEventListener('click', displaySentences);
    }

    displaySentences();
}