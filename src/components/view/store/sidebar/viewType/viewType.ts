export default class ViewType {
  view: HTMLElement;

  viewText: HTMLElement;

  viewGrid: HTMLElement;

  viewDouble: HTMLElement;

  constructor() {
    this.view = this.createDomNode('div', ['view']);
    this.viewText = this.createDomNode('p', ['view__text'], 'View on');
    this.viewGrid = this.createDomNode('div', ['view__grid', 'layout']);
    this.viewDouble = this.createDomNode('div', ['view__double', 'layout']);
    this.append();
  }

  private append() {
    this.view.append(this.viewText, this.viewGrid, this.viewDouble);
  }

  private createDomNode(element: string, classElement: string[], text?: string) {
    const node = document.createElement(element);
    classElement.forEach((item) => {
      node.classList.add(item);
    });
    if (text) {
      node.textContent = text;
    }
    return node;
  }
}
