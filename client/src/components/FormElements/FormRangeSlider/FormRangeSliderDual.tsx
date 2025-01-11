import { useEffect, useState } from 'react';
import { InputNumber, Slider } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';
import { formatterFunction, numberWithSpace } from '@/helpers/functions';
import {
  canAcceptableValues,
  canArrayValues,
  checkNumberForMinMax,
} from '../../../helpers/functions';
import { NumericFormat } from 'react-number-format';

function FormRangeSliderDual({
  value,
  min,
  max,
  isDisabled = false,
  suffix,
  step = 1,
  onChange,
}) {
  const [inputValueMin, setInputValueMin] = useState(min);
  const [inputValueMax, setInputValueMax] = useState(max);

  useEffect(() => {
    if (canArrayValues(value) && value?.every((e) => canAcceptableValues(e))) {
      setInputValueMin(value[0]);
      setInputValueMax(value[1]);
    } else {
      console.log('!!!!', min, max);
      setInputValueMin(min);
      setInputValueMax(max);
    }
  }, [value]);

  const onChangeSlideHandler = (value) => {
    setInputValueMin(value[0]);
    setInputValueMax(value[1]);
  };

  console.log('value', value);
  const onBlurHandlerMin = (e) => {
    const valueInput = e.target.value.replaceAll(' ', '');

    const valueInputMin = checkNumberForMinMax({
      number: Number(valueInput),
      numberMin: min,
      numberMax: Number(String(inputValueMax).replaceAll(' ', '')),
    });
    setInputValueMin(valueInputMin);
    !!onChange && onChange([valueInputMin, Number(inputValueMax)]);
  };

  const onBlurHandlerMax = (e) => {
    const valueInput = e.target.value.replaceAll(' ', '');
    const valueInputMax = checkNumberForMinMax({
      number: Number(valueInput),
      numberMin: Number(String(inputValueMin).replaceAll(' ', '')),
      numberMax: max,
    });
    setInputValueMax(valueInputMax);

    !!onChange && onChange([Number(inputValueMin), valueInputMax]);
  };

  const onAfterChangeHandler = (value) => {
    !!onChange && onChange(value);
  };

  const setInputValueMinHandler = (v) => {
    const valueInput = Number(v);
    setInputValueMin(valueInput);
  };

  const setInputValueMaxHandler = (v) => {
    const valueInput = Number(v);
    setInputValueMax(valueInput);
  };
  return (
    <div className={styles.rangeSlider}>
      <div
        className={classNames(styles.inputRange, {
          [styles.isDisabled]: isDisabled,
        })}
      >
        <div className={styles.inputRangeField}>
          <NumericFormat
            style={{
              width: `${(String(inputValueMin).length + 1) * 10}px`,
            }}
            min={min}
            maxLength={numberWithSpace(max)?.length}
            value={
              typeof inputValueMin === 'number'
                ? numberWithSpace(inputValueMin)
                : min
            }
            thousandSeparator=" "
            decimalScale={0}
            onKeyDown={(e) => e.keyCode === 13 && onBlurHandlerMin(e)}
            onChange={(e) =>
              setInputValueMinHandler(
                String(e.target.value).replaceAll(' ', '')
              )
            }
            onBlur={onBlurHandlerMin}
            isAllowed={({ floatValue }) => {
              return floatValue >= 0;
            }}
          />
          {/*<InputNumber*/}
          {/*  style={{*/}
          {/*    width: `${(String(inputValueMin).length + 1) * 10}px`,*/}
          {/*  }}*/}
          {/*  min={min}*/}
          {/*  value={*/}
          {/*    typeof inputValueMin === 'number'*/}
          {/*      ? numberWithSpace(inputValueMin)*/}
          {/*      : min*/}
          {/*  }*/}
          {/*  onChange={(value) => setInputValueMin(value)}*/}
          {/*  onBlur={onBlurHandlerMin}*/}
          {/*/>*/}
          <span className={styles.inputRangeSeparator}>—</span>
          <NumericFormat
            style={{
              width: `${(String(inputValueMax).length + 1) * 10}px`,
            }}
            min={min}
            max={max}
            maxLength={numberWithSpace(max)?.length}
            value={
              typeof inputValueMax === 'number'
                ? numberWithSpace(inputValueMax)
                : max
            }
            thousandSeparator=" "
            decimalScale={0}
            onKeyDown={(e) => e.keyCode === 13 && onBlurHandlerMax(e)}
            onChange={(e) =>
              setInputValueMaxHandler(
                String(e.target.value).replaceAll(' ', '')
              )
            }
            onBlur={onBlurHandlerMax}
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
          defaultValue={[min, max]}
          range
          step={step}
          onChange={onChangeSlideHandler}
          onChangeComplete={onAfterChangeHandler}
          value={[inputValueMin, inputValueMax]}
          tooltip={{
            open: false,
            formatter: (value) => numberWithSpace(value),
          }}
        />
      </div>
      <div className={styles.inputRangeSliderMinMaxValue}>
        <span>{formatterFunction(min)}</span>
        <span>{formatterFunction(max)}</span>
      </div>
    </div>
  );
}

export default FormRangeSliderDual;
