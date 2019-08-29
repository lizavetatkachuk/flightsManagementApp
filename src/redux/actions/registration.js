import { REGISTER } from "../action-types/flightsActionTypes";

export const register = values => ({
  type: REGISTER,
  payload: { ...values }
});
