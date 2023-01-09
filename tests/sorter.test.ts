import { describe, expect, test } from '@jest/globals';
import Sorter from '../src/components/view/store/sorter/sorter';

describe('sorter module', () => {
  const creditCard = new Sorter();

  test('should assign a value to sorter', ()=> {
    creditCard.reloadPage([
      {
        type: 'sort',
        name: ['phl'],
      },
    ]);
    expect(creditCard.sorter.value).toBe('phl');
  });

  test('should assign default to sorter if parameter is empty', ()=> {
    creditCard.reloadPage([]);
    expect(creditCard.sorter.value).toBe('default');
  });

  test('should assign default to sorter if parameter type does not have sort', ()=> {
    creditCard.reloadPage([{
      type: 'data',
      name: ['phl'],
    }]);
    expect(creditCard.sorter.value).toBe('default');
  });
});
