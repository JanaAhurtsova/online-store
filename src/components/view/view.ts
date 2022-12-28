import { TReloadPage, TShoppingCart } from '../../globalType';
import Header from './header/header';
import Store from './store/store';
import ProductPage from './productPage/productPage';
import products from '../data/products';
import ModalPayment from './cart/modal';

export default class View {
  header: Header;

  body: HTMLElement;

  main: HTMLElement;

  store: Store;

  productPage: ProductPage;

  modal: ModalPayment;

  constructor() {
    this.body = document.body;
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.store = new Store();
    this.productPage = new ProductPage();
    this.modal = new ModalPayment();
    this.append();
  }

  append() {
    this.body.insertBefore(this.header.header, this.main);
    this.main.append(this.store.store);
  }

  reloadPage(data: TReloadPage | string) {
    if (typeof data !== 'string') {
      if (this.main.children[0] === this.productPage.container) {
        this.main.replaceChild(this.store.store, this.productPage.container);
      }
      this.store.found.innerHTML = `Found ${data.products.length}`;
      this.store.search.reloadPage(data.query);
      this.store.sideBar.priceFilter.reloadPage(data);
      this.store.sideBar.stockFilter.reloadPage(data);
      this.store.sorter.reloadPage(data.query);
      this.store.sideBar.changeSelectedCategory(data);
      this.store.createProducts(data.products);
    } else {
      this.productPage.openPage(products[Number(data) - 1]);
      this.main.replaceChild(this.productPage.container, this.store.store);
      this.productPage.buttonCart.textContent = this.store.productsData[Number(data) - 1].buttonCart.textContent;
    }
  }

  clickProduct(cartInfo: TShoppingCart | string) {
    if (typeof cartInfo !== 'string') {
      this.productPage.shopCartInfo(cartInfo);
      this.store.shopCartInfo(cartInfo);
      this.header.changePrice(cartInfo);
    }
  }

  openModal() {
    this.body.append(this.modal.overlay);
    console.log(this.modal.overlay);
  }
}
