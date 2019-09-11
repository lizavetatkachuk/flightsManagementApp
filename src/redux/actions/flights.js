import {
  UPDATE_FLIGHTS_THERE,
  UPDATE_FLIGHTS_BACK,
  GET_FLIGHTS,
  FLIGHTS_FAILED
} from "../action-types/flightsActionTypes";

export const getFlights = values => ({
  type: GET_FLIGHTS,
  payload: { ...values }
});

export const updateFlightsThere = values => ({
  type: UPDATE_FLIGHTS_THERE,
  payload: [...values]
});
export const updateFlightsBack = values => ({
  type: UPDATE_FLIGHTS_BACK,
  payload: [...values]
});
export const failFlights = error => ({
  type: FLIGHTS_FAILED,
  payload: error
});
