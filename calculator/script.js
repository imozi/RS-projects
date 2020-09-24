const previousOperandInput = document.querySelector("[data-previous-operand]");
const currentOperandInput = document.querySelector("[data-current-operand]");
const resultationInput = document.querySelector("[data-resultation]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const plusMinusBtn = document.querySelector("[data-plus-minus]");
const squareRootBtn = document.querySelector("[data-square-root]");
const equalsBtn = document.querySelector("[data-equals]");
const operationBtn = document.querySelectorAll("[data-operation]");
const numberBtn = document.querySelectorAll("[data-number]");

numberBtn.forEach((e) => {
  e.addEventListener("click", () => {
    calculator.setValue(e.textContent);
    calculator.updateDisplay();
    e.blur()
  });
});

operationBtn.forEach((e) => {
  e.addEventListener("click", () => {
    calculator.setOperation(e.textContent);
    calculator.updateDisplay();
    e.blur();
  });
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
  allClearBtn.blur();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
  deleteBtn.blur();
});

plusMinusBtn.addEventListener("click", () => {
  calculator.plusMinus();
  calculator.updateDisplay();
})

squareRootBtn.addEventListener("click", () => {
  calculator.squareRoot();
  calculator.updateDisplay();
  squareRootBtn.blur();
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  equalsBtn.blur()
})
