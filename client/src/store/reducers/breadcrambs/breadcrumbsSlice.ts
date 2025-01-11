import { createSlice } from '@reduxjs/toolkit';
import { constants } from '../../../helpers/constants';

const initialState = {
  list: {
    default: [
      {
        path: '/',
        name: 'Главная',
        number: 1,
      },
    ],
    user: [],
  },
};

const setErrorHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumb: (state, action) => {
      state.list.user = action?.payload;
    },
  },

  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { setModal, setModalShow, setBreadcrumb } =
  breadcrumbsSlice.actions;

export default breadcrumbsSlice.reducer;
