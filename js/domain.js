import {K_FAIL, MIN_ANSWERS, NUMBER_OF_LIVES, Time, Point} from './settings';

const Message = {
  TIMEOUT: `Время вышло! Вы не успели отгадать все мелодии`,
  ATTEMPTS_END: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  YOU_ARE_MUSIC_LOVER: `Вы настоящий меломан!`,
  WHAT_A_PITY: `Какая жалость!`,
  SADLY: `Увы и ах!`
};
const SECONDS_IN_MINUTE = 60;

const getSuccessMessage = (position = 1, all = position) => {
  position = parseInt(position, 10);
  position = (isNaN(position) || position < 1) ? 1 : position;

  all = parseInt(all, 10);
  all = (isNaN(all) || all < 1) ? position : all;

  const percentWhoWorse = parseInt((all - position) / all * 100, 10);
  return `Вы заняли ${position} место из ${all} игроков. Это лучше, чем у ${percentWhoWorse}% игроков`;
};


const countPoints = (responses = [], lives = 0) => {
  if (responses.length < MIN_ANSWERS) {
    return Point.FAIL;
  }

  let sum = 0;
  responses.forEach((item) => {
    if (item.correct) {
      sum += (item.time < Time.FAST_ANSWER) ? Point.FAST_ANSWER : Point.VALID_ANSWER;
    }
  });

  sum += (lives - NUMBER_OF_LIVES) * K_FAIL;

  return Math.max(sum, 0);
};

const getResultMessage = (results, result) => {
  if (!Array.isArray(results)) {
    throw new Error(`first parameter must be an array`);
  }

  if (!(result instanceof Object)) {
    throw new Error(`second parameter must be an object`);
  }

  if (!Number.isInteger(result.points)) {
    throw new Error(`property points must be a number`);
  }

  if (!Number.isInteger(result.lives) || result.lives < 0) {
    throw new Error(`property lives of object result must be a number and >= 0`);
  }

  if (!Number.isInteger(result.time) || result.time < 0) {
    throw new Error(`property time of object result must be a number and >= 0`);
  }

  if (result.points === Point.FAIL) {
    return (result.lives === 0) ? Message.ATTEMPTS_END : Message.TIMEOUT;
  }

  const data = results.concat(Object.assign({}, result, {player: true}));
  data.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    } else if (a.lives !== b.lives) {
      return b.lives - a.lives;
    } else {
      return a.time - b.time;
    }
  });

  const position = data.findIndex((item) => item.player) + 1;
  const all = data.length;
  return getSuccessMessage(position, all);
};

const getTimeString = (seconds) => {
  seconds = parseInt(seconds, 10);
  if (isNaN(seconds)) {
    throw new Error(`parameter must be a number`);
  }

  const secondsString = `${seconds % SECONDS_IN_MINUTE} секунд`;
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  const minutesString = (minutes > 0) ? `${minutes} минут` : ``;
  return `${minutesString} ${secondsString}`.trim();
};

const getResultData = (results, result) => {
  const {answers, lives, time} = result;
  const points = countPoints(answers, lives);
  const resultData = {
    points,
    lives,
    time: Time.GAME - time
  };

  resultData.text = getResultMessage(results, resultData);
  if (resultData.points > Point.FAIL) {
    const countFastAnswers = answers.filter((item) => item.time < Time.FAST_ANSWER).length;

    resultData.title = Message.YOU_ARE_MUSIC_LOVER;
    resultData.total = `За ${getTimeString(resultData.time)} вы набрали ${points} баллов (${countFastAnswers} быстрых), совершив ${NUMBER_OF_LIVES - lives} ошибки`;
  } else {
    resultData.title = (lives === 0) ? Message.WHAT_A_PITY : Message.SADLY;
  }

  return resultData;
};

const checkArtistQuestion = (question, answerIndex) => {
  if (!(question.answers instanceof Array) || !(typeof answerIndex === `number`)) {
    return false;
  }

  return question.answers[answerIndex].isCorrect;
};

const checkGenreQuestion = (question, answer) => {
  return answer.every((item) => item === question.genre);
};

export {
  Time,
  Point,
  getSuccessMessage,
  countPoints,
  getResultMessage,
  getResultData,
  checkArtistQuestion,
  checkGenreQuestion,
  getTimeString
};
