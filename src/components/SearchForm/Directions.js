import React, { Fragment } from "react";
const Directions = props => {
  return props.props.cities.map(city => <option>{city}</option>);
};
export default Directions;
