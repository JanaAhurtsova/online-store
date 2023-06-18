import { TShoppingCart } from '../../../globalType';

export default class Header {
  public header: HTMLElement;

  private wrapper: HTMLElement;

  public logo: HTMLElement;

  private logoImg: HTMLElement;

  public shoppingCart: HTMLElement;

  public sum: HTMLElement;

  public cart: HTMLElement;

  public count: HTMLElement;

  public countText: HTMLElement;

  constructor() {
    this.header = this.createDomNode('header', 'header');
    this.wrapper = this.createDomNode('div', 'wrapper', 'wrapper__header');
    this.logo = this.createDomNode('a', 'logo');
    this.logoImg = this.createDomNode('div', 'logo__img');
    this.shoppingCart = this.createDomNode('div', 'wrapper__sum');
    this.sum = this.createDomNode('h2', 'sum');
    this.cart = this.createDomNode('div', 'cart');
    this.count = this.createDomNode('div', 'count');
    this.countText = this.createDomNode('h4', 'count__text');
    this.init();
    this.append();
  }

  private init() {
    this.sum.textContent = `$0.00`;
    this.countText.textContent = '0';
  }

  private append() {
    this.header.append(this.wrapper);
    this.wrapper.append(this.logo);
    this.logo.append(this.logoImg);
    this.wrapper.append(this.shoppingCart);
    this.shoppingCart.append(this.sum);
    this.shoppingCart.append(this.cart);
    this.cart.append(this.count);
    this.count.append(this.countText);
  }

  public changePrice(cartInfo: TShoppingCart) {
    this.sum.textContent = Number.isInteger(cartInfo.price) ? `$${cartInfo.price}.00` : `$${cartInfo.price}`;
    this.countText.textContent = `${cartInfo.info.reduce((acc, item) => acc + item.count, 0)}`;
  }

  private createDomNode(element: string, ...classes: string[]) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }
}
