import {
  GET_FLIGHTS,
  UPDATE_FLIGHTS,
  FLIGHTS_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  flights: [],
  loading: false,
  error: null
};

export const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLIGHTS:
      return { ...state, loading: true };
    case UPDATE_FLIGHTS:
      return { ...state, flights: action.payload, loading: false };
    case FLIGHTS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
