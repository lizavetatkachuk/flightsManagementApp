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

  .admin_pane_element {
    width: 10%;
    font-size: 30px;
    margin: 10px;
    color: #0c0663;
    background-color: #e0e417b3;
    border-radius: 8px;
    height: auto;
    padding: 12px;
  }
`;
function AdminPane(Props: AdminProps) {
  return (
    <Container>
      <Link to="/admin/airports" className="admin_pane_element">
        Airports
      </Link>
      <Link to="/" className="admin_pane_element">
        Flights
      </Link>
    </Container>
  );
}
export default AdminPane;
