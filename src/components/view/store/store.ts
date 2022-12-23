import ProductCard from './productCard/productCard';
import products from '../../data/products';
import { TProduct, TShoppingCart, TSLider } from '../../../globalType';
import SideBar from './sidebar/sidebar';
import Sorter from './sorter/sorter';
import SearchFilter from './sidebar/searchFilter/searchFilter';

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
    this.createProducts();
  }

  append() {
    this.shopContainer.append(this.sideBar.sidebar);
    this.shopContainer.append(this.products);
    this.toolbar.append(this.sorter.sorter);
    this.toolbar.append(this.found);
    this.toolbar.append(this.search.search);
    this.store.append(this.title);
    this.store.append(this.toolbar);
    this.store.append(this.shopContainer);
  }

  createProducts(data = products) {
    this.data = data;
    this.products.innerHTML = '';
    this.productsData = [];
    this.products.classList.add('products');
    this.data.forEach((article) => {
      const product = new ProductCard(article);
      this.productsData.push(product);
      this.products.append(product.product);
    });
  }

  shopCartInfo(data: TShoppingCart) {
    Array.from(this.productsData).forEach((product) => {
      if (data.products.includes(product.productData.id)) {
        console.log(data.products);
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
