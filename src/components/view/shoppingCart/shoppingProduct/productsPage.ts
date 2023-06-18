export default class ProductPage {
  public productPage: HTMLElement;

  private title: HTMLElement;

  private numberPages: HTMLElement;

  private numberPagesText: HTMLLabelElement;

  public numberPagesInput: HTMLInputElement;

  public switcher: HTMLElement;

  public switcherText: HTMLElement;

  public switcherLeftArrow: HTMLElement;

  public switcherRightArrow: HTMLElement;

  private switcherTitle: HTMLElement;

  constructor() {
    this.productPage = this.createDomNode('div', 'pages');
    this.title = this.createDomNode('span', 'pages__title', 'Products in cart');
    this.numberPages = this.createDomNode('div', 'pages__number');
    this.numberPagesText = this.createDomNode('label', 'search__label', 'Limit') as HTMLLabelElement;
    this.numberPagesInput = this.createDomNode('input', 'search__input') as HTMLInputElement;
    this.switcher = this.createDomNode('div', 'pages__switcher');
    this.switcherTitle = this.createDomNode('span', 'pages__switcher__title', 'Page');
    this.switcherLeftArrow = this.createDomNode('div', 'arrow-left');
    this.switcherText = this.createDomNode('span', 'pages__switcher__text', '1/1');
    this.switcherRightArrow = this.createDomNode('div', 'arrow-right');
    this.init();
    this.append();
  }

  private init() {
    this.numberPagesInput.setAttribute('placeholder', 'items');
    this.switcher.setAttribute('value', '1');
  }

  private append() {
    this.numberPages.append(this.numberPagesText, this.numberPagesInput);
    this.switcher.append(this.switcherTitle, this.switcherLeftArrow, this.switcherText, this.switcherRightArrow);
    this.productPage.append(this.title, this.numberPages, this.switcher);
  }

  private createDomNode(element: string, classElement: string, text?: string) {
    const node = document.createElement(element);
    node.className = classElement;
    if (text) {
      node.textContent = text;
    }
    return node;
  }
}
