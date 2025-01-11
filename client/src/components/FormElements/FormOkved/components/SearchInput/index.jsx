import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import useDebounce from '../../hooks/useDebounce';
import { useIsMounted } from '../../hooks/useIsMounted';
import useAppContext from '../../hooks/useAppContext';

import style from './style.module.scss';
import { setOpenListOptions } from '../../store/actions';

import sprites from '../../images/sprites.svg?url';

const SearchInput = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const { state, dispatch } = useAppContext();
  const { isLoading } = state;
  const inputRef = useRef();

  const isMounted = useIsMounted();
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!isMounted) {
      if (debouncedSearchValue.length >= 3) {
        handleSearch(debouncedSearchValue);
        dispatch(setOpenListOptions(true));
      } else if (debouncedSearchValue === '') {
        handleSearch(debouncedSearchValue);
        dispatch(setOpenListOptions(false));
      }
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const onChange = (e) => {
    const val = e.target.value;
    const re = new RegExp(/^[\u0400-\u0484\u0487-\u052F\u1C80-\u1C88\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69F\uFE2E\uFE2F,.\s\-/№0-9"]*$/);

    if (val === '' || re.test(val)) {
      setSearchValue(val);
    }

    return;
  };

  const handleClearInput = (e) => setSearchValue('');

  return (
    <div
      className={classNames(style.searchInputWrapper, { [style.isValue]: searchValue !== '' })}
    >
      <div className={style.clearSearchInput} onClick={handleClearInput}>
        <svg>
          <use xlinkHref={`${sprites}#searchClear`} />
        </svg>
      </div>
      <input
        ref={inputRef}
        className={style.searchInput}
        type='text'
        value={searchValue}
        placeholder='Поиск по коду или названию'
        onChange={onChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default SearchInput;
