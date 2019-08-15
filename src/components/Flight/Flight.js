import React from "react";
import "./flights.scss";
import Filter from "./../Filter/Filter";
class Flight extends React.Component {
  flightsInfo = this.props.flights.map((flight, i) => (
    <li className="flight" key={i}>
      {flight.company} {flight.price} {flight.time}
    </li>
  ));
  render() {
    return (
      <div>
        <Filter />
        <ul>{this.flightsInfo}</ul>
      </div>
    );
  }
}
export default Flight;
