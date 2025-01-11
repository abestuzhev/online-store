import FormAutoCompleteAddress from './FormAutoCompleteAddress';
import FormAutoCompleteAPI from './FormAutoCompleteAPI';
import { generatePath } from '../../FormApp/helpers/helpers';

const FormAutoComplete = ({
  field,
  value,
  name,
  size = 'medium',
  placeholder,
  isMultiple = false,
  isSearch = false,
  options,
  onChange,
  ...props
}) => {
  const generateFieldAutoComplete = () => {
    // Возвращает для компонента с адресом
    if (field?.type === 'search') {
      return (
        <FormAutoCompleteAddress
          field={field}
          value={value}
          name={name}
          size={size}
          placeholder={placeholder}
          isMultiple={isMultiple}
          isSearch={isSearch}
          options={options}
          onChange={onChange}
          {...props}
        />
      );
    }

    return (
      <FormAutoCompleteAPI
        field={field}
        value={value}
        name={name}
        size={size}
        placeholder={placeholder}
        isMultiple={isMultiple}
        isSearch={isSearch}
        options={options}
        onChange={onChange}
        {...props}
      />
    );
  };

  return <>{generateFieldAutoComplete()}</>;
};

export default FormAutoComplete;
