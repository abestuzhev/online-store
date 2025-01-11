import { Input } from 'antd';
import styles from './index.module.scss';

function FormInputUrl({ field, name, value, onChange, ...props }) {
  const onChangeHandler = (e) => {
    const valueInput = e.target.value;
    if (onChange) {
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };
  return (
    <div className="e-input">
      <Input
        disabled={field.disabled}
        rules={{
          required: true,
          whitespace: true,
          message: 'errorMessage',
          type: 'url',
        }}
        value={value}
        placeholder={field?.pl}
        onChange={onChangeHandler}
        {...props}
      />
    </div>
  );
}

export default FormInputUrl;
