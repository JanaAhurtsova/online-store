import { TFilter, TReloadPage, TSLider } from '../../../../globalType';
import TypeFilter from './typeFilter/typeFitler';
import SliderFilter from './sliderFIlter/sliderFilter';

export default class SideBar {
  sidebar: HTMLElement;

  categories: TypeFilter;

  types: TypeFilter;

  filter: HTMLDivElement;

  priceFilter: SliderFilter;

  stockFilter: SliderFilter;

  resetFilterButton: HTMLButtonElement;

  copyFilterButton: HTMLButtonElement;

  constructor() {
    this.sidebar = document.createElement('aside');
    this.filter = document.createElement('div');
    this.categories = new TypeFilter('category', 'Product Category');
    this.types = new TypeFilter('type', 'Product Type');
    this.priceFilter = new SliderFilter('price');
    this.stockFilter = new SliderFilter('stock');
    this.resetFilterButton = this.createButton('Reset Filter', 'reset');
    this.copyFilterButton = this.createButton('Copy link', 'copy');
    this.append();
    this.init();
    this.copyFilterButton.addEventListener('click', this.copyFilter);
  }

  init() {
    this.sidebar.classList.add('sidebard');
  }

  append() {
    this.filter.append(this.categories.filter);
    this.filter.append(this.types.filter);
    this.sidebar.append(this.resetFilterButton);
    this.sidebar.append(this.copyFilterButton);
    this.sidebar.append(this.filter);
    this.sidebar.append(this.priceFilter.slider);
    this.sidebar.append(this.stockFilter.slider);
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

  filterRange(event: Event): TSLider {
    const target = event.target as HTMLElement;
    return target.dataset.type === 'price' ? this.priceFilter.filterRange() : this.stockFilter.filterRange();
  }

  createButton(text: string, type: string) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.classList.add('button');
    button.classList.add(type);
    return button;
  }

  copyFilter() {
    const url = document.location.href;
    navigator.clipboard.writeText(url);
  }
}
