import { all } from "redux-saga/effects";
import { searchWatcherSaga } from "./flightsSaga";
import { registrationWatcherSaga } from "./registerSaga";
import { loginWatcherSaga } from "./loginSaga";

export default function* rootSaga() {
  yield all([
    searchWatcherSaga(),
    registrationWatcherSaga(),
    loginWatcherSaga()
  ]);
}
