import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import styles from './index.module.scss';
import { constants } from '../../../helpers/constants';

function FormInputPhone({ field, name, value, onChange, ...props }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const valueInput = e.target.value;
    if (onChange) {
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };

  // Формат отдельных символов для номера телефона
  // Первая цифра в скобках не модет быть восьмеркой
  const formatChars = {
    C: '[9]',
    '9': '[0-9]',
  };

  return (
    <div className="e-input">
      <div className="e-input-wrapper">
        <InputMask
          mask="+7 (C99) 999-99-99"
          formatChars={formatChars}
          onPaste={(e) => e.preventDefault()}
          maskChar=""
          autoComplete="off"
          disabled={field.disabled}
          placeholder={field?.pl}
          name={name}
          value={value}
          onChange={onChangeHandler}
          className={styles.formInputNumber}
          {...props}
        />
      </div>
    </div>
  );
}

export default FormInputPhone;
