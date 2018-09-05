import {assert} from 'chai';
import {checkQuestion} from '../js/domain.js';

const question = {
  type: `genre`,
  text: `Выберите инди-рок треки`,
  answers: [
    {url: ``, correct: true},
    {url: ``, correct: true},
    {url: ``, correct: false},
    {url: ``, correct: false}
  ]
};

describe(`Check answer`, () => {
  it(`should return false when first parameter is undefined`, () => {
    assert.isNotOk(checkQuestion(undefined, [1]));
  });

  it(`should return false when first parameter hasn't answers property`, () => {
    assert.isNotOk(checkQuestion({}, [1]));
  });

  it(`should return false when second parameter is undefined`, () => {
    assert.isNotOk(checkQuestion(question));
  });

  it(`should return false when second parameter is not Array`, () => {
    assert.isNotOk(checkQuestion(question, {}));
  });

  it(`should return false when second parameter is empty Array`, () => {
    assert.isNotOk(checkQuestion(question, []));
  });

  it(`should return false when answer is not correct`, () => {
    assert.isNotOk(checkQuestion(question, [3]));
  });

  it(`should return true when answer is correct`, () => {
    assert.isOk(checkQuestion(question, [0, 1]));
  });

  it(`should return true when answer is correct but different order`, () => {
    assert.isOk(checkQuestion(question, [1, 0]));
  });
});
