import { TData, IArticle } from '../../../types/index';

export default class Article implements IArticle {
  public readonly id: string;

  public readonly title: string;

  public readonly price: number;

  public readonly rating: number;

  public readonly urlImg: string;

  public article: HTMLElement;

  public img: HTMLElement;

  public prodTitle: HTMLElement;

  public prodPrice: HTMLElement;

  public prodRating: HTMLElement;

  public buttons: HTMLDivElement;

  public buttonCart: HTMLElement;

  public buttonDetails: HTMLElement;

  constructor({ id, title, price, rating, urlImg }: TData) {
    this.id = String(id);
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.urlImg = urlImg;
    this.article = document.createElement('article');
    this.img = document.createElement('img');
    this.prodTitle = document.createElement('h3');
    this.prodPrice = document.createElement('h3');
    this.prodRating = document.createElement('h4');
    this.buttons = document.createElement('div');
    this.buttonCart = document.createElement('button');
    this.buttonDetails = document.createElement('button');
  }

  public buildArticle() {
    this.article.classList.add('product');
    this.article.setAttribute('data-id', String(this.id));

    this.img.classList.add('product__img');
    this.img.setAttribute('src', this.urlImg);
    this.img.setAttribute('alt', this.title);

    this.prodTitle.classList.add('product__title');
    this.prodTitle.textContent = this.title;

    this.prodPrice.classList.add('product__price');
    this.prodPrice.textContent = `$${this.price}`;

    this.prodRating.classList.add('product__rating');
    this.prodRating.textContent = `Rating ${this.rating}/5`;

    this.buttons.classList.add('wrapper__buttons');

    this.buttonCart.classList.add('button', 'product__button-cart');
    this.buttonCart.textContent = `Add To Cart`;

    this.buttonDetails.classList.add('button', 'product__button-details');
    this.buttonDetails.textContent = `View Details`;

    this.appendArticleElements();

    this.drawArticle();
  }

  public appendArticleElements() {
    this.buttons.append(this.buttonCart, this.buttonDetails);
    this.article.append(
      this.img,
      this.prodTitle,
      this.prodPrice,
      this.prodRating,
      this.buttons
    );
  }

  public drawArticle() {
    document.querySelector('.wrapper__products')?.append(this.article);
  }
}
