import { TProduct } from '../../../globalType';
import Controller from '../../controller/controller';
import ProductCard from '../store/productCard/productCard';

export default class ProductPage {
  productData: TProduct;

  productCard: ProductCard;

  container: HTMLElement;

  productPath: HTMLHeadingElement;

  productWrapper: HTMLElement;

  descriptionWrapper: HTMLElement;

  imagesWrapper: HTMLElement;

  mainImage: HTMLImageElement;

  images: HTMLElement;

  productCategory: HTMLElement;

  title: HTMLElement;

  ratingWrapper: HTMLElement;

  ratingBody: HTMLElement;

  rating: HTMLElement;

  productDescription: HTMLElement;

  buttons: HTMLElement;

  price: HTMLElement;

  productStock: HTMLElement;

  buttonCart: HTMLButtonElement;

  buttonBuy: HTMLButtonElement;

  controller: Controller;

  constructor(product: TProduct) {
    this.productData = product;
    this.productCard = new ProductCard(this.productData);
    this.container = document.createElement('section');
    this.productPath = document.createElement('h4');
    this.productWrapper = document.createElement('div');
    this.descriptionWrapper = document.createElement('div');
    this.imagesWrapper = document.createElement('div');
    this.mainImage = this.productCard.img;
    this.images = document.createElement('div');
    this.productCategory = document.createElement('h4');
    this.title = this.productCard.title;
    this.ratingWrapper = document.createElement('div');
    this.ratingBody = this.productCard.createRating();
    this.rating = this.productCard.rating;
    this.productDescription = document.createElement('p');
    this.price = this.productCard.price;
    this.buttons = document.createElement('div');
    this.buttonCart = this.productCard.buttonCart;
    this.buttonBuy = document.createElement('button');
    this.productStock = document.createElement('h4');
    this.controller = new Controller();
  }

  public init() {
    this.container.classList.add('product__page');

    this.productPath.classList.add('product__path');
    this.productPath.textContent = `STORE / ${this.productData.category
      .toUpperCase()
      .replace(/_/g, ' ')} / ${this.productData.type.toUpperCase()} / ${this.productData.title.toUpperCase()}`;

    this.productWrapper.classList.add('wrapper__product');
    this.descriptionWrapper.classList.add('wrapper__description');

    this.productCategory.classList.add('category');
    this.productCategory.textContent = `Category: ${this.productData.category.replace(/_/g, ' ')} / ${
      this.productData.type
    }`;

    this.title.classList.add('title');
    this.title.textContent = this.productData.title.toUpperCase();

    this.ratingWrapper.classList.add('wrapper__rating');
    this.rating.classList.add('rating');
    this.rating.textContent = String(this.productData.rating);

    this.productDescription.classList.add('product__description');
    this.productDescription.textContent = this.productData.description;

    this.price.classList.add('price', 'product__price');
    this.price.textContent = `$${this.productData.price}`;

    this.buttons.classList.add('buttons');

    this.buttonBuy.classList.add('button');
    this.buttonBuy.setAttribute('data-id', String(this.productData.id));
    this.buttonBuy.textContent = `Buy Now`;

    this.productStock.classList.add('stock');
    this.productStock.textContent = `Stock: ${this.productData.stock}`;

    this.append();
    this.bindEvent();
  }

  private createImages() {
    this.imagesWrapper.classList.add('wrapper__images');
    this.mainImage.className = 'image__main';

    this.images.classList.add('images');

    for (let i = 0; i < this.productData.images.length; i += 1) {
      const image = document.createElement('img');
      image.classList.add('image');
      Controller.getImage(this.productData.images[i], image);
      image.setAttribute('alt', this.productData.title);
      this.images.append(image);
    }

    this.imagesWrapper.append(this.mainImage, this.images);

    return this.imagesWrapper;
  }

  public append() {
    this.ratingWrapper.append(this.ratingBody, this.rating);
    this.buttons.append(this.buttonCart, this.buttonBuy);
    this.descriptionWrapper.append(
      this.productCategory,
      this.title,
      this.ratingWrapper,
      this.productDescription,
      this.price,
      this.buttons,
      this.productStock
    );
    this.productWrapper.append(this.createImages(), this.descriptionWrapper);
    this.container.append(this.productPath, this.productWrapper);
    document.querySelector('.root')?.append(this.container);
  }

  bindEvent() {
    this.images.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) {
        const imageLink = target.getAttribute('src') as string;
        Controller.getImage(imageLink, this.mainImage);
      }
    });
  }
}
