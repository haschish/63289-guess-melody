import {assert} from 'chai';
import {getSecondsFromTimeInSeconds} from '../js/utils';

describe(`Get seconds from time in seconds`, () => {
  it(`should throw Error('the parameter must be a number') when parameter is not number`, () => {
    assert.throws(() => getSecondsFromTimeInSeconds(), `the parameter must be a number`);
  });

  it(`should return 0 when parameter is 0`, () => {
    assert.equal(0, getSecondsFromTimeInSeconds(0));
  });

  it(`should return 19 when parameter is 19`, () => {
    assert.equal(19, getSecondsFromTimeInSeconds(19));
  });

  it(`should return 5 when parameter is 65`, () => {
    assert.equal(5, getSecondsFromTimeInSeconds(65));
  });

  it(`should return -5 when parameter is -65`, () => {
    assert.equal(-5, getSecondsFromTimeInSeconds(-65));
  });
});
