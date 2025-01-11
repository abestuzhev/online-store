import { useEffect } from 'react';
import classNames from 'classnames';

import Table from '../Table';

import useAppContext from '../../hooks/useAppContext';
import { fetchItems } from '../../api';
import { saveCheckedItems } from '../../store/actions';

import style from './style.module.scss';

function CheckedItems({ setIsOkved, setIsMainOkved }) {
  const { state, dispatch } = useAppContext();
  const { saveItems, savedValues } = state;

  useEffect(() => {
    const paramsStr = savedValues.join(',');

    if (paramsStr) {
      fetchItems(paramsStr).then((response) => {
        if (response.status === 200) {
          const data = response.data.result.map((i) => {
            i.title = `${i.UF_CODE} ${i.UF_NAME}`;
            i.value = i.UF_CODE;

            delete i.ID;
            delete i.UF_CODE;
            delete i.UF_NAME;
            delete i.UF_DESCRIPTION;
            delete i.UF_FULL_DESCRIPTION;

            return i;
          });

          dispatch(saveCheckedItems(data));
        }
      });
    }
  }, [savedValues]);

  useEffect(() => {
    if (setIsOkved) {
      if (saveItems.length > 0) {
        setIsOkved(true);
      } else {
        setIsOkved(false);
      }
    }
  }, [saveItems]);

  return (
    <div className={style.checkedItemsContainer}>
      <div
        className={classNames('form-field__errorText', style.errorMessage)}
      />

      {saveItems.length > 0 && (
        <div>
          <Table
            saveItems={saveItems}
            setIsOkved={setIsOkved}
            setIsMainOkved={setIsMainOkved}
          />
        </div>
      )}
    </div>
  );
}

export default CheckedItems;
