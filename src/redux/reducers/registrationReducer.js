import {
  REQUEST_REGISTER,
  REQUEST_REGISTER_FAILED,
  REQUEST_REGISTER_SUCSESS,
  REGISTER_ERROR_CLEAR
} from "../action-types/flightsActionTypes";

const initialState = {
  error: null
};
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
      return { ...state };
    case REQUEST_REGISTER_FAILED:
      return { ...state, error: action.payload };
    case REQUEST_REGISTER_SUCSESS:
      return { ...state };
    case REGISTER_ERROR_CLEAR:
      return { ...state, error: null };
    default:
      return state;
  }
};
