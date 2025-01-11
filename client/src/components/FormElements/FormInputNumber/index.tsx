import { useDispatch } from 'react-redux';
import { NumericFormat, PatternFormat } from 'react-number-format';

function FormInputNumber({ field, name, value, onChange, ...props }) {
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
      {!field?.hasOwnProperty('mask') ? (
        <NumericFormat
          disabled={field?.disabled}
          placeholder={field?.pl}
          decimalScale={0}
          onChange={onChangeHandler}
          value={value ? String(value)?.replaceAll(' ', '') : ''}
          allowLeadingZeros
          thousandSeparator={field?.numberWithSpace ? ' ' : ''}
          name={name}
          {...props}
        />
      ) : (
        <PatternFormat
          disabled={field?.disabled}
          placeholder={field?.pl}
          format={field?.mask}
          patternChar="1"
          onChange={onChangeHandler}
          value={value ? String(value)?.replaceAll(' ', '') : ''}
          name={name}
          {...props}
        />
      )}
      <div className="e-input-indicator">{field?.placeholderIndicator}</div>
    </div>
  );
}

export default FormInputNumber;
