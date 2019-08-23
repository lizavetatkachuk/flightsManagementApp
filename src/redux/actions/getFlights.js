import { UPDATE_FLIGHTS, SAVE_SEARCH_INFO } from '../action-types/flightsActionTypes';

export const getFlights = values => ({
	type: SAVE_SEARCH_INFO,
	payload: { ...values }
});

export const updateFlights = values => ({
	type: UPDATE_FLIGHTS,
	payload: values
});
