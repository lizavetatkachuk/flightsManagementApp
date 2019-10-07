import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import deleteSvg from "./../../static/images/delete-yellow.svg";
import editSvg from "./../../static/images/edit-yellow.svg";
import { api } from "./../../helpers/apiHeler";

const Container = styled.div` 
  .delete,
  .add,.edit  {
    align-self: center;
    justify-self: flex-end;
    margin-left: 10px;
    font-size: 23px;
    color: #0c0663;  
    padding:8px 10px;
    border-radius: 7px;
    height:100%;
    width:33px;
    width: auto%;
    outline: none;
    cursor: pointer;
    :disabled {
      color: grey;
    }
    &:hover {
      box-shadow: 3px 3px 3px #242222;
    }}
    .add{
    color: #0c0663;
    background-color:Transparent;
    border:2px solid #0c0663;
      font-size:25px;
    }
  .form {
   margin:0px auto;
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
    flex-direction:row;
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
      background-color:#82a1c3b3;
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
  .search-field {
    position: absolute;
    top: 15%;
    right: 3%;
    input {
      color: #0c0663;
      padding: 8px;
      outline: none;
      cursor: pointer;
      border-radius: 5px;
      font-size: 20px;
      background-color: Transparent;
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

interface IAirport {
  name: string;
  code: string;
}

function Airports() {
  const [airports, setAirports] = useState([]);
  const [filter, setFilter] = useState("");
  const [edited, setEdited] = useState(null);
  const [error, setError] = useState("");

  const handleDeletion = (code: string) => {
    api.post(`/admin/airports/${code}`).then(res => {
      let filtered = airports.filter(airport => {
        return airport.code != code;
      });
      setAirports(filtered);
    });
  };

  const handleSearch = (items: Array<IAirport>) => {
    setAirports(items);
  };

  const handleAddition = (values: { code: string }) => {
    edited
      ? api
          .patch("/admin/airports/", {
            ...values
          })
          .then(res => {
            let filtered = airports.filter(airport => {
              return airport.code != values.code;
            });
            setAirports([...filtered, values]);
            setEdited(null);
          })
          .catch(err => {
            setError(err);
          })
      : api
          .post("/admin/airports/", {
            ...values
          })
          .then(res => {
            setAirports([...airports, values]);
            setEdited(null);
          })
          .catch(err => {
            setError(err);
          });
  };

  const handleEdit = (airport: object) => {
    setEdited(airport);
  };

  useEffect(() => {
    api.get("/admin/airports").then(res => {
      setAirports(res.data);
    });
  }, []);

  const mappedAirports = airports
    ? airports.map((airport: IAirport) => {
        return (
          <div className="airport-list__airport" key={airport.code}>
            <p>{airport.name}</p>
            <div className="btn-container">
              <img
                src={deleteSvg}
                alt="delete-btn"
                className="delete"
                onClick={() => handleDeletion(airport.code)}
              ></img>
              <img
                src={editSvg}
                alt="edit-btn"
                className="edit"
                onClick={() => handleEdit(airport)}
              ></img>
            </div>
          </div>
        );
      })
    : null;

  return (
    <Container>
      <div className="search-field">
        <input
          type="text"
          placeholder="Search"
          onChange={e => {
            let filtered = airports
              ? airports.filter((item: any) => {
                  return item.name.includes(filter);
                })
              : null;
            setFilter(e.target.value);
            setAirports(filtered);
          }}
        ></input>
      </div>
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
            <OnChange name="name">
              {value => {
                setError(null);
              }}
            </OnChange>
            <OnChange name="code">
              {value => {
                setError(null);
              }}
            </OnChange>
          </form>
        )}
      />
      <p className="error">{error ? "The airport already exists" : " "}</p>
      <div className="airport-list">{mappedAirports}</div>
    </Container>
  );
}
export default Airports;
