const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    errorSelectorTemplate: '.popup__span-error_type_',
    disableButtonClass: 'popup__button-submit_invalid',
    inputErrorClass: 'popup__input_invalid',
    textErrorClass: 'popup__span-error_type'
};
function enableValidation(config) {
    const allForms = Array.from(document.querySelectorAll(config.formSelector));
    allForms.forEach((form) => {
        const scheduleOfInputElementonForm = form.querySelectorAll(config.inputSelector);
        const buttonElementonForm = form.querySelector(config.submitButtonSelector);
        scheduleOfInputElementonForm.forEach((input) => setEventListener(input, config, scheduleOfInputElementonForm, buttonElementonForm));
    })
}
function setEventListener(input, config, scheduleOfInputElementonForm, buttonElementonForm) {
    input.addEventListener('input', () => {
        const textAboutError = document.querySelector(`${config.errorSelectorTemplate}${input.name}`);
        if (input.validity.valid === true) hideInputError(input, config.inputErrorClass, textAboutError, config.textErrorClass);
        else showInputError(input, config.inputErrorClass, textAboutError, config.textErrorClass);
        toggleButtonState(scheduleOfInputElementonForm, buttonElementonForm, config.disableButtonClass);
    })
}
function hideInputError(input, inputErrorClass, textAboutError, textErrorClass) {
    input.classList.remove(inputErrorClass);
    textAboutError.textContent = '';
    textAboutError.classList.remove(textErrorClass);
}
function showInputError(input, inputErrorClass, textAboutError, textErrorClass) {
    input.classList.add(inputErrorClass);
    textAboutError.textContent = input.validationMessage;
    textAboutError.classList.add(textErrorClass);
}

function toggleButtonState(inputList, button, disableButtonClass) {
    if (Array.from(inputList).some((input) => !input.validity.valid)) disableButton(button, disableButtonClass);
    else enableButton(button, disableButtonClass);
}
function enableButton(button, disableButtonClass) {
    button.classList.remove(disableButtonClass); 
    button.disabled = false;
}
function disableButton(button, disableButtonClass) {
    button.classList.add(disableButtonClass);
    button.disabled = true;
}
function removeValidationErrors(form) {
    form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
        const textAboutError = document.querySelector(`${validationConfig.errorSelectorTemplate}${input.name}`);
        if (!input.validity.valid) {
            input.classList.remove(validationConfig.inputErrorClass);
            textAboutError.textContent = '';
            textAboutError.classList.remove(validationConfig.textErrorClass);
        }
    })
}

enableValidation(validationConfig)