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
        scheduleOfInputElementonForm.forEach((input) => {//перебор полей ввода на всплывающей форме
            input.addEventListener('input', () => {//обработка события - ввод в поле ввода
                const textAboutError = document.querySelector(`${config.errorSelectorTemplate}${input.name}`);//склейка, очень удобно для формирования имени модификатора
                if (input.validity.valid === true) {
                    //ошибки есть?
                    input.classList.remove(config.inputErrorClass);//удалить модификатор
                    textAboutError.textContent = '';//"обнуление" поля
                    textAboutError.classList.remove(config.textErrorClass);//удалить модификатор 
                }
                else {//не выполнено -> сообщение об ошибке
                    input.classList.add(config.inputErrorClass);//добавить модификатор
                    textAboutError.textContent = input.validationMessage;//присвоение сообщения об ошибке
                    textAboutError.classList.add(config.textErrorClass);//добавить модификатор 
                }
                if (Array.from(scheduleOfInputElementonForm).some((input) => !input.validity.valid)) {//можно every(обратная some) ошибки есть в полях ввода
                    buttonElementonForm.classList.add(config.disableButtonClass);//добавить модификатор 
                    buttonElementonForm.disabled = true;//выключить
                }
                else {//ошибок нет
                    buttonElementonForm.classList.remove(config.disableButtonClass); //удалить модификатор 
                    buttonElementonForm.disabled = false;//включить
                }
            })
        })
    })
}
enableValidation(validationConfig)