import {createElement} from './utils.js';
import {checkQuestion, getLife, getTimer} from './domain.js';
import GameHeaderView from './game-header-view.js';
import GameScreenView from './game-screen-view';
import GenreQuestionView from './genre-question-view';
import ArtistQuestionView from './artist-question-view';

class Game {
  constructor(data) {
    this.questions = data;
    this.answers = [];
    this.currentQuestionIndex = 0;
    this.life = getLife(3);
    this.timer = getTimer(30);

    this.root = createElement(`section`, {className: `game game--genre`});
    this.gameScreen = new GameScreenView();
    this.header = new GameHeaderView();
    this.header.onBackClick = this.exit.bind(this);


    this.root.appendChild(this.header.element);
    this.root.appendChild(this.gameScreen.element);
    this._renderQuestion();
  }

  _renderQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    let gameScreen;
    switch (question.type) {
      case `genre`: gameScreen = new GenreQuestionView(question); break;
      case `artist`: gameScreen = new ArtistQuestionView(question); break;
    }

    this.root.replaceChild(gameScreen.element, this.gameScreen.element);
    this.gameScreen = gameScreen;
    this.gameScreen.onAnswer = this.answer.bind(this);
  }

  get element() {
    return this.root;
  }

  answer(selectedIndexes) {   // Обработка ответа пользователя
    const question = this.questions[this.currentQuestionIndex];
    const answer = {
      correct: checkQuestion(question, selectedIndexes),
      time: 30 //TODO
    };

    if (!answer.correct) {
      if (this.life.decrease() === 0) {
        this.end()
        return;
      }
    }

    this.answers.push(answer);
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.end()
      return;
    }

    this._renderQuestion();
  }

  exit() {
    this.onExit();
  }

  end() {
    this.onEnd({
      answers: this.answers,
      lives: this.life.count,
      time: this.timer.count
    });
  }

  updateHeader() {
  }

  onExit() {
  }

  onEnd() {
  }
}

export default Game;
