import React, { useEffect, useState, Fragment } from "react";
import moment from "moment";
import Filter from "./../Filter/Filter";
import { api } from "./../../helpers/apiHeler";
import "./../Flight/flights.scss";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [mode, setMode] = useState("All flights");
  const now = moment().format("YYYY-MM-DD");

  const fetchOrders = async () => {
    try {
      const data = await api.get("/order");
      setOrders(data.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onChange = value => {
    setMode(value);
  };

  const filteredOrders = orders.filter(order => {
    return moment(order.flight.time).isAfter(now);
  });

  const incomingOrders = filteredOrders ? (
    filteredOrders.map(order => {
      return (
        <li className="flight__item" key={order._id}>
          <div>
            Flying from {order.flight.from} to {order.flight.to}
            {"  "}
            {order.flight.price}$ departs at {order.flight.time}
          </div>
          <div className="company">Airlines : {order.flight.company}</div>
        </li>
      );
    })
  ) : (
    <li> "There are no incoming trips"</li>
  );

  const allOrders = orders
    ? orders.map(order => {
        return (
          <li className="flight__item" key={order._id}>
            <div>
              Flying from {order.flight.from} to {order.flight.to}
              {order.flight.price}$ departs at {order.flight.time}
            </div>
            <div className="company">Airlines : {order.flight.company}</div>
          </li>
        );
      })
    : null;

  return (
    <Fragment>
      <Filter
        onChange={onChange}
        value1="All flights"
        value2="Incoming flights"
        filterName="filterBy"
      />
      {mode === "All flights" ? (
        <ul className='list'> {allOrders} </ul>
      ) : (
        <ul className='list'> {incomingOrders}</ul>
      )}
    </Fragment>
  );
};
export default Order;
