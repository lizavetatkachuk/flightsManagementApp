import {
  LOGIN,
  LOGOUT,
  SET_USER,
  LOGIN_FAILED
} from "../action-types/flightsActionTypes";

export const logIn = values => ({
  type: LOGIN,
  payload: { ...values }
});
export const logOut = user => ({
  type: LOGOUT
});
export const setUser = user => ({
  type: SET_USER,
  payload: { ...user }
});
export const failLogIn = message => ({
  type: LOGIN_FAILED,
  payload: message
});
