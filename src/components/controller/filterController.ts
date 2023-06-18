import { TFilter, TProduct, TQuery } from '../../globalType';
import products from '../data/products';

export default class FilterController {
  private static filterType(filter: TQuery, res: TProduct[], type: TFilter) {
    let result: TProduct[] = [];
    filter.name.forEach((name) => {
      result = result.concat(res.filter((product) => String(product[type]) === name));
    });
    return result;
  }

  private static sortText(res: TProduct[]) {
    res.sort((a, b) => {
      if (a.rating > b.rating) {
        return 1;
      }
      if (a.rating < b.rating) {
        return -1;
      }
      return 0;
    });
  }

  public static sortNumber(res: TProduct[], type: 'price' | 'id' | 'stock') {
    res.sort((a, b) => a[type] - b[type]);
  }

  private static sortProduct(filterName: string, res: TProduct[]) {
    let result = [...res];
    switch (filterName) {
      case 'plh': {
        this.sortNumber(result, 'price');
        break;
      }
      case 'phl': {
        this.sortNumber(result, 'price');
        result = result.reverse();
        break;
      }
      case 'rlh': {
        this.sortText(result);
        break;
      }
      case 'rhl': {
        this.sortText(result);
        result = result.reverse();
        break;
      }
      default: {
        this.sortNumber(result, 'id');
      }
    }
    return result;
  }

  private static filterSlider(range: string[], type: 'price' | 'stock', res: TProduct[]) {
    return res.filter((item) => item[type] >= +range[0] && item[type] <= +range[1]);
  }

  private static search(data: string, res: TProduct[]) {
    return res.filter((item) => {
      return (
        String(item.price).includes(data) ||
        String(item.stock).includes(data) ||
        String(item.rating).includes(data) ||
        item.category.includes(data) ||
        item.description.includes(data) ||
        item.title.includes(data) ||
        item.type.includes(data)
      );
    });
  }

  public static filter(args: TQuery[]) {
    const { hash } = window.location;
    if (args.length !== 0) {
      if (args[0].type === 'products') {
        return args[0].name[0];
      }
      let res: TProduct[] = [...products];
      args.forEach((filter) => {
        switch (filter.type) {
          case 'type':
          case 'category': {
            res = this.filterType(filter, res, filter.type);
            break;
          }
          case 'price': {
            res = this.filterSlider(filter.name, filter.type, res);
            break;
          }
          case 'stock': {
            res = this.filterSlider(filter.name, filter.type, res);
            break;
          }
          case 'search': {
            res = this.search(filter.name[0], res);
            break;
          }
          case 'sort': {
            res = this.sortProduct(filter.name[0], res);
            break;
          }
          case 'cart':
          case 'page':
          case 'limit':
          case 'view': {
            break;
          }
          default: {
            args = [];
            break;
          }
        }
      });
      return { products: res, query: args };
    }
    if (hash !== '') {
      return 'error';
    }
    return { products, query: args };
  }
}
