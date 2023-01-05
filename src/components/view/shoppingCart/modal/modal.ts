import PersonalInfo from './personalInfo/personalInfo';
import CreditCard from './creditCard/creditcard';

export default class ModalPayment {
  overlay: HTMLElement;

  modal: HTMLFormElement;

  submit: HTMLInputElement;

  personalInfo: PersonalInfo;

  creditCard: CreditCard;

  constructor() {
    this.overlay = document.createElement('div');
    this.modal = document.createElement('form');
    this.submit = document.createElement('input');
    this.personalInfo = new PersonalInfo();
    this.creditCard = new CreditCard();
    this.init();
    this.append();
  }

  init() {
    this.overlay.classList.add('overlay');
    this.modal.classList.add('modal');
    this.submit.classList.add('button', 'submit');
    this.submit.type = 'submit';
    this.submit.value = `Submit`;
  }

  append() {
    this.modal.append(this.personalInfo.personalInfo, this.creditCard.payment, this.submit);
    this.overlay.append(this.modal);
  }
}
