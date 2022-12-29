export default class ModalPayment {
  overlay: HTMLElement;

  modal: HTMLFormElement;

  personalInfo: HTMLElement;

  personalInfoTitle: HTMLElement;

  fullNameContainer: HTMLElement;

  fullName: HTMLInputElement;

  phoneContainer: HTMLElement;

  phone: HTMLInputElement;

  addressContainer: HTMLElement;

  address: HTMLInputElement;

  emailContainer: HTMLElement;

  email: HTMLInputElement;

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

  submit: HTMLInputElement;

  errorName: HTMLElement;

  errorPhone: HTMLElement;

  errorAddress: HTMLElement;

  errorEmail: HTMLElement;

  errorNumber: HTMLElement;

  errorExpiration: HTMLElement;

  errorCvv: HTMLElement;

  constructor() {
    this.overlay = document.createElement('div');
    this.modal = document.createElement('form');
    this.personalInfo = document.createElement('div');
    this.personalInfoTitle = document.createElement('h2');
    this.fullNameContainer = document.createElement('div');
    this.fullName = document.createElement('input');
    this.phoneContainer = document.createElement('div');
    this.phone = document.createElement('input');
    this.addressContainer = document.createElement('div');
    this.address = document.createElement('input');
    this.emailContainer = document.createElement('div');
    this.email = document.createElement('input');
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
    this.submit = document.createElement('input');
    this.errorName = document.createElement('div');
    this.errorPhone = document.createElement('div');
    this.errorAddress = document.createElement('div');
    this.errorEmail = document.createElement('div');
    this.errorNumber = document.createElement('div');
    this.errorExpiration = document.createElement('div');
    this.errorCvv = document.createElement('div');
    this.buildModal();
    this.append();
  }

  public buildModal() {
    this.overlay.classList.add('overlay__modal');
    this.modal.classList.add('modal');

    this.submit.classList.add('button', 'submit');
    this.submit.type = 'submit';
    this.submit.value = `Submit`;
  }

  private createPersonalInfo() {
    this.personalInfo.classList.add('personal_information');

    this.personalInfoTitle.classList.add('personal_information__title');
    this.personalInfoTitle.textContent = 'Personal Information';

    this.fullName = this.createInputNode(this.fullName, 'Full Name', '', 'input', 'full_name');
    this.fullNameContainer = this.appendInput(this.fullNameContainer, 'input__field', this.fullName);

    this.phone = this.createInputNode(this.phone, 'Phone Number', '', 'input', 'phone');
    this.phoneContainer = this.appendInput(this.phoneContainer, 'input__field', this.phone);

    this.address = this.createInputNode(this.address, 'Delivery Address', '', 'input', 'address');
    this.addressContainer = this.appendInput(this.addressContainer, 'input__field', this.address);

    this.email = this.createInputNode(this.email, 'E-mail', '', 'input', 'email');
    this.emailContainer = this.appendInput(this.emailContainer, 'input__field', this.email);

    this.personalInfo.append(
      this.personalInfoTitle,
      this.fullNameContainer,
      this.phoneContainer,
      this.addressContainer,
      this.emailContainer
    );

    return this.personalInfo;
  }

  private createPayment() {
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
    this.creditCardNumber = this.createInputNode(this.creditCardNumber, '', 'number', 'input', 'card_number');
    this.numberContainer = this.appendInput(
      this.numberContainer,
      'input__field',
      this.creditCardNumberLabel,
      this.creditCardNumber
    );

    this.otherData.classList.add('other_data');

    this.expirationLabel = this.createLabelNode(
      this.expirationLabel,
      'expiration',
      'expiration',
      'label',
      'expiration__label'
    );
    this.expiration = this.createInputNode(this.expiration, '', 'expiration', 'input', 'expiration');
    this.expirationContainer = this.appendInput(
      this.expirationContainer,
      'input__field',
      this.expirationLabel,
      this.expiration
    );

    this.cvvLabel = this.createLabelNode(this.cvvLabel, 'cvv', 'cvv', 'label', 'cvv__label');
    this.cvv = this.createInputNode(this.cvv, '', 'cvv', 'input', 'cvv');
    this.cvvContainer = this.appendInput(this.cvvContainer, 'input__field', this.cvvLabel, this.cvv);

    this.otherData.append(this.expirationContainer, this.cvvContainer);
    this.creditCard.append(this.paymentSystem, this.numberContainer, this.otherData);
    this.payment.append(this.paymentTitle, this.creditCard);

    return this.payment;
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

  private appendInput(parent: HTMLElement, className: string, ...el: Array<HTMLInputElement | HTMLLabelElement>) {
    parent.className = className;
    parent.append(...el);
    return parent;
  }

  public append() {
    this.modal.append(this.createPersonalInfo(), this.createPayment(), this.submit);
    this.overlay.append(this.modal);
  }

  createMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'wrapper__message';
    const message = document.createElement('h2');
    message.className = 'message';
    message.textContent = 'Order is processed';
    messageContainer.append(message);
    return messageContainer;
  }
}
