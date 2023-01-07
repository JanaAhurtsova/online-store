import { describe, expect, test } from '@jest/globals';
import PersonalInfo from '../src/components/view/shoppingCart/modal/personalInfo/personalInfo';

describe('personal info module', () => {
  let personalInfo = new PersonalInfo();

  test('ensure constructor created the object', () => {
    expect(personalInfo).toBeTruthy();
  });
});