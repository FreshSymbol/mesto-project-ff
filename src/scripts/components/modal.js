const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => modal.classList.add("popup_is-animated"));

function openModal(element) {
  element.classList.add("popup_is-opened");
  element.querySelector(".popup__close").focus();
  element.addEventListener("keydown", modalCloseKeykHandler);
  element.addEventListener("click", modalCloseClickHandler);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("keydown", modalCloseKeykHandler);
  element.removeEventListener("click", modalCloseClickHandler);
}

function modalCloseKeykHandler(event) {
  if (event.key === "Escape") closeModal(this);
}

function modalCloseClickHandler(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup")
  )
    closeModal(this);
}

export { openModal, closeModal };
