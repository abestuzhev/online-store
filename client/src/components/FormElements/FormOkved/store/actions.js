import { actionTypes } from './actionTypes';

export const setSavedValues = (values) => ({
  type: actionTypes.SET_SAVED_VALUES,
  payload: values,
});

export const setModalIsOpen = (value) => ({
  type: actionTypes.SET_IS_MODAL,
  payload: value,
});

export const setInitItems = () => ({ type: actionTypes.SET_INIT_ITEMS });

export const setItems = (value) => ({
  type: actionTypes.SET_ITEMS,
  payload: value,
});

export const setCheckedValues = (value) => ({
  type: actionTypes.SET_CHECKED_VALUES,
  payload: value,
});

export const setCheckedMainValue = (value) => ({
  type: actionTypes.SET_CHECKED_MAIN_VALUE,
  payload: value,
});

export const saveCheckedMainValue = (value) => ({
  type: actionTypes.SAVE_CHECKED_MAIN_VALUE,
  payload: value,
});

export const saveCheckedItems = (value) => ({
  type: actionTypes.SAVE_CHECKED_ITEMS,
  payload: value,
});

export const removeCheckedItems = (value) => ({
  type: actionTypes.REMOVE_CHECKED_ITEMS,
  payload: value,
});

export const resetCheckedItems = () => ({
  type: actionTypes.RESET_CHECKED_ITEMS,
});

export const setSearchValue = (value) => ({
  type: actionTypes.SET_SEARCH_VALUE,
  payload: value,
});

export const setPath = (value) => ({
  type: actionTypes.SET_PATH,
  payload: value,
});

export const setStepName = (value) => ({
  type: actionTypes.SET_STEP_NAME,
  payload: value,
});

export const setDisabledCheckedItems = (value) => ({
  type: actionTypes.SET_DISABLE_CHECKED_ITEMS,
  payload: value,
});

export const setOpenListOptions = (value) => ({
  type: actionTypes.SET_OPEN_LIST_OPTIONS,
  payload: value,
});

export const setMain = (value) => ({
  type: actionTypes.SET_MAIN,
  payload: value,
});

export const setToggleRadio = (value) => ({
  type: actionTypes.SET_TOGGLE_RADIO,
  payload: value,
});
