import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Airports from "./../Airports/Airports";
import Planes from "./../Planes/Planes";
import AllFlights from "./../AllFlights/AllFlights";
import AddFlight from "./../AddFlight/AddFlight";
import "react-tabs/style/react-tabs.scss";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  margin-top: 40px 0;
  .react-tabs {
    &__tab-list {
      font-size: 23px;
      border-bottom: none;
      margin-left: 20px;
    }
    &__tab--selected {
      background: #e2e91eab;
      border-radius: 5px;
    }
  }
  @media (max-width: 1200px) {
    .react-tabs__tab-list {
      margin-left: 7px;
    }
  }
  @media (max-width: 768px) and (min-width: 465px) {
    .react-tabs {
      &__tab-list {
        font-size: 20px;
        margin: 0 7px 25px;
      }
    }
  }
  @media (max-width: 465px) {
    .react-tabs {
      &__tab-list {
        font-size: 18px;
        margin: 0 7px 25px;
      }
    }
  }
  @media (max-width: 330px) {
    .react-tabs {
      &__tab-list {
        font-size: 18px;
        margin: 0 5px 25px;
      }
    }
  }
`;
interface AdminProps {
  history: object;
  loaction: object;
  match: object;
}

function AdminPane(props: AdminProps) {
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
          <Airports />
        </TabPanel>
        <TabPanel>
          <AllFlights />
        </TabPanel>
        <TabPanel>
          <AddFlight />
        </TabPanel>
        <TabPanel>
          <Planes />
        </TabPanel>
      </Tabs>
    </Container>
  );
}
export default AdminPane;
