import {MIN_ANSWERS, NUMBER_OF_LIVES, Time, Point} from './settings';
import {getMinutesFromTimeInSeconds, getSecondsFromTimeInSeconds} from './utils';

const Message = {
  TIMEOUT: `Время вышло! Вы не успели отгадать все мелодии`,
  ATTEMPTS_END: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  YOU_ARE_MUSIC_LOVER: `Вы настоящий меломан!`,
  WHAT_A_PITY: `Какая жалость!`,
  SADLY: `Увы и ах!`
};

const getSuccessMessage = (position = 1, all = position) => {
  position = parseInt(position, 10);
  position = (isNaN(position) || position < 1) ? 1 : position;

  all = parseInt(all, 10);
  all = (isNaN(all) || all < 1) ? position : all;

  const percentWhoWorse = parseInt((all - position) / all * 100, 10);
  return `Вы заняли ${position} место из ${all} игроков. Это лучше, чем у ${percentWhoWorse}% игроков`;
};

const getPointsForAnswer = (answer) => {
  if (!(answer instanceof Object)) {
    throw new Error(`the parameter must be an object`);
  }

  switch (true) {
    case (!answer.correct): return Point.FAIL_ANSWER;
    case (answer.time < Time.FAST_ANSWER): return Point.FAST_ANSWER;
    default: return Point.VALID_ANSWER;
  }
};

const countPoints = (responses = []) => {
  if (responses.length < MIN_ANSWERS) {
    return Point.FAIL;
  }

  return responses.map(getPointsForAnswer).reduce((sum, item) => sum + item, 0);
};

const getResultMessage = (results, result) => {
  if (!Array.isArray(results)) {
    throw new Error(`first parameter must be an array`);
  }

  if (!(result instanceof Object)) {
    throw new Error(`second parameter must be an object`);
  }

  if (result.points === Point.FAIL) {
    return (result.lives === 0) ? Message.ATTEMPTS_END : Message.TIMEOUT;
  }

  const data = results.concat(Object.assign({}, result, {player: true}));
  data.sort((a, b) => {
    switch (true) {
      case (a.points !== b.points): return b.points - a.points;
      case (a.lives !== b.lives): return b.lives - a.lives;
      default: return a.time - b.time;
    }
  });

  const position = data.findIndex((item) => item.player) + 1;
  const all = data.length;
  return getSuccessMessage(position, all);
};

const getTimeString = (time) => {
  const minutes = getMinutesFromTimeInSeconds(time);
  const seconds = getSecondsFromTimeInSeconds(time);

  return `${(minutes > 0) ? `${minutes} минут` : ``} ${seconds} секунд`.trim();
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
  Message,
  getSuccessMessage,
  countPoints,
  getPointsForAnswer,
  getResultMessage,
  getResultData,
  checkArtistQuestion,
  checkGenreQuestion,
  getTimeString
};
