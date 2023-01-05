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
    if (target.classList.contains('overlay')) {
      document.querySelector('.overlay')?.remove();
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

  isValidInput(modal: HTMLFormElement, input: HTMLInputElement): boolean {
    let valid = true;
    const fields = modal.querySelectorAll('.input') as NodeListOf<HTMLInputElement>;
    const errors = modal.querySelectorAll('.error') as NodeListOf<HTMLElement>;
    const regEl = [
      /^[a-z-]{3,}( [a-z-]{3,})+$/i, // full name
      /^\+(\d{9})/, // phone
      /^[\w,-/]{5,}( [\w,-/]{5,})( [\w,-/]{5,})+$/i, // address
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // e-mail
      /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/, // card
      /[0-9]{2}\/{0,1}[0-9]{2}/, // expiration
      /[0-9]{3}/, // cvv
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
      }
    }
    this.isExpirationValid(input);
    return valid;
  }

  isExpirationValid(input: HTMLInputElement): boolean {
    if (!input.value.trim()) {
      const error = this.generateError(input.nextElementSibling as HTMLElement, 'Expiration cannot be blank');
      (input.parentElement as HTMLElement).append(error);
      return false;
    }

    if (input.value.substring(0, 2) === '00' || +input.value.substring(0, 2) > 12) {
      const error = this.generateError(input.nextElementSibling as HTMLElement, 'Invalid Month');
      (input.parentElement as HTMLElement).append(error);
      return false;
    }

    if (+input.value.substring(3, 5) < 23) {
      const error = this.generateError(input.nextElementSibling as HTMLElement, 'Invalid Year');
      (input.parentElement as HTMLElement).append(error);
      return false;
    }

    return true;
  }

  ordering(modal: HTMLFormElement, input: HTMLInputElement, openStore: () => void) {
    if (this.isValidInput(modal, input)) {
      document.body.lastChild?.remove();
      document.body.append(this.message.overlay);
      localStorage.removeItem('prod');
      setTimeout(() => {
        document.body.lastChild?.remove();
        openStore();
      }, 3000);
    }
  }
}
