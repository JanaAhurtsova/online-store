import { TProduct, TShoppingCart } from '../../../globalType';
import Controller from '../../controller/controller';
import products from '../../data/products';
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

  productCard: ProductCard;

  mainImage: HTMLImageElement;

  title: HTMLElement;

  ratingBody: HTMLDivElement;

  rating: HTMLElement;

  price: HTMLElement;

  constructor() {
    this.id = 0;
    this.productCard = new ProductCard(products[0]);
    this.mainImage = document.createElement('img');
    this.title = this.productCard.title;
    this.ratingBody = this.productCard.createRating();
    this.rating = this.productCard.rating;
    this.price = this.productCard.price;
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
    this.init();
  }

  public init() {
    this.container.classList.add('product__page');

    this.productPath.classList.add('product__path');

    this.productWrapper.classList.add('wrapper__product');
    this.descriptionWrapper.classList.add('wrapper__description');

    this.productCategory.classList.add('category');

    this.title.classList.add('title');

    this.ratingWrapper.classList.add('wrapper__rating');
    this.rating.classList.add('rating');

    this.productDescription.classList.add('product__description');

    this.price.classList.add('price', 'product__price');

    this.buttons.classList.add('buttons');

    this.buttonBuy.classList.add('button');
    this.buttonBuy.textContent = `Buy Now`;

    this.buttonCart.classList.add('button');
    this.buttonCart.textContent = `Add To Cart`;

    this.productStock.classList.add('stock');

    this.mainImage.className = 'image__main';

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
    this.productWrapper.append(this.descriptionWrapper);
    this.container.append(this.productPath, this.productWrapper);

    this.bindEvent(this.mainImage);
  }

  openPage(product: TProduct) {
    this.id = product.id;
    this.imagesWrapper.innerHTML = '';
    this.mainImage.innerHTML = '';
    this.images.innerHTML = '';
    this.productPath.textContent = `STORE / ${product.category
      .toUpperCase()
      .replace(/_/g, ' ')} / ${product.type.toUpperCase()} / ${product.title.toUpperCase()}`;
    this.productCategory.textContent = `Category: ${product.category.replace(/_/g, ' ')} / ${product.type}`;
    this.productDescription.textContent = product.description;
    this.productStock.textContent = `Stock: ${product.stock}`;
    this.title.textContent = product.title.toUpperCase();
    this.price.textContent = `$${product.price}`;
    this.rating.textContent = String(product.rating);
    this.buttonBuy.setAttribute('data-id', String(product.id));
    this.buttonCart.setAttribute('data-type', 'cart');
    this.buttonCart.setAttribute('data-id', String(product.id));
    this.imagesWrapper.append(this.mainImage, this.images);
    this.productWrapper.insertBefore(this.createImages(product), this.descriptionWrapper);
  }

  private createImages(product: TProduct) {
    this.imagesWrapper.classList.add('wrapper__images');
    this.images.classList.add('images');
    this.mainImage.setAttribute('src', product.urlImg);
    for (let i = 0; i < product.images.length; i += 1) {
      const image = document.createElement('img');
      image.classList.add('image');
      image.setAttribute('src', product.images[i]);
      image.setAttribute('alt', product.title);
      this.images.append(image);
    }
    return this.imagesWrapper;
  }

  bindEvent(mainImage: HTMLImageElement) {
    this.images.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) {
        const imageLink = target.getAttribute('src') as string;
        mainImage.setAttribute('src', imageLink);
      }
    });
  }

  shopCartInfo(data: TShoppingCart) {
    if (data.products.includes(this.id)) {
      this.buttonCart.textContent = 'drop from cart';
      this.buttonCart.classList.add('selected');
    } else {
      this.buttonCart.textContent = 'add to cart';
      this.buttonCart.classList.remove('selected');
    }
  }
}
