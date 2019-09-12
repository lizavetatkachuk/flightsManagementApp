import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getFlights } from "./../../redux/actions/flights";
import Filter from "./../Filter/Filter";
import Button from "./../Shared/Button/Button";
import "./flights.scss";

const Flight = props => {
  const [mode, setMode] = useState("price");
  const [there, setThere] = useState(null);
  const [back, setBack] = useState(null);
  const { flights, history, getFlights, match } = props;

  const dynamicSort = property => {
    return function(a, b) {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result;
    };
  };

  const onClick = () => {
    if (!!there) {
      history.push(
        `/flights/${match.params.from}/${match.params.to}/${match.params.return}/${match.params.there}/${match.params.back}/${there}`
      );
    }
  };

  useEffect(() => {
    const values = { ...props.match.params };
    getFlights(values);
  }, []);

  flights.flightsThere.sort(dynamicSort(mode));
  const flightsInfo = flights.flightsThere.map(flight => {
    const selected = flight._id === there ? "--selected" : "";
    return (
      <li
        className={`flight ${selected}`}
        key={flight._id}
        onClick={() => setThere(flight._id)}
      >
        <p className={`flight__item${selected}`} key={flight._id}>
          {flight.company} {flight.price}$ departs at {flight.time}
        </p>
      </li>
    );
  });

  const flightsBackInfo = flights.flightsBack.map(flight => {
    const selected = flight._id === back ? "--selected" : "";
    return (
      <li
        className="flight"
        key={flight._id}
        onClick={() => setBack(flight._id)}
      >
        <p className={`flight__item${selected}`} key={flight._id}>
          {" "}
          {flight.company} {flight.price}$ departs at {flight.time}
        </p>
      </li>
    );
  });

  const onChange = value => {
    setMode(value);
  };

  return (
    <Fragment>
      {flights.eror ? (
        <p className="server-msg">Internal Server Error</p>
      ) : null}
      {flights.loading ? (
        <p className="server-msg">Loading Your Flights</p>
      ) : null}
      <Filter onChange={onChange} />
      <div className="container">
        <ul className="container__column list">
          <p className="list__label">Fly there</p>
          {flightsInfo}
        </ul>
        <ul className="container__column list">
          <p className="list__label">Fly back</p>
          {flightsBackInfo}
        </ul>
      </div>
      <Button btnclass="details-btn" onClick={onClick}>
        Show flight details
      </Button>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFlights
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flight);
