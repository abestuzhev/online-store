import dayjs from 'dayjs';
import {
  canArrayValues,
  canObjectValues,
  convertBooleanValue,
} from '../../../helpers/functions';
import constantsForm from './constants';
import { validateUploadFiles } from './validateUploadFiles';

// Функция формирует оформление пути до поля
export const generatePath = (...args: String[]): string => {
  // return args.join(constants.FORM.SEPARATOR);
  return args.reduce((result, item) => {
    // Если в пути уже содержится скобка, то пропускаем
    if (item !== 'undefined' && item !== null && item !== '') {
      result += String(item)?.includes('[') ? String(item) : `[${item}]`;
    }
    return result;
  }, '');
};

// Функция формирует оформление пути до поля
export const convertPathToArray = (str: string): String[] => {
  if (typeof str === 'string') {
    const strWithoutBrackets = str.replaceAll('[', '').replaceAll(']', ' ');
    return strWithoutBrackets.split(' ');
  }
};

// Рекурсивная функция превращения вложенной структуры в плоский объект
export function traverseAndFlatten(currentNode, target, flattenedKey) {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      // Проверяем ключ в цепочке пути. (Завязано на ключе табов)
      // Если он равен константе constantsForm.TABS.CONTENT,
      // то это массив табов, которые надо обрабатываться иначе
      // В другом случае, могут быть массивы других полей, которые этой обработки не требуют
      if (
        (key === constantsForm.TABS.CONTENT ||
          key === constantsForm.CARDS.NAME) &&
        canArrayValues(currentNode[key])
      ) {
        if (canArrayValues(currentNode[key])) {
          currentNode[key].forEach((element, elementIndex) => {
            traverseAndFlatten(
              element,
              target,
              `${flattenedKey}${generatePath(key, elementIndex)}`
            );
          });
        }
      } else {
        let newKey;
        if (flattenedKey === undefined) {
          newKey = generatePath(key);
        } else {
          newKey = `${flattenedKey}${generatePath(key)}`;
        }

        const value = currentNode[key];
        if (canObjectValues(value)) {
          traverseAndFlatten(value, target, newKey);
        } else {
          target[newKey] = value;
        }
      }
    }
  }
}

// Вызов рекурсивной функции
export function flatten(obj) {
  const flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}

// START flattenFile — экспериментальный обработчик для файлов
// TODO traverseAndFlattenFile — Deprecated
export function traverseAndFlattenFile(currentNode, target, flattenedKey) {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      let newKey;
      if (flattenedKey === undefined) {
        newKey = `[${key}]`;
      } else {
        newKey = `${flattenedKey}[${key}]`;
      }

      const value = currentNode[key];
      if (canObjectValues(value)) {
        traverseAndFlattenFile(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
}
// TODO flattenFile — Deprecated
export function flattenFile(obj) {
  const flattenedObject = {};
  traverseAndFlattenFile(obj, flattenedObject);
  return flattenedObject;
}
// END flattenFile

export function checkDigitInn(inn, coefficients) {
  let n = 0;
  for (let i = 0; i < coefficients.length; i++) {
    n += coefficients[i] * inn[i];
  }
  return parseInt((n % 11) % 10);
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function urlToFile(url, filename, mimeType) {
  if (url?.startsWith('data:')) {
    const arr = url.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], filename, { type: mime || mimeType });
    return Promise.resolve(file);
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
}

export const imageUrlToBase64 = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
};

export const convertFileParams = (fileFields) => {
  const fKeys = Object.keys(fileFields);
  return canArrayValues(fKeys)
    ? fKeys?.reduce((result, key) => {
        result[key] = fileFields[key]?.map((file) => ({
          uid: file.ID,
          name: file.FILE_NAME || file.name,
          status: 'loaded',
          size: file.FILE_SIZE || file.size,
          type: file.CONTENT_TYPE || file.type,
          url: file.SRC,
          thumbUrl: '',
        }));

        return result;
      }, {})
    : [];
};

// Подставляем form.getFieldValue для глубокого копирования и расширяемости объекта isExtensible
//
/**
 * Функция клонирования массива с файлами, для создания возможности расширяемости объекта (isExtensible: true)
 * Иначе для файлов с картинками валится в ошибку — "Cannot add property thumbUrl, object is not extensible"
 * @param arr — массив файлов (ant file / file server)
 */
export const deepCloneAntFile = (arr): [] => {
  return canArrayValues(arr)
    ? arr.map((file) => {
        if (file?.originFileObj) {
          return {
            ...file,
            originFileObj: file.originFileObj,
          };
        }
        return file;
      })
    : [];
};

export const convertBooleanUserData = (obj) => {
  if (canObjectValues(obj)) {
    const keys = Object.keys(obj);
    return keys.reduce((result, key) => {
      result[key] =
        obj[key] === 'true' || obj[key] === 'false'
          ? convertBooleanValue(obj[key])
          : obj[key];

      return result;
    }, {});
  }
};

export const errorBuilder = (
  message: any = 'Поле обязательно к заполнению'
) => {
  return { isValid: false, message };
};

// Функция получения кода targetMain в полный путь относительно всей анкеты
export const getFullPathTargetMain = ({ data, code }) => {
  if (canArrayValues(data) || canObjectValues(data)) {
    const userDataKeys = Object.keys(data);
    const targetCode = userDataKeys.find((key) => key.includes(code));
    return targetCode || '';
  }
};

export const getFileErrors = (fileList, field) => {
  if (canArrayValues(fileList)) {
    const fileListWithError = validateUploadFiles({
      fileList,
      params: field,
    });
    return fileListWithError.filter((element) => element?.isError);
  }
  return [];
};

export const getFileSuccess = (fileList, field) => {
  if (canArrayValues(fileList)) {
    const fileListWithoutError = validateUploadFiles({
      fileList,
      params: field,
    });
    return fileListWithoutError.filter((element) => !element?.isError);
  }
  return [];
};

// Функци конвертации антовской стрктуры файлв к структуре Redux
export const delayedConvertFile = async (file) => {
  if (file?.originFileObj instanceof File) {
    const preview = await getBase64(file.originFileObj);

    return {
      ...file,
      lastModifiedDate: dayjs(file.lastModifiedDate).format(
        'DD.MM.YYYY HH:MM:ss'
      ),
      originFileObj: preview,
    };
  }
  return file;
};
