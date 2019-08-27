import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./details.scss";

const Details = props => {
  const { flights } = props.flights;
  const flightDetail = flights.find(flight => {
    const result = flight.id == props.match.params.id;
    return result;
  });
  return <p>Hello</p>;
};
Details.propTypes = {
  flights: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { flights: state.flights };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Details));
