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
  let companyTime = 0;
  let skillsAcquired = 0;
  const skillCostPerClick = 5;
  const offerThresholdSkills = 20;
  let fastestTime = Infinity;

  const companyTimeElement = document.getElementById('companyTime');
  const skillsAcquiredElement = document.getElementById('skillsAcquired');
  const fastestTimeElement = document.getElementById('fastestTime');
  const acquireSkillBtn = document.getElementById('acquireSkillBtn');
  const jobOfferMessage = document.getElementById('jobOfferMessage');
  const restartBtn = document.getElementById('restartBtn');

  if (!companyTimeElement || !skillsAcquiredElement || !fastestTimeElement || 
      !acquireSkillBtn || !jobOfferMessage || !restartBtn) {
    console.error('Required DOM elements not found');
    return;
  }

  function updateDisplay() {
    companyTimeElement.textContent = companyTime;
    skillsAcquiredElement.textContent = skillsAcquired;
    fastestTimeElement.textContent = fastestTime === Infinity ? '--' : fastestTime + ' minutes';
  }

  function acquireSkill() {
    skillsAcquired += 1;
    companyTime += skillCostPerClick;
    updateDisplay();

    if (skillsAcquired >= offerThresholdSkills) {
      acquireSkillBtn.disabled = true;
      
      if (companyTime < fastestTime) {
        fastestTime = companyTime;
      }
      
      jobOfferMessage.textContent = `New Job Offer! Your boss is NOT happy about it. Total time spent: ${companyTime} minutes.`;
      restartBtn.style.display = 'inline-block';
      updateDisplay();
    }
  }

  function restartGame() {
    companyTime = 0;
    skillsAcquired = 0;
    jobOfferMessage.textContent = '';
    acquireSkillBtn.disabled = false;
    restartBtn.style.display = 'none';
    updateDisplay();
  }

  acquireSkillBtn.addEventListener('click', acquireSkill);
  restartBtn.addEventListener('click', restartGame);

  updateDisplay();
}