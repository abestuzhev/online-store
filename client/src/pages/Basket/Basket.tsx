import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NavBack from '../../components/NavBack';
import { setBreadcrumb } from '../../store/reducers/breadcrambs/breadcrumbsSlice';
import { fetchBasketProducts } from '../../store/reducers/basket/actionCreator';

function Basket() {
  const dispatch = useDispatch();

  const { basketProducts } = useSelector((state) => state.basket);

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchBasketProducts());
    };

    dispatch(
      setBreadcrumb([
        {
          path: '/',
          name: 'Корзина',
          number: 2,
        },
      ])
    );

    fetch();
    return () => {
      dispatch(setBreadcrumb([]));
    };
  }, []);

  return (
    <div className="pageLayout">
      <NavBack text="К каталогу" />
      <div className="pageTitle">
        <h2>Корзина</h2>
      </div>
    </div>
  );
}

export default Basket;
