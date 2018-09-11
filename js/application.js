import {changeScreen} from './utils.js';
import Welcome from './welcome';
import questions from './data/questions.js';
import GameModel from './game-model';
import Game from './game';
import Result from './result';

class Application {

  static showWelcome() {
    const welcome = new Welcome();
    changeScreen(welcome.element);
  }

  static showGame() {
    const model = new GameModel({questions});
    const game = new Game(model);
    changeScreen(game.element);
    game.start();
  }

  static showResult(resultData) {
    const result = new Result(resultData);
    changeScreen(result.element);
  }

}

export default Application;
