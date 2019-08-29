import { REGISTER, UPDATE_REGISTER } from "../action-types/flightsActionTypes";

export const register = values => ({
  type: REGISTER,
  payload: { ...values }
});
export const updateRegister = message => ({
  type: UPDATE_REGISTER,
  payload: message
});
