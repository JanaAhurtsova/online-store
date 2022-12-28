import { TProduct } from '../../../../globalType';
import ProductInfo from '../../productInfo/productInfo';

export default class ProductCard {
  productView: HTMLElement;

  buttonCart: HTMLButtonElement;

  buttonDetails: HTMLButtonElement;

  product: ProductInfo;

  buttons: HTMLDivElement;

  id: number;

  constructor() {
    this.id = 0;
    this.productView = document.createElement('article');
    this.product = new ProductInfo();
    this.buttons = document.createElement('div');
    this.buttonCart = document.createElement('button');
    this.buttonDetails = document.createElement('button');

    this.init();
    this.append();
  }

  public init() {
    this.productView.classList.add('product-card');

    this.buttons.classList.add('wrapper__buttons');

    this.buttonCart.classList.add('button', 'product__button-cart');
    this.buttonCart.setAttribute('data-type', 'cart');
    this.buttonCart.textContent = `Add To Cart`;

    this.buttonDetails.classList.add('button', 'product__button-details');
    this.buttonDetails.setAttribute('data-type', 'product');
    this.buttonDetails.textContent = `View Details`;
  }

  public append() {
    this.buttons.append(this.buttonCart, this.buttonDetails);
    this.productView.append(this.product.productView, this.buttons);
  }

  initProductCard(productData: TProduct) {
    this.id = productData.id;
    this.buttonCart.setAttribute('data-id', String(productData.id));
    this.buttonDetails.setAttribute('data-id', String(productData.id));
    this.product.initProductInfo(productData);
  }
}
