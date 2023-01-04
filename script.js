// Référence aux éléments de la page HTML
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

// État de la calculatrice
let firstOperand = null;
let operator = null;
let awaitingNextOperand = false;

// Mise à jour de l'affichage de la calculatrice
function updateDisplay(value) {
  display.textContent = value;
}

// Gestion des opérateurs
function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.textContent);

  if (operator && awaitingNextOperand) {
    operator = nextOperator;
    return;
  }

  if (!firstOperand) {
    firstOperand = inputValue;
  } else {
    const result = performCalculation[operator](firstOperand, inputValue);

    updateDisplay(result);
    firstOperand = result;
  }

  operator = nextOperator;
  awaitingNextOperand = true;
}

// Effectue les calculs
const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

// Gestion des boutons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      firstOperand = null;
      operator = null;
      awaitingNextOperand = false;
      updateDisplay(0);
      return;
    }

    if (value === '+/-') {
      updateDisplay(display.textContent * -1);
      return;
    }

    if (value === '%') {
      updateDisplay(display.textContent / 100);
      return;
    }

    if (operators.indexOf(value) !== -1) {
      handleOperator(value);
      return;
    }

    if (awaitingNextOperand) {
      updateDisplay(value);
      awaitingNextOperand = false;
      return;
    }

    updateDisplay(display.textContent === '0' ? value : display.textContent + value);
  });
});
