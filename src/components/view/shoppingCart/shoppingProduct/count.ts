import { TProduct, TProductInfo } from '../../../../globalType';

export default class Count {
  public countContainer: HTMLElement;

  public increase: HTMLElement;

  public count: HTMLElement;

  public decrease: HTMLElement;

  public readonly stock: HTMLElement;

  public readonly price: HTMLElement;

  private countWrapper: HTMLElement;

  constructor() {
    this.countWrapper = this.createDomNode('div', 'shop-count__wrapper');
    this.countContainer = this.createDomNode('div', 'shop-count');
    this.increase = this.createDomNode('div', 'increase', 'shop-count__increase');
    this.count = this.createDomNode('span', 'shop-count__count');
    this.decrease = this.createDomNode('div', 'decrease', 'shop-count__decrease');
    this.stock = document.createElement('span');
    this.price = document.createElement('span');
    this.append();
  }

  private append() {
    this.countWrapper.append(this.increase, this.count, this.decrease);
    this.countContainer.append(this.stock, this.countWrapper, this.price);
  }

  public initCount(productInfo: TProductInfo, product: TProduct) {
    this.count.innerHTML = `${productInfo.count}`;
    this.countWrapper.setAttribute('data-id', `${product.id}`);
    this.stock.innerHTML = `Stock : ${product.stock}`;
    this.price.innerHTML = `$ ${(productInfo.count * product.price).toFixed(2)}`;
  }

  private createDomNode(element: string, ...classes: string[]) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }
}
