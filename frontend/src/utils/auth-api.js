import { API_URL } from '../config';

class AuthApi {
  constructor(options) {
    const { baseUrl, headers } = options;

    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  login(email, password) {
    const url = `${this.baseUrl}/signin`;

    return fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }

  register(email, password) {
    const url = `${this.baseUrl}/signup`;

    return fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }

  getCurrentUser() {
    const url = `${this.baseUrl}/users/me`;

    const authorizationToken = localStorage.getItem("token");

    return fetch(url, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${authorizationToken}`,
      },
    }).then(this._handleResponse);
  }

  async _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }

    const responseBody = await response.json();

    return Promise.reject({
      status: response.status,
      message: responseBody.message ?? responseBody.error,
    });
  }
}

const instance = new AuthApi({
  baseUrl: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default instance;
