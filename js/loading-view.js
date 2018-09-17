import AbstractView from './abstract-view';

class LoadingView extends AbstractView {
  get template() {
    return `
      <h2 class="modal__title">Загружается...</h2>
      <p class="modal__text">идет загрузка данных игры. Пожалуйста подождите.</p>
    `;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `modal`;
  }
}

export default LoadingView;
