import { describe, expect, test } from '@jest/globals';
import CreditCard from '../src/components/view/shoppingCart/modal/creditCard/creditcard';

describe('credit card module', () => {
  let creditCard: CreditCard;
  const spyAppend = jest.spyOn(CreditCard.prototype, 'append');
  const spyInit = jest.spyOn(CreditCard.prototype, 'init');

  beforeEach(() => {
    creditCard = new CreditCard();
  });

  test('should be defined', () => {
    expect(creditCard.init).toBeDefined();
    expect(creditCard.append).not.toBeUndefined();
  });

  test('should init credit card', () => {
    expect(spyInit).toHaveBeenCalled();
    expect(spyAppend).toHaveBeenCalled();
  });
});
