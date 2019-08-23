import { combineReducers } from 'redux';

import { flightsReducer } from './flightsReducer';

export const rootReducer = combineReducers({
	flights: flightsReducer
});

// const rootReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "GET_FLIGHTS":
//       return { ...state, values: action.payload };
//     case "UPDATE_FLIGHTS":
//       return { ...state, flights: action.flights };
//     default:
//       return state;
//   }
// };
// export default rootReducer;
