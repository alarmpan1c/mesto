export default class Section {
    constructor(renderer, selectorofSection) {
        this._conteiner = document.querySelector(selectorofSection);
        this._renderer = renderer;
    }
    addCard(cardData) {
        cardData.forEach(element => {
        this._renderer(element)
         })
        }
    addItem(Data) {
        this._conteiner.prepend(Data);
    }//addCard
}