class Calculator {
  constructor(previousOperandInput, currentOperandInput, resultationInput) {
    this.previousOperandInput = previousOperandInput;
    this.currentOperandInput = currentOperandInput;
    this.resultationInput = resultationInput;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.resultation = "";
    this.operation = null;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  setOperation(operation) {
    if (this.previousOperand !== "" && this.operation !== operation) {
      this.operation = operation;
      return;
    }

    if (this.resultation !== "") {
      this.previousOperand = this.resultation;
      this.operation = operation;
      this.resultation = "";
      return;
    }

    if (this.operation === operation) return;
    if (this.currentOperand === "") return;

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  setValue(value) {
    if (value === undefined) return;
    if (value === "." && this.currentOperand === "") return;
    if (value === "." && this.currentOperand.includes(".")) return;

    if (this.currentOperand === "0" && value !== ".") {
      this.delete();
    }

    if (this.resultation !== "") {
      this.currentOperand = `${
        this.currentOperand.toString() + value.toString()
      }`;
      this.resultation = "";
      return;
    }

    this.currentOperand = `${
      this.currentOperand.toString() + value.toString()
    }`;
  }

  compute() {
    if (!this.previousOperand && !this.operation) return;

    let computation = null;

    const prevOperand = parseFloat(this.previousOperand);
    const currOperand = parseFloat(this.currentOperand);

    if (isNaN(prevOperand) || isNaN(currOperand)) return;

    switch (this.operation) {
      case "+":
        computation = prevOperand + currOperand;
        break;
      case "-":
        computation = prevOperand - currOperand;
        break;
      case "*":
        computation = prevOperand * currOperand;
        break;
      case "÷":
        computation = prevOperand / currOperand;
        break;
      default:
        return;
    }

    this.resultation = Number(computation.toFixed(7));
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandInput.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    this.resultationInput.textContent =
      this.resultation === "Error!"
        ? "Error!"
        : this.getDisplayNumber(this.resultation);

    if (this.operation !== null) {
      this.previousOperandInput.textContent = `${
        this.operation === "xⁿ"
          ? this.getDisplayNumber(this.previousOperand) + "ⁿ"
          : this.getDisplayNumber(this.previousOperand) + this.operation
      }`;
    } else {
      this.previousOperandInput.textContent = "";
    }
  }
}
