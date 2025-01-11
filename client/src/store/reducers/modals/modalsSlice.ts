import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: {},
  type: '',
  isShow: false,
  isLoadingModal: false,
};

const setErrorHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.isShow = true;
      state.type = action.payload.type;
      state.content = action?.payload?.content;
    },
    setModalShow: (state, action) => {
      state.type = '';
      state.isShow = action.payload;
    },

    clearContent: (state) => {
      state.content = {};
    },
  },

  extraReducers: {
    //
    // [fetchDetailEvent.pending]: (state) => {
    //     state.isLoading = true
    //     state.error = ""
    // },
    // [fetchDetailEvent.fulfilled]: (state, action) => {
    //     state.isLoading = false
    //     state.currentModal.eventDetail = action.payload
    //     state.error = ""
    // },
    // [fetchDetailEvent.rejected]: setErrorHandler,
  },
});

// Action creators are generated for each case reducer function
export const { setModal, setModalShow, clearContent } = modalsSlice.actions;

export default modalsSlice.reducer;
