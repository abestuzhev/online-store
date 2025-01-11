import { useMemo } from 'react';
import classNames from 'classnames';

import useAppContext from '../../hooks/useAppContext';
import {
  removeCheckedItems,
  resetCheckedItems,
  setMain,
} from '../../store/actions';

import style from '../CheckedItems/style.module.scss';

import sprites from '../../images/sprites.svg?url';

function TableRow({
  value,
  title,
  editable = true,
  hint = false,
  index,
  setIsMainOkved,
}) {
  const { state, dispatch } = useAppContext();
  const {
    path,
    stepName,
    disabledItems,
    main,
    isChoiceDisabled,
    onlyMainChoice,
  } = state;

  const handleRemoveItem = (value) => {
    dispatch(removeCheckedItems(value));
    dispatch(resetCheckedItems());
  };

  const onChange = (e) => {
    if (e.target.checked) {
      dispatch(setMain({ title, value }));
      if (setIsMainOkved) setIsMainOkved(true);
    }
  };

  const checked = useMemo(() => {
    return main?.value == value;
  }, [main]);

  const renderInputs = () => {
    return disabledItems || stepName === 'CompanyLicense' ? (
      <input
        type="text"
        name={checked ? 'okved' : 'additionalOkved'}
        value={value}
        data-path={`${path}|okved|${index}`}
        className={style.licenseOkvedInput}
      />
    ) : (
      <div
        className={classNames(style.divTableCell, style.divTableCellFirst, {
          [style.divTableCellFirstDisabled]: isChoiceDisabled,
        })}
      >
        <label className={style.checkedItemsRadioWrap}>
          <input
            type="radio"
            name={checked ? 'okved' : 'additionalOkved'}
            value={value}
            onChange={onChange}
            checked={checked}
            data-required
            // required={true}
            data-path={`${path}|okved|${index}`}
            data-input-name="okved"
          />
          <span className={style.checkedItemsRadio} />
        </label>
      </div>
    );
  };

  const renderLastCol = () => {
    return disabledItems || !editable ? (
      <div className={!editable ? style.checkedItemsLockTooltip : ''}>
        <svg className={style.checkedItemsLockIcon}>
          <use xlinkHref={`${sprites}#disabled`} />
        </svg>
        {hint && !editable ? (
          <div className={style.checkedItemsLockTooltipWrapper}>
            <div
              className={style.checkedItemsLockTooltipContent}
              dangerouslySetInnerHTML={{ __html: hint }}
            />
          </div>
        ) : null}
      </div>
    ) : (
      <div
        className={style.checkedItemsDelete}
        onClick={() => handleRemoveItem(value)}
      >
        <svg className={style.checkedItemsDeleteIcon}>
          <use xlinkHref={`${sprites}#close`} />
        </svg>
        <span className={style.checkedItemsDeleteText}>Удалить</span>
      </div>
    );
  };

  const replacedTitle = title.replace(/[0-9.]/g, '');

  return (
    <div
      className={classNames(style.divTableRow, {
        [style.divTableRowDisabled]: disabledItems,
        [style.divTableRowWithoutBorder]: stepName === 'CompanyLicense',
      })}
      key={value}
    >
      {!onlyMainChoice && renderInputs()}

      <div className={classNames(style.divTableCell, style.divTableCellSecond)}>
        <div>
          <div
            className={classNames(style.checkedItemsCode, {
              [style.checkedItemsCodeDisabled]: !editable,
            })}
          >
            {value}
          </div>
          <div
            className={classNames(style.checkedItemsMobTitle, {
              [style.checkedItemsDisabled]: !editable,
            })}
          >
            {replacedTitle}
          </div>
          {checked && !onlyMainChoice && (
            <div
              className={classNames(
                style.checkedItemsDescr,
                style.checkedItemsDescrMob
              )}
            >
              Основной вид деятельности
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(style.divTableCell, style.divTableCellMobHide)}
      >
        <div
          className={classNames({
            [style.checkedItemsDisabled]: !editable,
          })}
        >
          {replacedTitle}
        </div>
        {checked && !onlyMainChoice && (
          <div className={style.checkedItemsDescr}>
            Основной вид деятельности
          </div>
        )}
      </div>
      <div
        className={classNames(style.divTableCell, style.divTableCellFourth, {
          [style.divTableCellFourthDisabled]: disabledItems,
        })}
      >
        {!onlyMainChoice && renderLastCol()}
      </div>
    </div>
  );
}

export default TableRow;
