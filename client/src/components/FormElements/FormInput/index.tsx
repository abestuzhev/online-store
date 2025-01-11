import { useDispatch } from 'react-redux';
import { Input } from 'antd';

function FormInput({ field, name, value, onChange, placeholder, ...props }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const valueInput = e.target.value;
    if (onChange) {
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };

  return (
    <div className="e-input">
      <div className="e-input-wrapper">
        <Input
          id={props.id}
          placeholder={field?.pl || placeholder}
          disabled={field?.disabled}
          name={name}
          value={value}
          onChange={onChangeHandler}
          {...props} // важный элеент для корретной работы валидации ant form
        />
      </div>
    </div>
  );
}

export default FormInput;
