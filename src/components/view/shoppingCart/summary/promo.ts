export default class Promo {
  promo: HTMLDivElement;

  promoText: HTMLSpanElement;

  promoButton: HTMLButtonElement;

  constructor() {
    this.promo = document.createElement('div');
    this.promoText = document.createElement('span');
    this.promoButton = document.createElement('button');
    this.append();
    this.init();
  }

  init() {
    this.promo.classList.add('promo');
    this.promoButton.classList.add('button');
  }

  append() {
    this.promo.append(this.promoText, this.promoButton);
  }

  initPromo(buttonText: string, promo: string) {
    this.promoButton.textContent = buttonText;
    this.promoButton.setAttribute('type', buttonText);
    this.promo.setAttribute('code', promo);
    this.promoText.textContent = `Promo code: ${promo} - 10%`;
  }

  buttonClick(func: (event: Event) => void) {
    this.promoButton.addEventListener('click', func);
  }
}
