import { TFilter } from '../../../../../globalType';
import products from '../../../../data/products';

export default class FilterItem {
  category: HTMLDivElement;

  categoryText: HTMLSpanElement;

  categoryAmoun: HTMLSpanElement;

  amount: number;

  constructor(type: TFilter, name: string) {
    this.category = document.createElement('div');
    this.categoryText = document.createElement('span');
    this.categoryAmoun = document.createElement('span');
    this.amount = products.filter((item) => item[type] === name).length;
    this.init(type, name);
    this.append();
  }

  init(type: TFilter, name: string) {
    this.category.classList.add('category');

    this.categoryText.classList.add('category__text');
    this.categoryText.classList.add('filter');
    this.categoryText.setAttribute('data-type', type);
    this.categoryText.setAttribute('data-name', name);
    this.categoryText.innerHTML = name.replace(/_/, ' ');

    this.categoryAmoun.classList.add('category__amount');
    this.categoryAmoun.innerHTML = `(${this.amount}/${this.amount})`;
  }

  append() {
    this.category.append(this.categoryText);
    this.category.append(this.categoryAmoun);
  }
}
