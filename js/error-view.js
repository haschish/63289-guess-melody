import AbstractView from './abstract-view';

class ErrorView extends AbstractView {
  constructor(message) {
    super();
    this.message = message;
  }

  get template() {
    return `
      <h2 class="modal__title">Произошла ошибка!</h2>
      <p class="modal__text">${this.message}. Пожалуйста, перезагрузите страницу.</p>
    `;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `modal`;
  }
}

export default ErrorView;
