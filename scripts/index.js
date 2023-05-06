//---------------------------------------------------------Карточки------------------------------------------------------------------------
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//--------------------------------------------------------Константы------------------------------------------------------------------------
//----------------------------------------------------------ОБЩИЕ--------------------------------------------------------------------------
const closeButtonsEditor = document.querySelectorAll('.popup__button-close');//всплывающее окно - кнопка крестик
//------------------------------------------------------ОСНОВНАЯ СТРАНИЦА------------------------------------------------------------------
const mainTitle = document.querySelector('.profile__title');//основная страница - имя
const mainAbout = document.querySelector('.profile__about');//основная страница - род деятельности
const popupOpenbyMainButton = document.querySelector('.profile__button-edit');//основная страница - кнопка редактирования
const popupopenbyAddButton = document.querySelector('.profile__button-add');//основная страница - кнопка добавления
//----------------------------------------Всплывающее окно РЕДАКТИРОВАНИЕ ПРОФИЛЯ----------------------------------------------------------
const popupOpenEditorForm = document.querySelector('.popup');//всплывающее окно - редактирование профиля
const popupEditorForm = popupOpenEditorForm.querySelector('.popup__form');//всплывающее окно - форма редактирования профиля
const inputNameEditor = popupEditorForm.querySelector('.popup__input_type_name');//всплывающее окно - ввод имени
const inputJobEditor = popupEditorForm.querySelector('.popup__input_type_job');//всплывающее окно - ввод рода деятельности
//-----------------------------------------------------Работа с Шаблоном-------------------------------------------------------------------
const elementsOutput = document.querySelector('.elements');//месты вывода шаблонов/карточек
const cardTemplate = document.querySelector('#template').content;//тело шаблона
//-------------------------------------------Всплывающее окно ДОБАВЛЕНИЯ КАРТОЧКИ----------------------------------------------------------
const popupOpenAddForm = document.querySelector('.popyp-add-place');//всплывающее окно - добавления карточки
const popupAddForm = popupOpenAddForm.querySelector('.popup__form');//всплывающее окно - форма добавления карточки
const popupAddNamePlace = popupAddForm.querySelector('.popup__input_type_place');//всплывающее окно - поле ввода названия места
const popupAddLinkPlace = popupAddForm.querySelector('.popup__input_type_link-place');//всплывающее окно - поле ввода ссылки места
//--------------------------------------------Всплывающее окно Ресайз картинки------------------------------------------------------------
const expendPicture = document.querySelector('.popup-expand');//всплывающее окно - ресайз картинки
const expendImage = expendPicture.querySelector('.picture__image');//ресайз картинки - изображение
const expendCaption = expendPicture.querySelector('.picture__caption');//ресайз картинки - подпись
//-------------------------------------------------------Общие функции---------------------------------------------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');//добавляет класс с видимостью
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');//убирает класс с видимостью   
}
//---------------------------------------------Обработчик события - Нажатие мышкой на крестик-----------------------------------------------
closeButtonsEditor.forEach((element) => {//перебор кнопок
  const parent = element.closest('.popup');//родитель
  element.addEventListener('click', () => {//по нажатию->закрытие
      closePopup(parent);
  })
})
//----------------------------------------------------------Главная форма------------------------------------------------------------------
//---------------------------------------------------Всплывающее окно редактора------------------------------------------------------------
popupOpenbyMainButton.addEventListener('click', () => {
  inputNameEditor.value = mainTitle.textContent;//Установка/заполнение поля ВВОДА начальным значением - ИМЕНЕМ Персонажа с основной страницы
  inputJobEditor.value = mainAbout.textContent;//Установка/заполнение поля ВВОДА начальным значением - Родом деятельности Персонажа с основной страницы
  openPopup(popupOpenEditorForm)
})
//---------------------------------------------------Всплывающее окно добавления места-----------------------------------------------------
popupopenbyAddButton.addEventListener('click', () => openPopup(popupOpenAddForm))
//----------------------------------------------------------ВСПЛЫВАЮЩИЕ ФОРМЫ---------------------------------------------------------------
//-----------------------------------------------Всплывающая форма редактирования профиля---------------------------------------------------
//_______________________________________________Нажатие кнопки Сохранить + Закрытие окна___________________________________________________
popupEditorForm.addEventListener('submit', (evt) => {
  evt.preventDefault();//запрет отправки на сервер
  mainTitle.textContent = inputNameEditor.value;//Записать в поле вывода имени персонажа - имя из поля ВВОДА имени всплывающего окна
  mainAbout.textContent = inputJobEditor.value;//Записать в поле вывода рода деятельности персонажа - род деятельности из поля ВВОДА рода деятельности всплывающего окна
  closePopup(popupOpenEditorForm);//Вызов функции закрытия всплывающего окна
})                                 
//---------------------------------------------------Всплывающая форма добавление места---------------------------------------------------
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();//запрет отправки на сервер
  //массив
  const newPleace = {
      name: popupAddNamePlace.value,
      link: popupAddLinkPlace.value
  };
  PreAdd(elementsOutput, newPleace);
  popupAddNamePlace.value = '';//обнуление поля
  popupAddLinkPlace.value = '';//обнуление поля
  closePopup(popupOpenAddForm);
})                                 
function PreAdd(ini, obj) {
  ini.prepend(CreateNewCard(obj));
}
function Heart(Obj) {
  Obj.addEventListener('click', () => Obj.classList.toggle('elements__button-heart_black'));
}
function CreateNewCard(Initial) {
  const cardBody = cardTemplate.querySelector('.elements__card').cloneNode(true);//тело шаблона клон
  const trashElement = cardBody.querySelector('.elements__button-trash');//корзина - кнопка удаления карточки - места
  const imageElement = cardBody.querySelector('.elements__image');//изображение места в карточке
  const descriptionElement = cardBody.querySelector('.elements__description');//описанме места
  const nameElement = descriptionElement.querySelector('.elements__name');//название места в карточке
  const heartElement = cardBody.querySelector('.elements__button-heart');//сердце - кнопка
  nameElement.textContent = Initial.name;
  Recorder(Initial, imageElement);
  Heart(heartElement);
    trashElement.addEventListener('click', () => trashElement.closest('.elements__card').remove())
    imageElement.addEventListener('click', () => {
      Recorder(Initial, expendImage);
      expendCaption.textContent = Initial.name;
      openPopup(expendPicture);
  })
  return cardBody;
}
initialCards.forEach((initial_card) => PreAdd(elementsOutput, initial_card))
function Recorder(Sender, Receiver) {
    Receiver.alt = Sender.name;
    Receiver.src = Sender.link;
}