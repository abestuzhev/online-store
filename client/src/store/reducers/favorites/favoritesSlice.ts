import { createSlice } from '@reduxjs/toolkit';
import { fetchBasketProducts, fetchFavorites } from './actionCreator';

const initialState = {
  favorites: [],
  total: 0,
  isLoadingFavorites: true,
  errorCategories: '',
};

const setErrorHandler = (state, action) => {
  state.isLoadingFavorites = false;
  state.errorFavorites = action.payload;
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
  extraReducers: {
    [fetchFavorites.pending]: (state) => {
      state.isLoadingFavorites = true;
      state.favorites = [];
      state.errorFavorites = '';
    },

    [fetchFavorites.fulfilled]: (state, action) => {
      state.isLoadingFavorites = false;
      state.errorFavorites = '';
      state.favorites = action.payload;
    },

    [fetchFavorites.rejected]: setErrorHandler,
  },
});

export const { setTotal } = favoritesSlice.actions;

export default favoritesSlice.reducer;
