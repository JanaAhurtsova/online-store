import { TProduct, TShoppingCart } from '../../../globalType';
import ProductInfo from '../productInfo/productInfo';

export default class ProductPage {
  public container: HTMLElement;

  private productPath: HTMLHeadingElement;

  private productWrapper: HTMLElement;

  private descriptionWrapper: HTMLElement;

  private imagesWrapper: HTMLElement;

  public images: HTMLElement;

  private productCategory: HTMLHeadingElement;

  public buttons: HTMLElement;

  public productStock: HTMLElement;

  public buttonBuy: HTMLButtonElement;

  public buttonCart: HTMLButtonElement;

  public readonly productInfo: ProductInfo;

  public mainImage: HTMLImageElement;

  public id: number;

  constructor() {
    this.id = 0;
    this.productInfo = new ProductInfo();
    this.mainImage = this.productInfo.img;
    this.container = this.createDomNode('section', 'product__page');
    this.productPath = this.createDomNode('h4', 'product__path') as HTMLHeadingElement;
    this.productWrapper = this.createDomNode('div', 'wrapper__product');
    this.descriptionWrapper = this.createDomNode('div', 'wrapper__description');
    this.imagesWrapper = this.createDomNode('div', 'wrapper__images');
    this.images = this.createDomNode('div', 'images');
    this.productCategory = this.createDomNode('h4', 'category') as HTMLHeadingElement;
    this.buttons = this.createDomNode('div', 'buttons');
    this.buttonCart = this.createDomNode('button', 'button', 'Add To Cart') as HTMLButtonElement;
    this.buttonBuy = this.createDomNode('button', 'button', 'Buy Now') as HTMLButtonElement;
    this.productStock = this.createDomNode('h4', 'stock');
    this.append();
  }

  private append() {
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

  public openPage(product: TProduct, shoppingCart: TShoppingCart) {
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
    for (let i = 0; i < product.images.length; i += 1) {
      const image = this.createDomNode('img', 'image') as HTMLImageElement;
      image.setAttribute('src', product.images[i]);
      image.setAttribute('alt', product.title);
      this.images.append(image);
    }
    return this.imagesWrapper;
  }

  public shopCartInfo(data: TShoppingCart) {
    const find = data.info.find((item) => item.product === this.id);
    if (find) {
      this.buttonCart.textContent = 'drop from cart';
      this.buttonCart.classList.add('selected');
    } else {
      this.buttonCart.textContent = 'add to cart';
      this.buttonCart.classList.remove('selected');
    }
  }

  private createDomNode(element: string, classElement: string, text?: string) {
    const node = document.createElement(element);
    node.classList.add(classElement);
    if (text) {
      node.textContent = text;
    }
    return node;
  }
}
