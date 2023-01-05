export default class Message {
  overlay: HTMLElement;

  constructor() {
    this.overlay = document.createElement('div');
    this.append(this.generateMessage());
  }

  generateMessage(): HTMLDivElement {
    let template = '';
    const message = document.createElement('div');
    message.className = 'wrapper__message';
    template += `<h2 class="message">Order is processed</h2>`;
    message.innerHTML = template;
    return message;
  }

  append(content: HTMLElement) {
    this.overlay.className = 'overlay';
    this.overlay.append(content);
  }
}
