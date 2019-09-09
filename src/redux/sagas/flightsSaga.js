import { takeEvery, call, put } from "redux-saga/effects";

import {
  requestFlightsSucsess,
  requestFlightsFailed
} from "../actions/flights";
import { REQUEST_FLIGHTS } from "../action-types/flightsActionTypes";
import { api } from "./../../helpers/apiHeler";

const flightsApi = values => {
  return api.post("flight", {
    ...values
  });
};
function* searchEffectSaga(action) {
  try {
    let { data } = yield call(flightsApi, action.payload);
    data.length > 0
      ? yield put(requestFlightsSucsess(data))
      : yield put(requestFlightsFailed("No flights"));
  } catch (err) {
    yield put(requestFlightsFailed(err.data));
  }
}
export function* searchWatcherSaga() {
  yield takeEvery(REQUEST_FLIGHTS, searchEffectSaga);
}
