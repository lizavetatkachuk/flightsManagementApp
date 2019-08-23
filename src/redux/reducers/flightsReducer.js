import { SAVE_SEARCH_INFO, UPDATE_FLIGHTS } from '../action-types/flightsActionTypes';

const initialState = {
	flights: []
};

export const flightsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SEARCH_INFO:
			return { ...state };
		case UPDATE_FLIGHTS:
			return { ...state, flights: action.payload };
		default:
			return state;
	}
};
