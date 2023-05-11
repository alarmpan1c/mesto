const validationConfig = {
    formSelector: '.popup__form',//формы всплывающих окон
    inputSelector: '.popup__input',//поля ввода всех попапов
    submitButtonSelector: '.popup__button-submit',//кнопки 'сохранить' всех попапов
    errorSelectorTemplate: '.popup__span-error_type_',//шаблон имени для поля ввода ошибки, интересный метод
    disableButtonClass: 'popup__button-submit_invalid',//кнопка не активная из-за не выполнения условий
    inputErrorClass: 'popup__input_invalid',//класс подчеркивания поля ввода
    textErrorClass: 'popup__span-error_type'//класс текстовое сообщение об ошибке
};
function enableValidation(config) {
    const allForms = Array.from(document.querySelectorAll(config.formSelector));//все всплывающие формы
    allForms.forEach((form) => {//перебор всплывающих форм
        const scheduleOfInputElementonForm = form.querySelectorAll(config.inputSelector);//список полей ввода расположенных на всплывающей форме
        const buttonElementonForm = form.querySelector(config.submitButtonSelector);//кнопка расположенная на всплывающей форме
        scheduleOfInputElementonForm.forEach((input) => setEventListener(input, config, scheduleOfInputElementonForm, buttonElementonForm));
    })
}
function setEventListener(input, config, scheduleOfInputElementonForm, buttonElementonForm) {
    input.addEventListener('input', () => {//обработка события - ввод в поле ввода
        const textAboutError = document.querySelector(`${config.errorSelectorTemplate}${input.name}`);//склейка, очень удобно для формирования имени модификатора
        if (input.validity.valid === true) hideInputError(input, config.inputErrorClass, textAboutError, config.textErrorClass);
        else showInputError(input, config.inputErrorClass, textAboutError, config.textErrorClass);
        toggleButtonState(scheduleOfInputElementonForm, buttonElementonForm, config.disableButtonClass);
    })
}
function hideInputError(input, inputErrorClass, textAboutError, textErrorClass) {
    input.classList.remove(inputErrorClass);//удалить модификатор
    textAboutError.textContent = '';//"обнуление" поля
    textAboutError.classList.remove(textErrorClass);//удалить модификатор 
}
function showInputError(input, inputErrorClass, textAboutError, textErrorClass) {
    input.classList.add(inputErrorClass);//добавить модификатор
    textAboutError.textContent = input.validationMessage;//присвоение сообщения об ошибке
    textAboutError.classList.add(textErrorClass);//добавить модификатор 
}
//toggleButtonState(scheduleInputEditor, buttonEditor, validationConfig.disableButtonClass);
function toggleButtonState(inputList, button, disableButtonClass) {
    if (Array.from(inputList).some((input) => !input.validity.valid)) disableButton(button, disableButtonClass);
    else enableButton(button, disableButtonClass);
}
function enableButton(button, disableButtonClass) {
    button.classList.remove(disableButtonClass); //удалить модификатор 
    button.disabled = false;//включить
}
function disableButton(button, disableButtonClass) {
    button.classList.add(disableButtonClass);//добавить модификатор 
    button.disabled = true;//выключить
}

enableValidation(validationConfig)