import { API_URL } from '../config';

class Api {
  constructor(options) {
    const { baseUrl, headers } = options;

    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getHeaders() {
    const token = localStorage.getItem("token") ?? '';

    return {
      ...this.headers,
      authorization: `Bearer ${token}`,
    }
  }

  getCurrentUser() {
    const url = `${this.baseUrl}/users/me`;

    return fetch(url, { method: "GET", headers: this._getHeaders() }).then(
      this._handleResponse
    );
  }

  getPlaces() {
    const url = `${this.baseUrl}/cards`;

    return fetch(url, { method: "GET", headers: this._getHeaders() }).then(
      this._handleResponse
    );
  }

  updateUser(data) {
    const url = `${this.baseUrl}/users/me`;

    return fetch(url, {
      method: "PATCH",
      headers: {
        ...this._getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  updateUserAvatar(avatar) {
    const url = `${this.baseUrl}/users/me/avatar`;
    const body = { avatar };

    return fetch(url, {
      method: "PATCH",
      headers: {
        ...this._getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._handleResponse);
  }

  createCard(data) {
    const url = `${this.baseUrl}/cards`;

    return fetch(url, {
      method: "POST",
      headers: {
        ...this._getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    const url = `${this.baseUrl}/cards/${id}`;

    return fetch(url, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  createLike(cardId) {
    const url = `${this.baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  deleteLike(cardId) {
    const url = `${this.baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    }

    return this.createLike(cardId);
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

const instance = new Api({
  baseUrl: API_URL,
});

export default instance;
