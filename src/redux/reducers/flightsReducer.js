import {
  REQUEST_FLIGHTS,
  REQUEST_FLIGHTS_THERE_SUCSESS,
  REQUEST_FLIGHTS_BACK_SUCSESS,
  REQUEST_FLIGHTS_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  flightsThere: [],
  flightsBack: [],
  loading: false,
  error: null
};

export const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FLIGHTS:
      return { ...state, loading: true };
    case REQUEST_FLIGHTS_THERE_SUCSESS:
      return {
        ...state,
        flightsThere: action.payload,
        loading: false,
        error: null
      };
    case REQUEST_FLIGHTS_BACK_SUCSESS:
      return { ...state, flightsBack: action.payload, loading: false };
    case REQUEST_FLIGHTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        flightsThere: [],
        flightsBack: []
      };
    default:
      return state;
  }
};
