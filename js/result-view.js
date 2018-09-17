import {Point} from './domain.js';
import AbstractView from './abstract-view.js';

const renderResult = (data) => {
  switch (data.points) {
    case Point.FAIL: return `
      <h2 class="result__title">${data.title}</h2>
      <p class="result__total result__total--fail">${data.text}</p>
    `;
    default: return `
      <h2 class="result__title">${data.title}</h2>
      <p class="result__total">${data.total}</p>
      <p class="result__text">${data.text}</p>
    `;
  }
};

class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = (data instanceof Object) ? data : {};
  }

  get template() {
    return `
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      ${renderResult(this.data)}
      <button class="result__replay" type="button">Сыграть ещё раз</button>
    `;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `result`;
  }

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplayClick();
    });
  }

  onReplayClick() {
  }
}

export default ResultView;
