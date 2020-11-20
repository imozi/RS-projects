import menuList from './menu-list';
import style from './style/style.scss';
import iconStop from '../../assets/img/icon-stop.svg';
import iconStart from '../../assets/img/icon-start.svg';
import iconSoundOn from '../../assets/img/icon-sound-on.svg';
import iconSoundOff from '../../assets/img/icon-sound-off.svg';

export default class Menu {
  constructor() {
    this.menuList = menuList;
    this.buttons = [];
    this.generateNav();
    this.getEvents();
  }

  static buttonsMenu(item) {
    const { label, description, icon } = item;
    const button = document.createElement('button');

    button.style.backgroundImage = `url(${icon})`;
    button.dataset.name = label;
    button.title = description;
    return button;
  }

  getEvents() {
    const onClickPlay = () => {
      const elm = this.buttons.find((e) => e.dataset.name === 'start');
      elm.style.backgroundImage = `url(${iconStop})`;
      elm.dataset.name = 'stop';
      elm.title = 'Приостановить игру';
    };

    const onClickStop = () => {
      const elm = this.buttons.find((e) => e.dataset.name === 'stop');
      elm.style.backgroundImage = `url(${iconStart})`;
      elm.dataset.name = 'start';
      elm.title = 'Начать игру';
    };

    const onClickReload = (func) => {
      const reload = func;
      reload();
    };

    const onClickSave = (func) => {
      const save = func;
      save();
    };

    const onClickSoundOn = () => {
      const elm = this.buttons.find((e) => e.dataset.name === 'sound-on');
      elm.style.backgroundImage = `url(${iconSoundOff})`;
      elm.dataset.name = 'sound-off';
      elm.title = 'Звук выключен';
    };

    const onClickSoundOff = () => {
      const elm = this.buttons.find((e) => e.dataset.name === 'sound-off');
      elm.style.backgroundImage = `url(${iconSoundOn})`;
      elm.dataset.name = 'sound-on';
      elm.title = 'Звук включен';
    };

    this.events = {
      onClickPlay,
      onClickStop,
      onClickReload,
      onClickSave,
      onClickSoundOn,
      onClickSoundOff,
    };
  }

  generateNav() {
    const fragment = document.createDocumentFragment();
    const nav = document.createElement('nav');
    const list = document.createElement('ul');

    nav.classList.add(style.menu);
    list.classList.add(style.menu__list);

    this.menuList.forEach((e) => {
      const item = document.createElement('li');
      item.append(this.constructor.buttonsMenu(e));
      fragment.appendChild(item);
    });

    fragment.querySelectorAll('button').forEach((e) => this.buttons.push(e));

    nav.append(list);
    list.append(fragment);

    this.nav = nav;
  }
}
