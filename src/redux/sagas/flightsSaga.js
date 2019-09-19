import { takeEvery, call, put } from "redux-saga/effects";
import {
  requestFlightsThereSucsess,
  requestFlightsBackSucsess,
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
  const { history } = action.payload;
  console.log(history);
  try {
    if (action.payload.return === "return") {
      let data1 = yield call(flightsApi, action.payload);
      if (data1.data.length > 0) {
        yield put(requestFlightsThereSucsess(data1.data));
        history.push(
          `/flights/${action.payload.from}/${action.payload.to}/${action.payload.return}/${action.payload.there}/${action.payload.back}`
        );
        let data2 = yield call(flightsApi, {
          ...action.payload,
          from: action.payload.to,
          to: action.payload.from,
          there: action.payload.back
        });

        if (data2.data.length > 0) {
          yield put(requestFlightsBackSucsess(data2.data));
        } else
          yield put(
            requestFlightsFailed("There are no flights for these dates")
          );
      } else
        yield put(requestFlightsFailed("There are no flights for these dates"));
    } else {
      let { data } = yield call(flightsApi, action.payload);
      if (data.length > 0) {
        yield put(requestFlightsThereSucsess(data));
        history.push(
          `/flights/${action.payload.from}/${action.payload.to}/${action.payload.return}/${action.payload.there}/${action.payload.back}`
        );
      } else
        yield put(requestFlightsFailed("There are no flights for these dates"));
    }
  } catch (err) {
    console.log(err);
    yield put(requestFlightsFailed(err.data));
  }
}

export function* searchWatcherSaga() {
  yield takeEvery(REQUEST_FLIGHTS, searchEffectSaga);
}
