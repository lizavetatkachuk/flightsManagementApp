import React from "react";
import "./button.scss";
const Button = props => {
  const { btntype } = props;
  const btnclass = props.btnclass ? props.btnclass : "button";
  return (
    <button type={btntype} className={btnclass}>
      {props.children}
    </button>
  );
};

export default Button;
