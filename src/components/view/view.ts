import { TReloadPage, TShoppingCart } from '../../globalType';
import Header from './header/header';
import Store from './store/store';
import ProductPage from './productPage/productPage';
import products from '../data/products';
import ShoppingCart from './shoppingCart/shoppingCart';

export default class View {
  header: Header;

  body: HTMLElement;

  main: HTMLElement;

  storePage: Store;

  productPage: ProductPage;

  shoppingCartPage: ShoppingCart;

  constructor() {
    this.body = document.body;
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.storePage = new Store();
    this.productPage = new ProductPage();
    this.shoppingCartPage = new ShoppingCart();
    this.append();
  }

  append() {
    this.body.insertBefore(this.header.header, this.main);
    this.main.append(this.storePage.store);
  }

  getLocalStorageDate() {
    let shoppingCart: TShoppingCart = { price: 0, info: [{ count: 0, product: 0 }] };
    const localStorageInfo = localStorage.getItem('prod');
    if (localStorageInfo) {
      shoppingCart = JSON.parse(localStorageInfo);
    }
    return shoppingCart;
  }

  reloadPage(data: TReloadPage | string) {
    const localStorage = this.getLocalStorageDate();
    if (typeof data === 'string') {
      this.openProductPage(data, localStorage);
    } else if (data.query.length === 0 || data.query[0].type !== 'cart') {
      this.main.replaceChild(this.storePage.store, this.main.children[0]);
      this.openShopPage(data, localStorage);
    } else {
      this.openShoppingCartPage(localStorage, data);
    }
    this.header.changePrice(localStorage);
  }

  openShoppingCartPage(localStorage: TShoppingCart, data: TReloadPage) {
    this.main.replaceChild(this.shoppingCartPage.shopCart, this.main.children[0]);
    this.shoppingCartPage.initShoppingCart(localStorage, data);
  }

  openProductPage(data: string, localStorage: TShoppingCart) {
    this.productPage.openPage(products[Number(data) - 1], localStorage);
    this.main.replaceChild(this.productPage.container, this.main.children[0]);
  }

  openShopPage(data: TReloadPage, localStorage: TShoppingCart) {
    this.storePage.found.innerHTML = `Found ${data.products.length}`;
    this.storePage.search.reloadPage(data.query);
    this.storePage.sideBar.priceFilter.reloadPage(data);
    this.storePage.sideBar.stockFilter.reloadPage(data);
    this.storePage.sorter.reloadPage(data.query);
    this.storePage.sideBar.changeSelectedCategory(data);
    this.storePage.createProducts(localStorage, data.products);
  }

  clickProduct(cartInfo: TShoppingCart | string) {
    if (typeof cartInfo !== 'string') {
      this.productPage.shopCartInfo(cartInfo);
      this.storePage.shopCartInfo(cartInfo);
      this.header.changePrice(cartInfo);
    }
  }
}
