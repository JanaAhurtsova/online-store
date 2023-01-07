export default class PersonalInfo {
  public personalInfo: HTMLElement;

  public personalInfoTitle: HTMLElement;

  private fullNameContainer: HTMLElement;

  public fullName: HTMLInputElement;

  private phoneContainer: HTMLElement;

  public phone: HTMLInputElement;

  private addressContainer: HTMLElement;

  public address: HTMLInputElement;

  private emailContainer: HTMLElement;

  public email: HTMLInputElement;

  public readonly errorName: HTMLElement;

  public readonly errorPhone: HTMLElement;

  public readonly errorAddress: HTMLElement;

  public readonly errorEmail: HTMLElement;

  constructor() {
    this.personalInfo = this.createElement('div', 'personal_information');
    this.personalInfoTitle = this.createElement('h2', 'personal_information__title');
    this.fullNameContainer = this.createElement('div', 'input__field');
    this.phoneContainer = this.createElement('div', 'input__field');
    this.addressContainer = this.createElement('div', 'input__field');
    this.emailContainer = this.createElement('div', 'input__field');
    this.fullName = this.createInputNode('Full Name', 'input', 'full_name');
    this.phone = this.createInputNode('Phone Number', 'input', 'phone');
    this.address = this.createInputNode('Delivery Address', 'input', 'address');
    this.email = this.createInputNode('E-mail', 'input', 'email');
    this.errorName = this.createElement('div', 'error');
    this.errorPhone = this.createElement('div', 'error');
    this.errorAddress = this.createElement('div', 'error');
    this.errorEmail = this.createElement('div', 'error');
    this.init();
    this.append();
  }

  private init() {
    this.personalInfoTitle.textContent = 'Personal Information';
  }

  private append() {
    this.fullNameContainer.append(this.fullName, this.errorName);
    this.phoneContainer.append(this.phone, this.errorPhone);
    this.addressContainer.append(this.address, this.errorAddress);
    this.emailContainer.append(this.email, this.errorEmail);
    this.personalInfo.append(
      this.personalInfoTitle,
      this.fullNameContainer,
      this.phoneContainer,
      this.addressContainer,
      this.emailContainer
    );
  }

  private createElement(element: string, classElement: string) {
    const node = document.createElement(element);
    node.className = classElement;
    return node;
  }

  private createInputNode(placeholder: string, ...classes: string[]): HTMLInputElement {
    const node = document.createElement('input');
    node.placeholder = placeholder;
    node.classList.add(...classes);
    return node;
  }
}
