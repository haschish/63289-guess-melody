import AbstractView from './abstract-view';

const ESC_KEYCODE = 27;

class ConfirmView extends AbstractView {
  constructor() {
    super();
    this._onKeydown = this._onKeydown.bind(this);
  }

  get template() {
    return `
      <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__buttons">
        <button class="modal__button button button__ok">Ок</button>
        <button class="modal__button button button__cancel">Отмена</button>
      </div>
    `;
  }

  get tagName() {
    return `section`;
  }

  get className() {
    return `modal`;
  }

  get buttonOk() {
    return this.element.querySelector(`.button__ok`);
  }

  get buttonCancel() {
    return this.element.querySelector(`.button__cancel`);
  }

  _onKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this.onCancelClick();
    }
  }

  bind() {
    this.buttonOk.addEventListener(`click`, this.onOkClick);
    this.buttonCancel.addEventListener(`click`, this.onCancelClick);
    document.addEventListener(`keydown`, this._onKeydown);
  }

  unbind() {
    this.buttonOk.removeEventListener(`click`, this.onOkClick);
    this.buttonCancel.removeEventListener(`click`, this.onCancelClick);
    document.removeEventListener(`keydown`, this._onKeydown);
  }

  onOkClick() {}

  onCancelClick() {}
}

export default ConfirmView;
