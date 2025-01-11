import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import {
  formatterFunction,
  generateImagePath,
} from '../../../helpers/functions';
import { HeartIcon, InfoIcon, PluseIcon } from '../../../assets/icon';
import { apiAddFavoriteProduct } from '../../../api';

function ProductCard({ view, card }) {
  const dispatch = useDispatch();

  const addFavoriteProductHandler = (id) => {
    const fetch = async () => {
      await apiAddFavoriteProduct(id);
    };

    fetch();
  };
  return (
    <div
      className={classNames(styles.productCard, {
        [styles.productCardRow]: view === 'row',
      })}
    >
      <div className={styles.productCardBody}>
        <div className={styles.productCardImg}>
          <img src={generateImagePath(card?.img)} alt="" />
        </div>
        <div className={styles.productCardTitle}> {card?.name}</div>
      </div>
      <div className={styles.productCardFooter}>
        <div className={styles.productCardPrice}>
          <span>{formatterFunction(card?.price)} ₽</span>
          <InfoIcon />
        </div>
        <div className={styles.productCardButtons}>
          <button
            type="button"
            className="e-btn e-btn-grey e-btn-medium"
            onClick={() => addFavoriteProductHandler(card?.id)}
          >
            <HeartIcon />
          </button>
          <button type="button" className="e-btn e-btn-black e-btn-medium">
            <PluseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
