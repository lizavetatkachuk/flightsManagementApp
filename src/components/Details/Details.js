import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { api } from "./../../helpers/apiHeler";
import Button from "./../Shared/Button/Button";
import Plane from "./../Plane/Plane";
import { requestFlights } from "./../../redux/actions/flights";
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
        const seatNums = state.seats.map(seat => seat.seat);
        if (seatNums.includes(action.payload.seat)) {
          const newSeats = state.seats.filter(
            item => item.seat !== action.payload.seat
          );
          return { ...state, seats: newSeats };
        } else {
          const newSeats = [...state.seats, action.payload];
          return { ...state, seats: newSeats };
        }
      }
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const small = 8;
  const medium = 20;
  const large = 25;
  const { flights, history, requestFlights } = props;
  const token = getToken();
  const businessSeats = state.seats.filter(
    seat => seat.seatClass === "business"
  );

  const mappedSeats = state.seats.map(seat => {
    return (
      <li key={seat.seat} className="list">
        <div>
          <p>Seat {seat.seat}</p>
        </div>
        <div>
          {seat.seatClass === "business" ? (
            <p className="details__cost__label">
              Extra fee for business class: 20$
            </p>
          ) : null}
        </div>
      </li>
    );
  });

  const onClick = value => {
    dispatch({ type: "setSeats", payload: value });
  };

  useEffect(() => {
    const values = { ...props.match.params };
    getFlights(values);
  }, []);

  const validated = state.seats ? false : true;

  const seatNums = state.seats.map(seat => {
    return seat.seat;
  });

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
        seats: seatNums,
        donation: state.donation,
        luggage: state.donation
      };
      api.post("/order", {
        ...order
      });
      history.push("/orders");
    } else history.push("/login");
  };

  const flightDetail = flights.find(flight => {
    const result = flight._id === props.match.params.id;
    return result;
  }) || { booked: [] };

  const cost =
    state.seats.length * flightDetail.price + businessSeats.length * 20;
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
            <p className="details__label">
              Total cost is {cost + state.luggage + state.donation}{" "}
            </p>
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
              <div>
                <p className="details__cost__label">
                  Luggage: {state.luggage} $
                </p>
              </div>
            </div>
            <div className="details__cost__label">
              You have chosen: {mappedSeats}
            </div>
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
        <div className="options__row people">
          <p className="options__label">Choose the number of seats</p>
          <Button onClick={decrement}>-</Button>
          <input
            readOnly={true}
            type="text"
            value={people}
            className="people__input"
          />
          <Button onClick={increment}>+</Button>
        </div>
        <div className="options__row cost">
          <p className="options__label">Total cost is </p>
          <p className="cost__label">You have chosen: {mappedSeats}</p>
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
  );
};

Details.propTypes = {
  flights: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { flights: state.flights.flightsThere };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestFlights
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
