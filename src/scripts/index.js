import "../styles/index.css";
import { createCard, showLikeHandler } from "./components/card.js";
import { closeModal, openModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation";
import {
  createNewCard,
  editProfileAvatar,
  editProfileInfo,
  getCards,
  getUserInfo,
} from "./components/api";

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

buttonAddCard.addEventListener("click", () => {
  openModal(modalAddCard);
});
buttonEditProfile.addEventListener("click", () => {
  clearValidation(formCard, formData);
  openModal(modalEditProfile);
});

iconEditAvatar.addEventListener("click", () => openModal(modalEditAvatar));
formCard.addEventListener("submit", (event) => {
  event.preventDefault();
  loading(true, formCard.querySelector(".popup__button"));
  createNewCard(inputNameCard.value, inputLinkCard.value)
    .then((card) => {
      placeList.prepend(
        createCard(
          { name: card.name, link: card.link },
          card["_id"],
          showImageHandler
        )
      );
    })
    .catch((error) => console.log(error))
    .finally(() => loading(false, formCard.querySelector(".popup__button")));

  closeModal(modalAddCard);
  clearValidation(formCard, formData);
  formCard.reset();
});

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  loading(true, formProfile.querySelector(".popup__button"));
  editProfileInfo(inputNameProfile.value, inputDescriptionProfile.value)
    .catch((error) => console.log(error))
    .finally(() => loading(false, formProfile.querySelector(".popup__button")));
  updateProfileInfo();
  closeModal(modalEditProfile);
});

formAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  editProfileAvatar(inputLinkAvatar.value)
    .then((userInfo) => updateProfileAvatar(userInfo.avatar))
    .catch((error) => console.log(error));
  closeModal(modalEditAvatar);
});

function updateProfileInfo() {
  getUserInfo()
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      inputNameProfile.value = profileTitle.textContent;
      inputDescriptionProfile.value = profileDescription.textContent;
    })
    .catch((error) => console.log(error));
}

function updateProfileAvatar(avatar) {
  iconEditAvatar.style.backgroundImage = `url(${avatar})`;
}

function loading(isLoading, button) {
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
    updateProfileAvatar(userInfo.avatar);
    updateProfileInfo();
    cardsInfo.forEach((cardInfo) => {
      const card = createCard(cardInfo, cardInfo["_id"], showImageHandler);
      showLikeHandler(
        cardInfo,
        userInfo["_id"],
        card.querySelector(".card__like-count"),
        card.querySelector(".card__like-button")
      );
      if (userInfo["_id"] !== cardInfo.owner["_id"]) {
        card.querySelector(".card__delete-button").remove();
      }
      placeList.append(card);
    });
  })
  .catch((error) => console.log(error));

enableValidation(formData);
