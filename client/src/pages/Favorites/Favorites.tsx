import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NavBack from '../../components/NavBack';
import { setBreadcrumb } from '../../store/reducers/breadcrambs/breadcrumbsSlice';
import { fetchFavorites } from '../../store/reducers/favorites/actionCreator';
import { fetchCards } from '../../store/reducers/cards/actionCreator';
import ProductList from '../../components/ProductList';

function Favorites() {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchFavorites());
      await dispatch(fetchCards());
    };

    fetch();
    dispatch(
      setBreadcrumb([
        {
          path: '/',
          name: 'Избранное',
          number: 4,
        },
      ])
    );

    return () => {
      dispatch(setBreadcrumb([]));
    };
  }, []);

  return (
    <div className="pageLayout">
      <NavBack text="К каталогу" />
      <div className="pageTitle">
        <h2>Избранное</h2>
      </div>

      <ProductList cards={favorites} />
    </div>
  );
}

export default Favorites;
