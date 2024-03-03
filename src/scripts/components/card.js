import { addLike, deleteCard, deleteLike } from "./api";

const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");

function createCard(userInfo, card, showImageHandler) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const buttonDelete = cardCopy.querySelector(".card__delete-button");
  const likeCountElement = cardCopy.querySelector(".card__like-count");
  const buttonLike = cardCopy.querySelector(".card__like-button");
  const cardId = card._id;
  const userId = userInfo._id;

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;

  checkUserIsCreateCard(userId, card, buttonDelete);
  setInitialLikeState(card, userId, likeCountElement, buttonLike);

  buttonDelete.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    deleteCard(cardId)
      .then(() => card.remove())
      .catch((error) => console.log(error));
  });

  buttonLike.addEventListener("click", (event) => {
    updateLikeCount(buttonLike, cardId, likeCountElement);
  });

  cardImage.addEventListener("click", showImageHandler);
  return cardCopy;
}

function toggleLikeButton(button) {
  button.classList.toggle("card__like-button_is-active");
}

function setInitialLikeState(cardInfo, userId, element, button) {
  setLikesCount(cardInfo.likes.length, element);
  cardInfo.likes.some((user) => {
    if (user._id === userId)
      button.classList.add("card__like-button_is-active");
  });
}

function checkUserIsCreateCard(userId, cardInfo, buttonDelete) {
  if (userId !== cardInfo.owner._id) buttonDelete.remove();
}

function updateLikeCount(button, cardId, likeCountElement) {
  if (!button.classList.contains("card__like-button_is-active")) {
    addLike(cardId)
      .then((card) => {
        toggleLikeButton(button);
        setLikesCount(card.likes.length, likeCountElement);
      })
      .catch((error) => console.log(error));
  } else {
    deleteLike(cardId)
      .then((card) => {
        toggleLikeButton(button);
        setLikesCount(card.likes.length, likeCountElement);
      })
      .catch((error) => console.log(error));
  }
}

function setLikesCount(count, element) {
  if (count) {
    element.style.visible = "visible";
    element.textContent = count;
  } else {
    element.style.visible = "hidden";
    element.textContent = "";
  }
}

export { createCard, setInitialLikeState };
