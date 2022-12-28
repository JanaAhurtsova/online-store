import { TProduct } from '../../../globalType';
import Rating from './rating';

export default class ProductInfo {
  img: HTMLImageElement;

  title: HTMLHeadingElement;

  price: HTMLSpanElement;

  rating: Rating;

  productView: HTMLDivElement;

  description: HTMLDivElement;

  constructor() {
    this.productView = document.createElement('div');
    this.img = document.createElement('img');
    this.title = document.createElement('h3');
    this.description = document.createElement('p');
    this.price = document.createElement('span');
    this.rating = new Rating();
    this.init();
    this.append();
  }

  init() {
    this.productView.classList.add('product');
    this.img.classList.add('product__img');
    this.title.classList.add('product__title');
    this.price.classList.add('product__price');
    this.description.classList.add('product__description');
  }

  append() {
    this.productView.append(this.img, this.title, this.description, this.price, this.rating.rating);
  }

  initProductInfo(productData: TProduct) {
    this.img.setAttribute('src', productData.urlImg);
    this.img.setAttribute('alt', productData.title);
    this.title.textContent = productData.title;
    this.price.textContent = `$${productData.price}`;
    this.description.textContent = productData.description;
    this.rating.initRating(productData);
  }
}
