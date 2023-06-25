import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (selectorPopup, submitForm) {
        super(selectorPopup);
        this._submitForm = submitForm;
    }
        close() { 
            super.close();
            this._popup.querySelector('.popup__form').reset();
        }
        setEventListner() {
            super.setEventListner();
            this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._submitForm(this._getInput());
            });
        }
        _getInput() {
            this._result = {};
            this._popup.querySelector('.popup__form').querySelectorAll('.popup__input').forEach(input => {
                this._result[input.name] = input.value;
            });
            //console.log(this._result);
            return this._result;
        }
        setInput(data) {
            this._popup.querySelector('.popup__form').querySelectorAll('.popup__input').forEach(input => {
                input.value = data[input.name];
                //console.log(data);
            })
        }
};