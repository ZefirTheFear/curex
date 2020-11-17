import * as scrollActionTypes from "../actions/scrollActions/scrollActionTypes";

interface ScrollState {
  scrollToCalc: number;
  scrollToExchange: number;
  scrollToAboutUs: number;
  scrollToContacts: number;
}

const initialState: ScrollState = {
  scrollToCalc: 0,
  scrollToExchange: 0,
  scrollToAboutUs: 0,
  scrollToContacts: 0
};

const store = (state = initialState, action: scrollActionTypes.ScrollActionType): ScrollState => {
  switch (action.type) {
    case scrollActionTypes.SCROLL_TO_CALC:
      return { ...state, scrollToCalc: state.scrollToCalc + 1 };

    case scrollActionTypes.SCROLL_TO_EXCHANGE:
      return { ...state, scrollToExchange: state.scrollToExchange + 1 };

    case scrollActionTypes.SCROLL_TO_ABOUT_US:
      return { ...state, scrollToAboutUs: state.scrollToAboutUs + 1 };

    case scrollActionTypes.SCROLL_TO_CONTACTS:
      return { ...state, scrollToContacts: state.scrollToContacts + 1 };

    default:
      return state;
  }
};

export default store;
