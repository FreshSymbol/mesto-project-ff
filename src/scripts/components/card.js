import { openModal } from "./modal.js";

const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");
const modalImageType = document.querySelector(".popup_type_image");
const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");

function createCard(card, deleteCard) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const buttonDelete = cardCopy.querySelector(".card__delete-button");

  buttonDelete.addEventListener("click", () => deleteCard(cardCopy));
  cardCopy.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__like-button"))
      likeCard(event.target);
    if (event.target.classList.contains("card__image")) {
      showImage(event.target);
      openModal(modalImageType);
    }
  });
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

function showImage(event) {
  modalImage.src = event.src;
  modalImage.alt = event.alt;
  modalCaption.textContent = event.alt;
}

export { createCard, deleteCard };
