import { TFilter, TReloadPage, TSlider } from '../../../../globalType';
import TypeFilter from './typeFilter/typeFilter';
import SliderFilter from './sliderFIlter/sliderFilter';

export default class SideBar {
  public sidebar: HTMLElement;

  public categories: TypeFilter;

  private types: TypeFilter;

  public filter: HTMLElement;

  public priceFilter: SliderFilter;

  public stockFilter: SliderFilter;

  private buttons: HTMLElement;

  public resetFilterButton: HTMLButtonElement;

  private copyFilterButton: HTMLButtonElement;

  constructor() {
    this.sidebar = this.createDomNode('aside', 'sidebar');
    this.filter = this.createDomNode('div', 'filter__wrapper');
    this.categories = new TypeFilter('category', 'Product Category');
    this.types = new TypeFilter('type', 'Product Type');
    this.priceFilter = new SliderFilter('price');
    this.stockFilter = new SliderFilter('stock');
    this.buttons = this.createDomNode('div', 'wrapper__buttons');
    this.resetFilterButton = this.createDomNode('button', 'button', 'Reset Filter', 'reset') as HTMLButtonElement;
    this.copyFilterButton = this.createDomNode('button', 'button', 'Copy link', 'copy') as HTMLButtonElement;
    this.append();
    this.copyFilterButton.addEventListener('click', this.copyFilter);
  }

  private append() {
    this.filter.append(this.categories.filter, this.types.filter);
    this.buttons.append(this.resetFilterButton, this.copyFilterButton);
    this.sidebar.append(this.buttons, this.filter, this.priceFilter.slider, this.stockFilter.slider);
  }

  public changeSelectedCategory(data: TReloadPage) {
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
      item.categoryAmount.innerHTML = ` (${
        data.products.filter(
          (dataItem) =>
            dataItem[item.categoryText.dataset.type as TFilter] === (item.categoryText.dataset.name as TFilter)
        ).length
      }/${item.amount})`;
    });
  }

  public filterRange(event: Event): TSlider {
    const target = event.target as HTMLElement;
    return target.dataset.type === 'price' ? this.priceFilter.filterRange() : this.stockFilter.filterRange();
  }

  private createDomNode(element: string, classElement: string, text?: string, type?: string) {
    const node = document.createElement(element);
    node.classList.add(classElement);

    if (text) {
      node.innerText = text;
    }
    if (type) {
      node.classList.add(type);
    }
    return node;
  }

  private copyFilter() {
    const url = document.location.href;
    navigator.clipboard.writeText(url);
  }
}
