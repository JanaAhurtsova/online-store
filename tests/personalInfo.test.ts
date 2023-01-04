import { describe, expect, test } from '@jest/globals';
import PersonalInfo from '../src/components/view/shoppingCart/modal/personalInfo/personalInfo';

describe('personal info module', () => {
  let personalInfo: PersonalInfo;
  const spyAppend = jest.spyOn(PersonalInfo.prototype, 'append');
  const spyInit = jest.spyOn(PersonalInfo.prototype, 'init');

  beforeEach(() => {
    personalInfo = new PersonalInfo();
  });

  test('should be defined', () => {
    expect(personalInfo.init).toBeDefined();
    expect(personalInfo.append).not.toBeUndefined();
  });

  test('should init credit card', () => {
    expect(spyInit).toHaveBeenCalled();
    expect(spyAppend).toHaveBeenCalled();
  });
});