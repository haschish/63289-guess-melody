import AbstractView from './abstract-view';

class GameScreenView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return ``;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `game__screen`;
  }
}

export default GameScreenView;
