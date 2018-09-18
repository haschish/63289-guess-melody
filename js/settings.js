const DEBUG_MODE = true;
const MIN_ANSWERS = 10;
const NUMBER_OF_LIVES = 3;
const Time = {
  GAME: 300,
  FINISHED: 30,
  FAST_ANSWER: 30
};
const Point = {
  VALID_ANSWER: 1,
  FAST_ANSWER: 2,
  FAIL_ANSWER: -2,
  FAIL: -1
};

export {
  DEBUG_MODE,
  MIN_ANSWERS,
  NUMBER_OF_LIVES,
  Time,
  Point
};
