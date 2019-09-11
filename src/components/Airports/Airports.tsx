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
    justify-self: flex-end;
    margin-left: 20px;
    margin-right: 15px;
    font-size: 30px;
    background-color: Transparent;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 15%;
    outline: none;
    cursor: pointer;
    :disabled {
      color: grey;
    }
  }
  .airport {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 25%;
    font-size: 25px;
    margin: 10px;
    color: #0c0663;
    background-color: #e0e417b3;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 5px;
  }
  .error {
    color: red;
    height: 21px;
    font-size: 19px;
    position: initial;
    margin-block-end: 0em;
    margin-block-start: 0em;
  }
`;
function Airports() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");
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
        setError(err);
      });
  };
  useEffect(() => {
    api.get("/admin/airports").then(res => setAirports(res.data));
  }, []);
  const mappedAirports = airports
    ? airports.map((airport: IAirport) => {
        return (
          <div className="airport" key={airport.code}>
            <p>{airport.name}</p>
            <button
              className="delete"
              onClick={() => handleDeletion(airport.code)}
            >
              -
            </button>
          </div>
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
            <button
              type="submit"
              className="add"
              disabled={submitting || pristine}
            >
              Add the airport
            </button>
          </form>
        )}
      />
      {error ? (
        <p className="error">The airport already exists</p>
      ) : (
        <p className="error"> </p>
      )}
      {mappedAirports}
    </Container>
  );
}
export default Airports;
