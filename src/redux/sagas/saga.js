import { all } from "redux-saga/effects";
import { loginWatcherSaga } from "./sessionSaga";

export default function* rootSaga() {
  yield all([loginWatcherSaga()]);
}
