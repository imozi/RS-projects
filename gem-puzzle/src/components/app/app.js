import style from './style/style.scss';
import Menu from '../menu';
import Puzzle from '../puzzle';
import StatusBar from '../status-bar';
import Modal from '../modal';
import iconTrophy from '../../assets/img/icon-trophy.svg';
import iconFloppy from '../../assets/img/icon-floppy.svg';

export default class App {
  constructor(container) {
    this.container = container;
    this.app = document.createElement('div');
    this.appContainer = document.createElement('div');
    this.appPlayingField = document.createElement('div');
    this.mode = localStorage.getItem('mode') || '3x3';
    this.menu = new Menu();
    this.puzzle = new Puzzle(this.mode);
    this.progress = new StatusBar();
    this.modal = new Modal();
    this.isPlay = false;
    this.move = this.movePuzzle.bind(this);
    this.configureApp();
  }

  getEvents() {
    const onClickApp = (evt) => {
      const { target } = evt;
      target.blur();

      if (target.dataset.name === 'start') {
        this.menu.events.onClickPlay();
        this.puzzle.puzzles.forEach((e) => {
          e.addEventListener('click', this.move);
        });

        if (!localStorage.getItem('mode')) {
          localStorage.setItem('mode', this.mode);
        }

        this.progress.isTimer = !this.progress.isTimer;
        this.progress.timerStart();
        this.isPlay = !this.isPlay;
        return;
      }

      if (target.dataset.name === 'stop') {
        this.menu.events.onClickStop();
        this.puzzle.puzzles.forEach((e) => {
          e.removeEventListener('click', this.move);
        });
        this.progress.isTimer = !this.progress.isTimer;
        this.isPlay = !this.isPlay;
        return;
      }

      if (target.dataset.name === 'reload') {
        if (localStorage.getItem('save')) {
          localStorage.removeItem('save');
        }

        this.appPlayingField.innerHTML = '';
        this.menu.events.onClickReload(
          this.puzzle.generatePuzzles.bind(this.puzzle),
        );

        if (this.isPlay) {
          this.menu.events.onClickStop();
          this.isPlay = !this.isPlay;
        }

        this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
        this.progress.movesReset();
        this.progress.timerReset();
        this.progress.isTimer = false;
        return;
      }

      if (target.dataset.name === 'info') {
        this.app.append(this.modal.info);
        return;
      }

      if (target.dataset.name === 'settings') {
        this.app.append(this.modal.settings);
        return;
      }

      if (target.dataset.name === 'results') {
        const results = localStorage.getItem('results') ? JSON.parse(localStorage.getItem('results')) : 'У вас еще нет результатов!';
        const resultsContent = {
          results: `
          <h2>Лучшие результаты:  ${Array.isArray(results) ? `${results.length} / 10` : ''}</h2>
          <hr />
            <table class="modal__table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Режим игры</th>
                  <th>Время</th>
                  <th>Количество ходов</th>
                </tr>
              </thead>
              <tbody>
              ${
  Array.isArray(results)
    ? results
      .sort((a, b) => a.move - b.move)
      .reduce(
        (a, e, i) => `${a}<tr><td>${i + 1}</td><td>${e.mode}</td><td>${
          e.time
        }</td><td>${e.move}</td></tr>`,
        '',
      )
    : `<tr class="empty"><td colspan="4">${results}</td></tr>`
}
              </tbody>
            </table>
        `,
        };
        this.modal.generateModal(resultsContent);
        this.app.append(this.modal.results);
      }

      if (target.dataset.name === 'save') {
        this.save();
        return;
      }

      if (target.dataset.name === 'sound-on') {
        this.menu.events.onClickSoundOn();
        this.puzzle.isSound = !this.puzzle.isSound;
        return;
      }

      if (target.dataset.name === 'sound-off') {
        this.menu.events.onClickSoundOff();
        this.puzzle.isSound = !this.puzzle.isSound;
      }
    };

    return {
      onClickApp,
    };
  }

  movePuzzle(evt) {
    this.puzzle.onClickMove(
      this.progress.movesUpdate.bind(this.progress),
      this.complite.bind(this), evt,
    );
  }

