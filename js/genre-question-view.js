import GameScreenView from './game-screen-view';

class GenreQuestionView extends GameScreenView {
  get template() {
    const data = this.data;
    return `
      <h2 class="game__title">${data.question}</h2>
      <form class="game__tracks">
        ${data.answers.map((item, index) => {
          const autoplay = (index === 0) ? `autoplay="true"` : ``;
          const trackButtonClass = (index === 0) ? `track__button--play` : `track__button--pause`;

          return `
            <div class="track">
              <button class="track__button ${trackButtonClass}" type="button" data-index="${index}"></button>
              <div class="track__status">
                <audio src="${item.src}" ${autoplay} loop="true"></audio>
              </div>
              <div class="game__answer">
                <input class="game__input visually-hidden" type="checkbox" name="answer" value="${item.genre}" id="answer-${index}">
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

  getTrackButtons() {
    return this.element.querySelectorAll(`.track__button`);
  }

  getAudios() {
    return this.element.querySelectorAll(`audio`);
  }

  bind() {
    this.getCheckboxes().forEach((item) => item.addEventListener(`change`, this.onCheckboxChange.bind(this)));
    this.getTrackButtons().forEach((item) => item.addEventListener(`click`, this.onTrackButtonClick.bind(this)));
    this.getButtonSubmit().addEventListener(`click`, this.onSubmitClick.bind(this));
  }

  onCheckboxChange() {
    const button = this.getButtonSubmit();
    const checked = Array.from(this.getCheckboxes()).some((item) => item.checked);
    button.disabled = !checked;
  }

  onTrackButtonClick(evt) {
    const index = parseInt(evt.target.dataset.index, 10);
    const prefix = `track__button`;
    const buttons = this.getTrackButtons();
    const audios = this.getAudios();
    const classList = evt.target.classList;

    if (classList.contains(`${prefix}--play`)) {
      buttons[index].classList.replace(`${prefix}--play`, `${prefix}--pause`);
      audios[index].pause();
    } else {
      buttons.forEach((item) => item.classList.replace(`${prefix}--play`, `${prefix}--pause`));
      audios.forEach((item) => item.pause());
      buttons[index].classList.replace(`${prefix}--pause`, `${prefix}--play`);
      audios[index].play();
    }
  }

  onSubmitClick(evt) {
    evt.preventDefault();
    const selectedIndexes = Array.from(this.getCheckboxes()).filter((item) => item.checked).map((item) => item.value);
    this.onAnswer(selectedIndexes);
  }

  onAnswer(selectedIndexes) {
  }
}

export default GenreQuestionView;
