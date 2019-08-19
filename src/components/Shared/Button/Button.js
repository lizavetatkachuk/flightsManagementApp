import React from "react";
import "./button.scss";
const Button = props => {
  const { type } = props;
  const btnclass = props.class ? props.class : "";
  return (
    <button type={type} className={btnclass}>
      {props.children}
    </button>
  );
};

export default Button;
