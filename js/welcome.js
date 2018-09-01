import {createElement, changeScreen} from './utils.js';
import game from './game.js';
import questions from './data/questions.js';

export default (data) => {
  const innerHTML = `
    <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
    <h2 class="welcome__rules-title">Правила игры</h2>
    <p class="welcome__text">${data.ruleText}</p>
    <ul class="welcome__rules-list">
      ${data.rules.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p class="welcome__text">${data.wishText}</p>
  `;

  const element = createElement(`section`, {className: `welcome`, innerHTML});
  const button = element.querySelector(`.welcome__button`);
  button.addEventListener(`click`, () => {
    changeScreen(game(questions));
  });

  return element;
}
