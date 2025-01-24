import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import Menu from '../Menu';
import { BasketIcon, FavoriteIcon, UserIcon } from '../../assets/icon';
import { setModal } from '../../store/reducers/modals/modalsSlice';
import { constants } from '../../helpers/constants';

function Header() {
  const dispatch = useDispatch();

  const authHandler = () => {
    dispatch(
      setModal({
        type: 'ModalAuth',
        content: {
          title: 'Авторизация',
        },
      })
    );
  };

  const errorHandler = () => {
    dispatch(
      setModal({
        type: 'ModalMessage',
        content: {
          title: 'Что-то пошло не так.',
          size: 'medium',
          text: 'Не переживайте, мы уже чиним. Попробуйте обновить страницу или зайти в сервис чуть позже',
        },
      })
    );
  };

  return (
    <div className={styles.header}>
      <div className="pageLayout">
        <div className={styles.headerWrapper}>
          <div className={styles.headerLayout}>
            <div className={styles.headerLogo} onClick={errorHandler}>
              <div className={styles.headerLogoImg} />
              SoundHub
            </div>
          </div>
          <Menu />
          <div className={styles.headerOperation}>
            <button
              type="button"
              className={styles.headerOperationButton}
              onClick={authHandler}
            >
              <UserIcon />
              <span>Вход</span>
            </button>
            <Link
              to={constants.PAGES.FAVORITES}
              type="button"
              className={styles.headerOperationButton}
            >
              <FavoriteIcon />
              <span>Избранное</span>
            </Link>
            <Link
              to={constants.PAGES.BASKET}
              type="button"
              className={styles.headerOperationButton}
            >
              <BasketIcon />
              <span>Корзина</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
