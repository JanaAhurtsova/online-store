import { TProduct, TShoppingCart } from '../../../globalType';
import products from '../../data/products';
import ShoppingProduct from './shoppingProduct/shoppingProduct';
import Summary from './summary/summary';

export default class ShoppingCart {
  shopCart: HTMLElement;

  products: HTMLDivElement;

  summary: Summary;

  productsPage: HTMLDivElement;

  productItems: HTMLDivElement;

  productsInfo: ShoppingProduct[];

  constructor() {
    this.shopCart = document.createElement('section');
    this.products = document.createElement('div');
    this.productsPage = document.createElement('div');
    this.productItems = document.createElement('div');
    this.summary = new Summary();
    this.productsInfo = [];
    this.init();
    this.append();
  }

  init() {
    this.shopCart.classList.add('shop-cart');
    this.products.classList.add('shop-cart__products');
    this.summary.summary.classList.add('shop-cart__summary');
    this.productItems.classList.add('shop-cart__products__items');
  }

  append() {
    this.shopCart.append(this.products);
    this.shopCart.append(this.summary.summary);
    this.products.append(this.productsPage);
    this.products.append(this.productItems);
  }

  initShoppingCart(data: TShoppingCart) {
    this.productItems.innerHTML = '';
    if (data.info.length !== 0) {
      data.info.forEach((item) => {
        const product = products.find((prod) => prod.id === item.product) as TProduct;
        const productItem = new ShoppingProduct();
        this.productsInfo.push(productItem);
        productItem.initShoppingProduct(product, item);
        this.productItems.append(productItem.product);
      });
      this.summary.initSummary(data);
    } else {
      console.log('no products');
    }
  }
}
