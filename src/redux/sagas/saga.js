import { all } from "redux-saga/effects";
import { searchWatcherSaga } from "./flightsSaga";
import { registrationWatcherSaga } from "./registerSaga";

export default function* rootSaga() {
  yield all([searchWatcherSaga(), registrationWatcherSaga()]);
}
