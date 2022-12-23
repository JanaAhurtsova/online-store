import { TReloadPage, TShoppingCart } from '../../globalType';
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
    this.body.insertBefore(this.header.header, this.main);
    this.main.append(this.store.store);
    this.body.insertBefore(this.header.header, this.main);
  }

  reloadPage(data: TReloadPage | string) {
    if (typeof data !== 'string') {
      this.store.found.innerHTML = `Found ${data.products.length}`;
      this.store.search.reloadPage(data.query);
      this.store.sideBar.priceFilter.reloadPage(data);
      this.store.sideBar.stockFilter.reloadPage(data);
      this.store.sorter.reloadPage(data.query);
      this.store.sideBar.changeSelectedCategory(data);
      this.store.createProducts(data.products);
    } else {
      this.productPage.init(products[Number(data) - 1]);
      this.main.replaceChild(this.productPage.container, this.store.store);
    }
  }

  clickProduct(cartInfo: TShoppingCart | string) {
    if (typeof cartInfo !== 'string') {
      this.productPage.shopCartInfo(cartInfo);
      this.store.shopCartInfo(cartInfo);
      this.header.changePrice(cartInfo);
    }
  }
}
