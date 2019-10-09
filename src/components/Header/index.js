import React, { useState } from "react";
import SideBar from "./../SideBar/SideBar";
import Header from "./Header";

const Layout = () => {
  const [isOpen, setOpen] = useState(0);

  const onOpen = () => {
    setOpen(1);
  };

  const onClose = () => {
    setOpen(0);
  };
  return (
    <React.Fragment>
      <Header onClick={onOpen} />
      <SideBar isOpen={isOpen} onClick={onClose} />
    </React.Fragment>
  );
};
export default Layout;
