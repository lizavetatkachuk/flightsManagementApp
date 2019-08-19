import React from "react";
import { Form, Field } from "react-final-form";
import { validate, onSubmit } from "../../validators";
import "./filter.scss";

const Filter = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={() => (
      <form className="filter-pane">
        <label className="filter-pane__element">Order by</label>
        <label className="filter-pane__element">
          <Field name="filter" component="input" type="radio" value="price" />
          Price
        </label>
        <label className="filter-pane__element">
          <Field name="filter" component="input" type="radio" value="time" />
          Flight time
        </label>
      </form>
    )}
  />
);

export default Filter;
