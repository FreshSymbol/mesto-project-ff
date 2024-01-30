const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");

function openModal(element) {
  element.classList.add("popup_is-opened", "popup_is-animated");
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal(element);
  });

  element.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    )
      closeModal(element);
  });
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

function showImageModal(event) {
  modalImage.src = event.src;
  modalCaption.textContent = event.caption;
}

export { openModal, closeModal, showImageModal };
