import React, { useEffect, useReducer } from "react";
import { api } from "./../../helpers/apiHeler";

const Order = () => {
  const [{ orders }, setState] = useReducer((s, a) => ({ ...s, ...a }), {
    orders: []
  });

  const fetchOrders = async () => {
    try {
      const data = await api.get("/flight");
      setState({
        orders: data.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  return <h1>Hello</h1>;
};
export default Order;
