import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { api } from "./../../helpers/apiHeler";
import Button from "./../Shared/Button/Button";
import Plane from "./../Plane/Plane";
import { getToken } from "./../../helpers/authHelper";
import suitcase from "./../../static/images/suitcase.svg";
import twoSuitcases from "./../../static/images/suitcases.svg";
import bagpack from "./../../static/images/bagpack.svg";
import "./details.scss";

const Details = props => {
  const initialState = {
    donation: true,
    luggage: 0,
    people: 1,
    seats: [],
    seatClass: ""
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "setDonation":
        return { ...state, donation: !state.donation };
      case "setLuggage":
        return { ...state, luggage: action.payload };
      case "increment":
        return { ...state, people: state.people + 1 };
      case "decrement":
        return { ...state, people: state.people - 1 };
      case "setSeats": {
        if (state.seats.includes(action.payload.seat)) {
          const newSeats = state.seats.filter(
            item => item !== action.payload.seat
          );
          return { ...state, seats: newSeats };
        } else {
          const newSeats = [...state.seats, action.payload.seat];
          return { ...state, seats: newSeats };
        }
      }
      case "setClass": {
        return { ...state, seatClass: action.payload.seatClass };
      }
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [seatClass, setClass] = useState("");
  const small = 8;
  const medium = 20;
  const large = 25;
  const { flights, history } = props;
  const token = getToken();
  const mappedSeats = state.seats.map(seat => {
    return (
      <li key={seat} className="list">
        <div>
          <p>Seat {seat}</p>
        </div>
        <div>
          {state.seatClass === "business" ? (
            <p className="details__cost__label">
              Extra fee for business class: 20$
            </p>
          ) : null}
        </div>
        <div>
          <p className="details__cost__label">Luggage: {state.luggage} $</p>
        </div>
        <div>
          <input
            type="checkbox"
            id="scales"
            name="scales"
            checked={state.donation}
            onChange={() => {
              dispatch({ type: "setDonation" });
            }}
          />
          <label className="details__cost__label">
            Donate 1$ to reduce your carbon footprint
          </label>
        </div>
      </li>
    );
  });
  const onClick = value => {
    dispatch({ type: "setSeats", payload: value });
    dispatch({ type: "setClass", payload: value });
  };
  const validated = state.seats ? false : true;
  const handleClick = () => {
    if (!!token) {
      const { from, to, price, time, company, _id } = flightDetail;
      const order = {
        flight: _id,
        from,
        to,
        price,
        time,
        company,
        seats: state.seats,
        donation: state.donation,
        luggage: state.donation
      };
      api.post("/order", {
        ...order
      });
    } else history.push("/login");
  };
  const flightDetail = flights.find(flight => {
    const result = flight._id === props.match.params.id;
    return result;
  }) || { booked: [] };
  return (
    <div className="details">
      <div className="details__plane">
        <p className="details__label">Choose your seat</p>
        <Plane
          plane={flightDetail.plane}
          onClick={onClick}
          people={state.people}
          booked={flightDetail.booked}
        ></Plane>
      </div>
      <div className="details__container">
        <div className="details__container__row">
          <div className="details__luggage">
            <p className="details__label">Choose your luggage</p>
            <div className="bag">
              <p className="details__luggage__label">
                One small cabin bag(20*25*30)
              </p>
              <img
                src={bagpack}
                alt="bagpack"
                className="details__luggage__icon"
                onClick={() => dispatch({ type: "setLuggage", payload: small })}
              />
            </div>
            <div className="bag">
              <p className="details__luggage__label">
                One medium check in bag(35*50*40)
              </p>
              <img
                src={suitcase}
                alt="oneSuitcase"
                className="details__luggage__icon"
                onClick={() =>
                  dispatch({ type: "setLuggage", payload: medium })
                }
              />
            </div>
            <div className="bag">
              <p className="details__luggage__label">
                Two check in bags (20*25*30) and (35*50*40)
              </p>
              <img
                src={twoSuitcases}
                alt="twoSuitcases"
                className="details__luggage__icon"
                onClick={() => dispatch({ type: "setLuggage", payload: large })}
              />
            </div>
          </div>
        </div>
        <div className="details__container__row">
          <div className="details__people">
            <p className="details__label">Choose the number of seats</p>
            <Button onClick={() => dispatch({ type: "decrement" })}>-</Button>
            <input
              readOnly={true}
              type="text"
              value={state.people}
              className="details__people__input"
            />
            <Button onClick={() => dispatch({ type: "increment" })}>+</Button>
          </div>
        </div>
        <div className="details__container__row">
          <div className="details__cost">
            <p className="details__label">Total cost is </p>
            <div className="details__cost__label">
              You have chosen: {mappedSeats}
            </div>
            <div></div>
            <Button
              btnclass="submit-order-btn"
              type="submit"
              onClick={handleClick}
              disabled={validated}
            >
              Book the tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
Details.propTypes = {
  flights: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { flights: state.flights.flights };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(Details));
