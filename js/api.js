
const URL = `https://es.dump.academy/guess-melody/questions`;

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
    return fetch(URL).then(checkStatus).then(toJSON);
  }
}

export default API
