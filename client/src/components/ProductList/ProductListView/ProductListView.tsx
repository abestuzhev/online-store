import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { ViewColIcon, ViewRowIcon } from '../../../assets/icon';
import { setView } from '../../../store/reducers/cards/cardsSlice';

function ProductListView() {
  const dispatch = useDispatch();

  const changeViewHandler = (type) => {
    dispatch(setView(type));
  };

  return (
    <div className={styles.view}>
      <div onClick={() => changeViewHandler('row')} className={styles.viewBtn}>
        <ViewRowIcon />
      </div>
      <div onClick={() => changeViewHandler('col')} className={styles.viewBtn}>
        <ViewColIcon />
      </div>
    </div>
  );
}

export default ProductListView;
