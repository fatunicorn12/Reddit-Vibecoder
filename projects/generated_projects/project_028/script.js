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
  const initialDebtInput = document.getElementById('initial-debt');
  const currentDebtInput = document.getElementById('current-debt');
  const monthlyPaymentInput = document.getElementById('monthly-payment');
  const calculateBtn = document.getElementById('calculate-btn');
  const monthsPassedSpan = document.getElementById('months-passed');
  const remainingBalanceSpan = document.getElementById('remaining-balance');
  const estimatedMonthsSpan = document.getElementById('estimated-months');
  const progressFillDiv = document.getElementById('progress-fill');
  const progressPercentageSpan = document.getElementById('progress-percentage');

  if (!initialDebtInput || !currentDebtInput || !monthlyPaymentInput || !calculateBtn || 
      !monthsPassedSpan || !remainingBalanceSpan || !estimatedMonthsSpan || 
      !progressFillDiv || !progressPercentageSpan) {
    console.error('Required elements not found');
    return;
  }

  calculateBtn.addEventListener('click', function() {
    const initialTotalDebt = parseFloat(initialDebtInput.value);
    const currentRemainingDebt = parseFloat(currentDebtInput.value);
    const monthlyPayment = parseFloat(monthlyPaymentInput.value);

    // Input validation
    if (isNaN(initialTotalDebt) || isNaN(currentRemainingDebt) || isNaN(monthlyPayment)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }

    if (initialTotalDebt < 0 || currentRemainingDebt < 0 || monthlyPayment <= 0) {
      alert('Please enter positive numbers. Monthly payment must be greater than 0.');
      return;
    }

    if (currentRemainingDebt > initialTotalDebt) {
      alert('Current remaining debt cannot be greater than initial total debt.');
      return;
    }

    // Calculations
    const debtPaidOff = initialTotalDebt - currentRemainingDebt;
    const monthsPassed = monthlyPayment > 0 ? debtPaidOff / monthlyPayment : 0;
    const totalMonthsToClear = monthlyPayment > 0 ? initialTotalDebt / monthlyPayment : 0;
    
    let progressPercentage;
    if (initialTotalDebt === 0) {
      progressPercentage = debtPaidOff === 0 ? 100 : 0;
    } else {
      progressPercentage = (debtPaidOff / initialTotalDebt) * 100;
    }

    // Update UI
    monthsPassedSpan.textContent = monthsPassed.toFixed(1);
    remainingBalanceSpan.textContent = '$' + currentRemainingDebt.toFixed(2);
    estimatedMonthsSpan.textContent = totalMonthsToClear.toFixed(1);
    progressFillDiv.style.width = progressPercentage.toFixed(1) + '%';
    progressPercentageSpan.textContent = progressPercentage.toFixed(1) + '%';
  });
}