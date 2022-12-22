import { TShopingCart } from '../../../globalType';

export default class Header {
  header: HTMLElement;

  wrapper: HTMLDivElement;

  logo: HTMLAnchorElement;

  logoImg: HTMLDivElement;

  wrapperSum: HTMLDivElement;

  sum: HTMLHeadingElement;

  cart: HTMLDivElement;

  count: HTMLDivElement;

  countText: HTMLHeadingElement;

  constructor() {
    this.header = document.createElement('header');
    this.wrapper = document.createElement('div');
    this.logo = document.createElement('a');
    this.logoImg = document.createElement('div');
    this.wrapperSum = document.createElement('div');
    this.sum = document.createElement('h2');
    this.cart = document.createElement('div');
    this.count = document.createElement('div');
    this.countText = document.createElement('h4');
    this.init();
    this.append();
  }

  init() {
    this.header.classList.add('header');
    this.wrapper.classList.add('wrapper');
    this.wrapper.classList.add('wrapper__header');
    this.logo.classList.add('logo');
    this.logoImg.classList.add('logo__img');
    this.wrapperSum.classList.add('wrapper__sum');
    this.sum.textContent = `$0.00`;
    this.sum.classList.add('sum');
    this.cart.classList.add('cart');
    this.count.classList.add('count');
    this.countText.textContent = '0';
    this.countText.classList.add('count__text');
  }

  append() {
    this.header.append(this.wrapper);
    this.wrapper.append(this.logo);
    this.logo.append(this.logoImg);
    this.wrapper.append(this.wrapperSum);
    this.wrapperSum.append(this.sum);
    this.wrapperSum.append(this.cart);
    this.cart.append(this.count);
    this.count.append(this.countText);
  }

  changePrice(cartInfo: TShopingCart) {
    this.sum.textContent = Number.isInteger(cartInfo.price) ? `$${cartInfo.price}.00` : `$${cartInfo.price}`;
    this.countText.textContent = `${cartInfo.products.length}`;
  }
}
