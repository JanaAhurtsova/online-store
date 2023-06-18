import { TProduct, TReloadPage, TShoppingCart } from '../../../globalType';
import products from '../../data/products';
import EmptyPage from '../emptyPage/emptyPage';
import ProductPage from './shoppingProduct/productsPage';
import ShoppingProduct from './shoppingProduct/shoppingProduct';
import Summary from './summary/summary';

export default class ShoppingCart {
  public shopCart: HTMLElement;

  private products: HTMLDivElement;

  public summary: Summary;

  public productItems: HTMLDivElement;

  public productsInfo: ShoppingProduct[];

  private emptyCart: EmptyPage;

  private dataView: HTMLDivElement;

  public productsPage: ProductPage;

  constructor() {
    this.shopCart = document.createElement('section');
    this.products = document.createElement('div');
    this.productsPage = new ProductPage();
    this.productItems = document.createElement('div');
    this.summary = new Summary();
    this.emptyCart = new EmptyPage('Cart is empty');
    this.dataView = document.createElement('div');
    this.productsInfo = [];
    this.init();
    this.append();
  }

  private init() {
    this.shopCart.classList.add('shopping-cart__page');
    this.dataView.classList.add('shop-cart');
    this.products.classList.add('shop-cart__products');
    this.productItems.classList.add('shop-cart__products__items');
  }

  private append() {
    this.dataView.append(this.products);
    this.dataView.append(this.summary.summary);
    this.products.append(this.productsPage.productPage);
    this.products.append(this.productItems);
    this.shopCart.append(this.emptyCart.emptyPage);
    this.shopCart.append(this.dataView);
  }

  public initShoppingCart(localStorage: TShoppingCart, data: TReloadPage) {
    this.emptyCart.emptyPage.classList.add('invisible');
    this.dataView.classList.remove('invisible');
    this.productItems.innerHTML = '';
    if (localStorage.info.length !== 0) {
      this.initProductPage(localStorage, data);
      this.summary.initSummary(localStorage);
    } else {
      this.emptyCart.emptyPage.classList.remove('invisible');
      this.dataView.classList.add('invisible');
    }
  }

  public initProductPage(localStorage: TShoppingCart, data: TReloadPage) {
    const limitQuery = data.query.find((item) => item.type === 'limit');
    const page = data.query.find((item) => item.type === 'page');
    let endIndex = localStorage.info.length;
    let pages = 1;
    let startIndex = 0;
    const pageValue = page ? page.name[0] : '1';
    if (limitQuery) {
      const limit = Number(limitQuery.name[0]);
      pages = Math.ceil(localStorage.info.length / limit);
      startIndex = limit * (Number(pageValue) - 1);
      endIndex = startIndex + limit > endIndex ? endIndex : startIndex + limit;
      this.productsPage.switcher.setAttribute('value', `${pageValue}`);
      this.productsPage.numberPagesInput.value = `${limit}`;
    } else {
      this.productsPage.numberPagesInput.value = ``;
    }

    this.productsPage.switcherText.textContent = `${pageValue}/${pages}`;
    this.arrowStatus(pageValue, String(pages));

    for (let i = startIndex; i < endIndex; i += 1) {
      const item = localStorage.info[i];
      const product = products.find((prod) => prod.id === item.product) as TProduct;
      const productItem = new ShoppingProduct();
      this.productsInfo.push(productItem);
      const index = document.createElement('span');
      index.className = 'serial__number';
      index.textContent = String(i + 1);
      productItem.productInfo.productView.insertBefore(index, productItem.productInfo.img);
      productItem.initShoppingProduct(product, item);
      this.productItems.append(productItem.product);
    }
  }

  public arrowStatus(pageValue: string, pages: string) {
    if (pageValue === '1') {
      this.productsPage.switcherLeftArrow.classList.add('inactive');
    } else {
      this.productsPage.switcherLeftArrow.classList.remove('inactive');
    }
    if (pageValue === pages) {
      this.productsPage.switcherRightArrow.classList.add('inactive');
    } else {
      this.productsPage.switcherRightArrow.classList.remove('inactive');
    }
  }
}
