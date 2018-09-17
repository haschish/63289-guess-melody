import {assert} from 'chai';
import {getSuccessMessage} from '../js/domain.js';

describe(`Get getSuccessMessage`, () => {
  it(`should return "Вы заняли 1 место из 3 игроков. Это лучше, чем у 66% игроков" when first parameter is 1 and second is 3`, () => {
    assert.equal(`Вы заняли 1 место из 3 игроков. Это лучше, чем у 66% игроков`, getSuccessMessage(1, 3));
  });

  it(`should return "Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков" when first parameter is 1 and second is undefined`, () => {
    assert.equal(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, getSuccessMessage(1));
  });

  it(`should return "Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков" when parameters are undefined`, () => {
    assert.equal(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, getSuccessMessage());
  });

  it(`should return "Вы заняли 2 место из 2 игроков. Это лучше, чем у 0% игроков" when first parameter is 2 and second is not valid number`, () => {
    assert.equal(`Вы заняли 2 место из 2 игроков. Это лучше, чем у 0% игроков`, getSuccessMessage(2, null));
  });

  it(`should return "Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков" when arguments are not valid numbers`, () => {
    assert.equal(`Вы заняли 1 место из 1 игроков. Это лучше, чем у 0% игроков`, getSuccessMessage(false, null));
  });
});
