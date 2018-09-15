import {createElement} from './utils';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get tagName() {
    return `div`;
  }

  get className() {
    return ``;
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind(this._element);
    }

    return this._element;
  }

  render() {
    return createElement(this.tagName, {className: this.className, innerHTML: this.template});
  }

  bind() {
  // bind handlers if required
  }
}

export default AbstractView;
