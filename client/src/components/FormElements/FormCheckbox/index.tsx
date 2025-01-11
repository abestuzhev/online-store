import { useDispatch } from 'react-redux';
import { Input, Checkbox } from 'antd';
import styles from './index.module.scss';

function FormCheckbox({ field, name, value, onChange, placeholder, ...props }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const valueInput = e.target.checked;
    if (onChange) {
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };

  return (
    <div className="e-input">
      <div className="e-input-wrapper">
        <Checkbox
          checked={value}
          onChange={onChangeHandler}
          id={props.id}
          placeholder={field?.pl || placeholder}
          disabled={field?.disabled}
          name={name}
          {...props} // важный элеент для корретной работы валидации ant form
        >
          {field?.label && (
            <span
              className={styles.checkboxLabel}
              dangerouslySetInnerHTML={{ __html: field?.label }}
            />
          )}
        </Checkbox>
      </div>
    </div>
  );
}

export default FormCheckbox;
