import { TReloadPage, TShopingCart } from '../../globalType';
import Header from './heared/header';
import Store from './store/store';

export default class View {
  header: Header;

  main: HTMLElement;

  store: Store;

  body: HTMLElement;

  constructor() {
    this.body = document.querySelector('body') as HTMLElement;
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.store = new Store();
    this.append();
  }

  append() {
    this.body.insertBefore(this.header.header, this.main);
    this.main.append(this.store.store);
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
      console.log(data);
    }
  }

  clickProduct(cartInfo: TShopingCart | string) {
    if (typeof cartInfo !== 'string') {
      this.store.shopCartInfo(cartInfo);
      this.header.changePrice(cartInfo);
    }
  }
}
