import { constants } from '../../../helpers/constants';
import { checkDigitInn, errorBuilder } from './helpers';
import {
  canArrayValues,
  convertBooleanValue,
} from '../../../helpers/functions';
import { changeFieldOnTarget } from './changeFieldOnTarget';

interface IValidationParams {
  value: any;
  type: string;
  params?: {
    max?: number;
    min?: number;
    minSymbols?: number;
    maxSymbols?: number;
    required: boolean;
    file?: any;
    target: {
      hasConnection: boolean;
      targetMain: string;
    };
  };
  userData: any;
}

const hasEmpty = (value) => {
  switch (typeof value) {
    case 'string': {
      return value === 'null' || value?.trim()?.length === 0;
    }
    case 'number': {
      return !value;
    }

    default: {
      return value === null || value === undefined || String(value).length <= 0;
    }
  }
};

export const getValidation = ({
  value,
  type,
  params,
  form,
  userData,
}: IValidationParams) => {
  const isEmpty = hasEmpty(value);
  const isMaxSymbols =
    typeof value === 'string' &&
    params?.maxSymbols &&
    value?.split('').length > params?.maxSymbols;

  const isSuccess = { isValid: true };

  switch (type) {
    case 'innGlobal':
    case 'inn': {
      let inn = value?.replaceAll('_', '');
      let innResult = false;
      if (typeof inn === 'number') {
        inn = inn.toString();
      } else if (typeof inn !== 'string') {
        inn = '';
      }

      // Проверяем на соответствие ИНН
      if (!isEmpty && [10, 12].indexOf(inn.length) === -1) {
        return (
          inn.length !== 0 &&
          errorBuilder(
            `ИНН может состоять только из ${params?.minSymbols || params?.min || ''} или ${params?.maxSymbols || params?.max || ''} цифр`
          )
        );
      }

      if (!isEmpty) {
        switch (inn.length) {
          case 10:
            const n10 = checkDigitInn(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (n10 === parseInt(inn[9], 10)) {
              innResult = true;
            }
            break;
          case 12:
            const n11 = checkDigitInn(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            const n12 = checkDigitInn(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            if (
              n11 === parseInt(inn[10], 10) &&
              n12 === parseInt(inn[11], 10)
            ) {
              innResult = true;
            }
            break;
          default: {
            innResult = false;
          }
        }
      }

      if (!innResult && !isEmpty) {
        return errorBuilder('Введенное значение не является ИНН');
      }

      // Если поле обязательно и пустое, то вывоим стандартную ошибку
      if (params?.required && isEmpty) {
        return errorBuilder();
      }

      return isSuccess;
    }

    case 'email': {
      const emailLengthConstant = 40;
      const emailRegExp =
        /^([A-Za-z0-9_\-.]{2,4})+@([A-Za-z0-9_\-.]{2,5})+\.([A-Za-z]{2,4})$/;
      const isEmail = emailRegExp.test(String(value?.trim()).toLowerCase());
      const isValidLength =
        value?.split('').length > 0 &&
        value?.split('').length <= emailLengthConstant;
      const emailRegExpLatin = /^[a-zA-Z0-9\s?!,\-_.'@"]*$/i;
      const isValidLatin = emailRegExpLatin.test(value);

      if (isEmpty && params?.required) {
        return errorBuilder();
      }

      if (!isValidLatin) {
        return errorBuilder('Разрешены только латинские буквы и цифры');
      }

      if (!isEmail && !isEmpty) {
        return errorBuilder('Введите корректную электронную почту');
      }

      if (!isValidLength && !isEmpty) {
        return errorBuilder(
          `Введите электронную почту менее ${emailLengthConstant} символов`
        );
      }

      return isSuccess;
    }

    case 'file': {
      const maxCountFile = params.max || 1;

      if (params?.required) {
        // Проверяем на пустое значение в поле с файлами
        if (!canArrayValues(value)) {
          return errorBuilder();
        }
      }

      if (value?.length > maxCountFile && canArrayValues(value)) {
        return errorBuilder(
          `Вы не можете загрузить больше ${maxCountFile} файлов`
        );
      }

      return isSuccess;
    }

    case 'cyrillic': {
      const cyrillicRegExp = new RegExp(
        /^[\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F,.\s\-/№0-9"«»№()/'"]*$/
      );
      const isCyrillic = cyrillicRegExp.test(value);

      if (params?.required && isEmpty) {
        return errorBuilder();
      }

      if (!isCyrillic) {
        return errorBuilder('Разрешена только кириллица');
      }

      return isSuccess;
    }

    case 'tel':
    case 'phone': {
      const phoneRegExp =
        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,11}(\s*)?$/;
      const isPhone = phoneRegExp.test(value);
      if (isEmpty) {
        return errorBuilder();
      }
      if (!isPhone) {
        return errorBuilder('Введите номер телефона');
      }

      return isSuccess;
    }

    case 'latin': {
      // const latinRegExp = /^[a-zA-Z0-9\s?!,.;/'’"%№:*()_+\-'«»"]*$/i;
      const latinRegExp =
        /^[a-zA-Z0-9\s?!,.;/'’"%$№:*()_<~\]\\{}>@#^&\[|+\-«»]*$/i;
      const isLatinRegExp = latinRegExp.test(value);
      const errorMessage = 'Разрешены только латинские буквы и цифры';

      // Если поле обязательно, проверяем на пустоту и корректность заполнения
      if (params?.required) {
        if (isEmpty) {
          return errorBuilder();
        }

        if (!isLatinRegExp) {
          return errorBuilder(errorMessage);
        }

        if (isMaxSymbols) {
          return errorBuilder(
            `Максимум количество символов - ${params.maxSymbols}`
          );
        }
      } else if (!isLatinRegExp && !isEmpty) {
        // Иначе проверяем на корректный ввод
        return errorBuilder(errorMessage);
      }

      return isSuccess;
    }

    case 'url': {
      // eslint-disable-next-line prefer-regex-literals
      const url = new RegExp(
        '(?:(?:ht|f)tps?://)?(?:[\\-\\w]+:[\\-\\w]+@)?(?:^[0-9a-z:.\\/\\/\\][\\-0-9a-z]*[0-9a-z]\\.)+[a-z]{2,6}(?::\\d{1,5})?(?:[?/\\\\#][?!^$.(){}:|=[\\]+\\-/\\\\*;&~#@,%\\wА-Яа-я]*)?'
        // '(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?^[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?\\/[a-zA-Z0-9]{2,}|((https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})(\\.[a-zA-Z]{2,})?)|(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}\\.[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})? '
      );
      const isURL = url.test(value);

      // Если поле обязательно, проверяем на пустоту и корректность заполнения
      if (params?.required) {
        if (isEmpty) {
          return errorBuilder();
        }
        if (!isURL) {
          return errorBuilder('Введите корректный адрес сайта');
        }
      } else if (!isURL && !isEmpty) {
        // Иначе проверяем на ввод
        return errorBuilder('Введите корректный адрес сайта');
      }

      return isSuccess;
    }

    case 'checkbox': {
      const isChecked = Boolean(value);

      if (isEmpty) {
        return errorBuilder();
      }

      if (!isChecked) {
        return errorBuilder(
          'Для отправки заявки, заполните все обязательные поля на странице'
        );
      }
      return isSuccess;
    }

    case constants.FORM.AGREEMENT.NAME: {
      const isChecked = Boolean(convertBooleanValue(value));

      if (!isChecked) {
        return errorBuilder(
          'Вы не дали согласие на обработку данных, без этого отправить заявку невозможно'
        );
      }
      return isSuccess;
    }

    case 'number': {
      const numberRegExp = /[0-9]/g;
      const isNumber = numberRegExp.test(value);

      const isMaxNumberSymbols =
        String(value)?.replaceAll(' ', '')?.length > params?.maxSymbols;

      const isMaxNumber =
        Number(String(value)?.replaceAll(' ', '')) > params?.max;
      const isMinNumber =
        Number(String(value)?.replaceAll(' ', '')) < params?.min;

      const isMinNumberSymbols =
        String(value)?.replaceAll(' ', '')?.length < params?.minSymbols;

      if (isEmpty) {
        return errorBuilder();
      }

      if (isMaxNumberSymbols) {
        return errorBuilder(
          params?.errorMessage ||
            `Максимум количество символов - ${params?.maxSymbols}`
        );
      }

      if (isMaxNumber) {
        return errorBuilder(
          params?.errorMessage ||
            `Максимальное допустимое число - ${params?.max}`
        );
      }

      if (isMinNumberSymbols) {
        return errorBuilder(
          params?.errorMessage ||
            `Минимальное количество символов - ${params?.minSymbols}`
        );
      }

      if (isMinNumber) {
        return errorBuilder(
          params?.errorMessage ||
            `Минимальное допустимое число - ${params?.min}`
        );
      }

      if (!isNumber) {
        return errorBuilder('Введите корректное число');
      }

      if (params?.target?.hasConnection) {
        //Если поле имеет связь с другим полем, то обрабатываем валадицию в индивидуальном порядке
        return changeFieldOnTarget({
          value,
          type,
          params,
          userData,
          form,
          isSuccess,
        });
      }

      return isSuccess;
    }

    case 'select': {
      if (isEmpty) {
        return errorBuilder();
      }
      return isSuccess;
    }

    case 'okved': {
      const isOkved = Boolean(value?.length > 0);
      if (isEmpty || !isOkved) {
        return errorBuilder();
      }
      return isSuccess;
    }

    case 'searchApi': {
      if (isEmpty) {
        return errorBuilder();
      }
      return isSuccess;
    }

    default: {
      if (isMaxSymbols) {
        return errorBuilder(
          params?.errorMessage ||
            `Максимум количество символов - ${params.maxSymbols}`
        );
      }

      if (params?.required && isEmpty) {
        return errorBuilder();
      }

      return isSuccess;
    }
  }
};
