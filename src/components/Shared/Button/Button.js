import React from "react";
import "./button.scss";
const Button = props => {
  console.log(props.props);
  return (
    <button
      className={props.props.className}
      type={props.props.type}
      text={props.props.title}
    >
      {props.props.title}
    </button>
  );
};
export default Button;
