import Router from './router/router';
import products from '../data/products';
import FirebaseLoader from './firebase/firebaseLoader';
import { TProduct, TQuery, TShopingCart } from '../../globalType';

export default class Controller {
  router: Router;

  private query: TQuery[];

  shoppingCart: TShopingCart;

  firebase: FirebaseLoader;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/',
    });
    this.query = [];
    this.firebase = new FirebaseLoader();
    this.router.add(/products\/([\d]+?)\b/g).add(/([\w]+?)=([\w]+?)\b/g);
    this.shoppingCart = {
      price: 0,
      products: [],
    };
  }

  clickProduct(event: Event): string | TShopingCart {
    const target = (event.target as Element).closest('.button');
    const result = '';
    console.log(target);
    if (target) {
      const type = target.getAttribute('data-type');
      const id = target.getAttribute('data-id');
      if (type === 'product') {
        this.router.navigate(`products/${id}`);
      } else {
        console.log(id);
        const product = products.find((item) => item.id === Number(id)) as TProduct;
        if (this.shoppingCart.products.includes(product.id)) {
          this.shoppingCart.products = this.shoppingCart.products.filter((item) => item !== product.id);
          this.shoppingCart.price -= product.price;
        } else {
          this.shoppingCart.products.push(product.id);
          this.shoppingCart.price += product.price;
        }
        return this.shoppingCart;
      }
    }
    return result;
  }

  reloadPage(): Array<TProduct> | string {
    const arg = this.router.splitURL();
    if (arg.length !== 0) {
      if (arg[0].type === 'products') {
        return arg[0].name;
      }
      if (this.query.length === 0) {
        this.query = arg.slice(0);
      }
      let res = [...products];
      arg.forEach((filter) => {
        switch (filter.type) {
          case 'price': {
            res = res.filter((product) => String(product.price) === filter.name);
            break;
          }
          case 'type': {
            res = res.filter((product) => String(product.type) === filter.name);
            break;
          }
          case 'category': {
            res = res.filter((product) => String(product.category) === filter.name);
            break;
          }
          case 'stock': {
            break;
          }
          case 'search': {
            break;
          }
          case 'sort': {
            if (filter.name === 'title') {
              res = res.sort((a, b) => {
                if (a.title > b.title) {
                  return 1;
                }
                if (a.title < b.title) {
                  return -1;
                }
                return 0;
              });
            } else {
              res = res.sort((a, b) => a.price - b.price);
            }
            break;
          }
          default: {
            console.log('error');
            break;
          }
        }
      });
      return res;
    }
    return products;
  }

  getQueryString() {
    let result = '';
    this.query.forEach((item) => {
      if (!result) {
        result += `${item.type}=${item.name}`;
      } else {
        result += `&${item.type}=${item.name}`;
      }
    });
    return result;
  }

  removeFilter() {
    this.query = [];
    this.router.navigate('');
  }

  clickFilter(event: Event, cb: (selected: TQuery[]) => void) {
    const target = event.target as HTMLElement;
    if (target.closest('.filter')) {
      const type = target.dataset.type as string;
      const name = target.dataset.name as string;
      this.updateQuery(type, name);
      cb(this.query);
      this.router.navigate(this.getQueryString());
    }
  }

  updateQuery(type: string, name: string) {
    let flag = true;
    if (this.query.length === 0) {
      this.query.push({ type, name });
    } else {
      this.query = this.query
        .map((item) => {
          if (item.type === type) {
            flag = false;
            if (item.name === name) {
              item = { type: 'remove', name };
            } else {
              item.name = name;
            }
          }
          return item;
        })
        .filter((item) => item.type !== 'remove');
      if (flag) {
        this.query.push({ type, name });
      }
    }
  }

  static getImage(linkImg: string, img: HTMLImageElement) {
    const firebase = new FirebaseLoader();
    firebase.getImage(linkImg).then((link) => {
      img.setAttribute('src', link);
    });
  }
}
