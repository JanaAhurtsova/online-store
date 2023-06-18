export default class EmptyPage {
  public emptyPage: HTMLElement;

  public message: HTMLElement;

  constructor(text: string) {
    this.emptyPage = this.createDomNode('div', 'empty-page');
    this.message = this.createDomNode('h2', 'empty-page__text', text);
    this.append();
  }

  private append() {
    this.emptyPage.append(this.message);
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
