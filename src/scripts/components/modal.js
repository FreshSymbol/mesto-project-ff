const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => modal.classList.add("popup_is-animated"));

function openModal(element) {
  element.classList.add("popup_is-opened");
  element.querySelector(".popup__close").focus();
  element.addEventListener("keydown", closeModalKeykHandler);
  element.addEventListener("click", closeModalClickHandler);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("keydown", closeModalKeykHandler);
  element.removeEventListener("click", closeModalClickHandler);
}

function closeModalKeykHandler(event) {
  if (event.key === "Escape") closeModal(this);
}

function closeModalClickHandler(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup")
  )
    closeModal(this);
}

export { openModal, closeModal };
