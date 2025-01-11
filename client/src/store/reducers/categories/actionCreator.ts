import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCategories, apiGetCategoriesFake } from '../../../api';
import { constants } from '../../../helpers/constants';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  // eslint-disable-next-line func-names
  async function (payload, thunkApi) {
    try {
      const response = await apiGetCategories();

      if (response) {
        return response;
      }
      return thunkApi.rejectWithValue(`Нет списка категорий`);
    } catch (error) {
      return thunkApi.rejectWithValue(`categories: ${error}`);
    }
  }
);
