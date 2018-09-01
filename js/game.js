import {createElement, changeScreen} from './utils.js';
import welcome from './welcome.js';
import welcomeData from './data/welcome.js';
import {checkQuestion, getLife, getTimer} from './domain.js';
import result from './result.js';

let answers;
let currentQuestionIndex;
let questions;
let life;
let timer;

const init = (data) => {
  currentQuestionIndex = -1;
  answers = [];
  questions = data;
  life = getLife(3);
  timer = getTimer(30);
};

const getIntOfValue = (item) => parseInt(item.value, 10);
const getChecked = (item) => item.checked;

const renderGenre = (data) => {
  return `
    <h2 class="game__title">${data.text}</h2>
    <form class="game__tracks">
      ${data.answers.map((item, index) => {
        return `
          <div class="track">
            <button class="track__button track__button--play" type="button"></button>
            <div class="track__status">
              <audio></audio>
            </div>
            <div class="game__answer">
              <input class="game__input visually-hidden" type="checkbox" name="answer" value="${index}" id="answer-${index}">
              <label class="game__check" for="answer-${index}">Отметить</label>
            </div>
          </div>
        `;
      }).join('')}

      <button class="game__submit button" type="submit" disabled>Ответить</button>
    </form>
  `;
};

const getCheckboxes = () => gameScreen.querySelectorAll(`[type="checkbox"]`);

const getButtonSubmit = () => gameScreen.querySelector(`.game__submit`);

const onCheckboxesChange = () => {
  const button = getButtonSubmit();
  const checked = Array.from(getCheckboxes()).some((item) => item.checked);
  button.disabled = !checked;
};

const onSubmitClick = (evt) => {
  evt.preventDefault();
  const answer = getAnswer(getCheckboxes(), timer.count);
  checkLives(answer);
}

const renderArtist = (data) => {
  return `
    <h2 class="game__title">Кто исполняет эту песню?</h2>
    <div class="game__track">
      <button class="track__button track__button--play" type="button"></button>
      <audio></audio>
    </div>

    <form class="game__artist">
      ${data.answers.map((item, index) => {
        return `
          <div class="artist">
            <input class="artist__input visually-hidden" type="radio" name="answer" value="${index}" id="answer-${index}">
            <label class="artist__name" for="answer-${index}">
              <img class="artist__picture" src="${item.src || `http://placehold.it/134x134`}" alt="${item.text}">
              ${item.text}
            </label>
          </div>
        `;
      }).join('')}
    </form>
  `;
}

const getRadioInputs = () => gameScreen.querySelectorAll(`[type="radio"]`);

const onRadioInputsChange = (evt) => {
  evt.preventDefault();
  const answer = getAnswer(getRadioInputs(), timer.count);
  checkLives(answer);
};

const getAnswer = (collection, time) => {
  const selectedIndex = Array.from(collection).filter((item) => item.checked).map((item) => parseInt(item.value, 10));
  return {
    correct: checkQuestion(questions[currentQuestionIndex], selectedIndex),
    time
  };
};

const checkLives = (answer) => {
  if (!answer.correct) {
    if (life.decrease() === 0) {
      renderResult();
      return;
    }
  }

  answers.push(answer);
  renderNextQuestion();
}

const renderResult = () => {
  changeScreen(result({answers, lives: life.count, time: timer.count}));
}

const renderNextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    renderResult();
    return;
  }

  const question = questions[currentQuestionIndex];
  switch (question.type) {
    case `genre`: gameScreen.innerHTML = renderGenre(question);
      getCheckboxes().forEach((item) => item.addEventListener(`change`, onCheckboxesChange));
      getButtonSubmit().addEventListener(`click`, onSubmitClick);
      break;
    case `artist`: gameScreen.innerHTML = renderArtist(question);
      getRadioInputs().forEach((item) => item.addEventListener(`change`, onRadioInputsChange));
      break;
  }
};

const gameScreen = createElement(`section`, {className: `game__screen`});

export default (data) => {
  init(data);

  const innerHTML = `
    <header class="game__header">
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
    </header>
  `;

  const element = createElement(`section`, {className: `game game--genre`, innerHTML});

  const gameBack = element.querySelector(`.game__back`);
  gameBack.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    changeScreen(welcome(welcomeData));
  });
  element.appendChild(gameScreen);
  renderNextQuestion();

  return element;
};
