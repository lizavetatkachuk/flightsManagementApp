import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "./../../helpers/apiHeler";

interface IFlight {
  _id: string;
  booked: Array<string>;
  from: string;
  to: string;
  price: number;
  company: string;
  time: string;
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  .delete {
    align-self: center;
    justify-self: flex-end;
    margin-bottom: 10px;
    font-size: 20px;
    background-color: Transparent;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 22%;
    cursor: pointer;
  }
  .add {
    display: flex;
    margin-bottom: 10px;
    font-size: 20px;
    background-color: #e0e417b3;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 15%;
    cursor: pointer;
  }
  .flight {
    display: flex;
    flex-flow: column wrap;
    width: 55%;
    font-size: 25px;
    margin: 10px;
    color: #0c0663;
    background-color: #e0e417b3;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 5px;
    &__details {
      margin-block-start: 8px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  }
`;
const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const handleDeletion = (code: string) => {
    api.post(`/admin/flights/${code}`).then(res => {
      setFlights(res.data);
    });
  };

  useEffect(() => {
    api.get("/admin/flights").then(res => setFlights(res.data));
  }, []);
  const mappedFlights = flights
    ? flights.map((flight: IFlight) => {
        return (
          <li className="flight" key={flight._id}>
            <p className="flight__details">
              Flying from {flight.from} to {flight.to}
            </p>
            <p className="flight__details">Airlines: {flight.company}</p>
            <p className="flight__details">Date: {flight.time}</p>
            <button
              className="delete"
              onClick={() => handleDeletion(flight._id)}
            >
              Delete Flight
            </button>
          </li>
        );
      })
    : null;
  return (
    <Container>
      <div>{mappedFlights} </div>
      <button className="add" onClick={() => {}}>
        Add Flight
      </button>
    </Container>
  );
};
export default AllFlights;
