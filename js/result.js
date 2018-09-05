import {createElement, changeScreen} from './utils.js';
import {countPoints, getResultMessage, NUMBER_OF_LIVES} from './domain.js';
import welcome from './welcome.js';
import welcomeData from './data/welcome.js';

const renderResult = (data) => {
  switch (data.points) {
    case -1: return `
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
  if (result.points > -1) {
    result.title = `Вы настоящий меломан!`;
    result.total = `За ${time} секунд вы набрали ${points} баллов (8 быстрых), совершив ${NUMBER_OF_LIVES - lives} ошибки`;
  } else {
    result.title = (lives === 0) ? `Какая жалость!` : `Увы и ах!`;
  }

  return result;
}

export default (data) => {
  const innerHTML = `
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    ${renderResult(getResultData(data))}
    <button class="result__replay" type="button">Сыграть ещё раз</button>
  `;

  const element = createElement(`section`, {className: `result`, innerHTML});
  const button = element.querySelector(`.result__replay`);
  button.addEventListener(`click`, () => {
    changeScreen(welcome(welcomeData));
  });

  return element;
};
