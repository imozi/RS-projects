import colors from './colors';
import style from './style/style.scss';

export default class Puzzle {
  constructor(mode) {
    this.color = null;
    this.puzzles = null;
    this.mode = mode;
    this.generatePuzzles();
  }

  static getPuzzle(text = '', color = '', id = 0) {
    const puzzle = document.createElement('div');
    puzzle.classList.add(style.puzzle);
    puzzle.textContent = text;
    puzzle.style.backgroundColor = color;
    puzzle.dataset.id = id;

    return puzzle;
  }

  setCounts(mode) {
    switch (mode) {
      case '3x3':
        this.counts = 9;
        break;
      case '4x4':
        this.counts = 16;
        break;
      case '5x5':
        this.counts = 25;
        break;
      case '6x6':
        this.counts = 36;
        break;
      case '7x7':
        this.counts = 49;
        break;
      case '8x8':
        this.counts = 64;
        break;
      default:
        break;
    }
  }

  movePuzzle() {
    function replace() {

    }

    this.puzzles.forEach((e) => { e.onclick = replace; });
  }

  generatePuzzles() {
    if (localStorage.getItem('save')) {
      this.puzzles = JSON.parse(localStorage.getItem('save')).puzzles;
      return;
    }

    this.puzzles = [];
    const randomInt = () => Math.floor(Math.random() * 37 + 1);
    this.setCounts(this.mode);

    this.color = colors[randomInt()];
    this.puzzles.push(this.constructor.getPuzzle());

    for (let i = 1; i < this.counts; i += 1) {
      this.puzzles.push(this.constructor.getPuzzle(i, this.color, i));
      this.color = colors[randomInt()];
    }

    for (let i = this.puzzles.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.puzzles[i], this.puzzles[j]] = [this.puzzles[j], this.puzzles[i]];
    }

    this.movePuzzle();
  }
}
