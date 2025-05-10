document.addEventListener("DOMContentLoaded", () => {
  const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function updateDisplay() {
    const display = document.querySelector(".calculator-screen");
    display.value = calculator.displayValue;
  }

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
        displayValue === "0" ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator, waitingForSecondOperand } =
      calculator;
    const inputValue = parseFloat(displayValue);

    if (nextOperator === "%") {
      calculator.displayValue = String(inputValue / 100);
      return;
    }

    if (operator && waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);

      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }

  const performCalculation = {
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,
    "%": (firstOperand, secondOperand) => firstOperand * (secondOperand / 100), // Percentage in operations
  };

  function deleteLastDigit() {
    const { displayValue } = calculator;

    if (displayValue.length > 1) {
      calculator.displayValue = displayValue.slice(0, -1);
    } else {
      calculator.displayValue = "0";
    }
  }

  function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay();
  }

  const keys = document.querySelector(".calculator-keys");
  keys.addEventListener("click", (event) => {
    const { target } = event;

    if (!target.matches("button")) {
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    if (target.value === "all-clear") {
      resetCalculator();
      return;
    }

    if (target.value === "delete") {
      deleteLastDigit();
      updateDisplay();
      return;
    }

    if (target.value === ".") {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  });

  updateDisplay();
});
