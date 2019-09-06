import React, { useState } from "react";
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
  const [donation, setDonation] = useState(true);
  const [luggage, setLuggage] = useState(0);
  const [people, setPeople] = useState(1);
  const [seats, setSeats] = useState([]);
  const [seatClass, setClass] = useState("");
  const { flights, history } = props;
  const token = getToken();
  const mappedSeats = seats.map(seat => {
    return (
      <li key={seat} className="list">
        <div>
          <p>Seat {seat}</p>
        </div>
        <div>
          {seatClass === "business" ? (
            <p className="details__cost__label">
              Extra fee for business class: 20$
            </p>
          ) : null}
        </div>
        <div>
          <p className="details__cost__label">Luggage: {luggage} $</p>
        </div>
        <div>
          <input
            type="checkbox"
            id="scales"
            name="scales"
            checked={donation}
            onChange={() => {
              setDonation(!donation);
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
    if (seats.includes(value.seat)) {
      const newSeats = seats.filter(item => item !== value.seat);
      setSeats(newSeats);
    } else {
      const newSeats = [...seats, value.seat];
      setSeats(newSeats);
      setClass(value.seatClass);
    }
  };
  const increment = () => {
    const newValue = people + 1;
    setPeople(newValue);
  };
  const decrement = () => {
    const newValue = people - 1;
    setPeople(newValue);
  };
  const validated = seats ? false : true;
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
        seats,
        donation,
        luggage
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
          onClick={onClick}
          people={people}
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
                onClick={() => setLuggage(8)}
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
                onClick={() => setLuggage(20)}
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
                onClick={() => setLuggage(25)}
              />
            </div>
          </div>
        </div>
        <div className="details__container__row">
          <div className="details__people">
            <p className="details__label">Choose the number of seats</p>
            <Button onClick={decrement}>-</Button>
            <input
              readOnly={true}
              type="text"
              value={people}
              className="details__people__input"
            />
            <Button onClick={increment}>+</Button>
          </div>
        </div>
        <div className="details__container__row">
          <div className="details__cost">
            <p className="details__label">Total cost is </p>
            <p className="details__cost__label">
              You have chosen: {mappedSeats}
            </p>
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
