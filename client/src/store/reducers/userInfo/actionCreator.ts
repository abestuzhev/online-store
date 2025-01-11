import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetUserInfo,
} from '../../../api';

export const fetchUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async function (_, thunkApi) {
    try {
      const response = await apiGetUserInfo()

      if (response.success || response.status) {
        return response.result;
      }
      return thunkApi.rejectWithValue(`userInfo: ${response?.message}`);
    } catch (error) {
      return thunkApi.rejectWithValue(`userInfo: ${error}`);
    }
  }
);
