import AbstractView from './abstract-view';
import {NUMBER_OF_LIVES, TIME_FINISHED} from './domain';

class GameHeaderView extends AbstractView {
  constructor({time, lives}) {
    super();
    this.time = time;
    this.mistakes = NUMBER_OF_LIVES - lives;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `game__header`;
  }

  _getTwoDigitNumber(number) {
    return (number < 10) ? `0${number}` : `${number}`;
  }

  _getMinutes(time) {
    const minutes = parseInt(time / 60, 10);
    return this._getTwoDigitNumber(minutes);
  }

  _getSeconds(time) {
    const seconds = time % 60;
    return this._getTwoDigitNumber(seconds);
  }

  get template() {
    const {time, mistakes} = this;
    const minutes = this._getMinutes(time);
    const seconds = this._getSeconds(time);
    const timerClassFinished = (time < TIME_FINISHED) ? `timer__value--finished` : ``;

    return `
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370"
                style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value ${timerClassFinished}" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${minutes}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${seconds}</span>
      </div>

      <div class="game__mistakes">
        ${Array.from({length: mistakes}).map(() => `<div class="wrong"></div>`).join(``)}
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
