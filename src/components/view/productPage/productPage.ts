import { TProduct, TShopingCart } from '../../../globalType';
import Controller from '../../controller/controller';
import ProductCard from '../store/productCard/productCard';

export default class ProductPage {
  container: HTMLElement;

  productPath: HTMLHeadingElement;

  productWrapper: HTMLElement;

  descriptionWrapper: HTMLElement;

  imagesWrapper: HTMLElement;

  images: HTMLElement;

  productCategory: HTMLElement;

  ratingWrapper: HTMLElement;

  productDescription: HTMLElement;

  buttons: HTMLElement;

  productStock: HTMLElement;

  buttonBuy: HTMLButtonElement;

  controller: Controller;

  buttonCart: HTMLButtonElement;

  id: number;

  constructor() {
    this.id = 0;
    this.container = document.createElement('section');
    this.productPath = document.createElement('h4');
    this.productWrapper = document.createElement('div');
    this.descriptionWrapper = document.createElement('div');
    this.imagesWrapper = document.createElement('div');
    this.images = document.createElement('div');
    this.productCategory = document.createElement('h4');
    this.ratingWrapper = document.createElement('div');
    this.productDescription = document.createElement('p');
    this.buttons = document.createElement('div');
    this.buttonCart = document.createElement('button');
    this.buttonBuy = document.createElement('button');
    this.productStock = document.createElement('h4');
    this.controller = new Controller();
  }

  public init(product: TProduct) {
    this.id = product.id;
    const productCard = new ProductCard(product);
    const mainImage = productCard.img;
    const { title } = productCard;
    const ratingBody = productCard.createRating();
    const { rating } = productCard;
    const { price } = productCard;

    this.container.classList.add('product__page');

    this.productPath.classList.add('product__path');
    this.productPath.textContent = `STORE / ${product.category
      .toUpperCase()
      .replace(/_/g, ' ')} / ${product.type.toUpperCase()} / ${product.title.toUpperCase()}`;

    this.productWrapper.classList.add('wrapper__product');
    this.descriptionWrapper.classList.add('wrapper__description');

    this.productCategory.classList.add('category');
    this.productCategory.textContent = `Category: ${product.category.replace(/_/g, ' ')} / ${product.type}`;

    title.classList.add('title');
    title.textContent = product.title.toUpperCase();

    this.ratingWrapper.classList.add('wrapper__rating');
    rating.classList.add('rating');
    rating.textContent = String(product.rating);

    this.productDescription.classList.add('product__description');
    this.productDescription.textContent = product.description;

    price.classList.add('price', 'product__price');
    price.textContent = `$${product.price}`;

    this.buttons.classList.add('buttons');

    this.buttonBuy.classList.add('button');
    this.buttonBuy.setAttribute('data-id', String(product.id));
    this.buttonBuy.textContent = `Buy Now`;

    this.buttonCart.classList.add('button');
    this.buttonCart.setAttribute('data-id', String(product.id));
    this.buttonCart.setAttribute('data-type', 'cart');
    this.buttonCart.textContent = `Add To Cart`;

    this.productStock.classList.add('stock');
    this.productStock.textContent = `Stock: ${product.stock}`;

    mainImage.className = 'image__main';
    this.imagesWrapper.append(mainImage, this.images);

    this.ratingWrapper.append(ratingBody, rating);
    this.buttons.append(this.buttonCart, this.buttonBuy);
    this.descriptionWrapper.append(
      this.productCategory,
      title,
      this.ratingWrapper,
      this.productDescription,
      price,
      this.buttons,
      this.productStock
    );
    this.productWrapper.append(this.createImages(product), this.descriptionWrapper);
    this.container.append(this.productPath, this.productWrapper);

    // this.append(product);
    this.bindEvent(mainImage);
  }

  private createImages(product: TProduct) {
    this.imagesWrapper.classList.add('wrapper__images');
    this.images.classList.add('images');
    for (let i = 0; i < product.images.length; i += 1) {
      const image = document.createElement('img');
      image.classList.add('image');
      Controller.getImage(product.images[i], image);
      image.setAttribute('alt', product.title);
      this.images.append(image);
    }

    return this.imagesWrapper;
  }

  // public append(product: TProduct) {
  //   this.ratingWrapper.append(this.ratingBody, this.rating);
  //   this.buttons.append(this.buttonCart, this.buttonBuy);
  //   this.descriptionWrapper.append(
  //     this.productCategory,
  //     this.title,
  //     this.ratingWrapper,
  //     this.productDescription,
  //     this.price,
  //     this.buttons,
  //     this.productStock
  //   );
  //   this.productWrapper.append(this.createImages(), this.descriptionWrapper);
  //   this.container.append(this.productPath, this.productWrapper);
  //   document.querySelector('.root')?.append(this.container);
  // }

  bindEvent(mainImage: HTMLImageElement) {
    this.images.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) {
        const imageLink = target.getAttribute('src') as string;
        Controller.getImage(imageLink, mainImage);
      }
    });
  }

  shopCartInfo(data: TShopingCart) {
    if (data.products.includes(this.id)) {
      this.buttonCart.textContent = 'remove from cart';
      this.buttonCart.classList.add('selected');
    } else {
      this.buttonCart.textContent = 'add to cart';
      this.buttonCart.classList.remove('selected');
    }
  }
}
