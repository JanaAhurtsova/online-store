import { TProduct, TShopingCart } from '../../globalType';
import Header from './header/header';
import Store from './store/store';
import ProductPage from './productPage/productPage';
import products from '../data/products';

export default class View {
  header: Header;

  body: HTMLElement;

  main: HTMLElement;

  store: Store;

  productPage: ProductPage;

  constructor() {
    this.body = document.body;
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.store = new Store();
    this.productPage = new ProductPage();
    this.append();
  }

  append() {
    this.main.append(this.store.store);
    this.body.insertBefore(this.header.header, this.main);
  }

  reloadProducts(data: TProduct[] | string) {
    if (Array.isArray(data)) {
      this.store.createProducts(data);
    } else {
      this.productPage.init(products[Number(data) - 1]);
      this.main.replaceChild(this.productPage.container, this.store.store);
    }
  }

  clickProduct(cartInfo: TShopingCart | string) {
    if (typeof cartInfo !== 'string') {
      this.productPage.shopCartInfo(cartInfo);
      this.store.shopCartInfo(cartInfo);
      this.header.changePrice(cartInfo);
    }
  }
}
