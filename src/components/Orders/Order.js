import React, { useEffect, useReducer, Fragment } from "react";
import { api } from "./../../helpers/apiHeler";
import "./../Flight/flights.scss";

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
  const ordersInfo = orders.map(order => {
    return (
      <li className="flight__item" key={order._id}>
        <div>
          Flying from {order.from} to {order.to} {order.price}$ departs at
          {order.time}
        </div>
        <div className="company">Airlines : {order.company}</div>
      </li>
    );
  });
  return (
    <Fragment>
      <ul>{ordersInfo}</ul>
    </Fragment>
  );
};
export default Order;
