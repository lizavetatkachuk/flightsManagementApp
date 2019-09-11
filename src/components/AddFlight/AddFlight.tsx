import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { History } from "history";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Picker } from "./../Picker/Picker";
import { api } from "./../../helpers/apiHeler";

interface IFlight {
  name: string;
  code: string;
}
interface IAirport {
  name: string;
  code: string;
}
interface IHistory {
  history: History;
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 30px;
  .form {
    width: 60%;
    display: flex;
    flex-flow: column wrap;
    margin: auto;
    background-color:  #e0e417a1;
    border-radius: 10px;
    &__label{
        margin-top: 20px;
        font-size:20px;
        margin-left: 12px;
    }
  }
  .input-field {
    width:67%;
    margin-top: 20px;
    margin-left: 10px;
    margin-right:0px;
    border-radius: 8px;
    height: 35px;
    font-size: 15px;
    font-size: 20px;
    color: #0c0663;
    ::placeholder {
      color: #0c0663;
    }
    background-color: Transparent;
  }
  .add {
    align-self: center;
    justify-self: flex-end;
    margin 20px;
    font-size: 20px;
    background-color: Transparent;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 15%;
    outline: none;
    cursor: pointer;
  }
`;
function AddFlight({ history }: RouteComponentProps) {
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    api.get("/admin/airports").then(res => setAirports(res.data));
  }, []);
  const handleAddition = (values: IFlight) => {
    api
      .post("/admin/flights/add", {
        ...values,
        booked: []
      })
      .catch(err => console.log(err));
    history.push("/admin/flights");
  };
  const destinations = airports ? (
    airports.map((airport: IAirport) => (
      <option key={airport.code} value={airport.name}>
        {airport.name}
      </option>
    ))
  ) : (
    <option key="empty"></option>
  );
  return (
    <Container>
      <Form
        onSubmit={handleAddition}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="form" onSubmit={handleSubmit}>
            <Field
              name="from"
              render={({ input, meta }) => (
                <React.Fragment>
                  <label className="form__label">
                    Choose the departure airport
                  </label>
                  <select className="input-field" {...input}>
                    {destinations}
                  </select>
                  {meta.error && meta.touched && (
                    <span className="error">{meta.error}</span>
                  )}
                </React.Fragment>
              )}
            />
            <Field
              name="to"
              render={({ input, meta }) => (
                <React.Fragment>
                  <label className="form__label">
                    Choose the destination airport
                  </label>
                  <select className="input-field" {...input}>
                    {destinations}
                  </select>
                  {meta.error && meta.touched && (
                    <span className="error">{meta.error}</span>
                  )}
                </React.Fragment>
              )}
            />
            <Field
              name="plane"
              render={({ input, meta }) => (
                <React.Fragment>
                  <label className="form__label">Choose plane type</label>
                  <select className="input-field" {...input}>
                    <option key="Boeing-737-800" value="Boeing-737-800">
                      Boeing 737 800
                    </option>
                    <option key="AirbusA320(ceo)" value="AirbusA320(ceo)">
                      Airbus A320(ceo)
                    </option>
                    <option key="BombardierCRJ200" value="BombardierCRJ200">
                      Bombardier CRJ200
                    </option>
                  </select>
                  {meta.error && meta.touched && (
                    <span className="error">{meta.error}</span>
                  )}
                </React.Fragment>
              )}
            />
            <Field
              name="company"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the company"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field
              name="price"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the basic price "
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field className="flight-dates" component={Picker} name="there" />
            />
            <button type="submit" className="add">
              Add the flight
            </button>
          </form>
        )}
      />
    </Container>
  );
}
export default withRouter(AddFlight);
