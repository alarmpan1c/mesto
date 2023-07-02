export default class Card{
  constructor(card, selector, openPicturePopup, eraseSubmitPopup, toggleHeart){
    this._cardData = card;
    this._url = card.link;
    this._name = card.name;
    this._selector = selector;
    this._funcOpen = openPicturePopup;
    this._eraseSubmitPopup = eraseSubmitPopup;
    this._IDmy = card.writedId;
    this._notMyID = card.owner._id;
    this._hearts = card.likes;
    this._length = card.likes.length;
    this._toggleHeart = toggleHeart;
    this._idCard = card._id;
  }
  _getTemplateClone() {
    return document.querySelector(this._selector).content.querySelector('.elements__card').cloneNode(true);}
  _toggleLike() {
    this._toggleHeart(this._heartElement, this._idCard);
    //this._heartElement.classList.toggle('elements__button-heart_black');
  }

  _deleteCard = () => {
    
    this._eraseSubmitPopup(this);///////////////
  }
  _handleImageClick(){
    this._fillImageData(this._imageElement, this._nameElement);
    this._funcOpen(this._cardData);  
  }
  _fillImageData(data, name) {
    data.alt = this._name;
    data.src = this._url;
    name.textContent = this._name;
  }
  _allListener() {
    this._heartElement.addEventListener('click', () => this._toggleLike());
    this._trashElement.addEventListener('click', () => this._deleteCard());
    this._imageElement.addEventListener('click', () => this._handleImageClick());
  }
  
  changeHeart(data) {
    this._heartElement.classList.toggle('elements__button-heart_black');
    this._count.textContent = data.length;
  }
  createNewCard() {
    this._cardBody = this._getTemplateClone();
    this._trashElement = this._cardBody.querySelector('.elements__button-trash');
    this._imageElement = this._cardBody.querySelector('.elements__image');
    this._nameElement = this._cardBody.querySelector('.elements__name');
    this._heartElement = this._cardBody.querySelector('.elements__button-heart');
    this._count = this._cardBody.querySelector('.element__count');
    this._checkID();
    this._fillImageData(this._imageElement, this._nameElement);
    this._checkHeart();
    this._allListener();
    return this._cardBody;
  }
  eraseCard() {
    this._cardBody.remove();
  }
  _checkHeart(){
     this._hearts.forEach(element => {
       if(element._id === this._IDmy) {
         this._heartElement.classList.add('elements__button-heart_black');/////////////
       }
     })
     this._count.textContent = this._length;
  }
  _checkID() {
    if (this._IDmy === this._notMyID) {
      this._trashElement.style.display = 'block';
    } else {
      this._trashElement.style.display = 'none';
    }
  }
  }