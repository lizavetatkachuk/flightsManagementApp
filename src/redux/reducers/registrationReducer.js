import { REGISTER, UPDATE_REGISTER } from "../action-types/flightsActionTypes";

const initialState = {
  registered: null
};
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state };
    case UPDATE_REGISTER:
      return { ...state, registered: action.payload };
    default:
      return state;
  }
};
