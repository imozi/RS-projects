import style from './style/style.scss';
import Menu from '../menu';
import Puzzle from '../puzzle';
import StatusBar from '../status-bar';
import Modal from '../modal';

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
    this.configureApp();
  }

  getEvents() {
    const onClickApp = (evt) => {
      const { target } = evt;
      target.blur();

      if (target.dataset.name === 'start') {
        this.menu.events.onClickPlay(target);

        if (!localStorage.getItem('mode')) {
          localStorage.setItem('mode', this.mode);
        }

        this.isPlay = !this.isPlay;
        return;
      }

      if (target.dataset.name === 'stop') {
        this.menu.events.onClickStop(target);
        this.isPlay = !this.isPlay;
        return;
      }

      if (target.dataset.name === 'reload') {
        this.appPlayingField.innerHTML = '';
        this.menu.events.onClickReload(this.puzzle.generatePuzzles.bind(this.puzzle));
        this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
        return;
      }

      if (target.dataset.name === 'info') {
        this.app.append(this.modal.info);
        return;
      }

      if (target.dataset.name === 'settings') {
        this.app.append(this.modal.settings);
      }
    };

    return {
      onClickApp,
    };
  }

  changeMode(evt) {
    this.appPlayingField.innerHTML = '';
    this.mode = evt.target.textContent;
    this.puzzle.mode = this.mode;
    this.appPlayingField.dataset.mode = this.mode;
    localStorage.setItem('mode', this.mode);
    this.puzzle.generatePuzzles();
    this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
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
