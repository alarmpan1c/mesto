import Popup from "./Popup.js";

export default class EraseForm extends Popup {
    constructor (selectorPopup, submitForm) {
        super(selectorPopup);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._previousText = this._popup.querySelector('.popup__button-submit').textContent;
    }
    returnText(){
        this._popup.querySelector('.popup__button-submit').textContent = this._previousText;  
    }
        
        open = (element) => { 
            super.open();
            //console.log(element);
            this._element = element;
            this._idEraseCard = element._idCard;////////////////
        }
        setEventListner() {
            super.setEventListner();
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._popup.querySelector('.popup__button-submit').textContent = `${this._popup.querySelector('.popup__button-submit').textContent}...`;
                this._submitForm({card: this._element, idEraseCard: this._idEraseCard });
            });
        }
}