import WelcomeView from './welcome-view';
import LoadingView from './loading-view';
import Application from './application';

class Welcome {
  constructor() {
    this.view = new WelcomeView();
    this.view.onClick = this.onPlayClick.bind(this);
  }

  get element() {
    return this.view.element;
  }

  onPlayClick() {
    Application.showGame();
  }

  showLoading() {
    this.loading = new LoadingView();
    this.element.appendChild(this.loading.element);
  }

  hideLoading() {
    this.element.removeChild(this.loading.element);
    this.loading = null;
  }
}

export default Welcome;
