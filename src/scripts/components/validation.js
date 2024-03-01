function showError(form, input, message, data) {
  const error = form.querySelector(`.${input.name}-error`);
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
    input.setCustomValidity(input.dataset.errorMessage);
  else input.setCustomValidity("");

  if (!input.validity.valid)
    showError(form, input, input.validationMessage, data);
  else hideError(form, input, data);
}

function hasInvalidForm(form) {
  return Array.from(form).some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, button, data) {
  if (hasInvalidForm(inputList)) {
    button.disabled = true;
    button.classList.add(data.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(data.inactiveButtonClass);
  }
}

function setEventListener(form, data) {
  const inputList = Array.from(form.querySelectorAll(data.inputSelector));
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

function clearValidation(form, data) {
  const inputList = form.querySelectorAll(data.inputErrorClass);
  const button = form.querySelector(data.submitButtonSelector);
  inputList.forEach((input) => {
    hideError(form, input, data);
  });
  button.disabled = true;
  button.classList.add(data.inactiveButtonClass);
}

export { enableValidation, clearValidation };
