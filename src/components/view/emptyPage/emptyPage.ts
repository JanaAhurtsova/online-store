export default class EmptyPage {
  emptyPage: HTMLDivElement;

  message: HTMLHeadingElement;

  constructor(text: string) {
    this.emptyPage = document.createElement('div');
    this.message = document.createElement('h2');
    this.init(text);
    this.append();
  }

  init(text: string) {
    this.message.textContent = `${text}`;
    this.emptyPage.classList.add('empty-page');
  }

  append() {
    this.emptyPage.append(this.message);
  }
}
