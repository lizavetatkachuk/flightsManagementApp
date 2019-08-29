import { LOGIN, LOGOUT, SET_USER } from "../action-types/flightsActionTypes";

export const logIn = values => ({
  type: LOGIN,
  payload: { ...values }
});
export const logOut = () => ({
  type: LOGOUT
});
export const setUser = user => ({
  type: SET_USER,
  payload: { ...user }
});
