import AbstractView from './abstract-view.js';

class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = (data instanceof Object) ? data : {};
  }

  get template() {
    return `
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      ${this.renderResult(this.data)}
    `;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `result`;
  }

  bind() {
    const replayButton = this.element.querySelector(`.result__replay`);
    if (!replayButton) {
      return;
    }

    replayButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onReplayClick();
    });
  }

  renderResult() {
    return `<button class="result__replay" type="button">Сыграть ещё раз</button>`;
  }

  onReplayClick() {
  }
}

export default ResultView;
