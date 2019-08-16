import React, { Fragment } from "react";
import "./flights.scss";
import Filter from "./../Filter/Filter";
const Flight = props => {
  const flightsInfo = props.flights.map(flight => (
    <li className="flight" key={flight.id}>
      {flight.company} {flight.price} {flight.time}
    </li>
  ));
  return (
    <Fragment>
      <Filter />
      <ul>{flightsInfo}</ul>
    </Fragment>
  );
};
export default Flight;
