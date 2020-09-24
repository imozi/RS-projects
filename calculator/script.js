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

const keyCodeNumpad = {
  number: [
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "NumpadDecimal",
  ],
  operation: ["NumpadAdd", "NumpadSubtract", "NumpadMultiply", "NumpadDivide"],
  delete: ["Backspace"],
  compute: ["NumpadEnter"],
};

const calculator = new Calculator(
  previousOperandInput,
  currentOperandInput,
  resultationInput
);

const getValueOfKeyCode = (keycode) => {
    switch (keycode) {
      case "Numpad0":
        return "0";
      case "Numpad1":
        return "1";
      case "Numpad2":
        return "2";
      case "Numpad3":
        return "3";
      case "Numpad4":
        return "4";
      case "Numpad5":
        return "5";
      case "Numpad6":
        return "6";
      case "Numpad7":
        return "7";
      case "Numpad8":
        return "8";
      case "Numpad9":
        return "9";
      case "NumpadDecimal":
        return "."
    }
};

const getOperationOfKeyCode = (keycode) => {
  switch (keycode) {
    case "NumpadAdd":
      return "+";
    case "NumpadSubtract":
      return "-";
    case "NumpadMultiply":
      return "*";
    case "NumpadDivide":
      return "÷";
  }
};

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


document.addEventListener("keyup", (evt) => {
 if (keyCodeNumpad.number.includes(evt.code)) {
   calculator.setValue(getValueOfKeyCode(evt.code));
 }

 if (keyCodeNumpad.operation.includes(evt.code)) {
   calculator.setOperation(getOperationOfKeyCode(evt.code));
 }

 if (keyCodeNumpad.compute.includes(evt.code)) {
   calculator.compute();
 }

 if (keyCodeNumpad.delete.includes(evt.code)) {
   calculator.delete();
 }
  
  calculator.updateDisplay();
});

