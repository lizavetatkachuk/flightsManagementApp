import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { REGISTER } from "../action-types/flightsActionTypes";
import { updateRegister, failRegister } from "../actions/registration";

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
    let message = yield call(requestSignUp, action.payload);
    const { history } = action.payload;
    yield put(updateRegister(message));
    history.push("/login");
  } catch (err) {
    yield put(failRegister("Email already in use"));
  }
}
export function* registrationWatcherSaga() {
  yield takeEvery(REGISTER, registerEffectSaga);
}
