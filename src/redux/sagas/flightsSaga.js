import { takeEvery, call, put } from "redux-saga/effects";

import { updateFlights, failFlights } from "../actions/flights";
import { GET_FLIGHTS } from "../action-types/flightsActionTypes";
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
      ? yield put(updateFlights(data))
      : yield put(failFlights("No flights"));
  } catch (err) {
    yield put(failFlights(err.data));
  }
}
export function* searchWatcherSaga() {
  yield takeEvery(GET_FLIGHTS, searchEffectSaga);
}
