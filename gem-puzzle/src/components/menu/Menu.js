import menuList from './menu-list';
import style from './style/style.scss';
import iconStop from '../../assets/img/icon-stop.svg';
import iconStart from '../../assets/img/icon-start.svg';

export default class Menu {
  constructor() {
    this.menuList = menuList;
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
    const onClickPlay = (item) => {
      const elm = item;
      elm.style.backgroundImage = `url(${iconStop})`;
      elm.dataset.name = 'stop';
      elm.title = 'Приостановить игру';
    };

    const onClickStop = (item) => {
      const elm = item;
      elm.style.backgroundImage = `url(${iconStart})`;
      elm.dataset.name = 'start';
      elm.title = 'Начать игру';
    };

    const onClickReload = (func) => {
      const reload = func;
      reload();
    };

    this.events = {
      onClickPlay,
      onClickStop,
      onClickReload,
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

    nav.append(list);
    list.append(fragment);

    this.nav = nav;
  }
}
