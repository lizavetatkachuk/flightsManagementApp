import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN } from "../action-types/flightsActionTypes";
import { setUser, failLogIn } from "../actions/authorisation";
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
    const { history } = action.payload;
    yield put(setUser(res.data));
    setToken(res.data.token);
    history.push("/");
  } catch (err) {
    yield put(failLogIn(err.response.data));
  }
}
export function* loginWatcherSaga() {
  yield takeEvery(LOGIN, loginEffectSaga);
}