  save() {
    const save = {
      mode: this.mode,
      time: this.progress.time.textContent,
      move: this.progress.moves.textContent,
      puzzle: this.puzzle.puzzles.map((e) => e.dataset.id),
    };

    const saveContent = {
      save: `
      <div class="modal__save">
        <img src="${iconFloppy}" alt="Игра сохранена">
        <h2>Игра сохранена</h2>
        <p>В следующий раз когда вернетесь вы сможете продолжить с этого же места!</p>
        <p><span>ВАЖНО:</span> По завершению игры и при запуске новой игры или смене режима игры ваше сохранение автоматически удалиться!</p>
      </div>
    `,
    };

    if (localStorage.getItem('save')) {
      const saved = JSON.parse(localStorage.getItem('save'));
      saved.mode = this.mode;
      saved.time = this.progress.time.textContent;
      saved.move = this.progress.moves.textContent;
      saved.puzzle = this.puzzle.puzzles.map((e) => e.dataset.id);
      localStorage.setItem('save', JSON.stringify(saved));
    } else {
      localStorage.setItem('save', JSON.stringify(save));
    }

    this.modal.generateModal(saveContent);
    this.app.append(this.modal.save);
  }

  complite() {
    if (
      JSON.stringify(this.puzzle.origin)
      === JSON.stringify(this.puzzle.puzzles.map((e) => e.dataset.id))
    ) {
      const state = {
        mode: this.mode,
        time: this.progress.time.textContent,
        move: this.progress.moves.textContent,
      };

      const results = localStorage.getItem('results')
        ? JSON.parse(localStorage.getItem('results'))
        : [];

      if (results.length <= 10) {
        results.push(state);
        localStorage.setItem('results', JSON.stringify(results));
      } else {
        results.slice(0, -1).push(state);
        localStorage.setItem('results', JSON.stringify(results));
      }

      const compliteContent = {
        complite: `
        <div class="modal__complate">
          <img src="${iconTrophy}" alt="Поздравление">
          <p>Ура! <br> <span>Вы решили головоломку.</span></p>
          <p>за ${state.time} и ${state.move} ходов</p>
        </div>
        `,
      };

      if (localStorage.getItem('save')) {
        localStorage.removeItem('save');
      }

      this.modal.generateModal(compliteContent);
      this.app.append(this.modal.complite);
      this.menu.events.onClickStop();

      this.appPlayingField.innerHTML = '';
      this.menu.events.onClickReload(
        this.puzzle.generatePuzzles.bind(this.puzzle),
      );
      this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
      this.progress.movesReset();
      this.progress.timerReset();
      this.progress.isTimer = !this.progress.isTimer;
      this.isPlay = !this.isPlay;
    }
  }

  changeMode(evt) {
    if (localStorage.getItem('save')) {
      localStorage.removeItem('save');
    }

    this.appPlayingField.innerHTML = '';
    this.mode = evt.target.textContent;
    this.puzzle.mode = this.mode;
    this.appPlayingField.dataset.mode = this.mode;
    localStorage.setItem('mode', this.mode);
    this.puzzle.generatePuzzles();
    this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));

    if (this.isPlay) {
      this.menu.events.onClickStop();
      this.isPlay = !this.isPlay;
    }

    this.progress.movesReset();
    this.progress.timerReset();
    this.progress.isTimer = false;
  }

  replacePuzzle() {
    this.puzzle.movePuzzle();
    this.progress.movesUpdate();
  }

  configureApp() {
    this.app.classList.add(`${style.app}`);
    this.appContainer.classList.add(`${style.app__container}`);
    this.appPlayingField.classList.add(`${style['app__playing-field']}`);
    this.appPlayingField.dataset.mode = this.mode;
  }

  render() {
    const events = this.getEvents();
    this.container.append(this.app);
    this.app.append(this.progress.container);
    this.app.append(this.appContainer);
    this.appContainer.append(this.appPlayingField);
    this.appContainer.append(this.menu.nav);

    this.modal.settingsItems.forEach((e) => {
      e.addEventListener('click', this.changeMode.bind(this));
    });

    this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
    this.app.addEventListener('click', events.onClickApp.bind(this));
  }
}
