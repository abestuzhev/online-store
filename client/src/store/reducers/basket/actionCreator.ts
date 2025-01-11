import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetBasketProducts } from '../../../api';

export const fetchBasketProducts = createAsyncThunk(
  'basket/fetchBasketProducts',
  // eslint-disable-next-line func-names
  async function (payload, thunkApi) {
    try {
      const response = await apiGetBasketProducts();

      if (response) {
        return response;
      }
      return thunkApi.rejectWithValue(`Нет списка продуктов`);
    } catch (error) {
      return thunkApi.rejectWithValue(`categories: ${error}`);
    }
  }
);
