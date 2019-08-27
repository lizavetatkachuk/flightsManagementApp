import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Filter from "./../Filter/Filter";
import "./flights.scss";

const Flight = props => {
  const { flights } = props;
  const flightsInfo = flights.flights.map(flight => (
    <li className="flight" key={flight.id}>
      {flight.companies[0]} {flight.price}$ departs at {flight.time}
    </li>
  ));
  const onChange = value => {
    console.log(value);
  };
  console.log(flights);
  return (
    <Fragment>
      <Filter onChange={onChange} />
      <ul>{flightsInfo}</ul>
    </Fragment>
  );
};
Flight.propTypes = {
  flights: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { flights: state.flights };
};

export default connect(
  mapStateToProps,
  null
)(Flight);
