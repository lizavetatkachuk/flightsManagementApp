import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  padding-top: 40px;
  .delete {
    align-self: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 20px;
    background-color: #e0e417b3;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 22%;
    outline: none;
    cursor: pointer;
    :hover {
      box-shadow: 7px 7px 7px grey;
    }
  }
  .list {
    margin: 0 auto;
    width: 37%;
  }
  .add {
    text-align: center;
    font-size: 25px;
    background-color: #e0e417b3;
    margin: 25px 25px 10px 0;
    font-size: 25px;
    background-color: #e0e417b3;
    color: #0c0663;
    border-radius: 7px;
    height: auto;
    padding: 7px;
    width: 8%;
    outline: none;
    cursor: pointer;
    text-align: center;
    position: fixed;
    right: 20px;
    top: 95px;
    :hover {
      box-shadow: 7px 7px 7px grey;
    }
  }
  .flight {
    cursor: initial;
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    width: 100%;
    font-size: 25px;
    margin: 10px;
    color: #0c0663;
    background-color: #aeb2bbcc;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 5px;
    &__details {
      margin: 8px 0 0 0;
    }
  }
  @media(max-width:1200px) and (min-width:768px){
    .list{
      width:47%;
    }
  }
  @media(max-width:768px) and (min-width:465px){
    .flight{
      font-size:19px;
    }
    .list{
      width:69%;
    }
    .delete{
      font-size:18px;
      width:auto;
    }
    .add{
      font-size:18px;
      width:auto;
    }
  }
  @media(max-width:465px) {
    .flight{
      font-size:18px;
    }
    .list{
      width:80%;
      margin:0px;
    }
    .delete{
      font-size:16px;
      width:auto;
    }
    .add{
      right:40%;
      font-size:18px;margin:5px;
      width:auto;
    }
  }
`;
const AllFlights = () => {
  const [flights, setFlights] = useState([]);

  const handleDeletion = (id: string) => {
    api.post(`/admin/flights/${id}`).then(res => {
      api.get("/admin/flights").then(res => setFlights(res.data));
    });
  };

  useEffect(() => {
    api.get("/admin/flights").then(res => {
      setFlights(res.data);
    });
  }, []);

  const mappedFlights = flights
    ? flights.map((flight: IFlight) => {
        return (
          <div className="flight" key={flight._id}>
            <p className="flight__details">
              Flying from {flight.from} to {flight.to}
            </p>
            <p className="flight__details">
              Airlines: {flight.company} {"    "}Date: {flight.time}
            </p>

            <button
              className="delete"
              onClick={() => handleDeletion(flight._id)}
            >
              Delete Flight
            </button>
          </div>
        );
      })
    : null;

  return (
    <Container>
      <div className="list">{mappedFlights} </div>
      <Link to="/admin/flights/add" className="add">
        Add Flight
      </Link>
    </Container>
  );
};

export default AllFlights;
