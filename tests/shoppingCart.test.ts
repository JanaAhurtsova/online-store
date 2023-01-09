import { describe, expect, test } from '@jest/globals';
import ShoppingCart from '../src/components/view/shoppingCart/shoppingCart';

describe('shopping cart module', () => {
  const shoppingCart = new ShoppingCart();

  test('should add class inactive to switcherLeftArrow', () => {
    shoppingCart.arrowStatus('1', '1');
    expect(shoppingCart.productsPage.switcherLeftArrow.classList.contains('inactive')).toBeTruthy();
  });

  test('should remove class inactive to switcherLeftArrow', () => {
    shoppingCart.arrowStatus('2', '1');
    expect(shoppingCart.productsPage.switcherLeftArrow.classList.contains('inactive')).toBeFalsy();
  });
});
