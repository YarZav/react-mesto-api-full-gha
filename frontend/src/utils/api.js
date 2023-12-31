class Api {
    // Init

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorised = options.authorised;
    }

    // Private

    _makeHeaders() {
        if (this._authorised) {
            return {
                "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json"
            }
        } else {
            return { "Content-Type": "application/json" }
        }
    }

    _makeRequest(method, path, data = { }) {
        const reqeust = (Object.keys(data).length === 0)
            ? this._makeRequestWithoutBody(method, path)
            : this._makeRequestWithBody(method, path, data);
        return reqeust.then(this._parseResponse);
    }

    _makeRequestWithBody(method, path, data) {
        return fetch(
            `${this._baseUrl}/${path}`, 
            {
                method: method,
                headers: this._makeHeaders(),
                body: JSON.stringify(data)
            }
        )
    }

    _makeRequestWithoutBody(method, path, data) {
        return fetch(
            `${this._baseUrl}/${path}`, 
            {
                method: method,
                headers: this._makeHeaders()
            }
        )
    }

    _parseResponse(result) {
        if (result.ok) {
            return result.json();
        } else {
            return Promise.reject(`Ошибка: ${result.status}`);
        }
    }

    // Auth

    signUp(email, password) {
        return this._makeRequest("POST", "signup", { email: email, password: password });
    }

    signIn(email, password) {
        return this._makeRequest("POST", "signin", { email: email, password: password });
    }

    // Mesto

    getUserInfo() {
        return this._makeRequest("GET", "users/me");
    }

    setUserInfo(name, about) {
        return this._makeRequest("PATCH", "users/me", { name: name, about: about });
    }

    setAvatar(avatar) {
        return this._makeRequest("PATCH", "users/me/avatar", { avatar: avatar });
    }

    getInitialCards() {
        return this._makeRequest("GET", "cards");
    }

    addCard(name, link) {
        return this._makeRequest("POST", "cards", { name: name, link: link });
    }

    deleteCard(cardId) {
        return this._makeRequest("DELETE", `cards/${cardId}`);
    }

    setCardLike(cardId) {
        return this._makeRequest("PUT", `cards/${cardId}/likes`);
    }

    deleteCardLike(cardId) {
        return this._makeRequest("DELETE", `cards/${cardId}/likes`);
    }
}

export const authorisedApi = new Api({
    baseUrl: "https://api.yarzav.nomoredomainsrocks.ru",
    authorised: true
});


export const unauthorisedApi = new Api({
    baseUrl: "https://api.yarzav.nomoredomainsrocks.ru",
    authorised: false
});
