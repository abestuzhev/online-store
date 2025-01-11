import { useDispatch } from 'react-redux';
import { NumericFormat, PatternFormat } from 'react-number-format';

function FormInputNumberFloat({ field, name, value, onChange, ...props }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const valueInput = e?.target?.value?.replaceAll(' ', '');
    if (onChange) {
      // console.log(name, valueInput);
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };

  return (
    <div className="e-input">
      {/*  Основной кейс использования компонента — без маски.
      Если ключ mask есть, выводим компонент <PatternFormat /> */}
      <NumericFormat
        disabled={field.disabled}
        placeholder={field?.pl}
        onChange={onChangeHandler}
        decimalScale={3}
        decimalSeparator=","
        value={value ? String(value)?.replaceAll(' ', '') : ''}
        allowLeadingZeros
        thousandSeparator={field?.numberWithSpace ? ' ' : ''}
        name={name}
        {...props}
      />
      <div className="e-input-indicator">{field?.placeholderIndicator}</div>
    </div>
  );
}

export default FormInputNumberFloat;
