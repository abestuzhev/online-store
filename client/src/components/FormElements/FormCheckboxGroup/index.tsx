import { useEffect, useState } from 'react';
import { Checkbox, Input } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import CrowdEmpty from '../../SectionEmpty';
import { canArrayValues } from '../../../helpers/functions';
import FormInput from '../FormInput';

function FormCheckboxGroup({ options, name, onChange, value }) {
  const dispatch = useDispatch();
  const [checkboxOptions, setCheckboxOptions] = useState(options);
  const [searchText, setSearchText] = useState('');

  const onChangeHandler = (values) => {
    !!onChange && onChange(values);
  };

  useEffect(() => {
    setCheckboxOptions(options);
  }, [options]);

  useEffect(() => {
    searchText === '' && setCheckboxOptions(options);
  }, [searchText]);

  const onSearchHandler = (value) => {
    const str = value?.toLowerCase();
    setSearchText(str);

    if (searchText) {
      const filterElements = options?.filter((field) => {
        const result = field.label.toLowerCase().match(str);
        return result;
      });

      setCheckboxOptions(filterElements);
    } else {
      setCheckboxOptions(options);
    }
  };

  return (
    <>
      <div className={styles.checkboxGroupSearch}>
        <FormInput
          placeholder="Введите название"
          value={searchText}
          onChange={onSearchHandler}
        />
      </div>

      <div className={styles.checkboxGroup}>
        {canArrayValues(checkboxOptions) ? (
          <div>
            <Checkbox.Group
              style={{
                width: '100%',
              }}
              value={value}
              onChange={onChangeHandler}
            >
              {checkboxOptions.map((option, index) => {
                return (
                  <Checkbox key={option.value} value={option.value}>
                    {option.label}
                  </Checkbox>
                );
              })}
            </Checkbox.Group>
          </div>
        ) : (
          <CrowdEmpty text="Ничего не найдено" />
        )}
      </div>
    </>
  );
}

export default FormCheckboxGroup;
