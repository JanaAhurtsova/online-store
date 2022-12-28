export default class ProductPage {
  productPage: HTMLDivElement;

  title: HTMLSpanElement;

  numberPages: HTMLDivElement;

  numberPagesText: HTMLSpanElement;

  numberPagesInput: HTMLInputElement;

  switcher: HTMLDivElement;

  switcherText: HTMLSpanElement;

  switcherLeftArrow: HTMLDivElement;

  switcherRightArrow: HTMLDivElement;

  switcherTitle: HTMLSpanElement;

  constructor() {
    this.productPage = document.createElement('div');
    this.title = document.createElement('span');
    this.numberPages = document.createElement('div');
    this.numberPagesText = document.createElement('span');
    this.numberPagesInput = document.createElement('input');
    this.switcher = document.createElement('div');
    this.switcherTitle = document.createElement('span');
    this.switcherLeftArrow = document.createElement('div');
    this.switcherText = document.createElement('span');
    this.switcherRightArrow = document.createElement('div');
    this.init();
    this.append();
  }

  init() {
    this.title.textContent = 'Products in cart';
    this.numberPagesText.textContent = 'Items';
    this.numberPagesInput.classList.add('search__input');
    this.numberPagesInput.setAttribute('placeholder', '-');
    this.switcherTitle.textContent = 'Page';
    this.switcherText.textContent = '1/1';
    this.productPage.classList.add('pages');
    this.switcher.classList.add('pages__switcher');
    this.switcherText.classList.add('pages__switcher__text');
    this.switcherLeftArrow.classList.add('arrow-left');
    this.switcherRightArrow.classList.add('arrow-right');
  }

  append() {
    this.numberPages.append(this.numberPagesText, this.numberPagesInput);
    this.switcher.append(this.switcherTitle, this.switcherLeftArrow, this.switcherText, this.switcherRightArrow);
    this.productPage.append(this.title, this.numberPages, this.switcher);
  }
}
