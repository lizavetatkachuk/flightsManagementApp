import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Filter from "./../Filter/Filter";
import "./flights.scss";

const Flight = props => {
  const { flights } = props.flights;
  const dynamicSort = property => {
    return function(a, b) {
      const result =
        a.property < b.property ? -1 : a.property > b.property ? 1 : 0;
      return result;
    };
  };
  flights.sort(dynamicSort("price"));
  const flightsInfo = flights.map(flight => {
    return (
      <Link to={`/flights/${flight.id}`} className="flight">
        <li className="flight__item" key={flight.id}>
          {flight.companies[0]} {flight.price}$ departs at {flight.time}
        </li>
      </Link>
    );
  });
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
  flights: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { flights: state.flights };
};

export default connect(
  mapStateToProps,
  null
)(Flight);
