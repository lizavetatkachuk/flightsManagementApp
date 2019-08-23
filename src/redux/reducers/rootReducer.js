import { combineReducers } from "redux";

import { flightsReducer } from "./flightsReducer";

export const rootReducer = combineReducers({
  flights: flightsReducer
});
