import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import "./filter.scss";

const Filter = props => {
  const { onChange, value1, value2, filterName } = props;
  const onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
  };
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ filterName: value1 }}
      render={({ form, submitting, pristine, values }) => (
        <form className="filter-pane">
          <label className="filter-pane__element">
            {filterName === "orderBy" ? "Order by" : "Show "}
          </label>
          <label className="filter-pane__element">
            <Field
              initialValue={value1}
              name={filterName}
              component="input"
              type="radio"
              value={value1}
            />
            {value1}
          </label>
          <label className="filter-pane__element">
            <Field
              name={filterName}
              component="input"
              type="radio"
              value={value2}
            />
            {value2}
          </label>
          <OnChange name={filterName}>
            {value => {
              onChange(value);
            }}
          </OnChange>
        </form>
      )}
    />
  );
};
Filter.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default Filter;
