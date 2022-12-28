import { TProduct } from '../../../globalType';

export default class Rating {
  rating: HTMLDivElement;

  ratingBody: HTMLDivElement;

  ratingBack: HTMLDivElement;

  ratingText: HTMLHeadingElement;

  constructor() {
    this.rating = document.createElement('div');
    this.ratingText = document.createElement('h4');
    this.ratingBody = document.createElement('div');
    this.ratingBack = document.createElement('div');
    this.init();
    this.append();
  }

  init() {
    this.ratingText.classList.add('rating__text');
    this.ratingBody.classList.add('rating__body');
    this.ratingBack.classList.add('rating__back');
  }

  append() {
    this.ratingBody.append(this.ratingBack);
    this.rating.append(this.ratingText);
    this.rating.append(this.ratingBody);
  }

  initRating(productData: TProduct) {
    this.ratingBack.style.width = `${productData.rating * 20}%`;
    this.ratingText.textContent = `Rating ${productData.rating}/5`;
  }
}
