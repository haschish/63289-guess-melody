import {checkQuestion, NUMBER_OF_LIVES, TIME_GAME} from './domain.js';

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

  init() {
    this._state = {
      lives: NUMBER_OF_LIVES,
      time: TIME_GAME,
      timeAnswer: 0,
      answers: []
    };
    this._currentQuestionIndex = 0;
  }

  set answer(selectedIndexes) {
    const answer = {
      correct: checkQuestion(this.question, selectedIndexes),
      time: this.state.timeAnswer
    };

    if (!answer.correct) {
      this._decreaseLives();
      if (this.state.lives === 0) {
        this._endGame();
        return;
      }
    }

    this._state.answers.push(answer);
    this._currentQuestionIndex++;
    if (this._currentQuestionIndex >= this.data.questions.length) {
      this._endGame()
      return;
    }
    this.onQuestionChange();
  }

  _decreaseLives() {
    this._state.lives--;
    this.onLivesChange();
  }

  resetTimeAnswer() {
    this._state.timeAnswer = 0;
  }

  tick() {
    const time = this._state.time - 1;
    const timeAnswer = this._state.timeAnswer + 1;
    this._state = {...this._state, time, timeAnswer};
    this.onTimeChange();
    if (this.state.time === 0) {
      this._endGame();
      return;
    }
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
