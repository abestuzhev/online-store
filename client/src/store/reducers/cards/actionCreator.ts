import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCards } from '../../../api';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async function (payload, thunkApi) {
    try {
      const response = await apiGetCards(payload);

      if (response) {
        return response;
      }

      return thunkApi.rejectWithValue(`Отсутствует авторизация`);
    } catch (error) {
      return thunkApi.rejectWithValue(`cards: ${error}`);
    }
  }
);
