import "../styles/index.css";
import initialCards from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation";

const placeList = document.querySelector(".places__list");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const modalAddCard = document.querySelector(".popup_type_new-card");
const modalEditProfile = document.querySelector(".popup_type_edit");
const formCard = document.querySelector('[name="new-place"]');
const formProfile = document.querySelector('[name="edit-profile"]');
const modalEditAvatar = document.querySelector(".popup_type_new-avatar");
const formAvatar = document.querySelector('[name="edit-avatar"]');
const iconEditAvatar = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputNameProfile = formProfile.querySelector(".popup__input_type_name");
const inputDescriptionProfile = formProfile.querySelector(
  ".popup__input_type_description"
);
const inputNameCard = formCard.querySelector(".popup__input_type_card-name");
const inputLinkCard = formCard.querySelector(".popup__input_type_url");
const inputLinkAvatar = formAvatar.querySelector(".popup__input_type_url");
const modalImageType = document.querySelector(".popup_type_image");
const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");
const formData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

buttonAddCard.addEventListener("click", () => openModal(modalAddCard));
buttonEditProfile.addEventListener("click", () => {
  clearValidation(formProfile, formData);
  openModal(modalEditProfile);
});
iconEditAvatar.addEventListener("click", () => openModal(modalEditAvatar));

formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  placeList.prepend(
    createCard(
      { name: inputNameCard.value, link: inputLinkCard.value },
      deleteCard,
      showImageHandler
    )
  );
  closeModal(modalAddCard);
  clearValidation(formCard, formData);
  formCard.reset();
});

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = inputNameProfile.value;
  profileDescription.textContent = inputDescriptionProfile.value;
  closeModal(modalEditProfile);
});

formAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  iconEditAvatar.style.backgroundImage = `url(${inputLinkAvatar.value})`;
  closeModal(modalEditAvatar);
});

function showImageHandler(event) {
  modalImage.src = event.target.src;
  modalCaption.alt = event.target.alt;
  modalCaption.textContent = event.target.alt;
  openModal(modalImageType);
}

initialCards.forEach((card) =>
  placeList.append(createCard(card, deleteCard, showImageHandler))
);

enableValidation(formData);
