import style from './style/style.scss';
import iconClose from '../../assets/img/icon-close.svg';
import contentModal from './contentModal';

export default class Modal {
  constructor() {
    this.settingsItems = [];
    this.render();
  }

  generateModal(content) {
    const container = document.createElement('div');
    const contentContainer = document.createElement('div');
    const button = document.createElement('button');
    const list = document.createElement('ul');
    const key = Object.keys(content);

    function closeModal() {
      this.parentNode.remove();
    }

    function onClickChangeMode() {
      this.parentNode.parentNode.parentNode.remove();
    }

    container.classList.add(style.modal);
    contentContainer.classList.add(style.modal__container);
    button.classList.add(style.close__btn);
    button.style.backgroundImage = `url(${iconClose})`;
    button.onclick = closeModal;

    container.append(contentContainer);
    container.append(button);

    if (key[0] === 'info') {
      contentContainer.insertAdjacentHTML('beforeend', content[key]);
      this[key] = container;
    }

    if (key[0] === 'complite') {
      contentContainer.insertAdjacentHTML('beforeend', content[key]);
      this[key] = container;
    }

    if (key[0] === 'results') {
      contentContainer.insertAdjacentHTML('beforeend', content[key]);
      this[key] = container;
    }

    if (key[0] === 'save') {
      contentContainer.insertAdjacentHTML('beforeend', content[key]);
      this[key] = container;
    }

    if (key[0] === 'settings') {
      const randomInt = () => Math.floor(Math.random() * 37 + 1);
      const color = content[key[2]];

      content[key[1]].forEach((e) => {
        const item = document.createElement('li');
        item.style.backgroundColor = color[randomInt()];
        item.textContent = e;
        this.settingsItems.push(item);
        item.onclick = onClickChangeMode;
        list.append(item);
      });

      list.classList.add('modal__settings');
      contentContainer.insertAdjacentHTML('beforeend', content[key[0]]);
      contentContainer.append(list);
      this[key[0]] = container;
    }
  }

  render() {
    contentModal.forEach((e) => this.generateModal(e));
  }
}
