import React from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import Button from "./../Shared/Button/Button";
import { Picker } from "./../Picker/Picker";
import { validateDate } from "../../validators";
import data from "./../../data";
import pic from "./../../static/images/arrows.svg";
import "./searchForm.scss";

const SearchForm = props => {
  const onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
    props.history.push("/flights");
  };
  const onChange = values => {
    console.log(values);
  };
  const directions = data.cities.map(city => (
    <option key={city}>{city}</option>
  ));

  return (
    <Form
      onSubmit={onSubmit}
      onChange={onChange}
      validate={values => {
        const errors = {};
        if (!values.from) {
          errors.from = "Choose the airport";
        }
        if (!values.to) {
          errors.to = "Choose the destination";
        }
        if (!values.return) {
          errors.return = "Choose the flight type";
        }
        if (!values.there) {
          errors.there = "Choose the dates";
        }
        if (!values.back) {
          errors.back = "Choose the dates";
        }
        return errors;
      }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-form__field">
            <Field
              name="from"
              render={({ input, meta }) => (
                <React.Fragment>
                  <div className="container">
                    <label className="search-form__label">Flying From</label>
                    <select className="search-form__select " {...input}>
                      {directions}
                    </select>
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                </React.Fragment>
              )}
            />
            <div className="search-form__select">
              <img src={pic} className="shift-btn" alt="arrow" />
            </div>

            <Field
              name="to"
              render={({ input, meta }) => (
                <React.Fragment>
                  <div className="container">
                    <label className="search-form__label">Flying To</label>

                    <select className="search-form__select" {...input}>
                      {directions}
                    </select>
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                </React.Fragment>
              )}
            />
          </div>
          <div className="search-form__field there-and-back">
            <Field
              name="return"
              value="one-way"
              type="radio"
              render={({ input, meta }) => (
                <div className="container">
                  <label className="search-form__label">One Way</label>
                  <input {...input} />
                  {meta.error && meta.touched && (
                    <span className="error">{meta.error}</span>
                  )}
                </div>
              )}
            />

            <Field
              name="return"
              value="return"
              type="radio"
              render={({ input, meta }) => (
                <div className="container">
                  <label className="search-form__label">Return</label>

                  <input {...input} />
                </div>
              )}
            />
          </div>
          <div className="search-form__field">
            <Field
              className="component flight-dates"
              name="there"
              component={Picker}
              validate={validateDate}
            />
            <Field
              className="component flight-dates"
              name="back"
              component={Picker}
              validate={validateDate}
            />
          </div>
          <Button btnype="submit" disabled={submitting || pristine}>
            Search Flights
          </Button>
        </form>
      )}
    />
  );
};
SearchForm.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default withRouter(SearchForm);
