import { TFilter } from '../../../../../globalType';
import products from '../../../../data/products';
import FilterItem from './filterItem';

export default class TypeFilter {
  filter: HTMLElement;

  title: HTMLHeadingElement;

  filterField: FilterItem[];

  constructor(type: TFilter, titleText: string) {
    this.filter = document.createElement('div');
    this.title = document.createElement('h2');
    this.filterField = [];

    this.init(titleText);
    this.append();
    this.createFitlerItem(type);
  }

  init(titleText: string) {
    this.filter.classList.add('categories');

    this.title.classList.add('categories__title');
    this.title.innerHTML = titleText;
  }

  append() {
    this.filter.append(this.title);
  }

  createFitlerItem(type: TFilter) {
    const categories = Array.from(new Set(products.map((product) => product[type])));
    categories.forEach((name) => {
      const category = new FilterItem(type, name);
      this.filterField.push(category);
      this.filter.append(category.category);
    });
  }
}
