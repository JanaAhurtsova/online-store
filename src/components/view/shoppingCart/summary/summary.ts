import { TShoppingCart } from '../../../../globalType';
import SearchFilter from '../../store/sidebar/searchFilter/searchFilter';
import Promo from './promo';

export default class Summary {
  summary: HTMLDivElement;

  title: HTMLHeadingElement;

  product: HTMLHeadingElement;

  price: HTMLHeadingElement;

  buyButton: HTMLButtonElement;

  promoInput: SearchFilter;

  promoText: HTMLParagraphElement;

  promoCode: string[];

  selectedPromo: HTMLDivElement;

  promo: Promo;

  promoMas: string[];

  selectedPromoTitle: HTMLParagraphElement;

  finalPrice: HTMLHeadingElement;

  priceData: number;

  constructor() {
    this.priceData = 0;
    this.summary = document.createElement('div');
    this.title = document.createElement('h2');
    this.product = document.createElement('h3');
    this.price = document.createElement('h3');
    this.promoInput = new SearchFilter();
    this.promoText = document.createElement('p');
    this.promo = new Promo();
    this.promoMas = [];
    this.finalPrice = document.createElement('h3');
    this.selectedPromo = document.createElement('div');
    this.selectedPromoTitle = document.createElement('p');
    this.buyButton = document.createElement('button');
    this.promoCode = ['RS', 'EPM'];
    this.append();
    this.init();
  }

  init() {
    this.title.textContent = 'Summary';
    this.buyButton.textContent = 'Buy Now';
    this.buyButton.classList.add('button');
    this.promoText.textContent = `Promo : 'RS', 'EPM'`;
    this.promoInput.input.setAttribute('placeholder', 'Enter promo code');
    this.promo.promo.classList.add('invisible');
    this.selectedPromo.classList.add('invisible');
    this.promoInput.input.addEventListener('input', this.enterPromo.bind(this));
    this.promo.buttonClick(this.addPromo.bind(this));
  }

  addPromo(event: Event) {
    const target = event.target as HTMLElement;
    const info = target.parentElement?.getAttribute('code');
    if (info) {
      this.promoMas.push(info);
      this.promoInput.input.value = '';
      this.promo.promo.classList.add('invisible');
      this.selectedPromo.classList.remove('invisible');
      this.shopPromo();
    }
  }

  dropPromo(event: Event) {
    const target = event.target as HTMLElement;
    const info = target.parentElement?.getAttribute('code');
    if (info) {
      this.promoMas = this.promoMas.filter((item) => item !== info);
      this.shopPromo();
    }
  }

  shopPromo() {
    if (this.promoMas.length !== 0) {
      this.selectedPromo.textContent = '';
      this.selectedPromo.append(this.finalPrice, this.selectedPromoTitle);
      this.selectedPromoTitle.textContent = 'Applied codes';
      this.price.classList.add('old-price');
      this.finalPrice.textContent = `$ ${((this.priceData / 10) * (10 - this.promoMas.length)).toFixed(2)}`;
      this.promoMas.forEach((item) => {
        const promo = new Promo();
        promo.initPromo('drop', item);
        promo.buttonClick(this.dropPromo.bind(this));
        this.selectedPromo.append(promo.promo);
      });
    } else {
      this.price.classList.remove('old-price');
      this.selectedPromo.classList.add('invisible');
    }
  }

  enterPromo(event: Event) {
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

  append() {
    this.summary.append(
      this.title,
      this.product,
      this.price,
      this.selectedPromo,
      this.promoInput.search,
      this.promo.promo,
      this.promoText,
      this.buyButton
    );
  }

  initSummary(data: TShoppingCart) {
    this.priceData = data.price;
    this.price.textContent = `Total: $ ${data.price}`;
    this.product.textContent = `Products: ${data.info.reduce((acc, item) => acc + item.count, 0)}`;
  }
}
