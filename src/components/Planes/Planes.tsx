import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import SearchBar from "./../SearchBar/SearchBar";
import deleteSvg from "./../../static/images/delete-yellow.svg";
import editSvg from "./../../static/images/edit-yellow.svg";
import { api } from "../../helpers/apiHeler";

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
  width:33px;
  outline: none;
  cursor: pointer;
  :disabled {
    color: grey;
  }
  &:hover {
    box-shadow: 3px 3px 3px #242222;
  }}
  .add{
    background-color: Transparent;
    color: #0c0663;
    font-size:25px;
    border:2px solid #0c0663; 
  }
  .form {
    margin:0 auto;
    margin-bottom:40px;
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
  .btn-container{
    justify-self:flex-end;
    display:flex;
    flex-direction :row  ;
  }
  .list {
    padding-right:10px;
    width:100%;
    margin:15px;
    box-sizing:border-box;
    display:flex;
    flex-flow:row wrap;
    justify-content:center;
    &__plane {
      padding:10px;
      width:20%;
      display: flex;
      flex-direction: row ;
      justify-content: space-between;
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
    top:57%;
    margin-block-end: 0em;
    margin-block-start: 0em;
  }
  @media(max-width:1200px) and (min-width:768px){
    .error{
      left:40%;
    }
    .form{
      width:67%;
    }
    .input-field{
      font-size:19px;
    }
    .list {    
      &__plane{
        padding:10px;
        width:30%;
        font-size: 20px;
        margin: 8px;
      }
    }
    .add{
      font-size:23px;
    }
    .edit,.delete{
      font-size:20px;
    }
  }
  @media(max-width:768px) and (min-width:465px){
    .form{
      width:82%;
    }
    .input-field{
      font-size:18px;
    }
    .add,.edit,.delete{
      font-size:20px;
    }
    .error{
      top:57%;
      left:35%;
    }
    .list {    
      &__plane{
        padding:10px;
        width:47%;
        font-size: 20px;
        margin: 6px;
      }
    }
  }
  @media(max-width:465px) {
    .form{
      width:85%;
    }
    .input-field{
      font-size:15px;
    }
    .error{
      top:57%;
      left:30%;
    }
    .add,.edit,.delete{
      font-size:18px;
    }
    .list {    
      &__plane{
        padding:8px;
        width:57%;
        font-size: 18px;
        margin: 5px;
      }
    }
  }
  @media(max-width:330px) {
    .form{
      width:98%;
    }
    .input-field{
      font-size:15px;
    }
    .add{
      font-size:18px;
      width:50%;
    }
    .error{
      top:61%;
      left:28%;
    }
    .list {    
      &__plane{
        padding:8px;
        width:75%;
        font-size: 18px;
        margin: 5px;
      }
    }
    .add{
      font-size:20px;
    }
    .edit,.delete{
      font-size:18px;
    }
  }
`;
interface IPlane {
  name: string;
  key: string;
  business: number;
  economy: number;
  maxCargo: number;
}

function Planes() {
  const [planes, setPlanes] = useState([]);
  const [edited, setEdited] = useState(null);
  const [error, setError] = useState("");

  const handleDeletion = (code: string) => {
    api.post(`/admin/planes/${code}`).then(res => {
      api.get("/admin/planes").then(res => setPlanes(res.data));
    });
  };

  const handleAddition = (values: object) => {
    edited
      ? api
          .patch("/admin/planes", {
            ...values
          })
          .then(res => {
            api.get("/admin/planes").then(res => {
              setPlanes(res.data);
              setEdited(null);
            });
          })
          .catch(err => {
            setError(err);
          })
      : api
          .post("/admin/planes/", {
            ...values
          })
          .then(res => {
            api.get("/admin/planes").then(res => {
              setPlanes(res.data);
              setEdited(null);
            });
          })
          .catch(err => {
            setError(err);
          });
  };

  const handleEdit = (plane: object) => {
    setEdited(plane);
  };

  useEffect(() => {
    api.get("/admin/planes").then(res => setPlanes(res.data));
  }, []);

  const mappedPlanes = planes
    ? planes.map((plane: IPlane) => {
        return (
          <div className="list__plane" key={plane.key}>
            <p>{plane.name}</p>
            <div className="btn-container">
              <img
                src={deleteSvg}
                alt="delete-btn"
                className="delete"
                onClick={() => handleDeletion(plane.key)}
              ></img>
              <img
                src={editSvg}
                alt="edit-btn"
                className="edit"
                onClick={() => handleEdit(plane)}
              ></img>
            </div>
          </div>
        );
      })
    : null;
  return (
    <Container>
      {/* <SearchBar filter={(x: Array<IPlane>) => setPlanes(x)} items={planes} /> */}
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
              {edited ? "Edit" : "Add"} the plane
            </button>
            <OnChange name="name">
              {value => {
                setError(null);
              }}
            </OnChange>
            <OnChange name="key">
              {value => {
                setError(null);
              }}
            </OnChange>
          </form>
        )}
      />
      <p className="error">{error ? "The plane already exists" : " "}</p>
      <div className="list">{mappedPlanes}</div>
    </Container>
  );
}
export default Planes;
