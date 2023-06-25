import "./pages/index.css";
const header = new URL('./images/header__logo.svg', import.meta.url);
const kusto = new URL('./images/kusto.jpg', import.meta.url);

import initialCards from "./scripts/utils/constants.js";//импортирует массив из файла
import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorSelectorTemplate: '.popup__span-error_type_',
  disableButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  textErrorClass: 'popup__span-error_type'
};

const info = {
  selectorName: '.profile__title',
  selectorJob: '.profile__about'
}
//-----------------------------------ОБЩИЕ---------------------------------------------------------
const popupEditOpenButton = document.querySelector('.profile__button-edit');
const popupAddOpenButton = document.querySelector('.profile__button-add');
const popupEditor = document.querySelector('.popup');
const popupEditorForm = popupEditor.querySelector('.popup__form');
const elementsOutputShedule = '.elements';
//-----------------------------------Всплывающее окно ДОБАВЛЕНИЯ КАРТОЧКИ-----------------------
const popupAdd = document.querySelector('.popyp-add-place');
const popupAddForm = popupAdd.querySelector('.popup__form');
//----------------------------------Селектора--------------------------------------------------
const mySelectorTemplate = '#template';
const popupSelectorEdit = '.popup';
const popupSelectorAdd = '.popyp-add-place'; 
const popupSelectorPicture = '.popup-expand';
const validationEditor = new FormValidator(validationConfig, popupEditorForm);
const validationAdd = new FormValidator(validationConfig, popupAddForm);
const userInfo = new UserInfo(info);
//console.log(userInfo);
const cardOfSection = new Section({//createcard
  items: initialCards, 
  renderer: (item) => {
    const myCard = new Card(item, mySelectorTemplate, openPicturePopup.open);
    const cardElement = myCard.createNewCard();
    return cardElement;
  }
}, elementsOutputShedule)
const openPicturePopup = new PopupWithImage(popupSelectorPicture);

//----------------------------------экземпляр класса Редактора------------------------------------
const popupEditors = new PopupWithForm(popupSelectorEdit, (info) => {
  userInfo.setUserInfo(info);
  popupEditors.close();
 })
const popupAdds = new PopupWithForm(popupSelectorAdd, (data) => {
  cardOfSection.addItem(data);
  popupAdds.close();
})
//-----------------------------------Общие функции---------------------------------------------------
//-----------------------------------Обработчик события нажатия иконки карандаша -> Всплывающее окно редактора------------------------------
popupEditOpenButton.addEventListener('click', () => {
  validationEditor.removeValidationErrors();
  popupEditors.setInput(userInfo.getUserInfo());
  popupEditors.open();
})
//-----------------------------------Обработчик события нажатия кнопки + -> Всплывающее окно добавления места-------------------------------
popupAddOpenButton.addEventListener('click', () => {
  popupAddForm.reset();
  validationAdd.removeValidationErrors();
  popupAdds.open();
})
validationEditor.enableValidation();
validationAdd.enableValidation();
cardOfSection.addCard();
openPicturePopup.setEventListner();
popupEditors.setEventListner();
popupAdds.setEventListner();