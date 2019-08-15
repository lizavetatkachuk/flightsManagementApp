import React from "react";
import "./flights.scss";
class Flight extends React.Component {
  constructor(props) {
    super(props);
  }
  flightsInfo = this.props.flights.map((flight, i) => (
    <li className="flight" key={i}>
      {flight.company} {flight.price} {flight.time}
    </li>
  ));
  render() {
    return (
      <div>
        <ul>{this.flightsInfo}</ul>
      </div>
    );
  }
}
export default Flight;
