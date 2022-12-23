import { TProduct } from '../../../../globalType';
import Controller from '../../../controller/controller';

export default class ProductCard {
  productData: TProduct;

  product: HTMLElement;

  img: HTMLImageElement;

  title: HTMLElement;

  price: HTMLElement;

  rating: HTMLElement;

  buttons: HTMLElement;

  buttonCart: HTMLButtonElement;

  buttonDetails: HTMLButtonElement;

  constructor(product: TProduct) {
    this.productData = product;
    this.product = document.createElement('article');
    this.img = document.createElement('img');
    this.title = document.createElement('h3');
    this.price = document.createElement('h3');
    this.rating = document.createElement('h4');
    this.buttons = document.createElement('div');
    this.buttonCart = document.createElement('button');
    this.buttonDetails = document.createElement('button');

    this.init();
    this.append();
  }

  public init() {
    this.product.classList.add('product');

    this.img.classList.add('product__img');
    Controller.getImage(this.productData.images[0], this.img);
    this.img.setAttribute('alt', this.productData.title);

    this.title.classList.add('product__title');
    this.title.textContent = this.productData.title;

    this.price.classList.add('product__price');
    this.price.textContent = `$${this.productData.price}`;

    this.rating.classList.add('product__rating');
    this.rating.textContent = `Rating ${this.productData.rating}/5`;
    this.buttons.classList.add('wrapper__buttons');

    this.buttonCart.classList.add('button', 'product__button-cart');
    this.buttonCart.setAttribute('data-id', String(this.productData.id));
    this.buttonCart.setAttribute('data-type', 'cart');
    this.buttonCart.textContent = `Add To Cart`;

    this.buttonDetails.classList.add('button', 'product__button-details');
    this.buttonDetails.setAttribute('data-id', String(this.productData.id));
    this.buttonDetails.setAttribute('data-type', 'product');
    this.buttonDetails.textContent = `View Details`;
  }

  public append() {
    this.rating.append(this.createReating());
    this.buttons.append(this.buttonCart, this.buttonDetails);
    this.product.append(this.img, this.title, this.price, this.rating, this.buttons);
  }

  createReating() {
    const ratingBody = document.createElement('div');
    ratingBody.classList.add('rating_body');
    const ratingBack = document.createElement('div');
    ratingBack.classList.add('rating_back');
    ratingBack.style.width = `${this.productData.rating * 20}%`;
    ratingBody.append(ratingBack);
    return ratingBody;
  }
}
