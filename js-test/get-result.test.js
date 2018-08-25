import {assert} from 'chai';
import {getResultMessage, successMessage, timeoutMessage, attemptsEndMessage, errorMessage} from '../js/domain.js';

const results = [
  {points: 10, lives: 3, time: 120},
  {points: 10, lives: 2, time: 110},
  {points: 8, lives: 2, time: 140}
];

describe(`Get result message`, () => {
  const result1 = {points: 10, lives: 3, time: 110};
  const expectedMessage1 = successMessage(1, 4, 75);
  it(`should return "${expectedMessage1}" when result is ${JSON.stringify(result1)}`, () => {
    assert.equal(expectedMessage1, getResultMessage(results, result1));
  });

  const result2 = {points: 7, lives: 1, time: 30};
  const expectedMessage2 = successMessage(4, 4, 0);
  it(`should return "${expectedMessage2}" when result is ${JSON.stringify(result2)}`, () => {
    assert.equal(expectedMessage2, getResultMessage(results, result2));
  });

  const result3 = {points: 10, lives: 2, time: 100};
  const expectedMessage3 = successMessage(2, 4, 50);
  it(`should return "${expectedMessage3}" when result is ${JSON.stringify(result3)}`, () => {
    assert.equal(expectedMessage3, getResultMessage(results, result3));
  });

  const result4 = {points: -1, lives: 0, time: 100};
  it(`should return "${attemptsEndMessage}" when result is ${JSON.stringify(result4)}`, () => {
    assert.equal(attemptsEndMessage, getResultMessage(results, result4));
  });

  const result5 = {points: -1, lives: 3, time: 300};
  it(`should return "${timeoutMessage}" when result is ${JSON.stringify(result5)}`, () => {
    assert.equal(timeoutMessage, getResultMessage(results, result5));
  });

  const result6 = {points: -1, lives: 3, time: 200};
  it(`should return "${errorMessage}" when result is ${JSON.stringify(result6)}`, () => {
    assert.equal(errorMessage, getResultMessage(results, result6));
  });
});
