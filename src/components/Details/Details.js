import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { api } from "./../../helpers/apiHeler";
import Button from "./../Shared/Button/Button";
import Plane from "./../Plane/Plane";
import { getToken } from "./../../helpers/authHelper";
import suitcase from "./../../static/images/suitcase.svg";
import twoSuitcases from "./../../static/images/suitcases.svg";
import bagpack from "./../../static/images/bagpack.svg";
import "./details.scss";

const Details = props => {
  const socket = socketIOClient("http://localhost:8000");

  socket.on("seats:found", data => {
    data.seats.length > 0 &&
      data.seats.map(seat => {
        dispatch({ type: "setFrozen", payload: seat.seat });
        return null;
      });
  });

  socket.on("seat:frozen", data => {
    dispatch({ type: "setFrozen", payload: data.seat });
  });

  const initialState = {
    donation: true,
    luggage: 0,
    people: 1,
    seats: [],
    seatClass: "",
    flight: {},
    frozen: [],
    finished: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setFlight":
        return { ...state, flight: action.payload };
      case "setDonation":
        return { ...state, donation: !state.donation };
      case "setLuggage":
        return { ...state, luggage: action.payload };
      case "increment":
        return { ...state, people: state.people + 1 };
      case "decrement":
        return { ...state, people: state.people - 1 };
      case "setFinished":
        return { ...state, finished: action.payload };
      case "setFrozen": {
        const newFrozen = [...state.frozen, action.payload];
        return { ...state, frozen: newFrozen };
      }
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
  const { history, match } = props;
  const token = getToken();

  const businessSeats = state.seats.filter(
    seat => seat.seatClass === "business"
  );

  useEffect(() => {
    const values = { ...match.params };
    api.get(`/flight/${values.id}`).then(res => {
      dispatch({ type: "setFlight", payload: res.data });
    });

    let countDown = setInterval(() => {
      dispatch({ type: "setTime" });
      console.log(state.timeLeft);
    }, 1000);

    socket.emit("connected");

    let sessionTimer = setTimeout(() => {
      socket.emit("seat:outdated", { token: token, flight: values.id });
      dispatch({ type: "setFinished", payload: true });
    }, 600000);

    return () => {
      clearTimeout(sessionTimer);
      clearInterval(countDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timeLeft]);

  const mappedSeats = state.seats.map(seat => {
    return (
      <li key={seat.seat} className="list">
        <p>Seat {seat.seat}</p>
        {seat.seatClass === "business" ? (
          <p className="details__cost__label">
            Extra fee for business class: 20$
          </p>
        ) : null}
      </li>
    );
  });

  const onClick = value => {
    const values = { ...match.params };
    dispatch({ type: "setSeats", payload: value });
    socket.emit(`seat:choose`, {
      token: token,
      seat: value.seat,
      flight: values.id
    });
  };
  const validated = state.seats ? false : true;

  const seatNums = state.seats.map(seat => {
    return seat.seat;
  });

  const handleClick = () => {
    if (!!token) {
      const { from, to, price, time, company, _id } = state.flight;
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

  const cost =
    state.seats.length * state.flight.price + businessSeats.length * 20;

  return (
    <div className="details">
      <div className="details__plane">
        <p className="details__label">Choose your seat</p>
        {state.flight.plane && (
          <Plane
            frozen={state.frozen}
            plane={state.flight.plane}
            onClick={onClick}
            people={state.people}
            booked={state.flight.booked}
          ></Plane>
        )}
      </div>
      <div className="details__options options">
        <div className="options__row luggage">
          <p className="options__label">Choose your luggage</p>
          <div className="bag">
            <p className="luggage__label">One small cabin bag (20*25*30)</p>
            <img
              src={bagpack}
              alt="bagpack"
              className="luggage__icon"
              onClick={() => dispatch({ type: "setLuggage", payload: small })}
            />
          </div>
          <div className="bag">
            <p className="luggage__label">One medium check in bag (35*50*40)</p>
            <img
              src={suitcase}
              alt="oneSuitcase"
              className="luggage__icon"
              onClick={() => dispatch({ type: "setLuggage", payload: medium })}
            />
          </div>
          <div className="bag">
            <p className="luggage__label">
              Two check in bags (20*25*30) and (35*50*40)
            </p>
            <img
              src={twoSuitcases}
              alt="twoSuitcases"
              className="luggage__icon"
              onClick={() => dispatch({ type: "setLuggage", payload: large })}
            />
          </div>
        </div>
        <div className="options__row people">
          <p className="options__label">Choose the number of seats</p>
          <Button onClick={() => dispatch({ type: "decrement" })}>-</Button>
          <input
            readOnly={true}
            type="text"
            value={state.people}
            className="people__input"
          />
          <Button onClick={() => dispatch({ type: "increment" })}>+</Button>
        </div>
        <div className="options__row cost">
          <p className="options__label">
            Total cost is {cost + state.luggage + state.donation}
          </p>

          <div className="block">
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={state.donation}
              onChange={() => {
                dispatch({ type: "setDonation" });
              }}
            />

            <label className="cost__label">
              Donate 1$ to reduce your carbon footprint
            </label>
            <p className="cost__label">Luggage: {state.luggage} $</p>
          </div>
          <ul className="cost__label">You have chosen: {mappedSeats}</ul>
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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Details);
