export default class Popup{

    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._closePopupButt = this._popup.querySelector('.popup__button-close');
    }
        open() {
            this._popup.classList.add('popup_opened');
            document.addEventListener('keydown', this._handleEscClose);
        }
        close() {
            this._popup.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._handleEscClose);
        }
        _handleEscClose = (evt) => {
            //if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'))
            if (evt.key === 'Escape') {
                this.close();
            }
        }
        setEventListner() {
            this._closePopupButt.addEventListener('click', () => this.close());
            this._popup.addEventListener('click', this._overlayClose);
        }
        _overlayClose = (evt) => {
                      if (evt.target === evt.currentTarget) {
                        this.close();
                      }
        }
};