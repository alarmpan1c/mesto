export default class Card{
    constructor(card, selector, openPicturePopup){
      this._cardData = card;
      this._url = card.link;
      this._name = card.name;
      this._selector = selector;
      this._funcOpen = openPicturePopup;
    }
    _getTemplateClone() {
      return document.querySelector(this._selector).content.querySelector('.elements__card').cloneNode(true);}
    _toggleLike() {
      this._heartElement.classList.toggle('elements__button-heart_black');
    }
    _deleteCard(){
      this._cardBody.remove();
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
    createNewCard() {
      this._cardBody = this._getTemplateClone();
      this._trashElement = this._cardBody.querySelector('.elements__button-trash');
      this._imageElement = this._cardBody.querySelector('.elements__image');
      this._nameElement = this._cardBody.querySelector('.elements__name');
      this._heartElement = this._cardBody.querySelector('.elements__button-heart');
      this._fillImageData(this._imageElement, this._nameElement);
      this._allListener();
      return this._cardBody;
    }
}