import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import AddFlight from "./../AddFlight/AddFlight";
import pic from "./../../static/images/close.svg";

const Container = styled.div``;

const Button = styled.img`
  cursor: pointer;
  position: absolute;
  height: 17px;
  width: 17px;
  right: 47%;
  top: 1.5%;
`;

interface IFlight {
  _id: string;
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
  update: (any) => void;
}

const ModalWindow = (props: IModal) => {
  const handleClose = () => {
    props.close();
  };

  return (
    <Container>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        isOpen={props.isOpen}
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
            background: "#7e94b5d9",
            color: "#0c0663",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "20px"
          }
        }}
      >
        <AddFlight
          flight={props.data}
          close={props.close}
          update={props.update}
        />
        <Button
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
          onClick={handleClose}
        />
      </ReactModal>
    </Container>
  );
};

export default ModalWindow;
