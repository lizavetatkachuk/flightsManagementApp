import { all } from "redux-saga/effects";
import { searchWatcherSaga } from "./flightsSaga";

export default function* rootSaga() {
  yield all([searchWatcherSaga()]);
}
