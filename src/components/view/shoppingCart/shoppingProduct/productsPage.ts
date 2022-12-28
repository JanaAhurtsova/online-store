export default class ProductPage {
  productPage: HTMLDivElement;

  title: HTMLSpanElement;

  numberPages: HTMLDivElement;

  numberPagesText: HTMLSpanElement;

  numberPagesInput: HTMLInputElement;

  constructor() {
    this.productPage = document.createElement('div');
    this.title = document.createElement('span');
    this.numberPages = document.createElement('div');
    this.numberPagesText = document.createElement('span');
    this.numberPagesInput = document.createElement('input');
  }

  init() {
    this.title.textContent = 'Products in cart';
    this.numberPagesText.textContent = 'Number of pages';
  }
}
