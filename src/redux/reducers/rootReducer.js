import { combineReducers } from "redux";
import { flightsReducer } from "./flightsReducer";
import { registrationReducer } from "./registrationReducer";
import { authorisationReducer } from "./authorisationReducer";

export const rootReducer = combineReducers({
  flights: flightsReducer,
  registered: registrationReducer,
  auth: authorisationReducer
});
