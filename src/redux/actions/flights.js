import {
  REQUEST_FLIGHTS,
  REQUEST_FLIGHTS_THERE_SUCSESS,
  REQUEST_FLIGHTS_BACK_SUCSESS,
  REQUEST_FLIGHTS_FAILED
} from "../action-types/flightsActionTypes";

export const requestFlights = values => ({
  type: REQUEST_FLIGHTS,
  payload: { ...values }
});

export const requestFlightsThereSucsess = values => ({
  type: REQUEST_FLIGHTS_THERE_SUCSESS,
  payload: [...values]
});
export const requestFlightsBackSucsess = values => ({
  type: REQUEST_FLIGHTS_BACK_SUCSESS,
  payload: [...values]
});
export const requestFlightsFailed = error => ({
  type: REQUEST_FLIGHTS_FAILED,
  payload: error
});
