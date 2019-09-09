import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { api } from "./../../helpers/apiHeler";
interface IAirport {
  name: string;
  code: string;
}
const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  .input-field {
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 8px;
    height: 35px;
    font-size: 20px;
    font-size: 20px;
    color: #0c0663;
    ::placeholder {
      color: #0c0663;
    }
    background-color: Transparent;
    width: 25%;
  }
  .delete,
  .add {
    align-self: center;
    margin-left: 50px;
    font-size: 30px;
    background-color: Transparent;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 15%;
    cursor: pointer;
  }
  .airport {
    display: flex;
    flex-flow: row wrap;
    width: 15%;
    font-size: 25px;
    margin: 10px;
    color: #0c0663;
    background-color: #e0e417b3;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 5px;
  }
`;
function Airports() {
  const [airports, setAirports] = useState([]);
  const handleDeletion = (code: string) => {
    api.post(`/admin/airports/${code}`).then(res => {
      setAirports(res.data);
    });
  };
  const handleAddition = (values: object) => {
    api
      .post("/admin/airports/", {
        ...values
      })
      .then(res => {
        setAirports(res.data);
      })
      .catch(err => {
        "This airport already exists";
      });
  };
  useEffect(() => {
    api.get("/admin/airports").then(res => setAirports(res.data));
  }, []);
  const mappedAirports = airports
    ? airports.map((airport: IAirport) => {
        return (
          <li className="airport" key={airport.code}>
            <p>{airport.name}</p>
            <button
              className="delete"
              onClick={() => handleDeletion(airport.code)}
            >
              -
            </button>
          </li>
        );
      })
    : null;
  return (
    <Container>
      <Form
        onSubmit={handleAddition}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field
              name="name"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the airport name"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field
              name="code"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the airport code"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <button type="submit" className="add">
              Add the airport
            </button>
          </form>
        )}
      />
      {mappedAirports}
    </Container>
  );
}
export default Airports;
