import { TProduct, TShoppingCart } from '../../../globalType';
import ProductInfo from '../productInfo/productInfo';

export default class ProductPage {
  container: HTMLElement;

  productPath: HTMLHeadingElement;

  productWrapper: HTMLElement;

  descriptionWrapper: HTMLElement;

  imagesWrapper: HTMLElement;

  images: HTMLElement;

  productCategory: HTMLElement;

  buttons: HTMLElement;

  productStock: HTMLElement;

  buttonBuy: HTMLButtonElement;

  buttonCart: HTMLButtonElement;

  productInfo: ProductInfo;

  mainImage: HTMLImageElement;

  id: number;

  constructor() {
    this.id = 0;
    this.productInfo = new ProductInfo();
    this.mainImage = this.productInfo.img;
    this.container = document.createElement('section');
    this.productPath = document.createElement('h4');
    this.productWrapper = document.createElement('div');
    this.descriptionWrapper = document.createElement('div');
    this.imagesWrapper = document.createElement('div');
    this.images = document.createElement('div');
    this.productCategory = document.createElement('h4');
    this.buttons = document.createElement('div');
    this.buttonCart = document.createElement('button');
    this.buttonBuy = document.createElement('button');
    this.productStock = document.createElement('h4');
    this.init();
  }

  private init() {
    this.container.classList.add('product__page');

    this.productPath.classList.add('product__path');

    this.productWrapper.classList.add('wrapper__product');
    this.descriptionWrapper.classList.add('wrapper__description');

    this.productInfo.title.classList.add('title');

    this.productCategory.classList.add('category');

    this.productInfo.rating.rating.classList.add('wrapper__rating');

    this.productInfo.description.classList.add('product__description');

    this.buttons.classList.add('buttons');

    this.buttonBuy.classList.add('button');
    this.buttonBuy.textContent = `Buy Now`;

    this.buttonCart.classList.add('button');
    this.buttonCart.textContent = `Add To Cart`;

    this.productStock.classList.add('stock');

    this.mainImage.className = 'image__main';

    this.productInfo.price.classList.add('price');

    this.buttons.append(this.buttonCart, this.buttonBuy);
    this.descriptionWrapper.append(
      this.productCategory,
      this.productInfo.title,
      this.productInfo.rating.rating,
      this.productInfo.description,
      this.productInfo.price,
      this.buttons,
      this.productStock
    );
    this.productWrapper.append(this.descriptionWrapper);
    this.container.append(this.productPath, this.productWrapper);
  }

  openPage(product: TProduct, shoppingCart: TShoppingCart) {
    this.id = product.id;
    this.shopCartInfo(shoppingCart);
    this.productInfo.initProductInfo(product);
    this.imagesWrapper.innerHTML = '';
    this.mainImage.innerHTML = '';
    this.images.innerHTML = '';
    this.productPath.textContent = `STORE / ${product.category
      .toUpperCase()
      .replace(/_/g, ' ')} / ${product.type.toUpperCase()} / ${product.title.toUpperCase()}`;
    this.productCategory.textContent = `Category: ${product.category.replace(/_/g, ' ')} / ${product.type}`;
    this.productStock.textContent = `Stock: ${product.stock}`;
    this.buttonBuy.setAttribute('data-type', 'buy');
    this.buttonBuy.setAttribute('data-id', String(product.id));
    this.buttonCart.setAttribute('data-type', 'cart');
    this.buttonCart.setAttribute('data-id', String(product.id));
    this.imagesWrapper.append(this.mainImage, this.images);
    this.productWrapper.insertBefore(this.createImages(product), this.descriptionWrapper);
  }

  private createImages(product: TProduct) {
    this.imagesWrapper.classList.add('wrapper__images');
    this.images.classList.add('images');
    for (let i = 0; i < product.images.length; i += 1) {
      const image = document.createElement('img');
      image.classList.add('image');
      image.setAttribute('src', product.images[i]);
      image.setAttribute('alt', product.title);
      this.images.append(image);
    }
    return this.imagesWrapper;
  }

  shopCartInfo(data: TShoppingCart) {
    const find = data.info.find((item) => item.product === this.id);
    if (find) {
      this.buttonCart.textContent = 'drop from cart';
      this.buttonCart.classList.add('selected');
    } else {
      this.buttonCart.textContent = 'add to cart';
      this.buttonCart.classList.remove('selected');
    }
  }
}
