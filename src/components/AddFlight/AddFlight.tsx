import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Picker } from "./../Picker/Picker";
import { api } from "./../../helpers/apiHeler";
import data from "./../../data";
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
interface IPlane {
  key: string;
  name: string;
}
interface IError {
  to?: string;
  from?: string;
  plane?: string;
  company?: string;
  price?: string;
  there?: string;
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding-top: 70px;
  .form {
    padding-top: 10px;
    width: 45%;
    display: flex;
    align-items:center;
    flex-flow: column wrap;
    margin: auto;
    background-color:  #7f95adcc;
    border-radius: 10px;
    &__label{
        font-size:20px;
        margin-top: 20px;
        margin-left: 10px;
    }
  }

.picker {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  width: 32%;
}
.picker {
  display: flex;
  flex-flow: row;
  align-items:baseline;
  margin-top: 10px;
  width:90%;
  .search-form__label{
    width: 20%;
    margin-left:0px;
  }
}
  .input-field {
    width:90%;
    margin-right:0px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 8px;
    height: 35px;  
    font-size: 20px;
    color: #0c0663;
    ::placeholder {
      color: #0c0663;
    }
    background-color:#f7f3f3bf;   
  }
  input.input-field{
    border-style:none;
  }
  .add {
    align-self: center;
    justify-self: flex-end;
    margin 20px;
    font-size: 20px;
    background-color: #e0e417b3;
    color: #0c0663;
    border-radius: 7px;
    height: 15%;
    width: 15%;
    outline: none;
    cursor: pointer;
    :disabled {
      background-color: grey;
      color:#282a2dcc;
    }
    :hover {
      box-shadow: 7px 7px 7px grey;
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
  .picker{
    display:flex;
    flex-direction: column;
    margin-bottom:19px;
    margin-top: -20px;
    align-items: center;
  }
  .react-datepicker__input-container input{
    margin-top: 0px;
   margin-right:10px;
    color: #0c0663;
  }
`;

function AddFlight({ history }: RouteComponentProps) {
  const [airports, setAirports] = useState([]);
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    api.get("/admin/airports").then(res => setAirports(res.data));
    api.get("/admin/planes").then(res => setPlanes(res.data));
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

  const planeTypes = planes ? (
    planes.map((plane: IPlane) => (
      <option key={plane.key} value={plane.key}>
        {plane.name}
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
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
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
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
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
                    {planeTypes}
                  </select>
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                </React.Fragment>
              )}
            />

            <Field className="dates" component={Picker as any} name="there" />

            <Field
              name="company"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the company"
                    {...input}
                  />
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
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
                  <span className="error">
                    {meta.error && meta.touched ? meta.error : ""}
                  </span>
                </React.Fragment>
              )}
            />
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
