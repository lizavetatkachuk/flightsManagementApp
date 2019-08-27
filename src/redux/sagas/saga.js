import { all } from "redux-saga/effects";
import { searchWatcherSaga } from "./sessionSaga";

export default function* rootSaga() {
  yield all([searchWatcherSaga()]);
}
