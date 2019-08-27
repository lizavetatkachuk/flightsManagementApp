import axios from "axios";
import { browserHistory } from "react-router";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  UPDATE_FLIGHTS,
  SAVE_SEARCH_INFO
} from "../action-types/flightsActionTypes";

const filter = data => {
  const flights = data.Quotes.map(item => {
    const companies = item.OutboundLeg.CarrierIds.map(company => {
      const name = data.Carriers.find(carrier => {
        const result = carrier.CarrierId === company;
        return result;
      });
      return name.Name;
    });
    const flight = {
      price: item.MinPrice,
      time: item.OutboundLeg.DepartureDate,
      companies: companies
    };
    return flight;
  });
  return flights;
};
export const flightsApi = values => {
  return axios.request({
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/be-BY/${
      values.from
    }/${values.to}/${values.there}`,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f60505b66cmsh0caadee59caec14p132a62jsn4c89785ba2de"
    }
  });
};
function* searchEffectSaga(action) {
  try {
    let { data } = yield call(flightsApi, action.payload);
    yield put({ type: UPDATE_FLIGHTS, flights: filter(data) });
    browserHistory.push("/flights");
  } catch (err) {
    console.log(err);
  }
}
export function* searchWatcherSaga() {
  yield takeEvery(SAVE_SEARCH_INFO, searchEffectSaga);
}
