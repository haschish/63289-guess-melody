import ResultSuccessView from './result-success-view';
import ResultFailView from './result-fail-view';
import Application from './application';
import {Point} from './settings';

class Result {
  constructor(data) {
    this.data = data;

    if (data.points > Point.FAIL) {
      this.view = new ResultSuccessView(data);
      this.view.onReplayClick = this.onReplaySuccess.bind(this);
    } else {
      this.view = new ResultFailView(data);
      this.view.onReplayClick = this.onReplayFail.bind(this);
    }
  }

  get element() {
    return this.view.element;
  }

  onReplaySuccess() {
    Application.showWelcome();
  }

  onReplayFail() {
    Application.showGame();
  }
}

export default Result;
