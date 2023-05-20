import ProductCard from './productCard/productCard';
import products from '../../data/products';
import { TProduct, TShoppingCart, TSlider, IStore } from '../../../globalType';
import SideBar from './sidebar/sidebar';
import Sorter from './sorter/sorter';
import SearchFilter from './sidebar/searchFilter/searchFilter';
import EmptyPage from '../emptyPage/emptyPage';
import ViewType from './sidebar/viewType/viewType';

export default class Store implements IStore {
  public store: HTMLElement;

  private storeWrapper: HTMLElement;

  private filter: HTMLButtonElement;

  private storeContainer: HTMLElement;

  private productsData: ProductCard[];

  public products: HTMLElement;

  public sideBar: SideBar;

  private title: HTMLElement;

  public sorter: Sorter;

  private data: TProduct[];

  public found: HTMLElement;

  public search: SearchFilter;

  private toolbar: HTMLElement;

  private emptyPage: EmptyPage;

  public view: ViewType;

  constructor() {
    this.store = this.createDomNode('section', ['store']);
    this.storeContainer = this.createDomNode('div', ['store__container']);
    this.storeWrapper = this.createDomNode('div', ['wrapper__store']);
    this.filter = this.createDomNode('button', ['toggler', 'button'], 'Filter') as HTMLButtonElement;
    this.products = this.createDomNode('div', ['products']);
    this.title = this.createDomNode('h2', ['store__title'], 'Store');
    this.found = this.createDomNode('h4', ['store__found']);
    this.toolbar = this.createDomNode('div', ['store__toolbar']);
    this.sideBar = new SideBar();
    this.sorter = new Sorter();
    this.search = new SearchFilter();
    this.emptyPage = new EmptyPage('No products found');
    this.view = new ViewType();
    this.data = products;
    this.productsData = [];
    this.append();
  }

  private append() {
    this.toolbar.append(this.sorter.sorter, this.found, this.search.search, this.view.view);
    this.storeContainer.append(this.toolbar, this.products);
    this.storeWrapper.append(this.filter, this.sideBar.sidebar, this.storeContainer);
    this.store.append(this.title, this.storeWrapper);

    this.toggleFilter();
  }

  public createProducts(shoppingCart: TShoppingCart, typeView: string, data = products) {
    this.data = data;
    this.products.innerHTML = '';
    this.productsData = [];
    if (typeView === 'grid') {
      this.view.viewGrid.classList.add('selected');
      this.view.viewDouble.classList.remove('selected');
    } else {
      this.view.viewGrid.classList.remove('selected');
      this.view.viewDouble.classList.add('selected');
    }
    if (!data.length) {
      this.products.append(this.emptyPage.emptyPage);
    } else {
      this.data.forEach((article) => {
        const product = new ProductCard();
        product.initProductCard(article);
        if (typeView === 'double') {
          product.product.description.classList.remove('invisible');
          this.products.classList.add('double');
        } else {
          product.product.description.classList.add('invisible');
          this.products.classList.remove('double');
        }
        this.productsData.push(product);
        this.products.append(product.productView);
      });
      if (shoppingCart.info.length !== 0) {
        this.shopCartInfo(shoppingCart);
      }
    }
  }

  public shopCartInfo(data: TShoppingCart) {
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

  public filterRange(event: Event): TSlider {
    return this.sideBar.filterRange(event);
  }

  private toggleFilter() {
    this.filter.addEventListener('click', () => {
      this.sideBar.sidebar.classList.toggle('transform');
    });
  }

  private createDomNode(element: string, classElement: string[], text?: string) {
    const node = document.createElement(element);
    node.classList.add(...classElement);
    if (text) {
      node.textContent = text;
    }
    return node;
  }
}
