import {assert} from 'chai';
import {getResultMessage, getSuccessMessage, Message} from '../js/domain.js';

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

  it(`should return "${Message.ATTEMPTS_END}" when first parameter is array result is ${JSON.stringify(results)} and secord parameter is object {points: -1, lives: 0, time: 100}`, () => {
    assert.equal(getResultMessage(results, {points: -1, lives: 0, time: 100}), Message.ATTEMPTS_END);
  });

  it(`should return "${Message.TIMEOUT}" when first parameter is array result is ${JSON.stringify(results)} and secord parameter is object {points: -1, lives: 3, time: 300}`, () => {
    assert.equal(getResultMessage(results, {points: -1, lives: 3, time: 300}), Message.TIMEOUT);
  });
});
