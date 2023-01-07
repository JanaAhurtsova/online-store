export default class ErrorPage {
  public readonly error: HTMLElement;

  private title: HTMLHeadingElement;

  constructor() {
    this.error = document.createElement('section');
    this.title = document.createElement('h2');
    this.init();
    this.append();
  }

  private init() {
    this.error.className = 'error_page';
    this.title.className = 'error_page__title';
    this.title.textContent = 'PAGE NOT FOUND (404)';
  }

  private append() {
    this.error.append(this.title);
  }
}
