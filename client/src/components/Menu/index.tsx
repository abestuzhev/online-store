import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { canArrayValues } from '../../helpers/functions';
import { fetchCategories } from '../../store/reducers/categories/actionCreator';
import { fetchCards } from '../../store/reducers/cards/actionCreator';

function Menu() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const { categories, isLoadingCategories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCategories());
    };

    fetch();
  }, []);

  const onChangeHandler = (id, index) => {
    setActive(index);
    dispatch(fetchCards(id ? { typeId: id } : ''));
  };

  const setActiveHandler = (id) => {};
  return (
    <ul className={classNames(styles.menu)}>
      <li
        key={0}
        data-id={0}
        className={classNames(styles.menuItem, {
          [styles.menuItemActive]: active === 0,
        })}
        onClick={() => onChangeHandler(null, 0)}
      >
        <span>Все товары</span>
      </li>
      {canArrayValues(categories) &&
        categories.map((category, categoryIndex) => {
          return (
            <li
              key={category?.id}
              data-id={category?.id}
              className={classNames(styles.menuItem, {
                [styles.menuItemActive]: active === categoryIndex + 1,
              })}
              onClick={() => onChangeHandler(category?.id, categoryIndex + 1)}
            >
              <span>{category?.name}</span>
            </li>
          );
        })}
    </ul>
  );
}

export default Menu;
