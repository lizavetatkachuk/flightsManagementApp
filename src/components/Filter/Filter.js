import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import "./filter.scss";

const Filter = props => {
  const { onChange } = props;
  const onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, submitting, pristine, values }) => (
        <form className="filter-pane">
          <label className="filter-pane__element">Order by</label>
          <label className="filter-pane__element">
            <Field
              initialValue="price"
              name="filter"
              component="input"
              type="radio"
              value="price"
            />
            Price
          </label>
          <label className="filter-pane__element">
            <Field name="filter" component="input" type="radio" value="time" />
            Flight time
          </label>
          <OnChange name="filter">
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
