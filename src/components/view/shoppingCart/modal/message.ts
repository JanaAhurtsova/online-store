export default class Message {
  generateMessage(): HTMLDivElement {
    let template = '';
    const message = document.createElement('div');
    message.className = 'wrapper__message';
    template += `<h2 class="message">Order is processed</h2>`;
    message.innerHTML = template;
    return message;
  }
}
