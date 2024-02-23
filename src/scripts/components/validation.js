import { from } from "core-js/core/array";

function showError(form, input, message, data) {
  const error = form.querySelector(`.${input.name}-error`);
  console.log(error);
  input.classList.add(data.inputErrorClass);
  error.textContent = message;
  error.classList.add(data.errorClass);
}

function hideError(form, input, data) {
  const error = form.querySelector(`.${input.name}-error`);
  input.classList.remove(data.inputErrorClass);
  error.textContent = "";
  error.classList.remove(data.errorClass);
}

function isValid(form, input, data) {
  if (input.validity.patternMismatch)
    input.setCustomValidation(input.dataset.errorMessage);
  else inputElement.setCustomValidity("");

  if (!input.validity.valid)
    showError(form, input, input.validationMessage, data);
  else hideError(form, input, data);
}

function hasInvalidForm(form) {
  return from.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, button, data) {
  if (hasInvalidForm(inputList)) {
    button.disable = true;
    button.classList.add(data.inactiveButtonClass);
  } else {
    button.disable = false;
    button.classList.remove(data.inactiveButtonClass);
  }
}

function setEventListener(form, data) {
  const inputList = Array.from(form.querySelector(data.inputSelector));
  const button = form.querySelector(data.submitButtonSelector);
  toggleButtonState(inputList, button, data);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, data);
      toggleButtonState(inputList, button, data);
    });
  });
}

function enableValidation(data) {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((form) => {
    setEventListener(form, data);
  });
}

// function clearValidation(form, data) {}

export { enableValidation };
