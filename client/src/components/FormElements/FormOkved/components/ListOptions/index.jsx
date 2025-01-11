import { useState, useMemo } from 'react';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';

import useAppContext from '../../hooks/useAppContext';

import style from './style.module.scss';

import sprites from '../../images/sprites.svg?url';
import { CheckIcon } from '@/assets/icon';

function ListOptions({ item, handleCheckbox }) {
  const { state } = useAppContext();
  const { searchValue, openListOptions, checkedValues } = state;
  const [opened, setOpened] = useState(openListOptions);

  const removeCheckbox = () => {
    const replacedValue = item.value.replace('.', '');

    if (replacedValue.length < 4) {
      item.disabled = true;
    }

    return item;
  };

  const onChange = () => handleCheckbox({ title, value });

  const { checkbox, title, value /* , checked */, disabled, childrens, name } =
    removeCheckbox();

  const checked = useMemo(() => {
    return checkedValues.findIndex((item) => item?.value == value) > -1;
  }, [checkedValues]);

  const disabledField = useMemo(() => {
    return (
      checkedValues.findIndex(
        (item) => item?.value == value && item?.editable === false
      ) > -1
    );
  }, [checkedValues]);

  const replacedTitle = reactStringReplace(title, searchValue, (match, i) => (
    <strong>{match}</strong>
  ));

  return (
    <div className={style.list}>
      <div className={style.listControl} onClick={() => setOpened(!opened)}>
        <div
          className={classNames(style.listIcon, {
            [style.listIconRotate]: opened,
            [style.listIconHide]: !(childrens && childrens.length > 0),
          })}
        >
          <svg>
            <use xlinkHref={`${sprites}#down`} />
          </svg>
        </div>

        <div className={style.listTitle}>
          <label className={style.listLabel}>
            {checkbox && (
              <div className={style.listCheckbox}>
                <input
                  type="checkbox"
                  name={name}
                  value={String(value)}
                  data-value={String(value)}
                  data-title={title}
                  checked={checked}
                  disabled={disabled || disabledField}
                  className={classNames({ 'is-checked': checked })}
                  onChange={onChange}
                />
                {!disabled && (
                  <span className={style.listCheckboxSquare}>
                    {checked && <CheckIcon />}
                  </span>
                )}
              </div>
            )}
          </label>
          <div>{searchValue ? replacedTitle : title}</div>
        </div>
      </div>

      {childrens && opened && (
        <div
          className={classNames(style.listInner, {
            [style.listInnerOpened]: opened,
          })}
        >
          {childrens.map((child, index) => (
            <ListOptions
              key={index}
              item={child}
              handleCheckbox={handleCheckbox}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOptions;
