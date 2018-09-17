import {assert} from 'chai';
import {getTwoDigitNumber} from '../js/utils';

describe(`Get two digit number`, () => {
  it(`should throw Error('the parameter must be a number') when parameter is not number`, () => {
    assert.throws(() => getTwoDigitNumber(), `the parameter must be a number`);
  });

  it(`should return "00" when parameter is 0`, () => {
    assert.equal(`00`, getTwoDigitNumber(0));
  });

  it(`should return "01" when parameter is 1`, () => {
    assert.equal(`01`, getTwoDigitNumber(1));
  });

  it(`should return "11" when parameter is 11`, () => {
    assert.equal(`11`, getTwoDigitNumber(11));
  });

  it(`should return "-1" when parameter is -1`, () => {
    assert.equal(`-1`, getTwoDigitNumber(-1));
  });
});
