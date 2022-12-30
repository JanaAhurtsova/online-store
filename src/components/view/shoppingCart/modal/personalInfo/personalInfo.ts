export default class PersonalInfo {
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

  errorName: HTMLElement;

  errorPhone: HTMLElement;

  errorAddress: HTMLElement;

  errorEmail: HTMLElement;

  constructor() {
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
    this.errorName = document.createElement('div');
    this.errorPhone = document.createElement('div');
    this.errorAddress = document.createElement('div');
    this.errorEmail = document.createElement('div');
    this.createPersonalInfo();
    this.append();
  }

  createPersonalInfo() {
    this.personalInfo.classList.add('personal_information');

    this.personalInfoTitle.classList.add('personal_information__title');
    this.personalInfoTitle.textContent = 'Personal Information';

    this.fullName = this.createInputNode(this.fullName, 'Full Name', 'input', 'full_name');
    this.fullNameContainer = this.appendInput(this.fullNameContainer, 'input__field', this.fullName, this.errorName);

    this.phone = this.createInputNode(this.phone, 'Phone Number', 'input', 'phone');
    this.phoneContainer = this.appendInput(this.phoneContainer, 'input__field', this.phone, this.errorPhone);

    this.address = this.createInputNode(this.address, 'Delivery Address', 'input', 'address');
    this.addressContainer = this.appendInput(this.addressContainer, 'input__field', this.address, this.errorAddress);

    this.email = this.createInputNode(this.email, 'E-mail', 'input', 'email');
    this.emailContainer = this.appendInput(this.emailContainer, 'input__field', this.email, this.errorEmail);
  }

  private createInputNode(node: HTMLInputElement, placeholder: string, ...classes: string[]) {
    node.placeholder = placeholder;
    node.classList.add(...classes);
    return node;
  }

  private appendInput(parent: HTMLElement, className: string, el: HTMLInputElement, error: HTMLElement) {
    parent.className = className;
    error.className = 'error';
    parent.append(el, error);
    return parent;
  }

  append() {
    this.personalInfo.append(
      this.personalInfoTitle,
      this.fullNameContainer,
      this.phoneContainer,
      this.addressContainer,
      this.emailContainer
    );
  }
}
