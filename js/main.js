import {changeScreen} from './utils.js';
import Welcome from './welcome.js';
import welcomeData from './data/welcome.js';
import Game from './game';
import questions from './data/questions.js';
import ResultView from './result';


const onGameExit = () => {
  changeScreen(welcome.element);
};

const onGameEnd = (resultData) => {
  const result = new ResultView(resultData);
  result.onReplayClick = onGameExit;
  changeScreen(result.element);
};

const onWelcomeClick = () => {
  const game = new Game(questions);
  game.onExit = onGameExit;
  game.onEnd = onGameEnd;
  changeScreen(game.element);
};


const welcome = new Welcome(welcomeData);
welcome.onClick = onWelcomeClick;
changeScreen(welcome.element);
