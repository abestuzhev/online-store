import { createSlice } from '@reduxjs/toolkit';
import { fetchBasketProducts } from './actionCreator';

const initialState = {
  basketProducts: [],
  total: 0,
  isLoadingBasket: true,
  errorBasket: '',
};

const setErrorHandler = (state, action) => {
  state.isLoadingBasket = false;
  state.errorBasket = action.payload;
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
  extraReducers: {
    [fetchBasketProducts.pending]: (state) => {
      state.isLoadingBasket = true;
      state.basketProducts = [];
      state.errorBasket = '';
    },

    [fetchBasketProducts.fulfilled]: (state, action) => {
      state.isLoadingBasket = false;
      state.errorBasket = '';
      state.basketProducts = action.payload;
    },

    [fetchBasketProducts.rejected]: setErrorHandler,
  },
});

export const { setTotal } = basketSlice.actions;

export default basketSlice.reducer;
