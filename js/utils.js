
const main = document.querySelector(`section.main`);

const createElement = (tagName = `div`, {className = ``, innerHTML = ``}) => {
  const element = document.createElement(tagName);
  const classes = className.trim().split(` `);
  element.classList.add(...classes);
  element.innerHTML = innerHTML;
  return element;
};

const changeScreen = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export {
  createElement,
  changeScreen
};
