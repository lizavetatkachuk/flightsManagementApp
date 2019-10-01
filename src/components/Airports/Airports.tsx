import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { api } from "./../../helpers/apiHeler";

interface IAirport {
  name: string;
  code: string;
}
const Container = styled.div` 
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
    height:50%;
    width: 20%;
    outline: none;
    cursor: pointer;
    :disabled {
      color: grey;
    }}
    .add{
      font-size:25px;
    }
  .form {
   margin:20px auto;
    display:flex
    flex-direction:column;
    align-items:center;
    width: 40%;
    .add{
      height:auto;
      margin-top:10px;
      width:auto;
    }

  }
  .input-field {
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 8px;
    height: 35px;
    font-size: 20px;
    color: #0c0663;
    ::placeholder {
      color: #0c0663;
    }
    background-color:#bdbec0;
  }}
  
  .airport-list {
    padding-right:10px;
    width:100%;
    margin:15px;
    box-sizing:border-box;
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
    &__airport {
      width:12%;
      display: flex;
      flex-direction: row ;
      justify-content: space-between;
      font-size: 25px;
      margin: 10px;
      color: #0c0663;
      background-color: #e0e417b3;
      border-radius: 8px;
      padding-left: 10px;
      padding-right: 5px;
    }
  }
  .error {
    color: red;
    height: 21px;
    font-size: 20px;
    position: initial;
    margin-block-end: 0em;
    margin-block-start: 0em;
  }
  @media(max-width:1200px) and (min-width:768px){
    .airport-list {    
      &__airport {
        width:17%;
        font-size: 25px;
        margin: 8px;
      }
    }
    .delete{
      margin-right:2px;
      margin-left:3px;
    }
  }
  @media(max-width:768px) and (min-width:560px){
    .airport-list {    
      &__airport {
        width:27%;
        font-size: 25px;
        margin: 8px;
      }
    }

    .input-field{
    width:80%;
          }
    .delete{
      width:23%;
      font-size:20px;
    }
    .add{
      font-size:25px;
    }
    .form{     
      width:54%;
    }
  }
  @media(max-width:560px) {
    .form{
      margin-top:10px;
      width:60%;
    }
    .input-field{
margin:0px;
font-size:18px;
width:100%;
    }
    .airport-list {
      &__airport {
        width:29%;
        font-size: 18px;
        margin: 3px;
      }
    }
    .delete{
      width:20%;
      font-size:20px;
      margin-left:7px;
      margin-right:0px;
    }
    .add{
      font-size:20px;
    }
  }
  @media(max-width:330px) {
    .form{
      margin-top:10px;
      width:70%;
    }
    .input-field{
      width:100%;
margin:0px;
font-size:15px;
    }
    .airport-list {
      &__airport {
        width:32%;
        font-size: 18px;
        margin: 7px;
      }
    }
    .delete{
      width:15%;
      height:auto;
      font-size:18px;
      margin-left:2px;
      margin-right:0px;
    }
    .add{
      font-size:18px;
    }
  }
`;
function Airports() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");

  const handleDeletion = (code: string) => {
    api.post(`/admin/airports/${code}`).then(res => {
      api.get("/admin/airports").then(res => setAirports(res.data));
    });
  };

  const handleAddition = (values: object) => {
    api
      .post("/admin/airports/", {
        ...values
      })
      .then(res => {
        api.get("/admin/airports").then(res => setAirports(res.data));
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
          <div className="airport-list__airport" key={airport.code}>
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
      <p className="error">{error ? "The airport already exists" : " "}</p>
      <div className="airport-list">{mappedAirports}</div>
    </Container>
  );
}
export default Airports;
