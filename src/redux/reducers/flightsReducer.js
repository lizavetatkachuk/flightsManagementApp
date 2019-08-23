import {
  SAVE_SEARCH_INFO,
  UPDATE_FLIGHTS
} from "../action-types/flightsActionTypes";

const initialState = {
  flights: [],
  searchInfo: {}
};

export const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SEARCH_INFO:
      return { ...state, searchInfo: action.payload };
    case UPDATE_FLIGHTS:
      return { ...state, flights: action.flights };
    default:
      return state;
  }
};
