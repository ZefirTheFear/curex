import * as scrollActionTypes from "../actions/scrollActions/scrollActionTypes";

interface ScrollState {
  scrollToCalc: number;
  scrollToExchange: number;
  scrollToWhyUs: number;
  scrollToContacts: number;
}

const initialState: ScrollState = {
  scrollToCalc: 0,
  scrollToExchange: 0,
  scrollToWhyUs: 0,
  scrollToContacts: 0
};

const store = (state = initialState, action: scrollActionTypes.ScrollActionType): ScrollState => {
  switch (action.type) {
    case scrollActionTypes.SCROLL_TO_CALC:
      return { ...state, scrollToCalc: state.scrollToCalc + 1 };

    case scrollActionTypes.SCROLL_TO_EXCHANGE:
      return { ...state, scrollToExchange: state.scrollToExchange + 1 };

    case scrollActionTypes.SCROLL_TO_WHY_US:
      return { ...state, scrollToWhyUs: state.scrollToWhyUs + 1 };

    case scrollActionTypes.SCROLL_TO_CONTACTS:
      return { ...state, scrollToContacts: state.scrollToContacts + 1 };

    default:
      return state;
  }
};

export default store;
