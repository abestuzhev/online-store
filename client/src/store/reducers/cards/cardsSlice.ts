import { createSlice } from '@reduxjs/toolkit';
import { fetchCards, fetchDetailCards } from './actionCreator';

const initialState = {
  cards: [],
  total: 0,
  view: 'col',
  isLoadingCards: true,
  errorCards: '',
};

const setErrorHandler = (state, action) => {
  state.isLoadingCards = false;
  state.errorCards = action.payload;
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    isSelect: (state, action) => {
      // state.cardsSelected = [...state.cardsSelected,action.payload]
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
  },

  extraReducers: {
    [fetchCards.pending]: (state) => {
      state.isLoadingCards = true;
      state.cards = [];
      state.error = '';
    },

    [fetchCards.fulfilled]: (state, action) => {
      state.isLoadingCards = false;
      state.error = '';
      state.cards = action.payload.rows;
      state.total = action.payload.count;
    },

    [fetchCards.rejected]: setErrorHandler,
  },
});

export const { setSelect, setView } = cardsSlice.actions;

export default cardsSlice.reducer;
