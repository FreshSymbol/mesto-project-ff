const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");

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

function deleteCard(card) {
  card.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
