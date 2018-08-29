import {assert} from 'chai';
import {getTimer} from '../js/domain.js';
import Timer from '../js/Timer.js';

describe(`getTimer`, () => {
  it(`should return object Timer`, () => {
    const timer = getTimer();
    assert.equal(true, timer instanceof Timer);
  });

  it(`object Timer should contains method tick`, () => {
    const timer = getTimer();
    assert.equal(`function`, typeof timer.tick);
  });

  it(`should return object Timer with count = 3 when parameter = 3`, () => {
    const timer = getTimer(3);
    assert.equal(3, timer.count);
  });

  it(`should return object Timer with count = 0 when parameter is a not valid number`, () => {
    const timer = getTimer(NaN);
    assert.equal(0, timer.count);
  });

  it(`should return object Timer with count = 0 when parameter is a negative number`, () => {
    const timer = getTimer(-1);
    assert.equal(0, timer.count);
  });

  it(`method tick should decrease count by one and return count`, () => {
    const initCount = 2;
    const timer = getTimer(initCount);
    assert.equal(initCount, timer.count);
    assert.equal(initCount - 1, timer.tick());
    assert.equal(initCount - 1, timer.count);
  });

  it(`if count = 0 method tick should only return count`, () => {
    const initCount = 2;
    const timer = getTimer(initCount);
    assert.equal(initCount, timer.count);
    assert.equal(1, timer.tick());
    assert.equal(0, timer.tick());
    assert.equal(0, timer.tick());
  });
});
