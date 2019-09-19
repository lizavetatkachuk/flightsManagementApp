import axios from "axios";
import { getToken } from "./authHelper";

export const api = axios.create({
  baseURL: "/"
});
api.defaults.headers.common["Authorization"] = getToken();
