import { describe, expect, test } from '@jest/globals';
import CreditCard from '../src/components/view/shoppingCart/modal/creditCard/creditcard';

describe('credit card module', () => {
  const creditCard = new CreditCard();

  test('ensure constructor created the object', () => {
    expect(creditCard).toBeTruthy();
  });
});
