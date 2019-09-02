import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./../../helpers/authHelper";

const Order = () => {
  const api = axios.create({
    baseURL: "/"
  });
  const [orders, setOrders] = useState(null);
  useEffect(
    (orders, api) => {
      const fetchData = async (api, orders) => {
        const data = await api.get("/flight", {
          headers: {
            Authorisation: getToken()
          }
        });
        setOrders(data.data);
      };
      fetchData(orders, api);
      console.log(orders);
    },
    [orders]
  );
  return <h1>Hello</h1>;
};
export default Order;
