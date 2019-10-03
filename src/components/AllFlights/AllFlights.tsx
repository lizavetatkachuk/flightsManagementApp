import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTable from "react-table";
import ModalWindow from "./../ModalWindow/ModalWindow";
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
  .delete,.edit {
    font-size: 35px;
    background-color: Transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color: #0c0663;
  }
  .edit{
    font-size:20px;
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
    .rt-resizable-header-content {
      padding-left: 10px;
      text-align: left;
      font-size: 19px;
    }
    .ReactTable {
      .rt-td {
        padding: 15px 10px;
        font-size: 18px;
      }
    }
  }
  @media (max-width: 768px) and (min-width: 465px) {
    .rt-resizable-header-content {
      padding-left: 10px;
      text-align: left;
      font-size: 16px;
    }
    .ReactTable {
      margin: 5px;
      .rt-td {
        padding: 10px 5px;
        font-size: 15px;
      }
      .-pagination {
        font-size: 15px;
        }
      }
    }
  }
  @media (max-width: 465px) {
    .rt-resizable-header-content {
      padding-left: 10px;
      text-align: left;
      font-size: 16px;
    }
    .ReactTable {
      margin: 5px;
      .rt-td {
        padding: 10px 5px;
        font-size: 15px;
      }
    }
  }
`;
const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [edited, setEdited] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDeletion = (id: string) => {
    api.post(`/admin/flights/${id}`).then(res => {
      api.get("/admin/flights").then(res => setFlights(res.data));
    });
  };

  const handleEdit = (flight: object) => {
    setOpen(true);
    setEdited(flight);
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
    },
    {
      Header: "Edit the flight",
      Cell: ({ row }) => (
        <button className="edit" onClick={() => handleEdit(row._original)}>
          Edit
        </button>
      )
    }
  ];

  return (
    <Container>
      <ModalWindow
        isOpen={open}
        data={edited}
        close={() => {
          setOpen(false);
        }}
      ></ModalWindow>
      <ReactTable data={flights} columns={columns} defaultPageSize={10} />
    </Container>
  );
};

export default AllFlights;
