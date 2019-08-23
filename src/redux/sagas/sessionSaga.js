import axios from "axios";
import { browserHistory } from "react-router";
import { takeEvery, call, put } from "redux-saga/effects";
export const loginApi = values => {
  return axios
    .request({
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/be-BY/${
        values.from
      }/${values.to}/${values.there}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f60505b66cmsh0caadee59caec14p132a62jsn4c89785ba2de"
      }
    })
    .then(res => res.data)
    .catch(err => console.log(err));
};
function* loginEffectSaga(action) {
  try {
    let { data } = yield call(loginApi, action.payload);
    console.log(data);
    yield put({ type: "UPDATE_FLIGHTS", flights: data });
    browserHistory.push("/flights");
  } catch (err) {
    console.log(err);
  }
}
export function* loginWatcherSaga() {
  yield takeEvery("LOGIN_WATCHER", loginEffectSaga);
}
