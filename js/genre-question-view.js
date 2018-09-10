import GameScreenView from './game-screen-view';

class GenreQuestionView extends GameScreenView {
  get template() {
    const data = this.data;
    return `
      <h2 class="game__title">${data.text}</h2>
      <form class="game__tracks">
        ${data.answers.map((item, index) => {
          return `
            <div class="track">
              <button class="track__button track__button--play" type="button"></button>
              <div class="track__status">
                <audio></audio>
              </div>
              <div class="game__answer">
                <input class="game__input visually-hidden" type="checkbox" name="answer" value="${index}" id="answer-${index}">
                <label class="game__check" for="answer-${index}">Отметить</label>
              </div>
            </div>
          `;
        }).join('')}

        <button class="game__submit button" type="submit" disabled>Ответить</button>
      </form>
    `;
  }

  getButtonSubmit() {
    return this.element.querySelector(`.game__submit`);
  }

  getCheckboxes() {
    return this.element.querySelectorAll(`[type="checkbox"]`);
  }

  bind() {
    this.getCheckboxes().forEach((item) => item.addEventListener(`change`, this.onCheckboxChange.bind(this)));
    this.getButtonSubmit().addEventListener(`click`, this.onSubmitClick.bind(this));
  }

  onCheckboxChange() {
    const button = this.getButtonSubmit();
    const checked = Array.from(this.getCheckboxes()).some((item) => item.checked);
    button.disabled = !checked;
  }

  onSubmitClick(evt) {
    evt.preventDefault();
    const selectedIndexes = Array.from(this.getCheckboxes()).filter((item) => item.checked).map((item) => parseInt(item.value, 10));
    this.onAnswer(selectedIndexes);
  }

  onAnswer(selectedIndexes) {
  }
}

export default GenreQuestionView;
