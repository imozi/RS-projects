import Keyboard from "./Keyboard.js";

const app = document.querySelector(".app");
const keyboard = new Keyboard(app);
keyboard.init();