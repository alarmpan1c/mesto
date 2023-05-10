//--------------------------------------------------------Константы------------------------------------------------------------------------
//----------------------------------------------------------ОБЩИЕ--------------------------------------------------------------------------
const popupCloseButtons = document.querySelectorAll('.popup__button-close');//всплывающее окно - кнопка крестик
const popupAll = document.querySelectorAll('.popup');//всплывающие окна
//------------------------------------------------------ОСНОВНАЯ СТРАНИЦА------------------------------------------------------------------
const mainTitle = document.querySelector('.profile__title');//основная страница - имя
const mainAbout = document.querySelector('.profile__about');//основная страница - род деятельности
const popupEditOpenButton = document.querySelector('.profile__button-edit');//основная страница - кнопка редактирования
const popupAddOpenButton = document.querySelector('.profile__button-add');//основная страница - кнопка добавления
//----------------------------------------Всплывающее окно РЕДАКТИРОВАНИЕ ПРОФИЛЯ----------------------------------------------------------
const popupEditor = document.querySelector('.popup');//всплывающее окно - редактирование профиля
const popupEditorForm = popupEditor.querySelector('.popup__form');//всплывающее окно - форма редактирования профиля
const inputNameEditor = popupEditorForm.querySelector('.popup__input_type_name');//всплывающее окно - ввод имени
const inputJobEditor = popupEditorForm.querySelector('.popup__input_type_job');//всплывающее окно - ввод рода деятельности
const scheduleInputEditor = popupEditorForm.querySelectorAll('.popup__input');
const buttonEditor = popupEditorForm.querySelector('.popup__button-submit');
//-----------------------------------------------------Работа с Шаблоном-------------------------------------------------------------------
const elementsOutput = document.querySelector('.elements');//месты вывода шаблонов/карточек
const cardTemplate = document.querySelector('#template').content;//тело шаблона
//-------------------------------------------Всплывающее окно ДОБАВЛЕНИЯ КАРТОЧКИ----------------------------------------------------------
const popupAdd = document.querySelector('.popyp-add-place');//всплывающее окно - добавления карточки
const popupAddForm = popupAdd.querySelector('.popup__form');//всплывающее окно - форма добавления карточки
const popupAddNamePlace = popupAddForm.querySelector('.popup__input_type_place');//всплывающее окно - поле ввода названия места
const popupAddLinkPlace = popupAddForm.querySelector('.popup__input_type_link-place');//всплывающее окно - поле ввода ссылки места
const scheduleInputAdd = popupAddForm.querySelectorAll('.popup__input');
const buttonAdd = popupAddForm.querySelector('.popup__button-submit');
//--------------------------------------------Всплывающее окно Ресайз картинки------------------------------------------------------------
const popupExtendPicture = document.querySelector('.popup-expand');//всплывающее окно - ресайз картинки
const expendImage = popupExtendPicture.querySelector('.picture__image');//ресайз картинки - изображение
const expendCaption = popupExtendPicture.querySelector('.picture__caption');//ресайз картинки - подпись
//-----------------------------------------Очистка примечания под полем ввода-------------------------------------------------------------
function clearSpan(form) {
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
      const textAboutError = document.querySelector(`${validationConfig.errorSelectorTemplate}${input.name}`)
      if (!input.validity.valid) {//скрыть ошибку
          input.classList.remove(validationConfig.inputErrorClass);
          textAboutError.textContent = '';
          textAboutError.classList.remove(validationConfig.textErrorClass);
      }
  })
}
//-----------------------------------------Активация/деактивация кнопки Сохранить---------------------------------------------------------
function activeButton(inputList, button, disableButtonClass) {
  if (Array.from(inputList).some((input) => input.validity.valid)) {
      button.classList.add(disableButtonClass);
      button.disabled = true;
  }
  else {
      button.classList.remove(disableButtonClass);
      button.disabled = false;
  }
}
//-------------------------------------------------------Общие функции---------------------------------------------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');//добавляет класс с видимостью
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');//убирает класс с видимостью   
}
//---------------------------------------------Обработчик события - Нажатие мышкой на крестик-----------------------------------------------
popupCloseButtons.forEach((element) => {//перебор кнопок
  const parent = element.closest('.popup');//родитель
  element.addEventListener('click', () => {//по нажатию->закрытие
      closePopup(parent);
  })
})
//----------------------------------------------------------Главная форма------------------------------------------------------------------
//---------------------------------------------------Всплывающее окно редактора------------------------------------------------------------
popupEditOpenButton.addEventListener('click', () => {
  clearSpan(popupEditorForm);
  inputNameEditor.value = mainTitle.textContent;//Установка/заполнение поля ВВОДА начальным значением - ИМЕНЕМ Персонажа с основной страницы
  inputJobEditor.value = mainAbout.textContent;//Установка/заполнение поля ВВОДА начальным значением - Родом деятельности Персонажа с основной страницы
  activeButton(scheduleInputEditor, buttonEditor, validationConfig.disableButtonClass);
  openPopup(popupEditor)
})
//---------------------------------------------------Всплывающее окно добавления места-----------------------------------------------------
popupAddOpenButton.addEventListener('click', () => {
  clearSpan(popupAddForm);
  activeButton(scheduleInputAdd, buttonAdd, validationConfig.disableButtonClass);
   openPopup(popupAdd)
})
//----------------------------------------------------------ВСПЛЫВАЮЩИЕ ФОРМЫ---------------------------------------------------------------
//-----------------------------------------------Всплывающая форма редактирования профиля---------------------------------------------------
//_______________________________________________Нажатие кнопки Сохранить + Закрытие окна___________________________________________________
popupEditorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();//запрет отправки на сервер
  mainTitle.textContent = inputNameEditor.value;//Записать в поле вывода имени персонажа - имя из поля ВВОДА имени всплывающего окна
  mainAbout.textContent = inputJobEditor.value;//Записать в поле вывода рода деятельности персонажа - род деятельности из поля ВВОДА рода деятельности всплывающего окна
  closePopup(popupEditor);//Вызов функции закрытия всплывающего окна
})                                 
//---------------------------------------------------Всплывающая форма добавление места---------------------------------------------------
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();//запрет отправки на сервер
  //массив
  const newPlace = {
      name: popupAddNamePlace.value,
      link: popupAddLinkPlace.value
  };
  addCard(elementsOutput, newPlace);
  closePopup(popupAdd);
  evt.target.reset(); 
})                                 
function addCard(container, cardData) {
  container.prepend(createNewCard(cardData));
}
function initCardLike(likeButton) {
  likeButton.addEventListener('click', () => likeButton.classList.toggle('elements__button-heart_black'));
}
function createNewCard(cardData) {
  const cardBody = cardTemplate.querySelector('.elements__card').cloneNode(true);//тело шаблона клон
  const trashElement = cardBody.querySelector('.elements__button-trash');//корзина - кнопка удаления карточки - места
  const imageElement = cardBody.querySelector('.elements__image');//изображение места в карточке
  const nameElement = cardBody.querySelector('.elements__name');//название места в карточке
  const heartElement = cardBody.querySelector('.elements__button-heart');//сердце - кнопка
  nameElement.textContent = cardData.name;
  fillImageData(cardData, imageElement);
  initCardLike(heartElement);
  trashElement.addEventListener('click', () => cardBody.remove())
  imageElement.addEventListener('click', () => {
    fillImageData(cardData, expendImage);
    expendCaption.textContent = cardData.name;
    openPopup(popupExtendPicture);
  })
  return cardBody;
}
initialCards.forEach((initialСard) => addCard(elementsOutput, initialСard))
function fillImageData(image, data) {
    data.alt = image.name;
    data.src = image.link;
}
//--------------------------------Функция проверки нажатия клафиши ESC------------------------------
function closePopupEsc(evt) {
  if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'))
}

document.addEventListener('keydown', closePopupEsc);

//---------------------------------------------Обработчик события - Нажатие на оверлей-----------------------------------------------
popupAll.forEach((element) => {//перебор окон
  element.addEventListener('mousedown', (evt) => {//по нажатию кнопки мыши->закрытие
      if (evt.target === evt.currentTarget) closePopup(evt.currentTarget);
  })
})