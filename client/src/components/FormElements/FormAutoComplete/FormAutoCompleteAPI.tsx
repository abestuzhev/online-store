import { AutoComplete } from 'antd';
import { apiGetAddress, apiGetSearchApi } from '../../../api';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { canArrayValues } from '../../../helpers/functions';
import useDebounce from '../../../hooks/useDebounce';
import classNames from 'classnames';
const { Option } = AutoComplete;

const FormAutoCompleteAPI = ({
  field,
  value,
  name,
  size,
  placeholder,
  isMultiple,
  isSearch,
  options,
  onChange,
  ...props
}) => {
  const [optionList, setOptionList] = useState([]);
  const onFocusHandler = async (e) => {
    // console.log('e', e);
  };

  const valueDebounce = useDebounce(value, 500);

  const fetchOptionListHandler = async () => {
    if (field?.remoteUrl && !!value && String(value)?.length >= 3) {
      const response = await apiGetSearchApi({
        remoteUrl: field?.remoteUrl,
        value,
      });
      setOptionList(response.result);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchOptionListHandler();
    };
    fetch();
  }, [valueDebounce]);

  const onChangeHandler = async (value) => {
    const strValue = String(value);
    // await fetchOptionListHandler();
    if (onChange) {
      name ? onChange({ [name]: strValue }) : onChange(strValue);
    }
  };

  const onSelectHandler = (value) => {
    const strValue = String(value);
    if (onChange) {
      name ? onChange({ [name]: strValue }) : onChange(strValue);
    }
  };

  return (
    <div
      className={classNames(styles.formAutocomplete, {
        [styles.isDisabled]: field?.disabled,
      })}
    >
      <AutoComplete
        disabled={field?.disabled}
        suffixIcon={false}
        placeholder={field?.pl || placeholder}
        role="presentation"
        filterOption={false}
        defaultActiveFirstOption={false}
        value={value}
        notFoundContent="Нет данных, удовлетворяющих условию поиска"
        // onFocus={(e) => onFocusHandler(e)}
        onSearch={(value) => onChangeHandler(value)}
        onSelect={(value) => onSelectHandler(value)}
        // onBlur={onBlurFun}
        {...props}
      >
        {optionList.map((option) => {
          return (
            <Option key={option?.id} value={Number(option.value)}>
              {option?.name}
            </Option>
          );
        })}
      </AutoComplete>
    </div>
  );
};

export default FormAutoCompleteAPI;
