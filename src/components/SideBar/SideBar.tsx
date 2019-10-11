import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { checkAdmin } from "../../helpers/authHelper";
import pic from "./../../static/images/close.svg";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 110px;
  font-size: 20px;
  transform: translateX(${props => props.theme.position}%);
  transition: transform 0.3s ease-out;
  z-index: 100;
  height: 100vh;
  width: 100%;
  color: #0c0663;
  .open {
    transform: translateX(0);
  }
`;

const SidePane = styled.ul`
  height: 100vh;
  width: 55%;
  margin: 0;
  padding-top: 40px;
  padding-left: 10px;
  list-style-type: none;
  background-color: #e3e87ae6;
`;

const PaneElement = styled.li`
  margin: 20px;
  margin-left: 10px;
  cursor: pointer;
`;

const CloseButton = styled.img`
  position: absolute;
  right: 47%;
  top: 1.5%;
  height: 17px;
  width: 17px;
  cursor: pointer;
`;

function SideBar(props) {
  const role = checkAdmin();
  const { history, onClick, isOpen } = props;
  const theme = {
    position: isOpen ? 0 : -100
  };

  return (
    <Container theme={theme}>
      <SidePane>
        <PaneElement
          onClick={() => {
            onClick();
            history.push("/");
          }}
        >
          Search Flights
        </PaneElement>
        <PaneElement
          onClick={() => {
            onClick();
            history.push("/orders");
          }}
        >
          My flights
        </PaneElement>
        {role === "admin" && (
          <PaneElement
            onClick={() => {
              onClick();
              history.push("/admin");
            }}
          >
            Admin Pane
          </PaneElement>
        )}
        <CloseButton alt="close-tab-btn" src={pic} onClick={onClick} />
      </SidePane>
    </Container>
  );
}

export default withRouter(SideBar);
