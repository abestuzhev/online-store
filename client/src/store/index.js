import { configureStore } from '@reduxjs/toolkit';
import modalsReducer from './reducers/modals/modalsSlice';
import cardsReducer from './reducers/cards/cardsSlice';
import userInfoReducer from './reducers/userInfo/userInfoSlice';
import breadcrumbsReducer from './reducers/breadcrambs/breadcrumbsSlice';
import appReducer from './reducers/app/appSlice';
import companiesReducer from './reducers/companies/companiesSlice';
import categoriesReducer from './reducers/categories/categoriesSlice';
import basketReducer from './reducers/basket/basketSlice';
import favoritesReducer from './reducers/favorites/favoritesSlice';

const store = configureStore({
  reducer: {
    application: appReducer,
    userInfo: userInfoReducer,
    cards: cardsReducer,
    modals: modalsReducer,
    breadcrumbs: breadcrumbsReducer,
    companies: companiesReducer,
    categories: categoriesReducer,
    basket: basketReducer,
    favorites: favoritesReducer,
  },
});

// Вывод стора в консоль
// window.s = store.getState();

export default store;
