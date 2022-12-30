import ProductCard from './productCard/productCard';
import products from '../../data/products';
import { TProduct, TShoppingCart, TSLider } from '../../../globalType';
import SideBar from './sidebar/sidebar';
import Sorter from './sorter/sorter';
import SearchFilter from './sidebar/searchFilter/searchFilter';
import EmptyPage from '../emptyPage/emptyPage';
import ViewType from './sidebar/viewType/viewType';

export default class Store {
  store: HTMLElement;

  productsData: ProductCard[];

  products: HTMLDivElement;

  sideBar: SideBar;

  selectedFilter: HTMLElement[];

  shopContainer: HTMLDivElement;

  title: HTMLHeadingElement;

  sorter: Sorter;

  data: TProduct[];

  found: HTMLSpanElement;

  search: SearchFilter;

  toolbar: HTMLDivElement;

  emptyPage: EmptyPage;

  view: ViewType;

  constructor() {
    this.store = document.createElement('section');
    this.products = document.createElement('div');
    this.shopContainer = document.createElement('div');
    this.title = document.createElement('h2');
    this.found = document.createElement('span');
    this.toolbar = document.createElement('div');
    this.sideBar = new SideBar();
    this.sorter = new Sorter();
    this.search = new SearchFilter();
    this.emptyPage = new EmptyPage('No products found');
    this.view = new ViewType();
    this.data = products;
    this.productsData = [];
    this.selectedFilter = [];
    this.init();
    this.append();
  }

  init() {
    this.title.innerHTML = 'Store';
    this.store.classList.add('store');
    this.title.classList.add('store__title');
    this.toolbar.classList.add('store__toolbar');
    this.shopContainer.classList.add('store__container');
    this.products.classList.add('products');
  }

  append() {
    this.shopContainer.append(this.sideBar.sidebar);
    this.shopContainer.append(this.products);
    this.toolbar.append(this.found);
    this.toolbar.append(this.sorter.sorter);
    this.toolbar.append(this.search.search);
    this.toolbar.append(this.view.view);
    this.store.append(this.title);
    this.store.append(this.toolbar);
    this.store.append(this.shopContainer);
  }

  createProducts(shoppingCart: TShoppingCart, typeView: string, data = products) {
    this.data = data;
    this.products.innerHTML = '';
    this.productsData = [];
    if (typeView === 'grid') {
      this.view.viewGrid.classList.add('selected');
      this.view.viewLine.classList.remove('selected');
    } else {
      this.view.viewGrid.classList.remove('selected');
      this.view.viewLine.classList.add('selected');
    }
    if (data.length === 0) {
      this.products.append(this.emptyPage.emptyPage);
    } else {
      this.data.forEach((article) => {
        const product = new ProductCard();
        product.initProductCard(article);
        if (typeView === 'line') {
          product.product.description.classList.remove('product__description');
          this.products.classList.add('line');
        } else {
          this.products.classList.remove('line');
        }
        this.productsData.push(product);
        this.products.append(product.productView);
      });
      if (shoppingCart.info.length !== 0) {
        this.shopCartInfo(shoppingCart);
      }
    }
  }

  shopCartInfo(data: TShoppingCart) {
    Array.from(this.productsData).forEach((product) => {
      const find = data.info.find((item) => item.product === product.id);
      if (find) {
        product.buttonCart.textContent = 'drop from cart';
        product.buttonCart.classList.add('selected');
      } else {
        product.buttonCart.textContent = 'add to cart';
        product.buttonCart.classList.remove('selected');
      }
    });
  }

  filterRange(event: Event): TSLider {
    return this.sideBar.filterRange(event);
  }
}
