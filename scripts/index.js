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
const scheduleInputEditor = popupEditorForm.querySelectorAll('.popup__input');
const buttonEditor = popupEditorForm.querySelector('.popup__button-submit');
//-----------------------------------Работа с Шаблоном--------------------------------------------
const elementsOutput = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template').content;
//-----------------------------------Всплывающее окно ДОБАВЛЕНИЯ КАРТОЧКИ-----------------------------
const popupAdd = document.querySelector('.popyp-add-place');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddNamePlace = popupAddForm.querySelector('.popup__input_type_place');
const popupAddLinkPlace = popupAddForm.querySelector('.popup__input_type_link-place');
const scheduleInputAdd = popupAddForm.querySelectorAll('.popup__input');
const buttonAdd = popupAddForm.querySelector('.popup__button-submit');
//-----------------------------------Всплывающее окно Ресайз картинки---------------------------------
const popupExtendPicture = document.querySelector('.popup-expand');
const expendImage = popupExtendPicture.querySelector('.picture__image');
const expendCaption = popupExtendPicture.querySelector('.picture__caption');

//-----------------------------------Общие функции---------------------------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');   
}
//-----------------------------------Обработчик события - Нажатие мышкой на крестик------------------
popupCloseButtons.forEach((element) => {
  const parent = element.closest('.popup');
  element.addEventListener('click', () => {
      closePopup(parent);
  })
})
//-----------------------------------Всплывающее окно редактора---------------------------------------
popupEditOpenButton.addEventListener('click', () => {
  removeValidationErrors(popupEditorForm);
  inputNameEditor.value = mainTitle.textContent;
  inputJobEditor.value = mainAbout.textContent;
  toggleButtonState(scheduleInputAdd, buttonEditor, validationConfig.disableButtonClass);
  openPopup(popupEditor);
})
//-----------------------------------Всплывающее окно добавления места-------------------------------
popupAddOpenButton.addEventListener('click', () => {
  popupAddForm.reset();
  toggleButtonState(scheduleInputAdd, buttonAdd, validationConfig.disableButtonClass);
  removeValidationErrors(popupAddForm);
  openPopup(popupAdd);
})
//-----------------------------------Всплывающая форма редактирования профиля---------------------------
//___________________________________Нажатие кнопки Сохранить + Закрытие окна________________________
popupEditorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  mainTitle.textContent = inputNameEditor.value;
  mainAbout.textContent = inputJobEditor.value;
  closePopup(popupEditor);
})                                 
//----------------------------------Всплывающая форма добавление места---------------------------
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
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
  const cardBody = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const trashElement = cardBody.querySelector('.elements__button-trash');
  const imageElement = cardBody.querySelector('.elements__image');
  const nameElement = cardBody.querySelector('.elements__name');
  const heartElement = cardBody.querySelector('.elements__button-heart');
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