import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
export const Picker = ({
  meta: { touched, error },
  input: { name, onChange }
}) => {
  const title = name === "there" ? "Fly there" : "Fly back";
  const handleChange = a => a;
  return (
    <div className="select-area">
      <label className="search-form__label">{title}</label>
      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
      <DatePicker selected={new Date()} onChange={handleChange} />
    </div>
  );
};
