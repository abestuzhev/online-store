import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './index.module.scss';
import { fetchCards } from '../../store/reducers/cards/actionCreator';
import { canArrayValues } from '../../helpers/functions';
import ProductCard from './ProductCard/ProductCard';

function ProductList({ view, cards }) {
  const { isLoadingCard } = useSelector((state) => state.cards);

  return (
    <div
      className={classNames(styles.productList, {
        [styles.productListRow]: view === 'row',
      })}
    >
      {isLoadingCard ? (
        ''
      ) : (
        <>
          {canArrayValues(cards) &&
            cards.map((card, cardIndex) => {
              return (
                <div className={styles.productListItem} key={cardIndex}>
                  <ProductCard view={view} card={card} />
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default ProductList;
