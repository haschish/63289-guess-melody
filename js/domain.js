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

const successMessage = (position = 1, all = position) => {
  position = parseInt(position, 10);
  position = (isNaN(position) || position < 1) ? 1 : position;

  all = parseInt(all, 10);
  all = (isNaN(all) || all < 1) ? position : all;

  const percentWhoWorse = parseInt((all - position) / all * 100, 10);
  return `Вы заняли ${position} место из ${all} игроков. Это лучше, чем у ${percentWhoWorse}% игроков`
};
const timeoutMessage = `Время вышло! Вы не успели отгадать все мелодии`;
const attemptsEndMessage = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

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
  if (!Array.isArray(results)) {
    throw new Error('first parameter must be an array');
  }

  if (!(result instanceof Object)) {
    throw new Error('second parameter must be an object');
  }

  if (!Number.isInteger(result.points)) {
    throw new Error('property points must be a number');
  }

  if (!Number.isInteger(result.lives) || result.lives < 0) {
    throw new Error('property lives of object result must be a number and >= 0');
  }

  if (!Number.isInteger(result.time) || result.time < 0) {
    throw new Error('property time of object result must be a number and >= 0');
  }

  if (result.points === FAIL_POINTS) {
    return (result.lives === 0) ? attemptsEndMessage : timeoutMessage;
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

  const position = data.findIndex((item) => item.player) + 1;
  const all = data.length;
  return successMessage(position, all);
}

const getLife = (number) => {
  return new Life(number);
}

const getTimer = (number) => {
  return new Timer(number);
}

export {
  successMessage,
  timeoutMessage,
  attemptsEndMessage,
  countPoints,
  getResultMessage,
  getLife,
  getTimer
};


