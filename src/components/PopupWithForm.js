import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (selectorPopup, submitForm) {
        super(selectorPopup);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__button-submit');
        this._previousText = this._submitButton.textContent;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    }
        returnText(){
        this._submitButton.textContent = this._previousText;  
    }
        close() { 
            super.close();
            this._form.reset();
        }
        setEventListner() {
            super.setEventListner();
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._submitButton.textContent = `${this._previousText}...`;
                this._submitForm(this._getInput());
            });
        }
        _getInput() {
            this._result = {};
            this._inputs.forEach(input => {
                this._result[input.name] = input.value;
            });
            //console.log(this._result);
            return this._result;
        }
        setInput(data) {
            this._inputs.forEach(input => {
                input.value = data[input.name] ?? '';
                //console.log(data);
            })
        }
};