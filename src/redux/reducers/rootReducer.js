import { combineReducers } from "redux";
import { flightsReducer } from "./flightsReducer";
import { registrationReducer } from "./registrationReducer";

export const rootReducer = combineReducers({
  flights: flightsReducer,
  registered: registrationReducer
});
