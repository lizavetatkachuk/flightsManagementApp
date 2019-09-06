import {
  REQUEST_REGISTER,
  REQUEST_REGISTER_FAILED,
  REQUEST_REGISTER_SUCSESS
} from "../action-types/flightsActionTypes";

export const register = values => ({
  type: REQUEST_REGISTER,
  payload: { ...values }
});
export const updateRegister = message => ({
  type: REQUEST_REGISTER_FAILED,
  payload: message
});
export const failRegister = message => ({
  type: REQUEST_REGISTER_SUCSESS,
  payload: message
});
