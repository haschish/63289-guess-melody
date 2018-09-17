import {assert} from 'chai';
import {getMinutesFromTimeInSeconds} from '../js/utils';

describe(`Get minutes from time in seconds`, () => {
  it(`should throw Error('the parameter must be a number') when parameter is not number`, () => {
    assert.throws(() => getMinutesFromTimeInSeconds(), `the parameter must be a number`);
  });

  it(`should return 0 when parameter is 20`, () => {
    assert.equal(0, getMinutesFromTimeInSeconds(20));
  });

  it(`should return 1 when parameter is 65`, () => {
    assert.equal(1, getMinutesFromTimeInSeconds(65));
  });

  it(`should return -1 when parameter is -65`, () => {
    assert.equal(-1, getMinutesFromTimeInSeconds(-65));
  });
});
