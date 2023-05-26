import initialCards from "./constants.js";//импортирует массив из файла
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorSelectorTemplate: '.popup__span-error_type_',
  disableButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  textErrorClass: 'popup__span-error_type'
};

//-----------------------------------ОБЩИЕ---------------------------------------------------------
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const popupAll = document.querySelectorAll('.popup');
//-----------------------------------ОСНОВНАЯ СТРАНИЦА----------------------------------------------
const mainTitle = document.querySelector('.profile__title');
const mainAbout = document.querySelector('.profile__about');
const popupEditOpenButton = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');
//-----------------------------------Всплывающее окно РЕДАКТИРОВАНИЕ ПРОФИЛЯ------------------------
const popupEditor = document.querySelector('.popup');
const popupEditorForm = popupEditor.querySelector('.popup__form');
const inputNameEditor = popupEditorForm.querySelector('.popup__input_type_name');
const inputJobEditor = popupEditorForm.querySelector('.popup__input_type_job');
//-----------------------------------Работа с Шаблоном--------------------------------------------
const elementsOutput = document.querySelector('.elements');
//-----------------------------------Всплывающее окно ДОБАВЛЕНИЯ КАРТОЧКИ-----------------------------
const popupAdd = document.querySelector('.popyp-add-place');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddNamePlace = popupAddForm.querySelector('.popup__input_type_place');
const popupAddLinkPlace = popupAddForm.querySelector('.popup__input_type_link-place');
//-----------------------------------Всплывающее окно Ресайз картинки---------------------------------
const popupExtendPicture = document.querySelector('.popup-expand');
const expendImage = popupExtendPicture.querySelector('.picture__image');
const expendCaption = popupExtendPicture.querySelector('.picture__caption');

const mySelectorTemplate = '#template';
//-----------------------------------Общие функции---------------------------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}
//-----------------------------------Обработчик события - Нажатие мышкой на крестик------------------
popupCloseButtons.forEach((element) => {
  const parent = element.closest('.popup');
  element.addEventListener('click', () => {
      closePopup(parent);
  })
})
//-----------------------------------Обработчик события нажатия иконки карандаша -> Всплывающее окно редактора------------------------------
popupEditOpenButton.addEventListener('click', () => {
  validationEditor.removeValidationErrors();
  inputNameEditor.value = mainTitle.textContent;
  inputJobEditor.value = mainAbout.textContent;
  openPopup(popupEditor);
})
//-----------------------------------Обработчик события нажатия кнопки + -> Всплывающее окно добавления места-------------------------------
popupAddOpenButton.addEventListener('click', () => {
  popupAddForm.reset();
  validationAdd.removeValidationErrors();
  openPopup(popupAdd);
})
//-----------------------------------Всплывающая форма редактирования профиля---------------------------
//___________________________________Обработчик события нажатия кнопки Сохранить редактирования профиля -> перезапись полей в гл форме + Закрытие окна__________
popupEditorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  mainTitle.textContent = inputNameEditor.value;
  mainAbout.textContent = inputJobEditor.value;
  closePopup(popupEditor);
})                                 
//----------------------------------Всплывающая форма добавление места---------------------------
//________Обработчик события нажатия кнопки Сохранить добавления места -> перезапись полей в гл форме + Закрытие окна__________
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newPlace = {
      name: popupAddNamePlace.value,
      link: popupAddLinkPlace.value
  };
  const newCard = new Card(newPlace, mySelectorTemplate, openPicturePopup);
  addCard(elementsOutput, newCard.createNewCard());
  closePopup(popupAdd);
  evt.target.reset(); 
})                                 
function addCard(container, cardData) {
  container.prepend(cardData);
}
function openPicturePopup(cardData) {
  fillImageData(cardData, expendImage, expendCaption);
  openPopup(popupExtendPicture);
}
initialCards.forEach((initialСard) => {
  const mycard = new Card(initialСard, mySelectorTemplate, openPicturePopup);
  addCard(elementsOutput, mycard.createNewCard());
})

function fillImageData(image, data, name) {
    data.alt = image.name;
    data.src = image.link;
    name.textContent = image.name;
}
//--------------------------------Функция проверки нажатия клафиши ESC---------------------------
function closePopupEsc(evt) {
  if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'))
}
//--------------------------------Обработчик события - Нажатие на оверлей------------------------
popupAll.forEach((element) => {
  element.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) closePopup(evt.currentTarget);
  })
})
const validationEditor = new FormValidator(validationConfig, popupEditorForm);
validationEditor.enableValidation();
const validationAdd = new FormValidator(validationConfig, popupAddForm);
validationAdd.enableValidation();