import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import AddFlight from "./../AddFlight/AddFlight";
import { api } from "./../../helpers/apiHeler";

const Container = styled.div`
  .Modal {
    position: absolute;
    top: -20%;
    background-color: #e0e417b3;
    height: 300px;
  }

  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #e0e417b3;
  }
`;
interface IFlight {
  from: string;
  to: string;
  there: string;
  company: string;
  price: number;
  plane: string;
}

interface IModal {
  isOpen: boolean;
  data: IFlight;
}

const ModalWindow = (Props: IModal) => {
  const handleEdit = () => {
    api
      .patch(`/admin/flights`, {
        ...Props.data
      })
      .then(res => {
        api.get("/admin/flights").then();
      });
  };

  return (
    <Container>
      <ReactModal
        isOpen={Props.isOpen}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#abb4c5bf"
          },
          content: {
            position: "absolute",
            top: "12%",
            left: "10%",
            right: "10%",
            background: "#7e94b5d9",
            color: "#0c0663",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px"
          }
        }}
      >
        <AddFlight flight={Props.data} />
      </ReactModal>
    </Container>
  );
};

export default ModalWindow;
