import {
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import ProductList from '../../../components/ProductList';
import { fetchFavorites } from '../../../store/reducers/favorites/actionCreator';
import { fetchCards } from '../../../store/reducers/cards/actionCreator';
import { setBreadcrumb } from '../../../store/reducers/breadcrambs/breadcrumbsSlice';
import Loader from '../../../components/Loader';
import { fetchCategories } from '../../../store/reducers/categories/actionCreator';
import { canArrayValues } from '../../../helpers/functions';
import FormItemLabel from '../../../components/FormElements/FormItemLabel';
import FormInput from '../../../components/FormElements/FormInput';

function DashboardCategory() {
  const dispatch = useDispatch();
  const { categories, isLoadingCategories } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCategories());
    };

    fetch();
  }, []);
  return (
    <div>
      {isLoadingCategories ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <div className="dashboardTableRow">
            {Object.keys(categories[0]).map((key) => {
              return (
                <div className="dashboardTableCol">
                  <div>{key}</div>
                </div>
              );
            })}
          </div>
          {canArrayValues(categories) &&
            categories.map((category) => {
              return (
                <div className="dashboardTableRow">
                  {Object.keys(category).map((key) => {
                    return (
                      <div className="dashboardTableCol">
                        <div>{category[key]}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

          <div className="dashboardBar dashboardBarHalf">
            <div className="dashboardBarTitle">Добавление нового элемента</div>
            <div className="dashboardBarBody">
              <div className="formSection formSectionColumn">
                <div className="formSectionBody">
                  <div className="formSectionField">
                    <FormItemLabel
                      field={{ required: true, name: 'Категория продукта' }}
                      name="brand"
                    />
                    <FormInput />
                  </div>
                </div>
                <div className="formSectionFooter">
                  <button
                    type="button"
                    className="e-btn e-btn-outline e-btn-medium"
                  >
                    Добавить категорию
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardCategory;
