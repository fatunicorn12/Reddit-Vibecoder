document.addEventListener("DOMContentLoaded", () => {
  console.log("Base template loaded");

  // Only show placeholder if app container is empty
  const app = document.getElementById("app");
  if (app && app.innerHTML.trim() === "") {
    initApp();
  }
});


// Claude Generated
function initApp() {
  const loanAmountInput = document.getElementById('loanAmount');
  const interestRateInput = document.getElementById('interestRate');
  const monthlyPaymentInput = document.getElementById('monthlyPayment');
  const calculateBtn = document.getElementById('calculateBtn');
  const errorMessage = document.getElementById('errorMessage');
  const loanFreeDate = document.getElementById('loanFreeDate');
  const totalInterest = document.getElementById('totalInterest');
  const monthsToPayOff = document.getElementById('monthsToPayOff');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  if (!loanAmountInput || !interestRateInput || !monthlyPaymentInput || !calculateBtn) {
    console.error('Required input elements not found');
    return;
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }

  function hideError() {
    errorMessage.style.display = 'none';
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function calculateRepayment() {
    hideError();

    const loanAmount = parseFloat(loanAmountInput.value);
    const annualInterestRate = parseFloat(interestRateInput.value);
    const monthlyPayment = parseFloat(monthlyPaymentInput.value);

    // Input validation
    if (!loanAmount || !annualInterestRate || !monthlyPayment) {
      showError('Please fill in all fields with valid numbers.');
      return;
    }

    if (loanAmount <= 0) {
      showError('Loan amount must be greater than 0.');
      return;
    }

    if (annualInterestRate < 0) {
      showError('Interest rate cannot be negative.');
      return;
    }

    if (monthlyPayment <= 0) {
      showError('Monthly payment must be greater than 0.');
      return;
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const initialMonthlyInterest = loanAmount * monthlyInterestRate;

    if (monthlyPayment <= initialMonthlyInterest) {
      showError('Monthly payment must be greater than the initial monthly interest payment of ' + formatCurrency(initialMonthlyInterest));
      return;
    }

    // Initialize calculation variables
    let currentBalance = loanAmount;
    let totalInterestPaid = 0;
    let monthsTaken = 0;
    const initialLoanAmount = loanAmount;

    // Calculate repayment
    while (currentBalance > 0.01 && monthsTaken < 10000) {
      const interestPayment = currentBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      if (principalPayment > currentBalance) {
        totalInterestPaid += currentBalance * monthlyInterestRate;
        currentBalance = 0;
      } else {
        currentBalance -= principalPayment;
        totalInterestPaid += interestPayment;
      }
      
      monthsTaken++;
    }

    if (monthsTaken >= 10000) {
      showError('Loan cannot be paid off with these parameters within a reasonable timeframe.');
      return;
    }

    // Calculate results
    const today = new Date();
    const estimatedLoanFreeDate = new Date(today.getFullYear(), today.getMonth() + monthsTaken, today.getDate());
    const percentagePaid = Math.min(100, ((initialLoanAmount - currentBalance) / initialLoanAmount) * 100);

    // Update display
    if (loanFreeDate) loanFreeDate.textContent = formatDate(estimatedLoanFreeDate);
    if (totalInterest) totalInterest.textContent = formatCurrency(totalInterestPaid);
    if (monthsToPayOff) monthsToPayOff.textContent = monthsTaken + ' months (' + Math.round(monthsTaken / 12 * 10) / 10 + ' years)';
    
    if (progressFill) {
      progressFill.style.width = percentagePaid + '%';
    }
    
    if (progressText) {
      progressText.textContent = Math.round(percentagePaid) + '% Complete';
    }
  }

  calculateBtn.addEventListener('click', calculateRepayment);

  // Allow Enter key to trigger calculation
  [loanAmountInput, interestRateInput, monthlyPaymentInput].forEach(input => {
    if (input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          calculateRepayment();
        }
      });
    }
  });
}