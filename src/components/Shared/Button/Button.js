import React from "react";
import PropTypes from "prop-types";
import "./button.scss";
const Button = props => {
  const { btntype, btnclass, onClick } = props;
  const buttonclass = btnclass ? btnclass : "button";
  return (
    <button type={btntype} className={buttonclass} onClick={onClick}>
      {props.children}
    </button>
  );
};
Button.propTypes = {
  btntype: PropTypes.string,
  btnclass: PropTypes.string,
  logged: PropTypes.string
};
export default Button;
