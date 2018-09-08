import AbstractView from './abstract-view';

class GameHeaderView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `game__header`;
  }

  get template() {
    const data = (this.data instanceof Object) ? this.data : {};
    return `
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370"
                style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">05</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">00</span>
      </div>

      <div class="game__mistakes">
        <div class="wrong"></div>
        <div class="wrong"></div>
        <div class="wrong"></div>
      </div>
    `;
  }

  bind() {
    this.element.querySelector(`.game__back`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackClick();
    });
  }

  onBackClick() {
  }
}

export default GameHeaderView;
