import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Form, Field } from "react-final-form";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Picker } from "./../Picker/Picker";
import { api, post } from "./../../helpers/apiHeler";
import "react-datepicker/dist/react-datepicker.css";

type OpacityProps = {
  opacity: 0 | 1;
};

const Message = styled.div<OpacityProps>`
  position: absolute;
  top: 12%;
  width: 100%;
  padding: 10px;
  color: #0c0663;
  text-align: center;
  font-size: 23px;
  transition: opacity 3s linear;
  opacity: ${props => props.opacity};

  @media (max-width: 1200px) and (min-width: 768px) {
    top: 14%;
    font-size: 20px;
  }
  @media (max-width: 768px) and (min-width: 465px) {
    top: 15%;
    font-size: 18px;
  }
  @media (max-width: 465px) {
    top: 16%;
    font-size: 18px;
  }
`;

const Error = styled.span`
  margin-left: 10px;
  position: initial;
  font-size: 18px;
  height: 20px;
  color: #c11c1cd4;
`;

const AddButton = styled.button`
  align-self: center;
  justify-self: flex-end;
  padding: 8px 10px;
  margin: 20px;
  border-radius: 7px;
  font-size: 20px;
  background-color: Transparent;
  color: #0c0663;
  border: 2px solid #0c0663;
  outline: none;
  cursor: pointer;
  :disabled {
    color: #282a2dcc;
  }
  :hover {
    box-shadow: 7px 7px 7px #242222;
  }

  @media (max-width: 1200px) and (min-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 768px) and (min-width: 465px) {
    font-size: 17px;
  }
  @media (max-width: 465px) {
    font-size: 16px;
  }
`;

const AddForm = styled.form`
  font-family: "Nanum Gothic", sans-serif;
  padding-top: 10px;
  width: 45%;
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  margin: auto;
  background-color: #7f95adcc;
  border-radius: 10px;
  .search-form {
    &__label {
      width: auto;
      margin-top: 20px;
      margin-left: 10px;
      font-size: 20px;
    }
  }

  @media (max-width: 1200px) and (min-width: 768px) {
    .search-form__label {
      margin: 17px;
    }
    font-size: 18x;
  }
  @media (max-width: 768px) and (min-width: 465px) {
    padding-top: 20px;
    width: 80%;
  }
  @media (max-width: 465px) {
    padding-top: 20px;
    width: 90%;
  }
`;
const Label = styled.label`
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
`;

const InputField = styled.input`
  width: 90%;
  margin-right: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 7px;
  border-radius: 8px;
  height: 35px;
  font-size: 20px;
  outline: none;
  color: #0c0663;
  ::placeholder {
    color: #0c0663;
  }
  background-color: #f7f3f3bf;
`;

const Select = styled.select`
  width: 90%;
  margin-right: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 8px;
  height: 35px;
  font-size: 20px;
  outline: none;
  color: #0c0663;
  background-color: #f7f3f3bf;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-top: 30px;

  .picker {
    display: flex;
    flex-direction: column;
    margin-bottom: 19px;
    margin-top: -20px;
    width: 90%;
    align-items: center;
  }
  .react-datepicker__input-container input {
    margin-top: 0px;
    margin-right: 10px;
    color: #0c0663;
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
      <Message opacity={message ? 0 : 1}>{message}</Message>
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
          <AddForm onSubmit={handleSubmit}>
            <Field
              name="from"
              render={({ input, meta }) => (
                <React.Fragment>
                  <Label>Choose the departure airport</Label>
                  <Select {...input}>
                    <option key="empty-departure"></option>
                    {destinations}
                  </Select>
                  <Error>{meta.error && meta.touched ? meta.error : ""}</Error>
                </React.Fragment>
              )}
            />
            <Field
              name="to"
              render={({ input, meta }) => (
                <React.Fragment>
                  <Label>Choose the destination airport</Label>
                  <Select {...input}>
                    <option key="empty-destination"></option>
                    {destinations}
                  </Select>
                  <Error>{meta.error && meta.touched ? meta.error : ""}</Error>
                </React.Fragment>
              )}
            />
            <Field
              name="plane"
              render={({ input, meta }) => (
                <React.Fragment>
                  <Label>Choose plane type</Label>
                  <Select {...input}>
                    <option key="empty-plane"></option>
                    {planeTypes}
                  </Select>
                  <Error>{meta.error && meta.touched ? meta.error : ""}</Error>
                </React.Fragment>
              )}
            />

            <Field className="dates" component={Picker as any} name="there" />

            <Field
              name="company"
              render={({ input, meta }) => (
                <React.Fragment>
                  <InputField placeholder="Enter the company" {...input} />
                  <Error>{meta.error && meta.touched ? meta.error : ""}</Error>
                </React.Fragment>
              )}
            />
            <Field
              name="price"
              render={({ input, meta }) => (
                <React.Fragment>
                  <InputField placeholder="Enter the basic price " {...input} />
                  <Error>{meta.error && meta.touched ? meta.error : ""}</Error>
                </React.Fragment>
              )}
            />
            <AddButton type="submit" disabled={submitting || pristine}>
              {props.flight ? "Edit" : "Add"}
            </AddButton>
          </AddForm>
        )}
      />
    </Container>
  );
}

export default withRouter(AddFlight);
