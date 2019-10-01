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
  @media (max-width: 768px) and (min-width: 465px) {
    .react-tabs {
      &__tab-list {
        font-size: 20px;
        margin: 0 0 25px;
      }
    }
  }
  @media (max-width: 465px) {
    .react-tabs {
      &__tab-list {
        font-size: 18px;
        margin: 0 0 25px;
      }
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
