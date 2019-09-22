import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface AdminProps {
  history: object;
  loaction: object;
  match: object;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  margin-top: 20px;
  .admin-pane {
    width: 13%;
    margin: 10px;
    background-color: #e0e417b3;
    border-radius: 8px;
    height: auto;
    padding: 12px;
    text-align: center;
    text-decoration: none;
    &__element {
      font-size: 30px;
      color: #0c0663;
    }
    :hover {
      box-shadow: 7px 7px 7px grey;
    }
  }
  @media(max-width:768px) and (min-width:465px){
    .admin-pane{
      &__element{
      font-size:25px;}
      width:28%;
    }
  }
  @media(max-width:465px) {
    .admin-pane{
      &__element{
        font-size:23px;}
      width:40%;
    }
  }
`;
function AdminPane(Props: AdminProps) {
  return (
    <Container>
      <Link to="/admin/airports" className="admin-pane">
        <span className="admin-pane__element"> Airports</span>
      </Link>
      <Link to="/admin/flights" className="admin-pane">
        <span className="admin-pane__element"> Flights</span>
      </Link>
      <Link to="/admin/planes" className="admin-pane">
        <span className="admin-pane__element"> Planes</span>
      </Link>
    </Container>
  );
}
export default AdminPane;
