import { TFilter } from '../../../../../globalType';
import products from '../../../../data/products';

export default class FilterItem {
  public category: HTMLDivElement;

  public categoryText: HTMLElement;

  public categoryAmount: HTMLElement;

  public amount: number;

  constructor(type: TFilter, name: string) {
    this.category = document.createElement('div');
    this.categoryText = document.createElement('h4');
    this.categoryAmount = document.createElement('h4');
    this.amount = products.filter((item) => item[type] === name).length;
    this.init(type, name);
    this.append();
  }

  private init(type: TFilter, name: string) {
    this.category.classList.add('category');

    this.categoryText.classList.add('category__text');
    this.categoryText.classList.add('filter');
    this.categoryText.setAttribute('data-type', type);
    this.categoryText.setAttribute('data-name', name);
    this.categoryText.textContent = name.replace(/_/, ' ');

    this.categoryAmount.classList.add('category__amount');
    this.categoryAmount.innerHTML = `(${this.amount}/${this.amount})`;
  }

  private append() {
    this.category.append(this.categoryText);
    this.category.append(this.categoryAmount);
  }
}
