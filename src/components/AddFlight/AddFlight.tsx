import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Picker } from "./../Picker/Picker";
import { api } from "./../../helpers/apiHeler";
import "react-datepicker/dist/react-datepicker.css";

interface IFlight {
  from: string;
  to: string;
  there: string;
  company: string;
  price: number;
  plane: string;
}
interface IAirport {
  name: string;
  code: string;
}
interface IError {
  to?: string | null;
  from?: string | null;
  plane?: string | null;
  company?: string | null;
  price?: string | null;
  there?: string | null;
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
    :disabled {
      color: grey;
    }
  }
  .error{
    margin-left:10px;
    position:initial;
    font-size:18px;
    height:20px;
  }
  .search-form__label{
    margin-top: 20px;
    margin-left:10px;
     font-size: 20px;
  }
  .react-datepicker__input-container input{
    margin-top: 0px;
    margin-left:10px;
    color: #0c0663;
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
        time: values.there,
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
        validate={values => {
          const errors: IError = {};
          if (!values.from) {
            errors.from = "Choose the airport";
          }
          if (!values.to) {
            errors.to = "Choose the destination";
          }
          if (!values.plane) {
            errors.plane = "Choose the plane type";
          }
          if (!values.there) {
            errors.there = "Choose the dates";
          }
          if (!values.company) {
            errors.company = "Choose the company";
          }
          return errors;
        }}
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
                    <option key="empty-departure"></option>
                    {destinations}
                  </select>
                  {meta.error && meta.touched ? (
                    <span className="error">{meta.error}</span>
                  ) : (
                    <span className="error"></span>
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
                    <option key="empty-destination"></option>
                    {destinations}
                  </select>
                  {meta.error && meta.touched ? (
                    <span className="error">{meta.error}</span>
                  ) : (
                    <span></span>
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
                    <option key="empty-plane"></option>
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
                  {meta.error && meta.touched ? (
                    <span className="error">{meta.error}</span>
                  ) : (
                    <span className="error"></span>
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
                  />{" "}
                  {meta.error && meta.touched ? (
                    <span className="error">{meta.error}</span>
                  ) : (
                    <span className="error"></span>
                  )}
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
                  {meta.error && meta.touched ? (
                    <span className="error">{meta.error}</span>
                  ) : (
                    <span className="error"></span>
                  )}
                </React.Fragment>
              )}
            />
            <Field className="dates" component={Picker as any} name="there" />

            <button
              type="submit"
              className="add"
              disabled={submitting || pristine}
            >
              Add the flight
            </button>
          </form>
        )}
      />
    </Container>
  );
}

export default withRouter(AddFlight);
