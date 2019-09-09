import {
  REQUEST_FLIGHTS,
  REQUEST_FLIGHTS_SUCSESS,
  REQUEST_FLIGHTS_FAILED
} from "../action-types/flightsActionTypes";

export const requestFlights = values => ({
  type: REQUEST_FLIGHTS,
  payload: { ...values }
});

export const requestFlightsSucsess = values => ({
  type: REQUEST_FLIGHTS_SUCSESS,
  payload: [...values]
});
export const requestFlightsFailed = error => ({
  type: REQUEST_FLIGHTS_FAILED,
  payload: error
});
