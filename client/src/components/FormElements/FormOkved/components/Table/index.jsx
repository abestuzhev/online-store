import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse/lib/Collapse';

import useAppContext from '../../hooks/useAppContext';

import TableRow from './TableRow';

import style from '../CheckedItems/style.module.scss';

import sprites from '../../images/sprites.svg?url';

function Table({ saveItems, setIsOkved, setIsMainOkved }) {
  const { state } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const { stepName, disabledItems, isChoiceDisabled, onlyMainChoice } = state;

  useEffect(() => {
    if (saveItems.length <= 4) setIsOpen(false);

    if (setIsOkved) setIsOkved(true);
  }, [saveItems]);

  const renderTableRows = (startIndex, endIndex) => {
    return saveItems
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <TableRow
          key={item.value}
          index={index}
          {...item}
          setIsMainOkved={setIsMainOkved}
        />
      ));
  };

  const renderTableHeader = () => {
    return disabledItems || stepName === 'CompanyLicense' ? null : (
      <div className={style.divTableHeading}>
        <div className={style.divTableRow}>
          {!onlyMainChoice && (
            <div
              className={classNames(
                style.divTableHead,
                style.divTableHeadFirst,
                {
                  [style.divTableHeadFirstDisabled]: isChoiceDisabled,
                }
              )}
            >
              Основной
            </div>
          )}
          <div className={style.divTableHead}>Код</div>
          <div
            className={classNames(
              style.divTableHead,
              style.divTableHeadMobHide
            )}
          >
            Название
          </div>
          <div className={style.divTableHead}>&nbsp;</div>
        </div>
      </div>
    );
  };

  const renderButtonName = () => {
    return isOpen ? <span>Свернуть</span> : `Еще ${saveItems.slice(4).length}`;
  };

  return (
    <>
      <div className={style.divTable}>
        {renderTableHeader()}
        {/* render first fourth table row */}
        <div className={style.divTableBody}>{renderTableRows(0, 4)}</div>
      </div>

      {saveItems.length > 4 && (
        <>
          <Collapse
            isOpened={isOpen}
            theme={{ collapse: style.checkedItemsCollapse }}
          >
            <div className={style.divTable}>
              {/* render remaining table row in collapsed block */}
              <div className={style.divTableBody}>{renderTableRows(4)}</div>
            </div>
          </Collapse>
          <div
            className={style.checkedItemsCollapseBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            {renderButtonName()}
            <svg
              className={classNames(style.checkedItemsChevronDown, {
                [style._rotate]: isOpen,
              })}
            >
              <use xlinkHref={`${sprites}#down`} />
            </svg>
          </div>
        </>
      )}
    </>
  );
}

export default Table;
