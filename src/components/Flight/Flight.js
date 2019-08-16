import React, { Fragment } from "react";
import "./flights.scss";
import Filter from "./../Filter/Filter";
class Flight extends React.Component {
  flightsInfo = this.props.flights.map(flight => (
    <li className="flight" key={flight.id}>
      {flight.company} {flight.price} {flight.time}
    </li>
  ));
  render() {
    return (
      <Fragment>
        <Filter />
        <ul>{this.flightsInfo}</ul>
      </Fragment>
    );
  }
}
export default Flight;
