import React from "react";
import PropTypes from "prop-types";
import "./button.scss";
const Button = props => {
  const { btntype, btnclass, onClick, disabled } = props;
  const buttonclass = btnclass ? `${btnclass} button` : "button";
  return (
    <button
      type={btntype}
      className={buttonclass}
      onClick={onClick}
      disabled={disabled}
    >
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
