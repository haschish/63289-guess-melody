import {assert} from 'chai';
import {getTimeString} from '../js/domain.js';

describe.only(`Get time string`, () => {
  it(`should throw Error('first parameter must be an array') when parameter is not number`, () => {
    assert.throws(() => getTimeString(), `parameter must be a number`);
  });

  it(`should return "0 секунд" when parameter is 0`, () => {
    assert.equal(`0 секунд`, getTimeString(0));
  });

  it(`should return "45 секунд" when parameter is 45`, () => {
    assert.equal(`45 секунд`, getTimeString(45));
  });

  it(`should return "1 минут 20 секунд" when parameter is 80`, () => {
    assert.equal(`1 минут 20 секунд`, getTimeString(80));
  });
});
