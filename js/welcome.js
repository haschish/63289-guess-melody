import AbstractView from './abstract-view';

class Welcome extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const data = (this.data instanceof Object) ? this.data : {};
    return `
      <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
      <h2 class="welcome__rules-title">Правила игры</h2>
      <p class="welcome__text">${data.ruleText}</p>
      <ul class="welcome__rules-list">
        ${data.rules.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p class="welcome__text">${data.wishText}</p>
    `;
  }

  get className() {
    return `welcome`;
  }

  bind() {
    this.element.querySelector(`.welcome__button`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onClick();
    });
  }

  onClick() {
  }
}

export default Welcome;
