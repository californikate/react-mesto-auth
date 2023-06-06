class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // _request(urlEndpoint, options) {
  //   return fetch(`${this.url}${urlEndpoint}`, options).then(this._getResponse)
  // }

  async getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  async setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getResponse(res))
  }

  async setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',  
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._getResponse(res))
  }

  async getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  async addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.place}`,
        link: `${data.link}`
      })
    }).then(res => this._getResponse(res))
  }

  async deleteCards(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._getResponse(res))
  }

  async changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  // async putLike(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //   method: 'PUT',  
  //   headers: this._headers
  //   }).then(res => this._getResponse(res))
  // }

  // async deleteLike(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //   method: 'DELETE',  
  //   headers: this._headers
  //   }).then(res => this._getResponse(res))
  // }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
    'Content-Type': 'application/json'
  }
});

