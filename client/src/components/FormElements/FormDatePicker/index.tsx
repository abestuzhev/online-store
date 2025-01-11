import { DatePicker } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { CalendarIcon } from '../../../assets/icon';
import styles from './index.module.scss';
import { convertStringToDate } from '../../../helpers/functions';

interface IFormDatePickerProps {
  placeholder: string;
  size: string;
  onChange: () => void;
  name: string;
  value: string;
  field: {
    min?: string;
    max?: string;
  };
  inline: boolean;
}

function FormDatePicker({
  placeholder = 'Выберите дату',
  size = 'medium',
  onChange,
  name,
  value,
  field,
  inline = false,
  ...props
}: IFormDatePickerProps) {
  const ref = useRef();
  const changeDatePickerHandler = (value) => {
    const valueFormat = dayjs(value).format('DD.MM.YYYY');

    if (onChange) {
      name ? onChange({ [name]: valueFormat }) : onChange(valueFormat);
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(styles.datepicker, {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.inline]: inline,
        [styles.isDisabled]: field?.disabled,
      })}
    >
      {inline ? (
        <DatePicker
          getPopupContainer={() => ref?.current}
          value={value && dayjs(convertStringToDate(value))}
          minDate={
            field?.min ? dayjs(field.min, 'DD.MM.YYYY') : dayjs(new Date(0))
          }
          maxDate={
            field?.max
              ? dayjs(field.max, 'DD.MM.YYYY')
              : dayjs().add(100, 'year')
          }
          format="DD.MM.YYYY"
          allowClear={false}
          suffixIcon={<CalendarIcon />}
          placeholder={field?.pl || placeholder}
          onChange={changeDatePickerHandler}
          inputReadOnly
          open
          {...props}
        />
      ) : (
        <DatePicker
          disabled={field?.disabled}
          value={value && dayjs(convertStringToDate(value))}
          minDate={
            field?.min ? dayjs(field.min, 'DD.MM.YYYY') : dayjs(new Date(0))
          }
          maxDate={
            field?.max
              ? dayjs(field.max, 'DD.MM.YYYY')
              : dayjs().add(100, 'year')
          }
          format="DD.MM.YYYY"
          allowClear={false}
          suffixIcon={<CalendarIcon />}
          placeholder={field?.pl || placeholder}
          onChange={changeDatePickerHandler}
          inputReadOnly
          {...props}
        />
      )}
    </div>
  );
}

export default FormDatePicker;
