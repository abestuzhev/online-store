import { AutoComplete } from 'antd';
import { apiGetAddress, apiGetSearchApi } from '../../../api';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { canArrayValues } from '../../../helpers/functions';
import useDebounce from '../../../hooks/useDebounce';
import classNames from 'classnames';
const { Option } = AutoComplete;

const FormAutoCompleteAddress = ({
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
  const [inputValue, setInputValue] = useState(value);
  const onFocusHandler = async (e) => {
    // console.log('e', e);
  };

  const valueDebounce = useDebounce(inputValue, 500);

  // Запрос данных при вводе нужного адреса
  const fetchOptionListHandler = async (v) => {
    if (String(v)?.length >= 3) {
      const response = await apiGetAddress({
        remoteUrl: 'address/search/',
        value: v,
      });

      if (canArrayValues(response?.result)) {
        const addressList = response?.result.map((el, elIndex) => ({
          ...el,
          id: `${el?.FIAS_GUID}-[${elIndex}]`,
          value: el?.ADDRESS,
          name: el?.ADDRESS,
        }));
        setOptionList(addressList);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchOptionListHandler(valueDebounce);
    };
    fetch();
  }, [valueDebounce]);

  const onChangeHandler = async (value) => {
    const strValue = String(value);
    // await fetchOptionListHandler();

    setInputValue(value);

    // При изменении значения в поле обнуляем прошлый результат, пока не будет выбран новый через option
    if (onChange) {
      name ? onChange({ [name]: '' }) : onChange('');
    }

    if (!!value) {
      setOptionList([]);
    }
  };

  const onSelectHandler = (value) => {
    const strValue = String(value);
    setInputValue(strValue);
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
        value={inputValue}
        notFoundContent="Нет данных, удовлетворяющих условию поиска"
        // onFocus={(e) => onFocusHandler(e)}
        onSearch={(value) => onChangeHandler(value)}
        onSelect={(value) => onSelectHandler(value)}
        // onBlur={onBlurFun}
        {...props}
      >
        {optionList.map((option) => {
          return (
            <Option key={option?.id} value={option.value}>
              {option?.name}
            </Option>
          );
        })}
      </AutoComplete>
    </div>
  );
};

export default FormAutoCompleteAddress;
