import { TFilter } from '../../../../../globalType';
import products from '../../../../data/products';

export default class Filter {
  filter: HTMLElement;

  title: HTMLHeadingElement;

  filterField: HTMLElement[];

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
      const category = document.createElement('div');
      const categoryText = document.createElement('span');
      const categoryAmoun = document.createElement('span');
      category.classList.add('category');

      categoryText.classList.add('category__text');
      categoryText.classList.add('filter');
      categoryText.setAttribute('data-type', type);
      categoryText.setAttribute('data-name', name);
      categoryText.innerHTML = name.replace(/_/, ' ');

      categoryAmoun.classList.add('category__amount');
      categoryAmoun.innerHTML = ` (${products.filter((item) => item[type] === name).length})`;
      this.filterField.push(categoryText);

      category.append(categoryText);
      category.append(categoryAmoun);
      this.filter.append(category);
    });
  }
}
