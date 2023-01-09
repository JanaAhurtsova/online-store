import { describe, expect, test } from '@jest/globals';
import Header from '../src/components/view/header/header';
import { TShoppingCart } from '../src/globalType';

describe('header module', () => {
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

  test('should change price', () => {
    header.changePrice(data);
    expect(header.sum.textContent).toBe('$200.00');
    expect(header.countText.textContent).toBe('7');
  });
});
