import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Filter from "./../Filter/Filter";
import "./flights.scss";

const Flight = props => {
  const [mode, setMode] = useState("price");
  const { flights } = props;

  const dynamicSort = property => {
    return function(a, b) {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result;
    };
  };

  flights.flightsThere.sort(dynamicSort(mode));
  const flightsInfo = flights.flightsThere.map(flight => {
    return (
      <Link to={`/flights/${flight._id}`} className="flight" key={flight._id}>
        <li className="flight__item" key={flight._id}>
          {flight.company} {flight.price}$ departs at {flight.time}
        </li>
      </Link>
    );
  });

  const flightsBackInfo = flights.flightsBack.map(flight => {
    return (
      <Link to={`/flights/${flight._id}`} className="flight" key={flight._id}>
        <li className="flight__item" key={flight._id}>
          {flight.company} {flight.price}$ departs at {flight.time}
        </li>
      </Link>
    );
  });

  const onChange = value => {
    setMode(value);
  };

  return (
    <Fragment className="container">
      {flights.eror ? (
        <p className="server-msg">Internal Server Error</p>
      ) : null}
      {flights.loading ? (
        <p className="server-msg">Loading Your Flights</p>
      ) : null}
      <Filter onChange={onChange} />
      <ul>{flightsInfo}</ul>
      <ul>{flightsBackInfo}</ul>
    </Fragment>
  );
};

Flight.propTypes = {
  flights: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { flights: state.flights };
};

export default connect(
  mapStateToProps,
  null
)(Flight);
