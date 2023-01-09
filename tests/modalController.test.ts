import { describe, expect, test } from '@jest/globals';
import ModalControllers from '../src/components/controller/modalControllers';

describe('modalControllers module', () => {
  let modalControllers: ModalControllers;

  beforeAll(() => {
    modalControllers = new ModalControllers();
  });

  test('check modalControllers able close modal window', () => {
    // document.body.innerHTML = `
    // <div class="overlay">
    //   <div class="modal__test"></div>
    // </div>
    // `;
    // const overlayTest = document.querySelector('.overlay') as HTMLElement;
    const spy = jest.spyOn(ModalControllers.prototype, 'closeModal');
    // overlayTest.addEventListener('click', modalControllers.closeModal);
    // overlayTest.click();
    expect(spy).toBeCalled();
    expect(spy).not.toBeNull();
  });
});
