import styles from './index.module.scss';
import { canArrayValues } from '../../../helpers/functions';
import FormRangeSliderDual from './FormRangeSliderDual';
import FormRangeSliderSingle from './FormRangeSliderSingle';

function FormRangeSlider({
  value,
  min,
  max,
  isDisabled = false,
  suffix,
  step = 1,
  onChange,
}) {
  return (
    <div className={styles.rangeSlider}>
      {canArrayValues(value) ? (
        <FormRangeSliderDual
          value={value}
          min={min}
          max={max}
          isDisabled={isDisabled}
          suffix={suffix}
          step={step}
          onChange={onChange}
        />
      ) : (
        <FormRangeSliderSingle
          value={value}
          min={min}
          max={max}
          isDisabled={isDisabled}
          suffix={suffix}
          step={step}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default FormRangeSlider;
