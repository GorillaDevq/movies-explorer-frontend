class MoviesApi {
  constructor (baseUrl) {
    this._baseUrl = baseUrl
  }

  _makeRequest(url, method, data) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
  }

  getInitialsMovies() {
    return this._makeRequest(this._baseUrl, 'GET')
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies')

export default moviesApi