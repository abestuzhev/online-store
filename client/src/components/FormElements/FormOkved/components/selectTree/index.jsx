import { useEffect, useMemo, useRef, memo } from 'react';

import useAppContext from '../../hooks/useAppContext';
import { fetchItems, fetchSearchedItems } from '../../api';
import {
  setCheckedMainValue,
  setCheckedValues,
  setInitItems,
  setItems,
  setSearchValue,
} from '../../store/actions';

import ListOptions from '../ListOptions';
import ListRadioOptions from '../ListRadioOptions';
import Loader from '../Loader';
import SearchInput from '../SearchInput';

import style from './style.module.scss';
import { constants } from '@/helpers/constants';

const SelectTree = memo(() => {
  const { state, dispatch } = useAppContext();
  const { items, onlyMainChoice, isLoading } = state;

  const selectTreeRef = useRef();

  const getItems = () => {
    dispatch(setInitItems());
    fetchItems().then((response) => {
      if (!response.data.error) {
        dispatch(setItems(response.data.result));
      }
    });
  };

  const getSearchedItems = (value) => {
    dispatch(setInitItems());
    fetchSearchedItems(value).then((response) => {
      if (!response.data.error) {
        dispatch(setItems(response.data.result));
      } else {
        getItems();
      }
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  // handler for checkbox in ListOptions component
  const handleCheckbox = (value) => {
    dispatch(setCheckedValues(value));
  };

  const handleRadio = (value) => {
    dispatch(setCheckedMainValue(value));
  };

  // handler for search
  const handleSearch = (value) => {
    getSearchedItems(value);
    dispatch(setSearchValue(value));
  };

  const renderListOptions = useMemo(
    () =>
      items.map((item, index) =>
        onlyMainChoice ? (
          <ListRadioOptions
            key={`${item.value}_searchKey${index}`}
            item={item}
            handleCheckbox={handleRadio}
          />
        ) : (
          <ListOptions
            key={`${item.value}_searchKey${index}`}
            item={item}
            handleCheckbox={handleCheckbox}
          />
        )
      ),
    [items]
  );

  return (
    <div ref={selectTreeRef}>
      <SearchInput handleSearch={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {items && items.length > 0 ? (
            renderListOptions
          ) : (
            <div className={style.notFoundText}>
              По вашему запросу результатов не найдено. <br />
              Попробуйте изменить запрос
            </div>
          )}
        </>
      )}
    </div>
  );
});

SelectTree.displayName = 'SelectTree';

export default SelectTree;
