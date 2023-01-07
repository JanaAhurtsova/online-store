import { TQuery, TSorter } from '../../../../globalType';

export default class Sorter {
  public sorter: HTMLSelectElement;

  private optionText: TSorter[];

  constructor() {
    this.sorter = document.createElement('select');
    this.optionText = [
      { text: 'Default sorting', value: 'default' },
      { text: 'Sort by price: high to low', value: 'phl' },
      { text: 'Sort by price: low to high', value: 'plh' },
      { text: 'Sort by rating: high to low', value: 'rhl' },
      { text: 'Sort by rating: low to high', value: 'rlh' },
    ];
    this.init();
    this.createOption();
  }

  private init() {
    this.sorter.classList.add('sorter');
  }

  public reloadPage(query: TQuery[]) {
    const data = query.find((item) => item.type === 'sort');
    this.sorter.value = data ? data.name[0] : 'default';
  }

  private createOption() {
    this.optionText.forEach((data) => {
      const option = document.createElement('option');
      option.textContent = data.text;
      option.setAttribute('value', data.value);
      this.sorter.append(option);
    });
  }
}
