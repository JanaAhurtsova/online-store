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

  constructor() {
    this.body = document.body;
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.store = new Store();
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
      this.main.innerHTML = '';
      const productPage = new ProductPage(products[Number(data) - 1]);
      productPage.init();
    }
  }

  clickProduct(cartInfo: TShopingCart | string) {
    if (typeof cartInfo !== 'string') {
      this.store.shopCartInfo(cartInfo);
      this.header.changePrice(cartInfo);
    }
  }
}
