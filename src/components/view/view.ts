import { TProduct, TShopingCart } from '../../globalType';
import Header from './heared/header';
import Store from './store/store';

export default class View {
  header: Header;

  main: HTMLElement;

  store: Store;

  constructor() {
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.store = new Store();
    this.append();
  }

  append() {
    this.main.append(this.header.header);
    this.main.append(this.store.store);
  }

  reloadProducts(data: TProduct[] | string) {
    if (Array.isArray(data)) {
      this.store.createProducts(data);
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
