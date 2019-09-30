import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { REQUEST_REGISTER } from "../action-types/flightsActionTypes";
import {
  requestRegisterSucsess,
  requestRegisterFailed
} from "../actions/registration";

const api = axios.create({
  baseURL: "/"
});
export const requestSignUp = values => {
  const { email, password, name } = values;
  return api.post("auth/register", {
    email,
    password,
    name,
    role: "client"
  });
};
function* registerEffectSaga(action) {
  try {
    yield call(requestSignUp, action.payload);
    const { history } = action.payload;
    yield put(requestRegisterSucsess());
    history.push("/login");
  } catch (err) {
    yield put(requestRegisterFailed("Email already in use"));
  }
}
export function* registrationWatcherSaga() {
  yield takeEvery(REQUEST_REGISTER, registerEffectSaga);
}
