import WelcomeView from './welcome-view';
import welcomeData from './data/welcome';
import Application from './application';

class Welcome {
  constructor() {
    this.view = new WelcomeView(welcomeData);
    this.view.onClick = this.onPlayClick.bind(this);
  }

  get element() {
    return this.view.element;
  }

  onPlayClick() {
    Application.showGame();
  }
}

export default Welcome;
