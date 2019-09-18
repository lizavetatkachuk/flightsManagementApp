import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { api } from "./../../helpers/apiHeler";
import data from "../../data";
import "./plane.scss";

export const Plane = props => {
  const { onClick, people, plane } = props;
  const { booked } = props || [];
  const [selected, setSelected] = useState([]);
  const [planeSchema, setSchema] = useState([]);

  useEffect(() => {
    api.get(`/admin/planes/${plane}`).then(res => setSchema(res.data));
  }, []);

  var planeType = "plane";
  if (plane === "AirbusA320(ceo)") planeType = "plane";
  else if (plane === "BombardierCRJ200") planeType = "plane2";
  else planeType = "plane3";

  const businessClass = "business";
  const economyClass = "economy";

  const mappedBusiness = () => {
    const businessRows = [];
    for (let i = 0; i < planeSchema.business / 4; i++) {
      let row = [["A"], ["B"], ["C"], ["D"]];
      businessRows.push(row);
    }
    return businessRows;
  };
  const mappedEconomy = () => {
    const economyRows = [];
    for (let i = 0; i < planeSchema.economy / 6; i++) {
      let row = [["A"], ["B"], ["C"], ["D"], ["E"], ["F"]];
      economyRows.push(row);
    }
    return economyRows;
  };

  const handleChange = (seat, seatClass) => {
    if (selected.includes(seat)) {
      const newSelected = selected.filter(item => item !== seat);
      setSelected(newSelected);
      onClick({ seatClass: businessClass, seat });
    } else {
      if (selected.length < people) {
        const newSelected = [...selected, seat];
        setSelected(newSelected);
        onClick({ seatClass, seat });
      }
    }
  };
  const business = mappedBusiness().map((item, i) => {
    const leftSide = item
      .filter((seat, index) => {
        return index < 2;
      })
      .map(seat => {
        const seatNum = `${i + 1}${seat}`;
        const seatClass = selected.includes(seatNum)
          ? `seat ${businessClass} ${businessClass}--selected`
          : `seat ${businessClass}`;
        if (booked.includes(seatNum)) {
          return <div className={`${seatClass} booked`} key={seatNum}></div>;
        } else {
          return (
            <div
              className={seatClass}
              key={seatNum}
              onClick={() => {
                handleChange(seatNum, businessClass);
              }}
            ></div>
          );
        }
      });

    const rightSide = item
      .filter((seat, index) => {
        return index >= 2;
      })
      .map(seat => {
        const seatNum = `${i + 1}${seat}`;
        const seatClass = selected.includes(seatNum)
          ? `seat ${businessClass} ${businessClass}--selected`
          : `seat ${businessClass}`;
        if (booked.includes(seatNum)) {
          return <div className={`${seatClass} booked`} key={seatNum}></div>;
        } else {
          return (
            <div
              className={seatClass}
              key={seatNum}
              onClick={() => {
                handleChange(seatNum, businessClass);
              }}
            ></div>
          );
        }
      });
    const classKey = `businessClass${i}`;
    return (
      <div className="row" key={classKey}>
        <div className="seats">{leftSide}</div>
        <div className="row__number">
          <p>{i + 1}</p>
        </div>
        <div className="seats">{rightSide}</div>
      </div>
    );
  });

  const economy = mappedEconomy().map((item, i) => {
    const leftSide = item
      .filter((seat, index) => {
        return index < 3;
      })
      .map(seat => {
        const seatNum = `${planeSchema.business / 4 + i + 1}${seat}`;
        const seatClass = selected.includes(seatNum)
          ? `seat ${economyClass} ${economyClass}--selected`
          : `seat ${economyClass}`;
        if (booked.includes(seatNum)) {
          return <div className={`${seatClass} booked`} key={seatNum}></div>;
        } else {
          return (
            <div
              className={seatClass}
              key={seatNum}
              onClick={() => {
                handleChange(seatNum, economyClass);
              }}
            ></div>
          );
        }
      });

    const rightSide = item
      .filter((seat, index) => {
        return index >= 3;
      })
      .map(seat => {
        const seatNum = `${planeSchema.business / 4 + i + 1}${seat}`;
        const seatClass = selected.includes(seatNum)
          ? `seat ${economyClass} ${economyClass}--selected`
          : `seat ${economyClass}`;
        if (booked.includes(seatNum)) {
          return <div className={`${seatClass} booked`} key={seatNum}></div>;
        } else {
          return (
            <div
              className={seatClass}
              key={seatNum}
              onClick={() => {
                handleChange(seatNum, economyClass);
              }}
            ></div>
          );
        }
      });
    const classKey = `economyClass${i}`;
    return (
      <div className="row" key={classKey}>
        <div className="seats">{leftSide}</div>
        <div className="row__number">
          <p>{planeSchema.business / 4 + i + 1}</p>
        </div>
        <div className="seats">{rightSide}</div>
      </div>
    );
  });

  const planeMap = [...business, ...economy];
  return (
    <div className="plane">
      <div className="row">
        <div className="seats">
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </div>
        <div className="seats">
          <div>D</div>
          <div>E</div>
          <div>F</div>
        </div>
      </div>
      {planeMap}
    </div>
  );
};

Plane.propTypes = {
  onClick: PropTypes.func,
  people: PropTypes.number,
  booked: PropTypes.array,
  plane: PropTypes.string
};
export default Plane;
