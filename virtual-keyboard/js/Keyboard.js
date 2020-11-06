import language from "./keys/index.js";

export default class {
  constructor(container) {
    this.container = container;
    this.isCapsLock = false;
    this.isShift = false;
    this.language = "EN";
    this.isActive = false;
  }

  templateButton(button) {
    return `
     <button tabindex="-1" data-code="${button.code}" data-shift="${button.shift}" ${
      button.code === "CapsLock" ? `data-active="${this.isCapsLock}"` : ""
    } ${
      button.code === "ShiftLeft" || button.code === "ShiftRight"
        ? `data-active="${this.isShift}"`
        : ""
    }>${button.small}</button>
    `;
  }

  generateKeyboard(lang) {
    const buttons = lang.reduce((a, e) => {
      return (a = a + this.templateButton(e));
    }, ``);

    return `
    <div class="keyboard" data-enable="${this.isActive}">
    <p class="current-lang">${this.language}</p>
      ${buttons}
    </div>
    `;
  }

  lowerCaseUpperCase() {
    this.getButtons();

    if (this.language === "EN") {
      this.buttonsEn.forEach((e) => {
        const old = e.textContent;
        e.textContent = e.dataset.shift;
        e.dataset.shift = old;
      });
    }

    if (this.language === "RU") {
      this.buttonsRu.forEach((e) => {
        const old = e.textContent;
        e.textContent = e.dataset.shift;
        e.dataset.shift = old;
      });
    }
  }

  switchButton() {
    this.buttons.forEach((e) => {
      const old = e.textContent;
      e.textContent = e.dataset.shift;
      e.dataset.shift = old;
    });
  }

  getButtons() {
    const letters = this.container.querySelectorAll(".keyboard button[data-code^='Key']");
    const number = this.container.querySelectorAll(".keyboard button[data-code^='Digit']");
    const minus = this.container.querySelector(".keyboard button[data-code='Minus']");
    const equal = this.container.querySelector(".keyboard button[data-code='Equal']");
    const bracketLeft = this.container.querySelector(".keyboard button[data-code='BracketLeft']");
    const bracketRight = this.container.querySelector(".keyboard button[data-code='BracketRight']");
    const backslash = this.container.querySelector(".keyboard button[data-code='Backslash']");
    const comma = this.container.querySelector(".keyboard button[data-code='Comma']");
    const period = this.container.querySelector(".keyboard button[data-code='Period']");
    const semicolon = this.container.querySelector(".keyboard button[data-code='Semicolon']");
    const quote = this.container.querySelector(".keyboard button[data-code='Quote']");
    const slash = this.container.querySelector(".keyboard button[data-code='Slash']");
    const backquote = this.container.querySelector(".keyboard button[data-code='Backquote']");
    const space = this.container.querySelector(".keyboard button[data-code='Space']");
    const tab = this.container.querySelector(".keyboard button[data-code='Tab']");
    const enter = this.container.querySelector(".keyboard button[data-code='Enter']");
    const caps = this.container.querySelector(".keyboard button[data-code='CapsLock']");
    const backspace = this.container.querySelector(".keyboard button[data-code='Backspace']");
    const shiftLeft = this.container.querySelector(".keyboard button[data-code='ShiftLeft']");
    const shiftRight = this.container.querySelector(".keyboard button[data-code='ShiftRight']");
    const arrowUp = this.container.querySelector(".keyboard button[data-code='ArrowUp']");
    const arrowDown = this.container.querySelector(".keyboard button[data-code='ArrowDown']");
    const arrowLeft = this.container.querySelector(".keyboard button[data-code='ArrowLeft']");
    const arrowRight = this.container.querySelector(".keyboard button[data-code='ArrowRight']");

    this.fullButtons = [
      ...letters,
      ...number,
      minus,
      equal,
      bracketLeft,
      bracketRight,
      backslash,
      comma,
      period,
      semicolon,
      quote,
      slash,
      backquote,
      space,
      tab,
      enter,
      caps,
      backspace,
      shiftLeft,
      shiftRight,
      arrowUp,
      arrowDown,
      arrowLeft,
      arrowRight,
    ];

    this.buttons = [
      ...letters,
      ...number,
      minus,
      equal,
      bracketLeft,
      bracketRight,
      backslash,
      comma,
      period,
      semicolon,
      quote,
      slash,
      backquote,
    ];

    this.buttonsRu = [
      ...letters,
      comma,
      period,
      bracketLeft,
      bracketRight,
      semicolon,
      quote,
      backquote,
    ];

    this.buttonsEn = [...letters];
  }

