import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (selectorPopup) {
        super(selectorPopup);//наследованеи
    }
    open = (card) => {//fillimagedata()
        console.log(card)
        this._popup.querySelector('.picture__image').src = card.link;
        this._popup.querySelector('.picture__caption').alt = card.place;
        this._popup.querySelector('.picture__caption').textContent = card.place;
        super.open();
    }
};