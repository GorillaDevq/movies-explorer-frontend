class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _makeRequest(url, method, data) {
    return fetch(url, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.ok ? res.json() : res.json().then(error => Promise.reject(error))
      })
  }

  getSavedMovies() {
    return this._makeRequest(`${this._baseUrl}/movies`, 'GET')
  }

  signUp(userData) {
    return this._makeRequest(`${this._baseUrl}/signup`, 'POST', userData)
  }

  signIn(userData) {
    return this._makeRequest(`${this._baseUrl}/signin`, 'POST', userData)
  }

  updateUser(userData) {
    return this._makeRequest(`${this._baseUrl}/users/me`, 'PATCH', userData)
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, 'GET')
  }

  logOut() {
    return this._makeRequest(`${this._baseUrl}/signout`, 'DELETE')
  }

  saveMovie(movieData) {
    return this._makeRequest(`${this._baseUrl}/movies`, 'POST', {
      country: movieData.country,
      director: movieData.director,
      duration: movieData.duration,
      year: movieData.year,
      description: movieData.description,
      movieId: movieData.id,
      nameRU: movieData.nameRU,
      nameEN: movieData.nameEN,
      image: `https://api.nomoreparties.co/${movieData.image.url}`,
      trailerLink: movieData.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${movieData.image.formats.thumbnail.url}`,
    })
  }

  getSavedMovie() {
    return this._makeRequest(`${this._baseUrl}/movies`, 'GET')
  }

  deleteMovie(movieId) {
    return this._makeRequest(`${this._baseUrl}/movies/${movieId}`, 'DELETE')
  }

  checkToken() {
    return this._makeRequest(`${this._baseUrl}/token`, 'GET')
  }
}

const mainApi = new MainApi('http://localhost:3000')

export default mainApi