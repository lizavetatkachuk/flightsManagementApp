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
  .form {
   margin:0 auto;
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
      width:10%;
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
    font-size: 19px;
    position: initial;
    margin-block-end: 0em;
    margin-block-start: 0em;
  }
  @media(max-width:1200px) and (min-width:768px){
    .airport-list {    
      &__airport {
        width:14%;
        font-size: 24px;
        margin: 8px;
      }
    }
  }
  @media(max-width:768px) and (min-width:465px){
    .airport-list {    
      &__airport {
        width:16%;
        font-size: 24px;
        margin: 8px;
      }
    }
    .delete{
      width:23%;
      font-size:20px;
    }
    .add{
      font-size:23px;
    }
    .form{     
      width:56%;
    }
  }
  @media(max-width:560px) {
    .form{
      margin-top:10px;
      width:70%;
    }
    .input-field{
margin:0px;
font-size:18px;
    }
    .airport-list {
      &__airport {
        width:27%;
        font-size: 19px;
        margin: 3px;
      }
    }
    .delete{
      width:20%;
      font-size:20px;
      margin-left:10px;
      margin-right:0px;
    }
    .add{
      font-size:18px;
    }
  }
  @media(max-width:330px) {
    .form{
      margin-top:10px;
      width:70%;
    }
    .input-field{
margin:0px;
font-size:15px;
    }
    .airport-list {
      &__airport {
        width:30%;
        font-size: 17px;
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
      font-size:16px;
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
