import { TProduct } from '../../../../globalType';
import ProductInfo from '../../productInfo/productInfo';

export default class ProductCard {
  public productView: HTMLElement;

  public buttonCart: HTMLButtonElement;

  public buttonDetails: HTMLButtonElement;

  public product: ProductInfo;

  private buttons: HTMLElement;

  public id: number;

  constructor() {
    this.id = 0;
    this.productView = this.createDomNode('article', 'product-card');
    this.product = new ProductInfo();
    this.buttons = this.createDomNode('div', 'wrapper__buttons');
    this.buttonCart = this.createDomNode('button', 'button', 'product__button-cart') as HTMLButtonElement;
    this.buttonDetails = this.createDomNode('button', 'button', 'product__button-details') as HTMLButtonElement;
    this.init();
    this.append();
  }

  private init() {
    this.buttonCart = this.buttonDescription(this.buttonCart, 'data-type', 'cart', `Add To Cart`);
    this.buttonDetails = this.buttonDescription(this.buttonDetails, 'data-type', 'product', `View Details`);
  }

  private append() {
    this.buttons.append(this.buttonCart, this.buttonDetails);
    this.productView.append(this.product.productView, this.buttons);
  }

  public initProductCard(productData: TProduct) {
    this.id = productData.id;
    this.buttonCart = this.buttonDescription(this.buttonCart, 'data-id', String(productData.id));
    this.buttonDetails = this.buttonDescription(this.buttonDetails, 'data-id', String(productData.id));
    this.product.initProductInfo(productData);
  }

  private createDomNode(element: string, ...classes: string[]) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  private buttonDescription(node: HTMLButtonElement, attribute: string, name: string, text?: string) {
    if (text) {
      node.textContent = text;
    }
    node.setAttribute(attribute, name);
    return node;
  }
}
