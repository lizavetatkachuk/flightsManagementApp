import React from "react";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import Button from "./../Shared/Button/Button";
import { Picker } from "./../Picker/Picker";
import data from "./../../data";
import pic from "./../../static/images/arrows.svg";
import "./searchForm.scss";
import "react-datepicker/dist/react-datepicker.css";

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date()
    };
    const startDate = this.state.startDate;
  }

  handleChange = a => a;
  onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
    this.props.history.push("/flights");
  };
  render() {
    const directions = () => {
      return data.cities.map(city => <option key={city}>{city}</option>);
    };
    return (
      <Form
        onSubmit={this.onSubmit}
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
            <div className="search-form__search-field">
              <Field
                name="from"
                render={({ input, meta }) => (
                  <React.Fragment>
                    <div className="select-area">
                      <label className="search-form__label">Flying From</label>
                      {meta.error && meta.touched && (
                        <span className="error">{meta.error}</span>
                      )}
                    </div>
                    <select className="component direction">
                      {directions()}
                    </select>
                  </React.Fragment>
                )}
              />
              <div className="component">
                <img src={pic} className="shift-btn" alt="arrow" />
              </div>

              <Field
                name="to"
                render={({ input, meta }) => (
                  <React.Fragment>
                    <div className="select-area">
                      <label className="search-form__label">Flying To</label>
                      {meta.error && meta.touched && (
                        <span className="error">{meta.error}</span>
                      )}
                    </div>
                    <select className="component direction">
                      {directions()}
                    </select>
                  </React.Fragment>
                )}
              />
            </div>
            <div className="search-form__search-field there-and-back">
              <Field
                name="return"
                value="one-way"
                render={({ input, meta }) => (
                  <div className="select-area">
                    <label className="search-form__label">One Way</label>
                    <input {...input} type="radio" />
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                )}
              />

              <Field
                name="return"
                render={({ input, meta }) => (
                  <div className="select-area">
                    <label className="search-form__label">Return</label>

                    <input {...input} type="radio" />
                  </div>
                )}
              />
            </div>
            <div className="search-form__search-field">
              <Field
                className="component flight-dates"
                name="there"
                component={Picker}
              />
              <Field
                className="component flight-dates"
                name="back"
                component={Picker}
              />
            </div>
            <Button type="submit"> Search Flights</Button>
          </form>
        )}
      />
    );
  }
}

export default withRouter(SearchForm);
