import Life from './Life.js';
import Timer from './Timer.js';

const K_FOR_FAIL = 2;
const POINTS_FOR_VALID_ANSWER = 1;
const POINTS_FOR_FAST_ANSWER = 2;
const TIME_FAST_ANSWER = 30;
const MIN_ANSWERS = 10;
const NUMBER_OF_LIVES = 3;
const FAIL_POINTS = -1;
const TIME_GAME = 300;

const successMessage = (...values) => {
  return `Вы заняли ${values[0]} место из ${values[1]} игроков. Это лучше, чем у ${values[2]}% игроков`
};
const timeoutMessage = `Время вышло! Вы не успели отгадать все мелодии`;
const attemptsEndMessage = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
const errorMessage = `Error`;


const countPoints = (responses = [], lives = 0) => {
  if (responses.length < MIN_ANSWERS) {
    return -1;
  }

  let sum = 0;
  responses.forEach((item) => {
    if (item.correct) {
      sum += (item.time < TIME_FAST_ANSWER) ? POINTS_FOR_FAST_ANSWER : POINTS_FOR_VALID_ANSWER;
    }
  });

  sum += (lives - NUMBER_OF_LIVES) * K_FOR_FAIL;

  return Math.max(sum, 0);
}

const getResultMessage = (results, result) => {
  if (result.points === FAIL_POINTS) {
    if (result.lives === 0) {
      return attemptsEndMessage;
    } else if (result.time >= TIME_GAME) {
      return timeoutMessage;
    } else {
      return errorMessage;
    }
  }

  const data = results.concat({...result, player: true});
  data.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points
    } else if (a.lives !== b.lives) {
      return b.lives - a.lives;
    } else {
      return a.time - b.time;
    }
  });

  const index = data.findIndex((item) => item.player);
  const i = index + 1;
  const len = data.length;
  const n = parseInt((len - i) / len * 100, 10);
  return successMessage(i, len, n);
}

const getLife = (number) => {
  return new Life(number);
}

const getTimer = (number) => {
  return new Timer(number);
}

export {
  errorMessage,
  successMessage,
  timeoutMessage,
  attemptsEndMessage,
  countPoints,
  getResultMessage,
  getLife,
  getTimer
};


