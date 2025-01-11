import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetFavorites } from '../../../api';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  // eslint-disable-next-line func-names
  async function (_, thunkApi) {
    try {
      const response = await apiGetFavorites();

      if (response) {
        return response;
      }
      return thunkApi.rejectWithValue(`Нет списка продуктов`);
    } catch (error) {
      return thunkApi.rejectWithValue(`categories: ${error}`);
    }
  }
);
