import {assert} from 'chai';
import {getPointsForAnswer} from '../js/domain';
import {Point, Time} from '../js/settings';

describe(`Get points for answer`, () => {
  it(`should throw Error('the parameter must be an object') when parameter is not object`, () => {
    assert.throws(() => getPointsForAnswer(), `the parameter must be an object`);
  });

  it(`should return ${Point.FAIL_ANSWER} when answer is not correct`, () => {
    assert.equal(Point.FAIL_ANSWER, getPointsForAnswer({correct: false, time: 30}));
  });

  it(`should return ${Point.FAST_ANSWER} when answer is correct and time < ${Time.FAST_ANSWER}`, () => {
    assert.equal(Point.FAST_ANSWER, getPointsForAnswer({correct: true, time: 20}));
  });

  it(`should return ${Point.VALID_ANSWER} when answre is correct and time > ${Time.FAST_ANSWER}`, () => {
    assert.equal(Point.VALID_ANSWER, getPointsForAnswer({correct: true, time: 40}));
  });
});
