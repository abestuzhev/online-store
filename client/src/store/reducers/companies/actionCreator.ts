import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCompanies } from '../../../api';

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async function (_, thunkApi) {
    try {
      // Запрос на получение companies

      const response = await apiGetCompanies();

      if (response) {
        return response;
      }
      return thunkApi.rejectWithValue(`Отсутствует авторизация`);
    } catch (error) {
      return thunkApi.rejectWithValue(`companies: ${error}`);
    }
  }
);
