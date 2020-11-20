import colors from './colors';
import style from './style/style.scss';
import soundClick from '../../assets/sound/click.mp3';

export default class Puzzle {
  constructor(mode) {
    this.color = null;
    this.puzzles = null;
    this.mode = mode;
    this.isSound = true;
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

  onClickMove(progressUpdate, complite, evt) {
    const size = Math.sqrt(this.puzzles.length);

    const { target } = evt;
    const empty = this.puzzles.find((e) => e.dataset.id === '0');

    if (target.dataset.id === '0') {
      return;
    }

    const playAudio = () => {
      const myAudio = new Audio();
      myAudio.src = soundClick;
      myAudio.play();
    };

    if (this.isSound) {
      playAudio();
    }

    const currentPositionTargetElement = {
      index:
        this.puzzles.findIndex((e) => e.dataset.id === target.dataset.id) + 1,
      positionPlace:
        (this.puzzles.findIndex((e) => e.dataset.id === target.dataset.id)
        + 1) % size,
    };

    const currentPositionEmptyElement = {
      index: this.puzzles.findIndex((e) => e.dataset.id === '0') + 1,
      positionPlace:
        (this.puzzles.findIndex((e) => e.dataset.id === '0') + 1) % size,
    };

    currentPositionTargetElement.space = currentPositionEmptyElement.index
    - currentPositionTargetElement.index;

    if (
      (currentPositionTargetElement.positionPlace
        === currentPositionEmptyElement.positionPlace
        && currentPositionTargetElement.space === size)
      || currentPositionTargetElement.space === -size
    ) {
      if (target.nextElementSibling) {
        const nextElmTarget = target.nextElementSibling;
        const nextElmEmpty = empty.nextElementSibling;
        target.parentNode.insertBefore(target, nextElmEmpty);
        target.parentNode.insertBefore(empty, nextElmTarget);

        this.puzzles[currentPositionTargetElement.index - 1] = empty;
        this.puzzles[currentPositionEmptyElement.index - 1] = target;
        progressUpdate();
        complite();
        return;
      }

      if (target.previousElementSibling) {
        const nextElmEmpty = empty.nextElementSibling;

        target.parentNode.insertBefore(target, nextElmEmpty);
        target.parentNode.appendChild(empty);

        this.puzzles[currentPositionTargetElement.index - 1] = empty;
        this.puzzles[currentPositionEmptyElement.index - 1] = target;
        progressUpdate();
        complite();
      }
    }

    if (
      currentPositionTargetElement.space === 1
      || currentPositionTargetElement.space === -1
    ) {
      if (
        target.nextElementSibling
        && target.nextElementSibling.dataset.id === '0'
        && currentPositionTargetElement.positionPlace !== 0
      ) {
        const nextElmEmpty = empty.nextElementSibling;
        target.parentNode.insertBefore(target, nextElmEmpty);

        this.puzzles[currentPositionTargetElement.index - 1] = empty;
        this.puzzles[currentPositionEmptyElement.index - 1] = target;
        progressUpdate();
        complite();
        return;
      }

      if (
        target.previousElementSibling
        && target.previousElementSibling.dataset.id === '0'
        && currentPositionEmptyElement.positionPlace !== 0
      ) {
        target.parentNode.insertBefore(target, empty);

        this.puzzles[currentPositionTargetElement.index - 1] = empty;
        this.puzzles[currentPositionEmptyElement.index - 1] = target;
        progressUpdate();
        complite();
      }
    }
  }

  generatePuzzles() {
    const randomInt = () => Math.floor(Math.random() * 37 + 1);
    this.puzzles = [];
    this.origin = [];

    if (localStorage.getItem('save')) {
      const puzzles = JSON.parse(localStorage.getItem('save')).puzzle;

      puzzles.forEach((e) => {
        if (e === '0') {
          this.puzzles.push(this.constructor.getPuzzle());
          return;
        }

        this.color = colors[randomInt()];
        this.puzzles.push(
          this.constructor.getPuzzle(e, this.color, e),
        );
      });

      for (let i = 1; i < puzzles.length; i += 1) {
        this.origin.push(this.constructor.getPuzzle(i, null, i));
      }

      this.origin = this.origin.map((e) => e.dataset.id);
      this.origin.push(this.constructor.getPuzzle().dataset.id);

      return;
    }

    this.setCounts(this.mode);
    this.color = colors[randomInt()];

    for (let i = 1; i < this.counts; i += 1) {
      this.puzzles.push(this.constructor.getPuzzle(i, this.color, i));
      this.color = colors[randomInt()];
    }

    this.puzzles.push(this.constructor.getPuzzle());
    this.origin = this.puzzles.map((e) => e.dataset.id);

    for (let i = this.puzzles.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.puzzles[i], this.puzzles[j]] = [this.puzzles[j], this.puzzles[i]];
    }
  }
}
