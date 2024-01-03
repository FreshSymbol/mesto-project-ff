// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const deleteButton = cardCopy.querySelector(".card__delete-button");
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
