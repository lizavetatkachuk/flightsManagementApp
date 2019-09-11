import React, { useEffect, useState, Fragment } from "react";
import { api } from "./../../helpers/apiHeler";
import "./../Flight/flights.scss";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await api.get("/order");
      console.log(data);
      setOrders(data.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const ordersInfo = orders
    ? orders.map(order => {
        console.log(order);
        return (
          <li className="flight__item" key={order._id}>
            <div>
              Flying from {order.flight.from} to {order.flight.to}{" "}
              {order.flight.price}$ departs at {order.flight.time}
            </div>
            <div className="company">Airlines : {order.flight.company}</div>
          </li>
        );
      })
    : null;

  return (
    <Fragment>
      <ul>{ordersInfo}</ul>
    </Fragment>
  );
};
export default Order;
