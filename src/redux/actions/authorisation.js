import {
  REQUEST_LOGIN,
  LOGOUT,
  REQUEST_LOGIN_SUCSESS,
  REQUEST_LOGIN_FAILED
} from "../action-types/flightsActionTypes";

export const requestLogin = values => ({
  type: REQUEST_LOGIN,
  payload: { ...values }
});
export const logOut = () => ({
  type: LOGOUT
});
export const requestLoginSucsess = user => ({
  type: REQUEST_LOGIN_SUCSESS,
  payload: { ...user }
});
export const requestLoginFailed = message => ({
  type: REQUEST_LOGIN_FAILED,
  payload: message
});
