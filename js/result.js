import ResultView from './result-view';
import Application from './application';

class Result {
  constructor(data) {
    this.data = data;
    this.view = new ResultView(data);
    this.view.onReplayClick = this.onReplayClick.bind(this);
  }

  get element() {
    return this.view.element;
  }

  onReplayClick() {
    Application.showWelcome();
  }
}

export default Result;
