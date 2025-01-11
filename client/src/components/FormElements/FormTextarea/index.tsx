import TextareaAutosize from 'react-textarea-autosize';
import styles from './index.module.scss';

function FormTextarea({ field, value, name, onChange, ...props }) {
  const onChangeHandler = (e) => {
    const valueInput = e.target.value;
    if (onChange) {
      name ? onChange({ [name]: valueInput }) : onChange(valueInput);
    }
  };

  return (
    <div className={styles.textarea}>
      <TextareaAutosize
        name={name}
        disabled={field?.disabled}
        minRows={1}
        maxRows={7}
        value={value}
        onChange={onChangeHandler}
        placeholder={field?.pl}
        {...props}
      />
    </div>
  );
}

export default FormTextarea;
