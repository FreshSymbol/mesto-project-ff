const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "9e423efd-ffc7-45e3-bdfa-06918c55be9f",
    "Content-Type": "application/json",
  },
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

const editProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
};

const editProfileAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkResponse);
};

const createNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export {
  getUserInfo,
  getCards,
  editProfileInfo,
  createNewCard,
  editProfileAvatar,
  deleteCard,
  addLike,
  deleteLike,
};
