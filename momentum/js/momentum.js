class Momentum {
  constructor(app) {
    this.app = app;
    this.indexImage = 0;
    this.isNewHour = false;
    this.isLoadFullImages = false;
    this.successLoad = 0;
    this.city = localStorage.getItem("city") ? localStorage.getItem("city") : "";
    this.userName = localStorage.getItem("name") ? localStorage.getItem("name") : "";
    this.setTime();
    this.setDate();
    this.setQuote();
  }

  getTemplateContent() {
    const images = (src, alt, autor, id) => {
      return `
      <div class="image">
        <img src=${src} alt=${alt} data-autor=${autor} data-id=${id}>
        <button class="image__btn image__btn--prev" aria-label="Предыдущее изображение"></button>
        <button class="image__btn image__btn--next" aria-label="Следующее изображение"></button>
      </div>
    `;
    };

    const time = () => {
      return `
      <div class="time">
        <div class="time__wrapper">
           <span class="time__hours">${this.time.hours} :</span>
           <span class="time__min"> ${this.time.min} :</span>
           <span class="time__sec"> ${this.time.sec}</span>
        </div>
      </div>
    `;
    };

    const date = () => {
      return `
      <div class="date">
        <span class="date__dayOfWeek">Сегодня: ${this.date.dayOfWeek},</span>
        <span class="date__day">${this.date.day}</span>
        <span class="date__month">${this.date.month}</span>
        <span class="date__year">${this.date.year}</span>
     </div>
    `;
    };

    const weather = (weather) => {
      return `
      <div class="weather">
        <h2 class="weather__title">Погода</h2>
        <div class="weather__wrapper">
        <div class="weather__content">
          <input type="text" name="text" placeholder="Укажите Город" value=${this.city}>
          <div class="weather__description">
            <div class="weather__img">
              <img src="${weather ? weather.icon : ""}" alt="${weather ? weather.description : ""}">
            </div>
            <p>${weather ? weather.description : ""}</p>
          </div>
          <p class="weather__temp">${
            weather
              ? `<span>Температура:</span><span>${Math.floor(weather.temp)}${String.fromCharCode(
                  176
                )}</span>`
              : "<span></span><span></span>"
          }</span>
          <p class="weather__humidity">${
            weather
              ? `<span>Влажность:</span><span>${weather.humidity}%</span>`
              : "<span></span><span></span>"
          }</span>
          <p class="weather__wind-speed">${
            weather
              ? `<span>Скорость ветра:</span><span>${weather.wind} м/с</span>`
              : "<span></span><span></span>"
          }</span>
        </div>
        <button class="weather__btn">${
          this.city ? "Узнать погоду в другом городе" : "Узнать погоду"
        }</button>
        </div> 
      </div>
    `;
    };

    const quote = () => {
      return `
    <blockquote class="quote">
      <p>${this.quote.quoteText}</p>
      <footer>
        <p>${this.quote.quoteAuthor}</p>
        <button class="quote__btn" aria-label="Обновить цитату"></button>
      </footer>
    </blockquote>
    `;
    };

    const greeting = () => {

      const segmentOfTheDay = (hours) => {
        hours = parseInt(hours);

        if (hours === 0) hours = 24;

        switch (true) {
          case hours >= 6 && hours < 12:
            return "Доброе утро";
          case hours >= 12 && hours < 18:
            return "Добрый день";
          case hours >= 18 && hours < 24:
            return "Добрый вечер";
          case hours === 24 || hours < 6:
            return "Доброй ночи";
        }
      };

      return `
      <div class="greeting ${this.userName ? "" : "greeting--no-name"}">
        <p>${segmentOfTheDay(this.time.hours)},</p>
        <input class="greeting__name" type="text" name="name" id="name" placeholder="Введите имя" value="${
          this.userName
        }">
      </div>
      `;
    };

    const target = (target) => {
      if (target) {
        return `<li class="target__list-item">${target}</li>`;
      } else {
        return `
        <div class="target ${localStorage.getItem("targets") ? "" : "target--addition"}">
          <div class="target__title">
          <h2>Ваши цели</h2>
          <button class="target__btn-add" aria-label="Добавить цель"></button>
          </div>
          <input type="text" name="target" placeholder="Введите цель">
          <ul class="target__list">
          ${
            localStorage.getItem("targets")
              ? localStorage.getItem("targets").reduce((a, e) => {
                  return (a += template.target(e));
                }, ``)
              : ""
          }
          </ul>
        </div>
      `;
      }
    };

    return {
      images,
      time,
      date,
      weather,
      quote,
      greeting,
      target,
    };
  }

  getImage() {
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

    return this.images[segmentOfTheDay(this.time.hours)].results[this.indexImage];
  }

  setTime() {
    const date = new Date();
    setTimeout(this.setTime.bind(this), 1000);

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

  setDate() {
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

  async setQuote() {
    const url =
      "https://api.allorigins.win/raw?url=https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru";
    const quote = await fetch(url).then((res) => res.text());

    const regexText = "<quoteText>(.*)</quoteText>";
    const regexAuthor = "<quoteAuthor>(.*)</quoteAuthor>";

    this.quote = {
      quoteText: quote.match(regexText)[1],
      quoteAuthor: quote.match(regexAuthor)[1],
    };
  }

  async setWeather(city) {
    try {
      const API_TOKEN = "ad57c0934c818ea476b502f087218105";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${API_TOKEN}&units=metric`;
      const weather = await fetch(url).then((res) => res.json());

      this.weather = {
        description: weather.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        wind: weather.wind.speed, //Скорость ветра в метр / сек
      };
    } catch (err) {
      this.weather = {
        error: "Такого города не существует!",
      };
    }
  }

  async setImage() {
    const getImages = async (query, i) => {
      const API_TOKEN = "roKBADOLV1DtnnRTTXUg7VPxVeUMBF8c2iLiEleU1gA";
      const url = `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&page=${i}&per_page=6&client_id=${API_TOKEN}`;
      const images = await fetch(url).then((res) => res.json());

      return images;
    };

    const randomIntFromOneToSix = () => {
      return Math.floor(Math.random() * 24 + 1);
    };

    this.images = {
      morning: await getImages("morning", randomIntFromOneToSix()),
      afternoon: await getImages("afternoon", randomIntFromOneToSix()),
      evening: await getImages("evening", randomIntFromOneToSix()),
      night: await getImages("night", randomIntFromOneToSix()),
    };
  }

  preloadFullImages() {
    const onLoad = this.getEventListenerContent().onLoadImages;
    const fullImages = [
      ...this.images.morning.results,
      ...this.images.afternoon.results,
      ...this.images.evening.results,
      ...this.images.night.results,
    ];
    this.images.full = [];

    fullImages.map((e) => {
      const img = new Image();
      img.src = e.urls.full;
      img.alt = e.description;
      img.dataset.autor = e.user.name;
      img.dataset.id = e.id;
      img.onload = onLoad(fullImages.length);

      this.images.full.push(img);
    });
  }

  checkIsLoadFullImages() {
    if (this.isLoadFullImages) {
      this.app.classList.remove("app--load");
      return;
    }

    setTimeout(this.checkIsLoadFullImages.bind(this), 1000);
  }

  setCurrentIndexImageFromFull() {
    const idImage = document.querySelector(".image img").dataset.id;
    this.indexImage = this.images.full.findIndex((e) => e.dataset.id === idImage);
  }

  switchBackgroundImagesNewHour() {
    setTimeout(this.switchBackgroundImagesNewHour.bind(this), 1000);

    if (this.isNewHour) {
      this.startIndexImage++;
      this.isNewHour = false;
      this.renderBackgroundImages();
    }
  }

  showPrevImage() {
    this.indexImage = (this.indexImage - 1) % this.images.full.length;
    if (this.indexImage < 0) this.indexImage = 23;
    this.renderBackgroundImages();
  }

  showNextImage() {
    this.indexImage = (this.indexImage + 1) % this.images.full.length;
    if (this.indexImage > 23) this.indexImage = 0;
    this.renderBackgroundImages();
  }

  renderBackgroundImages() {
    const image = this.getImage();
    const isImages = document.querySelector(".image");

    if (isImages) {
      isImages.querySelector(".image img").remove();
      isImages.prepend(this.images.full[this.indexImage]);
      return;
    }

    const template = this.getTemplateContent().images(
      image.urls.full,
      image.description,
      image.user.name,
      image.id
    );

    this.app.insertAdjacentHTML("beforeend", template);

    const onClickBtnBackgroundImages = (evt) => {
      if (evt.target.classList.contains("image__btn--prev")) {
        this.showPrevImage();
        evt.target.blur();
      }

      if (evt.target.classList.contains("image__btn--next")) {
        this.showNextImage();
        evt.target.blur();
      }
    };

    this.app.addEventListener("click", onClickBtnBackgroundImages);
  }

  reRenderTime() {
    const time = document.querySelector(".time");
    setTimeout(this.reRenderTime.bind(this), 1000);

    if (time) {
      time.querySelector(".time__hours").textContent = `${this.time.hours} :`;
      time.querySelector(".time__min").textContent = ` ${this.time.min} :`;
      time.querySelector(".time__sec").textContent = ` ${this.time.sec}`;

      return;
    }
  }

  getEventListenerContent() {
    const resetInputValue = () => {
      const input = document.querySelector(".weather input");

      if (input.value === this.weather.error && input.dataset.old === undefined) {
        input.value = "Укажите Город";
        localStorage.removeItem("city");
      }

      if (this.weather.error && input.dataset.old) {
        input.value = input.dataset.old;
        this.city = input.dataset.old;
        localStorage.setItem("city", input.value);
      }
    };

    const onFocusWeatherInput = () => {
      const input = this.app.querySelector(".weather input");

      if (this.city) {
        input.dataset.old = this.city;
      }

      input.placeholder = "";
      input.value = "";
    };

    const onBlurWeatherInput = () => {
      const input = this.app.querySelector(".weather input");

      if (input.dataset.old) {
        input.value = input.dataset.old;
      }

      if (!this.city.trim()) {
        input.placeholder = "Укажите Город";
        input.value = "";
      }

      if (this.city === this.city) {
        input.value = this.city;
        return;
      }

      if (!this.city && this.weather.error) {
        input.value = "Укажите Город";
      }
    };

    const onKeyUpWeatherInput = () => {
      const input = document.querySelector(".weather input");
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
      this.city = input.value.trim();
    };

    const onClickWeatherBtn = async (evt) => {
      if (evt.target.classList.contains("weather__btn")) {
        document.querySelector(".weather").classList.add("weather--load");

        localStorage.setItem("city", this.city);
        await this.setWeather(this.city);
        const weatherElement = document.querySelector(".weather");

        evt.target.blur();
        setTimeout(resetInputValue, 1000);

        if (this.weather.error) {
          
          weatherElement.querySelector(".weather input").value = this.weather.error;
          weatherElement.classList.remove("weather--load");
          this.city = "";

          if (weatherElement.querySelector(".weather input").dataset.old)
            localStorage.setItem(
              "city",
              weatherElement.querySelector(".weather input").dataset.old
            );
          return;
        }

        weatherElement.querySelector(".weather__description img").src = this.weather.icon;
        weatherElement.querySelector(".weather__description img").alt = this.weather.description;
        weatherElement.querySelector(
          ".weather__description p"
        ).textContent = this.weather.description;
        weatherElement.querySelector(".weather__temp span:first-of-type").textContent =
          "Температура:";
        weatherElement.querySelector(
          ".weather__temp span:last-of-type"
        ).textContent = `${Math.floor(this.weather.temp)}${String.fromCharCode(176)}`;
        weatherElement.querySelector(".weather__humidity span:first-of-type").textContent =
          "Влажность:";
        weatherElement.querySelector(
          ".weather__humidity span:last-of-type"
        ).textContent = `${this.weather.humidity}%`;
        weatherElement.querySelector(".weather__wind-speed span:first-of-type").textContent =
          "Скорость ветра:";
        weatherElement.querySelector(
          ".weather__wind-speed span:last-of-type"
        ).textContent = `${this.weather.wind} м/с`;
        weatherElement.querySelector(".weather__btn").textContent = "Узнать погоду в другом городе";
      }

      document.querySelector(".weather").classList.remove("weather--load");
    };

    const onClickWeatherTitle = (evt) => {
      if (
        window.matchMedia("(max-width: 1199px)").matches &&
        evt.target.classList.contains("weather__title")
      ) {
        evt.target.parentNode.classList.toggle("weather--open");
      }
    };

    const onClickQueoteBtn = async (evt) => {
      if (evt.target.classList.contains("quote__btn")) {
        evt.target.classList.add("quote__btn--load");
        await this.setQuote();
        const queote = document.querySelector(".quote");

        queote.querySelector(".quote > p").textContent = this.quote.quoteText;
        queote.querySelector("footer p").textContent = this.quote.quoteAuthor;

        evt.target.classList.remove("quote__btn--load");

        evt.target.blur();
      }
    };

    const onLoadImages = (length) => {
      this.successLoad++;

      if (this.successLoad === length) {
        this.isLoadFullImages = true;
      }
    };

    const onFocusGreetingInput = () => {
      const input = this.app.querySelector(".greeting__name");

      if (this.userName) {
        input.dataset.old = this.userName;
      }

      input.placeholder = "";
      input.value = "";
    };

    const onBlurGreetingInput = () => {
      const input = this.app.querySelector(".greeting__name");

      if (
        !this.userName & !localStorage.getItem("name") & (input.value !== "") ||
        (input.value !== "") & (localStorage.getItem("name") !== input.value)
      ) {
        this.userName = input.value;
        input.dataset.old = "";
        localStorage.setItem("name", input.value);

        if (input.parentNode.classList.contains("greeting--no-name")) {
          input.parentNode.classList.remove("greeting--no-name");
        }
        return;
      }

      if (input.dataset.old) {
        input.value = input.dataset.old;
      }

      if (!this.userName.trim()) {
        input.placeholder = "Введите имя";
        input.value = "";
      }

      if (this.userName === this.userName) {
        input.value = this.userName;
      }
    };

    const onKeyupGreetingInput = () => {
      const input = this.app.querySelector(".greeting__name");
      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase().trim();
    }

    const onEnterGreetingInput = (evt) => {
      const input = this.app.querySelector(".greeting__name");
      const ENTER_KEY = "Enter";

      if (evt.code === ENTER_KEY) {
        this.userName = input.value;
        input.dataset.old = "";
        localStorage.setItem("name", input.value);
        input.blur();

        if(input.parentNode.classList.contains("greeting--no-name")) {
          input.parentNode.classList.remove("greeting--no-name");
        }
      }
    }

    return {
      resetInputValue,
      onFocusWeatherInput,
      onBlurWeatherInput,
      onKeyUpWeatherInput,
      onClickWeatherBtn,
      onClickWeatherTitle,
      onClickQueoteBtn,
      onLoadImages,
      onKeyupGreetingInput,
      onFocusGreetingInput,
      onBlurGreetingInput,
      onEnterGreetingInput,
    };
  }

  async renderContent() {
    const template = this.getTemplateContent();
    const events = this.getEventListenerContent();

    const Greeting = template.greeting();
    const Targets = template.target();
    const Time = template.time();
    const Date = template.date();
    const Quote = template.quote();
    let Weather;

    if (this.city) {
      await this.setWeather(this.city);
      Weather = template.weather(this.weather);
    } else {
      Weather = template.weather();
    }

    const contentTemplate = `
        <div class="content">
          ${Greeting}
          ${Time}
          ${Weather}
          ${Targets}
          ${Date}
          ${Quote}
        </div>
     `;

    this.app.insertAdjacentHTML("beforeend", contentTemplate);
    this.app.addEventListener("click", events.onClickWeatherBtn);
    this.app.addEventListener("click", events.onClickWeatherTitle);
    this.app.addEventListener("click", events.onClickQueoteBtn);

    this.app.querySelector(".weather input").addEventListener("focus", events.onFocusWeatherInput);
    this.app.querySelector(".weather input").addEventListener("blur", events.onBlurWeatherInput);
    this.app.querySelector(".weather input").addEventListener("keyup", events.onKeyUpWeatherInput);

    this.app.querySelector(".greeting__name").addEventListener("keyup", events.onKeyupGreetingInput);
    this.app.querySelector(".greeting__name").addEventListener("focus", events.onFocusGreetingInput);
    this.app.querySelector(".greeting__name").addEventListener("blur", events.onBlurGreetingInput);
    this.app.querySelector(".greeting__name").addEventListener("keydown", events.onEnterGreetingInput);
    

    this.reRenderTime();
  }

  async render() {
    this.app.classList.add("app--load");

    await this.setImage();
    this.preloadFullImages();
    this.checkIsLoadFullImages();
    this.renderBackgroundImages();
    this.setCurrentIndexImageFromFull();
    this.switchBackgroundImagesNewHour();
    this.renderContent();
    alert("Пожалуйста пока не проверяйте, немного не успеваю дайте еще день.Спасибо)");
  }
}

const app = document.querySelector("#app");
const momentum = new Momentum(app);
momentum.render();
