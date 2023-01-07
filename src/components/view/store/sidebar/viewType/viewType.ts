export default class ViewType {
  view: HTMLElement;

  viewText: HTMLElement;

  viewGrid: HTMLElement;

  viewLine: HTMLElement;

  constructor() {
    this.view = this.createDomNode('div', 'view');
    this.viewText = this.createDomNode('p', 'view__text', 'View on');
    this.viewGrid = this.createDomNode('div', 'view__grid');
    this.viewLine = this.createDomNode('div', 'view__line');
    this.append();
  }

  private append() {
    this.view.append(this.viewText, this.viewGrid, this.viewLine);
  }

  private createDomNode(element: string, classElement: string, text?: string) {
    const node = document.createElement(element);
    node.classList.add(classElement);
    if (text) {
      node.textContent = text;
    }
    return node;
  }
}
