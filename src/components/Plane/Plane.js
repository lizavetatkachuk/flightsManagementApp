import React from "react";
import PropTypes from "prop-types";
import data from "../../data";
import "./plane.scss";

export const Plane = () => {
  const business = data.plane.business.map((item, i) => {
    const row = item.map(seat => {
      const seatNum = `${i + 1}${seat}`;
      return (
        <li className="seat" key={seatNum}>
          {seatNum}
        </li>
      );
    });
    return (
      <li className="row">
        <ol className="seats">{row}</ol>
      </li>
    );
  });
  const economy = data.plane.economy.map((item, i) => {
    const row = item.map(seat => {
      const seatNum = `${data.plane.business.length + i + 1}${seat}`;
      return (
        <li className="seat" key={seatNum}>
          {data.plane.business.length + 1 + i}
          {seat}
        </li>
      );
    });
    return (
      <li className="row">
        <ol className="seats">{row}</ol>
      </li>
    );
  });
  const plane = [...business, ...economy];
  return (
    <div>
      <ol className="plane">{plane}</ol>
    </div>
  );
};
export default Plane;
