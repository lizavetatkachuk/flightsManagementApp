import React from "react";
import PropTypes from "prop-types";
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
Button.propTypes = {
  btntype: PropTypes.string,
  btnclass: PropTypes.string,
  logged: PropTypes.string
};
export default Button;
