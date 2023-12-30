// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardItem = templateCard.cloneNode(true);
const placeList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const modalNewCard = document.querySelector(".popup_type_new-card");
const modalNewCardCloseButton = modalNewCard.querySelector(".popup__close");
const formNewCard = modalNewCard.querySelector(".popup__form");
const inputCardTitle = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const inputCardImageUrl = formNewCard.querySelector(".popup__input_type_url");
const modalImage = document.querySelector(".popup_type_image");
const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageText = modalImage.querySelector(".popup__caption");
const modalImageCloseButton = modalImage.querySelector(".popup__close");

addButton.addEventListener("click", () =>
  modalNewCard.classList.add("popup_is-opened")
);
modalNewCardCloseButton.onclick = () =>
  modalNewCard.classList.remove("popup_is-opened");

formNewCard.addEventListener("submit", (event) => {
  event.preventDefault();
  placeList.append(createCard(inputCardTitle.value, inputCardImageUrl.value));
  modalNewCard.classList.remove("popup_is-opened");
  inputCardTitle.value = "";
  inputCardImageUrl.value = "";
});

function showModalImage(src, text) {
  modalImage.classList.add("popup_is-opened");
  modalImageImg.src = src;
  modalImageText.textContent = text;
  modalImageCloseButton.onclick = () =>
    modalImage.classList.remove("popup_is-opened");
}

// @todo: Функция создания карточки
function createCard(name, link) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const deleteButton = cardCopy.querySelector(".card__delete-button");
  cardImage.addEventListener("click", () =>
    showModalImage(cardImage.src, cardTitle.textContent)
  );
  deleteButton.addEventListener("click", deleteCard);
  cardImage.src = link;
  cardTitle.textContent = name;
  return cardCopy;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.parentNode.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => placeList.append(createCard(el.name, el.link)));
