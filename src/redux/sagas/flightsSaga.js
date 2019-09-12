import { takeEvery, call, put } from "redux-saga/effects";
import {
  updateFlightsThere,
  updateFlightsBack,
  failFlights
} from "../actions/flights";
import { GET_FLIGHTS } from "../action-types/flightsActionTypes";
import { api } from "./../../helpers/apiHeler";
const flightsApi = values => {
  return api.post("flight", {
    ...values
  });
};

function* searchEffectSaga(action) {
  try {
    if (action.payload.return === "return") {
      let data1 = yield call(flightsApi, action.payload);
      if (data1.data.length > 0) {
        yield put(updateFlightsThere(data1.data));
        let data2 = yield call(flightsApi, {
          ...action.payload,
          from: action.payload.to,
          to: action.payload.from,
          there: action.payload.back
        });

        if (data2.data.length > 0) yield put(updateFlightsBack(data2.data));
        else yield put(failFlights("There are no flights for these dates"));
      } else yield put(failFlights("There are no flights for these dates"));
    } else {
      let { data } = yield call(flightsApi, action.payload);
      data.length > 0
        ? yield put(updateFlightsThere(data))
        : yield put(failFlights("There are no flights for these dates"));
    }
  } catch (err) {
    console.log(err);
    yield put(failFlights(err.data));
  }
}

export function* searchWatcherSaga() {
  yield takeEvery(GET_FLIGHTS, searchEffectSaga);
}
