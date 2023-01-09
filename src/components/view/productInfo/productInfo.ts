import { TProduct } from '../../../globalType';
import Rating from './rating';

export default class ProductInfo {
  public img: HTMLImageElement;

  public readonly title: HTMLHeadingElement;

  public readonly price: HTMLElement;

  public readonly rating: Rating;

  public productView: HTMLElement;

  public description: HTMLElement;

  constructor() {
    this.productView = this.createDomNode('div', 'product');
    this.img = this.createDomNode('img', 'image__main') as HTMLImageElement;
    this.title = this.createDomNode('h3', 'product__title', 'title') as HTMLHeadingElement;
    this.description = this.createDomNode('p', 'product__description');
    this.price = this.createDomNode('span', 'product__price', 'price');
    this.rating = new Rating();
    this.append();
  }

  private append() {
    this.productView.append(this.img, this.title, this.description, this.price, this.rating.rating);
  }

  public initProductInfo(productData: TProduct) {
    this.img.setAttribute('src', productData.urlImg);
    this.img.setAttribute('alt', productData.title);
    this.title.textContent = productData.title;
    this.price.textContent = `$${productData.price}`;
    this.description.textContent = productData.description;
    this.rating.initRating(productData);
  }

  private createDomNode(element: string, ...classes: string[]) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }
}
