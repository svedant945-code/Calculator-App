let display = document.getElementById('display');
let displayLabel = document.getElementById('displayLabel');
let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetDisplay = false;
let history = [];
let isDegrees = true;

const basicButtons = document.getElementById('basicButtons');
const scientificButtons = document.getElementById('scientificButtons');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');

// Mode switching
document.getElementById('basicMode').addEventListener('click', () => {
  basicButtons.style.display = 'grid';
  scientificButtons.classList.remove('active');
  historyPanel.classList.remove('active');
  updateModeButtons('basicMode');
});

document.getElementById('scientificMode').addEventListener('click', () => {
  basicButtons.style.display = 'grid';
  scientificButtons.classList.add('active');
  historyPanel.classList.remove('active');
  updateModeButtons('scientificMode');
});

document.getElementById('historyMode').addEventListener('click', () => {
  historyPanel.classList.add('active');
  updateModeButtons('historyMode');
});

function updateModeButtons(active) {
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(active).classList.add('active');
}

// Update display
function updateDisplay() {
  display.value = currentValue;
  if (operator) {
    displayLabel.textContent = `${previousValue} ${operator}`;
  } else {
    displayLabel.textContent = '';
  }
}

// Append number
function appendNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    if (currentValue === '0' && num !== '.') {
      currentValue = num;
    } else if (num === '.' && !currentValue.includes('.')) {
      currentValue += num;
    } else if (num !== '.') {
      currentValue += num;
    }
  }
  updateDisplay();
}

// Append operator
function appendOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
  updateDisplay();
}

// Calculate result
function calculate() {
  if (!operator || shouldResetDisplay) return;

  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }

  addToHistory(`${previousValue} ${operator} ${currentValue} = ${result}`);
  currentValue = result.toString();
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

// Clear display
function clearDisplay() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Backspace
function backspace() {
  currentValue = currentValue.toString().slice(0, -1) || '0';
  updateDisplay();
}

// Toggle sign
function toggleSign() {
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay();
}

// Percent calculation
function percentCalculate() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay();
}

// Square
function calculateSquare() {
  currentValue = Math.pow(parseFloat(currentValue), 2).toString();
  updateDisplay();
}

// Square root
function calculateSquareRoot() {
  currentValue = Math.sqrt(parseFloat(currentValue)).toString();
  updateDisplay();
}

// Reciprocal
function calculateReciprocal() {
  const num = parseFloat(currentValue);
  currentValue = (num !== 0 ? 1 / num : 'Error').toString();
  updateDisplay();
}

// Sine
function calculateSine() {
  const num = parseFloat(currentValue);
  const angle = isDegrees ? (num * Math.PI) / 180 : num;
  currentValue = Math.sin(angle).toFixed(6);
  updateDisplay();
}

// Cosine
function calculateCosine() {
  const num = parseFloat(currentValue);
  const angle = isDegrees ? (num * Math.PI) / 180 : num;
  currentValue = Math.cos(angle).toFixed(6);
  updateDisplay();
}

// Tangent
function calculateTangent() {
  const num = parseFloat(currentValue);
  const angle = isDegrees ? (num * Math.PI) / 180 : num;
  currentValue = Math.tan(angle).toFixed(6);
  updateDisplay();
}

// Logarithm
function calculateLog() {
  currentValue = Math.log10(parseFloat(currentValue)).toFixed(6);
  updateDisplay();
}

// Natural logarithm
function calculateLn() {
  currentValue = Math.log(parseFloat(currentValue)).toFixed(6);
  updateDisplay();
}

// Exponential
function calculateExp() {
  currentValue = Math.exp(parseFloat(currentValue)).toFixed(6);
  updateDisplay();
}

// Append Pi
function appendPi() {
  currentValue = Math.PI.toString();
  shouldResetDisplay = true;
  updateDisplay();
}

// Append E
function appendE() {
  currentValue = Math.E.toString();
  shouldResetDisplay = true;
  updateDisplay();
}

// Factorial
function calculateFactorial() {
  const num = parseInt(currentValue);
  if (num < 0) {
    currentValue = 'Error';
  } else if (num === 0 || num === 1) {
    currentValue = '1';
  } else {
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    currentValue = result.toString();
  }
  updateDisplay();
}

// Toggle Degrees/Radians
function toggleDegRad() {
  isDegrees = !isDegrees;
  displayLabel.textContent = isDegrees ? 'DEG' : 'RAD';
}

// Calculate degrees
function calculateDegrees() {
  currentValue = ((parseFloat(currentValue) * 180) / Math.PI).toFixed(6);
  updateDisplay();
}

// Calculate radians
function calculateRadians() {
  currentValue = ((parseFloat(currentValue) * Math.PI) / 180).toFixed(6);
  updateDisplay();
}

// History
function addToHistory(calculation) {
  history.unshift(calculation);
  if (history.length > 10) history.pop();
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  historyList.innerHTML = history
    .map((item, index) => `<div class="history-item" onclick="useHistoryItem(${index})">${item}</div>`)
    .join('');
}

function useHistoryItem(index) {
  const item = history[index];
  currentValue = item.split('=')[1].trim();
  shouldResetDisplay = true;
  updateDisplay();
}

// Initialize
updateDisplay();