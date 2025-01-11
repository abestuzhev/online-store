import { useEffect, useState } from 'react';
import { InputNumber, Slider } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';
import { formatterFunction, numberWithSpace } from '@/helpers/functions';
import { NumericFormat } from 'react-number-format';

const FormRangeSliderSingle = ({
  min,
  max,
  value,
  isDisabled = false,
  suffix,
  step = 1,
  onChange,
  readOnly,
}) => {
  const [inputValue, setInputValue] = useState(value || min);

  const onChangeHandler = (value) => {
    setInputValue(Number(value));
  };

  const onChangeInputHandler = (e) => {
    const value = e?.target?.value?.replaceAll(' ', '');
    setInputValue(Number(value));
  };

  const onBlurHandler = (e) => {
    const value = e.target.value.replaceAll(' ', '');
    const number = Number(Math.trunc(value));
    if (number <= min) {
      setInputValue(min);
      !!onChange && onChange(min);
      return;
    }

    if (number >= max) {
      setInputValue(max);
      !!onChange && onChange(max);
      return;
    }

    !!onChange && onChange(number);
  };

  const onAfterChangeHandler = (value) => {
    const numberOnAfter = Number(Math.trunc(value));
    if (numberOnAfter <= min) {
      setInputValue(min);
      !!onChange && onChange(min);
      return;
    }

    if (numberOnAfter >= max) {
      setInputValue(max);
      !!onChange && onChange(max);
      return;
    }

    !!onChange && onChange(numberOnAfter);
  };

  useEffect(() => {
    setInputValue(value || min);
  }, [value]);

  return (
    <>
      <div
        className={classNames(styles.inputRange, {
          [styles.isDisabled]: isDisabled,
        })}
      >
        <div className={styles.inputRangeField}>
          <NumericFormat
            readOnly={readOnly}
            min={min}
            max={max}
            maxLength={numberWithSpace(max)?.length}
            value={
              typeof inputValue === 'number' ? numberWithSpace(inputValue) : min
            }
            thousandSeparator=" "
            decimalScale={0}
            onKeyDown={(e) => e.keyCode === 13 && onBlurHandler(e)}
            onChange={onChangeInputHandler}
            onBlur={onBlurHandler}
            isAllowed={({ floatValue }) => {
              return floatValue >= 0;
            }}
          />
        </div>
        <div className={styles.inputRangeIcon}>{suffix}</div>
      </div>

      <div className={styles.inputRangeSlider}>
        <Slider
          min={min}
          max={max}
          step={step}
          onChange={onChangeHandler}
          onChangeComplete={onAfterChangeHandler}
          value={typeof inputValue === 'number' ? inputValue : min}
          tooltip={{
            // open: false,
            formatter: (value) => numberWithSpace(value),
          }}
        />
      </div>
      <div className={styles.inputRangeSliderMinMaxValue}>
        <span>{formatterFunction(min)}</span>
        <span>{formatterFunction(max)}</span>
      </div>
    </>
  );
};

export default FormRangeSliderSingle;
