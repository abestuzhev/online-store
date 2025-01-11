/*
 * Необходима для определения типа данных и наличия самих данных
 */
import { constants, cookieDevModeStatus } from './constants';

export const generateTitleForm = (type) => {
  switch (type) {
    case constants.CATEGORY.BUSINESS: {
      return 'Заявка на страхование имущества';
    }
    case constants.CATEGORY.CIVIL_LIABILITY: {
      return 'Заявка на страхование ответственности';
    }
    case constants.CATEGORY.TRANSPORT: {
      return 'Заявка на страхование транспорта';
    }
    case constants.CATEGORY.HEALTH: {
      return 'Заявка на страхование здоровья';
    }

    default: {
      return 'Страхование продукта';
    }
  }
};

export const canArrayValues = (value) => {
  return Array.isArray(value) && value.length > 0;
};

/*
 * Необходима для определения типа данных и наличия самих данных
 */
export const canObjectValues = (value) => {
  return (
    !!value && value.constructor === Object && Object.keys(value).length > 0
  );
};

/*
 * Необходима для определения типа данных и наличия самих данных
 */
export const canAcceptableValues = (value) => {
  return value !== null && value !== undefined;
};

// генерация пути до картинки для dev/prod режима
export const generateImagePath = (path: string): string => {
  // if (cookieDevModeStatus === 'Y') {
  //   return `${constants.HOST.LOCAL}${constants.PAGES.BASENAME}${path}`;
  // } else {
  //
  // }
  return `${process.env.REACT_APP_API_HOST}${path}`;
};

export const generateUniqId = (max = 4): string => {
  const str = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

  return str.slice(0, max);
};

export const formatterFunction = (x) => {
  if (x != '') {
    const numb = x.toString().split('.');
    let start = numb[0].split('').splice(0, 15).join('');
    const end =
      numb[1] != undefined ? `.${numb[1].split('').splice(0, 4).join('')}` : '';
    start = start?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return start + end;
  }
  return x;
};

export function numberWithSpace(x) {
  return (
    x &&
    x
      .toString()
      ?.replaceAll(' ', '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  );
}

// window.navigator.userAgent
export const mobileDetect = (userAgent) => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      userAgent
    )
  );
};

export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
}

export const getFileSizeString = (bytes) => {
  const fileSizeString = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  if (bytes === 0) return '0 Б';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${Math.round(bytes / 1024 ** i)} ${fileSizeString[i]}`;
};

export const convertStringToDate = (str = '00.00.0000') => {
  if (str) {
    if (str instanceof Date) {
      return str;
    }
    const [day, month, year] = str.split('.');

    return new Date(+year, +month - 1, +day);
  }
  return str;
};

// склонение слов
export const inflectWord = (value, words) => {
  value = Math.abs(Number(value)) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

export const convertPayloadFilter = (list) => {
  return list.reduce((result, filter) => {
    if (filter.value) {
      result[filter.code] = filter.value;
    }

    return result;
  }, {});
};

export const convertBooleanValue = (value) => {
  switch (value) {
    case 'show':
      return true;
    case 'hide':
      return false;
    case 'Y':
      return true;
    case 'N':
      return false;
    case 'false':
      return false;
    case 'true':
      return true;
    case '1':
      return true;
    case '0':
      return false;
    default:
      return value;
  }
};
export const adaptiveLink = (string) => {
  if (!string.includes('http')) {
    return `http://${string}`;
  }
  return string;
};

/**
 * Функция определения типа коммуникации.
 * При создании проекта владелец моржет выбрать каким способом с ним связаться
 * На детальной странице проекта мы показываем соответствующие кнопки
 * @param connect - тип коммуникации с владельцем проекта
 * @param typeBtn - тип кнопки на которую вешается условие
 */
export const displayTypeCommunication = (connect: string, typeBtn: string) => {
  let isContactBtn = true;
  let isChatBtn = true;
  switch (connect) {
    case 'contact': {
      isContactBtn = true;
      isChatBtn = false;
      break;
    }

    case 'chat': {
      isContactBtn = false;
      isChatBtn = true;
      break;
    }

    default: {
      isContactBtn = true;
      isChatBtn = true;
    }
  }

  if (typeBtn === 'contact') {
    return isContactBtn;
  }

  if (typeBtn === 'chat') {
    return isChatBtn;
  }
};

// Функция проверяет, пустые ли фильтры
export const checkFilterEmpty = (list) => {
  if (canArrayValues(list)) {
    // console.log('list', list);
    const result = list.map((element) => {
      if (element.type === 'select') {
        return canArrayValues(element.options);
      }

      if (element.type === 'range') {
        return !!element?.min && !!element?.max;
      }

      return true;
    });
    // Проверяем на полное совпадение. Если у каждого фильтра будет значение,
    // то мы инвертируем, чтобы получить empty: true
    return !result.every((element) => element);
  }
  return true;
};

export const canNotEmptyValue = (value) => {
  return value !== null;
};

interface INumberForMinMax {
  number: number;
  numberMin: number;
  numberMax: number;
}
// Функция проверки больше/меньше для числа
export const checkNumberForMinMax = ({
  number,
  numberMin,
  numberMax,
}: INumberForMinMax): number => {
  if (number < numberMin) {
    return numberMin;
  }

  if (number > numberMax) {
    return numberMax;
  }

  return Number(number);
};

/**
 * from array to object
 */
// export const convertRangeValue = (value) => {
//   if (canArrayValues(value)) {
//     return value.reduce((result, item, index) => {
//       result[index] = item;
//       return result;
//     }, {});
//   }
//   if (canObjectValues(value)) {
//     return Object.values(value);
//   }
// };
