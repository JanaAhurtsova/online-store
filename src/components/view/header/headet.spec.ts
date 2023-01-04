import { describe, expect, test } from '@jest/globals';
import Header from './header';
import { TShoppingCart } from '../../../globalType';

describe('header module', () => {
  const spyAppend = jest.spyOn(Header.prototype, 'append');
  const spyInit = jest.spyOn(Header.prototype, 'init');
  let header: Header;
  let data: TShoppingCart;

  beforeAll(() => {
    header = new Header();

    data = {
      price: 200,
      info: [
        { count: 2, product: 3 },
        { count: 5, product: 4 },
      ],
    };
  });

  test('should init header', () => {
    expect(spyInit).toHaveBeenCalled();
    expect(spyAppend).toHaveBeenCalled();
  });

  test('should change price', () => {
    header.changePrice(data);
    expect(header.sum.textContent).toBe('$200.00');
    expect(header.countText.textContent).toBe('7');
  });
});
