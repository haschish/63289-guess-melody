import {countPoints, getResultMessage, NUMBER_OF_LIVES, FAIL_POINTS, TIME_FAST_ANSWER} from './domain.js';
import AbstractView from './abstract-view.js';

const renderResult = (data) => {
  switch (data.points) {
    case FAIL_POINTS: return `
      <h2 class="result__title">${data.title}</h2>
      <p class="result__total result__total--fail">${data.text}</p>
    `;
    default: return `
      <h2 class="result__title">${data.title}</h2>
      <p class="result__total">${data.total}</p>
      <p class="result__text">${data.text}</p>
    `;
  }
}

const getResultData = ({answers, lives, time}) => {
  const points = countPoints(answers, lives);
  const result = {
    points,
    lives,
    time
  };
  result.text = getResultMessage([], result);
  if (result.points > FAIL_POINTS) {
    const countFastAnswers = answers.filter((item) => item.time < TIME_FAST_ANSWER).length;

    result.title = `Вы настоящий меломан!`;
    result.total = `За ${time} секунд вы набрали ${points} баллов (${countFastAnswers} быстрых), совершив ${NUMBER_OF_LIVES - lives} ошибки`;
  } else {
    result.title = (lives === 0) ? `Какая жалость!` : `Увы и ах!`;
  }

  return result;
}

class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const data = (this.data instanceof Object) ? this.data : {};
    return `
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      ${renderResult(getResultData(data))}
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
