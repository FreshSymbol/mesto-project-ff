import "../styles/index.css";
import initialCards from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation } from "./components/validation";

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
const modalImageType = document.querySelector(".popup_type_image");
const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");

buttonAddCard.addEventListener("click", () => openModal(modalAddCard));
buttonEditProfile.addEventListener("click", () => openModal(editProfileModal));

const formData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  placeList.prepend(
    createCard(
      { name: cardName.value, link: link.value },
      deleteCard,
      showImageHandler
    )
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

function showImageHandler(event) {
  modalImage.src = event.target.src;
  modalCaption.alt = event.target.alt;
  modalCaption.textContent = event.target.alt;
  openModal(modalImageType);
}

enableValidation(formData);

initialCards.forEach((card) =>
  placeList.append(createCard(card, deleteCard, showImageHandler))
);
