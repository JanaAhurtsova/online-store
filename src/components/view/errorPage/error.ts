export default class ErrorPage {
  error: HTMLElement;

  title: HTMLHeadingElement;

  constructor() {
    this.error = document.createElement('section');
    this.title = document.createElement('h2');
    this.init();
    this.append();
  }

  init() {
    this.title.textContent = 'PAGE NOT FOUND (404)';
  }

  append() {
    this.error.append(this.title);
  }
}
