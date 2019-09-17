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
      initialValues={{ orderby: "price" }}
      render={({ form, submitting, pristine, values }) => (
        <form className="filter-pane">
          <label className="filter-pane__element">Order by</label>
          <Field
            name="orderby"
            value="price"
            type="radio"
            render={({ input, meta }) => (
              <div className="input-container">
                <label className="filter-pane__element radio-container">
                  Price
                  <input
                    className="radio-container__radio"
                    id="return"
                    {...input}
                  />
                  <span className="radio-container__circle"></span>
                </label>
              </div>
            )}
          />
          <Field
            name="orderby"
            value="time"
            type="radio"
            render={({ input, meta }) => (
              <div className="input-container">
                <label className="filter-pane__element radio-container">
                  Time
                  <input
                    className="radio-container__radio"
                    id="return"
                    {...input}
                  />
                  <span className="radio-container__circle"></span>
                </label>
              </div>
            )}
          />
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
