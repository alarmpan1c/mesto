//import "./index.css";
//const header = new URL('./images/header__logo.svg', import.meta.url);
//const kusto = new URL('./images/kusto.jpg', import.meta.url);

//import initialCards from "../utils/constants.js";//импортирует массив из файла
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import EraseForm from "../components/EraseForm.js";
import Api from "../components/Api.js";

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
  selectorJob: '.profile__about',
  selectorPhoto: '.profile__avatar'
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
const popupChangeAvatar = document.querySelector('.popyp-change-avatar');
const popupChangeAvatarForm = popupChangeAvatar.querySelector('.popup__form');
const popupAvatarEdit = document.querySelector('.profile__avatar-button');
const popupEraseImage = document.querySelector('.popyp-erase-image');
const popupEraseImageForm = popupEraseImage.querySelector('.popup__form');
const mySelectorTemplate = '#template';
const popupSelectorEdit = '.popup';
const popupSelectorAdd = '.popyp-add-place'; 
const popupSelectorPicture = '.popup-expand';
const popupSelectorAvatar = '.popyp-change-avatar';
const popupSelectorErase = '.popyp-erase-image';
const validationEditor = new FormValidator(validationConfig, popupEditorForm);
const validationAdd = new FormValidator(validationConfig, popupAddForm);
const validationAvatar = new FormValidator(validationConfig, popupChangeAvatarForm);
const validationErase = new FormValidator(validationConfig, popupEraseImageForm);

const userInfo = new UserInfo(info);
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '39c5dd3e-18c5-4109-bb7f-0a82c5dea405',
    'Content-Type': 'application/json'
  }
})

const eraseSubmitPopup = new EraseForm(popupSelectorErase, ({card, idEraseCard}) => {
  api.eraseCardonServer(idEraseCard)
  .then(res => {
    //console.log(res)
    card.eraseCard()
    eraseSubmitPopup.close();
  })
  .catch((error => console.log('Ошибка при передаче данных удаления карточки на сервере')))
  .finally(() => eraseSubmitPopup.returnText())
})

const cardOfSection = new Section((element) => {//createcard
    cardOfSection.addItem(addingNewCard(element))
  }, elementsOutputShedule);

const openPicturePopup = new PopupWithImage(popupSelectorPicture);

//----------------------------------экземпляр класса Редактора профиля(submit)------------------------------------
const popupEditors = new PopupWithForm(popupSelectorEdit, (info) => {
  api.setInfoonServer(info)
    .then(res => {
      userInfo.setUserInfo({name: res.name, photo: res.avatar, job: res.about});
      //console.log(res)
      popupEditors.close();
    })
    .catch((error => console.log('Ошибка при передаче данных Аватара на сервер')))
    .finally(() => popupEditors.returnText())
  //userInfo.setUserInfo(info);
  
 });
 //----------------------------------экземпляр класса Добавления карточки(submit)------------------------------------
const popupAdds = new PopupWithForm(popupSelectorAdd, (data) => {
  Promise.all([api.getInfo(), api.addCardonServer(data)])
    .then(([userifo, cardinfo]) => {
      //console.log(res)
      cardinfo.writedId = userifo._id;
      cardOfSection.addItem(addingNewCard(cardinfo));
      popupAdds.close();
    })
    .catch((error => console.log('Ошибка при передаче данных Карточки на сервер')))
    .finally(() => popupAdds.returnText())
  
})
//----------------------------------экземпляр класса Редактора Аватара(submit)------------------------------------
const popupAvatar = new PopupWithForm(popupSelectorAvatar, (data) => {
  
  api.setAvataronServer(data)
  .then(res => {
    userInfo.setUserInfo({name: res.name, photo: res.avatar, job: res.about})
   // console.log(res)
   popupAvatar.close();
  })
  .catch((error => console.log('Ошибка при передаче данных Аватара на сервер')))
  .finally(() => popupAvatar.returnText())
  //cardOfSection.addItem(addingNewCard(data));
})

//-----------------------------------Общие функции---------------------------------------------------
//-----------------------------------Обработчик события нажатия иконки карандаша -> Всплывающее окно редактора------------------------------
popupEditOpenButton.addEventListener('click', () => {
  validationEditor.removeValidationErrors();
  //console.log(massivepopup)
  popupEditors.setInput(userInfo.getUserInfo());
  popupEditors.open();
})
//-----------------------------------Обработчик события нажатия кнопки + -> Всплывающее окно добавления места-------------------------------
popupAddOpenButton.addEventListener('click', () => {
  popupAddForm.reset();
  validationAdd.removeValidationErrors();
  popupAdds.open();
})
//-----------------------------------Обработчик события нажатия Аватара + -> Всплывающее окно редактирования Аватара------------------------
popupAvatarEdit.addEventListener('click', () => {
  popupChangeAvatarForm.reset();
  validationAvatar.removeValidationErrors();
  popupAvatar.open();
})

validationEditor.enableValidation();
validationAdd.enableValidation();
validationAvatar.enableValidation();
validationErase.enableValidation();
openPicturePopup.setEventListner();
popupEditors.setEventListner();
popupAdds.setEventListner();
popupAvatar.setEventListner();
eraseSubmitPopup.setEventListner();

function addingNewCard (item) {
  const myCard = new Card(item, mySelectorTemplate, openPicturePopup.open, eraseSubmitPopup.open, (heart, idCard) => {
      if(heart.classList.contains('elements__button-heart_black')) {
        api.eraseHeartonServer(idCard)
        .then(res => {
          myCard.changeHeart(res.likes);
          //console.log(res)
          //console.log('добавляет значение');
        })
        .catch((error => console.log('Ошибка при удалении сердца на сервере')))
      }
      else {
        api.addHeartonServer(idCard)
        .then(res => {
          myCard.changeHeart(res.likes);
        })
        .catch((error => console.log('Ошибка при добавлении сердца на сервере ')))
      }
  });
  const cardElement = myCard.createNewCard();
  //console.log(cardElement)
  return cardElement;
}
//Вывод массива карточек с сервера
Promise.all([api.getInfo(), api.getPicture()])
.then(([infoUser, infoPicture]) => {
  //console.log(infoPicture) rfr dct yfljtkj///////
  infoPicture.forEach(element => element.writedId = infoUser._id);
userInfo.setUserInfo({name: infoUser.name, photo: infoUser.avatar, job: infoUser.about});
cardOfSection.addCard(infoPicture);
})
.catch((error => console.log('Ошибка при загрузке карточек с сервера')))
//console.log(infoPicture)