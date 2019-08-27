import {
  UPDATE_FLIGHTS,
  GET_FLIGHTS
} from "../action-types/flightsActionTypes";

export const getFlights = values => ({
  type: GET_FLIGHTS,
  payload: { ...values }
});

export const updateFlights = values => ({
  type: UPDATE_FLIGHTS,
  payload: [...values]
});
