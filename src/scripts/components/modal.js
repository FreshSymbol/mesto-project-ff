function openModal(element) {
  element.classList.add("popup_is-opened");
  element.querySelector(".popup__close").focus();
  document.addEventListener("keydown", closeModalKeyEsckHandler);
  element.addEventListener("click", closeModalClickHandler);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalKeyEsckHandler);
  element.removeEventListener("click", closeModalClickHandler);
}

function closeModalKeyEsckHandler(event) {
  const modalActive = event.target.closest(".popup_is-opened");
  if (event.key === "Escape") closeModal(modalActive);
}

function closeModalClickHandler(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup")
  )
    closeModal(this);
}

export { openModal, closeModal };
