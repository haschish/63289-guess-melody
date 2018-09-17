import {changeScreen} from './utils.js';
import Welcome from './welcome';
import GameModel from './game-model';
import Game from './game';
import Result from './result';
import API from './api';
import {getResultData} from './domain.js';
import {Point} from './settings';
import ErrorView from './error-view';

let questions;

class Application {
  static showError(e) {
    const error = new ErrorView(e.message);
    document.body.appendChild(error.element);
  }

  static showWelcome() {
    const welcome = new Welcome();
    welcome.showLoading();
    changeScreen(welcome.element);
    API.loadQuestions()
      .then((data) => {
        questions = data;
        return questions;
      })
      .catch(Application.showError)
      .then(() => welcome.hideLoading());
  }

  static showGame() {
    const model = new GameModel({questions});
    const game = new Game(model);
    changeScreen(game.element);
    game.start();
  }

  static showResult(result) {
    API.loadResults()
      .then((results) => getResultData(results, result))
      .catch(() => getResultData([], result))
      .then((resultData) => new Result(resultData))
      .then((screen) => {
        changeScreen(screen.element);
        const {points, lives, time} = screen.data;
        if (points > Point.FAIL) {
          return API.saveResult({points, lives, time});
        }
        return 0;
      })
      .catch(Application.showError);
  }

}

export default Application;
