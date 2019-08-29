import { REGISTER } from "../action-types/flightsActionTypes";

const initialState = {
  registered: {}
};
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state };
    default:
      return state;
  }
};
