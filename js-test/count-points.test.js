import {assert} from 'chai';
import {countPoints} from '../js/domain.js';

describe(`Count points`, () => {
  it(`should return -1 when count of element less then 10`, () => {
    const arrayOfResponse = [{correct: true, time: 10}];
    const lives = 0;
    assert.equal(-1, countPoints(arrayOfResponse, lives));
  });

  it(`should return 10 when all responses are true and not fast`, () => {
    const arrayOfResponse = [
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30}
    ];

    assert.equal(10, countPoints(arrayOfResponse, 3));
  });

  it(`should return 13 when all responses are true with 3 are fast`, () => {
    const arrayOfResponse = [
      {correct: true, time: 10},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 10},
      {correct: true, time: 10}
    ];
    const lives = 3;

    assert.equal(13, countPoints(arrayOfResponse, lives));
  });

  it(`should return 4 when 8 responses are true and 2 false and all not fast`, () => {
    const arrayOfResponse = [
      {correct: false, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: true, time: 30},
      {correct: false, time: 30},
      {correct: true, time: 30}
    ];
    const lives = 1;

    assert.equal(4, countPoints(arrayOfResponse, lives));
  });

  it(`should return 7 when 8 responses are true with 3 are fast and 2 false with is fast`, () => {
    const arrayOfResponse = [
      {correct: false, time: 10},
      {correct: true, time: 30},
      {correct: true, time: 10},
      {correct: true, time: 30},
      {correct: true, time: 10},
      {correct: true, time: 30},
      {correct: true, time: 10},
      {correct: true, time: 30},
      {correct: false, time: 30},
      {correct: true, time: 30}
    ];
    const lives = 1;

    assert.equal(7, countPoints(arrayOfResponse, lives));
  });
});
