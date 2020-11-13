import style from './style/style.scss';

export default class Progress {
  constructor() {
    this.container = document.createElement('div');
    this.containerTime = document.createElement('p');
    this.containerMoves = document.createElement('p');
    this.time = document.createElement('span');
    this.moves = document.createElement('span');
    this.render();
  }

  movesReset() {
    this.moves.textContent = 0;
  }

  movesUpdate() {
    this.moves.textContent = `${parseInt(this.moves.textContent, 10) + 1}`;
  }

  render() {
    this.container.classList.add(style['status-bar']);
    this.container.append(this.containerTime);
    this.container.append(this.containerMoves);

    this.containerTime.textContent = 'Время: ';
    this.containerMoves.textContent = 'Количество ходов: ';

    this.time.textContent = '00:00:00';
    this.moves.textContent = 0;

    this.containerTime.append(this.time);
    this.containerMoves.append(this.moves);
  }
}
