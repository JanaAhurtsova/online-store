import ProductCard from './productCard/productCard';
import products from '../../data/products';
import { TShopingCart } from '../../../globalType';
import SideBar from './sidebar/sidebar';

export default class Store {
  store: HTMLElement;

  productsData: ProductCard[];

  products: HTMLDivElement;

  sideBar: SideBar;

  selectedFilter: HTMLElement[];

  shopContainer: HTMLDivElement;

  title: HTMLHeadingElement;

  constructor() {
    this.store = document.createElement('section');
    this.products = document.createElement('div');
    this.shopContainer = document.createElement('div');
    this.title = document.createElement('h2');
    this.sideBar = new SideBar();
    this.productsData = [];
    this.selectedFilter = [];
    this.init();
    this.append();
  }

  init() {
    this.title.innerHTML = 'Store';
    this.title.classList.add('store__title');
    this.shopContainer.classList.add('store__container');
    this.store.classList.add('store');
    this.createProducts();
  }

  append() {
    this.shopContainer.append(this.sideBar.sidebar);
    this.shopContainer.append(this.products);
    this.store.append(this.title);
    this.store.append(this.shopContainer);
  }

  createProducts(data = products) {
    this.products.innerHTML = '';
    this.productsData = [];
    this.products.classList.add('products');
    data.forEach((article) => {
      const product = new ProductCard(article);
      this.productsData.push(product);
      this.products.append(product.product);
    });
  }

  shopCartInfo(data: TShopingCart) {
    Array.from(this.productsData).forEach((product) => {
      if (data.products.includes(product.productData.id)) {
        console.log(data.products);
        product.buttonCart.textContent = 'remove from cart';
        product.buttonCart.classList.add('selected');
      } else {
        product.buttonCart.textContent = 'add to cart';
        product.buttonCart.classList.remove('selected');
      }
    });
  }
}
