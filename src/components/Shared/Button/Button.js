import React from "react";
import "./button.scss";
const Button = props => {
  const btnclass = props.class ? props.class : "";
  return (
    <button type={props.type} className={btnclass}>
      {props.children}
    </button>
  );
};
export default Button;
