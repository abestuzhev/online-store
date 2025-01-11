import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './actionCreator';

const initialState = {
  categories: [],
  activeCategoryCode: '',
  isLoadingCategories: true,
  errorCategories: '',
};

const setErrorHandler = (state, action) => {
  state.isLoadingCategories = false;
  state.errorCategories = action.payload;
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActiveCategoryCode: (state, action) => {
      state.activeCategoryCode = action.payload;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.isLoadingCategories = true;
      state.categories = [];
      state.errorCategories = '';
    },

    [fetchCategories.fulfilled]: (state, action) => {
      state.isLoadingCategories = false;
      state.errorCategories = '';
      state.categories = action.payload;
    },

    [fetchCategories.rejected]: setErrorHandler,
  },
});

export const { setActiveCategoryCode } = categoriesSlice.actions;

export default categoriesSlice.reducer;
