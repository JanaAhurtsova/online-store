export default class Message {
  public overlay: HTMLElement;

  constructor() {
    this.overlay = document.createElement('div');
    this.append(this.generateMessage());
  }

  private generateMessage(): HTMLDivElement {
    let template = '';
    const message = document.createElement('div');
    message.className = 'wrapper__message';
    template += `<h2 class="message">Order is processed</h2>`;
    message.innerHTML = template;
    return message;
  }

  private append(content: HTMLElement) {
    this.overlay.className = 'overlay';
    this.overlay.append(content);
  }
}
