export default class EmptyCart {
  emptyCart: HTMLDivElement;

  message: HTMLHeadingElement;

  constructor() {
    this.emptyCart = document.createElement('div');
    this.message = document.createElement('h2');
    this.init();
    this.append();
  }

  init() {
    this.message.textContent = 'Cart in empty';
    this.emptyCart.classList.add('empty-page');
  }

  append() {
    this.emptyCart.append(this.message);
  }
}
