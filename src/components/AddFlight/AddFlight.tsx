import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Picker } from "./../Picker/Picker";
import { api, post, patch } from "./../../helpers/apiHeler";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-top: 30px;
  .form {
    font-family: "Nanum Gothic", sans-serif;
    padding-top: 10px;
    width: 45%;
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    margin: auto;
    background-color: #7f95adcc;
    border-radius: 10px;
    &__label {
      font-size: 20px;
      margin-top: 20px;
      margin-left: 10px;
    }

    .search-form {
      &__label {
        width: auto;
        margin-top: 20px;
        margin-left: 10px;
        font-size: 20px;
      }
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
    align-items: baseline;
    margin-top: 10px;
    width: 90%;
  }
  .input-field {
    width: 90%;
    margin-right: 0px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 8px;
    height: 35px;
    font-size: 20px;
    color: #0c0663;
    ::placeholder {
      color: #0c0663;
    }
    background-color: #f7f3f3bf;
  }
  input.input-field {
    border-style: none;
  }
  .add {
    align-self: center;
    justify-self: flex-end;
    margin: 20px;
    font-size: 20px;
    background-color: Transparent;
    color: #0c0663;
    border-radius: 7px;
    border: 2px solid #0c0663;
    padding: 8px 10px;
    outline: none;
    cursor: pointer;
    :disabled {
      color: #282a2dcc;
    }
    :hover {
      box-shadow: 7px 7px 7px #242222;
    }
  }
  .error {
    margin-left: 10px;
    position: initial;
    font-size: 18px;
    height: 20px;
    color: #c11c1cd4;
  }
  .picker {
    display: flex;
    flex-direction: column;
    margin-bottom: 19px;
    margin-top: -20px;
    align-items: center;
  }
  .message {
    width: 100%;
    padding: 10px;
    position: absolute;
    top: 18%;
    color: #0c0663;
    text-align: center;
    font-size: 23px;
  }
  .visible {
    visibility: visible;
    opacity: 0;
    transition: opacity 2s linear;
  }
  .hidden {
    visibility: hidden;
    opacity: 1;
    transition: visibility 0s 2s, opacity 2s linear;
  }

  .react-datepicker__input-container input {
    margin-top: 0px;
    margin-right: 10px;
    color: #0c0663;
  }
  @media (max-width: 1200px) and (min-width: 768px) {
    .form {
      .search-form__label {
        margin: 17px;
      }
    }
    .add {
      font-size: 18x;
    }
  }
  @media (max-width: 768px) and (min-width: 465px) {
    .form {
      width: 80%;
    }
    .add {
      font-size: 17x;
    }
  }
  @media (max-width: 465px) {
    .form {
      width: 90%;
    }
    .add {
      font-size: 16x;
    }
  }
`;
interface IFlight {
  _id: string;
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
  _id: string;
}

interface IPlane {
  key: string;
  name: string;
  _id: string;
}

interface IError {
  to?: string;
  from?: string;
  plane?: string;
  company?: string;
  price?: string;
  there?: string;
}

interface IProps extends RouteComponentProps {
  flight?: IFlight;
  close?: () => void;
  update?: (any) => void;
}

function AddFlight(props: IProps) {
  const [airports, setAirports] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/admin/airports").then(res => setAirports(res.data));
    api.get("/admin/planes").then(res => setPlanes(res.data));
  }, []);

  const handleAddition = (values: IFlight) => {
    props.flight
      ? api.patch("/admin/flights", { ...values }).then(res => {
          api.get("admin/flights").then(res => {
            props.close();
            props.update(res.data);
          });
        })
      : post(
          "/admin/flights/add",
          {
            ...values,
            time: values.there,
            booked: []
          },
          () => {
            setMessage("Flight created");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          },
          err => {
            setMessage("Invalid data");
          }
        );
  };

  const destinations = airports ? (
    airports.map((airport: IAirport) => (
      <option key={airport.code} value={airport._id}>
        {airport.name}
      </option>
    ))
  ) : (
    <option key="empty"></option>
  );

  const planeTypes = planes ? (
    planes.map((plane: IPlane) => (
      <option key={plane.key} value={plane._id}>
        {plane.name}
      </option>
    ))
  ) : (
    <option key="empty"></option>
  );

  return (
    <Container>
      <div className={message ? "message visible" : "message hidden"}>
        {message}
      </div>
      <Form
        onSubmit={handleAddition}
        initialValues={props.flight}
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
          if (!values.there && !props.flight) {
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
              {props.flight ? "Edit" : "Add"}
            </button>
          </form>
        )}
      />
    </Container>
  );
}

export default withRouter(AddFlight);
