import { canArrayValues, canObjectValues } from '../../../helpers/functions';
import { constants } from '../../../helpers/constants';
import constantsForm from './constants';
import { generatePath } from './helpers';

// Функция пробегает по дефолтным значениям — values?.defaultValue.
// Для определения дополнительной информации по полю идет проверка из values?.subSection
// Структура values?.defaultValue === values?.subSection

export const getInitialValues = (values) => {
  if (canArrayValues(values)) {
    return values?.reduce((result, step, stepIndex) => {
      // console.log('STEP', step);
      // console.log('stepIndex', stepIndex);
      if (canArrayValues(step?.defaultValue)) {
        step?.defaultValue.map((section, sectionIndex) => {
          // console.log('SECTION', section);
          section?.fields.map((element, elementIndex) => {
            console.log('ELEMENT', element);
            if (element?.code?.toLowerCase()?.includes('okved')) {
              return;
            }
            // Условие для табов
            if (
              element.hasOwnProperty('defaultValue') &&
              element.hasOwnProperty('tabsBody')
            ) {
              // console.log('111element', element);
              result = {
                ...result,
                [generatePath(
                  stepIndex,
                  section.code,
                  element.code,
                  constantsForm.TABS.ACTIVE // подставляем в путь название флага, по которому будет ясно какой радиобаттон отображать
                )]: element.defaultValue,
              };
              // В остальных случаях обрабатываем названия как есть
            } else if (canArrayValues(element)) {
              element.map((field, fieldIndex) => {
                console.log('FIELD', field);
                if (
                  field.hasOwnProperty('defaultValue') &&
                  field.hasOwnProperty('tabsBody')
                ) {
                  result = {
                    ...result,
                    [generatePath(
                      stepIndex,
                      section.code,
                      field.code,
                      constantsForm.TABS.ACTIVE // подставляем в путь название флага, по которому будет ясно какой радиобаттон отображать
                    )]: field.defaultValue,
                  };

                  field?.tabsBody.map((el, elIndex) => {
                    result = {
                      ...result,
                      [generatePath(
                        stepIndex,
                        section.code,
                        field.code,
                        constantsForm.TABS.CONTENT,
                        elIndex
                      )]: el.defaultValue,
                    };
                  });
                }
              });

              console.log('-------------------');
            } else if (
              values[stepIndex]?.subSection[sectionIndex].fields[elementIndex]
                .type === 'totalAll'
            ) {
              canArrayValues(element?.fields)
                ? element?.fields?.map((fieldsElement) => {
                    result = {
                      ...result,
                      [generatePath(
                        stepIndex,
                        section.code,
                        element.code,
                        fieldsElement.code
                      )]: fieldsElement.defaultValue,
                    };
                  })
                : values[stepIndex]?.subSection[sectionIndex]?.fields[
                    elementIndex
                  ]?.fieldsGroup?.map((fieldsElement) => {
                    result = {
                      ...result,
                      [generatePath(
                        stepIndex,
                        section.code,
                        element.code,
                        fieldsElement.code
                      )]: fieldsElement.defaultValue || 0,
                    };
                  });
            } else if (
              element.hasOwnProperty('fields') &&
              values[stepIndex]?.subSection[sectionIndex].fields[elementIndex]
                .type === 'card'
            ) {
              // console.log('CARD', element);
              canArrayValues(element?.fields) &&
                element?.fields?.map((fieldsElement, fieldsElementIndex) => {
                  result = {
                    ...result,
                    [generatePath(
                      stepIndex,
                      section.code,
                      element.code,
                      constantsForm.CARDS.NAME,
                      elementIndex,
                      fieldsElement.code,
                      fieldsElement?.hasOwnProperty('tabsBody')
                        ? constantsForm.TABS.ACTIVE
                        : ''
                    )]: fieldsElement.defaultValue,
                  };
                });
            } else if (element.hasOwnProperty('fields')) {
              element?.fields?.map((fieldsElement) => {
                result = {
                  ...result,
                  [generatePath(
                    stepIndex,
                    section.code,
                    element.code,
                    fieldsElement.code
                  )]: fieldsElement.defaultValue,
                };
              });
            } else if (element?.hasOwnProperty('defaultValue')) {
              result = {
                ...result,
                [generatePath(stepIndex, section.code, element.code)]:
                  canObjectValues(element?.defaultValue)
                    ? element?.defaultValue?.okved?.value || ''
                    : element?.defaultValue,
              };
            }
          });
        });
      }
      return result;
    }, {});
  }
};

// Экспериментальный способ вывода дефолтных значений

