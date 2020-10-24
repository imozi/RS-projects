class Momentum {
  constructor() {
    this.app = document.querySelector("#app");
    this.currentImagesIndex = 0;
    this.isNewHour = false;
    this.#setTime();
    this.#setDate();
  }

  #getTemplateBackgroundImages(src, alt, autor) {
    return `
    <div class="image">
      <img src=${src} alt=${alt} data-autor=${autor}>
      <button class="image__btn image__btn--prev" aria-label="Предыдущее изображение">&lt;</button>
      <button class="image__btn image__btn--next" aria-label="Следующее изображение">&gt;</button>
    </div>
    `;
  }

  #setTime() {
    const date = new Date();
    setTimeout(this.#setTime.bind(this), 1000);

    const insertZero = (num) => {
      return (parseInt(num, 10) < 10 ? "0" : "") + num;
    };

    if (this.time) {
      if (this.time.hours !== insertZero(date.getHours())) {
        this.isNewHour = true;
      }
    }

    this.time = {
      hours: insertZero(date.getHours()),
      min: insertZero(date.getMinutes()),
      sec: insertZero(date.getSeconds()),
    };
  }

  #setDate() {
    const date = new Date();

    const switchWeek = (num) => {
      switch (num) {
        case 0:
          return "Воскресенье";
        case 1:
          return "Понедельник";
        case 2:
          return "Вторник";
        case 3:
          return "Среда";
        case 4:
          return "Четверг";
        case 5:
          return "Пятница";
        case 6:
          return "Суббота";
      }
    };

    const swithMonth = (num) => {
      switch (num) {
        case 0:
          return "Января";
        case 1:
          return "Февраля";
        case 2:
          return "Марта";
        case 3:
          return "Апреля";
        case 4:
          return "Мая";
        case 5:
          return "Июня";
        case 6:
          return "Июля";
        case 7:
          return "Августа";
        case 8:
          return "Сентября";
        case 9:
          return "Октября";
        case 10:
          return "Ноября";
        case 11:
          return "Декабря";
      }
    };

    this.date = {
      day: date.getDate(),
      dayOfWeek: switchWeek(date.getDay()),
      month: swithMonth(date.getMonth()),
      year: `${date.getFullYear()}г.`,
    };
  }

  async #setQuote() {
    const url = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const quote = await fetch(url).then((res) => res.json());

    this.quote = {
      quoteText: quote.quoteText,
      quoteAuthor: quote.quoteAuthor,
    };
  }

  async #setWeather(city) {
    const API_TOKEN = "ad57c0934c818ea476b502f087218105";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${API_TOKEN}&units=metric`;
    const weather = await fetch(url).then((res) => res.json());

    this.weather = {
      city: weather.name,
      weather: {
        description: weather.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        temp: weather.main.temp,
        wind: weather.wind.speed,
      },
    };
  }

  async #setImage() {
    const getImages = async (query, i) => {
      const API_TOKEN = "roKBADOLV1DtnnRTTXUg7VPxVeUMBF8c2iLiEleU1gA";
      const url = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&page=${i}&per_page=6&client_id=${API_TOKEN}`;
      const images = await fetch(url).then((res) => res.json());

      return images;
    };

    const randomIntFromOneToSix = () => {
      return Math.floor(Math.random() * 6 + 1);
    };

    this.images = {
      morning: await getImages("morning", randomIntFromOneToSix()),
      afternoon: await getImages("afternoon", randomIntFromOneToSix()),
      evening: await getImages("evening", randomIntFromOneToSix()),
      night: await getImages("night", randomIntFromOneToSix()),
    };
  }

  #getImage() {
    const segmentOfTheDay = (hours) => {
      hours = parseInt(hours);

      if (hours === 0) hours = 24;

      switch (true) {
        case hours >= 6 && hours < 12:
          return "morning";
        case hours >= 12 && hours < 18:
          return "afternoon";
        case hours >= 18 && hours < 24:
          return "evening";
        case hours === 24 || hours < 6:
          return "night";
      }
    };

    return this.images[segmentOfTheDay(this.time.hours)].results[this.currentImagesIndex];
  }

  #switchBackgroundImagesNewHour() {
    setTimeout(this.#switchBackgroundImagesNewHour.bind(this), 1000);

    if (this.isNewHour) {
      this.currentImagesIndex++;
      this.isNewHour = false;
      this.#renderBackgroundImages();
    }
  }

  #renderBackgroundImages() {
    const image = this.#getImage();
    const isImages = document.querySelector(".image");

    if (isImages) {
      const img = isImages.querySelector("img");
      img.src = image.urls.full;
      img.alt = image.description;
      img.dataset.autor = image.user.name;

      return;
    }

    const template = this.#getTemplateBackgroundImages(
      image.urls.full,
      image.description,
      image.user.name
    );
    this.app.insertAdjacentHTML("beforeend", template);

    const onClickBtnBackgroundImages = (evt) => {
      if (evt.target.classList.contains("image-btn--prev")) {
        console.log("click prev");
      }

      if (evt.target.classList.contains("image-btn--next")) {
        console.log("click next");
      }
    };

    this.app.addEventListener("click", onClickBtnBackgroundImages);
  }

  async render() {
    await this.#setImage();
    this.#renderBackgroundImages();
    this.#switchBackgroundImagesNewHour();
  }
}

const momentum = new Momentum();
momentum.render();