import { useState, useMemo } from 'react';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';

import useAppContext from '../../hooks/useAppContext';

import style from './style.module.scss';

import sprites from '../../images/sprites.svg?url';

const ListRadioOptions = ({ item, handleCheckbox }) => {
  const { state } = useAppContext();
  const { searchValue, openListRadioOptions, checkedMainValue, main } = state;
  const [opened, setOpened] = useState(openListRadioOptions);

  const removeCheckbox = () => {
    const replacedValue = item.value.replace('.', '');

    if (4 > replacedValue.length) {
      item.disabled = true;
    }

    return item;
  };

  const onChange = () => handleCheckbox({ title, value });

  const { checkbox, title, value, disabled, childrens, name } = removeCheckbox();

  const checked = useMemo(() => {
    return Object.keys(checkedMainValue).length
      ? checkedMainValue.value === value : main.value === value;
  }, [checkedMainValue]);

  const replacedTitle = reactStringReplace(title, searchValue, (match) => (
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
            <use
              xlinkHref={`${sprites}#down`}
            />
          </svg>
        </div>

        <div className={style.listTitle}>
          <label className={style.listLabel}>
            {checkbox && (
              <div className={style.listCheckbox}>
                <input
                  type='radio'
                  name={name}
                  value={String(value)}
                  data-value={String(value)}
                  data-title={title}
                  checked={checked}
                  disabled={disabled}
                  className={classNames({ 'is-checked': checked })}
                  onChange={onChange}
                />
                {!disabled &&
                  <span className={style.listCheckboxCircle}>
                    {checked &&
                      <div className={style.listRadioDot} />
                    }
                  </span>
                }
              </div>
            )}
          </label>
          <div>{searchValue ? replacedTitle : title}</div>
        </div>
      </div>

      {(childrens && opened) && (
        <div
          className={classNames(style.listInner, { [style.listInnerOpened]: opened })}
        >
          {childrens.map((child, index) => (
            <ListRadioOptions key={index} item={child} handleCheckbox={handleCheckbox} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListRadioOptions;
