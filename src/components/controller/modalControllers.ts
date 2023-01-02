import ModalPayment from '../view/shoppingCart/modal/modal';
import Message from '../view/shoppingCart/modal/message';
import { IModalController } from '../../globalType';

const mastercard: string = require('../../assets/svg/mastercard.svg');
const visa: string = require('../../assets/svg/visa.svg');
const maestro: string = require('../../assets/svg/Maestro.svg');
const noLogo: string = require('../../assets/svg/nologo.svg');

export default class ModalControllers implements IModalController {
  modal: ModalPayment;

  message: Message;

  constructor() {
    this.modal = new ModalPayment();
    this.message = new Message();
  }

  closeModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('overlay__modal')) {
      document.querySelector('.overlay__modal')?.remove();
    }
  }

  setPaymentSystem(event: Event, el: HTMLElement) {
    const target = event.target as HTMLInputElement;
    if (target.value.startsWith('5')) {
      el.style.backgroundImage = `url(${mastercard})`;
    } else if (target.value.startsWith('4')) {
      el.style.backgroundImage = `url(${visa})`;
    } else if (target.value.startsWith('3')) {
      el.style.backgroundImage = `url(${maestro})`;
    } else {
      el.style.backgroundImage = `url(${noLogo})`;
    }
    this.cardSpace(event);
  }

  private cardSpace(event: Event) {
    const target = event.target as HTMLInputElement;
    let cardCode = target.value.replace(/[^\d]/g, '').substring(0, 16);
    cardCode = (cardCode !== '' ? cardCode.match(/.{1,4}/g)?.join(' ') : '') as string;
    target.value = cardCode;
  }

  expirationSlash(event: Event) {
    const target = event.target as HTMLInputElement;
    let date = target.value.replace(/[^\d]/g, '').substring(0, 4);
    date = (date !== '' ? date.match(/.{1,2}/g)?.join('/') : '') as string;
    target.value = date;
  }

  enterCvv(event: Event) {
    const target = event.target as HTMLInputElement;
    const cvv = target.value.replace(/[^\d]/g, '').substring(0, 3);
    target.value = cvv;
  }

  private success(parent: HTMLElement) {
    if (parent.contains(parent.querySelector('.error'))) {
      (parent.lastChild as HTMLElement).innerText = '';
    }
  }

  private generateError(error: HTMLElement, text: string): HTMLElement {
    error.innerHTML = text;
    return error;
  }

  isValidInput(input: HTMLInputElement): boolean {
    let valid = false;
    const modal = document.querySelector('.modal') as HTMLFormElement;
    const fields = modal.querySelectorAll('.input');
    const errors = modal.querySelectorAll('.error');
    const regEl = [
      /^[^\s]{3,}( [^\s]{3,})+$/,
      /^\+(\d{9})/,
      /^[^\s]{5,}( [^\s]{5,})( [^\s]{5,})+$/,
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/,
      /[0-9]{2}\/{0,1}[0-9]{2}/,
      /[0-9]{3}/,
    ] as RegExp[];
    for (let i = 0; i < fields.length; i += 1) {
      if (!fields[i].value.trim()) {
        const error = this.generateError(errors[i], `${fields[i].placeholder} cannot be blank`);
        fields[i].parentElement?.append(error);
        valid = false;
      } else if (!regEl[i].exec(fields[i].value)) {
        const error = this.generateError(errors[i], `Invalid ${fields[i].placeholder}`);
        fields[i].parentElement?.append(error);
        valid = false;
      } else {
        this.success(fields[i].parentElement as HTMLElement);
        valid = true;
      }
    }
    this.isExpirationValid(input);
    return valid;
  }

  isExpirationValid(input: HTMLInputElement): boolean {
    let valid = true;
    if (input.value.substring(0, 2) === '00' || +input.value.substring(0, 2) > 12) {
      const error = this.generateError(input.nextElementSibling as HTMLElement, 'Invalid Month');
      (input.parentElement as HTMLElement).append(error);
      valid = false;
    }

    if (+input.value.substring(2, 5) < 23) {
      const error = this.generateError(input.nextElementSibling as HTMLElement, 'Invalid Year');
      (input.parentElement as HTMLElement).append(error);
      valid = false;
    }

    return valid;
  }

  isValidForm(input: HTMLInputElement) {
    if (this.isValidInput(input)) {
      const overlay = document.querySelector('.overlay__modal') as HTMLElement;
      overlay.innerHTML = '';
      overlay.append(this.message.generateMessage());
      setTimeout(() => {}, 3000);
    }
  }
}
