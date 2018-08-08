const KEY_CODE = {
  arrowLeft: 37,
  arrowRight: 39
};
const app = document.querySelector('.app');
const main = app.querySelector('section.main');
const screens = Array.from(document.querySelectorAll('template'));
let currentScreenIndex;

const setScreenById = (screenId) => {
  const index = screens.findIndex(template => template.id === screenId);
  if (index >= 0) {
    setScreen(index);
  }
}
const setScreen = (index) => {
  const len = screens.length;
  index = index%len;
  if (index < 0) {
    index = len + index;
  }
  main.innerHTML = '';
  main.appendChild(screens[index].content.cloneNode(true));
  currentScreenIndex = index;
}
const nextScreen = () => {
  setScreen(currentScreenIndex + 1);
}
const prevScreen = () => {
  setScreen(currentScreenIndex - 1);
}
const createArrowButton = (textContent) => {
  const button = document.createElement('button');
  button.classList.add('arrows__btn');
  button.textContent = textContent;
  return button;
}

setScreenById('welcome');
document.addEventListener('keydown', (e) => {
  if (e.keyCode ===  KEY_CODE.arrowLeft) {
    prevScreen();
  } else if (e.keyCode ===  KEY_CODE.arrowRight) {
    nextScreen();
  }
});

const arrows = document.createElement('div');
arrows.classList.add('arrows__wrap');
arrows.innerHTML = `
  <style>
    .arrows__wrap {
      position: absolute;
      top: 135px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: #f0eed5;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>`;
const arrowLeft = createArrowButton('<-');
arrowLeft.addEventListener('click', prevScreen);

const arrowRight = createArrowButton('->');
arrowRight.addEventListener('click', nextScreen);

arrows.appendChild(arrowLeft);
arrows.appendChild(arrowRight);
app.appendChild(arrows);


