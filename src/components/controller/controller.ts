import Router from './router/router';
import products from '../data/products';
import FirebaseLoader from './firebase/firebaseLoader';
import { TFilter, TProduct, TQuery, TReloadPage, TShopingCart } from '../../globalType';
import FilterController from './filterController';

export default class Controller {
  router: Router;

  private query: TQuery[];

  shopingCart: TShopingCart;

  firebase: FirebaseLoader;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/',
    });
    this.query = [];
    this.firebase = new FirebaseLoader();
    this.router.add(/products\/([\d]+?)\b/g).add(/([\w]+?)=([^&]+)\b/g);
    this.shopingCart = {
      price: 0,
      products: [],
    };
  }

  clickProduct(event: Event): string | TShopingCart {
    const target = (event.target as Element).closest('.button');
    const result = '';
    if (target) {
      const type = target.getAttribute('data-type');
      const id = target.getAttribute('data-id') as string;
      if (type === 'product') {
        this.router.navigate(`products/${id}`);
      } else {
        this.changeShopingCart(id);
        return this.shopingCart;
      }
    }
    return result;
  }

  changeShopingCart(id: string) {
    const product = products.find((item) => item.id === Number(id)) as TProduct;
    if (this.shopingCart.products.includes(product.id)) {
      this.shopingCart.products = this.shopingCart.products.filter((item) => item !== product.id);
      this.shopingCart.price -= product.price;
    } else {
      this.shopingCart.products.push(product.id);
      this.shopingCart.price += product.price;
    }
  }

  reloadPage(): TReloadPage | string {
    const arg = this.router.splitURL();
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

  removeFilter() {
    this.query = [];
    this.router.navigate('');
  }

  clickFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target);
    if (target.closest('.filter')) {
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

  static getImage(data: TProduct, img: HTMLImageElement) {
    const firebase = new FirebaseLoader();
    firebase.getImage(data.images[0]).then((link) => {
      img.setAttribute('src', link);
    });
  }
}
