import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Airports from "./../Airports/Airports";
import Planes from "./../Planes/Planes";
import AllFlights from "./../AllFlights/AllFlights";
import AddFlight from "./../AddFlight/AddFlight";
import "react-tabs/style/react-tabs.scss";

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
  .react-tabs {
    &__tab-list {
      font-size: 23px;
      border-bottom: none;
    }
    &__tab--selected {
      background: #e2e91eab;
      border-radius: 5px;
    }
  }
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
  @media (max-width: 768px) and (min-width: 465px) {
    .admin-pane {
      &__element {
        font-size: 25px;
      }
      width: 28%;
    }
  }
  @media (max-width: 465px) {
    .admin-pane {
      &__element {
        font-size: 23px;
      }
      width: 40%;
    }
  }
`;
function AdminPane(Props: AdminProps) {
  return (
    <Container>
      <Tabs>
        <TabList style={{}}>
          <Tab>Airports</Tab>
          <Tab>Flights</Tab>
          <Tab>Add Flight</Tab>
          <Tab>Planes</Tab>
        </TabList>

        <TabPanel>
          <Airports></Airports>
        </TabPanel>
        <TabPanel>
          <AllFlights></AllFlights>
        </TabPanel>
        <TabPanel>
          <AddFlight></AddFlight>
        </TabPanel>
        <TabPanel>
          <Planes></Planes>
        </TabPanel>
      </Tabs>
    </Container>
  );
}
export default AdminPane;
