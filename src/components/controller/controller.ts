import Router from './router/router';
import products from '../data/products';
import FirebaseLoader from './firebase/firebaseLoader';
import {
  TFilter,
  TProduct,
  TProductInfo,
  TQuery,
  TReloadPage,
  TShoppingCart,
  TSLider as TSlider,
} from '../../globalType';
import FilterController from './filterController';

export default class Controller {
  router: Router;

  private query: TQuery[];

  firebase: FirebaseLoader;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/',
    });
    this.query = [];
    this.firebase = new FirebaseLoader();
    this.router
      .add(/products\/([\d]+?)\b/g)
      .add(/([\w]+?)=([^&]+)\b/g)
      .add(/cart\b|([\w]+?)=([^&]+)\b/g);
  }

  clickProduct(event: Event): string | TShoppingCart {
    const target = (event.target as Element).closest('.button');
    const result = '';
    if (target) {
      const type = target.getAttribute('data-type');
      const id = target.getAttribute('data-id') as string;
      if (type === 'product') {
        this.router.navigate(`products/${id}`);
      } else {
        this.changeShoppingCart(id);
        const shoppingCart: TShoppingCart = JSON.parse(localStorage.getItem('prod') as string);
        return shoppingCart;
      }
    }
    return result;
  }

  openShoppingCart() {
    this.query = this.query.filter((item) => item.type === 'cart');
    this.router.navigate('cart');
  }

  openModalWindow(event: Event, openModalWindow: () => void) {
    const target = event.target as HTMLElement;
    const { id } = target.dataset;
    let shoppingCart: TShoppingCart = { price: 0, info: [] };
    if (id) {
      const localInfo: TShoppingCart = JSON.parse(localStorage.getItem('prod') as string);
      if (localInfo) {
        shoppingCart = localInfo;
      }
      const info = shoppingCart.info.find((item) => item.product === Number(id));
      if (!info) {
        shoppingCart.price += (products.find((item) => item.id === Number(id)) as TProduct).price;
        shoppingCart.info.push({ count: 1, product: +id });
        localStorage.setItem('prod', JSON.stringify(shoppingCart));
      }
    }
    openModalWindow();
    this.openShoppingCart();
  }

  openStartPage() {
    this.query = [];
    this.router.navigate('');
  }

  clickShoppingCartProduct(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('increase') || target.classList.contains('decrease')) {
      const id = target.parentElement?.dataset.id as string;
      this.changeCount(id, target.classList.contains('increase') ? 'increase' : 'decrease');
      this.router.navigate(this.getQueryString());
    }
  }

  changeCount(id: string, type: string) {
    const prod = localStorage.getItem('prod');
    if (prod) {
      const data: TShoppingCart = JSON.parse(prod);
      const itemInfo = data.info.find((item) => item.product === Number(id)) as TProductInfo;
      const index = data.info.indexOf(itemInfo);
      const product = products.find((item) => item.id === Number(id)) as TProduct;
      if (type === 'increase') {
        if (product.stock > itemInfo.count) {
          data.info[index].count += 1;
          data.price += product.price;
        }
      } else if (itemInfo.count === 1) {
        data.info = data.info.filter((item) => item.product !== Number(id));
        data.price -= product.price;
      } else {
        data.info[index].count -= 1;
        data.price -= product.price;
      }
      data.price = +data.price.toFixed(2);
      localStorage.setItem('prod', JSON.stringify(data));
    }
  }

  changeShoppingCart(id: string) {
    const product = products.find((item) => item.id === Number(id)) as TProduct;
    const prod = localStorage.getItem('prod');
    let data: TShoppingCart;
    if (prod) {
      data = JSON.parse(prod);
      const find = data.info.find((item) => item.product === +id);
      if (find) {
        data.info = data.info.filter((item) => item.product !== +id);
        data.price -= product.price * find.count;
      } else {
        data.price += product.price;
        data.info.push({ count: 1, product: +id });
      }
    } else {
      data = { price: product.price, info: [{ count: 1, product: +id }] };
    }
    data.price = +data.price.toFixed(2);
    localStorage.setItem('prod', JSON.stringify(data));
  }

  reloadPage(): TReloadPage | string {
    const arg = this.router.splitURL();
    if (!this.query.length || !arg.length) {
      this.query = arg.slice(0);
    }
    return FilterController.filter(arg, this.query);
  }

  getQueryString() {
    let result = '';
    this.query.forEach((item) => {
      if (!item.name.length) {
        return;
      }
      //  item.type === 'cart';
      result += result ? '&' : '?';
      result += item.name[0] ? `${item.type}=${item.name.join('|')}` : `${item.type}`;
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
      this.updateQuery(target.dataset.type as TFilter, target.dataset.name as string);
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
    if (!this.query.length) {
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
    this.query.push({ type: data.name, name: [product[data.lower], product[data.upper]] });
    this.router.navigate(this.getQueryString());
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.query = this.query.filter((item) => item.type !== 'search');
    if (target.value) {
      this.query.push({ type: 'search', name: [target.value] });
    }
    this.router.navigate(this.getQueryString());
  }

  changeImages(event: Event, mainImage: HTMLImageElement) {
    const target = event.target as HTMLElement;
    const imageLink = target.getAttribute('src') as string;
    mainImage.setAttribute('src', imageLink);
  }

  shoppingInputPage(event: Event) {
    const target = event.target as HTMLInputElement;
    this.query = this.query.filter((item) => item.type !== 'page');
    this.query = this.query.filter((item) => item.type !== 'limit');
    if (Number(target.value)) {
      this.query.push({ type: 'limit', name: [target.value] });
    }
    this.router.navigate(this.getQueryString());
  }

  changeShoppingPage(event: Event) {
    const target = event.target as HTMLElement;
    const page = this.query.find((item) => item.type === 'page');
    const limit = this.query.find((item) => item.type === 'limit');
    const value = Number(target.parentElement?.getAttribute('value') as string);
    const prod = localStorage.getItem('prod');
    let data: TShoppingCart;
    if (prod && limit) {
      data = JSON.parse(prod);
      if (Number(value) - 1 >= 0 && Number(value) <= Math.ceil(Number(data.info.length) / Number(limit.name[0]))) {
        if (page) {
          this.query = this.query.filter((item) => item.type !== 'page');
        }
        if (target.classList.contains('arrow-left')) {
          this.query.push({ type: 'page', name: [String(value - 1)] });
        }
        if (target.classList.contains('arrow-right')) {
          this.query.push({ type: 'page', name: [String(value + 1)] });
        }
      }
    }
    this.router.navigate(this.getQueryString());
  }

  clickGridView() {
    this.query = this.query.filter((item) => item.type !== 'view');
    this.query.push({ type: 'view', name: ['grid'] });
    this.router.navigate(this.getQueryString());
  }

  clickLineView() {
    this.query = this.query.filter((item) => item.type !== 'view');
    this.query.push({ type: 'view', name: ['line'] });
    this.router.navigate(this.getQueryString());
  }

  static getSetTypes(data: TSlider, prod: TProduct[]) {
    const productsCopy = [...prod];
    FilterController.sortNumber(productsCopy, data.name);
    return Array.from(new Set(productsCopy.map((item) => String(item[data.name]))));
  }
}
