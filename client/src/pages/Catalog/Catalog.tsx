import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavBack from '../../components/NavBack';
import { fetchCards } from '../../store/reducers/cards/actionCreator';
import ProductList from '../../components/ProductList';
import Brands from '../../components/Brands';
import { ViewColIcon, ViewRowIcon } from '../../assets/icon';
import ProductListView from '../../components/ProductList/ProductListView/ProductListView';
import styles from './index.module.scss';
import { fetchCategories } from '../../store/reducers/categories/actionCreator';
import { fetchCompanies } from '../../store/reducers/companies/actionCreator';

function Catalog() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { view, cards } = useSelector((state) => state.cards);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCards());
    };

    fetch();
  }, []);
  return (
    <div className="pageLayout">
      {/* <NavBack text="К категориям" /> */}
      <div className={styles.filterBar}>
        <Brands />
        <ProductListView />
      </div>

      <ProductList view={view} cards={cards} />
    </div>
  );
}

export default Catalog;
