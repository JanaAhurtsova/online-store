export default class CreditCard {
  public payment: HTMLElement;

  private paymentTitle: HTMLElement;

  private creditCard: HTMLElement;

  public paymentSystem: HTMLElement;

  public numberContainer: HTMLElement;

  private creditCardNumberLabel: HTMLLabelElement;

  public creditCardNumber: HTMLInputElement;

  private otherData: HTMLElement;

  private expirationContainer: HTMLElement;

  private expirationLabel: HTMLLabelElement;

  public expiration: HTMLInputElement;

  private cvvContainer: HTMLElement;

  private cvvLabel: HTMLLabelElement;

  public cvv: HTMLInputElement;

  public readonly errorNumber: HTMLElement;

  public readonly errorExpiration: HTMLElement;

  public readonly errorCvv: HTMLElement;

  constructor() {
    this.payment = this.createElement('div', 'payment');
    this.paymentTitle = this.createElement('h2', 'payment__title');
    this.creditCard = this.createElement('div', 'credit_card');
    this.paymentSystem = this.createElement('div', 'payment_system');
    this.numberContainer = this.createElement('div', 'input__field');
    this.creditCardNumberLabel = this.createLabelNode('number', 'card number', 'label', 'card_number__label');
    this.creditCardNumber = this.createInputNode('Card Number', 'number', 'input', 'card_number');
    this.otherData = this.createElement('div', 'other_data');
    this.expirationContainer = this.createElement('div', 'input__field');
    this.expirationLabel = this.createLabelNode('expiration', 'expiration', 'label', 'expiration__label');
    this.expiration = this.createInputNode('Expiration', 'expiration', 'input', 'expiration');
    this.cvvContainer = this.createElement('div', 'input__field');
    this.cvvLabel = this.createLabelNode('cvv', 'cvv', 'label', 'cvv__label');
    this.cvv = this.createInputNode('CVV', 'cvv', 'input', 'cvv');
    this.errorNumber = this.createElement('div', 'error');
    this.errorExpiration = this.createElement('div', 'error');
    this.errorCvv = this.createElement('div', 'error');
    this.init();
    this.append();
  }

  private init() {
    this.paymentTitle.textContent = 'Payment';
  }

  private append() {
    this.numberContainer.append(this.creditCardNumberLabel, this.creditCardNumber, this.errorNumber);
    this.expirationContainer.append(this.expirationLabel, this.expiration, this.errorExpiration);
    this.cvvContainer.append(this.cvvLabel, this.cvv, this.errorCvv);
    this.otherData.append(this.expirationContainer, this.cvvContainer);
    this.creditCard.append(this.paymentSystem, this.numberContainer, this.otherData);
    this.payment.append(this.paymentTitle, this.creditCard);
  }

  private createElement(element: string, classElement: string) {
    const node = document.createElement(element);
    node.className = classElement;
    return node;
  }

  private createInputNode(placeholder: string, id: string, ...classes: string[]): HTMLInputElement {
    const node = document.createElement('input');
    node.placeholder = placeholder;
    node.id = id;
    node.classList.add(...classes);
    return node;
  }

  private createLabelNode(forAtt: string, text: string, ...classes: string[]): HTMLLabelElement {
    const node = document.createElement('label');
    node.setAttribute('for', forAtt);
    node.textContent = text;
    node.classList.add(...classes);
    return node;
  }
}
