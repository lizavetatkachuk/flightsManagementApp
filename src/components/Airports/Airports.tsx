import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import SearchBar from "./../SearchBar/SearchBar";
import deleteSvg from "./../../static/images/delete-yellow.svg";
import editSvg from "./../../static/images/edit-yellow.svg";
import { api } from "./../../helpers/apiHeler";

const Container = styled.div`
  text-align: right;
`;

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
const AirportList = styled.div`
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
const Airport = styled.div`
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

const AirportForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
  margin-bottom: 40px;
  width: 40%;

  @media (max-width: 768px) and (min-width: 560px) {
    width: 70%;
  }
  @media (max-width: 560px) {
    margin-top: 10px;
    width: 80%;
  }
  @media (max-width: 330px) {
    margin-top: 10px;
    width: 90%;
  }
`;

const InputField = styled.input`
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 8px;
  width: 60%;
  height: 35px;
  font-size: 20px;
  background-color: #bdbec0;
  color: #0c0663;
  outline: none;
  ::placeholder {
    color: #0c0663;
  }
  @media (max-width: 1200px) and (min-width: 768px) {
    width: 90%;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    width: 100%;
  }
  @media (max-width: 560px) {
    margin: 0px;
    font-size: 18px;
    width: 100%;
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
        return airport.code !== code;
      });
      setAirports(filtered);
    });
  };

  const handleAddition = (values: { code: string }) => {
    edited
      ? api
          .patch("/admin/airports/", {
            ...values
          })
          .then(res => {
            let filtered = airports.filter(airport => {
              return airport.code !== values.code;
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

  const handleSearch = (filter: string) => {
    setFilter(filter);
  };

  useEffect(() => {
    api.get("/admin/airports").then(res => {
      setAirports(res.data);
    });
  }, []);

  const filtered =
    filter !== ""
      ? airports.filter(airport => {
          return airport.name.startsWith(filter);
        })
      : airports;

  const mappedAirports = filtered
    ? filtered.map((airport: IAirport) => {
        return (
          <Airport key={airport.code}>
            <p>{airport.name}</p>
            <ButtonContainer>
              <EditButton
                src={deleteSvg}
                alt="delete-btn"
                onClick={() => handleDeletion(airport.code)}
              ></EditButton>
              <EditButton
                src={editSvg}
                alt="edit-btn"
                className="edit"
                onClick={() => handleEdit(airport)}
              ></EditButton>
            </ButtonContainer>
          </Airport>
        );
      })
    : null;

  const cleanError = () => {
    setError(null);
  };

  return (
    <Container>
      <SearchBar search={handleSearch} items={airports}></SearchBar>
      <Form
        onSubmit={handleAddition}
        initialValues={edited}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <AirportForm onSubmit={handleSubmit}>
            <Field
              name="name"
              render={({ input, meta }) => (
                <React.Fragment>
                  <InputField placeholder="Enter the airport name" {...input} />
                </React.Fragment>
              )}
            />
            <Field
              name="code"
              render={({ input, meta }) => (
                <React.Fragment>
                  <InputField placeholder="Enter the airport code" {...input} />
                </React.Fragment>
              )}
            />
            <AddButton type="submit" disabled={submitting || pristine}>
              {edited ? "Edit" : "Add"} the airport
            </AddButton>
            <OnChange name="name">{cleanError}</OnChange>
            <OnChange name="code">{cleanError}</OnChange>
          </AirportForm>
        )}
      />
      <Error>{error ? "The airport already exists" : " "}</Error>
      <AirportList>{mappedAirports}</AirportList>
    </Container>
  );
}
export default Airports;
