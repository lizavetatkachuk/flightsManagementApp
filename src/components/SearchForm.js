import React, { Fragment } from "react";
import { Form, Field } from "react-final-form";
import "./searchForm.scss";
import { validate, onSubmit } from "../validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = a => a;
  render() {
    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={() => (
          <div className="search-form">
            <div className="search-form__search-field">
              <label>Flying From</label>
              <Field
                className="component direction"
                name="from"
                component="select"
                type="text"
              >
                <option />
                <option>Amstertdam</option>
                <option>Minsk</option>
                <option>Berlin</option>
                <option>Cordoba</option>
              </Field>
              <div className="component">
                <img
                  src="_ionicons_svg_ios-swap.svg"
                  className="shift-btn"
                  alt="arrow"
                />
              </div>
              <label>Flying to</label>
              <Field
                className="component direction"
                name="to"
                component="select"
                type="text"
              >
                <option />
                <option>Amstertdam</option>
                <option>Minsk</option>
                <option>Berlin</option>
                <option>Cordoba</option>
              </Field>
            </div>
            <div className="search-form__search-field">
              <label>
                <Field
                  name="return"
                  component="input"
                  type="radio"
                  value="one-way"
                />{" "}
                One Way
              </label>
              <label>
                <Field
                  name="return"
                  component="input"
                  type="radio"
                  value="return"
                />{" "}
                Return
              </label>
            </div>
            <div className="search-form__search-field">
              <div className="component flight-dates">
                <p> Fly there</p>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="component flight-dates">
                <p> Fly back</p>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button className="search-form__submit"> Search Flights</button>
          </div>
        )}
      />
    );
  }
}

export default SearchForm;
