import { TProduct } from '../../../globalType';

export default class Rating {
  public rating: HTMLElement;

  public ratingBody: HTMLElement;

  public ratingBack: HTMLElement;

  public readonly ratingText: HTMLElement;

  constructor() {
    this.rating = this.createDomNode('div', 'wrapper__rating');
    this.ratingText = this.createDomNode('h4', 'rating__text');
    this.ratingBody = this.createDomNode('div', 'rating__body');
    this.ratingBack = this.createDomNode('div', 'rating__back');
    this.append();
  }

  private append() {
    this.ratingBody.append(this.ratingBack);
    this.rating.append(this.ratingText);
    this.rating.append(this.ratingBody);
  }

  public initRating(productData: TProduct) {
    this.ratingBack.style.width = `${productData.rating * 20}%`;
    this.ratingText.textContent = `Rating ${productData.rating}/5`;
  }

  private createDomNode(element: string, classEl: string) {
    const node = document.createElement(element);
    node.classList.add(classEl);
    return node;
  }
}
