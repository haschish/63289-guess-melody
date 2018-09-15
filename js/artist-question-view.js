import GameScreenView from './game-screen-view';

class ArtistQuestionView extends GameScreenView {
  get template() {
    const data = this.data;
    return `
      <h2 class="game__title">Кто исполняет эту песню?</h2>
      <div class="game__track">
        <button class="track__button track__button--pause" type="button"></button>
        <audio src="${data.src}" autoplay="true" loop="true"></audio>
      </div>

      <form class="game__artist">
        ${data.answers.map((item, index) => {
    return `
      <div class="artist">
        <input class="artist__input visually-hidden" type="radio" name="answer" value="${index}" id="answer-${index}">
        <label class="artist__name" for="answer-${index}">
          <img class="artist__picture" src="${item.image.url || `http://placehold.it/134x134`}" alt="${item.title}">
          ${item.title}
        </label>
      </div>
    `;
  }).join(``)}
      </form>
    `;
  }

  getRadioInputs() {
    return this.element.querySelectorAll(`[type="radio"]`);
  }

  getTrackButton() {
    return this.element.querySelector(`.track__button`);
  }

  getAudio() {
    return this.element.querySelector(`audio`);
  }

  bind() {
    this.getRadioInputs().forEach((item) => item.addEventListener(`change`, this.onRadioInputChange.bind(this)));
    this.getTrackButton().addEventListener(`click`, this.onTrackButtonClick.bind(this));
  }

  onRadioInputChange(evt) {
    evt.preventDefault();
    const checkedInput = Array.from(this.getRadioInputs()).find((item) => item.checked);
    this.onAnswer(parseInt(checkedInput.value, 10));
  }

  onTrackButtonClick(evt) {
    const prefix = `track__button`;
    const classList = evt.target.classList;
    const audio = this.getAudio();

    if (classList.contains(`${prefix}--pause`)) {
      classList.replace(`${prefix}--pause`, `${prefix}--play`);
      audio.pause();
    } else {
      classList.replace(`${prefix}--play`, `${prefix}--pause`);
      audio.play();
    }
  }

  onAnswer() {
  }
}

export default ArtistQuestionView;
