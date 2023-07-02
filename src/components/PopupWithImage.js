import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (selectorPopup) {
        super(selectorPopup);//наследованеи
        this._image = this._popup.querySelector('.picture__image');
        this._caption = this._popup.querySelector('.picture__caption');
    }
    open = (card) => {//fillimagedata()
        console.log(card)
        this._image.src = card.link;
        this._caption.alt = card.name;
        this._caption.textContent = card.name;
        super.open();
    }
};