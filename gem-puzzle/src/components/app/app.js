import style from './style/style.scss';
import Menu from '../menu';
import Puzzle from '../puzzle';
import StatusBar from '../status-bar';

export default class App {
  constructor(container) {
    this.container = container;
    this.app = document.createElement('div');
    this.appContainer = document.createElement('div');
    this.appPlayingField = document.createElement('div');
    this.mode = '3x3' || localStorage.getItem('mode');
    this.menu = new Menu();
    this.puzzle = new Puzzle(this.mode);
    this.progress = new StatusBar();
    this.isPlay = false;
    this.configureApp();
  }

  getEvents() {
    const onClickApp = (evt) => {
      const { target } = evt;

      if (target.dataset.name === 'start') {
        this.appPlayingField.innerHTML = '';
        this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
        this.menu.events.onClickPlay(target);
        this.progress.container.style.opacity = 1;
        this.isPlay = !this.isPlay;
      }

      if (target.dataset.name === 'reload' && this.isPlay) {
        this.appPlayingField.innerHTML = '';
        this.menu.events.onClickReload(this.puzzle.generatePuzzles.bind(this.puzzle));
        this.puzzle.puzzles.forEach((e) => this.appPlayingField.append(e));
      }

      target.blur();
    };

    return {
      onClickApp,
    };
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

    this.app.addEventListener('click', events.onClickApp.bind(this));
  }
}
