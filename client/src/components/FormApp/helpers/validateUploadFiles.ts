import { canArrayValues } from '../../../helpers/functions';

export const validateUploadFiles = ({ fileList, params }) => {
  const errors = [];
  const acceptMimeTypeFile = canArrayValues(params?.acceptFiles)
    ? params?.acceptFiles?.map((element) => element.mimetype)
    : [];

  // const uniqSet = new Set();
  // for (let i = 0; i < fileList.length; i++) {
  //   for (let j = 0; j < i; j++)
  //     if (fileList[j].name === fileList[i].name) {
  //       uniqSet.add(i);
  //     }
  // }
  //
  // const uniq = Array.from(uniqSet);
  // console.log('uniq', uniq);

  const errorCollection =
    canArrayValues(fileList) &&
    fileList.map((element, index) => {
      if (!acceptMimeTypeFile.includes(element?.type)) {
        return {
          ...element,
          status: 'error',
          isError: true,
          message: `Файл ${element.name} не был прикреплен. Неверный формат.`,
        };
      }

      if (+element.size >= 5000000) {
        // валидация на размер файла max
        return {
          ...element,
          status: 'error',
          isError: true,
          message: `Файл ${element.name} не был прикреплен. Неверный максимальный размер файла`,
        };
      }

      if (+element.size < 1000) {
        // валидация на размер файла min
        return {
          ...element,
          status: 'error',
          isError: true,
          message: `Файл ${element.name} не был прикреплен. Неверный минимальный размер файла`,
        };
        // } else if (!fileTypes.map((item) => item.mimetype).includes(i?.type)) {
        //   // валидация на copy  файла
        //   errors.splice(k, 1, {
        //     code: 'type-no-valid',
        //     message: `Файл ${file.name} не был прикреплен. Загрузите корректный формат.`,
        //   });
        // } else if (fileList.length > 1) {
        // валидация на тип файла
        // if (uniq.includes(k)) {
        //   errors.splice(k, 1, {
        //     code: 'type-no-valid',
        //     message: `Файл ${i.name} уже был прикреплен.`,
        //   });
        // } else {
        //   errors.splice(k, 1, '');
        // }
      }

      return element;
    });

  return errorCollection;
};
