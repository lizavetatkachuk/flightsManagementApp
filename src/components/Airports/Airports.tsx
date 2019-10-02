import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { api } from "./../../helpers/apiHeler";
import { object } from "prop-types";

interface IAirport {
  name: string;
  code: string;
}
const Container = styled.div` 
  .delete,
  .add,.edit  {
    align-self: center;
    justify-self: flex-end;
    margin-left: 10px;
    font-size: 23px;
    background-color: Transparent;
    color: #0c0663;
    border-radius: 7px;
    height:50%;
    width: auto%;
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
   margin-bottom:40px;
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
  .btn-container{
    justify-self:flex-end;
    display:flex;
    flex-flow:row wrap;
  }
  .airport-list {
    padding-right:10px;
    width:100%;
    margin:15px;
    box-sizing:border-box;
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
    &__airport {
      width:17%;
      display: flex;
      flex-direction: row ;
      justify-content: space-between;
      align-items:center;
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
    font-size: 18px;
    position: absolute;
    left:45%;
    top:37%;
    margin-block-end: 0em;
    margin-block-start: 0em;
  }
  @media(max-width:1200px) and (min-width:768px){
    .airport-list {    
      &__airport {
        width:22%;
        font-size: 23px;
        margin: 8px;
        height:98px;
      }
    }
    .error{
      left:40%;
    }
    .delete{
      margin-right:2px;
      margin-left:3px;
    }
  }
  @media(max-width:768px) and (min-width:560px){
    .airport-list {    
      margin:10px;
      &__airport {
        height:98px;
        width:30%;
        font-size: 20px;
        margin: 8px;
      }
    }
    .error{
      left:35%
    }
    .btn-container{
      flex-flow:column wrap;
    }
.error{
  top:38%;
  left:31%;
}
    .input-field{
    width:80%;
          }   
    .add{
      font-size:23px;
    }
    .form{     
      width:54%;
    }
    .add,.edit,.delete{
      font-size:20px;
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
    .error{
      top:32%;
      left:30%;
    }
    .btn-container{
      flex-flow:column wrap;
    }
    .airport-list {
      margin:8px;
      &__airport {
        width:60%;
        height:80px;
        font-size: 20px;
        margin: 3px;
      }
    }
    .add,.edit,.delete{
      font-size:18px;
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
    .btn-container{
      flex-flow:column wrap;
    }
    .error{
      top:35%;
      left:30%;
    }
    .airport-list {
      margin:8px;
      &__airport {
        width:65%;
        height:80px;
        font-size: 20px;
        margin: 3px;
      }
    }
    .add,.edit,.delete{
      font-size:18px;
    }
  }
`;
function Airports() {
  const [airports, setAirports] = useState([]);
  const [edited, setEdited] = useState(null);
  const [error, setError] = useState("");

  const handleDeletion = (code: string) => {
    api.post(`/admin/airports/${code}`).then(res => {
      api.get("/admin/airports").then(res => setAirports(res.data));
    });
  };

  const handleAddition = (values: object) => {
    edited
      ? api
          .patch("/admin/airports/", {
            ...values
          })
          .then(res => {
            api.get("/admin/airports").then(res => {
              setAirports(res.data);
              setEdited(null);
            });
          })
          .catch(err => {
            setError(err);
          })
      : api
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
  const handleEdit = (airport: object) => {
    setEdited(airport);
  };

  useEffect(() => {
    api.get("/admin/airports").then(res => setAirports(res.data));
  }, []);

  const mappedAirports = airports
    ? airports.map((airport: IAirport) => {
        return (
          <div className="airport-list__airport" key={airport.code}>
            <p>{airport.name}</p>
            <div className="btn-container">
              <button
                className="delete"
                onClick={() => handleDeletion(airport.code)}
              >
                Delete
              </button>
              <button className="edit" onClick={() => handleEdit(airport)}>
                Edit
              </button>
            </div>
          </div>
        );
      })
    : null;

  return (
    <Container>
      <Form
        onSubmit={handleAddition}
        initialValues={edited}
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
              {edited ? "Edit" : "Add"} the airport
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