export const getRecursiveInitialValues = (elements) => {
  const history = {};
  const checkRule = (result, path, element, fieldElement) => {
    if (
      element.hasOwnProperty('defaultValue') &&
      element.hasOwnProperty('subSection')
    ) {
      // console.log('----------------array', element);
      element?.defaultValue?.map((step, stepIndex) => {
        result = checkRule(
          result,
          generatePath(path, step.code),
          step,
          element?.subSection[stepIndex]
        );
      });
    }

    // Если элемент массив
    if (canArrayValues(element)) {
      // console.log('----------------array', element);
      element.map((field, fieldIndex) => {
        result = checkRule(result, generatePath(path), field);
        // history[generatePath(path)] = field;
      });
    }

    // Если элемент содержит набор полей
    if (element.hasOwnProperty('fields')) {
      // console.log('----------------element', element);
      // console.log('----------------element.code', element.code);
      // console.log('----------------');

      let fieldCard = {};
      //fieldList
      fieldElement?.fields?.map((fElement, fElementIndex) => {
        if (fElement.hasOwnProperty('type') && fElement?.type === 'card') {
          fieldCard = { isHasTypeCard: true, isMultiple: fElement?.multiple };
        } else {
          fieldCard = { isHasTypeCard: false, isMultiple: fElement?.multiple };
        }

        // console.log('result', result);
      });

      element?.fields?.map((fieldElement, fieldElementIndex) => {
        // console.log('----------------fields', fieldElement);
        // console.log('----------------path', path);
        // console.log('*/*/*/*/*/*/*/*/*/*/*/');

        result = checkRule(
          result,
          generatePath(
            path,
            fieldCard?.isHasTypeCard ? fieldElement.code : '',
            fieldCard?.isHasTypeCard ? 'cards' : '',
            !canArrayValues(fieldElement) && fieldCard?.isMultiple ? 0 : ''
          ),
          fieldElement
        );

        // console.log('result', result);
      });
    }

    // Подстановка defaultValue для элемента, который выбирает нужный таб
    if (
      element.hasOwnProperty('defaultValue') &&
      element.hasOwnProperty('tabsBody')
    ) {
      result = {
        ...result,
        [generatePath(
          path,
          element.code,
          constantsForm.TABS.ACTIVE // подставляем в путь название флага, по которому будет ясно какой радиобаттон отображать
        )]: element.defaultValue,
      };
    }

    if (element.hasOwnProperty('tabsBody')) {
      // console.log('----------------tabsBody', element);
      element?.tabsBody?.map((tab, tabIndex) => {
        result = checkRule(
          result,
          generatePath(
            path,
            element.code,
            constantsForm.TABS.CONTENT,
            tabIndex
          ),
          tab
        );
      });
    }

    // Если это жлемент, который сожержит defaultValue, т.е. само поле
    if (element.hasOwnProperty('fiasFields')) {
      const address = element?.fiasFields[0];

      if (address) {
        result = {
          ...result,
          [generatePath(path, element.code)]: address.defaultValue,
        };
      }

      // element?.fiasFields.map((fias) => {});
    }

    if (element.hasOwnProperty('fieldsGroup')) {
      element?.fieldsGroup?.map((f, fieldIndex) => {
        result = checkRule(result, generatePath(path, element.code), f);
      });
    }

    if (element.hasOwnProperty('targetItem')) {
      element?.targetItem?.map((target) => {
        result = checkRule(result, generatePath(path), target);
      });
    }

    if (
      element?.hasOwnProperty('defaultValue') &&
      element?.defaultValue?.hasOwnProperty('okved')
    ) {
      // console.log('element OKVED', element);
      // console.log('path OKVED', path);
      result = {
        ...result,
        [generatePath(path, element?.code)]:
          element?.defaultValue?.okved?.value,
      };
    }

    // Если это жлемент, который сожержит defaultValue, т.е. само поле
    if (
      element.hasOwnProperty('defaultValue') &&
      !element.hasOwnProperty('subSection') &&
      !canObjectValues(element?.defaultValue) &&
      !element.hasOwnProperty('tabsBody')
    ) {
      result = {
        ...result,
        [generatePath(path, element.code)]: element.defaultValue,
      };
    }

    // Возвращаем результат для следующих итераций
    return result;
  };

  const collection =
    canArrayValues(elements) &&
    elements.reduce((res, item, itemIndex) => {
      // let f = null;
      // eslint-disable-next-line no-param-reassign
      res = checkRule(res, generatePath(item.code), item, history);
      if (canArrayValues(item?.defaultValue)) {
        // item?.defaultValue?.map((element) => {
        //   res = checkRule(res, generatePath(item.code, element.code), element);
        // });
      }

      // console.log('-------------------------------------f', item.code, f);
      // res = {
      //   ...res,
      //   // ...f,
      // };
      // console.log('res', res);
      // console.log('history', history);
      return res;
    }, {});
  // console.log('collection', collection);
  return collection;
};
