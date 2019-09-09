import {
  REQUEST_REGISTER,
  REQUEST_REGISTER_FAILED,
  REQUEST_REGISTER_SUCSESS
} from "../action-types/flightsActionTypes";

export const requestRegister = values => ({
  type: REQUEST_REGISTER,
  payload: { ...values }
});
export const requestRegisterSucsess = message => ({
  type: REQUEST_REGISTER_SUCSESS,
  payload: message
});
export const requestRegisterFailed = message => ({
  type: REQUEST_REGISTER_FAILED,
  payload: message
});
