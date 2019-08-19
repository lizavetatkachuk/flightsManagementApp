import React, { Fragment } from "react";
import Filter from "./../Filter/Filter";
import "./flights.scss";

const Flight = props => {
  const flightsInfo = props.flights.map(flight => (
    <li className="flight" key={flight.id}>
      {flight.company} {flight.price} {flight.time}
    </li>
  ));
  const onChange = value => {
    console.log(value);
  };
  return (
    <Fragment>
      <Filter onChange={onChange} />
      <ul>{flightsInfo}</ul>
    </Fragment>
  );
};
export default Flight;
