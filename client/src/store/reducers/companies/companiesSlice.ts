import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanies, fetchProducts } from './actionCreator';

const initialState = {
  companies: [],
  isLoadingCompanies: false,
  error: '',
};

const setErrorHandler = (state, action) => {
  state.isLoadingCompanies = false;
  state.error = action.payload;
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompanies.pending]: (state) => {
      state.isLoadingCompanies = true;
      state.companies = [];
      state.error = '';
    },

    [fetchCompanies.fulfilled]: (state, action) => {
      state.isLoadingCompanies = false;
      state.error = '';
      state.companies = action.payload;
    },

    [fetchCompanies.rejected]: setErrorHandler,
  },
});

export default companiesSlice.reducer;
