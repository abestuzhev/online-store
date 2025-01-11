import { useDispatch, useSelector } from 'react-redux';
import { Form, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { getValidation } from '../../FormApp/helpers/validation';
import { constants } from '../../../helpers/constants';
import FormItemLabel from '../FormItemLabel';
import {
  generatePath,
  getFullPathTargetMain,
} from '../../FormApp/helpers/helpers';

function FormItem({ name, field, children, valuePropName, form }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.form);
  const [rules, setRules] = useState([]);

  // Список типов необязательных полей, которые надо валидировать на корректный ввод
  const validateOptionalField = [
    'string',
    'cyrillic',
    'url',
    'latin',
    'file',
    'inn',
    'email',
    'innGlobal',
  ];

  // Признак, который включает механизм валидации

  // Если поле обязательное и залочено, то не включаем его в валидацию
  const isRequired =
    (field?.required && !field.disabled) ||
    validateOptionalField.includes(field?.validateInput || field?.type);

  useEffect(() => {
    if (isRequired) {
      const v = {
        validator: (_, value) => {
          const validate = getValidation({
            value,
            type: field?.validationType || field?.validateInput || field?.type,
            params: {
              code: field?.code,
              max: field?.max || field?.maxValueNumber,
              min: field?.min || field?.minValueNumber,
              maxSymbols: field?.maxLength,
              minSymbols: field?.minLength,
              required: field?.required,
              errorMessage: field?.errorMessage,
              file: field.type === 'file' && field,
              target: {
                hasConnection: !!field?.targetMain,
                targetMain: field?.targetMain,
              },
            },
            form,
            userData,
          });

          return validate.isValid
            ? Promise.resolve()
            : Promise.reject(
                validate.message || constants.TEXT.ERROR.VALIDATION
              );
        },
      };

      setRules([v]);
    }
  }, [field, userData]);

  return (
    <Form.Item
      rules={rules}
      valuePropName={valuePropName}
      name={name}
      // validateStatus={field?.error?.status}
      // help={field?.error?.message}
      // dependencies={field?.code === 'sum' && ['[finance][investment]']}
      // hasFeedback
      label={field?.name && <FormItemLabel field={field} name={name} />}
      className={styles.formItem}
    >
      {children}
    </Form.Item>
  );
}

export default FormItem;
