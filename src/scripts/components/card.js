const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");
0;
function createCard(card, deleteCard, showImageHandler) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const buttonDelete = cardCopy.querySelector(".card__delete-button");

  buttonDelete.addEventListener("click", () => deleteCard(cardCopy));
  cardCopy.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__like-button"))
      likeCard(event.target);
  });
  cardImage.addEventListener("click", showImageHandler);
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

export { createCard, deleteCard };
