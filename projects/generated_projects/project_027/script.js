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
  const owedByMeInput = document.getElementById('owedByMe');
  const owedToMeInput = document.getElementById('owedToMe');
  const outboundDebtDisplay = document.getElementById('outboundDebt');
  const inboundDebtDisplay = document.getElementById('inboundDebt');
  const netPositionDisplay = document.getElementById('netPosition');

  if (!owedByMeInput || !owedToMeInput || !outboundDebtDisplay || !inboundDebtDisplay || !netPositionDisplay) {
    console.error('Required elements not found');
    return;
  }

  function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
  }

  function updateDashboard() {
    const totalOwedByMe = parseFloat(owedByMeInput.value) || 0;
    const totalOwedToMe = parseFloat(owedToMeInput.value) || 0;
    const netPosition = totalOwedToMe - totalOwedByMe;

    outboundDebtDisplay.textContent = formatCurrency(totalOwedByMe);
    inboundDebtDisplay.textContent = formatCurrency(totalOwedToMe);
    netPositionDisplay.textContent = formatCurrency(netPosition);

    netPositionDisplay.className = 'amount';
    if (netPosition > 0) {
      netPositionDisplay.classList.add('net-positive');
    } else if (netPosition < 0) {
      netPositionDisplay.classList.add('net-negative');
    } else {
      netPositionDisplay.classList.add('net-neutral');
    }
  }

  owedByMeInput.addEventListener('input', updateDashboard);
  owedToMeInput.addEventListener('input', updateDashboard);

  updateDashboard();
}