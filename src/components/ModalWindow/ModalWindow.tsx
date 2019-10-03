import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import AddFlight from "./../AddFlight/AddFlight";
import pic from "./../../static/images/close.svg";
const Container = styled.div`
  .close-btn {
    cursor: pointer;
    position: absolute;
    height: 17px;
    width: 17px;
    right: 47%;
    top: 1.5%;
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
  close: () => void;
}

const ModalWindow = (Props: IModal) => {
  return (
    <Container>
      <ReactModal
        shouldCloseOnOverlayClick={true}
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
        <AddFlight flight={Props.data} close={Props.close} />
        <img
          alt="close-tab-btn"
          src={pic}
          style={{
            height: "17px",
            width: "15px",
            cursor: "pointer",
            position: "absolute",
            top: "1.5%",
            right: "2%"
          }}
          className="close-btn"
          onClick={() => Props.close()}
        />
      </ReactModal>
    </Container>
  );
};

export default ModalWindow;
