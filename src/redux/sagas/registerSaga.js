import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { REGISTER } from "../action-types/flightsActionTypes";
import { updateRegister } from "../actions/registration";

const api = axios.create({
  baseURL: "/"
});
export const postRegistration = values => {
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
    let message = yield call(postRegistration, action.payload);
    yield put(updateRegister(message.data));
  } catch (err) {
    console.log(err);
  }
}
export function* registrationWatcherSaga() {
  yield takeEvery(REGISTER, registerEffectSaga);
}
