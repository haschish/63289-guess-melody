import {assert} from 'chai';
import {getLife} from '../js/domain.js';
import Life from '../js/Life.js';

describe(`getLife`, () => {
  it(`should return object Life`, () => {
    const life = getLife();
    assert.equal(true, life instanceof Life);
  });

  it(`object Life should contains method decrease`, () => {
    const life = getLife();
    assert.equal(`function`, typeof life.decrease);
  });

  it(`should return object Life with count = 3 when parameter = 3`, () => {
    const life = getLife(3);
    assert.equal(3, life.count);
  });

  it(`should return object Life with count = 0 when parameter is a not valid number`, () => {
    const life = getLife(NaN);
    assert.equal(0, life.count);
  });

  it(`should return object Life with count = 0 when parameter is a negative number`, () => {
    const life = getLife(-1);
    assert.equal(0, life.count);
  });

  it(`method decrease should decrease count by one and return count`, () => {
    const initCount = 2;
    const life = getLife(initCount);
    assert.equal(initCount, life.count);
    assert.equal(initCount - 1, life.decrease());
    assert.equal(initCount - 1, life.count);
  });

  it(`if count = 0 method decrease should only return count`, () => {
    const initCount = 2;
    const life = getLife(initCount);
    assert.equal(initCount, life.count);
    assert.equal(1, life.decrease());
    assert.equal(0, life.decrease());
    assert.equal(0, life.decrease());
  });
});
