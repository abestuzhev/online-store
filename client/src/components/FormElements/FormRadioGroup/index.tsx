import { Radio } from 'antd';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';
import { canArrayValues } from '../../../helpers/functions';

function FormRadioGroup({ field, value, name, onChange, ...props }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const valueInput = e.target.value;
    if (onChange) {
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };

  return (
    <div
      className={classNames(styles.radioGroup, {
        [styles.radioGroupHorizontal]: field.optionsDirection === 'horizontal',
      })}
    >
      <Radio.Group
        name={name}
        value={value}
        onChange={onChangeHandler}
        {...props}
      >
        {canArrayValues(field.options) &&
          field.options.map((option) => {
            return (
              <Radio key={String(option.value)} value={String(option.value)}>
                {option.name}
              </Radio>
            );
          })}
      </Radio.Group>
    </div>
  );
}

export default FormRadioGroup;
