const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => modal.classList.add("popup_is-animated"));

function openModal(element) {
  element.classList.add("popup_is-opened");
  element.querySelector(".popup__close").focus();
  element.addEventListener("keydown", keydown);
  element.addEventListener("click", click);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("keydown", keydown);
  element.removeEventListener("click", click);
}

function keydown(event) {
  if (event.key === "Escape") closeModal(this);
}

function click(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("popup")
  )
    closeModal(this);
}

export { openModal, closeModal };