  setCursorPosition() {
    this.cursorPosition = this.keyboardInput.selectionStart;
  }

  eventsKeyboard() {
    const onClickButtons = () => {
      this.buttons.forEach((e) => e.addEventListener("click", this.printToDisplay.bind(this)));
    };

    const onClickBackspace = (evt) => {
      if (this.isActive) {
        if (
          evt.target.dataset.code === "Backspace" &&
          this.keyboardInput.selectionStart !== this.keyboardInput.selectionEnd
        ) {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(
            0,
            this.keyboardInput.selectionStart
          )}${this.keyboardInput.value.slice(this.keyboardInput.selectionEnd)}`;
          this.keyboardInput.focus();
          return;
        }

        if (evt.target.dataset.code === "Backspace" && this.cursorPosition === 0) {
          this.keyboardInput.focus();
          this.keyboardInput.setSelectionRange(this.cursorPosition, this.cursorPosition);
          return;
        }

        if (evt.target.dataset.code === "Backspace") {
          this.cursorPosition = this.keyboardInput.selectionStart;

          this.keyboardInput.value = `${this.keyboardInput.value.slice(
            0,
            this.cursorPosition - 1
          )}${this.keyboardInput.value.slice(this.cursorPosition)}`;
          this.keyboardInput.focus();
          this.keyboardInput.setSelectionRange(this.cursorPosition - 1, this.cursorPosition - 1);
          this.cursorPosition -= 1;
        }
      }
    };

    const onClickSpace = (evt) => {
      if (this.isActive) {
        if (
          evt.target.dataset.code === "Space" &&
          this.cursorPosition === this.keyboardInput.value.length - 1
        ) {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(0)} `;
          this.setCursorPosition();
          this.keyboardInput.focus();
          return;
        }

        if (evt.target.dataset.code === "Space") {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(
            0,
            this.cursorPosition
          )} ${this.keyboardInput.value.slice(this.cursorPosition)}`;
          this.keyboardInput.focus();
          this.keyboardInput.setSelectionRange(this.cursorPosition + 1, this.cursorPosition + 1);
          this.cursorPosition += 1;
        }
      }
    };

    const onClickEnter = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "Enter" && !this.keyboardInput.value) {
          this.keyboardInput.value = "\n";
          this.setCursorPosition();
          this.keyboardInput.focus();
          return;
        }

        if (
          evt.target.dataset.code === "Enter" &&
          this.cursorPosition === this.keyboardInput.value.length - 1
        ) {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(0)}\n`;
          this.setCursorPosition();
          this.keyboardInput.focus();
          return;
        }

        if (evt.target.dataset.code === "Enter" && this.keyboardInput.value) {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(
            0,
            this.cursorPosition
          )}\n${this.keyboardInput.value.slice(this.cursorPosition).trim()}`;
          this.keyboardInput.focus();
          this.setCursorPosition();
        }
      }
    };

    const onClickTab = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "Tab" && !this.keyboardInput.value) {
          this.keyboardInput.value = "\t";
          this.setCursorPosition();
          this.keyboardInput.focus();
          return;
        }

        if (
          evt.target.dataset.code === "Tab" &&
          this.cursorPosition === this.keyboardInput.value.length - 1
        ) {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(0)}\t`;
          this.setCursorPosition();
          this.keyboardInput.focus();
          return;
        }

