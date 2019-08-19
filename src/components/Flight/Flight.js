import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Filter from "./../Filter/Filter";
import "./flights.scss";

const Flight = props => {
  const { flights } = props;
  const flightsInfo = flights.map(flight => (
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
Flight.propTypes = {
  flights: PropTypes.array
};
export default Flight;
