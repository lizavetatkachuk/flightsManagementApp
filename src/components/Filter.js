import React from "react";
import "./filter.scss";
import { Form, Field } from "react-final-form";
import { validate, onSubmit } from "../validators";
class Filter extends React.Component {
  render() {
    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={() => (
          <div className="filter-pane">
            <label className="filter-pane__element">Order by</label>
            <label className="filter-pane__element">
              <Field
                name="filter"
                component="input"
                type="radio"
                value="price"
              />{" "}
              Price
            </label>
            <label className="filter-pane__element">
              <Field
                name="filter"
                component="input"
                type="radio"
                value="time"
              />{" "}
              Flight time
            </label>
          </div>
        )}
      />
    );
  }
}
export default Filter;