        if (evt.target.dataset.code === "Tab" && this.keyboardInput.value) {
          this.keyboardInput.value = `${this.keyboardInput.value.slice(
            0,
            this.cursorPosition
          )}\t${this.keyboardInput.value.slice(this.cursorPosition).trim()}`;
          this.keyboardInput.focus();
          this.setCursorPosition();
        }
      }
    };

    const onClickSwitchLanguage = (evt) => {
      if (this.isActive) {
        if (evt.target.textContent === "RU") {
          this.container.querySelector(".keyboard").remove();

          if (this.isShift) {
            this.isShift = !this.isShift;
          }

          const keyboard = this.generateKeyboard(language.ru);
          this.container.insertAdjacentHTML("beforeend", keyboard);
          this.language = "RU";
          this.container.querySelector(".current-lang").textContent = this.language;

          this.getButtons();
          onClickButtons();

          if (this.isCapsLock) {
            this.lowerCaseUpperCase();
          }

          evt.target.blur();
        }

        if (evt.target.textContent === "EN") {
          this.container.querySelector(".keyboard").remove();

          if (this.isShift) {
            this.isShift = !this.isShift;
          }

          const keyboard = this.generateKeyboard(language.en);
          this.container.insertAdjacentHTML("beforeend", keyboard);
          this.language = "EN";
          this.container.querySelector(".current-lang").textContent = this.language;
          this.getButtons();
          onClickButtons();

          if (this.isCapsLock) {
            this.lowerCaseUpperCase();
          }

          evt.target.blur();
        }
      }
    };

    const onClickCapsLockActive = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "CapsLock") {
          this.isCapsLock = !this.isCapsLock;
          evt.target.dataset.active = this.isCapsLock;

          this.lowerCaseUpperCase();

          evt.target.blur();
        }
      }
    };

    const onClickShiftActive = (evt) => {
      if (this.isActive) {
        if (
          evt.target.dataset.active === `${this.isShift}` &&
          (evt.target.dataset.code === "ShiftLeft" || evt.target.dataset.code === "ShiftRight")
        ) {
          this.switchButton();
          this.isShift = !this.isShift;
          evt.target.dataset.active = this.isShift;
          evt.target.blur();
        }
      }
    };

    const onKeydownDocument = (evt) => {
      if (this.isActive) {
        this.fullButtons.forEach((e) => {
          if (e.dataset.code === evt.code) {
            e.click();
            e.style.transform = "translateY(3px)";
            e.style.backgroundColor = "#e0e0e0";
          }
        });
      }
    };

    const onKeyupDocument = (evt) => {
      if (this.isActive) {
        this.fullButtons.forEach((e) => {
          if (e.dataset.code === evt.code) {
            e.style.transform = "translateY(0px)";
            e.style.backgroundColor = "#f5f5f5";
          }
        });
      }
    };

    const onClickArrowUp = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "ArrowUp") {
          const positionLeft = this.keyboardInput.value
            .slice(0, this.cursorPosition)
            .match(/(\n).*$(?!\1)/g) || [[1]];
          this.cursorPosition -= positionLeft[0].length;
          this.keyboardInput.setSelectionRange(this.cursorPosition, this.cursorPosition);
          this.setCursorPosition();
          this.keyboardInput.focus();
        }
      }
    };

    const onClickArrowDown = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "ArrowDown") {
          const positionLeft = this.keyboardInput.value
            .slice(this.cursorPosition)
            .match(/^.*(\n).*(?!\1)/) || [[1]];
          this.cursorPosition += positionLeft[0].length;
          this.keyboardInput.setSelectionRange(this.cursorPosition, this.cursorPosition);
          this.setCursorPosition();
          this.keyboardInput.focus();
        }
      }
    };

    const onClickArrowLeft = (evt) => {
      if (this.isActive) {
        if (this.keyboardInput.selectionStart === 0) {
          return;
        }

        if (evt.target.dataset.code === "ArrowLeft") {
          this.keyboardInput.setSelectionRange(
            this.keyboardInput.selectionStart - 1,
            this.keyboardInput.selectionStart - 1
          );
          this.setCursorPosition();
          this.keyboardInput.focus();
        }
      }
    };

    const onClickArrowRight = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "ArrowRight") {
          this.keyboardInput.setSelectionRange(
            this.keyboardInput.selectionStart + 1,
            this.keyboardInput.selectionStart + 1
          );
          this.setCursorPosition();
          this.keyboardInput.focus();
        }
      }
    };

    const preventDefault = (evt) => {
      evt.preventDefault();
    };

    const onFocusKeyboardInput = () => {
      this.keyboardInput.placeholder = "";
      this.enable();
    };

    const disableKeyboard = (evt) => {
      if (this.isActive) {
        if (evt.target.dataset.code === "hide") {
          this.isActive = !this.isActive;

          const keyboard = this.container.querySelector(".keyboard");
          keyboard.dataset.enable = this.isActive;

          if (!this.keyboardInput.value) {
            this.keyboardInput.placeholder = "Click here";
          }
        }
      }
    };

    return {
      onClickButtons,
      onClickBackspace,
      onClickSpace,
      onClickEnter,
      onClickSwitchLanguage,
      onClickCapsLockActive,
      onClickShiftActive,
      onClickTab,
      onKeydownDocument,
      onKeyupDocument,
      preventDefault,
      onClickArrowUp,
      onClickArrowDown,
      onClickArrowLeft,
      onClickArrowRight,
      onFocusKeyboardInput,
      disableKeyboard,
    };
  }

  printToDisplay(evt) {
    if (this.isActive) {
      this.keyboardInputValue = this.keyboardInput.value;
      this.setCursorPosition();

      this.keyboardInput.value = `${this.keyboardInputValue.slice(0, this.cursorPosition)}${
        evt.target.textContent
      }${this.keyboardInputValue.slice(this.cursorPosition)}`;

      this.keyboardInput.focus();
      this.keyboardInput.setSelectionRange(this.cursorPosition + 1, this.cursorPosition + 1);
    }
  }

  enable() {
    if (!this.isActive) {
      this.isActive = !this.isActive;
      const keyboard = this.container.querySelector(".keyboard");
      keyboard.dataset.enable = this.isActive;
    }
  }

  init() {
    const keyboard = this.generateKeyboard(language.en);
    const layout = `
    <textarea class="keyboard-input" placeholder="Click here"></textarea>
    ${keyboard}
    `;

    const events = this.eventsKeyboard();

    this.container.insertAdjacentHTML("beforeend", layout);
    this.container.addEventListener("click", events.onClickSwitchLanguage.bind(this));
    this.container.addEventListener("click", events.onClickCapsLockActive.bind(this));
    this.container.addEventListener("click", events.onClickShiftActive.bind(this));
    this.container.addEventListener("click", events.onClickBackspace.bind(this));
    this.container.addEventListener("click", events.onClickEnter.bind(this));
    this.container.addEventListener("click", events.onClickSpace.bind(this));
    this.container.addEventListener("click", events.onClickTab.bind(this));
    this.container.addEventListener("click", events.onClickArrowUp.bind(this));
    this.container.addEventListener("click", events.onClickArrowDown.bind(this));
    this.container.addEventListener("click", events.onClickArrowLeft.bind(this));
    this.container.addEventListener("click", events.onClickArrowRight.bind(this));
    this.container.addEventListener("click", events.disableKeyboard.bind(this));

    document.addEventListener("keyup", events.onKeyupDocument.bind(this));
    document.addEventListener("keydown", events.onKeydownDocument.bind(this));

    this.keyboardInput = this.container.querySelector(".keyboard-input");
    this.keyboardInput.addEventListener("click", this.setCursorPosition.bind(this));
    this.keyboardInput.addEventListener("keyup", events.preventDefault);
    this.keyboardInput.addEventListener("keydown", events.preventDefault);
    this.keyboardInput.addEventListener("focus", events.onFocusKeyboardInput.bind(this));

    this.getButtons();
    events.onClickButtons();
  }
}
