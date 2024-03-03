import "../styles/index.css";
import { createCard } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation";
import {
  createNewCard,
  editProfileAvatar,
  editProfileInfo,
  getCards,
  getUserInfo,
} from "./components/api";

const cardsContainer = document.querySelector(".places__list");
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
const modals = document.querySelectorAll(".popup");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

modals.forEach((modal) => modal.classList.add("popup_is-animated"));

function updateProfileInfo(userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  inputNameProfile.value = profileTitle.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
}

function updateProfileAvatar(userInfo) {
  iconEditAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

function setIsLoading(isLoading, form) {
  const button = form.querySelector(".popup__button");
  if (isLoading) {
    button.textContent = "Cохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function showImageHandler(event) {
  modalImage.src = event.target.src;
  modalCaption.alt = event.target.alt;
  modalCaption.textContent = event.target.alt;
  openModal(modalImageType);
}

Promise.all([getUserInfo(), getCards()])
  .then(([userInfo, cardsInfo]) => {
    updateProfileAvatar(userInfo);
    updateProfileInfo(userInfo);
    cardsInfo.forEach((cardInfo) => {
      cardsContainer.append(createCard(userInfo, cardInfo, showImageHandler));
    });
  })
  .catch((error) => console.log(error));

buttonAddCard.addEventListener("click", () => {
  openModal(modalAddCard);
});

buttonEditProfile.addEventListener("click", () => {
  openModal(modalEditProfile);
});

iconEditAvatar.addEventListener("click", () => openModal(modalEditAvatar));

formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  setIsLoading(true, formCard);
  Promise.all([
    getUserInfo(),
    createNewCard(inputNameCard.value, inputLinkCard.value),
  ])
    .then(([userInfo, cardInfo]) => {
      cardsContainer.prepend(createCard(userInfo, cardInfo, showImageHandler));
      closeModal(modalAddCard);
      clearValidation(formCard, validationConfig);
      formCard.reset();
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false, formCard));
});

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  setIsLoading(true, formProfile);
  editProfileInfo(inputNameProfile.value, inputDescriptionProfile.value)
    .then((userInfo) => {
      updateProfileInfo(userInfo);
      clearValidation(formProfile, validationConfig);
      closeModal(modalEditProfile);
      formProfile.reset();
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false, formProfile));
});

formAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  setIsLoading(true, formAvatar);
  editProfileAvatar(inputLinkAvatar.value)
    .then((userInfo) => {
      updateProfileAvatar(userInfo);
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false, formAvatar));
  closeModal(modalEditAvatar);
});

enableValidation(validationConfig);
