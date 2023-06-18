import { TShoppingCart } from '../../../../globalType';
import Promo from './promo';

export default class Summary {
  public summary: HTMLElement;

  private title: HTMLElement;

  private product: HTMLElement;

  private price: HTMLElement;

  public buyButton: HTMLButtonElement;

  public promoInput: HTMLInputElement;

  private promoInputSearch: HTMLElement;

  private promoText: HTMLElement;

  private promoCode: string[];

  private selectedPromo: HTMLElement;

  private promo: Promo;

  private promoMas: string[];

  private selectedPromoTitle: HTMLElement;

  public finalPrice: HTMLElement;

  private priceData: number;

  constructor() {
    this.priceData = 0;
    this.summary = this.createDomNode('div', 'summary');
    this.title = this.createDomNode('h2', 'summary__title', 'Summary');
    this.product = this.createDomNode('h3', 'summary__product');
    this.price = this.createDomNode('h3', 'summary__price');
    this.promoInput = this.createDomNode('input', 'promo__input') as HTMLInputElement;
    this.promoInputSearch = this.createDomNode('div', 'promo__search');
    this.promoText = this.createDomNode('p', 'discount', `Promo : 'RS', 'EPM'`);
    this.promo = new Promo();
    this.promoMas = [];
    this.finalPrice = this.createDomNode('h3', 'summary__final-price');
    this.selectedPromo = this.createDomNode('div', 'summary__selected-promo');
    this.selectedPromoTitle = this.createDomNode('h3', 'selected-promo__title');
    this.buyButton = this.createDomNode('button', 'button', 'Buy now') as HTMLButtonElement;
    this.promoCode = ['RS', 'EPM'];
    this.append();
    this.init();
  }

  private init() {
    this.selectedPromo.classList.add('invisible');
    this.promoInput.setAttribute('placeholder', 'Enter promo code');
    this.promoInput.addEventListener('input', this.enterPromo.bind(this));
    this.promo.addButtonClickHandler(this.addPromo.bind(this));
  }

  public addPromo(event: Event) {
    const target = event.target as HTMLElement;
    const info = target.parentElement?.getAttribute('code');
    if (info) {
      this.promoMas.push(info);
      this.promoInput.value = '';
      this.promo.promo.classList.add('invisible');
      this.selectedPromo.classList.remove('invisible');
      this.shopPromo();
    }
  }

  public dropPromo(event: Event) {
    const target = event.target as HTMLElement;
    const info = target.parentElement?.getAttribute('code');
    if (info) {
      this.promoMas = this.promoMas.filter((item) => item !== info);
      this.shopPromo();
    }
  }

  public shopPromo() {
    if (this.promoMas.length !== 0) {
      this.selectedPromo.textContent = '';
      this.selectedPromo.append(this.finalPrice, this.selectedPromoTitle);
      this.selectedPromoTitle.textContent = 'Applied codes';
      this.price.classList.add('old-price');
      this.finalPrice.textContent = `$ ${((this.priceData / 10) * (10 - this.promoMas.length)).toFixed(2)}`;
      this.promoMas.forEach((item) => {
        const promo = new Promo();
        promo.initPromo('drop', item);
        promo.addButtonClickHandler(this.dropPromo.bind(this));
        this.selectedPromo.append(promo.promo);
      });
    } else {
      this.price.classList.remove('old-price');
      this.selectedPromo.classList.add('invisible');
    }
  }

  public enterPromo(event: Event) {
    const target = event.target as HTMLInputElement;
    const code = target.value.toUpperCase();
    if (this.promoCode.includes(code)) {
      if (this.promoMas.includes(code)) {
        this.promo.promoButton.classList.add('invisible');
      } else {
        this.promo.promoButton.classList.remove('invisible');
      }
      this.promo.promo.classList.remove('invisible');
      this.promo.initPromo('add', code);
    } else {
      this.promo.promo.classList.add('invisible');
    }
  }

  private append() {
    this.promoInputSearch.append(this.promoInput);
    this.summary.append(
      this.title,
      this.product,
      this.price,
      this.selectedPromo,
      this.promoInputSearch,
      this.promoText,
      this.promo.promo,
      this.buyButton
    );
  }

  public initSummary(data: TShoppingCart) {
    this.priceData = data.price;
    this.price.textContent = `Total: $ ${data.price}`;
    this.product.textContent = `Products: ${data.info.reduce((acc, item) => acc + item.count, 0)}`;
    this.shopPromo();
  }

  private createDomNode(element: string, classEl: string, text?: string) {
    const node = document.createElement(element);
    node.classList.add(classEl);
    if (text) {
      node.textContent = text;
    }
    return node;
  }
}
