import { Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';
import { SelectArrowIcon } from '../../../assets/icon';
import useWindowDimension from '../../../hooks/useWindowDimension';
import { canArrayValues, canObjectValues } from '../../../helpers/functions';
import FormSelectOutsideList from './FormSelectOutsideList';
import FormTargetItem from '../FormTargetItem';
import { generatePath } from '../../FormApp/helpers/helpers';
import constantsForm from '../../FormApp/helpers/constants';
import FormItem from '../FormItem';
import FormInput from '../FormInput';

function FormSelect({
  field,
  value,
  name,
  size = 'medium',
  placeholder,
  isMultiple = false,
  isSearch = false,
  isOutsideList = false,
  options,
  onChange,
  ...props
}) {
  const dispatch = useDispatch();
  const ref = useRef();
  const [isMobileSelect, setIsMobileSelect] = useState(false); // флаг мобильного селекта
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // флаг открытия селекта
  const [isDisabled, setIsDisabled] = useState(false);
  const labelPath = String(name).replace(
    constantsForm.TABS.ACTIVE,
    constantsForm.TABS.NAME
  );
  const [width] = useWindowDimension();

  useEffect(() => {
    // флаг мобильного отображения селекта
    setIsMobileSelect(width < 767);
  }, [width]);

  const findLabelByValue = (v, op) => {
    const result = op.find((el) => el.value === v);
    return result?.label;
  };

  // useEffect для инициализации
  useEffect(() => {
    // Для подстановки в общий список полей помимо value еще и label
    if (String(name)?.includes(constantsForm.TABS.ACTIVE)) {
      onChange({
        [name]: value,
        [labelPath]: findLabelByValue(value, options),
      });
    }
  }, []);

  const onSelectHandler = (value) => {
    if (onChange) {
      name
        ? onChange({
            [name]: value,
            ...(String(name)?.includes(constantsForm.TABS.ACTIVE) && {
              [labelPath]: findLabelByValue(value, options),
            }),
          })
        : onChange(value);
    }
  };

  const onChangeSelectHandler = (value) => {
    const validValue = canArrayValues(value)
      ? value?.filter((f) => !!f)
      : value;

    if (onChange) {
      name ? onChange({ [name]: validValue }) : onChange(validValue);
    }
  };

  // Функция удаления option для выносного списка
  const removeOptionHandler = (values, index) => {
    const filterCollection = values.filter((el, elIndex) => elIndex !== index);
    if (onChange) {
      name
        ? onChange({ [name]: filterCollection })
        : onChange(filterCollection);
    }
  };

  // Функция лоченности поля
  const setIsDisabledHandler = (value) => {
    setIsDisabled(value);

    const emptyValue = isMultiple ? [] : '';
    if (onChange && value) {
      name ? onChange({ [name]: emptyValue }) : onChange(emptyValue);
    }
  };

  const onSearchHandler = (value) => {
    if (onChange) {
      name ? onChange({ [name]: '' }) : onChange('');
    }
  };

  const tagRender = (props) => {
    return (
      <div>
        {canArrayValues(value) && (
          <span className="ant-select-selector-text">
            Выбрано: {value.length}
          </span>
        )}
      </div>
    );
  };

  const filterOption = (input, option) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  };

  return (
    <div
      ref={ref}
      className={classNames(styles.select, {
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.isDisabled]: field?.disabled,
      })}
    >
      <Select
        getPopupContainer={() => ref?.current}
        showSearch={isSearch}
        filterOption={isSearch && filterOption}
        placeholder={field?.pl || placeholder}
        suffixIcon={<SelectArrowIcon />}
        onSearch={onSearchHandler}
        disabled={field?.disabled || isDisabled}
        // onChange={onChangeSelectHandler}
        onSelect={onSelectHandler}
        value={value != '' ? value : null}
        listHeight={200}
        popupClassName={size}
        {...props}
        // open
      >
        {options?.map((item, ind) => (
          <Select.Option
            key={ind}
            value={String(item.value)}
            label={item.label}
            name="option"
          >
            <span>{item?.label || item?.name}</span>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default FormSelect;
