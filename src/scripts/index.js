import "../styles/index.css";
import initialCards from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";

const placeList = document.querySelector(".places__list");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const modalAddCard = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");
const formCard = document.querySelector('[name="new-place"]');
const formProfile = document.querySelector('[name="edit-profile"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameProfile = formProfile.querySelector(".popup__input_type_name");
const descriptionProfile = formProfile.querySelector(
  ".popup__input_type_description"
);
const cardName = formCard.querySelector(".popup__input_type_card-name");
const link = formCard.querySelector(".popup__input_type_url");

buttonAddCard.addEventListener("click", () => openModal(modalAddCard));
buttonEditProfile.addEventListener("click", () => openModal(editProfileModal));

formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  placeList.prepend(
    createCard({ name: cardName.value, link: link.value }, deleteCard)
  );
  closeModal(modalAddCard);
  formCard.reset();
});

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = nameProfile.value;
  profileDescription.textContent = descriptionProfile.value;
  closeModal(editProfileModal);
});

initialCards.forEach((card) => placeList.append(createCard(card, deleteCard)));
