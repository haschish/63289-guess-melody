import {createElement} from './utils.js';
import GameHeaderView from './game-header-view.js';
import GameScreenView from './game-screen-view';
import GenreQuestionView from './genre-question-view';
import ArtistQuestionView from './artist-question-view';
import Application, {debugMode} from './application';

const ONE_SECOND = 1000;

const getGenreAnswer = (question) => {
  return question.answers.reduce((arr, item, index) => (item.genre === question.genre) ? arr.concat(index) : arr, []);
};

const getArtistAnswer = (question) => {
  return question.answers.find(item => item.isCorrect).title;
};

const consoleAnswer = (question) => {
  let answer;
  switch (question.type) {
    case `genre`: answer = getGenreAnswer(question); break;
    case `artist`: answer = getArtistAnswer(question); break;
  }
  console.log(answer);
};

class Game {
  constructor(model) {
    this.model = model;
    this.model.onQuestionChange = this._renderQuestion.bind(this);
    this.model.onTimeChange = this.updateHeader.bind(this);
    this.model.onLivesChange = this.updateHeader.bind(this);
    this.model.onEndGame = this.end.bind(this);


    this.gameScreen = new GameScreenView();
    this.header = this._getHeader();

    this.root = createElement(`section`, {className: `game game--genre`});
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.gameScreen.element);
  }

  _renderQuestion() {
    const question = this.model.question;

    // <debug>
      if (debugMode) {
        consoleAnswer(question);
      }
    // </debug>

    let gameScreen;
    switch (question.type) {
      case `genre`: gameScreen = new GenreQuestionView(question); break;
      case `artist`: gameScreen = new ArtistQuestionView(question); break;
    }
    gameScreen.onAnswer = this.onGameScreenAnswer.bind(this);

    this.root.replaceChild(gameScreen.element, this.gameScreen.element);
    this.gameScreen = gameScreen;
  }

  get element() {
    return this.root;
  }

  onGameScreenAnswer(answer) {
    this.model.answer = answer;
  }

  _exit() {
    Application.showWelcome();
  }

  _startTimer() {
    this.timer = setTimeout(() => {
      this.tick();
      this._startTimer();
    }, ONE_SECOND);
  }

  _stopTimer() {
    clearTimeout(this.timer);
  }

  _getHeader() {
    const header = new GameHeaderView(this.model.state);
    header.onBackClick = this._exit.bind(this);
    return header;
  }

  start() {
    this._startTimer();
    this._renderQuestion();
  }

  end() {
    this._stopTimer();
    Application.showResult(this.model.state);
  }

  tick() {
    this.model.tick();
  }

  updateHeader() {
    const header = this._getHeader();
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }
}

export default Game;
