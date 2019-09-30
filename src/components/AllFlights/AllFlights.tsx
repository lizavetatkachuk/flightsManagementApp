import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTable from "react-table";
import { api } from "./../../helpers/apiHeler";
import "react-table/react-table.css";

interface IFlight {
  _id: string;
  booked: Array<string>;
  from: string;
  to: string;
  price: number;
  company: string;
  time: string;
}

const Container = styled.div`
  .delete {
    font-size: 35px;
    background-color: Transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color: #0c0663;
  }
  .ReactTable {
    margin: 20px;
    border-radius: 12px;
    .rt-thead.-header {
      background-color: #82a1c3b3;
    }
    .rt-td {
      padding: 15px;
      font-size: 20px;
    }
    .rt-tbody {
      background-color: #d7d0c969;
    }
    .-pagination {
      background-color: #82a1c3b3;
      font-size: 17px;
      select,
      input {
        background: #e4e2dfd4;
      }
    }
  }
  .rt-resizable-header-content {
    padding-left: 12px;
    text-align: left;
    font-size: 23px;
  }
  @media (max-width: 1200px) and (min-width: 768px) {
  }
  @media (max-width: 768px) and (min-width: 465px) {
  }
  @media (max-width: 465px) {
  }
`;
const AllFlights = () => {
  const [flights, setFlights] = useState([]);

  const handleDeletion = (id: string) => {
    api.post(`/admin/flights/${id}`).then(res => {
      api.get("/admin/flights").then(res => setFlights(res.data));
    });
  };

  useEffect(() => {
    api.get("/admin/flights").then(res => {
      setFlights(res.data);
    });
  }, []);

  const columns = [
    {
      Header: "Flying from",
      accessor: "from"
    },
    {
      Header: "Flying to",
      accessor: "to"
    },
    {
      Header: "Airlines",
      accessor: "company"
    },
    {
      Header: "Date",
      accessor: "time"
    },
    {
      Header: "Price",
      accessor: "price"
    },
    {
      Header: "Delete the flight",
      Cell: ({ row }) => (
        <button
          className="delete"
          onClick={() => handleDeletion(row._original._id)}
        >
          -
        </button>
      )
    }
  ];

  return (
    <Container>
      <ReactTable data={flights} columns={columns} defaultPageSize={10} />
    </Container>
  );
};

export default AllFlights;
