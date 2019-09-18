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
          <Field
            initialValue={value1}
            name={filterName}
            type="radio"
            value={value1}
            render={({ input, meta }) => (
              <div className="input-container">
                <label className="filter-pane__element radio-container">
                  {value1}
                  <input
                    className="radio-container__radio"
                    value={value1}
                    {...input}
                  />
                  <span className="radio-container__circle"></span>
                </label>
              </div>
            )}
          />

          <Field
            name={filterName}
            type="radio"
            value={value2}
            render={({ input, meta }) => (
              <div className="input-container">
                <label className="filter-pane__element radio-container">
                  {value2}
                  <input
                    className="radio-container__radio"
                    value={value2}
                    {...input}
                  />
                  <span className="radio-container__circle"></span>
                </label>
              </div>
            )}
          />
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
