import { TProduct, TShoppingCart } from '../../../globalType';
import products from '../../data/products';
import EmptyCart from './emptyCart/emptyCart';
import ProductPage from './shoppingProduct/productsPage';
import ShoppingProduct from './shoppingProduct/shoppingProduct';
import Summary from './summary/summary';

export default class ShoppingCart {
  shopCart: HTMLElement;

  products: HTMLDivElement;

  summary: Summary;

  productItems: HTMLDivElement;

  productsInfo: ShoppingProduct[];

  emptyCart: EmptyCart;

  dataView: HTMLDivElement;

  productsPage: ProductPage;

  constructor() {
    this.shopCart = document.createElement('section');
    this.products = document.createElement('div');
    this.productsPage = new ProductPage();
    this.productItems = document.createElement('div');
    this.summary = new Summary();
    this.emptyCart = new EmptyCart();
    this.dataView = document.createElement('div');
    this.productsInfo = [];
    this.init();
    this.append();
  }

  init() {
    this.dataView.classList.add('shop-cart');
    this.products.classList.add('shop-cart__products');
    this.summary.summary.classList.add('shop-cart__summary');
    this.productItems.classList.add('shop-cart__products__items');
  }

  append() {
    this.dataView.append(this.products);
    this.dataView.append(this.summary.summary);
    this.products.append(this.productsPage.productPage);
    this.products.append(this.productItems);
    this.shopCart.append(this.emptyCart.emptyCart);
    this.shopCart.append(this.dataView);
  }

  initShoppingCart(data: TShoppingCart) {
    this.emptyCart.emptyCart.classList.add('invisible');
    this.dataView.classList.remove('invisible');
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
      this.emptyCart.emptyCart.classList.remove('invisible');
      this.dataView.classList.add('invisible');
    }
  }
}
