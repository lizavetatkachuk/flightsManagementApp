import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { api } from "../../helpers/apiHeler";

interface IPlane {
  name: string;
  key: string;
  business: number;
  economy: number;
  maxCargo: number;
}
const Container = styled.div`

  .delete,
  .add {
    align-self: center;
    justify-self: flex-end;
    margin-left: 20px;
    margin-right: 15px;
    font-size: 25px;
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
    width: 50%;
    .add{
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
    font-size: 20px;
    color: #0c0663;
    ::placeholder {
      color: #0c0663;
    }
    background-color:#bdbec0;
  }}
  
  .list {
    padding-right:10px;
    width:100%;
    margin:15px;
    box-sizing:border-box;
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
    &__plane {
      width:20%;
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
    .form{
      width:67%;
    }
    .input-field{
      font-size:19px;
    }
    .list {    
      &__plane{
        width:24%;
        font-size: 24px;
        margin: 8px;
      }
    }
  }
  @media(max-width:768px) and (min-width:465px){
    .form{
      width:80%;
    }
    .input-field{
      font-size:18px;
    }
    .add{
      font-size:20px;
      width:auto;
    }
    .list {    
      &__plane{
        width:30%;
        font-size: 22px;
        margin: 6px;
      }
    }
  }
  @media(max-width:465px) {
    .form{
      width:83%;
    }
    .input-field{
      font-size:15px;
    }
    .add{
      font-size:15px;
      width:50%;
    }
    .list {    
      &__plane{
        width:32%;
        font-size: 21px;
        margin: 5px;
      }
    }
.delete{
  margin:0px;
  font-size:15px;
  height:auto;
}
  }
  @media(max-width:330px) {
    .form{
      width:95%;
    }
    .input-field{
      font-size:15px;
    }
    .add{
      font-size:18px;
      width:50%;
    }
    .list {    
      &__plane{
        width:32%;
        font-size: 21px;
        margin: 5px;
      }
    }
.delete{
  margin:0px;
  font-size:15px;
  height:auto;
}
  }
`;
function Planes() {
  const [planes, setPlanes] = useState([]);
  const [error, setError] = useState("");

  const handleDeletion = (code: string) => {
    api.post(`/admin/planes/${code}`).then(res => {
      api.get("/admin/planes").then(res => setPlanes(res.data));
    });
  };

  const handleAddition = (values: object) => {
    api
      .post("/admin/planes/", {
        ...values
      })
      .then(res => {
        api.get("/admin/planes").then(
          res => {
            setPlanes(res.data)});
      })
      .catch(err => {
        setError(err);
      });
  };

  useEffect(() => {
    api.get("/admin/planes").then(res => setPlanes(res.data));
  }, []);

  const mappedPlanes = planes
    ? planes.map((plane: IPlane) => {
        return (
          <div className="list__plane" key={plane.key}>
            <p>{plane.name}</p>
            <button
              className="delete"
              onClick={() => handleDeletion(plane.key)}
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
                    placeholder="Enter the plane name"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field
              name="key"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the plane shorthand code"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field
              name="business"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the number of seats in business class"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field
              name="economy"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the number of seats in economy class"
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <Field
              name="maxCargo"
              render={({ input, meta }) => (
                <React.Fragment>
                  <input
                    className="input-field"
                    placeholder="Enter the maximum cargo capacity "
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
              Add the plane
            </button>
          </form>
        )}
      />
      <p className="error">{error ? "The plane already exists" : " "}</p>
      <div className="list">{mappedPlanes}</div>
    </Container>
  );
}
export default Planes;
