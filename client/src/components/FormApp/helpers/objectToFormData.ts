import { canArrayValues, canObjectValues } from '../../../helpers/functions';
import { constants } from '../../../helpers/constants';
import { generatePath, urlToFile } from './helpers';

export const objectToFormData = async (code, data) => {
  const newFormData = new FormData();

  console.log('data', data);
  if (canObjectValues(data)) {
    // проход по ключам через for...of, чтобы выполнить асинхронное преобразование base64 to File
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(data)) {
      // Object.keys(data).forEach((key) => {
      if (canArrayValues(data[key])) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [arrIndex] of data[key].entries()) {
          if (!data[key][arrIndex].hasOwnProperty('url')) {
            if (data[key][arrIndex]?.hasOwnProperty('originFileObj')) {
              urlToFile(
                data[key][arrIndex]?.originFileObj,
                data[key][arrIndex]?.name,
                data[key][arrIndex]?.type
              ).then((instance) => {
                newFormData.append(`${code}${key}[${arrIndex}]`, instance);
              });
            } else {
              newFormData.append(
                `${code}${generatePath(key, arrIndex)}`,
                data[key][arrIndex]
              );
            }
          }
        }
        // data[key].forEach((file, fileIndex) => {
        //   // Фомирование названия нескольких файлов → code[name][subName][0]
        //   if (!file.hasOwnProperty('url')) {
        //     newFormData.append(
        //       `${code}${key}[${fileIndex}]`,
        //       data[key][fileIndex].originFileObj
        //     );
        //   }
        // });
      } else {
        // Фомирование названия → code[name][subName]
        data[key] && newFormData.append(`${code}${key}`, data[key]);
      }
    }
  }

  // console.log(newFormData)

  return newFormData;
};
