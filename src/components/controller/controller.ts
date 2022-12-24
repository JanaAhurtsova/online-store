import Router from './router/router';
import products from '../data/products';
import FirebaseLoader from './firebase/firebaseLoader';
import { TFilter, TProduct, TQuery, TReloadPage, TShoppingCart, TSLider as TSlider } from '../../globalType';
import FilterController from './filterController';

export default class Controller {
  router: Router;

  private query: TQuery[];

  shoppingCart: TShoppingCart;

  firebase: FirebaseLoader;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/',
    });
    this.query = [];
    this.firebase = new FirebaseLoader();
    this.router.add(/products\/([\d]+?)\b/g).add(/([\w]+?)=([^&]+)\b/g);
    this.shoppingCart = {
      price: 0,
      products: [],
    };
  }

  clickProduct(event: Event): string | TShoppingCart {
    const target = (event.target as Element).closest('.button');
    const result = '';
    console.log(target);
    if (target) {
      const type = target.getAttribute('data-type');
      const id = target.getAttribute('data-id') as string;
      if (type === 'product') {
        this.router.navigate(`products/${id}`);
      } else {
        this.changeShoppingCart(id);
        return this.shoppingCart;
      }
    }
    return result;
  }

  changeShoppingCart(id: string) {
    const product = products.find((item) => item.id === Number(id)) as TProduct;
    if (this.shoppingCart.products.includes(product.id)) {
      this.shoppingCart.products = this.shoppingCart.products.filter((item) => item !== product.id);
      this.shoppingCart.price -= product.price;
    } else {
      this.shoppingCart.products.push(product.id);
      this.shoppingCart.price += product.price;
    }
  }

  reloadPage(): TReloadPage | string {
    const arg = this.router.splitURL();
    if (this.query.length === 0) {
      this.query = arg.slice(0);
    }
    return FilterController.filter(arg, this.query);
  }

  getQueryString() {
    let result = '';
    this.query.forEach((item) => {
      if (item.name.length === 0) return;
      if (!result) {
        result += `${item.type}=${item.name.join('|')}`;
      } else {
        result += `&${item.type}=${item.name.join('|')}`;
      }
    });
    return result;
  }

  resetFilter() {
    this.query = [];
    this.router.navigate('');
  }

  clickFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.closest('.filter')) {
      this.query = this.query.filter((item) => item.type !== 'products');
      console.log(this.query);
      const type = target.dataset.type as TFilter;
      const name = target.dataset.name as string;
      this.updateQuery(type, name);
      this.router.navigate(this.getQueryString());
    }
  }

  sort(event: Event) {
    const target = event.target as HTMLInputElement;
    this.query = this.query.filter((item) => item.type !== 'sort');
    this.query.push({ type: 'sort', name: [target.value] });
    this.router.navigate(this.getQueryString());
  }

  updateQuery(type: string, name: string) {
    if ((this, this.query.length === 0)) {
      this.query.push({ type, name: [name] });
    } else {
      const result = this.query.find((item) => item.type === type);
      if (result) {
        this.query.map((category) => {
          if (category.type === type) {
            if (category.name.includes(name)) {
              category.name = category.name.filter((names) => names !== name);
            } else {
              category.name.push(name);
            }
          }
          return category;
        });
      } else {
        this.query.push({ type, name: [name] });
      }
    }
  }

  sliderFilter(data: TSlider) {
    this.query = this.query.filter((item) => item.type !== data.name);
    const product = Controller.getSetTypes(data, products);
    const min = product[data.lower];
    const max = product[data.upper];
    this.query.push({ type: data.name, name: [`${min}`, `${max}`] });
    this.router.navigate(this.getQueryString());
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.query = this.query.filter((item) => item.type !== 'search');
    if (target.value !== '') {
      this.query.push({ type: 'search', name: [target.value] });
    }
    this.router.navigate(this.getQueryString());
  }

  static getSetTypes(data: TSlider, prod: TProduct[]) {
    const productsCopy = [...prod];
    FilterController.sortNumber(productsCopy, data.name);
    const result = Array.from(new Set(productsCopy.map((item) => item[data.name])));
    return result;
  }
}
