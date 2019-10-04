import axios from "axios";
import { getToken } from "./authHelper";

export const api = axios.create({
  baseURL: "/"
});
api.defaults.headers.common["Authorization"] = getToken();

export const post = (path, data, callback, callbackErr) => {
  api
    .post(path, {
      ...data
    })
    .then(() => {
      callback();
    })
    .catch(err => {
      callbackErr(err);
    });
};

export const patch = (path, data, callback, callbackErr) => {
  api
    .patch(path, {
      ...data
    })
    .then(() => {
      callback();
    })
    .catch(err => {
      callbackErr(err);
    });
};
