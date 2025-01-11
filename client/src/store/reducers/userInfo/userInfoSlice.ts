import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './actionCreator';
import { modalsSlice } from '../modals/modalsSlice';

const initialState = {
  userInfo: {},
  isLoadingUser: false,
  error: '',
  isDevMode: false,
};

const setErrorHandler = (state, action) => {
  state.isLoadingUser = false;
  state.error = action.payload;
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setDevMode: (state, action) => {
      state.isDevMode = action.payload;
    },
  },

  extraReducers: {
    [fetchUserInfo.pending]: (state) => {
      state.isLoadingUser = true;
      state.userInfo = {};
      state.error = '';
    },

    [fetchUserInfo.fulfilled]: (state, action) => {
      state.isLoadingUser = false;
      state.userInfo = action.payload;
      state.error = '';
    },

    [fetchUserInfo.rejected]: setErrorHandler,
  },
});
export const { setDevMode } = userInfoSlice.actions;
export default userInfoSlice.reducer;
