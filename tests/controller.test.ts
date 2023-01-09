import { describe } from '@jest/globals';
import Controller from '../src/components/controller/controller';

describe('controller module', () => {
  let controller: any;

  beforeEach(() => {
    controller = new Controller();
  });

  describe('getQueryString method', () => {

    test('should parse query parameters', () => {
      controller.query = [{ type: 'test', name: ['lom', '12'] }];
      const result = controller.getQueryString();
      expect(result).toBe('?test=lom|12');
    });

    test('should not add parameters if name is empty', () => {
      controller.query = [{ type: 'test', name: [] }];
      const result = controller.getQueryString();
      expect(result).toBe('');
    });
  });

  describe('getCartQueryString method', () => {

    test('should return query string for cart', () => {
      controller.query = [{ type: 'cart', name: [''] }];
      const result = controller.getCartQueryString();
      expect(result).toBe('cart');
    });

    test('should parse query parameters', () => {
      controller.query = [{ type: 'cart', name: [''] }, { type: 'limit', name: ['2'] }];
      const result = controller.getCartQueryString();
      expect(result).toBe('cart?limit=2');
    });
  });

  describe('resetFilter method', () => {

    test('should remove parameters from query', () => {
      controller.query = [{ type: 'cart', name: [''] }];
      controller.resetFilter();;
      expect(controller.query).toEqual([]);
    });
  });

  describe('openShoppingCart method', () => {
    test('should be exist', () => {
      const spy = jest.spyOn(Controller.prototype, 'openShoppingCart');
      expect(spy).toBeDefined();
      expect(spy).toHaveBeenCalled();
      expect(spy).not.toBeNull();
    })
  })
});
