const templateCard = document.querySelector("#card-template").content;
const cardItem = templateCard.querySelector(".places__item");

function createCard(userId, card, onDelete, onLike, onImageClick) {
  const cardCopy = cardItem.cloneNode(true);
  const cardImage = cardCopy.querySelector(".card__image");
  const cardTitle = cardCopy.querySelector(".card__title");
  const buttonDelete = cardCopy.querySelector(".card__delete-button");
  const likeCountElement = cardCopy.querySelector(".card__like-count");
  const buttonLike = cardCopy.querySelector(".card__like-button");
  const cardId = card._id;

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;

  checkIsOwner(userId, card, buttonDelete);
  setInitialLikeState(card, userId, likeCountElement, buttonLike);

  buttonDelete.addEventListener("click", (event) => onDelete(event, cardId));

  buttonLike.addEventListener("click", () =>
    onLike(
      buttonLike,
      cardId,
      likeCountElement,
      toggleLikeButton,
      setLikesCount
    )
  );

  cardImage.addEventListener("click", onImageClick);
  return cardCopy;
}

function toggleLikeButton(button) {
  button.classList.toggle("card__like-button_is-active");
}

function setInitialLikeState(cardInfo, userId, likeCountElement, button) {
  const isLiked = cardInfo.likes.some((user) => user._id === userId);
  setLikesCount(cardInfo.likes.length, likeCountElement);
  if (isLiked) button.classList.add("card__like-button_is-active");
}

function checkIsOwner(userId, cardInfo, buttonDelete) {
  if (userId !== cardInfo.owner._id) buttonDelete.remove();
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
