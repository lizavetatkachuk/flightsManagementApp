import {
  REQUEST_FLIGHTS,
  REQUEST_FLIGHTS_SUCSESS,
  REQUEST_FLIGHTS_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  flights: [],
  loading: false,
  error: null
};

export const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FLIGHTS:
      return { ...state, loading: true };
    case REQUEST_FLIGHTS_SUCSESS:
      return { ...state, flights: action.payload, loading: false };
    case REQUEST_FLIGHTS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
