import { TFilter } from '../../../../../globalType';
import products from '../../../../data/products';
import FilterItem from './filterItem';

export default class TypeFilter {
  public filter: HTMLElement;

  private title: HTMLHeadingElement;

  public filterField: FilterItem[];

  constructor(type: TFilter, titleText: string) {
    this.filter = document.createElement('div');
    this.title = document.createElement('h2');
    this.filterField = [];

    this.init(titleText);
    this.append();
    this.createFilterItem(type);
  }

  private init(titleText: string) {
    this.filter.classList.add('categories');

    this.title.classList.add('categories__title');
    this.title.innerHTML = titleText;
  }

  private append() {
    this.filter.append(this.title);
  }

  public createFilterItem(type: TFilter) {
    const categories = Array.from(new Set(products.map((product) => product[type])));
    categories.forEach((name) => {
      const category = new FilterItem(type, name);
      this.filterField.push(category);
      this.filter.append(category.category);
    });
  }
}
