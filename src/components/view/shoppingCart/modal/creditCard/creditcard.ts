export default class CreditCard {
  payment: HTMLElement;

  paymentTitle: HTMLElement;

  creditCard: HTMLElement;

  paymentSystem: HTMLElement;

  numberContainer: HTMLElement;

  creditCardNumberLabel: HTMLLabelElement;

  creditCardNumber: HTMLInputElement;

  otherData: HTMLElement;

  expirationContainer: HTMLElement;

  expirationLabel: HTMLLabelElement;

  expiration: HTMLInputElement;

  cvvContainer: HTMLElement;

  cvvLabel: HTMLLabelElement;

  cvv: HTMLInputElement;

  errorNumber: HTMLElement;

  errorExpiration: HTMLElement;

  errorCvv: HTMLElement;

  constructor() {
    this.payment = document.createElement('div');
    this.paymentTitle = document.createElement('h2');
    this.creditCard = document.createElement('div');
    this.paymentSystem = document.createElement('div');
    this.numberContainer = document.createElement('div');
    this.creditCardNumberLabel = document.createElement('label');
    this.creditCardNumber = document.createElement('input');
    this.otherData = document.createElement('div');
    this.expirationContainer = document.createElement('div');
    this.expirationLabel = document.createElement('label');
    this.expiration = document.createElement('input');
    this.cvvContainer = document.createElement('div');
    this.cvvLabel = document.createElement('label');
    this.cvv = document.createElement('input');
    this.errorNumber = document.createElement('div');
    this.errorExpiration = document.createElement('div');
    this.errorCvv = document.createElement('div');
    this.createPayment();
    this.append();
  }

  createPayment() {
    this.payment.classList.add('payment');

    this.paymentTitle.classList.add('payment__title');
    this.paymentTitle.textContent = 'Payment';

    this.creditCard.classList.add('credit_card');
    this.paymentSystem.classList.add('payment_system');

    this.creditCardNumberLabel = this.createLabelNode(
      this.creditCardNumberLabel,
      'number',
      'card number',
      'label',
      'card_number__label'
    );
    this.creditCardNumber = this.createInputNode(
      this.creditCardNumber,
      'Card Number',
      'number',
      'input',
      'card_number'
    );
    this.numberContainer = this.appendInput(
      this.numberContainer,
      'input__field',
      this.creditCardNumberLabel,
      this.creditCardNumber,
      this.errorNumber
    );

    this.otherData.classList.add('other_data');

    this.expirationLabel = this.createLabelNode(
      this.expirationLabel,
      'expiration',
      'expiration',
      'label',
      'expiration__label'
    );
    this.expiration = this.createInputNode(this.expiration, 'Expiration', 'expiration', 'input', 'expiration');
    this.expirationContainer = this.appendInput(
      this.expirationContainer,
      'input__field',
      this.expirationLabel,
      this.expiration,
      this.errorExpiration
    );

    this.cvvLabel = this.createLabelNode(this.cvvLabel, 'cvv', 'cvv', 'label', 'cvv__label');
    this.cvv = this.createInputNode(this.cvv, 'CVV', 'cvv', 'input', 'cvv');
    this.cvvContainer = this.appendInput(this.cvvContainer, 'input__field', this.cvvLabel, this.cvv, this.errorCvv);
  }

  private createInputNode(node: HTMLInputElement, placeholder: string, id: string, ...classes: string[]) {
    node.placeholder = placeholder;
    node.id = id;
    node.classList.add(...classes);
    return node;
  }

  private createLabelNode(node: HTMLLabelElement, forAtt: string, text: string, ...classes: string[]) {
    node.setAttribute('for', forAtt);
    node.textContent = text;
    node.classList.add(...classes);
    return node;
  }

  private appendInput(
    parent: HTMLElement,
    className: string,
    label: HTMLLabelElement,
    input: HTMLInputElement,
    error: HTMLElement
  ) {
    parent.className = className;
    error.className = 'error';
    parent.append(label, input, error);
    return parent;
  }

  append() {
    this.otherData.append(this.expirationContainer, this.cvvContainer);
    this.creditCard.append(this.paymentSystem, this.numberContainer, this.otherData);
    this.payment.append(this.paymentTitle, this.creditCard);
  }
}
