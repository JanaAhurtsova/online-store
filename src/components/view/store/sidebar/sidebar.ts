import { TQuery } from '../../../../globalType';
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

  clickFilter(selectedFilter: TQuery[]) {
    const filters = this.categories.filterField.concat(this.types.filterField);
    filters.forEach((item) => {
      item.classList.remove('selected-filter');
      selectedFilter.forEach((filter) => {
        if (filter.name === item.dataset.name && filter.type === item.dataset.type) {
          item.classList.add('selected-filter');
        }
      });
    });
  }
}
