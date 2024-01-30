import "../styles/index.css";
import initialCards from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { closeModal, openModal, showImageModal } from "./components/modal.js";

const placeList = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const imageModal = document.querySelector(".popup_type_image");
const formCard = document.querySelector('[name="new-place"]');
const formProfile = document.querySelector('[name="edit-profile"]');

placeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__like-button"))
    likeCard(event.target);
  if (event.target.classList.contains("card__image")) {
    openModal(imageModal);
    showImageModal(event.target);
  }
});
addCardButton.addEventListener("click", () => openModal(addCardModal));
editProfileButton.addEventListener("click", () => openModal(editProfileModal));

formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = formCard.querySelector(".popup__input_type_card-name").value;
  const link = formCard.querySelector(".popup__input_type_url").value;
  placeList.prepend(createCard({ name, link }, deleteCard));
  closeModal(addCardModal);
  formCard.reset();
});

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const name = formProfile.querySelector(".popup__input_type_name").value;
  const description = formProfile.querySelector(
    ".popup__input_type_description"
  ).value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closeModal(editProfileModal);
});

initialCards.forEach((card) => placeList.append(createCard(card, deleteCard)));
