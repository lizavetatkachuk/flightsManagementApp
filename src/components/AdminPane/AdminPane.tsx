import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
interface AdminProps {
  history: object;
  loaction: object;
  match: object;
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  .li {
    background-color: rgba(rgb(224, 228, 23), 0.7);
    height: auto;
  }
  .admin_pane_element {
    width: 100%;
    font-size: 30px;
    color: blue;
    background-color: rgb(224, 228, 23);
    border-radius: 8px;
    height: auto;
    padding: 12px;
  }
`;
function Example(Props: AdminProps) {
  return (
    <Container>
      <li>
        <Link to="/login" className="admin_pane_element">
          Airports
        </Link>
      </li>
      <li>
        <Link to="/" className="admin_pane_element">
          Users
        </Link>
      </li>
    </Container>
  );
}
export default Example;
