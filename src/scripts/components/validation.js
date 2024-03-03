function showError(form, input, message, config) {
  const error = form.querySelector(`.${input.name}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = message;
  error.classList.add(config.errorClass);
}

function hideError(form, input, config) {
  const error = form.querySelector(`.${input.name}-error`);
  input.classList.remove(config.inputErrorClass);
  error.textContent = "";
  error.classList.remove(config.errorClass);
}

function isValid(form, input, config) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid)
    showError(form, input, input.validationMessage, config);
  else hideError(form, input, config);
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function disableButton(button, config) {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

function enableButton(button, config) {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(button, config);
  } else {
    enableButton(button, config);
  }
}

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}

function clearValidation(form, config) {
  const inputList = form.querySelectorAll(config.inputErrorClass);
  const button = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    hideError(form, input, config);
  });
  disableButton(button, config);
}

export { enableValidation, clearValidation };
