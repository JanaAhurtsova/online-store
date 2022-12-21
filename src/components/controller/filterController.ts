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

  private static sortNumber(res: TProduct[], type: 'price' | 'id') {
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

  static filter(arg: TQuery[], query: TQuery[]) {
    if (arg.length !== 0) {
      if (arg[0].type === 'products') {
        return arg[0].name[0];
      }
      if (query.length === 0) {
        query = arg.slice(0);
      }
      let res: TProduct[] = [...products];
      arg.forEach((filter) => {
        switch (filter.type) {
          case 'type':
          case 'category': {
            res = this.filterType(filter, res, filter.type);
            break;
          }
          case 'price': {
            break;
          }
          case 'stock': {
            break;
          }
          case 'search': {
            break;
          }
          case 'sort': {
            res = this.sortProduct(filter.name[0], res);
            break;
          }
          default: {
            break;
          }
        }
      });
      return { products: res, query };
    }
    return { products, query };
  }
}
