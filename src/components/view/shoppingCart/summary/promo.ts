export default class Promo {
  public promo: HTMLElement;

  private promoText: HTMLElement;

  public promoButton: HTMLButtonElement;

  constructor() {
    this.promo = this.createDomNode('div', 'promo');
    this.promoText = this.createDomNode('span', 'promo__text');
    this.promoButton = document.createElement('button');
    this.append();
  }

  private append() {
    this.promo.append(this.promoText, this.promoButton);
  }

  public initPromo(buttonText: string, promo: string) {
    this.promoButton.classList.add('button', 'summary__button');
    this.promoButton.textContent = buttonText;
    this.promoButton.setAttribute('type', buttonText);
    this.promo.setAttribute('code', promo);
    this.promoText.textContent = `Promo code: ${promo} - 10%`;
  }

  public addButtonClickHandler(func: (event: Event) => void) {
    this.promoButton.addEventListener('click', func);
  }

  private createDomNode(element: string, ...classes: string[]) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }
}
