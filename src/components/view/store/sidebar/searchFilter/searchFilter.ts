import { TQuery } from '../../../../../globalType';

export default class SearchFilter {
  search: HTMLDivElement;

  input: HTMLInputElement;

  constructor() {
    this.search = document.createElement('div');
    this.input = document.createElement('input');
    this.init();
  }

  init() {
    this.search.append(this.input);
    this.input.classList.add('search__input');
    this.input.setAttribute('type', 'search');
    this.input.setAttribute('placeholder', 'Search product');
    this.search.classList.add('search');
  }

  reloadPage(query: TQuery[]) {
    const data = query.find((item) => item.type === 'search') as TQuery;
    if (data) {
      const result = data.name[0];
      this.input.value = result;
    } else {
      this.input.value = '';
    }
  }
}
