export default class FormValidator {
  constructor(validationConfig, form) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._errorSelectorTemplate = validationConfig.errorSelectorTemplate;
    this._disableButtonClass = validationConfig.disableButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._textErrorClass = validationConfig.textErrorClass;
    this._formSelector = form;
  }
  _setEventListener(input) {
    input.addEventListener('input', () => {
        const textAboutError = this._formSelector.querySelector(`${this._errorSelectorTemplate}${input.name}`);
        if (input.validity.valid === true) this._hideInputError(input, textAboutError);
        else this._showInputError(input, textAboutError);
        this._toggleButtonState();
    })
  }
  _hideInputError(input, textAboutError) {
    input.classList.remove(this._inputErrorClass);
    textAboutError.textContent = '';
    textAboutError.classList.remove(this._textErrorClass);
  }
  _showInputError(input, textAboutError) {
    input.classList.add(this._inputErrorClass);
    textAboutError.textContent = input.validationMessage;
    textAboutError.classList.add(this._textErrorClass);
  }
  enableValidation(){
    this._scheduleOfInputElementonForm = this._formSelector.querySelectorAll(this._inputSelector);
    this._buttonElementonForm = this._formSelector.querySelector(this._submitButtonSelector);  
    this._scheduleOfInputElementonForm.forEach((input) => this._setEventListener(input));
  }
  _toggleButtonState() {
    if (Array.from(this._scheduleOfInputElementonForm).some((input) => !input.validity.valid)) this._disableButton();
    else this._enableButton();
  }
  _enableButton() {
    this._buttonElementonForm.classList.remove(this._disableButtonClass); 
    this._buttonElementonForm.disabled = false;
  }
  _disableButton() {
    this._buttonElementonForm.classList.add(this._disableButtonClass);
    this._buttonElementonForm.disabled = true;
  }
  removeValidationErrors() {
    this._scheduleOfInputElementonForm.forEach((input) => {
        const textAboutError = this._formSelector.querySelector(`${this._errorSelectorTemplate}${input.name}`);
        if (!input.validity.valid) {
            input.classList.remove(this._inputErrorClass);
            textAboutError.textContent = '';
            textAboutError.classList.remove(this._textErrorClass);
        }
    })
    this._disableButton();
  }
};