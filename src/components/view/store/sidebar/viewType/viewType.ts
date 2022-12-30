export default class ViewType {
  view: HTMLDivElement;

  viewText: HTMLParagraphElement;

  viewGrid: HTMLDivElement;

  viewLine: HTMLDivElement;

  constructor() {
    this.view = document.createElement('div');
    this.viewText = document.createElement('p');
    this.viewGrid = document.createElement('div');
    this.viewLine = document.createElement('div');
    this.init();
    this.append();
  }

  init() {
    this.view.classList.add('view');
    this.view.textContent = 'View on';
    this.viewGrid.classList.add('view__grid');
    this.viewLine.classList.add('view__line');
  }

  append() {
    this.view.append(this.viewText, this.viewGrid, this.viewLine);
  }
}
