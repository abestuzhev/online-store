import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDevMode: false,
  isLoadingPage: false,
  wrapper: {
    lock: false,
  },
  error: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsDevMode: (state, action) => {
      state.isDevMode = action?.payload;
    },
    setWrapperLock: (state, action) => {
      state.wrapper.lock = action?.payload;
    },
    setIsLoadingPage: (state, action) => {
      state.isLoadingPage = action?.payload;
    },
  },

  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { setIsDevMode, setWrapperLock, setIsLoadingPage } =
  appSlice.actions;

export default appSlice.reducer;
