const SECONDS_IN_MINUTE = 60;

const getMainElement = () => {
  return document.querySelector(`section.main`);
};

const createElement = (tagName = `div`, {className = ``, innerHTML = ``}) => {
  const element = document.createElement(tagName);
  const classes = className.trim().split(` `).filter((item) => item !== ``);
  element.classList.add(...classes);
  element.innerHTML = innerHTML;
  return element;
};

const changeScreen = (element) => {
  const main = getMainElement();
  main.innerHTML = ``;
  main.appendChild(element);
};

const getMinutesFromTimeInSeconds = (seconds) => {
  seconds = parseInt(seconds, 10);
  if (isNaN(seconds)) {
    throw new Error(`the parameter must be a number`);
  }

  return parseInt(seconds / SECONDS_IN_MINUTE, 10);
};

const getSecondsFromTimeInSeconds = (seconds) => {
  seconds = parseInt(seconds, 10);
  if (isNaN(seconds)) {
    throw new Error(`the parameter must be a number`);
  }

  return seconds % SECONDS_IN_MINUTE;
};

const getTwoDigitNumber = (number) => {
  number = parseInt(number, 10);
  if (isNaN(number)) {
    throw new Error(`the parameter must be a number`);
  }

  return number.toString().padStart(2, `0`);
};

export {
  createElement,
  changeScreen,
  getMinutesFromTimeInSeconds,
  getSecondsFromTimeInSeconds,
  getTwoDigitNumber
};
