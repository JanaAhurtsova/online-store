import ModalPayment from '../view/shoppingCart/modal/modal';
import Message from '../view/shoppingCart/modal/message';

const mastercard: string = require('../../assets/svg/mastercard.svg');
const visa: string = require('../../assets/svg/visa.svg');
const maestro: string = require('../../assets/svg/Maestro.svg');
const noLogo: string = require('../../assets/svg/nologo.svg');

export default class ModalControllers {
  modal: ModalPayment;

  message: Message;

  constructor() {
    this.modal = new ModalPayment();
    this.message = new Message();
  }

  closeModal(e: Event) {
    const target = e.target as HTMLElement;
    if (target?.classList.contains('overlay__modal')) {
      document.querySelector('.overlay__modal')?.remove();
    }
  }

  private isRequired(value: string) {
    if (value === '') {
      return false;
    }
    return true;
  }

  private success(parent: HTMLElement) {
    if (parent.contains(parent.querySelector('.error'))) {
      parent.removeChild(parent.lastChild as HTMLElement);
    }
  }

  private generateError(error: HTMLElement, text: string) {
    error.className = 'error';
    error.innerHTML = text;
    return error;
  }

  isValidInput(el: HTMLInputElement, regEl: RegExp, errorEl: HTMLElement, text: string, parent: HTMLElement) {
    let valid = false;
    if (!this.isRequired(el.value.trim())) {
      const error = this.generateError(errorEl, `${text} cannot be blank`);
      parent.append(error);
      valid = false;
    } else if (!regEl.exec(el.value)) {
      const error = this.generateError(errorEl, `Invalid ${text}`);
      parent.append(error);
      valid = false;
    } else {
      this.success(parent);
      valid = true;
    }
    return valid;
  }

  setPaymentSystem() {
    if (this.modal.creditCardNumber.value.startsWith('5')) {
      this.modal.paymentSystem.style.backgroundImage = `url(${mastercard})`;
    } else if (this.modal.creditCardNumber.value.startsWith('4')) {
      this.modal.paymentSystem.style.backgroundImage = `url(${visa})`;
    } else if (this.modal.creditCardNumber.value.startsWith('3')) {
      this.modal.paymentSystem.style.backgroundImage = `url(${maestro})`;
    } else {
      this.modal.paymentSystem.style.backgroundImage = `url(${noLogo})`;
    }
    this.cardSpace();
  }

  private cardSpace() {
    let cardCode = this.modal.creditCardNumber.value.replace(/[^\d]/g, '').substring(0, 16);
    cardCode = (cardCode !== '' ? cardCode.match(/.{1,4}/g)?.join(' ') : '') as string;
    this.modal.creditCardNumber.value = cardCode;
  }

  expirationSlash() {
    let date = this.modal.expiration.value.replace(/[^\d]/g, '').substring(0, 4);
    date = (date !== '' ? date.match(/.{1,2}/g)?.join('/') : '') as string;
    this.modal.expiration.value = date;
  }

  isExpirationValid() {
    let valid = false;
    if (this.modal.expiration.value.substring(0, 2) === '00' || +this.modal.expiration.value.substring(0, 2) > 12) {
      const error = this.generateError(this.modal.errorExpiration, 'Invalid Expiration Month');
      this.modal.expirationContainer.append(error);
      valid = false;
    } else if (+this.modal.expiration.value.substring(2, 4) < 23) {
      const error = this.generateError(this.modal.errorExpiration, 'Invalid Expiration Year');
      this.modal.expirationContainer.append(error);
      valid = false;
    } else {
      this.isValidInput(
        this.modal.expiration,
        /[0-9]{2}\/{0,1}[0-9]{2}/,
        this.modal.errorExpiration,
        'Expiration',
        this.modal.expirationContainer
      );
      valid = true;
    }
    return valid;
  }

  enterCvv() {
    const cvv = this.modal.cvv.value.replace(/[^\d]/g, '').substring(0, 3);
    this.modal.cvv.value = cvv;
  }

  isValidForm() {
    if (
      this.isValidInput(
        this.modal.fullName,
        // eslint-disable-next-line
        /^[^\s]{3,}( [^\s]{3,})+$/,
        this.modal.errorName,
        'Full Name',
        this.modal.fullNameContainer
      ) &&
      this.isValidInput(this.modal.phone, /^\+(\d{9})/, this.modal.errorPhone, 'Phone', this.modal.phoneContainer) &&
      this.isValidInput(
        this.modal.address,
        // eslint-disable-next-line
        /^[^\s]{5,}( [^\s]{5,})( [^\s]{5,})+$/,
        this.modal.errorAddress,
        'Delivery Address',
        this.modal.addressContainer
      ) &&
      this.isValidInput(
        this.modal.email,
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        this.modal.errorEmail,
        'Email',
        this.modal.emailContainer
      ) &&
      this.isValidInput(
        this.modal.creditCardNumber,
        /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/,
        this.modal.errorNumber,
        'Card Number',
        this.modal.numberContainer
      ) &&
      this.isExpirationValid() &&
      this.isValidInput(this.modal.cvv, /[0-9]{3}/, this.modal.errorCvv, 'Cvv', this.modal.cvvContainer)
    ) {
      (document.querySelector('.cart') as HTMLElement).innerHTML = '';
      this.modal.overlay.innerHTML = '';
      this.modal.overlay.append(this.message.generateMessage());
      setTimeout(() => {}, 3000);
    }
  }
}
