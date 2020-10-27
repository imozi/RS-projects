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
    <article class="our-friends__item animal-card animal-card--animate-fade" data-key="${id}">
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

      this.container.addEventListener("click", onClickCard);
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

    renderCards(animals = this.animals) {
      const card = animals.reduce((a, e, i) => {
        return (a += this.getTemplateCard(e, e.id || i));
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

  class Pagination extends AnimalCard {
    constructor(options) {
      super(options.animals, options.container);
      this.animals = options.animals;
      this.container = options.container;
      this.pagination = options.pagination;
      this.breakpoints = options.breakpoints;
      this.currentPage = 1;
      this.setCurrentPage();
      this.renderCardsNewBreakpoints();
    }

    getQuantityPage(quantity) {
      this.quantityPage = Math.ceil(this.animals.length / quantity);
    }

    setCurrentPage() {
      const pagination = document.querySelector(this.pagination);

      this.paginationCurrentPage = pagination.querySelector(".pagination__current-page");
      this.paginationCurrentPage.textContent = this.currentPage;
    }

    onClickBtn() {
      const pagination = document.querySelector(this.pagination);
      const btnPrevLast = pagination.querySelector(".pagination__btn--prev-last");
      const btnPrev = pagination.querySelector(".pagination__btn--prev");
      const btnNext = pagination.querySelector(".pagination__btn--next");
      const btnNextLast = pagination.querySelector(".pagination__btn--last-next");

      const disabledPrevBtn = () => {
        btnPrevLast.disabled = true;
        btnPrev.disabled = true;
      };

      disabledPrevBtn();

      const disabledNextBtn = () => {
        btnNext.disabled = true;
        btnNextLast.disabled = true;
      };

      const enablePrevBtn = () => {
        btnPrevLast.disabled = false;
        btnPrev.disabled = false;
      };

      const enableNextBtn = () => {
        btnNext.disabled = false;
        btnNextLast.disabled = false;
      };

      const onClickNextBtn = () => {
        this.currentPage++;
        this.setCurrentPage();
        this.renderCardsNewPage();

        if (this.currentPage === this.quantityPage) {
          disabledNextBtn();
          return;
        }

        enablePrevBtn();
      };

      const onClickPrevBtn = () => {
        this.currentPage--;
        this.setCurrentPage();
        this.renderCardsNewPage();

        if (this.currentPage === 1) {
          disabledPrevBtn();
          return;
        }

        enableNextBtn();
      };

      const onClickPrevLastBtn = () => {
        this.currentPage = 1;
        this.setCurrentPage();
        this.renderCardsNewPage();
        disabledPrevBtn();
        enableNextBtn();
      };

      const onClickNextLastBtn = () => {
        this.currentPage = this.quantityPage;
        this.setCurrentPage();
        this.renderCardsNewPage();
        disabledNextBtn();
        enablePrevBtn();
      };

      btnPrevLast.addEventListener("click", onClickPrevLastBtn);
      btnPrev.addEventListener("click", onClickPrevBtn);
      btnNext.addEventListener("click", onClickNextBtn);
      btnNextLast.addEventListener("click", onClickNextLastBtn);
    }

    renderCardsNewBreakpoints() {
      const bodyWidth = document.body.offsetWidth;

      if (bodyWidth >= 320 && bodyWidth < 768) {
        if (this.breakpoints[320].isActive) return;

        this.getQuantityPage(this.breakpoints[320].showItems);
        this.quantityItem = this.breakpoints[320].showItems;
        this.resetPagination();
        this.renderCardsNewPage();

        this.breakpoints[320].isActive = true;
        this.breakpoints[768].isActive = false;
        this.breakpoints[1280].isActive = false;
      }

      if (bodyWidth >= 768 && bodyWidth < 1280) {
        if (this.breakpoints[768].isActive) return;

        this.getQuantityPage(this.breakpoints[768].showItems);
        this.quantityItem = this.breakpoints[768].showItems;
        this.resetPagination();
        this.renderCardsNewPage();

        this.breakpoints[320].isActive = false;
        this.breakpoints[768].isActive = true;
        this.breakpoints[1280].isActive = false;
      }

      if (bodyWidth >= 1280) {
        if (this.breakpoints[1280].isActive) return;

        this.getQuantityPage(this.breakpoints[1280].showItems);
        this.quantityItem = this.breakpoints[1280].showItems;
        this.resetPagination();
        this.renderCardsNewPage();

        this.breakpoints[768].isActive = false;
        this.breakpoints[1280].isActive = true;
      }
    }

    resetPagination() {
      const pagination = document.querySelector(this.pagination);
      const btnPrevLast = pagination.querySelector(".pagination__btn--prev-last");
      const btnPrev = pagination.querySelector(".pagination__btn--prev");
      const btnNext = pagination.querySelector(".pagination__btn--next");
      const btnNextLast = pagination.querySelector(".pagination__btn--last-next");

      btnPrevLast.disabled = true;
      btnPrev.disabled = true;
      btnNext.disabled = false;
      btnNextLast.disabled = false;

      this.currentPage = 1;
      this.setCurrentPage();
    }

    renderCardsNewPage() {
      const newAnimals = [];
      const oldItems = this.container.querySelectorAll(".our-friends__item");

      oldItems.forEach((e) => e.remove());

      for (
        var i = (this.currentPage - 1) * this.quantityItem;
        i < this.currentPage * this.quantityItem && i < this.animals.length;
        i++
      ) {
        this.animals[i].id = i;
        newAnimals.push(this.animals[i]);
      }

      this.renderCards(newAnimals);
    }

    onResizeWindowRenderCardsNewPage() {
      this.renderCardsNewBreakpoints();
    }

    init() {
      this.renderCardsNewBreakpoints();
      this.onClickBtn();
      window.addEventListener("resize", this.onResizeWindowRenderCardsNewPage.bind(this));
    }
  }

  const url =
    "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json";
  const data = await fetch(url).then((res) => res.json());
  const uniqueAnimals = () => {
    let newRandomAnimals = [];

    for (let i = 0; i < 6; i++) {
      const newData = data;

      for (let j = data.length; j > 0; j--) {
        const index = Math.floor(Math.random() * j);
        const randomElement = newData.splice(index, 1)[0];
        randomElement.id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
        newData.push(randomElement);
      }

      newRandomAnimals = [...newRandomAnimals, ...newData];
    }

    const unique = (animals) => {
      let uniqueAnimals = [];
      const length = animals.length;

      for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (j = 0; j < animals.length; j++) {
          if (uniqueStepList.length >= 8) {
            break;
          }
          const isUnique = !uniqueStepList.some((e) => {
            return e.id === animals[j].id;
          });
          if (isUnique) {
            uniqueStepList.push(animals[j]);
            animals.splice(j, 1);
            j--;
          }
        }
        uniqueAnimals = [...uniqueAnimals, ...uniqueStepList];
      }
      animals = uniqueAnimals;

      animals = uniqueRecursively(animals);

      return animals;
    };

    const uniqueRecursively = (animals) => {
      const length = animals.length;

      for (let i = 0; i < length / 6; i++) {
        const stepList = animals.slice(i * 6, i * 6 + 6);

        for (let j = 0; j < 6; j++) {
          const duplicatedItem = stepList.find((e, i) => {
            return e.id === stepList[j].id && i !== j;
          });

          if (duplicatedItem !== undefined) {
            const ind = i * 6 + j;
            const jnd = Math.trunc(ind / 8);

            animals.splice(jnd * 8, 0, animals.splice(ind, 1)[0]);

            uniqueRecursively(animals);
          }
        }
      }

      return animals;
    };

    newRandomAnimals = unique(newRandomAnimals);

    return newRandomAnimals;
  };

  const animals = uniqueAnimals();

  const pagination = new Pagination({
    animals: animals,
    container: animalsContainer,
    pagination: ".pagination",
    breakpoints: {
      320: {
        showItems: 3,
      },
      768: {
        showItems: 6,
      },
      1280: {
        showItems: 8,
      },
    },
  });

  pagination.init();
  pagination.onClickCardGetInfo();

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
