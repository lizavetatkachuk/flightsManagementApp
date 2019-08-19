import React from "react";
const Directions = props => {
  return props.props.cities.map(city => <option key={city}>{city}</option>);
};
export default Directions;
