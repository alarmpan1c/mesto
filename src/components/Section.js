export default class Section {
    constructor({items, renderer}, selectorofSection) {
        this._conteiner = document.querySelector(selectorofSection);
        this._items = items;
        this._renderer = renderer;
    }
    addCards() {this._items.forEach(element => {this.addItem(element);})}
    addItem(cardData) {this._conteiner.prepend(this._renderer(cardData));}//addCards
}