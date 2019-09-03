import {
  REGISTER,
  UPDATE_REGISTER,
  REGISTER_FAILED
} from "../action-types/flightsActionTypes";

export const register = values => ({
  type: REGISTER,
  payload: { ...values }
});
export const updateRegister = message => ({
  type: UPDATE_REGISTER,
  payload: message
});
export const failRegister = message => ({
  type: REGISTER_FAILED,
  payload: message
});
