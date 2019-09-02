import React, { useState } from "react";
import PropTypes from "prop-types";
import data from "../../data";
import "./plane.scss";

export const Plane = props => {
  const { onClick } = props;
  const [selected, setSelected] = useState("");
  const businessClass = "business";
  const economyClass = "economy";
  const business = data.plane.business.map((item, i) => {
    const leftSide = item
      .filter((seat, index) => {
        return index < 2;
      })
      .map(seat => {
        const seatNum = `${i + 1}${seat}`;
        const seatClass =
          selected === seatNum
            ? `seat ${businessClass} ${businessClass}--selected`
            : `seat ${businessClass}`;
        return (
          <div
            className={seatClass}
            key={seatNum}
            onClick={() => {
              onClick({ seatClass: businessClass, seat: seatNum });
              setSelected(seatNum);
            }}
          >
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
        const seatClass =
          selected === seatNum
            ? `seat ${businessClass} ${businessClass}--selected`
            : `seat ${businessClass}`;
        return (
          <div
            className={seatClass}
            key={seatNum}
            onClick={() => {
              onClick({ seatClass: businessClass, seat: seatNum });
              setSelected(seatNum);
            }}
          >
            {seatNum}
          </div>
        );
      });
    const classKey = `businessClass${i}`;
    return (
      <div className="row" key={classKey}>
        <div className="seats" key="businessLeft">
          {leftSide}
        </div>
        <div className="seats" key="businessRight">
          {rightSide}
        </div>
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
        const seatClass =
          selected === seatNum
            ? `seat ${economyClass} ${economyClass}--selected`
            : `seat ${economyClass}`;
        return (
          <div
            className={seatClass}
            key={seatNum}
            onClick={() => {
              onClick({ seatClass: economyClass, seat: seatNum });
              setSelected(seatNum);
            }}
          >
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
        const seatClass =
          selected === seatNum
            ? `seat ${economyClass} ${economyClass}--selected`
            : `seat ${economyClass}`;
        return (
          <div
            className={seatClass}
            key={seatNum}
            onClick={() => {
              onClick({ seatClass: economyClass, seat: seatNum });
              setSelected(seatNum);
            }}
          >
            {seatNum}
          </div>
        );
      });
    const classKey = `economyClass${i}`;
    return (
      <div className="row" key={classKey}>
        <div className="seats" key="economyLeft">
          {leftSide}
        </div>
        <div className="seats" key="economyRight">
          {rightSide}
        </div>
      </div>
    );
  });
  const plane = [...business, ...economy];
  return <div className="plane">{plane}</div>;
};
Plane.propTypes = {
  onClick: PropTypes.func
};
export default Plane;
