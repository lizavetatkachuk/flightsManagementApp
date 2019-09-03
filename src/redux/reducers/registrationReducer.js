import {
  REGISTER,
  UPDATE_REGISTER,
  REGISTER_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  registered: null
};
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state };
    case UPDATE_REGISTER:
      return { ...state, registered: action.payload };
    case REGISTER_FAILED:
      return { ...state, registered: action.payload };
    default:
      return state;
  }
};
