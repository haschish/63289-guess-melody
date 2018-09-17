import ResultView from './result-view';

class ResultFailView extends ResultView {
  renderResult(data) {
    return `
      <h2 class="result__title">${data.title}</h2>
      <p class="result__total result__total--fail">${data.text}</p>
      <button class="result__replay" type="button">Попробовать ещё раз</button>
    `;
  }
}

export default ResultFailView;
