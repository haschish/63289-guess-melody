import {checkArtistQuestion, checkGenreQuestion} from './domain.js';
import {NUMBER_OF_LIVES, Time} from './settings';

class GameModel {
  constructor(data) {
    this.data = data;
    this.init();
  }

  get state() {
    return this._state;
  }

  get question() {
    return this.data.questions[this._currentQuestionIndex];
  }

  set answer(selectedIndexes) {
    const answer = {
      time: this.state.timeAnswer
    };

    switch (this.question.type) {
      case `genre`: answer.correct = checkGenreQuestion(this.question, selectedIndexes); break;
      case `artist`: answer.correct = checkArtistQuestion(this.question, selectedIndexes); break;
    }

    if (!answer.correct) {
      this._decreaseLives();
      if (this._isEndLives()) {
        this._endGame();
        return;
      }
    }

    this._state.answers.push(answer);
    if (this._isLastQuestion()) {
      this._endGame();
      return;
    }

    this._currentQuestionIndex++;
    this.resetTimeAnswer();
    this.onQuestionChange();
  }

  init() {
    this._state = {
      lives: NUMBER_OF_LIVES,
      time: Time.GAME,
      timeAnswer: 0,
      answers: []
    };
    this._currentQuestionIndex = 0;
  }

  resetTimeAnswer() {
    this._state.timeAnswer = 0;
  }

  tick() {
    const time = this._state.time - 1;
    const timeAnswer = this._state.timeAnswer + 1;
    this._state = Object.assign({}, this._state, {time, timeAnswer});
    this.onTimeChange();
    if (this.state.time === 0) {
      this._endGame();
      return;
    }
  }

  _isEndLives() {
    return this.state.lives === 0;
  }

  _isLastQuestion() {
    return this._currentQuestionIndex >= this.data.questions.length - 1;
  }

  _decreaseLives() {
    this._state.lives--;
    this.onLivesChange();
  }

  _endGame() {
    this.onEndGame();
  }

  onQuestionChange() {}

  onLivesChange() {}

  onTimeChange() {}

  onEndGame() {}
}

export default GameModel;
