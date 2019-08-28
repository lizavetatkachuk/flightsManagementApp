import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "./../Shared/Button/Button";
import Plane from "./../Plane/Plane";
import suitcase from "./../../static/images/suitcase.svg";
import twoSuitcases from "./../../static/images/suitcases.svg";
import bagpack from "./../../static/images/bagpack.svg";
import "./details.scss";

const Details = props => {
  const { flights } = props.flights;
  const flightDetail = flights.find(flight => {
    const result = flight.id === Number(props.match.params.id);
    return result;
  });
  return (
    <div className="details">
      <div className="details__seat">
        <p className="details__label">Choose your seat</p>
        <Plane></Plane>
      </div>
      <div className="details__luggage">
        <p className="details__label">Choose your luggage</p>
        <img src={bagpack} alt="bagpack" className="details__luggage__icon" />
        <img
          src={suitcase}
          alt="oneSuitcase"
          className="details__luggage__icon"
        />
        <img
          src={twoSuitcases}
          alt="twoSuitcases"
          className="details__luggage__icon"
        />
      </div>
      <div className="details__cost">
        <p className="details__label">Total cost is</p>
        <div>
          <p className="details__cost__label">Ticket: $</p>
        </div>
        <div>
          <p className="details__cost__label">Luggage: $</p>
        </div>
        <div>
          <p className="details__cost__label">
            Donate 1$ to reduce your carbon footprint
          </p>
        </div>
        <div>
          <p className="details__cost__label">Total : $</p>
        </div>
      </div>
      <Button className="submit-order-btn" type="submit">
        Book the ticket
      </Button>
    </div>
  );
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
