import { Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import '@/assets/scss/main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import WrapperPage from './pages/WrapperPage';
import Loader from './components/Loader';

import 'react-loading-skeleton/dist/skeleton.css';
import configAnt, { generateLocaleProvider } from './config/ant';
import { CatalogAsync } from './pages/Catalog/Catalog.async';
import { AuthAsync } from './pages/Auth/Auth.async';
import { BasketAsync } from './pages/Basket/Basket.async';
import NotFound from './pages/NotFound';
import { constants } from './helpers/constants';
import ModalBuilder from './components/Modal/ModalBuilder';
import Header from './components/Header';
import { FavoritesAsync } from './pages/Favorites/Favorites.async';
import Dashboard from './pages/Dashboard/Dashboard';
import { DashboardAsync } from './pages/Dashboard/Dashboard.async';
import { DashboardProductsAsync } from './pages/Dashboard/DashboardProducts/DashboardProducts.async';
import { DashboardBrandsAsync } from './pages/Dashboard/DashboardBrands/DashboardBrands.async';
import { DashboardCategoryAsync } from './pages/Dashboard/DashboardCategory/DashboardCategory.async';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const router = createBrowserRouter([
    {
      path: constants.PAGES.INDEX,
      element: <WrapperPage />,
      children: [
        {
          path: constants.PAGES.INDEX,
          element: <CatalogAsync />,
        },
        {
          path: constants.PAGES.LOGIN,
          element: <AuthAsync />,
        },
        {
          path: constants.PAGES.BASKET,
          element: <BasketAsync />,
        },
        {
          path: constants.PAGES.FAVORITES,
          element: <FavoritesAsync />,
        },
        {
          path: constants.PAGES.DASHBOARD,
          element: <DashboardAsync />,
          children: [
            {
              path: `${constants.PAGES.DASHBOARD}products/`,
              element: <DashboardProductsAsync />,
            },
            {
              path: `${constants.PAGES.DASHBOARD}category/`,
              element: <DashboardCategoryAsync />,
            },
            {
              path: `${constants.PAGES.DASHBOARD}brands/`,
              element: <DashboardBrandsAsync />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <ConfigProvider theme={configAnt} locale={generateLocaleProvider('ru')}>
      <div className="store">
        <Suspense
          fallback={
            <Loader
            // title={constants.LOADER.DEFAULT.TITLE}
            // text={constants.LOADER.DEFAULT.TEXT}
            />
          }
        >
          <RouterProvider router={router} />
        </Suspense>
        <ModalBuilder />
      </div>
    </ConfigProvider>
  );
}
