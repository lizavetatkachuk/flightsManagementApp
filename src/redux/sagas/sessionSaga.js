import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import { updateFlights } from "../actions/getFlights";
import { GET_FLIGHTS } from "../action-types/flightsActionTypes";

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
      id: item.QuoteId,
      price: item.MinPrice,
      time: item.QuoteDateTime,
      companies: companies
    };
    return flight;
  });
  return flights;
};
export const flightsApi = values => {
  return axios.request({
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/be-BY/${values.from}/${values.to}/${values.there}`,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f60505b66cmsh0caadee59caec14p132a62jsn4c89785ba2de"
    }
  });
};
function* searchEffectSaga(action) {
  try {
    let { data } = yield call(flightsApi, action.payload);
    yield put(updateFlights(filter(data)));
  } catch (err) {
    console.log(err);
  }
}
export function* searchWatcherSaga() {
  yield takeEvery(GET_FLIGHTS, searchEffectSaga);
}
