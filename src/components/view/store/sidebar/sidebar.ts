import { TFilter, TReloadPage } from '../../../../globalType';
import Filter from './filter/fitler';

export default class SideBar {
  sidebar: HTMLElement;

  categories: Filter;

  types: Filter;

  filter: HTMLDivElement;

  constructor() {
    this.sidebar = document.createElement('aside');
    this.filter = document.createElement('div');
    this.categories = new Filter('category', 'Product Category');
    this.types = new Filter('type', 'Product Type');
    this.append();
  }

  append() {
    this.filter.append(this.categories.filter);
    this.filter.append(this.types.filter);
    this.sidebar.append(this.filter);
  }

  changeSelectedCategory(data: TReloadPage) {
    this.categories.filterField.concat(this.types.filterField).forEach((item) => {
      item.categoryText.classList.remove('selected-filter');
      data.query.forEach((filter) => {
        if (filter.type === item.categoryText.dataset.type) {
          filter.name.forEach((name) => {
            if (name === item.categoryText.dataset.name) {
              item.categoryText.classList.add('selected-filter');
            }
          });
        }
      });
      item.categoryAmoun.innerHTML = ` (${
        data.products.filter(
          (dataItem) =>
            dataItem[item.categoryText.dataset.type as TFilter] === (item.categoryText.dataset.name as TFilter)
        ).length
      }/${item.amount})`;
    });
  }
}
