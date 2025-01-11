// Функция отображает условия, при которых необходимо скрывать/показывать/обновлять связные поля

import { canArrayValues, canObjectValues } from '../../../helpers/functions';

export const changeFieldOnRules = ({ userData, name }) => {
  if (canArrayValues(userData) || canObjectValues(userData)) {
    if (name === '[options][region]') {
      // Если в поле "Страна" выбрана не Россия (value = 643), то поле скрываем
      if (userData['[options][country]'] !== '643') {
        return false;
      }
    }
  }

  return true;
};
