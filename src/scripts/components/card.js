import { addLike, deleteCard, deleteLike } from "./api";

const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");

function createCard(card, cardId, showImageHandler) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const buttonDelete = cardCopy.querySelector(".card__delete-button");
  const likeCountElement = cardCopy.querySelector(".card__like-count");
  const buttonLike = cardCopy.querySelector(".card__like-button");

  buttonDelete.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    deleteCard(cardId)
      .then(() => card.remove())
      .catch((error) => console.log(error));
  });
  buttonLike.addEventListener("click", (event) => {
    likeButtonToggle(buttonLike);
    updateLikeCount(buttonLike, cardId, likeCountElement);
  });
  cardImage.addEventListener("click", showImageHandler);
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  return cardCopy;
}

function likeButtonToggle(button) {
  button.classList.toggle("card__like-button_is-active");
}

function showLikeHandler(cardInfo, userId, element, button) {
  likeCountHandler(cardInfo.likes.length, element);
  Array.from(cardInfo.likes).forEach((user) => {
    if (user["_id"] === userId)
      button.classList.add("card__like-button_is-active");
  });
}

function updateLikeCount(button, cardId, likeCountElement) {
  if (button.classList.contains("card__like-button_is-active"))
    addLike(cardId)
      .then((card) => likeCountHandler(card.likes.length, likeCountElement))
      .catch((error) => console.log(error));
  else
    deleteLike(cardId)
      .then((card) => {
        likeCountHandler(card.likes.length, likeCountElement);
      })
      .catch((error) => console.log(error));
}

function likeCountHandler(count, element) {
  if (count) {
    element.style.visible = "visible";
    element.textContent = count;
  } else {
    element.style.visible = "hidden";
    element.textContent = "";
  }
}

export { createCard, showLikeHandler };
