import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import SearchBar from "./../SearchBar/SearchBar";
import deleteSvg from "./../../static/images/delete-yellow.svg";
import editSvg from "./../../static/images/edit-yellow.svg";
import { api } from "../../helpers/apiHeler";

const AddButton = styled.button`
  color: #0c0663;
  background-color: Transparent;
  padding: 8px 10px;
  border-radius: 7px;
  margin-top: 10px;
  outline: none;
  cursor: pointer;
  border: 2px solid #0c0663;
  font-size: 25px;
  :disabled {
    color: grey;
  }
  &:hover {
    box-shadow: 3px 3px 3px #242222;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    font-size: 23px;
  }
  @media (max-width: 560px) {
    font-size: 18px;
  }
  @media (max-width: 330px) {
    font-size: 18px;
  }
`;

const EditButton = styled.img`
  margin-left: 10px;
  font-size: 23px;
  border-radius: 7px;
  width: 37px;
  box-shadow: 3px 3px 3px Transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 3px #242222;
  }
`;
const PlaneList = styled.div`
  padding-right: 10px;
  width: 100%;
  margin: 15px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  @media (max-width: 768px) and (min-width: 560px) {
    margin: 10px;
  }
  @media (max-width: 560px) {
    margin: 8px;
  }
  @media (max-width: 330px) {
    margin: 8px;
  }
`;
const Plane = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  margin: 10px;
  color: #0c0663;
  background-color: #82a1c3b3;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 5px;

  @media (max-width: 1200px) and (min-width: 768px) {
    width: 35%;
    font-size: 23px;
    margin: 8px;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    height: 98px;
    width: 37%;
    font-size: 20px;
  }
  @media (max-width: 560px) {
    width: 60%;
    height: 80px;
    font-size: 20px;
    margin: 3px;
  }
  @media (max-width: 330px) {
    width: 65%;
    height: 80px;
    font-size: 20px;
    margin: 3px;
  }
`;

const PlaneForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
  margin-bottom: 40px;
  width: 60%;
  @media (max-width: 1200px) and (min-width: 768px) {
    margin-top: 20px;
    width: 70%;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    width: 70%;
  }
  @media (max-width: 560px) {
    margin-top: 10px;
    width: 80%;
  }
  @media (max-width: 330px) {
    margin-top: 10px;
    width: 95%;
  }
`;

const Container = styled.div`
  text-align: right;
`;

const InputField = styled.input`
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 8px;
  padding-left: 5px;
  width: 65%;
  height: 35px;
  font-size: 20px;
  background-color: #bdbec0;
  color: #0c0663;
  outline: none;
  ::placeholder {
    color: #0c0663;
  }
  @media (max-width: 1200px) and (min-width: 768px) {
    width: 85%;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    width: 95%;
  }
  @media (max-width: 560px) {
    width: 100%;
    margin: 0px;
    font-size: 18px;
  }

  @media (max-width: 330px) {
    width: 100%;
    margin: 0px;
    font-size: 15px;
  }
`;

const ButtonContainer = styled.div`
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
`;

const Error = styled.p`
  position: absolute;
  left: 45%;
  top: 35%;
  height: 21px;
  margin-block-end: 0em;
  margin-block-start: 0em;
  font-size: 18px;
  color: red;

  @media (max-width: 1200px) and (min-width: 768px) {
    left: 40%;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    left: 35%;
  }
  @media (max-width: 560px) {
    top: 32%;
    left: 30%;
  }
  @media (max-width: 330px) {
    top: 35%;
    left: 30%;
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
  const [filter, setFilter] = useState("");
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
    api.get("/admin/planes").then(res => {
      setPlanes(res.data);
    });
  }, []);

  const filtered =
    filter !== ""
      ? planes.filter(plane => {
          return plane.name.startsWith(filter);
        })
      : planes;

  const mappedPlanes = filtered
    ? filtered.map((plane: IPlane) => {
        return (
          <Plane key={plane.key}>
            <p>{plane.name}</p>
            <ButtonContainer>
              <EditButton
                src={deleteSvg}
                alt="delete-btn"
                onClick={() => handleDeletion(plane.key)}
              ></EditButton>
              <EditButton
                src={editSvg}
                alt="edit-btn"
                onClick={() => handleEdit(plane)}
              ></EditButton>
            </ButtonContainer>
          </Plane>
        );
      })
    : null;

  const handleSearch = (filter: string) => {
    setFilter(filter);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <Container>
      <SearchBar search={handleSearch} items={planes} />
      <Form
        onSubmit={handleAddition}
        initialValues={edited}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <PlaneForm onSubmit={handleSubmit}>
            <Field
              name="name"
              render={({ input, meta }) => (
                <React.Fragment>
                  <InputField placeholder="Enter the plane name" {...input} />
                </React.Fragment>
              )}
            />
            <Field
              name="key"
              render={({ input, meta }) => (
                <React.Fragment>
                  <InputField
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
                  <InputField
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
                  <InputField
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
                  <InputField
                    placeholder="Enter the maximum cargo capacity "
                    {...input}
                  />
                </React.Fragment>
              )}
            />
            <AddButton type="submit" disabled={submitting || pristine}>
              {edited ? "Edit" : "Add"} the plane
            </AddButton>
            <OnChange name="name">{clearError}</OnChange>
            <OnChange name="key">{clearError}</OnChange>
          </PlaneForm>
        )}
      />
      <Error>{error ? "The plane already exists" : " "}</Error>
      <PlaneList>{mappedPlanes}</PlaneList>
    </Container>
  );
}
export default Planes;
