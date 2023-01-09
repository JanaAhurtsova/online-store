import { TReloadPage, TShoppingCart, IView } from '../../globalType';
import Header from './header/header';
import Store from './store/store';
import ProductPage from './productPage/productPage';
import products from '../data/products';
import ShoppingCart from './shoppingCart/shoppingCart';
import ModalPayment from './shoppingCart/modal/modal';
import ErrorPage from './errorPage/error';

const noLogo: string = require('../../assets/svg/nologo.svg');

export default class View implements IView {
  public header: Header;

  private body: HTMLElement;

  private main: HTMLElement;

  public storePage: Store;

  public productPage: ProductPage;

  public shoppingCartPage: ShoppingCart;

  public modal: ModalPayment;

  private errorPage: ErrorPage;

  constructor() {
    this.body = document.body;
    this.main = document.querySelector('.root') as HTMLElement;
    this.header = new Header();
    this.storePage = new Store();
    this.productPage = new ProductPage();
    this.shoppingCartPage = new ShoppingCart();
    this.modal = new ModalPayment();
    this.errorPage = new ErrorPage();
    this.append();
  }

  private append() {
    this.body.insertBefore(this.header.header, this.main);
    this.main.append(this.storePage.store);
  }

  public getLocalStorageDate() {
    let shoppingCart: TShoppingCart = { price: 0, info: [] };
    const localStorageInfo = localStorage.getItem('prod');
    if (localStorageInfo) {
      shoppingCart = JSON.parse(localStorageInfo);
    }
    return shoppingCart;
  }

  public reloadPage(data: TReloadPage | string) {
    const localStorage = this.getLocalStorageDate();
    if (typeof data === 'string') {
      if (data === 'error') {
        this.showErrorPage();
      } else {
        this.openProductPage(data, localStorage);
      }
    } else if (data.query.length === 0 || data.query[0].type !== 'cart') {
      this.openShopPage(data, localStorage);
    } else {
      this.openShoppingCartPage(localStorage, data);
    }
    this.header.changePrice(localStorage);
  }

  private showErrorPage() {
    this.main.replaceChild(this.errorPage.error, this.main.children[0]);
  }

  public openShoppingCartPage(localStorage: TShoppingCart, data: TReloadPage) {
    if (this.shoppingCartPage.shopCart !== this.main.children[0]) {
      this.main.replaceChild(this.shoppingCartPage.shopCart, this.main.children[0]);
    }
    this.shoppingCartPage.initShoppingCart(localStorage, data);
  }

  public openProductPage(data: string, localStorage: TShoppingCart) {
    if (this.productPage.container !== this.main.children[0]) {
      this.main.replaceChild(this.productPage.container, this.main.children[0]);
    }
    this.productPage.openPage(products[Number(data) - 1], localStorage);
  }

  public openShopPage(data: TReloadPage, localStorage: TShoppingCart) {
    if (this.storePage.store !== this.main.children[0]) {
      this.main.replaceChild(this.storePage.store, this.main.children[0]);
    }
    const typeView = data.query.find((item) => item.type === 'view');
    const typeViewText = typeView ? typeView.name[0] : 'grid';
    this.storePage.found.innerHTML = `Found ${data.products.length}`;
    this.storePage.search.reloadPage(data.query);
    this.storePage.sideBar.priceFilter.reloadPage(data);
    this.storePage.sideBar.stockFilter.reloadPage(data);
    this.storePage.sorter.reloadPage(data.query);
    this.storePage.sideBar.changeSelectedCategory(data);
    this.storePage.createProducts(localStorage, typeViewText, data.products);
  }

  public openModal() {
    this.body.append(this.modal.overlay);
    this.removeErrors();
    this.removeInputs();
    this.modal.creditCard.paymentSystem.style.backgroundImage = `url(${noLogo})`;
  }

  private removeErrors() {
    const errors = this.modal.modal.querySelectorAll('.error');
    errors.forEach((error) => {
      error.innerHTML = '';
    });
  }

  private removeInputs() {
    const inputs = this.modal.modal.querySelectorAll('.input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.value = '';
    });
  }
}
