(async () => {
  const body = document.querySelector("body");
  const header = body.querySelector(".header");
  const menu = body.querySelector(".main-nav");
  const menuList = menu.querySelector(".main-nav__list");
  const menuBtn = menu.querySelector(".main-nav__btn");
  const animalsContainer = body.querySelector(".our-friends__list");

  class AnimalCard {
    constructor(options) {
      this.animals = options.animals;
      this.container = options.container;
    }

    getTemplateCard(animal, id) {
      return `
    <article class="our-friends__item animal-card" data-key="${id}">
      <div class="animal-card__photo">
        <img src="${animal.img}" alt="${animal.name}">
      </div>
      <h3>${animal.name}</h3>
      <a href="#" class="btn btn--secondary">Learn more</a>
    </article>
    `;
    }
    getTemplateModal(id) {
      const animal = this.animals[id];

      return `
      <div class="modal-pet">
        <div class="modal-pet__overlay"></div>
        <div class="modal-pet__wrapper">
          <div class="modal-pet__content">
            <div class="modal-pet__img">
              <img src="${animal.img}" alt="${animal.name}">
            </div>
            <div class="modal-pet__description">
              <h2>${animal.name}</h2>
              <p>${animal.type} - ${animal.breed}</p>
              <p>${animal.description}</p>
              <ul>
                <li>Age: <span>${animal.age}</span></li>
                <li>Inoculations: <span>${animal.inoculations}</span></li>
                <li>Diseases: <span>${animal.diseases}</span></li>
                <li>Parasites: <span>${animal.parasites}</span></li>
              </ul>
            </div>
            <button class="modal-pet__btn" aria-label="Закрыть модальное окно"></button>
          </div>
        </div>
     </div>
      `;
    }

    onClickCardGetInfo() {
      const onClickCard = (evt) => {
        if (
          evt.target.classList.contains("btn--secondary") ||
          evt.target.classList.contains("animal-card") ||
          evt.target.parentNode.classList.contains("animal-card__photo")
        ) {
          evt.preventDefault();
          const idCard =
            evt.target.dataset.key ||
            evt.target.parentNode.dataset.key ||
            evt.target.parentNode.parentNode.dataset.key;

          this.renderModal(idCard);
        }
      };

      this.container.addEventListener("click", (evt) => {
        onClickCard(evt);
      });
    }

    onClickCloseModalInfo() {
      const body = document.querySelector("body");
      const modalPet = body.querySelector(".modal-pet");
      const modalPetCloseBtn = modalPet.querySelector(".modal-pet__btn");
      const modalPetWrapper = modalPet.querySelector(".modal-pet__wrapper");

      const closeModal = () => {
        body.classList.remove("open-modal");
        modalPet.remove();
      };

      const onClickStopPropagation = (evt) => {
        evt.stopPropagation();
      };

      const onClickCloseBtn = () => {
        closeModal();
      };

      const onClickCloseOverlay = () => {
        closeModal();
      };

      modalPet.addEventListener("click", onClickCloseOverlay);
      modalPetWrapper.addEventListener("click", onClickStopPropagation);
      modalPetCloseBtn.addEventListener("click", onClickCloseBtn);
    }

    renderCards() {
      const card = this.animals.reduce((a, e, i) => {
        return (a += this.getTemplateCard(e, i));
      }, ``);

      this.container.insertAdjacentHTML("afterBegin", card);
    }

    renderModal(id) {
      const modal = this.getTemplateModal(id);
      const body = document.querySelector("body");
      body.classList.add("open-modal");

      body.insertAdjacentHTML("beforeend", modal);

      this.onClickCloseModalInfo();
    }
  }

  const url =
    "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json";
  const animals = await fetch(url).then((res) => res.json());
  
  const animalCard = new AnimalCard({ animals: animals, container: animalsContainer });
  animalCard.renderCards()
  animalCard.onClickCardGetInfo();

  const onClickBtn = () => {
    body.classList.toggle("open-menu");

    if (menuList.classList.contains("main-nav__list--slide-in")) {
      header.classList.add("header--height-100");
      menuList.classList.add("main-nav__list--slide-out");
      menuList.classList.remove("main-nav__list--slide-in");
    } else {
      header.classList.remove("header--height-100");
      menuList.classList.remove("main-nav__list--slide-out");
      menuList.classList.add("main-nav__list--slide-in");
    }
  };

  const onResizeWindow = () => {
    if (body.classList.contains("open-menu") && window.matchMedia("(min-width: 768px)").matches) {
      body.classList.remove("open-menu");
      header.classList.remove("header--height-100");
      menuList.classList.remove("main-nav__list--slide-in");
    }
  };

  menuBtn.addEventListener("click", onClickBtn);
  window.addEventListener("resize", onResizeWindow);
})();
