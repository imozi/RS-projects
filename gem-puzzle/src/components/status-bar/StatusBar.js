import style from './style/style.scss';

export default class Progress {
  constructor() {
    this.container = document.createElement('div');
    this.containerTime = document.createElement('p');
    this.containerMoves = document.createElement('p');
    this.time = document.createElement('span');
    this.moves = document.createElement('span');
    this.hour = '00';
    this.min = '00';
    this.sec = '00';
    this.isTimer = false;
    this.render();
  }

  timerStart() {
    if (this.isTimer) {
      setTimeout(this.timerStart.bind(this), 1000);

      const insertZero = (num) => (parseInt(num, 10) < 10 ? '0' : '') + num;

      this.sec = insertZero(parseInt(this.sec, 10) + 1);
      if (this.sec === '60') {
        this.min = insertZero(parseInt(this.min, 10) + 1);
        this.sec = '0';
        if (this.min === '60') {
          this.hour = insertZero(parseInt(this.hour, 10) + 1);
          this.min = '0';
        }
      }

      this.time.textContent = `${this.hour}:${this.min}:${this.sec}`;
    }
  }

  timerReset() {
    this.hour = '00';
    this.min = '00';
    this.sec = '00';
    this.time.textContent = `${this.hour}:${this.min}:${this.sec}`;
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

    this.containerTime.append(this.time);
    this.containerMoves.append(this.moves);

    if (localStorage.getItem('save')) {
      const progress = JSON.parse(localStorage.getItem('save'));
      const hour = progress.time.split(':')[0];
      const min = progress.time.split(':')[1];
      const sec = progress.time.split(':')[2];

      this.time.textContent = progress.time;
      this.moves.textContent = progress.move;
      this.hour = hour;
      this.min = min;
      this.sec = sec;

      return;
    }

    this.time.textContent = `${this.hour}:${this.min}:${this.sec}`;
    this.moves.textContent = 0;
  }
}
