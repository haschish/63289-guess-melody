import {changeScreen} from './utils.js';
import Welcome from './welcome';
import GameModel from './game-model';
import Game from './game';
import Result from './result';
import API from './api';
import { FAIL_POINTS, getResultData } from './domain.js';

class Application {

  static showWelcome() {
    const welcome = new Welcome();
    changeScreen(welcome.element);
  }

  static showGame() {
    API.loadQuestions()
      .then((questions) => new GameModel({questions}))
      .then((model) => new Game(model))
      .then((game) => {
        changeScreen(game.element);
        game.start();
      })
      .catch(console.log);
  }

  static showResult(result) {
    API.loadResults()
      .then((results) => getResultData(results, result))
      .catch(() => getResultData([], result))
      .then((resultData) => new Result(resultData))
      .then((screen) => {
        changeScreen(screen.element);
        const {points, lives, time} = screen.data;
        if (points > FAIL_POINTS) {
          return API.saveResult({points, lives, time});
        }
      })
      .catch(console.log);
  }

}

export default Application;

const debugMode = true;

export {
  debugMode
};
