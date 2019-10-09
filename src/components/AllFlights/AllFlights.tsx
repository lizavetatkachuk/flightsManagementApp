import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTable from "react-table";
import ModalWindow from "./../ModalWindow/ModalWindow";
import { api } from "./../../helpers/apiHeler";
import deleteSvg from "./../../static/images/delete-blue.svg";
import editSvg from "./../../static/images/edit-blue.svg";
import "react-table/react-table.css";

const Buttons = styled.img`
  width: 21px;
  height: 21px;
  font-size: 35px;
  background-color: Transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: #0c0663;
`;

const Container = styled.div`
  .ReactTable {
    margin: 20px;
    margin-left: 15px;
    padding-left: 5px;
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
      margin-left: 5px;
      margin: 7px;
      .rt-td {
        padding: 10px 5px;
        font-size: 15px;
      }
      .-pagination {
        font-size: 15px;
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
      margin: 7px;
      .rt-td {
        padding: 10px 5px;
        font-size: 15px;
      }
    }
  }
  @media (max-width: 330px) {
    .rt-resizable-heder-content {
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

interface IFight {
  _id: string;
  booked: Array<string>;
  from: {
    _id: string;
  };
  to: {
    _id: string;
  };
  plane: {
    _id: string;
  };
  price: number;
  company: string;
  time: string;
}

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [edited, setEdited] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDeletion = (id: string) => {
    api.post(`/admin/flights/${id}`).then(res => {
      let filtered = flights.filter(flight => {
        return flight._id != id;
      });
      setFlights(filtered);
    });
  };

  const handleEdit = (flight: IFight) => {
    setOpen(true);
    setEdited({
      ...flight,
      from: flight.from._id,
      to: flight.to._id,
      plane: flight.plane._id
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
      accessor: "from.name"
    },
    {
      Header: "Flying to",
      accessor: "to.name"
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
      Header: "",
      Cell: ({ row }) => (
        <Buttons
          src={deleteSvg}
          alt="delete-btn"
          onClick={() => handleDeletion(row._original._id)}
        ></Buttons>
      )
    },
    {
      Header: "",
      Cell: ({ row }) => (
        <Buttons
          src={editSvg}
          alt="edit-btn"
          onClick={() => handleEdit(row._original)}
        ></Buttons>
      )
    }
  ];

  const handleOpen = () => {
    setOpen(false);
  };

  const handleUpdate = (flights: Array<IFight>) => {
    setFlights(flights);
  };

  return (
    <Container>
      <ModalWindow
        isOpen={open}
        data={edited}
        close={handleOpen}
        update={handleUpdate}
      ></ModalWindow>
      <ReactTable data={flights} columns={columns} defaultPageSize={10} />
    </Container>
  );
};

export default AllFlights;
