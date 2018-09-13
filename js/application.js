import {changeScreen} from './utils.js';
import Welcome from './welcome';
import questions from './data/questions.js';
import GameModel from './game-model';
import Game from './game';
import Result from './result';
import API from './api';

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

  static showResult(resultData) {
    const result = new Result(resultData);
    changeScreen(result.element);
  }

}

export default Application;
