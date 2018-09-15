
const URL = `https://es.dump.academy/guess-melody`;
const APP_ID = `1Kiek33kdE093df4`;

const checkStatus = (res) => {
  if (res.ok) {
    return res;
  } else {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
};

const toJSON = (res) => res.json();

class API {
  static loadQuestions() {
    return fetch(`${URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadResults() {
    return fetch(`${URL}/stats/${APP_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResult(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}/stats/${APP_ID}`, requestSettings).then(checkStatus);
  }
}

export default API;
