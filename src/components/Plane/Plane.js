import React from "react";
import PropTypes from "prop-types";
import data from "../../data";
import "./plane.scss";

export const Plane = () => {
  const business = data.plane.business.map((item, i) => {
    const leftSide = item
      .filter((seat, index) => {
        return index < 2;
      })
      .map(seat => {
        const seatNum = `${i + 1}${seat}`;
        return (
          <div className="seat business" key={seatNum}>
            {seatNum}
          </div>
        );
      });

    const rightSide = item
      .filter((seat, index) => {
        return index >= 2;
      })
      .map(seat => {
        const seatNum = `${i + 1}${seat}`;
        console.log(seatNum);

        return (
          <div className="seat business" key={seatNum}>
            {seatNum}
          </div>
        );
      });

    return (
      <div className="row">
        <div className="seats">{leftSide}</div>
        <div className="seats">{rightSide}</div>
      </div>
    );
  });

  const economy = data.plane.economy.map((item, i) => {
    const leftSide = item
      .filter((seat, index) => {
        return index < 3;
      })
      .map(seat => {
        const seatNum = `${data.plane.business.length + i + 1}${seat}`;
        return (
          <div className="seat " key={seatNum}>
            {seatNum}
          </div>
        );
      });

    const rightSide = item
      .filter((seat, index) => {
        return index >= 3;
      })
      .map(seat => {
        const seatNum = `${data.plane.business.length + i + 1}${seat}`;
        console.log(seatNum);

        return (
          <div className="seat " key={seatNum}>
            {seatNum}
          </div>
        );
      });

    return (
      <div className="row">
        <div className="seats">{leftSide}</div>
        <div className="seats">{rightSide}</div>
      </div>
    );
  });
  const plane = [...business, ...economy];
  return <div className="plane">{plane}</div>;
};
export default Plane;
