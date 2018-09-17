import {assert} from 'chai';
import {getResultMessage, getSuccessMessage, timeoutMessage, attemptsEndMessage} from '../js/domain.js';

const results = [
  {points: 10, lives: 3, time: 120},
  {points: 10, lives: 2, time: 110},
  {points: 8, lives: 2, time: 140}
];

describe(`Get result message`, () => {
  it(`should throw Error('first parameter must be an array') when first parameter is not array and secord parameter is object {points: 10, lives: 3, time: 110}`, () => {
    assert.throws(() => getResultMessage(null, {points: 10, lives: 3, time: 110}), `first parameter must be an array`);
  });

  it(`should throw Error when first parameter is valid array and secord parameter is not object`, () => {
    assert.throws(() => getResultMessage([], null), `second parameter must be an object`);
  });

  it(`should throw Error('property points must be a number') when first parameter is valid array and secord parameter is object, but property points is not number`, () => {
    assert.throws(() => getResultMessage([], {points: null, lives: 3, time: 110}), `property points must be a number`);
  });

  it(`should throw Error('property lives of object result must be a number and >= 0') when first parameter is valid array and secord parameter is object, but property lives is not number`, () => {
    assert.throws(() => getResultMessage([], {points: 0, lives: null, time: 110}), `property lives of object result must be a number and >= 0`);
  });

  it(`should throw Error('property time of object result must be a number and >= 0') when first parameter is valid array and secord parameter is object, but property time is not number`, () => {
    assert.throws(() => getResultMessage([], {points: 0, lives: 0, time: null}), `property time of object result must be a number and >= 0`);
  });

  it(`should return "Вы заняли 1 место из 4 игроков. Это лучше, чем у 75% игроков" when first parameter is array ${JSON.stringify(results)} and secord parameter is object {points: 10, lives: 3, time: 110}`, () => {
    const expectedMessage = getSuccessMessage(1, 4);
    assert.equal(getResultMessage(results, {points: 10, lives: 3, time: 110}), expectedMessage);
  });

  it(`should return "Вы заняли 4 место из 4 игроков. Это лучше, чем у 0% игроков" when first parameter is array result is ${JSON.stringify(results)} and secord parameter is object {points: 7, lives: 1, time: 30}`, () => {
    const expectedMessage = getSuccessMessage(4, 4);
    assert.equal(getResultMessage(results, {points: 7, lives: 1, time: 30}), expectedMessage);
  });

  it(`should return "Вы заняли 2 место из 4 игроков. Это лучше, чем у 50% игроков" when first parameter is array result is ${JSON.stringify(results)} and secord parameter is object {points: 10, lives: 2, time: 100}`, () => {
    const expectedMessage = getSuccessMessage(2, 4);
    assert.equal(getResultMessage(results, {points: 10, lives: 2, time: 100}), expectedMessage);
  });

  it(`should return "${attemptsEndMessage}" when first parameter is array result is ${JSON.stringify(results)} and secord parameter is object {points: -1, lives: 0, time: 100}`, () => {
    assert.equal(getResultMessage(results, {points: -1, lives: 0, time: 100}), attemptsEndMessage);
  });

  it(`should return "${timeoutMessage}" when first parameter is array result is ${JSON.stringify(results)} and secord parameter is object {points: -1, lives: 3, time: 300}`, () => {
    assert.equal(getResultMessage(results, {points: -1, lives: 3, time: 300}), timeoutMessage);
  });
});
