import { TProduct, TProductInfo } from '../../../../globalType';

export default class Count {
  countContainer: HTMLDivElement;

  increase: HTMLDivElement;

  count: HTMLSpanElement;

  decrease: HTMLDivElement;

  stock: HTMLSpanElement;

  price: HTMLSpanElement;

  countWrapper: HTMLDivElement;

  constructor() {
    this.countWrapper = document.createElement('div');
    this.countContainer = document.createElement('div');
    this.increase = document.createElement('div');
    this.count = document.createElement('span');
    this.decrease = document.createElement('div');
    this.stock = document.createElement('span');
    this.price = document.createElement('span');
    this.init();
    this.append();
  }

  init() {
    this.countContainer.classList.add('shop-count');
    this.increase.classList.add('shop-count__increase');
    this.increase.classList.add('increase');
    this.decrease.classList.add('shop-count__decrease');
    this.decrease.classList.add('decrease');
    this.count.classList.add('shop-count__count');
    this.countWrapper.classList.add('shop-count__wrapper');
  }

  append() {
    this.countWrapper.append(this.increase, this.count, this.decrease);
    this.countContainer.append(this.stock, this.countWrapper, this.price);
  }

  initCount(productInfo: TProductInfo, product: TProduct) {
    this.count.innerHTML = `${productInfo.count}`;
    this.countWrapper.setAttribute('data-id', `${product.id}`);
    this.stock.innerHTML = `Stock : ${product.stock}`;
    this.price.innerHTML = `$ ${(productInfo.count * product.price).toFixed(2)}`;
  }
}
