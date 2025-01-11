import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { PlusIcon } from '../../../assets/icon';

function DashboardMenu() {
  return (
    <div className={styles.dashboardMenu}>
      <div className={styles.dashboardMenuItem}>
        <NavLink to="products/">Товары</NavLink>
        {/* <button className={styles.dashboardMenuBtn}> */}
        {/*  <PlusIcon /> */}
        {/* </button> */}
      </div>
      <div className={styles.dashboardMenuItem}>
        <NavLink to="category/">Категории</NavLink>
      </div>
      <div className={styles.dashboardMenuItem}>
        <NavLink to="brands/">Бренды</NavLink>
      </div>
    </div>
  );
}

export default DashboardMenu;
