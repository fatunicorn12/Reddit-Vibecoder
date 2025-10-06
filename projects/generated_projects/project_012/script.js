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
function initApp() {
    // --------------------------------------------------------------------
    // 4. JavaScript - Breathing Exercise
    // --------------------------------------------------------------------
    const breathingInstruction = document.getElementById('breathing-instruction');
    const breathingVisual = document.getElementById('breathing-visual');
    const startBreathingBtn = document.getElementById('start-breathing-btn');
    const stopBreathingBtn = document.getElementById('stop-breathing-btn');

    let breathingIntervalId = null;
    let breathingTimeoutId = null;
    let breathingPhaseIndex = 0;

    const breathingPhases = [
        { instruction: 'Breathe In', duration: 4000, visualClass: 'scale-up' },
        { instruction: 'Hold', duration: 2000, visualClass: '' },
        { instruction: 'Breathe Out', duration: 6000, visualClass: 'scale-down' },
        { instruction: 'Hold', duration: 2000, visualClass: '' }
    ];
    const totalCycleDuration = breathingPhases.reduce((acc, phase) => acc + phase.duration, 0);

    const cycleBreathing = () => {
        const currentPhase = breathingPhases[breathingPhaseIndex];
        breathingInstruction.textContent = currentPhase.instruction;

        // Remove all previous scale classes
        breathingVisual.classList.remove('scale-up', 'scale-down');
        // Add the animation class if not already there, and then the specific phase class
        breathingVisual.classList.add('breathing-animation');
        if (currentPhase.visualClass) {
            breathingVisual.classList.add(currentPhase.visualClass);
        }

        breathingTimeoutId = setTimeout(() => {
            breathingPhaseIndex = (breathingPhaseIndex + 1) % breathingPhases.length;
            // The interval will call cycleBreathing again after totalCycleDuration
            // For smoother continuous animation, cycleBreathing itself handles the next step.
            // But we need to ensure the animation completes before resetting for the next phase,
            // which setInterval handles by re-triggering the whole cycle logic.
            // We just need to manage the CSS classes correctly.
            // The `totalCycleDuration` in setInterval ensures the entire sequence repeats.
        }, currentPhase.duration); // Set timeout for the current phase's duration
    };

    const startBreathing = () => {
        if (breathingIntervalId) {
            clearInterval(breathingIntervalId);
            clearTimeout(breathingTimeoutId);
        }
        breathingPhaseIndex = 0; // Reset to start
        breathingVisual.classList.add('breathing-animation');
        
        // Call immediately for the first phase, then set interval for subsequent full cycles
        cycleBreathing();
        breathingIntervalId = setInterval(() => {
            // This interval will re-trigger the entire sequence after the total cycle duration.
            // However, the internal timeouts in `cycleBreathing` manage individual phase transitions.
            // We need to ensure that `cycleBreathing` transitions correctly.
            // Let's refine the logic for the interval to correctly restart the sequence.
            // Instead of cycling within `cycleBreathing` then letting `setInterval` call it,
            // `setInterval` should just trigger the *next* phase, which naturally cycles.
            // So, cycleBreathing should not be recursive with setTimeout, but just perform one step.

            // Resetting for a cleaner continuous cycle
            clearTimeout(breathingTimeoutId);
            cycleBreathing();
        }, totalCycleDuration); // The interval should trigger the start of a new *full cycle* after the duration of one full cycle.

        // Corrected logic for continuous breathing:
        // The `setInterval` should not call `cycleBreathing` directly with `totalCycleDuration`.
        // Instead, `cycleBreathing` should manage its own sequence of phases using `setTimeout`.
        // And `setInterval` is just to initially kick it off, or it's not needed if `setTimeout` links phases.

        // A better approach for continuous cycle:
        // `cycleBreathing` is called, it sets an instruction and class, then schedules itself again after `currentPhase.duration`.
        const startBreathingLoop = () => {
            if (breathingTimeoutId) clearTimeout(breathingTimeoutId);
            const currentPhase = breathingPhases[breathingPhaseIndex];
            breathingInstruction.textContent = currentPhase.instruction;

            breathingVisual.classList.remove('scale-up', 'scale-down');
            breathingVisual.classList.add('breathing-animation'); // Ensure transition is active
            if (currentPhase.visualClass) {
                breathingVisual.classList.add(currentPhase.visualClass);
            } else {
                // If no specific class, ensure it returns to base size after scale-down
                // or remains at base size after hold.
                breathingVisual.style.transform = 'scale(1)';
            }


            breathingTimeoutId = setTimeout(() => {
                breathingPhaseIndex = (breathingPhaseIndex + 1) % breathingPhases.length;
                startBreathingLoop(); // Call itself for the next phase
            }, currentPhase.duration);
        };

        breathingPhaseIndex = 0;
        breathingVisual.classList.add('breathing-animation');
        startBreathingLoop();
    };

    const stopBreathing = () => {
        if (breathingIntervalId) { // This variable is not used in the corrected loop, clearing it has no effect.
            clearInterval(breathingIntervalId);
        }
        if (breathingTimeoutId) {
            clearTimeout(breathingTimeoutId);
        }
        breathingInstruction.textContent = 'Press Start to begin';
        breathingVisual.classList.remove('scale-up', 'scale-down', 'breathing-animation');
        breathingVisual.style.transform = 'scale(1)'; // Ensure it resets to original size
        breathingPhaseIndex = 0; // Reset for next start
    };

    startBreathingBtn.addEventListener('click', startBreathing);
    stopBreathingBtn.addEventListener('click', stopBreathing);

    // --------------------------------------------------------------------
    // 5. JavaScript - Venting Space
    // --------------------------------------------------------------------
    const ventingTextarea = document.getElementById('venting-textarea');
    const clearVentBtn = document.getElementById('clear-vent-btn');

    clearVentBtn.addEventListener('click', () => {
        ventingTextarea.value = '';
    });

    // --------------------------------------------------------------------
    // 6. JavaScript - Mood Logging
    // --------------------------------------------------------------------
    const moodRadios = document.querySelectorAll('#mood-selection input[name="mood"]');
    const moodNoteTextarea = document.getElementById('mood-note-textarea');
    const saveMoodBtn = document.getElementById('save-mood-btn');
    const moodLogsDisplay = document.getElementById('mood-logs-display');

    const saveMood = () => {
        let selectedMood = '';
        for (const radio of moodRadios) {
            if (radio.checked) {
                selectedMood = radio.value;
                break;
            }
        }

        const moodNote = moodNoteTextarea.value.trim();
        const currentDate = new Date().toLocaleString();

        if (!selectedMood) {
            alert('Please select a mood!');
            return;
        }

        let moodLogs = JSON.parse(localStorage.getItem('moodLogs') || '[]');
        const newMoodEntry = {
            date: currentDate,
            mood: selectedMood,
            note: moodNote
        };
        moodLogs.push(newMoodEntry);
        localStorage.setItem('moodLogs', JSON.stringify(moodLogs));

        // Reset inputs
        for (const radio of moodRadios) {
            if (radio.value === 'Neutral') { // Set Neutral as default after saving
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        }
        moodNoteTextarea.value = '';

        displayMoodLogs();
    };

    const displayMoodLogs = () => {
        moodLogsDisplay.innerHTML = ''; // Clear current content
        const moodLogs = JSON.parse(localStorage.getItem('moodLogs') || '[]');

        if (moodLogs.length === 0) {
            const noLogsMessage = document.createElement('p');
            noLogsMessage.textContent = 'No mood logs yet. Save your first mood!';
            noLogsMessage.style.textAlign = 'center';
            noLogsMessage.style.color = '#777';
            moodLogsDisplay.appendChild(noLogsMessage);
            return;
        }

        // Display logs, newest first
        [...moodLogs].reverse().forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('mood-entry');

            const dateP = document.createElement('p');
            dateP.classList.add('mood-date');
            dateP.textContent = `Date: ${entry.date}`;

            const moodP = document.createElement('p');
            moodP.textContent = `Mood: ${entry.mood}`;

            entryDiv.appendChild(dateP);
            entryDiv.appendChild(moodP);

            if (entry.note) {
                const noteP = document.createElement('p');
                noteP.classList.add('mood-text');
                noteP.textContent = `Note: ${entry.note}`;
                entryDiv.appendChild(noteP);
            }

            moodLogsDisplay.appendChild(entryDiv);
        });
    };

    saveMoodBtn.addEventListener('click', saveMood);

    // Call displayMoodLogs once when script.js loads to show any previously saved logs.
    displayMoodLogs();
}