import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN } from "../action-types/flightsActionTypes";
import { setUser } from "../actions/authorisation";

const api = axios.create({
  baseURL: "/"
});
export const postLogin = values => {
  const { email, password } = values;
  return api.post("auth/login", {
    email,
    password
  });
};
function* loginEffectSaga(action) {
  try {
    let data = yield call(postLogin, action.payload);
    yield put(setUser(data));
  } catch (err) {
    console.log(err);
  }
}
export function* loginWatcherSaga() {
  yield takeEvery(LOGIN, loginEffectSaga);
}
