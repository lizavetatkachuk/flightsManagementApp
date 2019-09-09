import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { REQUEST_LOGIN } from "../action-types/flightsActionTypes";
import {
  requestLoginSucsess,
  requestLoginFailed
} from "../actions/authorisation";
import { setToken } from "../../helpers/authHelper";

const api = axios.create({
  baseURL: "/"
});
export const requestLogin = values => {
  const { email, password } = values;
  return api.post("auth/login", {
    email,
    password
  });
};
function* loginEffectSaga(action) {
  try {
    let res = yield call(requestLogin, action.payload);
    console.log(res);
    const { history } = action.payload;
    yield put(requestLoginSucsess(res.data));
    setToken(res.data.token);
    history.push("/");
  } catch (err) {
    yield put(requestLoginFailed(err.response.data));
  }
}
export function* loginWatcherSaga() {
  yield takeEvery(REQUEST_LOGIN, loginEffectSaga);
}
