import ResultView from './result-view';

class ResultSuccessView extends ResultView {
  renderResult(data) {
    return `
      <h2 class="result__title">${data.title}</h2>
      <p class="result__total">${data.total}</p>
      <p class="result__text">${data.text}</p>
      <button class="result__replay" type="button">Сыграть ещё раз</button>
    `;
  }
}

export default ResultSuccessView;
