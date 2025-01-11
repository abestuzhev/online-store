import { actionTypes } from './actionTypes';

export const initialState = {
  savedValues: [],
  modalIsOpen: false,
  items: [],
  saveItems: [],
  checkedValues: [],
  checkedMainValue: {},
  searchValue: null,
  isLoading: false,
  radioButtons: {},
  main: {},
  path: '',
  stepName: '',
  disabledItems: false,
  openListOptions: false,
  checkedHistory: [],
  isChoiceDisabled: false,
  isPossibleToAdd: true,
  onlyMainChoice: true,
};

export const okwedReducer = (state, { type, payload }) => {
  switch (type) {
    // record valid values for getting previously added okweds

    case actionTypes.SET_TOGGLE_RADIO: {
      const radioButtonsClone = { ...state.radioButtons };

      for (const key in radioButtonsClone) {
        radioButtonsClone[key] = key === payload.value;
      }

      return {
        ...state,
        radioButtons: {
          ...radioButtonsClone,
          [payload.value]: payload.checked,
        },
      };
    }

    case actionTypes.SET_SAVED_VALUES: {
      return {
        ...state,
        savedValues: payload,
      };
    }
    //  toggle modal
    case actionTypes.SET_IS_MODAL: {
      return {
        ...state,
        modalIsOpen: payload,
      };
    }
    // init request on the server
    case actionTypes.SET_INIT_ITEMS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    // write okweds with check checkboxes
    case actionTypes.SET_ITEMS: {
      return {
        ...state,
        items: payload,
        isLoading: false,
      };
    }
    // write values for toggle checkbox
    case actionTypes.SET_CHECKED_VALUES: {
      const checkVal =
        state.checkedValues.findIndex((item) => item.value == payload.value) >
        -1
          ? state.checkedValues.filter((v) => v.value !== payload.value)
          : [...state.checkedValues, payload];

      return {
        ...state,
        checkedValues: checkVal,
      };
    }

    case actionTypes.SET_CHECKED_MAIN_VALUE: {
      return {
        ...state,
        checkedMainValue: payload,
      };
    }

    case actionTypes.SAVE_CHECKED_MAIN_VALUE: {
      const checkVal =
        state.saveItems.findIndex((item) => item.value == payload.value) > -1
          ? [...state.saveItems.filter((item) => item?.editable === false)]
          : [
              payload,
              ...state.saveItems.filter((item) => item?.editable === false),
            ];
      return {
        ...state,
        saveItems: checkVal,
      };
    }

    //  save okweds
    case actionTypes.SAVE_CHECKED_ITEMS: {
      return {
        ...state,
        saveItems: payload,
      };
    }
    // remove okweds
    case actionTypes.REMOVE_CHECKED_ITEMS: {
      const radioButtons = { ...state.radioBittons };

      delete radioButtons[payload];
      return {
        ...state,
        main: state.main.value === payload ? {} : { ...state.main },
        saveItems: [
          ...[...state.saveItems].filter((si) => si.value !== payload),
        ],
        radioButtons,
      };
    }
    // reset okweds
    case actionTypes.RESET_CHECKED_ITEMS: {
      return {
        ...state,
        checkedValues: state.saveItems,
      };
    }
    // write search value
    case actionTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: payload,
      };
    // set main okved
    case actionTypes.SET_MAIN: {
      return {
        ...state,
        main: payload,
      };
    }
    // set path for radio buttons
    case actionTypes.SET_PATH: {
      return {
        ...state,
        path: payload,
      };
    }
    // write step name
    case actionTypes.SET_STEP_NAME: {
      return {
        ...state,
        stepName: payload,
      };
    }
    // disabled checked items
    case actionTypes.SET_DISABLE_CHECKED_ITEMS: {
      return {
        ...state,
        disabledItems: payload,
      };
    }
    case actionTypes.SET_OPEN_LIST_OPTIONS: {
      return {
        ...state,
        openListOptions: payload,
      };
    }
    default:
      return state;
  }
};
