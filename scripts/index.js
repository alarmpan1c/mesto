
//--------------------------------------------------------Константы------------------------------------------------------------------------
//------------------------------------------------------ОСНОВНАЯ СТРАНИЦА------------------------------------------------------------------
const mainTitle = document.querySelector('.profile__title');//основная страница - имя
const mainAbout = document.querySelector('.profile__about');//основная страница - род деятельности
const popupOpenbyMainButton = document.querySelector('.profile__button-edit');//основная страница - кнопка редактирования
//--------------------------------------------------------Константы------------------------------------------------------------------------
    //------------------------------------Всплывающее окно РЕДАКТИРОВАНИЕ ПРОФИЛЯ----------------------------------------------------------
const popupOpenEditorForm = document.querySelector('.popup__edit-profile');//всплывающее окно - редактирование профиля
const popupEditorForm = popupOpenEditorForm.querySelector('.popup__form');//всплывающее окно - форма редактирования профиля
const inputNameEditor = popupEditorForm.querySelector('.popup__input_name');//всплывающее окно - ввод имени
const inputJobEditor = popupEditorForm.querySelector('.popup__input_job');//всплывающее окно - ввод рода деятельности
const closeButtonsEditor = document.querySelectorAll('.popup__button-close');//всплывающее окно - кнопка крестик

function openPopup(popup) {
    popup.classList.add('popup__opened');//добавляет класс с видимостью
}

function closePopup(popup) {
    popup.classList.remove('popup__opened')//убирает класс с видимостью   
}

popupOpenbyMainButton.addEventListener('click', () => {
    inputNameEditor.value = mainTitle.textContent;//Установка/заполнение поля ВВОДА начальным значением - ИМЕНЕМ Персонажа с основной страницы
    inputJobEditor.value = mainAbout.textContent;//Установка/заполнение поля ВВОДА начальным значением - Родом деятельности Персонажа с основной страницы
    openPopup(popupOpenEditorForm)
})
   //Регистрация обработчика события закрытия по кнопке Сохранить
popupEditorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();//запрет отправки на сервер
    mainTitle.textContent = inputNameEditor.value;//Записать в поле вывода имени персонажа - имя из поля ВВОДА имени всплывающего окна
    mainAbout.textContent = inputJobEditor.value;//Записать в поле вывода рода деятельности персонажа - род деятельности из поля ВВОДА рода деятельности всплывающего окна
    closePopup(popupOpenEditorForm);//Вызов функции закрытия всплывающего окна
})                                 
//------------------------------Обработчик события - Нажатие мышкой на крестик----------------------------------
closeButtonsEditor.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});