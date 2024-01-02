// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");

// @todo: DOM узлы
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

//Попап формы
addButton.addEventListener("click", () =>
  modalNewCard.classList.add("popup_is-opened")
);
modalNewCardCloseButton.onclick = () =>
  modalNewCard.classList.remove("popup_is-opened");

formNewCard.addEventListener("submit", (event) => {
  event.preventDefault();
  placeList.append(
    createCard(
      { name: inputCardTitle.value, link: inputCardImageUrl.value },
      deleteCard
    )
  );
  modalNewCard.classList.remove("popup_is-opened");
  inputCardTitle.value = "";
  inputCardImageUrl.value = "";
});

//Попап изображений
function showModalImage(src, text) {
  modalImage.classList.add("popup_is-opened");
  modalImageImg.src = src;
  modalImageText.textContent = text;
  modalImageCloseButton.onclick = () =>
    modalImage.classList.remove("popup_is-opened");
}

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const deleteButton = cardCopy.querySelector(".card__delete-button");
  cardImage.addEventListener("click", () =>
    showModalImage(cardImage.src, cardTitle.textContent)
  );
  deleteButton.addEventListener("click", () => deleteCard(cardCopy));
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  return cardCopy;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((el) => placeList.append(createCard(el, deleteCard)));
