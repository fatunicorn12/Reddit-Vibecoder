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
  const mainFocusInput = document.getElementById('mainFocus');
  const secondaryTasksInput = document.getElementById('secondaryTasks');
  const uglyTaskInput = document.getElementById('uglyTask');
  const generatePlanBtn = document.getElementById('generatePlanBtn');
  const resetBtn = document.getElementById('resetBtn');
  const planOutputDiv = document.getElementById('planOutput');

  if (!mainFocusInput || !secondaryTasksInput || !uglyTaskInput || !generatePlanBtn || !resetBtn || !planOutputDiv) {
    console.error('Required elements not found');
    return;
  }

  generatePlanBtn.addEventListener('click', function() {
    const mainFocus = mainFocusInput.value.trim();
    const secondaryTasks = secondaryTasksInput.value.trim();
    const uglyTask = uglyTaskInput.value.trim();

    if (!mainFocus && !secondaryTasks && !uglyTask) {
      planOutputDiv.innerHTML = '<p style="color: #e74c3c; text-align: center;">Please fill in at least one field to generate a plan.</p>';
      planOutputDiv.classList.add('visible');
      return;
    }

    let planHTML = '<div class="generated-plan">';

    if (mainFocus) {
      planHTML += `<h2>🎯 Today's Main Focus</h2><p>${mainFocus}</p>`;
    }

    if (uglyTask) {
      planHTML += `<h3>🔥 Tackle This Early</h3><p>${uglyTask}</p>`;
    }

    if (secondaryTasks) {
      planHTML += `<h4>📋 Secondary Tasks</h4><ul>`;
      const tasks = secondaryTasks.split('\n').filter(task => task.trim() !== '');
      tasks.forEach(task => {
        planHTML += `<li>${task.trim()}</li>`;
      });
      planHTML += '</ul>';
    }

    planHTML += '</div>';

    planOutputDiv.innerHTML = planHTML;
    planOutputDiv.classList.add('visible');
  });

  resetBtn.addEventListener('click', function() {
    mainFocusInput.value = '';
    secondaryTasksInput.value = '';
    uglyTaskInput.value = '';
    planOutputDiv.innerHTML = '';
    planOutputDiv.classList.remove('visible');
  });
}